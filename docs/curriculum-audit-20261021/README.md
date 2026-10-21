# Ten-module milestone and post-intimacy CIAS audit (2026-10-21)

This folder records the source comparison of the PAP modules, the split of Healthy Sleep Hygiene into two modules, the progress migration, narration fixes, and what still needs human review. It is a development record. Nothing here is a clinical, translation, or medical-device approval.

## 1. Sources

| Source | Status | Used for |
| --- | --- | --- |
| `docs/CIAS App_ EZ-PAP .pdf` (30 pages, kept local; `docs/*.pdf` is git-ignored) | Authoritative available CIAS document | m8 and m9 (Sections II and III), m7 read-only (Section VI) |
| `docs/CIAS App_ EZ-PAP extracted.txt` | Word-for-word complete against a fresh pypdf extraction of the PDF (8,860 words each; only differences are line wrapping) | Searching |
| `docs/CIAS-SCREENSHOT-SOURCE-ARCHIVE.json` (77 CIAS-app screenshots) | Covers CIAS app modules 1 to 7 only | m5 split and m7 read-only check; it has no PAP screens |
| Google Doc "Educational Modules Enhancing CPAP Adherence in Pregnant Women With Sleep Apnea" (`1G__z0lg…`) | **Not accessible**: "You need access" for Eli's personal Google account in the browser, and the Growth Vanguard Drive connectors return 403/not found. Access was not requested because that would message the owner. | Not compared. If it differs from the PDF, the comparison below must be repeated. |

The CIAS PDF section map: Section I (what OSA is and CPAP, pp. 2–18), Section II Getting Started with CPAP (pp. 19–21), Section III Troubleshooting CPAP (pp. 21–24), Section V Healthy Sleep (pp. 25–27), Section VI Intimacy (pp. 28–30).

## 2. Which modules were audited

The request named "Modules 7, 8, and 9" as the post-intimacy material. In the actual app before this milestone, Module 7 is **Intimacy** (`m7`, already reviewed by Eli), and the post-intimacy modules are `m8` **Getting Started with PAP** and `m9` **Troubleshooting PAP**. So:

- `m8` and `m9` were audited claim by claim, and unambiguous implementation errors were corrected.
- `m7` was audited **read-only** (report only, no changes), because it is reviewed material.

After the split, these become Modules 8 (Intimacy), 9 (Getting Started with PAP), and 10 (Troubleshooting PAP).

Detailed records: [`audit-m8.md`](audit-m8.md) / [`audit-m8.json`](audit-m8.json), [`audit-m9.md`](audit-m9.md) / [`audit-m9.json`](audit-m9.json), [`audit-m7-readonly.md`](audit-m7-readonly.md). They were produced by independent read-only auditor agents. Every CIAS quote in them (84 in m8, 135 quote segments in m9) was re-checked by script to be an exact substring of the stated page.

## 3. Results

| Module | Claims | Match / paraphrase | From another CIAS section | Not in CIAS (app or ATS-authored) | Contradictions | Unresolved |
| --- | --- | --- | --- | --- | --- | --- |
| m8 Getting Started with PAP | 100 | 62 | 14 | 21 | 3 | 0 |
| m9 Troubleshooting PAP | 143 | 84 | 5 | 49 | 1 | 2 |

The "not in CIAS" material in m8 and m9 is tagged with the ATS supplement IDs (`ats-pap-overview`, `ats-pap-troubleshooting`, `ats-pap-care-cleaning`), which `docs/CLINICAL_SOURCE_REGISTRY.md` already lists as **not clinically approved**. All three m9 answer keys and both m8 answer keys are supported by CIAS or the module text.

### Corrections made (unambiguous implementation errors only)

| Screen | Language | Change | Why |
| --- | --- | --- | --- |
| m8-q1, m8-q2, m9-q1, m9-q2, m9-q3 (and the same pattern in m1-q2, m3-q5, m4-q3, m5-q3, m5-q5, m5-q9, m5-q11) | ES | Narration no longer reads the answer explanation before the learner answers | Shared Spanish builder (`src/content/es/localize.ts`) appended the explanation to question narration, giving the answer away. English never did. Visible text is unchanged. |
| m1-r1, m7-r1 | ES | Reflection narration reads the title and prompt only, as in English | Narration read text that is not on screen. Visible text unchanged. |
| m9-11 | EN, ES | Removed the internal label "as recommended by the CIAS source" / "según la fuente CIAS" from the learner-facing cleaning sentence | Provenance label leaked into lesson text; no medical content changed. |
| m8-03 | ES | "sentado" → "sentado derecho" | Spanish dropped "upright" (EN and CIAS p19: "sitting upright"). |
| m8-05 | ES | "función de aumento gradual, o rampa," → "función de aumento gradual (rampa o rampa automática)" | Spanish dropped "autoramp", which the English paragraph and the Spanish key point on the same screen include. |
| m9-09 image | EN, ES | Alt text corrected from "Person sleeping…" to describe the actual image (a pregnant person sitting on a couch, hand over mouth, looking uncomfortable) | Image check: the picture shows an awake, seated person. |

