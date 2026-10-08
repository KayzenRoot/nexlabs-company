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
