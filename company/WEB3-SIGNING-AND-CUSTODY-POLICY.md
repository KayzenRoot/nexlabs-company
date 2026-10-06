# NexLabs Technology — Web3 Signing & Custody Policy

**Status:** `CANONICAL_WO_011`

## Risk class

Any action that can move value, change ownership/privilege or permanently mutate a blockchain state is `HIGH_ASSURANCE`.

## Blind signing

Blind signing is prohibited for company-controlled value or privileged contracts.

Before approval, the signer must be able to inspect a human-understandable transaction intent.

## Transaction preview

Where technically possible, preview:
- chain/network;
- from/to;
- asset/token;
- amount/value;
- contract/function;
- parameters;
- approvals/allowances;
- gas/fees;
- nonce;
- expected state change;
- simulation result;
- expiry/deadline.

## Separation

For material value:
- requester/planner;
- policy/risk checker;
- Founder/authorized approver;
- signing executor;
- post-action verifier

should be logically separated according to risk.

## Key custody

Private keys/seed phrases must not be placed in ordinary agent context, repos, prompts or logs.

Prefer dedicated signing boundary such as:
- hardware signer;
- managed KMS/HSM/MPC;
- policy-enforced wallet;
- isolated signing service.

Concrete custody technology is deferred to implementation.

## Allowances/approvals

Unlimited token approvals are disfavored.

Use minimum necessary scope/value/time where feasible.

## Smart contracts

Production deployment/upgrade with material value/privilege requires:
- exact bytecode/source identity;
- network verification;
- test/audit evidence proportional to risk;
- explicit upgrade/admin key plan;
- post-deploy verification.

## Regulatory applicability

Before providing virtual-asset services or securities-related crypto functions, perform current regulatory applicability review.

The BCB/CVM boundary is product/activity-specific and must not be guessed by agents.

## No autonomous speculation

Research/analysis agents do not gain permission to trade or sign simply because they generated a strategy.
