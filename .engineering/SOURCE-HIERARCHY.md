# NexLabs Company Source Hierarchy

Status: `CANONICAL`

Authority is resolved by domain. A newer file does not automatically override an approved canonical source.

| Priority | Domain | Canonical source |
| --- | --- | --- |
| 1 | Current state | `CHECKPOINT.md`, `CHECKPOINT.json`, exact Git/GitHub state |
| 2 | Decisions | `DECISIONS-LEDGER.md` and accepted ADRs |
| 3 | Scope | `SCOPE.md` and the active admitted Work Order |
| 4 | Completion | `DEFINITION-OF-DONE.md` |
| 5 | Architecture | `ARCHITECTURE.md` and accepted architecture ADRs |
| 6 | Requirements | `REQUIREMENTS.md` |
| 8 | Business model | `company/BUSINESS-MODEL.md` plus the supporting canonical business-model documents |
| 9 | Corporate governance | `company/CORPORATE-GOVERNANCE.md` plus authority/risk/approval supporting documents |
| 10 | AI workforce | `company/AI-ORGANIZATION.md` plus supporting workforce architecture documents |
| 11 | AI employee contract | `company/AI-EMPLOYEE-CONTRACT.md` plus supporting role/memory/permission documents |
| 12 | Product Factory | `company/PRODUCT-FACTORY.md` plus supporting portfolio/lifecycle documents |
| 13 | Autonomous software factory | `company/AUTONOMOUS-SOFTWARE-FACTORY.md` plus supporting engineering lifecycle protocols |
| 14 | Research & IP | `company/RESEARCH-INNOVATION-STRATEGY.md` plus supporting research/provenance/disposition documents |
| 15 | Security | `company/SECURITY-ARCHITECTURE.md` plus supporting security/privacy/Web3/financial controls; `.engineering/SECURITY.md` is the engineering baseline |
| 16 | Finance | `company/FINANCE-OPERATING-MODEL.md` plus supporting budget/economics/funding documents |
| 17 | GTM / Commercial | `company/GO-TO-MARKET-OPERATING-MODEL.md` plus supporting sales/marketing/customer-success documents |
| 18 | Brand / Public presence | `company/BRAND-SYSTEM.md` plus supporting website/portfolio/public-proof documents |
| 19 | Investor system | `company/INVESTOR-READINESS-OPERATING-MODEL.md` plus supporting pitch/data-room/investor documents |
| 20 | Company OS architecture | `company-os/ARCHITECTURE.md` plus functional architecture contracts |
| 21 | Local Docker runtime | `company-os/LOCAL-DOCKER-RUNTIME.md` plus `infra/docker/` executable contracts |
| 22 | Agent runtime | `company-os/AGENT-RUNTIME-DESIGN.md` plus Hermes integration and contract tests |
| 23 | Autonomous Engineering Cell MVP | `company-os/CELL-MVP.md` plus cell engine, tests and exact-head evidence |
| 24 | Validation | `TEST-BENCHMARK-PLAN.md` plus exact-head evidence |
| 25 | Deployment | `DEPLOYMENT.md` |
| 26 | Future work | `BACKLOG.md`, Work Order Registry and GitHub issues |
| 27 | Conversation | transient context only |

If canonical sources conflict, are missing, stale, or bound to another Git head, stop the affected progression and reconcile through the active Work Order. Never infer approval from chat history.


## Company-strategy authority

`company/COMPANY-MASTER.md` is the primary authority for company identity, mission, vision, category, thesis, strategic pillars and high-level boundaries.

The following documents refine that authority:
- `company/MISSION-VISION-VALUES.md`
- `company/COMPANY-THESIS.md`
- `company/POSITIONING.md`
- `company/STRATEGIC-BOUNDARIES.md`
- `company/FIVE-YEAR-DIRECTION.md`

Later Business Model, Governance, Workforce, Product Factory, Finance, GTM, Brand and Investor Work Orders may refine their own domains but must not silently redefine the approved company identity. A cross-domain conflict requires an explicit decision.


## Business-model authority

`company/BUSINESS-MODEL.md` is the primary authority for company-level value capture, revenue orientation and economic-model boundaries.

Supporting canonical business-model documents:
- `company/REVENUE-ARCHITECTURE.md`
- `company/PRICING-PRINCIPLES.md`
- `company/PRODUCT-SERVICE-BOUNDARIES.md`
- `company/RECURRING-REVENUE-MODEL.md`
- `company/MONETIZATION-GUARDRAILS.md`
- `company/ECONOMIC-METRICS-BASELINE.md`

Later Product Factory, Finance, GTM and Investor Work Orders may refine their own domains but may not silently invert the approved company-level revenue priorities or service boundary.


## Corporate-governance authority

`company/CORPORATE-GOVERNANCE.md` is the primary company authority for Founder/CEO powers, AI delegation and governance principles.

