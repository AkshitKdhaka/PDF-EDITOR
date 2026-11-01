# Handoff to the Existing AI Project Kit

## Keep the kits separate

This kit creates specifications; the AI Project Kit guides building. Do not edit, repackage or overwrite AI_Project_Kit.zip or its reusable instructions/templates. Completed documentation goes into the actual project's docs/. The compatibility files below are generated project content, not changes to either kit.

## Seven project entry files

| Entry in project docs/ | Canonical detailed sources |
| --- | --- |
| PRD.md | 00-Phase-Overview, 02-BRD, 03-PRD and its screen specifications |
| ARCHITECTURE.md | 04-SAD, 05-Technical-Blueprint, 06-Database-Design, 07-API-Specification, relevant 08/10/11 topics and 12-Deployment-DevOps |
| DESIGN.md | 14-UI-UX-Design-System and 03-PRD/screen-specifications.md |
| TEST_PLAN.md | 13-Testing-Strategy, REQUIREMENTS_TRACEABILITY.md, BUILD_READINESS.md |
| SECURITY.md | 09-Authentication-Security and related specialist sections |
| DECISIONS.md | Canonical decision register; other documents link here |
| MEMORY.md | Canonical current state, active task queue, blockers and handoff |

The first five contain meaningful current-phase summaries, key constraints/IDs, open blockers and relative links. Bare links are insufficient. Detailed canonical definitions remain at the linked sources, which the agent must read for affected tasks. Do not copy entire contracts or schemas into summaries.

DECISIONS.md holds accepted/proposed product and technical decisions with basis and supersession. SAD summarizes and links those ADRs. MEMORY.md separates documentation status from implementation: for a new unbuilt project, Implementation not started and Tests not run.

Roadmap owns milestones; MEMORY.md owns the active small-task queue or links an existing canonical tracker. TEST_PLAN.md summarizes planned coverage and actual results, while cases/evidence stay in the testing document. Update summaries when canonical details change.

## Safe placement

Keep the two reusable kits in separate reference directories or attachments. Preserve existing populated project docs. When adding the AI Project Kit, do not copy its blank templates over completed documentation; use its existing operating instructions with the project's populated seven entry files.

## Start implementation with this prompt

```text
Use my existing AI Project Kit unchanged as your development workflow.
Use the generated project docs/ as the specification.
Start with docs/README.md, docs/BUILD_READINESS.md and docs/MEMORY.md.
Read the seven project entry files and follow their links for this task.
Preserve the numbered detailed specifications and accepted decisions.
Do not overwrite populated docs with blank kit templates.

Implement [first ready TASK-ID] within [agreed phase/scope].
If a blocker affects this task, explain it and continue only independent
authorized work. Implement, verify, review and update documentation.
Report actual test results, remaining limitations and the next action.
```

This supports the AI kit's expected paths without changing its instructions. File access and instruction-following still depend on the selected tool.
