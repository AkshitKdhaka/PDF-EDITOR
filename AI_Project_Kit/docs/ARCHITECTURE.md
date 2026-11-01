# Architecture

Project: [name]
Status: Draft
Last updated: [YYYY-MM-DD]
Related decisions: [ADR IDs]

## System overview
[Major components, responsibilities, external systems and boundaries.
Include a simple diagram or a clear written request/data flow.]

## Technology choices
| Concern | Choice and version | Reason | Decision |
| --- | --- | --- | --- |
| [runtime or framework] | [verified version] | [need] | ADR-001 |

## Repository structure and conventions
[Actual or proposed directories, module ownership, naming, dependency
direction and where business logic, interface and data access belong.]

## Components and contracts
[For each component: inputs, outputs, responsibility and dependencies.]
[For each API, event, CLI or integration: schema, validation, errors,
access rules, compatibility and versioning when relevant.]

## Data model and lifecycle
[Entities, fields, types, constraints, relationships, ownership,
indexes driven by access patterns, retention and deletion behavior.]
[Identify canonical data and any cache or derived data.]

## Critical flows
[Trace important REQ IDs through interface, logic, access enforcement,
data storage and external services. Include failure and recovery paths.]

## Authentication and authorization placement
[Where identity and access rules are enforced. Link to SECURITY.md.]

## External dependencies
[Provider purpose, official reference and date checked, required
configuration, timeouts, failure handling, retries and rate limits.
Describe idempotency for operations that might be repeated.]

## Development tools and prerequisites
[Chosen agent/editor capabilities and constraints; required accounts,
OS, runtime, package manager, Git and verified version commands.
Record unavailable capabilities and the operator handoff if needed.]

## Environment and setup
[Supported OS/runtime, package manager, install and run commands,
working directories, environment variable names, safe defaults,
test-data setup and prerequisites. Never include secret values.]
[Link README.md, .env.example, ignore rules, lockfiles and branch
conventions. Record the result of the initial startup check.]

## Build and deployment
[Build/package commands, outputs, CI stages, preview/staging and
production targets, configuration boundaries and release procedure.]

## Migrations and recovery
[Migration order, compatibility, backup/restore, rollback constraints,
recovery procedure and verification. Use N/A with a reason if absent.]

## Operations
[Health checks, logs with redaction, metrics, alerts, owner, cost
constraints and operational runbook references as applicable.]

## Maintenance and feedback
[Owner and schedule or triggers for error/uptime/performance review,
backups and recovery checks, dependency updates and cost review.
Explain how user feedback becomes prioritized requirements or tasks.]

## Limitations and planned changes
[Known constraints, technical debt and relevant TASK or ADR IDs.]
