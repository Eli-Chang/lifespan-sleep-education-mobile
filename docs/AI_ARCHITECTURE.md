# AI Architecture

`Expo app -> local llama.cpp model (custom native build) -> configured read-only search adapter -> preferred-source snippets -> Expo app`

The existing cloud route remains available when local mode is disabled: `Expo app -> Cloudflare Worker -> configured Gemini Flash provider (optional Groq fallback) -> schema/evidence validation -> Expo app`.

AI is optional and consent-gated. The app contains no provider key, complete system prompt, private evidence documents, retrieval rules, or evaluation logic. It sends the selected task, minimal lesson/activity context, locale, an ephemeral session identifier, a signed conversation token after conversation start, and a bounded rolling message window. The visible conversation, draft, and any pending Vela learner text exist only in React session memory and are not included in serialized learning state.

## Endpoint contract

Endpoint selection is centralized in `src/services/ai-config.ts` and fails closed:

- Web development uses `EXPO_PUBLIC_AI_WEB_API_BASE_URL` when present. The local value is `http://127.0.0.1:8789`.
- Native development never uses the web override. It uses an explicit `EXPO_PUBLIC_AI_API_BASE_URL`, or, when that value is absent and `EXPO_PUBLIC_AI_NATIVE_DEV_WORKER_PORT` is set, derives `http://<Metro host>:<port>` from Expo's runtime `hostUri`. Loopback and unspecified hosts are rejected for native.
- Non-development builds require an explicit non-loopback HTTPS `EXPO_PUBLIC_AI_API_BASE_URL`. Missing, malformed, loopback, or non-HTTPS values produce `CONFIGURATION_ERROR`; there is no default endpoint.
- The preview EAS profile enables AI and targets the deployed HTTPS Worker at `https://lifespan-sleep-education-ai.eli-apps.workers.dev`. The production EAS profile remains disabled until clinical, privacy, and release review authorize patient-facing AI. Enabling either profile requires an externally managed, current, non-loopback HTTPS endpoint plus a deliberate build-profile change.

Expo documents that `EXPO_PUBLIC_` variables are embedded in the client bundle and must not contain secrets: [Expo environment variables](https://docs.expo.dev/guides/environment-variables/). EAS environment selection and build-variable behavior are documented in [EAS environment variables](https://docs.expo.dev/eas/environment-variables/usage/).

On 2026-08-26 the current Worker was deployed and its health endpoint returned `200` with `provider: "gemini"` and `configured: true`. Preview builds now use that endpoint; production remains intentionally disabled pending release review.

## Local Vela and web evidence

Local mode is disabled by default with `EXPO_PUBLIC_AI_LOCAL_LLM_ENABLED=false`. When enabled in a custom Expo development build, the app downloads the Apache-2.0 Qwen2.5 0.5B Instruct Q4_K_M GGUF model on first use. The model is approximately 491 MB; the native llama.rn libraries are part of the app build, not the model download. The model cannot run in Expo Go or the web preview because those runtimes do not contain the custom native module.

The local model does not have arbitrary network access. It calls `POST /v1/web-search` through the existing Worker, which uses a server-side Brave Search API secret. The Worker returns source title, URL, domain, and search snippet only; it never sends the search credential to the app. The local prompt accepts only sources marked as preferred from the configured credibility list (`nih.gov`, `ncbi.nlm.nih.gov`, `cdc.gov`, `who.int`, `fda.gov`, `acog.org`, `aasm.org`, selected medical publishers, and similar authoritative domains). This is source discovery, not yet full-page paper retrieval. A search service key and a later reviewed page-extraction policy are required before calling it an evidence system.

To configure the search adapter, set the Worker secret outside source control with `npx wrangler secret put BRAVE_SEARCH_API_KEY`. The client-side `EXPO_PUBLIC_AI_WEB_SEARCH_ENDPOINT` is optional and must point to the configured Worker route. Search requests remain subject to Brave, source-site, network, and Worker rate limits; local inference removes the Gemini/Groq LLM quota, not every Internet quota.

## Worker boundary

The Worker owns strict request and response schemas, CORS, security headers, random request IDs, safe logs, isolate-local rate limiting, the fixed provider endpoint, the model allowlist, HMAC-signed conversation state, safety and language boundaries, provider timeout, provenance, source-ID validation, and deterministic boundary/urgent responses. Gemini receives only the bounded task context and selected evidence required for the response; when `AI_PROVIDER=gemini` and Gemini is unavailable, the existing Groq route can be used as a configured provider-level fallback. Arbitrary provider tools, direct browsing, files, and code execution are not enabled; the separate `/v1/web-search` route is a bounded read-only source-discovery adapter described above.

Public failures use stable categories that distinguish offline state, client configuration, Worker reachability, invalid input, access denial, provider authorization, model availability, local/upstream rate limits, server failures, and timeouts. Provider bodies and messages are never relayed to the app.

CORS, rate limits, and signed conversation tokens are safeguards, not participant authentication. The application currently has no participant authentication or authorization layer. The in-memory rate limiter is isolate-local and therefore cannot provide a globally consistent quota. See `docs/security-and-phi-readiness.md` for the security boundary and unresolved governance requirements.

The app remains usable without AI. This architecture is not a HIPAA compliance, clinical validation, security certification, or patient-release claim.
