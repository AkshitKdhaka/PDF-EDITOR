# Future subscription boundary

> Project: PDF Editor Extension | Version: 0.1 | Status: Draft | Updated: 2026-11-01 (Asia/Calcutta) | Owner: Project owner | Phase: P0 planning; P1 feasibility next

## Scope
REQ-010 is P4. The user wants future subscriptions, private code and always-local PDFs. No billing product, provider, account service, plan price or free quota has been selected. Source privacy is distinct from extension bundle visibility; installed JavaScript/WASM is inspectable by users.

## Proposed separation
PDF editor -> entitlement interface asking whether a feature is enabled. Account service -> identity and billing provider metadata only. No filename, document hash, extracted text, page image or PDF byte may be sent for billing, analytics or abuse detection. Provider secrets stay on server; extension receives only scoped account state.

## Lifecycle
Signed out -> sign in -> choose approved plan -> hosted checkout -> pending -> verified provider event -> active entitlement. Checkout canceled -> no change. Payment failed -> reconcile provider state and display status; never delete documents. Cancel-at-period-end -> retain paid access until policy/provider expiry. Refund, grace period and offline duration require Q-003 decisions. Sign out revokes session and clears entitlement cache; active local document remains available.

Server-backed paid services must enforce access server-side. Local-only premium features can be gated but cannot be made tamper-proof against a user controlling their machine. Offline expiry, clock rollback and revoked account behavior require explicit policy and tests before shipping; never make the local editor dependent on a fake network entitlement.

## Gate
Before P4: choose jurisdiction/provider and identity mechanism, approved plans/free behavior, cancellation/refund rules, retention and offline policy. Then finalize API-101 through API-104, migrations and TEST-010. Stage payment workflows with test accounts and verified webhooks. No paid service provisioning or live charges authorized in P0.
