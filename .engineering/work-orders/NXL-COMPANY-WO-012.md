# NXL-COMPANY-WO-012 — Finance, Budget, Unit Economics & Investment Model

**Issue:** #13  
**Status:** `ADMITTED / IN_PROGRESS`  
**Classification:** `NECESSARY`  
**Risk:** `ELEVATED / FINANCIAL_GOVERNANCE`  
**Base:** `2b5da9f3448b3c0cdb72ce63576cb213c2141c83`  
**Branch:** `planning/NXL-COMPANY-WO-012-finance-budget-unit-economics-investment`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-012.json`

## OBJECTIVE

Define the canonical NexLabs financial operating model: budget, cash flow, burn/runway, revenue metrics, unit economics, AI/cloud cost allocation, treasury/spend controls, funding scenarios, investor use-of-funds and milestone-based tranche release model.

## CONTEXT

WO-004 defined the business/revenue model. WO-005 established Founder authority and financial risk classes. WO-008 defined product portfolio capacity. WO-011 established financial execution as HIGH_ASSURANCE. WO-012 now defines internal financial truth and management/investor planning without moving money, setting legal/accounting policy, or fabricating traction.

## SCOPE

- Financial operating principles.
- Planning/actual/forecast state model.
- Budget structure and variance review.
- Cash flow, gross burn, net burn and runway.
- Revenue/MRR/ARR definitions.
- Gross/contribution margin.
- CAC/LTV/payback/cohort economics.
- AI/model/cloud/data/provider cost allocation.
- Product/portfolio economics.
- Treasury/spend approval boundaries.
- Funding strategy scenarios.
- Use-of-funds model.
- Milestone/tranche release model for investors.
- Scenario planning and downside controls.
- Founder management reporting.
- Metric confidence/source taxonomy.
- Update Source Hierarchy and Decisions Ledger.
- Add deterministic Finance validation CI.

## OUT OF SCOPE

- Accounting/tax/legal advice.
- Bank/payment/exchange execution.
- Moving company/customer money.
- Setting actual investor legal terms.
- Issuing equity, debt, SAFE/convertible instruments or tokens.
- Valuation claims.
- Current revenue/traction claims not backed by measured records.
- Product-specific pricing changes.
- Hiring commitments.
- Full investor deck (WO-015).
- Finance runtime/dashboard implementation.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Requirements / DoD
4. `company/BUSINESS-MODEL.md`
5. `company/REVENUE-ARCHITECTURE.md`
6. `company/PRICING-PRINCIPLES.md`
7. `company/MONETIZATION-GUARDRAILS.md`
8. `company/ECONOMIC-METRICS-BASELINE.md`
9. `company/CORPORATE-GOVERNANCE.md`
10. `company/APPROVAL-POLICY.md`
11. `company/FINANCIAL-ACTION-SAFETY.md`
12. `company/HIGH-ASSURANCE-ACTION-PROTOCOL.md`
13. `company/PRODUCT-PORTFOLIO-STRATEGY.md`
14. this Work Order and Context Lock
15. exact Git/GitHub state

## REQUIREMENTS

Primary traceability: REQ-001, REQ-005, REQ-011, REQ-012, REQ-013, REQ-014, REQ-017, REQ-018, REQ-019.

## FINANCIAL RULES TO FREEZE

- Financial truth separates ACTUAL, COMMITTED, FORECAST, SCENARIO and ASSUMPTION.
- Unknown is not zero.
- MRR/ARR include only recurring revenue under explicit inclusion rules.
- Cash received is not automatically revenue; bookings are not cash; ARR is not cash.
- Gross burn, net burn and runway use explicit definitions.
- Unit economics are product/cohort aware; one universal CAC/LTV formula is not forced where invalid.
- AI/model/cloud costs are allocated by product/workflow where practical.
- Portfolio decisions consider both direct economics and reusable strategic capability.
- Budget variance requires explanation, not silent rebasing.
- Company money movement remains HIGH_ASSURANCE and outside ordinary autonomous finance analysis.
- Funding scenarios distinguish dilution/legal instrument terms from operational use-of-funds.
- Investor tranche release is tied to measurable milestones and evidence, not calendar passage alone.
- Milestones may include product, commercial, reliability, governance and financial outcomes.
- Failed milestones trigger review/replan, not fabricated completion.
- Valuation/fundraising terms are not canonical without Founder/legal/investor agreement.
- Forecasts always carry assumptions and confidence.
- Founder/CEO retains final budget, funding and material spend authority.

## ALLOWED OUTPUTS

- `company/FINANCE-OPERATING-MODEL.md`
- `company/BUDGET-AND-FORECASTING.md`
- `company/CASH-FLOW-BURN-RUNWAY.md`
- `company/REVENUE-METRICS.md`
- `company/UNIT-ECONOMICS.md`
- `company/COST-ALLOCATION-AI-CLOUD.md`
- `company/TREASURY-AND-SPEND-CONTROLS.md`
- `company/FUNDING-AND-INVESTMENT-MODEL.md`
- `company/USE-OF-FUNDS.md`
- `company/MILESTONE-TRANCHE-MODEL.md`
- `company/FINANCIAL-SCENARIO-PLANNING.md`
- `company/MANAGEMENT-FINANCIAL-REPORTING.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-012 evidence

## ACCEPTANCE CRITERIA

1. Actual/forecast/scenario/assumption states are distinct.
2. Budget model has category, owner, period, plan, actual, committed and variance.
3. Cash flow/burn/runway formulas are explicit.
4. MRR/ARR definitions prevent one-time/usage revenue inflation.
5. Unit economics include cost-to-serve, gross/contribution margin, CAC, payback and LTV with applicability caveats.
6. AI/cloud costs can be allocated by product/workflow.
7. Spend controls preserve HIGH_ASSURANCE execution boundaries.
8. Funding model separates operational planning from legal/investment instrument terms.
9. Use-of-funds categories and evidence expectations are defined.
10. Milestone/tranche model ties release to objective evidence and has fail/replan semantics.
11. Scenario planning includes base/downside/upside and runway response.
12. Management reporting gives Founder a compact financial view.
13. No fabricated revenue, valuation, customer, cost or investor claim appears.
14. Source Hierarchy and Decisions Ledger record Finance authority.
15. WO-013 and later remain NOT_ADMITTED.
16. Existing persistent validations plus Finance validation pass on exact head.
17. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all twelve Finance documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-012 is the only admitted Work Order.
- Assert WO-013..WO-022 remain NOT_ADMITTED.
- Assert ACTUAL / COMMITTED / FORECAST / SCENARIO / ASSUMPTION taxonomy.
- Assert MRR and ARR inclusion/exclusion rules.
- Assert gross burn/net burn/runway definitions.
- Assert gross margin/contribution margin/CAC/LTV/payback coverage.
- Assert AI/cloud allocation.
- Assert company money movement remains HIGH_ASSURANCE.
- Assert milestone tranches require objective evidence and failed-milestone replan.
- Assert no hardcoded valuation/current traction claim.
- Run all persistent validations plus Finance validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, metric truthfulness, budget integrity, burn/runway, unit economics, cost allocation, spend authority, funding/use-of-funds, milestone/tranche evidence, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-012. Do not admit or execute WO-013 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.
