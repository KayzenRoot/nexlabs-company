# Agent Session Protocol

**Status:** `CANDIDATE_WO_018`

## Immutable request envelope

Fields: `session_id`, `organization_id`, `agent_id`, `task_id`, `correlation_id`, `role_contract_ref`, `canonical_context_refs`, `requested_capabilities`, `data_class`, `limits`, optional `provider_preference`, `model_requirement`, `expected_source_sha`.

Data class: PUBLIC / INTERNAL / CONFIDENTIAL. HIGH_ASSURANCE operations are additionally action-bound and approved.

## Controls

Require duration, max turns, maximum spend, context size and an explicit allowed tool profile before starting. Session identity is unique and cannot be recycled for a different command.

Record `CREATED, DISPATCHED, RUNNING, SUCCEEDED, FAILED, UNKNOWN_COMPLETION, RECOVERY_REQUIRED, CANCELLED` with timestamps/actor/correlation. Store provider session/run ID, versions, structured usage and evidence refs. NO raw secrets or indiscriminate transcript dumps.

## Cancellation

Cancellation revokes pending tool authority and stops dispatch; a provider cannot guarantee undo of already-dispatched side effects. The adapter must report partial progress.

## Concurrency

Per-agent/per-task concurrency ceilings; one owner of a session lease; duplicate create/dispatch keyed idempotently through canonical database. Last writer does not win over policy or checked version.

## Evidence

Unverified output is a suggestion, not accepted Work Order completion.
