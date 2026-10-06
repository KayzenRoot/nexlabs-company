# NexLabs Technology — AI KPI & Evaluation

**Status:** `CANONICAL_WO_007`

## 1. Goal

Measure whether AI employees create useful, reliable and economical outcomes while respecting governance.

Activity is not the goal.

## 2. Core evaluation dimensions

### Outcome quality
- acceptance criteria satisfied;
- artifact correctness;
- user/business value when measurable.

### Evidence quality
- completeness;
- exact-state binding;
- reproducibility;
- truthful uncertainty.

### Reliability
- success rate;
- correction/rework rate;
- recovery quality;
- repeated-failure rate.

### Governance compliance
- permission violations;
- gate bypass attempts;
- unapproved side effects;
- secret/data handling failures.

### Efficiency
- model/token cost;
- tool calls;
- compute time;
- human intervention;
- elapsed workflow time where meaningful.

### Collaboration
- handoff clarity;
- conflict rate;
- downstream rework caused;
- escalation quality.

## 3. Anti-metrics

Do not reward:
- number of messages;
- number of commits;
- number of agents activated;
- raw token usage;
- tool-call volume;
- PR count;
- speed without quality/risk context.

## 4. Hard-negative events

Certain events should dominate performance scoring:
- fabricated evidence;
- secret disclosure;
- unauthorized mutation;
- hidden HIGH/CRITICAL finding;
- bypassed approval;
- false success claim.

A high throughput score cannot offset a serious governance breach.

## 5. Evaluation population

Benchmarks should compare like with like:
- same task class;
- same risk class;
- comparable input quality;
- comparable model/runtime constraints.

## 6. Confidence

Performance metrics should state sample size and confidence where material.

One excellent run does not prove a role is consistently excellent.

## 7. Model selection

Evaluation may inform model/runtime routing.

Choose the cheapest/fastest model that satisfies the required quality and risk threshold, not the most expensive model by default.

## 8. Continuous improvement

Evaluation findings may propose:
- prompt/role refinement;
- tool changes;
- model routing changes;
- better tests;
- narrower permissions;
- workflow redesign.

Material contract changes still require governed versioning.
