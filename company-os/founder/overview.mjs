import { readFile } from "node:fs/promises";
import { join } from "node:path";

export class SnapshotError extends Error {
  constructor(code) { super(code); this.name = "SnapshotError"; this.code = code; }
}
const requiredString = (v) => typeof v === "string" && v.length > 0 && v.length <= 256;
const WO = /^NXL-COMPANY-WO-\d{3}$/;
const STATES = new Set(["NOT_ADMITTED", "ADMITTED / IN_PROGRESS", "APPROVED / MERGED", "PLANNED / NOT_ADMITTED", "BLOCKED"]);
export function parseRegistry(markdown) {
  if (typeof markdown !== "string" || markdown.length > 120_000) throw new SnapshotError("REGISTRY_INVALID");
  const rows = [];
  for (const line of markdown.split(/\r?\n/)) {
    if (!line.startsWith("| NXL-COMPANY-WO-")) continue;
    const columns = line.split("|").slice(1, -1).map(value => value.trim());
    const legacy = columns.length === 3 || columns.length === 4;
    const [id, issueRef, rawStatus, rawReason] = legacy
      ? [columns[0], columns[1], columns[2], "—"]
      : columns;
    const match = typeof issueRef === "string" ? issueRef.match(/^#(\d+)$/) : null;
    const status = rawStatus?.trim();
    const blockedReason = rawReason?.trim();
    if ((columns.length !== 3 && columns.length !== 4 && columns.length !== 5) ||
        !match || !WO.test(id) || !STATES.has(status))
      throw new SnapshotError("REGISTRY_INVALID");
    if ((status === "BLOCKED" && (id !== "NXL-COMPANY-WO-022" || Number(match[1]) !== 23 ||
        blockedReason !== "AWAITING_REMEDIATION")) ||
        (status !== "BLOCKED" && blockedReason !== "—")) throw new SnapshotError("REGISTRY_INVALID");
    rows.push({ id, issue: Number(match[1]), status, blockedReason });
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
  const wo022 = workOrders.find(x => x.id === "NXL-COMPANY-WO-022");
  if (wo022?.status === "BLOCKED") {
    const d = checkpoint.wo022AdministrativeDisposition;
    if (!d || d.schemaVersion !== 1 || d.state !== "BLOCKED" ||
        d.blockedReason !== "AWAITING_REMEDIATION" ||
        d.releaseVerdict !== "RELEASE_NOT_APPROVED" || d.founderReleaseAcceptance !== "PENDING")
      throw new SnapshotError("CHECKPOINT_REGISTRY_CONFLICT");
  } else if (checkpoint.wo022AdministrativeDisposition !== undefined) {
    throw new SnapshotError("CHECKPOINT_REGISTRY_CONFLICT");
  }
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
