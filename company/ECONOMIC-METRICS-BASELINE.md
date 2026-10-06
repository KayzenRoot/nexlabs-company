# NexLabs Technology — Economic Metrics Baseline

**Status:** `CANONICAL_WO_004`

This document defines measurement obligations, not current performance claims.

## Minimum product economics

Before describing a revenue product as scalable, NexLabs should eventually know or explicitly mark unavailable:

### Revenue
- MRR / recurring revenue where applicable;
- ARR run-rate where meaningful;
- one-time/usage/transaction revenue separately;
- ARPU / ARPA where useful;
- paid conversion.

### Retention
- customer/logo retention;
- revenue retention;
- churn;
- cohort retention;
- repeat usage.

### Cost-to-serve
- AI/model cost;
- cloud/compute;
- data/provider fees;
- payment fees;
- customer-support burden;
- directly attributable third-party services.

### Margin
- gross margin;
- contribution margin where measurable;
- margin by tier/segment if materially different.

### Acquisition
- acquisition channel;
- CAC or a clearly marked unavailable state;
- organic vs paid share;
- sales effort for enterprise products;
- payback period when CAC exists.

### Product efficiency
- activation;
- usage frequency;
- time-to-value;
- upgrade/expansion behavior;
- support tickets/incidents affecting economics.

## AI-native company metrics

NexLabs should also measure the economics of its operating model:
- model spend by product/agent/workflow;
- cost per successful automated task;
- retry/failure cost;
- manual intervention rate;
- reuse/cache savings where measurable;
- infrastructure cost per active/paid user where applicable.

## Decision states

Metrics can be:
- `MEASURED`;
- `ESTIMATED` with assumptions;
- `UNAVAILABLE`;
- `NOT_APPLICABLE`.

Unknown must not be coerced to zero.

## Scaling rule

A product may intentionally scale before every metric is mature, but the missing evidence and risk must be explicit. “Growth” without cost, retention and margin context is not sufficient economic proof.
