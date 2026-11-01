# Data design and lifecycle

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Local-first storage
No server database for P1/P2. Document contents are memory-only by default. Proposed future opt-in local recovery uses IndexedDB with explicit disclosure and deletion controls; not enabled implicitly. Never use Chrome sync storage for documents. Preferences may use local extension storage, excluding filenames and PDF metadata.

| Entity | Fields / constraints | Owner and lifetime |
| --- | --- | --- |
| ENT-001 DocumentSession | sessionId random UUID; originalBytes immutable; revision nonnegative integer; pageCount positive; status inspecting/ready/editing/exporting/error/closed | Editor tab memory; release on close |
| ENT-002 PageCapability | sessionId + pageIndex unique; dimensions PDF units; crop/rotation; regionIds; kind native/scanned/mixed/unsupported; reasons string codes | Derived worker result per revision; discard stale |
| ENT-003 EditCommand | commandId UUID; sessionId; baseRevision; pageIndex; regionId; operation; replacement Unicode; style intent; fidelity exact/approximate; explicit choices | Editor history memory; redo invalidated by new branch |
| ENT-004 TextRun | regionId opaque stable within revision; Unicode mapping; font resource reference; glyph availability; transform; baseline; bounding quad; direction | Derived; never infer editable text from canvas alone |
| ENT-005 OcrRegion | pageIndex; PDF-space quad; language/model version; confidence nullable 0..1; reviewed flag; recognized text | Memory only; review required before apply |
| ENT-006 ModelCache | modelId + version unique; license; integrity digest; bytes; installedAt UTC | Local IndexedDB or packaged data; explicit delete; no document content |

IDs are opaque; indices zero-based; byte sizes integers; API timestamps ISO-8601 UTC; display local timezone. Geometry uses PDF user units (normally 1/72 inch, account for UserUnit), transformations include crop and rotation. Never round geometry until serialization/display; color spaces and alpha preserved or unsupported explicitly.

## Future billing entities (P4, proposed)
Account(accountId, providerSubject unique, email optional, createdAt); Subscription(subscriptionId, accountId FK, providerSubscriptionId unique, status, periodEnd UTC, cancelAtPeriodEnd); Entitlement(accountId + featureKey unique, validUntil, sourceVersion); BillingEvent(providerEventId unique, receivedAt, processedAt, outcome). Index subscription by accountId and events by processing state. No PDF fields, document hashes, filenames or document usage records.

Subscription states: pending/active/past_due/canceled/expired; map provider statuses explicitly after Q-003. Atomic event deduplication and entitlement updates; verify current provider state for ambiguous out-of-order events. Amounts, currency, tax and refund data remain provider-owned until business rules require a minimal mirror.

Future retention, account deletion, payment-record exceptions and backup retention require provider/jurisdiction decisions before P4 release. Migrations must be additive where possible, rehearsed on synthetic staging data and backed up before destructive changes. No migrations or database provisioning have run.
