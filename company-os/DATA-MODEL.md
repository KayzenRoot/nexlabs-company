# NexLabs Company OS — Canonical Data Model

**Status:** `CANONICAL_WO_016`

## Storage strategy

Canonical transactional database: PostgreSQL.

All primary business tables carry:
- `id` UUID/UUIDv7-like identifier;
- `organization_id`;
- `created_at`;
- `updated_at` where mutable;
- `version` or equivalent optimistic-concurrency field where needed.

## Identity / organization

### organizations
- id
- slug
- name
- status

### actors
Represents Founder, human operator, AI agent or system integration actor.
- id
- organization_id
- actor_type
- display_name
- status
- external_identity_ref nullable

### role_assignments
- actor_id
- role_key
- scope_type
- scope_id nullable
- valid_from
- valid_until nullable
- revoked_at nullable

### capability_grants
- actor_id or role_key
- capability_key
- resource_scope
- environment_scope
- constraints_json
- valid_until nullable
- revoked_at nullable

## Portfolio/work

### products
- name
- lifecycle_state
- public_status
- owner_actor_id
- strategy_ref

### projects
- product_id nullable
- name
- lifecycle_state
- repository_ref nullable

### work_orders
- work_order_key
- project_id nullable
- issue_ref
- state (canonical lifecycle enum)
- blocked_reason nullable (versioned, validated enum; required only while BLOCKED)
- display_label nullable (derived, never an authority field)
- disposition_evidence_ref nullable
- classification
- risk_class
- admission_base_sha
- active_branch
- context_lock_id
- admitted_at
- closed_at nullable

### context_locks
- work_order_id
- base_sha
- compiled_at
- fingerprints_json
- allowed_outputs_json
- state

### tasks
- work_order_id nullable
- task_type
- state
- assigned_actor_id nullable
- risk_class
- input_ref
- result_ref nullable

### execution_runs
- task_id
- runtime_adapter
- provider
- model nullable
- state
- started_at
- finished_at nullable
- correlation_id
- external_run_ref nullable

### reviews
- work_order_id
- reviewer_actor_id
- candidate_head
- verdict
- findings_summary
- evidence_bundle_id

### checkpoints
- checkpoint_key
- status
- completed_through_work_order
- main_sha
- payload_json
- promoted_at

## Approval/governance

### policies
- policy_key
- version
- status
- policy_document_ref
- effective_at

### approval_requests
- action_type
- requested_by_actor_id
- risk_class
- target_ref
- action_digest
- state
- expires_at nullable

### approval_decisions
- approval_request_id
- approver_actor_id
- decision
- rationale
- decided_at

### authority_envelopes
- subject_actor_id
- capability_key
- action_digest nullable
- resource_scope
- constraints_json
- approval_request_id nullable
- valid_until
- state

### decisions
- decision_key
- decision_type
- status
- authority_ref
- content_ref
- decided_by_actor_id
- decided_at

## Evidence/audit

### evidence_bundles
- bundle_type
- state
- exact_head nullable
- manifest_hash
- artifact_root_ref
- verified_at nullable

### evidence_items
- bundle_id
- evidence_type
- uri/ref
- sha256/content_hash
- provider_ref nullable
- captured_at
- classification

### audit_records
Append-only.
- occurred_at
- actor_id
- action_type
- resource_type
- resource_id
- command_id nullable
- correlation_id
- causation_id nullable
- authority_ref
- risk_class
- outcome
- before_ref nullable
- after_ref nullable
- evidence_ref nullable
- metadata_redacted_json

## Integrations/events

### integrations
- integration_type
- status
- config_ref
- secret_handle_ref nullable

### external_references
- integration_id
- local_resource_type
- local_resource_id
- external_type
- external_id
- external_version_sha nullable
- last_verified_at

### outbox_events
- event_id
- aggregate_type
- aggregate_id
- event_type
- event_version
- payload_json
- occurred_at
- correlation_id
- causation_id nullable
- published_at nullable
- publish_attempts

### inbox_receipts
Used for consumer idempotency.
- consumer_key
- event_id
- received_at
- processed_at nullable
- outcome

## Finance / metrics

Finance tables store management records/snapshots, not bank secrets:
- budgets;
- financial_metric_snapshots;
- cost_allocations;
- funding_scenarios.

## JSON rule

JSONB is appropriate for bounded flexible policy/config/evidence payloads.

Core relationships/state that must be queried/validated consistently belong in typed columns/tables rather than opaque JSON blobs.

## Deletion/immutability

- audit records: append-only;
- evidence content: immutable by hash, superseded via new records;
- approvals/decisions: retain history;
- business records: explicit lifecycle/archive state according to policy;
- personal data: deletion/anonymization path must respect legal/audit requirements.
