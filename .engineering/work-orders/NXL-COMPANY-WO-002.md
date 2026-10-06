# NXL-COMPANY-WO-002 — Canonical Source Pack & Project Governance

**Issue:** #3  
**Status:** `APPROVED / MERGED`  
**Risk:** LOW / governance-critical  
**Base:** `096223e902a37fd96639d7d292e4f9b0d2c5724b`  
**Branch:** `planning/NXL-COMPANY-WO-002-source-pack`

## OBJECTIVE

Create the complete canonical Source Pack and governed roadmap for NexLabs Company so all later company planning and implementation can proceed from versioned authority rather than conversation memory.

## CONTEXT

GEF Bootstrap v1.1.2 is installed and validated. The repository has no canonical NexLabs Company Source Pack yet. The founder has directed that all future work follow the GEF Work Order/review/merge/checkpoint pattern and that company planning precede implementation.

## SCOPE

- Establish canonical source hierarchy.
- Establish Project Overview, Requirements, Scope, Architecture, Security, Test/Benchmark Plan, Deployment, Backlog and Definition of Done.
- Establish Decisions Ledger, Work Order Registry and Checkpoint in Markdown/JSON.
- Create planned Work Orders WO-003 through WO-022 without admitting them.
- Bind this increment to an exact Context Lock.
- Add deterministic Source Pack validation CI.
- Keep content safe for the repository's current public visibility.

## OUT OF SCOPE

- Detailed company mission/vision/brand finalization.
- Detailed revenue, finance, sales or investor artifacts.
- Company OS product code.
- Docker/Hermes runtime implementation.
- Autonomous agents.
- VPS/cloud deployment.
- Changing repository visibility.
- Secret or confidential company data.

## FILES/SOURCES TO READ

1. Exact Git/GitHub main at `096223e902a37fd96639d7d292e4f9b0d2c5724b`.
2. `README.md`.
3. `.gef/init-state.json`.
4. `.github/workflows/gef-validation.yml`.
5. `.gitignore`.
6. GitHub issue #3 and roadmap issues #4–#23.
7. Founder directives defining the one-founder AI-native company and GEF workflow.

## REQUIREMENTS

- Satisfy REQ-003, REQ-004, REQ-005 and the governance prerequisites for all later requirements.
- Exactly one Work Order is admitted.
- Every future Work Order has a stable ID and corresponding issue.
- Checkpoint must identify one legal next action.
- Unknown/conflicting state fails closed.

## ARCHITECTURE RULES

- No runtime/provider hard dependency is introduced.
- Hermes remains an adapter candidate.
- Local-first is a strategy, not a local-only architecture.
- High-risk actions remain human-authorized by default.
- No premature framework/database choice is promoted as architecture truth.

## CONSTRAINTS

- Repository is public.
- No secrets or confidential material.
- No product implementation.
- No force-push/history rewrite.
- Preserve GEF v1.1.2 state and validation.

## ACCEPTANCE CRITERIA

1. All mandatory Source Pack files exist.
2. Checkpoint JSON parses and matches Markdown checkpoint materially.
3. WO-002 is the only `ADMITTED` Work Order.
4. WO-003 through WO-022 exist as `PLANNED / NOT_ADMITTED`.
5. All WO IDs map to issues #3–#23.
6. Context Lock binds exact base and critical source fingerprints.
7. Source Pack validation CI succeeds on exact PR head.
8. Existing GEF validation succeeds on exact PR head.
9. Review finds no unresolved HIGH/CRITICAL defect or material source contradiction.
10. A proposed Checkpoint Delta is recorded before merge.

## TESTS

- Parse `.engineering/CHECKPOINT.json`.
- Parse `.engineering/context-locks/NXL-COMPANY-WO-002.json`.
- Assert mandatory canonical files exist.
- Assert Work Orders WO-002..WO-022 exist.
- Assert exactly one admitted Work Order and it is WO-002.
- Assert all later WOs contain `NOT_ADMITTED`.
- Run persistent GEF 1.1.2 validation workflow.

## DELIVERABLES

Canonical Source Pack, Work Order set, Registry, Context Lock, validation workflow, evidence/review record and checkpoint delta.

## REVIEW FORMAT

Brazilian Portuguese:
- exact base/head;
- scope compliance;
- source consistency;
- acceptance criteria;
- test/check evidence;
- findings by severity;
- risks;
- verdict: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`, `CORRECTION REQUIRED`, or `BLOCKED`;
- proposed Checkpoint Delta.

## STOP CONDITION

Stop after exact-head evidence and audit. Do not start WO-003 in this PR. WO-003 may only be admitted after WO-002 approval, checkpoint promotion and merge.


## CLOSEOUT

- Owner self-audit: `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`
- Exact audited head: `63ac51059f45a53b9b55387f29cba5b32da16ca4`
- Validate NexLabs Source Pack: `SUCCESS`
- Validate GEF 1.1.2: `SUCCESS`
- Source Pack merge SHA: `097a2872c1c603b10d4307ef04f04675e1500809`
- Known CRITICAL/HIGH at approval: `0 / 0`
- Successor execution authority: `NONE`; WO-003 remains NOT_ADMITTED until separately compiled and locked.
