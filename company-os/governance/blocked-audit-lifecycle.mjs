// NexLabs v0.1: deterministic, side-effect-free WO-022 archival lifecycle validator.
// This module validates committed source records. It is NOT GitHub-native evidence
// and never grants permission to mutate issues, checkpoints, PRs or releases.
export class ArchiveStateError extends Error {
  constructor(code) { super(code); this.name = "ArchiveStateError"; this.code = code; }
}
const fail = code => { throw new ArchiveStateError(code); };
const wo = "NXL-COMPANY-WO-022";
const blocked = "BLOCKED / AWAITING_REMEDIATION";
const rowPattern = /^\|\s*(NXL-COMPANY-WO-\d{3})\s*\|\s*#\d+\s*\|\s*([^|]+)\|/gm;
const activeClaim = /^ADMITTED(?:\s|\/|$)/;
const sha40 = x => typeof x === "string" && /^[a-f0-9]{40}$/.test(x);
function registryRows(text) {
  if(typeof text !== "string") fail("REGISTRY_MISSING");
  const rows = new Map();
  for(const [,id,state] of text.matchAll(rowPattern)) {
    if(rows.has(id)) fail("DUPLICATE_REGISTRY_ENTRY");
    rows.set(id,state.trim());
  }
  if(!rows.has(wo)) fail("WO_022_REGISTRY_MISSING");
  return rows;
}
export function inspectWo022Archive({checkpoint, registry, wo022Text, governanceText} = {}) {
  if(!checkpoint || checkpoint.gefVersion!=="1.1.2" ||
     checkpoint.completedThroughWorkOrder!=="NXL-COMPANY-WO-023")
    fail("CHECKPOINT_BASE_INVALID");
  if(typeof wo022Text !== "string") fail("WO_022_MISSING");
  const match = wo022Text.match(/^\*\*Status:\*\* `([^`]+)`/m);
  if(!match) fail("WO_022_STATUS_MISSING");
  const state=match[1], rows=registryRows(registry);
  if(rows.get(wo)!==state) fail("WO_022_REGISTRY_CONFLICT");
  const activeRows=[...rows].filter(([,s])=>activeClaim.test(s)).map(([id])=>id);
  const active=checkpoint.activeWorkOrder;
  if(active===null && activeRows.length!==0) fail("IDLE_WITH_ADMITTED_CLAIM");
  if(active!==null && (activeRows.length!==1 || activeRows[0]!==active))
    fail("SINGLE_ACTIVE_CONFLICT");
  if(active===wo) {
    if(state!=="ADMITTED / IN_PROGRESS" || checkpoint.activeIssue!==23 ||
       checkpoint.activeStatus!=="ADMITTED_IN_PROGRESS")
       fail("WO_022_ACTIVE_STATE_INVALID");
    return Object.freeze({mode:"ADMITTED_AUDIT",canRelease:false,
      canAdmitSuccessor:false,externalProviderReconciliationRequired:true});
  }
  if(state==="PLANNED / NOT_ADMITTED") {
    if(checkpoint.wo022AdministrativeDisposition!==undefined)
      fail("PLANNED_WITH_ARCHIVE_CLAIM");
    return Object.freeze({mode:"PLANNED",canRelease:false,
      canAdmitSuccessor:false,externalProviderReconciliationRequired:true});
  }
  if(state!==blocked) fail("UNKNOWN_WO_022_TERMINAL_STATE");
  const d=checkpoint.wo022AdministrativeDisposition;
  if(!d || d.state!=="BLOCKED" || d.blockedReason!=="AWAITING_REMEDIATION" ||
     d.auditIssue!==23 || d.auditPr!==67 || d.governancePr!==128 ||
     !sha40(d.auditHeadSha) || d.releaseVerdict!=="RELEASE_NOT_APPROVED" ||
     d.founderReleaseAcceptance!=="PENDING" ||
     checkpoint.activeWorkOrder===wo ||
     typeof governanceText!=="string" ||
     !governanceText.includes("Non-success administrative retirement of a blocked acceptance audit"))
     fail("INVALID_BLOCKED_ARCHIVE_MANIFEST");
  if(!wo022Text.includes("RELEASE_NOT_APPROVED") ||
     !wo022Text.includes("BLOCKED / AWAITING_REMEDIATION"))
     fail("INCOMPLETE_AUDIT_RECORD");
  if(active===null && checkpoint.activeStatus!=="NONE")
     fail("NON_NULL_ACTIVE_STATUS");
  // No trust escalation from branch files: provider-native issue/PR readback and
  // a separately admitted successor remain required even when source is valid.
  return Object.freeze({mode:"BLOCKED_AWAITING_REMEDIATION",canRelease:false,
    canAdmitSuccessor:false,externalProviderReconciliationRequired:true});
}
