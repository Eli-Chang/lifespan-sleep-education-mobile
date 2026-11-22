---
name: sleep-app-content-quality
description: Patient-education and clinical-accuracy standard for any text a learner sees in the Lifespan Sleep Education App, including lessons, quiz questions, answer feedback, per-choice explanations, summaries, narration text, image alt text, interface strings, and the Spanish, Brazilian Portuguese, and Haitian Creole translations. Use whenever adding, editing, rewriting, translating, or reviewing that text, always together with the humanizer skill. Covers static, bundled app content only.
metadata:
  version: "1.0.0"
  owner: "Lifespan Sleep Education App"
---

# Sleep app content quality

The app teaches pregnant learners about sleep, obstructive sleep apnea (OSA), and positive airway pressure (PAP). Every sentence a learner sees should read like a knowledgeable, approachable health educator talking to one real patient, and it must stay scientifically faithful. When natural wording and medical accuracy pull apart, accuracy wins.

Use this skill with `humanizer`. Humanizer removes formulaic, AI-sounding patterns. This skill decides what the text must keep, how plain it must be, and how the change ripples into quizzes and translations.

## 1. Scope

In scope, wherever it lives:

| Text | Where it lives |
| --- | --- |
| Lesson titles, paragraphs, lists, key points, summaries | `src/content/en/modules/*.ts`, `src/content/en/cias-source.ts`, `src/content/helpers.ts` callers |
| Questions, choices, instructions, feedback | same module files |
| Answer keys and per-choice explanations for check-your-understanding questions | `src/content/question-feedback/` (`keys.ts` plus one file per language) |
| Narration text (`narrationText`) | same module files |
| Rich presentation and source-visible labels | `src/content/rich-presentation.ts`, module files |
| Image alt text and video labels | `src/content/image-registry.ts`, `src/content/media-text.ts` |
| Interface strings (buttons, labels, help, errors, about page) | `src/i18n/strings.ts` and the `ui` catalogs in `src/content/translations/*.ts` |
| Spanish lesson text | `src/content/es/**` |
| Brazilian Portuguese and Haitian Creole text | `src/content/translations/pt-BR.ts`, `src/content/translations/ht.ts` |
| Inline strings in screens and components | `app/**/*.tsx`, `src/components/**/*.tsx` |
| App name and store description | `app.json` |

Out of scope: text a learner types (reflections, saved answers), which is never edited; identifiers such as screen IDs, choice IDs, `sourceIds`, translation keys, and route names; code comments; developer-only QA screens unless a learner can reach them. The app has no AI companion or runtime text generation.

Wording copied from the original CIAS program carries a `cias-screenshot-recovery` or `cias-ez-pap-document` source ID. Treat it as source text: fix clear errors (typos, grammar, punctuation), but change meaning or phrasing only when the request authorizes it.

## 2. Editing sequence

1. **Identify** the unit: file, screen ID, field, its purpose (teach, check, reassure, instruct, label), and its clinical constraints from section 4.
2. **Draft** the new or revised text.
3. **Apply humanizer** to the draft (embedded mode: return final text only).
4. **Apply this skill**: sections 3 to 6.
5. **Compare** the result with the original sentence by sentence. List every number, unit, qualifier, warning, term, and answer that appears in either version, and confirm each survived unchanged unless the request changed it on purpose. Hedges are clinical content, not filler: keep "may", "can", "often", "associated with", "some", and "does not predict" exactly as strong as the original, even when humanizer suggests a shorter sentence.
6. **Follow dependencies**: matching translations (section 7), quiz keys and explanations (section 5), narration text, alt text, and the generated review docs (`npx.cmd tsx scripts/generate-review-reports.ts` rewrites `docs/curriculum/CURRICULUM_INVENTORY.md` and `docs/translation/TRANSLATION_STATUS.md`; the gate checks they are current).
7. **Verify**: run `npm.cmd run check:content-quality`. Read every `BLOCK` and `REVIEW` line and fix what it found: add missing translations, restore any qualifier or number you did not mean to change. Then run it again with `-- --reviewed`. The change is not finished until that second run prints `Result: PASS`. If the gate cannot run, say so plainly in the handoff and list which checks were skipped; never report the change as done.
8. **Report** what changed in meaning, which languages you updated, what was flagged for clinical review, and what was not checked.

## 3. Voice and plain language

