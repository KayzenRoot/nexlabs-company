// WO-022: read-only preflight for sequenced remediation. NEVER admits a Work Order.
// Governance remains authoritative in the approved Source Pack and external Git state.
export class RemediationPreflightError extends Error {
  constructor(code) { super(code); this.name="RemediationPreflightError"; this.code=code; }
}
const fail=code=>{ throw new RemediationPreflightError(code); };
export const RELEASE_GAPS=Object.freeze({
  "GOV-02": [26,29,31],
  "GOV-04": [25,27,31],
  "MVP-02": [24,26],
  "MVP-05": [28,29],
  "OPS-01": [24,25,28,30],
  "ACC-01": [31],
  "ACC-03": [31]
});
export const FIRST_REMEDIATION_WO="NXL-COMPANY-WO-024";
// Snapshot of issue references verified at audit preparation. This is NOT
// a live GitHub fetch or proof of current planning state.
export const PLANNED_ISSUE_NUMBERS=Object.freeze(Object.fromEntries(
  Array.from({length:8},(_,i)=>[`NXL-COMPANY-WO-${String(i+24).padStart(3,"0")}`,i+68])
));
const WO=id=>`NXL-COMPANY-WO-${String(id).padStart(3,"0")}`;

// This function uses only supplied, explicitly labeled evidence metadata; it
// does not fetch GitHub, change checkpoint state, sign a release or start work.
export function planBlockedAcceptance({audit, checkpoint, candidateIssues}) {
  // A handoff plan must bind to the same *preliminary* offline audit and
  // immutable admission identity. A fabricated or stale metadata object must
  // not appear to be a trustworthy predecessor of WO-024.
  if(!audit || audit.state!=="RELEASE_NOT_APPROVED" ||
     audit.reviewState!=="PRELIMINARY" ||
     audit.scope!=="LOCAL_OFFLINE_PROTOTYPE_ONLY" ||
     audit.activeWorkOrder!=="NXL-COMPANY-WO-022" ||
     audit.founderApproval!=="PENDING" || audit.fullDoDSatisfied!==false ||
     !Array.isArray(audit.unresolved) ||
     !audit.counts || audit.counts.PROVEN!==19 ||
     audit.counts.PARTIAL!==6 || audit.counts.NOT_PROVEN!==0 ||
     audit.counts.BLOCKED!==1)fail("RELEASE_VERDICT_UNSAFE");
  if(!checkpoint || checkpoint.gefVersion!=="1.1.2" ||
     checkpoint.activeWorkOrder!=="NXL-COMPANY-WO-022" ||
     checkpoint.activeStatus!=="ADMITTED_IN_PROGRESS" ||
     checkpoint.activeIssue!==23 ||
     checkpoint.activeBranch!=="audit/NXL-COMPANY-WO-022-v01-integrated-acceptance" ||
     checkpoint.activeContextLock!==".engineering/context-locks/NXL-COMPANY-WO-022.json" ||
     checkpoint.admissionBaseSha!=="d2f7acc85babd62cfacb87a4d061ef39e74a566d" ||
     checkpoint.completedThroughWorkOrder!=="NXL-COMPANY-WO-023")
     fail("ACTIVE_WO_CONFLICT");
  if(!Array.isArray(candidateIssues))fail("ROADMAP_UNVERIFIED");
  const expected=new Set(Array.from({length:8},(_,i)=>WO(i+24)));
  const seen=new Set();
  for(const issue of candidateIssues) {
    if(!issue || typeof issue.id!=="string" || seen.has(issue.id) ||
       !expected.has(issue.id) || issue.state!=="PLANNED / NOT_ADMITTED" ||
       !Number.isSafeInteger(issue.issueNumber) ||
       issue.issueNumber!==PLANNED_ISSUE_NUMBERS[issue.id])
      fail("CANDIDATE_NOT_SAFE");
    seen.add(issue.id);
  }
  if(seen.size!==expected.size)fail("ROADMAP_INCOMPLETE");
  const unresolved=new Set(audit.unresolved.map(x=>x.id));
  if(unresolved.size!==audit.unresolved.length)fail("DUPLICATE_GAP");
  // ACC-03 cannot be approved or omitted by general continuation instructions.
  if(!unresolved.has("ACC-03") ||
     audit.unresolved.find(x=>x.id==="ACC-03")?.status!=="BLOCKED")
    fail("FOUNDER_SIGNOFF_NOT_REQUESTED");
  // Pin the known blocked release assessment. A reclassified obligation
  // requires a fresh independent audit instead of silent plan promotion.
  if(unresolved.size!==Object.keys(RELEASE_GAPS).length ||
     Object.keys(RELEASE_GAPS).some(id=>!unresolved.has(id)))fail("GAP_SET_CHANGED");
  for(const row of audit.unresolved) {
    if(!row || typeof row.id!=="string" ||
       !["PARTIAL","NOT_PROVEN","BLOCKED"].includes(row.status) ||
       !Object.hasOwn(RELEASE_GAPS,row.id))fail("GAP_UNMAPPED");
    // These six partials and one blocked Founder acceptance are the
    // authenticated *planning snapshot*, not a claim about live integrations.
    if(row.status!==(row.id==="ACC-03"?"BLOCKED":"PARTIAL"))
      fail("GAP_STATUS_DRIFT");
  }
  const map=Object.fromEntries(audit.unresolved.map(x=>[
    x.id,{status:x.status,candidateWOs:RELEASE_GAPS[x.id].map(WO)}
  ]));
  return Object.freeze({
    auditVerdict:"RELEASE_NOT_APPROVED",
    activeWorkOrder:checkpoint.activeWorkOrder,
    successorAdmission:"BLOCKED",
    canStartImplementation:false,
    nextAction:"REVIEW_GEF_BLOCKED_AUDIT_TRANSITION",
    requestedFirstSuccessor:FIRST_REMEDIATION_WO,
    founderReleaseAcceptance:"PENDING",
    gaps:map
  });
}
