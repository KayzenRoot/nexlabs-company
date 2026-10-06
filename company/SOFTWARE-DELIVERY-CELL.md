# NexLabs Technology — Software Delivery Cell

**Status:** `CANONICAL_WO_006`

This cell intentionally reproduces the working method already used by the Founder, ChatGPT planning/review and code execution, but turns those functions into governed company roles.

## Canonical cell

`Founder Intent → Planner / Architect → Work Order → Executor → Tests / Evidence → Reviewer / Auditor → Correction or Approval → Checkpoint → Merge / Next`

## Roles

### Founder / Product Authority
Defines the desired outcome and accepts founder-reserved strategic decisions.

### Planner / Architect
Equivalent to the planning/architecture function currently performed before code execution.

Responsibilities:
- rehydrate canonical context;
- identify the next necessary increment;
- compile the Work Order;
- define architecture constraints;
- define acceptance criteria/tests;
- create Context Lock.

### Executor
Equivalent to the code executor function.

Possible implementations:
- ChatGPT with repository tools;
- Codex;
- another coding agent;
- local deterministic scripts;
- future executors.

Executor identity is replaceable.

Responsibilities:
- implement only admitted scope;
- record material changes;
- run required tests;
- produce evidence;
- stop on authority/context mismatch.

### QA / Test Engineer
Validates functional and non-functional acceptance.

May be logically separate or combined at low risk, but test evidence must be objective.

### Reviewer / Auditor
Reviews the exact candidate, evidence and scope.

Returns:
- `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`;
- `CORRECTION REQUIRED`;
- `BLOCKED`.

The reviewer must not merely repeat the executor’s claim.

### Checkpoint / Promotion function
Records accepted state and determines the sole next legal action.

## Correction loop

`Review finding → bounded correction → new head → invalidate old evidence → rerun required tests → re-audit`

The Work Order remains the same when the correction:
- is causal;
- is within admitted scope;
- does not materially redesign architecture;
- is safely verifiable.

## Separation rules

Low-risk work may use the same underlying model/runtime for multiple logical roles if:
- stages are explicit;
- evidence is regenerated;
- self-approval limitations are respected.

High-risk work follows the stronger segregation rules from WO-005.

## Goal

The company should eventually automate this cell end to end while preserving the same governance semantics.