Primary references: AHRQ Patient Education Materials Assessment Tool (PEMAT, https://www.ahrq.gov/health-literacy/patient-education/pemat.html) and the CDC Clear Communication Index (https://www.cdc.gov/ccindex/). The checks below are a working summary; consult the sources for the full item wording.

- Make the purpose of each screen obvious in its first sentence. Lead with the main message.
- Speak to the learner directly ("you", "your care team"). Use active voice.
- Use everyday words. When a medical term is needed, define it the first time it appears in a module, then use it consistently: "obstructive sleep apnea (OSA), when the airway keeps narrowing or closing during sleep".
- Prefer concrete examples and specific actions over general advice. Tell the learner exactly what they can do, and break multi-step actions into short ordered steps.
- Present numbers the way people use them: whole numbers, one format per screen, units spelled consistently, no unexplained statistics.
- Keep only what the learner needs for this screen. Cut repeated points, filler reassurance, and wrap-up sentences that restate the paragraph.
- Fit length and tone to the content type:
  - Lesson paragraphs: two to four sentences, warm and plain.
  - Questions: one clear stem, parallel choices, no trick wording.
  - Answer summaries: short ("Correct!", "Well, not quite…" are the established pattern).
  - Per-choice explanations: one sentence that says why this choice is right or wrong.
  - Buttons and labels: a verb or a short noun phrase.
  - Alt text: what the image shows that matters for learning, in one sentence.
  - Narration text: what reads well aloud, with no symbols the voice would mispronounce.
- Reassure only when it is true and useful. Never promise outcomes.
- Do not add slang, deliberate errors, invented personal stories, or quotes to sound human.
- For lessons Claude wrote (display Modules 9 and 10, internal `m8` and `m9`), follow `docs/curriculum/VOICE_GUIDE.md`: Eli's CIAS voice, bullets for any list of three or more, and three select-all checks per module.
- A "Supporting source" citation (`src/content/citations.ts`) must be a PubMed-indexed paper whose abstract supports the exact sentence on the screen. If you reword a cited sentence, update its `claim` and recheck the abstract; never cite from memory.

## 4. Clinical anchors (protected)

Keep these exactly unless the request explicitly authorizes a clinical change:

- Scientific claims and their strength. "Is associated with", "has been observed in some groups", and "may" stay as weak as written; never upgrade to "causes" or "will", and never soften a stated risk.
- Group-level versus individual framing ("does not predict what will happen in your pregnancy").
- Numbers, thresholds, doses, durations, temperatures, gestational weeks, and units (for example 200 mg of caffeine, 60–68°F, 28 weeks, about 20 minutes).
- Recommendations and their conditions ("if napping is necessary", "as prescribed").
- Safety warnings, emergency guidance, and contraindications.
- PAP rules: never change prescribed pressure without the prescribing clinician; mask, humidification, cleaning, and troubleshooting steps keep their order and conditions.
- Definitions of medical terms. Do not swap a precise term for a simpler but wrong one (OSA is not "snoring"; PAP delivers pressurized air, not oxygen).
- Source associations (`sourceIds`, `sourceScreenshotIds`, citations, the NHLBI link).
- Learning objectives of the module.

If a stylistic change would move any anchor, keep the accurate wording and flag it for clinical review in the handoff (and in `src/content/clinical-review-register.ts` when the request covers review tracking).

## 5. Quiz and feedback rules

- Never change `correctChoiceId`, `correctChoiceIds`, choice IDs, or choice order as a side effect of rewording. Answer-key changes need explicit authorization and a source.
- A distractor must stay wrong for the same reason after editing, and a correct choice must stay unambiguously correct.
- Each per-choice explanation names the reason in one sentence and matches the key: correct choices say why they are right, incorrect choices say why they are wrong without lecturing.
- When an explanation comes from the CIAS program (its feedback slides), keep its wording and level as closely as clarity allows. When you write a missing explanation, match that voice: short, friendly, concrete, the same reading level.
- Check-your-understanding questions are graded; personal reflections are never graded or labelled right or wrong.

## 6. Self-check before finishing

- Would a learner with no medical background understand each sentence on first read?
- Is every medical term defined at first use in the module?
- Is there one clear action when an action is expected?
- Did any anchor in section 4 change? If yes, is the change authorized?
- Does every explanation still agree with the answer key?
- Does the text sound like a person explaining, not a brochure, textbook, or chatbot?

## 7. Translations

English is the source. Spanish, Brazilian Portuguese, and Haitian Creole are drafts awaiting native review; do not mark any of them reviewed or approved.

- **Adding or changing English text means updating all four languages in the same change.** This applies even when the request only mentions English: a new English sentence with no Spanish, Portuguese, and Creole version breaks the build, because the app never falls back to English. Where each language lives:
  - Spanish lessons: `src/content/es/modules/*.ts` and `src/content/es/cias-translations.ts`
  - Portuguese and Creole lessons: the `<screenId>::<field>` keys in `src/content/translations/pt-BR.ts` and `ht.ts` (a new paragraph needs a new `::paragraphs[N]` key in both)
  - Interface strings: `src/i18n/strings.ts` (en, es) and the `ui` blocks of `pt-BR.ts` and `ht.ts`
  - Per-choice explanations: `src/content/question-feedback/{en,es,pt-BR,ht}.ts`
- Translate meaning, terminology, numbers, and qualifiers faithfully. Keep the clinical terms in `docs/translation/GLOSSARY.md`.
- Apply each language's own norms instead of English rules: Spanish uses "usted" in this app and opening ¿ and ¡; Brazilian Portuguese uses "você"; Haitian Creole follows standard Kreyòl orthography. Do not carry English punctuation or contrast rules over mechanically.
- A wording-only English edit that does not change meaning (a typo or grammar fix) may leave translations as they are. The gate blocks that by default; rerun it with `--allow-unchanged-translations` and name every such unit in the handoff. Never use the flag for new sentences or changed facts, and never claim a translation "already had" new content without opening the file and quoting it.
- Before finishing, reread every Spanish sentence you wrote and check it addresses the reader as "usted" ("puede", "su", "le"), never "tú" ("puedes", "tu", "te", "date").

## 8. What this skill does not do

It does not hide or remove provenance signals, does not try to make text undetectable, and does not justify changing clinical content to make prose sound smoother.
