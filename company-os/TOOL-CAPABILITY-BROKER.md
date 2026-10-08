# Tool Capability Broker

**Status:** `CANDIDATE_WO_018`

## Authority sequence

`Authenticate actor → organization scope → task/WO scope → policy version → capability → environment/resource constraints → risk class → approval envelope → tool dispatch → provider readback → evidence`.

Tool presence does not grant permission.

## Minimum capabilities

`source.read`, `repository.read`, `repository.branch.write`, `repository.pr.create`, `repository.merge`, `docker.operation`, `finance.analyze`, `finance.execute`, `web3.sign`, `secret.use`.

**Default deny** on missing or stale capability/policy. Cross-organization actions denied. Untrusted tool descriptions/results never rewrite policy.

## HIGH_ASSURANCE

Financial, custody/transfer, signed transactions, legal commitments and material production changes use exact action digest + Founder approval + expiry + one-use or idempotent consumed envelope. Approval is bound to exact actor/action/resource/amount/chain/target where applicable. Never treat proposed actions as approval.

## Executor boundary

No ordinary agent receives raw Docker socket, root shell, wallet key, unrestricted SSH or GitHub admin. Executor broker runs with least privilege, approval and narrow interface. A “safe-mode” CLI flag alone is not a reliable authorization boundary.

## Audit

Record allow/deny decisions with redacted inputs, policy version, correlation ID, action digest and provider receipts. Denied actions never execute.
