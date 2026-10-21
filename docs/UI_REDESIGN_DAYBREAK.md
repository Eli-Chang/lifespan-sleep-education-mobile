# UI Redesign: "Daybreak" (local branch `ui-reimagining-20261021`)

Presentation-only redesign of the learner interface. Curriculum data (`src/content/**`), i18n strings, persistence, narration, privacy, and the Cloudflare Worker are untouched. Proof of content neutrality: `scripts/snapshot-curriculum.ts` serializes every module, screen, question, feedback string, image mapping, and rich-presentation block for both locales; the before/after JSON is byte-identical (`artifacts/ui-reimagining-20261021/curriculum-{before,after}.json`).

## Direction

- **Reading surface first.** Warm, low-glare paper (`#F4F0E8`) with near-black ink for long lesson text. Most curriculum diagrams have white backgrounds and now sit flush in white media bands instead of as bright blocks on a dark page.
- **Night-to-dawn identity, used sparingly.** A deep night-indigo hero (home, module overview) with a faint star field and dawn glow on the horizon (`src/components/NightSky.tsx`, decorative and hidden from assistive tech). One warm dawn accent marks "where you are" (current step, current module, eyebrows).
- **Type.** Newsreader (serif, headings) for a calm editorial voice; Atkinson Hyperlegible Next (body/UI), designed by the Braille Institute for low-vision legibility. Both are SIL OFL 1.1 (`assets/fonts/OFL-*.txt`). Static files are always paired with `fontWeight: 'normal'` to avoid faux bold.
- **Learning path.** Home presents the modules as a numbered vertical path with completion nodes, status pills (icon and text), and per-module progress.
- **Thumb-reachable lesson controls.** Previous and Next live in a fixed bottom bar. Listen sits in the top bar. Progress is one segment per step.

## Tokens

`src/theme/tokens.ts`. Legacy palette keys are kept (remapped) so unredesigned surfaces keep working. Contrast on paper: ink 14:1, body 10:1, muted 5.4:1, status colors at least 5.2:1, interactive borders 3.3:1, focus ring 5.5:1.

## Accessibility

- Status is never color-only: results use icon shape (check, cross, alert) plus text labels. Module status uses an icon and a label.
- Focus ring: 3px solid `#3555D1` (light) or `#F6E3C6` (on night).
- Touch targets are at least 44px (`scripts/audit-ui-a11y.mjs` checks this along with accessible names, overflow, and keyboard focus at 320px and 390px in both languages).
- Reduced motion: honored for press feedback, lesson transitions, and the completion reveal.

## Intentional UX changes (not content)

- **Home language switch.** An "Español" / "English" pill in the home hero calls the same `stopNarration()` + `setLanguage()` as Settings, so Spanish speakers don't have to find Settings first.
- **Module overview heading.** The heading shows the module's full approved `title`; it previously showed `shortTitle`. Both are existing approved strings.
- **Step-type labels.** The module overview tags each step Lesson/Question/Reflection/Recap (Lección/Pregunta/Reflexión/Resumen). These follow the renderer's rule: an unscored source question is shown as a personal reflection.
- **Controls.** Previous and Next moved to a fixed footer, after the content in reading order. On the completion screen, Previous is icon-only (still labelled for screen readers) and a single "Continue to …" action replaces the former duplicate Complete and Continue buttons. Both called the same handler.
- **New UI chrome strings** (EN/ES): "Your learning path / Su ruta de aprendizaje", "Overall progress / Progreso total", "Module progress / Progreso del módulo", "Up next / Siguiente", "Module N / Módulo N", "UP NEXT · MODULE N / SIGUIENTE · MÓDULO N". None makes a health claim.

## Behavior fix included

The lesson's slide-in animation could be stopped mid-flight by an effect re-run, leaving the lesson body translated off-screen (blank page). Two triggers: system Reduce Motion, and cold-loading a lesson in Spanish (saved language arrives after mount). The lesson now settles in place on any such re-run (`app/lesson/[moduleId]/[screenId].tsx`).

## Unchanged surfaces

`app/settings/voice-lab.tsx`, `app/qa/reflection.tsx`, `app/modal.tsx`, and `app/(tabs)/explore.tsx` (developer, QA, or unrouted surfaces) were not redesigned. They inherit the new palette through shared tokens and components.

## Reverting

`sh artifacts/ui-reimagining-20261021/restore-pre-redesign.sh` restores the exact pre-redesign text of the 14 replaced files. Those originals were uncommitted work and are preserved in `artifacts/ui-reimagining-20261021/pre-redesign-source/`.
