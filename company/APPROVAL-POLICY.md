# NexLabs Technology — Approval Policy

**Status:** `CANONICAL_WO_005`

## Approval is scoped

An approval must identify enough context to prevent reuse outside its intent:
- actor/role;
- action;
- target;
- environment;
- relevant resource/value limit;
- Work Order/workflow when applicable;
- expiry or one-time nature where relevant.

“Approved before” is not a universal token.

## Approval forms

### Policy approval
A canonical policy pre-authorizes a class of bounded actions.

### Work Order approval
Authorizes execution only inside admitted engineering scope.

### Transaction/action approval
Founder authorizes one specific high-risk action or a tightly bounded batch.

### Emergency approval
Founder authorizes exceptional response during an incident, with explicit limits and later reconciliation.

## CEO approval requirements

CEO approval must be explicit for R3/R4-exception actions. Silence, inactivity or an unread message is not approval.

A request should show:
- what will happen;
- why it is needed;
- exact target;
- expected impact;
- financial/value amount or bound where applicable;
- credentials/permissions involved;
- rollback or roll-forward strategy;
- evidence and risk classification.

## No implicit approval through tool access

Possessing a token, API key, wallet signer, admin session or write permission does not itself authorize use.

Capability and authority are distinct.

## No approval laundering

An agent may not split one high-risk action into smaller low-risk-looking actions to avoid an approval gate.

Risk follows the combined intent and impact.

## Expiry and invalidation

Approval becomes invalid when material context changes, including:
- target/head changes;
- amount/value changes;
- environment changes;
- new critical/high finding;
- scope change;
- credential/security state change;
- expired time window.

## Denied / blocked

If approval is denied or unavailable:
- do not execute;
- preserve useful evidence;
- report the blocked state and next prerequisite;
- continue only with unrelated explicitly authorized work.

## Founder override

Founder may make a governed exception where policy allows it. Exceptions must be recorded and cannot override law, external platform constraints or permanently prohibited actions.
