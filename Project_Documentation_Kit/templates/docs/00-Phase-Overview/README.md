# [Project Name] [Phase Name]

## [One line describing what this phase delivers]

| Property | Value |
| --- | --- |
| Project | [name] |
| Document | [Phase] Scope and Approach Overview |
| Version | [version] |
| Status | Draft |
| Date | [YYYY-MM-DD] |
| Location | docs/00-Phase-Overview/README.md |

## 1 What This Phase Is

[Short description of what ships.]

| Surface | Who uses it | Purpose |
| --- | --- | --- |
| [surface] | [role] | [purpose] |

**Goal:** [one observable outcome]

## 2 Locked Product Decisions

| ID | Topic | Decision | Confirmation basis |
| --- | --- | --- | --- |
| [ADR-ID] | [topic] | **[confirmed choice]** | [user direction/date] |

[Only confirmed choices; state none confirmed where appropriate. Link DECISIONS.md. Proposals belong in the decision register with their status.]

## 3 What We Have to Build

### A [Area]

- [Concrete module/feature and REQ-ID]
- [Relevant entities, statuses and fields; canonical links]

[Repeat areas as needed; separate future work.]

## 4 End to End Flows

### 4.1 [FLOW-ID and name]

```text
[Trigger] -> [Action] -> [Validation] -> [Result]
[Failure or alternate condition] -> [Response] -> [Recovery]
```

[Cover important decision paths and reference requirements.]

## 5 Rules

| Rule ID | Rule | Behavior | Decision/requirement |
| --- | --- | --- | --- |
| BR-001 | [condition] | [testable behavior] | [IDs] |

## 6 Roles and Screens

[Per role: screen/command/operation and permitted actions. Summarize the full PRD.]

## 7 Out of Scope

- [Explicit non-goal or deferred capability]

## 8 Suggested Build Order

| Step | Focus | Depends on | Exit condition |
| --- | --- | --- | --- |
| 1 | [outcome] | [dependency] | [observable result] |

**Rough duration:** [range with capacity assumptions or TBD; never an invented promise]

## 9 Acceptance Criteria

### [Role or outcome group]

- [ ] [AC-ID: verifiable result; requirement/test links]

## 10 Next Documentation Step

[Link suite index, remaining specifications/questions and next authoring action. When finished, link readiness and handoff.]

## 11 Revision History

| Version | Date | Changes |
| --- | --- | --- |
| [version] | [date] | [actual change] |
