---
title: "Not Every Decision Needs an LLM: Meet Jev, a System One Model"
date: 2026-10-05
authors:
  - dgopal
categories:
  - AI
  - Agents
  - Agentic Systems
tags:
  - LLM
  - AI Agents
  - LLM Classifier
  - Multi-Agent Systems
  - Agent Design Patterns
  - Agentic Workflows
  - Financial Services
description: "What Jev is, what it is good at, and what it is not. A hands-on look at using a System One model as a cheap, fast classifier in loan processing."
---

# Not Every Decision Needs an LLM: Meet Jev, a System One Model

Most of us reach for a large LLM whenever a piece of software needs to "understand" something. Jev, from TypeSafe AI, is a different kind of building block: a **fast, cheap, general-purpose classifier** that sits between your deterministic code and your big LLMs.

In this post I'll walk through my notes on Jev, where it fits in an architecture, and then build a simple **loan-processing intake** example you can try in the Playground. A follow-up post covers using Jev inside LangChain agents.

<!-- truncate -->

---

## The Problem: Software Needs Judgement

Deterministic code is great at rules like:

- Is the invoice older than 30 days?
- Is the loan amount above $500,000?

It is terrible at questions like:

- Is this customer happy or frustrated?
- Does this email describe a hardship situation?
- Is this document a pay stub, a bank statement, or something else?

Historically you had two options, and both are painful:

1. **Train a traditional classifier.** Collect data, label it, build a model, and maintain it. The outcome is probabilistic, and every new question means a new project.
2. **Call a large LLM.** Flexible, but slow and expensive for what is often a one-word decision.

Jev gives us a third option.

---

## What Is Jev?

Jev is TypeSafe's flagship **System One model**: you send it some text (the *state*) and a set of typed *questions*, and it returns **structured answers your code can use directly**.

The way I think about it: Jev is a **new Lego brick** in the stack, a general-purpose classifier you can drop in wherever you used to write a brittle rule or call a heavyweight LLM.

![Where Jev fits: deterministic code, LLMs, then a general-purpose classifier](/img/post_14/jev-stack.svg)
*(Figure: Jev is a new building block alongside code and LLMs)*

### Semi-deterministic architecture

The pattern is simple:

![Jev takes complex conversational text, interprets it and returns a defined choice](/img/post_14/jev-flow.svg)
*(Figure: Jev turns messy text into a defined choice)*

Complex text goes in. A **defined choice** comes out, and your code takes it from there.

:::note Still probabilistic
Jev is *judgement*, not logic. It is still probabilistic and uses a transformer architecture under the hood. The difference is that the output is constrained to a typed answer plus probabilities, so your code stays in control of what happens next.
:::

---

## The Three Question Types

Jev answers three kinds of questions (TypeSafe calls them primitives):

| Type | Use it for | Returns |
|------|------------|---------|
| **Choice** | Pick one option from a defined set | The choice, a probability per option, and confidence |
| **Score** | Rate against ordered levels | A score, a probability per level, and confidence |
| **Noul** | A yes/no question | The probability the answer is yes |

You can mix all three in a single call and get every answer back at once.

---

## Use Case: Loan Application Intake

Jev's sweet spot is **complex input, simple output**: messy text goes in, a defined choice comes out, and your code takes it from there. A lender's intake desk is a perfect example. Loan-related emails and uploaded documents arrive all day, and someone (or something) has to decide:

- What kind of request is this?
- Is the borrower describing financial hardship?
- Does it need a human right now?
- Is the document package complete?

With a large LLM this is overkill. With rules it is fragile. Here is how the patterns from my notes map onto it:

| Pattern | In loan processing |
|---------|--------------------|
| **Intake router** | Classify each email or upload and send it to the right queue |
| **Document sorting at scale** | Label every pay stub, bank statement and ID in the catalog, not just a sample |
| **Guardrail for agents** | Gate risky actions, such as changing a loan status or sending a decision letter, before they run |
| **Orchestrator** | Decide which workflow or agent handles the case next |
| **In-product judgement** | Replace brittle `if/else` business rules inside the application UI |

We'll build the first one.

### The architecture

