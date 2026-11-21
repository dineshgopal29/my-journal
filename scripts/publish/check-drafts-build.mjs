#!/usr/bin/env node
// Production builds exclude `draft: true` content, so a broken queued post would only
// fail on release day. This builds a temporary copy of the site with drafts switched on.
//   node scripts/publish/check-drafts-build.mjs     (no-op when the queue is empty)
import fs from 'fs';
import os from 'os';
import path from 'path';
import {spawnSync} from 'child_process';
import {loadContent} from './lib.mjs';

const drafts = loadContent().filter((i) => i.queued);
if (!drafts.length) {
  console.log('no queued drafts, nothing to check');
  process.exit(0);
}
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'drafts-build-'));
const skip = new Set(['node_modules', 'build', '.docusaurus', '.git', 'drafts', 'tasks']);
fs.cpSync('.', tmp, {recursive: true, filter: (src) => !skip.has(path.basename(src)) || src === '.'});
fs.symlinkSync(path.resolve('node_modules'), path.join(tmp, 'node_modules'), 'dir');
for (const d of drafts) {
  const f = path.join(tmp, d.file);
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/^draft:\s*true\s*$/m, 'draft: false'));
}
console.log(`building ${drafts.length} queued post(s) as if released (temp copy: ${tmp})`);
const r = spawnSync('npx', ['docusaurus', 'build'], {cwd: tmp, stdio: 'inherit'});
fs.rmSync(tmp, {recursive: true, force: true});
if (r.status !== 0) {
  console.error('\nQueued content does NOT build when released. Fix it before merging.');
  process.exit(1);
}
console.log('queued content builds cleanly');
