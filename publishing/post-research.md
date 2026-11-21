# Post structure research

What well-regarded AI-engineering posts do, and how it maps to this journal. Compiled 2026-11-20 from reading six exemplar posts plus general writing advice.

**How to read this:** the exemplars were chosen because they are widely cited in the agents / context engineering / evals space, not because we measured their traffic. Word counts are the reading agent's estimates. Where a fetch was truncated, the finding is marked (partial). Treat the resulting template as a hypothesis to test against your own Search Console / analytics data, not a proven formula.

## Exemplars analysed

| Post | Length (est.) | Shape |
|---|---|---|
| [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (Anthropic) | ~2,700 words | Experience-claim + contrarian hook, definitions up front, "when (and when not) to use", one diagram per pattern, repeated "When to use / Examples" block, numbered principles in Summary, appendices with anecdotes |
| [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (Anthropic) | ~3,000 | Defines the new term vs the old (context vs prompt engineering), analogies ("attention budget", Goldilocks zone), principle statements, guidance ("do the simplest thing that works"), short conclusion |
| [Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/) (Hamel Husain) | ~3,500-4,000 | Credibility-first "Motivation", case study with a problem/solution arc, ordered maturity levels, real prompts and assertions, bold maxims, takeaways bullets, soft course pitch |
| [LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/) (Lilian Weng) (partial) | ~6,000-7,000; "31 min" | Reference-style: TOC, three-component taxonomy, ~13 captioned figures, case studies, challenges, heavy citations |
| [Patterns for Building LLM-based Systems & Products](https://eugeneyan.com/writing/llm-patterns/) (Eugene Yan) (partial) | very long | Pattern map up front, every pattern repeats "Why X? / More about X / How to apply X?", headings pair topic with purpose ("Evals: To measure performance") |
| [Context Engineering for AI Agents: Lessons from Building Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) (Manus) | ~2,000 | Dilemma hook, six imperative lessons ("Mask, Don't Remove"), war stories and admitted failures, first-hand numbers, named coinage, humble hedge, memorable last line |

## Patterns that recur

1. **Credibility or tension in the first two sentences.** An experience claim ("worked with dozens of teams") followed by a surprising or contrarian finding, or a dilemma. Not a definition and not "in today's fast-paced world".
2. **Define the term and draw the distinction early** (workflows vs agents; context vs prompt engineering), in bold, before any detail.
3. **A named idea the reader can repeat:** a principle ("treat context as a finite resource"), a taxonomy (planning / memory / tool use), levels (1-3), or a coinage. These are what get quoted and shared.
4. **One repeated sub-structure per item** so the reader learns the pattern once: diagram + "when to use" + examples; or Why / How / When not.
5. **A visual per concept.** Anthropic's agents post has eight diagrams; Weng has ~13 captioned figures; Hamel shows real screenshots.
6. **Decision guidance and honest limits.** "Start with the simplest thing", "when not to use", "None of what we've shared is universal truth."
7. **First-hand evidence:** real prompts, real numbers (token ratios, costs), failures and rebuilds, a case study. This is the strongest differentiator from generic AI-written content.
8. **Length by purpose.** Practitioner essays run about 2,000-4,000 words; encyclopedic reference pieces run 6,000+ with a TOC and citations.
9. **Endings are short and quotable:** a conclusion or takeaway bullets, a memorable closing line, at most a soft CTA. Hard sales pitches are rare and sit at the end.
10. **Headings carry the argument** (imperative or purpose-paired), so the outline alone tells the story.

## Cross-cutting advice from developer-writing guides (anecdotal, self-published)

Specific, problem-focused titles; real code and production examples; distribution matters as much as quality; end by inviting discussion; posts do not need to go viral to do their job. Sources: [daily.dev checklist](https://daily.dev/blog/checklist-writing-blogs-developers-read/), [freeCodeCamp: what 500 blog posts taught me](https://www.freecodecamp.org/news/what-500-blog-posts-taught-me-about-writing-great-articles/), [Refactoring English](https://refactoringenglish.com/excerpts/write-blog-posts-developers-read/), [draft.dev promotion checklist](https://draft.dev/learn/promotion). None offered measured data. Note that "what makes posts go viral" claims in these sources are opinion.

## This journal today (from the existing posts)

Strengths to keep: first person, practical; synthetic worked examples; "Figure N" captions; a limits section ("What Jev Is Not"); a "Wrapping Up" with the one idea; references with links; series links.

Gaps versus the exemplars: no TL;DR or takeaway list near the top; posts are shorter (1,000-2,000 words) with fewer named ideas; few first-hand numbers or failures; some generic titles ("Accessing LLMs"); no "when to use / when not" block; no discussion prompt or related-posts block at the end; no "updated on" signal in a fast-moving field; older posts use emoji in headings.
