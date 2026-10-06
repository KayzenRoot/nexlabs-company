# NexLabs Technology — Autonomous Engineering Cell MVP

**Status:** `CANONICAL_WO_009`

## v0.1 proof objective

Prove that NexLabs can take one Founder-approved software increment through the full governed engineering loop with AI coordination and a replaceable executor.

## Required demonstration

1. Founder/approved Product Case supplies the desired increment.
2. Planner hydrates canonical sources.
3. Planner selects the next necessary increment.
4. Work Order is compiled and admitted.
5. Context Lock is created.
6. Preflight passes.
7. Executor adapter produces a bounded artifact/code change.
8. Required tests/evidence run.
9. Reviewer audits exact head.
10. At least one run must support the correction path when a bounded finding exists, whether through a deliberate test fixture/safe simulated defect or a real finding.
11. Corrected head receives fresh tests/evidence.
12. Approved candidate is merged.
13. Separate checkpoint promotion runs and is audited.
14. Work Order closes.
15. Successor remains non-executable until fresh admission.
16. Founder can inspect status, approvals, failures and evidence.

## MVP runtime expectations

The first runtime may be local-first.

It may use:
- Docker for services;
- GitHub for source/control plane;
- ChatGPT/GitHub or Codex as executor adapters;
- a future Hermes adapter.

No VPS is required to prove the local autonomous engineering cell if local execution satisfies the test contract.

## Provider replacement proof

At least one boundary must demonstrate that the executor is not hard-coded as organizational authority.

This may be shown by:
- adapter interface;
- mock alternate executor;
- two compatible executor implementations;
- deterministic test adapter.

## Failure/recovery proof

MVP must prove at least:
- stale/invalid Context Lock blocks execution;
- failed required test blocks approval;
- ambiguous mutation does not blindly retry;
- correction produces a new candidate/evidence identity.

## Security proof

MVP must show:
- no secrets committed;
- permissions are bounded;
- high-risk paths do not auto-escalate themselves;
- evidence avoids raw secrets.

## Founder experience

The intended UX is not “manage 12 agents.”

It is:
- choose/approve the work;
- see current state;
- receive only meaningful decisions/blocks;
- inspect evidence when desired;
- approve reserved actions;
- see the next legal action.

## MVP success

The cell is successful only if governance survives automation.

A faster but unauditable agent swarm does not satisfy v0.1.
