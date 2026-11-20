#!/usr/bin/env bash
# Clean reinstall + cache clear, then start the site locally.
#
#   scripts/fresh-start.sh            # dev server (npm start), no search
#   scripts/fresh-start.sh serve      # production build + serve, search works
#   scripts/fresh-start.sh --skip-install [serve]   # skip `npm ci` for a faster restart
set -euo pipefail
cd "$(dirname "$0")/.."

skip_install=false
mode=dev
for arg in "$@"; do
  case "$arg" in
    --skip-install) skip_install=true ;;
    serve) mode=serve ;;
    dev) mode=dev ;;
    *) echo "Unknown argument: $arg" >&2; echo "Usage: $0 [--skip-install] [dev|serve]" >&2; exit 1 ;;
  esac
done

node_major=$(node -p 'process.versions.node.split(".")[0]')
if [ "$node_major" -lt 20 ]; then
  echo "Node 20+ is required (found $(node -v))." >&2
  exit 1
fi

# Free the port if an old dev/serve process is still running
if pids=$(lsof -ti tcp:3000 2>/dev/null) && [ -n "$pids" ]; then
  echo "Stopping process on port 3000 (PID $pids)..."
  kill $pids || true
  sleep 1
fi

if [ "$skip_install" = false ]; then
  echo "==> npm ci"
  npm ci
fi

echo "==> npm run clear"
npm run clear

if [ "$mode" = serve ]; then
  echo "==> npm run build"
  npm run build
  echo "==> npm run serve  (http://localhost:3000)"
  exec npm run serve
else
  echo "==> npm start  (http://localhost:3000)"
  exec npm start
fi
