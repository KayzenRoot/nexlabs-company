# NXL-COMPANY-WO-014 — Brand System, Institutional Website & Public Portfolio

**Issue:** #15  
**Status:** `APPROVED / MERGED`  
**Classification:** `IMPORTANT`  
**Risk:** `STANDARD / PUBLIC_IDENTITY_GOVERNANCE`  
**Base:** `0ab7771edcb043f8277a728fbbfb118d52a366c9`  
**Branch:** `planning/NXL-COMPANY-WO-014-brand-website-portfolio`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-014.json`

## OBJECTIVE

Define the canonical NexLabs public identity, naming/mark usage, visual language, motion language, institutional website information architecture, public portfolio schema, case-study standard, public-proof/disclosure rules and implementation handoff requirements.

## CONTEXT

WO-003 defined company strategy. WO-008 defined portfolio strategy. WO-013 defined commercial positioning and truthfulness. The existing `KayzenRoot/nexlabs-website` repository already contains owner-approved visual implementation evidence at commit `e14cfbe4660b076db85e7e529befffe17a098cd1`.

Current implementation evidence includes:
- selected brand concept `NEX-N-A-PRECISION-BLADES`;
- flat SVG master as identity source of truth;
- wordmark treatments `NEX LABS` and `NEX LABS / TECHNOLOGY`;
- near-black/graphite, cold white, blue-gray, ice cyan/electric blue, restrained violet and silver/chrome material roles;
- cinematic advanced-research/engineering atmosphere;
- owner-approved Home master composition;
- living-organism motion language;
- explicit anti-patterns against generic gaming/cyberpunk/crypto-token styling and fabricated proof.

This Work Order promotes the corporate brand/website/portfolio rules into company authority. It does not reimplement the website.

## SCOPE

- Brand foundation and principles.
- Corporate-name / wordmark usage rules.
- Logo/mark usage and identity hierarchy.
- Visual system requirements.
- Motion/living-system language.
- Brand voice and public copy rules.
- Institutional website information architecture.
- Public website content contract.
- Public portfolio schema.
- Case-study format.
- Public proof/disclosure policy.
- Public asset governance.
- Accessibility/performance brand guardrails.
- Cross-repository implementation handoff rules.
- Source Hierarchy and Decisions Ledger updates.
- Deterministic Brand/Public Presence validation CI.

## OUT OF SCOPE

- Redesigning or coding `nexlabs-website`.
- Generating a new logo.
- Replacing the owner-approved Precision Blades N.
- Publishing website changes.
- Creating unverified case studies.
- Inventing customers, partners, projects, patents, awards, certifications, team size, statistics or outcomes.
- Trademark/legal clearance certification.
- Final font-license procurement.
- Investor Room implementation.
- Public contact forms/CRM integrations.
- Product-specific marketing execution.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Requirements / DoD
4. `company/COMPANY-MASTER.md`
5. `company/GO-TO-MARKET-OPERATING-MODEL.md`
6. `company/POSITIONING-AND-VALUE-PROPOSITION.md`
7. `company/COMMERCIAL-CLAIMS-AND-TRUST-POLICY.md`
8. `company/PRODUCT-PORTFOLIO-STRATEGY.md`
9. `company/PRODUCT-FACTORY.md`
10. `company/RESEARCH-INNOVATION-STRATEGY.md`
11. `company/IP-OWNERSHIP-AND-PROVENANCE.md`
12. `company/SECURITY-ARCHITECTURE.md`
13. `company/DATA-GOVERNANCE-AND-PRIVACY.md`
14. implementation evidence from `KayzenRoot/nexlabs-website@e14cfbe4660b076db85e7e529befffe17a098cd1`:
    - `.engineering/BRAND-SYSTEM.md`
    - `.engineering/UI-UX.md`
    - `.engineering/VISUAL-DIRECTION.md`
    - `.engineering/HOME-VISUAL-MASTER-SPEC.md`
    - `.engineering/SECONDARY-PAGES-SPEC.md`
15. this Work Order and Context Lock
16. exact Git/GitHub state

## REQUIREMENTS

Primary traceability: REQ-001, REQ-005, REQ-011, REQ-018, REQ-019, REQ-020.

## BRAND RULES TO FREEZE

- Canonical corporate name is `NexLabs Technology`.
- `NEX LABS` and `NEX LABS / TECHNOLOGY` are approved visual wordmark treatments; spacing in the mark does not create a second company identity.
- Precision Blades N is the selected identity direction; a generic replacement N is prohibited without a new Founder-approved brand decision.
- The flat/vector silhouette is identity source of truth; chrome/glass/light are presentation layers.
- Brand must feel premium, advanced, precise, research-oriented, cinematic and human-centered.
- Brand must not drift into esports/gaming, crypto-token, rainbow-AI, noisy cyberpunk or excessive-neon styling.
- Primary material system: near-black/graphite, cold white, blue-gray, ice cyan/electric blue, restrained violet, silver/chrome.
- Motion should make the environment feel alive, not animated for its own sake.
- Reduced-motion/static behavior must preserve brand meaning and usability.
- Website should feel like one connected technological organism, not unrelated section templates.
- Public copy is factual-safe and cannot create social proof by implication.
- Public portfolio may show only evidence-backed products/projects/technology with explicit status.
- Portfolio labels must distinguish concept/research/prototype/active product/deployed/public/open-source states.
- Case studies require real source evidence and may not imply external customer work when the project is internal.
- Public screenshots/demos/assets must not leak secrets, personal data, confidential IP or private customer/partner information.
- Website accessibility, performance and semantic usability outrank decorative fidelity when there is a conflict.
- Founder approval is required for material identity changes.

## ALLOWED OUTPUTS

- `company/BRAND-SYSTEM.md`
- `company/NAME-AND-MARK-USAGE.md`
- `company/VISUAL-LANGUAGE.md`
- `company/MOTION-AND-LIVING-SYSTEM.md`
- `company/BRAND-VOICE-AND-PUBLIC-COPY.md`
- `company/INSTITUTIONAL-WEBSITE-IA.md`
- `company/PUBLIC-WEBSITE-CONTENT-CONTRACT.md`
- `company/PUBLIC-PORTFOLIO-SCHEMA.md`
- `company/CASE-STUDY-STANDARD.md`
- `company/PUBLIC-PROOF-AND-DISCLOSURE-POLICY.md`
- `company/PUBLIC-ASSET-GOVERNANCE.md`
- `company/ACCESSIBILITY-PERFORMANCE-BRAND-GUARDRAILS.md`
- `company/BRAND-WEBSITE-IMPLEMENTATION-HANDOFF.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-014 evidence

