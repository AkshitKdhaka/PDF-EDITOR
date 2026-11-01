# PDF specialist modules

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

PDF editing is the core feasibility risk. Read [editing and fidelity](pdf-editing.md), [sample assessment](sample-assessment.md), and [subscription boundary](subscriptions.md) alongside the data/contracts/security specifications.

Cross-module invariants: immutable source; canonical PDF geometry; same-language Unicode; no content upload; region-level capability; real removal/replacement; no silently changed forms, signatures or unrelated graphics. All application behavior remains unverified. [Research](../RESEARCH.md) records dated official sources.

## Implementation evidence update: 2026-11-01
The earlier planning statements above describe the initial baseline. [TASK-002 evaluation](../08-Domain-Specific/engine-evaluation.md) now records an isolated PDFium/Tesseract prototype, native replacement and local scan round trips, an offline MV3 smoke pass, and non-Latin/font limitations. This is the current authority for executed checks. Full application acceptance, production API contracts and distribution remain unverified. Setup instructions and exact commands are in the [lab README](../../spikes/pdf-engine/README.md).
