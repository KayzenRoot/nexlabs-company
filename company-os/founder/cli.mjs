import { fileURLToPath } from "node:url";
import { createDashboardServer } from "./server.mjs";
const root = fileURLToPath(new URL("../../", import.meta.url));
const rawPort = process.env.PORT ?? "4173";
const port = Number(rawPort);
const host = process.env.HOST ?? "127.0.0.1";
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
if (!["127.0.0.1", "0.0.0.0"].includes(host)) throw new Error("Invalid HOST");
if (host === "0.0.0.0" && process.env.LOCAL_CONTAINER_DEMO !== "true")
  throw new Error("Wildcard bind requires explicitly isolated LOCAL_CONTAINER_DEMO=true");
const server = createDashboardServer({ repoRoot: root });
server.listen(port, host, () => {
  console.log("NexLabs Founder read-only local dashboard at http://127.0.0.1:" + port);
});
