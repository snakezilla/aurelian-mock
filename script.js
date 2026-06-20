const collectionsData = [
  { month: "Jan", value: 118000 },
  { month: "Feb", value: 124000 },
  { month: "Mar", value: 131000 },
  { month: "Apr", value: 128000 },
  { month: "May", value: 138000 },
  { month: "Jun", value: 142300 }
];

const projData = [
  { month: "Jan", value: 118000, type: "actual" },
  { month: "Feb", value: 124000, type: "actual" },
  { month: "Mar", value: 131000, type: "actual" },
  { month: "Apr", value: 128000, type: "actual" },
  { month: "May", value: 138000, type: "actual" },
  { month: "Jun", value: 142300, type: "actual" },
  { month: "Jul", value: 148000, type: "forecast" },
  { month: "Aug", value: 155000, type: "forecast" },
  { month: "Sep", value: 162000, type: "forecast" }
];

const payers = [
  { name: "Medicare", collected: 68200, denial: "4.2%", avgPay: "19d" },
  { name: "Aetna", collected: 38100, denial: "11.4%", avgPay: "38d" },
  { name: "United", collected: 22400, denial: "9.1%", avgPay: "43d" },
  { name: "BCBS", collected: 13600, denial: "6.8%", avgPay: "28d" }
];

const clinicians = [
  { name: "Dr. Lee", collections: 118000, revVisit: "$192", denial: "9.8%" },
  { name: "Dr. Khasan", collections: 94200, revVisit: "$204", denial: "3.1%" },
  { name: "Dr. Mirza", collections: 72100, revVisit: "$178", denial: "5.4%" }
];

const aiWeekSummary = [
  { text: "47 claims paid, 23 submitted, 4 denied this month", dot: "ok" },
  { text: "AI auto-coded 31 encounters — 0 payer rejections", dot: "ok" },
  { text: "Dr. Lee documentation pattern flagged — 3 missing depth notes", dot: "warning" },
  { text: "Aetna appeal packet drafted with chart evidence attached", dot: "info" },
  { text: "United payment velocity drifting +8 days on mobile claims", dot: "warning" }
];

const actionItems = [
  { title: "Aetna debridement appeal", meta: "M. Patel batch · Due today", value: "$12.4K", bcls: "badge-red", modal: "aetna-appeal" },
  { title: "BCBS graft invoice hold", meta: "R. Jones skin substitute", value: "$1,240", bcls: "badge-yellow", modal: "bcbs-hold" },
  { title: "United payment slowdown", meta: "Mobile clinic claims drifting +8d", value: "$18.7K", bcls: "badge-blue", modal: "united-slow" },
  { title: "Dr. Lee documentation pattern", meta: "3 missing depth notes in 14 days", value: "$9.8K", bcls: "badge-yellow", modal: "lee-pattern" }
];

const ledgerData = [
  { date: "Jun 19", entry: "Medicare EFT", source: "18 claims matched", amount: "$18,420", status: "Reconciled", bcls: "badge-green" },
  { date: "Jun 18", entry: "Aetna partial payment", source: "4 partial matches", amount: "$8,910", status: "Review", bcls: "badge-yellow" },
  { date: "Jun 17", entry: "Payroll reserve transfer", source: "Scheduled", amount: "-$58,000", status: "Reserved", bcls: "badge-green" },
  { date: "Jun 15", entry: "BCBS payment", source: "7 claims matched", amount: "$4,320", status: "Reconciled", bcls: "badge-green" },
  { date: "Jun 14", entry: "United EFT", source: "5 claims matched", amount: "$6,890", status: "Reconciled", bcls: "badge-green" }
];

const scenarios = [
  { name: "Hire one NP", impact: "Cash low $301K", cls: "neg" },
  { name: "Reduce Aetna denials to 7%", impact: "+$19K recovery", cls: "pos" },
  { name: "Advance eligible AR", impact: "$74K today", cls: "pos" }
];

