# NexLabs Company OS — Entity Catalog

**Status:** `CANONICAL_WO_016`

## Core authority entities

### Organization
Security/ownership scope for Company OS state.

### Actor
A human, AI agent or integration acting in the system.

### RoleAssignment
Describes responsibility grouping, not unconditional authority.

### CapabilityGrant
Explicit permission to perform a bounded class of operation.

### Policy
Versioned governance rule.

### Decision
Governed company/technical decision.

### ApprovalRequest
Request to authorize one high-risk or review-required action.

### AuthorityEnvelope
Machine-checkable proof that an actor/action is authorized under constraints.

## Work entities

### Product
Company product/technology lifecycle record.

### Project
Execution container, often linked to a repository/product.

### WorkOrder
Canonical admitted increment.

### ContextLock
Exact-base/source binding for a Work Order.

### Task
Bounded unit of work.

### ExecutionRun
One attempt/session to execute a task.

### Review
Exact-candidate evaluation.

### Checkpoint
Promoted canonical progress state.

## Workforce entities

### AgentDefinition
Role contract and defaults.

### AgentInstance
Activated bounded agent identity.

### AgentSession
Runtime session with provider/model/tool context references.

### ToolProfile
Allowed tool capability bundle.

## Evidence entities

### EvidenceBundle
Manifest tying multiple evidence items to one candidate/action.

### EvidenceItem
Immutable evidence reference plus content hash.

### AuditRecord
Append-only record of consequential state/action.

## Integration entities

### Integration
Configured external-system adapter.

### ExternalReference
Mapping from local entity to provider-native IDs/SHAs.

### OutboxEvent
Committed domain event awaiting publication.

### InboxReceipt
Consumer idempotency record.

## Financial/commercial/investor entities

Prefer domain-specific records/snapshots that reference source systems rather than cloning entire external systems.

Examples:
- FinancialMetricSnapshot
- Budget
- CostAllocation
- FundingScenario
- CommercialMetricSnapshot
- GTMExperiment
- DiligenceEvidenceRecord

## Identity principle

IDs are opaque.

Human-readable keys such as `NXL-COMPANY-WO-016` are unique business identifiers, not database primary keys.
