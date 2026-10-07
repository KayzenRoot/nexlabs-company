# NexLabs Technology — CRM Operating Model

**Status:** `CANONICAL_WO_013`

## Purpose

CRM is the operational source of truth for commercial interactions and pipeline state.

Canonical company/product strategy remains in Git.

## Core entities

### Contact
- identity/contact fields;
- role;
- account;
- consent/preferences;
- source;
- lifecycle stage.

### Account
- organization;
- segment/ICP;
- industry/context where relevant;
- owner;
- status;
- product relationship.

### Opportunity
- product;
- problem/use case;
- stage;
- value/range;
- probability/forecast class;
- close window;
- competitors/alternative;
- blockers;
- source/attribution.

### Activity
- channel;
- timestamp;
- actor;
- summary;
- next action.

### Consent / preference
- channel;
- state;
- source;
- date;
- legal/applicability context;
- suppression/unsubscribe.

## Data quality

Avoid:
- duplicate contacts;
- stale stage;
- missing source;
- uncontrolled free-text categories;
- speculative deal values presented as actual.

## Sensitive data

Do not use CRM as a dumping ground for:
- passwords;
- secrets;
- unnecessary sensitive personal data;
- confidential customer data unrelated to commercial purpose.

## Automation

Automations may update normal fields when evidence is deterministic.

Material stage/value/consent changes require attributable rules and auditability.

## Retention

Commercial data follows company privacy/retention policy.