const modalData = {
  advance: {
    kicker: "Claim advance", title: "$74,000 available today",
    desc: "Underwritten from submitted claims, payer velocity, and denial risk. Not a loan — settled when claims pay.",
    stats: [["Eligible AR", "$112,000"], ["Expected collection", "91%"], ["Median payment", "34 days"], ["Est. fee", "$1,180 (1.6%)"]],
    trail: [{ t: "Submitted claims scored" }, { t: "Denied claims excluded" }, { t: "Payer velocity applied" }, { t: "Terms ready for review", s: "pending" }],
    action: "simAdvance"
  },
  "aetna-appeal": {
    kicker: "Claim record", title: "M. Patel · Aetna debridement",
    desc: "Aetna denied for missing depth documentation. AI found wound measurement and prior auth in the chart, then drafted an appeal packet.",
    stats: [["Batch exposure", "$12,400"], ["Appeal win rate", "62%"], ["Payer", "Aetna"], ["Deadline", "Today"]],
    trail: [{ t: "Visit completed by Dr. Lee" }, { t: "99214 + 11042 submitted via Waystar" }, { t: "Aetna denial received" }, { t: "Wound depth evidence found in chart" }, { t: "NCCI edit check passed" }, { t: "Appeal draft generated", s: "pending" }],
    action: "approveAppeal"
  },
  "bcbs-hold": {
    kicker: "Claim record", title: "R. Jones · BCBS graft invoice",
    desc: "BCBS holding the claim until graft invoice evidence is attached. Common for skin-substitute procedures.",
    stats: [["Amount", "$1,240"], ["Status", "Invoice hold"], ["Code", "15271"], ["ETA", "21 days"]],
    trail: [{ t: "Chart signed" }, { t: "Skin substitute code reviewed" }, { t: "NCCI check passed" }, { t: "Payer documentation hold", s: "pending" }],
    action: null
  },
  "united-slow": {
    kicker: "Payer record", title: "United payment slowdown",
    desc: "United stretched payment velocity from 35 to 43 days on mobile clinic claims. Treasury timing risk, not a denial.",
    stats: [["Avg pay", "43 days"], ["Drift", "+8 days"], ["Denial rate", "9.1%"], ["Exposure", "$18,700"]],
    trail: [{ t: "Slowdown concentrated in mobile claims" }, { t: "No new denials detected" }, { t: "Forecast applies payer timing discount" }],
    action: null
  },
  "lee-pattern": {
    kicker: "Clinician economics", title: "Dr. Lee · Documentation pattern",
    desc: "Dr. Lee has high facility-round volume but above-baseline documentation denials. Revenue-quality issue, not HR.",
    stats: [["Collections", "$118,000"], ["Denial rate", "9.8%"], ["Rev / visit", "$192"], ["Open AR", "$154,000"]],
    trail: [{ t: "Facility rounds are productive" }, { t: "Repeat missing-depth denials (3 in 14d)" }, { t: "Addendum prompts reduce appeal lag" }, { t: "Pattern alert sent to billing lead", s: "pending" }],
    action: null
  }
};

const chatAnswers = new Map([
  ["Why is money stuck?",
    "Three places:\n\n1. Aetna documentation denials — $12.4K in appealed debridement claims. AI found the wound depth evidence in the chart. Win probability: 62%. Approving the appeal today is your highest-leverage action.\n\n2. BCBS graft invoice hold — $1,240 waiting on skin-substitute invoice evidence. Documentation task, not clinical.\n\n3. United payment slowdown — $18.7K in mobile clinic claims where United stretched payment from 35 to 43 days. Treasury timing, not a denial.\n\nTotal stuck: $32.3K. Approving the Aetna appeal unlocks the largest portion."],
  ["Can we hire another NP?",
    "Based on current collections and AR: yes, if facility volume increases.\n\nHiring one NP at $145K/yr adds ~212 visits per quarter. At your revenue-per-visit of $192, that’s $40.7K quarterly gross. After payroll and overhead, cash low stays at $301K — above your $82K minimum reserve.\n\nCaveat: this model excludes the Aetna recovery. Approving that appeal first improves the cash low to $308K.\n\nConfidence: Medium. Uses your payer velocity and denial rates but doesn’t account for NP ramp-up time."],
  ["Which payer hurts cash most?",
    "Two different answers:\n\nUnited hurts timing most. Payment velocity drifted from 35 to 43 days (+8d) on mobile clinic claims. $18.7K arriving later than expected. This is treasury risk — the money is coming, just slower.\n\nAetna hurts recoverability most. 11.4% denial rate, concentrated in debridement documentation denials. The $12.4K appeal batch is the highest-value recovery action in the book. Aetna has a 62% appeal win rate on wound care, so the path is viable.\n\nIf I had to pick one action: approve the Aetna appeal."],
  ["What did Dr. Lee collect this quarter?",
    "Dr. Lee collected $118,000 this quarter across facility rounds.\n\nStrengths: Highest visit volume among your clinicians. $192 revenue per visit, above practice average ($178).\n\nConcern: 9.8% denial rate, concentrated in missing wound-depth documentation. 3 claims in the last 14 days had the same issue. AI flagged it and can send addendum prompts automatically.\n\nImpact: Fixing the documentation pattern would recover approximately $11.6K annually in avoided denials."]
]);

