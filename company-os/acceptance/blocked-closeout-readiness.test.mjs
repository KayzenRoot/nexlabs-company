import test from "node:test";
import assert from "node:assert/strict";
import {inspectBlockedCloseout} from "./blocked-closeout-readiness.mjs";
const sha="a".repeat(40);
const fixture={
  auditHead:"b".repeat(40),governanceHead:"c".repeat(40),mainHead:sha,
  issue23:{number:23,admission:"ADMITTED_IN_PROGRESS"},
  pr67:{number:67,state:"open",merged:false,head:"b".repeat(40)},
  issue68:{number:68,admission:"PLANNED_NOT_ADMITTED"},
  verdict:"RELEASE_NOT_APPROVED",founderRelease:"PENDING",
  governanceApproval:"FOUNDER_APPROVED_APPROACH_ONLY",
  codeRabbitVerdict:"COMMENTED",ownerAudit:"OWNER_SELF_AUDIT_NOT_INDEPENDENT",
  schemaAccepted:false,validatorsProven:false,reviewApproval:"COMMENTED",
  records:{checkpoint:"ADMITTED",registry:"ADMITTED",issue:"ADMITTED"}
};
const run=override=>inspectBlockedCloseout({...fixture,...override});
test("read-only live-state snapshot blocks administrative closeout",()=>{
  const out=run();
  assert.equal(out.mode,"READ_ONLY_PRE_CLOSEOUT");
  assert.equal(out.result,"BLOCKED");
  assert.ok(out.blockers.includes("CANONICAL_SCHEMA_NOT_ACCEPTED"));
  assert.ok(out.blockers.includes("BLOCKED_STATE_VALIDATORS_NOT_PROVEN"));
  assert.ok(out.blockers.includes("QUALIFIED_POLICY_REVIEW_NOT_ATTESTED"));
  assert.equal(out.canCloseWorkOrder,false);
  assert.equal(out.canAdmitSuccessor,false);
  assert.equal(out.canRelease,false);
});
test("a purely self-attested green gate set never authorizes writes",()=>{
  const out=run({schemaAccepted:true,validatorsProven:true,
    reviewApproval:"PROVIDER_ATTESTED_APPROVED"});
  assert.equal(out.result,"READY_FOR_PROVIDER_VERIFICATION_ONLY");
  assert.equal(out.canWriteCheckpoint,false);
  assert.equal(out.canCloseWorkOrder,false);
  assert.equal(out.canAdmitSuccessor,false);
  assert.equal(out.canRelease,false);
});
test("partial GitHub/checkpoint state enters RECOVERY_REQUIRED",()=>{
  const out=run({records:{checkpoint:"BLOCKED",registry:"ADMITTED",issue:"ADMITTED"}});
  assert.equal(out.result,"RECOVERY_REQUIRED");
  assert.ok(out.blockers.includes("PARTIAL_WRITE_RECOVERY_REQUIRED"));
  assert.equal(out.canCloseWorkOrder,false);
});
test("fabricated release, wrong PR head and successor admission fail closed",()=>{
  const out=run({verdict:"RELEASE_APPROVED",founderRelease:"APPROVED",
    pr67:{...fixture.pr67,head:"d".repeat(40)},
    issue68:{number:68,admission:"ADMITTED_IN_PROGRESS"}});
  assert.ok(out.blockers.includes("RELEASE_EVIDENCE_INVALID"));
  assert.ok(out.blockers.includes("AUDIT_PR_HEAD_OR_STATE_DRIFT"));
  assert.ok(out.blockers.includes("SUCCESSOR_ADMISSION_CONFLICT"));
  assert.equal(out.canAdmitSuccessor,false);
});
test("unknown canonical state cannot free the single-active slot",()=>{
  const out=run({records:{checkpoint:"BLOCKED_AWAITING_REMEDIATION",
    registry:"BLOCKED",issue:"BLOCKED"}});
  assert.ok(out.blockers.includes("CANONICAL_RECORDS_UNAVAILABLE"));
  assert.equal(out.canAdmitSuccessor,false);
});
test("missing or downgraded Founder governance direction fails closed",()=>{
  for(const governanceApproval of ["",null,"RELEASE_APPROVED","UNVERIFIED"]){
    assert.ok(run({governanceApproval}).blockers.includes("FOUNDER_GOVERNANCE_SCOPE_UNVERIFIED"));
  }
});
