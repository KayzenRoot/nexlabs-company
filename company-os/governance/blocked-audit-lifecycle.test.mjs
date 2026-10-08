import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {inspectWo022Archive, ArchiveStateError} from "./blocked-audit-lifecycle.mjs";
const source={
  checkpoint:JSON.parse(fs.readFileSync(".engineering/CHECKPOINT.json","utf8")),
  registry:fs.readFileSync(".engineering/WORK-ORDER-REGISTRY.md","utf8"),
  wo022Text:fs.readFileSync(".engineering/work-orders/NXL-COMPANY-WO-022.md","utf8"),
  governanceText:fs.readFileSync("company/CHECKPOINT-PROMOTION-PROTOCOL.md","utf8")
};
const blocked="BLOCKED / AWAITING_REMEDIATION";
const manifest={state:"BLOCKED",blockedReason:"AWAITING_REMEDIATION",
  auditIssue:23,auditPr:67,governancePr:128,auditHeadSha:"a".repeat(40),
  releaseVerdict:"RELEASE_NOT_APPROVED",founderReleaseAcceptance:"PENDING"};
const toBlocked=()=>{
 const registry=source.registry.replace("| NXL-COMPANY-WO-022 | #23 | NOT_ADMITTED |",
   "| NXL-COMPANY-WO-022 | #23 | "+blocked+" |");
 const wo022Text=source.wo022Text.replace("**Status:** `PLANNED / NOT_ADMITTED`",
   "**Status:** `"+blocked+"`") + "\nRELEASE_NOT_APPROVED\n";
 return {checkpoint:{...source.checkpoint,activeWorkOrder:null,activeStatus:"NONE",
   wo022AdministrativeDisposition:manifest},registry,wo022Text,governanceText:source.governanceText};
};
const reject=(fixture,code)=>assert.throws(()=>inspectWo022Archive(fixture),
 e=>e instanceof ArchiveStateError && e.code===code);
test("baseline source pack remains a valid PLANNED state, no release",()=>{
 const v=inspectWo022Archive(source);
 assert.equal(v.mode,"PLANNED");
 assert.equal(v.canRelease,false);
 assert.equal(v.canAdmitSuccessor,false);
});
test("versioned blocked archive is a NON-SUCCESS state, not provider approval",()=>{
 const v=inspectWo022Archive(toBlocked());
 assert.equal(v.mode,"BLOCKED_AWAITING_REMEDIATION");
 assert.equal(v.canRelease,false);
 assert.equal(v.canAdmitSuccessor,false);
 assert.equal(v.externalProviderReconciliationRequired,true);
});
test("reject missing canonical archive manifest",()=>{
 const x=toBlocked();delete x.checkpoint.wo022AdministrativeDisposition;
 reject(x,"INVALID_BLOCKED_ARCHIVE_MANIFEST");
});
test("reject unsupported display label accidentally persisted as status",()=>{
 const x=toBlocked();x.wo022Text=x.wo022Text.replace(blocked,"BLOCKED_AWAITING_REMEDIATION");
 reject(x,"WO_022_REGISTRY_CONFLICT");
});
test("reject a predecessor admitted in registry despite idle checkpoint",()=>{
 const x=toBlocked();x.registry=x.registry.replace("| NXL-COMPANY-WO-022 | #23 | "+blocked+" |",
 "| NXL-COMPANY-WO-022 | #23 | ADMITTED / IN_PROGRESS |");
 reject(x,"WO_022_REGISTRY_CONFLICT");
});
test("reject second simultaneously active work order",()=>{
 const x=toBlocked();
 x.registry=x.registry.replace("| NXL-COMPANY-WO-021 | #22 | APPROVED / MERGED |",
 "| NXL-COMPANY-WO-021 | #22 | ADMITTED / IN_PROGRESS |");
 reject(x,"IDLE_WITH_ADMITTED_CLAIM");
});
test("reject false release acceptance and fake success",()=>{
 for(const delta of [
  {releaseVerdict:"RELEASE_APPROVED"},
  {founderReleaseAcceptance:"APPROVED"},
  {auditHeadSha:"unknown"},
  {state:"APPROVED"}
 ]){const x=toBlocked();x.checkpoint.wo022AdministrativeDisposition={...manifest,...delta};
   reject(x,"INVALID_BLOCKED_ARCHIVE_MANIFEST");}
});
test("reject blocked status with no matching registry",()=>{
 const x=toBlocked();x.registry=source.registry;
 reject(x,"WO_022_REGISTRY_CONFLICT");
});
test("reject an active WO with no corresponding admitted registry claim",()=>{
 const x=toBlocked();x.checkpoint.activeWorkOrder="NXL-COMPANY-WO-024";
 x.checkpoint.activeIssue=68;x.checkpoint.activeStatus="ADMITTED_IN_PROGRESS";
 reject(x,"SINGLE_ACTIVE_CONFLICT");
});
test("reject checkpoint falsely marking successful WO-022 completion",()=>{
 const x=toBlocked();x.checkpoint.completedThroughWorkOrder="NXL-COMPANY-WO-022";
 reject(x,"CHECKPOINT_BASE_INVALID");
});
