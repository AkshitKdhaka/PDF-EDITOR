# Task and Handoff Prompts

Use only the prompt relevant to the current work. Brackets are fields to replace.

## Structured implementation request

```text
CONTEXT: [product, relevant docs and current state]
TASK: [TASK-ID and one bounded outcome]
FILES: [known relevant paths; inspect before changing]
CONSTRAINTS: [scope, architecture, access and work to preserve]
ACCEPTANCE CRITERIA: [AC IDs or observable outcomes]
TESTING: [TEST IDs, meaningful checks and actual project commands]

Follow START_HERE.md. Plan the focused change, implement it, verify,
review and fix it, then update the relevant docs. Report changed files,
actual results, checks not run, remaining issues and the next action.
```

## Implement a task

```text
Follow START_HERE.md. Read docs/MEMORY.md, the relevant sections
of all seven project documents, and the existing implementation.
Implement [TASK-ID / requested outcome] within the agreed scope.
Use its acceptance criteria and linked checks. Preserve unrelated work.
Resolve reversible details using documented assumptions. Ask only about
blocking decisions. Implement, verify, review, fix and update the docs.
Report changes, actual test results, remaining limitations and next steps.
```

## Continue with a different agent

```text
Read START_HERE.md and follow its handoff reading protocol for docs/.
Inspect the repository and compare it with docs/MEMORY.md.
Confirm the current task, actual completed work, unresolved blockers,
latest verified revision and uncommitted changes. Correct stale status
using evidence. Resume the next ready task within the authorized scope.
Do not restart the project or replace accepted decisions without cause.
```

## Review before release

```text
Review the project against all seven docs/ files and the agreed scope.
Check requirement coverage, implementation, design, access controls,
test evidence, setup instructions and release/recovery procedures.
First report concrete findings with severity, evidence and affected
files or requirements. Distinguish implemented, verified and released.
In review-only mode, do not modify the project. If fixes are requested,
make focused fixes, repeat affected checks and update the documentation.
```

## Diagnose and fix a problem

```text
Follow START_HERE.md and inspect relevant project docs and code.
ERROR: [redacted exact error and logs]
EXPECTED BEHAVIOR: [what should happen]
ACTUAL BEHAVIOR: [what happens instead]
STEPS TO REPRODUCE: [ordered actions and test data]
ENVIRONMENT: [OS/runtime/browser, revision, target and recent changes]
CONSTRAINTS: [scope and protected work]
MODE: [diagnose only / diagnose and fix]

Reproduce the failure when possible. Identify the cause, responsible
files, supporting evidence, smallest fix and verification approach.
In diagnose-only mode, report findings without edits. In fix mode,
apply the focused fix, verify the original failure and regressions,
and update the relevant docs. Do not refactor unrelated code.
```

## Request a release

```text
Follow START_HERE.md and the release workflow.
Release scope and revision: [requirements and revision/artifact]
Target: [preview / production / package destination]
Authorization: [specific action already authorized]

Inspect test evidence, required configuration, secrets provisioning,
migrations, recovery and monitoring. Complete preparation and required
checks. If a consequential action lacks authorization, present the
concrete action and target for approval. If authorized and ready,
release and verify the actual destination. Update TEST_PLAN.md and
MEMORY.md with evidence, limitations and the operational handoff.
```
