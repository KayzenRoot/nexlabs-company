# NexLabs Technology — Threat Model Baseline

**Status:** `CANONICAL_WO_011`

## Critical assets

- Founder account and approval identity;
- GitHub org/repos/rulesets;
- CI/CD;
- Company OS;
- agent runtime;
- local Docker host/workstation;
- source code;
- secrets;
- production infra;
- databases/backups;
- customer/personal data;
- research/IP;
- money/bank/exchange accounts;
- Web3 keys/wallets/contracts.

## Threat actors

- external attacker;
- compromised dependency;
- malicious/compromised plugin/provider;
- stolen human session;
- compromised agent/runtime;
- insider/contractor in future;
- accidental operator error;
- automated agent error;
- supply-chain maintainer compromise.

## Threat scenarios

### Founder account takeover
Impact: company-wide authority compromise.

Controls: strong MFA/passkeys, recovery protection, audit, least privilege, separate high-risk approvals.

### GitHub compromise
Impact: source/CI/ruleset tampering.

Controls: protected main, scoped tokens, signed/verified supply chain where practical, independent evidence.

### Prompt/tool injection
Impact: agent executes attacker-supplied instruction.

Controls: untrusted-data rule, narrow tools, canonical authority, approvals.

### Secret leakage
Impact: API/cloud/wallet compromise.

Controls: secret manager, scanning, rotation, redaction.

### CI supply-chain attack
Impact: code/credential theft.

Controls: pin/review actions, minimal CI permissions, provenance.

### Docker/host escape or overprivileged socket
Impact: local/full host compromise.

Controls: avoid broad docker.sock exposure, least privilege, brokered operations.

### Data exfiltration through model/provider
Impact: privacy/confidentiality breach.

Controls: classification, minimization, provider/transfer review.

### Web3 key compromise
Impact: irreversible value/privilege loss.

Controls: isolated custody, high-assurance signing, no blind signing.

### Financial automation error
Impact: money loss.

Controls: action limits, exact preview, approval, idempotency, reconciliation.

### Backup failure
Impact: unrecoverable state.

Controls: restore tests, redundancy, monitored backup.

## Review triggers

Threat model refresh on:
- major architecture change;
- new privileged provider;
- production launch;
- money/Web3 enablement;
- significant incident;
- material regulation/data change.
