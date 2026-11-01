# Reference Coverage and Generalization

This kit derives from the user's create-phase-docs.md and the structure/specification patterns of the Cash-Billout docs suite. Neither source is required to use this package.

## Phase Prompt

All eleven sections are retained in order: phase purpose, locked decisions, work breakdown, flows, rules, roles/screens, exclusions, build order, acceptance, next documentation step and revision history. Metadata, concise operational writing, comparable-record tables, consistent IDs and plain-text flows are retained.

The new kit intentionally defaults to the FULL suite, as requested. The source prompt defaulted to an overview unless the full suite was requested. Consequential missing inputs prompt questions; independent sections can proceed. Only confirmed choices are locked. Estimates and technical proposals remain labeled.

## Source Suite Mapping

| Reference category | Generalized destination |
| --- | --- |
| Executive summary and product vision | 01-Executive-Summary |
| Business requirements and rules | 02-BRD |
| Product requirements and screen details | 03-PRD and companion file |
| Software architecture and ADRs | 04-SAD plus canonical DECISIONS.md |
| Implementation blueprint | 05-Technical-Blueprint |
| Database | 06-Database-Design |
| API specification | 07-API-Specification |
| Printing architecture | 08-Domain-Specific when relevant; module recipe |
| Authentication and security | 09-Authentication-Security |
| Mobile architecture | 10-Client-Platforms as applicable |
| WhatsApp operations | 11-External-Integrations as applicable |
| Deployment and DevOps | 12-Deployment-DevOps |
| Testing | 13-Testing-Strategy |
| UI/UX | 14-UI-UX-Design-System |
| Roadmap and milestones | 15-Development-Roadmap |

The depth categories are retained while product-specific features, branding, infrastructure and schedules are removed. Traceability, explicit uncertainty, readiness and the unchanged-AI-kit handoff are added. This is not a claim that every technical detail in the reference has been independently validated.
