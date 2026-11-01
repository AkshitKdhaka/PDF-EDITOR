# Build readiness

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Assessment
Documentation coverage: initial full draft complete; owner review pending. Planning is not software completion. P1 bounded feasibility evaluation is complete; see [evidence](08-Domain-Specific/engine-evaluation.md). PDFium is a provisional candidate for the next import/viewer slice. Production safeguards, broad compatibility, release and billing are not ready.

| Scope | Readiness | Exact dependency |
| --- | --- | --- |
| License/capability research and synthetic fixture design | Ready as first next work | Preserve private/free/local constraints |
| Isolated native/OCR editing spike | Executed; bounded probes pass | Broad scripts/scans and full transitive license audit remain open |
| Production text editor | Blocked | Q-001 production safeguards and full bundled-license audit; bounded replacement now demonstrated |
| Universal scripts/scans | Not a claim we can make | Q-002 tested support matrix and approximate-state policy |
| Performance limits | Provisional | Q-005 actual benchmark hardware/results |
| Store publication | Blocked for later phase | Built/tested package, Q-004 publisher/assets/disclosures and actual submission authorization |
| Subscriptions | Bounded design only | Q-003 commercial/identity/provider/offline policies |

## First implementation slice
TASK-002 maps REQ-001/002/003/004/006/007/009 to TEST-001/002/003/004/006/007/009. Deliver candidate/version/license comparison, native replacement export, local scan reconstruction export and Chrome packaging evidence. Use synthetic text rather than expose private samples. Fail gate if old text remains behind an overlay, font substitution is silent, document data leaves device or license conflicts with distribution.

No timing or budget accepted; bounded engine tests now pass; application-wide acceptance remains unrun. The documentation request is complete with explicit unresolved technical gates; no kit instruction requires pretending these are resolved. See [quality review](QUALITY_REVIEW.md) and [memory](MEMORY.md).
