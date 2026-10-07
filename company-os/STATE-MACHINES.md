# NexLabs Company OS — State Machines

**Status:** `CANONICAL_WO_016`

## Work Order

`PLANNED → ADMITTED → IN_PROGRESS → REVIEW_READY → APPROVED → MERGED → PROMOTED → CLOSED`

Alternate states:
- `CORRECTION_REQUIRED`
- `BLOCKED`
- `CANCELLED`

Rules:
- only one admitted Work Order where governing policy requires serialization;
- candidate-head change invalidates old exact-head evidence;
- `MERGED` does not imply `PROMOTED`;
- successor cannot execute before required promotion/admission.

## Task

`PENDING → READY → RUNNING → SUCCEEDED | FAILED | BLOCKED | RECOVERY_REQUIRED | CANCELLED`

A failed task may create a new execution run without rewriting history.

## Execution run

`CREATED → DISPATCHED → RUNNING → SUCCEEDED | FAILED | UNKNOWN_COMPLETION | CANCELLED`

`UNKNOWN_COMPLETION` must transition through reconciliation before any retry.

## Approval request

`DRAFT → PENDING → APPROVED | DENIED | EXPIRED | REVOKED`

Approved requests can produce a bounded authority envelope.

## Authority envelope

`ISSUED → ACTIVE → CONSUMED | EXPIRED | REVOKED`

Single-use/high-assurance envelopes should be consumed atomically or bound to idempotent action digest semantics.

## Integration mutation

`PLANNED → DISPATCHED → CONFIRMED | REJECTED | RECOVERY_REQUIRED`

If provider response is lost after dispatch:
- do not assume failure;
- do not blind replay;
- reconcile provider state using deterministic identifiers/idempotency keys;
- complete only missing effects.

## Agent lifecycle

`DEFINED → AVAILABLE → ACTIVE → SUSPENDED | RETIRED`

Session lifecycle:
`CREATED → ACTIVE → COMPLETED | FAILED | EXPIRED`

## Product lifecycle reference

Company OS should represent the canonical Product Factory lifecycle without inventing a parallel one.

## Invalid transitions

All state changes pass a transition guard.

Direct database edits bypassing guards are infrastructure break-glass actions, not normal application behavior.
