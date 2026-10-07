param([Parameter(Mandatory=$true)][string]$DumpPath)

$ErrorActionPreference = "Stop"
if ($env:NEXLABS_RESTORE_CONFIRM -ne "I_UNDERSTAND_THIS_IS_DESTRUCTIVE") { throw "Set NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE" }
$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root
$DumpPath = (Resolve-Path $DumpPath).Path
$cid = (docker compose --env-file .env -f compose.yml ps -q postgres).Trim()
if (-not $cid) { throw "Postgres container is not running." }
$remote = $cid + ":/tmp/nexlabs-restore.dump"
docker cp $DumpPath $remote
docker compose --env-file .env -f compose.yml exec -T postgres sh -ec 'pg_restore --clean --if-exists --no-owner -U "$POSTGRES_USER" -d "$POSTGRES_DB" /tmp/nexlabs-restore.dump'
docker compose --env-file .env -f compose.yml exec -T postgres rm -f /tmp/nexlabs-restore.dump
Write-Host "PostgreSQL restore completed from $DumpPath"
