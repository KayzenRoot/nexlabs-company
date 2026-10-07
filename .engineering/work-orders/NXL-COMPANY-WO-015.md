# NXL-COMPANY-WO-015 — Investor Readiness, Pitch & Data Room

**Issue:** #16  
**Status:** `APPROVED / MERGED`  
**Classification:** `IMPORTANT`  
**Risk:** `ELEVATED / INVESTOR_DISCLOSURE_GOVERNANCE`  
**Base:** `a4f64768f53bd6fd4cabb18cf96451b79fb03d04`  
**Branch:** `planning/NXL-COMPANY-WO-015-investor-readiness-pitch-data-room`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-015.json`

## OBJECTIVE

Define a professional, diligence-ready investor system for NexLabs: executive summary, investment thesis, pitch-deck content architecture, investor metrics, use-of-funds/milestones, cap-table modeling rules, diligence data-room IA, disclosure controls, readiness scoring and investor-update cadence.

## CONTEXT

WO-003 defined company strategy. WO-004 defined business model. WO-008 defined product portfolio governance. WO-012 defined financial truth, funding, use-of-funds and milestone tranches. WO-014 defined public-proof/disclosure and portfolio truth.

WO-015 converts those canonical sources into a governed investor-facing system. It does not create legal financing documents, set a valuation, issue securities, promise investor returns or invent traction.

## SCOPE

- Investor readiness operating model.
- Executive summary standard.
- Investment thesis.
- Pitch-deck content architecture.
- Investor metric/KPI contract.
- Traction/proof classification for fundraising.
- Funding ask/use-of-funds/milestone presentation model.
- Cap-table scenario model and dilution boundaries.
- Investor data-room information architecture.
- Data-room disclosure/access classification.
- Diligence evidence/index standard.
- Risk/register presentation.
- Investor update/reporting model.
- Investor readiness score/gates.
- Source Hierarchy and Decisions Ledger updates.
- Deterministic Investor Readiness validation CI.

## OUT OF SCOPE

- Creating actual legal subscription/equity/SAFE/debt documents.
- Setting a binding valuation.
- Promising returns or repayment.
- Issuing shares/options/tokens.
- Binding board/control/investor rights.
- Publishing confidential data room contents publicly.
- Inventing customers/revenue/traction/funding/partners.
- Filing securities/corporate documents.
- Tax/accounting/legal advice.
- Negotiating with investors.
- Building a hosted data-room application.
- Creating the final visual pitch deck artifact.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Requirements / DoD
4. `company/COMPANY-MASTER.md`
5. `company/BUSINESS-MODEL.md`
6. `company/PRODUCT-PORTFOLIO-STRATEGY.md`
7. `company/FINANCE-OPERATING-MODEL.md`
8. `company/FUNDING-AND-INVESTMENT-MODEL.md`
9. `company/USE-OF-FUNDS.md`
10. `company/MILESTONE-TRANCHE-MODEL.md`
11. `company/MANAGEMENT-FINANCIAL-REPORTING.md`
12. `company/BRAND-SYSTEM.md`
13. `company/PUBLIC-PORTFOLIO-SCHEMA.md`
14. `company/PUBLIC-PROOF-AND-DISCLOSURE-POLICY.md`
15. `company/SECURITY-ARCHITECTURE.md`
16. `company/DATA-GOVERNANCE-AND-PRIVACY.md`
17. this Work Order and Context Lock
18. exact Git/GitHub state

## REQUIREMENTS

Primary traceability: REQ-001, REQ-005, REQ-011, REQ-012, REQ-013, REQ-014, REQ-017, REQ-018, REQ-019, REQ-020.

## INVESTOR RULES TO FREEZE

- Investor materials inherit canonical company/finance/product/public-proof truth.
- Every material numeric or traction claim has state, source, period and last verification.
- `ACTUAL`, `FORECAST`, `SCENARIO`, `TARGET`, `UNAVAILABLE` and `NOT_APPLICABLE` are never blended.
- Pitch narrative may be persuasive but may not create fictional scale, customers, market position, funding or outcomes.
- Market sizing must disclose method/assumptions and may not be a top-down vanity number without decision value.
- Product/portfolio slides show actual product status.
- Technology/IP slides distinguish capability, architecture, research, invention and legally protected IP.
- Funding ask is presented as a scenario/decision package until actual terms are agreed.
- Use-of-funds links capital to milestones/outcomes and downside logic.
- Investor tranche/milestone claims use objective evidence.
- Cap table models are scenarios until sourced from actual legal/company records.
- Fully diluted ownership assumptions must state what instruments/options/convertibles are included.
- Valuation is never inferred from a cap-table model.
- Investor return is not presented as guaranteed.
- Data-room files are classified by disclosure/access sensitivity.
- Confidential files do not belong in this public repository.
- Diligence index may point to protected locations rather than copying private content here.
- Founder/CEO controls fundraising strategy, investor selection and material disclosure.
- Legal/accounting review is required before binding financing documents/terms.

## ALLOWED OUTPUTS

- `company/INVESTOR-READINESS-OPERATING-MODEL.md`
- `company/INVESTOR-EXECUTIVE-SUMMARY-STANDARD.md`
- `company/INVESTMENT-THESIS.md`
- `company/PITCH-DECK-CONTENT-ARCHITECTURE.md`
- `company/INVESTOR-KPI-CONTRACT.md`
- `company/INVESTOR-TRACTION-AND-PROOF.md`
- `company/INVESTOR-ASK-USE-OF-FUNDS-AND-MILESTONES.md`
- `company/CAP-TABLE-SCENARIO-MODEL.md`
- `company/INVESTOR-DATA-ROOM-IA.md`
- `company/DATA-ROOM-DISCLOSURE-AND-ACCESS.md`
- `company/DILIGENCE-EVIDENCE-INDEX-STANDARD.md`
- `company/INVESTOR-RISK-DISCLOSURE.md`
- `company/INVESTOR-UPDATES-AND-REPORTING.md`
- `company/INVESTOR-READINESS-SCORECARD.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-015 evidence

