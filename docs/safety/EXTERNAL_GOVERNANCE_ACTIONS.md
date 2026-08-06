# External Governance Actions

These are not complete. Codex did not perform them and the code must not be described as HIPAA compliant, clinically validated, secure, or production-ready.

- Research-team approval of every evidence-bank statement, version, English/Spanish pair, allowed use, and retirement rule.
- Groq Zero Data Retention activation, if selected, and written confirmation of the account owner and applicable workspace controls.
- BAA/DPA and subprocessor/retention review with the institution and vendor, when applicable.
- Brown information-security review and threat-model acceptance.
- IRB or human-subjects determination before collecting any real participant data.
- Privacy-notice, consent-language, and accessibility approval.
- Data-retention and deletion decision covering the app, browser, Cloudflare, Groq, backups, and logs.
- Named incident-response owner, escalation path, and breach/AI safety response procedure.
- Final clinical evaluation approval for evidence, safety categories, refusal behavior, urgent copy, and bilingual output.
- Separate approval checkpoint before enabling `EVIDENCE_BANK_ENABLED`, deploying the Worker, changing Groq console settings, rotating credentials, accepting legal agreements, publishing the app, or collecting participant data.

The current Worker manifest intentionally leaves evidence activation disabled. A rollback is code-only: restore the pre-audit source snapshot, keep the evidence activation disabled, and do not restore raw AI-conversation persistence.
