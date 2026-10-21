# m9 Troubleshooting PAP: CIAS fidelity audit

Audited 2026-10-21. Sources: `cias-normalized.txt` (CIAS EZ-PAP; Section III = pp21-24), spot-checked against a fresh `pdftotext` of PDF pp21-24 (text identical); `m9-en.json`, `m9-es.json`; `src/content/image-registry.ts`; `src/content/es/localize.ts`. Read-only: no repository file was changed.

**Claim status counts:** PARAPHRASE_OK 61, NOT_IN_CIAS 49, MATCH 23, ORGANIZATIONAL 5, UNRESOLVED 2, OMISSION 2, CONTRADICTION 1 (total 143).

**Claim action counts:** NO_ACTION 115, CLINICAL_REVIEW 27, FIX_UNAMBIGUOUS 1. Module-level lists: 9 fixes, 13 clinical-review items, 40 omissions.

**Narration:** EN matches the visible text on all 14 screens. ES matches on the 11 content screens but not on m9-q1, m9-q2 and m9-q3, where the explanation is read aloud before the learner answers.

**Spanish parity:** structure, screen order, choice IDs and answer keys are the same on every screen; no English was left untranslated in the text. ISSUE on m9-02, m9-04, m9-11, m9-q1, m9-q2, m9-q3.

## Claims

