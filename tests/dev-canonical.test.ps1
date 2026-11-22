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
  [pscustomobject]@{ LocalPort = 9000; OwningProcess = 303 }
)

Assert-Equal @(Get-UniqueListenerProcessIds $listeners 8084).Count 1 'Duplicate rows from one process must count as one Expo listener'
Assert-Equal @(Get-UniqueListenerProcessIds $listeners 8081).Count 0 'Retired Expo port must not satisfy readiness'

$ready = Get-CanonicalReadiness $listeners $true
Assert-Equal $ready.Ready $true 'One unique Expo listener and a passing HTTP probe must be ready'
$conflict = Get-CanonicalReadiness @($listeners + [pscustomobject]@{ LocalPort = 8084; OwningProcess = 404 }) $true
Assert-Equal $conflict.Ready $false 'Multiple Expo listener processes must fail readiness'
$deadExpo = Get-CanonicalReadiness $listeners $false
Assert-Equal $deadExpo.Ready $false 'Expo HTTP failure must prevent success'
Assert-Equal $StartupTimeoutSeconds 120 'Default startup timeout must cover bounded cold starts'

Write-Output "dev-canonical helper checks passed: $assertions"
