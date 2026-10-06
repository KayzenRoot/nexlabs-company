# NexLabs Technology — AI Employee Contract

**Status:** `CANONICAL_WO_007`

## 1. Purpose

Every NexLabs AI employee is instantiated from a governed **AI Employee Contract**.

The contract defines what the employee is, what it is for, what it may access, what it may do, what it must produce, when it must stop and how its work is evaluated.

The runtime/model is replaceable. The contract is the stable organizational identity.

## 2. Mandatory contract fields

Every role definition must include:

- `role_id`
- `role_name`
- `contract_version`
- `role_family`
- `mission`
- `responsibilities`
- `non_responsibilities`
- `inputs`
- `outputs`
- `authoritative_sources`
- `tools`
- `permissions`
- `memory`
- `kpis`
- `escalation`
- `limitations`
- `risk_ceiling`
- `receipt_requirements`
- `activation_conditions`
- `deactivation_conditions`

## 3. Role identity

A role is identified by stable logical identity, not by:
- model name;
- chat/thread;
- runtime provider;
- API credential;
- machine;
- current session.

Example:

`ENG.ARCHITECT`

may be instantiated today by one provider and later by another without changing the role’s company identity.

## 4. Mission and responsibilities

The mission describes the role’s durable purpose.

Responsibilities describe what the role is accountable for doing.

Non-responsibilities state explicit boundaries to avoid role creep.

A role must not silently expand its mission because adjacent work is convenient.

## 5. Inputs and outputs

Inputs must identify:
- expected source type;
- authority level;
- freshness requirements where applicable;
- whether untrusted content may appear.

Outputs must identify:
- expected artifact type;
- evidence requirements;
- downstream consumer;
- whether review/approval is required.

## 6. Authority

The contract does not create authority beyond canonical governance.

The effective authority for a run is the intersection of:

`Role Contract ∩ Company Governance ∩ Work Order/Task Scope ∩ Tool Permission ∩ Environment Policy`

The strictest applicable restriction wins.

## 7. Memory

Memory helps continuity but is not company truth.

Canonical sources outrank:
- agent memory;
- conversation history;
- embeddings/vector recall;
- provider-managed memory;
- inferred preferences.

## 8. KPIs

KPIs evaluate useful outcomes, evidence quality, reliability, efficiency and compliance.

KPIs must not incentivize:
- bypassing gates;
- hiding failures;
- fabricating completion;
- excessive tool calls;
- unnecessary token/model spend;
- maximizing agent activity for its own sake.

## 9. Escalation and stop behavior

The contract must define when the employee:
- continues autonomously;
- requests review;
- requests CEO approval;
- becomes BLOCKED;
- enters RECOVERY_REQUIRED;
- refuses/prohibits an action.

Unknown authority or stale critical context is not permission to improvise.

## 10. Replacement

If the model/runtime changes:
- role_id remains;
- contract_version remains unless the contract changed;
- canonical authority is rehydrated;
- stale provider/session memory is not trusted automatically;
- new run receipts identify the new runtime.

## 11. Contract changes

Material role-contract changes require governed versioning.

A new model is not automatically a new contract version.

Changes to mission, authority, tool envelope, memory policy, risk ceiling or escalation normally require a contract version change and review.
