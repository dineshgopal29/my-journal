#!/usr/bin/env node
// Content lint for blog posts and guides.
//   node scripts/publish/lint-content.mjs            # lint everything
//   node scripts/publish/lint-content.mjs blog/x.md  # lint specific files
// Errors fail the run (exit 1). Warnings are advisory. Queued posts (draft: true)
// are held to a stricter standard because they will go live without another review.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, {withFileTypes: true}).flatMap((e) => {
        const p = path.join(dir, e.name);
        return e.isDirectory() ? walk(p) : /\.mdx?$/.test(e.name) ? [p] : [];
      })
    : [];

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const files = args.length ? args : [...walk('blog'), ...walk('docs')];

// Known tag keys (blog/tags.yml)
const tagsYml = fs.readFileSync('blog/tags.yml', 'utf8');
const knownTags = new Set(Object.keys(matter.engines.yaml.parse(tagsYml) || {}));


// Structure rules per post_type (see .claude/skills/publish-post/templates/README.md)
const TYPES = {
  essay: {min: 1800, max: 3200, tldr: true, takeaways: true, limits: true, visual: true},
  guide: {min: 1500, max: 3500, tldr: true, takeaways: true, limits: false, visual: true},
  'field-notes': {min: 1200, max: 2600, tldr: true, takeaways: true, limits: false, visual: false},
  reference: {min: 3000, max: 6500, tldr: true, takeaways: true, limits: false, visual: true},
  'quick-take': {min: 500, max: 1100, tldr: false, takeaways: false, limits: false, visual: false},
};

const errors = [];
const warnings = [];
const slugs = new Map();
const err = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warnings.push(`${f}: ${m}`);

for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  let parsed;
  try {
    parsed = matter(raw);
  } catch (e) {
    err(f, `frontmatter does not parse (${e.message.split('\n')[0]})`);
    continue;
  }
  const {data, content} = parsed;
  const isBlog = f.startsWith('blog/') || f.startsWith('./blog/');
  const queued = data.draft === true;
  const strict = (msg, fn) => (queued ? err(f, msg) : fn(f, msg));

  if (!data.title) err(f, 'missing title');
  if (data.title && data.title.length > 70) warn(f, `title is ${data.title.length} chars (aim for <= 60 for search results)`);
  if (!data.description) err(f, 'missing description');
  else if (data.description.length < 100 || data.description.length > 170)
    strict(`description is ${data.description.length} chars (aim for 120-160)`, warn);

  if (isBlog) {
    if (!data.authors) err(f, 'missing authors');
    const tags = data.tags || [];
    if (!tags.length) strict('no tags', warn);
    if (tags.length > 6) strict(`${tags.length} tags (max 6)`, warn);
    for (const t of tags) if (typeof t === 'string' && !knownTags.has(t)) err(f, `tag "${t}" is not defined in blog/tags.yml`);
    if (!/<!--\s*truncate\s*-->/.test(content)) warn(f, 'no <!-- truncate --> marker (blog list shows the whole post)');
    if (data.slug) {
      const s = String(data.slug);
      if (slugs.has(s)) err(f, `slug "${s}" also used by ${slugs.get(s)}`);
      slugs.set(s, f);
    } else if (queued) err(f, 'queued posts need an explicit slug (URL must not depend on the date)');
  }

  if (data.image) {
    const img = String(data.image);
    if (img.startsWith('/') && !fs.existsSync(path.join('static', img))) err(f, `image ${img} does not exist in static/`);
  } else if (queued) err(f, 'queued posts need a social card image (python3 scripts/publish/social-card.py <file>)');

  for (const m of content.matchAll(/!\[[^\]]*\]\((\/img\/[^)\s]+)\)/g)) {
    if (!fs.existsSync(path.join('static', m[1]))) err(f, `image ${m[1]} not found in static/`);
  }
  for (const m of content.matchAll(/!\[\s*\]\(/g)) warn(f, 'image with empty alt text');

  // Placeholders must not ship (code blocks may legitimately contain template text)
  const prose = content.replace(/^```[\s\S]*?^```/gm, '');
  for (const m of prose.matchAll(/\b(TODO|FIXME|TBD|XXX|lorem ipsum)\b|\[(?:insert|placeholder)[^\]]*\]/gi)) {
    strict(`leftover placeholder "${m[0]}"`, warn);
    break;
  }
  // Unlabelled code fences
  const fences = [...content.matchAll(/^```(\S*)\s*$/gm)];
  const opening = fences.filter((_, i) => i % 2 === 0);
  if (opening.some((m) => !m[1])) warn(f, 'code fence without a language tag');
  // Post structure (queued posts are strict; published posts only get advice when they opt in via post_type)
  if (data.post_type || queued) {
    const spec = TYPES[data.post_type];
    if (!spec) strict(`post_type must be one of ${Object.keys(TYPES).join(', ')} (got ${data.post_type ?? 'none'})`, warn);
    else {
      const prose = content.replace(/^```[\s\S]*?^```/gm, '');
      const words = prose.split(/\s+/).filter(Boolean).length;
      if (words < spec.min || words > spec.max) strict(`${words} words; ${data.post_type} posts run ${spec.min}-${spec.max}`, warn);
      if (spec.tldr && !/^:::tip\s+TL;DR/m.test(content)) strict('missing a ":::tip TL;DR" box near the top', warn);
      if (spec.takeaways && !/key takeaways/i.test(content)) strict('missing "Key takeaways" in the wrap-up', warn);
      if (spec.limits && !/^##\s+(what .+ is not|when not to use|limits|trade-?offs)/im.test(content))
        strict('missing a limits section (e.g. "What X is not" / "When not to use it")', warn);
      if (spec.visual && !/!\[|```mermaid/.test(content)) strict('no figure or Mermaid diagram', warn);
      if ((content.match(/^##\s+/gm) || []).length < 3) strict('fewer than 3 H2 sections', warn);
    }
  }
  // Style rules (advice everywhere)
  if (/^#{2,3}\s+[^\w\s#]/m.test(content.replace(/^```[\s\S]*?^```/gm, ''))) warn(f, 'emoji at the start of a heading (house style: plain headings)');
  if (/\[(here|click here|read more|this link)\]\(/i.test(content)) warn(f, 'non-descriptive link text ("here", "read more")');
  if (queued && !data.publish_order && !data.publish_on) warn(f, 'queued post has no publish_order/publish_on (released in filename-date order)');
}

for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\nlint: ${files.length} files, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