No medical claim, statistic, answer key, or pregnancy-specific recommendation was added or changed.

### Needs clinician or research-team review (not changed)

**m8 Getting Started with PAP**
1. **m8-02 contradiction:** the app says to fit the mask "with the machine running"; CIAS step 1 (p19) says not to plug in the machine yet and to focus only on comfort.
2. **m8-08 who adjusts humidification:** the app calls heated humidification a "care-team and device decision"; CIAS (pp. 21, 23) lets patients adjust it, and m9 tells learners to lower it. m8 and m9 should agree.
3. **m8-09 when to use PAP:** CIAS (p20) allows skipping PAP for power naps under 30 minutes and says partial use still helps; the app leaves both out and adds "ask your healthcare team how to handle that situation safely".
4. **m8-03 / m8-04 acclimation timing:** CIAS gives 3–5 days per step, 1 hour a day awake, and 1-hour scheduled naps; the app uses "several days", "short" rests, and gradual increases.
5. **CIAS source gap:** the CIAS acclimation steps are numbered 1, 2, 4, 5, 6 (no step 3) in the PDF itself. The m8-q1 key still holds, but the CIAS authors should confirm nothing was lost.

**m9 Troubleshooting PAP**
1. **All screens:** the ATS supplement sources are unapproved, and every app-added instruction depends on them. CIAS itself lists the ATS PAP troubleshooting PDF as a resource to link (p27).
2. **m9-05 contradiction:** CIAS (p22) suggests petroleum creams (Vaseline, Aquaphor) for friction and a hypoallergenic silicone mask; the app omits both and warns against unapproved products.
3. **m9-08 pregnancy-specific:** CIAS (p23) says saline spray (first option) and nasal steroids are safe in pregnancy; the app omits this and adds "especially during pregnancy" as a caution.
4. **m9-11 cleaning schedule:** CIAS (p24) gives a schedule (mask and humidifier daily, tubing weekly, humidifier vinegar rinse weekly, everything sanitized at least monthly, distilled or boiled water); the app keeps only weekly tubing. The ATS-derived bans (bleach, alcohol, harsh cleaners, wipes, immersion) are not in CIAS.
5. **m9-04:** CIAS attributes whistling to too much humidification; the app attributes it to leaks and connections. CIAS's "put the machine on the floor" tip conflicts with its own advice to lift it away from dust.
6. **m9-07:** CIAS offers mouth tape with a "check with your doctor" caveat; the app omits it.
7. **m9-09:** expiratory comfort, auto-PAP, and bilevel PAP are app-added; CIAS's "keep the head of the bed up" became general wording.
8. **m9-02, m9-03, m9-06, m9-10:** fitting, leak, heated-tubing, and tubing-routing techniques are app-added (ATS).
9. **Travel and flying (CIAS p24):** not in m9. A repository test (`tests/cias-module-source-boundaries.test.ts`) asserts their absence, so this looks like an earlier deliberate decision; it is recorded here, not reversed.
10. **40 other omissions:** listed in `audit-m9.md` (rental/insurance, allergy specifics, pets and vacuuming, and more).

**Images (m9):** all ten are recorded as "User-provided image", with unknown license. m9-02 and m9-04 look like commercial images; m9-04 has English text baked in, so it also appears on the Spanish screen. **m9-05 is a close-up photo of a real person's lower face with skin redness and no recorded source.** It contains no embedded metadata (see the security review), but its origin should be confirmed. If it is a patient photo, written authorization is required before any use.

**m7 Intimacy (reviewed, report only):** no contradictions. The 7 CIAS-app screens match the screenshot transcription exactly. Notes for a clinician: m7-04 and m7-q2 are ungraded reflections that still say "There are 3 correct answers"; the 90%/75% bed-partner statistic has no reference in either source; m7 says to use PAP "every time you sleep" while CIAS allows skipping short naps; Spanish uses the informal "hayas" in the recap and masculine "dormido".

## 4. Healthy Sleep Hygiene split

The 31-screen module was divided at the start of the sleep-environment sequence, the point where the flow moves from routine and timing to the bedroom and daily habits. No screen was added, removed, reworded, or reordered.

