# Agent Failure and Recovery

**Status:** `CANDIDATE_WO_018`

## Failure taxonomy

INVALID_REQUEST, ROUTING_DENIED, PROVIDER_UNAVAILABLE, AUTHENTICATION_REQUIRED, AUTHORIZATION_DENIED, APPROVAL_REQUIRED, TIMEOUT, BUDGET_EXCEEDED, TOOL_DENIED, TOOL_FAILED, UNKNOWN_COMPLETION, RECOVERY_REQUIRED, CONTEXT_STALE, ARTIFACT_INVALID.

## Retry rules

Read-only/known-no-side-effect failures may retry with bounded exponential delay and new attempt ID under same task envelope.

If a write was dispatched and provider return is ambiguous, mark UNKNOWN_COMPLETION then RECOVERY_REQUIRED. NO blind replay or unconditional fallback. Read-only reconciliation by deterministic external IDs/SHAs; classify CONFIRMED_COMPLETE / CONFIRMED_ABSENT / PARTIAL / CONFLICT / UNKNOWN. Only explicitly verified absent effects may be reconsidered with new policy check and idempotency.

## Incident / escalation

After ambiguous high-risk financial/Web3/production operation, fail closed, preserve receipts and escalate to Founder.

## Provider outages

Router can switch provider only within allowed data security/budget and if no unverified external effect could duplicate. Record the original attempt and evidence.
