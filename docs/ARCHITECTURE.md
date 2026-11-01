# Architecture summary

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

Proposed MV3 full-tab editor, TypeScript/React UI and local PDF/OCR workers behind replaceable adapters. Immutable original, revisioned commands and verified new-copy export. No server for P1/P2; future billing service excludes document data. PDFium 2.15.1 is the provisional writer after bounded native/OCR/offline-MV3 probes; full license audit and safe glyph/overflow/worker handling remain unresolved. Reproducible lab commands are in the root README.

- [System architecture](04-SAD/README.md)
- [Blueprint/setup](05-Technical-Blueprint/README.md)
- [Data lifecycle](06-Database-Design/README.md)
- [Contracts](07-API-Specification/README.md)
- [Platforms](10-Client-Platforms/README.md)
- [Integrations](11-External-Integrations/README.md)
- [Operations](12-Deployment-DevOps/README.md)

Read [memory](MEMORY.md) for active task status and [decisions](DECISIONS.md) for accepted versus proposed choices.

## P1 evidence update
See [engine evaluation](08-Domain-Specific/engine-evaluation.md) for executed checks, exact scope and failures. No blanket requirement completion follows from these probes.
