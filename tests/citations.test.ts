import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { SCREEN_CITATIONS, citationLabel, pubmedUrl } from '../src/content/citations';
import { getModules } from '../src/content';
import { screenLocatorMarkdown, sourceCitationsMarkdown } from '../scripts/generate-curriculum-locator';
import { SUPPORTED_LOCALES } from '../src/i18n/locales';
import { UI_STRINGS } from '../src/i18n/strings';

const normalize = (text: string) => text.replace(/\s+/g, ' ').replace(/[‘’]/g, "'").trim();

describe('supporting-source citations', () => {
  const english = getModules('en');
  const screens = new Map(english.flatMap((module) => module.screens.map((screen) => [screen.id, { module, screen }] as const)));

  it('cite only content screens, and each claim is still on its screen word for word', () => {
    for (const [screenId, citation] of Object.entries(SCREEN_CITATIONS)) {
      const found = screens.get(screenId);
      assert.ok(found, `${screenId} does not exist`);
      assert.equal(found.screen.type, 'content', `${screenId} is not a content screen`);
      if (found.screen.type !== 'content') continue;
      const text = normalize([...found.screen.paragraphs, ...(found.screen.keyPoints ?? [])].join(' ').replace(/•\s*/g, ''));
      assert.ok(text.includes(normalize(citation.claim)), `${screenId} no longer contains its cited claim: ${citation.claim}`);
    }
  });

  it('have a PubMed ID, a real year, and a supporting quote', () => {
    for (const [screenId, citation] of Object.entries(SCREEN_CITATIONS)) {
      assert.match(citation.pmid, /^\d{7,9}$/, screenId);
      assert.ok(citation.year >= 2000 && citation.year <= 2026, screenId);
      assert.ok(citation.supportingQuote.length > 40, screenId);
      assert.equal(pubmedUrl(citation.pmid), `https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}/`);
      assert.match(citationLabel(citation), / et al\., .+, \d{4}$/);
    }
  });

  it('cover about a quarter of content screens and every module', () => {
    const content = english.flatMap((module) => module.screens.filter((screen) => screen.type === 'content'));
    const share = Object.keys(SCREEN_CITATIONS).length / content.length;
    assert.ok(share >= 0.2 && share <= 0.35, `share is ${share}`);
    for (const module of english) assert.ok(module.screens.some((screen) => SCREEN_CITATIONS[screen.id]), `${module.id} has no citation`);
  });

  it('label the link in every language', () => {
    for (const locale of SUPPORTED_LOCALES) {
      assert.match(UI_STRINGS[locale].supportingSourcePaper, /\{\{citation\}\}/, locale);
      assert.match(UI_STRINGS[locale].supportingSourcePaperLabel, /\{\{citation\}\}.*PubMed/, locale);
    }
  });

  it('reviewer documents are current', () => {
    const read = (path: string) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
    assert.equal(read('docs/curriculum/SOURCE_CITATIONS.md'), sourceCitationsMarkdown(), 'run npx tsx scripts/generate-curriculum-locator.ts');
    assert.equal(read('docs/curriculum/SCREEN_LOCATOR.md'), screenLocatorMarkdown(), 'run npx tsx scripts/generate-curriculum-locator.ts');
  });
});
