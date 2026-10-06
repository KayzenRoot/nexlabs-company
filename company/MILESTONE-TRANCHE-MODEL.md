# NexLabs Technology — Milestone / Tranche Release Model

**Status:** `CANONICAL_WO_012`

## Purpose

When an investment is released in tranches, each tranche should correspond to a measurable risk reduction or company milestone.

Calendar time alone is not sufficient evidence.

## Tranche record

- `tranche_id`
- `amount_or_range`
- `planned_window`
- `milestones`
- `evidence_required`
- `dependencies`
- `budget/use_of_funds`
- `approval_party`
- `release_status`
- `variance/replan`

## Milestone classes

### Product
Examples:
- MVP accepted;
- release;
- activation/retention threshold;
- validated core workflow.

### Commercial
Examples:
- paying customers;
- MRR range;
- pipeline quality;
- signed partnerships.

### Engineering
Examples:
- uptime/reliability;
- security gate;
- autonomous engineering proof;
- scalability benchmark.

### Company
Examples:
- legal/corporate setup;
- key governance;
- financial reporting;
- hiring/capability milestone.

### Economics
Examples:
- gross margin;
- unit-cost target;
- burn/runway target;
- CAC/payback evidence.

## Milestone quality

A milestone must specify:
- metric/event;
- measurement method;
- evidence source;
- threshold/range;
- deadline/window if needed;
- acceptance authority.

Avoid:
- “make good progress”;
- “finish most of product”;
- vanity traffic with no decision meaning.

## Tranche decision

Possible states:
- `NOT_DUE`
- `EVIDENCE_PENDING`
- `MILESTONE_MET`
- `PARTIAL_REVIEW`
- `REPLAN_REQUIRED`
- `BLOCKED`
- `RELEASE_APPROVED`

## Missed milestone

Missing a milestone does not authorize fabricated completion.

Instead:
- identify cause;
- update risk/economics;
- reforecast;
- decide whether to extend, modify, reduce, pause or stop funding.

Changes to binding investor terms require proper agreement/legal handling.

## Evidence

Tranche release should point to auditable company/product/finance evidence rather than a presentation-only claim.