| Screen | CIAS locator | Concept | Status | Action | Note |
|---|---|---|---|---|---|
| m9-01 | p21 | Section title | PARAPHRASE_OK | NO_ACTION | CPAP renamed PAP (app-wide convention). |
| m9-01 | p21 | Purpose of section | PARAPHRASE_OK | NO_ACTION |  |
| m9-01 | p20; p22 | Refer persistent concerns | PARAPHRASE_OK | NO_ACTION | CIAS refers to prescribing provider; equipment company named on p20. |
| m9-01 | ABSENT as stated; related context p20 | One-category-at-a-time method | NOT_IN_CIAS | NO_ACTION | Method is app-authored. Categories loosely mirror Section III topics; device data mentioned only on p20. "Tubing and connections" is not a CIAS topic. |
| m9-01 | ABSENT from CIAS (searched pp1-30) | Change one thing at a time | NOT_IN_CIAS | NO_ACTION | App-authored process guidance. |
| m9-01 | ABSENT as stated; related context p10 | App disclaimer | NOT_IN_CIAS | NO_ACTION | App disclaimer; consistent with CIAS p10 (only a physician sets pressure). |
| m9-01 | p22 | Ask prescriber for help | PARAPHRASE_OK | NO_ACTION |  |
| m9-01 | ABSENT from CIAS (searched pp1-30) | Safety net | NOT_IN_CIAS | NO_ACTION | Generic safety-net line; Section III has none. Include in clinical sign-off of safety wording. |
| m9-01 | ABSENT as stated; related context p23 | Manufacturer instructions | NOT_IN_CIAS | NO_ACTION | CIAS says check the manual only for cleaning; the app generalizes it to all mask and device use. |
| m9-01 | ABSENT as stated; related context p20 | Troubleshooting log | NOT_IN_CIAS | NO_ACTION | CIAS diary (p20) is for symptoms before starting therapy, not a troubleshooting log. |
| m9-02 | p21 | Mask uncomfortable/tight | PARAPHRASE_OK | NO_ACTION |  |
| m9-02 | p21 | Mask not too tight; no lasting marks | UNRESOLVED | CLINICAL_REVIEW | Threshold drift: CIAS says "too tight"; the app says "painfully tight", which suggests tight-but-not-painful is fine. Whether this matters is a clinical call. |
| m9-02 | p21 | Loosen straps, keep seal | PARAPHRASE_OK | NO_ACTION | CIAS specifically says loosening; app says "adjusting". |
| m9-02 | p21 | Very tight seal -> different mask | PARAPHRASE_OK | NO_ACTION | CIAS names the healthcare provider as the person to ask; app leaves it unspecified in this sentence. |
| m9-02 | ABSENT from CIAS (searched pp1-30) | Reseat with airflow on | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. |
| m9-02 | ABSENT as stated; related context p21 | Overtightening worsens leaks | NOT_IN_CIAS | CLINICAL_REVIEW | "Stays in place" echoes CIAS p21; the claim that overtightening worsens pressure points and leaks is not in CIAS. |
| m9-02 | ABSENT as stated; related context p20 | Equipment team fit check | NOT_IN_CIAS | NO_ACTION | Section III routes to the healthcare provider; size/cushion/headgear check is app-added. p20 supports working with the equipment company. |
| m9-02 | p21 | Mask types differ in contact | PARAPHRASE_OK | NO_ACTION | Generalizes the CIAS example that nasal pillows may reduce skin contact. |
| m9-02 | ABSENT from CIAS (searched pp1-30) | Fit with airflow on | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. |
| m9-02 | p21 | Refit if painfully tight | UNRESOLVED | CLINICAL_REVIEW | CIAS: if it must be "very tight", ask the healthcare provider about a different type of mask. App: if "painfully tight", ask for a refit. Both the threshold and the action differ slightly. |
| m9-03 | p21 | Leak / mask moves | PARAPHRASE_OK | NO_ACTION |  |
| m9-03 | p21 | Why leaks matter | PARAPHRASE_OK | NO_ACTION | The CIAS reason (air may not reach the airway to prevent obstruction; "important to address") is softened. The CIAS tip that you can hear or feel a leak is left out. |
| m9-03 | p21 | Adjust straps | PARAPHRASE_OK | NO_ACTION |  |
| m9-03 | p22 | Red/sore eyes = top leak | ORGANIZATIONAL | NO_ACTION | Wording matches CIAS. CIAS asks this as its own question on p22; the app merges it into the leak screen. |
| m9-03 | p21 | Persisting leak -> other style | PARAPHRASE_OK | NO_ACTION |  |
| m9-03 | ABSENT from CIAS (searched pp1-30) | Lift-and-reseal technique | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. |
| m9-03 | ABSENT from CIAS (searched pp1-30) | Cushion/connector check | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. |
| m9-03 | ABSENT from CIAS (searched pp1-30) | Tubing routing/holder | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. |
| m9-03 | p21 | CPAP pillow | PARAPHRASE_OK | NO_ACTION | CIAS: a CPAP pillow "helps positioning"; app narrows it to side sleepers. |
| m9-03 | p21 | Mask-fit review | PARAPHRASE_OK | NO_ACTION |  |
| m9-03 | ABSENT as stated; related context p21 | Do not block vents / overtighten | NOT_IN_CIAS | CLINICAL_REVIEW | Vent-blocking warning is not in CIAS. CIAS threshold is "extremely tight"; app says "until your skin hurts". |
| m9-03 | p21 | Escalate to PAP team | PARAPHRASE_OK | NO_ACTION |  |
| m9-04 | p21 | Water / whistling | PARAPHRASE_OK | NO_ACTION |  |
| m9-04 | p21 | Causes of condensation | MATCH | NO_ACTION |  |
| m9-04 | p21 | Tubing warming | PARAPHRASE_OK | NO_ACTION | CIAS: a "tube cozy". App: "tubing-warming controls", which implies heated-tubing features CIAS does not mention. |
| m9-04 | p21 | Turn humidity down | PARAPHRASE_OK | NO_ACTION | CIAS alternative "switching back to auto if on a fixed setting" is omitted. |
| m9-04 | ABSENT as stated; related context p21 | Warm the room | NOT_IN_CIAS | NO_ACTION | Follows logically from the CIAS temperature-difference point but is not stated. |
| m9-04 | p21 | Insulate tubing | PARAPHRASE_OK | NO_ACTION | = "tube cozy". |
| m9-04 | ABSENT from CIAS (searched pp1-30) | Heated tubing | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. |
| m9-04 | ABSENT from CIAS (searched pp1-30) | One setting at a time | NOT_IN_CIAS | NO_ACTION | App-authored process guidance. |
| m9-04 | ABSENT as stated; related context p21 | Cause of whistling | NOT_IN_CIAS | CLINICAL_REVIEW | CIAS says whistling can come from condensation caused by too much humidification. The app gives leak, connection, vent or cushion causes and does not mention the CIAS one. Not a direct contradiction, but the CIAS cause is lost. |
| m9-04 | ABSENT from CIAS (searched pp1-30) | Do not cover vents | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. |
| m9-04 | p21 | Rainout & temperature | PARAPHRASE_OK | NO_ACTION | The term "rainout" is app-added. |
| m9-04 | ABSENT from CIAS (searched pp1-30) | Device-compatible options | NOT_IN_CIAS | NO_ACTION | App-authored. |
| m9-05 | p22 | Skin irritation | PARAPHRASE_OK | NO_ACTION | "Allergic reaction" is dropped from the title but covered in P1. |
| m9-05 | p22 | Causes of irritation | PARAPHRASE_OK | NO_ACTION | Material angle implied by CIAS hypoallergenic-silicone point. |
| m9-05 | p22 | Reaction -> different mask | PARAPHRASE_OK | NO_ACTION |  |
| m9-05 | p21 | Not too tight | ORGANIZATIONAL | NO_ACTION | CIAS states this in the mask-comfort question (p21), not the skin question. Same "painfully" threshold drift as m9-02. |
| m9-05 | ABSENT from CIAS (searched pp1-30) | Face/mask cleaning for seal | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. |
| m9-05 | ABSENT as stated; related context p22 | Liner / other cushion | NOT_IN_CIAS | CLINICAL_REVIEW | A different style is supported. The mask liner and "approved cushion" are not in CIAS. The CIAS fix for friction (petroleum creams) is not offered. |
| m9-05 | ABSENT from CIAS (searched pp1-30) | Skin safety net | NOT_IN_CIAS | CLINICAL_REVIEW | Safety-net thresholds are app-authored. |
| m9-05 | ABSENT from CIAS (searched pp1-30) | Do not push through | NOT_IN_CIAS | NO_ACTION | App-authored. |
| m9-05 | p22 | No unapproved products | CONTRADICTION | CLINICAL_REVIEW | Implied conflict: CIAS suggests petroleum creams (Vaseline, Aquaphor) on the face to reduce friction. The app leaves that out and instead warns against unapproved products without checking first. Not a literal contradiction, but the default advice points the opposite way. Clinical reviewer to decide; not settled here. |
| m9-q1 | p22 | Scenario: red eyes + top leak | MATCH | NO_ACTION | Scenario mirrors the CIAS red/sore-eyes question. Minor: the stem asks for an "interpretation and response" but the choices only give responses. |
| m9-q1 | p10 | Distractor: self-lower pressure | MATCH | NO_ACTION | Distractor. CIAS supports it being wrong (only a physician sets pressure). |
| m9-q1 | p21; p22 | Keyed: check fit, seek support | MATCH | NO_ACTION | Keyed correct; supported. |
| m9-q1 | p20 | Distractor: stop PAP | MATCH | NO_ACTION | Distractor. CIAS supports it being wrong. |
| m9-q1 | p22 | Distractor: more humidity | MATCH | NO_ACTION | Distractor. CIAS ties red eyes to a leak, not to humidity. |
| m9-q1 | p21; p22 | Answer key | MATCH | NO_ACTION | Supported by CIAS p22/p21 and by m9-03. Not debatable. |
| m9-q1 | p22 | Explanation | PARAPHRASE_OK | NO_ACTION |  |
| m9-q1 | N/A | Generic feedback | NOT_IN_CIAS | NO_ACTION | Generic UI feedback. |
| m9-06 | p22 | Dryness | PARAPHRASE_OK | NO_ACTION |  |
| m9-06 | p22 | PAP dries air | PARAPHRASE_OK | NO_ACTION |  |
| m9-06 | p22 | Saline + humidification, balance | PARAPHRASE_OK | NO_ACTION | CIAS humidifier types (pass-over/heated), saline "before sleep" timing, and the extra room-humidifier tip are not carried over. |
| m9-06 | ABSENT from CIAS (searched pp1-30) | Refer persistent dryness | NOT_IN_CIAS | NO_ACTION | Generic referral; the CIAS dryness answer has none. |
| m9-06 | ABSENT from CIAS (searched pp1-30) | Leak-first check | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. Leak-first ordering not in CIAS. |
| m9-06 | p22 | Adjust humidification / heated tubing | PARAPHRASE_OK | NO_ACTION | Balance point supported. Heated tubing is app-added. CIAS treats humidification as something you can adjust yourself; the app says to ask first. |
| m9-06 | p22 | Saline; dry-mouth sprays | PARAPHRASE_OK | NO_ACTION | CIAS brand names (Kote, Biotene) made generic. "Gel" is app-added. |
| m9-06 | p22 | Chin strap check-first | PARAPHRASE_OK | NO_ACTION | CIAS lists the chin strap under the mouth-open question without a check-first step (check-first applies only to mouth tape). The app adds caution. |
| m9-06 | ABSENT from CIAS (searched pp1-30) | Dryness as leak clue | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. |
| m9-06 | ABSENT as stated; related context p22 | Gradual change + record | NOT_IN_CIAS | NO_ACTION | Balance idea supported; the gradual-change and record-keeping method is app-added. |
| m9-07 | p22 | Mouth open | PARAPHRASE_OK | NO_ACTION |  |
| m9-07 | p22 | Mouth opening -> dry mouth | PARAPHRASE_OK | NO_ACTION |  |
| m9-07 | p22 | Full-face mask; prescriber | PARAPHRASE_OK | NO_ACTION | CIAS reason "to ensure CPAP pressure is optimal" is omitted. |
| m9-07 | ABSENT from CIAS (searched pp1-30) | Mechanism | NOT_IN_CIAS | NO_ACTION | Mechanism is app-added; consistent with CIAS. |
| m9-07 | ABSENT as stated; related context p22 | Congestion link | NOT_IN_CIAS | NO_ACTION | CIAS links nasal health only to mouth-tape safety. |
| m9-07 | p22 | Chin strap / full-face | PARAPHRASE_OK | NO_ACTION | Mouth tape (Somnofix) and the CIAS "check with your doctor" caveat are omitted (see omissions). |
| m9-07 | ABSENT from CIAS (searched pp1-30) | Mask choice factors | NOT_IN_CIAS | NO_ACTION | App-authored. |
| m9-07 | ABSENT from CIAS (searched pp1-30) | Review interface | NOT_IN_CIAS | NO_ACTION | App-authored; consistent with CIAS. |
| m9-07 | p22 | PAP team fits interface | PARAPHRASE_OK | NO_ACTION |  |
| m9-08 | p23 | Congestion/allergy + nose irritation | ORGANIZATIONAL | NO_ACTION | Merges two CIAS p23 questions. |
| m9-08 | p23 | Filters | PARAPHRASE_OK | NO_ACTION | CIAS: "change ... often"; app: "keep clean" (P3 adds replace/clean per manual). |
| m9-08 | p23 | Humidifier with/without heat | PARAPHRASE_OK | NO_ACTION | The CIAS idea of trying it with and without heat is generalized. |
| m9-08 | p23 | Distilled water | PARAPHRASE_OK | NO_ACTION | "Change it daily" is not stated here; it is covered by the m9-11 empty-each-morning routine (ORGANIZATIONAL). |
| m9-08 | p23 | Allergen hygiene | PARAPHRASE_OK | NO_ACTION | Pets and vacuuming specifics omitted. |
| m9-08 | p23 | Medications via provider | PARAPHRASE_OK | NO_ACTION |  |
| m9-08 | p23 | Heated humidifier | PARAPHRASE_OK | NO_ACTION | Heated tubing is app-added. |
| m9-08 | p23 | Saline for irritation | PARAPHRASE_OK | NO_ACTION | "Gel" app-added; "before sleep" timing omitted. |
| m9-08 | p23 | Nasal spray in pregnancy | PARAPHRASE_OK | CLINICAL_REVIEW | Pregnancy-specific. Matches the CIAS "speak to your healthcare provider prior to starting". But CIAS also says saline spray and nasal steroids are safe in pregnancy, that saline is the first option, and that both are preferred to oral medicines. The app leaves all of that out, and "especially during pregnancy" presents pregnancy as a reason for extra caution. |
| m9-08 | p23 | Reduce irritants | PARAPHRASE_OK | NO_ACTION | Smoke and fragrances are app-added; pets omitted. |
| m9-08 | p23 | Filter schedule | PARAPHRASE_OK | NO_ACTION | CIAS "often" replaced by the manual schedule. |
| m9-08 | ABSENT from CIAS (searched pp1-30) | Interface while congested | NOT_IN_CIAS | NO_ACTION | App-authored. |
| m9-08 | p23 | Meds belong to provider | PARAPHRASE_OK | NO_ACTION |  |
| m9-08 | ABSENT from CIAS (searched pp1-30) | Congestion safety net | NOT_IN_CIAS | CLINICAL_REVIEW | Safety-net thresholds (nosebleeds, worsening breathing) are app-authored. |
| m9-09 | p23 | Burping/bloating | MATCH | NO_ACTION |  |
| m9-09 | p23 | Swallowing air | PARAPHRASE_OK | NO_ACTION | The esophagus-vs-windpipe explanation is omitted. |
| m9-09 | p23 | Ramp feature | MATCH | NO_ACTION |  |
| m9-09 | p10; p23 | Provider adjusts pressure | PARAPHRASE_OK | NO_ACTION |  |
| m9-09 | p23 | Head of bed up | PARAPHRASE_OK | NO_ACTION | The specific CIAS advice "keep the head of the bed up if you can" is made more general (see omissions). |
| m9-09 | p23 | Ramp use | PARAPHRASE_OK | NO_ACTION |  |
| m9-09 | ABSENT from CIAS (searched pp1-30) | Bloating safety net | NOT_IN_CIAS | CLINICAL_REVIEW | Safety-net threshold is app-authored. |
| m9-09 | ABSENT as stated; related context p10 | Expiratory relief / APAP / BPAP | NOT_IN_CIAS | CLINICAL_REVIEW | CIAS p10 lists Auto-CPAP and BIPAP as machines the prescriber chooses but does not link them to bloating. The expiratory comfort feature is not in CIAS. |
| m9-09 | p10 | Do not self-adjust pressure | PARAPHRASE_OK | NO_ACTION |  |
| m9-09 | p23 | Contact care team | PARAPHRASE_OK | NO_ACTION | Thresholds are app-added. |
| m9-10 | p23 | Cold air | PARAPHRASE_OK | NO_ACTION |  |
| m9-10 | p23 | Room temp / heated humidification | MATCH | NO_ACTION | The CIAS lead-in "The air coming from the CPAP can be cold." is implied by the title. |
| m9-10 | ABSENT from CIAS (searched pp1-30) | Heated tube | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. |
| m9-10 | p21 | Insulating tube cover | ORGANIZATIONAL | NO_ACTION | CIAS offers the "tube cozy" for condensation (p21), not for cold air. |
| m9-10 | ABSENT from CIAS (searched pp1-30) | Tubing under blanket | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. |
| m9-10 | ABSENT from CIAS (searched pp1-30) | Cold + leak -> fit check | NOT_IN_CIAS | NO_ACTION | App-authored. |
| m9-10 | ABSENT from CIAS (searched pp1-30) | Device-compatible options | NOT_IN_CIAS | NO_ACTION | App-authored. |
| m9-10 | ABSENT from CIAS (searched pp1-30) | Fit check | NOT_IN_CIAS | NO_ACTION | App-authored. |
| m9-q2 | p23 | Scenario: bloating, self-lower pressure | MATCH | NO_ACTION |  |
| m9-q2 | p10; p23 | Distractor: self-adjust | MATCH | NO_ACTION | Distractor. CIAS supports it being wrong. |
| m9-q2 | p20 | Distractor: stop PAP | MATCH | NO_ACTION | Distractor. CIAS supports it being wrong. |
| m9-q2 | p23 | Keyed: ramp + care team | MATCH | NO_ACTION | Keyed correct; supported. |
| m9-q2 | p21 | Distractor: overtighten | MATCH | NO_ACTION | Distractor. CIAS says the mask should not be too tight. |
| m9-q2 | p23 | Answer key | MATCH | NO_ACTION | Supported by CIAS p23 and by m9-09. Not debatable. |
| m9-q2 | p23 | Explanation | PARAPHRASE_OK | NO_ACTION |  |
| m9-q2 | N/A | Generic feedback | NOT_IN_CIAS | NO_ACTION | Generic UI feedback. |
| m9-11 | p23; p24 | Cleaning (how often + how) | ORGANIZATIONAL | NO_ACTION | Merges two CIAS questions: how often to clean (p23-24) and how to clean (p24). |
| m9-11 | p23; p24 | Manual first | MATCH | NO_ACTION |  |
| m9-11 | p24 | Mask/humidifier: soap, rinse, air dry | OMISSION | CLINICAL_REVIEW | The method matches CIAS, but the CIAS frequency for mask and humidifier components ("daily") is dropped. |
| m9-11 | p24 | Weekly tubing | MATCH | NO_ACTION |  |
| m9-11 | p24 | Monthly sanitizing | OMISSION | CLINICAL_REVIEW | CIAS says to sanitize all components at least once a month. "Periodic" loses that minimum. The CIAS sanitizing method (vinegar soak) is also omitted. |
| m9-11 | N/A (authoring artifact) | Internal source label | NOT_IN_CIAS | FIX_UNAMBIGUOUS | An internal source label shows up in learner-facing text and narration. It is the only place "CIAS source" appears in the app content (same in Spanish). See fixes. |
| m9-11 | p24 | Distilled water | PARAPHRASE_OK | NO_ACTION | CIAS says "always". The boiled-and-cooled water alternative and the mineral-deposit fallback are omitted. |
| m9-11 | p23; p24 | Daily water change | PARAPHRASE_OK | NO_ACTION | Matches "change it daily". The CIAS daily step to wash the chamber with soap and air-dry it is not stated. |
| m9-11 | p24 | Mask cushion cleaning | PARAPHRASE_OK | NO_ACTION | Leaves the frequency to the manual; CIAS says daily. |
| m9-11 | p24 | Wash, rinse, air dry | PARAPHRASE_OK | NO_ACTION | Soap, rinse, air-dry and sunlight points match. "Warm water", "headgear" and "direct heat" are app-added. Drying tubing "over a shower rod" is omitted. Schedule left to the device. |
| m9-11 | ABSENT as stated; related context p23 | Exterior wipe; filters | NOT_IN_CIAS | NO_ACTION | The exterior wipe is app-added. The filter point comes from p23 (ORGANIZATIONAL). |
| m9-11 | ABSENT from CIAS (searched pp1-30) | Prohibited cleaning methods | NOT_IN_CIAS | CLINICAL_REVIEW | App-authored or from ATS supplement (pending clinical approval); grouped in clinicalReview for this screen. The only sanitizer CIAS names is a white vinegar and water solution, which the app neither includes nor rules out. |
| m9-11 | p24 | Manual over generic schedule | PARAPHRASE_OK | NO_ACTION | Consistent with CIAS: manual first, then its "In general" steps. |
| m9-11 | p24 | Reduce buildup | PARAPHRASE_OK | NO_ACTION |  |
| m9-11 | ABSENT from CIAS (searched pp1-30) | No immersion; replace parts | NOT_IN_CIAS | NO_ACTION | App-authored. |
| m9-q3 | p24 | Scenario: manual vs online | MATCH | NO_ACTION |  |
| m9-q3 | ABSENT from CIAS (searched pp1-30) | Distractor: strongest cleaner | NOT_IN_CIAS | NO_ACTION | Distractor. Its wrongness rests on m9-11 P3 (no harsh cleaners), not on CIAS. |
| m9-q3 | p24 | Keyed: manual first | MATCH | NO_ACTION | Keyed correct; supported. |
| m9-q3 | p23 | Distractor: universal schedule | MATCH | NO_ACTION | Distractor. CIAS points to the device manual first. (CIAS does give a general schedule, but as secondary.) |
| m9-q3 | p24 | Distractor: clean only when dirty | MATCH | NO_ACTION | Distractor. CIAS sets regular daily, weekly and monthly cleaning. |
| m9-q3 | p23; p24 | Answer key | MATCH | NO_ACTION | Supported. Not debatable. |
| m9-q3 | p24 | Explanation | PARAPHRASE_OK | NO_ACTION |  |
| m9-q3 | N/A | Generic feedback | NOT_IN_CIAS | NO_ACTION | Generic UI feedback. |

