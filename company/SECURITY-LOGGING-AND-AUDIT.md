# NexLabs Technology — Security Logging & Audit

**Status:** `CANONICAL_WO_011`

## Goals

Security logs must support:
- attribution;
- anomaly detection;
- incident investigation;
- authorization review;
- financial/Web3 reconciliation;
- GEF evidence.

## Material event fields

Where applicable:
- event ID;
- timestamp;
- actor identity;
- role/run;
- Work Order/task;
- action class/risk;
- resource/environment;
- request/action fingerprint;
- approval ref;
- tool/provider;
- outcome;
- error class;
- resulting state/ref;
- correlation/trace ID.

## Never log

- passwords;
- bearer tokens;
- private keys;
- seed phrases;
- full secret values;
- unnecessary personal/sensitive data.

Use references, hashes/fingerprints or redacted representations.

## Integrity

High-value audit records should be resistant to casual alteration/deletion.

## Access

Security logs are sensitive and follow least privilege.

## Retention

Retention depends on:
- security need;
- legal/regulatory obligations;
- privacy minimization;
- incident evidence.

Personal-data incident records follow applicable ANPD retention requirements.

## Alert candidates

Future runtime should detect:
- repeated auth failure;
- unusual privilege changes;
- secret access anomalies;
- policy-denied tool use;
- disabled logging;
- unexpected production mutations;
- unusual value movement;
- wallet/signing anomalies.

## Audit correlation

A material mutation should be traceable from:
`Founder/intent → policy/approval → actor/run → tool/provider → resulting state → verification`.
