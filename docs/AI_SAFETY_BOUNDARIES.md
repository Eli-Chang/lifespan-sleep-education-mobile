# AI Safety Boundaries

The AI features are optional educational development tools. They are not diagnostic, clinical, medical-device, or emergency services.

Allowed: explain broad sleep and health science, explain allowlisted lesson concepts, maintain an open educational conversation with bounded rolling history, organize PAP barriers into reviewed categories, suggest questions for the healthcare/PAP team, and help make a non-medical routine more specific.

Prohibited: diagnosis, medication advice, PAP pressure or equipment changes, individualized pregnancy-risk estimates, treatment guarantees, unreviewed clinical claims, arbitrary prompts/models/URLs, direct browsing or tool execution, and dynamic emergency instructions. A separately configured read-only search adapter may discover sources, but only preferred credible domains are supplied to the local model and retrieved page text is treated as untrusted data.

Controls include affirmative local consent, input/output limits, strict schemas, task/content allowlists, a canonical conversation policy, signed replay-safe conversation state, rolling history bounds, prompt-injection rejection, provider timeout, retry-preserving client behavior, rate limiting, fixed urgent-language copy, no raw user-text logging, and fallback UI. Users are prompted to avoid identifying information. The project makes no HIPAA, clinical-validation, professional-translation, or patient-release claim.
# Version 3 enforced boundaries

The browser sends no Worker request before explicit consent. Revocation prevents later calls. The Worker selects content by allowlisted activity or lesson ID and treats all typed text as untrusted data.

The AI may explain general sleep and health concepts, explain lesson content, organize a PAP barrier, or draft an editable non-medical plan. It may not diagnose, prescribe, select or dose medication, change PAP settings, estimate individual pregnancy risk, guarantee outcomes, pressure disclosure, or claim clinical approval. Ordinary boundary questions receive useful general education plus a clear clinician boundary; they do not end the conversation. Urgent-language matches receive a fixed bilingual message rather than model-generated emergency advice and may end the conversation.

The versioned Worker evidence bank remains provenance-aware and optional. The Worker sends selected context and bounded rolling history to Groq only after consent; the client does not persist AI conversations, and identifier checks are supplementary rather than guaranteed redaction. The signed Worker conversation token, not client JSON, controls replay and continuation state.