## Narration and Spanish parity by screen

| Screen | EN narration | ES parity | Spanish notes |
|---|---|---|---|
| m9-01 | match | OK | Structure, keyPoints and narration match. "equipo de equipos médicos" (equipment team) is awkward wording, repeated across screens; meaning kept. |
| m9-02 | match | ISSUE | P1 s2 "Ajustar las correas puede ayudar a mantener un sello" reads as "adjusting straps can help maintain a seal"; EN means adjusting (loosening) may help while still keeping the seal. Minor drift. |
| m9-03 | match | OK | - |
| m9-04 | match | ISSUE | keyPoints[0] translates "rainout" as "condensación" ("Water in the tubing is often called condensation"), which drops the term and makes the sentence nearly circular. / Linked image m9-04-water-in-mask.jpg has English text baked in ("Water in Your Mask & how to deal with it"), which also shows on the Spanish screen. |
| m9-05 | match | OK | "esté segura" for "secure" can be read as "safe"; minor wording only. |
| m9-q1 | match | ISSUE | narrationText adds the generalExplanation at the end ("El aire cerca de la parte superior ... si persiste."), which reads the answer aloud before the learner picks one. EN narration does not do this. See fixes. / Choice IDs c1-c4 and answer key c2 match EN. |
| m9-06 | match | OK | "demasiada humedad puede causar humedad no deseada" ("too much humidity can cause unwanted humidity") is circular; EN says "unwanted moisture". Meaning kept. |
| m9-07 | match | OK | - |
| m9-08 | match | OK | P3 "Limpia o reemplaza los filtros según el manual" drops "on the schedule"; meaning mostly kept. |
| m9-09 | match | OK | "mientras te quedas dormido" (twice) uses the masculine form in a module for pregnant users. Localization note, not a change in meaning. Em dash in EN P3 is rendered as ";". |
| m9-10 | match | OK | "revise la preparación" for "review the setup" ("preparación" means preparation); minor wording. |
| m9-q2 | match | ISSUE | narrationText adds the generalExplanation at the end (answer read aloud before answering). See fixes. / c4 "Apretar más la mascarilla ..." drops "as much as possible", which makes the distractor less obviously wrong. / c3 "la presión indicada" narrows EN "prescribed settings"; the ES explanation says "configuraciones indicadas", so c3 and the explanation do not match. / c2 adds a redundant "posponer el reinicio"; meaning kept. / Choice IDs c1-c4 and answer key c3 match EN. |
| m9-11 | match | ISSUE | P1 contains the same internal label "según la fuente CIAS". See fixes. / keyPoints[1] "pregunta al equipo cuándo una pieza está dañada o debe reemplazarse" changes EN "ask the team when [if] a part is damaged" into "ask the team at what point a part is damaged or should be replaced". / "lejía" is the Spain term for bleach; Latin American Spanish usually says "cloro". Localization note. |
| m9-q3 | match | ISSUE | narrationText adds the generalExplanation at the end (answer read aloud before answering). See fixes. / Choice IDs c1-c4 and answer key c2 match EN; c3 adds "exactamente", meaning kept. |

