# NexLabs Technology — Context Lock & Preflight

**Status:** `CANONICAL_WO_009`

## Context Lock purpose

A Context Lock binds a Work Order to the exact authority and state used when it was admitted.

It prevents an agent from executing yesterday's plan against today's changed repository.

## Minimum lock fields

- schema version;
- Work Order ID;
- issue/task ID;
- repository/project;
- branch;
- base SHA;
- compile date/time;
- governance/GEF version;
- critical source fingerprints;
- allowed outputs;
- refresh triggers;
- lock state.

## Critical source fingerprints

Critical sources typically include:
- Checkpoint;
- Decisions/ADRs;
- Scope/DoD;
- Requirements;
- Architecture;
- active Work Order source;
- applicable company/product/governance authority.

## Refresh triggers

Refresh/reconciliation is required when:
- base/main changed incompatibly;
- a critical source changed;
- Work Order scope changed;
- governance/GEF version changed;
- permission/risk model changed;
- the target environment changed materially.

## Preflight

Before execution, verify:

### Identity
- correct repository/project;
- correct branch;
- correct Work Order;
- correct lock.

### Freshness
- base/current relationship known;
- critical sources match or approved drift is understood.

### Authority
- action class known;
- role/tool permissions valid;
- required approvals present.

### Scope
- intended files/resources are within admitted output/scope.

### Tooling
- executor/tool available;
- credentials injected safely;
- no secrets committed.

### Conflicts
- no incompatible concurrent mutation;
- no successor Work Order bypass.

## Preflight outcomes

- `PASS`
- `REFRESH_REQUIRED`
- `BLOCKED`
- `CEO_APPROVAL_REQUIRED`

Only PASS authorizes ordinary execution.

## Drift handling

Not all drift is equal.

Benign drift may be reconciled and recorded.

Material drift that changes requirements, architecture, risk, authority or target state invalidates execution authority until recompiled.

## Stale lock rule

A stale Context Lock is never treated as "probably fine."
