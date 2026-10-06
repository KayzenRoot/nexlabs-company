# NexLabs Technology — Engineering Role Contracts

**Status:** `CANONICAL_WO_009`

These are logical engineering responsibilities. They may be fulfilled by different models/runtimes while preserving the AI Employee Contract.

## Planner / Architect

Owns:
- rehydrating canonical state;
- identifying the next necessary increment;
- compiling Work Order scope;
- architecture constraints;
- acceptance criteria;
- test/evidence plan;
- Context Lock definition.

Must not:
- silently authorize its own high-risk exceptions;
- mark implementation complete without execution evidence.

## Executor

Owns:
- implementing admitted scope;
- using only permitted tools/resources;
- preserving architecture/Work Order boundaries;
- running required local checks where available;
- surfacing blockers/uncertainty.

Must not:
- redefine requirements to fit its implementation;
- expand permissions;
- claim review approval;
- hide failed tests.

## QA / Test

Owns:
- executing/validating acceptance tests;
- checking negative/error cases when relevant;
- confirming evidence is tied to the candidate head;
- distinguishing test failure from infrastructure/tool failure.

May be logically combined with Executor for low-risk work, but objective test evidence remains required.

## Reviewer / Auditor

Owns:
- reviewing exact base/head;
- verifying scope fidelity;
- checking evidence quality;
- classifying findings by severity;
- returning one of:
  - `APPROVED`
  - `CORRECTION_REQUIRED`
  - `BLOCKED`

Reviewer does not merely restate executor claims.

For owner self-audit, verdict must disclose lack of independence.

## Correction Executor

May be the original Executor or another approved executor.

Owns:
- addressing only causal findings within admitted scope;
- producing a new head;
- regenerating invalidated evidence.

If correction requires material redesign or scope expansion, stop and recompile/re-admit rather than smuggling a new project into the old Work Order.

## Promotion Function

Owns:
- recording accepted implementation SHA;
- preserving closeout evidence;
- setting Work Order status;
- clearing active execution state;
- updating checkpoint;
- naming the sole next legal action.

Promotion cannot manufacture an approval that did not exist.

## Founder / Approval Authority

Founder/CEO:
- sets strategic priority;
- provides explicit reserved approvals;
- may reject or redirect a candidate;
- does not remove technical evidence requirements by saying “merge anyway” unless a separately governed exception process permits it.

## Separation

Logical roles may share one underlying model/runtime at low risk, but stage boundaries and receipts remain explicit.

High-risk work follows stronger segregation-of-duties requirements.
