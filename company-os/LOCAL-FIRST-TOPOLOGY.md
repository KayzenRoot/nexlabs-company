# NexLabs Company OS — Local-First Topology

**Status:** `CANONICAL_WO_016`

## Objective

Run the first Company OS locally through Docker without creating an architecture that only works on one PC.

## v0.1 logical topology

```
Founder UI / API client
        |
Company OS application
        |
  +-----+------------------+
  |                        |
PostgreSQL             Adapter layer
  |                 / GitHub
Outbox              / Agent runtimes
  |                / Artifact store
Worker/dispatcher  / Secret broker
  |
Optional Redis
  |
Observability
```

## Container intent

Likely first containers:
- `company-os-app`
- `company-os-worker`
- `postgres`
- optional `redis`
- local object/artifact storage or mounted managed abstraction
- observability components as admitted later.

Exact images/frameworks are successor-work decisions.

## Local data

Persistent volumes for canonical data/artifacts.

Do not bind canonical state to ephemeral container filesystem.

## Docker security

Do not grant broad Docker socket access to ordinary agents.

Host/container actions should go through bounded executor/broker contracts.

## Networking

Internal services use private Docker networking.

Only required application/UI endpoints are exposed to host.

## Secrets

Injected through secure environment/secret mechanism at runtime.

Never committed into repository or persisted in normal domain tables.

## Production portability

Application depends on contracts:
- PostgreSQL-compatible canonical DB;
- cache interface;
- object/artifact interface;
- secret broker;
- integrations.

Production can move from local Docker to VPS/cloud/container platform without rewriting domain model.

## Deployment stages

`LOCAL → STAGING → PRODUCTION`

No direct assumption that local approval equals production authorization.

## Backups

Local development should still support backup/restore of PostgreSQL and evidence metadata once implementation begins.

Production RPO/RTO are service-specific future decisions.
