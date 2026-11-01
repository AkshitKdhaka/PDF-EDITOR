# Project Memory

Project: [name]

This is shared repository state. It is separate from tool-specific
automatic memory and must remain portable across agents.
Last updated: [YYYY-MM-DD and time with time zone]
Repository and branch: [path/URL and branch, if available]
Revision or working tree: [commit or timestamp; uncommitted changes]
Active delivery mode: [plan only / build locally / prepare release / deploy]

## Current objective
[The user's latest authorized outcome and relevant scope limits.]

## Current state
- Implemented: [features with requirement IDs]
- Verified: [behavior, environment, revision and evidence links]
- Incomplete: [remaining requirements, integrations and checks]
- Deployment: [not deployed, preview or production; verified target]

## Active task
- ID and outcome: [TASK ID and complete user outcome]
- Status: Not started
- Requirements and acceptance: [REQ and AC IDs]
- Dependencies: [task IDs, decisions, credentials or input]
- Relevant files: [actual paths or planned files]
- Next action: [one concrete executable step]

## Ordered backlog
| ID | Outcome | Requirements | Depends on | Verification | Status |
| --- | --- | --- | --- | --- | --- |
| TASK-001 | [bounded outcome] | REQ-001 / AC-001 | [IDs] | TEST-001 | Not started |

[Keep acceptance details in PRD.md and test details in TEST_PLAN.md.
If the repository already has a canonical task tracker, link to its
tasks and keep only the active queue here; do not maintain two backlogs.]

## Latest work and checks
[What changed, file paths, test results and evidence links, diff review,
commit state, known pre-existing failures and checks not run.]

## Known issues and blockers
| ID | Issue and impact | Blocking | Owner | Resolution or next step |
| --- | --- | --- | --- | --- |
| ISSUE-001 | [issue] | Yes or No | [owner] | [action] |

## Pending assumptions and decisions
[Unresolved questions, reversible assumptions and ADR links.]

## Handoff
- Read next: [relevant docs and code paths]
- Resume from: [exact next task or diagnostic step]
- Useful commands: [verified commands or ARCHITECTURE.md section]
- Preserve: [user edits, constraints, known work in progress]
- Required input or authorization: [specific missing item, or none]