## Images and attribution

No image, video or attribution fields in the m9 JSON. Images are attached through `src/content/image-registry.ts` (m9-02 to m9-11; none for m9-01 or the quizzes). Every one is listed as `attribution: "User-provided image"`, `licenseStatus: "unknown/user-provided"`. No video.

- **m9-02**: image-registry m9-02-mask-adjustment.jpg: alt text accurate. Looks like manufacturer product photography; attribution "User-provided image", licenseStatus "unknown/user-provided".
- **m9-03**: image-registry m9-03-mask-leak-illustration.jpg: illustration of a full-face mask with airflow at the sides; alt text accurate; license unknown/user-provided.
- **m9-04**: image-registry m9-04-water-in-mask.jpg: alt text says "Illustration" but it is a photo with English title text overlaid (looks like a third-party blog or retailer thumbnail); license unknown/user-provided; English text shows on the Spanish screen.
- **m9-05**: image-registry m9-05-skin-irritation.webp: close-up photo of a real person's facial skin (nose and mouth) with redness. Source unknown ("User-provided image", license unknown). Confirm the source. If it is a patient photo, written HIPAA authorization is required before use.
- **m9-06**: image-registry m9-06-pap-sleep.jpg: alt text accurate (person sleeping with nasal mask); license unknown/user-provided.
- **m9-07**: image-registry m9-07-mouth-open.jpg: alt text accurate; no PAP shown; license unknown/user-provided.
- **m9-08**: image-registry m9-08-congestion.jpg: shows a person in bed adjusting a nasal-pillow mask. Alt text "experiencing congestion" is not visibly shown (minor). License unknown/user-provided.
- **m9-09**: image-registry m9-09-sleep-bloating.jpg: alt text says "Person sleeping ..." but the image shows an awake pregnant person sitting on a couch with a hand over her mouth and no PAP. Alt text is wrong (see fixes). License unknown/user-provided.
- **m9-10**: image-registry m9-10-cpap-device.jpg: alt text accurate (device with heated tubing and humidifier chamber; label suggests a bilevel model); license unknown/user-provided.
- **m9-11**: image-registry m9-11-clean-mask.jpg: shows hands washing headgear in a soapy sink; alt text accurate; license unknown/user-provided.

