# NexLabs Technology — AI Memory Policy

**Status:** `CANONICAL_WO_007`

## 1. Principle

Memory is a continuity mechanism, not an authority mechanism.

## 2. Memory precedence

From strongest to weakest:

1. exact current provider/Git/system state where objectively observable;
2. canonical Checkpoint and approved company/project sources;
3. accepted decisions/ADRs;
4. active Work Order and Context Lock;
5. task evidence/receipts;
6. governed role memory;
7. working/session memory;
8. conversation recall;
9. inferred or reconstructed memory.

Lower layers may not silently contradict higher layers.

## 3. Memory classes

### Canonical memory
Versioned company/project truth.

Examples:
- Git documents;
- checkpoints;
- decisions;
- approved contracts;
- Work Orders.

### Role memory
Durable information useful to a role but not itself company authority.

Examples:
- learned workflow hints;
- evaluation observations;
- common failure patterns.

### Task memory
Bounded context for one task/run.

### Working memory
Ephemeral reasoning/session state.

### External/provider memory
Any memory held by a model/provider integration.

Treat as non-canonical unless reconciled.

## 4. Hydration

Before material work, the employee must hydrate:
- role contract/version;
- current checkpoint;
- applicable policy;
- task/Work Order;
- relevant exact system state.

## 5. Staleness

Memory becomes stale when:
- checkpoint advances;
- source fingerprint changes;
- Work Order changes;
- provider state changes materially;
- approval expires/revokes;
- policy changes.

Stale critical memory cannot authorize action.

## 6. Conflict

If memory conflicts with canonical sources:
- canonical source wins;
- record the conflict if material;
- refresh/replace the stale memory;
- do not “average” conflicting authority.

## 7. Sensitive memory

Do not intentionally persist raw:
- passwords;
- API secrets;
- private keys;
- seed phrases;
- sensitive personal/customer data beyond approved need.

Store references, IDs, fingerprints or secure-provider handles when possible.

## 8. Forgetting / invalidation

Operational memory should support invalidation.

Deletion/retention requirements will later be refined by security/privacy policy. Until then, invalidated memory must not continue to influence authority-sensitive execution.

## 9. Provider replacement

Replacing the underlying model must not require transferring opaque hidden memory.

Critical continuity must be recoverable from canonical sources and receipts.
