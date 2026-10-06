# NexLabs Company Source Hierarchy

Status: `CANONICAL`

Authority is resolved by domain. A newer file does not automatically override an approved canonical source.

| Priority | Domain | Canonical source |
| --- | --- | --- |
| 1 | Current state | `CHECKPOINT.md`, `CHECKPOINT.json`, exact Git/GitHub state |
| 2 | Decisions | `DECISIONS-LEDGER.md` and accepted ADRs |
| 3 | Scope | `SCOPE.md` and the active admitted Work Order |
| 4 | Completion | `DEFINITION-OF-DONE.md` |
| 5 | Architecture | `ARCHITECTURE.md` and accepted architecture ADRs |
| 6 | Requirements | `REQUIREMENTS.md` |
| 8 | Security | `SECURITY.md` |
| 9 | Validation | `TEST-BENCHMARK-PLAN.md` plus exact-head evidence |
| 10 | Deployment | `DEPLOYMENT.md` |
| 11 | Future work | `BACKLOG.md`, Work Order Registry and GitHub issues |
| 12 | Conversation | transient context only |

If canonical sources conflict, are missing, stale, or bound to another Git head, stop the affected progression and reconcile through the active Work Order. Never infer approval from chat history.


## Company-strategy authority

`company/COMPANY-MASTER.md` is the primary authority for company identity, mission, vision, category, thesis, strategic pillars and high-level boundaries.

The following documents refine that authority:
- `company/MISSION-VISION-VALUES.md`
- `company/COMPANY-THESIS.md`
- `company/POSITIONING.md`
- `company/STRATEGIC-BOUNDARIES.md`
- `company/FIVE-YEAR-DIRECTION.md`

Later Business Model, Governance, Workforce, Product Factory, Finance, GTM, Brand and Investor Work Orders may refine their own domains but must not silently redefine the approved company identity. A cross-domain conflict requires an explicit decision.
