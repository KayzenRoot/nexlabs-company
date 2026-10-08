import test from "node:test";
import assert from "node:assert/strict";
import { request } from "node:http";
import { fileURLToPath } from "node:url";
import { loadOverview, parseRegistry, projectOverview, SnapshotError } from "./overview.mjs";
import { renderDashboard } from "./ui.mjs";
import { createDashboardServer } from "./server.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const registry = [
  "| NXL-COMPANY-WO-019 | #20 | APPROVED / MERGED | `feat/19` |",
  "| NXL-COMPANY-WO-020 | #21 | ADMITTED / IN_PROGRESS | `feat/20` |",
  "| NXL-COMPANY-WO-021 | #22 | NOT_ADMITTED | TBD |"
].join("\n");
const checkpoint = {
  schemaVersion: 1, project: "NexLabs Company", versionTarget: "v0.1", gefVersion: "1.1.2",
  status: "WO_020_ADMITTED", completedThroughWorkOrder: "NXL-COMPANY-WO-019",
  activeWorkOrder: "NXL-COMPANY-WO-020", activeIssue: 21, knownCritical: 0, knownHigh: 0,
  nextLegalAction: "REVIEW_WO_020"
};
test("read current canonical checkpoint/registry consistently", async () => {
  const view = await loadOverview(root);
  assert.equal(view.company.gefVersion, "1.1.2");
  assert.equal(view.governance.activeWorkOrder, "NXL-COMPANY-WO-020");
  assert.equal(view.work.admitted, 1);
  assert.ok(view.work.approvedMerged >= 18);
  assert.equal(view.trust.liveOperationalData, false);
  for (const value of Object.values(view.operations)) {
    assert.equal(value.state, "NOT_CONNECTED");
    assert.equal(value.count ?? value.value ?? value.healthy ?? null, null);
  }
});
test("registry rejects duplicate, unknown state and empty registry", () => {
  assert.throws(() => parseRegistry(""), SnapshotError);
  assert.throws(() => parseRegistry(registry + "\n" + registry), SnapshotError);
  assert.throws(() => parseRegistry("| NXL-COMPANY-WO-019 | #20 | COMPLETE |"), SnapshotError);
});
test("checkpoint must match exactly one admitted work order", () => {
  assert.throws(() => projectOverview({ ...checkpoint, activeWorkOrder: null }, registry), /CHECKPOINT_REGISTRY_CONFLICT/);
  assert.throws(() => projectOverview({ ...checkpoint, activeWorkOrder: "NXL-COMPANY-WO-999" }, registry), /CHECKPOINT_REGISTRY_CONFLICT/);
  assert.throws(() => projectOverview({ ...checkpoint, knownHigh: -1 }, registry), /CHECKPOINT_INVALID/);
  assert.throws(() => projectOverview({ ...checkpoint, activeIssue: 20 }, registry), /CHECKPOINT_REGISTRY_CONFLICT/);
  assert.throws(() => projectOverview({ ...checkpoint, completedThroughWorkOrder: "NXL-COMPANY-WO-018" }, registry), /CHECKPOINT_REGISTRY_CONFLICT/);
  const secondAdmitted = registry.replace("| NXL-COMPANY-WO-021 | #22 | NOT_ADMITTED |",
    "| NXL-COMPANY-WO-021 | #22 | ADMITTED / IN_PROGRESS |");
  assert.throws(() => projectOverview(checkpoint, secondAdmitted), /CHECKPOINT_REGISTRY_CONFLICT/);
  assert.equal(projectOverview(checkpoint, registry).work.totalRegistered, 3);
});
test("markup escapes untrusted checkpoint data", () => {
  const snapshot = projectOverview({ ...checkpoint, status: "<script>alert('x')</script>" }, registry);
  const html = renderDashboard(snapshot);
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("Não conectado"));
});
async function onPort(server, fn) {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  try { return await fn(server.address().port); }
  finally { await new Promise(resolve => server.close(resolve)); }
}
function http(port, path, method = "GET", host = "127.0.0.1") {
  return new Promise((resolve, reject) => {
    const req = request({ hostname: "127.0.0.1", port, path, method, headers: { Host: host } }, res => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", chunk => { body += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, body, headers: res.headers }));
    });
    req.on("error", reject); req.end();
  });
}
test("HTTP local overview, CSP, HEAD denied and no mutation", async () => {
  const server = createDashboardServer({ repoRoot: root, overviewLoader: async () => projectOverview(checkpoint, registry) });
  await onPort(server, async port => {
    const html = await http(port, "/");
    assert.equal(html.status, 200);
    assert.match(html.body, /Founder Command Center/);
    assert.match(html.headers["content-security-policy"], /default-src 'none'/);
    assert.equal(html.headers["cache-control"], "no-store");
    const json = await http(port, "/v1/overview");
    assert.equal(json.status, 200);
    assert.equal(JSON.parse(json.body).operations.agentRuns.count, null);
    const health = await http(port, "/healthz");
    assert.equal(JSON.parse(health.body).runtimeDependencies, "NOT_CHECKED");
    assert.equal((await http(port, "/v1/overview", "POST")).status, 405);
    assert.equal((await http(port, "/v1/overview", "HEAD")).status, 405);
    assert.equal((await http(port, "/v1/approvals")).status, 404);
    assert.equal((await http(port, "/v1/overview", "GET", "evil.example")).status, 403);
  });
});
test("unknown source state fails closed instead of returning healthy zero", async () => {
  const server = createDashboardServer({ repoRoot: root, overviewLoader: async () => { throw new Error("missing"); } });
  await onPort(server, async port => {
    const response = await http(port, "/");
    assert.equal(response.status, 503);
    assert.equal(JSON.parse(response.body).live, false);
    assert.ok(!response.body.includes("missing"));
  });
});
