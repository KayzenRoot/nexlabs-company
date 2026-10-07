# NexLabs Company OS — Idempotency & Recovery

**Status:** `CANONICAL_WO_016`

## Problem

A timeout after a mutation does not prove the mutation failed.

Blind retry can duplicate:
- payments;
- GitHub comments/PRs;
- deployments;
- approvals;
- signed transactions;
- external records.

## Command identity

Material mutations use:
- unique command ID;
- idempotency key when provider/internal semantics allow;
- correlation ID;
- deterministic target/action digest where useful.

## Internal idempotency

Company OS stores command/idempotency execution records.

Repeated equivalent command:
- returns prior confirmed result; or
- joins/reconciles in-flight work.

Different payload with same idempotency key returns `IDEMPOTENCY_CONFLICT`.

## Provider idempotency

Use provider-supported idempotency keys/native request IDs when available.

When unavailable, design deterministic reconciliation around external identifiers/state.

## Unknown completion

If a mutation is dispatched and completion cannot be proven:

`RUNNING → UNKNOWN_COMPLETION → RECOVERY_REQUIRED`

No automatic blind replay.

## Recovery procedure

1. freeze duplicate mutation;
2. perform read-only provider reconciliation;
3. search deterministic IDs/expected effects;
4. compare intended vs actual state;
5. classify:
   - confirmed complete;
   - confirmed absent;
   - partial;
   - conflicting/unknown;
6. only execute confirmed missing effect;
7. capture evidence;
8. close or escalate.

## Partial completion

Composite actions should use step records/sagas rather than pretending distributed atomicity.

Compensating actions must be explicit and safe.

## Database concurrency

Use:
- transactions;
- unique constraints;
- optimistic version checks;
- row locking only where justified.

## Event consumers

At-least-once event delivery requires inbox/event receipt idempotency.

## High assurance

Financial/Web3/legal/high-risk recovery should prefer manual/Founder escalation when reconciliation cannot prove safe next action.
