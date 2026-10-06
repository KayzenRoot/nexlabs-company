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