## ACCEPTANCE CRITERIA

1. Investor operating model explicitly inherits canonical strategy/product/finance/proof sources.
2. Executive Summary standard separates current facts from targets/scenarios.
3. Investment thesis explains why NexLabs can compound through products + company capability without claiming unproven dominance.
4. Pitch architecture covers problem, market, solution, company thesis, products, business model, GTM, technology, traction, economics, competition, team/AI workforce, ask/use-of-funds/milestones, risks and closing.
5. Investor KPI contract requires state/source/period/verification.
6. Traction/proof model distinguishes actual, third-party verified, forecast/target and unavailable.
7. Ask/use-of-funds/milestones remain scenario-based until real financing terms exist.
8. Cap-table model defines pre/post-money scenario math and fully diluted scope without setting valuation.
9. Data-room IA separates corporate, finance, product/tech, commercial, security/privacy, IP/legal, people/workforce and financing areas.
10. Disclosure/access policy prevents confidential data from entering public repo.
11. Diligence index records source, owner, version/date, verification and access class.
12. Risk disclosure includes company/product/market/AI/provider/security/privacy/regulatory/financial/execution risks.
13. Investor updates provide consistent KPI, cash/runway, product/GTM, risks and asks/decisions.
14. Readiness scorecard blocks “ready” when critical evidence/legal/corporate items are unavailable.
15. WO-016 and later remain NOT_ADMITTED.
16. Existing persistent validations plus Investor Readiness validation pass on exact head.
17. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all fourteen investor-system documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-015 is the only admitted Work Order.
- Assert WO-016..WO-022 remain NOT_ADMITTED.
- Assert fact/forecast/scenario/target/unavailable separation.
- Assert pitch-deck content sections.
- Assert investor KPI source/period/verification fields.
- Assert no guaranteed return / invented valuation.
- Assert cap-table scenario math boundaries.
- Assert data-room IA categories and access classes.
- Assert public repo confidentiality prohibition.
- Assert diligence evidence metadata.
- Assert risk register categories.
- Assert readiness score has blocking conditions.
- Run all persistent validations plus Investor Readiness validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, truthfulness, investment thesis, pitch completeness, KPI evidence, funding/use-of-funds/milestones, cap-table scenario integrity, data-room/access, risk disclosure, readiness gates, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-015. Do not admit or execute WO-016 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `ac306d9dd7096f64b503d2c699898b0492c8bb9b`
- All fifteen required validations: `SUCCESS`
- Investor System merge SHA: `c135b356c90c488818706fce238dcbe90be7c5dc`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Correction: data-room disclosure policy explicitly states that confidential diligence content stays out of the public repository and is referenced from protected storage.
- Investor truth boundary: no invented traction, valuation, financing terms, investor commitments or guaranteed returns.
- Successor execution authority: `NONE`; WO-016 remains NOT_ADMITTED until separately compiled and locked.
