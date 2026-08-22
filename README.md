# OX AI Leadership Coach — Low-Memory Fix

This build addresses browser GPU device-loss errors by:

- Switching from `Llama-3.2-1B-Instruct-q4f32_1-MLC` to the lower-memory `Llama-3.2-1B-Instruct-q4f16_1-MLC` model.
- Retrieving only the top 3 knowledge entries.
- Limiting output to 300 tokens.
- Keeping only the latest conversation turn.
- Automatically unloading the model after a GPU failure.
- Providing a built-in knowledge fallback, so learners still receive guidance if WebGPU fails.

## Replace files in GitHub

1. Extract the ZIP.
2. Open `https://github.com/theoxgroup/AI-Coach`.
3. Choose **Add file > Upload files**.
4. Upload everything inside this folder.
5. Replace the old `index.html`, `app.js`, `styles.css`, `ox_knowledge.json`, and `assets/oxLogo.png`.
6. Commit to `main` with: `Fix WebGPU memory issue and add fallback`.
7. Wait for GitHub Pages to redeploy.
8. Test the GitHub Pages URL directly, then test it inside Coursebox.

The first model load still requires internet access and a WebGPU-compatible browser. On constrained devices, the deterministic knowledge fallback will operate without the model.
