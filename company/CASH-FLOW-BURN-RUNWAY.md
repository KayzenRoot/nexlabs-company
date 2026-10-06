# NexLabs Technology — Cash Flow, Burn & Runway

**Status:** `CANONICAL_WO_012`

## Cash

Cash position is reconciled available liquidity, not:
- ARR;
- signed pipeline;
- unpaid invoices;
- projected funding.

Restricted funds should be separated from freely available cash.

## Gross burn

For a period:

`GROSS_BURN = operating cash outflows`

Specify whether financing/investing flows are included or excluded. Default management view should focus on operating burn.

## Net burn

For a period:

`NET_BURN = operating cash outflows - operating cash inflows`

If operating inflows exceed outflows, net burn may be zero/negative depending on reporting convention; the convention must be explicit.

## Runway

Simple management runway:

`RUNWAY_MONTHS = AVAILABLE_CASH / AVERAGE_MONTHLY_NET_BURN`

Use only when net burn is positive and sufficiently stable to make the ratio meaningful.

A stronger model uses a month-by-month cash forecast with:
- committed expenses;
- hiring/capacity plan;
- expected collections;
- annual/prepaid timing;
- taxes/fees;
- funding events;
- downside scenario.

## Cash vs revenue

Do not confuse:
- invoice/bookings;
- recognized revenue;
- cash collection;
- MRR/ARR.

They answer different questions.

## Runway guardrails

Future Company OS should surface thresholds such as:
- comfortable;
- watch;
- constrained;
- critical.

Numeric thresholds are not frozen until the Founder approves operating policy.

## Downside response

When downside runway falls below approved tolerance:
- freeze optional spend;
- re-rank product portfolio;
- reduce variable model/cloud cost;
- delay noncritical expansion;
- evaluate funding/revenue acceleration;
- preserve security/reliability essentials.

Do not cut controls whose removal creates existential risk.
