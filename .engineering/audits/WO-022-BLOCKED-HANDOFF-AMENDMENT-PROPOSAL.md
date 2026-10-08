# Proposed GEF governance amendment: blocked acceptance audit handoff

**Proposal ID:** `NXL-GOV-BLOCKED-AUDIT-HANDOFF`  
**Lifecycle:** `FOUNDER_DIRECTION_APPROVED / PROPOSED_ONLY / INDEPENDENT_REVIEW_REQUIRED / NOT_ENACTED`  
**Risk:** `ELEVATED_GOVERNANCE`  
**Source:** [issue #127](https://github.com/KayzenRoot/nexlabs-company/issues/127), [Founder decision receipt](WO-022-FOUNDER-GOVERNANCE-DECISION.md), [WO-022 audit PR #67](https://github.com/KayzenRoot/nexlabs-company/pull/67).  
**Original WO-022 frozen base:** `d2f7acc85babd62cfacb87a4d061ef39e74a566d`.  
**Decision proposal content approved by the Founder:** `deba799b46a6d218dc2147d7b70aee7afd3c2adc`, on the scope of governance handoff **only**.  
**Next candidate:** WO-024 / [issue #68](https://github.com/KayzenRoot/nexlabs-company/issues/68).  
**Release:** `RELEASE_NOT_APPROVED`; `ACC-03=PENDING`.

> **WARNING:** This entire file is a proposed amendment in the existing read-only WO-022 evidence scope. It is NOT a change to `company/WORK-ORDER-ADMISSION-PROTOCOL.md`, `company/CHECKPOINT-PROMOTION-PROTOCOL.md`, `company-os/STATE-MACHINES.md` or an accepted ADR. It conveys no merge, checkpoint, successor-admission, policy-mutation or release authority.

## Proposed rule text for qualified independent review

When a valid, sole admitted **release acceptance audit** produces an evidence-based `BLOCKED / RELEASE_NOT_APPROVED` verdict because remediation requires implementation outside its immutable Context Lock, the Founder MAY authorize an **administrative audit deferral**. This does not satisfy that audit, complete the version, grant production authority or permit an unchecked second active Work Order.

An audit may become `BLOCKED_AWAITING_REMEDIATION` and yield its single-active slot only after a **separate approved governance amendment** and a consistency-verified, independently audited handoff. `BLOCKED_AWAITING_REMEDIATION` is a *non-success terminal administrative state for this audit increment*, not equivalent to `APPROVED`, `MERGED`, `PROMOTED`, `CLOSED_SUCCESS`, `RELEASED` or `FOUNDER_ACCEPTED`. The historical audit is retained as an immutable source-bound observation, and final v0.1 acceptance must use a **new** Work Order and exact candidate SHA after remediation. The old audit cannot resume under its original Context Lock.

## Authority and identity gates (proposed)

1. **Founder:** a decision expressly scoped to deferring this blocked audit, binding issue #127, audit #23 / PR #67, known incomplete DoD and original source. The recorded conversational consent suffices to propose the approach; it does **not** attest an exact released candidate, validate a human identity-provider signature or waive independent review.
2. **Qualified independent governance reviewer:** review the *proposed source-policy amendment*, state-machine transition, security and recovery procedure against the exact new PR HEAD and base. Reviewer must be a different actor from author/executor, with GitHub-native verifiable identity and recorded review ID, verdict, time, PR HEAD and findings. Same owner's alternate login, LLM persona or self-review cannot be described as an independent human approval. A third-party automated review can support, not replace, the qualified human gate when human sign-off is required.
3. **Governed exception to prevent circular admission:** while WO-022 is still the only admitted audit, prepare a separate, narrow **policy amendment proposal** with a governance-specific Founder authorization referencing the frozen audit. Do not pretend it is a second admitted execution WO; its only allowed purpose is to define and validate this handoff. No runtime feature changes. Actual canonical policy writes occur only after a separate independently accepted exact-head governance review under a permitted GEF governance amendment path. If that path/authority cannot be validated, remain `BLOCKED` and request a policy decision; no self-declared exception.
4. **Source and privacy:** original WO-022 Context Lock remains unchanged. Only public-safe policy/evidence may be written in this public repository. No real credentials, PII, backups or protected tokens.

## Required state transition protocol (proposed, not executed)

| Phase | WO-022 source issue/PR | Canonical checkpoint and registry | WO-024 |
| --- | --- | --- | --- |
| P0: current, independently read back | Issue #23 `ADMITTED/IN_PROGRESS`; PR #67 `DRAFT/OPEN` | Main at frozen base reports no active WO; audit branch reports WO-022 admitted. **This divergence blocks admission.** | `PLANNED/NOT_ADMITTED` |
| P1: reviewed governance proposal | Same active audit; no release approval | Existing approved policy remains authoritative pending independently accepted amendment | NOT_ADMITTED |
| P2: authorized deferral staging | Record audit SHA, exact CI runs, Founder scope decision, independent policy review, risk/DoD gaps, source fingerprints | Prepare new reconciled `BLOCKED_AWAITING_REMEDIATION` checkpoint MD/JSON, registry, backlog, WO-022 and archival evidence as a **distinct non-success transition**, not ordinary success promotion | NOT_ADMITTED |
| P3: atomic/logically reconciled deferral | Issue #23 explicitly `BLOCKED_AWAITING_REMEDIATION`; PR #67 archived as blocked evidence according to *new accepted policy*, never merged or titled as an approved release | Main checkpoint/registry/WO/source policy agree on **zero admitted WOs**; immutable audit references available. If any write fails: `RECOVERY_REQUIRED` with no successor admission | NOT_ADMITTED |
| P4: separate subsequent admission | Original audit remains blocked with immutable reference | Fresh exact `main` SHA and new frozen fingerprints; regular one-active admission transaction | WO-024 may become **sole** ADMITTED only through its own fully compiled GEF Work Order + Context Lock and checked GitHub issue/branch |
| P5: future post-remediation acceptance | WO-022 never silently reopened | New final acceptance WO audits all 26 DoD obligations and actual real integrations; Founder release signoff bound to exact candidate and risks | Remediation independently audited/promoted before final audit |

**Important ordering:** Staging files, merging a blocked audit artifact, or closing a GitHub issue can each be interpreted as success by existing validators. A qualifying implementation must amend those validators **before** any such mutation and prove they reject a false success. A check that is green only on the old `ADMITTED` state is not evidence that the new terminal state will work.

## Reconciliation and recovery algorithm requirements

A future authorized handoff executor must implement the following, rather than manually editing `main` to null and assuming success:

1. **Read:** exact current main SHA, draft PR #67 head/base/state, issue #23 state, issue #127 Founder record, issue #68 state, registry, WO-022, checkpoint MD+JSON, current policy versions and immutable Context Lock fingerprints. Abort on drift or missing data.
2. **Check independent amendment review:** verify review directly with GitHub, reviewer identity distinct from executor/author, approval still valid for the exact head and no unresolved HIGH/CRITICAL finding. A self-authored document asserting a review ID is untrusted.
3. **Prepare deterministic transition manifest:** before writes, bind audit evidence IDs, base/head SHA, authorized governance PR SHA, current main SHA, intended individual state changes, expected blob revisions, the six PARTIAL + one BLOCKED DoD obligations, and no-release conditions. Fingerprint manifest with SHA-256; include an idempotency key. No secret data in the manifest.
4. **Guard:** assert all WOs other than WO-022 NOT_ADMITTED and WO-024 still PLANNED; assert zero second active admissions; assert Founder **release** signoff remains pending.
5. **Commit policy and state via a **reviewed controlled sequence**:** update Source Pack and validators through accepted PRs compatible with branch protection. Do not force-push, disable rulesets, bypass required reviewers, or self-promote. GitHub file/issue operations are NOT transactionally atomic together: treat them as a *logical transaction*, record each deterministic action and expected old SHA/issue version, and verify the provider result before proceeding.
6. **Recover:** ambiguous GitHub write result => `RECOVERY_REQUIRED`; read back refs/SHAs/comments/issues and complete only demonstrably missing steps, no blind retry. Partial failure never releases the WO slot for successor admission.
7. **Finalize:** only after main/issue/registry/WO/checkpoint MD+JSON and closed-or-archived audit PR all tell the **same blocked, not-released story**, read back the exact main SHA and allow a *separate* WO-024 admission gate. Never mark WO-022 APPROVED/MERGED/CLOSED as a successful release.
8. **Postconditions:** immutable audit reference with seven unresolved obligation IDs; one active WO maximum at every observable boundary; no v0.1 tag, release deploy, privileged provider access, real Founder approval or known-risk suppression.

## Acceptance tests the amendment implementation MUST pass

- [ ] Baseline main idle **alone** must fail if issue #23 / PR #67 remains active.
- [ ] Missing, mismatched or stale independent GitHub review fails. Review authored by owner/executor or nonqualifying bot cannot impersonate independent human sign-off.
- [ ] Stale PR HEAD, old reviewed HEAD, altered Context Lock, forged Founder scope or changed issue numbers fail.
- [ ] False `RELEASE_APPROVED`, `ACC-03=PROVEN`, 26/26 DoD, `VERSION_COMPLETE`, release tag or deployment claims fail.
- [ ] Second admitted WO, early WO-024 branch execution or old lock reuse fail.
- [ ] Interrupted after any GitHub mutation -> `RECOVERY_REQUIRED`, deterministic readback, no blind replay, no duplicate comments or terminal states.
- [ ] Canonical state transition is tested against existing 23 workflows, including the validators that presently require WO-022 to be `ADMITTED`; no disabling checks to make transition green.
- [ ] Exact-head tests + independent review of code/policy + separate checkpoint readback prove correct terminal `BLOCKED_AWAITING_REMEDIATION` semantics.
- [ ] New final v0.1 acceptance must be separately admitted after remediation; Founder must explicitly accept the exact final candidate and risks.

## Frozen observations / what is still unavailable

- **Evidence level:** Source review and offline negative tests only. The existing read-only `company-os/acceptance/blocked-audit-handoff.mjs` is a classifier of caller-supplied metadata, not GitHub authorization. Its test fixtures are not live identity attestation.
- **Current DoD:** 19 bounded PROVEN, 6 PARTIAL (`GOV-02`, `GOV-04`, `MVP-02`, `MVP-05`, `OPS-01`, `ACC-01`) and 1 BLOCKED (`ACC-03`). They must NOT be reclassified merely because this policy is approved.
- **Never authorized here:** canonical policy mutation, merger of PR #67, admission/implementation of WO-024, production deploy, token use, privileged action or release of v0.1.
- **STOP CONDITION:** `FOUNDER_PROPOSAL_ACCEPTED / INDEPENDENT_GOVERNANCE_REVIEW_AND_SOURCE_AMENDMENT_PENDING / RELEASE_NOT_APPROVED`.

## Independent reviewer decision template

Reviewer records: qualified GitHub identity and separation from executor; independently read base and head; read `company/WORK-ORDER-ADMISSION-PROTOCOL.md`, `company/CHECKPOINT-PROMOTION-PROTOCOL.md`, `company/REVIEW-AND-CORRECTION-PROTOCOL.md`, `company-os/STATE-MACHINES.md`, original frozen WO-022 lock, issue #127 consent; assesses whether exception and controlled transition truly preserve all GEF gates. Verdict `APPROVED`, `CORRECTION_REQUIRED` or `BLOCKED` must cite exact head SHA and findings. **No reply from a bot or this document constitutes that verdict by itself.**
