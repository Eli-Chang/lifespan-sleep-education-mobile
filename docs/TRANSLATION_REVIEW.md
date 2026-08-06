# Spanish translation review

All seven Spanish modules are development drafts with `translationStatus: "machine-drafted"` and `clinicalReviewStatus: "not-reviewed"`. They have not been professionally translated, clinically reviewed, or approved.

Review priorities:

- Confirm US patient-facing terminology and reading level throughout.
- Confirm “apnea obstructiva del sueño (AOS)” while retaining PAP and CPAP after the first translated definition.
- Review pregnancy and fetal/neonatal terminology in Modules 3–6.
- Review relationship, partner-neutral, intimacy, libido, and sexual-health language in Modules 2 and 7.
- Review all medication names, device settings, GERD, anxiety, and PAP terminology in Module 6.
- Review whether “profesional de salud,” “equipo médico,” and “médico” should be standardized by context.
- Review “presión positiva en las vías respiratorias” versus local clinical phrasing.
- Review source ambiguities documented in `CONTENT_REVIEW.md`; Spanish must not resolve unclear English.

English and Spanish module/screen IDs match exactly. Language switching retains the current route, answers, and progress. English is the explicit fallback locale.
# Groq upgrade status

All existing Spanish lessons are preserved with matching English lesson IDs. They remain machine-drafted/unreviewed and require professional bilingual review plus clinical review where marked. AI output in Spanish is development-only until the approved Worker context, rubrics, safety copy, consent text, Voice Lab copy, and generated responses are reviewed. No automatic comprehensive rewrite was performed.

Additional strings requiring review include: AI disclosure and tool labels, correct/incorrect/missed-choice labels, narration failure guidance, fixed urgent-language copy, action-plan labels, and the Voice Lab preview sentence.
# Version 3 status

All 82 English screen IDs have a matching Spanish draft. The Spanish strings are machine-assisted and carry `translationStatus: machine_drafted` and `bilingualReviewStatus: not_reviewed`. They are not approved for production.

Review must cover terminology, pregnancy-safe wording, inclusive partner/intimacy language, question answer parity, feedback parity, narration, truncation, and screen-reader pronunciation.

