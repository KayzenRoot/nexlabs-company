import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runPreliminaryAudit } from "./v01-audit.mjs";
import { planBlockedAcceptance, RemediationPreflightError, RELEASE_GAPS } from "./remediation-preflight.mjs";

const root=fileURLToPath(new URL("../../", import.meta.url));
const checkpoint=JSON.parse(fs.readFileSync(path.join(root, ".engineering/CHECKPOINT.json"), "utf8"));
const baselineCheckpoint=JSON.parse(execFileSync("git",[
  "show", checkpoint.admissionBaseSha+":.engineering/CHECKPOINT.json"
],{cwd:root,encoding:"utf8"}));
const audit=runPreliminaryAudit(root);
// Candidate metadata are PLANNING FIXTURES; this pure unit test is NOT a
// GitHub API check, an admission, or proof that the issues remain unchanged.
const issueFixtures=Array.from({length:8},(_,i)=>({
  id:`NXL-COMPANY-WO-${String(i+24).padStart(3,"0")}`,
  issueNumber:i+68, state:"PLANNED / NOT_ADMITTED"
}));
const run=(o={})=>planBlockedAcceptance({
  audit:o.audit??audit,
  checkpoint:o.checkpoint??checkpoint,
  baselineCheckpoint:o.baselineCheckpoint??baselineCheckpoint,
  candidateIssues:o.candidateIssues??issueFixtures
});
const rejects=(overrides,code)=>assert.throws(()=>run(overrides),e=>
  e instanceof RemediationPreflightError && e.code===code);

test("remediation preflight is read-only and cannot admit a successor",()=>{
  const before=fs.readFileSync(path.join(root,".engineering/CHECKPOINT.json"),"utf8");
  const r=run();
  assert.equal(r.auditVerdict,"RELEASE_NOT_APPROVED");
  assert.equal(r.activeWorkOrder,"NXL-COMPANY-WO-022");
  assert.equal(r.baselineActiveWorkOrder,null);
  assert.equal(r.authorityDivergence,"BASE_MAIN_IDLE_AUDIT_BRANCH_ACTIVE");
  assert.equal(r.canStartImplementation,false);
  assert.equal(r.successorAdmission,"BLOCKED");
  assert.equal(r.nextAction,"REVIEW_GEF_BLOCKED_AUDIT_TRANSITION");
  assert.equal(r.requestedFirstSuccessor,"NXL-COMPANY-WO-024");
  assert.equal(r.founderReleaseAcceptance,"PENDING");
  assert.deepEqual(Object.keys(r.gaps).sort(),Object.keys(RELEASE_GAPS).sort());
  assert.deepEqual(r.gaps["OPS-01"].candidateWOs,[
    "NXL-COMPANY-WO-024","NXL-COMPANY-WO-025",
    "NXL-COMPANY-WO-028","NXL-COMPANY-WO-030"
  ]);
  assert.equal(fs.readFileSync(path.join(root,".engineering/CHECKPOINT.json"),"utf8"),before);
});

test("a fabricated released or accepted audit is rejected",()=>{
  rejects({audit:{...audit,state:"RELEASE_APPROVED"}},"RELEASE_VERDICT_UNSAFE");
  rejects({audit:{...audit,founderApproval:"APPROVED"}},"RELEASE_VERDICT_UNSAFE");
  rejects({audit:{...audit,fullDoDSatisfied:true}},"RELEASE_VERDICT_UNSAFE");
});

test("handoff refuses altered audit identity, scope, completeness or counts",()=>{
  rejects({audit:{...audit,reviewState:"APPROVED"}},"RELEASE_VERDICT_UNSAFE");
  rejects({audit:{...audit,scope:"LIVE_CONNECTED"}},"RELEASE_VERDICT_UNSAFE");
  rejects({audit:{...audit,activeWorkOrder:"NXL-COMPANY-WO-024"}},"RELEASE_VERDICT_UNSAFE");
  rejects({audit:{...audit,counts:{...audit.counts,PROVEN:20}}},"RELEASE_VERDICT_UNSAFE");
  rejects({audit:{...audit,counts:null}},"RELEASE_VERDICT_UNSAFE");
});

test("handoff refuses stale base, unrelated branch, wrong lock or predecessor",()=>{
  rejects({checkpoint:{...checkpoint,admissionBaseSha:"0".repeat(40)}},"ACTIVE_WO_CONFLICT");
  rejects({checkpoint:{...checkpoint,activeBranch:"feat/unadmitted-wo-024"}},"ACTIVE_WO_CONFLICT");
  rejects({checkpoint:{...checkpoint,activeContextLock:".engineering/context-locks/NXL-COMPANY-WO-024.json"}},"ACTIVE_WO_CONFLICT");
  rejects({checkpoint:{...checkpoint,completedThroughWorkOrder:"NXL-COMPANY-WO-022"}},"ACTIVE_WO_CONFLICT");
});

