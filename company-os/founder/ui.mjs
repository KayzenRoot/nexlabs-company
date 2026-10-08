const esc = (v) => String(v === null || v === undefined ? "Indisponível" : v)
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const unavailable = (entry) => entry?.state === "NOT_CONNECTED" ? "Não conectado" : "Indisponível";
const css = [
  ":root{color-scheme:dark;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;background:#080b10;color:#ecf2fa}",
  "*{box-sizing:border-box}body{margin:0;min-height:100vh;background:radial-gradient(circle at 82% 0%,#203042 0%,transparent 36%),#080b10}",
  ".shell{display:grid;grid-template-columns:228px minmax(0,1fr);min-height:100vh}",
  "aside{background:#0c1118;border-right:1px solid #23303d;padding:30px 19px;display:flex;flex-direction:column;gap:33px}",
  ".brand{font-size:21px;font-weight:800;letter-spacing:-.06em}.brand b{color:#7bdcef}.brand small{display:block;font-size:10px;letter-spacing:.24em;color:#7f91a5;font-weight:600;margin-top:8px}",
  ".navlabel{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#748597;padding-left:12px;margin-bottom:12px}",
  "nav p{margin:6px 0;padding:12px;border-radius:11px;color:#9cacc0;font-size:13px}.active{background:#1a303f;color:#a2eaf6!important;border:1px solid #2a4957}",
  ".foot{margin-top:auto;font-size:11px;line-height:1.7;color:#8495a6;border-top:1px solid #23303d;padding:18px 9px}",
  "main{max-width:1540px;width:100%;margin:auto;padding:36px clamp(18px,4vw,60px) 70px}",
  ".top{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:32px;flex-wrap:wrap}",
  ".eyebrow{font-size:11px;letter-spacing:.23em;color:#78bfcc;text-transform:uppercase;font-weight:700}",
  "h1{font-size:clamp(28px,3vw,42px);letter-spacing:-.04em;margin:9px 0;font-weight:760}",
  ".sub{font-size:13px;color:#90a2b5;line-height:1.6;margin:0}",
  ".status{font-size:11px;border:1px solid #345968;color:#9bdded;border-radius:999px;padding:9px 12px;background:#112431}",
  ".alert{background:#131f2a;border:1px solid #345162;border-radius:14px;padding:18px 20px;font-size:13px;color:#b6d3dc;margin-bottom:26px;line-height:1.6}",
  ".cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:22px 0 34px}",
  ".card,.panel{border:1px solid #253241;background:linear-gradient(140deg,#111a24,#0d131b);border-radius:16px}",
  ".card{padding:22px}.kicker{font-size:11px;color:#8ba0b5}.value{font-size:33px;letter-spacing:-.05em;font-weight:720;margin:11px 0 5px}.mini{font-size:11px;color:#6f899b}",
  ".sectionline{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin:30px 0 15px}h2{font-size:17px;letter-spacing:-.02em;margin:0}.small{font-size:11px;color:#8198ac}",
  ".grid{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:15px}",
  ".panel{padding:23px;overflow:auto}.panel h3{margin:0 0 20px;font-size:13px;color:#b9c9d9}",
  "table{width:100%;border-collapse:collapse;text-align:left;font-size:12px;min-width:460px}td,th{border-bottom:1px solid #24303b;padding:13px 8px;color:#afc0d0}th{font-size:10px;text-transform:uppercase;letter-spacing:.13em;color:#8092a5}",
  ".pill{display:inline-block;border-radius:99px;padding:5px 9px;color:#9cdecd;background:#18332c;font-size:10px}.pending{background:#2d291e;color:#e4c18a}",
  ".row{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid #24303b;padding:12px 0;font-size:12px}.row:last-child{border:0}.muted{color:#90a3b6}.code{font:11px ui-monospace,SFMono-Regular,Consolas,monospace;color:#9fcdda;overflow-wrap:anywhere}",
  ".bottom{font-size:11px;color:#7c90a4;line-height:1.8;margin-top:22px}",
  "@media(max-width:1100px){.cards{grid-template-columns:repeat(2,minmax(0,1fr))}.grid{grid-template-columns:1fr}}",
  "@media(max-width:700px){.shell{display:block}aside{display:none}main{padding:24px 16px}.cards{gap:10px}.card{padding:17px}.value{font-size:25px}}"
].join("");

