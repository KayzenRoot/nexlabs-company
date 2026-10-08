param([Parameter(Mandatory=$true)][string]$DumpPath)

$ErrorActionPreference = "Stop"
if ($env:NEXLABS_RESTORE_CONFIRM -ne "I_UNDERSTAND_THIS_IS_DESTRUCTIVE") {
  throw "Set NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE"
}
$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root
if (-not (Test-Path ".env")) { throw "Missing .env" }
$DumpPath = (Resolve-Path -LiteralPath $DumpPath).Path
if ((Get-Item -LiteralPath $DumpPath).Length -eq 0) { throw "Dump is empty" }
$cid = (docker compose --env-file .env -f compose.yml ps -q postgres).Trim()
if (-not $cid) { throw "Postgres container is not running." }
$tmp = (docker compose --env-file .env -f compose.yml exec -T postgres mktemp /tmp/nexlabs-restore.XXXXXX).Trim()
if ($LASTEXITCODE -ne 0 -or -not $tmp) { throw "Could not allocate temporary restore path" }
try {
  docker cp $DumpPath ($cid + ":" + $tmp)
  if ($LASTEXITCODE -ne 0) { throw "Could not stage dump" }
  docker compose --env-file .env -f compose.yml exec -T postgres sh -ec 'pg_restore --list "$1" >/dev/null && pg_restore --single-transaction --exit-on-error --clean --if-exists --no-owner -U "$POSTGRES_USER" -d "$POSTGRES_DB" "$1"' sh $tmp
  if ($LASTEXITCODE -ne 0) { throw "Dump validation or transactional restore failed" }
  Write-Host "PostgreSQL restore completed (single transaction) from $DumpPath"
}
finally {
  docker compose --env-file .env -f compose.yml exec -T postgres rm -f $tmp | Out-Null
}
