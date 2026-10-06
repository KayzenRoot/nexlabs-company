# NexLabs Technology — Financial Action Safety

**Status:** `CANONICAL_WO_011`

## Separation of analysis and execution

Financial analysis, forecasting, portfolio analytics and recommendations are distinct from:
- company payments;
- customer-money movement;
- investment/trading execution;
- credit/loan actions;
- settlement.

Analysis permission does not imply execution permission.

## High-assurance actions

Company money movement, trading execution and value-bearing financial operations are classified as `HIGH_ASSURANCE` and require:
- exact action preview;
- beneficiary/account/instrument identity;
- amount/value/currency;
- fees;
- purpose;
- approval;
- policy/limit check;
- idempotency protection where feasible;
- post-action read-back/receipt.

## Limits

Future implementation should support:
- per-action limit;
- daily/period limit;
- counterparty allowlist;
- environment/account limit;
- dual approval above thresholds.

Exact numeric thresholds require later Founder/finance policy.

## No secret inference

Agents must never infer payment details, wallet addresses or beneficiary information from ambiguous context.

## Trading

If NexLabs ever enables trading:
- strategy generation is isolated from order placement;
- exact instrument/venue/side/size/type/price guardrails are required;
- stale market data must be detectable;
- max-loss/risk limits must be explicit;
- cancellation/kill switch must exist where supported.

## Customer funds

Handling/custody of customer funds introduces materially higher regulatory/security obligations and is blocked until specifically authorized and reviewed.

## Records

Financial execution receipts must be attributable and reconciled against provider/bank/exchange state.
