# Agent Budget and Telemetry

**Status:** `CANDIDATE_WO_018`

## Per-run ceilings

`max_turns`, `timeout_ms`, `max_cost_usd`, `max_context_tokens`, optional `max_output_tokens`, allowed tool calls, provider and cumulative per-project/day ceiling.

Model-level predicted costs are estimates until provider receipts are confirmed. Do not treat unknown cost as zero.

## Counters

Requests, turns, tokens_in, tokens_out, cache tokens where available, tool calls, retries, walltime, provider, model, per-task/product cost, succeeded/failed/denied usage.

## Stop conditions

Exceeding any hard ceiling produces BUDGET_EXCEEDED/blocked; future work requires a new explicitly authorized envelope. No auto-renew at provider fallbacks.

## Evidence

Recorded to observational telemetry **and** immutable evidence ref for financially material runs. Redact secret-bearing prompt/response data.

## Unit economics

Link usage to Cost Per Successful Task and failure/retry cost within company Finance authority. Avoid mixing cost of external APIs with subscriber entitlement assumptions.
