# NexLabs Technology — Evidence & Exact-Head Protocol

**Status:** `CANONICAL_WO_009`

## Principle

Evidence approves a specific candidate, not a moving branch name.

## Candidate identity

For Git-based work, candidate identity should include:
- repository;
- base SHA;
- head SHA;
- branch;
- PR when opened.

For non-Git outputs, use an equivalent immutable/versioned identity.

## Required evidence classes

Depending on risk:
- build/type/lint;
- unit/integration/e2e;
- security/static analysis;
- migration/data checks;
- benchmark/performance;
- visual/manual verification;
- provider receipts;
- state read-back.

## Exact-head rule

If the head changes after a test/review:
- old evidence remains historical;
- it does not approve the new head;
- required checks must rerun on the new head.

## Test terminality

Only terminal results count:
- SUCCESS;
- FAILURE;
- CANCELLED/SKIPPED when policy explicitly permits.

QUEUED/IN_PROGRESS is not approval evidence.

## Evidence bundle

Minimum:
- Work Order;
- exact base/head;
- test/check identifiers;
- outcomes;
- relevant logs/receipts;
- changed-scope summary;
- known findings;
- reviewer verdict;
- correction history when applicable.

## Truthful evidence

Do not:
- fabricate a passing check;
- omit a known failing required test;
- reuse a green check from another head;
- call a network/tool failure a product pass;
- store raw secrets in evidence.

## Read-back verification

For material mutations, a successful API response should be followed by state read-back where reasonable.

A timeout means completion is unknown, not failed or succeeded by assumption.

## Evidence retention

Closeout evidence should remain sufficient to explain why the accepted state was promoted.
