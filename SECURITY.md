# Security

## Scope

This policy applies to the mobile client, local content/progress/preferences, consent-gated AI flows, the Cloudflare Worker, provider calls, evaluation diagnostics, and repository configuration.

## Security boundary

The client contains educational content and local state. Optional AI interaction crosses the client-to-Worker boundary after consent. The Worker validates requests and provider responses before returning content. Provider credentials remain server-side. Evaluation diagnostics are a separate restricted surface.

Important assets include user-entered health-related text, consent state, session and conversation authorization state, provider credentials, signed conversation state, diagnostic tokens, educational content, and provider responses.

## Security invariants

- Consent is required before an AI or health-check network request.
- Provider credentials and diagnostic credentials never reach the client or ordinary responses.
- User and provider content is bounded, parsed, validated, sanitized, and rejected when unsafe or malformed.
- AI output is educational support only and must not provide diagnosis, medication instructions, or individualized PAP-pressure directives.
- Origin, authorization, session, turn-count, timeout, and provider-response controls must fail closed.
- Logs and diagnostics must not expose secrets, tokens, private health content, or provider-only metadata.
- Client content and local progress remain local unless the user explicitly consents to the supported AI boundary.

## Reportable failures

Report secret exposure, consent bypass, unauthorized provider calls, session or turn-limit bypass, unsafe rendering or injection, sensitive diagnostic leakage, origin/authentication bypass, provider-response safety bypass, or failure paths that disclose protected data.

Severity must reflect the actual boundary, affected data, attacker capability, prerequisites, likelihood, and impact. This policy introduces no vulnerability-class exclusions, suppressions, accepted risks, or severity downgrades.

## Limitations

The repository is an educational/portfolio implementation. Current source evidence does not establish Cloudflare dashboard settings, deployed routes, provider-account controls, DNS exposure, production logging configuration, clinical validation, or HIPAA compliance. Those facts remain verification requirements, not assumed controls or accepted risks.

## Reporting

Report suspected vulnerabilities privately to the repository owner with affected paths, reproduction steps, impact, and source/runtime evidence.
