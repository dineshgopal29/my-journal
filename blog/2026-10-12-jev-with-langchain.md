---
title: "Using Jev With LangChain: Model Routing and Guardrails"
image: /img/social/jev-with-langchain.png
date: 2026-10-12
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
  - LangChain
  - Agent Design Patterns
  - Financial Services
description: "Use Jev, a System One classifier, inside LangChain agents for cheap model routing and pre-tool guardrails, with loan-processing examples."
---

# Using Jev With LangChain: Model Routing and Guardrails

In the [previous post](./2026-10-05-is-jev-new-design-paradigm.md) we looked at what Jev is, a fast, cheap System One classifier, and used it to triage loan application emails. Here we plug it into a **LangChain agent**, where it does two jobs well: choosing which model should handle a request, and blocking risky tool calls before they run.

<!-- truncate -->

---

## Jev as a LangChain Classifier

If you build agents with LangChain, you don't have to call the HTTP API yourself. The `langchain-typesafe` package exposes Jev as a `TypeSafeClassifier`, so you pass state and questions to `.invoke()` and get classification results back instead of a chat response.

```bash
pip install langchain-typesafe
export TYPESAFE_API_KEY=<your key>
```

Here is the loan intake triage again, this time through LangChain. Pass the state and the questions together in each call:

```python
from langchain_typesafe import Choice, Noul, Score, TypeSafeClassifier

QUESTIONS = {
    "request_type": Choice(
        instructions="What is the borrower's primary request?",
        criteria={
            "new_application": "Submitting or asking to start a new loan or refinance application",
            "status_inquiry": "Asking about the progress of an existing application",
            "hardship": "Reporting a change in circumstances that affects ability to pay",
            "document_submission": "Sending supporting documents for an application",
        },
    ),
    "income_change": Noul(
        instructions="The borrower reports a loss of or reduction in income or employment",
    ),
    "urgency": Score(
        instructions="How time-sensitive is this request?",
        criteria=[
            "No deadline, can wait",
            "Some time pressure, should be handled this week",
            "Hard deadline or explicit demand for immediate action",
        ],
    ),
}

classifier = TypeSafeClassifier()  # reads TYPESAFE_API_KEY

response = classifier.invoke({"state": email, "questions": QUESTIONS})

response.choices["request_type"].choice       # "hardship"
response.choices["request_type"].confidence   # 0.95
response.nouls["income_change"].noul          # 0.99
response.scores["urgency"].score              # 1.96
```

Answers are grouped by type (`choices`, `nouls`, `scores`) and keyed by your question IDs. The response also carries token `usage` and the TypeSafe `request_id`.

### It's a Runnable

`TypeSafeClassifier` is a normal LangChain `Runnable`, so everything you already use works.

**LangChain messages as state.** Pass a conversation directly, with no manual conversion:

```python
from langchain_core.messages import AIMessage, HumanMessage

conversation = [
    HumanMessage("Hi, I applied for a mortgage two weeks ago."),
    AIMessage("Thanks for reaching out. How can I help?"),
    HumanMessage(email),
]
response = classifier.invoke({"state": conversation, "questions": QUESTIONS})
```

**Batching.** Classify many emails in one call:

```python
responses = classifier.batch([{"state": e, "questions": QUESTIONS} for e in emails])
```

**Composing in a chain.** Classify, then route with plain code:

```python
from langchain_core.runnables import RunnableLambda

triage_chain = (
    RunnableLambda(lambda email: {"state": email, "questions": QUESTIONS})
    | classifier
    | RunnableLambda(route)  # your routing function
)

triage_chain.invoke(email)  # "hardship_specialist:priority"
```

