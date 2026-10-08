import test from "node:test";
import assert from "node:assert/strict";
import { runDemo } from "../cell/fixtures.mjs";
import { captureOfflineCellEvidence, projectOfflineCellEvidence, OfflineEvidenceError } from "./offline-evidence.mjs";

test("actual offline cell receipts supply measured run, failure and correction evidence", async () => {
  const actual = await runDemo();
  const view = projectOfflineCellEvidence(actual);
  assert.equal(view.receiptIntegrity, "VERIFIED_SHA256_CHAIN");
  assert.equal(view.state, "OBSERVED_OFFLINE_FIXTURE");
  assert.equal(view.measured.offlineRuns, 1);
  assert.equal(view.measured.attemptedProposals, 2);
  assert.equal(view.measured.qaFailures, 1);
  assert.equal(view.measured.correctionsRequired, 1);
  assert.equal(view.measured.passedQa, 1);
  assert.equal(view.founderApproval, "TEST_FIXTURE_VERIFIER_ONLY");
  assert.equal(view.realFounderIdentityVerified, false);
  assert.equal(view.externalAgentTelemetry, "NOT_CONNECTED");
  assert.equal(view.mergeAuthorized, false);
  assert.equal(view.checkpointPromoted, false);
  assert.equal(view.events.at(-1).hash, view.evidenceHead);
  assert.ok(view.events.every(e => Object.keys(e).sort().join(",") === "hash,sequence,type"));
  assert.ok(!JSON.stringify(view).includes("staged_files"));
  assert.ok(!JSON.stringify(view).includes("example/hello.mjs"));
});
test("no fabricated success if chain is tampered, missing, contradictory or stale", async () => {
  const original = await runDemo();
  const mutate = change => { const candidate = structuredClone(original); change(candidate); return candidate; };
  const cases = [
    mutate(x => x.events[1].type = "FORGED"),
    mutate(x => x.events[1].hash = "0".repeat(64)),
    mutate(x => x.events.pop()),
    mutate(x => x.status = "APPROVED"),
    mutate(x => x.checkpoint_handoff.merge_authorized = true),
    mutate(x => x.events = []),
    mutate(x => x.qa.passed = false)
  ];
  for (const bad of cases) assert.throws(() => projectOfflineCellEvidence(bad), OfflineEvidenceError);
});
test("boot capture really invokes existing offline deterministic cell", async () => {
  const observed = await captureOfflineCellEvidence();
  assert.equal(observed.runStatus, "READY_FOR_GOVERNED_PR");
  assert.ok(/^[a-f0-9]{64}$/.test(observed.evidenceHead));
});


import { createDashboardServer } from "./server.mjs";
import { renderDashboard } from "./ui.mjs";
import { fileURLToPath } from "node:url";
import { request } from "node:http";
const repoRoot = fileURLToPath(new URL("../../", import.meta.url));

async function onServer(server, fn) {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  try { await fn(server.address().port); }
  finally { await new Promise(resolve => server.close(resolve)); }
}
function get(port, path, method = "GET", host = "127.0.0.1") {
  return new Promise((resolve,reject) => {
    const req=request({hostname:"127.0.0.1",port,path,method,headers:{Host:host}}, res => {
      let body="";
      res.setEncoding("utf8");
      res.on("data",chunk=>body+=chunk);
      res.on("end",()=>resolve({status:res.statusCode,headers:res.headers,body}));
    });
    req.on("error",reject); req.end();
  });
}

test("local HTTP exposes verified sanitized fixture evidence, no external telemetry", async () => {
  const observed = await captureOfflineCellEvidence();
  const server=createDashboardServer({repoRoot,offlineEvidence:observed});
  await onServer(server, async port => {
    const result=await get(port,"/v1/offline-cell-evidence");
    assert.equal(result.status,200);
    const data=JSON.parse(result.body);
    assert.equal(data.measured.qaFailures,1);
    assert.equal(data.mergeAuthorized,false);
    assert.equal(data.externalAgentTelemetry,"NOT_CONNECTED");
    assert.equal(data.realFounderIdentityVerified,false);
    assert.equal(result.headers["cache-control"],"no-store");
    assert.match(result.headers["content-security-policy"], /default-src 'none'/);
    assert.ok(!result.body.includes("staged_files"));
    const page=await get(port,"/");
    assert.equal(page.status,200);
    assert.match(page.body,/Falhas QA observadas/);
    assert.match(page.body,/NÃO verificada \(fixture\)/);
    const ext=JSON.parse((await get(port,"/v1/overview")).body);
    assert.equal(ext.operations.agentRuns.count,null);
    assert.equal(ext.operations.approvals.count,null);
    assert.equal((await get(port,"/v1/offline-cell-evidence","POST")).status,405);
    assert.equal((await get(port,"/v1/offline-cell-evidence","GET","evil.example")).status,403);
  });
});
test("absence of offline evidence fails closed and cannot report zero", async () => {
  const server=createDashboardServer({repoRoot});
  await onServer(server,async port => {
    const r=await get(port,"/v1/offline-cell-evidence");
    assert.equal(r.status,503);
    assert.match(r.body,/OFFLINE_EVIDENCE_UNAVAILABLE/);
    const page=await get(port,"/");
    assert.equal(page.status,200);
    assert.match(page.body,/Não há evidência verificável/);
  });
});
test("HTML encoder escapes content rather than executing injected run identifiers", async () => {
  const {projectOverview}=await import("./overview.mjs");
  const snapshot=projectOverview({
    schemaVersion:1,project:"NexLabs Company",gefVersion:"1.1.2",
    completedThroughWorkOrder:"NXL-COMPANY-WO-021",activeWorkOrder:null,knownHigh:0,knownCritical:0,status:"APPROVED"
  }, "| NXL-COMPANY-WO-021 | #22 | APPROVED / MERGED |");
  const malicious={...(await captureOfflineCellEvidence()),evidenceHead:'<script>alert(1)</script>'};
  const html=renderDashboard({...snapshot,offlineCell:malicious});
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("&lt;script&gt;"));
});
