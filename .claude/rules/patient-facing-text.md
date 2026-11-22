---
paths:
  - "src/content/**"
  - "src/i18n/**"
  - "src/components/**/*.tsx"
  - "app/**/*.tsx"
  - "app.json"
---

# Patient-facing text in this file

This file holds text a learner can see. Before finalizing any change to that text (new copy, rewording, a translation, a label, feedback, alt text, narration):

1. Invoke the `humanizer` skill, then the `sleep-app-content-quality` skill.
2. Keep every clinical anchor (numbers, qualifiers, warnings, terms, answer keys, choice IDs) unless the request authorizes a change.
3. Add or update the matching es, pt-BR, and ht text in the same change, even if the request names only English.
4. Run `npm.cmd run check:content-quality`, fix every BLOCK and REVIEW line, then rerun with `-- --reviewed` until it prints `Result: PASS`.

Identifiers, keys, and code-only edits in this file do not need the skills. Learner-entered text is never edited.
