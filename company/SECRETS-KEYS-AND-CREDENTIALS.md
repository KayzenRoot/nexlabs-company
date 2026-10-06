# NexLabs Technology — Secrets, Keys & Credentials

**Status:** `CANONICAL_WO_011`

## Never-store locations

Secrets must not enter ordinary agent context. Agents may receive a secret reference or narrowly brokered capability, but not the raw secret unless an explicitly isolated high-assurance execution boundary requires it.

Secrets must not be committed or pasted into:
- Git;
- issues/PRs;
- prompts;
- agent memory;
- screenshots/evidence;
- logs;
- documentation examples;
- analytics traces.

This includes API keys, passwords, private keys, seed phrases, signing keys, recovery codes and bearer tokens.

## Storage

Use a dedicated secret-management boundary appropriate to environment.

Local development may use local secret injection, but plaintext secret files must remain excluded from version control.

Production should use managed secret storage or equivalent hardened mechanisms.

## Injection

Agents/tools receive only the minimum credential capability needed for the current action.

Prefer:
- short-lived tokens;
- scoped tokens;
- environment-specific credentials;
- delegated action brokers;
- workload identity;
- secret references instead of secret values.

## Rotation

Rotate on:
- suspected exposure;
- personnel/provider change;
- privilege change;
- repository/public disclosure incident;
- expiration;
- scheduled policy where appropriate.

## Key hierarchy

Signing material should be more strongly isolated than ordinary API credentials.

Private keys and seed phrases for value-bearing wallets must not be exposed to general-purpose agents or normal application containers.

## Secret scanning

Repositories and CI should use secret-detection controls appropriate to risk.

A detected credential is treated as potentially compromised until revoked/rotated, not merely deleted from Git history.

## Evidence

Receipts store secret identifiers/fingerprints/secret-version references, never raw values.

## Recovery

Recovery codes, seed backups and master credentials require separate protected storage and access policy.
