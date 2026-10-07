# NexLabs Company OS — Local Developer Runbook

Status: CANONICAL_WO_017

## Preconditions

- Docker Desktop or Docker Engine.
- Docker Compose v2.
- repository checkout.
- adequate disk space.

## Windows first run

    cd infra/docker
    ./scripts/bootstrap.ps1
    docker compose --env-file .env -f compose.yml up -d postgres
    ./scripts/verify-stack.ps1

## Optional cache

    docker compose --env-file .env -f compose.yml --profile cache up -d

Redis is acceleration only.

## Optional observability

    docker compose --env-file .env -f compose.yml -f compose.observability.yml --profile observability up -d

## PostgreSQL shell

    docker compose --env-file .env -f compose.yml exec postgres psql -U nexlabs -d nexlabs_company

## Backup

PowerShell:
    ./scripts/backup-postgres.ps1
    ./scripts/backup-artifacts.ps1

Bash:
    sh scripts/backup-postgres.sh
    sh scripts/backup-artifacts.sh

## Restore

Restore is destructive and requires explicit confirmation and source file.

PowerShell example:
    $env:NEXLABS_RESTORE_CONFIRM="I_UNDERSTAND_THIS_IS_DESTRUCTIVE"
    ./scripts/restore-postgres.ps1 -DumpPath ./runtime/backups/postgres_example.dump

## Stop

    docker compose --env-file .env -f compose.yml -f compose.observability.yml --profile cache --profile observability down

## Reset warning

docker compose down -v destroys named data volumes.

Before intentional reset: back up, verify backup files, record why reset is required, then remove volumes.

## Troubleshooting

For PostgreSQL: inspect logs, secret file, disk/volume state and pg_isready.
For Compose parse failures: run docker compose config.
If Docker Desktop is unavailable, restore Docker rather than bypassing canonical state through improvised paths.
