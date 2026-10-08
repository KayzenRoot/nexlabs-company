import {intentDigest,runEngineeringCell} from "./engine.mjs";

const BASE="1916ca9bc3d98c4a9f1dc15012514d15e5e7eeec";
export function demoInput(overrides={}){
  const intent={intent_id:"DEMO_01",organization_id:"NEXLABS",actor_id:"FOUNDER",summary:"Create a bounded hello-world service in virtual staging",base_sha:BASE,allowed_paths:["examples/hello.mjs"],acceptance:[{path:"examples/hello.mjs",includes:"export function hello"}],max_attempts:2,...overrides};
  const approval={state:"APPROVED",approver_role:"FOUNDER",approver_id:"FOUNDER",organization_id:intent.organization_id,actor_id:intent.actor_id,base_sha:intent.base_sha,expires_at_ms:4102444800000,intent_digest:intentDigest(intent)};
  const contextLock={state:"LOCKED",base_sha:intent.base_sha,source_fingerprint:"GEF_LOCK_019",allowed_paths:["examples/hello.mjs"]};
  return {intent,approval,contextLock,now_ms:1791414000000,
    // Demo-only authority fixture: real deployments MUST verify authenticated Founder identity via broker.
    trustedApprovalVerifier:async(a,i)=>a.approver_id==="FOUNDER"&&a.intent_digest===intentDigest(i)
  };
}
export const correctingExecutor={
  async propose({attempt}){
    if(attempt===1)return {state:"PROPOSED",edits:[{path:"examples/hello.mjs",content:"// first attempt fails acceptance\n"}]};
    return {state:"PROPOSED",edits:[{path:"examples/hello.mjs",content:'export function hello(){return "NexLabs";}\n'}]};
  }
};
export const passingExecutor={async propose(){return {state:"PROPOSED",edits:[{path:"examples/hello.mjs",content:'export function hello(){return "NexLabs";}\n'}]};}};
export async function runDemo(){return runEngineeringCell({...demoInput(),executor:correctingExecutor});}
