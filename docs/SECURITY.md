# Security summary

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

SEC-001..006 cover local-only document data, hostile PDFs, extension privileges, actual edits/source preservation, dependency licensing and future billing integrity. No cloud fallback, document telemetry or synced documents. Current editor has no account/backend; future account server owns entitlements but never PDFs. Private sample files and previews must not be shipped. Offline synthetic browser probes observed zero external HTTP requests; comprehensive security tests remain unrun.

- [Canonical security controls](09-Authentication-Security/README.md)
- [Billing trust boundary](08-Domain-Specific/subscriptions.md)
- [PDF risks](08-Domain-Specific/pdf-editing.md)

Read [memory](MEMORY.md) for active task status and [decisions](DECISIONS.md) for accepted versus proposed choices.

## P1 evidence update
See [engine evaluation](08-Domain-Specific/engine-evaluation.md) for executed checks, exact scope and failures. No blanket requirement completion follows from these probes.
