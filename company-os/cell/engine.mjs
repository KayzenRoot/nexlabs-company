// WO-019: fully offline, deterministic engineering-cell MVP.
// No shell, network, filesystem, GitHub, Docker, credentials or live model calls.
import {createHash} from "node:crypto";

export class CellError extends Error {
  constructor(code, detail) { super(detail); this.name="CellError"; this.code=code; }
}
const fail=(code,detail)=>{throw new CellError(code,detail);};
const assert=(condition,code,detail)=>{if(!condition)fail(code,detail);};
const isObject=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
function normalized(value){
  if(Array.isArray(value))return value.map(normalized);
  if(isObject(value)){
    const out={};
    for(const key of Object.keys(value).sort()) {
      if(value[key]!==undefined)out[key]=normalized(value[key]);
    }
    return out;
  }
  return value;
}
export function digest(value){return createHash("sha256").update(JSON.stringify(normalized(value))).digest("hex");}
const hexSha=s=>typeof s==="string"&&/^[a-f0-9]{40}$/i.test(s);
const ident=s=>typeof s==="string"&&/^[A-Za-z0-9_-]{1,64}$/.test(s);
export function safePath(path){
  assert(typeof path==="string"&&path.length<=180,"UNSAFE_PATH","Path invalid");
  assert(!path.includes("\\")&&!path.startsWith("/")&&!path.includes("\0"),"UNSAFE_PATH","Absolute or escaped path denied");
  assert(!/(^|\/)\.{1,2}(\/|$)/.test(path),"UNSAFE_PATH","Traversal denied");
  assert(/^[A-Za-z0-9_.\/-]+$/.test(path),"UNSAFE_PATH","Path characters denied");
  const segments=path.split("/");
  assert(segments.every(Boolean),"UNSAFE_PATH","Empty path segment");
  assert(!segments.some(s=>[".git",".gef-private","node_modules","secrets"].includes(s) || s===".env" || s.startsWith(".env.")),"UNSAFE_PATH","Protected path denied");
  return path;
}
function verifyIntent(intent,approval,contextLock,now){
  assert(isObject(intent)&&isObject(approval)&&isObject(contextLock),"VALIDATION_ERROR","Missing governance envelope");
  for(const key of ["intent_id","organization_id","actor_id"])assert(ident(intent[key]),"VALIDATION_ERROR","Invalid "+key);
  assert(typeof intent.summary==="string"&&intent.summary.trim().length>=8&&intent.summary.length<=500,"VALIDATION_ERROR","Bounded intent summary required");
  assert(hexSha(intent.base_sha)&&hexSha(contextLock.base_sha),"VALIDATION_ERROR","Exact Git SHA required");
  assert(intent.base_sha===contextLock.base_sha,"CONTEXT_STALE","Context base differs");
  assert(contextLock.state==="LOCKED"&&ident(contextLock.source_fingerprint),"CONTEXT_STALE","Missing current source lock");
  assert(Array.isArray(intent.allowed_paths)&&intent.allowed_paths.length>0&&intent.allowed_paths.length<=15,"VALIDATION_ERROR","Allowed paths required");
  assert(Array.isArray(contextLock.allowed_paths)&&contextLock.allowed_paths.length>0,"CONTEXT_STALE","Context paths missing");
  const paths=intent.allowed_paths.map(safePath);
  assert(new Set(paths).size===paths.length,"VALIDATION_ERROR","Duplicate path");
  assert(paths.every(path=>contextLock.allowed_paths.includes(path)),"CONTEXT_STALE","Intent exceeds lock scope");
  assert(Array.isArray(intent.acceptance)&&intent.acceptance.length>0&&intent.acceptance.length<=15,"VALIDATION_ERROR","Acceptance criteria required");
  for(const rule of intent.acceptance){
    assert(isObject(rule)&&paths.includes(rule.path)&&typeof rule.includes==="string"&&rule.includes.length>0&&rule.includes.length<=200,"VALIDATION_ERROR","Invalid deterministic acceptance rule");
  }
  assert(Number.isInteger(intent.max_attempts)&&intent.max_attempts>=1&&intent.max_attempts<=3,"VALIDATION_ERROR","Bounded correction attempts required");
  assert(approval.state==="APPROVED"&&approval.approver_role==="FOUNDER"&&ident(approval.approver_id),"APPROVAL_REQUIRED","Founder approval missing");
  assert(approval.organization_id===intent.organization_id&&approval.actor_id===intent.actor_id&&approval.base_sha===intent.base_sha,"APPROVAL_REQUIRED","Approval binding mismatch");
  assert(Number.isFinite(approval.expires_at_ms)&&approval.expires_at_ms>now,"APPROVAL_REQUIRED","Founder approval expired");
  assert(approval.intent_digest===intentDigest(intent),"APPROVAL_REQUIRED","Approval action digest mismatch");
  return paths;
}
export function intentDigest(intent){
  return digest({intent_id:intent.intent_id,organization_id:intent.organization_id,actor_id:intent.actor_id,summary:intent.summary,base_sha:intent.base_sha,allowed_paths:intent.allowed_paths,acceptance:intent.acceptance,max_attempts:intent.max_attempts});
}
function stageProposal(proposal,allowed){
  assert(isObject(proposal)&&proposal.state==="PROPOSED","EXECUTOR_CONTRACT","Executor must propose data, not claim merge");
  assert(Array.isArray(proposal.edits)&&proposal.edits.length>0&&proposal.edits.length<=25,"EXECUTOR_CONTRACT","Bounded edit list required");
  const staged={}; let bytes=0;
  for(const edit of proposal.edits){
    assert(isObject(edit),"EXECUTOR_CONTRACT","Edit object required");
    const path=safePath(edit.path);
    assert(allowed.includes(path),"SCOPE_DENIED","Edit outside allowed paths");
    assert(staged[path]===undefined,"EXECUTOR_CONTRACT","Duplicate edit");
    assert(typeof edit.content==="string"&&edit.content.length<=15000,"EXECUTOR_CONTRACT","Text edit only");
    assert(!/-----BEGIN [A-Z ]*PRIVATE KEY-----|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}/.test(edit.content),"SECRET_DETECTED","Secret-like payload denied");
    bytes+=Buffer.byteLength(edit.content,"utf8");
    assert(bytes<=40000,"BUDGET_EXCEEDED","Candidate too large");
    staged[path]=edit.content;
  }
  return staged;
}
function qa(candidate,acceptance){
  const findings=[];
  for(const rule of acceptance){
    if(typeof candidate[rule.path]!=="string" || !candidate[rule.path].includes(rule.includes)) {
      findings.push({path:rule.path,code:"ACCEPTANCE_MISSING",check_hash:digest(rule)});
    }
  }
  return {passed:findings.length===0,findings};
}
function eventLog(){
  const events=[]; let previous="0".repeat(64);
  return {
    events,
    append(type,detail){
      const entry={sequence:events.length+1,type,detail,previous_hash:previous};
      entry.hash=digest(entry);
      previous=entry.hash;
      events.push(Object.freeze(entry));
    }
  };
}
export function verifyReceiptChain(events){
  let hash="0".repeat(64);
  for(let index=0;index<events.length;index++){
    const entry=events[index];
    if(entry.sequence!==index+1||entry.previous_hash!==hash)return false;
    const {hash:recorded,...payload}=entry;
    if(digest(payload)!==recorded)return false;
    hash=recorded;
  }
  return true;
}
export async function runEngineeringCell({intent,approval,contextLock,executor,trustedApprovalVerifier,now_ms=Date.now(),signal}){
  const allowed=verifyIntent(intent,approval,contextLock,now_ms);
  assert(typeof trustedApprovalVerifier==="function","AUTHORIZATION_DENIED","Trusted Founder identity/approval verifier adapter required");
  const verified=await trustedApprovalVerifier(Object.freeze(structuredClone(approval)),Object.freeze(structuredClone(intent)));
  assert(verified===true,"AUTHORIZATION_DENIED","Founder identity/approval not verified by trusted authority");
  assert(executor&&typeof executor.propose==="function","EXECUTOR_CONTRACT","Injected adapter required");
  const log=eventLog();
  const workOrder={key:"CELL-"+intent.intent_id.toUpperCase(),base_sha:intent.base_sha,organization_id:intent.organization_id,scope:allowed.slice(),source_fingerprint:contextLock.source_fingerprint,acceptance:structuredClone(intent.acceptance)};
  log.append("FOUNDER_INTENT_APPROVED",{intent_digest:intentDigest(intent),approval_role:"FOUNDER",base_sha:intent.base_sha});
  log.append("PLAN_COMPILED",{work_order:workOrder.key,scope_hash:digest(workOrder.scope)});
  log.append("CONTEXT_LOCK_VERIFIED",{base_sha:contextLock.base_sha,source_fingerprint:contextLock.source_fingerprint});
  let lastFindings=[];
  for(let attempt=1;attempt<=intent.max_attempts;attempt++){
    if(signal?.aborted){
      log.append("CANCELLED",{attempt});
      return {status:"CANCELLED",workOrder,events:log.events,checkpoint_handoff:null};
    }
    log.append("EXECUTION_REQUESTED",{attempt,adapter:"INJECTED_OFFLINE",feedback_hash:digest(lastFindings)});
    let proposal;
    try{
      proposal=await executor.propose(Object.freeze({attempt,workOrder:structuredClone(workOrder),feedback:structuredClone(lastFindings)}));
    }catch(error){
      log.append("EXECUTOR_ERROR",{attempt,code:"PROVIDER_FAILURE"});
      return {status:"BLOCKED",reason:"PROVIDER_FAILURE",workOrder,events:log.events,checkpoint_handoff:null};
    }
    if(signal?.aborted){
      log.append("CANCELLED",{attempt,after:"PROVIDER_PROPOSAL"});
      return {status:"CANCELLED",workOrder,events:log.events,checkpoint_handoff:null};
    }
    if(proposal?.state==="UNKNOWN_COMPLETION"){
      log.append("RECOVERY_REQUIRED",{attempt,reason:"UNKNOWN_COMPLETION"});
      return {status:"RECOVERY_REQUIRED",workOrder,events:log.events,checkpoint_handoff:null};
    }
    let candidate;
    try {candidate=stageProposal(proposal,allowed);}
    catch(error){
      if(!(error instanceof CellError))throw error;
      log.append("EXECUTOR_REJECTED",{attempt,code:error.code});
      return {status:"BLOCKED",reason:error.code,workOrder,events:log.events,checkpoint_handoff:null};
    }
    const candidate_digest=digest(candidate);
    log.append("CANDIDATE_STAGED",{attempt,candidate_digest,changed_paths:Object.keys(candidate).sort()});
    const result=qa(candidate,intent.acceptance);
    log.append("QA_COMPLETED",{attempt,candidate_digest,passed:result.passed,findings:result.findings});
    if(result.passed){
      log.append("AUTOMATED_REVIEW_READY",{candidate_digest,review:"AUTOMATED_QA_NOT_INDEPENDENT"});
      const handoff={
        state:"PENDING_GEF_REVIEW",
        work_order_key:workOrder.key,
        expected_base_sha:intent.base_sha,
        candidate_digest,
        staged_files:structuredClone(candidate),
        evidence_head:log.events.at(-1).hash,
        merge_authorized:false,
        checkpoint_promoted:false,
        review_authority:"GEF_EXACT_HEAD_HUMAN_OR_INDEPENDENT_REVIEW"
      };
      log.append("CHECKPOINT_HANDOFF_PREPARED",{candidate_digest,requires_governed_pr:true});
      return {status:"READY_FOR_GOVERNED_PR",workOrder,candidate,qa:result,attempts:attempt,events:log.events,checkpoint_handoff:handoff};
    }
    lastFindings=result.findings;
    if(attempt<intent.max_attempts)log.append("CORRECTION_REQUIRED",{attempt,findings:result.findings});
  }
  log.append("BLOCKED",{reason:"QA_NOT_SATISFIED"});
  return {status:"CORRECTION_REQUIRED",reason:"QA_NOT_SATISFIED",workOrder,qa:{passed:false,findings:lastFindings},events:log.events,checkpoint_handoff:null};
}
