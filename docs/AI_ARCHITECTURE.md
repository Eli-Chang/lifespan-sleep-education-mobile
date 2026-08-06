# AI Architecture

`Expo app -> HTTPS Cloudflare Worker -> fixed Groq Chat Completions endpoint -> schema/evidence validation -> Expo app`

The client contains no Groq key, complete system prompt, private evidence documents, retrieval rules, or evaluation logic. AI is optional and requires affirmative consent before both health checks and chat requests. The client sends only the selected task, minimal lesson/activity context, locale, one current message, and an ephemeral session identifier. The client keeps the visible conversation in component memory only; it does not persist AI messages.

The Worker owns strict request limits, exact CORS, security headers, random request IDs, safe logs, rate limiting, the fixed provider endpoint, the model allowlist, evidence activation gate, prompt, safety boundaries, provider timeout, output schemas, source-ID validation, and deterministic unsupported/urgent responses. Groq receives only the current message, locale, rubric, and relevant evidence excerpts after the evidence gate is explicitly activated. Web search, tools, browsing, files, code execution, and unrestricted background knowledge are not enabled.

The current evidence bank is pending research-team review and disabled by default. This means a configured Worker fails closed with a bilingual unsupported-material response until the research team approves and an authorized operator activates the matching version. See `docs/safety/AI_EVIDENCE_POLICY.md`.

The app remains usable without AI, offline, misconfigured, unavailable, timed out, rate-limited, or evidence-disabled. This document and the audit documents make no HIPAA, clinical-validation, security-certification, or patient-release claim.
