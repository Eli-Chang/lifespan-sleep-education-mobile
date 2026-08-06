$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '../../../..')).Path
if ((Split-Path $root -Leaf) -ne 'lifespan-sleep-education-mobile') { throw "Unexpected project root: $root" }
$agents = Join-Path $root '.codex/agents'
$expected = @('app-planner.toml','code-mapper.toml','product-ux-reviewer.toml','app-implementer.toml','test-architect.toml','playwright-flow-tester.toml','mobile-visual-qa.toml','native-mobile-qa.toml','accessibility-localization-reviewer.toml','privacy-security-reviewer.toml','clinical-ai-safety-reviewer.toml','reliability-performance-reviewer.toml','final-verifier.toml')
foreach ($name in $expected) { $path = Join-Path $agents $name; if (!(Test-Path $path)) { throw "Missing agent: $name" }; $text = Get-Content $path -Raw; foreach ($field in @('name =','description =','developer_instructions =')) { if ($text -notmatch [regex]::Escape($field)) { throw "$name missing $field" } } }
$skill = Join-Path $root '.agents/skills/sleep-app-development/SKILL.md'; if (!(Test-Path $skill)) { throw 'Missing skill' }
$agents | Out-Null
Write-Output "Agent setup valid: $root"
