# Translation workflow (English, Spanish, Portuguese, Creole)

Status as of 2026-11-11. Current numbers are in [TRANSLATION_STATUS.md](TRANSLATION_STATUS.md), which is generated from the code.

## Where things stand

| Language | State | Learner can select it | What is missing |
| --- | --- | --- | --- |
| English (`en`) | Source language | Yes | Clinical review of every module |
| Spanish (`es`) | Complete draft, not reviewed by a qualified translator | Yes, with an on-screen "borrador" (draft) notice in Settings and About | Professional medical translation review, then clinical review |
| Portuguese | Requested; **variety not decided** | No | A decision on Brazilian (`pt-BR`) or European (`pt-PT`) Portuguese, then translation and both reviews |
| Creole | Requested; **language not decided** | No | A decision on which Creole (for example Haitian Creole `ht` or Cape Verdean Creole `kea`), then translation and both reviews |

Why Portuguese and Creole are not implemented: the request (Dr. Bourjeily, 2026-11-11) was for "different languages". The meeting transcript records Eli asking which languages, but her answer was not captured. Nothing in the repository, the CIAS source, or the earlier handoffs names a Portuguese variety or a specific Creole. Picking one would be a guess that changes vocabulary, spelling, and in the Creole case the language itself, so no locale code was chosen. The candidates are recorded in `src/i18n/locales.ts` (`PLANNED_LOCALE_TARGETS`) and are never shown to learners.

A commit message on 2026-08-17 (`e39e22c`) says "Clinical and Spanish-language approval finalized". No review record supports that, the README and `docs/TRANSLATION_REVIEW.md` both say the Spanish is unreviewed, and every Spanish screen carries `bilingualReviewStatus: 'not_reviewed'`. This workflow treats Spanish as an unreviewed draft.

## How the app keeps unreviewed or partial translations from looking approved

- **One registry.** `src/i18n/locales.ts` lists the shipped locales, their speech-voice rules, and their linguistic and clinical review state. No locale claims clinical approval.
- **Approval lives in one file.** `src/content/review-register.ts` is the only place an approval can be recorded. Both lists are empty. An entry needs a reviewer role (not a name), an ISO date, the exact scope, and a pointer to a signed review record kept outside the repository. Tests reject incomplete entries, and a translator cannot approve clinical content.
- **No partial languages.** `src/content/locale-completeness.ts` checks that a locale has every module and screen in order, the same choice IDs in the same order, the same answer keys, and no English text left in place. `learnerSelectableLocales` (in `src/content/index.ts`) offers only complete locales. `getModules` throws for a locale without content instead of falling back to English.
- **No hidden English.** The Spanish builder stops the build if a choice label or scenario prompt is missing, instead of reusing the English text.
- **Honest labels.** Settings shows a status line for the current language. About has a "Content status" card. For Spanish both say the translation is a draft and the lessons have not completed clinical review.
- **Narration never switches language.** Voice choice comes from the registry; if no voice exists for the lesson language, the Listen control says so and the text stays readable. A voice for another language is never used.

## Adding Portuguese or Creole once the variety is decided

1. **Decide the variety and record it.** Dr. Bourjeily or the study PI names the language and variety based on the participants. Note the decision and its source in this file.
2. **Export the source text.** Run `npx tsx scripts/export-translation-source.ts --target <tag>`. It writes a JSON and a CSV to `artifacts/translation-export/` (git-ignored). Each row is one field of one screen, with its module, screen type, clinical domains, and, for answer choices, whether the choice is the keyed answer. The export contains the private curriculum: do not commit it, and do not upload it to a translation service unless that service is approved for this study.
3. **Translate.** A qualified medical translator fluent in the chosen variety translates every unit. Keep choice order, keep numbers and units, keep the meaning of each keyed and unkeyed answer, and use the glossary (`docs/BILINGUAL_GLOSSARY.md` is the Spanish model; start a matching glossary for the new language).
4. **Add the locale in code.** Add the code to `SUPPORTED_LOCALES` and `LOCALE_DEFINITIONS` (set `linguisticReview: 'draft_awaiting_native_review'`), add its interface strings to `src/i18n/strings.ts` (the compiler lists every missing key), add its lesson modules and its entry in `modulesByLocale`, and add alt text and video labels for the new code (also compiler-enforced).
5. **Check.** `npm run typecheck`, `npm test` (the completeness and parity tests fail on any gap), `npm run validate:content`, and `npx tsx scripts/generate-review-reports.ts` to refresh the status report. Then run the browser checks at 320, 390, and 768 px for text overflow, focus order, and narration with and without a voice for that language.
6. **Review.** The translator's review and, separately, a clinician's review are recorded in `src/content/review-register.ts`. Only then does the status report show "approved", and only for the reviewed scope.

## Review roles

| Step | Who | Can approve |
| --- | --- | --- |
| Translation accuracy and readability | Qualified medical translator, or a native-speaker clinician | Linguistic approval only |
| Clinical meaning in each language | Clinical content reviewer (pregnancy and sleep medicine for m3, m4, m6, m8, m9) | Clinical approval only |
| Which languages and varieties, and whether translated material may be shown to participants | Study PI and the institution | Not an approval in this register; recorded in the readiness document |

## Known Spanish review notes

These come from `docs/curriculum-audit-20261021/README.md` and `docs/TRANSLATION_REVIEW.md`: m8 and m9 Spanish uses "tú" while earlier modules use "usted"; several masculine forms address a pregnant audience; m9-04 has an image with English text baked in; two m4 videos are English only and labeled "Video en inglés".
