// WO-023: read-only projection of ACTUALLY executed deterministic offline fixture.
// No file writes, secrets, real Founder identity, external provider or network calls.
import { verifyReceiptChain } from "../cell/engine.mjs";
import { runDemo } from "../cell/fixtures.mjs";

export class OfflineEvidenceError extends Error {
  constructor(code) { super(code); this.name = "OfflineEvidenceError"; this.code = code; }
}
const requireEvidence = (condition, code) => {
  if (!condition) throw new OfflineEvidenceError(code);
};
const hex = value => typeof value === "string" && /^[0-9a-f]{64}$/.test(value);
const gitSha = value => typeof value === "string" && /^[0-9a-f]{40}$/.test(value);

export function projectOfflineCellEvidence(run) {
  requireEvidence(run && typeof run === "object" && !Array.isArray(run), "EVIDENCE_INVALID");
  requireEvidence(Array.isArray(run.events) && run.events.length >= 5 && run.events.length <= 200, "EVIDENCE_INVALID");
  requireEvidence(verifyReceiptChain(run.events), "RECEIPT_CHAIN_INVALID");
  requireEvidence(run.status === "READY_FOR_GOVERNED_PR", "RUN_NOT_READY");
  requireEvidence(run.workOrder && /^CELL-[A-Z0-9_-]{1,64}$/.test(run.workOrder.key) &&
    gitSha(run.workOrder.base_sha), "WORK_ORDER_INVALID");
  requireEvidence(run.qa?.passed === true && run.checkpoint_handoff?.state === "PENDING_GEF_REVIEW" &&
    run.checkpoint_handoff.merge_authorized === false &&
    run.checkpoint_handoff.checkpoint_promoted === false, "AUTHORITY_CONFLICT");

  const events = run.events;
  requireEvidence(events[0].type === "FOUNDER_INTENT_APPROVED" &&
    events.some(e => e.type === "PLAN_COMPILED") &&
    events.some(e => e.type === "CONTEXT_LOCK_VERIFIED"), "APPROVAL_FIXTURE_MISSING");
  requireEvidence(events.every(e => Number.isInteger(e.sequence) && typeof e.type === "string" &&
    /^[A-Z_]{2,48}$/.test(e.type) && hex(e.hash)), "EVENT_INVALID");
  const attempts = events.filter(e => e.type === "EXECUTION_REQUESTED");
  const completed = events.filter(e => e.type === "QA_COMPLETED");
  const failures = completed.filter(e => e.detail?.passed === false);
  const passes = completed.filter(e => e.detail?.passed === true);
  const corrections = events.filter(e => e.type === "CORRECTION_REQUIRED");
  requireEvidence(attempts.length >= 1 && attempts.length <= 3 &&
    attempts.length === completed.length && passes.length === 1 &&
    failures.length === corrections.length &&
    corrections.length >= 1 && attempts.length === failures.length + passes.length &&
    attempts.every((e,i) => e.detail?.attempt === i+1) &&
    completed.every((e,i) => e.detail?.attempt === i+1), "RUN_EVENT_CONFLICT");
  requireEvidence(events.some(e => e.type === "CHECKPOINT_HANDOFF_PREPARED"), "HANDOFF_MISSING");
  const last = events.at(-1);
  requireEvidence(last.type === "CHECKPOINT_HANDOFF_PREPARED", "TERMINAL_EVENT_INVALID");

  // Export no raw receipt detail, secret-bearing payload, generated code, untrusted path or prompt.
  return Object.freeze({
    schemaVersion: 1,
    state: "OBSERVED_OFFLINE_FIXTURE",
    origin: "WO_019_DETERMINISTIC_INJECTED_ADAPTER",
    founderApproval: "TEST_FIXTURE_VERIFIER_ONLY",
    liveProviderExecution: false,
    realFounderIdentityVerified: false,
    externalAgentTelemetry: "NOT_CONNECTED",
    persistence: "IN_MEMORY_PROCESS_LIFETIME",
    workOrderKey: run.workOrder.key,
    fixtureBaseSha: run.workOrder.base_sha,
    runStatus: run.status,
    receiptIntegrity: "VERIFIED_SHA256_CHAIN",
    evidenceHead: last.hash,
    measured: Object.freeze({
      offlineRuns: 1,
      attemptedProposals: attempts.length,
      qaFailures: failures.length,
      correctionsRequired: corrections.length,
      passedQa: passes.length,
      fixtureApprovalEvents: 1
    }),
    checkpointHandoff: "PENDING_GEF_REVIEW",
    mergeAuthorized: false,
    checkpointPromoted: false,
    events: Object.freeze(events.map(e => Object.freeze({
      sequence: e.sequence, type: e.type, hash: e.hash
    })))
  });
}

export async function captureOfflineCellEvidence() {
  // Each invocation runs one real local deterministic execution. Call ONCE at startup.
  return projectOfflineCellEvidence(await runDemo());
}
