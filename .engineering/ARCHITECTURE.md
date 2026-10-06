# NexLabs Company Architecture

Status: `CONCEPTUAL_BASELINE`

## Architectural principles

1. Founder authority is explicit and cannot be silently delegated.
2. Company policy and workflow live above any single agent runtime or model provider.
3. Every material operation is attributable, permissioned and auditable.
4. Local-first development must not create a local-only product architecture.
5. High-risk domains fail closed.
6. Company modules must be replaceable through explicit contracts.
7. GEF governance is part of the operating architecture, not an after-the-fact review layer.

## Target layers

### 1. Founder Layer
Intent, approvals, strategic decisions and high-assurance authorization.

### 2. Company Governance Layer
Policies, authority matrix, risk classification, decisions, checkpoints, audit rules and Work Order admission.

### 3. Company OS Core
Projects, products, agents, roles, tasks, Work Orders, evidence, approvals, decisions, checkpoints, events and audit records.

### 4. AI Workforce Layer
Role-bound executive and specialist agents created from a governed employee contract.

### 5. Product Factory
Research, product validation, planning, architecture, execution, QA, review, release and iteration/kill workflow.

### 6. Agent Runtime Abstraction
Provider-independent session, memory, tool, model-routing and execution interfaces. Hermes is a candidate first adapter.

### 7. Executor Adapters
ChatGPT/GitHub, Codex, local tools, CI runners and future executors behind bounded execution contracts.

### 8. Integration Layer
GitHub, cloud, communications, CRM, analytics, finance and future external systems.

### 9. Data and Memory Layer
Canonical relational state, queues/caches where justified, audit/evidence storage and bounded agent memory. Concrete technologies require later architecture admission.

### 10. Observability Layer
Health, traces, logs, costs, agent runs, approvals, failures and founder-facing status.

### 11. Infrastructure Layer
Local Docker first; staging/production later using portable service contracts.

## No premature technology lock

PostgreSQL, Redis, queues, vector stores and specific frontend/backend frameworks are candidates, not approved requirements in WO-002. They must be justified in the relevant architecture Work Order.
