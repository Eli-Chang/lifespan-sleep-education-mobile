# OWASP MASVS Review

This is an implementation review using MASVS themes, not a formal certification.

| Area | Status | Evidence | Remediation/limitation |
| --- | --- | --- | --- |
| Storage | Partial | AI free text is now in-memory only; legacy AI fields are dropped; progress remains in AsyncStorage | OS/browser backups and non-AI progress sensitivity require institutional retention review |
| Cryptography | Partial | No app secret is stored; Worker uses HTTPS and Cloudflare transport | No independent key-management or platform binary review was performed |
| Authentication/authorization | Fail/Not provided | Native app has no end-user authentication; CORS is exact but not authorization | Add an approved app-attestation/session authorization design before real data |
| Network communication | Partial | Fixed HTTPS Groq endpoint, consent gate, timeout, body limits, exact CORS, no-store/security headers | Cloudflare/Groq vendor terms and deployed configuration remain unverified |
| Platform interaction | Partial | No contacts, location, device identifiers, or analytics APIs found; local reset remains available | Native backup behavior and OS permission review require device builds |
| Code quality | Partial | Strict Zod request/response schemas and source-ID validation; app/Worker typechecks are required | Full dependency/SCA and production build review remains open |
| Resilience | Partial | Fail-closed evidence gate, safe provider errors, timeout, rate limiter, no retry, malformed-output rejection | In-memory rate limiting is best effort across Worker isolates |
| Privacy | Partial | Data minimization, consent, no AI conversation persistence, identifier checks, safe logs | Vendor retention, legal basis, deletion, incident response, BAA/DPA, and IRB status are external |

Future stronger controls: Apple App Attest, Google Play Integrity, authenticated short-lived sessions, durable abuse controls, and a reviewed data-retention service. None is added or enabled by this phase.
