# NexLabs Technology — Diligence Evidence Index Standard

**Status:** `CANONICAL_WO_015`

## Purpose

The evidence index makes diligence auditable and prevents outdated files from masquerading as current truth.

## Record schema

- `evidence_id`
- `title`
- `category`
- `claim_or_question_supported`
- `source_system`
- `source_ref`
- `owner`
- `document_version`
- `as_of_date`
- `last_verified_at`
- `evidence_state`
- `access_class`
- `supersedes`
- `notes`

## Evidence state

- `CURRENT_VERIFIED`
- `CURRENT_SELF_ATTESTED`
- `PENDING_VERIFICATION`
- `STALE`
- `SUPERSEDED`
- `UNAVAILABLE`
- `NOT_APPLICABLE`

## Rules

- stale/superseded files cannot silently support current claims;
- every critical diligence question should map to evidence or an explicit gap;
- confidential content is linked by protected reference, not copied into public Git;
- one file may support multiple claims;
- conflicting records trigger reconciliation.

## Diligence gap

A gap record should identify:
- missing evidence;
- why missing;
- materiality;
- owner;
- remediation;
- target date if meaningful.

## Versioning

Investor packages should identify a snapshot/as-of date so later operational changes do not rewrite what was shared historically.
