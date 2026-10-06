# NexLabs Technology — Segregation of Duties

**Status:** `CANONICAL_WO_005`

## Purpose

An AI-native company can use one account or one runtime while still separating logical duties. The goal is to prevent a single unreviewed reasoning path from proposing, executing and approving consequential work.

## Engineering pattern

Default governed flow:

`Planner / Architect → Executor → Tests & Evidence → Reviewer / Auditor → Checkpoint Promotion`

For low-risk work, one system may perform multiple stages if the stages are explicit and evidence is regenerated after corrections.

For high-risk work, distinct review/authorization gates are mandatory.

## High-risk self-approval prohibition

The same agent/run must not be the sole:
- proposer;
- executor;
- approver

for an R3/R4 action.

Founder approval satisfies the human authorization gate but does not eliminate technical evidence requirements.

## Money

For future payment automation, separate where feasible:
1. payment proposal/invoice validation;
2. approval;
3. execution/signing;
4. reconciliation/audit.

No agent should be able to invent a payee and independently authorize and execute the payment.

## Web3 / signing

Separate:
1. transaction construction/simulation;
2. policy/risk review;
3. Founder/authorized approval;
4. signing/broadcast;
5. receipt/on-chain verification.

A private key/signer should not be generally available to planning/research agents.

## Credentials / IAM

Separate:
1. access request;
2. policy/need review;
3. grant/rotation operation;
4. post-change verification/audit.

Agents must not approve their own privilege elevation.

## Legal commitments

AI may research, draft and compare terms. Acceptance/signature is founder-reserved unless a future legally valid delegated authority model is explicitly established.

## Incident response

Containment may be automated when reversible and pre-approved. Destructive remediation or broad privilege changes require escalation according to risk.

## Logical independence

A reviewer must evaluate the exact candidate/evidence rather than merely repeat the executor’s conclusion. When independent human/account review is unavailable, the record must say so rather than fabricate independence.
