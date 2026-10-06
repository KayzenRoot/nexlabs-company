# NexLabs Technology — Audit & Receipts

**Status:** `CANONICAL_WO_005`

## Purpose

Material company actions must be reconstructable after the fact.

The audit record should answer:
- who/what acted;
- under which role/policy/Work Order;
- what was requested;
- what was authorized;
- what target/environment was affected;
- what actually happened;
- what evidence proves the result;
- whether follow-up/reconciliation is required.

## Minimum receipt fields

Where applicable:
- run/action ID;
- timestamp;
- actor identity/role;
- action class;
- risk class;
- authorization reference;
- Work Order/task reference;
- target identity;
- pre-state binding;
- intended effect;
- observed effect/outcome;
- post-state binding;
- evidence references;
- reviewer/approver;
- error/recovery state.

## Outcome vocabulary

Prefer explicit states such as:
- `SUCCEEDED`;
- `FAILED`;
- `BLOCKED`;
- `DENIED`;
- `PARTIAL / UNKNOWN`;
- `RECOVERY_REQUIRED`;
- `CANCELLED`.

Do not convert “command started” or “API returned 200” into business success without verifying the intended post-state.

## Audit integrity

Audit evidence should be:
- append-oriented where practical;
- attributable;
- tamper-evident where risk justifies it;
- linked to exact Git/resource/transaction identifiers;
- protected from the actor being able to silently erase its own adverse evidence.

## Sensitive evidence

Evidence must not contain raw secrets merely to prove access occurred.

Use:
- secret IDs;
- key fingerprints;
- masked identifiers;
- provider receipt IDs;
- cryptographic hashes where useful.

## Retention

Specific retention periods depend on legal, product, security and infrastructure requirements and will be defined later. Until then, material governance/engineering receipts should be preserved rather than automatically destroyed.

## Review

Reviewers must bind conclusions to the exact candidate/action/receipt they assessed. Historical success from a different head, transaction or environment is not current proof.
