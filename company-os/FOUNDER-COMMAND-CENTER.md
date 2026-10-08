# NexLabs Founder Command Center — WO-020

**Status:** APPROVED / MERGED local read-only snapshot (WO-020). Docker and HTTP smoke validated in CI; not deployed to Founder's own machine or internet. Not live operational Company OS.

## Why this slice
v0.1 requires minimum founder visibility before final acceptance, but WO-019 only demonstrates a deterministic offline executor. This small dashboard reads the repository's accepted/working engineering metadata and surfaces **unavailable** operational signals without inventing live agents, payments, approvals or runtime health.

## Truth boundaries
- `.engineering/CHECKPOINT.json` and `.engineering/WORK-ORDER-REGISTRY.md` are the only data sources. The display is an **engineering worktree snapshot**, not the canonical PostgreSQL transactional database, a provider event stream or a live GitHub connection.
- `knownHighInCheckpoint` / `knownCriticalInCheckpoint` refer **only to documented findings** at the checkpoint, not service health, security scan results or externally audited clearance.
- Runs, approvals, incidents, deployments, costs, agent health, runtime failures and alerts all say `NOT_CONNECTED` and expose a `null` metric. They must not be shown as measured zero.
- The HTTP interface is read-only and has **no founder authentication**. Never expose it to the internet or sensitive internal files; default Node binding is 127.0.0.1. Only the Docker demo uses 0.0.0.0 **inside the container**, with host port published on 127.0.0.1 only.
- No command buttons, mutation endpoints or authority delegation. `/healthz` shows HTTP liveness, **not** database/provider readiness or production health.
- No persistence/migrations, no live integrations, no instrumented alerts or deployment. These remain future separately approved work. Approval history from WO-019 is not a live approvals service.

## Run with Node 22+
From repository root:

```bash
node company-os/founder/cli.mjs
```

Browse `http://127.0.0.1:4173`. Read-only JSON at `http://127.0.0.1:4173/v1/overview`.

## Local Docker demo

```bash
docker compose -f infra/docker/compose.founder-demo.yaml config --quiet
docker compose -f infra/docker/compose.founder-demo.yaml up -d
```

View `http://127.0.0.1:4173`. Compose binds only to the host's loopback interface. To stop **only this demo service**, use `docker compose -f infra/docker/compose.founder-demo.yaml stop founder-command-center`. Do not tear down the broader Company OS PostgreSQL/Redis runtime.

## Validate
```bash
node --check company-os/founder/overview.mjs
node --check company-os/founder/ui.mjs
node --check company-os/founder/server.mjs
node --check company-os/founder/cli.mjs
node --test company-os/founder/overview.test.mjs
docker compose -f infra/docker/compose.founder-demo.yaml config --quiet
```
The GitHub workflow `.github/workflows/founder-command-center-validation.yml` enforces these on candidate and main.

## Future transitions
An authenticated Company OS API with PostgreSQL, proper actor/organization scope, approval envelopes, persistent outbox/evidence, and live provider projections needs a separate Work Order. Treat unavailable evidence as unknown, not success. No financial, legal, Web3, production or privileged action from this dashboard.
