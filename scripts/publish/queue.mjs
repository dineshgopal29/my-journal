#!/usr/bin/env node
// Show queued posts in release order with projected go-live dates.   npm run queue
import {config, loadContent, orderedQueue, lastPublishedDate, today, daysBetween, addDays} from './lib.mjs';

const items = loadContent();
const queue = orderedQueue(items);
const now = today();
const last = lastPublishedDate(items);
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const target = weekdays.indexOf(config.releaseWeekday);
const dow = (d) => new Date(d + 'T00:00:00Z').getUTCDay();
const nextReleaseDay = (from) => {
  let d = from;
  while (dow(d) !== target) d = addDays(d, 1);
  return d;
};

console.log(`Last published: ${last || 'n/a'} | cadence: every ${config.intervalDays} days, ${config.releaseWeekday} ${config.deployHourLocal}:00 ${config.timezone}`);
console.log(`Queue: ${queue.length} post(s)${queue.length < config.minQueueSize ? `  (below minimum of ${config.minQueueSize}: write more!)` : ''}\n`);
let cursor = last ? addDays(last, config.intervalDays) : now;
if (daysBetween(now, cursor) < 0) cursor = now;
queue.forEach((q, i) => {
  let when;
  if (q.data.publish_on) {
    when = nextReleaseDay(new Date(q.data.publish_on).toISOString().slice(0, 10));
    when += ' (publish_on)';
  } else {
    const d = nextReleaseDay(cursor);
    when = d;
    cursor = addDays(d, config.intervalDays);
  }
  console.log(`${String(i + 1).padStart(2)}. ${when.padEnd(24)} ${q.isBlog ? 'blog ' : 'guide'}  ${q.data.title}\n    ${q.file}`);
});
if (!queue.length) console.log('(empty) Drop a draft in drafts/inbox/ and run /publish-post');
