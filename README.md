# NexLabs Company

Canonical company and engineering repository for NexLabs Technology.

## Canonical company systems

- Strategy: `company/COMPANY-MASTER.md`
- Business model: `company/BUSINESS-MODEL.md`
- Governance: `company/CORPORATE-GOVERNANCE.md`
- AI organization: `company/AI-ORGANIZATION.md`
- AI employee contract: `company/AI-EMPLOYEE-CONTRACT.md`
- Product Factory: `company/PRODUCT-FACTORY.md`
- Autonomous Software Factory: `company/AUTONOMOUS-SOFTWARE-FACTORY.md`
- Research / Innovation / IP: `company/RESEARCH-INNOVATION-STRATEGY.md`
- Security: `company/SECURITY-ARCHITECTURE.md`
- Finance: `company/FINANCE-OPERATING-MODEL.md`
- GTM: `company/GO-TO-MARKET-OPERATING-MODEL.md`
- Brand / Public Presence: `company/BRAND-SYSTEM.md`
- Investor System: `company/INVESTOR-READINESS-OPERATING-MODEL.md`
- Company OS Architecture: `company-os/ARCHITECTURE.md`

## Company OS architecture posture

NexLabs Company OS v0.1 begins as a **modular monolith** with explicit bounded contexts. PostgreSQL is canonical transactional truth. Redis/cache/queues are optional acceleration and never authoritative state. Domain events use a transactional outbox with at-least-once delivery and idempotent consumers.

Authorization is capability/policy based. High-assurance actions use action-bound approval envelopes and post-action verification. Agent runtimes such as Hermes, OpenAI, Codex and local models sit behind replaceable adapters.

Ambiguous external mutations enter `RECOVERY_REQUIRED`; blind replay is prohibited. GitHub and other providers remain authoritative for their provider-native objects, referenced by exact IDs/SHAs.

The first environment is local Docker, but the architecture is explicitly portable to staging and production.

## Current governed state

`NXL-COMPANY-WO-016` is complete.

The next legal action is to **admit WO-017** against current canonical main and create a fresh Context Lock.

WO-017 and later remain non-executable until admitted.

> Repository disclosure: this repository is public. Do not commit raw secrets, private keys, customer-confidential data, private financing documents or other protected operational material here.
