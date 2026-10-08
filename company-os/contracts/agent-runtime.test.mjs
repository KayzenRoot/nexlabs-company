import test from "node:test";
import assert from "node:assert/strict";
import {validateSessionRequest, routeModel, authorizeTool, transitionRun, enforceBudget, decideRecovery, mayRetry, planHermesInvocation} from "./agent-runtime.mjs";
const request = () => ({
 session_id:"sess",organization_id:"org",agent_id:"agent",task_id:"task",correlation_id:"corr",
 role_contract_ref:"company/AI-EMPLOYEE-CONTRACT.md",canonical_context_refs:["sha:main"],
 requested_capabilities:["planning"],data_class:"INTERNAL",context_tokens:200,
 limits:{max_turns:5,max_cost_usd:1,timeout_ms:30000}
});
const model=(other={})=>({id:"mock-1",approved_for_org:true,healthy:true,data_classes:["INTERNAL"],capabilities:["planning"],max_context_tokens:800,max_estimated_cost_usd:0.5,...other});
test("accepts bounded valid session",()=>assert.equal(validateSessionRequest(request()).session_id,"sess"));
test("rejects missing budgets",()=>assert.throws(()=>validateSessionRequest({...request(),limits:{}}),{code:"VALIDATION_ERROR"}));
test("routes approved model",()=>assert.equal(routeModel(request(),[model()]).id,"mock-1"));
test("rejects unapproved cheaper or wrong data-class provider",()=>assert.equal(routeModel(request(),[model({id:"cheap",approved_for_org:false,max_estimated_cost_usd:0.01}),model()]).id,"mock-1"));
test("fails closed rather than silent fallback",()=>assert.throws(()=>routeModel(request(),[model({data_classes:["PUBLIC"]})]),{code:"ROUTING_DENIED"}));
test("denies implicit tool capability",()=>assert.throws(()=>authorizeTool({capability:"repository.merge",digest:"abc"},{actor_active:true,allowlisted_capabilities:["repository.read"]}),{code:"AUTHORIZATION_DENIED"}));
test("allows bounded normal tool",()=>assert.equal(authorizeTool({capability:"repository.read",digest:"abc"},{actor_active:true,allowlisted_capabilities:["repository.read"]}).decision,"ALLOW"));
test("requires matching approval for high assurance",()=>assert.throws(()=>authorizeTool({capability:"web3.sign",digest:"x",actor_id:"a",risk_class:"HIGH_ASSURANCE"},{actor_active:true,allowlisted_capabilities:["web3.sign"],approval:{state:"APPROVED",digest:"y",subject_actor:"a",expires_at_ms:9999999999999}}),{code:"APPROVAL_REQUIRED"}));
test("accepts exact approved unexpired high assurance",()=>assert.equal(authorizeTool({capability:"finance.execute",digest:"x",actor_id:"a",risk_class:"HIGH_ASSURANCE"},{actor_active:true,allowlisted_capabilities:["finance.execute"],approval:{state:"APPROVED",digest:"x",subject_actor:"a",expires_at_ms:9999999999999},now_ms:100}).decision,"ALLOW"));
test("rejects invalid execution transition",()=>assert.throws(()=>transitionRun("UNKNOWN_COMPLETION","SUCCEEDED"),{code:"STATE_CONFLICT"}));
test("requires reconciliation after uncertain completion",()=>assert.equal(transitionRun("UNKNOWN_COMPLETION","RECOVERY_REQUIRED"),"RECOVERY_REQUIRED"));
test("unknown provider outcome stays blocked",()=>assert.equal(decideRecovery("UNKNOWN"),"BLOCKED"));
test("confirmed absence does not automatically retry",()=>assert.equal(decideRecovery("CONFIRMED_ABSENT"),"RECONCILED_ABSENT"));
test("never blindly retries after mutation dispatch",()=>assert.equal(mayRetry("FAILED",1,3,true),false));
test("retries only known safe failed nonmutation",()=>assert.equal(mayRetry("FAILED",1,3,false),true));
test("budget ceiling stops overrun",()=>assert.throws(()=>enforceBudget(request(),{turns:6,cost_usd:0.2,elapsed_ms:2000}),{code:"BUDGET_EXCEEDED"}));
test("Hermes invocation is declarative, no yolo, no shell",()=>{
 const p=planHermesInvocation({prompt:"$(echo test)",provider:"nous",maxTurns:3});
 assert.equal(p.execution,"NOT_EXECUTED"); assert.equal(p.stdin,"$(echo test)");
 assert.equal(p.argv.includes("--yolo"),false);assert.equal(p.argv.includes("stream-json"),true);
 assert.equal(p.executable,"hermes");
});
