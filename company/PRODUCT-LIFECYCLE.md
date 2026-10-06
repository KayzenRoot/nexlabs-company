# NexLabs Technology — Product Lifecycle

**Status:** `CANONICAL_WO_008`

## Canonical states

`IDEA`
Raw opportunity.

`INTAKE`
Minimum structured problem/value record exists.

`RESEARCH`
Evidence gathering active.

`VALIDATION`
High-risk assumptions actively tested.

`DEFERRED`
Not active; has explicit revisit trigger.

`REJECTED`
Will not pursue under current thesis/evidence.

`SPECIFIED`
Product Case/MVP definition approved for engineering admission.

`BUILD`
Active engineering under GEF Work Orders.

`RELEASE_READY`
Build has passed its required gates and awaits release/promotion.

`RELEASED`
Available to target users/environment.

`OBSERVE`
Measurement/learning window active.

`ITERATE`
Continue bounded improvement.

`SCALE`
Evidence supports materially increased distribution/capacity/investment.

`MAINTAIN`
Stable, limited change.

`PAUSED`
Investment stopped while preserving optionality/obligations.

`PIVOT`
Core hypothesis is intentionally changed; affected validation must be repeated.

`RETIRING`
Controlled shutdown/migration/support process active.

`RETIRED`
No longer actively operated except required records/obligations.

## Transition rule

Every transition should have:
- decision actor;
- evidence;
- reason;
- date;
- next state;
- required follow-up.

## Build state

`BUILD` is not one giant implementation.

It contains governed engineering increments, each with its own Work Order.

## Release

“Code merged” and “product released” are different states.

## Pivot

A pivot invalidates evidence that depended on the changed hypothesis.

Do not preserve an old validation score by renaming the product.

## Retirement

Retirement should consider:
- user communication;
- data export/deletion;
- contractual obligations;
- billing stop;
- infrastructure shutdown;
- archival/evidence.
