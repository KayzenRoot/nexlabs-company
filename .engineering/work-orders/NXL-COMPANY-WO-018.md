# NXL-COMPANY-WO-018 — Agent Runtime Abstraction & Hermes Integration Design

**Issue:** #19
**Status:** `APPROVED / MERGED`
**Classification:** `NECESSARY`
**Risk:** `ELEVATED / AGENT_TOOL_AUTHORITY`
**Admission base:** `ef31c761fd7d09383b7168604e9c4a5f580d406e`
**Branch:** `design/NXL-COMPANY-WO-018-agent-runtime-hermes`
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-018.json`

## Objective

Define and verify a provider-independent AgentRuntime interface and Hermes-first **design adapter** for NexLabs Company OS. Build a dependency-free contract test harness with a fake provider. Do not install Hermes or claim live provider execution without evidence.

## Canonical inputs

GEF 1.1.2; WO-007, WO-009, WO-016 and WO-017; Company OS agent-runtime, integration, authorization, recovery, local Docker, observability and evidence contracts.

## Scope

- Runtime capability discovery, session lifecycle and execution result envelopes.
- Hermes adapter mapping with verified documented CLI entry points; isolate version-sensitive details.
- Routing by capability, price cap, context, data classification, security, latency and provider health.
- Tool capability broker: default deny; approvals and action-bound HIGH_ASSURANCE.
- Context/memory source hierarchy and promotion boundary.
- Cost/token/turn/time ceilings and circuit breakers.
- Failure taxonomy, provider ambiguity, idempotency and RECOVERY_REQUIRED.
- Contract tests with fake providers; CI validator; Source Hierarchy; Decisions Ledger.

## Out of scope

- Hermes installation/authentication on Founder host.
- Real LLM calls or API credential storage.
- Execution of shell, Docker, GitHub or financial/Web3 writes.
- Hosted control plane, UI, database migrations, persistent job scheduling.
- Implementation of Autonomous Engineering Cell (WO-019).
- WO-019 admission.

## Acceptance criteria

1. Canonical AgentRuntime accepts bounded request/response/session data.
2. Hermes is optional replaceable provider, no vendor-specific Company OS state.
3. Session state transitions/cancellation and resource ceilings are explicit.
4. Model router denies an ineligible model and never silently bypasses data/residency constraints.
5. No tool capability is inferred from tool presence or agent title.
6. HIGH_ASSURANCE action digest + Founder approval remain mandatory.
7. Provider/tool errors and unknown completion cannot trigger blind retries.
8. Memory/canonical-context refs respect authority/freshness and privacy.
9. Token, cost, step/turn and time usage are recorded without raw secrets.
10. Deterministic contract tests cover routing, denial, idempotency, cancellation and recovery.
11. WO-019..022 remain NOT_ADMITTED.
12. All existing persistent validators plus new Agent Runtime validator pass at exact PR head; no known HIGH/CRITICAL finding.
13. Exact-head audit, merge and separate checkpoint promotion; no WO-019 implementation.

## Tests

`node --test company-os/contracts/agent-runtime.test.mjs`; structural rules under `.github/workflows/agent-runtime-validation.yml`; all existing CI gates.

## Review

Brazilian Portuguese. Identify audited SHA, contracts, permissions, fallback, memory, costs, Hermes compatibility, failures, evidence, findings, verdict and checkpoint delta.

## STOP CONDITION

No WO-019 until WO-018 merged, audited and checkpoint-promoted.


## Closeout

- Review: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT` (review id 5450022043)
- Audited SHA: `7147fb2dc4034bac5ff37de80281f7f4b2f7d5dd`
- Implementation merge SHA: `a074445ae5169ef0377ead49ba4b21f39e6eedcb`
- Exact head: `18/18 SUCCESS` validations, including new runtime contract tests
- Residual live Hermes/broker isolation work: delegated to separately admitted WO-019; design tests do not prove real provider security
- Next Work Order: NOT_ADMITTED; no execution rights granted
