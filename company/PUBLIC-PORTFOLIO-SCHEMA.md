# NexLabs Technology — Public Portfolio Schema

**Status:** `CANONICAL_WO_014`

## Purpose

The public portfolio shows verifiable NexLabs products, projects, research-derived technology and open work without inflating company maturity.

## Record fields

- `portfolio_id`
- `slug`
- `public_name`
- `category`
- `public_status`
- `origin_type`
- `summary`
- `problem`
- `target_user_or_system`
- `solution_or_approach`
- `capabilities`
- `differentiation`
- `architecture_summary`
- `technology_stack`
- `proof_refs`
- `metrics`
- `screenshots_media`
- `demo_url`
- `public_repo_url`
- `case_study_slug`
- `research_or_ip_disclosure`
- `security_regulatory_note`
- `disclosure_class`
- `last_verified_at`

Optional fields remain absent when unavailable rather than fabricated.

## Public status

Use one:
- `RESEARCH`
- `PROTOTYPE`
- `PRIVATE_BETA`
- `PUBLIC_BETA`
- `ACTIVE_PRODUCT`
- `INTERNAL_PLATFORM`
- `OPEN_SOURCE`
- `MAINTAIN`
- `PAUSED`
- `RETIRED`

## Origin type

Examples:
- `OWNED_PRODUCT`
- `INTERNAL_TECHNOLOGY`
- `RESEARCH_PROJECT`
- `OPEN_SOURCE_PROJECT`
- `CLIENT_WORK` only with real evidence/permission.

Internal NexLabs work must not be presented as client work.

## Metric state

Each metric records:
- definition;
- value/range;
- period;
- source;
- `MEASURED | ESTIMATED | UNAVAILABLE | NOT_APPLICABLE`;
- last verification.

Estimated values should rarely be public unless their estimate nature is useful and explicit.

## Disclosure class

- `PUBLIC`
- `PUBLIC_SUMMARY_ONLY`
- `EMBARGOED`
- `PRIVATE`

Only PUBLIC/PUBLIC_SUMMARY_ONLY are website-eligible.

## Demo/repository

Absence of a public demo/repo is acceptable.

Do not create fake links/placeholders that imply availability.

## Portfolio quality

A small truthful portfolio is stronger than a large fictional one.
