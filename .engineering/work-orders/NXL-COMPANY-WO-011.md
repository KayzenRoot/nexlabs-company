# NXL-COMPANY-WO-011 — Security, Privacy, Web3 & Financial Risk Architecture

**Issue:** #12  
**Status:** `APPROVED / MERGED`  
**Classification:** `NECESSARY`  
**Risk:** `HIGH_ASSURANCE / SECURITY_ARCHITECTURE`  
**Base:** `51d21ccc61ec6469118319eac5796c6fafc94d3d`  
**Branch:** `planning/NXL-COMPANY-WO-011-security-privacy-web3-financial-risk`  
**Context Lock:** `.engineering/context-locks/NXL-COMPANY-WO-011.json`

## OBJECTIVE

Define the canonical NexLabs security, privacy, Web3-signing and financial-risk architecture for an AI-native company, preserving fail-closed behavior, least privilege, data minimization, exact authorization, segregation of duties and explicit Founder approval for high-assurance actions.

## CONTEXT

WO-005 established company authority/risk classes. WO-007 defined AI employee permissions/memory. WO-009 defined autonomous engineering and recovery semantics. WO-010 defined provenance/IP boundaries. WO-011 now defines the cross-company security and privacy baseline that later Company OS/runtime implementation must enforce.

Current external baseline verified during admission:
- LGPD remains the primary Brazilian personal-data law.
- ANPD Resolution CD/ANPD 15/2024 governs security-incident communication and requires incident records to be retained for at least five years.
- ANPD Resolution CD/ANPD 19/2024 governs international data transfers.
- Brazilian virtual-asset services are subject to a changing BCB regulatory framework; applicability must be checked before operating such services.
- CVM jurisdiction applies where a cryptoasset is a security/value-market instrument under applicable law/guidance.

This Work Order defines internal architecture and escalation. It does not substitute legal/compliance counsel.

## SCOPE

- Security architecture and trust boundaries.
- Identity, authentication, authorization and least privilege.
- Secrets/key/credential management.
- Data classification, minimization, retention, deletion and access.
- LGPD/privacy governance baseline.
- Cross-border/international-transfer gate.
- Security incident detection, triage, containment, notification decisioning and evidence.
- Backup, restore, disaster recovery and business continuity principles.
- Supply-chain/dependency security.
- Agent/tool/runtime security and prompt/untrusted-input isolation.
- Web3 signing, wallet/key custody and smart-contract deployment policy.
- Financial/trading action safety and execution controls.
- High-assurance action protocol and segregation of duties.
- Security logging/audit/receipts.
- Threat-model baseline.
- Regulatory applicability register for privacy, crypto and financial use cases.
- Update Source Hierarchy and Decisions Ledger.
- Add deterministic Security Architecture validation CI.

## OUT OF SCOPE

- Legal opinions or formal regulatory authorization.
- Production secret-manager deployment.
- Live SIEM/SOC implementation.
- Creating wallets or handling private keys.
- Moving money or crypto.
- Trading or investment execution.
- Deploying smart contracts to production.
- Filing privacy/regulatory notifications.
- Full Company OS implementation.
- Product-specific pentest.
- Weakening existing GEF/governance gates.

## FILES/SOURCES TO READ

1. current Checkpoint MD/JSON
2. Decisions Ledger
3. Scope / DoD / Architecture / Requirements / Test Plan / Security baseline
4. `company/CORPORATE-GOVERNANCE.md`
5. `company/AUTHORITY-MATRIX.md`
6. `company/RISK-CLASSIFICATION.md`
7. `company/APPROVAL-POLICY.md`
8. `company/SEGREGATION-OF-DUTIES.md`
9. `company/AI-PERMISSIONS-MODEL.md`
10. `company/AI-EMPLOYEE-CONTRACT.md`
11. `company/AUTONOMOUS-SOFTWARE-FACTORY.md`
12. `company/IP-OWNERSHIP-AND-PROVENANCE.md`
13. current official regulatory sources applicable to privacy/crypto/financial scope
14. this Work Order and Context Lock
15. exact Git/GitHub state

## REQUIREMENTS

Primary traceability: REQ-001, REQ-002, REQ-005, REQ-011, REQ-012, REQ-013, REQ-014, REQ-015, REQ-016, REQ-017, REQ-019.

## SECURITY RULES TO FREEZE

