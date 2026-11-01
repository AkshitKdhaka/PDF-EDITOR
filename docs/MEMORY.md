# Project memory and task queue

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Current state
Updated 2026-11-01 (Asia/Calcutta). Workspace: D:/PROJECT/pdf editor. Mode: local feasibility build authorized by user. Git initialized (master; no commits or remote). Isolated PDFium/OCR lab implemented and tested; production editor not started; nothing deployed. Both reusable kits preserved.

Completed this session: read kit instructions and all seven AI templates; inspect/render both supplied PDFs (three pages); review official engine/Chrome/OCR documentation; write full project-specific suite. Detailed findings in [sample assessment](08-Domain-Specific/sample-assessment.md); documentation verification in [quality review](QUALITY_REVIEW.md).

## Active queue
| Task | Outcome | Requirements | Depends on | Verification | Status |
| --- | --- | --- | --- | --- | --- |
| TASK-001 | Draft full project docs and handoff | All planned scope | User requirements | Documentation coverage/link review | Done for initial draft; owner acceptance pending |
| TASK-002 | Compare permitted engines and prove native/OCR feasibility; initialize tooling/version control | REQ-001..004/006/007/009 | User authorized next step | Native/OCR exports, initial license inventory, offline MV3 smoke | Done for bounded feasibility; production adoption conditional |
| TASK-003 | Local import, viewer, capability classification | REQ-001 | TASK-002 | TEST-001 | Not started |
| TASK-004 | Native same-language text replacement and formatting | REQ-002/003 | TASK-003, Q-001 | TEST-002/003 | Not started |
| TASK-005 | Local OCR and visible scan-region editing | REQ-004 | TASK-003; OCR spike | TEST-004 | Not started |
| TASK-006 | History, verified export and source preservation | REQ-005/006 | TASK-004/005 | TEST-005/006 | Not started |
| TASK-007 | Privacy, failure handling, accessibility | REQ-007/011 | TASK-003..006 | TEST-007/011 | Not started |
| TASK-008 | Other content and compatibility expansion | REQ-008 | P2 | TEST-008 | Not started |
| TASK-009 | Store-ready package and release dossier | REQ-009 | TASK-007/008; Q-004 | TEST-009 | Not started |
| TASK-010 | Future account/billing implementation | REQ-010 | Q-003; proven editor | TEST-010 | Not started |

## Blockers and handoff
Q-001 now has a provisional PDFium candidate with passing bounded probes; full distribution license audit and guarded-edit behavior remain required. Q-002/005 block broad support/performance claims. Q-003 blocks billing only; Q-004 blocks Store submission only. Private/free and on-device constraints are confirmed and should not be asked again.

Next queued action: TASK-003 local import/viewer/classification, using provisional PDFium adapter and worker isolation; then guarded text editing in TASK-004. Read [readiness](BUILD_READINESS.md), [architecture](ARCHITECTURE.md), [domain](08-Domain-Specific/pdf-editing.md), [security](SECURITY.md), and tests. TASK-002 evidence and limitations are in [engine evaluation](08-Domain-Specific/engine-evaluation.md). Do not scaffold a production editor around an unproven overlay technique.

Local sample helper/previews are ignored under tmp/pdfs; source PDFs remain outside workspace and unchanged. Do not commit private documents or personal text. Root README and .gitignore are project files. Pinned dependencies, lockfile, reproducible scripts and unpacked lab now exist; no payment configuration or deployment. See [lab instructions](../spikes/pdf-engine/README.md).

## Latest verification (2026-11-01)
Native synthetic and private resume-heading replacement passed; original unchanged. Synthetic scan pixel-edit/OCR round trip passed. Private scan OCR completed read-only (accuracy unmeasured). Hindi/Arabic/CJK replacement into Latin font fails as expected and requires guards/fonts/shaping. Offline MV3 harness passed in Chromium 151.0.7922.34 with zero external HTTP requests and zero page errors. Independent pypdf extraction/geometry and visual renders checked. Broader application acceptance tests remain Not run; see [evaluation](08-Domain-Specific/engine-evaluation.md).
