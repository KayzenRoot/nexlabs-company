# NexLabs Technology — Data Governance & Privacy

**Status:** `CANONICAL_WO_011`

## Scope

This policy covers company, customer, user, employee/contractor, telemetry, model/agent and research data.

## Data classes

Suggested baseline:
- `PUBLIC`
- `INTERNAL`
- `CONFIDENTIAL`
- `RESTRICTED`
- `PERSONAL_DATA`
- `SENSITIVE_PERSONAL_DATA`
- `SECRET_MATERIAL`

A datum may have multiple attributes, e.g. `PERSONAL_DATA + CONFIDENTIAL`.

## Processing record

Material personal-data processing should identify:
- purpose;
- data categories;
- data subjects;
- controller/operator role as applicable;
- legal basis/applicability decision;
- source;
- recipients/processors;
- model/tool access;
- retention;
- deletion/anonymization path;
- security controls;
- rights/request path;
- international transfer status.

## Principles

Use data minimization, purpose limitation, proportionality and retention discipline.

Do not collect data merely because it may be useful later.

## AI/model access

Before sending personal/confidential data to a model/provider:
- verify necessity;
- classify the data;
- confirm provider/account policy;
- minimize/redact/pseudonymize when possible;
- confirm contract/transfer implications;
- record sensitive use when material.

## Retention

Retention periods are based on:
- purpose;
- contract;
- legal/regulatory obligations;
- security/evidence needs.

Expired data should be deleted, anonymized or placed under justified legal hold.

## Rights handling

Products processing personal data need a path to receive, authenticate, track and resolve applicable data-subject requests.

## Incident linkage

Personal-data incidents route through the Security Incident Response policy and an applicability check against current ANPD rules.

## International transfers

Before international transfer of personal data:
- identify countries/recipients;
- verify applicable LGPD/ANPD mechanism;
- ensure contractual/organizational controls;
- document decision.

## Public repository rule

No confidential personal data belongs in this public company repository.
