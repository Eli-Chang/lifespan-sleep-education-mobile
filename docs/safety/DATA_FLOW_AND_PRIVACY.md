# Data Flow and Privacy Audit

Status: implementation audit, 2026-08-05. This document is not a HIPAA, clinical-validation, or production-readiness determination.

## Current flow

`LessonChat` collects an optional free-text teach-back or question after affirmative consent. The client sends the current message, locale, allowlisted lesson/activity identifiers, and an ephemeral session identifier to `POST /v1/lesson-chat`. The Worker validates the request, selects server-side evidence, and sends only the task, locale, current message, rubric, and relevant evidence excerpts to the fixed Groq endpoint. The Worker validates structured JSON and source IDs before returning a safe response. The app renders the response in memory and does not persist AI conversation text.

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
| Other health information | Voluntary free text only; warning is shown and obvious identifiers are rejected | Current component memory only | Worker/Groq only after consent; current message only | No app conversation retention; vendor/log retention is not yet approved | Sensitive health information | Current educational task only |
| Free-text messages | Yes, when the user chooses an AI activity | React component state only | Worker and fixed Groq endpoint after consent | No app persistence; external retention is an open governance action | Potentially sensitive | Yes, for the requested activity |
| Lesson answers | Yes for curriculum interactions | AsyncStorage `sleep_education_state_v3` and browser local storage fallback `lifespan_sleep_quiz_answers_v1` | Not sent to AI unless a user re-enters content as free text | Until reset, storage removal, or app data removal | Potentially sensitive | Yes for local progress |
| Progress | Completed screen/module IDs, answers, language, narration settings, action plans | AsyncStorage `sleep_education_state_v3` | Nowhere | Until reset or app data removal | Potentially sensitive | Yes for local learning continuity |
| Language | Yes, `en` or `es` | AsyncStorage state | Sent as locale after AI consent | Until reset; reset preserves language | Low sensitivity | Yes for bilingual response selection |
| Device identifiers | No app/device identifier API is requested | Nowhere | Nowhere | None | Identifier | No |
| IP address | Cloudflare may receive a transport IP and uses it only as an in-memory best-effort rate-limit key | Worker isolate memory; not included in application logs | Cloudflare transport layer | Provider/platform retention is not confirmed in this code audit | Identifier | Operational abuse control |
| Logs | Operational metadata only | Cloudflare observability/log platform | Not sent to Groq | Retention is an external governance decision | Operational metadata | Limited operational support |
| Analytics | No analytics SDK or analytics identifier found | Nowhere | Nowhere | None | Potentially sensitive | No |

## Local storage keys

- `sleep_education_state_v3`: curriculum version, progress IDs, answers and attempts, language, narration preferences/voice identifiers, AI enabled flag, AI consent, and non-AI action plans. AI history and `lessonChats` are deliberately excluded from the sanitized state.
- `sleep_education_state_v2`: legacy state read only for migration, then removed. Legacy AI free-text fields are discarded rather than copied forward.
- `lifespan_sleep_quiz_answers_v1`: browser-only compatibility storage for quiz selections; it contains no AI conversation.

AI conversations are not moved to SecureStore. SecureStore is appropriate for small secrets or identifiers, not large lesson or chat payloads; no secret or sensitive identifier is required by this app flow.

## Privacy controls and limits

Consent is required by both `callAi` and `checkAiHealth`; opening the AI route does not contact the Worker. The client sends one current user message and the Worker repeats body, message, conversation, identifier, route, model, endpoint, timeout, and rate limits. Identifier checks are supplementary and cannot guarantee PHI removal. The privacy notice therefore remains the primary control.

## Known limitations and deletion

The app can remove the state key through reset/migration, but OS backups, browser profiles, Cloudflare platform logs, and Groq/vendor retention are outside the app's deletion control. Research/institutional governance must define retention, deletion, incident response, and vendor terms before real participant data is collected.

## Rollback

To roll back code-only changes, restore the changed files from the pre-audit copy or Git-equivalent workspace snapshot after preserving this audit. Do not re-enable legacy AI persistence, evidence activation, deployment, or production credentials as part of rollback without a new approval checkpoint.
