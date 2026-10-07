# NexLabs Technology — Cap Table Scenario Model

**Status:** `CANONICAL_WO_015`

## Purpose

Cap-table modeling helps the Founder understand ownership/dilution under hypothetical financing scenarios.

It does not create ownership rights.

## Actual cap table

The actual cap table must come from authoritative legal/company records.

This public repository should not hold confidential shareholder personal data or binding ownership records unless explicitly safe/appropriate.

## Scenario inputs

Possible inputs:
- pre-financing shares/units;
- founder ownership;
- existing investors;
- option/equity pool;
- convertibles/SAFEs/debt with conversion features;
- pre-money valuation scenario;
- new money;
- price per share/unit where applicable;
- pool top-up assumptions;
- conversion assumptions.

## Basic equity scenario

Conceptually:

`POST_MONEY = PRE_MONEY + NEW_MONEY`

Simple new-investor ownership approximation:

`NEW_INVESTOR_% ≈ NEW_MONEY / POST_MONEY`

This simplification may be wrong when options, convertibles, warrants, discounts, caps or complex terms apply.

## Fully diluted definition

Every scenario must explicitly state whether it includes:
- issued shares;
- reserved options;
- granted options;
- warrants;
- convertibles;
- SAFEs or similar rights;
- pool top-up.

## Scenario states

- `ILLUSTRATIVE`
- `FOUNDER_PLANNING`
- `NEGOTIATION_SCENARIO`
- `LEGAL_RECORD`

Only proper legal/company records may be treated as `LEGAL_RECORD`.

## Valuation

A cap-table scenario does not establish company valuation.

Valuation becomes part of an actual financing only through real negotiated/legal terms.

## Sensitivity

Model:
- funding amount;
- valuation scenario;
- pool size;
- conversion assumptions

to show ownership sensitivity.

## Governance

Final financing/cap-table decisions require Founder authority and qualified legal/accounting support as applicable.
