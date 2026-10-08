// WO-022: pure, read-only administrative closeout readiness check.
// This is NOT a GitHub client, authenticated approval, policy amendment,
// release approval, or executable handoff engine.
const isSha = x => typeof x === "string" && /^[a-f0-9]{40}$/.test(x);
const finish = x => Object.freeze({...x, blockers:Object.freeze(x.blockers)});
export function inspectBlockedCloseout({
  auditHead, governanceHead, mainHead, issue23, pr67, issue68,
  verdict, founderRelease, governanceApproval, codeRabbitVerdict,
  ownerAudit, schemaAccepted, validatorsProven, reviewApproval, records
} = {}) {
  const blockers = [];
  for(const [field,value] of Object.entries({auditHead,governanceHead,mainHead})) {
    if(!isSha(value)) blockers.push("INVALID_"+field.toUpperCase());
  }
  if(!issue23 || issue23.number !== 23 || issue23.admission !== "ADMITTED_IN_PROGRESS")
    blockers.push("AUDIT_ADMISSION_NOT_RECONCILED");
  if(!pr67 || pr67.number !== 67 || pr67.state !== "open" ||
    pr67.merged !== false || pr67.head !== auditHead)
    blockers.push("AUDIT_PR_HEAD_OR_STATE_DRIFT");
  if(!issue68 || issue68.number !== 68 || issue68.admission !== "PLANNED_NOT_ADMITTED")
    blockers.push("SUCCESSOR_ADMISSION_CONFLICT");
  if(verdict !== "RELEASE_NOT_APPROVED" || founderRelease !== "PENDING")
    blockers.push("RELEASE_EVIDENCE_INVALID");
  if(governanceApproval !== "FOUNDER_APPROVED_APPROACH_ONLY")
    blockers.push("FOUNDER_GOVERNANCE_SCOPE_UNVERIFIED");
  if(codeRabbitVerdict !== "COMMENTED")
    blockers.push("TECHNICAL_REVIEW_SNAPSHOT_MISMATCH");
  if(ownerAudit !== "OWNER_SELF_AUDIT_NOT_INDEPENDENT")
    blockers.push("OWNER_AUDIT_DISCLOSURE_MISSING");
  // Self-asserted gates are never considered authenticated approval.
  if(schemaAccepted !== true) blockers.push("CANONICAL_SCHEMA_NOT_ACCEPTED");
  if(validatorsProven !== true) blockers.push("BLOCKED_STATE_VALIDATORS_NOT_PROVEN");
  if(reviewApproval !== "PROVIDER_ATTESTED_APPROVED")
    blockers.push("QUALIFIED_POLICY_REVIEW_NOT_ATTESTED");
  // GitHub issue, PR and committed Markdown/JSON are not one transaction.
  // A mixed final/admitted readback requires recovery before ANY successor.
  if(!records || !["ADMITTED","BLOCKED"].includes(records.checkpoint) ||
    !["ADMITTED","BLOCKED"].includes(records.registry) ||
    !["ADMITTED","BLOCKED"].includes(records.issue)) {
    blockers.push("CANONICAL_RECORDS_UNAVAILABLE");
  } else if(new Set([records.checkpoint,records.registry,records.issue]).size > 1) {
    blockers.push("PARTIAL_WRITE_RECOVERY_REQUIRED");
  }
  // Even a caller that forges every Boolean cannot obtain mutation authority:
  // independent provider identity, source and branch protection require a
  // real separate, governed executor and native attestation.
  return finish({
    mode:"READ_ONLY_PRE_CLOSEOUT",
    originalAudit:"NXL-COMPANY-WO-022",
    successor:"NXL-COMPANY-WO-024",
    result:blockers.includes("PARTIAL_WRITE_RECOVERY_REQUIRED") ? "RECOVERY_REQUIRED" :
      blockers.length ? "BLOCKED" : "READY_FOR_PROVIDER_VERIFICATION_ONLY",
    blockers,
    preview:Object.freeze([
      "PRESERVE_BLOCKED_AUDIT_HEAD",
      "APPROVE_AND_VERIFY_GOVERNANCE_AMENDMENT",
      "VERIFY_NON_SUCCESS_SCHEMA_AND_CHECKS",
      "RECONCILE_ISSUE_PR_CHECKPOINT_REGISTRY",
      "VERIFY_NO_ADMITTED_PREDECESSOR_CLAIM",
      "SEPARATELY_COMPILE_AND_ADMIT_WO_024"
    ]),
    canWriteCheckpoint:false,
    canCloseWorkOrder:false,
    canAdmitSuccessor:false,
    canRelease:false
  });
}
