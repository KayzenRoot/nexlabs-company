# NexLabs Company OS — Domain Events

**Status:** `CANONICAL_WO_016`

## Delivery model

Domain events are persisted in the same PostgreSQL transaction as state changes using a **transactional outbox**.

Publishing is at-least-once.

Consumers must be idempotent and record processed event IDs when effects are material.

## Event envelope

```json
{
  "event_id": "uuid",
  "event_type": "work_order.admitted",
  "event_version": 1,
  "organization_id": "uuid",
  "aggregate_type": "work_order",
  "aggregate_id": "uuid",
  "occurred_at": "timestamp",
  "actor_id": "uuid",
  "correlation_id": "uuid",
  "causation_id": "uuid-or-null",
  "payload": {}
}
```

## Canonical event families

### Governance
- `policy.activated`
- `decision.recorded`
- `approval.requested`
- `approval.approved`
- `approval.denied`
- `authority.revoked`

### Work
- `work_order.admitted`
- `work_order.review_ready`
- `work_order.approved`
- `work_order.merged`
- `checkpoint.promoted`
- `task.ready`
- `task.blocked`

### Execution
- `run.dispatched`
- `run.succeeded`
- `run.failed`
- `run.recovery_required`

### Evidence
- `evidence.bundle_created`
- `evidence.verified`
- `finding.recorded`

### Workforce
- `agent.activated`
- `agent.suspended`
- `agent.session_completed`

### Integration
- `integration.mutation_confirmed`
- `integration.reconciliation_required`
- `integration.reference_updated`

## Event design rules

- events describe something that happened, not imperative commands;
- payload contains enough identifiers/context for consumers, not whole secret-rich records;
- event schemas are versioned;
- consumers must tolerate replay;
- event order is guaranteed only where explicitly scoped by aggregate/stream design;
- events do not replace canonical database reads when exact current state is required.

## Outbox publisher

Publisher:
1. leases unpublished outbox rows;
2. publishes;
3. records publish result;
4. retries safely.

A duplicate publish is acceptable; a duplicate domain effect is not.
