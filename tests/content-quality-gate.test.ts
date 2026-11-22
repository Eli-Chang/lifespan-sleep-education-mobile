import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { anchorChanges, compareSnapshots, extractAnchors, isTextBearing } from '../scripts/content-quality-gate';
import type { ContentSnapshot } from '../scripts/content-units';

const read = (path: string) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
const frontmatter = (text: string) => /^---\n([\s\S]*?)\n---\n/.exec(text)?.[1] ?? '';

describe('writing-quality skills are installed for both agents', () => {
  for (const skill of ['humanizer', 'sleep-app-content-quality']) {
    it(`${skill} has valid metadata and identical Claude Code and Codex copies`, () => {
      const claude = `.claude/skills/${skill}/SKILL.md`;
      const codex = `.agents/skills/${skill}/SKILL.md`;
      assert.ok(existsSync(claude), claude);
      assert.ok(existsSync(codex), codex);
      const text = read(claude);
      const meta = frontmatter(text);
      assert.match(meta, new RegExp(`^name: ${skill}$`, 'm'));
      assert.match(meta, /^description: \S/m);
      assert.equal(read(codex), text, `${skill} copies differ`);
    });
  }

  it('keeps the upstream humanizer license and provenance', () => {
    for (const dir of ['.claude', '.agents']) {
      assert.match(read(`${dir}/skills/humanizer/LICENSE`), /MIT License/);
      assert.match(read(`${dir}/skills/humanizer/SOURCE.txt`), /github\.com\/blader\/humanizer[\s\S]*Commit: [0-9a-f]{40}/);
    }
  });

  it('protects clinical anchors, quiz keys, and all four locales in the content skill', () => {
    const text = read('.claude/skills/sleep-app-content-quality/SKILL.md');
    for (const phrase of ['PEMAT', 'Clear Communication Index', 'correctChoiceId', 'src/content/question-feedback', 'all four languages', 'Result: PASS', 'usted', 'associated with', 'pt-BR', 'Haitian Creole', 'never edited', 'check:content-quality', 'humanizer']) {
      assert.ok(text.includes(phrase), `missing ${phrase}`);
    }
  });
});