## CIAS Section III content missing from m9 (omissions)

| CIAS page | CIAS quote | Note |
|---|---|---|
| p21 | Renting a CPAP machine might be a good option for you since you can try out different types of machines before making a purchase. | Rental option to try machines is absent from m9 (appears twice in CIAS, under mask-comfort and leak questions). |
| p21 | Health insurance plans differ on renting CPAP machines, ranging from some plans that require a rental-to-own plan while others only cover purchases. | Insurance rental-vs-purchase differences are absent. |
| p21 | Click here to learn more about different CPAP mask styles. Learn more about ensuring proper mask fit. | CIAS links to mask-style and mask-fit resources (also on p22) are not present in m9. Other CIAS links are also missing: "Learn more about troubleshooting CPAP humidity" (p21), nasal-spray technique video (p23), "Click to learn more"/"See more" (p24), TSA guidance (p24). |
| p21 | You might be able to hear or feel an air leak around the mask. | Detection cue (hear or feel a leak) is absent. The reason leaks matter (p21 "air might not be reaching your airway") is softened in m9-03. |
| p21 | Some masks cover just the nose or just the mouth and others cover both the nose and mouth. | Partial: m9-02 names nasal pillows, nasal and full-face masks; CIAS mentions mouth-only masks too. |
| p21 | Try turning down the setting or switching back to “auto” if on a fixed setting. | "Switch back to auto if on a fixed setting" is absent (m9-04 has only "lower the setting"). |
| p21 | There might be too much humidification causing water to condense (which can also cause whistling sounds). | The CIAS link between condensation and whistling is not stated; m9-04 gives leak, connection, vent and cushion causes instead. |
| p22 | Another option would be to place the CPAP machine on the floor rather than on an elevated surface. This can draw any condensation down | The tip to put the machine on the floor to reduce condensation is absent. It conflicts with CIAS p23 ("If your CPAP machine is on the floor, try to elevate it away from dust"), so it needs clinical review before being restored. |
| p22 | You can also use petroleum creams (e.g., Vaseline, Aquaphor) to help reduce friction on your face. | Petroleum creams for facial friction are absent, and m9-05 keyPoints[1] points the other way. CLINICAL_REVIEW. |
| p22 | Make sure you have a hypoallergenic mask made of silicone. | Hypoallergenic silicone mask advice is absent. |
| p22 | For example, a nasal pillow type mask might reduce skin contact and be easier to use for you. | Partial: the specific skin-contact benefit of nasal pillows (stated in both the mask-comfort and skin questions) is made more general in m9-02 and absent from m9-05. |
| p22 | You can use a nasal saline spray before sleep at night or there are several humidifier options (pass-over humidifier or heated humidifier) | Partial: humidifier types (pass-over vs heated) and saline "before sleep" timing are not carried over. |
| p22 | Often placing an additional humidifier in the room can help, as your machine will run already humidified air. | Extra room humidifier tip is absent. |
| p22 | Sometimes a chin strap or mouth tape like Somnofix can help keep your mouth closed, helping with the sensation of dry mouth. | Mouth tape (Somnofix) is absent; only the chin strap is kept. |
| p22 | We would not recommend using a mouth tape without checking with your doctor to ensure that your nasal passages are healthy. | Mouth-tape safety caveat is absent (it goes with the omitted mouth-tape option). |
| p22 | To ensure CPAP pressure is optimal, you may need to get a full-face mask. | Partial: the reason for a full-face mask ("to ensure CPAP pressure is optimal") is omitted. |
| p23 | Sometimes CPAP can worsen nasal allergies | Statement that CPAP can worsen nasal allergies is absent. |
| p23 | If your CPAP machine is on the floor, try to elevate it away from dust or where allergens might collect. | Lift the machine off the floor away from dust: absent. |
| p23 | Remove known allergens (including pets) from where you sleep ○ Vacuum to remove dust and allergens | Partial: pets and vacuuming specifics left out (m9-08 says "reduce allergens/dust"). |
| p23 | Lastly, taking a nasal spray or oral allergy medicine before sleep might help. Please speak to your healthcare provider prior to starting. | Partial: oral allergy medicine is not named; m9-08 says "discuss medications". |
| p23 | A saline spray is an over the counter spray and can help reduce congestion and is safe to use in pregnancy | Pregnancy-specific safety statement absent. CLINICAL_REVIEW. |
| p23 | Nasal steroids are also safe to use in pregnancy and some are found over the counter. | Pregnancy-specific nasal steroid statement absent. CLINICAL_REVIEW. |
| p23 | These options are preferred to oral medications and can be used as a first line. | Preference for nasal sprays over oral medications is absent. CLINICAL_REVIEW. |
| p23 | Watch this short video to learn how. | Nasal spray technique video is absent. |
| p23 | Consider using a small amount of a non-petroleum-based cream in your nostrils, regular vaseline can help. | Nostril cream advice is absent. The CIAS sentence contradicts itself (non-petroleum cream vs "regular vaseline", which is petroleum jelly), so it needs clinical resolution if restored. |
| p23 | That could be a sign you are swallowing air (going down your esophagus) instead of your trachea (windpipe). | Partial: the esophagus-vs-windpipe explanation is omitted. |
| p23 | Speak to your healthcare provider to adjust your CPAP pressure and keep the head of the bed up if you can. | Partial: "keep the head of the bed up if you can" is made general in m9-09 ("sleeping position or pillow arrangement"). |
| p24 | All of the components of your machine should be sanitized at least once a month. | Cleaning frequency: monthly sanitizing of all components is absent; m9-11 says only "periodic broader cleaning". CLINICAL_REVIEW. |
| p24 | regular cleaning of the mask and humidifier components daily, and tubing on a weekly basis is recommended to promote your health and machine longevity. | Cleaning frequency: "daily" for mask and humidifier is absent (weekly tubing is kept). m9-11 leaves the mask/cushion schedule to the manual. |
| p24 | Replace the water in the humidification chamber. Wash with soap. Allow to air dry outside of direct sunlight. | Partial: the daily water change is kept; daily soap washing and air-drying of the chamber is not stated. |
| p24 | Remove the tubing and wash with mild soap, rinse well, and allow to air dry over a shower rod. | Partial: drying the tubing over a shower rod is absent. |
| p24 | sanitize by filling the chamber with a mixture of 1 part white vinegar to 1 part water. Allow to sit for 15-20 minutes | Cleaning method: weekly humidifier sanitizing with 1:1 white vinegar and water for 15-20 minutes is absent. |
| p24 | soak each part in a solution of 1 white vinegar and 1 part water for 20 minutes. Rinse and then air dry. | Cleaning method: monthly vinegar soak of all parts for 20 minutes is absent. CIAS typo: "1 white vinegar" should read "1 part white vinegar" if restored. |
| p24 | It’s important to always use distilled water or boiled water (allow to cool first) in the PAP humidifier. | Partial: the boiled-and-cooled water alternative is absent; "always" softened to "as directed". |
| p24 | If this isn’t possible, remember to regularly remove any white buildup (mineral deposits) as this may damage the humidifier over time. | Partial: the fallback (remove white mineral buildup that can damage the humidifier) is reduced to "reduce buildup". |
| p24 | You can rent or purchase a travel CPAP machine. | TRAVEL: the CIAS question "How do I continue CPAP if I'm traveling?" is missing from m9 entirely. Elsewhere in the app, only m8 says "Use PAP whenever sleeping, including ... travel". |
| p24 | Travel CPAP machines are smaller devices that can often hold a charge without requiring power from a wall outlet. | TRAVEL: battery-capable travel machines are absent. |
| p24 | Some versions may be compatible with the electricity available in RVs as well. | TRAVEL: RV power compatibility is absent. |
| p24 | You can bring a CPAP machine and tubing with you in your carry-on luggage aboard the plane or place it in checked luggage. | FLYING: the CIAS question "Can I fly with a CPAP machine?" is missing from m9 entirely; carry-on and checked luggage guidance is absent. |
| p24 | CPAP machines must be removed for x-ray screening from your carry-on luggage. View TSA guidance here and here. | FLYING: x-ray screening requirement and TSA guidance links are absent. |

