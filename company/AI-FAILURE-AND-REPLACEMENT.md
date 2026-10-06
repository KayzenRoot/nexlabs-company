# NexLabs Technology — AI Failure & Replacement

**Status:** `CANONICAL_WO_007`

## 1. Failure is expected

Models, tools, providers and sessions can:
- time out;
- hallucinate;
- lose context;
- return partial output;
- become unavailable;
- exceed limits;
- behave inconsistently.

Company design must survive this.

## 2. Bounded retry

Retries must be bounded.

A retry policy should consider:
- failure type;
- idempotency;
- mutation risk;
- cost;
- alternative provider/tool;
- whether state may be partially applied.

Infinite retry loops are prohibited.

## 3. Mutation uncertainty

If a mutating operation times out or returns ambiguous completion:
- do not blindly repeat;
- inspect target state read-only;
- use idempotency/provider receipt when available;
- enter `RECOVERY_REQUIRED` if state cannot be reconciled.

## 4. Model/runtime replacement

Replacement procedure:
1. stop or expire the old run;
2. preserve receipts/evidence;
3. rehydrate canonical role contract;
4. rehydrate current checkpoint/task;
5. restore only approved memory;
6. instantiate replacement runtime;
7. record runtime/model identity in the new receipt;
8. continue from a known state.

## 5. Degraded mode

If the preferred model/provider is unavailable:
- use an approved alternate when quality/risk requirements can still be met;
- reduce scope or operate read-only if needed;
- escalate if no compliant substitute exists.

## 6. Repeated quality failure

Repeated corrections may trigger:
- model change;
- role-contract refinement proposal;
- narrower task decomposition;
- additional review;
- temporary deactivation.

Do not hide repeated failure by resetting metrics/session history.

## 7. Corruption / suspicious behavior

If an employee repeatedly attempts to:
- expand permission;
- ignore policy;
- fabricate evidence;
- leak secrets;
- bypass review,

deactivate it and escalate as a security/governance incident.

## 8. Replacement principle

The company owns the role and authoritative state.

The provider does not.
