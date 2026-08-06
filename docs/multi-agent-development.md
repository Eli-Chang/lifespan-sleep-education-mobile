# Multi-agent development

Project root: the app workspace containing this document.

Use `$sleep-app-development` for substantial Expo/React Native lesson, navigation, UI, accessibility, localization, narration, progress, consent, AI, privacy, testing, or release-readiness work. The skill routes the minimum relevant agents. `app_implementer` is the sole overlapping application-code writer; investigators and reviewers are read-only unless explicitly assigned test/artifact writes.

Run the app with `npm.cmd start`, web with `npm.cmd run web`, Playwright with `npm.cmd run test:e2e`, unit tests with `npm.cmd test`, and Expo checks with `npx.cmd expo-doctor`. Visual artifacts belong under `qa-artifacts/` or `artifacts/`; browser phone emulation is not native testing. Android/iOS validation is reported separately and only when an existing environment is available.

Validate setup with:

```powershell
.agents/skills/sleep-app-development/scripts/validate-agent-setup.ps1
```

Inspect active subagent threads in the Codex client. A configured TOML file is not evidence that an agent ran. To add a specialist, create a unique `.codex/agents/*.toml`, add routing guidance, validate, and use a fresh session if discovery is unavailable.
