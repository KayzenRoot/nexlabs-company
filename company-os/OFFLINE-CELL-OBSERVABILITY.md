# WO-023 — Offline Cell Observability / Founder Command Center

**Status:** APPROVED / MERGED (WO-023) for read-only deterministic LOCAL fixture evidence. Production agent/Founder integrations remain unimplemented.

## What is actually measured
At startup, `company-os/founder/cli.mjs` invokes the existing WO-019 `runDemo()` once, then validates the returned in-memory SHA-256 receipt chain before serving any evidence. The read-only endpoint `GET /v1/offline-cell-evidence` shows:
- one **actual in-process fixture execution**, the number of proposal attempts, failed QA checks, requested corrections and passing QA checks, all derived from hash-chained events;
- exact fixture Work Order and original fixture Git base SHA, final receipt hash and sanitized event sequence/type/hash;
- `PENDING_GEF_REVIEW` rather than a false merge, deployment or checkpoint promotion claim;
- fixture approval evidence marked `TEST_FIXTURE_VERIFIER_ONLY`, never actual trusted Founder sign-in.

All data are from an *offline deterministic injected adapter*, not Hermes, Codex, a live LLM, a remote agent or a GitHub action. The approval callback in WO-019 is a local test fixture and is **not authentication**. This observation has only process-lifetime memory, not durable PostgreSQL state or verified signed receipt storage.

No live observations are manufactured. The existing `/v1/overview` production operational metrics (agentRuns, approvals, incidents, failures, deployments, costs) continue as `NOT_CONNECTED/null` and the local UI shows a separate fixture panel. A missing/failed receipt chain does not yield zeros or success.

## Local run
With Node.js 22+, at the repository root:
```bash
node company-os/founder/cli.mjs
node --test company-os/founder/*.test.mjs
```
Dashboard: `http://127.0.0.1:4173`, evidence: `http://127.0.0.1:4173/v1/offline-cell-evidence`.

For the existing localhost-only Docker demo:
```bash
docker compose -f infra/docker/compose.founder-demo.yaml up -d
```
No Docker socket, no privileged permissions, no external listener and no model-provider credentials. The demo is not deployed to the Founder workstation by GitHub CI.

## Safety boundaries
- GET does not execute another run; it only reads an already verified projected snapshot from server startup.
- HTTP output excludes actual event detail, candidate source code, acceptance contents, complete prompt or secrets.
- Startup rejects invalid local receipt integrity and fails before the dashboard starts.
- Real actions and approvals require the separately designed actor/capability/Founder authority process.
- No event collector, canonical PostgreSQL write, signed immutable log, uptime, performance, production provider costs or actual production incident collection is claimed.
- Test fixtures cannot prove data durability, customer recovery or operator identity.

## v0.1 acceptance note
This is minimum **offline demonstration** visibility. Whether this bounded view satisfies the complete `Definition of Done` remains subject to WO-022 integrated review and explicit Founder acceptance. Live external/privileged production observability remains unsupported.