test("handoff refuses quiet reclassification of unresolved non-Founder gaps",()=>{
  const altered=audit.unresolved.map(x=>x.id==="OPS-01"?{...x,status:"NOT_PROVEN"}:x);
  rejects({audit:{...audit,unresolved:altered}},"GAP_STATUS_DRIFT");
  const alteredBlocked=audit.unresolved.map(x=>x.id==="GOV-04"?{...x,status:"BLOCKED"}:x);
  rejects({audit:{...audit,unresolved:alteredBlocked}},"GAP_STATUS_DRIFT");
});

test("admission baseline is loaded from real Git and remains idle, never authorizing successor",()=>{
  assert.equal(baselineCheckpoint.activeWorkOrder,null);
  assert.equal(baselineCheckpoint.activeStatus,"NONE");
  assert.equal(checkpoint.activeWorkOrder,"NXL-COMPANY-WO-022");
  assert.equal(checkpoint.activeStatus,"ADMITTED_IN_PROGRESS");
  rejects({baselineCheckpoint:{...baselineCheckpoint,activeWorkOrder:"NXL-COMPANY-WO-024"}},"BASELINE_HANDOFF_CONFLICT");
  rejects({baselineCheckpoint:{...baselineCheckpoint,activeStatus:"ADMITTED_IN_PROGRESS"}},"BASELINE_HANDOFF_CONFLICT");
  rejects({baselineCheckpoint:{...baselineCheckpoint,completedThroughWorkOrder:"NXL-COMPANY-WO-022"}},"BASELINE_HANDOFF_CONFLICT");
  assert.throws(()=>planBlockedAcceptance({
    audit,checkpoint,candidateIssues:issueFixtures
  }),e=>e instanceof RemediationPreflightError && e.code==="BASELINE_HANDOFF_CONFLICT");
});

test("no second active Work Order is accepted",()=>{
  rejects({checkpoint:{...checkpoint,activeWorkOrder:"NXL-COMPANY-WO-024"}},"ACTIVE_WO_CONFLICT");
  rejects({checkpoint:{...checkpoint,activeStatus:"COMPLETED"}},"ACTIVE_WO_CONFLICT");
  rejects({checkpoint:{...checkpoint,activeIssue:68}},"ACTIVE_WO_CONFLICT");
});

test("unregistered, missing, duplicated or admitted candidate issues fail closed",()=>{
  rejects({candidateIssues:issueFixtures.slice(1)},"ROADMAP_INCOMPLETE");
  rejects({candidateIssues:[...issueFixtures.slice(0,-1),issueFixtures[0]]},"CANDIDATE_NOT_SAFE");
  rejects({candidateIssues:issueFixtures.map((x,i)=>i===0?{...x,state:"ADMITTED"}:x)},"CANDIDATE_NOT_SAFE");
  rejects({candidateIssues:issueFixtures.map((x,i)=>i===0?{...x,issueNumber:9999}:x)},"CANDIDATE_NOT_SAFE");
  rejects({candidateIssues:issueFixtures.map((x,i)=>i===0?{...x,id:"NXL-COMPANY-WO-999"}:x)},"CANDIDATE_NOT_SAFE");
});

test("missing, duplicated or invented release obligations fail closed",()=>{
  rejects({audit:{...audit,unresolved:audit.unresolved.slice(1)}},"GAP_SET_CHANGED");
  rejects({audit:{...audit,unresolved:[...audit.unresolved,audit.unresolved[0]]}},"DUPLICATE_GAP");
  rejects({audit:{...audit,unresolved:[...audit.unresolved,{id:"UNKNOWN-01",status:"PARTIAL"}]}},"GAP_SET_CHANGED");
  rejects({audit:{...audit,unresolved:audit.unresolved.map(x=>x.id==="ACC-03"?{...x,status:"PROVEN"}:x)}},"FOUNDER_SIGNOFF_NOT_REQUESTED");
});

test("the exact Founder-signoff blocker cannot be omitted",()=>{
  const rows=audit.unresolved.filter(x=>x.id!=="ACC-03");
  // The remaining subset maps to known gaps, but is still unsafe.
  rejects({audit:{...audit,unresolved:rows}},"FOUNDER_SIGNOFF_NOT_REQUESTED");
});
