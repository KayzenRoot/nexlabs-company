# NexLabs Company Architecture

Status: `FUNCTIONAL_BASELINE_WO_016`

## Architectural principles

1. Founder authority is explicit and cannot be silently delegated.
2. Company policy and workflow live above any single agent runtime or model provider.
3. Every material operation is attributable, permissioned and auditable.
4. Local-first development must not create a local-only product architecture.
5. High-risk domains fail closed.
6. Company modules must be replaceable through explicit contracts.
7. GEF governance is part of the operating architecture.
8. Canonical state and derived acceleration are explicitly separated.
9. Ambiguous mutations reconcile before retry.
10. Distribution is earned by scaling/security/availability evidence.

## Canonical Company OS authority

Primary architecture: `company-os/ARCHITECTURE.md`

Supporting contracts:
- `company-os/BOUNDED-CONTEXTS.md`
- `company-os/MODULE-BOUNDARIES.md`
- `company-os/DATA-MODEL.md`
- `company-os/ENTITY-CATALOG.md`
- `company-os/STATE-MACHINES.md`
- `company-os/API-CONTRACTS.md`
- `company-os/DOMAIN-EVENTS.md`
- `company-os/AUDIT-EVIDENCE-MODEL.md`
- `company-os/AUTHORIZATION-AND-APPROVAL-MODEL.md`
- `company-os/AGENT-RUNTIME-CONTRACT.md`
- `company-os/INTEGRATION-CONTRACTS.md`
- `company-os/IDEMPOTENCY-RECOVERY.md`
- `company-os/OBSERVABILITY-CONTRACT.md`
- `company-os/LOCAL-FIRST-TOPOLOGY.md`
- `company-os/ADR-INDEX.md`

## v0.1 architecture

### Style
Modular monolith with explicit bounded contexts and extraction seams.

### Canonical persistence
PostgreSQL.

### Derived/ephemeral acceleration
Redis/cache/queues where justified, never canonical truth.

### Evidence/artifacts
Immutable/content-hashed artifact storage with relational metadata.

### Events
Transactional outbox with at-least-once delivery and idempotent consumers.

### Authorization
Capability/policy based, default deny, bounded approval envelopes for high-assurance actions.

### Agent runtime
Provider-independent adapter contract.

### Recovery
Unknown mutation completion enters `RECOVERY_REQUIRED`; blind replay is prohibited.

### Deployment
Local Docker first, portable to staging/production through stable infrastructure contracts.

## Layer model

1. Founder interface
2. Governance & authority
3. Company OS application/orchestration
4. Domain bounded contexts
5. AI workforce/runtime abstraction
6. Integration/executor adapters
7. Canonical data/evidence
8. Observability
9. Infrastructure

## Security boundary

Company OS does not store raw long-lived secrets in ordinary domain records. Secret handles/brokered capabilities are used across agent/tool/integration boundaries.

## External truth

GitHub, banks, CRMs and model/runtime providers remain authoritative for their provider-native state. Company OS stores exact IDs/SHAs/refs and synchronized projections where justified.

## Future evolution

Successor WOs may choose concrete implementation frameworks, Docker services, migrations and UI. They may not silently overturn these architecture decisions without governed change.
