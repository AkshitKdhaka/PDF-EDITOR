# Source Guide Coverage Audit

Audited against the supplied `Vibe Coding_ A Complete Beginner-to-Production Guide.docx` on 2026-09-20. This map covers all 39 numbered sections present in that file; its numbering jumps from 4 to 6. The source's file-purpose table is also covered. No missing section 5 has been invented.

The kit preserves each important workflow and file responsibility. Specific student-dashboard features, product rankings, visual values and vendor commands are examples, not universal requirements. Adaptations are stated below so completeness does not imply copying a fixed stack into every project.

Read this appendix when checking coverage, not at the start of every coding task. Locations without a `docs/` prefix refer to files in `reference/` or the root `START_HERE.md`.

| Source section | Source heading | Where covered | Treatment |
| --- | --- | --- | --- |
| 1 | The Complete Vibe Coding Workflow | WORKFLOW phase completion checks and sections 1 through 9 | Retained end to end |
| 2 | Step 1: Define What You Want to Build | docs/PRD.md: problem, users, goals, first release and exclusions | Retained; example product generalized |
| 3 | Step 2: Research Before Coding | WORKFLOW research; PRD evidence; ARCHITECTURE dependencies | Expanded feasibility, competitor comparison and dated evidence |
| 4 | Step 3: Choose Your AI Coding Tool | WORKFLOW tool selection; START_HERE capability fallback | Generalized from named products to verified capabilities |
| 6 | Recommended Beginner Stack | WORKFLOW planning; ARCHITECTURE technology choices; DECISIONS | Historical example retained below; stack is project-specific |
| 7 | Step 4: Install the Development Environment | WORKFLOW environment; ARCHITECTURE prerequisites and setup | Made explicit with versions, commands and optional tools |
| 8 | Step 5: Create Your Project | WORKFLOW directory, Git initialization, remote and baseline | Retained with existing-repository protection |
| 9 | Step 6: Create Your Project Documentation | START_HERE document map; seven docs templates | Retained and reconciled with existing documentation |
| 10 | Step 7: Create PRD.md | docs/PRD.md | Retained and expanded with traceable acceptance |
| 11 | Step 8: Create ARCHITECTURE.md | docs/ARCHITECTURE.md; WORKFLOW implementation rules | Retained component/data separation and folder ownership |
| 12 | Step 9: Create DESIGN.md | docs/DESIGN.md | Retained visual consistency, reusable tokens and UI states |
| 13 | Step 10: Create RULES.md | START_HERE; WORKFLOW supporting files and coding conventions | Role retained; existing RULES.md preserved when applicable |
| 14 | Step 11: Create TASKS.md | docs/MEMORY.md ordered backlog; WORKFLOW task loop | Role retained; existing canonical tracker/TASKS.md linked |
| 15 | Step 12: Create DECISIONS.md | docs/DECISIONS.md | Retained and expanded with supersession and decision basis |
| 16 | Step 13: Create MEMORY.md | docs/MEMORY.md | Retained current status, blockers and next action |
| 17 | Step 14: Create TEST_PLAN.md | docs/TEST_PLAN.md | Retained behavior, access and responsive checks |
| 18 | Step 15: Create SECURITY.md | docs/SECURITY.md; WORKFLOW security | Retained identity, authorization, secrets, database, input and uploads |
| 19 | Step 16: Create .env.example | WORKFLOW supporting files; ARCHITECTURE setup; SECURITY secrets | Retained placeholders, ignored local values and provisioning |
| 20 | Step 17: Give the AI Project Context | START_HERE startup instruction and modes | Retained read/understand/plan before code; plan-only remains available |
| 21 | Step 18: Build One Feature at a Time | WORKFLOW small complete flows | Retained understand/plan/implement/test/review/checkpoint |
| 22 | Step 19: Use Vertical Slices | WORKFLOW complete flows; traceability example below | Retained end-to-end integration and persistence |
| 23 | Step 20: Use a Structured Prompt | PROMPTS structured implementation request | All six fields retained explicitly |
| 24 | Step 21: Never Give AI Huge Tasks | WORKFLOW task scope; PROMPTS bounded outcome | Retained task decomposition within larger authorized scope |
| 25 | Step 22: Test Every Feature | WORKFLOW verification; TEST_PLAN commands and evidence | Retained lint/static/unit/integration/E2E/build as applicable |
| 26 | Step 23: Use End-to-End Testing | WORKFLOW user journey; TEST_PLAN environment matrix | Retained full flow, reload, edit/delete and logout where applicable |
| 27 | Step 24: Review AI-Generated Code | WORKFLOW diff review; PROMPTS review before release | Retained all review dimensions and review-only mode |
| 28 | Step 25: Learn How to Debug With AI | PROMPTS diagnose and fix; WORKFLOW focused debugging | Retained error/expected/actual/reproduction/constraints and root cause |
| 29 | Step 26: Use Git Throughout Development | WORKFLOW setup, branches, small commits and staging | Retained checkpoints; selective staging replaces blanket staging |
| 30 | Step 27: Prepare for Deployment | WORKFLOW release baseline checklist; TEST_PLAN exit criteria | Retained functionality, UI, security and code checks |
| 31 | Step 28: Deploy to Preview First | WORKFLOW local -> preview -> QA -> production sequence | Retained; clean release candidate equivalent for non-hosted software |
| 32 | Step 29: Deploy to Production | WORKFLOW release; ARCHITECTURE deployment; TEST_PLAN release record | Retained repository/artifact, configuration, target and verification |
| 33 | Step 30: Configure Environment Variables | WORKFLOW supporting files and environment isolation | Retained separate local, preview and production values |
| 34 | Step 31: Production QA | WORKFLOW live checks; TEST_PLAN journey matrix and release record | Retained actual target, direct URLs, refresh, devices and failure paths |
| 35 | Step 32: Monitor the Application | WORKFLOW after launch; ARCHITECTURE maintenance and feedback | Retained errors, analytics, performance, backups, uptime and iteration |
| 36 | Step 33: Maintain Project Documentation | WORKFLOW handoffs and README maintenance | Retained synchronized requirements, architecture, decisions, tasks and state |
| 37 | The Recommended Project Structure | START_HERE map; WORKFLOW supporting files; ARCHITECTURE structure | Retained docs/source/tests/config roles; no forced framework tree |
| 38 | What Each File Does | START_HERE ownership map; WORKFLOW supporting file mapping | Every listed file role accounted for |
| 39 | The Minimum Setup for Beginners | START_HERE proportional documents; WORKFLOW seven-file guidance | Adapted to user request: retain seven short docs with justified N/A |
| 40 | The Professional Vibe Coding Loop | WORKFLOW task loop and definition of done | Retained read/understand/plan/implement/test/review/fix/checkpoint/update |

