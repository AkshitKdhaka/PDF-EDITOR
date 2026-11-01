# System architecture

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Proposed structure
Chrome action -> extension-owned full editor tab -> application state -> typed worker bridge -> PDF engine adapter / local OCR adapter -> preview and export bytes -> browser save-copy flow.

The MV3 service worker handles lightweight extension lifecycle only; it must not own long-running document processing or the sole copy of unsaved work. Editor workers handle CPU-heavy parsing/rendering/OCR. Page content is untrusted data, never executable HTML or extension instructions.

Proposed UI stack: TypeScript, React and Vite, selected as reversible development defaults pending TASK-002. Pin verified versions during setup. PDF.js may serve rendering/extraction; it is not assumed to be a text-replacement engine. Writing/removal engine is unresolved Q-001. pdf-lib may handle suitable auxiliary operations but cannot alone satisfy REQ-002 using its public APIs. MuPDF is not selected due to the private/free constraint; paid alternatives require an owner decision. No backend or database server in P1/P2.

## Boundaries and ownership
| Component | Owns | Must not own |
| --- | --- | --- |
| Extension shell | Manifest, tab launch, optional future permissions | PDF parsing or billing secrets |
| Editor application | Original bytes, operation history, selected revision, UI state | Trusted payment decisions |
| PDF adapter | Inspect, text mapping, preview, content change, serialization | Network access and user accounts |
| OCR adapter | Region bitmap recognition, language/model metadata | Cloud fallback or translation |
| Export validator | Reparse, changed-region extraction and warnings | Silent rasterization or source overwrite |
| Entitlement adapter (P4) | Feature permission interface | Document bytes, text or names |
| Billing service (P4) | Account ownership, verified events, entitlement | PDF processing or storage |

## Reliability and concurrency
One active document session per editor tab; no cross-tab shared document mutation. Monotonic revision increments on committed edit. Worker replies include request ID, session ID and revision; discard stale replies. Export locks a snapshot and is not affected by later edits. Cancel sends request ID; terminate/recreate worker when cancellation cannot interrupt a parser. Keep original and operation records outside worker so crash does not destroy committed in-memory history.

Geometry is canonical PDF user space with page crop/rotation transforms, not CSS pixels. The adapter maps selections through inverse viewport transforms. Canonical data is in [data design](../06-Database-Design/README.md); operations in [contracts](../07-API-Specification/README.md).

## Tradeoffs
Local processing preserves privacy but limits CPU/memory and OCR capability. Native content rewriting is complex: deleting a whole rectangle can damage unrelated content, and overlays leave source text intact. P1 must test actual content changes and overlapping elements. Maintain a narrow adapter boundary to replace an unsuitable engine without rewriting UI.

Operations/recovery: per-task resource caps, bounded worker queues, no full-document telemetry. Environment and release procedures are in [deployment](../12-Deployment-DevOps/README.md). Architecture remains proposed until feasibility results update ADR-006.

## Implementation evidence update: 2026-11-01
The earlier planning statements above describe the initial baseline. [TASK-002 evaluation](../08-Domain-Specific/engine-evaluation.md) now records an isolated PDFium/Tesseract prototype, native replacement and local scan round trips, an offline MV3 smoke pass, and non-Latin/font limitations. This is the current authority for executed checks. Full application acceptance, production API contracts and distribution remain unverified. Setup instructions and exact commands are in the [lab README](../../spikes/pdf-engine/README.md).
