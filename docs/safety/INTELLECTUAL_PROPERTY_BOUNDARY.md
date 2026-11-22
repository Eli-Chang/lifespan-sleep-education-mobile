# Intellectual Property Boundary

| Asset class | Location/handling | Boundary |
| --- | --- | --- |
| Public educational content | Selected lesson UI and approved activity wording bundled in the app | Distribute only content already approved for app distribution |
| App-distributed content | `src/content/`, assets, bilingual lesson UI | Treat as release content; do not add private source documents here |
| Private source material | Research-team source files, reviews, unpublished evidence, and internal evaluation records | Keep out of the mobile bundle and out of public web exports |
| Secrets | None needed; the app has no backend or provider calls | Never put credentials in Expo, `.env`, logs, or tests |
| Third-party licensed material | Source registry links and licensed media records | Confirm license and redistribution rights before bundling or publishing |

The AI companion and its Cloudflare Worker were removed on 2026-11-21, so the repository holds no server-side prompt, retrieval policy, or provider key. The mobile app contains only public/approved lesson content required for education and does not bundle the evidence-bank source documents as a released client artifact.

No deployment, credential rotation, console setting, legal agreement, publication, or real-participant collection was performed in this audit.
