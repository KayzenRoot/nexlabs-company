# NexLabs Technology — Risk Classification

**Status:** `CANONICAL_WO_005`

Risk classification determines minimum assurance. Risk is based on realistic impact, not on how easy an action is to execute.

## R0 — Informational

Characteristics:
- read-only;
- no external side effect;
- no sensitive disclosure;
- no meaningful financial/security consequence.

Default action class: `AUTO`.

Examples:
- read canonical docs;
- summarize public information;
- compute a non-binding estimate.

## R1 — Low / reversible

Characteristics:
- bounded mutation;
- reversible;
- isolated;
- no privileged secret/fund/legal effect.

Default action class: `AUTO+AUDIT`.

Examples:
- edit bounded docs;
- create branch/issue/PR;
- modify disposable local fixture.

## R2 — Moderate

Characteristics:
- shared state or customer-visible effect;
- compatibility/data/support impact;
- meaningful but recoverable blast radius.

Default action class: `REVIEW_REQUIRED`.

Examples:
- staging deployment;
- meaningful dependency change;
- public company publication;
- non-production migration with shared users/data.

## R3 — High

Characteristics:
- production impact;
- privileged access;
- meaningful money/value;
- legal commitment;
- sensitive/confidential disclosure;
- security boundary change;
- material customer/business consequence.

Default action class: `CEO_APPROVAL` plus elevated evidence.

Examples:
- material production deployment;
- privileged credential provisioning;
- vendor payment without a later pre-approved envelope;
- contract acceptance;
- value-bearing on-chain signing.

## R4 — Critical / irreversible / existential

Characteristics:
- ownership/control change;
- catastrophic or hard-to-recover production effect;
- unrestricted funds/keys;
- material regulatory/legal exposure;
- governance destruction;
- broad secret compromise.

Default: `PROHIBITED` unless a specific action is explicitly made executable by a later governed high-assurance policy and all external constraints allow it. Some actions remain permanently prohibited.

Examples:
- transfer company ownership by an AI agent;
- publish a private key/seed phrase;
- disable governance/audit globally to “get unstuck”;
- unrestricted autonomous treasury trading;
- erase evidence to hide an incident.

## Risk modifiers

Raise risk when any apply:
- production environment;
- sensitive personal/customer data;
- privileged credentials;
- funds/assets;
- irreversible effect;
- large blast radius;
- regulatory/legal consequence;
- ambiguous target;
- unverified source;
- unavailable rollback;
- cross-tenant/customer effect.

Lowering risk requires evidence, not optimism.

## Unknown risk

If risk cannot be classified with sufficient confidence:
- state = `UNKNOWN`;
- execution = `BLOCKED`;
- next action = gather evidence or escalate.

Unknown is never treated as R0/R1 by default.
