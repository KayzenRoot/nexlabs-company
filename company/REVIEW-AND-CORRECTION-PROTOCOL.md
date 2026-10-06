# NexLabs Technology — Review & Correction Protocol

**Status:** `CANONICAL_WO_009`

## Review inputs

Reviewer receives:
- admitted Work Order;
- Context Lock;
- exact base/head;
- diff/change summary;
- required checks/evidence;
- architecture/policy sources;
- correction history.

## Review outputs

Exactly one primary verdict:

### `APPROVED`
Acceptance criteria satisfied; no unresolved blocking finding.

### `CORRECTION_REQUIRED`
Candidate is not acceptable but findings can be corrected safely within current Work Order.

### `BLOCKED`
Required authority/evidence/dependency is unavailable, or correction would exceed admitted scope/architecture.

## Finding severity

- CRITICAL
- HIGH
- MEDIUM
- LOW

No unresolved CRITICAL/HIGH may pass ordinary approval.

## Same-Work-Order correction

A correction stays inside the current Work Order only if it is:
- causal to a review/test finding;
- bounded;
- architecture-compatible;
- within allowed outputs/scope;
- safe to verify.

Examples:
- fix a test regression;
- correct a validator;
- repair documentation consistency;
- implement a missed acceptance criterion.

## Recompile/re-admit instead

Stop and recompile when correction:
- materially changes architecture;
- adds a new feature/objective;
- changes authority/risk assumptions;
- expands to unrelated files/systems;
- invalidates the original acceptance model.

## Correction loop

`finding → bounded correction → new head → rerun required evidence → new review`

Old approval/evidence does not automatically survive the new head.

## Reviewer independence

When independent review is unavailable, disclose:
`OWNER_SELF_AUDIT / NOT_INDEPENDENT`

This is weaker assurance and should not be disguised.

## No review laundering

Changing the reviewer/model/provider does not erase a valid finding.

A finding must be resolved, explicitly accepted through allowed exception policy, or remain blocking.
