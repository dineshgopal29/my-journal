# Publishing

Cadence and behaviour: `config.json`. Queue = posts with `draft: true` merged to `main`. The `Publish queue` workflow opens a release PR on release day (Tuesday 8:00 AM America/Chicago) and merges it at 8:00 PM (unless it has the `hold` label), then deploys. `social/<slug>.md` holds the LinkedIn text that is copied into the release PR.

Commands: `npm run queue`, `npm run release:dry`, `npm run lint:content`, `npm run check:drafts`, `npm run card -- <file>`. The `/publish-post` skill (`.claude/skills/publish-post/`) does the drafting work.
