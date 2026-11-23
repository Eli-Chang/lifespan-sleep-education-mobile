import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { it } from 'node:test';
import { buildReviewReports } from '../scripts/generate-review-reports';

const normalize = (value: string) => value.replace(/\r\n/g, '\n').trim();

it('committed curriculum inventory and translation status match the code', async () => {
  const reports = await buildReviewReports();
  assert.equal(normalize(readFileSync('docs/curriculum/CURRICULUM_INVENTORY.md', 'utf8')), normalize(reports.inventory), 'rerun: npx tsx scripts/generate-review-reports.ts');
  assert.equal(normalize(readFileSync('docs/translation/TRANSLATION_STATUS.md', 'utf8')), normalize(reports.translation), 'rerun: npx tsx scripts/generate-review-reports.ts');
  assert.match(reports.translation, /\| Spanish \(`es`\) \| yes \| yes \| 0 \| 0 \| 116 \| 0 \| 116 of 116 \|/);
  assert.match(reports.translation, /| Portuguese (Brazil) (`pt-BR`) | no | yes | 0 | 0 | 116 | 0 | 116 of 116 |/);
  assert.match(reports.translation, /| Haitian Creole (`ht`) | no | yes | 0 | 0 | 116 | 0 | 116 of 116 |/);
});
