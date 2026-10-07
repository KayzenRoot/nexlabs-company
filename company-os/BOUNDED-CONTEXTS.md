# NexLabs Company OS — Bounded Contexts

**Status:** `CANONICAL_WO_016`

## 1. Organization & Identity

Owns:
- organization;
- actors;
- identities;
- memberships;
- roles;
- capability assignments;
- actor status/revocation.

Does not own domain approvals or Work Order lifecycle.

## 2. Governance & Authority

Owns:
- policies;
- risk classes;
- capability rules;
- approval requirements;
- authority envelopes;
- governance decisions.

## 3. Work & Engineering Governance

Owns:
- initiatives;
- projects;
- Work Orders;
- Context Locks;
- tasks;
- runs;
- reviews;
- checkpoints;
- Work Order promotion state.

GEF remains the engineering-governance authority represented through this context.

## 4. AI Workforce

Owns:
- agent definitions;
- role contracts;
- runtime assignments;
- sessions;
- agent status;
- allowed tool profiles;
- provider/model preferences as policy references.

## 5. Product & Portfolio

Owns:
- product records;
- product stages;
- product experiments;
- validation evidence refs;
- portfolio state;
- roadmap references.

## 6. Research & IP

Owns:
- research initiatives;
- experiments;
- invention disclosures;
- provenance refs;
- disclosure classifications.

Does not claim legal patent/trademark status without authoritative external records.

## 7. Finance & Economics

Owns:
- management-finance snapshots;
- budgets;
- forecasts;
- cost allocation;
- unit-economics records;
- funding scenarios;
- financial metric definitions.

It does not execute bank/treasury writes directly.

## 8. Commercial & Customer

Owns:
- commercial model metadata;
- ICPs;
- experiments;
- CRM references;
- funnel/retention metrics;
- customer-success signals.

Sensitive CRM/customer detail may remain in external systems and be referenced rather than copied.

## 9. Investor & Diligence

Owns:
- investor-readiness state;
- pitch snapshots;
- KPI refs;
- diligence evidence index;
- data-room references/access classifications.

Confidential diligence documents remain in protected systems.

## 10. Approval & High Assurance

Owns:
- approval requests;
- approval envelopes;
- approval decisions;
- expiry/revocation;
- action binding.

This context is separated logically from the domain requesting the action.

## 11. Evidence & Audit

Owns:
- evidence metadata;
- content hashes;
- audit records;
- external receipts/references;
- immutable action timeline.

## 12. Integration & Execution

Owns:
- integration registrations;
- provider adapters;
- external object references;
- command dispatch;
- webhook/import checkpoints;
- execution reconciliation.

## 13. Observability & Cost

Owns:
- run telemetry;
- health;
- provider/model/tool usage;
- token/cost observations;
- failure classifications.

## Context rule

A context owns its data semantics.

Other contexts reference IDs or use declared interfaces/events rather than directly editing another context's tables.
