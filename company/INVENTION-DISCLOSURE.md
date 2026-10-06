# NexLabs Technology — Invention Disclosure

**Status:** `CANONICAL_WO_010`

An Invention Disclosure is an internal record used when a technical result may merit stronger IP/confidentiality treatment or legal review.

It is not a patent filing.

## Required fields

- `disclosure_id`
- `innovation_id`
- `title`
- `date_recorded`
- `contributors`
- `contributor_role/runtime`
- `originating_project/research`
- `problem_addressed`
- `technical_description`
- `claimed_novel_elements`
- `prior_art_or_known_alternatives`
- `source/evidence_refs`
- `prototype/commit_refs`
- `third_party_code_model_data`
- `licenses/terms_refs`
- `first_public_disclosure_date`
- `planned_disclosure`
- `confidentiality_state`
- `customer/partner_material_involved`
- `founder_disposition`
- `legal_review_ref`

## Contributor provenance

Record human and AI-assisted contribution honestly.

AI involvement should record:
- role/run;
- provider/model where useful;
- source inputs;
- generated artifacts/evidence refs.

Do not automatically call the model or provider an inventor/owner. Legal treatment of inventorship/authorship/ownership depends on jurisdiction and facts and must be reviewed appropriately.

## Public disclosure warning

If patent/trade-secret review may be relevant, public disclosure can have serious consequences.

Default behavior for an unresolved candidate:
- no public release;
- no public demo of protected detail;
- no open-source publication;
- escalate for Founder/legal disposition.

## Third-party contamination check

Before stronger proprietary claims, inspect whether the result materially incorporates:
- third-party source;
- restrictive license;
- confidential partner/customer material;
- model/data terms;
- copied algorithm/design.

Unknown provenance blocks strong ownership claims until reconciled.
