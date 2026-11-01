# Technical blueprint

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Current environment
Workspace contains two reusable kits and project documentation; no application package or Git repository existed at inspection. Windows PowerShell is available. Plain `python` was unavailable; bundled Python successfully inspected and rendered the supplied PDFs using pypdf/pdfplumber. No Node/package tooling, browser build or app startup has been verified yet.

## Proposed repository layout
`apps/extension/` for MV3 manifest and UI; `packages/pdf-core/` for adapter/contracts; `packages/ocr/` for local OCR; `packages/entitlements/` only when P4 begins; `tests/fixtures/` for synthetic distributable samples; `private-fixtures/` ignored; `docs/` specifications. This layout is proposed, not existing implementation.

## First implementation slice
TASK-002: verify runtime versions and initialize local version control; compare license-compatible candidates in an isolated spike. Probe native text removal/replacement with export, local OCR region edits, fonts and MV3/WASM loading. Record engine version, license, exact commands, package size, source/export hashes and screenshots. Stop engine selection if no candidate meets constraints; present evidence and options rather than silently relaxing private/on-device requirements.

TASK-003: create minimal extension that opens a local PDF in a full tab and returns capability report through API-001. Add validation/cancel/error handling first. TASK-004 then proves a complete native edit round trip before a broader toolbar is built.

## Conventions
Strict TypeScript proposed; typed discriminated worker messages; domain modules independent of React. No network calls in PDF/OCR packages. Store original bytes immutably; all modifications represented as revisioned commands. User errors get actionable messages; diagnostic logs exclude document content. Pin dependency versions and commit a lockfile after review.

## Commands
No install/dev/build/test scripts exist yet. During TASK-002 establish and actually run package-manager install, typecheck, focused tests, build and clean-profile extension load; record exact working-directory commands in root README. Do not report proposed `npm`/`pnpm` scripts as verified commands. No environment secrets required for local editor. Future P4 configuration is defined only after provider selection.

## Definition of done per slice
Requirement acceptance met, relevant failure paths tested, exported output independently inspected, no private fixture in artifacts, and MEMORY/TEST_PLAN/DECISIONS updated. Test tooling choices remain reversible; use meaningful geometry/content/security tests, not UI snapshots as proof of correct PDF editing.

## Implementation evidence update: 2026-11-01
The earlier planning statements above describe the initial baseline. [TASK-002 evaluation](../08-Domain-Specific/engine-evaluation.md) now records an isolated PDFium/Tesseract prototype, native replacement and local scan round trips, an offline MV3 smoke pass, and non-Latin/font limitations. This is the current authority for executed checks. Full application acceptance, production API contracts and distribution remain unverified. Setup instructions and exact commands are in the [lab README](../../spikes/pdf-engine/README.md).
