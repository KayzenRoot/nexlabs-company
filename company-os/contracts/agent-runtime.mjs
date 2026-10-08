// WO-018: dependency-free, provider-neutral CONTRACT helpers.
// This module plans requests; it does not execute commands, tools or model calls.
const STATES = {
  CREATED: ["DISPATCHED", "CANCELLED"],
  DISPATCHED: ["RUNNING", "UNKNOWN_COMPLETION", "FAILED", "CANCELLED"],
  RUNNING: ["SUCCEEDED", "FAILED", "UNKNOWN_COMPLETION", "CANCELLED"],
  UNKNOWN_COMPLETION: ["RECOVERY_REQUIRED"],
  RECOVERY_REQUIRED: ["RECONCILED_COMPLETE", "RECONCILED_ABSENT", "BLOCKED"],
  RECONCILED_ABSENT: ["CANCELLED"],
  RECONCILED_COMPLETE: [],
  SUCCEEDED: [], FAILED: [], CANCELLED: [], BLOCKED: []
};
export const RUN_STATES = Object.freeze(Object.keys(STATES));
export class ContractError extends Error {
  constructor(code, message) { super(message); this.name = "ContractError"; this.code = code; }
}
const fail = (code, message) => { throw new ContractError(code, message); };
const required = (value, label) => {
  if (typeof value !== "string" || value.length === 0) fail("VALIDATION_ERROR", label + " is required");
};
export function validateSessionRequest(r) {
  if (!r || typeof r !== "object") fail("VALIDATION_ERROR", "request required");
  for (const k of ["session_id", "organization_id", "agent_id", "task_id", "correlation_id", "role_contract_ref"]) required(r[k], k);
  if (!Array.isArray(r.canonical_context_refs) || r.canonical_context_refs.some(x => typeof x !== "string")) fail("VALIDATION_ERROR", "canonical refs required");
  if (!Array.isArray(r.requested_capabilities) || r.requested_capabilities.some(x => typeof x !== "string")) fail("VALIDATION_ERROR", "capability list required");
  if (!r.limits || !Number.isFinite(r.limits.max_turns) || r.limits.max_turns < 1 || !Number.isFinite(r.limits.max_cost_usd) || r.limits.max_cost_usd < 0 || !Number.isFinite(r.limits.timeout_ms) || r.limits.timeout_ms < 1) fail("VALIDATION_ERROR", "bounded turn/cost/time limits required");
  if (!["PUBLIC", "INTERNAL", "CONFIDENTIAL"].includes(r.data_class)) fail("VALIDATION_ERROR", "data class invalid");
  return r;
}
export function transitionRun(current, next) {
  if (!(current in STATES) || !STATES[current].includes(next)) fail("STATE_CONFLICT", current + " -> " + next);
  return next;
}
export function routeModel(request, candidates) {
  validateSessionRequest(request);
  const allowed = (candidates ?? []).filter(c =>
    c.healthy === true &&
    Array.isArray(c.data_classes) && c.data_classes.includes(request.data_class) &&
    Array.isArray(c.capabilities) && request.requested_capabilities.every(cap => c.capabilities.includes(cap)) &&
    c.max_context_tokens >= (request.context_tokens ?? 0) &&
    Number.isFinite(c.max_estimated_cost_usd) && c.max_estimated_cost_usd <= request.limits.max_cost_usd &&
    c.approved_for_org === true
  );
  if (!allowed.length) fail("ROUTING_DENIED", "No approved provider meets requirements; no silent fallback");
  return [...allowed].sort((a, b) => a.max_estimated_cost_usd - b.max_estimated_cost_usd || a.id.localeCompare(b.id))[0];
}
export function authorizeTool(action, policy) {
  required(action?.capability, "action capability");
  required(action?.digest, "action digest");
  if (policy?.actor_active !== true || policy?.allowlisted_capabilities?.includes(action.capability) !== true) fail("AUTHORIZATION_DENIED", "default deny");
  if (policy?.prohibited_capabilities?.includes(action.capability)) fail("AUTHORIZATION_DENIED", "prohibited capability");
  if (action.risk_class === "HIGH_ASSURANCE") {
    if (policy?.approval?.state !== "APPROVED" || policy.approval.digest !== action.digest ||
        policy.approval.subject_actor !== action.actor_id || policy.approval.expires_at_ms <= (policy.now_ms ?? Date.now()))
      fail("APPROVAL_REQUIRED", "exact action-bound, unexpired Founder approval required");
  }
  return { decision: "ALLOW", digest: action.digest };
}
export function enforceBudget(request, usage) {
  validateSessionRequest(request);
  if (![usage?.turns, usage?.cost_usd, usage?.elapsed_ms].every(x => Number.isFinite(x) && x >= 0)) fail("VALIDATION_ERROR", "invalid usage");
  if (usage.turns > request.limits.max_turns || usage.cost_usd > request.limits.max_cost_usd || usage.elapsed_ms > request.limits.timeout_ms)
    fail("BUDGET_EXCEEDED", "stop and record usage; never auto-expand budget");
  return true;
}
export function decideRecovery(outcome) {
  switch(outcome) {
    case "CONFIRMED_COMPLETE": return "RECONCILED_COMPLETE";
    case "CONFIRMED_ABSENT": return "RECONCILED_ABSENT";
    case "PARTIAL": case "CONFLICT": case "UNKNOWN": return "BLOCKED";
    default: fail("VALIDATION_ERROR", "unknown reconciliation outcome");
  }
}
export function mayRetry(runState, attempt, maxAttempts, mutationDispatched) {
  if (mutationDispatched || ["UNKNOWN_COMPLETION", "RECOVERY_REQUIRED", "BLOCKED", "SUCCEEDED"].includes(runState)) return false;
  return runState === "FAILED" && Number.isInteger(attempt) && Number.isInteger(maxAttempts) && attempt < maxAttempts;
}
export function planHermesInvocation({prompt, model, provider, maxTurns}) {
  required(prompt, "prompt");
  if (!Number.isInteger(maxTurns) || maxTurns < 1) fail("VALIDATION_ERROR", "bounded turns required");
  // Human-reviewed, brokered profile. Never append --yolo. No shell interpolation.
  const argv = ["chat", "--query-file", "-", "--oneshot", "--quiet", "--format", "stream-json", "--max-turns", String(maxTurns)];
  if (provider !== undefined) { required(provider, "provider"); argv.push("--provider", provider); }
  if (model !== undefined) { required(model, "model"); argv.push("--model", model); }
  return Object.freeze({ executable: "hermes", argv, stdin: prompt, execution: "NOT_EXECUTED", toolsAuthority: "COMPANY_OS_BROKER" });
}
