# NexLabs Company — Repository Operating Contract

## Authority

Before any work, load authority in this order:

1. `.engineering/CHECKPOINT.md` and `.engineering/CHECKPOINT.json`
2. `.engineering/DECISIONS-LEDGER.md` and accepted ADRs
3. `.engineering/SCOPE.md`
4. `.engineering/DEFINITION-OF-DONE.md`
5. `.engineering/ARCHITECTURE.md`
6. `.engineering/REQUIREMENTS.md`
7. other applicable canonical sources
8. active Work Order and exact Context Lock

Exact Git/GitHub state, tests and evidence outrank conversation memory.

## GEF lifecycle

`ANALYZE → SOURCE CHECK → NEXT NECESSARY INCREMENT → WORK ORDER → CONTEXT LOCK → PREFLIGHT → EXECUTOR → TESTS/EVIDENCE → PR → AUDIT → VERDICT → CHECKPOINT DELTA → MERGE → NEXT`

Only one Work Order may be `ADMITTED` at a time unless an explicit accepted decision authorizes safe parallelism. Future Work Orders may exist as `PLANNED / NOT_ADMITTED`; that status grants no execution authority.

## Executor model

The connected ChatGPT/GitHub workflow may perform planning, repository mutation, evidence collection, review and bounded corrections when available. Codex is an optional executor adapter, not a mandatory dependency. Heavy/local-only work may be delegated later when required by evidence or runtime access.

## Review and correction

Verdicts are `OWNER_SELF_AUDIT_APPROVED / NOT_INDEPENDENT`, `CORRECTION REQUIRED`, or `BLOCKED`.

When review finds a defect, first repair it directly if the correction is small, causal, inside admitted scope, non-destructive, and objectively verifiable with available tools. Delegate only when the correction requires unavailable local state, substantial implementation, architecture/scope expansion, new dependencies, or evidence that cannot be produced here.

Any correction invalidates old head evidence and requires fresh exact-head validation.

## Safety

Never force-push, rewrite history, expose secrets, weaken checks, self-promote an unreviewed checkpoint, or treat activity as evidence. No known HIGH/CRITICAL defect may be promoted.

Money movement, privileged authentication, Web3 signing, irreversible actions and security-critical changes are HIGH_ASSURANCE and require explicit founder authorization plus proof obligations.

## Language

Final executor/reviewer summaries are written in Brazilian Portuguese.

## Agent skills

### Matt Pocock skill invocation

When the `mattpocock-skills` plugin is available, automatically use a model-invoked skill whose description matches the current task; these skills do not require the user to type a slash command. Use `/ask-matt` when skill routing is unclear. User-invoked workflows remain user-led. Do not force-fit a skill or let it override the user's request, this repository's governance/security rules, or deterministic evidence.

Prefer deterministic Git, text search, AST, hashes, tests, lint, typecheck, and build checks whenever they are sufficient. Use Jev only when available and useful for bounded context relevance, triage, classification, reranking, claim verification, comparison, or explicit-gate decisions. Jev output is advisory; never send it secrets or credentials.

### Issue tracker

Issues and specs for this repository live in GitHub Issues. Use the `gh` CLI and follow `docs/agents/issue-tracker.md`.

### Triage labels

Use `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix` for the five canonical triage roles. Follow `docs/agents/triage-labels.md`.

### Domain docs

This repository uses a single-context domain layout. Read relevant glossary and ADR material before domain changes; follow the actual paths recorded in `docs/agents/domain.md`.
