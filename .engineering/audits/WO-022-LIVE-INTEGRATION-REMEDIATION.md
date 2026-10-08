# NexLabs Company v0.1 — Live Integration Remediation Decision Record (WO-022)

**State:** `PROPOSED / NOT_AUTHORIZED_FOR_EXECUTION`  
**Parent:** `NXL-COMPANY-WO-022`, [issue #23](https://github.com/KayzenRoot/nexlabs-company/issues/23), [PR #67](https://github.com/KayzenRoot/nexlabs-company/pull/67)  
**Admission Git base:** `d2f7acc85babd62cfacb87a4d061ef39e74a566d`  
**No release authority:** `RELEASE_NOT_APPROVED`. The release-candidate HEAD can change; every final claim requires checks on the exact candidate.
**Founder intent:** implement all missing integrations before final acceptance. This is **implementation direction**, not a cryptographically authenticated approval for any high-risk action and **not** the exact candidate acceptance required by ACC-03.

## Why this exists

The canonical Scope requires a local autonomous cell and integrated acceptance, while the DoD additionally requires *a governed admitted Work Order*, review and minimum Founder visibility. The offline fixture provides valuable evidence but cannot demonstrate authenticated real-agent operations, durable Company OS state or integrated GitHub mutations. D-0175 explicitly keeps true operational observability as an unresolved release gap.

The currently admitted WO-022 is **read-only audit**, with provider integration and runtime deployment **out of scope**. Its Context Lock allows only `.engineering/`, `company-os/acceptance/`, `.github/workflows/` and `README.md`. Consequently it may **plan and audit**, but must not implement live agents, change authorization sources, mutate main, open an executable parallel WO or declare release approval.

## Release obligation to remediation mapping

| Obligation | Current result | Evidence needed | Planned issue |
| --- | --- | --- | --- |
| GOV-02 | PARTIAL | One governed admitted WO at a time, exact source fingerprints, independent review, PR/CI/readback and checkpoint promotion | [WO-026](https://github.com/KayzenRoot/nexlabs-company/issues/70), [WO-029](https://github.com/KayzenRoot/nexlabs-company/issues/73), [WO-031](https://github.com/KayzenRoot/nexlabs-company/issues/75) |
| GOV-04 | PARTIAL | Independent security assessment, isolated tooling, authenticated access, no unresolved known HIGH/CRITICAL | [WO-025](https://github.com/KayzenRoot/nexlabs-company/issues/69), [WO-027](https://github.com/KayzenRoot/nexlabs-company/issues/71), [WO-031](https://github.com/KayzenRoot/nexlabs-company/issues/75) |
| MVP-02 | PARTIAL | Real persisted plan + admitted Work Order, Context Lock, GEF/GitHub reconciliation and drift checks | [WO-024](https://github.com/KayzenRoot/nexlabs-company/issues/68), [WO-026](https://github.com/KayzenRoot/nexlabs-company/issues/70) |
| MVP-05 | PARTIAL | Real audit/review separate from executing agent, correction loop and exact-head CI | [WO-028](https://github.com/KayzenRoot/nexlabs-company/issues/72), [WO-029](https://github.com/KayzenRoot/nexlabs-company/issues/73) |
| OPS-01 | PARTIAL | True runs, approvals, failures, health and spend via persistent, trusted projections | [WO-024](https://github.com/KayzenRoot/nexlabs-company/issues/68), [WO-025](https://github.com/KayzenRoot/nexlabs-company/issues/69), [WO-028](https://github.com/KayzenRoot/nexlabs-company/issues/72), [WO-030](https://github.com/KayzenRoot/nexlabs-company/issues/74) |
| ACC-01 | PARTIAL | Final reproducible integrated acceptance, truthfully updated 26-point matrix, independent audit on immutable release candidate | [WO-031](https://github.com/KayzenRoot/nexlabs-company/issues/75), then a **new, separately ADMITTED final acceptance Work Order** after approved governance handoff; do not silently resume WO-022 |
| ACC-03 | BLOCKED | Founder explicitly approves the EXACT candidate SHA, bounded scope, risks and limitations; no automatic approval inferred from permission to continue or approval of the governance approach | Obtain release acceptance in the **new final acceptance Work Order** after all remediation/review gates; no resumption of WO-022 under the original Context Lock |

**OPS-03** is currently `PROVEN` only for the automated secret scan of the audited 664-commit Git history, with precisely investigated false-positive fingerprints. It is not independent whole-system security assurance.

## Candidate engineering plan: sequential, not parallel admissions

1. **WO-024:** PostgreSQL canonical organization/work/run/approval/evidence state, migration, transactional outbox, idempotent worker, Docker persistence and restore tests. All endpoints default-deny writes until WO-025.
2. **WO-025:** Real Founder identity (trusted OIDC/passkey or equivalent as separately selected), organization-scoped capabilities and action-digest approvals, expiry/revocation/replay prevention, secret handle isolation.
3. **WO-026:** Authenticated Work Order compiler, persisted one-active-WO admission, exact Git SHA fingerprints, GEF provider reconciliation, stale lock blocking and unknown-result readback.
4. **WO-027:** Sandbox Tool Capability Broker (read-only web, validated skills, least-privilege MCP, Jev classifier), proven separation of authority from untrusted content; no host Docker-socket or unrestricted shell permission.
5. **WO-028:** Real provider-neutral LLM runtime, one operational provider adapter first; Chief of Staff, CPO, CTO, Executor, QA and Auditor logical roles with measured competence, bounded context, usage/spend ceilings and redacted run receipts. Other adapters only when implemented and benchmarked.
6. **WO-029:** Real governed GitHub feature branch/PR/CI review and correction. Independent reviewer distinct from executor; no self-merge bypass; exact-head check before merge and checkpoint promotion.
7. **WO-030:** Authenticated Founder Command Center backed by true durable events, failures, approval requests, spend and agent state. Preserve separate and prominently labeled fixture view.
8. **WO-031:** Independent security review, adversarial tests, integration smoke, local backup/restore, negative cases and acceptance evidence. Only **after** a separately approved governance handoff, commission a **new final acceptance Work Order** for all 26 DoD items and an explicit Founder release decision on the exact candidate. Do not reopen WO-022 with the old Context Lock.

All candidate issues are marked **PLANNED / NOT_ADMITTED**. Creating an issue does not authorize implementation. No claim that a connector, web browser, JEV MCP/skill, credential or hosted provider is already configured.

## Required non-bypass governance transition

Before WO-024 execution, WO-022 must leave the `ADMITTED` state through a **documented reviewable governance transition**. Options to evaluate against the GEF Source Pack:
- **Audited pause**: persist WO-022 as `BLOCKED / PAUSED_FOR_REMEDIATION` with its current release verdict, reconcile the sole active WO and create a resume/acceptance reference that cannot be auto-approved. Admit WO-024 only after a separate, approved checkpoint transition to a new single active WO.
- **Recompile/admit**: if GEF does not permit a paused/reentrant audit, close the original audit truthfully as `BLOCKED` (NOT release-approved), record the immutable evidence, then re-admit final acceptance under a new stable identifier after remediation. Never tag v0.1 at the audit-only transition.

These are **alternatives for governance review**, not changes already applied. Neither permits faking a successful release or weakening DoD. The exact transition shall be reviewed against GEF 1.1.2 contract and approved by the responsible authority before it is executed. Do not attempt two ADMITTED WOs simultaneously.

## Functional acceptance harness (minimum)

- Authentication: invalid actor/expired approval/approval digest mismatch/cross-org request => deny and attributable receipt; Founder authenticated, server verifies session or signature.
- Persistence: Work Order, run, audit and outbox are committed atomically; power loss/restart preserves data; concurrent admits allow at most one; migrations rollback.
- Provider: real model request returns immutable provider run reference, usage and tool trace; absent creds => NOT_CONNECTED, never zero/fake.
- Tools: web/MCP/skills/Jev functionality demonstrated with fixtures and one real non-sensitive read-only operation; injection cannot change authority; broker enforces network/FS/tool restrictions.
- Delivery: a disposable sandbox repository task results in real branch, PR, tests, independent review, controlled merge and checkpoint. Reject changed head, missing review, self-approval and unknown mutation replay.
- UI: operational failure and correction appear from real persisted receipts, not a fixture; Founder can see pending approval without accidental authorization.
- Security: complete Git secrets scan, dependency/supply chain screening, privilege review and independent code/security review; 0 unresolved HIGH/CRITICAL.
- Portability: Node 22/Docker local clean setup and Linux/Windows runbooks; backup → mutation → restore tested and evidence retained.
- Cost: measure tokens, USD and repeated calls on comparable workloads; budget ceiling enforced; no unsupported savings percentage.
- Release: exactly scoped immutable Git candidate SHA, all required checks, independent review and explicitly recorded Founder acceptance; until then `RELEASE_NOT_APPROVED`.

## External dependencies and constraints

Access to *real providers* needs an appropriate provider account and credential through a secrets manager, never public Git or chat. Real Founder authentication needs an identity provider and trusted sign-in. GitHub writes require scoped approved access, repo rule compatibility and actual reviewer capability. Some features may be implemented/tested locally with adapters and mocks, but those tests must be labeled as such and **cannot** substitute live integration evidence.

## STOP CONDITION

Keep WO-022 and PR #67 as **DRAFT / BLOCKED_FOR_RELEASE** until a governance-safe transition is validated. Never infer exact candidate acceptance from broad engineering instructions. Do not declare 100% functional, deploy to production or admit successor implementation WOs on the basis of this proposed plan alone.