| Module | ID | Title (EN / ES) | Screens |
| --- | --- | --- | --- |
| 5 | `m5` | Healthy Sleep Hygiene, Part 1: Routine and Light / Higiene saludable del sueño, parte 1: rutina y luz | 14: m5-01, m5-02, m5-03, m5-q5, m5-q6, m5-04, m5-13, m5-05, m5-q7, m5-11, m5-q1, m5-14, m5-q9, m5-q4 |
| 6 | `m5b` | Healthy Sleep Hygiene, Part 2: Environment and Daily Habits / Higiene saludable del sueño, parte 2: ambiente y hábitos diarios | 17: m5-06, m5-15, m5-16, m5-17, m5-07, m5-q3, m5-q2, m5-08, m5-18, m5-q11, m5-q8, m5-21, m5-10, m5-19, m5-20, m5-q10, m5-recap |

- Every screen ID is unchanged, so saved answers stay on the same questions. The second module uses the new ID `m5b` because `m10` was used by an older curriculum and is still removed by the legacy migration.
- Module IDs `m6`–`m9` are unchanged; only their display order moved to 7–10.
- **New copy to review:** the two module titles, short titles, and descriptions (EN and ES) are new structural text. They restate topics already in the module and add no claims. The Spanish needs bilingual review.
- **Known cosmetic items kept on purpose (reviewed copy not edited):** the first Part 1 screen says "In this module…" about topics that continue in Part 2; the comprehension checks keep their original numbers, so Part 2 checks are numbered 7–12 (one number, 11, is absent in the original); the existing recap at the end of Part 2 summarizes both parts. Part 1 ends on its last knowledge check, like the PAP modules, without a recap.

## 5. Saved-progress migration (curriculum version 11 → 12)

`src/state/curriculum-migration.ts`:

- Lesson progress, answers, attempts, and reflections are keyed by screen ID, which did not change, so they carry over unchanged.
- An old completed `m5` (all 31 screens) becomes both `m5` and `m5b` complete.
- Otherwise a part is marked complete only when every one of its screens is already completed; a gap never produces a false completion.
- A saved position on a Part 2 screen moves to `m5b`, and the current module follows it.
- Version 11 PAP progress is kept. The older rule that discards replaced PAP modules now applies only to states older than version 11; a plain version bump would have wiped current m8 and m9 progress.
- The migration is idempotent and runs once.

Tests: `tests/content-and-progress.test.ts` (7 new cases) and `tests/e2e/ten-module-curriculum.spec.ts` (seeded version-11 state in a real browser).

## 6. Earlier-module preservation evidence

A full snapshot of every screen (all fields plus image registry lines) was taken before any edit and compared afterwards (226 screen records: 113 × 2 languages).

- Reviewed modules (m1–m7, including all 31 sleep hygiene screens): **all 87 English screens identical**; **78 of 87 Spanish screens identical**; the other 9 Spanish screens changed `narrationText` only (the narration fixes above). No visible text, question, answer key, feedback, image, alt text, or attribution changed.
- 17 screens moved from `m5` to `m5b` with identical content in both languages.
- Module metadata changes: `m5` title, short title, and description (EN and ES); new `m5b`; `order` of m6–m9.

## 7. Narration

Changes in `src/services/narration.ts` and the lesson screen:

- A stale request can no longer start speaking after Stop or after leaving the screen (generation counter, voice chosen inside `play()`).
- The first Listen no longer flips the control back to "Listen" while speech continues (saving the voice no longer resets the playback state).
- When a browser or device lists no voices, voice lookup times out after 3 seconds instead of waiting forever, so the control shows that no voice is available instead of silently hanging.
- When narration is on but no voice exists for the lesson language, the Listen control's accessible name says so.

Verification is summarized in the milestone handoff. In short: browser behavior was tested with a recording stand-in for the speech engine; real-engine playback was verified for **English** on this Windows PC (Microsoft David, start and end events, a 1,219-character passage spoken in two ordered parts, interruption on leaving). **Spanish audible playback was not verified**, because this PC has no Spanish voice; the "no Spanish voice" fallback was verified on the real setup. Native iOS/Android narration was not tested.

## 8. Before anyone uses this with real patients

- Clinical review of every item in section 3, the ATS supplement sources, and the m8/m9 answer keys.
- Professional review of all Spanish (the m8/m9 Spanish uses "tú" while earlier modules use "usted"; several masculine forms address a pregnant audience).
- Image licensing for all user-provided images, and the origin of the m9-05 face photo.
- Native device testing (narration, screen readers, safe areas).
- Research oversight decisions for any data collection (none is implemented).
