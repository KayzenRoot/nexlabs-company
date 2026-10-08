# NXL-COMPANY-WO-021 — Local Recovery Proof & Production-Readiness Boundaries

**Issue:** #22
**Status:** `ADMITTED / IN_PROGRESS`
**Classification:** `IMPORTANT` roadmap; this admission executes only the **NECESSARY v0.1 DoD recovery/operations subset**.
**Risk:** `ELEVATED` — stateful restore in *ephemeral CI fixtures only*.
**Admission base:** `dc38085cb057073a4551728dfc2a962b119903c0`
**Branch:** `infra/NXL-COMPANY-WO-021-local-recovery-readiness`
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-021.json`

## OBJECTIVE
Establish executable evidence that the local Docker database and evidence-artifact storage can be backed up and restored safely, and document explicit boundaries for future staging/production migration without deploying production infrastructure.

## CONTEXT
WO-017 provided scripts but CI verified mostly structure/syntax rather than a real restore; WO-020 displays local Git status but marks agent/approval/incident/runtime telemetry NOT_CONNECTED. The v0.1 DoD explicitly requires tested recovery for stateful components. Cloud production is IMPORTANT, not automatically release-blocking. This WO must **not** assert that it closes operational visibility gaps.

## SCOPE
1. Automated **isolated ephemeral CI** rehearsal: real Postgres 17 with synthetic rows, `pg_dump` through existing script, destructive restore restricted to isolated fixture, before/after checks including rollback of post-backup changes; artifact-volume archive/restore with content hash comparison.
2. Negative tests: missing destructive confirmation, nonexistent input, missing/invalid generated backups; fail closed before mutation; exercise existing scripts without weakening guardrails.
3. Add GitHub Actions workflow running isolated restore rehearsal and existing regression gates.
4. Document staging-to-production requirements: environment separation, secrets, data protection, backup cadence and restore testing, release promotion, health/readiness, minimum SLO proposals (targets, **not** measured), rollback/roll-forward and explicit launch gates.
5. Governed Work Order + Context Lock + evidence bundle + exact-head audit and checkpoint-promotion handoff.

## OUT OF SCOPE
VPS purchasing, external production hosting, production DB/volume restore, privileged remote operations, GitHub deployment credentials, authenticated Founder actions, agent/LLM integration, new services/migrations, secrets, new expenses, live PostgreSQL Company OS schema, full founder telemetry, WO-022 execution.

## FILES / SOURCES TO READ
Checkpoint JSON/MD, Decisions Ledger/ADRs, Scope, Definition of Done, Architecture, Requirements, TEST-BENCHMARK-PLAN; WO-017, its evidence, `company-os/BACKUP-RESTORE-LOCAL.md`; `infra/docker/compose.yml`, existing backup/restore scripts and CI; WO-020 closeout, planned WO-021, issue #22.

## REQUIREMENTS
REQ-003–006, REQ-011, REQ-014–017. No real users, customers or private information in fixtures; fail closed against unknown restore target, do not conflate successful restore with full runtime/production readiness.

## ARCHITECTURE RULES
PostgreSQL is canonical; Redis remains ephemeral; no Docker socket in ordinary application containers; only test runner controls Docker. Resource names and credentials must be **CI-fixture scoped** with explicit canary guards; no container uses privileged mode or public host data ports.

## CONSTRAINTS
No edits to restore authorization thresholds except defect corrections with fresh tests. CI uses isolated disposable GitHub-hosted runners and fixture-only synthetic data. No `docker compose down --volumes` on real user environments. Source changes after admission require stale-lock reconciliation; exact base and head evidence. Public repository safety.

## ACCEPTANCE CRITERIA
1. Isolated real PostgreSQL backup/restore test restores pre-snapshot data and removes synthetic post-snapshot changes, with verified SQL result.
2. Artifact volume archive/restore restores exact expected bytes/hash after synthetic mutation.
3. Both restore commands reject missing confirmation, nonexistent backup and misuse before touching state.
4. CI fails if backups are empty, recovery corrupts data, confirmation guard weakens or simulated data differs.
5. CI services and volumes use uniquely scoped names and temporary secrets; no user/production data, public ports, real keys, privileged mode, or leaked logs.
6. Staging/production runbook clarifies what is proven, unproven, manual prerequisites, SLO targets, security, operations and recovery/rollback. Explicit NOT_DEPLOYED.
7. 20 pre-existing validators plus new restore-rehearsal validator pass on the exact candidate HEAD; no known HIGH/CRITICAL.
8. No release-completion claim: WO-020 operational metrics stay NOT_CONNECTED; WO-022 NOT_ADMITTED.

## TESTS
Directed syntax/static shell validation; isolated Docker Compose PostgreSQL health + `pg_dump/pg_restore` with SQL state checks; artifact-volume tar restore + SHA-256; negative/confirmation tests; existing Node 22 and all 20 permanent CI workflows. Evidence bound to exact HEAD and CI run IDs.

## DELIVERABLES
`infra/docker/scripts/ci-recovery-rehearsal.sh`, `.github/workflows/local-recovery-readiness-validation.yml`, `company-os/STAGING-PRODUCTION-READINESS.md`, `company-os/BACKUP-RESTORE-LOCAL.md` note, Work Order/Context Lock/CI lifecycle changes, Evidence Bundle and checkpoint delta proposal.

## REVIEW FORMAT
PT-BR, base/head SHA, changed files, tests/real Docker recovery evidence, findings with severity, security boundary, residual risks and `APPROVED | CORRECTION REQUIRED | BLOCKED`; exact Checkpoint Delta.

## STOP CONDITION
Stop after exact-head audit and separate checkpoint promotion. No WO-022 admission while this WO requires correction or is blocked. Production rollout explicitly prohibited.
