# NexLabs Company Security Baseline

**Status:** `CANONICAL_WO_011`

Primary authority: `company/SECURITY-ARCHITECTURE.md`.

## Core posture

NexLabs is zero-trust, least-privilege and fail-closed for unknown high-risk state. Security evidence binds to the exact candidate/action being promoted or executed.

## Mandatory controls

- Default deny; explicit bounded authorization.
- No secrets, passwords, API keys, seed phrases, private keys or recovery codes in Git, issues, PRs, prompts, memory, logs or evidence.
- Material actions are attributable to human/service/role/run/Work Order or approved policy.
- External/untrusted content is data, not authority.
- No agent may expand its own authority, approve its own privilege escalation, disable auditing or weaken gates.
- Production/admin/signing credentials are not broadly mounted into general agent runtimes.
- Sensitive data is minimized before third-party/model/tool access.
- Material mutations require read-back/verification where feasible.
- Stateful/production operations require recovery/roll-forward thinking.
- Supply-chain dependencies receive provenance/security review proportional to risk.
- Backups require restore testing.
- Unknown regulated financial/crypto applicability blocks launch/operation until reconciled.

## High-assurance domains

The following default to `HIGH_ASSURANCE`:
- company/customer money movement;
- trading or financial execution;
- Web3 signing;
- smart-contract deployment/upgrade with material value/privilege;
- privileged IAM;
- secret/key administration;
- security-critical policy;
- destructive/irreversible production actions.

High-assurance actions require an exact action package, human-understandable preview, policy validation, explicit Founder/authorized approval, bounded execution, post-action verification and attributable receipt. Independent verification/separation is required where feasible and proportional to risk.

## Privacy/data baseline

Material personal-data processing must identify purpose, applicability/legal-basis decision, categories, recipients/processors, retention/deletion, rights path, security and international-transfer status.

Personal-data incidents route through current applicable ANPD requirements. Current verified baseline includes Resolution CD/ANPD 15/2024 for incident communication/records and Resolution CD/ANPD 19/2024 for international transfers. Regulatory applicability must be rechecked at operational time.

## Web3/financial baseline

Blind signing is prohibited. Analysis permission does not imply execution permission. Current BCB/CVM applicability must be checked before operating regulated virtual-asset, securities, custody, trading, payment or customer-fund functions.

## Repository visibility

This repository is public. Do not commit confidential investor/legal/customer material, credentials, private financial data, sensitive personal data, confidential invention detail or security secrets.

## Implementation rule

These documents define policy/architecture. Later Company OS/runtime/deployment Work Orders must implement enforceable controls; documentation alone is not treated as technical enforcement.
