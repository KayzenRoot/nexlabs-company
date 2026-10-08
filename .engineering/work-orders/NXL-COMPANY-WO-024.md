# NXL-COMPANY-WO-024 — Canonical PostgreSQL Runtime, Migrations, Audit and Transactional Outbox

- **Issue:** #68
- **Status:** `ADMITTED / IN_PROGRESS`
- **Classification:** `NECESSARY`
- **Risk:** `ELEVATED` — persistent multi-tenant state, transactional invariants and recovery.
- **Admission base:** `fb0272a44f09a782f3c14fba1e232db085f38ed8`
- **Branch:** `admission/NXL-COMPANY-WO-024-20261008`
- **Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-024.json`
- **GEF:** `1.1.2`

## OBJECTIVE

Replace ephemeral simulated Company OS state with bounded, durable, organization-scoped local PostgreSQL state. Add constrained schema and migrations, append-only audit/evidence references, an atomic transactional outbox, idempotent worker processing, and a reproducible read-only Founder projection after restart. Production durability is not claimed.

## CONTEXT AND DEPENDENCIES

WO-022 has been administratively reconciled as `BLOCKED / AWAITING_REMEDIATION`; its v0.1 verdict remains `BLOCKED_FOR_RELEASE / RELEASE_NOT_APPROVED`, Founder acceptance remains `PENDING`, and its frozen audit PR remains closed unmerged evidence. WO-023 is the last successfully completed Work Order. The fresh post-merge provider readback after PR #131 at exact base `fb0272a44f09a782f3c14fba1e232db085f38ed8` found no prior active claim or Context Lock. This Work Order is the sole admitted increment.

Use the existing local Docker PostgreSQL service, private data network and persistent volume contract. Reconcile the frozen Context Lock before execution; any material source, authority, risk, environment or base drift requires recompile.

## REQUIREMENT TRACEABILITY

`REQ-003`, `REQ-004`, `REQ-005`, `REQ-006`, `REQ-007`, `REQ-011`, `REQ-012`, `REQ-013`, `REQ-014`, `REQ-015`, `REQ-016`, `REQ-017`; gap traceability `GOV-02`, `MVP-02`, `OPS-01`.

## SCOPE

### A. Canonical schema and migrations

- Add versioned PostgreSQL migrations for organization-scoped organizations, actors, Work Orders, Context Locks, tasks, execution runs, external references, reviews, approval records, evidence metadata, append-only audit records, outbox events, inbox receipts and checkpoints; add supporting policy/capability tables only where required by the canonical model.
- Give business rows UUID identifiers, organization scope, typed constraints and foreign keys, creation timestamps and revision/version fields where mutable. Preserve exact external-version and Context Lock hashes.
- Guard Work Order transitions. Enforce unique `(organization_id, work_order_key)` and at most one `ADMITTED / IN_PROGRESS` Work Order per governed stream through a database invariant or serialized transaction with an explicit stream key.
- Make audit receipts append-only for the application role: application credentials cannot UPDATE or DELETE audit rows. Document the limit of this guarantee against privileged database administrators.
- Keep down migrations reversible where safe; destructive migration/restore tests use disposable CI-only data.

### B. Transaction and outbox boundary

- Implement a bounded runtime command envelope with organization, actor, capability, Work Order, action digest, idempotency key, correlation ID and expected version, plus explicit read-only queries.
- In one database transaction, validate version and capability, apply the allowed state transition, append its audit receipt and enqueue its outbox event. Never publish provider events from an uncommitted transaction.
- Deliver outbox events at least once with bounded retries/backoff, inbox uniqueness, dead-letter/`RECOVERY_REQUIRED` handling and reconciliation for ambiguous side effects. Do not blindly replay an unknown result.
- Until a separately admitted trusted identity/approval increment, user/provider mutation endpoints default to **DENY**. Fixture workflows remain clearly labeled and isolated.

### C. Local API, worker and persistence

- Provide a minimal versioned local API and worker for Work Orders, runs and external references. Expose a health endpoint and bounded projections; report unimplemented identity, provider, production and approval integrations as `NOT_CONNECTED` or `UNAVAILABLE`.
- Reuse the current Compose PostgreSQL health check, private data network and named volume. Do not publish the database port, mount the Docker socket, or introduce an app/worker container before executable code exists. Pin any new runtime image and justify any dependency.
- Preserve state across database/worker restart. Keep secrets in existing ignored handles; never commit environment values, database dumps, migration backups, signed tokens or provider logs.
- Give the Founder view a read-only, post-restart projection of actual local Work Order/run/event state; do not fabricate financial/provider outcomes.

## OUT OF SCOPE AND SAFETY BOUNDARIES

- No production/staging deployment, remote durability/RPO/RTO claim, external provider delivery, live agent runtime, live Founder identity/approval, finance, payment, Web3 or signing integration.
- No automatic side effects before the separately governed identity/approval capability exists. No privilege expansion, public database port, Docker socket, committed secrets, or weakening of existing checks/security controls.
- CEO_APPROVAL/HIGH_ASSURANCE and irreversible actions remain denied unless a separate exact action package receives required Founder authorization and verification. This admission is not that authorization.
- Do not bundle WO-025, WO-026, WO-028 or WO-030. Recompile and re-admit if the smallest safe increment exceeds this scope.
- Never mutate the user's existing database volume with destructive migration, reset or restore commands. Use isolated disposable CI/local data for destructive tests.

## ACCEPTANCE CRITERIA / EVIDENCE

1. A fresh isolated PostgreSQL instance applies migrations cleanly; safe rollback/reapplication behavior, migration idempotence, typed constraints, FKs and uniqueness are verified.
2. Concurrent admissions in the same organization/stream produce exactly one success; others receive a conflict with no partial side effects.
3. A synthetic locally authorized command commits Work Order state, audit record and outbox row atomically; an injected mid-transaction failure leaves none of them persisted.
4. A worker crash after dispatch/ack but before receipt does not duplicate an effect on replay/reconciliation; unknown state remains `RECOVERY_REQUIRED`.
5. Restart preserves state, versions, evidence references and pending outbox work. Backup → mutate → explicit restore is verified on disposable CI-only data.
6. Malformed input, stale expected version, cross-organization reads, unauthorized grants and hostile evidence paths fail closed with redacted logs.
7. Exact-head Node tests, Docker Compose smoke, syntax/static checks, secrets/supply-chain checks, Context Lock reconciliation and required review pass on the same candidate head. No unresolved HIGH/CRITICAL finding remains.
8. A reproducible post-restart read-only Founder view shows actual local state. Production/provider state remains explicitly unavailable until separately integrated.

## REQUIRED TESTS

Run exact-head Node tests and all risk-appropriate lint/typecheck/build gates, migrations and concurrency/rollback/idempotency/recovery cases above, disposable Docker restart and backup/restore smoke, secrets/supply-chain checks, and the affected CI workflows. Bind logs and hashes to the exact candidate SHA; redact sensitive values.

## REVIEW AND COMPLETION

Review in Brazilian Portuguese with exact base/head, allowed paths, source fingerprints, CI job IDs, migration hashes, evidence, findings by severity, risks and verdict. Independent review is required where the risk matrix/policy mandates it; automated CodeRabbit input is technical feedback and is not independent human approval. A successful implementation PR and its separate checkpoint promotion are distinct. Completion of this Work Order does not complete v0.1 or approve a release.

## PRE-EXECUTION GATE

Admission alone does not authorize execution. Run the Context Lock preflight and require `PASS`; otherwise stop as `BLOCKED` or `RECOVERY_REQUIRED`. Do not start implementation until that result is recorded against the exact main state.
