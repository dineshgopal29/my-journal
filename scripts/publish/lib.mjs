// Shared helpers for the publishing scripts.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const config = JSON.parse(fs.readFileSync('publishing/config.json', 'utf8'));

export function walk(dir) {
  return fs.existsSync(dir)
    ? fs.readdirSync(dir, {withFileTypes: true}).flatMap((e) => {
        const p = path.join(dir, e.name);
        return e.isDirectory() ? walk(p) : /\.mdx?$/.test(e.name) ? [p] : [];
      })
    : [];
}

/** All blog posts and guides with parsed frontmatter. */
export function loadContent() {
  return [...walk('blog'), ...walk('docs')].map((file) => {
    const {data} = matter(fs.readFileSync(file, 'utf8'));
    const isBlog = file.startsWith('blog/');
    const base = path.basename(file).replace(/\.mdx?$/, '');
    const name = base.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    const dateFromName = (base.match(/^(\d{4}-\d{2}-\d{2})/) || [])[1];
    const date = data.date ? new Date(data.date).toISOString().slice(0, 10) : dateFromName;
    let permalink;
    if (isBlog) {
      permalink = data.slug
        ? `/blog/${String(data.slug).replace(/^\//, '')}`
        : `/blog/${(date || '').replace(/-/g, '/')}/${name}`;
    } else {
      permalink = '/' + file.replace(/^docs\//, '').replace(/\.mdx?$/, '');
    }
    return {file, data, isBlog, date, permalink, queued: data.draft === true};
  });
}

/** Today's date (YYYY-MM-DD) in the configured timezone, or an override. */
export function today(override) {
  if (override) return override;
  return new Intl.DateTimeFormat('en-CA', {timeZone: config.timezone}).format(new Date());
}

export function daysBetween(a, b) {
  return Math.round((new Date(b + 'T00:00:00Z') - new Date(a + 'T00:00:00Z')) / 86400000);
}

export function addDays(d, n) {
  const t = new Date(d + 'T00:00:00Z');
  t.setUTCDate(t.getUTCDate() + n);
  return t.toISOString().slice(0, 10);
}

/** Queue in release order. Explicit publish_on first (soonest), then publish_order, then filename. */
export function orderedQueue(items) {
  const key = (i) => [
    i.data.publish_on ? new Date(i.data.publish_on).toISOString().slice(0, 10) : '9999-12-31',
    String(i.data.publish_order ?? 9999).padStart(6, '0'),
    path.basename(i.file),
  ];
  return items.filter((i) => i.queued).sort((a, b) => key(a).join('|').localeCompare(key(b).join('|')));
}

export function lastPublishedDate(items) {
  const dates = items.filter((i) => !i.queued && i.date).map((i) => i.date);
  return dates.sort().at(-1);
}
