# Research and evidence register

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

Checked 2026-11-01. Official project/vendor sources establish capabilities and constraints, not proof our implementation works. Package versions and license review remain P1 work.

| Source | Finding / project consequence |
| --- | --- |
| [pdf-lib limitations](https://github.com/Hopding/pdf-lib#limitations) | Public APIs do not edit/remove ordinary existing page text; auxiliary writing library only unless additional engine work proves support |
| [MuPDF.js FAQ](https://mupdfjs.readthedocs.io/en/latest/faq/index.html) | Browser/WASM rendering, extraction and PDF manipulation; AGPL/commercial options; not selected for private/free plan |
| [Tesseract.js FAQ](https://github.com/naptha/tesseract.js/blob/master/docs/faq.md) | OCR accepts images, not PDF directly; rasterization and local model/worker packaging needed |
| [Chrome MV3 code rules](https://developer.chrome.com/docs/webstore/program-policies/mv3-requirements) | Bundle executable logic; remote code unsuitable for extension release |
| [Chrome CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy) | WASM requires appropriate extension CSP; default disables it; test packaged workers |
| [Chrome PDF handler](https://developer.chrome.com/docs/extensions/reference/manifest/mime-types-handler) | Public PDF MIME handling documented as of Chrome 151; optional/version-gated, manual import baseline |
| [Chrome privacy requirements](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq) | Local-only data handling also requires disclosure; prepare accurate privacy policy before Store release |
| [Adobe font guidance](https://adobe-type-tools.github.io/font-tech-notes/pdfs/AcrobatDC_FontPolicies.pdf) | Font embedding/reuse constraints require care; source from earlier feasibility review, detailed font analysis still pending |

No vendor pricing, competitive market claims or universal language support accepted. A Chrome payments documentation URL returned 404 during research and is not used as authority; select and verify billing approach in P4. Owner-provided PDFs inspected locally; [assessment](08-Domain-Specific/sample-assessment.md) records observations without personal text.
