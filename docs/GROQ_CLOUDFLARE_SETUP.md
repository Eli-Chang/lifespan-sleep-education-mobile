# Groq and Cloudflare Setup on Windows 11

Groq runs the language model. A Cloudflare Worker is a small hosted server between the app and Groq. The Worker keeps the Groq key out of the downloadable app, validates every request and response, and continues running when the developer computer is off.

## What Codex configured

The TypeScript Worker, tests, validation, CORS, limits, health route, Groq request, mobile client, consent UI, diagnostics, and non-secret Expo settings are prepared. A real key is never written to source.

## Commands

From PowerShell:

```powershell
cd cloudflare-worker
npm.cmd install
npm.cmd run check
npx.cmd wrangler whoami
```

If not signed in:

```powershell
npx.cmd wrangler login
```

Approve the Cloudflare page in the browser, then rerun `npx.cmd wrangler whoami`.

Enter the production secret only at Wrangler’s terminal prompt:

```powershell
npx.cmd wrangler secret put GROQ_API_KEY
```

Paste the Groq key into that prompt, never into Codex, ChatGPT, `.env`, or Expo. Deploy and list secret names:

```powershell
npx.cmd wrangler secret list
npx.cmd wrangler deploy
```

Run locally with a private, ignored `cloudflare-worker\.dev.vars`:

```powershell
npx.cmd wrangler dev
```

Test health:

```powershell
Invoke-RestMethod "https://YOUR-WORKER.workers.dev/health"
```

Change the model by editing `GROQ_MODEL` in `wrangler.jsonc`, redeploying, and confirming it is supported on the Groq Models page. A 429 or `RATE_LIMITED` response means wait before retrying.

Rotate the Groq key by creating a new key in Groq, running `wrangler secret put GROQ_API_KEY`, testing, then revoking the old Groq key. Disable AI by setting `EXPO_PUBLIC_AI_FEATURES_ENABLED=false` locally and restarting Expo:

```powershell
npm.cmd run web
```

Confirm no secret entered Git:

```powershell
git grep -n -I -E "gsk_|GROQ_API_KEY="
```

The placeholder in `.dev.vars.example` is expected. A real `gsk_` value or real `GROQ_API_KEY=` assignment is not.
