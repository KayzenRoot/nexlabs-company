# NXL-COMPANY-WO-019 — Autonomous Engineering Cell MVP

**Issue:** #20
**Status:** `APPROVED / MERGED`
**Classification:** `NECESSARY`
**Risk:** `ELEVATED / AUTONOMOUS_TOOL_EXECUTION`
**Admission base:** `1916ca9bc3d98c4a9f1dc15012514d15e5e7eeec`
**Branch:** `feat/NXL-COMPANY-WO-019-autonomous-engineering-cell-mvp`
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-019.json`

## Objective
Implement and test the first executable engineering-cell pipeline: Founder-approved intent → plan → Work Order/Context Lock → bounded executor adapter → staged file edits → QA → correction → review/evidence → checkpoint **handoff**.

## Scope / safety boundary
- Local, dependency-free Node 22 demonstration and tests with an injected deterministic executor; no real LLM/provider activity is claimed.
- No host shell, Docker socket, raw secrets, banking/Web3 writes or GitHub mutation from the cell.
- Use immutable in-memory staging for proposed edits; never apply proposed edits directly to the live repository.
- Founder intent needs exact digest/actor/organization/base binding, and an explicit approval; missing/stale authority is denied.
- Restrict edits to declared allowlist, validate relative safe paths, reject prohibited extensions/paths, budget attempts and produce append-only event receipts.
- QA is a separate deterministic evaluator, not an implicit executor verdict; review must not claim independent human signoff.
- Correction loop is bounded and cannot automatically waive a failed test.
- End with `READY_FOR_GOVERNED_PR` and a read-only checkpoint handoff. Actual GitHub PR, merge and checkpoint promotion stay in GEF process and are never performed implicitly.

## Deliverables
- `company-os/cell/engine.mjs`: deterministic cell application service.
- `company-os/cell/fixtures.mjs`: demo executor, cases.
- `company-os/cell/cli.mjs`: offline executable proof.
- `company-os/cell/engine.test.mjs`: adversarial E2E/contract tests.
- `company-os/CELL-MVP.md`: architecture, boundary, runbook.
- `infra/docker/compose.cell-demo.yaml`: isolated read-only local demo.
- `.github/workflows/engineering-cell-validation.yml`: permanent CI gate.
- Source hierarchy/decision ledger/checkpoint/registry/backlog updates and exact-head review evidence.

## Acceptance
1. Valid Founder action-bound approval and Context Lock required.
2. Planner and compiler generate explicit task/Work Order ID, allowed paths and SHA-scoped context.
3. Executor cannot mutate GitHub/host; proposals are untrusted data.
4. Scope/path traversal/policy bypass fail closed.
5. QA rejects faulty proposal, bounded correction can subsequently pass without erasing failed evidence.
6. Exact hash/immutable receipt and correction history survive to review.
7. High assurance approval is not implicitly granted; merge/promotion is never automatic.
8. Deterministic E2E passes positive and adversarial tests, including cancellation, stale context, mismatched approval, unsafe edit, unsuccessful correction and recovery.
9. All predecessor validators remain green and new cell validator passes on the same exact head.
10. WO-020 through WO-022 remain NOT_ADMITTED; no HIGH/CRITICAL unresolved finding.

## STOP CONDITION
Stop after exact-head PR review and bounded checkpoint promotion. No automatic admission/execution of WO-020. Live provider-backed execution requires separate reviewed sandbox and authority integration; a fake-provider proof is not production autonomy.


## Closeout

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`, review `5450076448`
- Audited head: `87cd7755fa8291f4902ddaf841da60a03f74e5fe`
- Implementation merged: `f31ea1bf10af2b0ad064459571b146eabb00d82a`
- Required validators: `19/19 SUCCESS` on exact audited head
- Offline E2E/adversarial tests and Docker Compose config passed in CI
- Known HIGH/CRITICAL for accepted offline demonstration: `0/0`
- Real Founder SSO/identity, live Hermes, isolated mutation broker, external GitHub writes and independent review are NOT proven.
- WO-020 remains NOT_ADMITTED pending separate admission.
