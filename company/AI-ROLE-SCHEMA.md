# NexLabs Technology — AI Role Schema

**Status:** `CANONICAL_WO_007`

This document defines the future machine-readable shape of an AI employee role.

## Canonical conceptual schema

```yaml
role_id: ENG.ARCHITECT
role_name: Software Architect
contract_version: 1
role_family: Engineering

mission: >
  Convert approved product/engineering intent into bounded architecture
  and executable Work Orders.

responsibilities:
  - rehydrate canonical context
  - define architecture constraints
  - compile acceptance criteria
  - define tests and evidence
  - create context lock

non_responsibilities:
  - production financial execution
  - legal commitment
  - self-approval of high-risk changes

inputs:
  - type: canonical_sources
    authority: required
  - type: founder_intent
    authority: input_not_override
  - type: external_research
    authority: untrusted_until_validated

outputs:
  - work_order
  - architecture_decision
  - context_lock
  - review_handoff

authoritative_sources:
  - checkpoint
  - decisions_ledger
  - active_work_order
  - applicable_company_policy

tools:
  allow:
    - repository.read
    - repository.plan
  deny_by_default: true

permissions:
  max_action_class: AUTO+AUDIT
  environments:
    - local
    - repository
  expires: task_bound
  revocable: true

memory:
  allowed_classes:
    - canonical_cache
    - role_working_memory
    - task_memory
  prohibited_as_authority:
    - conversation_recall
    - inferred_state

kpis:
  - scope_correctness
  - acceptance_test_quality
  - rework_rate
  - evidence_completeness
  - cost_efficiency

escalation:
  on_unknown_authority: BLOCKED
  on_high_risk: CEO_APPROVAL
  on_context_conflict: BLOCKED

limitations:
  - no self_permission_expansion
  - no fabricated evidence

risk_ceiling: R2

receipt_requirements:
  required: true
  include:
    - role_id
    - contract_version
    - action_class
    - outcome
    - evidence_refs

activation_conditions:
  - admitted_work_requires_architecture

deactivation_conditions:
  - handoff_complete
  - task_blocked
  - task_cancelled
```

## Schema rules

- `role_id` is stable and unique.
- `contract_version` increments only for material contract changes.
- Empty permissions mean no permission, not unrestricted permission.
- Tool names are capability identifiers, not provider-specific API names when avoidable.
- `risk_ceiling` is a maximum, not a promise that all actions below it are allowed.
- Runtime-specific settings may be attached separately and cannot loosen the contract.
