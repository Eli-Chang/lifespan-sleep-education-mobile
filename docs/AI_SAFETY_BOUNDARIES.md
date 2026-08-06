# AI Safety Boundaries

The AI features are optional educational development tools. They are not diagnostic, clinical, medical-device, or emergency services.

Allowed: explain allowlisted lesson concepts, evaluate a reviewed teach-back rubric, organize PAP barriers into reviewed categories, suggest questions for the healthcare/PAP team, and help make a non-medical routine more specific.

Prohibited: diagnosis, medication advice, PAP pressure or equipment changes, individualized pregnancy-risk estimates, treatment guarantees, unreviewed clinical claims, arbitrary prompts/models/URLs, web search, tool execution, and dynamic emergency instructions.

Controls include affirmative local consent, input/output limits, strict schemas, task/content allowlists, prompt-injection rejection, provider timeout, limited client retry behavior, rate limiting, fixed urgent-language copy, no raw user-text logging, and fallback UI. Users are prompted to avoid identifying information. The project makes no HIPAA, clinical-validation, professional-translation, or patient-release claim.
# Version 3 enforced boundaries

The browser sends no Worker request before explicit consent. Revocation prevents later calls. The Worker selects content by allowlisted activity or lesson ID and treats all typed text as untrusted data.

The AI may explain approved lesson content, evaluate concepts without numeric grades, organize a PAP barrier, or draft an editable non-medical plan. It may not diagnose, prescribe, select medication, change PAP settings, estimate individual pregnancy risk, guarantee outcomes, pressure disclosure, or claim clinical approval. Unsupported questions receive a controlled fallback. Urgent-language matches receive a fixed bilingual message rather than model-generated emergency advice.

The versioned Worker evidence bank is pending research-team review and disabled by default. The Worker sends no pending evidence to Groq until an explicit approved-version activation gate is set. The client does not persist AI conversations, and identifier checks are supplementary rather than guaranteed redaction.
