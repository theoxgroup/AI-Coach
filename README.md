# OX AI Leadership Coach — Cloudflare-connected GitHub package

This static frontend is configured to call:

`https://ox-ai-coach.theoxgroup.workers.dev/api/chat`

The Cloudflare Worker performs AI inference. The browser does not use WebGPU or download a local model.

## Upload to GitHub

1. Extract the ZIP.
2. Open `https://github.com/theoxgroup/AI-Coach`.
3. Delete or replace the previous application files that imported WebLLM or used `navigator.gpu`.
4. Select **Add file > Upload files**.
5. Upload everything inside the extracted folder to the repository root.
6. Commit directly to `main` with: `Connect OX Coach to Cloudflare AI`.
7. Confirm **Settings > Pages** publishes from `main` and `/(root)`.
8. Wait for deployment, then hard-refresh the GitHub Pages site with `Ctrl+Shift+R`.

Expected repository layout:

```text
AI-Coach/
├── index.html
├── app.js
├── config.js
├── styles.css
├── ox_knowledge.json
├── README.md
└── assets/
    └── oxLogo.png
```

## Change the Worker URL

Edit `config.js` if the Worker URL changes.

## Required Cloudflare behavior

The Worker must:

- Accept `POST /api/chat`.
- Accept JSON properties: `question`, `sector`, `mode`, `resources`, and `history`.
- Return JSON: `{ "answer": "..." }`.
- Have a Workers AI binding named `AI`.
- Permit `https://theoxgroup.github.io` through CORS.

## Remove old files

Files no longer referenced by this frontend can be deleted, including old WebLLM bundles, `knowledge.json`, `master_expansion.json`, and `expanded_topics.json`. The app uses `ox_knowledge.json` only.
