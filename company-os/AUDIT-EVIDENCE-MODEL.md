# NexLabs Company OS — Audit & Evidence Model

**Status:** `CANONICAL_WO_016`

## Purpose

Every consequential action should be reconstructable after the fact.

The system must answer:
- who/what acted;
- under which authority;
- what was requested;
- what state existed before;
- what changed;
- what external provider said happened;
- which evidence supports the result;
- which exact candidate/version was reviewed.

## Audit record

Append-only audit records contain:
- actor;
- organization;
- action type;
- resource;
- command ID;
- correlation/causation;
- authority reference;
- risk class;
- outcome;
- before/after refs where meaningful;
- evidence refs;
- redacted metadata;
- timestamp.

## Evidence bundle

Evidence is grouped into bundles tied to:
- Work Order candidate head;
- deployment;
- approval;
- financial/high-assurance action;
- incident;
- external mutation.

Bundle manifest includes:
- bundle type;
- exact state/SHA;
- item list;
- hashes;
- provider refs;
- verification state.

## Evidence item

An item may be:
- test result;
- workflow run;
- provider receipt;
- Git SHA;
- artifact hash;
- screenshot;
- signed/verified response;
- review;
- benchmark;
- external document reference.

Large items live in artifact/object storage.

## Immutability

Evidence items are immutable by content hash.

Corrections produce new evidence and supersession relationships; they do not rewrite historical evidence.

## Exact-head rule

Tests/reviews from one candidate head cannot be used as evidence for a later changed head unless the evidence explicitly remains valid under a governed rule.

Default: new head means new evidence.

## Redaction

Audit metadata must not contain raw secrets.

Sensitive details may be:
- redacted;
- tokenized;
- referenced through protected evidence handles.

## Retention

Retention differs by record type and regulatory/business need.

Audit/evidence retention is policy-driven and should preserve necessary governance history while respecting privacy/deletion obligations.

## Verification

Evidence may be:
- `CAPTURED`
- `VERIFIED`
- `SUPERSEDED`
- `INVALIDATED`
- `UNAVAILABLE`

Promotion gates require the evidence state appropriate to the Work Order/risk class.