export function renderDashboard(data) {
  const g = data.governance;
  const workRows = data.work.items.slice(-9).reverse().map(item =>
    `<tr><td class="code">${esc(item.id)}</td><td>#${esc(item.issue)}</td><td><span class="pill ${item.status.includes("NOT_ADMITTED") ? "pending" : ""}">${esc(item.status)}</span></td></tr>`
  ).join("");
  const metrics = [
    ["Execuções de agentes", data.operations.agentRuns],
    ["Aprovações operacionais", data.operations.approvals],
    ["Falhas em runtime", data.operations.failures],
    ["Incidentes", data.operations.incidents],
    ["Deploys", data.operations.deployments],
    ["Custos de IA", data.operations.costsUsd],
    ["Alertas operacionais", data.operations.alerts],
    ["Saúde dos serviços", data.operations.runtimeHealth]
  ].map(([title, entry]) =>
    `<div class="row"><span class="muted">${esc(title)}</span><span>${esc(unavailable(entry))}</span></div>`
  ).join("");
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>NexLabs | Founder Command Center</title><style>${css}</style></head>
<body><div class="shell"><aside aria-label="Navegação visual">
  <div class="brand">NEX<b>LABS</b><small>FOUNDER OS / LOCAL</small></div>
  <nav aria-label="Áreas do painel"><div class="navlabel">Company operations</div>
    <p class="active">◈ Visão geral</p><p>▦ Portfólio e projetos</p><p>◇ Agentes e execuções</p><p>▤ Governança / WOs</p><p>◷ Observabilidade</p>
  </nav>
  <div class="foot">Somente leitura<br>Sem comandos ou aprovação remota<br>GEF ${esc(data.company.gefVersion)}</div>
</aside><main>
  <header class="top"><div><div class="eyebrow">NexLabs Technology / Company OS</div>
    <h1>Founder Command Center</h1>
    <p class="sub">Visibilidade operacional, evidências e autoridade. Primeira implementação local.</p></div>
    <span class="status">● SNAPSHOT GIT • NÃO AO VIVO</span></header>
  <div class="alert" role="status"><strong>Estado demonstrativo e verificável.</strong>
    Os números abaixo vêm dos documentos versionados de engenharia. Execuções de agentes, aprovações, finanças e serviços
    ainda não estão conectados. “Não conectado” não significa zero, saudável ou aprovado.</div>
  <section aria-label="Indicadores do repositório" class="cards">
    <article class="card"><div class="kicker">Work Orders registradas</div><div class="value">${esc(data.work.totalRegistered)}</div><div class="mini">Fonte: registry no repositório</div></article>
    <article class="card"><div class="kicker">Concluídas / mergeadas</div><div class="value">${esc(data.work.approvedMerged)}</div><div class="mini">Estado declarado no registry</div></article>
    <article class="card"><div class="kicker">Work Orders admitidas</div><div class="value">${esc(data.work.admitted)}</div><div class="mini">Máximo permitido: 1</div></article>
    <article class="card"><div class="kicker">HIGH + CRITICAL conhecidos</div><div class="value">${esc(g.knownHighInCheckpoint + g.knownCriticalInCheckpoint)}</div><div class="mini">Somente do checkpoint, não de sistemas externos</div></article>
  </section>
  <div class="sectionline"><h2>Governança e continuidade</h2><span class="small">Fonte canônica local • GEF</span></div>
  <section class="grid" aria-label="Governança">
    <article class="panel"><h3>Work Orders recentes</h3><table><thead><tr><th>Work Order</th><th>Issue</th><th>Situação</th></tr></thead>
      <tbody>${workRows}</tbody></table></article>
    <article class="panel"><h3>Checkpoint atual</h3>
      <div class="row"><span class="muted">Versão alvo</span><strong>${esc(data.company.targetVersion)}</strong></div>
      <div class="row"><span class="muted">Última WO concluída</span><span class="code">${esc(g.completedThrough)}</span></div>
      <div class="row"><span class="muted">WO ativa</span><span class="code">${esc(g.activeWorkOrder)}</span></div>
      <div class="row"><span class="muted">Estado</span><span class="code">${esc(data.company.checkpointStatus)}</span></div>
      <div class="row"><span class="muted">Próxima ação</span><span class="code">${esc(g.nextLegalAction)}</span></div>
    </article>
  </section>
  <div class="sectionline"><h2>Operação e observabilidade</h2><span class="small">Sem integrações de produção</span></div>
  <section class="grid" aria-label="Observabilidade">
    <article class="panel"><h3>Sinais operacionais</h3>${metrics}</article>
    <article class="panel"><h3>Limites de confiança</h3>
      <div class="row"><span class="muted">Origem</span><span>Snapshot de arquivos Git</span></div>
      <div class="row"><span class="muted">PostgreSQL canônico</span><span>Não conectado</span></div>
      <div class="row"><span class="muted">Integração GitHub ao vivo</span><span>Não conectado</span></div>
      <div class="row"><span class="muted">Ações do Founder</span><span>Bloqueadas</span></div>
      <div class="row"><span class="muted">Ambiente de produção</span><span>Não implantado</span></div>
    </article>
  </section>
  <footer class="bottom">Fontes: ${data.trust.sources.map(esc).join(" · ")}. Nenhum controle de aprovação, execução ou mutação está habilitado.</footer>
</main></div></body></html>`;
}
