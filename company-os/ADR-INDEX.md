# NexLabs Company OS — ADR Index

**Status:** `CANONICAL_WO_016`

## Architecture decisions frozen by WO-016

### ADR-COS-001 — Modular monolith first
Start v0.1 as modular monolith with explicit bounded contexts and extraction seams.

### ADR-COS-002 — PostgreSQL canonical transactional truth
Relational state, Work Orders, approvals, audit metadata and outbox live in PostgreSQL.

### ADR-COS-003 — Redis is non-authoritative
Redis/cache/queue coordination may be used for acceleration but never as sole canonical business state.

### ADR-COS-004 — Immutable artifact/evidence storage by reference/hash
Large evidence/artifacts live outside relational rows with content hashes and metadata.

### ADR-COS-005 — Transactional outbox
Domain events are committed atomically with state changes and delivered at least once.

### ADR-COS-006 — Capability/policy authorization
Role titles alone do not grant authority.

### ADR-COS-007 — High-assurance approval envelope
High-risk actions bind explicit approval to action digest/constraints and require verification evidence.

### ADR-COS-008 — Provider-independent agent runtime
Agent providers/runtimes sit behind adapters.

### ADR-COS-009 — Explicit idempotency and RECOVERY_REQUIRED
Ambiguous mutation completion blocks blind replay and requires reconciliation.

### ADR-COS-010 — organization_id future-proofing
v0.1 is one-company operationally, but major canonical entities are organization-scoped.

### ADR-COS-011 — External provider IDs/SHAs are references
Company OS does not pretend local copies replace provider-native mutable truth.

### ADR-COS-012 — Semantic/vector memory is derived
Vector/RAG retrieval may assist discovery but cannot override canonical relational/Git/company sources.

### ADR-COS-013 — Local Docker first, portable contracts
Local execution is the first environment; architecture remains production-portable.

### ADR-COS-014 — Audit and evidence are separate from ordinary logs
Operational telemetry may expire/change format; governance audit/evidence retains stronger integrity semantics.

### ADR-COS-015 — Commands mutate, queries read
Read interfaces cannot hide mutation side effects.

### ADR-COS-016 — Distribution is earned
A bounded context becomes a separate service only when scaling/security/availability evidence justifies the distributed-system cost.
