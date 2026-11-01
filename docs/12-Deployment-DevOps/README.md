# Delivery and operations

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Environments
P1 local experimental extension only. P2 unpacked development build with synthetic fixtures. P3 versioned release candidate ZIP for clean-profile QA, then Store submission when authorized. P4 separate staging/production account services; no PDF services. No environment has been deployed.

## Build/release procedure
Pin runtimes and lockfile -> clean install -> types/lint -> focused PDF round-trip and security tests -> production bundle -> scan for private files, secrets, remote JS/WASM and license notices -> clean-profile install -> manual browser and independent-reader checks -> record artifact SHA-256/version/evidence -> prepare listing/privacy/support assets -> authorized Store submission -> record review result. Submission does not imply approval or publication.

Minimum permissions justified individually. Initial file picker flow should not require all-sites access. Bundle executable code and required WASM; configure appropriate CSP rather than remote scripts. Store disclosure covers local data handling too. Use synthetic marketing screenshots. Chrome version and optional PDF handler behavior must match declared minimum.

## Recovery
Original files remain untouched. If a release regresses fidelity, halt promotion, document affected operations and ship a corrected higher-version package; Store rollback is not assumed instantaneous. Preserve reproducible previous builds and compatibility tests. Local draft schema migrations, if later added, need backup/recovery tests before release.

## Operations
Owner/support contact TBD Q-004 before public release. Privacy-preserving diagnostics: version, error code and coarse environment only with disclosure; no file name, document content or source path. No analytics SDK by default. Review dependency/security changes before each release and react to critical advisories. Reports become reproducible synthetic fixtures and scoped tasks.

Future billing operations need webhook failure/reconciliation monitoring, rate limits, provider status handling, access audit and retention policy. Backup/restore applies to account data only. Operational alert thresholds and ownership must be finalized during P4; not configured now.
