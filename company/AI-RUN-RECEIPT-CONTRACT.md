# NexLabs Technology — AI Run Receipt Contract

**Status:** `CANONICAL_WO_007`

Every material AI employee run should produce a receipt sufficient to reconstruct what happened.

## Minimum fields

- `run_id`
- `role_id`
- `contract_version`
- `runtime_provider`
- `model_or_executor`
- `task_id`
- `work_order_id` when applicable
- `checkpoint_ref`
- `input_refs`
- `authority_refs`
- `action_class`
- `risk_class`
- `tools_used`
- `approvals`
- `started_at`
- `ended_at`
- `outcome`
- `output_refs`
- `evidence_refs`
- `cost_usage_refs` when available
- `errors`
- `recovery_state`
- `next_action`

## Outcome values

Use explicit states:
- `SUCCEEDED`
- `FAILED`
- `BLOCKED`
- `DENIED`
- `CANCELLED`
- `PARTIAL_UNKNOWN`
- `RECOVERY_REQUIRED`

## Exact-state binding

Where relevant, receipts should bind:
- Git SHA;
- branch/PR;
- deployment ID;
- transaction hash;
- resource ID/version;
- data snapshot/version;
- provider receipt.

## Security

Receipts must not include raw secrets.

Use:
- secret reference;
- key fingerprint;
- masked account;
- provider-side credential ID.

## Cost and usage

Where available, capture:
- model tokens/cost;
- compute/runtime;
- tool/API calls;
- retry count.

Cost data must not be fabricated if unavailable.

## Corrections

A correction creates a new run/head/evidence identity.

Do not rewrite an old receipt to pretend the first attempt succeeded.

## Chain of custody

When one employee hands work to another, the downstream run should reference the upstream artifact/receipt rather than relying only on conversational summary.
