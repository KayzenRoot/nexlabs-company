# NexLabs Technology — Authority Matrix

**Status:** `CANONICAL_WO_005`

## Action classes

Every material action must resolve to exactly one minimum class.

| Class | Meaning | Minimum control |
| --- | --- | --- |
| `AUTO` | Low-risk read/compute action | Role permission + scope |
| `AUTO+AUDIT` | Routine bounded mutation | Permission + scope + durable receipt/evidence |
| `REVIEW_REQUIRED` | Moderate-risk action | Separate review gate + evidence |
| `CEO_APPROVAL` | High/consequential action | Explicit Founder/CEO authorization + evidence |
| `PROHIBITED` | Action not permitted under current policy | Must not execute |

A stricter product/security policy may raise the required class. It may not silently lower it.

## Default examples

### AUTO
- read public/canonical repository sources;
- analyze data already authorized for the role;
- draft plans/documents without external side effects;
- run local read-only diagnostics;
- compute estimates clearly marked as estimates.

### AUTO+AUDIT
When inside an admitted scope and tool permission:
- create/update bounded documentation;
- create Git branches;
- open/update issues and PRs;
- run tests/CI;
- create non-secret evidence;
- execute low-risk reversible development mutations;
- update staging-like disposable fixtures;
- perform approved scheduled reporting.

### REVIEW_REQUIRED
Examples:
- add/upgrade a dependency with material runtime/security impact;
- change a public API/schema with compatibility impact;
- deploy to shared staging where other systems/users depend on it;
- alter customer-facing entitlement logic;
- modify security configuration without expanding privileged access;
- run significant data migrations on non-production test/staging data;
- publish external company content representing approved strategy.

Review may be performed by a separate qualified AI reviewer when policy allows. “Separate” means logically independent review state and evidence, not necessarily a different GitHub account.

### CEO_APPROVAL
Default examples:
- production deployment with material blast radius until a narrower policy is later approved;
- transfer/spend funds outside an explicitly pre-approved envelope;
- create/rotate/reveal privileged credentials or signing authority;
- enter or accept a legal contract;
- make equity/ownership/cap-table changes;
- create bank, exchange, custody or payment accounts;
- sign or broadcast a value-bearing blockchain transaction;
- deploy a smart contract that can control material value;
- make irreversible destructive production changes;
- disclose material confidential/company/customer information outside an approved channel;
- override a blocked high-risk workflow through a governed exception, where exception is allowed.

CEO approval never converts a `PROHIBITED` action into an executable action unless governance itself is formally changed and applicable external constraints permit it.

### PROHIBITED
Examples are canonicalized in `PROHIBITED-ACTIONS.md`.

## Functional authority matrix

| Function | AI default | Founder reserved |
| --- | --- | --- |
| Research / analysis | AUTO | Change strategic question/priority |
| Documentation | AUTO+AUDIT | Approve foundational company policy where designated |
| Product planning | AUTO/AUTO+AUDIT | Final strategic prioritization |
| Engineering implementation | AUTO+AUDIT within admitted WO | Exceptional scope/risk decisions |
| Engineering audit | REVIEW_REQUIRED logical stage | Accept explicitly founder-reserved exception |
| Repository merge | Governed by GEF/repo policy | Cannot bypass required evidence |
| Staging deployment | REVIEW_REQUIRED by default | May raise/lower only through later governed policy |
| Production deployment | CEO_APPROVAL by default | Reserved until narrower safe envelope exists |
| Marketing draft | AUTO | — |
| External publication | REVIEW_REQUIRED | Founder approval when material company claim/risk |
| Pricing experiment proposal | AUTO | — |
| Production pricing/entitlement change | REVIEW_REQUIRED or CEO_APPROVAL by impact | Material exceptions |
| Budget analysis | AUTO | — |
| Spend / payment | CEO_APPROVAL unless explicitly pre-approved later | Reserved |
| Contract negotiation draft | AUTO | — |
| Contract acceptance/signature | CEO_APPROVAL | Reserved |
| Secret read/use | Only explicitly scoped role | Grant/revoke privileged access |
| Secret disclosure/export | PROHIBITED except specific approved secure transfer mechanism | No informal override |
| Web3 analysis/simulation | AUTO | — |
| Value-bearing signing/broadcast | CEO_APPROVAL | Reserved |
| Governance modification | REVIEW_REQUIRED proposal | Founder approval + governed change |
| Agent permission expansion | PROHIBITED self-action | Only through governed authorization |

## Pre-approved envelopes

Future WOs may create bounded pre-approved envelopes for specific actions, such as:
- a recurring cloud budget;
- a production deployment with automated rollback and strict limits;
- a payment below an approved threshold to an approved vendor;
- a signing policy limited to a specific contract/method/value.

Until such a policy is canonical, the stricter default above applies.
