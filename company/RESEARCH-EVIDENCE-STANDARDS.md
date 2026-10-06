# NexLabs Technology — Research Evidence Standards

**Status:** `CANONICAL_WO_010`

## Evidence taxonomy

### SOURCE_EVIDENCE
Information obtained from an external or internal source.

Record:
- source identity;
- date/access time when relevant;
- author/provider;
- version;
- URL/document/repository reference;
- reliability notes.

### EXPERIMENT_RESULT
Observed output from a defined experiment/benchmark.

Record:
- hypothesis;
- environment;
- inputs;
- method;
- configuration/model/version;
- raw/derived results;
- reproducibility notes.

### OBSERVATION
A directly observed behavior/event that is not necessarily from a controlled experiment.

### INFERENCE
A conclusion derived from evidence.

Must reference the supporting evidence.

### ASSUMPTION
Something treated as tentatively true for planning/testing.

### UNKNOWN
Material information not currently known.

### OPINION / JUDGMENT
A recommendation or expert judgment. Must not masquerade as measured fact.

## Evidence quality dimensions

- relevance;
- source authority;
- recency;
- reproducibility;
- sample size;
- independence;
- bias/conflict;
- uncertainty;
- applicability to the actual target environment.

## AI-generated research

AI-generated summaries, hypotheses and synthesis are not primary evidence by themselves.

Where claims materially affect decisions:
- trace to sources or experiments;
- disclose uncertainty;
- avoid fabricated citations/results.

## Benchmark integrity

Benchmarks should preserve:
- exact workload;
- environment/hardware;
- versions;
- warm/cold conditions where relevant;
- measurement method;
- repeat count;
- cost;
- error/failure rate.

Do not compare unlike workloads as if equivalent.

## Research receipts

Material research should produce a receipt with:
- research_id;
- role/run;
- sources;
- experiments;
- result;
- confidence;
- unresolved unknowns;
- recommendation;
- next decision.

## Public-source restrictions

Copyright, licenses, terms of use and data-use restrictions remain applicable.

Research access does not imply permission to redistribute source material or training data.
