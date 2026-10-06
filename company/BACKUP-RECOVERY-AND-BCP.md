# NexLabs Technology — Backup, Recovery & Business Continuity

**Status:** `CANONICAL_WO_011`

## Principle

A backup is not trusted until a restore has been tested.

## Service classification

Each material service/data store should eventually define:
- criticality;
- RPO target;
- RTO target;
- backup frequency;
- retention;
- encryption;
- restore owner;
- dependency order.

RPO/RTO values are service-specific and are not invented at company-blueprint stage.

## Backup requirements

Where applicable:
- encrypted at rest/in transit;
- access-controlled separately;
- versioned/immutable protection for critical data;
- geographically/provider separated for high-value systems;
- monitored for failures;
- retention aligned with data policy.

## Restore tests

Restore testing should verify:
- data integrity;
- application compatibility;
- credential/key dependencies;
- recovery time;
- operational procedure.

## Business continuity

Plan for:
- GitHub outage/account lockout;
- cloud/provider outage;
- model/API outage;
- local workstation loss;
- database corruption;
- credential compromise;
- CI outage;
- payment/provider outage.

## Recovery ordering

Restore authority/control-plane capability before dependent automation.

Do not resume autonomous mutation while canonical state is uncertain.

## Disaster declaration

Material disaster state should narrow automation and raise approval requirements until trusted state is restored.

## Evidence

Recovery exercises produce receipts and remediation tasks.
