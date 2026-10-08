# NexLabs Company OS — Agent Runtime Design

**Status:** `CANDIDATE_WO_018`

## Architecture

`Work Order → session admission → authorization → model routing → runtime adapter → event/evidence capture → policy review → state promotion`.

AgentRuntime is a **port**, never the authority for Work Orders, company policy, budgets or approvals. Hermes is an adapter candidate. OpenAI, Codex and local runtimes use the same contract.

## Operations

`capabilities()`, `startSession(request)`, `execute(session_id, input_ref)`, `cancel(session_id)`, `readSession(session_id)`, `usage(session_id)`, `reconcile(external_run_ref)`.

Methods may be unsupported by an adapter; capability discovery must say so instead of simulating functionality.

## Trust and data flow

Inputs carry organization, actor/agent, role contract reference, Context Lock/exact source refs, requested capabilities, data class, tool profile and ceilings (turns, time, USD). Outputs carry external IDs, status, content/artifact refs, validated usage/cost, correlation ID and redacted logs.

Company OS alone may accept/merge/publish results. Provider-suggested actions are proposals routed to the Tool Capability Broker.

## Lifecycle

`CREATED → DISPATCHED → RUNNING → SUCCEEDED | FAILED | UNKNOWN_COMPLETION | CANCELLED`.

Unknown completion must enter `RECOVERY_REQUIRED`; provider readback before any side-effecting replay. No silent status promotion.

## Executable design evidence

`company-os/contracts/agent-runtime.mjs` exposes pure deterministic contract functions and Hermes CLI **invocation plan**. It does not run Hermes or a tool. `node --test company-os/contracts/agent-runtime.test.mjs` proves core denial/routing/recovery invariants.

## Implementation boundary

Live adapters, sandbox broker, persistence, end-to-end product execution and Docker app/worker belong to successor implementation, not this Work Order.
