// Deterministic, side-effect-free validation for the non-success WO-022 handoff.
// This module validates committed records and caller-supplied GitHub readback; it
// never queries GitHub itself and never authorizes a release or a Work Order.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export class ArchiveStateError extends Error {
  constructor(code) { super(code); this.name = "ArchiveStateError"; this.code = code; }
}
const fail = code => { throw new ArchiveStateError(code); };
const WO = "NXL-COMPANY-WO-022";
const AUDIT_HEAD = "7a5e42b1e3bfd0736668279780ec13ae4f96e13b";
const AUDIT_BASE = "d2f7acc85babd62cfacb87a4d061ef39e74a566d";
const displayLabel = "BLOCKED_AWAITING_REMEDIATION";
const activeClaim = /^ADMITTED(?:\s|\/|$)/;
const sha40 = value => typeof value === "string" && /^[a-f0-9]{40}$/.test(value);

function readDispositionSchema() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  return JSON.parse(fs.readFileSync(path.join(here, "blocked-audit-lifecycle.schema.json"), "utf8"));
}

function validateDisposition(d) {
  const schema = readDispositionSchema();
  if (!d || d.schemaVersion !== schema.properties.schemaVersion.const ||
      d.state !== "BLOCKED" || d.blockedReason !== "AWAITING_REMEDIATION" ||
      d.displayLabel !== displayLabel || d.auditIssue !== 23 || d.auditPr !== 67 ||
      d.governancePr !== 128 || d.auditHeadSha !== AUDIT_HEAD || d.auditBaseSha !== AUDIT_BASE ||
      d.auditStatus !== "BLOCKED_FOR_RELEASE" || d.releaseVerdict !== "RELEASE_NOT_APPROVED" ||
      d.founderReleaseAcceptance !== "PENDING" || d.proven !== 19 || d.partial !== 6 ||
      d.blocked !== 1 || d.blockingAcceptanceCriterion !== "ACC-03" ||
      d.reviewModality !== "CODERABBIT_PLUS_OWNER_SELF_AUDIT_NOT_INDEPENDENT")
    fail("INVALID_BLOCKED_ARCHIVE_MANIFEST");
  const allowed = Object.keys(schema.properties);
  if (Object.keys(d).some(key => !allowed.includes(key)) ||
      Object.keys(schema.properties).some(key => schema.required.includes(key) && !(key in d)))
    fail("INVALID_BLOCKED_ARCHIVE_MANIFEST");
}

