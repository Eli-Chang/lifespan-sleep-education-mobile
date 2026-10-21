# CIAS / Approved Source Traceability

The curriculum helper attaches `sourceIds: ['curriculum-master-v3']` to every completed lesson screen. Historical source-backed screens use `sourceScreenshotIds` and are indexed by `src/content/source-manifest.ts`; the existing manifest contains 77 preserved source entries. The OSA module’s 12 screens retain their stable IDs and approved source content while question wording and UI presentation are improved.

The revised OSA questions preserve these source concepts:

- `m1-q1`: repeated upper-airway narrowing/closure reduces airflow and is not voluntary, dreaming, or permanent lung failure.
- `m1-q2`: PAP uses pressurized air, a mask delivers it, equipment questions belong with the PAP/sleep-care team, and PAP is not automatically supplemental oxygen.

The PAP screens use `sourceScreenshotIds: []` and retain `sourceIds: ['cias-ez-pap-document']`. The Getting Started with PAP and Troubleshooting PAP screens also carry the candidate clinical supplement IDs `ats-pap-overview`, `ats-pap-troubleshooting`, and `ats-pap-care-cleaning`; these additions are not yet clinically approved. The original source is the extracted text from `docs/CIAS App_ EZ-PAP .pdf`:

- `m8` Device Education: PAP purpose, mask/tubing/machine parts, prescribed pressure, gradual acclimation, symptom/device-data follow-up, and use during sleep, naps, and travel (source text around lines 1063–1331 and 4079–4904).
- `m9` Troubleshooting PAP: mask fit, leaks, condensation, skin irritation, dryness, mouth opening, congestion, bloating, cold air, and manufacturer-first cleaning (source text around lines 4940–6230).

The PAP knowledge checks remain app-authored learning behavior rather than recovered CIAS answer keys. They test the practical guidance in these modules and are not promoted to historical CIAS provenance.

The ATS supplements add general patient-education options without changing prescriptions: gradual awake/rest practice, fit and leak checks, humidification and tubing comfort, symptom and device-data follow-up, clinician-directed ramp or pressure-comfort discussions, and manufacturer-first cleaning. Pregnancy-related medication choices, pressure changes, device-mode changes, diagnosis, and outcome guarantees remain outside the app’s guidance.
