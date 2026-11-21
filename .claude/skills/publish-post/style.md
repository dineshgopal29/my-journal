# House style (distilled from the published posts; update when the author edits a PR)

**Voice.** First person, practical, conversational but precise. "I'll walk through...", "Here is the state I'll use...". Explains the why before the how. Admits limits ("What Jev Is Not"). Opinions are stated plainly, not hedged, and not hyped.

**What the best AI-engineering posts do (see `publishing/post-research.md`).** Open with an experience claim or tension plus a surprising finding. Define the term and draw the distinction early. Give the reader a named idea to repeat (a principle, taxonomy, or levels). Use one repeated sub-structure per item, one visual per concept, honest "when not to use" limits, and first-hand evidence (real numbers, failures, prompts). End short and quotable. These are folded into the templates; keep them even when the draft is rough.

**Structure (newer posts, preferred).**
1. H1 = title, then a `:::tip TL;DR` box (2-4 bullets). Short hook (2-3 sentences): experience or tension plus the surprising claim.
2. One paragraph on what the post covers; mention the series or follow-up if there is one.
3. `<!-- truncate -->`
4. H2 sections with plain-text headings (no emoji in headings; older posts used them, do not copy that). Concrete example early. Short paragraphs, bullets for lists of parallel items.
5. A limits section ("What X is not" / "When not to use it"). `---` then **Wrapping Up**: the one named idea, **Key takeaways** (3 bullets), a next step, a **Discuss** line, **Related reading**.
6. `---` then **References and Further Reading**: bullets, optionally with a leading emoji per link (sample code, docs, playground, previous post).

**Details.**
- Figures: `![alt](/img/posts/<slug>/x.png)` followed by `*(Figure N: caption)*` on its own line.
- Callouts: Docusaurus admonitions `:::tip`, `:::warning`, `:::info` work in blog and docs (not on `src/pages`). Use sparingly, for real warnings.
- Code: always a language tag; show expected output right after code; explain non-obvious lines in prose, not comments.
- Bold for the key term on first use, not for emphasis everywhere. No exclamation marks. Avoid filler like "In today's fast-paced world".
- Link text must be descriptive ("the TypeSafe quick start"), never "here" or "read more".
- Titles: <= 60 chars, keyword first, may use a colon ("Context Engineering: The Missing Layer in Agentic Applications"). Descriptions: 120-160 chars, say what the reader will be able to do or understand.
- Technical guides add: Prerequisites, numbered steps, a "What you should see" output block, Troubleshooting, and a link to the code folder.
- Series posts end with a link to the previous post and, when known, the next.

**Topics this journal covers.** AI technology and design philosophy: agents and agentic workflows, context engineering, harness engineering, RAG, evaluation, guardrails and responsible AI, AWS AI services. Frame everything as design trade-offs a practitioner can use.