describe('agent instructions route patient-facing text through both skills', () => {
  it('AGENTS.md names both skills and the gate', () => {
    const text = read('AGENTS.md');
    assert.match(text, /## Patient-facing text/);
    assert.ok(text.includes('.agents/skills/humanizer/SKILL.md'));
    assert.ok(text.includes('.agents/skills/sleep-app-content-quality/SKILL.md'));
    assert.ok(text.includes('check:content-quality'));
  });

  it('CLAUDE.md imports AGENTS.md and tells Claude Code to invoke both skills', () => {
    const text = read('CLAUDE.md');
    assert.match(text, /^@AGENTS\.md$/m);
    assert.match(text, /invoke the `humanizer` skill and then the `sleep-app-content-quality` skill/);
  });

  it('the path-scoped rule covers every text-bearing location the gate watches', () => {
    const text = read('.claude/rules/patient-facing-text.md');
    for (const glob of ['src/content/**', 'src/i18n/**', 'src/components/**/*.tsx', 'app/**/*.tsx', 'app.json']) assert.ok(frontmatter(text).includes(`"${glob}"`), glob);
    for (const path of ['src/content/en/modules/module-01.ts', 'src/i18n/strings.ts', 'src/components/LessonRenderer.tsx', 'app/about.tsx', 'app.json']) assert.ok(isTextBearing(path), path);
    for (const path of ['src/state/progress.ts', 'tests/x.test.ts', 'docs/README.md']) assert.equal(isTextBearing(path), false, path);
  });

  it('package.json exposes the gate', () => {
    const pkg = JSON.parse(read('package.json')) as { scripts: Record<string, string> };
    assert.equal(pkg.scripts['check:content-quality'], 'tsx scripts/content-quality-gate.ts');
  });
});

describe('clinical anchor extraction', () => {
  it('finds numbers with units, qualifiers, and clinical terms', () => {
    const anchors = extractAnchors('You may need less than 200 mg of caffeine at 28 weeks; never change PAP pressure.');
    assert.deepEqual(anchors.numbers, ['200 mg', '28 weeks']);
    assert.ok(anchors.qualifiers.includes('may') && anchors.qualifiers.includes('never'));
    assert.ok(anchors.terms.includes('pap') && anchors.terms.includes('caffeine'));
  });

  it('reports a changed dose or a strengthened claim', () => {
    const changes = anchorChanges('Stay below 200 mg a day. OSA may be associated with preeclampsia.', 'Stay below 300 mg a day. OSA will cause preeclampsia.');
    const numbers = changes.find((change) => change.kind === 'numbers');
    assert.deepEqual(numbers && [numbers.removed, numbers.added], [['200 mg'], ['300 mg']]);
    const qualifiers = changes.find((change) => change.kind === 'qualifiers');
    assert.ok(qualifiers?.removed.includes('may') && qualifiers.added.includes('will'));
  });

  it('reports nothing for a wording-only edit', () => {
    assert.deepEqual(anchorChanges('Studies show individual with partners use CPAP more.', 'Studies show individuals with partners use CPAP more.'), []);
  });
});

const snapshot = (overrides: Partial<ContentSnapshot> = {}): ContentSnapshot => ({
  screenIds: ['m1-01', 'm1-q1'],
  answers: { 'm1-q1': { type: 'singleChoice', choiceIds: ['c1', 'c2'], correct: ['c1'], questionKind: 'objective' } },
  units: [
    { key: 'm1-01::paragraphs[0]', locale: 'en', text: 'PAP keeps the airway open.', sourceBacked: false },
    { key: 'm1-01::paragraphs[0]', locale: 'es', text: 'La PAP mantiene abierta la vía respiratoria.', sourceBacked: false },
  ],
  ...overrides,
});

describe('snapshot comparison', () => {
  it('passes an unchanged snapshot', () => {
    const result = compareSnapshots(snapshot(), snapshot());
    assert.deepEqual([result.changedUnits, result.blocking, result.review], [[], [], []]);
  });

  it('blocks a changed answer key unless explicitly allowed', () => {
    const changed = snapshot({ answers: { 'm1-q1': { type: 'singleChoice', choiceIds: ['c1', 'c2'], correct: ['c2'], questionKind: 'objective' } } });
    assert.equal(compareSnapshots(snapshot(), changed).blocking.length, 1);
    const allowed = compareSnapshots(snapshot(), changed, { allowAnswerKeyChange: true });
    assert.equal(allowed.blocking.length, 0);
    assert.ok(allowed.review.some((item) => /answer key changed/.test(item)));
  });

  it('blocks reordered choices and removed screens', () => {
    const reordered = snapshot({ answers: { 'm1-q1': { type: 'singleChoice', choiceIds: ['c2', 'c1'], correct: ['c1'], questionKind: 'objective' } } });
    assert.ok(compareSnapshots(snapshot(), reordered).blocking.some((item) => /choice IDs or order/.test(item)));
    assert.ok(compareSnapshots(snapshot(), snapshot({ screenIds: ['m1-q1'] })).blocking.some((item) => /m1-01 was removed/.test(item)));
  });

  it('flags a new answer key for source review without blocking', () => {
    const base = snapshot({ answers: { 'm1-q1': { type: 'singleChoice', choiceIds: ['c1', 'c2'], correct: null, questionKind: 'objective' } } });
    const result = compareSnapshots(base, snapshot());
    assert.equal(result.blocking.length, 0);
    assert.ok(result.review.some((item) => /new answer key c1/.test(item)));
  });

  it('blocks an English change whose translation was left as it was, unless explicitly allowed', () => {
    const current = snapshot();
    current.units = current.units.map((unit) => unit.locale === 'en' ? { ...unit, text: 'PAP helps keep the airway open.' } : unit);
    const result = compareSnapshots(snapshot(), current);
    assert.equal(result.changedUnits.length, 1);
    assert.ok(result.blocking.some((item) => /English changed but es did not/.test(item)));
    const allowed = compareSnapshots(snapshot(), current, { allowUnchangedTranslations: true });
    assert.equal(allowed.blocking.length, 0);
    assert.ok(allowed.review.some((item) => /English changed but es did not/.test(item)));
  });
});
