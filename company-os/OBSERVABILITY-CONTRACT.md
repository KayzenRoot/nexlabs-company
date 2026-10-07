# NexLabs Company OS — Observability Contract

**Status:** `CANONICAL_WO_016`

## Goals

Observe:
- health;
- latency;
- failures;
- workflow state;
- agent runs;
- external integrations;
- approvals;
- cost/usage;
- recovery events;
- security-relevant anomalies.

## Correlation

Every material flow propagates:
- request ID;
- correlation ID;
- causation ID where relevant;
- organization;
- actor;
- Work Order/task/run refs.

## Telemetry types

### Metrics
Examples:
- command success/error;
- queue/outbox lag;
- run duration;
- provider latency;
- approval wait time;
- recovery-required count;
- token/model usage;
- cost;
- cache hit rate;
- database health.

### Structured logs
Machine-readable events with redacted metadata.

### Traces
Cross-module/provider flow where useful.

### Audit
Separate governance-grade append-only records. Operational logs do not replace audit.

## Cost observability

Track usage where available by:
- provider;
- model;
- agent;
- task;
- product/project;
- successful vs failed/retried outcome.

## Security

Never emit:
- raw credentials;
- private keys;
- full secret-bearing prompts;
- unnecessary sensitive personal data.

## Health endpoints

Suggested:
- liveness;
- readiness;
- dependency health;
- integration health.

## Alert principles

Alert on decision-relevant conditions rather than every transient warning.

Examples:
- canonical DB unavailable;
- outbox stuck;
- repeated RECOVERY_REQUIRED;
- approval bypass attempt;
- provider-cost anomaly;
- critical integration auth expired.

## Retention

Operational telemetry retention can be shorter than audit evidence and should be policy/cost driven.
