param([Parameter(Mandatory=$true)][string]$ArchivePath)

$ErrorActionPreference = "Stop"
if ($env:NEXLABS_RESTORE_CONFIRM -ne "I_UNDERSTAND_THIS_IS_DESTRUCTIVE") { throw "Set NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE" }
$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root
if (-not (Test-Path ".env")) { throw "Missing .env" }
$ArchivePath = (Resolve-Path -LiteralPath $ArchivePath).Path
if ((Get-Item -LiteralPath $ArchivePath).Length -eq 0) { throw "Archive is empty" }

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
$image = "alpine:" + $(if ($env:UTILITY_IMAGE_TAG) { $env:UTILITY_IMAGE_TAG } else { "3.21" })
$dir = Split-Path $ArchivePath -Parent
$name = Split-Path $ArchivePath -Leaf
docker volume inspect $volume *> $null
if ($LASTEXITCODE -ne 0) {
  docker volume create $volume | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "Cannot create artifact volume" }
}
$script = @'
  set -eu
  name="$1"
  stage="$(mktemp -d)"
  trap 'rm -rf "$stage"' EXIT
  tar -tzf "/backup/$name" > "$stage/manifest"
  while IFS= read -r entry; do
    case "$entry" in
      /*|..|../*|*/../*|*/..) echo "Unsafe archive entry" >&2; exit 7;;
    esac
  done < "$stage/manifest"
  mkdir "$stage/content"
  tar -xzf "/backup/$name" -C "$stage/content"
  find /data -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  cp -a "$stage/content/." /data/
'@
docker run --rm --mount "type=volume,src=$volume,dst=/data" --mount "type=bind,src=$dir,dst=/backup,readonly" $image sh -ec $script sh $name
if ($LASTEXITCODE -ne 0) { throw "Artifact archive validation or restore failed" }
Write-Host "Artifact restore completed from $ArchivePath"