![Loan intake routing: Jev classifies each borrower email or document and routes it to a queue, or escalates when confidence is low](/img/post_14/loan-intake-flow.svg)
*(Figure: Loan intake routing with Jev)*

Jev does the cheap, high-volume triage. Anything it is unsure about is **escalated**, so the expensive model only sees the hard cases.

### The sample input

Here is the state I'll use (synthetic data, no real borrower information):

```plaintext
Subject: Re: Loan application #48213

Hi, I submitted my mortgage application two weeks ago and haven't heard anything.
I lost my job last month so my income has changed, and I'm worried the approval
will be pulled. My closing date is in 9 days. Please call me as soon as possible,
I have attached my latest pay stub and an offer letter from a new employer.
```

### The questions

```json
{
  "request_type": {
    "type": "choice",
    "instructions": "What is the borrower's primary request?",
    "criteria": {
      "new_application": "Submitting or updating a loan application",
      "status_inquiry": "Asking about progress of an existing application",
      "hardship": "Reporting a change in circumstances that affects ability to pay",
      "document_submission": "Sending supporting documents"
    }
  },
  "frustration": {
    "type": "score",
    "instructions": "How frustrated does the borrower appear?",
    "criteria": [
      "Calm, just stating facts",
      "Frustrated but civil",
      "Very angry, strong language"
    ]
  },
  "income_change": {
    "type": "noul",
    "instructions": "The borrower reports a change in income or employment"
  },
  "time_sensitive": {
    "type": "noul",
    "instructions": "The message conveys a deadline or time-sensitivity"
  }
}
```

### Try it in the Playground

1. Open the [TypeSafe Playground](https://console.typesafe.ai/playground) and log in.
2. Paste the sample email as the **state**.
3. Paste the questions JSON above.
4. Run it and review the typed answers.

![Playground input](/img/post_14/playground-input.png)
*(Figure 1: The email and questions pasted into the Playground)*

![Playground response](/img/post_14/playground-response.png)
*(Figure 2: Answers, probabilities and confidence for each question)*

### The response (shape)

The API returns one answer per question. This is the actual response from my Playground run:

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "request_type": {
      "type": "choice",
      "choice": "status_inquiry",
      "confidence": 0.95,
      "probabilities": {
        "new_application": 0,
        "document_submission": 0,
        "hardship": 0.04,
        "status_inquiry": 0.96
      },
      "stats": {}
    },
    "frustration": {
      "type": "score",
      "score": 0.92,
      "legend": {
        "0": "Calm, just stating facts",
        "1": "Frustrated but civil",
        "2": "Very angry, strong language"
      },
      "confidence": 0.89,
      "probabilities": {
        "0": 0.08,
        "1": 0.92,
        "2": 0
      },
      "stats": {}
    },
    "income_change": {
      "type": "noul",
      "noul": 0.99,
      "stats": {}
    },
    "time_sensitive": {
      "type": "noul",
      "noul": 0.99,
      "stats": {}
    }
  },
  "usage": {
    "input_tokens": 531,
    "output_tokens": 103
  },
  "request_id": "playground_145b26c4816b002446eb6b4eec39147b387",
  "evaluation_time_ms": 50.06397700344678
}
```

Look at what came back in about 50 ms:

- **Request type:** `status_inquiry` at 96%, with a small 4% hardship signal.
- **Frustration:** 0.92 on a 0-2 scale, so "frustrated but civil".
- **Income change** and **time-sensitive:** both 99% true.

The email is mostly a status inquiry, but the income change flag is what matters for routing. That is why the routing code below checks it first. Every answer also carries a probability and confidence, which brings us to the most useful part.

---

## Calling Jev From Code

Jev is a plain HTTP API, and there is a Python SDK (`pip install typesafe-sdk`, Python 3.10+) that reads `TYPESAFE_API_KEY` from the environment. You pass the same state and questions as in the Playground and get typed answers back: `response.answers["income_change"].noul`, `response.answers["request_type"].choice`, and so on.

### Let code stay in control

This is the design principle I like most: **Jev decides the interpretation, your code decides the action.**

```python
CONFIDENCE_FLOOR = 0.7

