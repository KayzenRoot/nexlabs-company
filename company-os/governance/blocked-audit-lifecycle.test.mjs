import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {inspectWo022Archive, ArchiveStateError} from "./blocked-audit-lifecycle.mjs";

const source = {
  checkpoint: JSON.parse(fs.readFileSync(".engineering/CHECKPOINT.json", "utf8")),
  registry: fs.readFileSync(".engineering/WORK-ORDER-REGISTRY.md", "utf8"),
  backlog: fs.readFileSync(".engineering/BACKLOG.md", "utf8"),
  wo022Text: fs.readFileSync(".engineering/work-orders/NXL-COMPANY-WO-022.md", "utf8"),
  governanceText: fs.readFileSync("company/CHECKPOINT-PROMOTION-PROTOCOL.md", "utf8")
};
const auditHead = "7a5e42b1e3bfd0736668279780ec13ae4f96e13b";
const auditBase = "d2f7acc85babd62cfacb87a4d061ef39e74a566d";
const disposition = {
  schemaVersion: 1, state: "BLOCKED", blockedReason: "AWAITING_REMEDIATION",
  displayLabel: "BLOCKED_AWAITING_REMEDIATION", auditIssue: 23, auditPr: 67,
  governancePr: 128, auditHeadSha: auditHead, auditBaseSha: auditBase,
  governanceHeadSha: null, governanceMergeSha: null,
  auditStatus: "BLOCKED_FOR_RELEASE", releaseVerdict: "RELEASE_NOT_APPROVED",
  founderReleaseAcceptance: "PENDING", proven: 19, partial: 6, blocked: 1,
  blockingAcceptanceCriterion: "ACC-03",
  reviewModality: "CODERABBIT_PLUS_OWNER_SELF_AUDIT_NOT_INDEPENDENT"
};
const blockedSource = () => structuredClone(source);
const reconciledSource = () => {
  const x = blockedSource();
  x.checkpoint.wo022AdministrativeDisposition.governanceHeadSha = "b".repeat(40);
  x.checkpoint.wo022AdministrativeDisposition.governanceMergeSha = "d".repeat(40);
  return x;
};
const activeFixture = () => {
  const x = blockedSource();
  x.checkpoint = {...x.checkpoint, wo022AdministrativeDisposition: undefined,
    activeWorkOrder: "NXL-COMPANY-WO-022", activeIssue: 23,
    activeBranch: "audit/NXL-COMPANY-WO-022-v01-integrated-acceptance",
    activeContextLock: ".engineering/context-locks/NXL-COMPANY-WO-022.json",
    activeStatus: "ADMITTED_IN_PROGRESS"};
  x.registry = x.registry.replace(
    "| NXL-COMPANY-WO-022 | #23 | BLOCKED | AWAITING_REMEDIATION |",
    "| NXL-COMPANY-WO-022 | #23 | ADMITTED / IN_PROGRESS | — |"
  );
  x.wo022Text = x.wo022Text.replace("**Status:** `BLOCKED`", "**Status:** `ADMITTED / IN_PROGRESS`");
  return x;
};
const plannedFixture = () => {
  const x = blockedSource();
  x.checkpoint = {...x.checkpoint}; delete x.checkpoint.wo022AdministrativeDisposition;
  x.registry = x.registry.replace(
    "| NXL-COMPANY-WO-022 | #23 | BLOCKED | AWAITING_REMEDIATION |",
    "| NXL-COMPANY-WO-022 | #23 | PLANNED / NOT_ADMITTED | — |"
  );
  x.backlog = x.backlog.replace(
    "| NXL-COMPANY-WO-022 | #23 | NECESSARY | Integrated Acceptance | BLOCKED | AWAITING_REMEDIATION |",
    "| NXL-COMPANY-WO-022 | #23 | NECESSARY | Integrated Acceptance | PLANNED / NOT_ADMITTED | — |"
  );
  x.wo022Text = x.wo022Text.replace("**Status:** `BLOCKED`", "**Status:** `PLANNED / NOT_ADMITTED`");
  return x;
};
const validProviderReadback = (mainSha = "c".repeat(40)) => ({
  observedMainSha: mainSha, checkpointSha: mainSha, observedAt: new Date().toISOString(),
  governanceHeadSha: "b".repeat(40),
  issue23: {state: "CLOSED", workOrderState: "BLOCKED", blockedReason: "AWAITING_REMEDIATION",
    releaseVerdict: "RELEASE_NOT_APPROVED", founderReleaseAcceptance: "PENDING"},
  auditPr67: {state: "CLOSED", merged: false, headSha: auditHead, baseSha: auditBase,
    disposition: "BLOCKED_UNMERGED_EVIDENCE"},
  governancePr128: {state: "MERGED", headSha: "b".repeat(40), reviewedHeadSha: "b".repeat(40),
    mergeSha: "d".repeat(40), technicalReview: "COMMENTED",
    ownerAudit: "OWNER_SELF_AUDIT / NOT_INDEPENDENT", checksPassed: true},
  governanceMergeIsAncestorOfMain: true,
  activeAdmissionClaims: [], activeContextLocks: []
});
const reject = (fixture, code) => assert.throws(() => inspectWo022Archive(fixture),
  error => error instanceof ArchiveStateError && error.code === code);

