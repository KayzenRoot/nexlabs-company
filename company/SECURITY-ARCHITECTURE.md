# NexLabs Technology — Security Architecture

**Status:** `CANONICAL_WO_011`

## Security objective

NexLabs uses a zero-trust, least-privilege, fail-closed security model appropriate to an AI-native company where humans, agents, CI, models and external tools can all initiate actions.

Security protects:
- Founder identity and approval authority;
- source and canonical company state;
- credentials, API keys, secrets and signing material;
- customer/company/personal data;
- production infrastructure;
- money and value-bearing assets;
- agent/tool boundaries;
- research/IP and confidential information.

## Core trust boundaries

1. **Founder / privileged human boundary**
2. **Company OS / orchestration boundary**
3. **Agent runtime boundary**
4. **Executor/tool boundary**
5. **GitHub / source-control boundary**
6. **CI/CD boundary**
7. **Local Docker / workstation boundary**
8. **Cloud / staging / production boundary**
9. **Data-store / backup boundary**
10. **External provider / API / model boundary**
11. **Web3 wallet/signing boundary**
12. **Financial execution boundary**

Crossing a boundary requires explicit authentication, authorization and auditable purpose.

## Principles

- default deny;
- least privilege;
- separation of duties for high assurance;
- short-lived/scoped credentials where feasible;
- secrets never become normal model context;
- untrusted content is data, not authority;
- exact target/action preview before irreversible action;
- read-back verification after material mutation;
- minimize data before sending to third parties/models;
- restore-tested recovery;
- no security-by-chat-history.

## Security control planes

### Identity plane
Who/what is acting?

### Authorization plane
What may this identity do, on which resource, environment, amount and duration?

### Data plane
What data is being read/transformed/transmitted/stored?

### Execution plane
Which tool/runtime performs the mutation?

### Evidence plane
What attributable proof exists before/after the action?

### Recovery plane
What happens if execution is partial, ambiguous, compromised or unavailable?

## Environment separation

At minimum:
- local/development;
- staging/test;
- production.

Production privileges must not automatically flow from local tooling.

## High-assurance zones

The following are isolated from ordinary automation:
- secret administration;
- privileged IAM;
- production deployment with material blast radius;
- company money movement;
- trading execution;
- Web3 signing/custody;
- smart-contract deployment/upgrade with value or privilege;
- destructive data operations;
- security-policy override.

## Enforcement direction

Later Company OS/runtime implementation must convert these policies into executable controls. Documentation alone is not considered security enforcement.
