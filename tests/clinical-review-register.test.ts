import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { describe, it } from 'node:test';
import { englishModules } from '../src/content/en';
import { spanishModules } from '../src/content/es';
import { MODULE_CLINICAL_REVIEW, PAP_DOMAINS, PREGNANCY_DOMAINS } from '../src/content/clinical-review-register';
import { CLINICAL_APPROVALS } from '../src/content/review-register';
import { learnerVisibleText } from '../src/content/locale-completeness';

const moduleText = (moduleId: string) => englishModules.find((module) => module.id === moduleId)!.screens
  .map((screen) => Object.values(learnerVisibleText(screen)).join(' ')).join(' ');

describe('clinical review register', () => {
  it('has exactly one entry per module, matching the content status', () => {
    assert.deepEqual(MODULE_CLINICAL_REVIEW.map((entry) => entry.moduleId), englishModules.map((module) => module.id));
    for (const entry of MODULE_CLINICAL_REVIEW) {
      const module = englishModules.find((candidate) => candidate.id === entry.moduleId)!;
      assert.equal(entry.status, module.clinicalReviewStatus, `${entry.moduleId} status`);
      assert.equal(spanishModules.find((candidate) => candidate.id === entry.moduleId)!.clinicalReviewStatus, module.clinicalReviewStatus);
      assert.ok(entry.requiredReviewers.includes('clinical content reviewer'), `${entry.moduleId} needs a clinical reviewer`);
      assert.ok(entry.sourceBasis.trim());
      for (const item of entry.openItems) assert.ok(existsSync(item.reference), `${entry.moduleId} cites missing ${item.reference}`);
    }
  });

  it('flags every module that talks about pregnancy, babies, or PAP use', () => {
    for (const entry of MODULE_CLINICAL_REVIEW) {
      const text = moduleText(entry.moduleId);
      if (/pregnan|fetal|fetus|newborn|baby|babies/i.test(text)) assert.ok(entry.domains.some((domain) => PREGNANCY_DOMAINS.includes(domain)), `${entry.moduleId} mentions pregnancy but has no pregnancy review domain`);
    }
    for (const id of ['m4', 'm6']) assert.ok(MODULE_CLINICAL_REVIEW.find((entry) => entry.moduleId === id)!.domains.includes('pregnancy-comorbidities'));
    for (const id of ['m8', 'm9']) {
      const entry = MODULE_CLINICAL_REVIEW.find((candidate) => candidate.moduleId === id)!;
      assert.ok(entry.domains.some((domain) => PAP_DOMAINS.includes(domain)), `${id} PAP domain`);
      assert.ok(entry.requiredReviewers.includes('study PI'), `${id} needs PI sign-off`);
      assert.ok(entry.openItems.length > 0, `${id} keeps its audited open items`);
    }
  });

  it('records no clinical approval anywhere', () => {
    assert.deepEqual(CLINICAL_APPROVALS, []);
    for (const module of [...englishModules, ...spanishModules]) assert.notEqual(module.clinicalReviewStatus as string, 'approved');
  });
});
