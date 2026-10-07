# NXL-COMPANY-WO-017 — Local Docker Infrastructure & Runtime Architecture

**Issue:** #18  
**Status:** `APPROVED / MERGED`  
**Classification:** `NECESSARY`  
**Risk:** `ELEVATED / LOCAL_RUNTIME_INFRASTRUCTURE`  
**Base:** `7625ca43d79c9ec92d309d9b59b198bee04e3897`  
**Branch:** `infra/NXL-COMPANY-WO-017-local-docker-runtime`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-017.json`

## OBJECTIVE
Design and materialize the local-first Docker infrastructure used to build/test NexLabs Company OS before staging/VPS/cloud, preserving WO-016 architecture.

## SCOPE
- Docker Compose topology for local infrastructure.
- PostgreSQL canonical persistence.
- Optional Redis acceleration profile.
- Persistent local artifact/evidence storage.
- Private/internal networks and bounded host exposure.
- Environment/secrets contract with ignored local secret files.
- Health checks and dependency readiness.
- OpenTelemetry/Prometheus/Grafana observability profile.
- PostgreSQL and artifact backup/restore scripts.
- Developer bootstrap/verify/runbook.
- CI validation using `docker compose config` plus structural assertions.

## OUT OF SCOPE
Company OS application code; AgentRuntime/Hermes implementation; schema migrations; founder dashboard; VPS/production deployment; real secrets; Docker-socket access; WO-018+.

## RUNTIME DECISIONS TO FREEZE
- Compose Specification is the local orchestration contract.
- PostgreSQL is always-on canonical local state.
- Redis is optional/profile-gated and never canonical.
- Local artifact/evidence storage is filesystem-backed behind a portable artifact-store contract.
- Observability is optional/profile-gated and cannot become a domain dependency.
- Only intentional host ports are published and data-service developer ports bind to loopback.
- App/worker containers are not fabricated before their runtime exists.
- Real credentials are never committed.
- Infrastructure readiness uses health checks.
- Backups are explicit/timestamped/outside container writable layers.
- Restore requires an explicit input.
- Ordinary agents receive no Docker socket.
- Named volumes hold canonical DB state.
- Images use governed version families, never floating `latest`.

## ALLOWED OUTPUTS
`infra/docker/**`, `company-os/LOCAL-DOCKER-RUNTIME.md`, `company-os/SECRETS-AND-CONFIGURATION.md`, `company-os/BACKUP-RESTORE-LOCAL.md`, `company-os/HEALTH-AND-READINESS.md`, `company-os/LOCAL-OBSERVABILITY.md`, `company-os/DEVELOPER-RUNBOOK.md`, `.gitignore`, required GEF governance/checkpoint files and `.github/workflows/local-docker-runtime-validation.yml`.

## ACCEPTANCE CRITERIA
1. Base Compose parses without real secrets.
2. PostgreSQL has named persistence and health check.
3. Redis is optional/profile-gated/non-canonical.
4. Artifact/evidence storage persists outside ephemeral containers.
5. No Docker socket mount.
6. No real secret committed; runtime/secret/backup paths ignored.
7. Network design separates internal data plane from host access.
8. Optional observability profile defines OTEL Collector, Prometheus and Grafana.
9. Telemetry contract excludes raw secrets.
10. Backup scripts fail closed and create explicit timestamped outputs.
11. Restore scripts require explicit input.
12. Runbook covers bootstrap/start/profiles/verify/backup/restore/shutdown/reset warnings.
13. CI validates Compose syntax and structural security/persistence rules.
14. WO-018..WO-022 remain NOT_ADMITTED.
15. All prior persistent validators plus Local Docker Runtime validator pass on exact head.
16. No unresolved HIGH/CRITICAL finding.

## TESTS
- `docker compose --env-file infra/docker/.env.example -f infra/docker/compose.yml config`
- merged observability config validation
- no Docker socket
- PostgreSQL named volume + healthcheck
- Redis optional profile
- loopback-only data-service host ports
- ignored secret/runtime/backup paths
- shell syntax checks
- deterministic structural validation workflow
- all persistent repository validators

## STOP CONDITION
Stop at exact-head audit for WO-017. Do not admit or execute WO-018 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `d2a13b6b79891e4ab0dee9c590025a9feb8c98c5`
- All seventeen required validations: `SUCCESS`
- Local Docker Runtime merge SHA: `0dcc2ace4aa1cc218d950511bd01a68de798a32c`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Recovery evidence: initial admission transport failure was reconciled read-only; no partial writes existed and no blind replay occurred.
- Runtime locks: PostgreSQL canonical, Redis optional/non-canonical, artifact volume persistent, secrets ignored, no Docker socket, optional OTEL/Prometheus/Grafana, explicit backup/restore, PowerShell+Bash operations.
- Successor execution authority: `NONE`; WO-018 remains NOT_ADMITTED until separately compiled and locked.
