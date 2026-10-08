import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { evaluatePreliminaryAudit, runPreliminaryAudit, isSafeEvidenceFile, AcceptanceAuditError } from "./v01-audit.mjs";

const root=fileURLToPath(new URL("../../",import.meta.url));
const cp=JSON.parse(fs.readFileSync(path.join(root,".engineering/CHECKPOINT.json"),"utf8"));
const matrix=JSON.parse(fs.readFileSync(path.join(root,"company-os/acceptance/v01-obligations.json"),"utf8"));
const evaluate=(overrides={})=>evaluatePreliminaryAudit({
  checkpoint:cp,matrix:{...matrix,...overrides},
  evidenceExists:p=>fs.existsSync(path.join(root,p))
});
test("preliminary audit is conservative: never declares v0.1 released",()=>{
  const result=runPreliminaryAudit(root);
  assert.equal(result.state,"RELEASE_NOT_APPROVED");
  assert.equal(result.founderApproval,"PENDING");
  assert.equal(result.fullDoDSatisfied,false);
  assert.ok(result.unresolved.some(x=>x.id==="OPS-01"));
  assert.ok(result.unresolved.some(x=>x.id==="ACC-03"));
  assert.equal(Object.values(result.counts).reduce((a,b)=>a+b,0),26);
});
test("invalid Founder signoff flag is rejected, not treated as permission",()=>{
  assert.throws(()=>evaluate({founderAcceptance:"APPROVED"}),AcceptanceAuditError);
});
test("incomplete, duplicate and path traversal evidence fail closed",()=>{
  assert.throws(()=>evaluate({items:matrix.items.slice(1)}),AcceptanceAuditError);
  assert.throws(()=>evaluate({items:[matrix.items[0],...matrix.items.slice(0,-1)]}),AcceptanceAuditError);
  const entries=structuredClone(matrix.items);entries[0].evidence=["../../etc/passwd"];
  assert.throws(()=>evaluate({items:entries}),AcceptanceAuditError);
});
test("a mandatory DoD ID cannot be replaced by an arbitrary ID from the same group",()=>{
  const entries=structuredClone(matrix.items);
  const row=entries.find(item=>item.id==="GOV-04");
  assert.ok(row);
  row.id="GOV-99"; // Preserves counts and uniqueness but omits mandatory GOV-04.
  assert.throws(()=>evaluate({items:entries}),e=>
    e instanceof AcceptanceAuditError && e.code==="OBLIGATION_ID_SET_INVALID");
});
test("not an executable production Company OS",()=>{
  assert.equal(evaluate().scope,"LOCAL_OFFLINE_PROTOTYPE_ONLY");
  assert.throws(()=>evaluate({claimScope:"PRODUCTION_READY"}),AcceptanceAuditError);
});

test("read-only evidence verifier rejects directories and external symlinks",()=>{
  const base=fs.mkdtempSync(path.join(os.tmpdir(),"nxl-audit-base-"));
  const outside=fs.mkdtempSync(path.join(os.tmpdir(),"nxl-audit-external-"));
  try {
    fs.mkdirSync(path.join(base,"evidence"));
    fs.writeFileSync(path.join(base,"evidence","real.txt"),"test-only evidence");
    fs.writeFileSync(path.join(outside,"external.txt"),"untrusted evidence");
    assert.equal(isSafeEvidenceFile(base,"evidence/real.txt"),true);
    assert.equal(isSafeEvidenceFile(base,"evidence"),false);
    assert.equal(isSafeEvidenceFile(base,"../external.txt"),false);
    if (process.platform!=="win32") {
      fs.symlinkSync(path.join(outside,"external.txt"),path.join(base,"evidence","linked.txt"));
      assert.equal(isSafeEvidenceFile(base,"evidence/linked.txt"),false);
    }
  } finally {
    fs.rmSync(base,{recursive:true,force:true});
    fs.rmSync(outside,{recursive:true,force:true});
  }
});