## FIX_UNAMBIGUOUS

1. **m9-11 [en] paragraphs[0]**
   - Current: `with weekly tubing cleaning and periodic broader cleaning as recommended by the CIAS source.`
   - Proposed: `with weekly tubing cleaning and periodic broader cleaning.`
   - Why: Implementation/formatting error: an internal source label ("the CIAS source") is in learner-facing text. It appears nowhere else in app content, and source tracking already lives in sourceIds. This removes the label only and changes no medical content. Whether "periodic" should state the CIAS "at least once a month" is a separate CLINICAL_REVIEW item; if the reviewer rewrites the sentence, this fix is covered by that rewrite.
2. **m9-11 [en] narrationText**
   - Current: `with weekly tubing cleaning and periodic broader cleaning as recommended by the CIAS source.`
   - Proposed: `with weekly tubing cleaning and periodic broader cleaning.`
   - Why: Keeps narration matched to the fixed paragraph.
3. **m9-11 [es] paragraphs[0]**
   - Current: `limpieza semanal del tubo y una limpieza más amplia periódica según la fuente CIAS.`
   - Proposed: `limpieza semanal del tubo y una limpieza más amplia periódica.`
   - Why: Spanish version of the same internal-label removal.
4. **m9-11 [es] narrationText**
   - Current: `limpieza semanal del tubo y una limpieza más amplia periódica según la fuente CIAS.`
   - Proposed: `limpieza semanal del tubo y una limpieza más amplia periódica.`
   - Why: Keeps narration matched to the fixed paragraph.
