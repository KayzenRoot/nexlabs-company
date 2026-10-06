# NexLabs Technology — Autonomous Software Factory

**Status:** `CANONICAL_WO_009`

## 1. Purpose

The Autonomous Software Factory turns approved product/engineering intent into governed, auditable increments without removing Founder authority or GEF controls.

It reproduces the proven operating pattern:

`ANALYZE → SOURCE_CHECK → NEXT_NECESSARY_INCREMENT → WORK_ORDER → CONTEXT_LOCK → PREFLIGHT → EXECUTE → TEST_EVIDENCE → REVIEW → CORRECTION_OR_APPROVAL → MERGE → CHECKPOINT_PROMOTION → NEXT`

Automation may remove manual coordination. It may not remove the gates.

## 2. Entry conditions

The factory accepts work only when:
- the product/engineering intent is allowed by current company/product governance;
- predecessor dependencies are complete;
- the next increment is bounded;
- a Work Order can be compiled from current canonical state;
- no unresolved HIGH/CRITICAL finding blocks admission.

## 3. Canonical lifecycle

### ANALYZE
Understand desired outcome, current state, dependencies and risk.

### SOURCE_CHECK
Hydrate authoritative sources and exact provider/Git state.

### NEXT_NECESSARY_INCREMENT
Select the smallest sufficient next increment. Do not bundle unrelated future work.

### ADMIT / WORK_ORDER
Compile and explicitly admit one executable Work Order.

### CONTEXT_LOCK
Bind the admitted work to exact base state, critical source fingerprints, branch and allowed outputs.

### PREFLIGHT
Verify that context still matches, tools are available, authority is valid and no conflicting work invalidates execution.

### EXECUTE
A bounded executor performs only admitted work.

### TEST_EVIDENCE
Run required tests and capture exact-head evidence.

### REVIEW
Review the exact candidate head against Work Order, architecture, risk and evidence.

### CORRECTION
If findings are bounded and causal, correct inside the same Work Order. New head means new evidence.

### MERGE
Merge only an approved exact head.

### CHECKPOINT_PROMOTION
In a separate bounded delta, record the accepted implementation, close the Work Order and determine the sole next legal action.

### COMPLETE
No active Work Order. Successor work remains non-executable until separately admitted.

## 4. Output truth

The factory does not accept:
- "the agent says it passed";
- screenshots without state binding;
- tests from an older head;
- unverified tool success;
- conversation memory as canonical state.

Accepted truth is reconstructable from canonical sources and objective evidence.

## 5. Founder interface

The Founder should normally provide:
- goal;
- priority;
- constraints;
- explicit approvals when required.

The factory should absorb routine orchestration, retries, evidence collection, review routing and checkpoint bookkeeping.

The Founder is not expected to manually shepherd every commit.

## 6. Autonomy boundary

Autonomy is strongest for:
- analysis;
- documentation;
- bounded coding;
- tests;
- evidence;
- low-risk repository work.

Autonomy becomes more constrained as risk rises.

High-risk actions remain governed by the authority/risk system and may require Founder approval or independent review.

## 7. Fail closed

Unknown authority, stale critical context, ambiguous mutation or unresolved blocking finding does not transition forward.

A mutating action with unknown completion enters `RECOVERY_REQUIRED`. The factory performs read-only reconciliation, completes only confirmed missing work, or remains blocked/escalates. It never blindly replays an ambiguous mutation.
