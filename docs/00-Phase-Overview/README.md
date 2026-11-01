# Scope and approach

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## 1 What this phase is
P0 delivers a coherent project specification and implementation handoff, not an extension. P1 will establish editing feasibility before a production stack is locked. The target surface is a full-tab Chrome extension editor for individual document owners.

## 2 Locked product decisions
ADR-001: documentation first. ADR-002: original-language editing across digital/scanned/mixed PDFs. ADR-003: private code and free libraries preferred. ADR-004: all PDF processing on-device. ADR-005: eventual Store release and subscriptions. Basis: user conversation on 2026-11-01; see [decisions](../DECISIONS.md).

## 3 What we have to build
P1: sample classification, engine/license comparison, native text replacement and local OCR experiments. P2: import, inspect, select, edit, history, preview and export (REQ-001 through REQ-007); preserve language, text geometry and unsupported-state reporting. P3: image/vector handling, robust packaging and documented compatibility (REQ-008/009/011). P4: account/billing boundary (REQ-010). Data and contracts are defined in sections 06/07.

## 4 End-to-end flows
FLOW-001: choose PDF -> validate -> inspect pages -> select native text -> preview edit -> apply -> export copy -> reopen and verify.
FLOW-002: inspect scanned region -> choose OCR language -> local OCR -> review recognition -> edit -> preview image reconstruction -> export with approximation disclosure.
FLOW-003: missing glyph or overflow -> show cause -> provide font/adjust edit/cancel -> revalidate. Never silently shrink text or switch fonts.
FLOW-004: future paid feature -> sign in -> hosted checkout -> verified billing event -> refresh entitlement. Cancellation/network failure preserves local edits.

## 5 Rules
BR-001 local PDF data only; BR-002 capability-based support; BR-003 immutable original; BR-004 no silent language/font/layout conversion; BR-005 server-authoritative future billing. See [BRD](../02-BRD/README.md).

## 6 Roles and screens
Local user: import, edit, export, settings. Future account holder: account and billing. Future operator: account/payment support metadata only, no document access. Full screen states in [screens](../03-PRD/screen-specifications.md).

## 7 Out of scope
P0 excludes implementation. Early phases exclude accounts, subscriptions, cloud document storage, collaboration, translation, password cracking and guaranteed Word-like reflow. Cloud PDF processing is excluded in all phases. Complex PDF features may be view-only; no silent flattening.

## 8 Suggested build order
P0 docs -> P1 feasibility/license gate -> P2 complete editor flows -> P3 compatibility and Store candidate -> P4 subscriptions. Scans and multilingual support remain required product work, not removed from scope because P1 starts with native text. Duration TBD after engine spike and capacity assessment.

## 9 Acceptance criteria
P0: all numbered docs and seven entry files present; requirements linked to tests/tasks; sample findings recorded; unresolved choices visible. P1: actual edited exports reopen, removed text is absent in changed regions, unaffected content preserved, licenses and MV3 packaging tested. See AC-001 through AC-011 and [readiness](../BUILD_READINESS.md).

## 10 Next documentation step
Maintain [index](../README.md), [memory](../MEMORY.md) and [readiness](../BUILD_READINESS.md) with owner feedback and P1 evidence. Do not mark app requirements implemented because they are documented.

## 11 Revision history
0.1 / 2026-11-01: initial full suite based on user requirements, two inspected samples and official technical sources.
