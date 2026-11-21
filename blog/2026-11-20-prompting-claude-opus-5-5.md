---
slug: prompting-claude-opus-5-5
title: "Prompting Claude Opus 5.5: What to Stop Doing"
image: /img/social/prompting-claude-opus-5-5.png
date: 2026-11-20
draft: true
post_type: quick-take
publish_order: 1
authors:
  - dgopal
tags:
  - Claude
  - Prompt-Engineering
  - LLM
description: "Anthropic's guide to Claude Opus 5.5 says habits from older models now cost speed and tokens. Here is what to change, what the sources say, and what to test yourself."
---

# Prompting Claude Opus 5.5: What to Stop Doing

Anthropic published a guide called [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5), and [The Decoder's summary](https://the-decoder.com/anthropic-says-outdated-prompting-habits-are-slowing-down-claude-opus-5-5/) from November 14 put the headline plainly: prompting habits carried over from older models now slow the model down. Most of the advice is about removing things you added to make earlier models behave, not about new tricks.

This post is a close reading of those two sources, not a benchmark. The results come from Anthropic's own evaluations and I have not reproduced them. A follow-up will, with a script you can run yourself.

<!-- truncate -->

## What changed

| Old habit | What the sources say now | Source |
|---|---|---|
| Adding "think carefully" to prompts | Consider removing it in chat prompts | Official guide |
| Running at high effort by default | Start at medium, set it explicitly, test other levels | Official guide |
| Turning thinking off | Not possible on Opus 5.5 | Official guide |
| Draft first, then revise | State the goal, output format and when to check in; ask for the finished artifact | The Decoder |
| Transcribing tables and charts | Attach them as images or files | The Decoder |
| "Avoid a generic look" | Name the specific patterns to avoid | Both |

## Effort is the dial, not the prompt

The guide calls effort "the main control for how much Claude Opus 5.5 thinks." Opus 5.5 defaults to medium, where Opus 5 defaulted to high. Anthropic reports that at medium the new model matched or beat Opus 5 at high on agentic coding, in fewer steps and with fewer tokens, and matched or exceeded it on coding and knowledge work. On charts, even its lowest effort read values more accurately than Opus 5 at its highest.

On the phrase habit, Anthropic says that in its chat testing, removing a "think carefully" line made replies start sooner with no clear decline in quality. The model decides how much to think, so asking for more thinking in prose is the wrong lever. The guide says lowering effort cuts cost and latency more reliably than prompt instructions.

One caution from the guide: at the same effort value as Opus 5, Opus 5.5 can think more per turn, especially at `xhigh` and `max`. Do not carry your old setting across unchanged.

## Migration details the summary skips

These come from the official guide, not the news coverage:

- **Thinking is always on.** A request with `thinking: {"type": "disabled"}` that Opus 5 accepted at high effort or below returns a 400 error on Opus 5.5.
- **Thinking counts toward `max_tokens`**, and a thinking block can come first in the response with empty text under the default display setting. Code that assumes the first content block is text may break.
- **Changing the top-level effort between requests invalidates cached messages.** Changing effort per message is in beta and keeps the cache.

## Say the goal once

As The Decoder reports Anthropic's advice, put the goal, the output format and the conditions for checking back in a single message, and ask for the finished document or spreadsheet rather than a draft. This is my illustration, not Anthropic's wording:

```text
Goal: a one-page summary of the attached quarterly chart for the leadership team.
Output: Markdown with an executive summary, a data table and three action items.
Do not: use a cream or off-white background, or pill-shaped buttons.
Check in: only if a value in the chart is unreadable; otherwise deliver the final document.
```

The "do not" line follows the guide's point that a vague "avoid a generic look" just swaps one default for another, while naming specific patterns works better. For visual inputs, attach the image or file instead of retyping it; the guide adds that higher resolution helps, especially for technical drawings.

## Where to be careful

- **The numbers are Anthropic's, and mostly unpublished.** The Decoder reports no figures at all. The one measured figure I can point to in the guide is output tokens "more than 30 percent faster" than Opus 5. Everything else is qualitative.
- **The Sonnet versus Opus cost claim is secondhand.** The Decoder says a more capable model may finish in fewer steps, partly offsetting its higher per-token price, and that Sonnet at its highest settings can cost about as much as Opus 5.5. The official guide makes no such comparison. Measure your own workload before re-routing anything.
- **Effort names differ between the two sources.** The Decoder lists Medium, High, Extra High and Max, while the guide mentions `low`, `medium`, `xhigh` and `max`. The Anthropic Python SDK's types accept `low`, `medium`, `high`, `xhigh` and `max`, set as `output_config={"effort": ...}`, and the models API reports which levels a given model supports. Check that rather than hardcoding a value.

## What I would do about it

1. Search your prompts and system prompts for "think hard" and "think carefully". Remove them in chat-style prompts and compare the results.
2. Set effort explicitly, start at medium, and keep an eval per task so you can test other levels.
3. Audit code that disables thinking or reads the first content block as text.
4. Replace draft-then-revise loops with a single goal message where the task allows it.

I will publish a follow-up with measured latency and token counts from a script in the [code repo](https://github.com/dineshgopal29/the-agentic-advantage/tree/main/prompting-claude-opus-5-5), instead of repeating vendor claims.

**Discuss:** Have you changed your prompts since Opus 5.5? What got faster, and what got worse? Reply on LinkedIn.

**Related reading:** [Context Engineering: The Missing Layer in Agentic Applications](./2026-03-12-context-engineering.md) and [Using Jev With LangChain: Model Routing and Guardrails](./2026-10-12-jev-with-langchain.md), which covers routing requests by cost.

---

## References and Further Reading

- [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5) (Anthropic documentation)
- [Anthropic says outdated prompting habits are slowing down Claude Opus 5.5](https://the-decoder.com/anthropic-says-outdated-prompting-habits-are-slowing-down-claude-opus-5-5/) (The Decoder, November 14, 2026)
- [Using Claude Opus 5.5 as your daily driver for knowledge work](https://claude.com/resources/articles/using-claude-opus-5-5-as-your-daily-driver-for-knowledge-work) (Anthropic, linked from The Decoder)
- [Optimizing for cost and intelligence](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence) (Anthropic documentation, linked from The Decoder)
