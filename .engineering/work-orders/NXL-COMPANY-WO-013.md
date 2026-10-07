# NXL-COMPANY-WO-013 — Sales, GTM, Marketing & Customer Success

**Issue:** #14  
**Status:** `APPROVED / MERGED`  
**Classification:** `NECESSARY`  
**Risk:** `STANDARD / COMMERCIAL_GOVERNANCE`  
**Base:** `9d75babe50c866a4901ba766ce686790df38326d`  
**Branch:** `planning/NXL-COMPANY-WO-013-sales-gtm-marketing-customer-success`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-013.json`

## OBJECTIVE

Define the canonical NexLabs commercial engine from market/ICP selection through positioning, acquisition, sales qualification, CRM, conversion, onboarding, activation, customer success, retention, expansion and lifecycle measurement.

## CONTEXT

WO-004 defined business/revenue architecture. WO-008 defined Product Factory and evidence before build/scale. WO-011 defined privacy/security. WO-012 defined financial truth and unit economics. WO-013 connects those systems into a governed commercial operating model without inventing market traction, creating deceptive marketing, or scaling unvalidated products.

## SCOPE

- GTM operating model.
- ICP and market-segment framework.
- Positioning/value-proposition handoff from approved product strategy.
- Channel selection and experimentation.
- Demand generation/content/SEO principles.
- Lifecycle marketing.
- Sales pipeline/stages/qualification.
- CRM data model and source-of-truth rules.
- Sales-to-product/customer-success handoff.
- Onboarding/activation.
- Customer-success health/retention/expansion.
- Commercial metrics and attribution.
- Experimentation/learning loop.
- Commercial messaging/evidence guardrails.
- Privacy/consent/data-minimization guardrails.
- Founder authority and escalation.
- Update Source Hierarchy and Decisions Ledger.
- Add deterministic GTM validation CI.

## OUT OF SCOPE

- Running live ad campaigns.
- Sending cold outreach.
- Purchasing leads.
- Connecting CRM/marketing automation tools.
- Creating product-specific campaigns or sales scripts.
- Publishing SEO content.
- Committing actual customer/prospect personal data.
- Inventing testimonials, logos, case studies, market share or traction.
- Product-specific legal/regulated marketing approvals.
- Website/brand implementation.
- Full Company OS commercial runtime.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Requirements / DoD
4. `company/BUSINESS-MODEL.md`
5. `company/PRODUCT-FACTORY.md`
6. `company/PRODUCT-PORTFOLIO-STRATEGY.md`
7. `company/PRODUCT-INTAKE.md`
8. `company/PRODUCT-VALIDATION-GATES.md`
9. `company/PRICING-PRINCIPLES.md`
10. `company/MONETIZATION-GUARDRAILS.md`
11. `company/FINANCE-OPERATING-MODEL.md`
12. `company/REVENUE-METRICS.md`
13. `company/DATA-GOVERNANCE-AND-PRIVACY.md`
14. `company/SECURITY-ARCHITECTURE.md`
15. this Work Order and Context Lock
16. exact Git/GitHub state

## REQUIREMENTS

Primary traceability: REQ-001, REQ-005, REQ-011, REQ-014, REQ-018, REQ-019, REQ-020.

## COMMERCIAL RULES TO FREEZE

- GTM starts from approved product/problem evidence, not from generic traffic goals.
- ICP is evidence-backed and product-specific.
- Positioning must not promise capabilities or outcomes the product cannot support.
- Channel choice is hypothesis-driven and measured by qualified downstream outcomes.
- Traffic/impressions alone are not commercial success.
- Sales qualification separates fit, pain, urgency, authority, budget/economics and risk.
- CRM becomes the operational commercial source of truth for interactions/stages, but canonical strategy remains in Git.
- Every stage transition has explicit entry/exit criteria.
- Marketing attribution carries uncertainty; last-click is not automatically ground truth.
- Consent/privacy requirements apply to marketing/contact data.
- Customer onboarding aims at time-to-value and activation, not merely account creation.
- Customer Success owns value realization/retention signals, not only ticket response.
- Expansion requires demonstrated value and trust; dark patterns/captive renewal tactics are prohibited.
- Churn/loss reasons are captured as evidence for Product Factory.
- Commercial experiments have hypothesis, target segment, channel, budget/cap, success metric and stop condition.
- Founder/CEO retains final authority over company positioning, major channel spend, enterprise commitments and strategically material partnerships.
- No fabricated testimonials, logos, numbers, scarcity, ROI or customer claims.

## ALLOWED OUTPUTS

- `company/GO-TO-MARKET-OPERATING-MODEL.md`
- `company/ICP-AND-SEGMENTATION.md`
- `company/POSITIONING-AND-VALUE-PROPOSITION.md`
- `company/CHANNEL-STRATEGY.md`
- `company/CONTENT-SEO-AND-DEMAND-GENERATION.md`
- `company/LIFECYCLE-MARKETING.md`
- `company/SALES-PIPELINE-AND-QUALIFICATION.md`
- `company/CRM-OPERATING-MODEL.md`
- `company/ONBOARDING-AND-ACTIVATION.md`
- `company/CUSTOMER-SUCCESS-RETENTION-EXPANSION.md`
- `company/COMMERCIAL-METRICS-AND-ATTRIBUTION.md`
- `company/GTM-EXPERIMENTATION-LOOP.md`
- `company/COMMERCIAL-CLAIMS-AND-TRUST-POLICY.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-013 evidence

