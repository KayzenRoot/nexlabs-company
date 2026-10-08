# NexLabs Technology — Checkpoint Promotion Protocol

**Status:** `CANONICAL_WO_009`

## Principle

Implementation merge and checkpoint promotion are separate controlled events.

## Preconditions

Promotion begins only after:
- implementation candidate received APPROVED verdict;
- exact-head checks are successful;
- implementation was merged;
- merge SHA is known;
- no blocking finding appeared after approval.

## Promotion delta

The promotion branch/PR should be narrow.

Typical changes:
- Work Order status → APPROVED / MERGED;
- closeout evidence;
- Checkpoint MD/JSON;
- Registry;
- Backlog;
- persistent validator normalization;
- README/current-state summary.

It must not include successor implementation.

## Promotion validation

Run all persistent applicable checks on the promotion head.

The promotion head itself must be auditable.

## Promotion audit

Verify:
- correct implementation audited head;
- correct merge SHA;
- closeout evidence accurate;
- active Work Order cleared;
- successor remains NOT_ADMITTED;
- sole next legal action is correct.

## Merge of promotion

After approval, merge the promotion PR.

Only then close the Work Order issue as completed.

## Successor admission

A successor becomes merely **eligible** after promotion.

It still requires:
- fresh source hydration;
- exact current base;
- freshly compiled Work Order;
- fresh Context Lock;
- explicit admission.

## Why separate promotion

Separating promotion:
- prevents implementation from declaring itself final;
- creates an auditable state transition;
- avoids accidentally executing successor work inside closeout;
- makes the Checkpoint a trustworthy handoff boundary.

## Non-success administrative retirement of a blocked acceptance audit

This exception is **NOT** ordinary successful checkpoint promotion, release approval, or an authorization to waive any DoD obligation. It applies solely to a previously admitted **read-only integrated acceptance audit** that has a reviewed and evidence-backed `BLOCKED / RELEASE_NOT_APPROVED` result, with material remediation outside its frozen Context Lock.

After the Founder's specifically scoped direction and a separate technical review (external automated review plus an explicitly identified `OWNER_SELF_AUDIT / NOT_INDEPENDENT` when no independent human is available), a **narrow governance PR** may administratively retire the failed audit from the sole-admitted slot. This reviewer arrangement must be recorded truthfully; CodeRabbit `COMMENTED` is technical input, never forged GitHub `APPROVED`, and no human independence may be inferred. High-assurance exceptions still require explicit Founder approval, bounded change, all applicable checks, negative-state tests and readback. The transition may not alter financial/IAM/signing authority.

The retirement is valid **only after** these predicates hold:
1. Exact audit PR HEAD, original source fingerprints, issue number, CI results and DoD gaps are preserved immutably as public-safe references. Current release verdict remains `RELEASE_NOT_APPROVED`, Founder release acceptance `PENDING`.
2. The accepted versioned schema identifies `workOrder.state=BLOCKED`, `workOrder.blockedReason=AWAITING_REMEDIATION` and `BLOCKED_AWAITING_REMEDIATION` only as a display label. No `COMPLETE` or `APPROVED / MERGED` claim is attached to WO-022.
3. The checkpoint MD/JSON, registry, backlog, and WO file in the **governance change** all agree on the blocked administrative state and **zero currently admitted WOs**. `completedThroughWorkOrder` remains WO-023, not WO-022, as the last successfully completed increment.
4. Persistent validators pass on the **blocked-state candidate** itself, including source-pack single-admission checks; unknown terminal states and a second active WO fail closed.
5. The governance PR is reviewed against its exact latest HEAD, satisfies repository branch protections and is merged without bypass. Its merge SHA and readback are recorded.
6. Only after governance main-state reconciliation, the original issue #23 and audit PR #67 may be administratively closed as **blocked, unmerged audit evidence**, without masquerading as successful implementation. Any unexpected provider result triggers `RECOVERY_REQUIRED` and halts admission.
7. A separate readback after the issue/PR mutations must confirm **no residual admitted claim**, no conflicting active Context Lock, and the exact merged governance policy; only then can a new WO-024 Context Lock and single-admission transaction be compiled from fresh main.

This is a tightly scoped administrative withdrawal, not a release promotion. A later, newly admitted final acceptance WO must independently assess all 26 DoD obligations on the exact release candidate and obtain explicit Founder release approval.
