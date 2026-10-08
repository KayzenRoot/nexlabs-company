# NexLabs Company

Canonical company and engineering repository for NexLabs Technology.

## Canonical company systems

- Strategy: `company/COMPANY-MASTER.md`
- Business model: `company/BUSINESS-MODEL.md`
- Governance: `company/CORPORATE-GOVERNANCE.md`
- AI organization: `company/AI-ORGANIZATION.md`
- AI employee contract: `company/AI-EMPLOYEE-CONTRACT.md`
- Product Factory: `company/PRODUCT-FACTORY.md`
- Autonomous Software Factory: `company/AUTONOMOUS-SOFTWARE-FACTORY.md`
- Research / Innovation / IP: `company/RESEARCH-INNOVATION-STRATEGY.md`
- Security: `company/SECURITY-ARCHITECTURE.md`
- Finance: `company/FINANCE-OPERATING-MODEL.md`
- GTM: `company/GO-TO-MARKET-OPERATING-MODEL.md`
- Brand / Public Presence: `company/BRAND-SYSTEM.md`
- Investor System: `company/INVESTOR-READINESS-OPERATING-MODEL.md`
- Company OS Architecture: `company-os/ARCHITECTURE.md`
- Local Docker Runtime: `company-os/LOCAL-DOCKER-RUNTIME.md`

## Local runtime posture

NexLabs Company OS local infrastructure is executable under `infra/docker/`.

- PostgreSQL is canonical persistent state.
- Redis is optional, ephemeral and non-canonical.
- evidence/artifact storage has a persistent named volume.
- no service receives the Docker socket.
- local secrets and runtime backups are ignored by Git.
- OpenTelemetry, Prometheus and Grafana are optional observability services.
- PostgreSQL/artifact backup and destructive restore paths exist for PowerShell and Bash.
- Company OS app/worker containers are intentionally deferred until executable runtime code exists.

## Current governed state

`NXL-COMPANY-WO-019` is approved, merged and checkpoint-promoted.

`NXL-COMPANY-WO-020` is APPROVED/MERGED for its local, read-only Founder Command Center. Run `node company-os/founder/cli.mjs` or use `infra/docker/compose.founder-demo.yaml` to inspect a Git-source engineering snapshot. Operational integrations, privileged approvals, live agents and production availability are NOT_CONNECTED. Integrated v0.1 DoD remains open.

WO-021 and WO-022 remain non-executable until separately admitted.

> Repository disclosure: this repository is public. Never commit real credentials, local secret files, database dumps, runtime backups, private keys or protected operational material here.


## Agent Runtime Design (WO-018)

Company OS agent runtime is provider-neutral. Hermes is an optional adapter, not a mandatory dependency. Offline contract tests live at `company-os/contracts/`. Tool capabilities default-deny and budgets/unknown external writes require explicit authorization or reconciliation. WO-018 only designs the integration; live Hermes/tool broker is successor work.


## Autonomous Engineering Cell MVP (WO-019)

`company-os/cell/` contains a Node 22 executable offline engineering cell: Founder approval verifier port → bounded Work Order/Context Lock → mock executor proposal → QA/correction → hash-chained receipts → `PENDING_GEF_REVIEW` handoff. Run `node --test company-os/cell/engine.test.mjs` and `node company-os/cell/cli.mjs demo`. An isolated Docker demo is under `infra/docker/compose.cell-demo.yaml`. This **does not** invoke a live LLM or directly edit/merge GitHub repositories. Real remote mutation requires a separately approved sandbox/broker.
