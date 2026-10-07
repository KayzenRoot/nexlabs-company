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
$volume = if ($env:ARTIFACT_VOLUME_NAME) { $env:ARTIFACT_VOLUME_NAME } else { "nexlabs_company_artifacts" }
docker volume inspect $volume | Out-Null
if (-not $BackupDirectory) { $BackupDirectory = if ($env:NEXLABS_BACKUP_DIR) { $env:NEXLABS_BACKUP_DIR } else { "./runtime/backups" } }
New-Item -ItemType Directory -Force $BackupDirectory | Out-Null
$BackupDirectory = (Resolve-Path $BackupDirectory).Path
$stamp = (Get-Date).ToUniversalTime().ToString("yyyyMMddTHHmmssZ")
$name = "artifacts_$stamp.tar.gz"
$image = "alpine:" + $(if ($env:UTILITY_IMAGE_TAG) { $env:UTILITY_IMAGE_TAG } else { "3.21" })
$mountVolume = "type=volume,src=$volume,dst=/data,readonly"
$mountBackup = "type=bind,src=$BackupDirectory,dst=/backup"
docker run --rm --mount $mountVolume --mount $mountBackup $image sh -ec "tar -czf /backup/$name -C /data ."
$out = Join-Path $BackupDirectory $name
if (-not (Test-Path $out) -or (Get-Item $out).Length -eq 0) { throw "Artifact backup was empty or missing." }
Write-Output $out
