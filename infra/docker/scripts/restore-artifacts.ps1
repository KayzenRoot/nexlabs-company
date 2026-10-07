param([Parameter(Mandatory=$true)][string]$ArchivePath)

$ErrorActionPreference = "Stop"
if ($env:NEXLABS_RESTORE_CONFIRM -ne "I_UNDERSTAND_THIS_IS_DESTRUCTIVE") { throw "Set NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE" }
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

Import-DotEnv
$volume = if ($env:ARTIFACT_VOLUME_NAME) { $env:ARTIFACT_VOLUME_NAME } else { "nexlabs_company_artifacts" }
if (-not (docker volume ls -q --filter "name=^$volume$")) { docker volume create $volume | Out-Null }
$ArchivePath = (Resolve-Path $ArchivePath).Path
$dir = Split-Path $ArchivePath -Parent
$name = Split-Path $ArchivePath -Leaf
$image = "alpine:" + $(if ($env:UTILITY_IMAGE_TAG) { $env:UTILITY_IMAGE_TAG } else { "3.21" })
$mountVolume = "type=volume,src=$volume,dst=/data"
$mountBackup = "type=bind,src=$dir,dst=/backup,readonly"
docker run --rm --mount $mountVolume --mount $mountBackup $image sh -ec "find /data -mindepth 1 -maxdepth 1 -exec rm -rf {} +; tar -xzf /backup/$name -C /data"
Write-Host "Artifact restore completed from $ArchivePath"
