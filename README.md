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

`NXL-COMPANY-WO-017` is complete.

The next legal action is to **admit WO-018** against current canonical main and create a fresh Context Lock.

WO-018 and later remain non-executable until admitted.

> Repository disclosure: this repository is public. Never commit real credentials, local secret files, database dumps, runtime backups, private keys or protected operational material here.


## Agent Runtime Design (WO-018)

Company OS agent runtime is provider-neutral. Hermes is an optional adapter, not a mandatory dependency. Offline contract tests live at `company-os/contracts/`. Tool capabilities default-deny and budgets/unknown external writes require explicit authorization or reconciliation. WO-018 only designs the integration; live Hermes/tool broker is successor work.
