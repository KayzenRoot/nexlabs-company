import {runDemo} from "./fixtures.mjs";
import {verifyReceiptChain} from "./engine.mjs";
if(process.argv[2]!=="demo"){console.error("Usage: node company-os/cell/cli.mjs demo");process.exitCode=2;}
else {
  const result=await runDemo();
  const safe={status:result.status,workOrder:result.workOrder.key,attempts:result.attempts,receipt_integrity:verifyReceiptChain(result.events),event_types:result.events.map(e=>e.type),candidate_digest:result.checkpoint_handoff?.candidate_digest,checkpoint_handoff:result.checkpoint_handoff?.state,merge_authorized:result.checkpoint_handoff?.merge_authorized};
  console.log(JSON.stringify(safe,null,2));
  if(result.status!=="READY_FOR_GOVERNED_PR"||!safe.receipt_integrity)process.exitCode=1;
}
