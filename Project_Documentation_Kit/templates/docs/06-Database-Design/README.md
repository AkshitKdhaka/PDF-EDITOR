# [Project Name] Data and Database Design

Specify persistence and lifecycle; explain N/A when no persistent data exists.

| Property | Value |
| --- | --- |
| Version | [version] |
| Status | Draft |
| Phase | [phase] |
| Updated | [YYYY-MM-DD] |
| Owner | [owner or TBD] |
| Related documents | [relative links] |

## Storage Scope

[Canonical stores, ownership, sensitivity and rationale.]

## Entities and Relationships

[Every ENT-ID, purpose, cardinality, invariants and requirement links; diagram or readable table.]

## Field Definitions

| Entity/field | Type/unit | Required/default | Constraint | Ownership/sensitivity |
| --- | --- | --- | --- | --- |
| [entity.field] | [type] | [rule] | [constraint] | [owner] |

## Lifecycle and Consistency

[States, transactions, concurrent updates, deduplication and referential integrity.]

## Queries and Indexes

[Access patterns, volumes and justified indexes; avoid unsupported performance guarantees.]

## Access and Isolation

[Privileges, user/tenant boundaries if present, trusted enforcement and TEST IDs.]

## Audit Retention and Deletion

[Retention basis, archive/soft/hard deletion, audit, backup implications and recovery.]

## Migrations and Seeds

[Order, compatibility, backfill validation, rollback limits and synthetic fixtures.]

## Schema Representation

[Concrete schema if stack decided; ensure it matches field tables. Clearly label design versus implemented schema.]

## Revision History

| Version | Date | Changes and basis |
| --- | --- | --- |
| [version] | [date] | [actual change] |