const suggestedQs = [...chatAnswers.keys()];

const pages = {
  home: ["Home", "Northlake Wound Care"],
  revenue: ["Revenue", "Practice performance · This month"],
  cash: ["Cash", "Stripe Treasury · Accounts"],
  advisor: ["Advisor", "AI financial analyst"]
};

let state = { view: "home", approved: false };

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function fmt(n) {
  return n >= 1000 ? "$" + (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K" : "$" + n.toLocaleString();
}
function fmtFull(n) { return "$" + n.toLocaleString(); }

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2800);
}

function route(view) {
  const key = pages[view] ? view : "home";
  $$(".view").forEach((v) => v.classList.toggle("active", v.dataset.view === key));
  $$(".nav-link").forEach((l) => l.classList.toggle("active", l.dataset.route === key));
  $("#pageTitle").textContent = pages[key][0];
  $("#pageCtx").textContent = pages[key][1];
  state.view = key;
  if (location.hash !== "#" + key) history.replaceState(null, "", "#" + key);
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

function openModal(key) {
  const m = modalData[key];
  if (!m) return;
  $("#modalKicker").textContent = m.kicker;
  $("#modalTitle").textContent = m.title;

  const body = $("#modalBody");
  body.replaceChildren();

  const desc = el("p", "modal-desc", m.desc);
  body.appendChild(desc);

  const grid = el("div", "modal-stats");
  m.stats.forEach(([label, value]) => {
    const stat = el("div", "mstat");
    stat.appendChild(el("div", "mstat-label", label));
    stat.appendChild(el("div", "mstat-value", value));
    grid.appendChild(stat);
  });
  body.appendChild(grid);

  if (m.trail) {
    const ul = el("ul", "trail");
    m.trail.forEach((item) => {
      const li = el("li", item.s || "", item.t);
      ul.appendChild(li);
    });
    body.appendChild(ul);
  }

  if (m.action === "approveAppeal" && !state.approved) {
    const btn = el("button", "btn btn-primary", "Approve appeal");
    btn.style.cssText = "width:100%;margin-top:16px";
    btn.addEventListener("click", approveAppeal);
    body.appendChild(btn);
  } else if (m.action === "approveAppeal" && state.approved) {
    const btn = el("button", "btn btn-green", "Approved ✓");
    btn.style.cssText = "width:100%;margin-top:16px;pointer-events:none";
    body.appendChild(btn);
  } else if (m.action === "simAdvance") {
    const btn = el("button", "btn btn-primary", "Simulate terms");
    btn.style.cssText = "width:100%;margin-top:16px";
    btn.addEventListener("click", () => { closeModal(); toast("Terms simulated: $72,820 net deposit today"); });
    body.appendChild(btn);
  }

  $("#overlay").classList.add("open");
}

function closeModal() { $("#overlay").classList.remove("open"); }

function approveAppeal() {
  if (state.approved) return;
  state.approved = true;
  closeModal();
  renderActionItems();
  renderRevMetrics();
  renderSignoffs();
  renderPayers();
  renderLedger();
  animateValue($("#balanceValue"), 428420, 436120, 600);
  animateValue($("#projVal"), 510000, 517700, 600);
  $("#projNote").textContent = "Includes weighted Aetna appeal recovery";
  const opBal = document.querySelector("[data-acct='operating'] .acct-bal");
  if (opBal) animateValue(opBal, 428420, 436120, 600);
  $("#actionCount").textContent = "3";
  toast("Appeal approved — cash forecast and ledger updated");
}

function animateValue(target, start, end, duration) {
  const t0 = performance.now();
  (function step(now) {
    const p = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    target.textContent = fmtFull(Math.round(start + (end - start) * eased));
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}

function renderMetrics() {
  const row = $("#metricsRow");
  row.replaceChildren();
  [
    { label: "Operating balance", value: fmtFull(428420), detail: "4.7% yield on idle cash", id: "balanceValue", badge: true },
    { label: "Collections this month", value: fmtFull(142300), detail: "↑ 3.1% vs May", trend: true },
    { label: "Open AR", value: fmtFull(287400), detail: "34-day median age" }
  ].forEach((m) => {
    const card = el("div", "metric-card");
    card.appendChild(el("div", "metric-label", m.label));
    const val = el("div", "metric-value", m.value);
    if (m.id) val.id = m.id;
    card.appendChild(val);
    const det = el("div", "metric-detail");
    if (m.badge) {
      const b = el("span", "badge badge-green", "4.7% yield");
      det.appendChild(b);
      det.appendChild(document.createTextNode(" on idle cash"));
    } else if (m.trend) {
      const t = el("span", "trend-up", "↑ 3.1%");
      det.appendChild(t);
      det.appendChild(document.createTextNode(" vs May"));
    } else {
      det.textContent = m.detail;
    }
    card.appendChild(det);
    row.appendChild(card);
  });
}

function renderChart() {
  const container = $("#collectionsChart");
  container.replaceChildren();
  const max = Math.max(...collectionsData.map((d) => d.value));
  collectionsData.forEach((d) => {
    const group = el("div", "bar-group");
    group.appendChild(el("div", "bar-val", fmt(d.value)));
    const fill = el("div", "bar-fill");
    fill.style.height = ((d.value / max) * 85) + "%";
    group.appendChild(fill);
    group.appendChild(el("div", "bar-label", d.month));
    container.appendChild(group);
  });
}

function renderActionItems() {
  const list = $("#actionList");
  list.replaceChildren();
  const items = state.approved ? actionItems.filter((a) => a.modal !== "aetna-appeal") : actionItems;
  items.forEach((a) => {
    const item = el("div", "action-item");
    item.dataset.modal = a.modal;
    const left = document.createElement("div");
    left.appendChild(el("div", "action-title", a.title));
    left.appendChild(el("div", "action-meta", a.meta));
    item.appendChild(left);
    const badge = el("span", "badge " + a.bcls, a.value);
    const right = el("div", "action-value");
    right.appendChild(badge);
    item.appendChild(right);
    item.addEventListener("click", () => openModal(a.modal));
    list.appendChild(item);
  });
}

function renderRevMetrics() {
  const row = $("#revMetrics");
  if (!row) return;
  row.replaceChildren();
  const deniedCount = state.approved ? 3 : 4;
  [
    { label: "Claims paid", value: "47", detail: "$142.3K collected" },
    { label: "Clean claim rate", value: "94%", detail: "23 submitted, 0 rejections" },
    { label: "Denied", value: String(deniedCount), detail: state.approved ? "$6.5K recoverable" : "$18.9K recoverable" }
  ].forEach((m) => {
    const card = el("div", "metric-card");
    card.appendChild(el("div", "metric-label", m.label));
    card.appendChild(el("div", "metric-value", m.value));
    card.appendChild(el("div", "metric-detail", m.detail));
    row.appendChild(card);
  });
}

function renderPayers() {
  const tbody = $("#payerBody");
  if (!tbody) return;
  tbody.replaceChildren();
  payers.forEach((p) => {
    const tr = document.createElement("tr");
    tr.appendChild(el("td", null, p.name));
    tr.appendChild(el("td", "r", fmtFull(p.collected)));
    const denialTd = document.createElement("td");
    denialTd.className = "r";
    const rate = parseFloat(p.denial);
    const badge = el("span", "badge " + (rate > 10 ? "badge-red" : rate > 7 ? "badge-yellow" : "badge-green"), p.denial);
    denialTd.appendChild(badge);
    tr.appendChild(denialTd);
    tr.appendChild(el("td", "r", p.avgPay));
    tbody.appendChild(tr);
  });
}

function renderClinicians() {
  const tbody = $("#clinicianBody");
  if (!tbody) return;
  tbody.replaceChildren();
  clinicians.forEach((c) => {
    const tr = document.createElement("tr");
    tr.appendChild(el("td", null, c.name));
    tr.appendChild(el("td", "r", fmtFull(c.collections)));
    tr.appendChild(el("td", "r", c.revVisit));
    const denialTd = document.createElement("td");
    denialTd.className = "r";
    const rate = parseFloat(c.denial);
    const badge = el("span", "badge " + (rate > 8 ? "badge-yellow" : "badge-green"), c.denial);
    denialTd.appendChild(badge);
    tr.appendChild(denialTd);
    tr.addEventListener("click", () => {
      if (c.name === "Dr. Lee") openModal("lee-pattern");
    });
    tbody.appendChild(tr);
  });
}

function renderSignoffs() {
  const list = $("#signoffList");
  if (!list) return;
  list.replaceChildren();
  if (state.approved) {
    const done = el("div", "metric-detail", "No items need your sign-off right now.");
    list.appendChild(done);
    $("#signoffCount").textContent = "0";
    return;
  }
  const item = el("div", "action-item");
  const left = document.createElement("div");
  left.appendChild(el("div", "action-title", "Aetna debridement appeal"));
  left.appendChild(el("div", "action-meta", "AI drafted appeal with chart evidence · $12.4K batch · 62% win rate · Due today"));
  item.appendChild(left);
  const right = el("div", "action-value");
  const btn = el("button", "btn btn-primary", "Review & approve");
  btn.addEventListener("click", () => openModal("aetna-appeal"));
  right.appendChild(btn);
  item.appendChild(right);
  item.style.cursor = "default";
  list.appendChild(item);
}

function renderAiSummary() {
  const container = $("#aiSummary");
  if (!container) return;
  container.replaceChildren();
  aiWeekSummary.forEach((e) => {
    const ev = el("div", "ai-ev");
    ev.appendChild(el("div", "ai-dot " + e.dot));
    const content = document.createElement("div");
    content.appendChild(el("div", "ai-detail", e.text));
    ev.appendChild(content);
    container.appendChild(ev);
  });
}

function renderAccounts() {
  const row = $("#accountsRow");
  row.replaceChildren();
  [
    { key: "operating", label: "Operating", bal: fmtFull(428420), detail: "Yield 4.7%" },
    { key: "payroll", label: "Payroll reserve", bal: fmtFull(96000), detail: "2.4x runway" },
    { key: "incoming", label: "Incoming EFT", bal: fmtFull(42780), detail: "5 payers" }
  ].forEach((a) => {
    const card = el("button", "acct-card");
    card.dataset.acct = a.key;
    card.appendChild(el("div", "acct-label", a.label));
    card.appendChild(el("div", "acct-bal", a.bal));
    card.appendChild(el("div", "acct-detail", a.detail));
    row.appendChild(card);
  });
}

function renderProjChart() {
  const container = $("#projChart");
  container.replaceChildren();
  const max = Math.max(...projData.map((d) => d.value));
  projData.forEach((d) => {
    const bar = el("div", "proj-bar " + d.type);
    bar.style.height = ((d.value / max) * 90) + "%";
    bar.title = d.month + ": " + fmtFull(d.value);
    container.appendChild(bar);
  });
}

function renderScenarios() {
  const container = $("#scenarioList");
  container.replaceChildren();
  scenarios.forEach((s) => {
    const btn = el("button", "sc-item");
    btn.appendChild(el("span", null, s.name));
    btn.appendChild(el("span", "sc-impact " + s.cls, s.impact));
    btn.addEventListener("click", () => {
      if (s.name.includes("Advance")) openModal("advance");
      else toast(s.name + " — scenario applied to projection");
    });
    container.appendChild(btn);
  });
}

function renderLedger() {
  const tbody = $("#ledgerBody");
  tbody.replaceChildren();
  const entries = [...ledgerData];
  if (state.approved) {
    entries.unshift({ date: "Today", entry: "Aetna appeal recovery watch", source: "M. Patel batch", amount: "+$7,700 exp.", status: "Forecast", bcls: "badge-blue" });
  }
  entries.forEach((e) => {
    const tr = document.createElement("tr");
    [e.date, e.entry, e.source].forEach((t) => tr.appendChild(el("td", null, t)));
    tr.appendChild(el("td", "r", e.amount));
    const statusTd = document.createElement("td");
    statusTd.appendChild(el("span", "badge " + e.bcls, e.status));
    tr.appendChild(statusTd);
    tbody.appendChild(tr);
  });
}

function renderChat() {
  const msgs = $("#chatMessages");
  msgs.replaceChildren();
  const welcome = el("div", "chat-msg bot");
  welcome.textContent = "Good morning. Northlake collected $142,300 this month, up 3% from May. Your highest-value action today is approving the Aetna debridement appeal — that adds $7,700 to the 30-day forecast. What would you like to explore?";
  msgs.appendChild(welcome);
  renderSuggestions();
}

function renderSuggestions() {
  const container = $("#suggestions");
  container.replaceChildren();
  suggestedQs.forEach((q) => {
    const btn = el("button", "sq", q);
    btn.addEventListener("click", () => askQuestion(q));
    container.appendChild(btn);
  });
}

function askQuestion(question) {
  const msgs = $("#chatMessages");

  const userMsg = el("div", "chat-msg user", question);
  msgs.appendChild(userMsg);

  const typing = el("div", "chat-msg bot typing-dots", "");
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;

  const answer = chatAnswers.get(question) || "I don’t have data on that yet. Try asking about payers, clinicians, cash, or AR.";

  setTimeout(() => {
    typing.remove();
    const response = el("div", "chat-msg bot");
    msgs.appendChild(response);
    streamText(response, answer, msgs);
  }, 500);
}

function streamText(target, text, scrollContainer) {
  const words = text.split(" ");
  let i = 0;
  const interval = setInterval(() => {
    if (i >= words.length) { clearInterval(interval); return; }
    if (i > 0) target.appendChild(document.createTextNode(" "));
    const word = words[i];
    if (word.startsWith("$") || /^\d/.test(word)) {
      const span = el("span", null, word);
      span.style.fontWeight = "600";
      span.style.color = "#3b82f6";
      target.appendChild(span);
    } else {
      target.appendChild(document.createTextNode(word));
    }
    i++;
    if (i % 4 === 0) scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }, 25);
}

function init() {
  renderMetrics();
  renderChart();
  renderActionItems();
  renderRevMetrics();
  renderPayers();
  renderClinicians();
  renderSignoffs();
  renderAiSummary();
  renderAccounts();
  renderProjChart();
  renderScenarios();
  renderLedger();
  renderChat();

  $$("[data-route]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      route(link.dataset.route);
    });
  });

  $("#advanceBtn").addEventListener("click", () => openModal("advance"));
  $("#modalClose").addEventListener("click", closeModal);
  $("#overlay").addEventListener("click", (e) => {
    if (e.target === $("#overlay")) closeModal();
  });

  $("#chatSend").addEventListener("click", () => {
    const input = $("#chatInput");
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    askQuestion(q);
  });

  $("#chatInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); $("#chatSend").click(); }
  });

  $("#searchBtn").addEventListener("click", () => toast("Search: try Aetna, Dr. Lee, open AR, payroll"));
  $("#exportBtn").addEventListener("click", () => toast("Board packet exported with claim, cash, and ledger evidence"));

  window.addEventListener("hashchange", () => route(location.hash.slice(1)));
  route(location.hash.slice(1) || "home");
}

document.addEventListener("DOMContentLoaded", init);