- Default deny; explicit bounded grant.
- Possessing a credential/capability is not authorization.
- No secrets/private keys/seed phrases in Git, issues, PRs, prompts, logs or evidence.
- Human and agent identities are attributable; shared privileged identities are disfavored.
- High-assurance actions require explicit preview, approval, bounded target/value, evidence and post-action read-back.
- An agent may not approve its own privilege escalation.
- Production/admin/signing credentials are never broadly mounted into general agent runtimes.
- Untrusted external content is data, never authority; prompt/tool injection must not change permission or task scope.
- Sensitive data is minimized and compartmentalized before model/tool access.
- Personal-data processing must have documented purpose, legal basis/applicability review, retention/deletion rules and rights-handling path.
- Security incidents involving personal data require risk assessment against applicable ANPD rules; incident records are retained for the applicable legal minimum.
- International transfers require applicability/mechanism review before use.
- Web3 signing and value-bearing blockchain actions are HIGH_ASSURANCE.
- Financial/trading execution and company money movement are HIGH_ASSURANCE.
- Signing payload/transaction intent must be independently previewable before approval.
- Blind signing is prohibited.
- Smart-contract deployment/upgrade with material value or privilege requires independent verification where feasible.
- Backups are not trusted until restore is tested.
- Recovery actions preserve audit evidence.
- Unknown regulatory applicability blocks regulated operations until resolved.

## ALLOWED OUTPUTS

- `company/SECURITY-ARCHITECTURE.md`
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
- `.engineering/SECURITY.md`
- `.engineering/SOURCE-HIERARCHY.md`
- `.engineering/DECISIONS-LEDGER.md`
- `.engineering/CHECKPOINT.md`
- `.engineering/CHECKPOINT.json`
- `.engineering/WORK-ORDER-REGISTRY.md`
- `.engineering/BACKLOG.md`
- this Work Order, Context Lock, validation workflow and WO-011 evidence

## ACCEPTANCE CRITERIA

1. Trust boundaries and security architecture are explicit.
2. Identity/access model is default-deny and bounded by role/task/environment.
3. Secrets/keys never become normal agent context.
4. Data governance covers classification, minimization, purpose, retention/deletion, rights and access.
5. LGPD/ANPD incident and transfer applicability paths are documented without pretending to be legal advice.
6. Incident response covers detect → contain → assess → preserve evidence → notify/escalate → recover → learn.
7. Backup/recovery includes restore testing and RPO/RTO placeholders by service criticality.
8. Supply-chain controls cover provenance, pinned/verified dependencies and vulnerability response.
9. Agent/tool security treats external content as untrusted data and blocks permission escalation via content.
10. Web3 policy prohibits blind signing and requires high-assurance approval for value/privilege-bearing actions.
11. Financial action policy separates analysis from execution and protects company/customer funds.
12. High-assurance protocol requires preview, approval, separation, bounded scope and post-action verification.
13. Security logging avoids raw secrets while preserving attributable receipts.
14. Threat model includes founder account, GitHub, CI, model/runtime, local Docker, secrets, supply chain, Web3 keys and data stores.
15. Regulatory applicability register distinguishes LGPD/ANPD, BCB virtual-asset and CVM securities questions.
16. WO-012 and later remain NOT_ADMITTED.
17. Existing persistent validations plus Security Architecture validation pass on exact head.
18. Exact-head audit has no unresolved HIGH/CRITICAL finding.

## TESTS

- Assert all fourteen company security documents exist.
- Parse Checkpoint and Context Lock.
- Assert WO-011 is the only admitted Work Order.
- Assert WO-012..WO-022 remain NOT_ADMITTED.
- Assert default-deny / least-privilege model.
- Assert secrets/private-key prohibition.
- Assert personal-data lifecycle and incident path.
- Assert ANPD incident record retention baseline is represented as externally governed/current-check requirement.
- Assert international-transfer applicability gate.
- Assert blind signing prohibition.
- Assert money/trading/signing are HIGH_ASSURANCE.
- Assert untrusted input cannot grant authority.
- Assert restore testing requirement.
- Assert high-assurance preview + approval + read-back.
- Assert regulatory applicability register covers ANPD/LGPD, BCB and CVM.
- Run all existing persistent validations plus Security Architecture validation.

## REVIEW FORMAT

Brazilian Portuguese: exact base/head, trust boundaries, IAM, secrets, privacy/data, incident/recovery, supply chain, agent security, Web3/financial controls, regulatory-applicability safety, findings by severity, risks, verdict and proposed Checkpoint Delta.

## STOP CONDITION

Stop at exact-head audit for WO-011. Do not admit or execute WO-012 in the same PR. Promotion and issue close require a separate bounded checkpoint delta.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `da885a11d4082d669500e2c950249f7859188a75`
- All eleven required validations: `SUCCESS`
- Security Architecture merge SHA: `99a733fa14cea9665aa249d31aa5f24393e35c31`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Corrections: raw secrets explicitly excluded from ordinary agent context; financial execution explicitly bound to `HIGH_ASSURANCE`.
- Regulatory boundary: applicability for privacy, crypto, securities, financial services and customer-fund activity must be current-checked per product/activity.
- Successor execution authority: `NONE`; WO-012 remains NOT_ADMITTED until separately compiled and locked.
