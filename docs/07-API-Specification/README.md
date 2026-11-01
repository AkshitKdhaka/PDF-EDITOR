# Internal and future service contracts

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Worker protocol (proposed v1)
Each request has `{protocolVersion:1, requestId:string, sessionId:string, baseRevision:number, operation:string, payload:object}`. Schema-validate both directions. Responses echo identifiers with either `ok:true, result` or `ok:false, error:{code,retryable,messageKey}`; errors never contain file text. Transfer ArrayBuffers deliberately; retain an immutable original in application memory. Reply only for matching session/revision. Unknown protocol -> UNSUPPORTED_PROTOCOL.

| ID | Operation | Input | Result and errors |
| --- | --- | --- | --- |
| API-001 | inspect | bytes ArrayBuffer; password optional ephemeral string | pageCount, dimensions, capability regions; INVALID_PDF, PASSWORD_REQUIRED, WRONG_PASSWORD, LIMIT_EXCEEDED, UNSUPPORTED |
| API-002 | previewEdit | pageIndex; regionId; replacement Unicode; fidelity; explicit font/fit choices | preview token tied to revision; affected quads; warnings; FONT_MISSING, GLYPH_MISSING, OVERFLOW, UNSUPPORTED |
| API-003 | commitEdit | preview token; commandId | next revision and command outcome; STALE_REVISION, INVALID_PREVIEW; duplicate commandId returns prior outcome without applying twice |
| API-004 | recognizeRegion | pageIndex; quad; languageModelId | recognized runs, confidence and model version; MODEL_MISSING, LIMIT_EXCEEDED, OCR_FAILED |
| API-005 | exportCopy | snapshot revision; explicit preservation choices | verified PDF bytes and warning codes; EXPORT_INVALID, PRESERVATION_UNSUPPORTED; do not download on invalid output |
| API-006 | cancel/dispose | target requestId or sessionId | cancellation/cleanup acknowledgment; cancellation idempotent; late reply ignored |

Region coordinates and entity fields are canonical in [data design](../06-Database-Design/README.md). Reject page indices outside range, nonfinite geometry, invalid transforms, out-of-page regions, unsupported operations and unbounded strings. Proposed per-edit maximum 10,000 Unicode code points; validate grapheme/shaping behavior separately. All edit commands validate capability at commit time, not only preview. Timeout values selected from P1 benchmarks; cancellation remains available.

## Future HTTP boundary (P4 only)
No endpoint exists now. Proposed: API-101 `GET /v1/entitlements` for authenticated subject only; returns feature keys, expiry and server version, no document information. API-102 `POST /v1/checkout` takes allowlisted planKey and idempotency key, maps account from session, returns provider URL. API-103 `POST /v1/billing/portal` takes no caller account ID and returns own-account portal URL. API-104 `POST /v1/webhooks/billing` accepts raw provider payload after signature/timestamp verification, deduplicates event ID and atomically updates state. Browser return URL cannot activate access.

Future errors: 401 signed out/expired, 403 denied, 409 conflict, 429 rate limited with Retry-After, 503 provider unavailable. Checkout retries reuse idempotency key; mutation endpoints validate origin/session and CSRF where cookies apply. Auth mechanism and provider-specific schemas remain Q-003; dependent implementation blocked. No upload API exists or is planned.

## Implementation evidence update: 2026-11-01
The earlier planning statements above describe the initial baseline. [TASK-002 evaluation](../08-Domain-Specific/engine-evaluation.md) now records an isolated PDFium/Tesseract prototype, native replacement and local scan round trips, an offline MV3 smoke pass, and non-Latin/font limitations. This is the current authority for executed checks. Full application acceptance, production API contracts and distribution remain unverified. Setup instructions and exact commands are in the [lab README](../../spikes/pdf-engine/README.md).
