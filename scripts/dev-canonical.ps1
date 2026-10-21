param(
  [ValidateRange(30, 300)]
  [int]$StartupTimeoutSeconds = 120,
  [string]$WorkerDevVarsPath = '',
  [switch]$TestHelpersOnly
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$workerRoot = Join-Path $projectRoot 'cloudflare-worker'
$canonicalExpoPort = 8084
$canonicalWorkerPort = 8789

function Get-UniqueListenerProcessIds([object[]]$ListenerRows, [int]$Port) {
  @($ListenerRows |
    Where-Object { [int]$_.LocalPort -eq $Port } |
    Select-Object -ExpandProperty OwningProcess -Unique)
}

function Test-WorkerHealthPayload($Payload) {
  $null -ne $Payload -and $Payload.ok -eq $true -and $Payload.configured -eq $true
}

function Get-CanonicalReadiness(
  [object[]]$ListenerRows,
  [bool]$WorkerHealthReady,
  [bool]$ExpoHttpReady,
  [int]$ExpoPort = 8084,
  [int]$WorkerPort = 8789
) {
  $expoListeners = @(Get-UniqueListenerProcessIds $ListenerRows $ExpoPort)
  $workerListeners = @(Get-UniqueListenerProcessIds $ListenerRows $WorkerPort)
  [pscustomobject]@{
    ExpoListenerCount = $expoListeners.Count
    WorkerListenerCount = $workerListeners.Count
    ExpoHttpReady = $ExpoHttpReady
    WorkerHealthReady = $WorkerHealthReady
    Ready = $expoListeners.Count -eq 1 -and $workerListeners.Count -eq 1 -and $ExpoHttpReady -and $WorkerHealthReady
  }
}

if ($TestHelpersOnly) {
  return
}

if ([string]::IsNullOrWhiteSpace($WorkerDevVarsPath)) {
  if ([string]::IsNullOrWhiteSpace($env:LOCALAPPDATA)) {
    throw 'LOCALAPPDATA is unavailable. Pass -WorkerDevVarsPath with an external Worker dev-vars file.'
  }
  $WorkerDevVarsPath = Join-Path $env:LOCALAPPDATA 'LifespanSleepEducation\worker.dev.vars'
}

$workerDevVarsFullPath = [System.IO.Path]::GetFullPath($WorkerDevVarsPath)
$projectFullPath = [System.IO.Path]::GetFullPath($projectRoot).TrimEnd('\', '/') + [System.IO.Path]::DirectorySeparatorChar
if ($workerDevVarsFullPath.StartsWith($projectFullPath, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Worker dev vars must be stored outside the project. Expected an external path such as $env:LOCALAPPDATA\LifespanSleepEducation\worker.dev.vars."
}
if (-not (Test-Path -LiteralPath $workerDevVarsFullPath -PathType Leaf)) {
  throw "External Worker dev-vars file is missing: $workerDevVarsFullPath. Create it manually with the required local Worker variables; do not place secrets in the project."
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
    $isWorker = $command -match 'wrangler(\\|/).*dev|wrangler\.js dev|wrangler\.cmd.*dev'
    $isStaleExpo = $isExpo -and $command -match '--port (8081|8082|8083|19009)'
    $isStaleWorker = $isWorker -and $command -match '--port (8787|8788)'
    if ($isStaleExpo -or $isStaleWorker) {
      Stop-ProcessTree $row.ProcessId
    }
  }
}

function Test-WorkerHttpReady {
  try {
    $health = Invoke-RestMethod -Uri "http://127.0.0.1:$canonicalWorkerPort/health" -Method Get -TimeoutSec 2
    return Test-WorkerHealthPayload $health
  } catch {
    return $false
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

$workerLog = Join-Path $projectRoot '.canonical-worker.log'
$expoLog = Join-Path $projectRoot '.canonical-expo.log'
$quotedDevVarsPath = '"' + $workerDevVarsFullPath.Replace('"', '\"') + '"'
$workerArgs = "run dev -- --local --ip 0.0.0.0 --port $canonicalWorkerPort --env-file $quotedDevVarsPath --var ALLOWED_ORIGINS:http://localhost:$canonicalExpoPort,http://127.0.0.1:$canonicalExpoPort --show-interactive-dev-session false"
$expoArgs = "run web"

$existingListeners = @(Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue)
$existingWorkerProcesses = @(Get-UniqueListenerProcessIds $existingListeners $canonicalWorkerPort)
$existingExpoProcesses = @(Get-UniqueListenerProcessIds $existingListeners $canonicalExpoPort)
if ($existingWorkerProcesses.Count -gt 1 -or $existingExpoProcesses.Count -gt 1) {
  throw "Canonical ports have multiple listener processes. Expo $canonicalExpoPort=$($existingExpoProcesses.Count); Worker $canonicalWorkerPort=$($existingWorkerProcesses.Count). Stop conflicting processes before retrying."
}
if ($existingWorkerProcesses.Count -eq 0) {
  Start-Process -FilePath 'npm.cmd' -ArgumentList $workerArgs -WorkingDirectory $workerRoot -WindowStyle Hidden -RedirectStandardOutput $workerLog -RedirectStandardError ($workerLog + '.err') | Out-Null
}
if ($existingExpoProcesses.Count -eq 0) {
  Start-Process -FilePath 'npm.cmd' -ArgumentList $expoArgs -WorkingDirectory $projectRoot -WindowStyle Hidden -RedirectStandardOutput $expoLog -RedirectStandardError ($expoLog + '.err') | Out-Null
}

$deadline = (Get-Date).AddSeconds($StartupTimeoutSeconds)
$readiness = $null
do {
  Start-Sleep -Milliseconds 500
  $listeners = @(Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue)
  $workerListenerCount = @(Get-UniqueListenerProcessIds $listeners $canonicalWorkerPort).Count
  $expoListenerCount = @(Get-UniqueListenerProcessIds $listeners $canonicalExpoPort).Count
  $workerReady = $workerListenerCount -eq 1 -and (Test-WorkerHttpReady)
  $expoReady = $expoListenerCount -eq 1 -and (Test-ExpoHttpReady)
  $readiness = Get-CanonicalReadiness $listeners $workerReady $expoReady $canonicalExpoPort $canonicalWorkerPort
} while (-not $readiness.Ready -and (Get-Date) -lt $deadline)

if (-not $readiness.Ready) {
  throw "Canonical runtime was not ready within $StartupTimeoutSeconds seconds. Expo port $canonicalExpoPort listeners=$($readiness.ExpoListenerCount), http=$($readiness.ExpoHttpReady); Worker port $canonicalWorkerPort listeners=$($readiness.WorkerListenerCount), health-ok-and-configured=$($readiness.WorkerHealthReady). Logs: $expoLog, $expoLog.err, $workerLog, $workerLog.err."
}

Write-Output "Canonical Lifespan Sleep runtime"
Write-Output "Expo:   http://127.0.0.1:$canonicalExpoPort"
Write-Output "Worker: http://127.0.0.1:$canonicalWorkerPort"
Write-Output "Native: Worker listens on 0.0.0.0:$canonicalWorkerPort; Expo derives the device URL from the Metro host when EXPO_PUBLIC_AI_NATIVE_DEV_WORKER_PORT=$canonicalWorkerPort."
Write-Output "Dev vars: external Worker file loaded with Wrangler --env-file."
Write-Output "Logs:   $expoLog and $workerLog"
