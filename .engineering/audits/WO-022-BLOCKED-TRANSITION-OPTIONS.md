# WO-022 — Governance transition options for post-audit remediation

**Classification:** ELEVATED proposal only. `DECISION_PENDING`; **no permission to write next implementation**.
**Audit reference:** issue #23, PR #67, fixed admission base `d2f7acc85babd62cfacb87a4d061ef39e74a566d`.
**Last verified release matrix:** 19 PROVEN (bounded), 6 PARTIAL, 1 BLOCKED.
**Release verdict:** `RELEASE_NOT_APPROVED`; the Founder has **not** approved any exact release candidate.
**Successor candidate:** WO-024 / issue #68, currently PLANNED / NOT_ADMITTED.

## Source reconciliation

1. `company/REVIEW-AND-CORRECTION-PROTOCOL.md`: the permitted review verdict for unavailable authority/evidence or changes outside the admitted scope is `BLOCKED`; broadening to implementation requires a new/recompiled WO.
2. `company-os/STATE-MACHINES.md`: `BLOCKED` is an alternate Work Order state; the canonical model does **not** specify how a blocked acceptance audit should release sole-active-WO authority or resume after descendants.
3. `company/WORK-ORDER-ADMISSION-PROTOCOL.md`: no successor ADMITTED until predecessors and sole-active gate are consistent; admission requires checkpoint/registry/issue/WO/context lock together.
4. `company/CHECKPOINT-PROMOTION-PROTOCOL.md`: successful checkpoint promotion requires APPROVED audited implementation, merge and a separate promotion PR. It gives **no automatic exception** to promote an unresolved blocked audit.
5. `.engineering/work-orders/NXL-COMPANY-WO-022.md` and current PR: keep release blocked and Draft; no version-complete checkpoint, tag, or misleading merge.
6. `.engineering/DEFINITION-OF-DONE.md`: incomplete release cannot be approved merely to unblock construction. D-0175 makes real Founder operations observability an explicit release gap.

**Finding:** Existing rules do not unambiguously authorize clearing `activeWorkOrder` by editing the checkpoint, merging this blocked audit, or admitting WO-024 while WO-022 remains active. This is a governance deadlock that needs an explicit accepted transition specification.

## Candidate controlled transition (NOT YET APPROVED)

The preferred *candidate* is a new narrowly scoped, externally reviewed governance decision documenting a blocked-audit deferral, not release approval:

1. Preserve immutable PR #67 candidate/audit evidence and its `RELEASE_NOT_APPROVED` verdict with review `BLOCKED`; do not rewrite the audit as successful.
2. Review a **minimal amendment** to GEF/Company governance describing how an admitted read-only audit enters `BLOCKED_AWAITING_REMEDIATION`, which actor can transfer sole-active authority, exact audit artifact IDs, versioned deferred acceptance link, and prohibited alternatives. This must be independently reviewed and accepted using the actual governing authority; this proposal is not sufficient.
3. Only if that amendment is accepted, execute an atomic/reconcilable checkpoint + registry + work order + issue transition under an admitted governance increment (or other explicitly supported GEF mechanism), leaving WO-022 as **incomplete**, without asserting v0.1 released. Never leave two active WOs.
4. Verify the accepted transition against actual main HEAD, GitHub, predecessor evidence and source fingerprints. The old WO-022 Context Lock cannot be silently reused.
5. Compile and admit WO-024 from the **new** exact source SHA, fresh independent review and Context Lock, after applying the approved transition. Then implement PostgreSQL using the separately scoped implementation issue. Sequentially verify/promote further WOs.
6. When remediation evidence is sufficient, execute a **freshly admitted** final v0.1 acceptance audit with exact release candidate and explicit Founder signoff. Do not assume the old audit can resume unless governance explicitly permits it.

## Negative alternatives

- **DO NOT** mark `GOV-02 / MVP-02 / OPS-01 / ACC-03` PROVEN by editorial change.
- **DO NOT** merge PR #67 as release, force-update main/checkpoint or change the current lock to permit unrelated implementation.
- **DO NOT** treat planning issues #68–#75 or master roadmap #126 as ADMITTED.
- **DO NOT** interpret "continue" or "build everything" as a high-risk approval or final acceptance.
- **DO NOT** issue a privileged Codex/Hermes/LLM command to bypass GitHub branch rules, audit, tooling permission or independent review.

## Testable admission preflight

`company-os/acceptance/remediation-preflight.mjs` and associated adversarial tests **only simulate/check planning metadata**. They assert that a second WO cannot start during the current blocked audit and all seven known DoD gaps remain mapped. The candidate issue-number list is a static verified planning snapshot, **not** a live GitHub authorization claim; GitHub remains authoritative for current issue status. CI enforces this read-only check. A future actual transition validator must query canonical data/provider IDs, require its own independently accepted transition decision and carry new exact SHA evidence.

## Stop condition

`BLOCKED / GOVERNANCE_DECISION_REQUIRED`: until independent transition approval is available, **only audit/plan/test changes inside WO-022's permitted paths**. Neither technical readiness nor generic Founder implementation direction can authorize WO-024 execution.
