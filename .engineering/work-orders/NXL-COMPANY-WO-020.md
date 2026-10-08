# NXL-COMPANY-WO-020 — Founder Command Center & Company Observability

**Issue:** #21
**Status:** `APPROVED / MERGED` (accepted *local read-only snapshot scope*)
**Classification:** `IMPORTANT` (minimal founder visibility is NECESSARY under v0.1 DoD)
**Risk:** `STANDARD` (local, read-only, no identity/mutation authority)
**Admission base:** `fb2a0e0c2eb3b3a4fc09b2c058ba4b7892b73494`
**Branch:** `feat/NXL-COMPANY-WO-020-founder-command-center`
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-020.json`

## OBJECTIVE
Deliver the smallest locally executable Founder Command Center demonstrating truthful project, Work Order, approvals, runs, failure/alert and company-state visibility without falsely claiming live integration.

## CONTEXT
WO-019 and its checkpoint promotion completed. Local Docker substrate and provider-neutral architecture exist, but no live Company OS application, authorization/session service or GitHub/agent mutation broker has been approved. This increment MUST NOT imply live autonomy, live finance or production readiness.

## SCOPE
- Dependency-free Node 22 local HTTP dashboard and versioned read-only overview JSON sourced from allowlisted canonical repository files.
- Display actual checkpoint, work-order registry and governance metadata; distinguish `NOT_CONNECTED` metrics from measured zero.
- Show work, approvals, failures, agents, alerts, costs, deployments, incidents as truthful availability/unsupported indicators, with exact source/evidence references.
- Local-only Docker demo with least-privilege process, bound to host loopback, isolated files read-only.
- Static accessible responsive interface, testable HTTP/security/negative-path behavior and CI.
- Documentation/runbook, admission authority and proposed checkpoint delta; preserve previous GEF checks.

## OUT OF SCOPE
- Any write/approve/reject/merge/deploy or agent execution API; privileged sign-in; live GitHub/Hermes/finance connectors; fake progress or KPI values; PostgreSQL migrations; cloud/production release; WO-021/022 implementation; unrestricted network exposure.

## FILES/SOURCES TO READ
Checkpoint JSON/MD; Decisions Ledger; Scope; DoD; Architecture; Requirements; TEST-BENCHMARK-PLAN; company-os/ARCHITECTURE.md, OBSERVABILITY-CONTRACT.md, AUTHORIZATION-AND-APPROVAL-MODEL.md, API-CONTRACTS.md, CELL-MVP.md; WO-019 closeout; issue #21. Fingerprints are in Context Lock.

## REQUIREMENTS
REQ-001, REQ-003–007, REQ-011–016 and REQ-017. Read-only local snapshot is not authority to mutate. Unknown/unavailable agent runs, approvals, costs, failures and production health MUST appear as unobserved rather than success/zero.

## ARCHITECTURE RULES
Company OS remains modular, provider-neutral and PostgreSQL-authoritative for *future live state*. This view uses versioned Git as read-only engineering evidence and labels it as such. Never use this temporary projection as canonical transactional truth. Fail closed, no raw secrets/credentials, no external write capability, localhost-only.

## CONSTRAINTS
Exact admission Git base, one admitted WO, no forced history, no destructive operation, PUBLIC_SAFE_ONLY. If any critical source changes from locked fingerprint, status becomes STALE and needs recompilation before merging. No implicit checkpoint promotion.

## ACCEPTANCE CRITERIA
1. Dashboard runs under Node 22 and optional isolated Docker, without third-party dependency.
2. GET / and GET /v1/overview display/return checkpoint and registry with evidence source refs; /healthz describes HTTP liveness only.
3. External data is absent by default. Agent/approval/run/cost/deployment counters are null+NOT_CONNECTED, never fabricated zeros.
4. No mutation routes, wildcard CORS, background execution or privileged container mounts. Server binds loopback by default and sends no-store/CSP/nosniff/security headers.
5. Path traversal, XSS, malformed sources, unsupported HTTP methods and unexpected endpoints are rejected/escaped.
6. Structural validator, automated Node unit/integration/security tests and Docker Compose config checks pass; all predecessor checks remain successful at same reviewed HEAD.
7. Source authority and active WO metadata are consistent; independent review is not falsely claimed; Evidence Bundle and proposed Checkpoint Delta prepared.
8. No known HIGH/CRITICAL finding; WO-021/022 remain NOT_ADMITTED.

## TESTS
`node --test company-os/founder/*.test.mjs`; `node --check` on JS; `docker compose -f infra/docker/compose.founder-demo.yaml config --quiet`; permanent GitHub workflow and prior 19 CI checks, including negative security tests.

## DELIVERABLES
`company-os/founder/{overview,ui,server,cli}.mjs`, `company-os/founder/overview.test.mjs`, `company-os/FOUNDER-COMMAND-CENTER.md`, `infra/docker/compose.founder-demo.yaml`, `.github/workflows/founder-command-center-validation.yml`, admission Context Lock/registry/checkpoint/README, exact-head evidence in PR.

## REVIEW FORMAT
Português brasileiro: base/head SHA, diff, scope and DoD mapping, tests/checks, security/integrity findings by severity, residual risks, APPROVED | CORRECTION REQUIRED | BLOCKED, proposed Checkpoint Delta.

## STOP CONDITION
Stop at implementation PR exact-head audit. If ACCEPTED, only then merge and promote checkpoint in separate governance step. No WO-021 admission before promotion and closure of WO-020.


## CLOSEOUT — exact-head approval
- Owner self-audit: `APPROVED / NOT_INDEPENDENT`, review `5450151486`
- Audited HEAD: `ef03fd2e9ddfaf4befe1ffa38eeee257267d7522`
- Implementation PR: #60, merged at `bc9cc94eda0f6fdaf6badde6bd0c705e63b40cee`
- Exact-head checks: `20/20 SUCCESS`; includes isolated Docker runtime HTTP smoke and adversarial authorization/state checks.
- Evidence: `.engineering/evidence/NXL-COMPANY-WO-020-CLOSEOUT.md`
- Bounded feature: public-safe local engineering snapshot, no Founder privileged action, no PostgreSQL live projections, no real approval/run/finance integration.
- Integrated DoD for real operational observability remains NOT FULLY SATISFIED. No WO-021/022 admitted by this closeout.
