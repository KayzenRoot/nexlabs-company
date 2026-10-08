# NexLabs Company v0.1 — Integrated DoD Preliminary Audit

**WO:** `NXL-COMPANY-WO-022` / Issue #23  
**Stage:** `PRELIMINARY`  
**Release verdict:** `RELEASE_NOT_APPROVED`  
**Founder explicit acceptance:** `PENDING`  
**Git admission base:** `d2f7acc85babd62cfacb87a4d061ef39e74a566d`  
**Canonical matrix:** `company-os/acceptance/v01-obligations.json`  
**Automation:** `node company-os/acceptance/v01-audit.mjs`

## Important boundary

This is an evidence assessment, **not** production deployment or signed acceptance. The project currently proves a deterministic offline engineering cell, governed Git workflow, local Docker reproducibility and synthetic-data recovery, not a continuously running AI-native company with authenticated agents and durable live Company OS state. Passing CI only verifies that code/tests and structural contracts succeed, not that external systems exist.

The 26 DoD obligations are mapped explicitly in `v01-obligations.json` with exact source paths and a human-authored limitation note. A source path existing is **not itself proof** of its claim. The read-only audit script verifies existence, mandatory count, schema and status honesty, denies unsafe paths and refuses fictional Founder approval flags.

## Findings requiring a release decision

| ID | Assessment | Required evidence or decision |
| --- | --- | --- |
| GOV-02 | PARTIAL | WO-022 exact-head review and final accepted PR not finished |
| GOV-04 | PARTIAL | Prior reviews show no scoped HIGH/CRITICAL findings, not an independent comprehensive security assessment |
| MVP-02 | PARTIAL | The cell produces a local plan and virtual Work Order; real Company OS admission authority is external GEF |
| MVP-05 | PARTIAL | The cell emits QA and correction signals; independent final review is outside the cell |
| OPS-01 | PARTIAL | Founder visibility is proven for a local **fixture**, not actual authenticated agents, real approvals or production failures |
| OPS-03 | PARTIAL | GitIgnore and CI contracts exist; no complete independent credential/secret scan evidence |
| ACC-01 | PARTIAL | Integrated review currently in progress |
| ACC-03 | BLOCKED | User has not explicitly accepted an exact v0.1 release scope and risk statement |

`PROVEN` labels elsewhere mean **proven within their documented bounded scope**: approved canonical documents, local engineering demo, governed code delivery, and synthetic-data recovery. They must not be amplified into claims about a deployed product, licensed company, authenticated service or 24/7 operation.

## Risk register

- **R-01 / release-blocking:** Real Founder acceptance absent. Release cannot be declared complete.
- **R-02 / release-blocking subject to Scope review:** v0.1 minimum operational visibility covers only an offline fixture. Decide whether the Source Pack's requirement is satisfied for a local prototype or whether an authenticated real agent/approval pipeline is NECESSARY.
- **R-03 / significant:** No real canonical PostgreSQL Company OS data model and audit/outbox integrated with this dashboard. Contract/design approved; implementation outside this audited increment.
- **R-04 / significant:** No independent security/secret scan in this repository evidenced. Existing negative/security code tests and 22 checks are not a substitute.
- **R-05 / limited to production:** Artifact restore destination copy is not atomic; only CI synthetic-data restore is demonstrated. Not an approved production recovery posture.
- **R-06 / governance:** Self-audit reviews are explicitly NOT_INDEPENDENT; release may require separate reviewer when available.

## Proposed next gates

1. Complete reproducible exact-head 23/23 GitHub Actions checks for this audit Work Order, and reconcile the source fingerprints.
2. Obtain independent review/security evidence when mandated or admit a narrowly bounded correction in the same Work Order if feasible.
3. Resolve whether the accepted v0.1 Scope permits deterministic offline-only MVP visibility. A revision of DoD cannot be used merely to mask missing capabilities.
4. Present the precise candidate, risk register and limitations to the Founder for explicit acceptance. Generic "continue" is not an acceptance statement.
5. Only after every release-blocking obligation is PROVEN, all required independent reviews and Founder acceptance are recorded may the version be promoted and tagged.

## Stop condition

**RELEASE_NOT_APPROVED**. The current Work Order cannot legitimately close as successful v0.1 release. No production rollout, version-complete checkpoint, tag or subsequent implementation Work Order is authorized by this preliminary report.
