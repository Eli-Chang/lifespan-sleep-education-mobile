$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
. (Join-Path $projectRoot 'scripts\dev-canonical.ps1') -TestHelpersOnly

$assertions = 0
function Assert-Equal($Actual, $Expected, [string]$Message) {
  $script:assertions += 1
  if ($Actual -ne $Expected) {
    throw "$Message. Expected '$Expected', received '$Actual'."
  }
}

$listeners = @(
  [pscustomobject]@{ LocalPort = 8084; OwningProcess = 101 },
  [pscustomobject]@{ LocalPort = 8084; OwningProcess = 101 },
  [pscustomobject]@{ LocalPort = 8789; OwningProcess = 202 },
  [pscustomobject]@{ LocalPort = 9000; OwningProcess = 303 }
)

Assert-Equal @(Get-UniqueListenerProcessIds $listeners 8084).Count 1 'Duplicate rows from one process must count as one Expo listener'
Assert-Equal @(Get-UniqueListenerProcessIds $listeners 8789).Count 1 'Worker listener must be matched by exact port'
Assert-Equal @(Get-UniqueListenerProcessIds $listeners 8787).Count 0 'Retired Worker port must not satisfy readiness'
Assert-Equal (Test-WorkerHealthPayload ([pscustomobject]@{ ok = $true; configured = $true })) $true 'Configured healthy Worker must pass'
Assert-Equal (Test-WorkerHealthPayload ([pscustomobject]@{ ok = $true; configured = $false })) $false 'configured:false must fail'

$ready = Get-CanonicalReadiness $listeners $true $true
Assert-Equal $ready.Ready $true 'Both unique exact listeners and both HTTP probes must be required'
$conflict = Get-CanonicalReadiness @($listeners + [pscustomobject]@{ LocalPort = 8789; OwningProcess = 404 }) $true $true
Assert-Equal $conflict.Ready $false 'Multiple Worker listener processes must fail readiness'
$deadExpo = Get-CanonicalReadiness $listeners $true $false
Assert-Equal $deadExpo.Ready $false 'Expo HTTP failure must prevent success'
Assert-Equal $StartupTimeoutSeconds 120 'Default startup timeout must cover bounded cold starts'

Write-Output "dev-canonical helper checks passed: $assertions"
