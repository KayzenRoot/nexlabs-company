# NexLabs Technology — Cost Allocation for AI, Cloud & Data

**Status:** `CANONICAL_WO_012`

## Why allocation matters

A multi-product AI company can look profitable at company level while one product quietly consumes disproportionate model/cloud cost.

## Allocation dimensions

Where feasible, tag spend by:
- provider;
- account/project;
- product;
- environment;
- agent/workflow;
- model;
- customer/tier;
- cost type.

## AI/model costs

Track:
- input/output tokens or equivalent units;
- cached/reused units;
- image/video/audio generations;
- tool/agent run cost;
- retries;
- failed runs;
- human-intervention-triggered reruns.

## Cloud

Track:
- compute;
- GPU;
- storage;
- database;
- network/egress;
- observability;
- queues/cache;
- build/CI;
- backup.

## Shared cost

Shared platform cost may be allocated by:
- usage;
- active users;
- workload;
- revenue;
- equal allocation;
- strategic/internal bucket.

The allocation method must be disclosed.

## Successful-task economics

For autonomous workflows measure where useful:

`COST_PER_SUCCESSFUL_TASK = total workflow cost / successful accepted outcomes`

Include retries/failures when they consume cost.

## Optimization

Potential levers:
- model routing;
- caching;
- batching;
- local inference;
- prompt/context reduction;
- cheaper provider;
- workload scheduling;
- architecture improvements.

Do not optimize cost by silently lowering required quality/security.

## Cost anomaly

Unexpected provider-cost spikes should trigger investigation before they are accepted as normal forecast.
