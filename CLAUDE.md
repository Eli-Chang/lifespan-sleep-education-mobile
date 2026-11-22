@AGENTS.md

# Claude Code notes

The project instructions above apply in full. For Claude Code specifically:

- **Patient-facing text:** before finalizing any change to text a learner can see, invoke the `humanizer` skill and then the `sleep-app-content-quality` skill with the Skill tool (both live in `.claude/skills/`). Do this even for a one-word label or a translation fix. Update all four languages (en, es, pt-BR, ht) in the same change, even if the request names only English. Then run `npm.cmd run check:content-quality`, fix what it reports, and rerun it with `-- --reviewed`. Do not report the change as done until that run prints `Result: PASS`.
- `.claude/rules/patient-facing-text.md` repeats this rule for the files that hold learner-visible text.
- `.claude/skills/` and `.agents/skills/` hold identical copies of both skills; `tests/content-quality-gate.test.ts` fails if they drift. Edit both copies together.
