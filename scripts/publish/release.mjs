#!/usr/bin/env node
// Release the next queued post: flips `draft: true` off and stamps today's date.
//   node scripts/publish/release.mjs --dry-run      # report what would happen
//   node scripts/publish/release.mjs                # edit the file in place
//   node scripts/publish/release.mjs --force        # ignore the cadence interval
//   node scripts/publish/release.mjs --now 2026-12-08   # pretend today is this date
// Prints a JSON result on the last line so workflows can read it.
import fs from 'fs';
import {config, loadContent, orderedQueue, lastPublishedDate, today, daysBetween} from './lib.mjs';

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const nowArg = args.includes('--now') ? args[args.indexOf('--now') + 1] : undefined;
const dryRun = flag('--dry-run');
const force = flag('--force');

const items = loadContent();
const queue = orderedQueue(items);
const now = today(nowArg);
const last = lastPublishedDate(items);
const sinceLast = last ? daysBetween(last, now) : null;
const result = {due: false, reason: '', queueSize: queue.length, today: now, lastPublished: last};

const next = queue.find((q) => !q.data.publish_on || new Date(q.data.publish_on).toISOString().slice(0, 10) <= now);
if (!queue.length) result.reason = 'queue is empty';
else if (!next) result.reason = `next post is scheduled for ${new Date(queue[0].data.publish_on).toISOString().slice(0, 10)}`;
else if (!force && !next.data.publish_on && sinceLast !== null && sinceLast < config.intervalDays)
  result.reason = `last post went out ${sinceLast} day(s) ago (interval is ${config.intervalDays})`;
else {
  result.due = true;
  result.file = next.file;
  result.title = next.data.title;
  result.slug = next.data.slug || null;
  result.permalink = next.permalink;
  result.type = next.isBlog ? 'blog' : 'guide';
  result.remainingAfter = queue.length - 1;
  const base = next.file.replace(/^(blog|docs\/[^/]+)\//, '').replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  result.socialFile = `publishing/social/${next.data.slug || base}.md`;
  if (!dryRun) {
    let text = fs.readFileSync(next.file, 'utf8');
    const m = text.match(/^---\n([\s\S]*?)\n---\n/);
    let fm = m[1];
    fm = fm.replace(/^draft:\s*true\s*\n?/m, '').replace(/^publish_on:.*\n?/m, '').replace(/^publish_order:.*\n?/m, '');
    if (/^date:/m.test(fm)) fm = fm.replace(/^date:.*$/m, `date: ${now}`);
    else fm = fm.replace(/^(title:.*)$/m, `$1\ndate: ${now}`);
    fs.writeFileSync(next.file, text.replace(m[1], fm.replace(/\n+$/, '')));
  }
}
console.error(
  result.due
    ? `${dryRun ? 'would release' : 'released'}: ${result.title} (${result.file})`
    : `nothing to release: ${result.reason}`,
);
console.log(JSON.stringify(result));
