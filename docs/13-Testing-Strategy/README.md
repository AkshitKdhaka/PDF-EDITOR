# Testing strategy

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Strategy and evidence
No application tests have run because no application exists. Read-only PDF inspection is evidence about samples only. Meaningful checks: pure geometry/Unicode unit tests; real engine round trips; browser MV3 integration; keyboard and visual review; resource/privacy/security failure tests. Use synthetic fixtures in repository/CI and optional private local samples outside artifacts.

## Cases
| Test | Setup and procedure | Expected / phase |
| --- | --- | --- |
| TEST-001 | Exercise REQ-001: import and classify, including the specified failure/cancel paths | Both supplied samples classify correctly; rejected imports leave prior edits intact. / P1/P2 |
| TEST-002 | Exercise REQ-002: replace existing text, including the specified failure/cancel paths | Changed-region extraction contains replacement and no removed original; no duplicate hidden text; unrelated text and graphics unchanged. / P1/P2 |
| TEST-003 | Exercise REQ-003: preserve formatting and language, including the specified failure/cancel paths | Exact mode retains source style and geometry; missing glyph blocks exact mode; approximate choice is labeled; longer text cannot clip silently. / P1/P2 |
| TEST-004 | Exercise REQ-004: edit scans with local ocr, including the specified failure/cancel paths | OCR runs without sending document data; user corrects recognition; scan export changes actual pixels rather than only invisible OCR text; background mismatch is disclosed. / P1/P2 |
| TEST-005 | Exercise REQ-005: history and session safety, including the specified failure/cancel paths | Undo/redo restores expected revisions; import/export cancel preserves document; crash recovery is not promised for memory-only sessions. / P2 |
| TEST-006 | Exercise REQ-006: export and verify, including the specified failure/cancel paths | Source hash unchanged; output opens in independent reader; page count/dimensions retained unless explicit page edit; failed export retains edits and exposes retry. / P1/P2 |
| TEST-007 | Exercise REQ-007: on-device privacy, including the specified failure/cancel paths | Network capture shows zero document-related outbound payloads during import, render, edit, OCR and export, including failures. / All |
| TEST-008 | Exercise REQ-008: other content and pdf variants, including the specified failure/cancel paths | Each advertised operation has a tested fixture; unsupported content stays intact or blocks export; no password bypass or accidental form flattening. / P3 |
| TEST-009 | Exercise REQ-009: chrome store distribution, including the specified failure/cancel paths | Clean-profile install and edit/export work; package audit passes; store submission and approval are separate recorded states. / P3 |
| TEST-010 | Exercise REQ-010: future subscriptions, including the specified failure/cancel paths | Duplicate/out-of-order events do not duplicate entitlement changes; cross-user access denied; sign-out purges account cache but not current local edits. / P4 |
| TEST-011 | Exercise REQ-011: accessible and responsive editor, including the specified failure/cancel paths | Core import/edit/export works without pointer; 200% UI zoom does not hide actions; OCR and worker tasks cancellable without losing edits. / P2/P3 |

## Repeatable core procedures
TEST-001: import native, scan, mixed, wrong-type, corrupt, oversized and password fixtures. Verify classification per region; cancel or bad password must retain prior session.
TEST-002/003: replace short/long strings, punctuation, missing glyph, ligature, Indic cluster, Arabic RTL and CJK run. Compare extracted target text, style and unchanged regions. Test rotated/cropped pages and overlapping graphics. Selection at multiple zooms maps to same PDF quad. Reject unsupported glyphs and overflow rather than clipping.
TEST-004: synthetic clean/noisy/skewed scans and hidden OCR layers. Disconnect network after assets installed; recognize chosen script; correct recognition; change visible pixels; ensure old hidden text is updated/removed. Compare before/after and expose approximate result. Cancel worker mid-task.
TEST-005/006: commit multiple edits, undo/redo, branch history, export frozen revision, simulate worker failure and download rejection. Hash original before/after. Reparse output and open independently (Chrome plus another PDF reader); compare page dimensions/count, unedited content, links and forms. Signed input must display signature-impact warning. Clean up exported synthetic outputs after retaining redacted evidence.
TEST-007/009: inspect devtools network with distinctive synthetic marker text during every flow/error; no document data/name/hash sent. Inspect ZIP for remote executable loading, secrets and private samples. Attempt untrusted sender messages. Install release bundle in fresh Chrome profile with networking unavailable; core operations work using installed assets.
TEST-008: image movement/replacement, vector unsupported states, encrypted/signature/form/attachment fixtures; no silent loss. TEST-010: sandbox provider duplicated/reordered/forged events, expired sessions, cross-user IDs, checkout canceled, offline entitlement; remains Not run until P4. TEST-011: keyboard-only full journey, focus order, announcements, contrast and 200% UI zoom.

## Performance and matrix
Record OS, CPU/RAM, Chrome, engine version, file bytes/pages, decoded pixel load, duration and peak memory. Use proposed PRD caps and budget; lower caps explicitly if evidence requires. English, Devanagari, Arabic and CJK are initial probe fixtures; expand before additional support claims. Include native, scan, mixed, subset fonts, outlines, transparent backgrounds, rotations and malformed documents. Private English samples do not establish multilingual coverage.

## Commands and exit gate
No app test/build commands exist. TASK-002 must establish exact commands and record outputs/revision. Required release: every advertised capability passes, no unresolved data loss/leakage, all relevant tests pass, known limitations documented and owner-reviewed. Failing fidelity cases cannot be hidden by a changed test expectation.

## Execution log
2026-11-01: bundled Python inspection/render of three sample pages: completed; see sample assessment. Documentation link/coverage verification: recorded separately in QUALITY_REVIEW. TEST-001 through TEST-011: Not run. No extension install, payment event, Store submission or release verification performed.

## Implementation evidence update: 2026-11-01
The earlier planning statements above describe the initial baseline. [TASK-002 evaluation](../08-Domain-Specific/engine-evaluation.md) now records an isolated PDFium/Tesseract prototype, native replacement and local scan round trips, an offline MV3 smoke pass, and non-Latin/font limitations. This is the current authority for executed checks. Full application acceptance, production API contracts and distribution remain unverified. Setup instructions and exact commands are in the [lab README](../../spikes/pdf-engine/README.md).
