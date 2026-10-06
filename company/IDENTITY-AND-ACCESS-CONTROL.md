# NexLabs Technology — Identity & Access Control

**Status:** `CANONICAL_WO_011`

## Identity model

Every material actor has attributable identity:
- Founder/human;
- AI role;
- agent run/session;
- service account;
- CI runner;
- executor adapter;
- external integration.

Shared privileged accounts are avoided where platform capability allows.

## Authorization formula

Effective authority is the strictest intersection of:
- company governance;
- role contract;
- Work Order/task;
- environment policy;
- resource scope;
- tool permission;
- time/value limits;
- explicit Founder approval when required.

## Default deny

Anything not explicitly permitted is denied.

Possession of a token/key does not equal permission.

## Access dimensions

Grants should be bounded by:
- action;
- repository/project;
- branch/environment;
- resource;
- data class;
- duration;
- value/amount;
- rate/volume;
- network/source when relevant.

## Privileged access

Privileged IAM changes require:
- explicit target identity;
- exact privilege delta;
- reason;
- approver;
- expiry/review;
- read-back verification.

No agent may approve its own privilege escalation.

## Break-glass

Emergency access, when implemented, must:
- be exceptional;
- be attributable;
- have short lifetime;
- notify Founder/security;
- generate immutable receipt;
- require post-incident review.

## Offboarding / replacement

Role/provider/session replacement must revoke:
- tokens;
- credentials;
- sessions;
- delegated scopes;
- temporary access.

Stable organizational role does not imply permanent credential reuse.

## Authentication

Prefer phishing-resistant MFA/passkeys/hardware-backed methods for high-value human accounts when supported.

Sensitive service integrations should use non-human service identities rather than personal credentials where feasible.

## Reviews

Access reviews should be periodic and event-driven:
- role change;
- provider replacement;
- incident;
- environment promotion;
- project closure;
- long-unused grant.
