# OX Sector Leadership AI

GitHub Pages chatbot aligned to the supplied OX six-week model for Healthcare, Higher Education, and Family & Private Enterprise. It uses WebLLM in the learner browser, needs no API key, and requires WebGPU plus an initial public model download.

## GitHub Pages
1. Create a public repository.
2. Upload all package contents to the repository root.
3. In Settings > Pages, choose Deploy from a branch, `main`, and `/(root)`.
4. Open the published URL and test Load AI model.

## Coursebox embed
If the Coursebox lesson editor permits an external iframe, paste:

```html
<iframe src="YOUR_GITHUB_PAGES_URL" title="OX Sector Leadership Coach" width="100%" height="900" style="border:0;border-radius:16px" loading="lazy" allow="clipboard-write"></iframe>
```

If external iframes are not available, use the GitHub Pages URL as an external lesson link.

## Content and licensing
The OX competency and pathway content in `knowledge.json` is based on content supplied by the project owner and should be treated as proprietary. External frameworks are referenced at a high level only. Review the selected AI model and WebLLM licenses before production use. Do not upload confidential data.
