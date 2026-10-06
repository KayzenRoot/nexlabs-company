# NXL-COMPANY-WO-007 — AI Employee Contract, Memory, Permissions & Escalation

**Issue:** #8  
**Status:** `APPROVED / MERGED`  
**Classification:** `NECESSARY`  
**Risk:** ELEVATED / governance-critical  
**Base:** `3db001f9bba7c6b2349edb4ef83fde77757b60d1`  
**Branch:** `planning/NXL-COMPANY-WO-007-ai-employee-contract`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-007.json`

## OBJECTIVE

Define the canonical operating contract every NexLabs AI employee must inherit: stable role identity, mission, responsibilities, inputs/outputs, tool capabilities, permission envelope, memory boundaries, KPIs/evaluation, escalation rules, limitations, failure behavior and audit obligations.

## CONTEXT

WO-005 defined company authority/risk. WO-006 defined which organizational roles exist and how teams are assembled. WO-007 defines **how one AI employee is instantiated and governed** without binding the contract to Hermes, Codex, OpenAI or any runtime provider.

The contract must allow different models/runtimes to occupy the same logical role while preserving company authority, memory discipline and auditability.

## SCOPE

- Define the standard AI Employee Contract.
- Define stable role identity and machine-readable role schema.
- Define mission/responsibility/input/output boundaries.
- Define tool capability vs permission semantics.
- Define memory classes and precedence.
- Define context hydration and stale-context behavior.
- Define permission envelopes, expiry/revocation and least privilege.
- Define KPI/evaluation dimensions without rewarding unsafe activity.
- Define escalation contract and blocked/unknown behavior.
- Define limitations, failure, retry and replacement behavior.
- Define audit/receipt obligations for every agent run.
- Define provider/runtime substitution rules.
- Define contract-versioning and change control.
- Update Source Hierarchy and Decisions Ledger.
- Add deterministic AI Employee Contract validation CI.

## OUT OF SCOPE

- Creating every concrete employee role instance.
- Product Factory lifecycle (WO-008).
- Autonomous engineering workflow implementation (WO-009).
- Company OS database/runtime implementation.
- Hermes/Codex integration.
- Secret provisioning or production credentials.
- Actual employee execution.
- Final model-routing algorithm.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Scope / DoD / Requirements / Architecture
4. `company/CORPORATE-GOVERNANCE.md`
5. `company/AUTHORITY-MATRIX.md`
6. `company/AI-ORGANIZATION.md`
7. `company/AI-WORKFORCE-ARCHITECTURE.md`
8. `company/ROLE-TAXONOMY.md`
9. this Work Order and Context Lock
10. exact Git/GitHub provider state

## REQUIREMENTS

Primary traceability: REQ-002, REQ-005, REQ-007, REQ-011, REQ-012, REQ-013, REQ-016, REQ-017. Preserve founder authority, provider independence, default-deny and auditability.

## EMPLOYEE-CONTRACT RULES TO FREEZE

- A role is a logical company identity independent of model/provider/session.
- Capability and authority remain separate.
- Tools are explicitly allowlisted per role/run.
- Permission envelopes are scoped, revocable and time/resource/environment bounded where applicable.
- Memory never outranks canonical company/project authority.
- Stale or conflicting context fails closed or escalates.
- Agent-specific private memory may not silently redefine company truth.
- KPIs may not reward bypassing controls, fabricating success or maximizing action volume.
- Retries must be bounded; repeated failure escalates instead of looping indefinitely.
- Agent replacement must preserve role identity and authoritative state, not hidden runtime memory.
- Material runs produce attributable receipts.

## ALLOWED OUTPUTS

- `company/AI-EMPLOYEE-CONTRACT.md`
- `company/AI-ROLE-SCHEMA.md`
- `company/AI-PERMISSIONS-MODEL.md`
- `company/AI-MEMORY-POLICY.md`
- `company/AI-TOOLS-AND-CAPABILITIES.md`
- `company/AI-KPI-AND-EVALUATION.md`
- `company/AI-ESCALATION-CONTRACT.md`
- `company/AI-FAILURE-AND-REPLACEMENT.md`
- `company/AI-RUN-RECEIPT-CONTRACT.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-007 evidence

## ACCEPTANCE CRITERIA

1. One canonical employee contract exists.
2. Role identity is independent of provider/model/session.
3. Machine-readable role schema fields are defined.
4. Mission, responsibilities, inputs and outputs have explicit boundaries.
5. Tools/capabilities are distinct from permissions/authority.
6. Permission envelopes are scoped, revocable and default-deny.
7. Memory precedence is explicit and canonical sources outrank agent memory.
8. Stale/conflicting context behavior is fail-closed/escalate.
9. KPI/evaluation rewards outcomes, evidence, quality and efficiency without rewarding unsafe activity.
10. Escalation contract covers BLOCKED, DENIED, UNKNOWN, RECOVERY_REQUIRED and approval-needed states.
11. Failure/retry/replacement behavior prevents infinite loops and provider lock-in.
12. Run receipt contract covers exact role, contract version, authority, inputs, tools, outcome and evidence.
13. Source Hierarchy and Decisions Ledger record employee-contract authority.
14. WO-008 and later remain NOT_ADMITTED.
15. Existing persistent validations plus AI Employee Contract validation pass on exact head.
16. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all nine AI employee-contract documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-007 is the only admitted Work Order.
- Assert WO-008..WO-022 remain NOT_ADMITTED.
- Assert contract schema contains role_id, contract_version, mission, responsibilities, inputs, outputs, tools, permissions, memory, KPIs, escalation and limitations.
- Assert memory precedence names canonical Git/policy/project state above agent memory.
- Assert permission model includes least privilege, expiry/revocation and default deny.
- Assert KPI policy prohibits fabricated-success or gate-bypass incentives.
- Assert retry policy is bounded.
- Assert run receipt includes exact role/contract/action/outcome/evidence references.
- Run all existing persistent validations plus AI Employee Contract validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, contract completeness, permission/memory safety, provider independence, KPI incentives, escalation/failure behavior, evidence, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-007. Do not admit or execute WO-008 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `900693fee0b4eafad15202567765f6195e3f1d3d`
- Validate GEF 1.1.2: `SUCCESS`
- Validate NexLabs Source Pack: `SUCCESS`
- Validate NexLabs Company Strategy: `SUCCESS`
- Validate NexLabs Business Model: `SUCCESS`
- Validate NexLabs Governance: `SUCCESS`
- Validate NexLabs AI Workforce: `SUCCESS`
- Validate NexLabs AI Employee Contract: `SUCCESS`
- Employee-contract merge SHA: `ec82d94c1c9e909d53fe4d5c590fc6196bc4cd25`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Successor execution authority: `NONE`; WO-008 remains NOT_ADMITTED until separately compiled and locked.
