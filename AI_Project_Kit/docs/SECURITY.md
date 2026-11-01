# Security Requirements

Project: [name]
Status: Draft
Last updated: [YYYY-MM-DD]
Security or risk owner: [owner or TBD]

## Assets and data classification
[Data collected, purpose, sensitivity, storage, access, retention,
deletion and exposure consequences. Minimize unnecessary collection.]

## Trust boundaries and threats
[Actors, entry points, untrusted inputs, external services, abuse
cases and boundaries where trust or privileges change.]

## Access matrix
| Role or actor | Resource and action | Conditions | Enforcement |
| --- | --- | --- | --- |
| [actor] | [read/write/admin] | [ownership or tenant rule] | [boundary] |

## Security controls
| ID | Threat | Required control | Acceptance check | Test |
| --- | --- | --- | --- | --- |
| SEC-001 | [actual risk] | [specific control] | [observable result] | TEST-002 |

## Identity and sessions
[If applicable: authentication, account recovery, session expiry,
revocation, privileged actions and protection against abuse.]

## Input and output handling
[Validation at trusted boundaries, safe database queries, safe output
encoding, file handling and controls relevant to the interfaces used.]

## Database and upload controls
[Where relevant: database privileges/access policies and their tests;
upload content type, maximum size, safe filename/storage handling and
rejection cases. Link the responsible components and TEST IDs.]

## Secrets and configuration
[Approved secret storage and provisioning, least privilege, rotation,
public versus private configuration, logging redaction and leak response.
Record variable names and procedures only, never secret values.]

## Feature-specific protections
[Assess applicable controls for browser requests, uploads, outbound
requests, webhooks, payment events, APIs, multi-tenancy, dependencies
and AI-generated actions. For AI features, define untrusted content,
tool privileges, data access and validation before consequential actions.
Mark irrelevant categories N/A with a reason.]

## Data and operational protection
[Transport/storage protections, environment isolation, audit events,
backup access, retention, deletion and recovery requirements.]

## Verification and unresolved risks
[Link controls to TEST_PLAN.md and evidence. Record each open risk,
severity, mitigation, owner, deadline and any authorized acceptance.]

## Incident procedure
[Contact or owner, containment, credential revocation/rotation,
recovery, evidence preservation, and notification decision process.]
