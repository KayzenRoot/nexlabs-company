# Hermes Adapter Design

**Status:** `CANDIDATE_WO_018`
**Vendor:** NousResearch Hermes Agent. Optional, replaceable.

## Verified integration surface

The upstream Hermes CLI documents `hermes chat --query-file - --oneshot --format stream-json`, `--provider`, `--model`, `--max-turns` and programmatic/quiet use. The upstream CLI is actively evolving: an adapter must pin supported version, validate flags at startup and parse versioned records defensively.

Official source: https://hermes-agent.nousresearch.com/docs/reference/cli-commands
Official project: https://github.com/NousResearch/hermes-agent

## Planned invocation (NOT EXECUTED)

`hermes chat --query-file - --oneshot --quiet --format stream-json --max-turns <N> --provider <approved> --model <approved>`.

Send input via standard input using argv array, not a shell command string. Never append `--yolo`. Reject untrusted additional flags or profile changes. A safe tool configuration is a prerequisite, not assumed from CLI defaults.

## Tool isolation

Hermes can possess terminal/web/MCP tools and memory. **Company OS must not trust Hermes tool affordances as permissions.** For the first live adapter:
1. use isolated profile and minimal toolsets with no unrestricted shell/file/network side effects;
2. intercept authorized tool requests through bounded Company OS broker;
3. before trusted interception exists, operate Hermes read-only/summarization only;
4. never give agents host Docker socket, SSH keys, wallet keys, long-lived GitHub tokens or unbounded repository writes;
5. record tool attempt, decision, action digest and evidence.

## Session semantics

Streaming JSONL may contain intermediate records. Adapter needs schema checks, bounded stdout/stderr, timeouts, cancellation, errors and redaction. Only a confirmed terminal completion produces SUCCEEDED. Unknown process termination following possible mutation is RECOVERY_REQUIRED.

## Profiles / credentials

A dedicated Hermes installation/profile is configured separately on an authorized host. Credentials live outside Git in secret broker/runtime-only config. No background installation, authentication or host process is claimed by WO-018.

## Compatibility gates before live activation

Version check; help/flag check; profile isolation; no privileged tools; canary one-shot; cancellation test; denied-tool test; resource budget test; redaction check; observed provider receipt. Pin adapter compatibility in implementation PR.
