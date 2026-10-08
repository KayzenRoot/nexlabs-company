# WO-022 | Amendment proposal for independent governance review

**Status:** `REVIEW_DRAFT_ONLY / NO_CANONICAL_POLICY_MUTATION / NO_WO_024_ADMISSION`  
**Proposed resolution ID:** `NXL-GOV-BLOCKED-AUDIT-HANDOFF`  
**Founder decision receipt:** [issue #127, comment 6050879986](https://github.com/KayzenRoot/nexlabs-company/issues/127#issuecomment-6050879986)  
**Proposal anchored to:** `deba799b46a6d218dc2147d7b70aee7afd3c2adc`  
**Admission base:** `d2f7acc85babd62cfacb87a4d061ef39e74a566d`  
**Active WO:** WO-022 / issue #23 / [draft PR #67](https://github.com/KayzenRoot/nexlabs-company/pull/67)  
**Candidate successor:** WO-024 / issue #68, **NOT_ADMITTED**.

This file is a **reviewable proposed amendment**. Its suggested wording below is NOT an accepted ADR, does NOT replace Source Pack documents, and cannot be invoked as an execution permission. The current WO-022 is read-only. Do not copy these clauses into canonical sources, merge, admit WO-024, or change the existing Context Lock unless a **separately governed and independently reviewed amendment path** has been approved.

## Problem and invariants

The accepted GEF v1.1.2 state machine allows `BLOCKED` but does not define release of the only-admitted-WO slot for an incomplete **release acceptance audit**. At readback, `main` checkpoint is idle at `d2f7acc8`, whereas unmerged PR #67's checkpoint and issue #23 show WO-022 admitted. A system relying only on the main checkpoint could mis-admit the successor.

The proposed narrow administrative deferral **must not** mean APPROVED, MERGED, RELEASED, or COMPLETE. Its purpose is to permit necessary remediation without falsely finishing the original acceptance audit. It does not broaden financial/security authority.

## Proposed source-pack changes (not applied)

### A. `company/ENGINEERING-ORCHESTRATION-STATE-MACHINE.md`, following Blocked path

> **Blocked release-audit deferral (exception for administration, not release):** An ADMITTED acceptance audit with objective `RELEASE_NOT_APPROVED` may enter `BLOCKED_AWAITING_REMEDIATION` only after an explicitly scoped Founder governance decision, independent review of the proposed transition, preservation of the original immutable audit evidence, and an approved versioned governance amendment. The transition is non-approval, and the old Work Order/Context Lock may not resume or expand silently. Marking blocked does not automatically free admission. A separately audited reconciliation must first retire sole-active authority across checkpoint MD/JSON, registry, backlog, issue, and PR. Any missing record or ambiguous write moves to `RECOVERY_REQUIRED`; never admit a successor while unresolved.

### B. `company/WORK-ORDER-ADMISSION-PROTOCOL.md`, following Admission checks

> **Deferred blocked audit dependency:** Before admitting a successor to a blocked release audit, prove the amended `BLOCKED_AWAITING_REMEDIATION` transition is accepted, verify original exact Git SHA/CI/review evidence and the Founder-scoped governance decision, read back GitHub issue/PR alongside current canonical checkpoint, and ensure the prior audit no longer holds sole-active authority. The transition must be externally reviewed by an actor independent of author/executor. Then compile the successor from a fresh main SHA with independent Context Lock, permissions, scope and admission transaction. `main.activeWorkOrder=null` is never sufficient if any other authoritative source contradicts it. Founder approval of a governance transition never constitutes final release acceptance.

### C. `company/CHECKPOINT-PROMOTION-PROTOCOL.md`, separate administrative exception section

> **Non-successful acceptance-audit deferral:** An explicitly approved and reviewed administrative deferral may record an incomplete acceptance audit as `BLOCKED_AWAITING_REMEDIATION` in a distinct, traceable checkpoint transition. This is NOT successful implementation promotion: do not apply the APPROVED/MERGED/COMPLETE path, release tag, deployment or Founder release approval. An independent reviewer must verify exact source SHA, issue/PR reconciliation and no two concurrently admitted WOs. Inconsistent provider or checkpoint writes require `RECOVERY_REQUIRED`, read-only readback and bounded repair. After remediation, create a new independently admitted acceptance WO, re-evaluate all 26 obligations and obtain separate Founder release acceptance.

### D. `.engineering/DECISIONS-LEDGER.md`, append only if accepted under a new governed WO

> **Proposed D-0179 — Deferred incomplete release audit is not release acceptance.** `PROPOSED / NOT_CANONICAL`: WO-022 may be administratively blocked awaiting remediations after precise Founder governance direction, independent transition review, immutable audit references and coherent single-active-WO checkpoint transition. The original Context Lock remains immutable, the final acceptance is a new WO, and the v0.1 release stays `RELEASE_NOT_APPROVED` until independently evidenced DoD and explicit Founder release acceptance. This draft number must be reconciled against the **live** ledger before any authorized append.

## Proposed transition acceptance proof, after independent review

The independent reviewer evaluates the actual proposed source diff, not merely the existence of this draft; records reviewer identity, independent separation from author/executor, exact head, requested corrections, and an explicit approval/verdict. A self-reviewed owner PR or another model controlled by the author is NOT falsely claimed to be a qualified independent human review. GitHub-native review is read back and matched to exact candidate SHA.

The eventual authorized transition must preserve original audit reference and seven gap statuses; prepare an atomic or recoverable readback-driven update to checkpoint MD+JSON, ledger, registry, backlog, issue and PR; prove no two admitted WOs; include rollback/recovery from partial writes; and only **then** permit a fresh WO-024 admission preflight. All unverified external capabilities remain `NOT_CONNECTED`.

## Objective tests and negative scenarios

**Read-only tests added under WO-022:**
- `company-os/acceptance/blocked-audit-handoff.mjs`
- `company-os/acceptance/blocked-audit-handoff.test.mjs`
- `.github/workflows/integrated-acceptance-validation.yml`

These assert current authority divergence, correct proposal scope, `RELEASE_NOT_APPROVED`, 19 bounded PROVEN + 6 PARTIAL + 1 BLOCKED, successor NOT_ADMITTED, missing independent review, rejection of self-review and stale SHA, and **no transition authority even with seemingly approved reviewer metadata**. These tests use offline metadata fixtures and Git-sourced admission-base checkpoint; they are not proof that a real reviewer or live backend exists.

**Future implementation proof:** provider-native exact-head review; interrupted checkpoint/issue update reconciliation; idempotent retries; changed-main detection; cross-stream/exclusive admission; original lock immutability; fallback to BLOCKED when a gate fails; fresh final audit request instead of unblocking ACC-03.

## Reviewer checklist / expected output

Review the proposed sections A–D against the current GEF v1.1.2, Decisions Ledger D-0023–0029, D-0141–0142, D-0166–0169 and D-0175–0178, both checkpoints, WO-022 Context Lock, PR #67, issue #127 and WO-024 issue #68. Verify that no approved rule is overturned and no hidden admission/privilege expansion is introduced. Supply a **PT-BR** report with exact SHA, test evidence, findings, risk grade and verdict `APPROVED | CORRECTION REQUIRED | BLOCKED`. A qualified independent reviewer must be distinct from the original actor. Absence of such reviewer means `BLOCKED`, not automatic self-approval.

## Stop

**Current governance result:** `FOUNDER_GOVERNANCE_PROPOSAL_APPROVED / INDEPENDENT_REVIEW_PENDING / CANONICAL_AMENDMENT_NOT_APPLIED / WO_024_NOT_ADMITTED / RELEASE_NOT_APPROVED`.
