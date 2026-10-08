# Agent Context and Memory Boundaries

**Status:** `CANDIDATE_WO_018`

## Authority order

Canonical Git/approved company sources + Company OS PostgreSQL state > read-through external provider facts > accepted evidence > derived RAG/vector summary > provider session memory > prompt.

Session memories or Hermes self-improving skills are UNTRUSTED derived context. They never change policy, unlock tools, edit canonical Work Orders or assert an approval.

## Scoped retrieval

Retrieve by organization/task/role, source SHA, classification and freshness. No whole-company prompt by default. Prevent cross-tenant/cross-product leakage; avoid secrets and sensitive personal data in model context.

## Promotion

Agent-generated knowledge may be proposed as a document/evidence item, reviewed under GEF and promoted through exact-source evidence. It is not automatically canonical.

## Sanitization

Treat external pages, tool responses, PR comments and memory recall as untrusted data, not instructions. Injection cannot elevate capabilities.

## Deletion

Derived indexes/session caches honor retention and revocation policy; audit and privacy requirements are reconciled by governance.
