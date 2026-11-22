# Security

## Scope

This policy applies to the mobile client, local content/progress/preferences, and repository configuration. The app has no AI companion, backend Worker, or provider calls; those were removed on 2026-11-21.

## Security boundary

The client contains educational content and local state. Core learning runs offline and the app makes no network requests. Text-to-speech uses voices already installed on the device.

Important assets include learner answers and reflections stored on the device, progress and preference state, and educational content.

## Security invariants

- The app makes no network, AI, or analytics requests (`tests/privacy-boundaries.test.ts`).
- Only learning progress and preferences are stored on the device, with no identifiers.
- Saved progress from older builds is sanitized on load, including removal of retired AI companion data.
- Learner-entered text is never sent off the device or rewritten.
- Logs must not expose private health content.

## Reportable failures

Report any network request from the app, storage of identifiers, leakage of learner-entered text, unsafe rendering or injection, or failure paths that disclose protected data.

Severity must reflect the actual boundary, affected data, attacker capability, prerequisites, likelihood, and impact. This policy introduces no vulnerability-class exclusions, suppressions, accepted risks, or severity downgrades.

## Limitations

The repository is an educational/portfolio implementation. Current source evidence does not establish production build settings, clinical validation, or HIPAA compliance. Those facts remain verification requirements, not assumed controls or accepted risks.

## Reporting

Report suspected vulnerabilities privately to the repository owner with affected paths, reproduction steps, impact, and source/runtime evidence.
