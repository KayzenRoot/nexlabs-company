# NexLabs Company Deployment Strategy

## Current state

No production deployment is admitted.

## Environment progression

`LOCAL → STAGING → PRODUCTION`

### Local
Primary development and experimentation environment. Runtime services should be containerized where justified.

### Staging
Production-like validation, integrations, security checks, recovery rehearsal and founder acceptance.

### Production
24/7 operation only after the applicable Work Order proves deployment, backup, monitoring, secrets, recovery and promotion gates.

## Portability requirement

Company OS business logic and agent contracts must not depend on a VPS-specific implementation. Docker/local development is the initial execution environment, not the architectural boundary.

## Promotion

Deployment is never inferred from a successful build. Exact-head CI, environment evidence, security checks, operational readiness and the active Work Order govern promotion.
