---
title: "Understanding AI Agent & Design Patterns"
date: 2026-01-19
authors:
  - dgopal
categories:
  - AI
  - Agents
  - Agentic Systems
tags:
  - LLM
  - AI Agents
  - CrewAI
  - Multi-Agent Systems
  - Agent Design Patterns
  - Agentic Workflows
  - LangChain
description: "Learn what AI agents are, how they differ from traditional applications, and explore practical agent design patterns including reflection, planning, and tool-augmented agents using CrewAI."
---

# Understanding AI Agent & Design Patterns

## Introduction

As AI systems evolve beyond simple question-answer interactions, **agentic AI patterns** are emerging as powerful architectural approaches for solving complex problems. This post explores four fundamental patterns using a practical example: building a multi-agent system that researches coffee beans and creates latte recipes.

We'll examine real code that demonstrates how different agent patterns work together, moving from simple single-agent systems to sophisticated multi-agent orchestrations.

## What Are Agentic AI Patterns?

Agentic AI refers to AI systems that can autonomously pursue goals, make decisions, and use tools to accomplish tasks. Unlike traditional chatbots that simply respond to queries, agentic systems can:

- Break down complex problems into steps
- Use external tools (web search, APIs, databases)
- Reflect on and improve their own outputs
- Collaborate with other specialized agents

## The Example: Coffee Research & Recipe Generation

