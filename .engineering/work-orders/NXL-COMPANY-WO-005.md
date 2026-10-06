# NXL-COMPANY-WO-005 — Corporate Governance, Authority & Risk Model

**Issue:** #6  
**Status:** `ADMITTED / IN_PROGRESS`  
**Classification:** `NECESSARY`  
**Risk:** ELEVATED / governance-critical  
**Base:** `0b4a6d3c15684503212a36c6174d9535a1b534ca`  
**Branch:** `planning/NXL-COMPANY-WO-005-governance`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-005.json`

## OBJECTIVE

Define the canonical authority system for NexLabs Technology: founder powers, AI-agent authority, action classes, approval gates, risk levels, escalation, separation of duties, prohibited actions and emergency behavior.

## CONTEXT

NexLabs is intentionally designed around one human founder and a governed AI workforce. The company strategy, business model and engineering governance are already canonical. Before defining specific AI employees, the company needs one authority model that every future agent, workflow and Company OS feature can inherit.

## SCOPE

- Define Corporate Governance principles.
- Define the authority hierarchy from Founder/CEO through AI executives/leads/specialists.
- Define action classes: AUTO, AUTO+AUDIT, REVIEW_REQUIRED, CEO_APPROVAL and PROHIBITED.
- Define risk classes and how risk maps to authorization.
- Define founder-reserved powers.
- Define default-deny behavior for unknown or conflicting authority.
- Define separation of duties and self-approval restrictions.
- Define escalation and timeout/failure behavior.
- Define emergency/incident authority without granting agents unrestricted powers.
- Define high-assurance rules for finance, privileged access, security, legal commitments and Web3/crypto signing.
- Define audit/receipt requirements for material actions.
- Update Source Hierarchy and Decisions Ledger.
- Add deterministic Governance validation CI.

## OUT OF SCOPE

- Detailed AI org chart and individual employee role definitions (WO-006/007).
- Company OS permission implementation.
- Actual credential provisioning.
- Legal entity/bylaws/shareholder documents.
- Detailed security architecture and LGPD program (WO-011).
- Financial budget/treasury processes (WO-012).
- Smart-contract deployment or financial transaction execution.
- Production incident tooling.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Scope / DoD / Requirements / Security baseline
4. `company/COMPANY-MASTER.md`
5. `company/STRATEGIC-BOUNDARIES.md`
6. `company/BUSINESS-MODEL.md`
7. `company/MONETIZATION-GUARDRAILS.md`
8. this Work Order and Context Lock
9. exact Git/GitHub provider state

## REQUIREMENTS

Primary traceability: REQ-001, REQ-002, REQ-011, REQ-012, REQ-013, REQ-016. Preserve GEF review gates and the current public-safe repository boundary.

## GOVERNANCE RULES TO FREEZE

- Founder/CEO is the ultimate human authority.
- No AI agent may grant itself new permissions.
- Unknown authority fails closed.
- Audit evidence is mandatory for material actions.
- An agent must not be the sole proposer, executor and approver of high-risk work.
- High-risk monetary, credential, legal, production-security and Web3 signing actions require explicit founder authorization unless a later narrower policy is formally approved.
- PROHIBITED actions cannot be authorized by lower-level workflow convenience.
- Emergency behavior prioritizes containment and reversible actions, not broad privilege expansion.
- GEF engineering promotion remains separately governed and cannot be bypassed by company hierarchy.

## ALLOWED OUTPUTS

- `company/CORPORATE-GOVERNANCE.md`
- `company/AUTHORITY-MATRIX.md`
- `company/RISK-CLASSIFICATION.md`
- `company/APPROVAL-POLICY.md`
- `company/SEGREGATION-OF-DUTIES.md`
- `company/ESCALATION-AND-INCIDENT-AUTHORITY.md`
- `company/PROHIBITED-ACTIONS.md`
- `company/AUDIT-AND-RECEIPTS.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-005 evidence

## ACCEPTANCE CRITERIA

1. Founder-reserved powers are explicit.
2. AI authority is delegated, bounded and revocable.
3. The five action classes are defined unambiguously.
4. Risk levels map to minimum authorization/assurance.
5. Unknown or conflicting authority is fail-closed.
6. High-risk self-approval is prohibited.
7. Separation-of-duties rules cover planning/execution/review and money/credential/signing operations.
8. Escalation defines blocked, unavailable and time-sensitive behavior without silent authority expansion.
9. Emergency authority permits containment/reversible action but not unrestricted destructive action.
10. Prohibited actions include self-expansion, secret exfiltration, governance bypass, unrestricted funds/crypto movement and history/security-gate weakening.
11. Material actions require attributable audit/receipt evidence.
12. Source Hierarchy and Decisions Ledger record governance authority.
13. WO-006 and later remain NOT_ADMITTED.
14. Persistent GEF/Source Pack/Strategy/Business Model plus Governance validation pass on exact head.
15. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all eight governance documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-005 is the only admitted Work Order.
- Assert WO-006..WO-022 remain NOT_ADMITTED.
- Assert all five action classes exist.
- Assert high-risk categories include funds, credentials, security, legal and signing.
- Assert self-permission expansion and high-risk self-approval are prohibited.
- Assert default-deny/unknown behavior is present.
- Assert no document grants blanket autonomous fund/crypto movement.
- Run existing persistent validations plus Governance validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, authority consistency, risk mapping, separation of duties, escalation, prohibited actions, evidence, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-005. Do not admit or execute WO-006 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.
