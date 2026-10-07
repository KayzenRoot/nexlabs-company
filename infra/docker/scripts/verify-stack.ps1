$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root
if (-not (Test-Path ".env")) { throw "Missing infra/docker/.env; run bootstrap.ps1 first." }
if (-not (Test-Path "secrets/local/postgres_password.txt")) { throw "Missing postgres secret." }
docker compose --env-file .env -f compose.yml config --quiet
docker compose --env-file .env -f compose.yml -f compose.observability.yml config --quiet
docker compose --env-file .env -f compose.yml ps postgres
docker compose --env-file .env -f compose.yml exec -T postgres sh -ec 'pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
$RedisId = docker compose --env-file .env -f compose.yml --profile cache ps -q redis
if ($RedisId) {
  $pong = docker compose --env-file .env -f compose.yml --profile cache exec -T redis redis-cli ping
  if ($pong.Trim() -ne "PONG") { throw "Redis health verification failed." }
}
Write-Host "Core local runtime verification passed."