5. **m9-q1 [es] narrationText**
   - Current: `Una persona que usa PAP despierta con los ojos rojos y doloridos y nota que sale aire cerca del borde superior de la mas ...  la mascarilla puede indicar una fuga. Primero revisa el ajuste y busca apoyo sobre la mascarilla si persiste.`
   - Proposed: `(same string with the trailing explanation sentence(s) removed; full text in audit-m9.json)`
   - Why: Implementation error: the ES question narration adds questionFeedback.generalExplanation at the end, so the answer is read aloud before the learner chooses. EN narration (prompt + choices) does not. Cause: src/content/es/localize.ts line 93 builds narrationText from draft.body.join(' '), and draft.body includes the explanation at index choices.length+1 (the EN helper in src/content/helpers.ts line 134 uses [prompt, ...labels]). The same pattern affects m5-es (q3, q5, q9, q11), m7-es (r1) and m8-es (q1, q2), which are outside this m9 audit.
6. **m9-q2 [es] narrationText**
   - Current: `Una persona que usa PAP tiene eructos e hinchazón frecuentes. Piensa que la solución más fácil es bajar por su cuenta la ... síntomas y las configuraciones indicadas deben hablarse con el profesional de salud que indicó el tratamiento.`
   - Proposed: `(same string with the trailing explanation sentence(s) removed; full text in audit-m9.json)`
   - Why: Implementation error: the ES question narration adds questionFeedback.generalExplanation at the end, so the answer is read aloud before the learner chooses. EN narration (prompt + choices) does not. Cause: src/content/es/localize.ts line 93 builds narrationText from draft.body.join(' '), and draft.body includes the explanation at index choices.length+1 (the EN helper in src/content/helpers.ts line 134 uses [prompt, ...labels]). The same pattern affects m5-es (q3, q5, q9, q11), m7-es (r1) and m8-es (q1, q2), which are outside this m9 audit.
7. **m9-q3 [es] narrationText**
   - Current: `Una persona que usa PAP quiere limpiar correctamente el equipo, pero encuentra instrucciones en línea que difieren de la ... ucciones del fabricante son lo principal porque los requisitos de limpieza pueden variar según el dispositivo.`
   - Proposed: `(same string with the trailing explanation sentence(s) removed; full text in audit-m9.json)`
   - Why: Implementation error: the ES question narration adds questionFeedback.generalExplanation at the end, so the answer is read aloud before the learner chooses. EN narration (prompt + choices) does not. Cause: src/content/es/localize.ts line 93 builds narrationText from draft.body.join(' '), and draft.body includes the explanation at index choices.length+1 (the EN helper in src/content/helpers.ts line 134 uses [prompt, ...labels]). The same pattern affects m5-es (q3, q5, q9, q11), m7-es (r1) and m8-es (q1, q2), which are outside this m9 audit.
