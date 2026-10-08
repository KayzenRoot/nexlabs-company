# WO-019: Autonomous Engineering Cell MVP

**Implementation status:** offline executable vertical slice, provider-independent and sandboxed by lack of host/network/tool access.

## Proven workflow
Founder action-bound approval → deterministic plan/WO compiler → Context Lock verification → injected proposal adapter → immutable virtual candidate → separate deterministic QA → bounded correction → append-only hash-chained receipts → **PENDING_GEF_REVIEW** checkpoint handoff.

A failed first proposal remains visible in the receipt chain; a passing correction does not erase it.

## Security model
- Adapter returns **data only**, never permissions or shell commands.
- No filesystem writes, GitHub tokens, Docker socket, subprocess, network calls or wallet/bank APIs.
- Edit paths are allowlisted and traversal / protected paths are denied.
- Founder approval binds digest, actor, organization and exact Git base, with expiry. A separate **trustedApprovalVerifier** adapter must affirm the approval; self-declared `approver_role=FOUNDER` never grants execution by itself. The offline demo verifier is a TEST FIXTURE, not real authentication.
- Proposed edits are staged in memory only.
- QA gates are deterministic and not a substitute for actual CI on changed repo files.
- \`READY_FOR_GOVERNED_PR\` is **not** PR opened, code merged, or checkpoint promoted.
- Receipt chain is SHA-256 hash-linked and is not claimed to be tamper-proof after export unless signed/anchored by trusted evidence infrastructure.
- Live Hermes/provider execution, isolated host broker, real branch mutations and real product code execution are not proven in this WO.

## Run locally
Node.js 22+:
\`\`\`
node --test company-os/cell/engine.test.mjs
node company-os/cell/cli.mjs demo
\`\`\`
Optional isolated Docker one-shot demo:
\`\`\`
docker compose -f infra/docker/compose.cell-demo.yaml run --rm cell-demo
\`\`\`

## Accepted contract / handoff
Success: \`READY_FOR_GOVERNED_PR\` with candidate content, SHA-256 content digest, QA evidence, receipt chain and \`checkpoint_handoff.state=PENDING_GEF_REVIEW\`. Founder/GEF review must inspect and apply the staged patch in an authorized external process before any real PR/merge.

Failure: \`BLOCKED\`, \`CORRECTION_REQUIRED\`, \`CANCELLED\` or \`RECOVERY_REQUIRED\`; none creates promotion authority.

## Follow-on
A separately admitted implementation increment must add real persistent state, narrow executable workspaces, provider integration, native GitHub/Git mutations and independent auditing without weakening this contract. Do not treat the demo as a deployed autonomous production cell.