## Source examples and their treatment

- The original tool examples are Replit, Lovable, Bolt, Cursor and Claude Code. Their inclusion is preserved here as source context, not a current ranking. The workflow now requires checking the chosen tool's actual capabilities and constraints.
- The original beginner stack is Cursor, Next.js, TypeScript, Tailwind CSS, PostgreSQL/Supabase, Supabase Auth, Git/GitHub, Playwright and Vercel. It remains a historical example; every project chooses and verifies an appropriate stack. This prevents unrelated projects from inheriting web-only requirements.
- Original setup examples include Git, Node.js LTS, npm, a browser and optional Docker, GitHub CLI, API clients and a database client. The environment phase preserves version checks, setup and optional-tool judgment without requiring them for every language.
- Original StudentHub examples illustrate accounts, notes, assignments and deadlines. Their reusable content is retained through scoped requirements, CRUD, access controls, persistence, test coverage and a complete user flow. These features are not automatically added to a new product.
- The visual sample uses Inter, semantic colors, button variants and a 12-pixel card radius. `DESIGN.md` retains explicit reusable typography, colors, spacing, radii, variants and states while allowing the project's actual style. Responsive examples of 375, 768 and 1440 pixels remain labeled examples.
- The original npm and deployment CLI commands illustrate verification and promotion. The kit requires actual project commands, target configuration and evidence; it does not assume those scripts or vendors exist. Blanket `git add .` is replaced with selective staging to preserve unrelated work and avoid accidental additions.
- The original separate `RULES.md` and `TASKS.md` responsibilities remain explicit. This kit uses the entry/workflow for general rules and `MEMORY.md` or the existing tracker for tasks; it does not create conflicting duplicates. `README.md`, `.env.example`, `.gitignore`, source, tests and manifests remain normal project files.
- The original plan-first and review-first prompts remain available through explicit modes. A build request can proceed from planning into authorized implementation without an unnecessary approval pause for each task.

## Worked example of traceability

Illustration only: `REQ-001` requires a signed-in user to save a note; `AC-001` requires it to remain after reload. Architecture defines validation, owner assignment and persistence. Design defines the form and its loading, error and success states. `SEC-001` rejects another user's direct access to the note. `TEST-001` checks save/reload; `TEST-002` checks unauthorized access. A significant storage choice is recorded as an ADR. `TASK-001` in memory links these IDs and becomes Done only after the required behavior and checks pass.

## Additions beyond the source

The kit adds explicit file ownership and conflict handling, requirement/test traceability, decision supersession, evidence-based status, migration and recovery planning, tool capability fallbacks, concise instruction loading and portable agent handoffs. These support the original workflow without requiring a particular vendor.
