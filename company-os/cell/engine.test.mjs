import test from "node:test";
import assert from "node:assert/strict";
import {CellError,digest,intentDigest,runEngineeringCell,safePath,verifyReceiptChain} from "./engine.mjs";
import {demoInput,passingExecutor,correctingExecutor,runDemo} from "./fixtures.mjs";
const run=(change={},executor=passingExecutor)=>{
  const fixture=demoInput();
  Object.assign(fixture,change);
  return runEngineeringCell({...fixture,executor});
};
test("successful end-to-end compiles, executes, reviews, and only prepares handoff",async()=>{
 const x=await runDemo();
 assert.equal(x.status,"READY_FOR_GOVERNED_PR"); assert.equal(x.attempts,2);
 assert.equal(x.qa.passed,true); assert.equal(x.checkpoint_handoff.state,"PENDING_GEF_REVIEW");
 assert.equal(x.checkpoint_handoff.merge_authorized,false); assert.equal(x.checkpoint_handoff.checkpoint_promoted,false);
 assert.ok(x.events.some(e=>e.type==="CORRECTION_REQUIRED"));
 assert.ok(x.events.some(e=>e.type==="QA_COMPLETED"&&e.detail.passed===false));
 assert.ok(verifyReceiptChain(x.events));
});
test("rejects malformed or tampered Founder approval",async()=>{
 const f=demoInput();f.intent.summary="Something else unapproved";
 await assert.rejects(runEngineeringCell({...f,executor:passingExecutor}),{code:"APPROVAL_REQUIRED"});
});
test("rejects stale source base",async()=>{
 const f=demoInput();f.contextLock.base_sha="a".repeat(40);
 await assert.rejects(runEngineeringCell({...f,executor:passingExecutor}),{code:"CONTEXT_STALE"});
});
test("rejects missing Founder role",async()=>{
 const f=demoInput();f.approval.approver_role="AGENT";
 await assert.rejects(runEngineeringCell({...f,executor:passingExecutor}),{code:"APPROVAL_REQUIRED"});
});
test("rejects expired Founder approval",async()=>{
 const f=demoInput();f.approval.expires_at_ms=10;
 await assert.rejects(runEngineeringCell({...f,executor:passingExecutor}),{code:"APPROVAL_REQUIRED"});
});
test("rejects edit outside scope",async()=>{
 const x=await run({}, {async propose(){return {state:"PROPOSED",edits:[{path:"unauthorized/other.mjs",content:"hello"}]};}});
 assert.equal(x.status,"BLOCKED");assert.equal(x.reason,"SCOPE_DENIED");assert.equal(x.checkpoint_handoff,null);
});
test("rejects path traversal and protected path",()=>{
 for(const path of ["../data",".git/config","node_modules/a","a/../../b","a\\evil",".env","/tmp/file"]){
   assert.throws(()=>safePath(path),{code:"UNSAFE_PATH"});
 }
});
test("rejects secrets in proposed file",async()=>{
 const x=await run({}, {async propose(){return {state:"PROPOSED",edits:[{path:"examples/hello.mjs",content:"-----BEGIN PRIVATE KEY-----"}]};}});
 assert.equal(x.status,"BLOCKED");assert.equal(x.reason,"SECRET_DETECTED");
});
test("does not auto-promote failing QA",async()=>{
 const f=demoInput({max_attempts:1});
 const x=await runEngineeringCell({...f,executor:correctingExecutor});
 assert.equal(x.status,"CORRECTION_REQUIRED");assert.equal(x.checkpoint_handoff,null);
});
test("caps corrections with no infinite retry",async()=>{
 const f=demoInput({max_attempts:3});let calls=0;
 const x=await runEngineeringCell({...f,executor:{async propose(){calls++;return {state:"PROPOSED",edits:[{path:"examples/hello.mjs",content:"not good"}]};}}});
 assert.equal(calls,3);assert.equal(x.status,"CORRECTION_REQUIRED");
});
test("unknown completion requires reconciliation without automatic retry",async()=>{
 let calls=0;const x=await run({}, {async propose(){calls++;return {state:"UNKNOWN_COMPLETION"};}});
 assert.equal(x.status,"RECOVERY_REQUIRED");assert.equal(calls,1);
});
test("executor error blocks without retry",async()=>{
 let calls=0;const x=await run({}, {async propose(){calls++;throw Error("provider offline");}});
 assert.equal(x.status,"BLOCKED");assert.equal(x.reason,"PROVIDER_FAILURE");assert.equal(calls,1);
});
test("pre-cancel stops before provider execution",async()=>{
 let calls=0;const controller=new AbortController();controller.abort();
 const x=await run({signal:controller.signal},{async propose(){calls++;return {state:"PROPOSED",edits:[]};}});
 assert.equal(x.status,"CANCELLED");assert.equal(calls,0);
});
test("forged receipt is detectable",async()=>{
 const x=await run();assert.equal(verifyReceiptChain(x.events),true);
 const bad=structuredClone(x.events);bad[0].detail.base_sha="a".repeat(40);
 assert.equal(verifyReceiptChain(bad),false);
});
test("source fingerprint required",async()=>{
 const f=demoInput();f.contextLock.source_fingerprint="";
 await assert.rejects(runEngineeringCell({...f,executor:passingExecutor}),{code:"CONTEXT_STALE"});
});
test("digest canonicalization is independent of object key order",()=>{
 assert.equal(digest({a:1,b:2}),digest({b:2,a:1}));
});
test("rejects missing trusted Founder verification adapter",async()=>{
 const f=demoInput();delete f.trustedApprovalVerifier;
 await assert.rejects(runEngineeringCell({...f,executor:passingExecutor}),{code:"AUTHORIZATION_DENIED"});
});
test("rejects Founder data despite self-declared APPROVED if trusted adapter denies",async()=>{
 const f=demoInput();f.trustedApprovalVerifier=async()=>false;
 await assert.rejects(runEngineeringCell({...f,executor:passingExecutor}),{code:"AUTHORIZATION_DENIED"});
});
test("cancellation after provider proposal does not stage or promote candidate",async()=>{
 const f=demoInput();const controller=new AbortController();f.signal=controller.signal;
 const result=await runEngineeringCell({...f,executor:{async propose(){controller.abort();return {state:"PROPOSED",edits:[{path:"examples/hello.mjs",content:"export function hello(){}"}]};}}});
 assert.equal(result.status,"CANCELLED");assert.equal(result.checkpoint_handoff,null);
});
