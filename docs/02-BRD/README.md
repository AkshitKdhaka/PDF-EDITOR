# Business requirements

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Rules
| ID | Rule | Application |
| --- | --- | --- |
| BR-001 | Document data stays on-device | No PDF bytes, text, images, OCR output, file names or document-derived analytics sent to services |
| BR-002 | Describe actual support | Exact / approximate / unsupported at region level, supported-script matrix at release |
| BR-003 | Protect the source | Export new copy; never overwrite original automatically |
| BR-004 | Preserve user intent | No automatic translation, font substitution, clipping, reflow or rasterization without visible user choice |
| BR-005 | Billing state is authoritative on server | Future account entitlements derived from verified provider events, not client flags |
| BR-006 | License-compatible dependencies | Private product distribution; free preferred; paid purchases need an explicit owner decision |

## Journeys and business boundaries
The local user owns document selection and output. A canceled import leaves the current session unchanged; switching files with unsaved work requires export/discard/cancel. An unsupported file still gets a useful explanation without a false success result.

Future subscribers may purchase premium capabilities through a hosted account portal. Plan contents, free limits, trials, refunds, renewal rules, taxes and grace periods are undecided (Q-003). Do not invent quotas or implement a payment gate now. All money processing belongs to a selected payment provider; extension never handles card details.

Subscription readiness means modular feature entitlements and a replaceable account adapter, not a billing server during the editing spike. Since extension code is distributed to users, private repository access does not make shipped code secret or prevent local feature checks from being bypassed. No tamper-proof offline subscription claim.

Acceptance: AC-006/010 and SEC-001/006; licensing and cost evidence required at P1 and P4 gates. Owner manages commercial decisions; engineering records feasibility. See [PRD](../03-PRD/README.md).
