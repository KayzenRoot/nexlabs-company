# NexLabs Technology — Unit Economics

**Status:** `CANONICAL_WO_012`

## Purpose

Unit economics answers whether serving/acquiring one more customer/unit creates sustainable value.

## Cost-to-serve

Product cost-to-serve may include:
- model inference;
- cloud compute/storage/network;
- data/API fees;
- payment fees;
- support directly attributable;
- content/asset generation;
- variable vendor costs.

## Gross margin

Management form:

`GROSS_MARGIN = (REVENUE - COGS) / REVENUE`

COGS policy must be consistent.

## Contribution margin

Contribution margin may subtract additional variable/semi-variable costs beyond COGS.

The company must define which costs are included before comparing products.

## CAC

`CAC = attributable sales + marketing acquisition spend / new acquired customers`

Use cohort/channel attribution where possible.

If attribution is immature, report CAC as `UNAVAILABLE` or estimated with assumptions.

## Payback

Simple CAC payback:

`CAC_PAYBACK_MONTHS = CAC / monthly gross-profit contribution per new customer`

Use only when the denominator is meaningful/stable.

## LTV

No single formula fits every product.

For a stable subscription model, a simplified estimate may be:

`LTV ≈ ARPA × gross margin % / monthly customer churn`

Only if:
- churn is positive/stable;
- cohorts are reasonably mature;
- ARPA/margin assumptions fit.

Prefer cohort-based realized/forecast LTV where data supports it.

## LTV:CAC

Useful only if both inputs are credible.

A beautiful ratio built from guessed churn and guessed CAC is not evidence.

## Usage/API products

Consider economics per:
- request;
- generation;
- compute unit;
- data unit;
- active account;
- paid workload.

## Games/transaction products

May require:
- payer conversion;
- ARPPU;
- platform fees;
- content cost;
- retention cohorts;
- marketplace take-rate.

## Decision principle

Unit economics inform scaling. They do not override strategy/security/legal gates.
