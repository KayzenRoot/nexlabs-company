# NexLabs Technology — Product Validation Gates

**Status:** `CANONICAL_WO_008`

## Gate V0 — Problem clarity

Question:
**Do we understand who has what problem?**

Minimum:
- user/segment;
- problem/job;
- consequence/frequency;
- evidence or explicit uncertainty.

Fail:
return to research or reject.

## Gate V1 — Problem evidence

Question:
**Is the problem real enough to justify further validation?**

Possible evidence:
- interviews;
- communities/search behavior;
- existing spending/workarounds;
- repeated complaints;
- observed workflow;
- market alternatives.

Not every product requires the same evidence type.

## Gate V2 — Value hypothesis

Question:
**Can NexLabs plausibly create materially better value?**

Consider:
- time saved;
- money saved/earned;
- risk reduced;
- quality improved;
- entertainment/engagement;
- convenience;
- developer leverage.

## Gate V3 — Distribution hypothesis

Question:
**Can the target users realistically be reached?**

At least one plausible path is needed:
- search;
- communities;
- outbound;
- partnerships;
- marketplaces;
- app stores;
- ecosystem distribution;
- product-led sharing;
- existing audience.

“Run ads” without economics is not a distribution thesis.

## Gate V4 — Technical feasibility

Question:
**Can a credible MVP be built with acceptable cost and reliability?**

May require:
- prototype;
- architecture spike;
- API/provider check;
- performance test;
- model-quality evaluation.

## Gate V5 — Economic hypothesis

Question:
**Is there a plausible path to value capture with acceptable cost-to-serve?**

No fixed price is required yet, but primary monetization and major cost drivers must be understood.

## Gate V6 — Risk / permission

Question:
**Can we pursue this within security, legal/compliance and company-governance boundaries?**

High-risk products require stronger evidence and later specialized gates.

## Gate V7 — Portfolio fit

Question:
**Is this a better use of constrained NexLabs capacity than the alternatives?**

This gate considers opportunity cost.

## Gate output

Each gate returns:
- `PASS`
- `PASS_WITH_ASSUMPTIONS`
- `MORE_EVIDENCE`
- `BLOCKED`
- `REJECT`

A gate does not need false precision. The evidence behind the verdict matters more than a decorative score.
