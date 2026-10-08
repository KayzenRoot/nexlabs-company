# NexLabs Technology — Work Order Admission Protocol

**Status:** `CANONICAL_WO_009`

Planning metadata is not execution authority.

## 1. Admission inputs

Compile from current:
- Checkpoint;
- Decisions Ledger/ADRs;
- Requirements;
- Architecture;
- Scope/DoD;
- relevant company/product policies;
- predecessor evidence;
- exact Git/provider state;
- current Founder intent.

## 2. Select one increment

The Planner/Architect chooses the smallest sufficient next increment that:
- materially advances an approved objective;
- can be objectively tested/reviewed;
- does not bundle unrelated successor work.

## 3. Compile the Work Order

At minimum:
- stable Work Order ID;
- issue/reference;
- status;
- exact base;
- branch;
- Context Lock path;
- objective;
- context;
- scope;
- out-of-scope;
- sources to read;
- requirements traceability;
- architecture rules;
- constraints;
- allowed outputs;
- acceptance criteria;
- tests;
- review format;
- stop condition.

## 4. Admission checks

Before setting ADMITTED:
- dependencies satisfied;
- no blocking predecessor finding;
- no conflicting admitted Work Order in the same governed stream;
- branch/base available;
- permissions sufficient for intended execution;
- repo disclosure constraints respected.

## 5. Admission mutation

Admission must update the governed state consistently:
- Work Order status;
- Context Lock;
- Checkpoint MD/JSON;
- Work Order Registry;
- Backlog;
- issue/task status.

If mutation partially applies, enter recovery and reconcile exact state before completing missing writes.

## 6. No implicit admission

Creating an issue, branch, prompt or agent task does not admit execution.

Only the canonical admission state does.

## 7. Re-admission

If scope materially changes, architecture changes, base drifts incompatibly or Context Lock becomes invalid:
- stop;
- refresh/recompile;
- record why;
- create a new lock/version as appropriate.

Do not silently mutate the original contract into a different project.

## 8. Blocked release-audit handoff guard

An idle `main` checkpoint is **not sufficient** to admit a successor if an unmerged audit PR or its GitHub issue still records an admitted Work Order. For the WO-022 non-success administrative deferral, require the narrowly Founder-authorized governance review arrangement in this section and an exact-head administrative deferral transaction before clearing that admission.

The handoff verifier must:
1. Read current main SHA, active audit PR head/base/state, issue, Context Lock, checkpoint MD/JSON, registry, backlog and decision receipt; reject any disagreement or stale evidence.
2. Confirm `BLOCKED / RELEASE_NOT_APPROVED`, immutable audit references, exact CI evidence and all unresolved release DoD requirements.
3. Verify the actual review arrangement against the scoped Founder direction and repository rules: CodeRabbit technical review plus an explicitly recorded `OWNER_SELF_AUDIT / NOT_INDEPENDENT` is permitted for this non-success administrative deferral when no independent human is available. CodeRabbit `COMMENTED` is never GitHub `APPROVED`; owner review remains non-independent. Keep all exact-head checks and HIGH/CRITICAL controls, and do not apply this exception to release approval, financial/IAM/signing actions or successor implementation.
4. **Only after acceptance of the versioned governance schema, exact-head CodeRabbit technical review, owner self-audit marked NOT_INDEPENDENT, and readback of the separately recorded Founder governance direction** bound to issue #127, the original WO-022 audit and the specific non-success handoff scope, perform the governed transition by writing the two canonical fields `workOrder.state = BLOCKED` and `workOrder.blockedReason = AWAITING_REMEDIATION`, rather than writing `BLOCKED_AWAITING_REMEDIATION` as a top-level state. The composite is a display label only. Reconcile the persisted values and the corresponding issue/PR claims in a narrow, recoverable, readback-verified sequence. Missing, revoked, stale, inconsistent or unauthenticated Founder decision evidence, unknown substatus, any residual admitted claim, or inconsistent/ambiguous provider result must fail closed as `BLOCKED` or `RECOVERY_REQUIRED`, without freeing the single-active slot. No second active WO and no false `APPROVED`, `MERGED`, `CLOSED_SUCCESS`, or release state.
5. On partial or ambiguous GitHub writes, set `RECOVERY_REQUIRED` and read back before repeating **only missing** operations.
6. Only once all canonical sources and provider records agree that the blocked audit no longer holds sole admission, compile the **successor** from a fresh main SHA, new Context Lock, separate review and ordinary admission process.

This proposal permits no concurrent admitted Work Orders, silent re-admission, unrestricted tool permission or implicit Founder **release** approval. If the governing amendment has not been accepted, remain `BLOCKED`.
