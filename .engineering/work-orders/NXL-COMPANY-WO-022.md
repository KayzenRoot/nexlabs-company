# NXL-COMPANY-WO-022 — NexLabs Company v0.1 Integrated Acceptance

**Issue:** #23
**Status:** `ADMITTED / IN_PROGRESS` — read-only release-audit increment, NOT release approval
**Classification:** `NECESSARY`
**Risk:** `ELEVATED` (release sign-off, security/governance, no destructive mutations)
**Admission base:** `d2f7acc85babd62cfacb87a4d061ef39e74a566d`
**Branch:** `audit/NXL-COMPANY-WO-022-v01-integrated-acceptance`
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-022.json`

## OBJECTIVE
Audit the v0.1 canonical Definition of Done against exact Git/CI/evidence, identify fulfilled/partial/unproven obligations, produce a factual residual risk register and separate an audit recommendation from the Founder's explicit acceptance.

## CONTEXT
WOs 002–021 and 023 have been approved/merged with *bounded* proofs: local Docker infrastructure, deterministic offline engineering cell, local Git snapshot with verified fixture-run evidence and synthetic-data recovery. Real agent/provider/Founder authentication, persistent Company OS transactional runtime and live production observability are NOT_CONNECTED. A green CI gate does not prove these capabilities.

## SCOPE
- Read-only full DoD mapping with source references, exact base/head and confidence/limitations per obligation.
- Rerun all current CI gates plus deterministic cell, Founder UI/HTTP, Docker recovery and security checks; check persistent artifacts exist and were previously accepted.
- Review architecture, data integrity, secret boundaries, privileged action/approval default-deny, run evidence semantics, recovery and portability.
- Produce a release-readiness report with statuses PROVEN, PARTIAL, NOT_PROVEN, BLOCKED; identify whether offline-only v0.1 is permissible under accepted Scope/DoD **without weakening decisions**.
- Identify outstanding evidence and approval conditions. Explicit Founder sign-off must remain `PENDING` until actual user approval for *precisely defined scope*.
- Record an evidence and residual-risk matrix in Git; a blocked verdict cannot promote v0.1 to COMPLETE.

## OUT OF SCOPE
Provider/LLM integration, production deployment, migrations, money/Web3 actions, modifying Source Pack to soften DoD, generating fake run/cost metrics, secret use, privileged execution, releases or irreversible operations.

## FILES/SOURCES TO READ
Current main checkpoint; Decisions Ledger; Scope; DoD; Architecture; Requirements; test/benchmark plan; all preceding Work Order closeouts and CI; WO-019 cell; WO-020 local UI; WO-021 recovery; WO-023 offline receipts; API/security/authorization docs.

## REQUIREMENTS
REQ-001–020, interpreted with approved Scope. No executable authority can be inferred from an offline fixture.

## ARCHITECTURE RULES
PostgreSQL canonical only when a transactional Company OS actually runs. Preserve explicit Founder authority, provider neutrality, receipt integrity, local-first portability and high-risk fail-closed policy.

## CONSTRAINTS
One admitted Work Order. Exact frozen base and source SHA fingerprints; stale on canon changes. Evidence must cite Git paths/commits/CI IDs, not chat descriptions. Founder sign-off cannot be impersonated or implicitly inferred from generic "continue".

## ACCEPTANCE CRITERIA
1. Every release-blocking DoD item maps to a verifiable artifact/evidence and a truthful PROVEN/PARTIAL/NOT_PROVEN/BLOCKED outcome.
2. Release audit script/report is deterministic, conservative and rejects missing Source Pack, missing/broken evidence paths, incorrect WO lifecycle or green-test fabrication.
3. All 22 predecessor CI gates plus new integrated audit gate pass on exact head.
4. Any unproven blocking DoD requirement yields `RELEASE_NOT_APPROVED`, a correction/work plan and no version-complete checkpoint.
5. No HIGH/CRITICAL defect known without explicit BLOCKED verdict; no new production claim.
6. Explicit Founder acceptance remains pending absent recorded assent to the exact bounded release candidate.

## TESTS
Node 22 read-only audit/evidence script and adversarial tests; all prior 22 workflows, Docker fixture smoke, repo/source consistency and security checks.

## DELIVERABLES
`.engineering/audits/V01-INTEGRATED-DOD-REVIEW.md`, `company-os/acceptance/v01-audit.mjs`, associated tests, `.github/workflows/integrated-acceptance-validation.yml`, Work Order/Context Lock/checkpoint/registry/issue/PR. No final version tag or merge of failed gate.

## REVIEW FORMAT
PT-BR exact base/head, each DoD assessment, evidence proof/limit, security/operational gaps, risk severity, verdict APPROVED|CORRECTION REQUIRED|BLOCKED and Checkpoint Delta proposal (if eligible).

## STOP CONDITION
If DoD items remain NOT_PROVEN, BLOCKED, or explicit Founder acceptance is missing, report RELEASE_NOT_APPROVED. Do not merge/promote a misleading completion or initiate another Work Order before a governed correction or explicit decision.
