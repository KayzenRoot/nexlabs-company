import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { assessBlockedAuditHandoff, BlockedAuditHandoffError } from "./blocked-audit-handoff.mjs";

const root=fileURLToPath(new URL("../../",import.meta.url));
const checkpoint=JSON.parse(fs.readFileSync(path.join(root,".engineering/CHECKPOINT.json"),"utf8"));
const baseline=JSON.parse(execFileSync("git",[
  "show", checkpoint.admissionBaseSha+":.engineering/CHECKPOINT.json"
],{cwd:root,encoding:"utf8"}));
// Offline metadata fixtures reproduce an observed GitHub snapshot. They are NOT
// authenticated live reviewer/issue records or approval tokens.
const fixture=Object.freeze({
  mainCheckpoint:baseline,
  auditCheckpoint:checkpoint,
  auditIssue:{number:23,state:"open",admission:"ADMITTED_IN_PROGRESS"},
  auditPr:{number:67,state:"open",draft:true,merged:false,
    author:"KayzenRoot",
    baseSha:"d2f7acc85babd62cfacb87a4d061ef39e74a566d",
    headSha:"0beec70b2ff03ea17a4df29c08c0d0b297ac9da6",
    headBranch:"audit/NXL-COMPANY-WO-022-v01-integrated-acceptance"},
  // Static governance PR fixture: provenance must be checked against real GitHub
  // in a future authorized transition. This unit test never grants authority.
  governancePr:{number:128,state:"open",draft:true,merged:false,
    author:"KayzenRoot",
    baseSha:"d2f7acc85babd62cfacb87a4d061ef39e74a566d",
    headSha:"172f1e8d9f2ffb2aed7f3283b83ee7dfbb1a8a4f",
    headBranch:"governance/NXL-GOV-blocked-audit-handoff-proposal"},
  successorIssue:{number:68,id:"NXL-COMPANY-WO-024",state:"open",
    admission:"PLANNED_NOT_ADMITTED"},
  decision:{issue:127,state:"FOUNDER_PROPOSAL_APPROVED",
    proposalSha:"deba799b46a6d218dc2147d7b70aee7afd3c2adc",
    commentId:6050879986,scope:"GOVERNANCE_HANDOFF_ONLY",
    founderReleaseAcceptance:"PENDING"},
  assessment:{verdict:"RELEASE_NOT_APPROVED",founderAcceptance:"PENDING",
    proven:19,partial:6,blocked:1}
});
const classify=(patch={})=>assessBlockedAuditHandoff({...fixture,...patch});
const refuses=(patch,code)=>assert.throws(()=>classify(patch),e=>
  e instanceof BlockedAuditHandoffError&&e.code===code);

test("founder approval produces a review packet, NEVER execution permission",()=>{
  const result=classify();
  assert.equal(result.status,"REVIEW_PACKAGE_ONLY");
  assert.equal(result.founderGovernanceDirection,"APPROVED_IN_CONVERSATION");
  assert.equal(result.reviewState,"INDEPENDENT_REVIEW_MISSING");
  assert.equal(result.authorityDivergence,"BASE_MAIN_IDLE_AUDIT_BRANCH_ACTIVE");
  assert.equal(result.proposedGovernanceReviewHead,fixture.governancePr.headSha);
  assert.equal(result.auditVerdict,"RELEASE_NOT_APPROVED");
  assert.equal(result.releaseFounderAcceptance,"PENDING");
  assert.equal(result.canAmendCanonicalPolicy,false);
  assert.equal(result.canTransferAdmission,false);
  assert.equal(result.canExecuteSuccessor,false);
  assert.equal(result.canRelease,false);
});

test("predecessor divergence and stale authority fail closed",()=>{
  refuses({mainCheckpoint:{...baseline,activeWorkOrder:"NXL-COMPANY-WO-024"}},"MAIN_BASE_CONFLICT");
  refuses({auditCheckpoint:{...checkpoint,activeStatus:"APPROVED"}},"AUDIT_CHECKPOINT_CONFLICT");
  refuses({auditCheckpoint:{...checkpoint,admissionBaseSha:"f".repeat(40)}},"AUDIT_CHECKPOINT_CONFLICT");
  refuses({auditIssue:{...fixture.auditIssue,state:"closed"}},"AUDIT_ISSUE_CONFLICT");
  refuses({auditPr:{...fixture.auditPr,draft:false}},"AUDIT_PR_CONFLICT");
  refuses({auditPr:{...fixture.auditPr,headSha:"unknown"}},"AUDIT_PR_CONFLICT");
  refuses({successorIssue:{...fixture.successorIssue,admission:"ADMITTED"}},"SUCCESSOR_NOT_PLANNED");
  refuses({governancePr:{...fixture.governancePr,number:129}},"GOVERNANCE_PR_CONFLICT");
  refuses({governancePr:{...fixture.governancePr,headSha:"stale"}},"GOVERNANCE_PR_CONFLICT");
  refuses({governancePr:{...fixture.governancePr,draft:false}},"GOVERNANCE_PR_CONFLICT");
});

