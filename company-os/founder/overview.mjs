import { readFile } from "node:fs/promises";
import { join } from "node:path";

export class SnapshotError extends Error {
  constructor(code) { super(code); this.name = "SnapshotError"; this.code = code; }
}
const requiredString = (v) => typeof v === "string" && v.length > 0 && v.length <= 256;
const WO = /^NXL-COMPANY-WO-\d{3}$/;
const STATES = new Set(["NOT_ADMITTED", "ADMITTED / IN_PROGRESS", "APPROVED / MERGED", "PLANNED / NOT_ADMITTED"]);
export function parseRegistry(markdown) {
  if (typeof markdown !== "string" || markdown.length > 120_000) throw new SnapshotError("REGISTRY_INVALID");
  const rows = [];
  for (const line of markdown.split(/\r?\n/)) {
    if (!line.startsWith("| NXL-COMPANY-WO-")) continue;
    const match = line.match(/^\|\s*(NXL-COMPANY-WO-\d{3})\s*\|\s*#(\d+)\s*\|\s*([^|]+?)\s*\|/);
    if (!match || !WO.test(match[1]) || !STATES.has(match[3].trim())) throw new SnapshotError("REGISTRY_INVALID");
    rows.push({ id: match[1], issue: Number(match[2]), status: match[3].trim() });
  }
  if (!rows.length || new Set(rows.map(x => x.id)).size !== rows.length) throw new SnapshotError("REGISTRY_INVALID");
  return rows;
}

export function projectOverview(checkpoint, registryMarkdown) {
  if (!checkpoint || checkpoint.schemaVersion !== 1 || checkpoint.project !== "NexLabs Company" ||
      !requiredString(checkpoint.status) || !requiredString(checkpoint.gefVersion) ||
      !requiredString(checkpoint.completedThroughWorkOrder)) throw new SnapshotError("CHECKPOINT_INVALID");
  const workOrders = parseRegistry(registryMarkdown);
  const active = checkpoint.activeWorkOrder ?? null;
  const admitted = workOrders.filter(x => x.status === "ADMITTED / IN_PROGRESS");
  if (admitted.length > 1 || !workOrders.some(x =>
      x.id === checkpoint.completedThroughWorkOrder && x.status === "APPROVED / MERGED"))
    throw new SnapshotError("CHECKPOINT_REGISTRY_CONFLICT");
  if (active !== null && (!WO.test(active) || admitted.length !== 1 ||
      admitted[0].id !== active || admitted[0].issue !== checkpoint.activeIssue))
    throw new SnapshotError("CHECKPOINT_REGISTRY_CONFLICT");
  if (active === null && admitted.length !== 0)
    throw new SnapshotError("CHECKPOINT_REGISTRY_CONFLICT");
  if (!Number.isInteger(checkpoint.knownHigh) || checkpoint.knownHigh < 0 ||
      !Number.isInteger(checkpoint.knownCritical) || checkpoint.knownCritical < 0)
    throw new SnapshotError("CHECKPOINT_INVALID");

  const notConnected = () => ({ state: "NOT_CONNECTED", count: null, source: null });
  return {
    schemaVersion: 1,
    trust: { mode: "LOCAL_ENGINEERING_SNAPSHOT", liveOperationalData: false,
      canonicalRuntimePersistence: "NOT_CONNECTED",
      sources: [".engineering/CHECKPOINT.json", ".engineering/WORK-ORDER-REGISTRY.md"] },
    company: { name: checkpoint.project, targetVersion: checkpoint.versionTarget ?? "UNKNOWN",
      gefVersion: checkpoint.gefVersion, checkpointStatus: checkpoint.status },
    governance: { completedThrough: checkpoint.completedThroughWorkOrder,
      activeWorkOrder: active, activeIssue: checkpoint.activeIssue ?? null,
      admissionBaseSha: checkpoint.admissionBaseSha ?? null,
      nextLegalAction: checkpoint.nextLegalAction ?? "UNKNOWN",
      knownHighInCheckpoint: checkpoint.knownHigh, knownCriticalInCheckpoint: checkpoint.knownCritical },
    work: { totalRegistered: workOrders.length,
      approvedMerged: workOrders.filter(x => x.status === "APPROVED / MERGED").length,
      admitted: admitted.length, items: workOrders },
    operations: { agentRuns: notConnected(), approvals: notConnected(),
      incidents: notConnected(), deployments: notConnected(), costsUsd: { state: "NOT_CONNECTED", value: null },
      alerts: notConnected(), runtimeHealth: { state: "NOT_CONNECTED", healthy: null },
      liveProjects: notConnected(), failures: notConnected() }
  };
}

export async function loadOverview(root, readText = (path) => readFile(path, "utf8")) {
  const paths = [".engineering/CHECKPOINT.json", ".engineering/WORK-ORDER-REGISTRY.md"];
  try {
    const [cp, registry] = await Promise.all(paths.map(async path => {
      const content = await readText(join(root, path));
      if (typeof content !== "string" || Buffer.byteLength(content) > 120_000) throw new SnapshotError("SOURCE_TOO_LARGE");
      return content;
    }));
    return projectOverview(JSON.parse(cp), registry);
  } catch (error) {
    if (error instanceof SnapshotError) throw error;
    throw new SnapshotError("SOURCE_UNAVAILABLE");
  }
}
