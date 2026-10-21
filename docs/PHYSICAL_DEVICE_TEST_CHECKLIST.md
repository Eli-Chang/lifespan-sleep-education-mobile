# Physical-device test checklist

These checks were not completed on physical devices in the Windows build environment.

## iPhone/iPad

- [ ] Install/open with an Expo SDK 54-compatible client or development build.
- [ ] Confirm launch, safe areas, back gestures, tab bar, and rotation behavior.
- [ ] Check 375-point width, a large phone, and tablet portrait/landscape.
- [ ] Set the largest Dynamic Type size; confirm all English and Spanish content scrolls without clipping.
- [ ] Enable VoiceOver; verify heading order, choice roles/states, progress labels, and button labels.
- [ ] Enable Reduce Motion; confirm no essential information depends on motion.
- [ ] Enable narration with an `en-US` voice, then `es-US`; verify Play, Stop, Replay, rate, navigation stop, and language-switch stop.
- [ ] Confirm the known iOS silent-mode limitation: narration may be silent while the device is muted.
- [ ] Force close and reopen; verify progress, answers, language, and narration preferences persist.
- [ ] Use airplane mode; verify all written lessons, questions, feedback, and progress remain available.

## Android phone/tablet

- [ ] Repeat launch, safe-area, back-button, small-screen, tablet, landscape, and largest-font checks.
- [ ] Use TalkBack to verify focus order, checked/selected announcements, feedback, and navigation labels.
- [ ] Verify English and Spanish installed voices, fallback message/behavior, Stop/Replay, and rate.
- [ ] Force stop and reopen; verify persistence.
- [ ] Use airplane mode and complete a module.
- [ ] Confirm reset-progress confirmation and that language/narration preferences remain.

Record OS version, device model, installed voices, build identifier, result, screenshots, and defects for every completed run.
# Groq upgrade device checks

- [ ] iPhone: Home from module and every lesson depth returns to root with one deliberate press.
- [ ] Android: hardware Back remains sensible; Home control returns to root and stops narration.
- [ ] Re-enter a module repeatedly and confirm no duplicate stack growth.
- [ ] Confirm progress and latest answer survive force-close, update, and language switching.
- [ ] Confirm single and multi-select editing after correct and incorrect submissions.
- [ ] Confirm VoiceOver/TalkBack announces selected, correct, incorrect, and missed states.
- [ ] Export the full Voice Lab inventory on iPhone and Android.
- [ ] Preview and save English and Spanish voices; restart and confirm persistence.
- [ ] Remove/disable Spanish voices and confirm Spanish never falls back to English.
- [ ] Test iOS silent mode, browser speech gesture restrictions, rate, pitch, replay, and stop-on-navigation.
- [ ] Test AI disabled, airplane mode, Worker outage, timeout, rate limit, consent revoke, and local history clearing.
- [ ] Test all five AI tools with synthetic English and Spanish text after clinical/bilingual review.
# Version 3 additions

- [ ] Android phone: complete all ten modules with TalkBack and large text.
- [ ] iPhone: complete all ten modules with VoiceOver and large text.
- [ ] Confirm bottom actions remain visible above keyboard and safe areas.
- [ ] Confirm narration never reads sensitive reflection or AI text automatically.
- [ ] Confirm AI consent, revoke, offline, timeout, and retry behavior.
- [ ] Confirm Spanish narration and wrapping after bilingual review.
- [ ] Confirm PAP/action-plan text can be edited and deleted locally.