## ACCEPTANCE CRITERIA

1. Corporate-name and visual-wordmark rules are unambiguous.
2. Precision Blades N is frozen as selected identity direction.
3. Visual system preserves approved material/color roles.
4. Anti-patterns explicitly reject gaming/crypto-token/rainbow-AI/excessive-neon drift.
5. Motion system defines living-organism behavior and reduced-motion/static fallback.
6. Brand voice/public copy inherits commercial truth policy.
7. Website IA covers current institutional/public needs and separates implemented vs future routes.
8. Website content contract prevents fictional proof/content.
9. Portfolio schema includes status, problem, solution, proof/evidence, technology, metrics state, demo/public links and disclosure class.
10. Case-study standard distinguishes internal product/research work from external/client work.
11. Public proof policy blocks fabricated customers, partners, patents, awards, certifications, stats and outcomes.
12. Asset governance covers provenance, licensing, privacy, confidentiality and logo-master integrity.
13. Accessibility/performance rules protect semantic content from visual/3D dependency.
14. Implementation handoff clearly separates company authority from website-repo implementation evidence.
15. WO-015 and later remain NOT_ADMITTED.
16. Existing persistent validations plus Brand/Public Presence validation pass on exact head.
17. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all thirteen brand/public-presence documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-014 is the only admitted Work Order.
- Assert WO-015..WO-022 remain NOT_ADMITTED.
- Assert canonical company name and wordmark distinction.
- Assert Precision Blades identity.
- Assert approved palette/material roles.
- Assert anti-gaming/crypto/rainbow-AI styling rules.
- Assert living-organism + reduced-motion semantics.
- Assert portfolio status/evidence/disclosure fields.
- Assert case-study internal-vs-external classification.
- Assert fabricated proof prohibition.
- Assert asset provenance/privacy/confidentiality rules.
- Assert accessibility/performance semantic fallback.
- Assert implementation handoff pins current `nexlabs-website` evidence.
- Run all persistent validations plus Brand/Public Presence validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, naming/identity fidelity, visual system, motion, voice/copy, website IA, portfolio/case-study integrity, public-proof/disclosure, asset governance, accessibility/performance, cross-repo handoff, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-014. Do not admit or execute WO-015 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `21d3e66ce07c3897d24f0d2192314fcff02d6a1f`
- All fourteen required validations: `SUCCESS`
- Brand/Public Presence merge SHA: `0f87e25d72694a8a81ff9a4cf143b7003c523936`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Pinned website implementation evidence: `KayzenRoot/nexlabs-website@e14cfbe4660b076db85e7e529befffe17a098cd1`
- Identity lock: `NexLabs Technology` corporate name; `NEX LABS` / `NEX LABS / TECHNOLOGY` approved wordmark treatments; `NEX-N-A-PRECISION-BLADES` selected symbol direction.
- Successor execution authority: `NONE`; WO-015 remains NOT_ADMITTED until separately compiled and locked.