test("current canonical checkpoint is blocked and does not authorize release or admission by itself", () => {
  const result = inspectWo022Archive(source);
  assert.equal(result.mode, "BLOCKED_AWAITING_REMEDIATION");
  assert.equal(result.state, "BLOCKED");
  assert.equal(result.blockedReason, "AWAITING_REMEDIATION");
  assert.equal(result.canRelease, false);
  assert.equal(result.admissionSlotAvailable, false);
  assert.equal(result.canAdmitSuccessor, false);
  assert.equal(result.providerReconciled, false);
});

test("validates the prior PLANNED state and the original admitted audit state", () => {
  assert.equal(inspectWo022Archive(plannedFixture()).mode, "PLANNED");
  const active = inspectWo022Archive(activeFixture());
  assert.equal(active.mode, "ADMITTED_AUDIT");
  assert.equal(active.canRelease, false);
  assert.equal(active.canAdmitSuccessor, false);
});

test("only a committed exact review receipt and fresh GitHub readback release the slot", () => {
  const result = inspectWo022Archive({...reconciledSource(), currentMainSha: "c".repeat(40),
    providerReadback: validProviderReadback()});
  assert.equal(result.admissionSlotAvailable, true);
  assert.equal(result.canAdmitSuccessor, true);
  assert.equal(result.canRelease, false);
  assert.equal(result.ownerAudit, "OWNER_SELF_AUDIT / NOT_INDEPENDENT");
});

test("candidate checkpoint cannot release the slot from caller-supplied matching provider SHAs", () => {
  reject({...blockedSource(), currentMainSha: "c".repeat(40),
    providerReadback: validProviderReadback()}, "GOVERNANCE_REVIEW_RECEIPT_MISSING");
});

test("the current open, admitted issue and unmerged audit PR remain conflicting provider claims", () => {
  const p = validProviderReadback();
  p.issue23 = {state: "OPEN", workOrderState: "ADMITTED / IN_PROGRESS"};
  p.auditPr67.state = "OPEN";
  reject({...reconciledSource(), currentMainSha: "c".repeat(40), providerReadback: p},
    "EXTERNAL_ISSUE_STATE_CONFLICT");
});

test("rejects missing schema manifest and any unknown reason/display state", () => {
  const missing = blockedSource(); delete missing.checkpoint.wo022AdministrativeDisposition;
  reject(missing, "INVALID_BLOCKED_ARCHIVE_MANIFEST");
  for (const delta of [
    {state: "BLOCKED_AWAITING_REMEDIATION"},
    {blockedReason: "UNKNOWN"},
    {displayLabel: "BLOCKED"},
    {auditHeadSha: "f".repeat(40)},
    {reviewModality: "INDEPENDENT_APPROVAL"}
  ]) {
    const x = blockedSource();
    x.checkpoint.wo022AdministrativeDisposition = {...disposition, ...delta};
    reject(x, "INVALID_BLOCKED_ARCHIVE_MANIFEST");
  }
});

