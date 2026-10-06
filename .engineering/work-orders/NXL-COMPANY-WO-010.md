# NXL-COMPANY-WO-010 — Research, Innovation & Intellectual Property Strategy

**Issue:** #11  
**Status:** `APPROVED / MERGED`  
**Classification:** `IMPORTANT`  
**Risk:** STANDARD / strategic-IP sensitive  
**Base:** `fa48d515eeaf9b045b3a2ab13d6c3fe056a522ff`  
**Branch:** `planning/NXL-COMPANY-WO-010-research-innovation-ip`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-010.json`

## OBJECTIVE

Define the canonical NexLabs research and innovation system: how research questions are formed, evidence is captured, prototypes are gated, inventions are recorded, ownership/provenance is preserved, and technology moves to proprietary use, licensing, open source, publication or product.

## CONTEXT

NexLabs intends to build reusable/proprietary technology, not only individual applications. WO-008 defined Product Factory and WO-009 defined autonomous engineering. WO-010 defines the upstream research/innovation layer and downstream IP disposition rules without making legal claims that require counsel or formal registration.

## SCOPE

- Define Research & Innovation strategy.
- Define research lifecycle and state vocabulary.
- Define evidence/source standards.
- Define Innovation Ledger.
- Define prototype/spike gates.
- Define invention disclosure record.
- Define IP ownership/provenance principles.
- Define third-party/open-source dependency provenance requirements.
- Define proprietary vs patent-review vs trade-secret candidate vs open-source vs publication decision framework.
- Define licensing strategy boundaries.
- Define publication/open-source release gates.
- Define technology-transfer path from research to Product Factory/engineering.
- Define Founder/CEO decision points.
- Update Source Hierarchy and Decisions Ledger.
- Add deterministic Research & IP validation CI.

## OUT OF SCOPE

- Filing patents or trademarks.
- Formal legal opinions.
- Signing licenses/contracts.
- Product-specific IP registration.
- Implementing a research database/runtime.
- Security architecture implementation (WO-011).
- Financial/GTM automation.
- Publishing actual proprietary source code.
- Claiming patentability, freedom-to-operate or legal ownership without professional/legal evidence.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Scope / DoD / Requirements / Architecture
4. `company/COMPANY-MASTER.md`
5. `company/PRODUCT-FACTORY.md`
6. `company/AUTONOMOUS-SOFTWARE-FACTORY.md`
7. `company/AI-EMPLOYEE-CONTRACT.md`
8. this Work Order and Context Lock
9. exact Git/GitHub state

## REQUIREMENTS

Primary traceability: REQ-001, REQ-005, REQ-011, REQ-018, REQ-019, REQ-020.

## RESEARCH/IP RULES TO FREEZE

- Research claims distinguish source evidence, experiment result, inference, assumption and unknown.
- A prototype demonstrates a technical hypothesis, not product validation by itself.
- Research output does not become company/product truth without an accepted decision/handoff.
- Every potentially reusable/proprietary invention must have attributable provenance.
- AI-generated contribution does not erase human/company/legal provenance requirements.
- Third-party code/models/data/licenses must remain traceable.
- “Proprietary” is a company treatment/state, not a patentability claim.
- Patent, trademark, trade-secret, copyright and licensing questions requiring legal judgment are escalated to qualified counsel.
- Open-source/publication release requires a provenance/license/security/secrets review.
- Public disclosure of a patent-review or trade-secret candidate is blocked until Founder/legal decision.
- Founder/CEO retains disposition authority for strategically material IP.
- Research-to-product transfer requires a decision package and then follows Product Factory/GEF gates.

## ALLOWED OUTPUTS

- `company/RESEARCH-INNOVATION-STRATEGY.md`
- `company/RESEARCH-LIFECYCLE.md`
- `company/RESEARCH-EVIDENCE-STANDARDS.md`
- `company/INNOVATION-LEDGER.md`
- `company/PROTOTYPE-GATES.md`
- `company/INVENTION-DISCLOSURE.md`
- `company/IP-OWNERSHIP-AND-PROVENANCE.md`
- `company/LICENSING-STRATEGY.md`
- `company/OPEN-SOURCE-AND-PUBLICATION-POLICY.md`
- `company/TECHNOLOGY-TRANSFER-TO-PRODUCT.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-010 evidence

## ACCEPTANCE CRITERIA

1. Research lifecycle states are explicit from question/intake through evidence, prototype and disposition.
2. Evidence standard distinguishes external sources, experiment data, inference, assumption and unknown.
3. Innovation Ledger records reusable ideas/tech without falsely asserting legal protection.
4. Prototype gates separate technical proof from product/business validation.
5. Invention disclosure records contributors, dates, sources, dependencies and prior disclosure.
6. IP provenance covers AI, third-party code/models/data and licensing references.
7. Patent/trademark/trade-secret/legal questions are escalated, not guessed.
8. Open-source/publication policy blocks secrets, incompatible licenses and protected-IP disclosure.
9. Licensing strategy defines inbound/outbound license review and no-signing-by-agent boundaries.
10. Technology transfer connects research to Product Factory and GEF without bypassing validation.
11. Founder/CEO disposition authority is explicit.
12. Source Hierarchy and Decisions Ledger record Research/IP authority.
13. WO-011 and later remain NOT_ADMITTED.
14. Existing persistent validations plus Research/IP validation pass on exact head.
15. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all ten Research/IP documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-010 is the only admitted Work Order.
- Assert WO-011..WO-022 remain NOT_ADMITTED.
- Assert research states include QUESTION/INTAKE, RESEARCH, EVIDENCE, PROTOTYPE and DISPOSITION/TRANSFER.
- Assert evidence taxonomy includes evidence, experiment, inference, assumption and unknown.
- Assert prototype != product validation.
- Assert invention disclosure/provenance fields exist.
- Assert public/open-source gate checks secrets, licenses and IP disposition.
- Assert legal/patentability claims require escalation.
- Assert research-to-product handoff references Product Factory/GEF.
- Run all existing persistent validations plus Research/IP validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, research rigor, provenance completeness, IP disposition safety, licensing/open-source boundaries, transfer-to-product correctness, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-010. Do not admit or execute WO-011 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `cf211ff07f2cf4b9dad93407461801716fcf862c`
- All ten required validations: `SUCCESS`
- Research/IP merge SHA: `c4617a0eaa3839e4e0ad0225f8ed3e7442d5197e`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Legal/IP boundary: internal governance only; formal patentability, inventorship, FTO, ownership disputes and filings remain outside this Work Order.
- Successor execution authority: `NONE`; WO-011 remains NOT_ADMITTED until separately compiled and locked.
