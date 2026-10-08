# NexLabs Technology — Engineering Orchestration State Machine

**Status:** `CANONICAL_WO_009`

## Canonical states

`ANALYZE`  
`SOURCE_CHECK`  
`READY_TO_ADMIT`  
`ADMITTED`  
`CONTEXT_LOCKED`  
`PREFLIGHT`  
`EXECUTING`  
`TEST_EVIDENCE`  
`REVIEW`  
`CORRECTION_REQUIRED`  
`BLOCKED`  
`APPROVED`  
`MERGE_READY`  
`MERGED`  
`CHECKPOINT_PROMOTION`  
`COMPLETE`  
`RECOVERY_REQUIRED`

## Happy path

`ANALYZE → SOURCE_CHECK → READY_TO_ADMIT → ADMITTED → CONTEXT_LOCKED → PREFLIGHT → EXECUTING → TEST_EVIDENCE → REVIEW → APPROVED → MERGE_READY → MERGED → CHECKPOINT_PROMOTION → COMPLETE`

## Correction path

`REVIEW → CORRECTION_REQUIRED → EXECUTING → TEST_EVIDENCE → REVIEW`

Each correction creates a new candidate identity.

## Blocked path

Any state may transition to `BLOCKED` when required authority, dependency, source or evidence is unavailable.

A blocked Work Order does not authorize successor execution.

## Recovery path

A mutating tool timeout or ambiguous result transitions to:

`RECOVERY_REQUIRED → READ_ONLY_STATE_RECONCILIATION → known prior/current state`

After reconciliation:
- continue from the confirmed state;
- complete only missing work;
- or remain BLOCKED.

Do not blindly replay a mutation.

## Admission transition guards

To enter `ADMITTED`:
- predecessor gates satisfied;
- exact base known;
- scope bounded;
- Work Order compiled;
- active-work rules satisfied.

## Execution transition guards

To enter `EXECUTING`:
- admitted Work Order exists;
- Context Lock exists;
- preflight passes;
- permissions valid;
- critical source drift absent or reconciled.

## Review transition guards

To enter `REVIEW`:
- candidate head known;
- required tests terminal;
- evidence references available;
- material unknowns disclosed.

## Approval transition guards

To enter `APPROVED`:
- no unresolved HIGH/CRITICAL finding;
- required evidence passes;
- exact head is unchanged since evidence/review.

## Promotion transition guards

To enter `CHECKPOINT_PROMOTION`:
- approved implementation is merged;
- merge identity is known;
- promotion delta contains no successor implementation;
- closeout evidence is preserved.

## Illegal transitions

Examples:
- `ANALYZE → EXECUTING`
- `ADMITTED → MERGED` without tests/review
- `CORRECTION_REQUIRED → COMPLETE`
- `MERGED → successor EXECUTING` before checkpoint promotion/admission
- `RECOVERY_REQUIRED → blind mutation retry`

## Proposed non-success blocked release-audit deferral (governance amendment)

**Scope:** only an admitted **release acceptance audit** that remains objectively `BLOCKED / RELEASE_NOT_APPROVED`, with implementation remediation outside its immutable Context Lock.

The Founder may explicitly authorize a **separate governance amendment proposal** for `BLOCKED_AWAITING_REMEDIATION`, even while the audit is active. This authorizes **proposal and independent governance review only**, not a second ADMITTED Work Order, release, or implementation.

**Proposed canonical field mapping for the independently reviewed amendment:** keep `workOrder.state = BLOCKED` as the existing canonical state. Use `workOrder.blockedReason = AWAITING_REMEDIATION` as a **new, versioned substatus** only when an accepted governance schema/validator amendment provides that field. `BLOCKED_AWAITING_REMEDIATION` is a human-facing composite display label, **not** an additional top-level `workOrder.state` enum. Retain `release.verdict = RELEASE_NOT_APPROVED` and `release.founderAcceptance = PENDING`. Before this schema has been independently accepted and applied, a consumer encountering the composite string as a top-level state or any unknown `blockedReason` **must reject any admission-slot release** rather than treating an unrecognized state as terminal/success. This text does not create, migrate, or authorize the substatus by itself.

**Required validator amendment and negative tests before enactment:** normalize the existing Company OS Work Order state machine, checkpoint/registry/issue mapping and all 22+ persistent GitHub gates to the same state/substatus schema; deny unknown enum/substatus, a still-active issue/PR, an unreviewed deferral, missing Founder governance evidence and any second active WO. The controlled transition must be tested in a separate reviewed exact-head governance increment before any actual update of WO-022 state. Avoid disabling CI checks.

The blocked audit may relinquish its sole-admission slot **only after**:
- a governance amendment is accepted through independent, exact-head review and separately recorded Founder direction;
- the frozen audit verdict/issue/PR/Context Lock/CI evidence and outstanding DoD gaps are preserved;
- a bounded administrative handoff reconciles checkpoint MD/JSON, registry, backlog, issue and audit PR, with expected Git SHAs and readback of all provider writes;
- validators demonstrably recognize the **non-success** blocked deferral without treating it as APPROVED/MERGED/COMPLETE;
- no other Work Order is ADMITTED during the transition.

`BLOCKED_AWAITING_REMEDIATION` means **deferred incomplete audit**, not `APPROVED`, `MERGED`, `CHECKPOINT_PROMOTION`, `COMPLETE`, `RELEASED` or release acceptance. Ambiguous or partial state writes move to `RECOVERY_REQUIRED`, never to a free admission slot. The deferred audit cannot resume under the old Context Lock. After separately admitted remediation, a **new final acceptance Work Order** must test the exact release candidate and receive distinct Founder release acceptance.

This exceptional transition may not waive high-assurance security/finance actions, independent reviewers or ordinary admission requirements for the successor. No branch-protection bypass, force-push or approval-by-chat-only is permitted.
