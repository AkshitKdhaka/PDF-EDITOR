# Document Map and Output Contract

The output is the actual project's docs/ folder. This kit's templates/docs/ contains scaffolds to populate, not completed project documentation.

| Output path | Responsibility |
| --- | --- |
| README.md | Index, status, reading order, scope, questions and owners |
| 00-Phase-Overview/README.md | Eleven-section scope and approach overview |
| 01-Executive-Summary/README.md | Problem, users, vision, value and success |
| 02-BRD/README.md | Business requirements, workflows, rules and constraints |
| 03-PRD/README.md | Feature behavior, validation, journeys and acceptance |
| 03-PRD/screen-specifications.md | Per-screen or user-facing interface detail |
| 04-SAD/README.md | Components, boundaries, data flows and technical architecture |
| 05-Technical-Blueprint/README.md | Setup, conventions, implementation patterns and slices |
| 06-Database-Design/README.md | Data, integrity, queries, lifecycle and migrations |
| 07-API-Specification/README.md | HTTP/event/CLI/library contracts as applicable |
| 08-Domain-Specific/README.md | Specialist-topic index and cross-module rules |
| 09-Authentication-Security/README.md | Identity if needed, access, threats and controls |
| 10-Client-Platforms/README.md | Actual platforms, devices, connectivity and distribution |
| 11-External-Integrations/README.md | Provider contracts, automation and failure handling |
| 12-Deployment-DevOps/README.md | Environments, releases, observability, recovery and operations |
| 13-Testing-Strategy/README.md | Cases, fixtures, procedures, evidence and release gates |
| 14-UI-UX-Design-System/README.md | Tokens, components, states, accessibility and conventions |
| 15-Development-Roadmap/README.md | Phases, milestones, dependencies, estimates and iteration |
| REQUIREMENTS_TRACEABILITY.md | Requirement to acceptance, design/contracts, tests and tasks |
| BUILD_READINESS.md | Reviewed readiness, blockers and first ready slice |
| PRD.md, ARCHITECTURE.md, DESIGN.md, TEST_PLAN.md, SECURITY.md | Summaries linking detailed sources |
| DECISIONS.md | Canonical consequential decision history |
| MEMORY.md | Current state, queue, blockers and handoff |

## Adaptation

For a new project, preserve this recognizable structure. Non-applicable numbered topics get a short reason and revisit trigger, not invented requirements. Add named specialist files under 08-Domain-Specific using DOMAIN_MODULE.md. For an existing suite, preserve its established paths and add a mapping rather than renaming everything.

Specify the active phase deeply enough to implement. Future phases can remain bounded plans unless fuller detail is requested. Distinguish a documented design from a verified provider/device capability.

This generalizes the supplied reference: printing becomes a selected domain module; mobile becomes applicable client platforms; messaging becomes applicable integrations. No POS, payment, printing, tenant model or vendor stack is automatically required.
