# WO-022 | Authority reconciliation and decision-ready handoff (proposal)

**Status:** `PROPOSED / REVIEW_REQUIRED / NOT_AUTHORIZED`
**Scope:** read-only integrated v0.1 acceptance audit, issue #23, PR #67. No source-pack governance amendment is enacted by this file.
**Original admission base / current main at the readback:** `d2f7acc85babd62cfacb87a4d061ef39e74a566d`
**Readback:** 2026-10-07 America/Sao_Paulo (2026-10-08 UTC).
**Candidate successor:** WO-024, issue #68; `PLANNED / NOT_ADMITTED`.

## 1. Exact authority divergence found

These are observed, distinct records, *not* two equal approvals:

| Source | Observed state | Interpretation |
| --- | --- | --- |
| `main:.engineering/CHECKPOINT.json` at `d2f7acc8...` | `activeWorkOrder:null`, `activeStatus:NONE`, `completedThroughWorkOrder:NXL-COMPANY-WO-023` | Last **promoted** canonical checkpoint; does not record admission of WO-022 yet. |
| PR #67 branch `.engineering/CHECKPOINT.json` | `activeWorkOrder:NXL-COMPANY-WO-022`, `activeStatus:ADMITTED_IN_PROGRESS`, issue #23 | Audit is active **on an unmerged branch**. |
| GitHub issue #23 | `ADMITTED / IN_PROGRESS`; v0.1 `RELEASE_NOT_APPROVED` | External activity record still claims admitted WO-022. |
| GitHub PR #67 | `OPEN / DRAFT / NOT_MERGED` | An audit candidate, not accepted release or promoted checkpoint. |
| GitHub issues #68–#75 | Open, each `PLANNED / NOT_ADMITTED` | Roadmap metadata only. |
| GitHub issue #127 | `DECISION_PENDING` | No approved authority transition. |

**Material finding:** the idle **main** checkpoint is insufficient proof that the governance stream is free. Reading main alone would allow an unsafe, conflicting interpretation while WO-022 remains admitted in GitHub issue/PR metadata. No tool may infer WO-024 admission from that checkpoint.

### Evidence and local checks

- Readback via GitHub repository connector: exact main branch SHA, both checkpoint contents, PR #67, issue #23, issue #127, and eight successor issues.
- `company-os/acceptance/remediation-preflight.mjs` now requires **both** (a) the exact Git admission-base main checkpoint with no active WO and (b) the active WO-022 branch checkpoint, and always denies successor admission.
- `company-os/acceptance/remediation-preflight.test.mjs` reads the actual admission-base snapshot with `git show <base>:.engineering/CHECKPOINT.json` and tests drift/forgery rejections.
- These are **read-only tests**. They do not access a live Founder session, issue authorization API, external reviewer signature or an operational Company OS.

## 2. Smallest proposed governance decision

**Candidate resolution `NXL-GOV-BLOCKED-AUDIT-HANDOFF` (not yet an accepted ADR):**

> A properly admitted release acceptance audit that truthfully concludes `BLOCKED / RELEASE_NOT_APPROVED` may be administratively deferred for necessary remediation, **without** approval of the release, **only** via a separate explicit Founder-governance decision, independently reviewed evidence, and a reconciled one-active-Work-Order handoff. `BLOCKED_AWAITING_REMEDIATION` is not `APPROVED`, `MERGED`, `COMPLETE` or `FOUNDER_ACCEPTED`. A deferred audit cannot silently resume under its old Context Lock. A new final acceptance WO must be admitted after remediation and tested against the exact candidate version.

This is a proposed **narrow change in governance semantics**, not a blanket bypass of admission, independent review, authentication or checkpoint promotion.

### Required qualified approvals

1. **Founder-governance decision:** an explicit approval bound to this proposed resolution and its risks, not a generic instruction to continue development; preserve refusal/decline as `BLOCKED`.
2. **Independent governance reviewer:** evidence-backed review by an actor other than the change author/executor; a second session/account controlled by the same author is not represented as an independent human reviewer.
3. **Source-pack amendment:** compile the minimal protocol/ADR change under an explicit authorized governance execution path. Do not mutate the original WO-022 Context Lock or secretly expand its read-only scope.
4. **Exact-head CI and PR review:** audit the protocol change as a change to the governance system. Passing checks alone is insufficient.
5. **Reconciled GitHub/source transitions:** read back **all** relevant records before unlocking WO-024.

### Transition acceptance criteria (future authorized execution only)

- Record immutable original audit and issue/PR refs including base/head SHA, CI/job IDs and seven unresolved DoD items.
- Persist `WO-022: BLOCKED_AWAITING_REMEDIATION` (not completed/approved), with a versioned deferred-audit record and an explicit link to the future *new* final acceptance WO.
- Reconcile checkpoint MD/JSON, registry, backlog, Work Order state, GitHub issue and PR **as one logical transition**, using expected versions/SHAs. If any step fails, enter `RECOVERY_REQUIRED` and read back. Never blindly repeat mutations.
- Verify no admitted successor yet, no hidden parallel WO, and no changed/unreviewed authority.
- Obtain a fresh approved Source Pack `main` commit, then compile/admit WO-024 from that exact SHA with its own Context Lock, branch and testable acceptance scope; only after admission may the persistent PostgreSQL runtime be implemented.
- Use a **new stable identifier** for final v0.1 acceptance after WO-024...WO-031 remediation, not an implicit reopening of the old WO-022 lock.
- Preserve the `ACC-03` Founder **release** acceptance as **PENDING** until the exact final version, risks, and operating boundaries are presented and expressly approved.

### Negative acceptance tests (mandatory for transition implementation)

The transition rejects: `main.activeWorkOrder=null` considered alone; WO-022 still active in issue or PR; reviewer identity identical to author/executor; stale source fingerprint; missing/expired approval; unrecognized approver; exact SHA drift; skipped predecessor; reused old Context Lock; two admitted WOs at once; partial checkpoint/issue write; `RELEASE_APPROVED`/tag/deploy asserted without 26/26 DoD + explicit release approval; privileged action without its own authorization.

## 3. Current evidence and remaining blockers

The pre-transition acceptance matrix still has **19 PROVEN (bounded), 6 PARTIAL, 1 BLOCKED** of 26 DoD items. `GOV-02, GOV-04, MVP-02, MVP-05, OPS-01, ACC-01` remain partial; `ACC-03` blocked.

No independent acceptance review, no implemented live integrations, and no final Founder release sign-off are established by this report. The latest CI must be re-verified on the new exact commit if this document changes the PR HEAD.

**Decision owner:** Founder, under D-0023, with independent review required.  
**Current verdict:** `DECISION_REQUIRED / BLOCKED`.  
**Next allowed action:** request explicit governance decision and independent review based on this packet; do **not** execute successor WO or merge/tag a release.
