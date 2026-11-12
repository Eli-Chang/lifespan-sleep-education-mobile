# Portuguese and Haitian Creole translation: method, QA, and open items

Status as of 2026-11-12, branch `work/four-language-20261112`. Implementation completeness, translation accuracy, and clinical approval are three separate things. This document covers the first two; the third has not happened for any language.

## 1. Language targets

| Requested | Implemented as | Basis | Confirmed by the research team |
| --- | --- | --- | --- |
| Portuguese | Brazilian Portuguese, `pt-BR`, shown as "Português (Brasil)" | Working assumption. No project record names a Portuguese variety. | No |
| Creole | Haitian Creole, `ht`, shown as "Kreyòl ayisyen" | Working assumption. No project record names a Creole language. | No |

Dr. Bourjeily did not choose these. `src/i18n/locales.ts` records both as `varietyStatus: 'working_assumption'`, and `LANGUAGE_VARIETY_DECISIONS` lists the alternatives (`pt-PT`, Cape Verdean Creole `kea`) and the decision still needed. The status report shows both as "Decided: no".

## 2. Method

- **Source:** the English curriculum exactly as committed, exported with `scripts/export-translation-source.ts` (742 text units: every title, paragraph, list item, question, choice, explanation, recap, and image label), plus 124 interface strings and 72 image and video text items.
- **Translator:** Claude (Anthropic model), one agent per module group, local only. Nothing was sent to a third-party translation service. Style and terminology followed [GLOSSARY.md](GLOSSARY.md).
- **Assembly:** `scripts/assemble-translations.ts` writes `src/content/translations/<locale>.ts`. `src/content/overlay.ts` builds the translated modules from English plus the catalog, copying IDs, order, types, choice IDs, answer keys, source IDs, review flags, and media from English. A translation therefore cannot change grading or progress identifiers, and a missing unit throws instead of showing English.
- **Spanish:** unchanged. It keeps its existing draft status.

## 3. Engine evaluation

Claude was the only engine used. A second engine for independent checking, especially for Haitian Creole, would help, but using one needs a vendor decision, a data-handling review of the private curriculum, and in most cases a paid account or credentials. None of that was authorized, so none was used. The checks below are Claude-based and are **not independent validation** and **not professional medical translation approval**.

## 4. Automated checks (deterministic)

`tests/translation-qa.test.ts` and `tests/locale-infrastructure.test.ts` run for `es`, `pt-BR`, and `ht`:

- same module IDs and order, 113 screens, screen IDs, types, choice IDs and order, answer keys, graded versus ungraded, option-explanation keys, source IDs, and clinical review flags as English
- every learner-visible field present, non-empty, valid Unicode (NFC, no replacement characters), and free of placeholder or template leakage
- every number, bullet, and line break preserved; protected abbreviations (PAP, CPAP, APAP, BiPAP, NHLBI, CIAS, ATS, AI) preserved
- PAP never rendered as oxygen therapy
- interface strings: every key, same `{{placeholders}}`, no untranslated multi-word English
- no catalog entry without an English source unit
- `Type II diabetes` (m4-04 choice 2) is exempt from the number check because English uses a Roman numeral

## 5. Claude back-translation review (not independent)

Four Claude reviewers back-translated 355 higher-risk units per language (those with negations, hedges, numbers, risk or association wording, medications, or an answer key) and compared them with the English. Findings are listed in section 7 once the reviews are complete.

## 6. Edits made after drafting (before/after record)

The first drafts added wording that is not in the English. These were removed so the text matches the source. The full before and after strings are in the git history of `src/content/translations/` and in this table.

| Locale | Unit | Removed |
| --- | --- | --- |
| pt-BR | `m1-07::paragraphs[0]` | "(do inglês positive airway pressure)" |
| pt-BR | `m4-q6::choices[2]` | "(micose)" after "Pé de atleta" |
| pt-BR | `m5-q11::choices[2]` | "Hambúrguer grande de fast-food" gloss |
| pt-BR | `m9-04::keyPoints[0]` | "(condensação no tubo)" |
| ht | `m4-q4::choices[3]` | "(pwoblèm atansyon ak ajitasyon)" after ADHD |
| ht | `m5-q11::choices[2]` | "(anmbègè)" |
| ht | `m5-q11::choices[6]` | "(bè)" after "Ti fwi" |
| ht | `m7-05::paragraphs[2]` | "(moun ki devan an)" after "ti kiyè" |
| ht | `m8-08::paragraphs[2]` | Reworded "the care team makes these decisions, depending on the device" back to "these are care-team and device decisions" |

Known remaining departures from English: the Portuguese drafts replaced em dashes with commas, parentheses, or semicolons. Several Creole equipment and medical terms are loanwords or coinages (see section 8).

## 7. Back-translation findings

Four Claude reviewers checked 355 higher-risk units in each language (two per language, run in parallel). Result: **0 meaning-changing findings and 11 minor findings** (pt-BR 4, ht 7); 10 were applied and 1 was not (below). Each applied fix is a wording change that brings the translation closer to the English; the exact before and after strings are in the commit that adds them. This is a Claude review of Claude output, so a clean result is weak evidence.

Applied after review (10 edits):

