[CmdletBinding()]
param([switch]$CheckOnly)

$ErrorActionPreference = 'Stop'
$expectedRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$actualRoot = (Get-Location).Path
if ($actualRoot -ne $expectedRoot) { throw "Run this script from the app repository root: $expectedRoot" }
if (-not $CheckOnly) { throw 'Write mode is intentionally disabled. Review the lock and run -CheckOnly; perform any update only after an explicit review.' }

$lockPath = Join-Path $expectedRoot 'tools/agent-skills/skill-lock.json'
if (-not (Test-Path -LiteralPath $lockPath)) { throw "Missing lock: $lockPath" }
$lock = Get-Content -Raw -LiteralPath $lockPath | ConvertFrom-Json

function Get-DirectoryChecksum([string]$relativePath) {
  $base = (Resolve-Path (Join-Path $expectedRoot $relativePath)).Path
  $lines = @()
  Get-ChildItem -LiteralPath $base -Recurse -File | Sort-Object FullName | ForEach-Object {
    if ($_.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Links are not allowed: $($_.FullName)" }
    $relative = $_.FullName.Substring($base.Length + 1).Replace('\', '/')
    $hash = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    $lines += "$relative $hash"
  }
  $bytes = [Text.Encoding]::UTF8.GetBytes(($lines -join "`n"))
  $digest = ([Security.Cryptography.SHA256]::Create()).ComputeHash($bytes)
  return (-join ($digest | ForEach-Object { $_.ToString('x2') }))
}

$results = @()
foreach ($skill in @('ui-ux-pro-max', 'impeccable')) {
  $entry = $lock.skills.$skill
  foreach ($harness in @('codex', 'claudeCode')) {
    $property = if ($harness -eq 'codex') { 'codexPath' } else { 'claudeCodePath' }
    $relative = $entry.$property
    if (-not (Test-Path -LiteralPath (Join-Path $expectedRoot $relative))) { throw "Missing $skill $harness path: $relative" }
    $actual = Get-DirectoryChecksum $relative
    $expected = $entry.directoryChecksums.$harness
    if ($actual -ne $expected) { throw "Checksum mismatch for $skill ${harness}: expected $expected, got $actual" }
    $results += "$skill/$harness OK ($actual)"
  }
}

if (Test-Path -LiteralPath (Join-Path $expectedRoot '.codex/hooks.json')) { throw 'Unexpected Codex hook manifest present; hooks must remain disabled.' }
Write-Output "CheckOnly passed for $expectedRoot"
$results | ForEach-Object { Write-Output "- $_" }
