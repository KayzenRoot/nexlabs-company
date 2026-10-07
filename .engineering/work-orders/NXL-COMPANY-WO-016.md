# NXL-COMPANY-WO-016 — Company OS Functional Architecture & Data Model

**Issue:** #17  
**Status:** `APPROVED / MERGED`  
**Classification:** `NECESSARY`  
**Risk:** `ELEVATED / CORE_ARCHITECTURE`  
**Base:** `0f202eec5fc7ac3bec141038c2591bde64d44288`  
**Branch:** `planning/NXL-COMPANY-WO-016-company-os-functional-architecture`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-016.json`

## OBJECTIVE

Translate approved NexLabs operating models into an implementable Company OS functional architecture with bounded contexts, modules, canonical data model, state machines, APIs, event contracts, permission/approval enforcement, audit/evidence model, integration adapters and local-first deployment boundaries.

## CONTEXT

WO-005 through WO-015 established governance, AI workforce, product/software factories, research/IP, security, finance, GTM, brand/public presence and investor operations. WO-016 defines how those concepts become software state and contracts.

This Work Order freezes architecture and interfaces only. Runtime implementation begins in successor Work Orders.

## SCOPE

- Company OS bounded contexts.
- Modular monolith/service-boundary strategy for v0.1.
- Canonical storage architecture.
- Core entities and relational data model.
- Workflow/state-machine model.
- Command/query/API contracts.
- Domain event/outbox model.
- Audit/evidence/decision ledger model.
- Identity, role, capability, permission and approval model.
- Agent runtime abstraction.
- Tool/executor/integration contracts.
- Idempotency and ambiguous-mutation recovery.
- Product/project/work-order orchestration.
- Finance/GTM/research/investor bounded data boundaries.
- Observability/health/cost telemetry contract.
- Local-first Docker topology intent.
- Source Hierarchy / Decisions Ledger / architecture update.
- Deterministic Company OS Architecture validation CI.

## OUT OF SCOPE

- Writing runtime application code.
- Provisioning databases/Redis/object storage.
- Building UI/dashboard.
- Implementing agent runtimes.
- Implementing GitHub/CRM/finance integrations.
- Production deployment.
- Schema migrations.
- Secrets manager implementation.
- Vector/RAG implementation.
- Choosing a frontend framework.
- Building the local Docker stack.
- WO-017 or later execution.

## ARCHITECTURE DECISIONS TO FREEZE

- v0.1 begins as a modular monolith with explicit bounded-context packages, not premature microservices.
- PostgreSQL is the canonical transactional source of truth.
- Redis/cache/queues may accelerate coordination but are never canonical truth.
- Evidence/artifacts use content-addressed/object-style storage with relational metadata.
- Domain events use a transactional outbox so state change and event publication cannot silently diverge.
- Commands are explicit mutations; queries are read-only.
- Every mutating command carries actor, authority context, idempotency key where appropriate and correlation/causation identifiers.
- Unknown or ambiguous mutation completion enters `RECOVERY_REQUIRED`; blind replay is prohibited.
- Authorization is capability/policy based; role title alone grants no permission.
- High-assurance actions require an approval envelope and immutable/read-back evidence.
- Agent/model/provider runtime is behind adapters; Hermes/OpenAI/Codex/local runtimes are replaceable.
- GitHub and other systems are integrations, not canonical Company OS truth.
- Company OS keeps references to external canonical provider IDs/SHAs, not duplicated mutable truth where unnecessary.
- Event delivery is at-least-once; handlers must be idempotent.
- All material state transitions are auditable.
- Single-company operation is v0.1, but major tables carry `organization_id` to avoid structural dead-end.
- Soft deletion is not universal; immutable audit/evidence records are append-only, while business entities use explicit lifecycle states.
- Secrets are referenced by secret handles/capabilities, never stored as raw values in ordinary Company OS records.
- Vector search/RAG is optional derived infrastructure, never authoritative over relational/company canonical sources.
- Local Docker is the first runtime environment; production portability is preserved.

## ALLOWED OUTPUTS

- `company-os/ARCHITECTURE.md`
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
- `.engineering/ARCHITECTURE.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validator and closeout evidence.

## ACCEPTANCE CRITERIA

1. Bounded contexts map approved company systems without collapsing everything into one god-module.
2. Modular-monolith v0.1 strategy and extraction boundaries are explicit.
3. PostgreSQL is canonical source of transactional truth and Redis/cache is non-authoritative.
4. Data model covers organization, identity/actors, roles/capabilities, products/projects, agents, Work Orders, Context Locks, tasks/runs, approvals, decisions, evidence, checkpoints, events, integrations and audit.
5. State machines define Work Order, task/run, approval and action recovery lifecycles.
6. Command/query separation and API error/idempotency semantics are explicit.
7. Domain events use transactional outbox and at-least-once/idempotent consumer semantics.
8. Audit/evidence records preserve actor, intent, authority, before/after/reference state and exact provider evidence.
9. Permission model is capability/policy based and high-assurance actions require approval envelope.
10. Agent runtime is provider-independent with session/model/tool/memory/evidence contracts.
11. Integration contracts cover GitHub, model/runtime, tool executor, artifact/evidence store and future external systems.
12. Ambiguous writes enter RECOVERY_REQUIRED and are reconciled read-only before retry.
13. Observability covers health, traces, cost, token/model/provider usage, failures and approvals without raw secrets.
14. Local-first topology preserves production portability.
15. WO-017..WO-022 remain NOT_ADMITTED.
16. Existing persistent validators plus Company OS Architecture validator pass on exact head.
17. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all 16 Company OS architecture documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-016 is the only admitted Work Order.
- Assert WO-017..WO-022 remain NOT_ADMITTED.
- Assert PostgreSQL canonical / Redis non-authoritative rule.
- Assert transactional outbox + at-least-once + idempotent handlers.
- Assert organization_id future-proofing.
- Assert commands vs queries.
- Assert capability/policy authorization.
- Assert HIGH_ASSURANCE approval envelope.
- Assert RECOVERY_REQUIRED and blind-replay prohibition.
- Assert audit/evidence append-only rules.
- Assert provider-independent agent runtime.
- Assert integration IDs/SHAs as external references.
- Assert local Docker / production portability.
- Run all persistent validators plus Company OS Architecture validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, bounded contexts, storage/data model, state machines, APIs/events, audit/evidence, permissions/high assurance, agent/runtime abstraction, integration boundaries, idempotency/recovery, observability/topology, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-016. Do not admit or execute WO-017 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `9647faf1753fb7342318b1eb1d255bb285793a8d`
- All sixteen required validations: `SUCCESS`
- Company OS Architecture merge SHA: `6c94394517d6a744643324150e6aada4264969a7`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Architecture locks: modular monolith, PostgreSQL canonical state, non-authoritative Redis/cache, transactional outbox, capability/policy authorization, provider-independent runtime adapters, RECOVERY_REQUIRED for ambiguous mutations, local-first portable topology.
- Successor execution authority: `NONE`; WO-017 remains NOT_ADMITTED until separately compiled and locked.
