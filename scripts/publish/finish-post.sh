#!/usr/bin/env bash
# Remove a post's worktree and local branch once its PR is merged (or abandoned).
#   scripts/publish/finish-post.sh <slug>
set -euo pipefail
slug="${1:?usage: finish-post.sh <slug>}"
root="$(git rev-parse --show-toplevel)"
cd "$root"
dest="$root/../my-journal-posts/$slug"
[ -d "$dest" ] && { rm -f "$dest/node_modules"; git worktree remove --force "$dest"; }
git branch -D "post/$slug" 2>/dev/null || true
git worktree prune
echo "cleaned up post/$slug"
