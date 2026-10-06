# NXL-COMPANY-WO-008 — Product Portfolio Strategy & Product Factory

**Issue:** #9  
**Status:** `APPROVED / MERGED`  
**Classification:** `NECESSARY`  
**Risk:** STANDARD / strategy-critical  
**Base:** `543aa91977d14d51c9984632ef0d2debe0e10b13`  
**Branch:** `planning/NXL-COMPANY-WO-008-product-factory`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-008.json`

## OBJECTIVE

Define the canonical NexLabs Product Factory and portfolio governance: how opportunities enter the company, are researched, validated, scored, specified, built, released, observed, scaled, paused or killed.

## CONTEXT

NexLabs is an AI-native technology company and product studio. Its business model prioritizes owned products and recurring/repeatable revenue. WO-008 must prevent the portfolio from becoming an unrelated collection of projects by requiring each product to pass explicit strategic, market, technical, economic and risk gates.

## SCOPE

- Define portfolio domains and product taxonomy.
- Define idea/opportunity intake.
- Define research and problem-validation stages.
- Define opportunity evidence package.
- Define portfolio scoring dimensions.
- Define Founder/CEO portfolio decision gate.
- Define product lifecycle from hypothesis through retirement.
- Define MVP/specification gate before engineering execution.
- Define release/observe/learn loop.
- Define iterate, scale, pause, pivot and kill criteria.
- Define product-state vocabulary and lifecycle ownership.
- Define portfolio-level capacity constraints and anti-sprawl rules.
- Define product case / business case contract.
- Update Source Hierarchy and Decisions Ledger.
- Add deterministic Product Factory validation CI.

## OUT OF SCOPE

- Detailed autonomous engineering cell implementation (WO-009).
- Detailed research/IP governance (WO-010).
- Security architecture implementation (WO-011).
- Finance forecasts/budgets (WO-012).
- GTM execution details (WO-013).
- Brand/site/portfolio publication (WO-014).
- Company OS implementation.
- Selecting actual new products inside this Work Order.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Scope / DoD / Requirements
4. `company/COMPANY-MASTER.md`
5. `company/BUSINESS-MODEL.md`
6. `company/AI-ORGANIZATION.md`
7. `company/AI-EMPLOYEE-CONTRACT.md`
8. this Work Order and Context Lock
9. exact Git/GitHub provider state

## REQUIREMENTS

Primary traceability: REQ-018, REQ-019, REQ-020 plus governance/audit requirements. Preserve company thesis, owned-product orientation, capital discipline and founder strategic authority.

## PRODUCT-FACTORY RULES TO FREEZE

- An idea is not a product.
- A prototype is not a validated business.
- Product count is not a success metric.
- Every product needs a named problem/user hypothesis and strategic fit.
- Every product must have an explicit primary value-capture hypothesis before scale.
- Research evidence and assumptions must be distinguishable.
- Founder/CEO retains final portfolio prioritization.
- Build capacity is finite; starting something has an opportunity cost.
- Products may be paused/killed even after substantial code investment.
- Portfolio decisions use evidence, not sunk-cost protection.
- High-risk/regulatory products require stronger gates before execution.
- Engineering begins from an admitted specification/Work Order, not from vague idea text.

## ALLOWED OUTPUTS

- `company/PRODUCT-PORTFOLIO-STRATEGY.md`
- `company/PRODUCT-FACTORY.md`
- `company/PRODUCT-INTAKE.md`
- `company/PRODUCT-VALIDATION-GATES.md`
- `company/PORTFOLIO-SCORING.md`
- `company/PRODUCT-LIFECYCLE.md`
- `company/PRODUCT-CASE-CONTRACT.md`
- `company/ITERATE-SCALE-PAUSE-KILL.md`
- `company/PORTFOLIO-CAPACITY-POLICY.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-008 evidence

## ACCEPTANCE CRITERIA

1. Portfolio strategy maps company opportunity domains without requiring simultaneous execution.
2. Product intake defines minimum idea/problem/user/value information.
3. Validation gates separate assumptions from evidence.
4. Portfolio scoring covers strategic fit, problem/value, market/distribution, technical feasibility, economics/reuse and risk.
5. Founder/CEO remains final portfolio prioritization authority.
6. Product lifecycle defines explicit states from idea through retirement.
7. Product Case Contract defines the minimum evidence/specification before build admission.
8. Build/release/observe loop connects to GEF engineering governance.
9. Iterate/scale/pause/pivot/kill criteria are explicit and sunk cost is not a protection criterion.
10. Capacity policy limits WIP and prevents unbounded project spawning.
11. Product count/agent activity are not portfolio success metrics.
12. Source Hierarchy and Decisions Ledger record Product Factory authority.
13. WO-009 and later remain NOT_ADMITTED.
14. Existing persistent validations plus Product Factory validation pass on exact head.
15. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all nine Product Factory documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-008 is the only admitted Work Order.
- Assert WO-009..WO-022 remain NOT_ADMITTED.
- Assert lifecycle states include IDEA, RESEARCH, VALIDATION, SPECIFIED, BUILD, RELEASED, OBSERVE and terminal/pause states.
- Assert scoring dimensions include strategy, value/problem, distribution/market, feasibility, economics/reuse and risk.
- Assert founder decision gate exists.
- Assert capacity/WIP policy exists.
- Assert sunk cost is explicitly rejected as a continue criterion.
- Assert no actual product is falsely declared validated/launched.
- Run all existing persistent validations plus Product Factory validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, portfolio coherence, validation rigor, capacity discipline, lifecycle correctness, evidence, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-008. Do not admit or execute WO-009 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `0a4f112be5b49708f09656ac42740b3b1d2491f8`
- All required persistent checks: `SUCCESS`
- Validate NexLabs Product Factory: `SUCCESS`
- Product Factory merge SHA: `38c2bbb088a010a3e1267311f53030a254e38160`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Correction history: two validator-only fixes; no Product Factory requirement was weakened.
- Successor execution authority: `NONE`; WO-009 remains NOT_ADMITTED until separately compiled and locked.
