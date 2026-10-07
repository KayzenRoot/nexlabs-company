# NexLabs Company OS — Module Boundaries

**Status:** `CANONICAL_WO_016`

## Suggested v0.1 modules

```
company_os/
  identity/
  governance/
  work/
  workforce/
  product/
  research/
  finance/
  commercial/
  investor/
  approvals/
  evidence/
  integrations/
  observability/
  shared_kernel/
```

## Shared kernel

Keep intentionally small:
- IDs;
- organization scope;
- timestamps;
- actor reference;
- money/value primitives;
- state/result primitives;
- correlation/causation;
- error envelope.

Do not put domain behavior in shared utilities merely to avoid imports.

## Dependency direction

Preferred:
- domain modules depend on shared kernel;
- orchestration/application layer invokes domain interfaces;
- integrations implement ports owned by domains/application layer;
- infrastructure depends inward on domain contracts.

## Forbidden coupling

Examples:
- finance code mutating approval records directly;
- product module editing Work Order tables;
- agent runtime writing audit tables directly;
- GitHub adapter deciding governance policy;
- Redis consumer becoming source of product state.

## Inter-module communication

Inside the modular monolith:
- synchronous application/domain interface when immediate consistent decision is required;
- domain event when eventual reaction is sufficient.

## Extraction seams

Natural future service candidates:
- agent runtime/execution;
- artifact/evidence storage;
- observability/telemetry;
- high-assurance approval broker;
- external integration/webhook processing.

Core governance/work state should remain cohesive until scaling/security evidence justifies extraction.
