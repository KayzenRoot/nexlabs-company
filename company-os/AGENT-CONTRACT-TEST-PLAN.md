# Agent Runtime Contract Test Plan

**Status:** `CANDIDATE_WO_018`

## Offline tests

Use Node built-in test runner; no credentials, network, Docker or paid model:
`node --test company-os/contracts/agent-runtime.test.mjs`.

Validate mandatory envelope, bounded budgets, provider eligibility/denial, tool default deny, HIGH_ASSURANCE digest matching, legal state transitions, unknown-completion reconciliation, retry lockout and Hermes declarative invocation safety.

## Integration readiness gates for WO-019

Only then test with real Hermes in isolated environment:
- pinned version;
- verified CLI help and structured output parser;
- safe tool profile and broker interception;
- cancellation and timeout;
- provider charge/usage receipt;
- no secret leakage;
- denied write remains denied;
- no Docker host privileges;
- end-to-end exact-head evidence.

## CI

Run all existing GEF/company validators and this new gate on the exact PR head. No independent security assurance is claimed by owner self-audit; material findings require explicit correction.
