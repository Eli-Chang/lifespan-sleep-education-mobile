# Intellectual Property Boundary

| Asset class | Location/handling | Boundary |
| --- | --- | --- |
| Public educational content | Selected lesson UI and approved activity wording bundled in the app | Distribute only content already approved for app distribution |
| App-distributed content | `src/content/`, assets, bilingual lesson UI | Treat as release content; do not add private source documents here |
| Private source material | Research-team source files, reviews, unpublished evidence, and internal evaluation records | Keep out of the mobile bundle and out of public web exports |
| Server-only logic | `cloudflare-worker/src/`, evidence selection, safety prompt, schema validation, rate limiting, evaluation logic | Never reproduce the complete prompt or retrieval policy in the mobile app |
| Secrets | Cloudflare `GROQ_API_KEY` secret, not source or app configuration | The repository contains no secret value; never put it in Expo, `.env`, logs, or tests |
| Third-party licensed material | Source registry links and licensed media records | Confirm license and redistribution rights before bundling or publishing |

The Groq API key remains a Cloudflare secret. The fixed provider endpoint, server safety prompt, evidence activation gate, retrieval mapping, and response-validation logic remain Worker-side. The mobile app contains only public/approved lesson content required for education and does not bundle the evidence-bank source documents as a released client artifact.

No deployment, credential rotation, console setting, legal agreement, publication, or real-participant collection was performed in this audit.
