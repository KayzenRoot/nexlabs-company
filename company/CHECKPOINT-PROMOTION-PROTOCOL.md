# NexLabs Technology — Checkpoint Promotion Protocol

**Status:** `CANONICAL_WO_009`

## Principle

Implementation merge and checkpoint promotion are separate controlled events.

## Preconditions

Promotion begins only after:
- implementation candidate received APPROVED verdict;
- exact-head checks are successful;
- implementation was merged;
- merge SHA is known;
- no blocking finding appeared after approval.

## Promotion delta

The promotion branch/PR should be narrow.

Typical changes:
- Work Order status → APPROVED / MERGED;
- closeout evidence;
- Checkpoint MD/JSON;
- Registry;
- Backlog;
- persistent validator normalization;
- README/current-state summary.

It must not include successor implementation.

## Promotion validation

Run all persistent applicable checks on the promotion head.

The promotion head itself must be auditable.

## Promotion audit

Verify:
- correct implementation audited head;
- correct merge SHA;
- closeout evidence accurate;
- active Work Order cleared;
- successor remains NOT_ADMITTED;
- sole next legal action is correct.

## Merge of promotion

After approval, merge the promotion PR.

Only then close the Work Order issue as completed.

## Successor admission

A successor becomes merely **eligible** after promotion.

It still requires:
- fresh source hydration;
- exact current base;
- freshly compiled Work Order;
- fresh Context Lock;
- explicit admission.

## Why separate promotion

Separating promotion:
- prevents implementation from declaring itself final;
- creates an auditable state transition;
- avoids accidentally executing successor work inside closeout;
- makes the Checkpoint a trustworthy handoff boundary.
