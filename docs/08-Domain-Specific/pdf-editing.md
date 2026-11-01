# PDF editing, OCR and fidelity

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Domain model
A PDF is a positioned drawing program, not a Word document. Text may be split into individual glyphs, ligatures, subset-font codes or transformed runs; visually identical text can be outlines or pixels. Text extraction alone does not prove editability. The same page may mix native text, scanned images and hidden OCR text.

## Capability policy
| Content | Proposed path | Fidelity condition / fallback |
| --- | --- | --- |
| Native text with usable mapping/font | Replace targeted content operands; preserve graphics state and non-target content | Exact only after glyph/shape/layout validation |
| Subset/missing font | Reuse existing glyphs if valid; locally supplied licensed font or declared fallback | Approximate unless metrics and appearance verified; no silent substitution |
| Scanned text | Local OCR -> recognition review -> modify source image region -> compose output | Approximate; original font/background cannot be recovered exactly from pixels |
| Hidden OCR over scan | Update visible image and matching text layer together | Never claim success after changing only invisible text |
| Outlined text, complex vectors | Detect and offer view-only until dedicated support | OCR may assist recognition, not reconstruct exact vector semantics |
| Form fields | Separate field/appearance handling if supported | Keep interactive fields and canonical values consistent; no silent flatten |
| Signed/encrypted documents | Authorized password entry; signature impact explanation | Editing invalidates signatures; no bypass; unsupported preservation blocks |

Do not replace text by placing a white rectangle over it: the old content can remain selectable and backgrounds may be damaged. Redaction followed by replacement also needs targeted geometry and overlap tests; broad removal can erase neighboring content. Font embeddings may lack required glyphs and may carry redistribution restrictions.

## Multilingual handling
Keep document language; no translation service. Preserve Unicode and grapheme clusters; map glyph clusters to logical text, use bidi and shaping for RTL/Indic scripts, and handle CJK metrics. Font substitution must support the entire edited run and retain user-visible disclosure. Input method composition must complete before preview/commit. P1 script set is a probe set, not a narrowed English-only product requirement.

## Geometry and fidelity acceptance
Use PDF-space quads, crop boxes, rotation and UserUnit. Test selection at 50/100/200% zoom and rotated pages. For exact-mode synthetic tests, preserve original font resource when usable, point size, fill, text transform and baseline within 0.25 PDF point; unaffected content render should be identical using the same deterministic renderer except a one-pixel antialias boundary around edited quads at 144 dpi. These are proposed acceptance tolerances, not observations. Independent reader visual check is also required.

Longer replacement: default preserve font size, preview overflow, let user shorten or explicitly choose line wrapping/resizing. Never silently change adjacent paragraphs. Scan reconstruction must expose before/after region preview; textured/noisy backgrounds may remain unsupported rather than pretending exactness. OCR confidence is engine-specific and cannot be treated as a universal accuracy guarantee.

## Safety, operations and evidence
Local workers, resource caps and cancel/dispose contracts. Never execute PDF JavaScript/actions or automatically open embedded links/files. Exclude private fixtures from public builds. TEST-002/003/004/006/008 cover this module. Release support matrix records input class, script, engine version, fixture, result and known failures. Revision 0.1 drafted 2026-11-01; no editing engine selected.

## Implementation evidence update: 2026-11-01
The earlier planning statements above describe the initial baseline. [TASK-002 evaluation](../08-Domain-Specific/engine-evaluation.md) now records an isolated PDFium/Tesseract prototype, native replacement and local scan round trips, an offline MV3 smoke pass, and non-Latin/font limitations. This is the current authority for executed checks. Full application acceptance, production API contracts and distribution remain unverified. Setup instructions and exact commands are in the [lab README](../../spikes/pdf-engine/README.md).
