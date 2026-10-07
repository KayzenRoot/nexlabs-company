# NexLabs Company OS — Agent Runtime Contract

**Status:** `CANONICAL_WO_016`

## Purpose

Company OS treats an AI runtime/provider as a replaceable execution capability.

Hermes, OpenAI, Codex, local LLMs and future runtimes may implement this contract.

## Runtime adapter responsibilities

- create/resume session;
- select/request model capability;
- deliver bounded context;
- expose only allowed tools;
- execute task;
- stream/collect outputs;
- report usage/cost;
- produce provider-native references;
- terminate/cancel;
- return evidence/receipts.

## Session request

Conceptually:
- session_id;
- organization_id;
- agent_instance_id;
- task_id;
- role_contract_ref;
- canonical_context_refs;
- tool_profile;
- model_requirement;
- budget limits;
- time limits;
- data-classification constraints;
- correlation_id.

## Session result

- state;
- provider/runtime;
- model;
- output refs;
- tool/action records;
- usage;
- cost;
- external session/run ID;
- failure classification;
- evidence refs.

## Context model

Agents receive references/summaries needed for the task.

They do not receive the entire company corpus by default.

Critical canonical decisions should be fetched from authoritative sources rather than relied on from conversational memory.

## Tooling

Runtime adapter receives a bounded tool profile.

Tool availability does not imply authority to use it. Company OS authorization still applies to consequential actions.

## Model routing

Routing may consider:
- task capability;
- cost;
- latency;
- context size;
- data sensitivity;
- reliability;
- policy.

No business logic should depend on one model name.

## Memory

Runtime/session memory is non-canonical unless promoted into governed Company OS/company sources.

Derived memory can be helpful but cannot override canonical state.

## Provider outage

Fallback to another runtime is allowed only if:
- capability requirements are met;
- data/security policy allows it;
- task authority remains valid.

## Secret handling

Pass secret handles/brokered capabilities whenever possible.

Do not place raw long-lived credentials in prompts.

## Cancellation

Company OS can suspend/cancel an agent session and revoke tool/authority envelopes independently of provider session semantics.
