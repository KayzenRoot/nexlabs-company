# NexLabs Company OS Local Docker Runtime

This directory is the executable local-infrastructure contract for WO-017.

## Current services

Core:
- PostgreSQL as canonical transactional state.
- Optional Redis cache profile, ephemeral and non-canonical.
- Named artifact/evidence volume for future app/worker mounts.
- Private Docker networks.

Optional observability:
- OpenTelemetry Collector.
- Prometheus.
- Grafana.

Company OS app/worker containers are intentionally absent until their implementation Work Order exists.

## Windows bootstrap

    cd infra/docker
    ./scripts/bootstrap.ps1
    docker compose --env-file .env -f compose.yml up -d postgres
    ./scripts/verify-stack.ps1

Optional Redis:

    docker compose --env-file .env -f compose.yml --profile cache up -d

Optional observability:

    docker compose --env-file .env -f compose.yml -f compose.observability.yml --profile observability up -d

Grafana defaults to http://127.0.0.1:13000.
Prometheus defaults to http://127.0.0.1:19090.

## Secrets

Real local secrets live in infra/docker/secrets/local/ and are ignored by Git.

Do not commit .env, secret files, database dumps or runtime artifacts.

## Backup

PowerShell:

    ./scripts/backup-postgres.ps1
    ./scripts/backup-artifacts.ps1

Bash:

    sh scripts/backup-postgres.sh
    sh scripts/backup-artifacts.sh

Restore is destructive and requires NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE plus an explicit path.

## Shutdown

    docker compose --env-file .env -f compose.yml -f compose.observability.yml --profile cache --profile observability down

Do not add -v unless you explicitly intend to destroy named local data volumes.
