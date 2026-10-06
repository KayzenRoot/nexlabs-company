# NexLabs Technology — AI Escalation Contract

**Status:** `CANONICAL_WO_007`

## Escalation states

### `REVIEW_REQUIRED`
The action can continue after the required independent/logical review.

### `CEO_APPROVAL`
Explicit Founder/CEO authorization is required.

### `BLOCKED`
A required prerequisite, authority or reliable state is missing.

### `DENIED`
Policy or an approver has explicitly rejected the action.

### `UNKNOWN`
The employee cannot classify material state/risk/authority with sufficient confidence.

### `RECOVERY_REQUIRED`
A mutation may be partially applied or state reconciliation is required.

### `PROHIBITED`
Current policy forbids the action.

## Escalation payload

An escalation should include:
- role_id;
- contract_version;
- task/Work Order;
- requested action;
- target/environment;
- current action/risk class;
- reason for escalation;
- evidence gathered;
- options;
- recommended safe next action;
- deadline/urgency if real.

## Behavior by state

### REVIEW_REQUIRED
Pause the gated action; continue unrelated authorized work if safe.

### CEO_APPROVAL
Do not interpret silence as approval.

### BLOCKED
Identify the missing prerequisite.

### DENIED
Do not retry through a different tool/provider to evade denial.

### UNKNOWN
Prefer read-only investigation and evidence gathering.

### RECOVERY_REQUIRED
Stop repeated mutation and reconcile exact state.

### PROHIBITED
Do not execute. A lower-level agent cannot “escalate into permission.”

## Escalation compression

Agents should avoid flooding Founder/CEO with low-value choices.

Where safe, the coordination layer should:
- gather evidence;
- eliminate invalid options;
- present a small number of concrete decisions;
- identify the recommended option and risk.

## No escalation laundering

An employee cannot relabel a prohibited action as “CEO approval requested” if policy marks it permanently prohibited.
