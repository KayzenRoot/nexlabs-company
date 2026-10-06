# NexLabs Technology — Innovation Ledger

**Status:** `CANONICAL_WO_010`

The Innovation Ledger is the company register of potentially reusable technical innovations and differentiators.

It is **not** a patent registry and does not assert legal protection.

## Entry fields

- `innovation_id`
- `working_title`
- `status`
- `originating_project`
- `research_ids`
- `first_recorded_at`
- `contributors`
- `problem`
- `technical_approach`
- `differentiation_claim`
- `evidence_refs`
- `prototype_refs`
- `third_party_dependencies`
- `license_refs`
- `public_disclosure_status`
- `confidentiality_treatment`
- `ip_disposition`
- `founder_decision`
- `legal_review_ref` when applicable
- `product_transfer_refs`
- `notes`

## Status vocabulary

- `CANDIDATE`
- `UNDER_RESEARCH`
- `PROTOTYPED`
- `INTERNAL_TECH`
- `PRODUCT_TRANSFERRED`
- `LICENSING_CANDIDATE`
- `OPEN_SOURCE_CANDIDATE`
- `PUBLICATION_CANDIDATE`
- `LEGAL_REVIEW_REQUIRED`
- `DEFERRED`
- `REJECTED`
- `ARCHIVED`

## Differentiation discipline

A differentiation claim should answer:
- what is technically distinct;
- compared with what baseline/alternative;
- why the distinction matters;
- what evidence supports it.

“Uses AI” is not a differentiation claim.

## Confidentiality

Entries may be public-safe summaries in this public repository, but confidential invention detail should live in an appropriately protected system/data room.

Do not store secrets, private keys, unreleased sensitive algorithms or confidential third-party information in a public ledger.
