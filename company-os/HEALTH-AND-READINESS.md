# NexLabs Company OS — Local Health & Readiness

Status: CANONICAL_WO_017

PostgreSQL readiness uses pg_isready with the configured database and user.

Optional Redis uses redis-cli ping. Redis failure may degrade acceleration but cannot imply loss of canonical state.

Observability is optional in local development and does not block canonical mutation paths.

verify-stack.sh and verify-stack.ps1 validate Compose syntax and PostgreSQL readiness, plus Redis only when running.

Future Company OS application services should add liveness/readiness endpoints, dependency status and safe build/commit identity without exposing secrets.
