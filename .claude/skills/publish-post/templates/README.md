# Post templates

Pick the template whose `post_type` fits the draft, copy its skeleton, fill it from the author's content, and delete every `<!-- guide -->` comment. Every type shares the same frame; only the middle changes.

| post_type | Use when | Words | Cadence suggestion |
|---|---|---|---|
| `essay` | A concept or design philosophy (context engineering, harness engineering) | 1,800-2,800 | most posts |
| `guide` | Step-by-step build the reader can reproduce | 1,500-3,000 | every 2nd-3rd post |
| `field-notes` | Lessons from building/running something, with failures and numbers | 1,200-2,200 | between big posts |
| `reference` | A hub that maps a topic (patterns, taxonomy, comparison); kept updated | 3,000-5,000 | quarterly |
| `quick-take` | A reaction or single sharp idea | 500-900 | fills gaps |

## The shared frame (all types except quick-take, which drops the starred items)

1. Title (<= 60 chars; specific promise; keyword first). Description 120-160 chars.
2. `:::tip TL;DR` box with 2-4 bullets: the thesis, who it is for, what they can do after reading.*
3. Hook, <= 120 words: an experience claim or tension plus a surprising finding. Never a definition, never "in today's fast-paced world".
4. "In this post" (3 bullets) and the series link. Then `<!-- truncate -->`.
5. Define the key term in bold and draw the distinction early.*
6. Type-specific body (see each template).
7. **What X is not / When not to use it**: honest limits and trade-offs.*
8. `---` **Wrapping Up**: the one named idea, then **Key takeaways** (3 bullets), then one next step.*
9. **Discuss**: one line inviting a reply (LinkedIn), plus **Related reading** (2-3 internal links).
10. `---` **References and Further Reading**.

## Evidence rule (non-negotiable)

Every post needs at least one first-hand artifact **supplied by the author**: a real number, a prompt or output they ran, a failure, a screenshot, a measurement. If the draft has none, ask the author for one before writing. Never invent one. If they truly have none, say so in the PR's "Verify before merge" list and keep the post short and clearly framed as a design opinion.
