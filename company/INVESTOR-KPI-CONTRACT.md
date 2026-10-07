# NexLabs Technology — Investor KPI Contract

**Status:** `CANONICAL_WO_015`

## Metric record

Every material investor KPI should include:

- `metric_id`
- `name`
- `definition`
- `state`
- `value_or_range`
- `period`
- `source`
- `owner`
- `last_verified_at`
- `confidence`
- `comparability_notes`

## States

- `ACTUAL`
- `FORECAST`
- `SCENARIO`
- `TARGET`
- `UNAVAILABLE`
- `NOT_APPLICABLE`

## Typical investor KPI families

### Product
- active users/accounts where meaningful;
- activation;
- retention;
- workflow success;
- reliability.

### Commercial
- paying customers;
- MRR/ARR;
- pipeline, clearly not revenue;
- conversion;
- sales cycle;
- churn;
- NRR/GRR.

### Economics
- gross margin;
- contribution margin;
- CAC;
- payback;
- LTV where credible;
- AI/cloud cost-to-serve.

### Finance
- cash;
- gross burn;
- net burn;
- runway;
- budget variance.

### Product Factory / AI-native operations
Potentially:
- idea-to-validation cycle time;
- build/release cycle time;
- cost per successful automated task;
- reuse rate;
- autonomous vs human-intervention rate;
- defect/rework rate.

Only include metrics when definitions/evidence are stable enough to be decision-useful.

## Change control

Do not silently redefine a KPI to improve its trend.

If definition changes:
- version it;
- explain comparability impact;
- retain historical interpretation.

## Frequency

Investor reporting cadence may vary by financing agreement/stage, but source refresh and period must always be explicit.
