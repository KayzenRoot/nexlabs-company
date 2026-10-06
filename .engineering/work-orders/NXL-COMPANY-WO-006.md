# NXL-COMPANY-WO-006 — AI Workforce & Organizational Architecture

**Issue:** #7  
**Status:** `APPROVED / MERGED`  
**Classification:** `NECESSARY`  
**Risk:** ELEVATED / organization-critical  
**Base:** `e67ecc6e14af6e0ebfa3bd627281bc241d5c4d37`  
**Branch:** `planning/NXL-COMPANY-WO-006-ai-workforce`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-006.json`

## OBJECTIVE

Design the canonical one-founder AI-native organization for NexLabs Technology: executive layer, functional teams, software-delivery cell, role taxonomy, elastic staffing model, minimum viable workforce and phased workforce expansion.

## CONTEXT

WO-003 defined NexLabs as an AI-native technology company and product studio. WO-005 froze Founder/CEO authority, delegated AI authority and risk controls. WO-006 now defines **which organizational roles exist and how they relate**, without yet specifying the detailed employee contract, memory schema, tool grants or KPI contract that belong to WO-007.

The target workforce must reproduce the proven founder operating pattern: strategic planning and architecture first, bounded execution second, tests/evidence third, review/audit fourth, checkpoint/promotion last.

## SCOPE

- Define the canonical AI organization and reporting topology.
- Define a small executive/coordination core.
- Define elastic specialist teams that activate by work demand instead of creating dozens of always-on agents.
- Define the canonical autonomous software-delivery cell.
- Define role families and role taxonomy.
- Define minimum viable workforce required for v0.1.
- Define staffing/activation phases from local prototype through multi-product operation.
- Define role-combination rules and when separation is mandatory.
- Define organizational interfaces between Product, Engineering, Research, Security, Operations, Finance, Commercial and Founder.
- Preserve the authority/risk model from WO-005.
- Update Source Hierarchy and Decisions Ledger.
- Add deterministic AI Workforce validation CI.

## OUT OF SCOPE

- Per-agent role contract fields, detailed permissions, memory schema, KPI schema and escalation contract (WO-007).
- Detailed Product Factory lifecycle (WO-008).
- Detailed autonomous engineering workflow implementation (WO-009).
- Hiring humans or employment/legal documents.
- Runtime implementation, Hermes integration or Company OS code.
- Product-specific staffing.
- Granting any agent production credentials, spending authority, legal signing authority or unrestricted tool access.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Scope / DoD / Requirements / Architecture
4. `company/COMPANY-MASTER.md`
5. `company/CORPORATE-GOVERNANCE.md`
6. `company/AUTHORITY-MATRIX.md`
7. `company/RISK-CLASSIFICATION.md`
8. this Work Order and Context Lock
9. exact Git/GitHub provider state

## REQUIREMENTS

Primary traceability: REQ-001, REQ-002, REQ-003, REQ-009, REQ-010, REQ-011, REQ-012, REQ-014. Preserve the action classes, risk classes, founder-reserved authority and GEF engineering lifecycle.

## ORGANIZATION RULES TO FREEZE

- Founder/CEO is the only human executive required for the v0.1 company.
- The company uses a minimal always-on AI core plus elastic specialist agents.
- AI executive titles describe coordination responsibility, not human legal-office status.
- No role title grants authority beyond canonical governance.
- Software work follows Planner/Architect → Executor → Tests/Evidence → Reviewer/Auditor → Checkpoint.
- A single runtime may host multiple logical roles at low risk, but high-risk work must preserve the separation rules from WO-005.
- Specialist agents are instantiated/activated from approved role definitions rather than treated as permanent uncontrolled personas.
- Roles should be provider-independent; Hermes/OpenAI/Codex/etc. are runtime/executor choices, not organizational identities.
- The minimum viable workforce is deliberately smaller than the long-term organization.

## ALLOWED OUTPUTS

- `company/AI-ORGANIZATION.md`
- `company/AI-WORKFORCE-ARCHITECTURE.md`
- `company/EXECUTIVE-AGENTS.md`
- `company/ROLE-TAXONOMY.md`
- `company/TEAM-TOPOLOGY.md`
- `company/SOFTWARE-DELIVERY-CELL.md`
- `company/MINIMUM-VIABLE-WORKFORCE.md`
- `company/STAFFING-PHASES.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-006 evidence

## ACCEPTANCE CRITERIA

1. One-founder organization is explicit.
2. Executive/coordination core is small and justified.
3. Specialist workforce is elastic/on-demand by default.
4. Software-delivery cell reproduces the GEF planning/execution/review pattern.
5. Role taxonomy covers executive, product, engineering, research/data, security, operations, finance and commercial functions without creating unnecessary permanent agents.
6. Minimum viable workforce is explicitly smaller than the full target organization.
7. Staffing phases define when additional roles become justified.
8. Role title does not grant authority independent of WO-005 governance.
9. Provider/runtime independence is explicit.
10. High-risk logical separation rules are preserved.
11. Source Hierarchy and Decisions Ledger record AI-workforce authority.
12. WO-007 and later remain NOT_ADMITTED.
13. Existing persistent validations plus AI Workforce validation pass on exact head.
14. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all eight AI-workforce documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-006 is the only admitted Work Order.
- Assert WO-007..WO-022 remain NOT_ADMITTED.
- Assert Founder/CEO, Chief of Staff, Product, Engineering, Research, Security, Operations, Finance and Commercial role families are represented.
- Assert the software-delivery cell contains planning/architecture, execution, test/evidence and review/audit stages.
- Assert `elastic` or equivalent on-demand staffing is canonical.
- Assert no document grants role-based blanket authority.
- Assert runtime/provider names do not define organizational roles.
- Run all existing persistent validations plus AI Workforce validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, organizational coherence, authority consistency, staffing efficiency, software-cell fidelity, evidence, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-006. Do not admit or execute WO-007 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `0b3509499e8b8f01d56be60ca29317065433ee6a`
- Validate GEF 1.1.2: `SUCCESS`
- Validate NexLabs Source Pack: `SUCCESS`
- Validate NexLabs Company Strategy: `SUCCESS`
- Validate NexLabs Business Model: `SUCCESS`
- Validate NexLabs Governance: `SUCCESS`
- Validate NexLabs AI Workforce: `SUCCESS`
- Workforce merge SHA: `13fe75ebaaf7c77a7f3c9bf65b49e86f493260c8`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Successor execution authority: `NONE`; WO-007 remains NOT_ADMITTED until separately compiled and locked.
