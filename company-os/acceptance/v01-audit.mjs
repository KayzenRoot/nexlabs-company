// WO-022: deterministic, read-only *preliminary* release readiness audit.
// This only validates cited artifacts and explicit assessment states, not their substantive truth.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export class AcceptanceAuditError extends Error {
  constructor(code) { super(code); this.name = "AcceptanceAuditError"; this.code = code; }
}
const fail = code => { throw new AcceptanceAuditError(code); };
const allowed = new Set(["PROVEN", "PARTIAL", "NOT_PROVEN", "BLOCKED"]);
const sha40 = value => typeof value === "string" && /^[a-f0-9]{40}$/.test(value);

export function evaluatePreliminaryAudit({ matrix, checkpoint, evidenceExists }) {
  if (!matrix || matrix.schemaVersion !== 1 || matrix.workOrder !== "NXL-COMPANY-WO-022" ||
      !sha40(matrix.admissionBaseSha) || !Array.isArray(matrix.items) || matrix.items.length !== 26 ||
      typeof evidenceExists !== "function") fail("MATRIX_INVALID");
  if (!checkpoint || checkpoint.gefVersion !== "1.1.2" ||
      checkpoint.activeWorkOrder !== "NXL-COMPANY-WO-022" ||
      checkpoint.activeIssue !== 23 || checkpoint.admissionBaseSha !== matrix.admissionBaseSha ||
      checkpoint.completedThroughWorkOrder !== "NXL-COMPANY-WO-023") fail("CHECKPOINT_CONFLICT");
  const expectedGroups = { GOV:4, BLUE:4, TECH:4, MVP:7, OPS:4, ACC:3 };
  const counts = {}; const ids = new Set();
  for(const entry of matrix.items) {
    if(!entry || !/^(GOV|BLUE|TECH|MVP|OPS|ACC)-\d{2}$/.test(entry.id) ||
       ids.has(entry.id) || !allowed.has(entry.status) ||
       typeof entry.reason !== "string" || entry.reason.length < 12 ||
       !Array.isArray(entry.evidence) || entry.evidence.length < 1) fail("OBLIGATION_INVALID");
    ids.add(entry.id);
    const group=entry.id.split("-")[0];counts[group]=(counts[group]??0)+1;
    for(const file of entry.evidence) {
      if(typeof file !== "string" || file.startsWith("/") || file.includes("\\") ||
         file.split("/").some(s => !s || s === "." || s === "..") || !evidenceExists(file))fail("EVIDENCE_MISSING_OR_UNSAFE");
    }
  }
  if(Object.entries(expectedGroups).some(([g,n])=>counts[g]!==n))fail("OBLIGATION_COUNT_INVALID");
  // Group counts alone are insufficient: they can conceal a missing mandatory obligation.
  const requiredIds = new Set(Object.entries(expectedGroups).flatMap(([g,n]) =>
    Array.from({length:n},(_,i)=>`${g}-${String(i+1).padStart(2,"0")}`)));
  if (ids.size !== requiredIds.size || [...requiredIds].some(id=>!ids.has(id)))
    fail("OBLIGATION_ID_SET_INVALID");
  // DoD requires Founder explicit approval. We refuse a mere matrix flag as signed authority.
  if(matrix.founderAcceptance!=="PENDING")fail("FOUNDER_APPROVAL_UNVERIFIED");
  if(matrix.claimScope!=="LOCAL_OFFLINE_PROTOTYPE_ONLY")fail("RELEASE_SCOPE_CONFLICT");
  const tally={PROVEN:0,PARTIAL:0,NOT_PROVEN:0,BLOCKED:0};
  for(const item of matrix.items)tally[item.status]++;
  const unresolved=matrix.items.filter(item=>item.status!=="PROVEN").map(item=>({id:item.id,status:item.status,reason:item.reason}));
  return Object.freeze({
    state:"RELEASE_NOT_APPROVED",reviewState:"PRELIMINARY",
    founderApproval:"PENDING",fullDoDSatisfied:false,
    counts:tally,unresolved,
    scope:matrix.claimScope,activeWorkOrder:checkpoint.activeWorkOrder
  });
}

// An evidence path must resolve to a regular file inside the checkout. Existing
// directory entries or symlinks to external files do not establish trustworthy proof.
export function isSafeEvidenceFile(root, relativePath) {
  if (typeof relativePath !== "string" || relativePath.startsWith("/") ||
      relativePath.includes("\\\\") || relativePath.split("/").some(s=>!s || s==="." || s==="..")) return false;
  try {
    const canonicalRoot=fs.realpathSync(root);
    const absolute=path.resolve(root,relativePath);
    const resolved=fs.realpathSync(absolute);
    const rel=path.relative(canonicalRoot,resolved);
    return !!rel && rel!==".." && !rel.startsWith(".."+path.sep) &&
      !path.isAbsolute(rel) && fs.lstatSync(absolute).isFile() && fs.statSync(resolved).isFile();
  } catch { return false; }
}

export function runPreliminaryAudit(root) {
  const cp=JSON.parse(fs.readFileSync(path.join(root,".engineering/CHECKPOINT.json"),"utf8"));
  const matrix=JSON.parse(fs.readFileSync(path.join(root,"company-os/acceptance/v01-obligations.json"),"utf8"));
  return evaluatePreliminaryAudit({matrix,checkpoint:cp,evidenceExists:file=>isSafeEvidenceFile(root,file)});
}

if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try {
    const root=fileURLToPath(new URL("../../",import.meta.url));
    const result=runPreliminaryAudit(root);
    console.log(JSON.stringify(result,null,2));
    if(result.state!=="RELEASE_NOT_APPROVED")process.exitCode=2;
  } catch (e) {
    console.error("Acceptance audit failed closed:",e?.code??"INVALID");
    process.exitCode=1;
  }
}
