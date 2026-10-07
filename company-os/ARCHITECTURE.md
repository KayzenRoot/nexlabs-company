# NexLabs Company OS — Functional Architecture

**Status:** `CANONICAL_WO_016`

## Purpose

Company OS is the internal operating system that turns Founder intent and canonical company policy into governed work, state, evidence and decisions.

It does not replace GitHub, model providers, banks, CRMs or other systems. It coordinates them through explicit contracts.

## v0.1 architecture style

Start as a **modular monolith** with explicit bounded-context modules.

Why:
- company workflows need strong consistency across governance/work state;
- the initial operating team is small;
- local-first deployment should be simple;
- premature service boundaries would create distributed failure modes before real load requires them.

Modules must communicate through declared interfaces/events so later extraction is possible.

## Canonical state

### PostgreSQL
Canonical transactional truth for Company OS.

Examples:
- organization;
- actors;
- roles/capabilities;
- products/projects;
- agents;
- Work Orders;
- tasks/runs;
- approvals;
- decisions;
- evidence metadata;
- checkpoints;
- integration references;
- audit metadata;
- outbox events.

### Artifact / object storage
Large evidence/artifacts:
- logs;
- reports;
- screenshots;
- exported documents;
- build artifacts;
- media;
- signed receipts where appropriate.

Database stores immutable references, hashes and metadata.

### Redis / cache / queue
Optional operational acceleration:
- cache;
- ephemeral locks;
- rate limiting;
- transient queue coordination.

Redis is not canonical truth.

### Vector / semantic index
Optional derived index for retrieval.

It may help agents find information but cannot override canonical relational/Git/company sources.

## Primary runtime flow

`FOUNDER_INTENT → GOVERNANCE → WORK_ORCHESTRATION → AGENT/EXECUTOR ADAPTER → EXTERNAL SYSTEM → EVIDENCE → REVIEW/APPROVAL → CHECKPOINT`

## Command path

1. authenticate actor;
2. resolve organization;
3. load relevant policy/capabilities;
4. validate command;
5. classify risk;
6. validate approval envelope if required;
7. execute transactional state change;
8. append audit record;
9. write domain event to transactional outbox;
10. commit;
11. asynchronously publish/consume event;
12. capture provider/effect evidence.

## Query path

Queries are read-only and may combine:
- canonical relational state;
- approved derived read models;
- external provider read-through when explicitly requested.

Query endpoints cannot mutate state as a side effect.

## Trust boundaries

- Founder identity boundary;
- Company OS API boundary;
- database boundary;
- agent runtime boundary;
- executor/tool boundary;
- external provider boundary;
- secret broker boundary;
- artifact/evidence boundary.

## Failure model

Fail closed on:
- missing authority;
- stale Context Lock;
- ambiguous mutation;
- approval mismatch;
- provider write with unknown completion;
- invalid state transition;
- evidence-integrity failure.

## Extraction rule

A module may become an independent service only when there is demonstrated reason such as:
- distinct scaling profile;
- security isolation;
- availability boundary;
- provider isolation;
- ownership/runtime separation.

Distribution is earned, not aesthetic.
