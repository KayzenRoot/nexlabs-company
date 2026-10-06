# NexLabs Technology — AI Tools & Capabilities

**Status:** `CANONICAL_WO_007`

## 1. Capability registry concept

Company OS should eventually expose capabilities through stable logical identifiers.

Examples:
- `repository.read`
- `repository.write_bounded`
- `issue.create`
- `pull_request.review`
- `ci.read`
- `ci.trigger`
- `container.execute_local`
- `research.web_read`
- `analytics.query_readonly`

Provider-specific adapters implement these capabilities.

## 2. Tool ≠ authority

A tool being connected does not mean the employee may use every function.

A capability is filtered by:
- role;
- task;
- action class;
- environment;
- risk;
- approval;
- data policy.

## 3. Read vs write

Prefer distinct capabilities for:
- read;
- create;
- update;
- delete;
- approve;
- execute;
- administer.

“Full access” is not a preferred capability design.

## 4. Dangerous capability families

Require heightened governance:
- secrets/IAM;
- money/payment;
- production admin;
- blockchain signing;
- destructive data operations;
- legal signature/acceptance;
- repository settings/rulesets;
- customer data export.

## 5. Executor adapters

Code execution may be supplied by:
- connected ChatGPT repository tools;
- Codex;
- local CLI/code agents;
- CI runners;
- future agents.

The role contract should refer to the required capability, not hard-code one executor unless technically necessary.

## 6. Tool failure

Tool success response is not sufficient proof of business outcome.

Employees must verify the intended post-state when the action is material.

## 7. Tool discovery

If an available capability is unknown:
- discovery may be read-only;
- mutation remains blocked until permission is resolved.

## 8. Tool substitution

Equivalent tool adapters may replace one another when:
- capability semantics match;
- security level is sufficient;
- receipts remain attributable;
- the contract does not change.

A material change in capability semantics requires review.
