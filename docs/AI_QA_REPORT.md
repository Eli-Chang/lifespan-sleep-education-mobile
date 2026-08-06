# AI QA Report

This report records code-level verification only. It is not clinical validation, HIPAA compliance, security certification, or production approval.

## Required checks

- Mobile: consent-gated health checks and chat calls, ephemeral session IDs, current-message-only upstream payload, identifier warnings/checks, no AI conversation persistence, reset/revocation behavior, English/Spanish UI.
- Worker: request/body/turn limits, exact origin allowlist, security headers, random request IDs, safe logs, model/endpoint allowlists, timeout, rate limiting, fail-closed evidence gate, prompt-injection and identifier rejection, structured output and source-ID validation, deterministic urgent/unsupported fallbacks.
- Evaluation dataset: `cloudflare-worker/evaluations/ai-safety-v1.json` is synthetic and versioned. It contains no expected medical answer beyond the approved evidence bank.

## External actions not performed

No Worker deployment, Groq console setting, Zero Data Retention activation, credential rotation, legal agreement, BAA/DPA, IRB action, publication, or real-participant test was performed. The evidence bank remains disabled and pending research-team review.

## Limitations

Cloudflare isolate-wide rate-limit durability, provider/vendor retention, native device behavior, OS backup behavior, App Attest/Play Integrity, accessibility hardware testing, and independent clinical/legal review remain open.