Supporting canonical governance:
- `company/AUTHORITY-MATRIX.md`
- `company/RISK-CLASSIFICATION.md`
- `company/APPROVAL-POLICY.md`
- `company/SEGREGATION-OF-DUTIES.md`
- `company/ESCALATION-AND-INCIDENT-AUTHORITY.md`
- `company/PROHIBITED-ACTIONS.md`
- `company/AUDIT-AND-RECEIPTS.md`

Later Workforce, Security, Finance and Company OS Work Orders may refine role/tool-specific policy, but may not silently lower the minimum authority or risk class established here.


## AI-workforce authority

`company/AI-ORGANIZATION.md` is the primary authority for organizational structure, executive/functional topology and the one-founder AI-native organization.

Supporting canonical workforce documents:
- `company/AI-WORKFORCE-ARCHITECTURE.md`
- `company/EXECUTIVE-AGENTS.md`
- `company/ROLE-TAXONOMY.md`
- `company/TEAM-TOPOLOGY.md`
- `company/SOFTWARE-DELIVERY-CELL.md`
- `company/MINIMUM-VIABLE-WORKFORCE.md`
- `company/STAFFING-PHASES.md`

WO-007 may define the per-agent employee contract, memory, permissions and KPIs, but it may not silently change the approved organization or founder authority.


## AI-employee-contract authority

`company/AI-EMPLOYEE-CONTRACT.md` is the primary authority for how a NexLabs AI employee is instantiated and governed.

Supporting canonical employee-contract sources:
- `company/AI-ROLE-SCHEMA.md`
- `company/AI-PERMISSIONS-MODEL.md`
- `company/AI-MEMORY-POLICY.md`
- `company/AI-TOOLS-AND-CAPABILITIES.md`
- `company/AI-KPI-AND-EVALUATION.md`
- `company/AI-ESCALATION-CONTRACT.md`
- `company/AI-FAILURE-AND-REPLACEMENT.md`
- `company/AI-RUN-RECEIPT-CONTRACT.md`

Later runtime/Hermes/Company OS implementation may instantiate this contract but may not silently weaken its memory precedence, permission or audit semantics.


## Product-Factory authority

`company/PRODUCT-FACTORY.md` is the primary authority for product lifecycle stages, gates and the handoff from validated opportunity to governed build.

Supporting canonical Product Factory sources:
- `company/PRODUCT-PORTFOLIO-STRATEGY.md`
- `company/PRODUCT-INTAKE.md`
- `company/PRODUCT-VALIDATION-GATES.md`
- `company/PORTFOLIO-SCORING.md`
- `company/PRODUCT-LIFECYCLE.md`
- `company/PRODUCT-CASE-CONTRACT.md`
- `company/ITERATE-SCALE-PAUSE-KILL.md`
- `company/PORTFOLIO-CAPACITY-POLICY.md`

WO-009 may automate the engineering portion of this factory but may not remove research, validation, portfolio decision, evidence or capacity gates.


## Autonomous-software-factory authority

`company/AUTONOMOUS-SOFTWARE-FACTORY.md` is the primary authority for the GEF-native autonomous engineering lifecycle and transition semantics.

Supporting canonical engineering-factory sources:
- `company/ENGINEERING-ROLE-CONTRACTS.md`
- `company/ENGINEERING-ORCHESTRATION-STATE-MACHINE.md`
- `company/WORK-ORDER-ADMISSION-PROTOCOL.md`
- `company/CONTEXT-LOCK-AND-PREFLIGHT.md`
- `company/EXECUTOR-ADAPTER-CONTRACT.md`
- `company/EVIDENCE-AND-EXACT-HEAD-PROTOCOL.md`
- `company/REVIEW-AND-CORRECTION-PROTOCOL.md`
- `company/CHECKPOINT-PROMOTION-PROTOCOL.md`
- `company/AUTONOMOUS-ENGINEERING-MVP.md`

Later Company OS and runtime Work Orders may implement this lifecycle, but may not silently remove admission, Context Lock, exact-head evidence, correction, review or checkpoint-promotion gates.


## Research-and-IP authority

`company/RESEARCH-INNOVATION-STRATEGY.md` is the primary authority for research purpose, innovation classification and high-level IP disposition governance.

Supporting canonical Research/IP sources:
- `company/RESEARCH-LIFECYCLE.md`
- `company/RESEARCH-EVIDENCE-STANDARDS.md`
- `company/INNOVATION-LEDGER.md`
- `company/PROTOTYPE-GATES.md`
- `company/INVENTION-DISCLOSURE.md`
- `company/IP-OWNERSHIP-AND-PROVENANCE.md`
- `company/LICENSING-STRATEGY.md`
- `company/OPEN-SOURCE-AND-PUBLICATION-POLICY.md`
- `company/TECHNOLOGY-TRANSFER-TO-PRODUCT.md`

