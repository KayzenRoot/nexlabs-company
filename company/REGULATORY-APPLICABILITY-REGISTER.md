# NexLabs Technology — Regulatory Applicability Register

**Status:** `CANONICAL_WO_011`

This register tracks questions that must be resolved for a product/activity. It is not a legal opinion.

## Privacy / LGPD / ANPD

Trigger examples:
- personal-data collection;
- sensitive data;
- children/adolescent data;
- large-scale processing;
- automated decisions;
- international transfer;
- security incident.

Questions:
- controller/operator roles?
- purpose/legal basis?
- rights path?
- retention?
- DPIA/RIPD need?
- international-transfer mechanism?
- incident notification applicability?

Current anchors:
- LGPD, Lei 13.709/2018;
- ANPD incident regulation, Resolution CD/ANPD 15/2024;
- ANPD international-transfer regulation, Resolution CD/ANPD 19/2024.

These anchors must be current-checked before production decisions.

## Virtual assets / BCB

Trigger examples:
- custody;
- exchange/intermediation;
- transfer;
- service to third parties;
- virtual-asset business operation.

Question:
**Does this activity constitute a regulated virtual-asset service or activity requiring authorization/controls under the current Brazilian framework?**

Current BCB framework is evolving and must be checked for each product/activity.

## Cryptoassets / CVM

Trigger:
- token/cryptoasset may constitute a security/value-market instrument;
- public offering/investment arrangement;
- securities intermediation/advice activity.

Question:
**Does CVM jurisdiction or securities-market regulation apply?**

CVM Parecer de Orientação 40 is a baseline reference, not a complete future-state answer.

## Financial services / advice / trading

Triggers:
- customer funds;
- payments;
- brokerage/order routing;
- investment advice/recommendation;
- lending/credit;
- regulated analytics/data service.

Each trigger requires current BCB/CVM/other authority applicability analysis before production.

## Decision states

- `NOT_APPLICABLE`
- `APPLICABILITY_REVIEW_REQUIRED`
- `LEGAL_COMPLIANCE_REVIEW_REQUIRED`
- `AUTHORIZED_TO_PROCEED_WITH_CONTROLS`
- `BLOCKED_PENDING_REGULATORY_PATH`

## Fail closed

Unknown applicability for regulated financial/value-bearing operation is not permission to launch.
