# NexLabs Technology — AI Workforce Architecture

**Status:** `CANONICAL_WO_006`

## 1. Workforce model

NexLabs uses a **governed elastic workforce**.

An AI employee is not defined by a chat window or a model name. It is a logical company role that will later be instantiated from:
- role definition;
- mission;
- responsibilities;
- tools;
- permission envelope;
- memory boundary;
- escalation rules;
- evidence requirements;
- performance metrics.

The detailed employee contract belongs to WO-007.

## 2. Layers

### Layer A — Human strategic authority
Founder/CEO.

Owns:
- vision;
- strategic prioritization;
- governed exceptions;
- capital/ownership/legal reserved powers;
- final high-risk authorization.

### Layer B — Coordination core
Small group of AI roles that translate founder intent into company work.

Initial coordination capabilities:
- Chief of Staff;
- Product/Strategy;
- Technology/Engineering.

### Layer C — Functional capability pools
Reusable company functions:
- Product;
- Engineering;
- Research/Data;
- Security/Risk;
- Operations;
- Finance;
- Commercial.

### Layer D — Specialist agents
Fine-grained roles activated for specific work.

### Layer E — Tools and executors
GitHub, code executors, CI, local tools, cloud, analytics and future integrations.

Tools do not become employees and do not possess company authority independently.

## 3. Elastic activation

Default lifecycle:

`Need detected → role selected → role context instantiated → bounded task → evidence → review/escalation → role deactivation or continuation`

The company should not maintain a permanent AI agent merely because a title exists in the org chart.

## 4. Persistent state vs persistent process

NexLabs prefers:
- persistent **role definitions**;
- persistent **company/project state**;
- persistent **audit/evidence**;
- bounded **agent sessions/runs**.

This reduces stale context, cost and uncontrolled long-lived autonomy.

## 5. Provider independence

Roles are logical identities.

A role may be served by:
- different model providers;
- local/open models;
- specialized agents;
- deterministic software;
- human review where required.

“Hermes agent”, “Codex agent” or “GPT agent” is an implementation/runtime description, not an organizational role.

## 6. Concurrency

Parallel agents are permitted only when:
- scopes are non-conflicting;
- shared state is protected;
- authority is explicit;
- output reconciliation is defined;
- GEF or applicable workflow allows it.

Otherwise, work remains serialized.

## 7. Organizational memory

The workforce uses canonical company/project sources as authority.

Agent-specific memory is a convenience layer and may not silently override:
- Checkpoint;
- Decisions Ledger;
- Work Orders;
- approved policy;
- exact provider/Git state.

## 8. Failure model

If an agent fails, loses context or becomes unavailable, the company should be able to:
1. reconstruct its role;
2. rehydrate authoritative state;
3. inspect previous receipts;
4. continue from a known checkpoint;
5. replace the underlying model/runtime if needed.

The company should survive model replacement.
