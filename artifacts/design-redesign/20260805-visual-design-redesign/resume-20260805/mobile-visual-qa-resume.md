# Mobile visual QA resume (2026-08-05)

Scope: read-only review of the available Expo Web evidence at 390×844. No product code was changed. Native Android/iOS were not available in this environment, so this is browser-only evidence. A fresh 430×932 live check was not completed in this bounded resume pass.

## Findings

- **390×844 English home:** no horizontal overflow in `resume2-home-en-390-metrics.json` (`scrollWidth=390`, `scrollHeight=844`, body overflow hidden). The home card, module card, and bottom Home/Settings navigation are visible and reachable in `resume2-home-en-390.png`; the first module description is intentionally ellipsized, not clipped by the viewport.
- **390×844 Spanish home:** text expands safely in `resume2-home-es-390.png`; the headline wraps to three lines and the module title wraps to two without horizontal clipping. The bottom navigation labels are translated (`Inicio`, `Ajustes`). The screenshot contains a small floating lightning/debug control at the lower-left edge; it is visually detached/partly blurred and overlaps the lower content region. Treat as an overlay affordance to verify, not a confirmed product defect.
- **Lesson English/Spanish:** `resume2-lesson-en-390.png` and `resume2-lesson-es-390.png` show the lesson title, progress, narration controls, and hero illustration inside the phone width. Spanish expansion wraps cleanly (`Comprender la apnea del sueño`; `Reproducir`, `Detener`, `Repetir`) with no visible horizontal clipping. The lower lesson content continues below the viewport, so scroll reachability is required; the archived metrics report `scrollWidth=390` and `scrollHeight=844` for the captured state.
- **Disabled narration readability fix:** the English disabled Play/Stop/Replay controls in `lesson-disabled-fix-en-390.png` remain legible against their pale disabled fill, and the helper text clearly says “Enable narration in Settings…”. This fix passes visual inspection at 390×844. Spanish controls in `resume2-lesson-es-390.png` retain the same readable disabled treatment.
- **Module screen:** `resume2-module-en-390.png` and `resume2-module-es-390.png` keep the progress card, primary Start/Continue button, and reassurance callout within the viewport width. Spanish copy expands the intro to four lines and remains contained; the CTA remains full-width and reachable.
- **Quiz missed-choice contradiction fix:** `resume2-quiz-missed-en-390.png` clearly distinguishes the missed correct answer (“Correct choice not selected”) from the selected incorrect answer (“Selected, but not correct”); the feedback card begins below them with “Not quite.” No contradictory selected/correct state is visible.

## Limitations / follow-up

- Existing artifacts cover the phone-width 390×844 path and screenshots; no 430×932 screenshot or fresh Playwright CLI interaction was added in this resume pass. Re-run the same English/Spanish home → lesson → quiz checks at 430×932 before release sign-off.
- The floating lightning control visible in some captures should be checked for intentionality and touch-target overlap on the next live pass.
