# Project documentation

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Intent and status
Build a Chrome extension that edits letters, words, lines, images and other supported PDF content in the document's original language. Preserve typography and layout where possible, explain substitutions and unsupported content, and always save a new copy. Support digital, scanned and mixed PDFs through separate processing paths. No claim of universal exact editing is approved.

User-confirmed on 2026-11-01: document before building; private source; prefer free libraries initially; PDFs always stay on-device; eventual Chrome Web Store distribution; subscriptions later. Subscription account metadata is a proposed separate service, not permission to transmit PDF data. No deployment or spending has been requested.

## Reading order
1. [Memory and task queue](MEMORY.md), [readiness](BUILD_READINESS.md), [decisions](DECISIONS.md).
2. Seven AI-kit entry files: [PRD](PRD.md), [Architecture](ARCHITECTURE.md), [Design](DESIGN.md), [Security](SECURITY.md), [Test plan](TEST_PLAN.md), plus Memory and Decisions above.
3. Read the canonical detailed sections affected by each task.

## Full specification index
- [00 Phase overview](00-Phase-Overview/README.md)
- [01 Executive summary](01-Executive-Summary/README.md)
- [02 Business requirements](02-BRD/README.md)
- [03 Product requirements and acceptance](03-PRD/README.md), [screens](03-PRD/screen-specifications.md)
- [04 System architecture](04-SAD/README.md)
- [05 Technical blueprint](05-Technical-Blueprint/README.md)
- [06 Data design](06-Database-Design/README.md)
- [07 Contracts](07-API-Specification/README.md)
- [08 PDF specialist modules](08-Domain-Specific/README.md)
- [09 Authentication and security](09-Authentication-Security/README.md)
- [10 Client platforms](10-Client-Platforms/README.md)
- [11 External integrations](11-External-Integrations/README.md)
- [12 Delivery and operations](12-Deployment-DevOps/README.md)
- [13 Testing strategy](13-Testing-Strategy/README.md)
- [14 UI design system](14-UI-UX-Design-System/README.md)
- [15 Roadmap](15-Development-Roadmap/README.md)
- [Requirements traceability](REQUIREMENTS_TRACEABILITY.md), [research](RESEARCH.md), [quality review](QUALITY_REVIEW.md)

Detailed numbered files own specifications. MEMORY owns task status, DECISIONS owns choices, and TEST_PLAN links actual evidence. Update them together; do not create a second backlog inside either reusable kit.

## Open questions
| ID | Question / owner | Blocking scope | Next action |
| --- | --- | --- | --- |
| Q-001 | Which free, proprietary-compatible engine can truly replace text? Engineering | Production engine selection | TASK-002 evaluated PDFium; complete production guard and transitive license checks |
| Q-002 | Which language/script combinations meet fidelity targets? Owner + engineering | Public support claims, not multilingual architecture | English, Devanagari, Arabic and CJK synthetic probes; expand matrix from evidence |
| Q-003 | Subscription plans, price, country of business, provider and account model? Owner | P4 billing only | Decide after editing feasibility; no pricing invented |
| Q-004 | Brand, publisher account, support contact and release date? Owner | Store submission only | Resolve before release assets and privacy notice |
| Q-005 | Baseline machine, maximum file size and performance budget? Engineering + owner | Release limits | Benchmark representative hardware in P1; provisional caps in PRD |

Reversible assumptions: working name PDF Editor Extension; English application UI initially (document language is independent); desktop Chrome first; session-only editing before opt-in local recovery. No backend is needed for P1/P2.

P1 update: [engine evaluation](08-Domain-Specific/engine-evaluation.md) records passing bounded native/OCR/MV3 tests and open production gates.
