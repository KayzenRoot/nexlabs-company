# NexLabs Company OS — Authorization & Approval Model

**Status:** `CANONICAL_WO_016`

## Principle

Role names describe responsibility. Capabilities and policy grant authority.

## Authorization inputs

A decision evaluates:
- actor identity/status;
- organization;
- capability grants;
- role assignments;
- target resource;
- environment;
- risk class;
- current policy version;
- action digest;
- approval envelope;
- time/expiry;
- task/Work Order context.

## Capability examples

- `work_order.read`
- `work_order.admit`
- `task.dispatch`
- `evidence.write`
- `repository.branch.write`
- `repository.merge`
- `deployment.promote`
- `finance.analysis`
- `finance.execute`
- `web3.sign`
- `secret.use:provider-x`

Capabilities are scoped.

## Default deny

No matching grant/policy means:
- `DENY` or
- `ESCALATE`

Never infer permission from title, prior success or tool availability.

## Approval classes

The governance policy may classify actions:
- AUTO;
- AUTO_AUDIT;
- REVIEW_REQUIRED;
- FOUNDER_APPROVAL;
- HIGH_ASSURANCE;
- PROHIBITED.

## High-assurance flow

1. produce exact action preview;
2. calculate action digest;
3. create approval request;
4. verify approver authority;
5. approve exact digest/constraints;
6. issue bounded authority envelope;
7. executor consumes envelope for the matching action;
8. verify/read back actual result;
9. bind evidence to action;
10. close or enter recovery.

Approval for one digest cannot authorize a materially different action.

## Separation of duties

Policy may require requester, approver and executor/reviewer to be logically distinct.

An AI agent cannot approve its own privilege expansion.

## Revocation

Grants/envelopes may be revoked.

Long-running work should re-check authority at consequential boundaries.

## Secret use

Permission references a secret capability/handle.

It does not expose the raw secret to normal agent/application records.

## Policy evaluation output

```json
{
  "decision": "ALLOW|DENY|APPROVAL_REQUIRED|ESCALATE",
  "policy_version": "string",
  "matched_grants": [],
  "constraints": {},
  "required_approval_class": "HIGH_ASSURANCE|null",
  "reason_codes": []
}
```