Legal conclusions such as patentability, inventorship, freedom-to-operate, ownership disputes or binding license interpretation require appropriate professional/legal review and are not established merely by these internal documents.


## Security-architecture authority

`company/SECURITY-ARCHITECTURE.md` is the primary authority for company-wide security trust boundaries and security posture.

Supporting canonical security sources:
- `company/IDENTITY-AND-ACCESS-CONTROL.md`
- `company/SECRETS-KEYS-AND-CREDENTIALS.md`
- `company/DATA-GOVERNANCE-AND-PRIVACY.md`
- `company/SECURITY-INCIDENT-RESPONSE.md`
- `company/BACKUP-RECOVERY-AND-BCP.md`
- `company/SUPPLY-CHAIN-SECURITY.md`
- `company/AGENT-AND-TOOL-SECURITY.md`
- `company/WEB3-SIGNING-AND-CUSTODY-POLICY.md`
- `company/FINANCIAL-ACTION-SAFETY.md`
- `company/HIGH-ASSURANCE-ACTION-PROTOCOL.md`
- `company/SECURITY-LOGGING-AND-AUDIT.md`
- `company/THREAT-MODEL-BASELINE.md`
- `company/REGULATORY-APPLICABILITY-REGISTER.md`

`.engineering/SECURITY.md` is the concise engineering baseline and may not weaken these company-wide controls.

Later Company OS, runtime, finance, Web3 and deployment Work Orders must implement or refine controls without silently reducing Founder authority, segregation of duties, privacy obligations, signing safety or high-assurance requirements.


## Finance authority

`company/FINANCE-OPERATING-MODEL.md` is the primary authority for internal management finance and financial truth states.

Supporting canonical finance sources:
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

Management-finance policy does not replace statutory accounting, tax, legal financing documents or bank/investment execution controls.


## GTM / commercial authority

`company/GO-TO-MARKET-OPERATING-MODEL.md` is the primary authority for NexLabs commercial lifecycle from validated product evidence through acquisition, qualification, onboarding, retention and expansion.

Supporting canonical commercial sources:
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

Commercial strategy may refine product-specific channel/message execution but may not invent product capability, traction, customer proof or regulatory status.


## Brand / public-presence authority

`company/BRAND-SYSTEM.md` is the primary authority for NexLabs corporate brand identity and public visual principles.

Supporting canonical public-presence sources:
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

The company repository governs corporate truth and brand rules. The website repository governs implementation technique and visual execution, provided it does not contradict canonical company identity or public-proof rules.


## Investor-system authority

`company/INVESTOR-READINESS-OPERATING-MODEL.md` is the primary authority for NexLabs investor-readiness preparation and diligence packaging.

Supporting canonical investor sources:
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

Investor materials summarize canonical strategy/product/finance/proof sources and may not silently redefine them. Binding financing terms, securities/corporate records and legal conclusions require authoritative legal/company records and appropriate professional review.


## Company OS functional-architecture authority

`company-os/ARCHITECTURE.md` is the primary functional software architecture authority for NexLabs Company OS.

Supporting sources define bounded contexts, data model, state machines, APIs, events, audit/evidence, authorization, agent/runtime adapters, integrations, recovery, observability and local-first topology.

Canonical operating policy in `company/` outranks implementation convenience. Company OS architecture translates policy into software contracts; it does not rewrite business/governance truth.


## Local Docker runtime authority

`company-os/LOCAL-DOCKER-RUNTIME.md` is the primary authority for the NexLabs Company OS local infrastructure runtime.

Supporting canonical sources:
- `company-os/SECRETS-AND-CONFIGURATION.md`
- `company-os/BACKUP-RESTORE-LOCAL.md`
- `company-os/HEALTH-AND-READINESS.md`
- `company-os/LOCAL-OBSERVABILITY.md`
- `company-os/DEVELOPER-RUNBOOK.md`
- executable Compose/config/scripts under `infra/docker/`

The local runtime implements WO-016 architecture. It may not redefine PostgreSQL canonical truth, Redis non-authoritative semantics, provider independence, secret boundaries or high-assurance controls.


## Agent runtime authority

`company-os/AGENT-RUNTIME-DESIGN.md` governs provider-neutral session/tool/memory/budget/routing semantics. `company-os/HERMES-ADAPTER-SPEC.md` pins Hermes as a replaceable design adapter, not a required provider or host installation. Executable pure contract tests are under `company-os/contracts/`. Company OS governance and security policies outrank adapter affordances.


## Autonomous Engineering Cell MVP authority

`company-os/CELL-MVP.md` and `company-os/cell/engine.mjs` describe the first executable, offline engineering-cell slice. Approval verification, context lock, edit scope, QA, correction and receipt integrity are required. This deterministic mock-executor run is **not** evidence of live Hermes/LLM, host execution, GitHub mutation, independent human review or actual checkpoint promotion. Provider adapters cannot change authority.
