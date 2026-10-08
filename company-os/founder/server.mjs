import { createServer as httpServer } from "node:http";
import { loadOverview } from "./overview.mjs";
import { renderDashboard } from "./ui.mjs";

const securityHeaders = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
};
export function createDashboardServer({ repoRoot, overviewLoader = () => loadOverview(repoRoot), offlineEvidence = null } = {}) {
  if (typeof repoRoot !== "string" || !repoRoot) throw new TypeError("repoRoot required");
  return httpServer(async (req, res) => {
    const respond = (status, contentType, body, more = {}) => {
      res.writeHead(status, { ...securityHeaders, "Content-Type": contentType, ...more });
      res.end(body);
    };
    if (!req.headers.host || !/^(localhost|127\.0\.0\.1|\[::1\])(?::\d{1,5})?$/.test(req.headers.host)) {
      respond(403, "application/json; charset=utf-8", '{"error":"HOST_DENIED"}'); return;
    }
    if (req.method !== "GET") {
      respond(405, "application/json; charset=utf-8", '{"error":"READ_ONLY"}', { Allow: "GET" }); return;
    }
    if (typeof req.url !== "string" || req.url.length > 2048) {
      respond(400, "application/json; charset=utf-8", '{"error":"INVALID_REQUEST"}'); return;
    }
    let pathname;
    try { pathname = new URL(req.url, "http://localhost").pathname; }
    catch { respond(400, "application/json; charset=utf-8", '{"error":"INVALID_REQUEST"}'); return; }
    if (pathname === "/healthz") {
      respond(200, "application/json; charset=utf-8", JSON.stringify({ http: "LIVE", runtimeDependencies: "NOT_CHECKED", authorizedActions: false }));
      return;
    }
    if (pathname === "/v1/offline-cell-evidence") {
      if (!offlineEvidence || offlineEvidence.state !== "OBSERVED_OFFLINE_FIXTURE") {
        respond(503, "application/json; charset=utf-8", '{"error":"OFFLINE_EVIDENCE_UNAVAILABLE"}');
        return;
      }
      respond(200, "application/json; charset=utf-8", JSON.stringify(offlineEvidence)); return;
    }
    if (pathname !== "/" && pathname !== "/v1/overview") {
      respond(404, "application/json; charset=utf-8", '{"error":"NOT_FOUND"}'); return;
    }
    try {
      const snapshot = await overviewLoader();
      if (pathname === "/v1/overview") respond(200, "application/json; charset=utf-8", JSON.stringify(snapshot));
      else respond(200, "text/html; charset=utf-8", renderDashboard({ ...snapshot, offlineCell: offlineEvidence }));
    } catch {
      respond(503, "application/json; charset=utf-8", '{"error":"SOURCE_UNAVAILABLE","live":false}');
    }
  });
}