Our example system uses [CrewAI](https://github.com/joaomdmoura/crewAI), a framework for orchestrating multi-agent AI systems, to explore coffee bean types and generate tailored latte recipes. Let's examine four key patterns.

## Pattern 1: Single Agent (Baseline)

**What it is:** The simplest pattern - one agent handles the entire task from start to finish.

```python
single_agent = Agent(
    role="Coffee Enthusiast",
    goal="Learn about coffee beans and create latte recipes",
    backstory="You love coffee and enjoy experimenting with latte recipes.",
    llm=llm,
    verbose=True
)

single_task = Task(
    description=(
        "Explain common coffee bean types and create one latte recipe "
        "that works well for each type."
    ),
    expected_output="Explanation followed by multiple latte recipes.",
    agent=single_agent
)
```

![Results](/img/post_12/3.png)
![Results](/img/post_12/4.png)
*(Figure 1: Results)*

**When to use:**
- Simple, well-defined tasks
- Single domain of expertise required
- Quick prototyping

**Advantages:**
- Simple to implement
- Fast execution
- Easy to debug

**Limitations:**
- No specialization
- No quality control
- Limited problem-solving capability

## Pattern 2: Planner → Executor

**What it is:** Separates planning from execution. One agent creates a structured plan, another executes it.

```python
planner_agent = Agent(
    role="Planner Agent",
    goal="Break down the coffee learning problem into clear steps",
    backstory="You excel at decomposing problems into structured plans.",
    llm=llm,
    verbose=True
)

executor_agent = Agent(
    role="Executor Agent",
    goal="Execute the plan and generate high-quality latte recipes",
    backstory="You follow plans carefully and execute with precision.",
    llm=llm,
    verbose=True
)
```
![Results](/img/post_12/5.png)
![Results](/img/post_12/6.png)
![Results](/img/post_12/7.png)
*(Figure 2: Results)*

**Why it matters:**
This pattern mirrors how humans solve complex problems - we plan first, then execute. The separation of concerns leads to:

1. **Better structure** - The planner creates a logical roadmap
2. **Clearer execution** - The executor focuses on implementation
3. **Easier debugging** - You can identify if issues stem from poor planning or execution

**Real-world applications:**
- Software development (architecture → implementation)
- Content creation (outline → writing)
- Project management (planning → delivery)

## Pattern 3: Tool-Augmented Research Agent

**What it is:** Agents equipped with external tools to access real-time information and capabilities beyond their training data.

```python
research_agent = Agent(
    role="Coffee Research Agent",
    goal="Research coffee beans using the web",
    backstory="You research coffee origins, flavors, and roast profiles.",
    tools=[web_search_tool],  # ← External tool integration
    llm=llm,
    verbose=True
)

research_task = Task(
    description=(
        "Research Arabica, Robusta, Liberica, and Excelsa coffee beans. "
        "Include flavor notes and ideal brewing characteristics."
    ),
    expected_output="A structured research summary for each bean type.",
    agent=research_agent
)
```

![Results](/img/post_12/8.png)
![Results](/img/post_12/9.png)
*(Figure 3: Results)*

**The power of tools:**
Without tools, LLMs are limited to their training data (often months or years old). With tools, agents can:

- Access current information via web search
- Query databases
- Execute code
- Call APIs
- Interact with external systems

In our example, the `SerperDevTool` enables real-time web searches, ensuring the agent provides current, accurate information about coffee beans rather than relying on potentially outdated training data.

**Common tool categories:**
- **Information retrieval:** Web search, database queries, file readers
- **Computation:** Code execution, calculators, data processing
- **Communication:** APIs, webhooks, messaging systems
- **Creation:** File writers, image generators, document creators

## Pattern 4: Critic / Reflection Agent

**What it is:** A specialized agent that evaluates and improves the work of other agents.

```python
critic_agent = Agent(
    role="Coffee Critic",
    goal="Evaluate latte recipes and suggest improvements",
    backstory="You are a professional coffee critic with refined taste.",
    llm=llm,
    verbose=True
)

critic_task = Task(
    description=(
        "Review the generated latte recipes and suggest improvements "
        "for balance, flavor pairing, and clarity."
    ),
    expected_output="Actionable feedback and refined recipe suggestions.",
    agent=critic_agent
)
```
![Results](/img/post_12/10.png)
![Results](/img/post_12/11.png)
![Results](/img/post_12/12.png)
*(Figure 4: Results)*

**Why reflection matters:**
This pattern implements a quality control loop, similar to code review in software development or editorial review in publishing. The critic:

1. **Evaluates outputs** against quality criteria
2. **Identifies weaknesses** in reasoning or execution
3. **Suggests improvements** for iteration
4. **Ensures quality** before final delivery

**Benefits:**
- Higher quality outputs
- Self-correction capabilities
- Reduced hallucinations
- More robust solutions

**Real-world parallels:**
- Code review processes
- Editorial workflows
- Quality assurance testing
- Peer review in research

## Orchestrating Multiple Patterns: The Crew

The real power emerges when combining these patterns:

```python
crew = Crew(
    agents=[
        single_agent,
        planner_agent,
        executor_agent,
        research_agent,
        critic_agent
    ],
    tasks=[
        single_task,
        planning_task,
        execution_task,
        research_task,
        critic_task
    ],
    process=Process.sequential,  # Execute tasks in order
    verbose=True
)
```

**Execution flow:**

1. **Single Agent** provides a baseline approach
2. **Planner Agent** creates a structured plan
3. **Executor Agent** implements the plan
4. **Research Agent** gathers current, accurate information
5. **Critic Agent** reviews and refines the output

This sequential process ensures each agent builds on previous work, creating a sophisticated pipeline from initial concept to polished output.

## Implementation Details

### Local LLM with Ollama

The code uses a locally-run LLM via Ollama:

```python
llm = LLM(model="ollama/llama3.1:latest", base_url="http://localhost:11434")
```

**Why local?**
- Privacy and data control
- No API costs
- Faster iteration during development
- Offline capability

### Logging and Output Formatting

The script includes sophisticated logging that captures the entire agent workflow and formats it as readable Markdown:

```python
def format_logs_to_markdown(logs):
    """Format raw logs into readable markdown sections"""
    # Converts raw agent logs into structured markdown
    # with sections for each agent, their thoughts, actions, and observations
```

This produces output files like `agent_patterns_output_20260119_143022.md` containing:
- Execution timestamps
- Agent-by-agent breakdowns
- Thought processes
- Actions taken
- Final outputs

**Why this matters:** Understanding how agents think and make decisions is crucial for debugging and improving agentic systems.

## Key Takeaways

### 1. **Pattern Selection Matters**
Choose patterns based on task complexity:
- Simple tasks → Single agent
- Complex tasks → Multi-agent with specialization

### 2. **Specialization Improves Results**
Dedicated agents (planner, executor, critic) outperform generalists for complex workflows.

### 3. **Tools Extend Capabilities**
Agents with tools can access current information and perform actions beyond their training.

### 4. **Reflection Enhances Quality**
Critic agents provide a quality control loop, catching errors and suggesting improvements.

### 5. **Orchestration Is Key**
The framework (CrewAI) handles coordination, letting you focus on agent design and task definition.

## Practical Applications

These patterns apply across domains:

**Software Development:**
- Planner → designs architecture
- Executor → writes code
- Research agent → searches documentation
- Critic → performs code review

**Content Creation:**
- Planner → outlines structure
- Research agent → gathers facts
- Executor → writes content
- Critic → edits and refines

**Data Analysis:**
- Research agent → collects data
- Planner → designs analysis approach
- Executor → performs analysis
- Critic → validates methodology and results

**Customer Support:**
- Research agent → searches knowledge base
- Planner → structures response
- Executor → formulates answer
- Critic → ensures accuracy and tone

## Running the Example

To run this example yourself:

1. Install dependencies:
```bash
pip install crewai crewai-tools python-dotenv
```

2. Install Ollama and pull the model:
```bash
ollama pull llama3.1:latest
```

3. Set up environment variables in `.env`:
```
SERPER_API_KEY=your_api_key_here
```

4. Run the script:
```bash
python call_agent_patterns.py
```

The script will execute all four patterns sequentially and generate a detailed markdown log of the entire process.

## Conclusion

Agentic AI patterns represent a paradigm shift from simple prompt-response interactions to sophisticated, goal-oriented AI systems. By understanding and combining these core patterns, developers can build robust, scalable AI applications that tackle complex real-world problems.

The four patterns we explored:
1. **Single Agent** - Simple baseline
2. **Planner → Executor** - Structured problem-solving
3. **Tool-Augmented** - Real-world information access
4. **Critic / Reflection** - Quality assurance

Together, they form a toolkit for building the next generation of AI applications.

## Further Reading

- [CrewAI Documentation](https://docs.crewai.com/)
- [Ollama Documentation](https://ollama.ai/)
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)

---

*Code examples from this post are available at [Github](https://github.com/dineshgopal29/the-agentic-advantage/tree/main)*





