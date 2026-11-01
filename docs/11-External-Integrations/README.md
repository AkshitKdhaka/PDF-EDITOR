# Integrations and dependency decisions

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

| Dependency | Proposed use | Decision and failure behavior |
| --- | --- | --- |
| PDF.js | Render/extract candidate | Verify current release/license and MV3 bundle in P1; not sufficient alone for true editing |
| pdf-lib | Optional PDF writing/forms | Public API does not replace page body text; cannot be sole engine for REQ-002 |
| Proprietary-compatible editing engine/custom writer | Actual content replacement | Q-001 unresolved; benchmark feasibility/cost before selection |
| MuPDF.js | Compared alternative | Not selected: AGPL/commercial model requires incompatible open-source obligations or paid license decision |
| Tesseract.js | Local OCR candidate | Requires rendered images rather than PDF input; bundle workers/WASM; model inventory and licenses; recognition needs human review |
| Chrome extension APIs | Local tab, storage if needed, packaging | Use minimum permissions; denied optional permission has manual fallback |
| Billing/identity provider | P4 only | Q-003 unresolved; no integration or credentials now |

No cloud OCR, generative document service or remote PDF API. Generic OCR data model acquisition may be designed separately with no document-derived payloads; initial spike uses local assets. Preserve usable edit state on any dependency failure; no silent fallback to lower fidelity or remote processing.

Sources and verification dates in [research](../RESEARCH.md). Exact package versions, integrity, licenses and sizes must be captured in TASK-002; library marketing claims do not prove compatibility with either user sample.

## Implementation evidence update: 2026-11-01
The earlier planning statements above describe the initial baseline. [TASK-002 evaluation](../08-Domain-Specific/engine-evaluation.md) now records an isolated PDFium/Tesseract prototype, native replacement and local scan round trips, an offline MV3 smoke pass, and non-Latin/font limitations. This is the current authority for executed checks. Full application acceptance, production API contracts and distribution remain unverified. Setup instructions and exact commands are in the [lab README](../../spikes/pdf-engine/README.md).
