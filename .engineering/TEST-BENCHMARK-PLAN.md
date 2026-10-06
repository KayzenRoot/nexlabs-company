# NexLabs Company Test and Benchmark Plan

## Evidence rule

"Completed" is not proof. Every increment must define evidence appropriate to its risk and bind it to exact base/head.

## Documentation/planning increments

Minimum:
- required canonical files present;
- JSON documents parse;
- Work Order and Context Lock identifiers agree;
- exactly one Work Order is `ADMITTED`;
- source hierarchy and checkpoint point to valid paths;
- no known contradictory status claims;
- GEF v1.1.2 validation workflow succeeds on exact head.

## Software increments

### LOW
Directed unit/static checks.

### STANDARD
Unit + lint + typecheck/build + relevant integration tests.

### ELEVATED
STANDARD + broad regression + persistence/migration/security/recovery evidence where affected.

### HIGH_ASSURANCE
ELEVATED + explicit proof obligations, stronger negative/adversarial tests, independent review where feasible, exact action/transaction preview and rollback/roll-forward evidence.

## Benchmarks

Performance/cost/token claims remain targets until measured with a reproducible baseline, comparable population and exact artifact/version. No optimization claim may be promoted from anecdote.
