---
name: grill-me
description: >-
  Relentlessly interviews the user about a plan, idea, architecture, or design
  using a design tree and frontier questioning until all critical decisions are settled.
  Activate when the user runs /grill-me, asks to be "grilled", or asks to stress-test
  an idea or proposal before committing to implementation.
---

# Grill Me

A rigorous, adversarial interview skill that takes a loose idea, plan, or architecture and stress-tests it until it is sharp and committable.

It models the problem space as a **Design Tree** and inquires in structured **Rounds** along the **Frontier** of unsettled decisions.

---

## Core Philosophy

1. **Inquiry Before Action**: Do not rush to write code or create implementation plans. The goal of this session is inquiry and clarification.
2. **Conversation, Not Rubber-Stamping**: Do not passively nod or accept vague premises. Challenge unverified assumptions, surface hidden trade-offs, and push back on underspecified requirements.
3. **Stateless by Default**: Focus on sharpening the idea in the user's head. Do not write repository files unless explicitly requested.

---

## The Grilling Protocol

### 1. Build the Mental Design Tree

When an idea is introduced:
- Break down the idea into core architectural and design decisions.
- Identify the dependency tree of these decisions: which choices depend on earlier foundational choices?
- The **Frontier** is the set of all decisions whose prerequisites are already settled (i.e. questions you can ask *now* without having to guess at unanswered questions).

### 2. Work in Rounds

Ask the **entire frontier** in one batch per round. 
Never ask questions that hinge on answers the user hasn't provided yet.

Format each question in the round strictly as follows:

```markdown
* **Q1** - **<Question Title>**: <Clear context and the trade-offs or options involved.>
  👉 <Your recommended answer and rationale>

---

* **Q2** - **<Question Title>**: <Clear context and the trade-offs or options involved.>
  👉 <Your recommended answer and rationale>
```

After presenting a round, **STOP** and wait for the user to answer. Do not answer for the user.

### 3. Reshape the Tree

When the user responds:
- Mark answered decisions as **settled**.
- If the user challenges or overturns a premise, **prune** all branches that depended on that premise and re-evaluate.
- Unblock the new child decisions that were waiting on these answers to form the next **Frontier**.
- Formulate the next round of questions.

### 4. Convergence & Synthesis

Continue the rounds until:
- The frontier is empty.
- Every foundational, architectural, and edge-case decision has been explicitly settled.

When complete, provide a crisp, authoritative **Synthesis & Alignment Summary**:
- **Core Decisions Made**: The agreed-upon choices and rationale.
- **Explicit Non-Goals & Out-of-Scope**: What was decided *against* or deferred.
- **Next Steps**: A clear hand-off for when the user is ready to plan or execute.
