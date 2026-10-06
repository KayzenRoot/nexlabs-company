# NexLabs Technology — Executor Adapter Contract

**Status:** `CANONICAL_WO_009`

## 1. Purpose

Executors perform bounded engineering work without becoming the source of company authority.

Possible executors:
- ChatGPT repository tooling;
- Codex;
- local coding agents;
- CI runners/scripts;
- future model/provider adapters.

## 2. Required adapter inputs

An executor invocation should receive:
- role identity/contract;
- Work Order ID/version;
- Context Lock reference;
- exact branch/base/current head;
- admitted scope/allowed outputs;
- acceptance criteria;
- test plan;
- tool permission envelope;
- stop conditions.

## 3. Required outputs

An executor should return:
- resulting head/artifact identity;
- changed resources/files;
- commands/tools used where material;
- tests executed and outcomes;
- unresolved errors/unknowns;
- evidence references;
- cost/usage where available;
- recommended next state.

## 4. Non-authority

The executor may not:
- admit a new Work Order merely because work seems useful;
- widen scope;
- lower risk;
- approve its own high-risk changes;
- declare evidence valid for a different head;
- rewrite governance to fit implementation.

## 5. Idempotency and retries

Where possible, mutating operations should have:
- deterministic target;
- expected prior state;
- idempotency key/provider receipt;
- read-back verification.

On timeout/unknown completion:
- inspect target state;
- do not blindly retry;
- enter RECOVERY_REQUIRED when needed.

## 6. Provider independence

The orchestration layer targets capabilities, not vendor personality.

An executor adapter may expose:
- `code.read`
- `code.write_bounded`
- `test.run`
- `git.commit`
- `pull_request.open`

The Company OS may map these to different providers.

## 7. Quality

A more capable model may be selected for complex/high-risk work.

A cheaper/faster model may be selected when benchmarks show it meets required quality.

Provider prestige is not a quality guarantee.

## 8. Handoff

Executor completion is a handoff to evidence/review, not final company approval.
