# OX Leadership Coach — No-WebGPU Fix

This build completely removes WebLLM, WebGPU, model downloads, and GPU inference. It therefore avoids the reported Windows `DXGI_ERROR_DEVICE_HUNG` and `GPUDeviceLostInfo` path. It uses a local knowledge-retrieval and response-composition engine instead.

## Upload to GitHub
1. Extract this ZIP.
2. Open `https://github.com/theoxgroup/AI-Coach`.
3. Select **Add file > Upload files**.
4. Upload everything inside this extracted folder.
5. Replace `index.html`, `app.js`, `styles.css`, `ox_knowledge.json`, and `assets/oxLogo.png`.
6. Commit to `main` with: `Remove WebGPU and deploy reliable knowledge coach`.
7. Wait for GitHub Pages to redeploy, then hard-refresh the GitHub Pages site and Coursebox.

## Tradeoff
This version is reliable across ordinary browsers because it does not run a generative language model. It provides structured, context-matched leadership coaching from the bundled OX knowledge library. True generative AI without local GPU inference would require an external inference service or a browser/OS built-in model that is available on the learner device.
