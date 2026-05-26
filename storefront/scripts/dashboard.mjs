// Pipeline progress dashboard generator.
// Reads pipeline-state.json (synced from VM), generates standalone HTML at
// C:\install-medusa-dev\GiaoDien\images_change.html with embedded thumbnails.
//
// Run from Windows side: node scripts/dashboard.mjs

import fs from "node:fs/promises";
import path from "node:path";

const STATE_FILE = "c:/install-medusa-dev/tenant-template/storefront/scripts/pipeline-state.json";
const HTML_OUT = "c:/install-medusa-dev/GiaoDien/images_change.html";
const IMAGES_ROOT = "c:/install-medusa-dev/GiaoDien/images";

const CAT_LABELS = {
  home: "🏠 Trang chủ",
  ncc: "🏭 Nhà cung cấp",
  san_pham: "📦 Sản phẩm",
  danh_muc: "📑 Danh mục",
  trien_lam: "🎪 Triển lãm",
  factory_tour: "🎬 Factory Tour",
  cum_cn: "🗺️ Cụm CN",
  nganh_hang: "🏷️ Ngành hàng",
  seller_center: "💼 Seller Center",
  rfq: "📨 RFQ",
  trade_alert: "🔔 Trade Alert",
};

let state;
try {
  state = JSON.parse(await fs.readFile(STATE_FILE, "utf8"));
} catch {
  state = { startedAt: null, updatedAt: null, categories: {} };
}

const statusIcons = {
  generated: { i: "🆕", c: "#16a34a", label: "Mới tạo" },
  "ok-existing": { i: "✓", c: "#0891b2", label: "Đã có (verified)" },
  skipped: { i: "⏭", c: "#737373", label: "Bỏ qua" },
  failed: { i: "✗", c: "#dc2626", label: "Lỗi" },
};

const rows = [];
let totalDone = 0, totalOk = 0, totalFail = 0;

for (const [catKey, cat] of Object.entries(state.categories || {})) {
  const label = CAT_LABELS[catKey] || catKey;
  totalDone += cat.ok + cat.failed + cat.skipped;
  totalOk += cat.ok;
  totalFail += cat.failed;

  rows.push(`
  <h2 style="margin:24px 0 8px;font-size:18px">${label} <span style="font-weight:400;color:#6b7280;font-size:14px">— ok ${cat.ok} · fail ${cat.failed} · skip ${cat.skipped} / total ${cat.total}</span></h2>
  <div class="grid">
    ${(cat.items || []).map(it => {
      const st = statusIcons[it.status] || { i: "?", c: "#999" };
      const imgPath = `images/${cat.folder}/${it.slug}.jpg`;
      return `
      <div class="card">
        <div class="img-wrap"><img src="${imgPath}" loading="lazy" onerror="this.style.opacity=0.2;this.title='not synced yet'" /></div>
        <div class="meta">
          <div class="slug" title="${it.slug}">${it.slug}</div>
          <div class="desc" title="${(it.description || "").replace(/"/g, "&quot;")}">${it.description || ""}</div>
          ${it.actual ? `<div class="actual">AI thấy: ${it.actual}</div>` : ""}
          ${it.error ? `<div class="error">${it.error}</div>` : ""}
          <div class="row">
            <span class="status" style="background:${st.c}">${st.i} ${st.label}</span>
            ${it.tries ? `<span class="tries">${it.tries} lần</span>` : ""}
            ${it.sizes ? `<span class="size">${it.sizes.w}×${it.sizes.h}</span>` : ""}
          </div>
        </div>
      </div>`;
    }).join("")}
  </div>
  `);
}

const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="15">
<title>Image Pipeline Dashboard — Cybersilkroads</title>
<style>
  body{font-family:system-ui,Segoe UI,Arial;max-width:1400px;margin:0 auto;padding:16px;background:#f3f4f6;color:#111}
  h1{margin:0 0 4px;font-size:22px}
  .sub{color:#6b7280;font-size:13px;margin-bottom:12px}
  .summary{background:white;border:1px solid #e5e7eb;border-radius:6px;padding:12px 16px;display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px}
  .summary div{font-size:13px}
  .summary b{font-size:18px;display:block}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
  .card{background:white;border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;font-size:12px}
  .img-wrap{aspect-ratio:1;background:#f9fafb;display:flex;align-items:center;justify-content:center}
  .img-wrap img{width:100%;height:100%;object-fit:cover}
  .meta{padding:8px}
  .slug{font-weight:600;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .desc{color:#4b5563;font-size:11.5px;margin:3px 0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
  .actual{color:#0891b2;font-size:11px;margin-top:3px;font-style:italic}
  .error{color:#dc2626;font-size:11px;margin-top:3px}
  .row{display:flex;gap:6px;margin-top:6px;flex-wrap:wrap}
  .status{color:white;padding:2px 6px;border-radius:3px;font-size:10.5px;font-weight:600}
  .tries{background:#fef3c7;color:#92400e;padding:2px 6px;border-radius:3px;font-size:10.5px}
  .size{background:#f3f4f6;color:#374151;padding:2px 6px;border-radius:3px;font-size:10.5px;font-family:monospace}
</style>
</head>
<body>
<h1>🎨 Image Pipeline Dashboard</h1>
<p class="sub">Tự refresh mỗi 15s · Started: ${state.startedAt || "—"} · Updated: ${state.updatedAt || "—"}</p>
<div class="summary">
  <div><b>${totalDone}</b>Đã xử lý</div>
  <div><b style="color:#16a34a">${totalOk}</b>OK</div>
  <div><b style="color:#dc2626">${totalFail}</b>Failed</div>
  <div><b>${Object.keys(state.categories || {}).length}</b>Categories</div>
</div>
${rows.join("\n")}
${rows.length === 0 ? '<p style="color:#6b7280">Chưa có dữ liệu — pipeline chưa chạy.</p>' : ""}
</body>
</html>`;

await fs.writeFile(HTML_OUT, html);
console.log(`Dashboard: ${HTML_OUT}`);
console.log(`Categories: ${Object.keys(state.categories || {}).length}, total items: ${rows.length ? totalDone : 0}`);