function parseWorkOrderStatus(text, expectedId) {
  if (typeof text !== "string") fail("WORK_ORDER_MISSING");
  const id = text.match(/^#\s+NXL-COMPANY-WO-\d{3}\b/m)?.[0];
  if (id !== `# ${expectedId}`) fail("WORK_ORDER_ID_MISMATCH");
  const state = text.match(/^(?:-\s*)?\*\*Status:\*\* `([^`]+)`/m)?.[1];
  if (!state) fail("WO_022_STATUS_MISSING");
  return state;
}

function registryRows(text) {
  if (typeof text !== "string" || !text.includes("| Blocked reason |")) fail("REGISTRY_SCHEMA_MISSING");
  const rows = new Map();
  const rowPattern = /^\|\s*(NXL-COMPANY-WO-\d{3})\s*\|\s*#(\d+)\s*\|\s*([^|]+)\|\s*([^|]+)\|/gm;
  for (const [, id, issue, state, reason] of text.matchAll(rowPattern)) {
    if (rows.has(id)) fail("DUPLICATE_REGISTRY_ENTRY");
    rows.set(id, { issue: Number(issue), state: state.trim(), reason: reason.trim() });
  }
  if (!rows.has(WO)) fail("WO_022_REGISTRY_MISSING");
  return rows;
}

function validateProviderReadback(readback, currentMainSha, disposition, successorActive) {
  if (!readback) return false;
  const issue = readback.issue23;
  const auditPr = readback.auditPr67;
  const governancePr = readback.governancePr128;
  if (!issue || !auditPr || !governancePr) fail("RECOVERY_REQUIRED_PROVIDER_EVIDENCE_MISSING");
  if (!sha40(currentMainSha) || readback.observedMainSha !== currentMainSha ||
      readback.checkpointSha !== currentMainSha || !readback.observedAt ||
      !Number.isFinite(Date.parse(readback.observedAt))) fail("RECOVERY_REQUIRED_STALE_PROVIDER_READBACK");
  if (Date.now() - Date.parse(readback.observedAt) > 15 * 60 * 1000 ||
      Date.parse(readback.observedAt) - Date.now() > 60 * 1000)
    fail("RECOVERY_REQUIRED_STALE_PROVIDER_READBACK");
  if (issue.state !== "CLOSED" || issue.workOrderState !== "BLOCKED" ||
      issue.blockedReason !== "AWAITING_REMEDIATION" ||
      issue.releaseVerdict !== "RELEASE_NOT_APPROVED" ||
      issue.founderReleaseAcceptance !== "PENDING") fail("EXTERNAL_ISSUE_STATE_CONFLICT");
  if (auditPr.state !== "CLOSED" || auditPr.merged !== false ||
      auditPr.headSha !== disposition.auditHeadSha || auditPr.baseSha !== disposition.auditBaseSha ||
      auditPr.disposition !== "BLOCKED_UNMERGED_EVIDENCE") fail("EXTERNAL_AUDIT_PR_STATE_CONFLICT");
  if (governancePr.state !== "MERGED" || governancePr.headSha !== readback.governanceHeadSha ||
      !sha40(governancePr.mergeSha) || governancePr.reviewedHeadSha !== governancePr.headSha ||
      governancePr.technicalReview !== "COMMENTED" ||
      governancePr.ownerAudit !== "OWNER_SELF_AUDIT / NOT_INDEPENDENT" || governancePr.checksPassed !== true ||
      readback.governanceMergeIsAncestorOfMain !== true)
    fail("GOVERNANCE_MERGE_READBACK_CONFLICT");
  const expectedActiveClaims = successorActive ? ["NXL-COMPANY-WO-024"] : [];
  const expectedLocks = successorActive ? [".engineering/context-locks/NXL-COMPANY-WO-024.json"] : [];
  if (!Array.isArray(readback.activeAdmissionClaims) ||
      JSON.stringify([...readback.activeAdmissionClaims].sort()) !== JSON.stringify(expectedActiveClaims) ||
      !Array.isArray(readback.activeContextLocks) ||
      JSON.stringify([...readback.activeContextLocks].sort()) !== JSON.stringify(expectedLocks))
    fail("EXTERNAL_ACTIVE_ADMISSION_CLAIM");
  if (successorActive && (!readback.issue68 || readback.issue68.state !== "OPEN" ||
      readback.issue68.workOrderState !== "ADMITTED / IN_PROGRESS" ||
      readback.issue68.contextLock !== ".engineering/context-locks/NXL-COMPANY-WO-024.json" ||
      !sha40(readback.issue68.baseSha))) fail("EXTERNAL_SUCCESSOR_ADMISSION_CONFLICT");
  return true;
}

export function inspectWo022Archive({ checkpoint, registry, backlog, wo022Text, wo024Text,
  wo024ContextLock, governanceText, currentMainSha, providerReadback } = {}) {
  if (!checkpoint || checkpoint.gefVersion !== "1.1.2" ||
      checkpoint.completedThroughWorkOrder !== "NXL-COMPANY-WO-023") fail("CHECKPOINT_BASE_INVALID");
  const status = parseWorkOrderStatus(wo022Text, WO);
  const rows = registryRows(registry);
  const row = rows.get(WO);
  if (row.issue !== 23 || row.state !== status) fail("WO_022_REGISTRY_CONFLICT");
  const activeRows = [...rows].filter(([, value]) => activeClaim.test(value.state)).map(([id]) => id);
  const active = checkpoint.activeWorkOrder;
  if (active === null && activeRows.length !== 0) fail("IDLE_WITH_ADMITTED_CLAIM");
  if (active !== null && (activeRows.length !== 1 || activeRows[0] !== active)) fail("SINGLE_ACTIVE_CONFLICT");

  if (status === "ADMITTED / IN_PROGRESS") {
    if (active !== WO || checkpoint.activeIssue !== 23 || checkpoint.activeStatus !== "ADMITTED_IN_PROGRESS")
      fail("WO_022_ACTIVE_STATE_INVALID");
    return Object.freeze({mode: "ADMITTED_AUDIT", canRelease: false,
      admissionSlotAvailable: false, canAdmitSuccessor: false, providerReconciled: false});
  }

  if (status === "PLANNED / NOT_ADMITTED") {
    if (row.reason !== "—" || checkpoint.wo022AdministrativeDisposition !== undefined)
      fail("PLANNED_WITH_ARCHIVE_CLAIM");
    if (backlog && !backlog.includes("NXL-COMPANY-WO-022") ||
        (backlog && !backlog.includes("PLANNED / NOT_ADMITTED"))) fail("BACKLOG_STATE_CONFLICT");
    return Object.freeze({ mode: "PLANNED", admissionSlotAvailable: false,
      canRelease: false, canAdmitSuccessor: false, providerReconciled: false });
  }

  if (status !== "BLOCKED" || row.reason !== "AWAITING_REMEDIATION") fail("UNKNOWN_WO_022_TERMINAL_STATE");
  const disposition = checkpoint.wo022AdministrativeDisposition;
  validateDisposition(disposition);
  const successorActive = active === "NXL-COMPANY-WO-024";
  if (active !== null && !successorActive) fail("BLOCKED_STATE_HAS_ACTIVE_CLAIM");
  if (!successorActive) {
    if (checkpoint.activeIssue !== null || checkpoint.activeBranch !== null ||
        checkpoint.activeContextLock !== null || checkpoint.activeStatus !== "NONE")
      fail("BLOCKED_STATE_HAS_ACTIVE_CLAIM");
  } else {
    const successorRow = rows.get("NXL-COMPANY-WO-024");
    if (checkpoint.activeIssue !== 68 || checkpoint.activeStatus !== "ADMITTED_IN_PROGRESS" ||
        !successorRow || successorRow.issue !== 68 || successorRow.state !== "ADMITTED / IN_PROGRESS" ||
        parseWorkOrderStatus(wo024Text, "NXL-COMPANY-WO-024") !== "ADMITTED / IN_PROGRESS" ||
        checkpoint.activeContextLock !== ".engineering/context-locks/NXL-COMPANY-WO-024.json" ||
        !wo024ContextLock || wo024ContextLock.workOrderId !== "NXL-COMPANY-WO-024" ||
        wo024ContextLock.issue !== 68 || wo024ContextLock.state !== "LOCKED_FOR_WO_024" ||
        !sha40(wo024ContextLock.baseSha) || checkpoint.admissionBaseSha !== wo024ContextLock.baseSha ||
        checkpoint.activeBranch !== wo024ContextLock.branch)
      fail("WO_024_CONTEXT_LOCK_MISMATCH");
  }
  if (parseWorkOrderStatus(wo022Text, WO) !== "BLOCKED" ||
      !/^(?:-\s*)?\*\*Blocked reason:\*\* `AWAITING_REMEDIATION`/m.test(wo022Text) ||
      !wo022Text.includes("BLOCKED_FOR_RELEASE") || !wo022Text.includes("RELEASE_NOT_APPROVED"))
    fail("INCOMPLETE_AUDIT_RECORD");
  if (!backlog || !backlog.includes("| NXL-COMPANY-WO-022 | #23 | NECESSARY | Integrated Acceptance | BLOCKED | AWAITING_REMEDIATION |"))
    fail("BACKLOG_STATE_CONFLICT");
  if (typeof governanceText !== "string" ||
      !governanceText.includes("Non-success administrative retirement of a blocked acceptance audit") ||
      !governanceText.includes("OWNER_SELF_AUDIT / NOT_INDEPENDENT") ||
      !governanceText.includes("CodeRabbit `COMMENTED` is technical input") ||
      !governanceText.includes("RELEASE_NOT_APPROVED")) fail("GOVERNANCE_POLICY_MISSING");
  const providerReconciled = validateProviderReadback(providerReadback, currentMainSha, disposition, successorActive);
  const admissionSlotAvailable = providerReconciled && !successorActive;
  return Object.freeze({ mode: displayLabel, state: "BLOCKED", blockedReason: "AWAITING_REMEDIATION",
    admissionSlotAvailable, canRelease: false,
    canAdmitSuccessor: admissionSlotAvailable, successorAdmissionActive: successorActive, providerReconciled,
    ownerAudit: "OWNER_SELF_AUDIT / NOT_INDEPENDENT" });
}