## ACCEPTANCE CRITERIA

1. GTM lifecycle connects Product Factory evidence to acquisition/sales/success.
2. ICP framework distinguishes segment, role, problem, context, willingness/ability to pay, disqualifiers and evidence confidence.
3. Positioning/value proposition cannot invent capabilities/ROI/proof.
4. Channel strategy is experiment-based with downstream metrics and economics.
5. SEO/content policy optimizes user/problem value rather than keyword stuffing.
6. Lifecycle marketing covers acquisition → activation → retention → expansion/win-back where appropriate.
7. Sales pipeline has explicit stages and qualification/exit criteria.
8. CRM model separates contact/account/opportunity/activity/consent/source.
9. Onboarding defines activation and time-to-value.
10. Customer success includes health, retention, churn-risk, value realization and expansion criteria.
11. Commercial metrics cover funnel, CAC/payback linkage, retention/NRR/GRR where applicable, attribution confidence.
12. Commercial experiments have hypothesis, cap, success metric and stop condition.
13. Claims/trust policy prohibits fabricated social proof, fake scarcity and unsupported ROI claims.
14. Marketing/prospect data remains subject to privacy/data governance.
15. Product feedback/churn/loss loops return evidence into Product Factory.
16. WO-014 and later remain NOT_ADMITTED.
17. Existing persistent validations plus GTM validation pass on exact head.
18. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all thirteen commercial documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-013 is the only admitted Work Order.
- Assert WO-014..WO-022 remain NOT_ADMITTED.
- Assert ICP evidence/disqualifier fields.
- Assert positioning truth guardrails.
- Assert channel experiment + downstream outcome rules.
- Assert pipeline stages and qualification.
- Assert CRM consent/source fields.
- Assert activation/time-to-value.
- Assert retention/churn/expansion health model.
- Assert attribution uncertainty.
- Assert no fabricated social proof / fake scarcity / unsupported ROI.
- Assert feedback loop to Product Factory.
- Run all persistent validations plus GTM validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, ICP integrity, positioning truthfulness, channel economics, pipeline/CRM, onboarding/CS, metrics/attribution, privacy/trust, Product Factory feedback loop, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-013. Do not admit or execute WO-014 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `6fd643a1966fb6a3ea4274bc57db3fef7d7880fb`
- All thirteen required validations: `SUCCESS`
- GTM merge SHA: `0aec48c357fe493267a0645319b548f083195105`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Commercial truth boundary: no fabricated testimonials, logos, traction, ROI, scarcity, security/compliance claims or customer proof.
- Successor execution authority: `NONE`; WO-014 remains NOT_ADMITTED until separately compiled and locked.