test("rejects active claims in the checkpoint, registry, or provider even if another source is idle", () => {
  const x = blockedSource();
  x.registry = x.registry.replace(
    "| NXL-COMPANY-WO-022 | #23 | BLOCKED | AWAITING_REMEDIATION |",
    "| NXL-COMPANY-WO-022 | #23 | ADMITTED / IN_PROGRESS | — |"
  );
  reject(x, "WO_022_REGISTRY_CONFLICT");
  const y = blockedSource(); y.checkpoint.activeWorkOrder = "NXL-COMPANY-WO-024";
  y.checkpoint.activeIssue = 68;
  reject(y, "SINGLE_ACTIVE_CONFLICT");
  const z = {...reconciledSource(), currentMainSha: "c".repeat(40), providerReadback: validProviderReadback()};
  z.providerReadback.activeAdmissionClaims = ["NXL-COMPANY-WO-022"];
  reject(z, "EXTERNAL_ACTIVE_ADMISSION_CLAIM");
});

test("rejects stale, mismatched, incomplete or partial provider write readback", () => {
  const main = "c".repeat(40);
  const stale = validProviderReadback(main); stale.observedAt = "2020-01-01T00:00:00.000Z";
  reject({...reconciledSource(), currentMainSha: main, providerReadback: stale}, "RECOVERY_REQUIRED_STALE_PROVIDER_READBACK");
  const mismatch = validProviderReadback(main); mismatch.checkpointSha = "d".repeat(40);
  reject({...reconciledSource(), currentMainSha: main, providerReadback: mismatch}, "RECOVERY_REQUIRED_STALE_PROVIDER_READBACK");
  const partial = validProviderReadback(main); partial.auditPr67.merged = true;
  reject({...reconciledSource(), currentMainSha: main, providerReadback: partial}, "EXTERNAL_AUDIT_PR_STATE_CONFLICT");
  const fakeReview = validProviderReadback(main);
  fakeReview.governancePr128.ownerAudit = "OWNER_SELF_AUDIT_APPROVED / INDEPENDENT";
  reject({...reconciledSource(), currentMainSha: main, providerReadback: fakeReview}, "GOVERNANCE_MERGE_READBACK_CONFLICT");
  const wrongExpectedReceipt = reconciledSource();
  wrongExpectedReceipt.checkpoint.wo022AdministrativeDisposition.governanceHeadSha = "e".repeat(40);
  reject({...wrongExpectedReceipt, currentMainSha: main, providerReadback: validProviderReadback(main)},
    "GOVERNANCE_MERGE_READBACK_CONFLICT");
  reject({...reconciledSource(), currentMainSha: main, providerReadback: {observedMainSha: main}},
    "RECOVERY_REQUIRED_PROVIDER_EVIDENCE_MISSING");
});

test("rejects false release approval, completion promotion, and a second active Work Order", () => {
  for (const delta of [
    {releaseVerdict: "RELEASE_APPROVED"},
    {founderReleaseAcceptance: "APPROVED"},
    {blocked: 0}
  ]) {
    const x = blockedSource();
    x.checkpoint.wo022AdministrativeDisposition = {...disposition, ...delta};
    reject(x, "INVALID_BLOCKED_ARCHIVE_MANIFEST");
  }
  const x = blockedSource(); x.checkpoint.completedThroughWorkOrder = "NXL-COMPANY-WO-022";
  reject(x, "CHECKPOINT_BASE_INVALID");
  const y = blockedSource();
  y.registry = y.registry.replace("| NXL-COMPANY-WO-021 | #22 | APPROVED / MERGED | — |",
    "| NXL-COMPANY-WO-021 | #22 | ADMITTED / IN_PROGRESS | — |");
  reject(y, "IDLE_WITH_ADMITTED_CLAIM");
});

test("block release authorization regardless of a reconciled admission slot", () => {
  const result = inspectWo022Archive({...reconciledSource(), currentMainSha: "c".repeat(40),
    providerReadback: validProviderReadback()});
  assert.equal(result.canRelease, false);
  assert.equal(result.mode, "BLOCKED_AWAITING_REMEDIATION");
});
