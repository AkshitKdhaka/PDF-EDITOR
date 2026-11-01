# Private sample assessment

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Method and privacy
Read-only inspection on 2026-11-01 using bundled Python, pypdf and pdfplumber. All three pages were rendered at 80 dpi and visually inspected. No OCR, text modification, export round trip, signature validation or font-reuse experiment was performed. Original files were not modified. Source paths remain in the chat/local inspection helper; no personal text or screenshots belong in tracked docs. Use synthetic substitutes for CI and public demonstrations.

## Findings
| Fixture | Pages | Bytes | Observed structure | Implication |
| --- | --- | --- | --- | --- |
| sample-01 (DOC.pdf) | 1 | 1,432,047 | 594 x 840 PDF units; zero extracted characters; one page image; not encrypted | Image-only scan; OCR and actual image-region editing needed; noisy background makes exact reconstruction uncertain |
| sample-02 (resume) | 2 | 470,517 | Approximately 595.32 x 841.92 PDF units per page; 4,231 / 4,012 extracted characters; nine CID font resource names and four image objects per page; not encrypted | Native text route likely; font mapping, subset glyph coverage, text replacement and links still need testing |

Both visually contain predominantly English text. This does not validate other languages. Font resource names are not proof that fonts are reusable or include new characters. Image object counts are not a count of visible photos. Visual inspection confirms a scanned page and a dense two-page resume layout; personal information is intentionally omitted here.

## Fingerprints for reproducibility
- sample-01: SHA-256 `14e66dc9c5e5614eb12cd6b4d9eb559fc8caefd6e6e986718a6303dbc18e6b7e`.
- sample-02: SHA-256 `18e835da91464804e976785778052a9d08ccad6ee7a0d300bff5a6a416a9d2e4`.

## Next evidence
TASK-002: inspect actual font dictionaries/embeddings/mappings, then perform an authorized local proof of concept on copies or synthetic equivalents. Native test must remove old text, retain surrounding layout and reopen correctly. Scan test must recognize locally and visibly change pixels with approximation disclosure. The samples prove two input categories; they do not prove product feasibility for every PDF.

## Implementation evidence update: 2026-11-01
The earlier planning statements above describe the initial baseline. [TASK-002 evaluation](../08-Domain-Specific/engine-evaluation.md) now records an isolated PDFium/Tesseract prototype, native replacement and local scan round trips, an offline MV3 smoke pass, and non-Latin/font limitations. This is the current authority for executed checks. Full application acceptance, production API contracts and distribution remain unverified. Setup instructions and exact commands are in the [lab README](../../spikes/pdf-engine/README.md).
