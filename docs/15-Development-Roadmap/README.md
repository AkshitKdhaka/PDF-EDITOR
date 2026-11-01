# Development roadmap

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

| Phase | Outcome | Dependency | Exit evidence |
| --- | --- | --- | --- |
| P0 Documentation | Full suite and AI-kit handoff | User requirements and sample inspection | Coherent docs, links, traceability, explicit blockers; owner review pending |
| P1 Feasibility | License-compatible native replacement and local OCR experiments | P0; no paid dependency assumed | Actual exported edits, glyph/script probes, license inventory and packaged MV3 smoke results |
| P2 Local editor | Complete import/edit/undo/preview/export; native + scan pathways; same-language handling | Engine decision and P1 evidence | REQ-001..007 and core accessibility pass on declared support matrix |
| P3 Public release preparation | Content expansion, reliability, compatibility and Store package | P2 | REQ-008/009/011, private-data-free package, disclosures, authorized submission; approval separate |
| P4 Subscription product | Account, payment and entitlement flows | Product feasibility + Q-003 decisions | Verified sandbox billing, offline policy, security and recovery evidence before live charges |

No calendar forecast or cost promise: team capacity, engine complexity and provider costs unknown. P1 may reveal that broad private/free editing needs significant custom engine work. If so, present measured alternatives (narrow supported cases, budget licensed engine, or invest in custom writer) without changing confirmed constraints silently.

Milestones live here; current task status lives only in [MEMORY](../MEMORY.md). New requests must map to a requirement and phase; scope changes update acceptance, traceability and decisions together. Every implementation slice ends with verified behavior and updated handoff.

## Implementation evidence update: 2026-11-01
The earlier planning statements above describe the initial baseline. [TASK-002 evaluation](../08-Domain-Specific/engine-evaluation.md) now records an isolated PDFium/Tesseract prototype, native replacement and local scan round trips, an offline MV3 smoke pass, and non-Latin/font limitations. This is the current authority for executed checks. Full application acceptance, production API contracts and distribution remain unverified. Setup instructions and exact commands are in the [lab README](../../spikes/pdf-engine/README.md).
