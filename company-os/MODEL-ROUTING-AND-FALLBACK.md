# Model Routing and Fallback

**Status:** `CANDIDATE_WO_018`

## Candidate eligibility (hard gates)

Approved for organization; provider healthy; model capability/tool needs; context length; policy and geographic/data classification; provider egress permitted; budget max USD and time/turn limits; available auth.

If no eligible candidate, deny. **Never** degrade data constraints, token ceilings, approval requirements or tool policy to force a response.

## Selection

Among eligible candidates, choose lowest bounded estimated cost subject to reliability/quality SLAs and policy. Record why it was chosen, input refs, expected cost and provider version.

## Fallback

Allow only BEFORE side effects, or when read-only reconciliation proves action absent and policy re-authorizes a new attempt. Fallback after provider outage is not automatic consent to share CONFIDENTIAL context with a third party.

## Billing

ChatGPT Plus/Codex subscriptions and external API fees are separate. Routing does not claim a subscription covers a provider usage charge. Do not create hidden paid invocations. Pricing data has timestamp/source/uncertainty.

## Default

Fail closed, not “best effort” in HIGH_ASSURANCE.
