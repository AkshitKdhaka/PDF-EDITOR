# Documentation Authoring Workflow

## 1 Inspect and establish evidence

Read the idea, references and existing project docs. Inventory relevant files. Separate confirmed requirements, observed implementation, proposals, assumptions and questions. Preserve the user's requested scope. A reference project's stack or sample features do not become requirements for the new product.

For version-sensitive capabilities, integration limits and technical choices, consult dated official sources. Verify significant market/pricing claims if used. If research access is unavailable, label the uncertainty. Never fabricate sources, interviews, approval owners, compatibility or measured performance.

## 2 Define the phase

Prepare the phase overview's eleven sections from confirmed scope. Its locked-decision table may say none confirmed yet. Record acceptance basis in docs/DECISIONS.md; proposals remain proposed. Ask about consequential gaps before claiming dependent specifications are ready.

Default to the full suite. Once scope is sufficiently clear, proceed without repeated permission to write ordinary sections. Continue independent work when a question blocks only part of the suite.

## 3 Select depth and applicability

Follow DOCUMENT_MAP.md. Keep core numbered topics recognizable. For an irrelevant topic, give a brief N/A reason and revisit condition. Do not invent a database, public API, authentication, mobile app or distributed architecture to fill a heading.

Add named specialist documents under 08-Domain-Specific when necessary. Adapt platform and integration documents to actual needs. A library may need function contracts rather than HTTP routes; a CLI needs command behavior rather than screens. Specify the active phase deeply; keep future plans bounded unless fuller detail is requested.

## 4 Author coherent specifications

Recommended order: phase overview and executive summary -> BRD -> PRD and interface details -> architecture/data/API/security together -> specialist/platform/integration docs -> blueprint -> design/testing/deployment -> roadmap/traceability/readiness/handoff. Revisit earlier sections when downstream detail reveals a conflict.

Replace every bracketed template field with a fact, labeled proposal, explicit question reference or reasoned N/A. Remove authoring prompts in completed documents. Repeat records for EVERY applicable requirement, screen, entity, operation and role; one example is not enough for a multi-feature product.

Requirements need actor/trigger, behavior, conditions, priority, phase and acceptance. Flows need success, alternate, denial, failure and recovery behavior. Specify enforcement boundaries, ownership, persistence and repeated/concurrent actions where relevant. Define calculation units, rounding, precision, time zones, identifiers, states and compatibility when they affect behavior.

Record feasibility spikes and validation criteria for uncertain providers/devices. Do not promise an integration works without evidence. Distinguish acceptance targets from measured results. Code and schema examples must agree with prose and be labeled proposed or verified.

## 5 Keep ownership and traceability

BRD owns business rationale/rules; PRD owns product behavior/acceptance; SAD owns component structure; Database Design owns storage schemas; API Specification owns contracts; Security owns access policy; Design System owns reusable presentation/interaction; Testing Strategy owns planned cases and evidence; Roadmap owns milestones; MEMORY.md owns current state; DECISIONS.md owns decision history.

Cross-link canonical definitions instead of rewriting competing versions. Contracts cannot introduce out-of-scope features. Screens cannot grant access denied by security. Tests must check the PRD's actual acceptance criteria. When decisions change, update affected docs and record supersession.

Use stable IDs such as GOAL-001, BR-001, REQ-001, AC-001, FLOW-001, SCREEN-001, API-001, ENT-001, SEC-001, TEST-001, ADR-001 and TASK-001. Preserve existing schemes. Maintain REQUIREMENTS_TRACEABILITY.md. Do not reuse retired IDs for unrelated records.

## 6 Use readable and honest status

Document statuses: Draft, In review, Accepted, Not applicable. Acceptance needs a recorded basis; finishing a document does not imply approval. Decision statuses: Proposed, Accepted, Superseded. Distinguish drafting, consistency review, owner acceptance, implementation and executed verification.

Metadata includes project, purpose, version, phase, status, actual date, owner or TBD and related files. Long documents need working navigation. Use relative Markdown links, clear headings, short paragraphs, bullets, tables for comparable records and checklists. Use consistent terms and format identifiers as code.

Preserve the phase narrative: decisions -> build list -> flows -> rules -> acceptance. Use plain-text step chains with -> unless the user asks otherwise. Do not inflate page estimates or equate document count with completeness. Estimates need capacity assumptions; a requested deadline is not a validated forecast.

## 7 Assess readiness

Apply QUALITY_CHECKLIST.md. Resolve contradictions in names, types, statuses, roles, priorities, phase assignments and interfaces. Check links and coverage. Record exact blockers and affected scope in BUILD_READINESS.md.

A phase is ready to implement only when its critical behavior, contracts, data/access rules and verification approach are sufficiently resolved. Independent tasks may be ready even if another scope is blocked. Setup commands can remain proposed until a repository exists; make their verification a first setup task. Software tests stay Not run until executed.

Do not claim production readiness, compliance, hardware compatibility or successful integration because it is documented. A documentation request does not authorize infrastructure installation, production changes or deployment.

## 8 Handoff and resume

Follow HANDOFF_TO_AI_KIT.md. Create useful seven-file summaries and links, keeping detailed numbered specifications canonical. Maintain full decision records and current state in their owning files. Identify the first ready task, related IDs, documents, dependencies and planned checks.

If interrupted, record drafted/reviewed/missing documents, current question, contradictions and exact next section in MEMORY.md. Do not declare completion while required docs are absent or contain unaddressed placeholders.
