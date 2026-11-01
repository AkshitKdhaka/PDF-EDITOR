# Test Plan and Verification

Project: [name]
Status: Draft
Last updated: [YYYY-MM-DD]

## Verification scope
[Critical behaviors, boundaries, risks and explicitly excluded checks
with reasons. Identify required release checks and their owner.]

## Test strategy
[Relevant unit, integration, end-to-end, manual, accessibility,
performance, security and release checks; explain their purpose.]

## Environment and test data
[Runtime and dependencies, isolated services, fixtures, roles,
test accounts, seeds, cleanup and secret provisioning references.]
[Use synthetic or approved data; do not expose real credentials.]

## Requirement coverage
| Requirement | Acceptance criterion | Test IDs | Coverage gap |
| --- | --- | --- | --- |
| REQ-001 | AC-001 | TEST-001 | [none or missing check] |
| SEC-001 | [security acceptance] | TEST-002 | [gap] |

## Test cases
### TEST-001
- Requirement and acceptance: [REQ/AC/SEC IDs]
- Type and priority: [type; required or optional]
- Preconditions and data: [setup]
- Steps: [repeatable actions]
- Expected result: [observable outcome]
- Automation or procedure: [test path or manual instructions]
- Cleanup: [how isolated test state is removed]

## User journey and environment matrix
[Where applicable: signup/login/logout; create/read/update/delete;
refresh and persistence; direct URLs; invalid inputs and credentials;
signed-out and cross-user access; empty data; slow/interrupted network;
loading/error/recovery states; keyboard and supported device checks.
Use project-specific targets; 375/768/1440 px are web examples only.]

## Commands
| Check | Working directory | Exact command | Prerequisites |
| --- | --- | --- | --- |
| [build or test] | [path] | [verified command] | [setup] |

## Execution evidence
| Date | Revision and environment | Check | Result | Evidence |
| --- | --- | --- | --- | --- |
| [date] | [revision; environment] | [ID or command] | Not run | [path] |

[For Fail or Blocked: actual result, cause if known, owner and next
step. Preserve relevant release evidence; identify the latest run.]

## Regression and release checks
[Required impacted regression checks; build/package validation;
preview verification; installation/deployment smoke checks; migration
and restore checks where relevant. Link operational procedures.]

## Release record
[Revision/artifact, preview result, production authorization basis,
target URL or package version, time, migration/configuration result,
smoke checks, rollback or recovery readiness and monitoring owner.
Record checks unsuitable for live execution and their preview evidence.]

## Exit criteria
[Required passes, unacceptable defects, permitted exceptions with
recorded authorization, and unavailable checks blocking completion.]
