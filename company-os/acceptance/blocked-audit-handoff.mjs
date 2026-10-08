// WO-022 READ-ONLY audit classifier for the proposed governance transition.
// Never writes a checkpoint, admits a WO, verifies a GitHub identity, or releases v0.1.
export class BlockedAuditHandoffError extends Error {
  constructor(code) { super(code); this.name="BlockedAuditHandoffError"; this.code=code; }
}
const fail=code=>{ throw new BlockedAuditHandoffError(code); };
const isSha=value=>typeof value==="string" && /^[0-9a-f]{40}$/.test(value);
const BASE="d2f7acc85babd62cfacb87a4d061ef39e74a566d";
const PROPOSAL_SHA="deba799b46a6d218dc2147d7b70aee7afd3c2adc";
const AUDIT_BRANCH="audit/NXL-COMPANY-WO-022-v01-integrated-acceptance";
const AUDIT_LOCK=".engineering/context-locks/NXL-COMPANY-WO-022.json";

// All inputs are *read-only metadata snapshots*, not authenticated permissions.
// A successful classification never grants execution authority. GitHub-native
// reviews and the source pack must still be independently reconciled.
export function assessBlockedAuditHandoff({
  mainCheckpoint, auditCheckpoint, auditIssue, auditPr, governancePr,
  successorIssue, decision, assessment, independentReview=null
}) {
  if(!mainCheckpoint || mainCheckpoint.gefVersion!=="1.1.2" ||
      mainCheckpoint.activeWorkOrder!==null ||
      mainCheckpoint.activeStatus!=="NONE" ||
      mainCheckpoint.completedThroughWorkOrder!=="NXL-COMPANY-WO-023")
    fail("MAIN_BASE_CONFLICT");
  if(!auditCheckpoint ||
      auditCheckpoint.admissionBaseSha!==BASE ||
      auditCheckpoint.activeWorkOrder!=="NXL-COMPANY-WO-022" ||
      auditCheckpoint.activeIssue!==23 ||
      auditCheckpoint.activeStatus!=="ADMITTED_IN_PROGRESS" ||
      auditCheckpoint.activeBranch!==AUDIT_BRANCH ||
      auditCheckpoint.activeContextLock!==AUDIT_LOCK)
    fail("AUDIT_CHECKPOINT_CONFLICT");
  if(!auditIssue || auditIssue.number!==23 ||
      auditIssue.state!=="open" ||
      auditIssue.admission!=="ADMITTED_IN_PROGRESS")
    fail("AUDIT_ISSUE_CONFLICT");
  if(!auditPr || auditPr.number!==67 || auditPr.state!=="open" ||
      auditPr.draft!==true || auditPr.merged!==false ||
      auditPr.baseSha!==BASE || auditPr.headBranch!==AUDIT_BRANCH ||
      !isSha(auditPr.headSha) || typeof auditPr.author!=="string" ||
      auditPr.author.length<1)
    fail("AUDIT_PR_CONFLICT");
  // A review of PR #67 cannot approve the *distinct governance amendment*
  // proposed in PR #128. Bind the package to both PR identities and demand
  // a separately verified exact governance-head review.
  if(!governancePr || governancePr.number!==128 ||
      governancePr.state!=="open" || governancePr.draft!==true ||
      governancePr.merged!==false || governancePr.baseSha!==BASE ||
      governancePr.headBranch!=="governance/NXL-GOV-blocked-audit-handoff-proposal" ||
      !isSha(governancePr.headSha) ||
      typeof governancePr.author!=="string" || governancePr.author.length<1)
    fail("GOVERNANCE_PR_CONFLICT");
  if(!successorIssue || successorIssue.number!==68 ||
      successorIssue.id!=="NXL-COMPANY-WO-024" ||
      successorIssue.state!=="open" ||
      successorIssue.admission!=="PLANNED_NOT_ADMITTED")
    fail("SUCCESSOR_NOT_PLANNED");
  if(!decision || decision.issue!==127 ||
      decision.state!=="FOUNDER_PROPOSAL_APPROVED" ||
      decision.proposalSha!==PROPOSAL_SHA ||
      decision.commentId!==6050879986 ||
      decision.scope!=="GOVERNANCE_HANDOFF_ONLY" ||
      decision.founderReleaseAcceptance!=="PENDING")
    fail("FOUNDER_DECISION_SCOPE_INVALID");
  if(!assessment || assessment.verdict!=="RELEASE_NOT_APPROVED" ||
      assessment.founderAcceptance!=="PENDING" ||
      assessment.proven!==19 || assessment.partial!==6 ||
      assessment.blocked!==1)
    fail("RELEASE_EVIDENCE_CONFLICT");

  let reviewState="INDEPENDENT_REVIEW_MISSING";
  if(independentReview!==null) {
    if(typeof independentReview!=="object" ||
        independentReview.verdict!=="APPROVED" ||
        (independentReview.reviewer===auditPr.author ||
         independentReview.reviewer===governancePr.author) ||
        typeof independentReview.reviewer!=="string" ||
        independentReview.reviewer.length<1 ||
        independentReview.reviewedHead!==governancePr.headSha ||
        independentReview.source!=="GITHUB_NATIVE_READBACK" ||
        !Number.isSafeInteger(independentReview.reviewId) ||
        independentReview.reviewId<1)
      fail("REVIEW_EVIDENCE_INVALID");
    // Caller-provided review metadata is not proof of its provider-native
    // provenance. No automatic acceptance or permission is issued.
    reviewState="REVIEW_METADATA_NEEDS_INDEPENDENT_VERIFICATION";
  }
  return Object.freeze({
    status:"REVIEW_PACKAGE_ONLY",
    founderGovernanceDirection:"APPROVED_IN_CONVERSATION",
    reviewState,
    authorityDivergence:"BASE_MAIN_IDLE_AUDIT_BRANCH_ACTIVE",
    proposedGovernanceReviewHead:governancePr.headSha,
    auditVerdict:"RELEASE_NOT_APPROVED",
    releaseFounderAcceptance:"PENDING",
    successor:"NXL-COMPANY-WO-024",
    canAmendCanonicalPolicy:false,
    canTransferAdmission:false,
    canExecuteSuccessor:false,
    canRelease:false,
    nextAction:"INDEPENDENT_REVIEW_AND_GOVERNED_AMENDMENT"
  });
}
