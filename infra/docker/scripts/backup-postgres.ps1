param([string]$BackupDirectory)

$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root

function Import-DotEnv {
  Get-Content ".env" | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#")) { return }
    $parts = $line -split "=", 2
    if ($parts.Count -eq 2) { Set-Item -Path "Env:$($parts[0])" -Value $parts[1] }
  }
}

if (-not (Test-Path ".env")) { throw "Missing .env" }
Import-DotEnv
if (-not $BackupDirectory) { $BackupDirectory = if ($env:NEXLABS_BACKUP_DIR) { $env:NEXLABS_BACKUP_DIR } else { "./runtime/backups" } }
New-Item -ItemType Directory -Force $BackupDirectory | Out-Null
$BackupDirectory = (Resolve-Path $BackupDirectory).Path
$stamp = (Get-Date).ToUniversalTime().ToString("yyyyMMddTHHmmssZ")
$out = Join-Path $BackupDirectory "postgres_$stamp.dump"
$cid = (docker compose --env-file .env -f compose.yml ps -q postgres).Trim()
if (-not $cid) { throw "Postgres container is not running." }
docker compose --env-file .env -f compose.yml exec -T postgres sh -ec 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc -f /tmp/nexlabs-backup.dump'
$remote = $cid + ":/tmp/nexlabs-backup.dump"
docker cp $remote $out
docker compose --env-file .env -f compose.yml exec -T postgres rm -f /tmp/nexlabs-backup.dump
if (-not (Test-Path $out) -or (Get-Item $out).Length -eq 0) { throw "Backup was empty or missing." }
Write-Output $out
