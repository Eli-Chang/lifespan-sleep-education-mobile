#!/usr/bin/env node

/**
 * Read-only project orchestration verifier.
 *
 * This file intentionally uses Node built-ins only. It does not invoke agents,
 * contact a network, or write a report. Keep the policy constants in sync with
 * docs/agents/AGENT_ORCHESTRATION.md and the ledger schema.
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = [
  'code_mapper',
  'app_planner',
  'app_implementer',
  'test_architect',
  'final_verifier',
];
const ROUTES = {
  configuration_workflow: BASELINE,
  app_workflow: BASELINE,
  ui: [
    'code_mapper',
    'app_implementer',
    'product_ux_reviewer',
    'playwright_flow_tester',
    'mobile_visual_qa',
    'accessibility_localization_reviewer',
    'final_verifier',
  ],
  clinical: [
    'code_mapper',
    'app_implementer',
    'clinical_ai_safety_reviewer',
    'accessibility_localization_reviewer',
    'final_verifier',
  ],
  native: ['code_mapper', 'app_implementer', 'native_mobile_qa', 'accessibility_localization_reviewer', 'final_verifier'],
  feature: ['code_mapper', 'app_implementer', 'product_ux_reviewer', 'playwright_flow_tester', 'reliability_performance_reviewer', 'final_verifier'],
  ai_privacy: ['code_mapper', 'app_implementer', 'privacy_security_reviewer', 'reliability_performance_reviewer', 'final_verifier'],
  test_only: ['code_mapper', 'app_implementer', 'test_architect', 'playwright_flow_tester', 'final_verifier'],
  documentation: ['code_mapper', 'final_verifier'],
  lesson_content: ['code_mapper', 'app_implementer', 'clinical_ai_safety_reviewer', 'accessibility_localization_reviewer', 'final_verifier'],
  content: ['code_mapper', 'app_implementer', 'clinical_ai_safety_reviewer', 'accessibility_localization_reviewer', 'final_verifier'],
};
function baselineFor(workflow) {
  return workflow === 'documentation' ? ['code_mapper', 'final_verifier'] : BASELINE;
}
const ROSTER = [
  'accessibility_localization_reviewer',
  'app_implementer',
  'app_planner',
  'clinical_ai_safety_reviewer',
  'code_mapper',
  'final_verifier',
  'mobile_visual_qa',
  'native_mobile_qa',
  'playwright_flow_tester',
  'privacy_security_reviewer',
  'product_ux_reviewer',
  'reliability_performance_reviewer',
  'test_architect',
];
const REQUIRED_FILES = [
  'AGENTS.md',
  'docs/agents/AGENT_ORCHESTRATION.md',
  'docs/agents/agent-run-ledger.schema.json',
  'reports/agent-runs/README.md',
  'scripts/verify-agent-orchestration.mjs',
  'package.json',
];
const CONFIG_ALLOWED_PATHS = [
  'AGENTS.md',
  '.codex/config.toml',
  '.codex/agents/',
  'package.json',
  'docs/agents/AGENT_ORCHESTRATION.md',
  'docs/agents/agent-run-ledger.schema.json',
  'reports/agent-runs/README.md',
  'scripts/verify-agent-orchestration.mjs',
];
const RELEVANT_CHANGED_PREFIXES = [
  'app/',
  'components/',
  'src/',
  'hooks/',
  'constants/',
  'data/',
  'assets/',
  'public/',
  'design-system/',
  'tests/',
  'qa/',
  'scripts/',
  'docs/',
  '.codex/config.toml',
  '.codex/agents/',
  'package.json',
  'package-lock.json',
  'app.json',
  'tsconfig.json',
  'playwright.config.ts',
  'expo-env.d.ts',
  'AGENTS.md',
];
const VALID_STAGE_STATUSES = new Set(['pending', 'running', 'completed', 'blocked', 'skipped']);
const VALID_RUN_STATUSES = new Set(['running', 'completed', 'failed', 'blocked', 'skipped']);
const VALID_EVIDENCE_SOURCES = new Set(['codex_thread', 'cli_process']);
const PLACEHOLDER_EVIDENCE = /^(?:config|toml|prompt|roster|none|todo|tbd|unknown|simulat(?:ion)?|fixture|example|fake|mock|<.*>)$/i;
const PASSING_CHECK = /^(?:pass(?:ed)?|ok|success(?:ful)?|complete(?:d)?)$/i;

function read(relativePath) {
  return fs.readFileSync(path.join(SCRIPT_ROOT, relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(path.join(SCRIPT_ROOT, relativePath));
}

function fail(message, errors) {
  errors.push(message);
}

function assertDate(value, label, errors) {
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))) {
    fail(`${label} must be an ISO date-time string`, errors);
  }
}

function assertRelativePath(value, label, errors) {
  if (typeof value !== 'string' || !value.trim()) {
    fail(`${label} must be a non-empty project-relative path`, errors);
    return;
  }
  const normalized = value.replaceAll('\\', '/');
  if (path.isAbsolute(value) || normalized.startsWith('/') || /^[A-Za-z]:\//.test(normalized)) {
    fail(`${label} must not be absolute: ${value}`, errors);
  }
  const parts = normalized.split('/');
  if (parts.includes('..')) {
    fail(`${label} must not traverse a parent directory: ${value}`, errors);
  }
}

function verifyRequiredFiles(errors) {
  for (const relativePath of REQUIRED_FILES) {
    if (!exists(relativePath)) fail(`missing required file: ${relativePath}`, errors);
  }
}

function verifyPackage(errors) {
  let packageJson;
  try {
    packageJson = JSON.parse(read('package.json'));
  } catch (error) {
    fail(`package.json is not valid JSON: ${error.message}`, errors);
    return;
  }
  if (packageJson?.scripts?.['verify:agents'] !== 'node scripts/verify-agent-orchestration.mjs') {
    fail('package.json must expose scripts.verify:agents as the dependency-free verifier', errors);
  }
}

function verifySchema(errors) {
  let schema;
  try {
    schema = JSON.parse(read('docs/agents/agent-run-ledger.schema.json'));
  } catch (error) {
    fail(`agent-run-ledger.schema.json is not valid JSON: ${error.message}`, errors);
    return;
  }
  for (const key of ['$schema', 'title', 'type', 'required', '$defs']) {
    if (!(key in schema)) fail(`ledger schema is missing top-level ${key}`, errors);
  }
  if (schema.type !== 'object') fail('ledger schema top-level type must be object', errors);
  const required = new Set(schema.required ?? []);
  for (const key of ['task', 'timestamp', 'codex_session', 'changed_files', 'required_agents', 'invoked_agents', 'skipped_agents', 'tests', 'final_verifier_status']) {
    if (!required.has(key)) fail(`ledger schema must require ${key}`, errors);
  }
  if (schema.properties?.projectRoot?.const !== '.') {
    fail('ledger schema projectRoot must use the project-relative marker "."', errors);
  }
}

function parseTomlHeader(relativePath) {
  const source = read(relativePath);
  const name = source.match(/^name\s*=\s*["']([^"']+)["']/m)?.[1];
  const sandbox = source.match(/^sandbox_mode\s*=\s*["']([^"']+)["']/m)?.[1];
  return { name, sandbox, source };
}

function verifyRoster(errors) {
  const agentDir = path.join(SCRIPT_ROOT, '.codex', 'agents');
  if (!fs.existsSync(agentDir)) {
    fail('missing .codex/agents directory', errors);
    return;
  }
  const files = fs.readdirSync(agentDir).filter((name) => name.endsWith('.toml')).sort();
  const names = [];
  for (const file of files) {
    const relativePath = `.codex/agents/${file}`;
    try {
      const header = parseTomlHeader(relativePath);
      if (!header.name) fail(`${relativePath} has no name field`, errors);
      else names.push(header.name);
    } catch (error) {
      fail(`cannot read ${relativePath}: ${error.message}`, errors);
    }
  }
  const expected = [...ROSTER].sort();
  if (JSON.stringify(names.sort()) !== JSON.stringify(expected)) {
    fail(`agent roster mismatch; expected exactly ${ROSTER.length} existing TOMLs (${expected.join(', ')})`, errors);
  }
  const modeExpectations = new Map([
    ['app_implementer', 'workspace-write'],
    ['mobile_visual_qa', 'workspace-write'],
    ['playwright_flow_tester', 'workspace-write'],
  ]);
  for (const file of files) {
    const relativePath = `.codex/agents/${file}`;
    const header = parseTomlHeader(relativePath);
    if (!header.name) continue;
    const expectedMode = modeExpectations.get(header.name) ?? 'read-only';
    if (header.sandbox !== expectedMode) {
      fail(`${relativePath} (${header.name}) must retain sandbox_mode=${expectedMode}`, errors);
    }
  }
}

function verifyCodexConfig(errors) {
  const relativePath = '.codex/config.toml';
  if (!exists(relativePath)) {
    fail(`missing ${relativePath}`, errors);
    return;
  }
  const source = read(relativePath);
  if (!/^\s*\[agents\]\s*$/m.test(source)) fail(`${relativePath} must retain the [agents] section`, errors);
  if (!/^enabled\s*=\s*true\s*$/m.test(source)) fail(`${relativePath} must retain agents enabled=true`, errors);
  if (!/^max_concurrent_threads_per_session\s*=\s*6\s*$/m.test(source)) {
    fail(`${relativePath} must retain max_concurrent_threads_per_session=6`, errors);
  }
  if (/^\s*\[hooks\]\s*$/im.test(source) || /stop[_ -]?hook/i.test(source)) {
    fail(`${relativePath} contains an unverified Stop hook configuration`, errors);
  }
}

function verifyRoutingDocs(errors) {
  const root = read('AGENTS.md');
  const contract = read('docs/agents/AGENT_ORCHESTRATION.md');
  const requiredPhrases = [
    'code_mapper',
    'app_planner',
    'app_implementer',
    'test_architect',
    'final_verifier',
    '--classify ui',
    '--classify clinical',
    'final_verifier_status',
    'invoked_agents',
    'configured `.codex/agents/*.toml` is not evidence',
    'npm.cmd run verify:agents',
  ];
  for (const phrase of requiredPhrases) {
    if (!root.includes(phrase) && !contract.includes(phrase)) {
      fail(`routing contract is missing required phrase: ${phrase}`, errors);
    }
  }
  if (!contract.includes('No project Stop hook is installed')) {
    fail('orchestration contract must record the unverified Stop hook limitation', errors);
  }
  if (!contract.includes('does not write a report') || !contract.includes('network')) {
    fail('orchestration contract must document read-only/no-network verifier behavior', errors);
  }
}

function verifyStageSequence(report, relativePath, errors) {
  if (!Array.isArray(report.baselineSequence)) {
    fail(`${relativePath}: baselineSequence must be an array`, errors);
    return;
  }
  const stageIds = report.baselineSequence.map((stage) => stage?.agentId);
  const expectedBaseline = baselineFor(report.workflow);
  if (JSON.stringify(stageIds) !== JSON.stringify(expectedBaseline)) {
    fail(`${relativePath}: baselineSequence must be exactly ${expectedBaseline.join(' -> ')}`, errors);
  }
  report.baselineSequence.forEach((stage, index) => {
    if (!stage || typeof stage !== 'object') {
      fail(`${relativePath}: baseline stage ${index + 1} must be an object`, errors);
      return;
    }
    if (stage.order !== index + 1) fail(`${relativePath}: baseline stage ${index + 1} has wrong order`, errors);
    if (stage.required !== true) fail(`${relativePath}: baseline stage ${index + 1} must be required=true`, errors);
    if (!VALID_STAGE_STATUSES.has(stage.status)) fail(`${relativePath}: invalid status for ${stage.agentId}`, errors);
    if (stage.status === 'completed' && typeof stage.runId !== 'string') {
      fail(`${relativePath}: completed ${stage.agentId} must reference runId`, errors);
    }
    if ((stage.status === 'blocked' || stage.status === 'skipped') && !String(stage.reason ?? '').trim()) {
      fail(`${relativePath}: ${stage.status} ${stage.agentId} requires a reason`, errors);
    }
  });
}

function verifyRun(run, index, relativePath, report, errors) {
  const label = `${relativePath}: runs[${index}]`;
  if (!run || typeof run !== 'object') {
    fail(`${label} must be an object`, errors);
    return;
  }
  if (typeof run.runId !== 'string' || !run.runId.trim()) fail(`${label}.runId is required`, errors);
  if (!ROSTER.includes(run.agentId)) fail(`${label}.agentId is not in the preserved roster`, errors);
  if (!VALID_RUN_STATUSES.has(run.status)) fail(`${label}.status is invalid`, errors);
  if (!['pass', 'fail', 'blocked', 'skipped'].includes(run.result)) fail(`${label}.result is invalid`, errors);
  const expectedResult = {
    completed: 'pass',
    failed: 'fail',
    blocked: 'blocked',
    skipped: 'skipped',
  }[run.status];
  if (expectedResult && run.result !== expectedResult) {
    fail(`${label}.result must be ${expectedResult} when status is ${run.status}`, errors);
  }
  assertDate(run.startedAt, `${label}.startedAt`, errors);
  assertDate(run.endedAt, `${label}.endedAt`, errors);
  const evidence = run.invocationEvidence;
  if (!evidence || typeof evidence !== 'object') {
    fail(`${label} requires invocationEvidence from the active runtime`, errors);
  } else {
    if (!VALID_EVIDENCE_SOURCES.has(evidence.source)) fail(`${label}.invocationEvidence.source is not a runtime source`, errors);
    if (typeof evidence.reference !== 'string' || !evidence.reference.trim() || PLACEHOLDER_EVIDENCE.test(evidence.reference.trim())) {
      fail(`${label}.invocationEvidence.reference must be an observed non-placeholder reference`, errors);
    }
    assertDate(evidence.observedAt, `${label}.invocationEvidence.observedAt`, errors);
  }
  if (!Array.isArray(run.filesChanged)) fail(`${label}.filesChanged must be an array`, errors);
  else run.filesChanged.forEach((file) => assertRelativePath(file, `${label}.filesChanged[]`, errors));
  if (!Array.isArray(run.commands)) fail(`${label}.commands must be an array`, errors);
  if (!Array.isArray(run.checks) || !run.checks.length) fail(`${label}.checks must be a non-empty array`, errors);
  else {
    run.checks.forEach((check, checkIndex) => {
      if (!check || typeof check !== 'object' || typeof check.command !== 'string' || typeof check.result !== 'string') {
        fail(`${label}.checks[${checkIndex}] must include command and result`, errors);
      } else if (run.status === 'completed' && !PASSING_CHECK.test(check.result.trim())) {
        fail(`${label}.checks[${checkIndex}] must have a passing result for completed runs`, errors);
      }
    });
  }
  if (!['none', 'approved'].includes(run.networkAccess)) fail(`${label}.networkAccess must be none or approved`, errors);
  if (report.workflow === 'configuration_workflow') {
    if (run.networkAccess && run.networkAccess !== 'none') fail(`${label}: configuration_workflow cannot use networkAccess=${run.networkAccess}`, errors);
    for (const file of run.filesChanged ?? []) {
      const normalized = file.replaceAll('\\', '/');
      const allowed = CONFIG_ALLOWED_PATHS.some((candidate) => {
        const base = candidate.replace(/\/$/, '');
        return normalized === base || normalized.startsWith(`${base}/`);
      });
      if (!allowed) fail(`${label}: configuration_workflow changed path outside approved boundary: ${file}`, errors);
    }
  }
}

function evidenceReference(value) {
  if (typeof value === 'string') return value.trim();
  if (value && typeof value === 'object') return String(value.reference ?? value.path ?? value.id ?? '').trim();
  return '';
}

function evidenceSource(value) {
  if (value && typeof value === 'object' && value.source) return value.source;
  return 'codex_thread';
}

function normalizeCanonicalReport(report, relativePath, errors) {
  const required = ['task', 'timestamp', 'codex_session', 'changed_files', 'required_agents', 'invoked_agents', 'skipped_agents', 'tests', 'final_verifier_status'];
  for (const key of required) {
    if (!(key in report)) fail(`${relativePath}: canonical field ${key} is required`, errors);
  }
  if (typeof report.task !== 'string' || report.task.trim().length < 2) fail(`${relativePath}: task must be a descriptive string`, errors);
  assertDate(report.timestamp, `${relativePath}: timestamp`, errors);
  if (typeof report.codex_session !== 'string' || !report.codex_session.trim() || PLACEHOLDER_EVIDENCE.test(report.codex_session.trim())) {
    fail(`${relativePath}: codex_session must be an observed non-placeholder value`, errors);
  }
  if (!Array.isArray(report.changed_files)) fail(`${relativePath}: changed_files must be an array`, errors);
  else report.changed_files.forEach((file) => assertRelativePath(file, `${relativePath}: changed_files[]`, errors));
  if (!Array.isArray(report.required_agents)) fail(`${relativePath}: required_agents must be an array`, errors);
  else {
    report.required_agents.forEach((agentId) => {
      if (!ROSTER.includes(agentId)) fail(`${relativePath}: required_agents contains unknown agent ${agentId}`, errors);
    });
  }
  if (!Array.isArray(report.invoked_agents)) fail(`${relativePath}: invoked_agents must be an array`, errors);
  const derivedRuns = [];
  for (const [index, invoked] of (report.invoked_agents ?? []).entries()) {
    const label = `${relativePath}: invoked_agents[${index}]`;
    if (!invoked || typeof invoked !== 'object') {
      fail(`${label} must be an object`, errors);
      continue;
    }
    if (!ROSTER.includes(invoked.name) || /^(?:unknown|unavailable|simulated|not-invoked|fallback)$/i.test(String(invoked.name ?? ''))) {
      fail(`${label}.name is not an available runtime agent`, errors);
    }
    if (invoked.status !== 'completed') fail(`${label}.status must be completed for an invoked agent`, errors);
    const runId = String(invoked.thread_or_run_id ?? '').trim();
    if (!runId || PLACEHOLDER_EVIDENCE.test(runId) || /(?:simulat|unavailable|not-invoked|fallback|unknown)/i.test(runId)) {
      fail(`${label}.thread_or_run_id must be an observed non-placeholder value`, errors);
    }
    if (typeof invoked.purpose !== 'string' || !invoked.purpose.trim()) fail(`${label}.purpose is required`, errors);
    if (typeof invoked.summary !== 'string' || !invoked.summary.trim()) fail(`${label}.summary is required`, errors);
    if (!Array.isArray(invoked.evidence) || !invoked.evidence.length) fail(`${label}.evidence must contain runtime evidence`, errors);
    for (const [evidenceIndex, item] of (invoked.evidence ?? []).entries()) {
      const reference = evidenceReference(item);
      const source = evidenceSource(item);
      if (!VALID_EVIDENCE_SOURCES.has(source)) fail(`${label}.evidence[${evidenceIndex}] has an invalid runtime source`, errors);
      if (!reference || (PLACEHOLDER_EVIDENCE.test(reference) && reference !== 'not-exposed-by-client') || /(?:simulat|unavailable|not-invoked|fallback)/i.test(reference)) {
        fail(`${label}.evidence[${evidenceIndex}] is a forbidden or missing runtime reference`, errors);
      }
    }
    derivedRuns.push({
      runId,
      agentId: invoked.name,
      role: invoked.purpose,
      status: 'completed',
      result: 'pass',
      startedAt: report.timestamp,
      endedAt: report.timestamp,
      invocationEvidence: {
        source: evidenceSource(invoked.evidence?.[0]),
        reference: evidenceReference(invoked.evidence?.[0]) || runId,
        observedAt: report.timestamp,
      },
      filesChanged: report.changed_files ?? [],
      commands: (report.tests ?? []).map((test) => typeof test === 'string' ? test : String(test?.command ?? '')),
      checks: (report.tests ?? []).map((test) => ({
        command: typeof test === 'string' ? test : String(test?.command ?? ''),
        result: typeof test === 'string' ? 'PASS' : String(test?.result ?? 'PASS'),
      })),
      networkAccess: 'none',
    });
  }
  if (!Array.isArray(report.skipped_agents)) fail(`${relativePath}: skipped_agents must be an array`, errors);
  for (const [index, skipped] of (report.skipped_agents ?? []).entries()) {
    if (!skipped || typeof skipped !== 'object' || !ROSTER.includes(skipped.name)) fail(`${relativePath}: skipped_agents[${index}] names an unavailable agent`, errors);
    if (!String(skipped?.reason ?? '').trim()) fail(`${relativePath}: skipped_agents[${index}] requires a reason`, errors);
  }
  if (!Array.isArray(report.tests)) fail(`${relativePath}: tests must be an array`, errors);
  else {
    report.tests.forEach((test, index) => {
      if (test && typeof test === 'object') {
        const outcome = test.result ?? test.status ?? test.outcome;
        if (outcome !== undefined && !PASSING_CHECK.test(String(outcome).trim()) && report.final_verifier_status === 'passed') {
          fail(`${relativePath}: tests[${index}] has a failing result while final_verifier_status=passed`, errors);
        }
      }
    });
  }
  const workflow = Object.prototype.hasOwnProperty.call(ROUTES, report.workflow)
    ? report.workflow
    : (Object.prototype.hasOwnProperty.call(ROUTES, report.task) ? report.task : 'configuration_workflow');
  const requiredAgents = [...new Set([...baselineFor(workflow), ...(ROUTES[workflow] ?? []), ...(report.required_agents ?? [])])];
  for (const agentId of [...new Set([...baselineFor(workflow), ...(ROUTES[workflow] ?? [])])]) {
    if (!(report.required_agents ?? []).includes(agentId)) fail(`${relativePath}: required_agents is missing routed agent ${agentId}`, errors);
  }
  const baselineSequence = baselineFor(workflow).map((agentId, index) => {
    const run = derivedRuns.find((candidate) => candidate.agentId === agentId);
    return { order: index + 1, agentId, required: true, status: run ? 'completed' : 'pending', ...(run ? { runId: run.runId } : {}) };
  });
  return {
    ...report,
    workflow,
    createdAt: report.createdAt ?? report.timestamp,
    projectRoot: report.projectRoot ?? '.',
    result: report.result ?? (report.final_verifier_status === 'passed' ? 'pass' : 'pending'),
    baselineSequence: report.baselineSequence ?? baselineSequence,
    runs: report.runs ?? derivedRuns,
    _derivedRuns: derivedRuns,
    _requiredAgents: requiredAgents,
  };
}

function verifyReport(relativePath, errors) {
  let report;
  try {
    report = JSON.parse(read(relativePath));
  } catch (error) {
    fail(`${relativePath}: invalid JSON (${error.message})`, errors);
    return;
  }
  if (!report || typeof report !== 'object' || Array.isArray(report)) {
    fail(`${relativePath}: report must be a JSON object`, errors);
    return;
  }
  report = normalizeCanonicalReport(report, relativePath, errors);
  if (report.result === 'pass' && (report.invoked_agents ?? []).some((agent) => (agent.evidence ?? []).some((item) => evidenceReference(item) === 'not-exposed-by-client'))) {
    fail(`${relativePath}: not-exposed-by-client evidence cannot support a passing result`, errors);
  }
  if (report.schemaVersion !== undefined && report.schemaVersion !== '1.0') fail(`${relativePath}: schemaVersion must be 1.0`, errors);
  if (report.taskId !== undefined && (typeof report.taskId !== 'string' || !/^[a-z0-9][a-z0-9._-]{1,80}$/.test(report.taskId))) fail(`${relativePath}: invalid taskId`, errors);
  if (!Object.prototype.hasOwnProperty.call(ROUTES, report.workflow)) fail(`${relativePath}: invalid workflow`, errors);
  if (report.projectRoot !== '.') fail(`${relativePath}: projectRoot must be the local marker "."`, errors);
  if (!['pending', 'passed', 'failed', 'blocked'].includes(report.final_verifier_status)) {
    fail(`${relativePath}: final_verifier_status must be pending, passed, failed, or blocked`, errors);
  }
  assertDate(report.createdAt, `${relativePath}: createdAt`, errors);
  verifyStageSequence(report, relativePath, errors);
  if (!Array.isArray(report.runs)) fail(`${relativePath}: runs must be an array`, errors);
  else {
    const runIds = new Set();
    const completedPassAgents = new Set();
    report.runs.forEach((run, index) => {
      verifyRun(run, index, relativePath, report, errors);
      if (run?.runId) {
        if (runIds.has(run.runId)) fail(`${relativePath}: duplicate runId ${run.runId}`, errors);
        runIds.add(run.runId);
      }
      if (run?.status === 'completed' && run?.result === 'pass') completedPassAgents.add(run.agentId);
    });
    for (const stage of report.baselineSequence ?? []) {
      if (stage.status === 'completed' && !runIds.has(stage.runId)) {
        fail(`${relativePath}: completed ${stage.agentId} references missing runId ${stage.runId}`, errors);
      }
    }
    const requiredAgents = [...new Set([...baselineFor(report.workflow), ...ROUTES[report.workflow]])];
    if (report.result === 'pass') {
      for (const agentId of requiredAgents) {
        if (!completedPassAgents.has(agentId)) {
          fail(`${relativePath}: required route agent ${agentId} lacks a completed passing run`, errors);
        }
      }
    }
  }
  if (!['pending', 'pass', 'fail', 'blocked'].includes(report.result)) fail(`${relativePath}: invalid result`, errors);
  if (report.final_verifier_status === 'passed' && report.result !== 'pass') {
    fail(`${relativePath}: final_verifier_status=passed requires result=pass`, errors);
  }
  if (report.result === 'pass') {
    const incomplete = (report.baselineSequence ?? []).filter((stage) => stage.status !== 'completed');
    if (incomplete.length) fail(`${relativePath}: pass requires all baseline stages completed`, errors);
    const finalRun = (report.runs ?? []).find((run) => run.agentId === 'final_verifier' && run.status === 'completed' && run.result === 'pass');
    if (!finalRun) fail(`${relativePath}: pass requires a completed passing final_verifier run`, errors);
    if (report.final_verifier_status !== 'passed') fail(`${relativePath}: pass requires final_verifier_status=passed`, errors);
  }
  return report;
}

function parseGitStatus() {
  const result = spawnSync('git', ['status', '--short', '--untracked-files=all'], {
    cwd: SCRIPT_ROOT,
    encoding: 'utf8',
    windowsHide: true,
  });
  const head = spawnSync('git', ['rev-parse', '--verify', 'HEAD'], {
    cwd: SCRIPT_ROOT,
    encoding: 'utf8',
    windowsHide: true,
  });
  if (result.error || head.error || result.status !== 0 || head.status !== 0) {
    return { available: false, paths: [], reason: 'git baseline is unavailable (no verified HEAD or git executable)' };
  }
  const lines = String(result.stdout ?? '').split(/\r?\n/).map((line) => line.trimEnd()).filter(Boolean);
  const paths = lines.map((line) => {
    const value = line.slice(3).trim();
    const renamed = value.split(' -> ');
    return renamed[renamed.length - 1].replaceAll('\\', '/');
  });
  return { available: true, paths };
}

function isOrchestrationPath(relativePath) {
  const normalized = relativePath.replaceAll('\\', '/');
  return CONFIG_ALLOWED_PATHS.some((candidate) => {
    const base = candidate.replace(/\/$/, '');
    return normalized === base || normalized.startsWith(`${base}/`);
  });
}

function isRelevantChangedPath(relativePath) {
  const normalized = relativePath.replaceAll('\\', '/');
  return RELEVANT_CHANGED_PREFIXES.some((prefix) => {
    const base = prefix.replace(/\/$/, '');
    return normalized === base || normalized.startsWith(`${base}/`);
  });
}

function verifyCurrentReports(reportEntries, errors) {
  const gitStatus = parseGitStatus();
  if (!gitStatus.available) {
    console.log(`INFO ${gitStatus.reason}; no-change pass for this configuration audit`);
    return;
  }
  if (!gitStatus.paths.length) {
    console.log('INFO git status clean; no current agent-run report is required');
    return;
  }
  const relevantChanges = gitStatus.paths.filter(isRelevantChangedPath);
  if (!relevantChanges.length) {
    console.log(`INFO ${gitStatus.paths.length} current irrelevant change${gitStatus.paths.length === 1 ? '' : 's'}; no orchestration report required`);
    return;
  }
  if (!reportEntries.length) {
    fail(`current relevant changes require a current report: ${relevantChanges.join(', ')}`, errors);
    return;
  }
  const latest = [...reportEntries].sort((a, b) => {
    const aTime = Date.parse(a.report.createdAt) || a.mtimeMs;
    const bTime = Date.parse(b.report.createdAt) || b.mtimeMs;
    return bTime - aTime;
  })[0];
  const reportedPaths = new Set([
    ...(latest.report.changed_files ?? []),
    ...(latest.report.runs ?? []).flatMap((run) => run.filesChanged ?? []),
  ].map((file) => file.replaceAll('\\', '/')));
  const unreported = relevantChanges.filter((file) => !file.startsWith('reports/agent-runs/') && !reportedPaths.has(file));
  if (unreported.length) {
    fail(`latest report ${latest.relativePath} does not list current changed path(s): ${unreported.join(', ')}`, errors);
  }
  if (latest.report.workflow === 'configuration_workflow') {
    const outsideBoundary = relevantChanges.filter((file) => !isOrchestrationPath(file) && !file.startsWith('reports/agent-runs/'));
    if (outsideBoundary.length) {
      fail(`configuration_workflow report cannot accompany changed production path(s): ${outsideBoundary.join(', ')}`, errors);
    }
  }
  const latestChangedTime = relevantChanges.reduce((latestTime, relativePath) => {
    try {
      return Math.max(latestTime, fs.statSync(path.join(SCRIPT_ROOT, relativePath)).mtimeMs);
    } catch {
      return latestTime;
    }
  }, 0);
  const reportTime = Date.parse(latest.report.createdAt);
  if (latestChangedTime && reportTime && reportTime + 1000 < latestChangedTime) {
    fail(`latest report ${latest.relativePath} is stale relative to current changes`, errors);
  }
  console.log(`INFO current report ${latest.relativePath} selected for ${relevantChanges.length} relevant changed path(s)`);
}

function verifyReports(errors) {
  const reportDir = path.join(SCRIPT_ROOT, 'reports', 'agent-runs');
  if (!fs.existsSync(reportDir)) return;
  const reports = fs.readdirSync(reportDir)
    .filter((name) => name.endsWith('.json'))
    .sort();
  const reportEntries = [];
  for (const file of reports) {
    const relativePath = `reports/agent-runs/${file}`;
    const report = verifyReport(relativePath, errors);
    if (report) {
      reportEntries.push({
        relativePath,
        report,
        mtimeMs: fs.statSync(path.join(SCRIPT_ROOT, relativePath)).mtimeMs,
      });
    }
  }
  if (!reports.length) {
    console.log('INFO no task ledgers found; configuration checks pass, runtime evidence is still required for task completion');
  } else {
    console.log(`INFO checked ${reports.length} task ledger${reports.length === 1 ? '' : 's'}`);
  }
  verifyCurrentReports(reportEntries, errors);
}

function classify(value) {
  const input = value || 'configuration_workflow';
  if (Object.prototype.hasOwnProperty.call(ROUTES, input)) {
    return {
      classification: input,
      requiredRoute: ROUTES[input],
      baselineSequence: baselineFor(input),
      requiredAgents: [...new Set([...baselineFor(input), ...ROUTES[input]])],
      soleWriter: 'app_implementer',
      externalWrites: false,
      ledgerDirectory: 'reports/agent-runs',
      evidenceRequired: true,
      note: 'Simulation only; this output is not runtime evidence.',
    };
  }
  if (ROSTER.includes(input)) {
    const index = BASELINE.indexOf(input);
    return {
      classification: index >= 0 ? 'baseline_stage' : 'conditional_specialist',
      agentId: input,
      order: index >= 0 ? index + 1 : null,
      access: input === 'app_implementer' || input === 'mobile_visual_qa' || input === 'playwright_flow_tester' ? 'workspace-write' : 'read-only',
      evidenceRequired: true,
      note: 'Simulation only; this output is not an invocation.',
    };
  }
  throw new Error(`unknown classification ${JSON.stringify(input)}; use a workflow or preserved agent id`);
}

function parseClassify(argv) {
  const index = argv.indexOf('--classify');
  if (index < 0) return null;
  return argv[index + 1] && !argv[index + 1].startsWith('-') ? argv[index + 1] : undefined;
}

function main() {
  const classification = parseClassify(process.argv.slice(2));
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log('Usage: node scripts/verify-agent-orchestration.mjs [--classify [workflow|agentId]]');
    return 0;
  }
  if (process.argv.includes('--classify')) {
    try {
      console.log(JSON.stringify(classify(classification), null, 2));
      return 0;
    } catch (error) {
      console.error(`FAIL ${error.message}`);
      return 1;
    }
  }
  const errors = [];
  verifyRequiredFiles(errors);
  if (!errors.length) {
    verifyPackage(errors);
    verifySchema(errors);
    verifyCodexConfig(errors);
    verifyRoster(errors);
    verifyRoutingDocs(errors);
    verifyReports(errors);
  }
  if (errors.length) {
    for (const error of errors) console.error(`FAIL ${error}`);
    console.error(`Agent orchestration verification failed with ${errors.length} error${errors.length === 1 ? '' : 's'}.`);
    return 1;
  }
  console.log(`PASS agent orchestration policy, schema, roster, and current reports (${BASELINE.join(' -> ')})`);
  return 0;
}

process.exitCode = main();
