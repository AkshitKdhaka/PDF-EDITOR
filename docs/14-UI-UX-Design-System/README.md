# UI design system

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

Proposed visual system, not an approved mockup. Editor prioritizes document legibility with a restrained toolbar, page rail and contextual inspector. Do not rebuild the document itself as HTML and imply export fidelity.

| Token | Proposed value / use |
| --- | --- |
| background / surface | #F3F4F6 / #FFFFFF |
| text / secondary text | #111827 / #4B5563 |
| primary / focus | #1D4ED8; visible 2px focus ring with offset |
| error / warning / success | #B91C1C / #92400E / #166534, accompanied by text |
| UI font | system-ui, 14px default, 1.5 line height; independent of PDF font |
| Spacing | 4, 8, 12, 16, 24, 32px |
| Controls / radius | min 36px height; 6px radius |

Components: file dropzone with picker equivalent; page thumbnail list; toolbar buttons with text labels/tooltips; text editor respecting IME; style panel; fidelity badge exact/approximate/unsupported; progress with cancel; export review dialog; inline error with recovery action. Controls define hover, focus, disabled, busy and invalid states. Disabled actions explain why.

Keyboard access through a logical text-run list is required because canvas selection alone is inaccessible. Modal focus trap/Escape/return focus; status announced politely without reading private document text unexpectedly. Maintain text contrast target 4.5:1, control/focus contrast 3:1, test actual combinations. Support reduced motion and 200% UI zoom. Application UI initially English; document input uses native language and direction. No color-only errors.

Desktop layout target: page rail 180px, inspector 300px where space allows; collapse panels on smaller widths without hiding export/undo. Page zoom independent from UI zoom. Exact dimensions are proposals, verified through SCREEN-001 through SCREEN-007 and TEST-011. No visual implementation exists yet.
