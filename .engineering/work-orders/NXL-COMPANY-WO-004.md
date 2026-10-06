# NXL-COMPANY-WO-004 — Business Model & Revenue Architecture

**Issue:** #5  
**Status:** `ADMITTED / IN_PROGRESS`  
**Classification:** `NECESSARY`  
**Risk:** LOW / business-critical  
**Base:** `e3b56c9a48f2ae68412acb92f26c956108a16be4`  
**Branch:** `planning/NXL-COMPANY-WO-004-business-model`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-004.json`

## OBJECTIVE

Define how NexLabs Technology creates, captures and compounds economic value across owned software products, APIs/platforms, selective licensing and bounded strategic services without turning the company into a generic agency or inventing unsupported product pricing.

## CONTEXT

WO-003 established NexLabs as an AI-native technology company and product studio whose advantage compounds through owned products plus reusable internal capability. WO-004 must turn that strategy into a coherent revenue architecture before finance, GTM, investor and product-factory WOs build on it.

## SCOPE

- Define the canonical company-level Business Model.
- Define the Revenue Architecture and priority order of revenue streams.
- Define pricing principles without freezing unsupported product-specific prices.
- Define product/service boundaries and conditions under which services are allowed.
- Define recurring-revenue architecture and product-specific monetization options.
- Define monetization guardrails, especially for Web3/crypto/financial domains.
- Define economic measurement obligations required before scaling a product.
- Update Source Hierarchy and Decisions Ledger with business-model authority/decisions.
- Add deterministic business-model validation CI.
- Keep all content public-safe.

## OUT OF SCOPE

- Detailed financial forecasts, budget, runway, cap table or investment terms (WO-012/015).
- GTM channels, sales pipeline or customer-success operations (WO-013).
- Portfolio scoring/kill rules beyond business-model prerequisites (WO-008).
- Final prices for individual products that do not yet have product evidence.
- Legal/tax structure or regulated financial execution.
- Company OS implementation.
- Confidential customer, investor, banking or financial data.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Scope / DoD / Requirements
4. `company/COMPANY-MASTER.md`
5. `company/COMPANY-THESIS.md`
6. `company/POSITIONING.md`
7. `company/STRATEGIC-BOUNDARIES.md`
8. this Work Order and Context Lock
9. exact Git/GitHub provider state

## REQUIREMENTS

Primary traceability: REQ-005, REQ-018, REQ-019, REQ-020. Preserve founder authority, capital discipline, security and provider independence.

## BUSINESS RULES

- Owned products and recurring product revenue are the default orientation.
- Services, if used, must be strategically bounded and must not redefine NexLabs as a generic agency.
- Revenue diversification must not justify unrelated products.
- Speculative trading, treasury speculation or unrestricted on-chain execution are not default revenue streams.
- Pricing must be evidence-driven and product-specific when product evidence exists.
- Monetization must preserve user trust and regulatory/security boundaries.
- No revenue/ARR/customer claim may be invented.

## ALLOWED OUTPUTS

- `company/BUSINESS-MODEL.md`
- `company/REVENUE-ARCHITECTURE.md`
- `company/PRICING-PRINCIPLES.md`
- `company/PRODUCT-SERVICE-BOUNDARIES.md`
- `company/RECURRING-REVENUE-MODEL.md`
- `company/MONETIZATION-GUARDRAILS.md`
- `company/ECONOMIC-METRICS-BASELINE.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-004 evidence

## ACCEPTANCE CRITERIA

1. Business Model clearly states how NexLabs creates/captures value.
2. Revenue streams are prioritized rather than presented as an unbounded menu.
3. Owned recurring product revenue is the primary economic orientation.
4. Services are bounded by explicit admission criteria and cannot silently become the default business.
5. Pricing principles distinguish value, willingness-to-pay, cost-to-serve and product evidence.
6. Recurring revenue architecture covers subscriptions and applicable usage/hybrid models without inventing product prices.
7. Monetization guardrails cover ads/data, Web3/crypto/financial risk and deceptive dark patterns.
8. Economic metrics define minimum data required before a product is described as scalable.
9. Source Hierarchy identifies business-model authority.
10. Decisions Ledger records accepted WO-004 decisions.
11. WO-005 and later remain NOT_ADMITTED.
12. GEF, Source Pack, Company Strategy and Business Model validation pass on exact head.
13. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all seven company business-model documents exist.
- Assert Business Model references revenue architecture, pricing, service boundaries, recurring revenue, guardrails and economic metrics.
- Assert no fixed product-specific prices are introduced.
- Assert no unsupported revenue/customer/market claims are introduced.
- Parse Checkpoint and Context Lock.
- Assert WO-004 is the only admitted Work Order.
- Assert WO-005..WO-022 remain NOT_ADMITTED.
- Run persistent GEF, Source Pack and Company Strategy validation.
- Run WO-004 Business Model validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, source consistency, scope compliance, business-model coherence, acceptance criteria, tests/checks, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-004. Do not admit or execute WO-005 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.
