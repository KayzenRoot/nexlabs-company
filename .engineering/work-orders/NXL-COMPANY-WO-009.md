# NXL-COMPANY-WO-009 — GEF-Native Autonomous Software Factory

**Issue:** #10  
**Status:** `APPROVED / MERGED`  
**Classification:** `NECESSARY`  
**Risk:** ELEVATED / engineering-governance critical  
**Base:** `f0e63bbaac0622259efc2be6c1cf15e884a6f7c3`  
**Branch:** `planning/NXL-COMPANY-WO-009-autonomous-software-factory`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-009.json`

## OBJECTIVE

Translate the proven Founder + planning/review + executor workflow into the canonical NexLabs autonomous engineering operating model, preserving GEF Work Orders, Context Locks, exact-head evidence, correction loops, PR audit and checkpoint promotion.

## CONTEXT

WO-006 defined the logical software-delivery cell. WO-007 defined the operating contract for AI employees. WO-008 defined when a product may enter build. WO-009 now defines **how an approved product/engineering increment moves through autonomous software delivery**.

This Work Order defines the engineering operating model and machine state transitions. It does not yet implement the Company OS, Hermes adapter, persistent runtime database or live agent orchestration service.

## SCOPE

- Define the canonical Autonomous Software Factory.
- Define engineering role responsibilities and handoffs.
- Define the engineering orchestration state machine.
- Define Work Order admission protocol.
- Define Context Lock / preflight contract.
- Define executor-adapter contract.
- Define test/evidence and exact-head protocol.
- Define reviewer/auditor contract.
- Define correction-delta protocol.
- Define checkpoint promotion / merge / successor admission protocol.
- Define interruption, stale-context and recovery semantics.
- Define parallelism and same-Work-Order constraints.
- Define the minimum end-to-end autonomous engineering-cell proof required by v0.1.
- Update Source Hierarchy and Decisions Ledger.
- Add deterministic Software Factory validation CI.

## OUT OF SCOPE

- Concrete Hermes/runtime integration.
- Company OS persistence/database implementation.
- Live queue/orchestrator code.
- Detailed research/IP operating model (WO-010).
- Security architecture implementation (WO-011).
- Production deployment automation beyond lifecycle contract.
- Financial/commercial automation.
- Actual code generation for a new NexLabs product.
- Weakening GEF 1.1.2 semantics.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Scope / DoD / Requirements / Architecture
4. `company/CORPORATE-GOVERNANCE.md`
5. `company/AI-ORGANIZATION.md`
6. `company/AI-EMPLOYEE-CONTRACT.md`
7. `company/SOFTWARE-DELIVERY-CELL.md`
8. `company/PRODUCT-FACTORY.md`
9. this Work Order and Context Lock
10. exact Git/GitHub provider state

## REQUIREMENTS

Primary traceability: REQ-003, REQ-004, REQ-005, REQ-007, REQ-009, REQ-010, REQ-011, REQ-012, REQ-014, REQ-016, REQ-017.

## FACTORY RULES TO FREEZE

- Only one Work Order is admitted for execution in a governed stream unless explicit parallel admission policy exists.
- Admission compiles exact base SHA, branch, allowed scope, tests and Context Lock from current canonical sources.
- Context Lock drift invalidates execution authority until refreshed/reconciled.
- Planner/Architect defines scope and acceptance; Executor does not silently redefine the Work Order.
- Executor is provider-independent and replaceable.
- Every material candidate is bound to an exact head.
- Tests/evidence from an old head cannot approve a newer head.
- Review may return APPROVED, CORRECTION_REQUIRED or BLOCKED.
- Corrections stay in the same Work Order only when causal, bounded and architecture-compatible.
- Any correction produces a new head and invalidates prior exact-head approval evidence.
- Merge is not checkpoint promotion.
- Checkpoint promotion is a separate bounded delta after approved implementation merge.
- Successor Work Order is not executable until predecessor promotion and explicit admission.
- Unknown/stale authority fails closed.
- Ambiguous mutation enters recovery/reconciliation before retry.
- High-risk separation requirements from WO-005 remain authoritative.

## ALLOWED OUTPUTS

- `company/AUTONOMOUS-SOFTWARE-FACTORY.md`
- `company/ENGINEERING-ROLE-CONTRACTS.md`
- `company/ENGINEERING-ORCHESTRATION-STATE-MACHINE.md`
- `company/WORK-ORDER-ADMISSION-PROTOCOL.md`
- `company/CONTEXT-LOCK-AND-PREFLIGHT.md`
- `company/EXECUTOR-ADAPTER-CONTRACT.md`
- `company/EVIDENCE-AND-EXACT-HEAD-PROTOCOL.md`
- `company/REVIEW-AND-CORRECTION-PROTOCOL.md`
- `company/CHECKPOINT-PROMOTION-PROTOCOL.md`
- `company/AUTONOMOUS-ENGINEERING-MVP.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-009 evidence

## ACCEPTANCE CRITERIA

1. Canonical engineering lifecycle is explicitly stateful from approved product case/intent through checkpoint promotion.
2. Planner/Architect, Executor, QA/Test, Reviewer/Auditor and Promotion responsibilities are distinct.
3. Work Order admission is a compile step against exact canonical state.
4. Context Lock drift/staleness invalidates execution authority.
5. Executor adapters are provider-independent and cannot redefine scope/authority.
6. Tests/evidence bind to exact head and stale evidence is invalid.
7. Review has explicit APPROVED / CORRECTION_REQUIRED / BLOCKED outcomes.
8. Correction-delta rules preserve same WO only when bounded/causal/safe.
9. Merge and checkpoint promotion are explicitly separate states.
10. Successor execution requires predecessor promotion plus fresh admission.
11. Interruption/recovery semantics prevent blind retry after ambiguous mutation.
12. Minimum v0.1 autonomous-cell proof is defined end to end.
13. Founder visibility/approval hooks are preserved.
14. Source Hierarchy and Decisions Ledger record Software Factory authority.
15. WO-010 and later remain NOT_ADMITTED.
16. Existing persistent validations plus Software Factory validation pass on exact head.
17. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all ten Software Factory documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-009 is the only admitted Work Order.
- Assert WO-010..WO-022 remain NOT_ADMITTED.
- Assert lifecycle includes ANALYZE, SOURCE_CHECK, ADMIT, CONTEXT_LOCK, PREFLIGHT, EXECUTE, TEST_EVIDENCE, REVIEW, CORRECTION, MERGE, CHECKPOINT_PROMOTION and COMPLETE/BLOCKED states.
- Assert exact-head evidence invalidation rule exists.
- Assert merge != checkpoint promotion.
- Assert executor/provider independence.
- Assert ambiguous mutation recovery rule.
- Assert correction remains same WO only under bounded causal conditions.
- Assert MVP proof includes approved idea/product case → Work Order → execution → tests/evidence → review → correction path → merge → checkpoint.
- Run all existing persistent validations plus Software Factory validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, lifecycle integrity, authority boundaries, evidence integrity, correction semantics, provider independence, recovery behavior, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-009. Do not admit or execute WO-010 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `d078c285ab45c744a386c98fa2bc2360a7093985`
- All nine required validations: `SUCCESS`
- Software Factory merge SHA: `71ad4d381bbd65c387d08d800ce7c4e90d22cbbb`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Recovery evidence: admission timeouts were reconciled read-only; only missing writes were completed.
- Correction history: two validator-only corrections and one content clarification making `RECOVERY_REQUIRED` explicit.
- Successor execution authority: `NONE`; WO-010 remains NOT_ADMITTED until separately compiled and locked.
