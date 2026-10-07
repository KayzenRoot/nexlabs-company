# NexLabs Company OS — API Contracts

**Status:** `CANONICAL_WO_016`

## API style

Primary v0.1 application interface:
- versioned HTTP/JSON API for commands and queries;
- domain events for asynchronous reactions;
- adapter interfaces internally for external providers.

Concrete framework is deferred.

## Command envelope

Every mutating request carries conceptually:

```json
{
  "command_id": "uuid",
  "organization_id": "uuid",
  "actor_id": "uuid",
  "command_type": "work_order.admit",
  "resource_ref": {},
  "payload": {},
  "idempotency_key": "string-or-null",
  "correlation_id": "uuid",
  "causation_id": "uuid-or-null",
  "authority_envelope_id": "uuid-or-null",
  "expected_version": 12
}
```

## Query envelope

Queries include organization/actor scope but do not need idempotency keys.

## Response envelope

```json
{
  "request_id": "uuid",
  "status": "ok|accepted|blocked|error",
  "data": {},
  "error": null,
  "evidence_refs": []
}
```

## Error model

Stable classes:
- `AUTHENTICATION_REQUIRED`
- `AUTHORIZATION_DENIED`
- `APPROVAL_REQUIRED`
- `STATE_CONFLICT`
- `CONTEXT_STALE`
- `VALIDATION_ERROR`
- `IDEMPOTENCY_CONFLICT`
- `RECOVERY_REQUIRED`
- `EXTERNAL_PROVIDER_ERROR`
- `NOT_FOUND`

## Example resource APIs

### Work
- `POST /v1/work-orders/{id}:admit`
- `POST /v1/work-orders/{id}:transition`
- `GET /v1/work-orders/{id}`
- `GET /v1/work-orders?status=...`

### Tasks/runs
- `POST /v1/tasks`
- `POST /v1/tasks/{id}:dispatch`
- `GET /v1/runs/{id}`
- `POST /v1/runs/{id}:reconcile`

### Approvals
- `POST /v1/approval-requests`
- `POST /v1/approval-requests/{id}:approve`
- `POST /v1/approval-requests/{id}:deny`

### Evidence
- `POST /v1/evidence-bundles`
- `GET /v1/evidence-bundles/{id}`

### Agents
- `POST /v1/agent-sessions`
- `POST /v1/agent-sessions/{id}:complete`

## Mutation semantics

- command handler validates actor and authority;
- expected-version prevents lost updates when applicable;
- idempotency key prevents duplicate external/internal effects;
- commit includes outbox event;
- provider mutation may return `accepted` until confirmation evidence exists.

## Pagination/filtering

List queries use stable cursors rather than unbounded result sets.

## API versioning

Breaking external/public API changes require versioning.

Internal module APIs may evolve under repository compatibility gates.

## Security

Raw secret values are never accepted as normal API payloads where a secret handle/capability reference can be used.
