# Screen specifications

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

| ID | Surface / actors | Controls and success | Loading, failure and recovery |
| --- | --- | --- | --- |
| SCREEN-001 | Import / local user | File picker, drag/drop, supported limits, privacy statement; open into editor | Empty state; validating progress/cancel; password modal; wrong password retry; corrupt/large/unsupported explanation; current session retained |
| SCREEN-002 | Editor / local user | Page rail, zoom, select/edit tools, accessible text list, undo/redo, export; active page and unsaved status | Lazy page render; no editable text -> OCR action; worker failure -> retry; switch -> export/discard/cancel |
| SCREEN-003 | Text inspector / local user | Source text, replacement, font/style facts, fidelity badge, overflow choices, apply/cancel | IME composition does not commit prematurely; unsupported glyph or source mapping blocks exact apply; explicit alternate font opt-in; Escape cancels |
| SCREEN-004 | Scan/OCR / local user | Language selection, region, progress, recognized text review, original/new preview | Missing language model -> local installation/data acquisition policy; no automatic cloud OCR; low confidence demands review; cancellation frees worker resources |
| SCREEN-005 | Export review / local user | Changed-page preview, fidelity summary, signature warning, save-copy name | Verifying state; damaged output blocked; download canceled/rejected retains unsaved changes; retry same revision |
| SCREEN-006 | Settings / local user | Local model inventory, clear cached models, privacy/about/licenses | Deletion failure visible; clearing models does not delete open document; document recovery storage not offered until implemented |
| SCREEN-007 | Account/billing / future subscriber | Sign-in, plan state, hosted checkout/portal, sign-out | Not present P1/P2; network/auth failures never upload PDF or discard edits; pending payment waits for server entitlement |

FLOW-001 connects 001 -> 002 -> 003 -> 005. FLOW-002 connects 002 -> 004 -> 005. FLOW-003 stays in 003 until resolved. FLOW-004 uses 007 only in P4. All modals trap focus and return focus to their trigger. Errors identify the affected page/region without leaking contents into logs. Keyboard shortcuts must not override browser shortcuts or IME input; menu alternatives always available.

No paid controls are shown before actual plans exist. No fabricated progress percentages: show indeterminate work when total work is unknown. Use text and icon for fidelity status, never color alone. See [design system](../14-UI-UX-Design-System/README.md).
