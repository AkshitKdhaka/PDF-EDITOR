# Authentication and security

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Data and trust boundaries
PDFs, extracted text, images, OCR, embedded fonts and passwords may contain sensitive data. Keep in editor/worker memory; passwords never persisted. Model cache contains only generic model data. Future account tokens and payment metadata are separate. Private fixtures/previews remain ignored and must not ship.

| ID | Threat / required control | Acceptance / tests |
| --- | --- | --- |
| SEC-001 | Document leakage: no network APIs in processing packages; no payload/filename logs, crash uploads or document analytics | Inspect network in every operation/failure; TEST-007 |
| SEC-002 | Malicious files: validate parser inputs, caps and geometry; workers; never execute PDF JS/actions/embedded content | Crafted malformed/oversized inputs fail safely; TEST-001/008 |
| SEC-003 | Extension privilege abuse: minimal permissions, bundled code, restrictive CSP; validate message sender/schema and allowlist operations | Untrusted webpage messages rejected; package scan; TEST-009 |
| SEC-004 | False edits/data loss: source immutable, actual replacement, independent export checks, cancellation safety | Hash and extraction/render comparisons; TEST-002/005/006 |
| SEC-005 | Dependency/font licensing and supply chain: exact versions, lockfile, licenses, package audit, verified asset origins | Engine gate and release inventory; TEST-009 |
| SEC-006 | Future billing abuse: trusted server identity, ownership checks, webhook verification/idempotency, no secrets in extension | Forged/replayed/cross-user requests denied; TEST-010 |

## Access matrix
Local user: selected file and own tab session through explicit picker; no arbitrary disk scan. PDF/website content: no extension privileges. Worker: document operations only, no network. Future account holder: own account/entitlements only. Future operator: minimum account/support metadata, never documents. Billing provider: payment metadata only.

## Identity and secrets
Local P1/P2 editor needs no account. P4 identity provider/session mechanism is unresolved; use established flows and least-privilege tokens, expiration and revocation. No server keys in client bundles. Account logout and token revocation must not erase unsaved document work. Do not fabricate env variables before selecting services.

## Network and assets
All executable JS/WASM bundled for MV3. Model downloads, if later allowed, may carry only generic model identifiers/version; never document content. Prefer bundled/offline-installed initial models. Network policy must distinguish explicitly requested generic data acquisition from document processing; no cloud fallback. Public privacy disclosure must describe even local handling. API retries must not include document diagnostics.

## Risk register and response
High: unknown replacement-engine feasibility/licensing (Q-001); High: scan reconstruction and script coverage (Q-002); Medium: memory exhaustion (Q-005). Engineering owns mitigation, owner accepts any residual product limitation explicitly. Deadlines are phase gates, not invented calendar dates.

Incident procedure: reproduce using synthetic data, stop affected release, patch/update dependencies, communicate scope through support without requesting private documents by default. If future credentials leak, revoke/rotate and reconcile billing events. Preserve redacted operational evidence. No compliance certification, penetration test or monitoring service is claimed.
