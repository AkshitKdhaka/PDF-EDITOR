# [Project Name] Authentication and Security

Specify relevant threats and protections even when login is not required.

| Property | Value |
| --- | --- |
| Version | [version] |
| Status | Draft |
| Phase | [phase] |
| Updated | [YYYY-MM-DD] |
| Owner | [owner or TBD] |
| Related documents | [relative links] |

## Assets and Threat Model

[Sensitive data, actors, entry points, trust boundaries and realistic abuse.]

## Identity and Sessions

[If needed: registration/login/recovery, verification, expiry/revocation and privileged actions. Otherwise explain no authentication.]

## Access Matrix

| Actor | Resource/action | Conditions | Trusted enforcement | Denial test |
| --- | --- | --- | --- | --- |
| [role] | [operation] | [ownership] | [component] | [TEST-ID] |

## Security Controls

[Every SEC-ID: threat, specific control, component, observable acceptance and tests.]

## Input Output and Files

[Validation, safe queries/output, uploads and outbound requests where relevant; link contracts.]

## Secrets and Data Protection

[Provisioning, safe variable names, storage, rotation, transport/storage controls, redaction and retention/deletion. No actual secret values.]

## Audit and Incidents

[Events, access, retention, alerts, response owner, containment and recovery.]

## Verification and Open Risks

[Tests, severity, mitigation, owner, risk acceptance basis and release blockers; no unsupported compliance claims.]

## Revision History

| Version | Date | Changes and basis |
| --- | --- | --- |
| [version] | [date] | [actual change] |
