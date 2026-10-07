# NexLabs Company OS — Integration Contracts

**Status:** `CANONICAL_WO_016`

## Principle

External systems remain authoritative for their native facts.

Company OS stores governed references and synchronized projections where useful.

## Common adapter interface

An integration adapter should support some subset of:

- `health()`
- `read(ref)`
- `search(query)`
- `prepareMutation(command)`
- `executeMutation(command, idempotencyKey, authorityEnvelope)`
- `verifyMutation(externalRef)`
- `reconcile(commandRef)`
- `subscribe/import(cursor)`

## GitHub adapter

Native authority:
- repositories;
- commits/SHAs;
- branches;
- PRs;
- issues;
- Actions runs.

Company OS stores:
- repo IDs/names;
- exact SHAs;
- PR/issue/run IDs;
- Work Order linkage;
- evidence refs.

It should not clone mutable GitHub truth into unrelated local fields and then trust local copies indefinitely.

## Agent runtime adapters

Provider-native authority:
- runtime/session/run IDs;
- model usage/receipts.

Company OS authority:
- agent role/task/permissions;
- whether output is accepted/promoted.

## Artifact/evidence store

Contract:
- put immutable blob;
- return content hash + durable ref;
- get/verify hash;
- retention/classification metadata.

## Secret broker

Contract:
- resolve allowed secret handle to scoped runtime capability;
- never return raw secret to unauthorized callers;
- audit access.

## Future CRM/finance integrations

Prefer:
- external record IDs;
- limited projections;
- synchronization timestamps;
- source-of-truth flag.

Do not mirror full sensitive systems without need.

## Webhooks

Inbound webhooks:
- verify authenticity;
- assign idempotency/event identity;
- persist receipt;
- process idempotently;
- record source cursor/version.

## Integration status

- `ACTIVE`
- `DEGRADED`
- `DISABLED`
- `REAUTH_REQUIRED`
- `BLOCKED`

## Provider schema changes

Adapters isolate provider-specific schema/API change from domain modules.
