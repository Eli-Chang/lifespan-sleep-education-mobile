param(
  [ValidateRange(30, 300)]
  [int]$StartupTimeoutSeconds = 120,
  [switch]$TestHelpersOnly
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$canonicalExpoPort = 8084

function Get-UniqueListenerProcessIds([object[]]$ListenerRows, [int]$Port) {
  @($ListenerRows |
    Where-Object { [int]$_.LocalPort -eq $Port } |
    Select-Object -ExpandProperty OwningProcess -Unique)
}

function Get-CanonicalReadiness(
  [object[]]$ListenerRows,
  [bool]$ExpoHttpReady,
  [int]$ExpoPort = 8084
) {
  $expoListeners = @(Get-UniqueListenerProcessIds $ListenerRows $ExpoPort)
  [pscustomobject]@{
    ExpoListenerCount = $expoListeners.Count
    ExpoHttpReady = $ExpoHttpReady
    Ready = $expoListeners.Count -eq 1 -and $ExpoHttpReady
  }
}

if ($TestHelpersOnly) {
  return
}

function Get-ProcessRows {
  Get-CimInstance Win32_Process | Where-Object {
    $_.CommandLine -and $_.CommandLine -like "*$projectRoot*"
  }
}

function Stop-ProcessTree([int]$processId) {
  Get-CimInstance Win32_Process | Where-Object { $_.ParentProcessId -eq $processId } | ForEach-Object { Stop-ProcessTree $_.ProcessId }
  Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
}

function Stop-StaleSleepAppProcesses {
  $rows = @(Get-ProcessRows)
  foreach ($row in $rows) {
    $command = [string]$row.CommandLine
    $isExpo = $command -match 'expo(\\|/).*start|expo start'
    $isStaleExpo = $isExpo -and $command -match '--port (8081|8082|8083|19009)'
    if ($isStaleExpo) {
      Stop-ProcessTree $row.ProcessId
    }
  }
}

function Test-ExpoHttpReady {
  try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:$canonicalExpoPort/" -UseBasicParsing -TimeoutSec 2
    return [int]$response.StatusCode -eq 200
  } catch {
    return $false
  }
}

Stop-StaleSleepAppProcesses

$expoLog = Join-Path $projectRoot '.canonical-expo.log'
$expoArgs = "run web"

$existingListeners = @(Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue)
$existingExpoProcesses = @(Get-UniqueListenerProcessIds $existingListeners $canonicalExpoPort)
if ($existingExpoProcesses.Count -gt 1) {
  throw "Canonical port has multiple listener processes. Expo $canonicalExpoPort=$($existingExpoProcesses.Count). Stop conflicting processes before retrying."
}
if ($existingExpoProcesses.Count -eq 0) {
  Start-Process -FilePath 'npm.cmd' -ArgumentList $expoArgs -WorkingDirectory $projectRoot -WindowStyle Hidden -RedirectStandardOutput $expoLog -RedirectStandardError ($expoLog + '.err') | Out-Null
}

$deadline = (Get-Date).AddSeconds($StartupTimeoutSeconds)
$readiness = $null
do {
  Start-Sleep -Milliseconds 500
  $listeners = @(Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue)
  $expoListenerCount = @(Get-UniqueListenerProcessIds $listeners $canonicalExpoPort).Count
  $expoReady = $expoListenerCount -eq 1 -and (Test-ExpoHttpReady)
  $readiness = Get-CanonicalReadiness $listeners $expoReady $canonicalExpoPort
} while (-not $readiness.Ready -and (Get-Date) -lt $deadline)

if (-not $readiness.Ready) {
  throw "Canonical runtime was not ready within $StartupTimeoutSeconds seconds. Expo port $canonicalExpoPort listeners=$($readiness.ExpoListenerCount), http=$($readiness.ExpoHttpReady). Logs: $expoLog, $expoLog.err."
}

Write-Output "Canonical Lifespan Sleep runtime"
Write-Output "Expo:   http://127.0.0.1:$canonicalExpoPort"
Write-Output "Logs:   $expoLog"
