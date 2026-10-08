import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {inspectWo022Archive, ArchiveStateError} from "./blocked-audit-lifecycle.mjs";

const source = {
  checkpoint: JSON.parse(fs.readFileSync(".engineering/CHECKPOINT.json", "utf8")),
  registry: fs.readFileSync(".engineering/WORK-ORDER-REGISTRY.md", "utf8"),
  backlog: fs.readFileSync(".engineering/BACKLOG.md", "utf8"),
  wo022Text: fs.readFileSync(".engineering/work-orders/NXL-COMPANY-WO-022.md", "utf8"),
  wo024Text: fs.existsSync(".engineering/work-orders/NXL-COMPANY-WO-024.md")
    ? fs.readFileSync(".engineering/work-orders/NXL-COMPANY-WO-024.md", "utf8") : undefined,
  wo024ContextLock: fs.existsSync(".engineering/context-locks/NXL-COMPANY-WO-024.json")
    ? JSON.parse(fs.readFileSync(".engineering/context-locks/NXL-COMPANY-WO-024.json", "utf8")) : undefined,
  governanceText: fs.readFileSync("company/CHECKPOINT-PROMOTION-PROTOCOL.md", "utf8")
};
const auditHead = "7a5e42b1e3bfd0736668279780ec13ae4f96e13b";
const auditBase = "d2f7acc85babd62cfacb87a4d061ef39e74a566d";
const governanceHead = "80ecdd9fede11e7356d42b24a2b0da62b4cd994f";
const governanceMerge = "c4b167425b8a32976f7dbb7dde69ed6d61c6f16d";
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
const setWo024FixtureState = (x, state) => {
  const row = `| NXL-COMPANY-WO-024 | #68 | ${state} | — | \`admission/NXL-COMPANY-WO-024\` |`;
  if (/^\| NXL-COMPANY-WO-024 \| #68 \|[^\n]*$/m.test(x.registry)) {
    x.registry = x.registry.replace(/^\| NXL-COMPANY-WO-024 \| #68 \|[^\n]*$/m, row);
  } else if (state === "ADMITTED / IN_PROGRESS") {
    x.registry += `\n${row}\n`;
  }
  x.wo024Text = `# NXL-COMPANY-WO-024\n\n**Status:** \`${state}\`\n`;
};
const idleBlockedSource = () => {
  const x = blockedSource();
  x.checkpoint = {...x.checkpoint, activeWorkOrder: null, activeIssue: null, activeBranch: null,
    activeContextLock: null, activeStatus: "NONE", admissionBaseSha: null};
  setWo024FixtureState(x, "PLANNED / NOT_ADMITTED");
  return x;
};
const reconciledSource = () => {
  const x = idleBlockedSource();
  x.checkpoint.wo022AdministrativeDisposition.governanceHeadSha = governanceHead;
  x.checkpoint.wo022AdministrativeDisposition.governanceMergeSha = governanceMerge;
  return x;
};
const activeFixture = () => {
  const x = idleBlockedSource();
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
  const x = idleBlockedSource();
  x.checkpoint = {...x.checkpoint, activeWorkOrder: null, activeIssue: null, activeBranch: null,
    activeContextLock: null, activeStatus: "NONE", admissionBaseSha: null};
  delete x.checkpoint.wo022AdministrativeDisposition;
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
  governanceHeadSha: governanceHead,
  issue23: {state: "CLOSED", workOrderState: "BLOCKED", blockedReason: "AWAITING_REMEDIATION",
    releaseVerdict: "RELEASE_NOT_APPROVED", founderReleaseAcceptance: "PENDING"},
  auditPr67: {state: "CLOSED", merged: false, headSha: auditHead, baseSha: auditBase,
    disposition: "BLOCKED_UNMERGED_EVIDENCE"},
  governancePr128: {state: "MERGED", headSha: governanceHead, reviewedHeadSha: governanceHead,
    mergeSha: governanceMerge, technicalReview: "COMMENTED",
    ownerAudit: "OWNER_SELF_AUDIT / NOT_INDEPENDENT", checksPassed: true},
  governanceMergeIsAncestorOfMain: true,
  activeAdmissionClaims: [], activeContextLocks: []
});
const activeWo024Fixture = () => {
  const x = reconciledSource();
  const contextLock = {workOrderId: "NXL-COMPANY-WO-024", issue: 68,
    state: "LOCKED_FOR_WO_024", baseSha: "f".repeat(40), branch: "admission/NXL-COMPANY-WO-024"};
  x.wo024ContextLock = contextLock;
  setWo024FixtureState(x, "ADMITTED / IN_PROGRESS");
  x.checkpoint = {...x.checkpoint, activeWorkOrder: "NXL-COMPANY-WO-024", activeIssue: 68,
    activeBranch: contextLock.branch, activeContextLock: ".engineering/context-locks/NXL-COMPANY-WO-024.json",
    activeStatus: "ADMITTED_IN_PROGRESS", admissionBaseSha: contextLock.baseSha};
  const providerReadback = validProviderReadback();
  providerReadback.activeAdmissionClaims = ["NXL-COMPANY-WO-024"];
  providerReadback.activeContextLocks = [".engineering/context-locks/NXL-COMPANY-WO-024.json"];
  providerReadback.issue68 = {state: "OPEN", workOrderState: "ADMITTED / IN_PROGRESS",
    contextLock: ".engineering/context-locks/NXL-COMPANY-WO-024.json", baseSha: contextLock.baseSha};
  return {...x, currentMainSha: "c".repeat(40), providerReadback};
};
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

test("provider readback requires the exact committed COMMENTED technical review", () => {
  for (const technicalReview of [undefined, "UNCOMMENTED"]) {
    const providerReadback = validProviderReadback();
    if (technicalReview === undefined) delete providerReadback.governancePr128.technicalReview;
    else providerReadback.governancePr128.technicalReview = technicalReview;
    reject({...reconciledSource(), currentMainSha: "c".repeat(40), providerReadback},
      "GOVERNANCE_MERGE_READBACK_CONFLICT");
  }
});

test("a provider readback with a different reviewed governance head cannot release the slot", () => {
  const providerReadback = validProviderReadback();
  providerReadback.governancePr128.reviewedHeadSha = "e".repeat(40);
  reject({...reconciledSource(), currentMainSha: "c".repeat(40), providerReadback},
    "GOVERNANCE_MERGE_READBACK_CONFLICT");
});

test("a normally admitted WO-024 occupies the reconciled slot and is not a second admission", () => {
  const result = inspectWo022Archive(activeWo024Fixture());
  assert.equal(result.providerReconciled, true);
  assert.equal(result.successorAdmissionActive, true);
  assert.equal(result.admissionSlotAvailable, false);
  assert.equal(result.canAdmitSuccessor, false);
  assert.equal(result.canRelease, false);
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
  const x = idleBlockedSource();
  x.registry = x.registry.replace(
    "| NXL-COMPANY-WO-022 | #23 | BLOCKED | AWAITING_REMEDIATION |",
    "| NXL-COMPANY-WO-022 | #23 | ADMITTED / IN_PROGRESS | — |"
  );
  reject(x, "WO_022_REGISTRY_CONFLICT");
  const y = idleBlockedSource(); y.checkpoint.activeWorkOrder = "NXL-COMPANY-WO-024";
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
  const y = idleBlockedSource();
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
