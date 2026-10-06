# NexLabs Technology — Escalation & Incident Authority

**Status:** `CANONICAL_WO_005`

## Escalation triggers

Escalate when:
- authority is unknown/conflicting;
- action exceeds role permission;
- risk is R3/R4;
- required evidence is missing/stale;
- target changed after approval;
- a HIGH/CRITICAL finding exists;
- an operation reports uncertain partial completion;
- security compromise is suspected;
- money/value/legal commitment is involved beyond a canonical envelope.

## Escalation path

`Specialist → Team Lead → Executive / Chief of Staff → Founder / CEO`

A lower layer may escalate directly to Founder/CEO when policy requires.

## No timeout-to-approval

If the next approver is unavailable:
- the action remains pending/blocked;
- the system may continue safe unrelated work;
- approval does not materialize because time passed.

## Incident posture

Priorities:
1. protect people/data/assets;
2. contain blast radius;
3. preserve evidence;
4. restore safe service;
5. investigate;
6. reconcile governance/checkpoints;
7. learn and update controls.

## Pre-authorized containment

Where a later system implements it, reversible containment may be `AUTO+AUDIT` or `REVIEW_REQUIRED`, for example:
- disable a compromised non-critical token;
- isolate a worker;
- pause a queue;
- scale a failing service to zero when customer/data risk is lower than continued execution;
- block a known malicious input/source.

Exact actions require system-specific policy before implementation.

## Emergency limits

An emergency does not authorize:
- deleting evidence;
- leaking secrets;
- transferring funds to an unknown destination;
- bypassing law/compliance;
- permanent governance disablement;
- unrestricted privilege escalation.

## Recovery uncertainty

If an operation might be partially applied:
- stop repeated mutation;
- preserve logs/journals/receipts;
- observe state read-only;
- classify as `RECOVERY_REQUIRED` or equivalent;
- resume only after state is reconciled.

## Post-incident

A material incident requires:
- timeline;
- affected assets/data;
- actions/approvals;
- root cause when known;
- remediation;
- residual risk;
- evidence references;
- governance/architecture changes if needed.
