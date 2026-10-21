# Data Flow and Privacy Audit

Status: implementation audit, updated 2026-08-26. This document is not a HIPAA, clinical-validation, or production-readiness determination. The system is **NOT VERIFIED FOR REAL PHI**.

## Current flow

`LessonChat` collects an optional free-text teach-back or question after affirmative consent. The client first sends minimal module/screen/activity/lesson context and an ephemeral session identifier to `POST /v1/conversation-start`, then sends the signed conversation token, current message, up to 12 recent user/assistant messages, locale, and lesson/activity identifiers to `POST /v1/lesson-chat`. The Worker validates the request and token, selects server-side knowledge and evidence, and sends the rolling conversation, task, locale, rubric, and relevant excerpts to the fixed Groq endpoint. The Worker validates structured JSON and source IDs before returning a safe response. The app renders the response in memory and does not persist the transcript, draft, signed token, or pending Vela learner text. The Durable Object stores only non-text conversation revision/reservation metadata and deletes it at or before the 24-hour signed-token expiry through read-time pruning and an alarm.

The Worker creates a random request ID per request. Logs contain only allowlisted operational metadata: request ID, route task, stage, status, and a fixed category. Prompts, user text, authorization headers, provider payloads, and response bodies are not logged.

## Data inventory

| Data | Collected | Stored where | Sent where | Retention | Sensitive | Necessary |
| --- | --- | --- | --- | --- | --- | --- |
| Names | No request field; obvious-name text is not guaranteed detectable | Nowhere by app design | Nowhere unless a user ignores the notice and enters it as free text | Not retained by AI flow | Potentially sensitive | No |
| Email addresses | No request field; obvious email pattern rejected | Nowhere | Not sent when detected | None | Sensitive identifier | No |
| Phone numbers | No request field; obvious phone pattern rejected | Nowhere | Not sent when detected | None | Sensitive identifier | No |
| Birth dates | No request field; date pattern is not guaranteed detectable | Nowhere by app design | Not requested | None | Sensitive identifier | No |
| Addresses | No request field | Nowhere by app design | Not requested | None | Sensitive identifier | No |
| Clinician names | No request field | Nowhere by app design | Not requested | None | Sensitive identifier | No |
| Exact appointment dates | No request field | Nowhere by app design | Not requested | None | Sensitive | No |
| Pregnancy information | Only if voluntarily included in current free text or selected lesson context | Current in-memory request only; lesson content is bundled | Worker/Groq only after consent and only for a relevant allowlisted activity | Not persisted by AI flow; provider/vendor retention requires governance confirmation | Health information | Only the minimal lesson context |
| Other health information | Voluntary free text only; warning is shown and obvious identifiers are rejected | Current session memory only | Worker/Groq only after consent; current message plus bounded recent chat context | No app conversation retention; vendor/log retention is unverified | Sensitive health information | Current educational task only |
| Free-text messages | Yes, when the user chooses an AI activity | React component/provider session state only | Worker and fixed Groq endpoint after consent | No app persistence; external retention is an open governance action | Potentially sensitive | Yes, for the requested activity |
| Pending Vela learner text | Temporarily, when a Vela interaction hands text to an AI activity | Nonserialized AppProvider memory only | Worker/Groq only if the learner proceeds with consent | Cleared on use, dismissal, AI disable/revocation, reset, or process exit | Potentially sensitive | Transitional UI state only |
| Conversation coordination metadata | Module ID, screen ID, locale, revision, issue time, and short reservation state only | Cloudflare Durable Object; no learner text, prompt, response, identifier, or session ID | Not sent as a retained record to Groq | Maximum 24 hours; pruned on access and deleted by alarm | Operational metadata | Replay protection and turn coordination |
| Lesson answers | Yes for curriculum interactions | AsyncStorage `sleep_education_state_v3` and browser local storage fallback `lifespan_sleep_quiz_answers_v1` | Not sent to AI unless a user re-enters content as free text | Until reset, storage removal, or app data removal | Potentially sensitive | Yes for local progress |
| Progress | Completed screen/module IDs, answers, language, narration settings, action plans | AsyncStorage `sleep_education_state_v3` | Nowhere | Until reset or app data removal | Potentially sensitive | Yes for local learning continuity |
| Language | Yes, `en` or `es` | AsyncStorage state | Sent as locale after AI consent | Until reset; reset preserves language | Low sensitivity | Yes for bilingual response selection |
| Device identifiers | No app/device identifier API is requested | Nowhere | Nowhere | None | Identifier | No |
| IP address | Cloudflare may receive a transport IP and uses it only as an in-memory best-effort rate-limit key | Worker isolate memory; not included in application logs | Cloudflare transport layer | Provider/platform retention is not confirmed in this code audit | Identifier | Operational abuse control |
| Logs | Operational metadata only | Cloudflare observability/log platform | Not sent to Groq | Retention is an external governance decision | Operational metadata | Limited operational support |
| Analytics | No analytics SDK or analytics identifier found | Nowhere | Nowhere | None | Potentially sensitive | No |