The full runnable sample, covering all four patterns, is on GitHub: [`loan_triage_classifier.py`](https://github.com/dineshgopal29/the-agentic-advantage/blob/main/jev_langchain/loan_triage_classifier.py).

The `route` function is the same one from the [previous post](./2026-10-05-is-jev-new-design-paradigm.md): hardship goes to a specialist, low confidence goes to review, and a high urgency score adds `:priority`.

![LangChain TypeSafeClassifier run output](/img/post_15/langchain-classifier-run.png)
*(Figure: Running the LangChain classifier sample)*

:::note Experimental middleware
The two middleware examples below come from the [LangChain post on building a harness with Jev](https://www.langchain.com/blog/building-a-harness-with-jev). They live under `langchain_typesafe.experimental`, so expect the API to change. They also need the experimental extra and a chat-model provider: `pip install "langchain-typesafe[experimental]" langchain-openai`. Check the [LangChain integration docs](https://docs.langchain.com/oss/python/integrations/providers/typesafe) before you ship anything.
:::

### Model routing: don't pay for a big model on a simple question

A "what's my application status?" message doesn't need the same model as "explain why this debt-to-income calculation changed after the new pay stub." Model-routing middleware lets Jev assess the latest user message and pick the model, using criteria you define.

```python
from langchain.agents import create_agent
from langchain_typesafe.experimental.middleware import (
    ModelChoice,
    ModelRouterMiddleware,
)

router = ModelRouterMiddleware(
    choices={
        "fast": ModelChoice(
            model="openai:gpt-5.6-terra",
            criteria="Status lookups, document extraction, and simple FAQs.",
        ),
        "powerful": ModelChoice(
            model="openai:gpt-6-astra",
            criteria="Underwriting exceptions and high-stakes decisions.",
        ),
    },
    instructions="Choose the least costly model that can complete the task.",
)

agent = create_agent("openai:gpt-5.6-terra", middleware=[router])
```

The router selects a model from the latest user message and uses it for the rest of the run. The probabilities and confidence stay available in agent state, so you can log them for audit. (The model names are the ones in the LangChain docs. Swap in the models you actually use.)

### Auto mode: a guardrail before tools run

Agents can receive bad instructions, by accident or from an attacker, and be talked into actions you never wanted. In financial services that might mean an agent that can send a decision letter, change a loan status, or delete a record.

`AutoModeMiddleware` uses Jev to check tool calls for risky decisions and **block them before the tool executes**. This is the "gate before a risky action" pattern from earlier, packaged as middleware.

```python
from langchain.agents import create_agent
from langchain.tools import tool
from langchain_typesafe.experimental.middleware import AutoModeMiddleware


@tool
def send_decision_letter(application_id: str, decision: str) -> str:
    """Send the final approve/deny letter to the borrower. Cannot be undone."""
    return f"Letter sent for {application_id}: {decision}"


agent = create_agent(
    "openai:gpt-6-astra",
    tools=[send_decision_letter],
    middleware=[AutoModeMiddleware(tools=[send_decision_letter])],
)
```

Only the tools you list are classified, and you can pass tool names or tool objects. A call judged risky or insufficiently authorized returns an error `ToolMessage` instead of running the tool, so the agent sees the refusal and can respond to it. You can override the middleware's `instructions` or pass `criteria=NoulCriteria(true=..., false=...)` to describe risk for your own tools.

:::warning It refuses, it doesn't ask
This middleware blocks risky calls. It does not request approval. For anything like a decision letter, pair it with LangChain's human-in-the-loop middleware so a person can approve. Also avoid putting secrets in tool arguments, since they are sent to TypeSafe for classification.
:::

---

## Wrapping Up

Both patterns share one idea: **spend a cheap classifier call to avoid an expensive or risky one.** The router saves model cost on routine requests, and the guardrail catches bad tool calls before they have side effects.

Jev isn't a replacement for the LLM driving your agent. It handles the fast, structured decisions along the way, and the large model handles open-ended reasoning.

---

## References and Further Reading

- 💻 [Sample code: loan_triage_classifier.py](https://github.com/dineshgopal29/the-agentic-advantage/blob/main/jev_langchain/loan_triage_classifier.py)
- 🦜 [LangChain: Building a Harness with Jev](https://www.langchain.com/blog/building-a-harness-with-jev)
- 📘 [TypeSafe AI Quick Start](https://docs.typesafe.ai/introduction/quickstart)
- 🧪 [TypeSafe Playground](https://console.typesafe.ai/playground)
- Previous post: [Not Every Decision Needs an LLM: Meet Jev](./2026-10-05-is-jev-new-design-paradigm.md)
