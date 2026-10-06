# NexLabs Technology — AI Permissions Model

**Status:** `CANONICAL_WO_007`

## 1. Effective permission

Effective permission is computed from the strictest applicable layer:

`Company Governance ∩ Role Contract ∩ Work/Task Scope ∩ Environment Policy ∩ Tool Grant`

No single layer can grant what another layer forbids.

## 2. Default deny

If permission is absent, ambiguous, stale or conflicting:
- do not execute;
- classify as `BLOCKED` or escalate;
- gather the missing authority.

## 3. Permission envelope

A permission envelope should identify where applicable:
- capability/action;
- target/resource;
- environment;
- data class;
- action class;
- risk ceiling;
- monetary/value limit;
- time/expiry;
- Work Order/task;
- approval reference.

## 4. Scope examples

Bad:
`github.write = true`

Better:
`repository.write = allowed for repo X, branch Y, admitted WO Z, excluding settings/secrets/rulesets`

Bad:
`wallet.sign = true`

Better:
No signing permission unless a later governed high-assurance envelope explicitly defines chain, contract, method, value, destination, simulation evidence, expiry and approval.

## 5. Revocation

Permissions must be revocable.

Revocation must take precedence over cached/session assumptions.

An agent that cannot verify whether a permission is still valid must stop before material mutation.

## 6. Expiry

Prefer permissions bound to:
- a task;
- a Work Order;
- a session/run;
- an explicit time window;
- an environment.

Permanent broad grants require stronger justification.

## 7. Permission inheritance

Organizational hierarchy does not imply unrestricted inheritance.

A Team Lead cannot automatically use every tool available to every specialist.

## 8. Secret access

Secret access follows need-to-use, not need-to-know alone.

Prefer mechanisms where:
- secrets are injected at execution time;
- raw values are not displayed;
- receipts use IDs/fingerprints;
- agents cannot export values.

## 9. Approval vs permission

Permission answers: **can this runtime technically perform the action?**

Approval answers: **is this action authorized now?**

Both may be required.

## 10. Self-modification

An AI employee may propose a permission change.

It may not:
- approve its own elevation;
- edit the canonical policy to authorize itself;
- create hidden alternate credentials;
- retain access after revocation.