## Local storage keys

- `sleep_education_state_v3`: an explicit sanitizer allowlists curriculum version, progress IDs, answers and attempts, reflections, language, narration preferences/voice identifiers, reduce-motion preference, AI enabled flag, AI consent, Vela revision, and non-AI action plans. AI transcripts, drafts, signed tokens, `lessonChats`, pending Vela text, and unknown historical fields are excluded from every write and hydration.
- `sleep_education_state_v2`: legacy state read only for migration, then removed. Legacy AI free-text fields are discarded rather than copied forward.
- `lifespan_sleep_quiz_answers_v1`: browser-only compatibility storage for quiz selections; it contains no AI conversation.

AI conversations are not moved to SecureStore. SecureStore is appropriate for small secrets or identifiers, not large lesson or chat payloads; no secret or sensitive identifier is required by this app flow.

The allowlisted learning state in AsyncStorage is not encrypted by application code. Platform storage protection and OS/cloud backup behavior are outside the app's control. This remains a real-PHI blocker until the institution approves the stored fields, device policy, backup exposure, retention, and deletion behavior.

## Privacy controls and limits

Consent is required by both `callAi` and `checkAiHealth`; opening the AI route does not contact the Worker. The client sends one current user message plus a rolling window of recent chat messages, and the Worker enforces body, message, conversation, identifier, route, model, endpoint, timeout, and rate limits. The rolling window is bounded by shared message, character, and request-byte limits. Identifier checks are supplementary and cannot guarantee PHI removal. The privacy notice therefore remains the primary control.

Native development derives a LAN URL from Expo's Metro host only when an explicit public development port is configured; it rejects loopback on device. Non-development requires an explicit non-loopback HTTPS endpoint and never silently defaults. Preview and production profiles currently leave AI disabled. The previously used public Worker is stale relative to the current lesson contract and is not configured or verified.

The canonical local launcher loads Worker development variables only from an external file, defaulting to `%LOCALAPPDATA%\LifespanSleepEducation\worker.dev.vars`, and passes that path to Wrangler with `--env-file`. It refuses a path inside the project and fails before process startup if the external file is missing. Create the external file manually from the authorized secret source or password manager; do not use repository tooling to read or copy an existing project-local secret. After local health is verified, remove any obsolete project-local file through an approved secure process. No development secret is added to preview or production.

There is no participant authentication or authorization layer. CORS, isolate-local rate limiting, and HMAC-signed conversation tokens limit some abuse and state tampering, but none authenticates a participant. The isolate-local limiter cannot provide globally consistent quotas across Worker isolates.

## Known limitations and deletion

The app can remove the state key through reset/migration and discards session-memory AI text when the process ends, but unencrypted application-level AsyncStorage, OS backups, browser profiles, Cloudflare platform logs, and Groq/vendor retention are outside the app's complete deletion control. Public provider access remains unauthenticated, and isolate-local rate limiting does not provide a global quota. Account-specific Groq ZDR/retention, Groq BAA status, Cloudflare BAA status, plan/tier, Worker log settings, global abuse controls, incident response, IRB approval, and institutional approval are unverified. These must be resolved before real participant data is collected.

## Rollback

To roll back code-only changes, restore the changed files from the pre-audit copy or Git-equivalent workspace snapshot after preserving this audit. Do not re-enable legacy AI persistence, evidence activation, deployment, or production credentials as part of rollback without a new approval checkpoint.