- `pt-BR` `m4-06::paragraphs[1]`: reviewer found a softened, strengthened, or narrowed meaning; replaced with the reviewer's closer wording.
- `pt-BR` `m9-09::paragraphs[2]`: reviewer found a softened, strengthened, or narrowed meaning; replaced with the reviewer's closer wording.
- `pt-BR` `m9-06::paragraphs[0]`: reviewer found a softened, strengthened, or narrowed meaning; replaced with the reviewer's closer wording.
- `pt-BR` `m9-07::paragraphs[0]`: reviewer found a softened, strengthened, or narrowed meaning; replaced with the reviewer's closer wording.
- `ht` `m1-03::paragraphs[1]`: reviewer found a softened, strengthened, or narrowed meaning; replaced with the reviewer's closer wording.
- `ht` `m1-04::paragraphs[3]`: reviewer found a softened, strengthened, or narrowed meaning; replaced with the reviewer's closer wording.
- `ht` `m3-q3::questionFeedback.optionExplanations.c3`: reviewer found a softened, strengthened, or narrowed meaning; replaced with the reviewer's closer wording.
- `ht` `m5-08::paragraphs[3]`: reviewer found a softened, strengthened, or narrowed meaning; replaced with the reviewer's closer wording.
- `ht` `m6-recap::keyPoints[0]`: reviewer found a softened, strengthened, or narrowed meaning; replaced with the reviewer's closer wording.
- `ht` `m5-20::paragraphs[1]`: reviewer found a softened, strengthened, or narrowed meaning; replaced with the reviewer's closer wording.

Not applied: `m5-q11::choices[6]` (ht, "Ti fwi"). The reviewer's fix adds examples ("frèz oswa myrtil") that the English does not have, so the vague translation stays and is listed for a human reviewer.

## 8. Items for a qualified human reviewer

Terms the drafting agents flagged as having no settled equivalent or as a judgment call:

- **Portuguese:** drug names kept in English spelling (fluticasone, budesonide, famotidine, nizatidine, cimetidine, omeprazole; Brazilian generics are fluticasona, budesonida, famotidina, nizatidina, cimetidina, omeprazol); temperatures kept in °F; "headgear" as "arnês (fixador de cabeça)"; "autoramp" as "autorrampa"; "outcome" as "desfecho"; "sleep drive/pressure" as "pressão de sono"; masculine "parceiro" versus "parceiro(a)"; feminine agreement for the reader and "Obrigada" in recap titles when the author's gender is not stated.
- **Haitian Creole:** "entimite" (intimacy, formal), "ipopne", "ritm sirkadyen", "kwononitrisyon", "lensomni", "sfenktè anba ezofaj la", "domaj konjenital", "sangle tèt" (headgear), "entèfas" (interface), "kouran lè" (airflow), "fwit lè" (leak), "otoranp", "ti kiyè" (little spoon, idiom has no Kreyòl equivalent and now has no gloss), "rann gaz" (burping, could also read as passing gas), "Ti fwi" (berries), "tranche" (labor versus contractions), and the interface strings `Inventory`, `notQuite`, and narration wording.
- **Source-text issues found while translating (English, not changed here):** `m1-q1` says "You have OSA even if you don't snore" while the choices say "can"; `m2-q1` says satisfaction "did not change for any couples" while m2-05 reports 41% increased, and `m2-q1` and `m2-q2` have no answer key; `m5-04` has a broken sentence ("leading to reduced stress ... and improve sleep quality"); `m5-10` "avoid any naps at least 6 hours before bedtime" is ambiguous; `m6-03` "simply saline spray" likely means "simple"; `m4-recap` and others use a gendered "Obrigado" voice. These belong with the existing clinical-review items in `src/content/clinical-review-register.ts`; the translation mirrors the English meaning.

## 9. Media: images, videos, and audio

- **Image alt text:** translated for all 66 registry images in both new languages. The Spanish alt text is unchanged.
- **Visual check on 2026-11-12:** the m6-07 (heartburn guidance), m6-08 (anxiety coping), and m9-04 (water in mask) images were opened and each shows English text inside the picture. The m4 recap drawing comes from the earlier audit and was not reopened. The remaining infographics (for example the m1 symptom graphics, m3-01 pregnancy outcomes, and the m1 recap) were **not** individually audited for embedded text and may also contain English; treat the list below as a minimum, not a complete inventory.
- **Images with English text baked in** (the caption is translated, the image is not): m6-07 (infographic), m6-08, m9-04, and the m4 recap drawing, as recorded in `docs/curriculum-audit-20261021/README.md` and `docs/RESEARCH_PILOT_READINESS.md`. These screens are not fully localized. Replacing them needs a decision about image permissions (most have no recorded license).
- **Videos:** the two lesson videos (m4-03 gestational diabetes, m4-05 preeclampsia) are English-language YouTube videos. Titles are shown as "Vídeo em inglês: ..." (pt-BR) and "Videyo an angle: ..." (ht), and the alt text says the video is in English. They are not localized.
- **Withheld images:** m8-10 and m9-05 stay withheld in every language (`WITHHELD_IMAGES`).
- **Text-to-speech:** narration uses only installed device voices whose language matches (`pt` for Portuguese, `ht` for Haitian Creole) and never falls back to another language. Haitian Creole voices are uncommon on phones, so the Listen control will often say that no voice is available. The headless Chrome used for testing on this PC exposes no speech voices at all (0 of 0), so neither locale's narration could be tested with a real voice. A European Portuguese (`pt-PT`) voice would be accepted for `pt-BR` because the match is on the `pt` prefix; a French voice is never used for Creole (unit-tested). Native audio quality is **not verified**. See `docs/PHYSICAL_DEVICE_TEST_CHECKLIST.md`.

## 10. Needs Dr. Bourjeily or the study PI

1. Confirm Brazilian Portuguese and Haitian Creole, or name the varieties (section 1).
2. Decide whether audio is needed in either language.
3. Assign a qualified medical translator for each language, then a clinical reviewer. Approvals are recorded only in `src/content/review-register.ts`.
4. Decide whether the Claude-drafted text may be shown to any participant, and whether to approve an independent second engine for checking.
