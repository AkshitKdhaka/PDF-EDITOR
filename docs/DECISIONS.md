# Decision register

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

| ID | Decision | Status | Basis / consequence |
| --- | --- | --- | --- |
| ADR-001 | Document project before implementation; preserve reusable kits and put completed suite in docs | Accepted | User 2026-11-01 plus kit output contract; P0 only now |
| ADR-002 | Edit original language; target digital/scanned/mixed PDFs and other content | Accepted | User 2026-11-01; language/type breadth remains roadmap scope, exact universality unproven |
| ADR-003 | Keep source private; prefer free libraries initially | Accepted | User question reply 2026-11-01; engine license compatibility gate, no paid purchase authorized |
| ADR-004 | Always process PDFs on-device | Accepted | User question reply 2026-11-01; cloud OCR/storage/document telemetry excluded |
| ADR-005 | Eventually publish on Chrome Web Store and add subscriptions | Accepted | User 2026-11-01; future phases, not authorization for submission/spending now |
| ADR-006 | TypeScript/React MV3 editor with replaceable PDF/OCR adapters | Proposed | Engineering recommendation; native writer unresolved Q-001; versions unselected |
| ADR-007 | P1 feasibility before production engine and full UI | Accepted | User authorized next step on 2026-11-01; bounded spike now executed |
| ADR-008 | English application UI initially; document-language independent | Proposed | Reversible default; does not narrow original-language requirement |
| ADR-009 | Memory-only document sessions first; no backend until subscriptions | Proposed | Simplifies privacy and proof of concept; crash/tab-close recovery limited |

All records dated 2026-11-01; no supersessions. Accepted decisions describe requested scope/constraints, not implemented behavior. Proposed records need evidence or owner direction before being treated as consequential locked choices.

Alternatives for ADR-006/007: pdf-lib alone (fails body-text API requirement), MuPDF commercial (budget unresolved), AGPL distribution (conflicts with private-source direction), custom permissive writer (engineering risk). [Research](RESEARCH.md) supports the distinctions. No engine chosen. Revisit on TASK-002 evidence or an explicit change to budget/licensing constraints.

ADR-004 alternative cloud OCR rejected by user. Account/billing metadata transport is proposed for P4 and must remain separate from documents; finalize the account model in Q-003. ADR-009 local recovery storage revisited when actual crash recovery requirements justify the privacy/storage complexity.

## ADR-010: provisional PDFium/OCR engine direction
Date 2026-11-01; status Proposed for production, applied in isolated spike under user authorization. PDFium via @embedpdf/pdfium 2.15.1 plus Tesseract.js 6.0.1 is the preferred next implementation candidate after passing bounded native/scan/offline tests. Alternatives and licenses in [evaluation](08-Domain-Specific/engine-evaluation.md). Preserve private/local constraints. Production adoption requires glyph/overflow guards, worker isolation, broader fixtures and complete dependency/model notices. No paid license purchased. Revisit on unsupported content, shaping or license failures. Supersedes no accepted product constraint.