8. **m9-09 [en] image-registry altText (m9-09-sleep-bloating)**
   - Current: `Person sleeping while illustrating a PAP-related comfort concern.`
   - Proposed: `Pregnant person sitting on a couch with a hand over her mouth, looking uncomfortable.`
   - Why: Implementation/accessibility error: the image shows an awake, seated pregnant person with a hand over her mouth and no PAP device, not a sleeping person. Not a CIAS content issue. File: src/content/image-registry.ts line 78.
9. **m9-09 [es] image-registry altText (m9-09-sleep-bloating)**
   - Current: `Persona durmiendo mientras se ilustra una preocupación de comodidad relacionada con PAP.`
   - Proposed: `Persona embarazada sentada en un sofá con la mano sobre la boca y expresión de malestar.`
   - Why: Same alt-text correction in Spanish; a bilingual reviewer should confirm the wording.

## CLINICAL_REVIEW (no new medical wording proposed)

1. **ALL**: All 14 m9 screens, including the 3 quizzes, list the same sourceIds: cias-ez-pap-document plus ats-pap-overview, ats-pap-troubleshooting and ats-pap-care-cleaning. The repo docs (CLINICAL_SOURCE_REGISTRY.md, CIAS_SOURCE_TRACEABILITY.md) say the three ATS IDs are not yet clinically approved, and there is no statement-level mapping. Every NOT_IN_CIAS instruction in this audit depends on those unapproved sources or is app-authored. Context: CIAS itself lists the ATS PAP troubleshooting PDF under "Section IV: Resources to Incorporate or Link to" (p27). That may bear on approving ats-pap-troubleshooting, but not the other two.
2. **m9-02**: Threshold drift: CIAS says the mask should not be "too tight" and, if it must be "very tight", to ask the healthcare provider about a different type of mask. The app says "painfully tight" and "ask for a refit". App-added fitting technique (fit with airflow on, one strap at a time, overtightening worsens leaks) is not in CIAS.
3. **m9-03**: App-added leak technique not in CIAS: lift-and-reseal with airflow on, checking for a folded cushion and seated connectors, routing tubing over the chest or using a holder, not blocking vents.
4. **m9-04**: Whistling cause differs: CIAS says whistling can come from condensation caused by too much humidification; the app gives leak, connection, vent and cushion causes and never states the CIAS cause. Heated-tubing advice and the vent warning are not in CIAS. Omitted CIAS tips: switch to "auto", and put the machine on the floor (which conflicts with the CIAS p23 advice to lift it away from dust).
5. **m9-05**: CONTRADICTION (implied): CIAS p22 suggests petroleum creams (Vaseline, Aquaphor) on the face to reduce friction. m9-05 leaves this out and says "Do not apply an unapproved product to the mask or skin without checking the manufacturer or care team." CIAS "hypoallergenic mask made of silicone" is omitted. The mask liner, face/mask cleaning for seal, and skin safety-net thresholds are not in CIAS.
6. **m9-06**: App-added: check for a leak first, heated tubing, saline gel, and asking before a chin strap. CIAS treats humidification as something the user adjusts; the app says to ask first. Omitted: extra room humidifier, humidifier types.
7. **m9-07**: CIAS offers mouth tape (Somnofix) with a "check with your doctor" caveat; the app leaves both out. A clinical decision is needed on whether the omission is intentional.
8. **m9-08**: PREGNANCY-SPECIFIC: CIAS p23 says saline spray is safe in pregnancy and the recommended first option, nasal steroids are also safe in pregnancy (some are over the counter), and both are preferred to oral medicines. m9-08 leaves all of this out and adds "especially during pregnancy" as a caution. App-added thresholds: nosebleeds, worsening breathing. If the CIAS nostril-cream advice is restored, its self-contradiction (non-petroleum cream vs Vaseline) needs resolving.
9. **m9-09**: App-added therapy content not in CIAS Section III: the clinician may consider an expiratory comfort feature, auto-PAP or bilevel PAP (CIAS p10 lists these only as prescriber-chosen machine types), and the "prompt review" threshold. The specific CIAS advice "keep the head of the bed up if you can" is made more general.
10. **m9-10**: App-added: heated tube, and routing tubing over the chest or under a blanket to reduce heat loss. Not in CIAS.
11. **m9-11**: Cleaning frequency and method are blurred against CIAS p24, which says: mask and humidifier components daily; tubing weekly; humidifier sanitized weekly with 1:1 white vinegar and water for 15-20 minutes; all components sanitized at least once a month (20-minute vinegar soak); always distilled or boiled-and-cooled water. The app keeps only "weekly tubing" and leaves the rest to the manufacturer ("periodic broader cleaning"). The ATS-derived bans (immersion, bleach, alcohol, harsh cleaners, household wipes, unapproved cleaning devices) are not in CIAS. A reviewer needs to decide whether to restore the CIAS frequencies and vinegar method within the manufacturer-first framing (CIAS typo "1 white vinegar" if restored).
12. **m9 (missing screens)**: TRAVEL and FLYING: the CIAS p24 questions "How do I continue CPAP if I'm traveling?" (travel or battery machines, RV power) and "Can I fly with a CPAP machine?" (carry-on or checked luggage, removal for x-ray screening, TSA links) are not in m9. In the whole app, only m8 has a brief "including ... travel" line. This is CIAS-sourced content, not new advice; the decision whether to add it belongs to the content owner or clinical reviewer.
13. **m9 (omissions)**: Other Section III content is omitted (rental and insurance, mask-style/fit/humidity links, CPAP can worsen allergies, lift the machine away from dust, pets and vacuuming, oral allergy medicine, esophagus explanation). See the omissions list. The reviewer should decide which to restore.

## Answer keys

- m9-q1: key c2 (check fit, seek mask support) is supported by CIAS p22 ("This might be a sign that air is leaking from the top of the mask.") and p21. Not debatable. Minor: the stem asks for an "interpretation and response", but the choices only give responses.
- m9-q2: key c3 (ramp + review with care team) is supported by CIAS p23 and p10. Not debatable.
- m9-q3: key c2 (manufacturer first, general guidance as a supplement) is supported by CIAS p23-24. Not debatable. Distractor c1 is wrong only on the basis of the module text (m9-11 P3), not CIAS.
