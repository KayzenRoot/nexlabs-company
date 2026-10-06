# NexLabs Technology — Work Order Admission Protocol

**Status:** `CANONICAL_WO_009`

Planning metadata is not execution authority.

## 1. Admission inputs

Compile from current:
- Checkpoint;
- Decisions Ledger/ADRs;
- Requirements;
- Architecture;
- Scope/DoD;
- relevant company/product policies;
- predecessor evidence;
- exact Git/provider state;
- current Founder intent.

## 2. Select one increment

The Planner/Architect chooses the smallest sufficient next increment that:
- materially advances an approved objective;
- can be objectively tested/reviewed;
- does not bundle unrelated successor work.

## 3. Compile the Work Order

At minimum:
- stable Work Order ID;
- issue/reference;
- status;
- exact base;
- branch;
- Context Lock path;
- objective;
- context;
- scope;
- out-of-scope;
- sources to read;
- requirements traceability;
- architecture rules;
- constraints;
- allowed outputs;
- acceptance criteria;
- tests;
- review format;
- stop condition.

## 4. Admission checks

Before setting ADMITTED:
- dependencies satisfied;
- no blocking predecessor finding;
- no conflicting admitted Work Order in the same governed stream;
- branch/base available;
- permissions sufficient for intended execution;
- repo disclosure constraints respected.

## 5. Admission mutation

Admission must update the governed state consistently:
- Work Order status;
- Context Lock;
- Checkpoint MD/JSON;
- Work Order Registry;
- Backlog;
- issue/task status.

If mutation partially applies, enter recovery and reconcile exact state before completing missing writes.

## 6. No implicit admission

Creating an issue, branch, prompt or agent task does not admit execution.

Only the canonical admission state does.

## 7. Re-admission

If scope materially changes, architecture changes, base drifts incompatibly or Context Lock becomes invalid:
- stop;
- refresh/recompile;
- record why;
- create a new lock/version as appropriate.

Do not silently mutate the original contract into a different project.