test("governance direction cannot be rewritten into release acceptance",()=>{
  refuses({decision:{...fixture.decision,scope:"RELEASE_ACCEPTANCE"}},"FOUNDER_DECISION_SCOPE_INVALID");
  refuses({decision:{...fixture.decision,founderReleaseAcceptance:"APPROVED"}},"FOUNDER_DECISION_SCOPE_INVALID");
  refuses({decision:{...fixture.decision,commentId:0}},"FOUNDER_DECISION_SCOPE_INVALID");
  refuses({assessment:{...fixture.assessment,verdict:"RELEASE_APPROVED"}},"RELEASE_EVIDENCE_CONFLICT");
  refuses({assessment:{...fixture.assessment,proven:26,partial:0,blocked:0}},"RELEASE_EVIDENCE_CONFLICT");
});

test("reviewer must be separate and exact-head, and metadata still cannot grant authority",()=>{
  const good={source:"GITHUB_NATIVE_READBACK",reviewer:"independent-example",
    verdict:"APPROVED",reviewId:123,reviewedHead:fixture.governancePr.headSha};
  refuses({independentReview:{...good,reviewer:"KayzenRoot"}},"REVIEW_EVIDENCE_INVALID");
  refuses({independentReview:{...good,reviewedHead:"e".repeat(40)}},"REVIEW_EVIDENCE_INVALID");
  // A review of the *audit* PR cannot certify the *governance policy* PR.
  refuses({independentReview:{...good,reviewedHead:fixture.auditPr.headSha}},"REVIEW_EVIDENCE_INVALID");
  refuses({independentReview:{...good,source:"SELF_ATTESTED"}},"REVIEW_EVIDENCE_INVALID");
  refuses({independentReview:{...good,verdict:"COMMENTED"}},"REVIEW_EVIDENCE_INVALID");
  const result=classify({independentReview:good});
  assert.equal(result.reviewState,"REVIEW_METADATA_NEEDS_INDEPENDENT_VERIFICATION");
  assert.equal(result.canTransferAdmission,false);
  assert.equal(result.canRelease,false);
});

test("open issue without admitted claim is not this active-audit snapshot; no slot is released",()=>{
  // A GitHub issue may remain open while administratively blocked; the
  // openness alone is not admission. A transition needs a NEW, separately
  // accepted provider-backed validator rather than accepting this stale
  // snapshot or assuming main is idle.
  refuses({auditIssue:{...fixture.auditIssue,admission:"BLOCKED"}}, "AUDIT_ISSUE_CONFLICT");
  refuses({auditIssue:{...fixture.auditIssue,admission:"NOT_ADMITTED"}}, "AUDIT_ISSUE_CONFLICT");
  refuses({auditPr:{...fixture.auditPr,state:"closed",merged:false}}, "AUDIT_PR_CONFLICT");
  refuses({auditPr:{...fixture.auditPr,draft:false,merged:false}}, "AUDIT_PR_CONFLICT");
  assert.equal(classify().canTransferAdmission,false);
});

test("unreviewed, supposedly qualified or merely automated review cannot transfer authority",()=>{
  const approvedMetadata={
    source:"GITHUB_NATIVE_READBACK",reviewer:"independent-provider",
    verdict:"APPROVED",reviewId:700,
    reviewedHead:fixture.governancePr.headSha
  };
  // A caller can assert plausible identity/IDs but cannot confer power.
  const apparentApproval=classify({independentReview:approvedMetadata});
  assert.equal(apparentApproval.reviewState,"REVIEW_METADATA_NEEDS_INDEPENDENT_VERIFICATION");
  assert.equal(apparentApproval.canTransferAdmission,false);
  assert.equal(apparentApproval.canAmendCanonicalPolicy,false);
  assert.equal(apparentApproval.canRelease,false);
  refuses({independentReview:{...approvedMetadata,verdict:"COMMENTED"}},"REVIEW_EVIDENCE_INVALID");
  refuses({independentReview:{...approvedMetadata,reviewer:"KayzenRoot"}},"REVIEW_EVIDENCE_INVALID");
});
