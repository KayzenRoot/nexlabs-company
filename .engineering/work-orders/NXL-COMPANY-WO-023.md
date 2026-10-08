# NXL-COMPANY-WO-023 — Evidence-backed offline cell visibility

**Issue:** #64
**Status:** `APPROVED / MERGED` (bounded offline fixture scope)
**Classification:** `NECESSARY` for v0.1 minimum Founder visibility, not complete production observability
**Risk:** `STANDARD` (read-only, fixture-only)
**Admission base:** `86a328127585fe8a31b446fe0294da1c992490d5`
**Branch:** `feat/NXL-COMPANY-WO-023-offline-cell-observability`
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-023.json`

## OBJECTIVE
Prove minimum Founder visibility into *actual offline* engineering-cell runs, QA failures/correction, a fixture-verified approval event and work state without fabricating live operational data.

## CONTEXT
WO-019 creates a hash-chained in-memory receipt stream from a deterministic offline executor. WO-020 displays canonical Git work status, while external runs, approvals and failures remain `NOT_CONNECTED`. WO-021 local recovery was approved. WO-022 integrated acceptance cannot declare the operational DoD fully met without bounded run-evidence visibility.

## SCOPE
- Derive a sanitized, validated read-only observation from a real `runDemo()` invocation of the existing WO-019 cell.
- Inspect and verify its SHA-256 receipt chain before projecting events, attempts, QA failures, correction and handoff. Show evidence head and fixture Git base.
- Initialize exactly one fixture run at local dashboard boot, never during GET request; expose GET `/v1/offline-cell-evidence` and show its summary in the Founder UI.
- Present `FOUNDER_FIXTURE_VERIFIER` separately from actual authenticated approvals. No source prompts, proposed code or unredacted details in HTTP output.
- Missing/invalid/corrupt evidence fails closed (503), not recorded as a healthy zero.
- Keep production agents, finance, real Founder approvals, deployments, incidents, health as `NOT_CONNECTED/null`.
- Negative security, HTTP, data-integrity and Docker smoke tests, docs, evidence bundle and checkpoint delta.

## OUT OF SCOPE
Authenticated Founder SSO, PostgreSQL transaction/state schema, durable production telemetry, actual AI agent/provider, Web3/finance, executor mutation or new privileged actions; CI agent provider connection; auto-PR/merge; cloud deployment; WO-022 implementation. No new dependencies/frameworks or Docker socket.

## FILES/SOURCES TO READ
Checkpoint, Decisions Ledger, Scope, DoD, Architecture, Requirements, Test/Benchmark Plan; `company-os/cell/{engine,fixtures}.mjs`, `company-os/CELL-MVP.md`, `company-os/founder/*`, `company-os/OBSERVABILITY-CONTRACT.md`, WO-020/WO-021 closeout and their CI validators.

## REQUIREMENTS
REQ-001, REQ-003/004/005, REQ-007, REQ-011/012/014/016/017. Every displayed numerical run result must be derived from inspected receipt evidence; null denotes unobserved metrics.

## ARCHITECTURE RULES
The existing offline cell engine remains pure and unmodified; the Founder view remains a read-only local Git snapshot plus separately labeled local fixture observations. No normal GET path executes the cell. Default deny on mutations, no remote bind, no false authenticated Founder claims. PostgreSQL remains canonical for **future live** Company OS state, not populated by this fixture.

## CONSTRAINTS
Exactly one admitted Work Order. Frozen admission base and source fingerprints; flag STALE on canonical authority drift. No private data in public repo. No source-promotion by test fixture. No production or human approval is inferred from demo verifier. Read-only Docker host loopback.

## ACCEPTANCE CRITERIA
1. Real `runDemo()` starts once in the local dashboard process before server listen; its result has a valid hash-chain.
2. Projection measures 1 fixture run, 2 attempts, failed QA and correction from *events* rather than hardcoded counters, and PENDING_GEF_REVIEW; no actual PR/merge/privileged authorization.
3. GET endpoint displays sanitized evidence ref, event sequence/type only, explicit offline fixture origin and no sensitive contents; HTML displays them separately from NOT_CONNECTED production operations.
4. Mutating verbs, hostile host, malformed/replayed/tampered receipts and missing observation are denied or 503; security headers preserved.
5. Node tests, real Docker local endpoint smoke, shell/syntax and all 21 predecessor checks pass on SAME HEAD; no HIGH/CRITICAL finding.
6. WO-022 remains NOT_ADMITTED. Closeout names remaining real provider/auth/persistence uncertainty; v0.1 acceptance remains reserved for WO-022 and explicit Founder sign-off.

## TESTS
`node --test company-os/founder/*.test.mjs`, Node --check, adversarial receipt tamper/unknown status tests, Docker Compose isolated HTTP smoke showing the offline fixture endpoint and NOT_CONNECTED runtime metrics, 22 full GitHub workflow gates (21 predecessors plus new observation validator).

## DELIVERABLES
`company-os/founder/offline-evidence.mjs`, associated tests, bounded updates to CLI/server/UI/overview tests, `company-os/OFFLINE-CELL-OBSERVABILITY.md`, workflow `.github/workflows/offline-cell-observability-validation.yml`, governance Work Order/Context Lock/registry/checkpoint/evidence/PR.

## REVIEW FORMAT
PT-BR exact base/head, 22 CI workflows, files/scope, source authority, security/DoD gaps, severity, APPROVED|CORRECTION REQUIRED|BLOCKED, proposed checkpoint delta and no inferred production approval.

## STOP CONDITION
Stop at exact-head PR audit; separate checkpoint promotion after successful merge/readback. No WO-022 admission before WO-023 promotion and feasibility review.

## CLOSEOUT
- Owner self-audit: `APPROVED / NOT_INDEPENDENT`, review #5450267377.
- Audited head `0e118d9f373c77a2d0a491a968e4e46182bcf67c`; PR #65 merge `976c7a00317530efe12e5c6d655e0a40dd4dd3b9`.
- Exact-head CI 22/22 SUCCESS including Node 22 and isolated Docker HTTP evidence; admission-base fingerprints 11/11 matched.
- Evidence Bundle: `.engineering/evidence/NXL-COMPANY-WO-023-CLOSEOUT.md`.
- NOT_CONNECTED: real agents, Founder identity, external approvals, incidents, deployments, finance and production telemetry.
- WO-022 still NOT_ADMITTED and v0.1 not accepted.