def route(response):
    a = response.answers

    # Hardship and income changes always go to a human specialist
    if a["income_change"].noul > 0.5:
        return "hardship_specialist"

    # Don't trust a shaky classification, escalate it
    if a["request_type"].confidence < CONFIDENCE_FLOOR:
        return "large_llm_or_human_review"

    routes = {
        "new_application": "underwriting_queue",
        "status_inquiry": "self_service_reply",
        "hardship": "hardship_specialist",
        "document_submission": "document_intake",
    }
    queue = routes[a["request_type"].choice]

    # A closing date in days should jump the queue
    if a["time_sensitive"].noul > 0.5:
        queue += ":priority"
    return queue
```

Three things to notice:

- The **business rules stay in code**, where they are testable and auditable. That matters in regulated financial services.
- **Confidence** gives you a principled escalation path instead of a blind guess.
- Jev's job is narrow, so it can be fast and cheap.

---

## Build It With a Coding Agent

TypeSafe ships an **agent skill** so a coding agent can learn the API while you build (you'll need an API key from the TypeSafe console first). In Claude Code:

```bash
claude plugin marketplace add typesafe-ai/skills
claude plugin install typesafe@typesafe-ai
```

Then ask it to build the intake classifier, for example: *"Build a CLI that classifies loan emails by request type, income change and urgency, and routes low-confidence results to a review file. Ask me questions first."*

![Claude Code building the loan triage CLI with the TypeSafe skill](/img/post_14/claude-code-skill.png)
*(Figure: Claude Code using the TypeSafe skill to build the classifier CLI)*

The CLI it produced is on GitHub: [`triage.py`](https://github.com/dineshgopal29/the-agentic-advantage/blob/main/jev_loan_triage_cli/triage.py). It classifies a folder of loan emails, prints a results table, and writes a review file for low-confidence cases.

---

## The Economics: Cheap Intelligence

The headline benefit is cost. In my notes, input tokens are what you pay for, and **output tokens are cheap**, because the answers are short, typed values rather than paragraphs of prose.

<!-- TODO: confirm the exact per-token pricing on the TypeSafe pricing page before publishing, my handwritten note is ambiguous on units. -->

Cheap enough that you can run a classifier over your **entire catalog** (every email, every document, every claim note) instead of sampling. Jev means cheap intelligence.

### Jevons paradox

There is a nice irony in the name. William Stanley Jevons, a 19th-century economist, observed that **greater efficiency expands use enough to increase total consumption**. Make a decision cheap, and you will make far more decisions. Expect your AI usage to go *up*, not down, because use cases that were never worth a large LLM call suddenly are.

---

## What Jev Is Not

Jev is **not perfect, and not a good fit for everything.** It shines at routing, triage and tagging: high-volume, narrow decisions. It is the wrong tool for open-ended reasoning or generating long-form content.

For **complex decisions, a large LLM still wins**. A credit decision on a complicated borrower profile is not a job for a classifier. Jev's role is to make sure the large model only sees the cases that need it.

---

## So, a New Design Paradigm?

I'd say it is a genuinely useful **new layer**, rather than a replacement for what we have:

1. **Deterministic code** for rules and control flow
2. **System One (Jev)** for fast, cheap, structured judgement
3. **Large LLMs and agents** for deep reasoning

The shift is that "judgement" becomes an ordinary building block, something you call like any other function, with a typed result and a confidence score.

---

## References and Further Reading

- 📘 [TypeSafe AI Quick Start](https://docs.typesafe.ai/introduction/quickstart)
- 📘 [TypeSafe AI Documentation Index](https://docs.typesafe.ai/llms.txt)
- 🧪 [TypeSafe Playground](https://console.typesafe.ai/playground)
- 💻 [Sample code: loan email triage CLI](https://github.com/dineshgopal29/the-agentic-advantage/blob/main/jev_loan_triage_cli/triage.py)
- 🔧 [TypeSafe agent skill on GitHub](https://github.com/typesafe-ai/skills)
- 🦜 Next in the series: [Using Jev With LangChain](./2026-10-12-jev-with-langchain.md)
- Previous post in the series: [Getting Started with Context Engineering for Agentic Applications](./2026-03-12-context-engineering.md)
