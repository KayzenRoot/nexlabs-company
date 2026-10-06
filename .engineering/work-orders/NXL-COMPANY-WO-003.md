# NXL-COMPANY-WO-003 — Company Master, Mission, Vision & Positioning

**Issue:** #4  
**Status:** `APPROVED / MERGED`  
**Classification:** `NECESSARY`  
**Risk:** LOW / strategy-critical  
**Base:** `a0d3650183ee30ff9ca8aefaff936abd699e4fae`  
**Branch:** `planning/NXL-COMPANY-WO-003-company-master`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-003.json`

## OBJECTIVE

Define the canonical public-safe identity of NexLabs Technology: what the company is, why it exists, the markets it may serve, the strategic thesis that unifies those markets, its values, positioning, boundaries and five-year direction.

## CONTEXT

WO-002 established the canonical Source Pack and made WO-003 the sole next eligible admission. NexLabs is a one-founder AI-native technology company whose workforce is designed around governed AI agents. The company may build products across AI, Web2, Web3, crypto/financial intelligence, developer tools, data and games, but it needs a single coherent thesis rather than an unfocused "we do everything" identity.

## SCOPE

- Create the canonical Company Master.
- Freeze Mission, Vision and Values.
- Define the Company Thesis and strategic pillars.
- Define market/category positioning and a concise positioning statement.
- Define company domains and clear strategic boundaries.
- Define a five-year direction without inventing unsupported financial/traction claims.
- Update Source Hierarchy so company-strategy authority is explicit.
- Record new strategic decisions in the Decisions Ledger.
- Keep all content safe for the current public repository.

## OUT OF SCOPE

- Pricing, revenue model or unit economics (WO-004).
- Detailed corporate/agent approval matrix (WO-005).
- Full AI org chart/roles (WO-006/007).
- Product Factory mechanics (WO-008/009).
- Final brand/logo/site design (WO-014).
- Investor terms/cap table/fundraising numbers (WO-015).
- Company OS implementation.
- Confidential strategy, customers, personal data or credentials.

## FILES/SOURCES TO READ

1. `.engineering/CHECKPOINT.md` and `.json`
2. `.engineering/DECISIONS-LEDGER.md`
3. `.engineering/SCOPE.md`
4. `.engineering/DEFINITION-OF-DONE.md`
5. `.engineering/ARCHITECTURE.md`
6. `.engineering/REQUIREMENTS.md`
7. `.engineering/PROJECT-OVERVIEW.md`
8. `.engineering/SOURCE-HIERARCHY.md`
9. this Work Order and Context Lock
10. exact Git/GitHub provider state

## REQUIREMENTS

Primary traceability: REQ-001, REQ-002, REQ-005, REQ-018, REQ-019 and REQ-020. Preserve all existing security/governance requirements.

## ARCHITECTURE / STRATEGY RULES

- Preserve founder authority and AI-native operating thesis.
- The company must have one unifying thesis even though it can operate across multiple technology domains.
- Do not present NexLabs as a generic agency or "everything company."
- Do not lock company identity to Hermes, Codex, OpenAI or any single provider.
- Products may have independent brands/repositories while inheriting NexLabs governance where applicable.
- Separate factual current state from aspirational five-year direction.
- Do not fabricate traction, customers, revenue, patents, certifications or staff.

## ALLOWED OUTPUTS

- `company/COMPANY-MASTER.md`
- `company/MISSION-VISION-VALUES.md`
- `company/COMPANY-THESIS.md`
- `company/POSITIONING.md`
- `company/STRATEGIC-BOUNDARIES.md`
- `company/FIVE-YEAR-DIRECTION.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and evidence for WO-003

## ACCEPTANCE CRITERIA

1. Company Master exists and identifies NexLabs consistently with canonical project sources.
2. Mission, Vision and Values are explicit, concise and non-contradictory.
3. One Company Thesis unifies the permitted product domains.
4. Positioning distinguishes NexLabs from a generic software agency and from a single-product startup.
5. Strategic boundaries state what NexLabs will and will not do.
6. Five-year direction clearly separates targets/aspirations from current facts.
7. Source Hierarchy identifies company-strategy authority.
8. Decisions Ledger records accepted WO-003 strategic decisions.
9. No invented financial, traction, customer, staff, legal or IP claims.
10. WO-004 and all later WOs remain NOT_ADMITTED.
11. GEF and company-governance validation pass on exact head.
12. Exact-head self-audit finds no unresolved HIGH/CRITICAL defect.

## TESTS

- Assert all six company strategy documents exist.
- Assert Company Master references Mission, Vision, Thesis, Positioning, Boundaries and Five-Year Direction.
- Assert no prohibited factual-claim placeholders such as fabricated revenue/customer counts are introduced.
- Parse current Checkpoint and Context Lock.
- Assert exactly WO-003 is admitted.
- Assert WO-004..WO-022 remain NOT_ADMITTED.
- Run persistent GEF v1.1.2 validation.
- Run Source Pack/governance validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, source consistency, scope compliance, acceptance criteria, tests/checks, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-003. Do not admit or execute WO-004 in the same PR. Promotion and issue close require a separate bounded checkpoint delta after the approved implementation merge.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `81b0ea54f3276c45e777daa134ebf86bfae1fcfd`
- Validate GEF 1.1.2: `SUCCESS`
- Validate NexLabs Source Pack: `SUCCESS`
- Validate NexLabs Company Strategy: `SUCCESS`
- Strategy merge SHA: `151576c869566e89ada8ec09c65f4f75fdbd885f`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Correction history: two direct validator fixes; no strategic requirement or product scope was weakened.
- Successor execution authority: `NONE`; WO-004 remains NOT_ADMITTED until separately compiled and locked.
