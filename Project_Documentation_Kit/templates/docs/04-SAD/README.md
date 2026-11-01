# [Project Name] Software Architecture

Define system boundaries, components, interactions and technical tradeoffs.

| Property | Value |
| --- | --- |
| Version | [version] |
| Status | Draft |
| Phase | [phase] |
| Updated | [YYYY-MM-DD] |
| Owner | [owner or TBD] |
| Related documents | [relative links] |

## Context and Principles

[Actors, external systems, constraints and justified principles.]

## System Structure

[Text diagram, component responsibilities, boundaries and ownership.]

## Technology Choices

[Choice/version, Proposed or Accepted status, rationale, alternatives, official source/date and ADR link.]

## Client and Server Architecture

[Applicable clients/modules, dependency direction, state and separation of interface/business/data responsibilities.]

## Data and Trust Boundaries

[Data flow, ownership/isolation and authorization placement; link data/security specifications.]

## Critical Runtime Flows

[Trace REQ/FLOW IDs through components, external systems, failures and recovery.]

## Integration and Async Behavior

[Contracts, ordering, idempotency, retries, timeouts and queues/cache only if justified.]

## Quality and Evolution

[Workloads, capacity assumptions, availability, bottlenecks, migration compatibility and operations links.]

## Decision Summary

[Link canonical ADRs in ../DECISIONS.md; do not maintain competing records.]

## Revision History

| Version | Date | Changes and basis |
| --- | --- | --- |
| [version] | [date] | [actual change] |
