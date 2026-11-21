#!/usr/bin/env bash
# Create an isolated git worktree + branch for one post, so your main checkout stays clean
# and several posts can be prepared in parallel.
#   scripts/publish/start-post.sh <slug>      -> ../my-journal-posts/<slug> on branch post/<slug>
set -euo pipefail
slug="${1:?usage: start-post.sh <slug>}"
root="$(git rev-parse --show-toplevel)"
dest="$root/../my-journal-posts/$slug"
cd "$root"
git fetch -q origin main
if [ -d "$dest" ]; then echo "$dest"; exit 0; fi
git worktree add -q "$dest" -b "post/$slug" origin/main
ln -s "$root/node_modules" "$dest/node_modules"
echo "$dest"
