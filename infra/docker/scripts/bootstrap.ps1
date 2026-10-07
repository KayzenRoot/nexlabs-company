$ErrorActionPreference = "Stop"

$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) { throw "docker is required" }
docker compose version | Out-Null
if (-not (Test-Path ".env")) { Copy-Item ".env.example" ".env" }
New-Item -ItemType Directory -Force "secrets/local" | Out-Null
New-Item -ItemType Directory -Force "runtime/backups" | Out-Null

function New-LocalSecret([string]$Path) {
  if (Test-Path $Path) { return }
  $bytes = New-Object byte[] 32
  [System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
  $value = [Convert]::ToHexString($bytes).ToLowerInvariant()
  [System.IO.File]::WriteAllText((Join-Path (Get-Location) $Path), $value)
}

New-LocalSecret "secrets/local/postgres_password.txt"
New-LocalSecret "secrets/local/grafana_admin_password.txt"
docker compose --env-file .env -f compose.yml config --quiet
docker compose --env-file .env -f compose.yml -f compose.observability.yml config --quiet
Write-Host "NexLabs local runtime bootstrapped."
