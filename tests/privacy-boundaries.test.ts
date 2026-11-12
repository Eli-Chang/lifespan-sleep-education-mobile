import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { it } from 'node:test';
import { PERSISTED_LEARNING_KEYS } from '../src/state/learning-persistence';

const sourceFiles = (dir: string): string[] => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? sourceFiles(path) : /\.(ts|tsx)$/.test(name) ? [path] : [];
});

it('the research build makes no network calls and sends nothing to AI or analytics services', () => {
  const offenders: string[] = [];
  for (const file of [...sourceFiles('app'), ...sourceFiles('src')]) {
    const text = readFileSync(file, 'utf8');
    if (/\bfetch\(|XMLHttpRequest|\baxios\b|new WebSocket|EventSource|sendBeacon/.test(text)) offenders.push(file);
    if (/EXPO_PUBLIC_AI|ai-client|LessonChat|workers\.dev/.test(text)) offenders.push(`${file} (AI)`);
  }
  assert.deepEqual(offenders, []);
  const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as { dependencies: Record<string, string> };
  const tracking = Object.keys(pkg.dependencies).filter((name) => /analytics|sentry|segment|amplitude|firebase|mixpanel|posthog|bugsnag|datadog/i.test(name));
  assert.deepEqual(tracking, []);
});

it('stores only learning progress and preferences on the device, with no identifiers or AI state', () => {
  assert.deepEqual([...PERSISTED_LEARNING_KEYS].sort(), [
    'answerAttempts', 'answers', 'completedModuleIds', 'completedScreenIds', 'currentModuleId', 'curriculumVersion', 'language',
    'lastScreenByModule', 'narrationEnabled', 'narrationPitch', 'narrationRate', 'reduceMotion', 'reflectionDrafts', 'savedReflections', 'voiceByLocale',
  ]);
  for (const key of PERSISTED_LEARNING_KEYS) assert.doesNotMatch(key, /name|email|phone|participant|user|device|ai|consent|chat/i);
});
