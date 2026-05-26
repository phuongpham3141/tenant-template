// Comprehensive image generation pipeline for cybersilkroads.
// - Scans rendered pages, extracts picsum URLs
// - Groups by page category (ncc, san_pham, etc)
// - Translates new VN slugs to English
// - Generates via Imagen 4 Fast → verifies via Gemini Vision → retries up to 3x
// - Writes live progress JSON for HTML dashboard
// - Saves to public/img/<slug>.jpg + writes state for backup mirroring
//
// Usage:
//   node scripts/gen-pipeline.mjs --pages=ncc           # only supplier pages
//   node scripts/gen-pipeline.mjs --pages=all           # all page categories
//   node scripts/gen-pipeline.mjs --skip-existing       # don't regen existing
//   node scripts/gen-pipeline.mjs --concurrency=4

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");
const TRANS_FILE = path.join(ROOT, "scripts", "slug-translations.json");
const STATE_FILE = path.join(ROOT, "scripts", "pipeline-state.json");
const HTML_FILE = path.join(ROOT, "scripts", "images_change.html");
const CAT_OUT_ROOT = path.join(ROOT, "scripts", "images-categorized");

const CAT_LABELS = {
  home: "🏠 Trang chủ", ncc: "🏭 Nhà cung cấp", san_pham: "📦 Sản phẩm",
  danh_muc: "📑 Danh mục", trien_lam: "🎪 Triển lãm", factory_tour: "🎬 Factory Tour",
  cum_cn: "🗺️ Cụm CN", nganh_hang: "🏷️ Ngành hàng", seller_center: "💼 Seller Center",
  rfq: "📨 RFQ", trade_alert: "🔔 Trade Alert",
};
const STATUS_META = {
  generated: { i: "🆕", c: "#16a34a", l: "Mới tạo" },
  "ok-existing": { i: "✓", c: "#0891b2", l: "Đã có (verified)" },
  skipped: { i: "⏭", c: "#737373", l: "Bỏ qua" },
  failed: { i: "✗", c: "#dc2626", l: "Lỗi" },
};

function esc(s) { return String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

const args = process.argv.slice(2);
const PAGES = args.find(a => a.startsWith("--pages="))?.slice(8).split(",") || ["all"];
const CONCURRENCY = parseInt(args.find(a => a.startsWith("--concurrency="))?.slice(14)) || 4;
const MAX_RETRIES = parseInt(args.find(a => a.startsWith("--max-retries="))?.slice(14)) || 3;
const SKIP_EXISTING = args.includes("--skip-existing");
const FORCE_VERIFY = args.includes("--force-verify");
const STOREFRONT_URL = process.env.STOREFRONT_URL || "http://localhost:8080";
const STOREFRONT_HOST = process.env.STOREFRONT_HOST || "shop.huayuesc.local";

// Multi-key rotation: read all GEMINI_API_KEY* entries, probe each for Imagen access, round-robin
const ENV_TXT = await fs.readFile(ENV_PATH, "utf8");
const ALL_KEYS = [...ENV_TXT.matchAll(/^GEMINI_API_KEY[A-Za-z_0-9]*=([^\s]+)/gm)].map(m => m[1].trim());
if (!ALL_KEYS.length) { console.error("No GEMINI_API_KEY* in .env.local"); process.exit(1); }

console.log(`Probing ${ALL_KEYS.length} API key(s) for Imagen access...`);
const KEYS = [];
for (let i = 0; i < ALL_KEYS.length; i++) {
  const k = ALL_KEYS[i];
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${k}`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ instances: [{ prompt: "red apple" }], parameters: { sampleCount: 1, aspectRatio: "1:1" } })
    });
    if (r.status === 200 || r.status === 429) {
      KEYS.push(k);
      console.log(`  key ${i + 1}: ${r.status === 429 ? "rate-limited but usable" : "OK"}`);
    } else {
      const j = await r.json().catch(() => ({}));
      console.log(`  key ${i + 1}: SKIPPED (${r.status} - ${(j?.error?.message || "?").slice(0, 60)})`);
    }
  } catch (e) {
    console.log(`  key ${i + 1}: SKIPPED (err)`);
  }
}
if (!KEYS.length) { console.error("No usable keys (Imagen needs paid plan)"); process.exit(1); }
console.log(`Using ${KEYS.length} usable key(s)`);
const KEY_COOLDOWN = new Map(); // key → unix ms when usable again
function pickKey() {
  const now = Date.now();
  const available = KEYS.filter(k => (KEY_COOLDOWN.get(k) ?? 0) <= now);
  if (available.length) return available[Math.floor(Math.random() * available.length)];
  // All on cooldown — pick the soonest one
  let best = KEYS[0], bestT = Infinity;
  for (const k of KEYS) { const t = KEY_COOLDOWN.get(k) ?? 0; if (t < bestT) { bestT = t; best = k; } }
  return best;
}
function markKey429(k, retryAfterMs = 30000) {
  KEY_COOLDOWN.set(k, Date.now() + retryAfterMs);
}
const API_KEY = KEYS[0]; // legacy fallback for vision calls

const VISION_MODEL = "gemini-2.5-flash";
const IMAGEN_MODEL = "imagen-4.0-fast-generate-001";
const MIN_CONFIDENCE = 0.7;

// Map URL pattern → category folder + sample paths to scan
const PAGE_CATEGORIES = {
  home:          { paths: ["/"], folder: "home" },
  ncc:           { paths: ["/supplier/oppein-home", "/supplier/monalisa-group", "/supplier/kuka-home", "/supplier/dongpeng-ceramics"], folder: "ncc" },
  san_pham:      { paths: ["/product/ceramic-1", "/product/furniture-1", "/product/bathroom-1"], folder: "san_pham" },
  danh_muc:      { paths: ["/category/home-garden", "/category/construction-materials", "/category/bathroom-sanitary", "/category/noi-that", "/category/kitchen-equipment", "/category/lighting", "/category/doors-windows", "/category/hotel-supplies", "/category/hardware-tools", "/category/decoration", "/category/outdoor-garden", "/category/electrical"], folder: "danh_muc" },
  trien_lam:     { paths: ["/trade-shows"], folder: "trien_lam" },
  factory_tour:  { paths: ["/factory-tour"], folder: "factory_tour" },
  cum_cn:        { paths: ["/zones", "/zone/foshan-furniture"], folder: "cum_cn" },
  nganh_hang:    { paths: ["/industry-channels"], folder: "nganh_hang" },
  seller_center: { paths: ["/seller-center/domestic-cn", "/seller-center/export-na", "/seller-center/gold-member", "/seller-center/logistics", "/seller-center/smart-expo", "/seller-center/trade-ehome", "/seller-center/trade-services"], folder: "seller_center" },
  rfq:           { paths: ["/buying-request"], folder: "rfq" },
  trade_alert:   { paths: ["/trade-alert"], folder: "trade_alert" },
};

const translations = JSON.parse(await fs.readFile(TRANS_FILE, "utf8"));
await fs.mkdir(IMG_DIR, { recursive: true });

// =============== STATE TRACKING ===============
let state = {
  startedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  categories: {}, // {catKey: {total, ok, retried, failed, skipped, items: [...]}}
};

async function saveState() {
  state.updatedAt = new Date().toISOString();
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
  await writeDashboard();
}

async function writeDashboard() {
  let totalDone = 0, totalOk = 0, totalFail = 0;
  const sections = [];
  for (const [catKey, cat] of Object.entries(state.categories || {})) {
    const label = CAT_LABELS[catKey] || catKey;
    totalDone += cat.ok + cat.failed + cat.skipped;
    totalOk += cat.ok;
    totalFail += cat.failed;
    const items = (cat.items || []).slice().reverse().slice(0, 100);
    const pageLinks = (cat.paths || []).map(p => `<a href="https://cybersilkroads.com${p}" target="_blank" style="color:#0891b2;text-decoration:none;background:#ecfeff;padding:2px 8px;border-radius:3px;font-size:11.5px;font-family:monospace;border:1px solid #cffafe">${esc(p)}</a>`).join(" ");
    sections.push(`<h2>${label} <span style="font-weight:400;color:#6b7280;font-size:14px">— ok ${cat.ok} · fail ${cat.failed} · skip ${cat.skipped} / total ${cat.total}</span></h2>${pageLinks ? `<div style="margin-bottom:8px;display:flex;flex-wrap:wrap;gap:6px"><span style="font-size:11px;color:#6b7280;align-self:center">📄 Pages:</span>${pageLinks}</div>` : ""}<div class="grid">${items.map(it => {
      const st = STATUS_META[it.status] || { i: "?", c: "#999", l: it.status };
      return `<div class="card"><div class="img-wrap"><img src="images/${cat.folder}/${esc(it.slug)}.jpg" loading="lazy" onerror="this.style.opacity=0.15;this.title='not synced yet'"/></div><div class="meta"><div class="slug" title="${esc(it.slug)}">${esc(it.slug)}</div><div class="desc">${esc(it.description)}</div>${it.actual ? `<div class="actual">AI thấy: ${esc(it.actual)}</div>` : ""}${it.error ? `<div class="error">${esc(it.error)}</div>` : ""}<div class="row"><span class="status" style="background:${st.c}">${st.i} ${st.l}</span>${it.tries ? `<span class="tries">${it.tries} lần</span>` : ""}${it.sizes ? `<span class="size">${it.sizes.w}×${it.sizes.h}</span>` : ""}</div></div></div>`;
    }).join("")}</div>`);
  }
  const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta http-equiv="refresh" content="15"><title>Image Pipeline · Cybersilkroads</title><style>body{font-family:system-ui,Segoe UI,Arial;max-width:1400px;margin:0 auto;padding:16px;background:#f3f4f6;color:#111}h1{margin:0 0 4px;font-size:22px}h2{margin:24px 0 8px;font-size:18px}.sub{color:#6b7280;font-size:13px;margin-bottom:12px}.summary{background:white;border:1px solid #e5e7eb;border-radius:6px;padding:12px 16px;display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px}.summary div{font-size:13px}.summary b{font-size:18px;display:block}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}.card{background:white;border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;font-size:12px}.img-wrap{aspect-ratio:1;background:#f9fafb;display:flex;align-items:center;justify-content:center}.img-wrap img{width:100%;height:100%;object-fit:cover}.meta{padding:8px}.slug{font-weight:600;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.desc{color:#4b5563;font-size:11.5px;margin:3px 0;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.actual{color:#0891b2;font-size:11px;margin-top:3px;font-style:italic}.error{color:#dc2626;font-size:11px;margin-top:3px}.row{display:flex;gap:6px;margin-top:6px;flex-wrap:wrap}.status{color:white;padding:2px 6px;border-radius:3px;font-size:10.5px;font-weight:600}.tries{background:#fef3c7;color:#92400e;padding:2px 6px;border-radius:3px;font-size:10.5px}.size{background:#f3f4f6;color:#374151;padding:2px 6px;border-radius:3px;font-size:10.5px;font-family:monospace}</style></head><body><h1>🎨 Image Pipeline Dashboard</h1><p class="sub">Auto-refresh 15s · Started ${esc(state.startedAt)} · Updated ${esc(state.updatedAt)}</p><div class="summary"><div><b>${totalDone}</b>Đã xử lý</div><div><b style="color:#16a34a">${totalOk}</b>OK</div><div><b style="color:#dc2626">${totalFail}</b>Failed</div><div><b>${Object.keys(state.categories || {}).length}</b>Categories</div></div>${sections.join("\n")}${sections.length === 0 ? '<p style="color:#6b7280">Chưa có dữ liệu.</p>' : ""}</body></html>`;
  await fs.writeFile(HTML_FILE, html);
}

// =============== TRANSLATE ===============
async function translateNewSlugs(slugs) {
  const pending = slugs.filter(s => !translations[s] && !/^cer\d|^fur\d|^bat\d|^zone\d|^hero|^sub-|^sol-|^fav-|^marble|^sofa|^toilet|^showcase-/.test(s));
  if (!pending.length) return;
  console.log(`Translating ${pending.length} new slugs...`);
  const BATCH = 30;
  for (let i = 0; i < pending.length; i += BATCH) {
    const batch = pending.slice(i, i + BATCH);
    const list = batch.map(s => `- ${s}`).join("\n");
    const prompt = `These are Vietnamese product/scene slugs (dash-separated, sometimes also English like supplier names). For each slug, output a clear 3-10 word English description suitable for image generation prompt. Output ONLY a JSON object mapping slug to description.

Slugs:\n${list}`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${VISION_MODEL}:generateContent?key=${pickKey()}`;
    const body = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", temperature: 0.1 } };
    try {
      const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json();
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      const result = JSON.parse(text);
      Object.assign(translations, result);
      await fs.writeFile(TRANS_FILE, JSON.stringify(translations, null, 2));
      console.log(`  translated ${batch.length}`);
    } catch (e) {
      console.error(`  translate batch ${i} failed: ${e.message.slice(0, 100)}`);
    }
    await new Promise(r => setTimeout(r, 800));
  }
}

// =============== SCAN PAGES ===============
async function scanPage(pagePath) {
  try {
    const res = await fetch(`${STOREFRONT_URL}${pagePath}`, { headers: { Host: STOREFRONT_HOST } });
    const html = await res.text();
    const matches = [...html.matchAll(/picsum\.photos\/seed\/([^/]+)\/(\d+)\/(\d+)/g)];
    return matches.map(m => ({ slug: m[1], w: +m[2], h: +m[3] }));
  } catch (e) {
    console.error(`  scan ${pagePath}: ${e.message}`);
    return [];
  }
}

// =============== GEN + VERIFY ===============
async function genImage(description, tryIdx, w, h) {
  const variants = [
    `A single ${description}, centered on a pure white seamless background, clean professional e-commerce product photography, soft studio lighting, sharp focus, no text, no watermarks, no people.`,
    `Studio product photo of a ${description}. Pure white background, professional B2B catalog photography, top-quality, no text, no people.`,
    `Clear professional photograph of one ${description} isolated on white background, e-commerce style, no clutter, no text, no people.`,
  ];
  const prompt = variants[Math.min(tryIdx, variants.length - 1)];
  // Pick best aspect ratio for target dimensions
  const r = w / h;
  let ar = "1:1";
  if (r > 1.5) ar = "16:9";
  else if (r > 1.2) ar = "4:3";
  else if (r < 0.67) ar = "9:16";
  else if (r < 0.83) ar = "3:4";

  const body = { instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio: ar, personGeneration: "dont_allow" } };

  // Try up to 8 attempts, rotating keys + backoff on 429
  for (let attempt = 0; attempt < 8; attempt++) {
    const key = pickKey();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGEN_MODEL}:predict?key=${key}`;
    const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    if (res.status === 429) {
      const cooldown = 45000 + attempt * 15000 + Math.random() * 5000;
      markKey429(key, cooldown);
      const minWait = Math.min(...KEYS.map(k => (KEY_COOLDOWN.get(k) ?? 0) - Date.now()).filter(t => t > 0));
      if (minWait > 0 && minWait < 60000) await new Promise(r => setTimeout(r, minWait + 500));
      continue;
    }
    if (res.status === 400) {
      // Permanently disable this key (e.g. paid-plan-required, or invalid request)
      markKey429(key, 24 * 60 * 60 * 1000);
      continue;
    }
    const json = await res.json();
    if (!res.ok) throw new Error(`imagen ${res.status}`);
    const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) throw new Error("imagen no data");
    return Buffer.from(b64, "base64");
  }
  throw new Error("imagen rate-limited all keys");
}

async function verifyImage(imgBuf, description) {
  const small = await sharp(imgBuf).resize(256, 256, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
  const b64 = small.toString("base64");
  const prompt = `You are reviewing an AI-generated B2B product image.\nExpected subject: "${description}"\n\nBe STRICT: if the image shows the wrong category (e.g., food when furniture expected), set matches=false. If correct subject but stylized differently, matches=true.\n\nReturn ONLY JSON: {"matches": true|false, "actual": "5-8 words", "confidence": 0.x}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${VISION_MODEL}:generateContent?key=${pickKey()}`;
  const body = {
    contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: b64 } }] }],
    generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
  };
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json();
  if (!res.ok) throw new Error(`vision ${res.status}`);
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
}

async function processImage(item, catKey) {
  const { slug, w, h } = item;
  const outPath = path.join(IMG_DIR, `${slug}.jpg`);
  const description = translations[slug] || slug.replace(/-/g, " ");
  const sizes = { w, h };

  // If exists and not forcing reverify
  if (SKIP_EXISTING && !FORCE_VERIFY) {
    try {
      await fs.access(outPath);
      return { slug, status: "skipped", description, sizes };
    } catch {}
  }

  // If exists, verify first
  if (!FORCE_VERIFY) {
    try {
      const existing = await fs.readFile(outPath);
      const v = await verifyImage(existing, description);
      if (v.matches && v.confidence >= MIN_CONFIDENCE) {
        return { slug, status: "ok-existing", description, actual: v.actual, sizes };
      }
    } catch {}
  }

  // Generate + verify loop
  for (let tryIdx = 0; tryIdx < MAX_RETRIES; tryIdx++) {
    try {
      const raw = await genImage(description, tryIdx, w, h);
      const verdict = await verifyImage(raw, description);
      if (verdict.matches && verdict.confidence >= MIN_CONFIDENCE) {
        const resized = await sharp(raw).resize(w, h, { fit: "cover", position: "centre" }).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
        await fs.writeFile(outPath, resized);
        // also copy to categorized folder for backup mirroring
        try {
          const catFolder = state.categories[catKey]?.folder || catKey;
          const catDir = path.join(CAT_OUT_ROOT, catFolder);
          await fs.mkdir(catDir, { recursive: true });
          await fs.writeFile(path.join(catDir, `${slug}.jpg`), resized);
        } catch {}
        return { slug, status: "generated", description, actual: verdict.actual, tries: tryIdx + 1, sizes, confidence: verdict.confidence };
      }
    } catch (e) {
      if (tryIdx === MAX_RETRIES - 1) {
        return { slug, status: "failed", description, error: e.message.slice(0, 100), sizes };
      }
    }
  }
  return { slug, status: "failed", description, error: `mismatched after ${MAX_RETRIES} tries`, sizes };
}

// =============== MAIN ===============
const selectedCats = PAGES.includes("all") ? Object.keys(PAGE_CATEGORIES) : PAGES;

// Phase 1: Scan
console.log("Phase 1: Scanning pages for picsum URLs...");
const queue = []; // {catKey, item}
for (const catKey of selectedCats) {
  const cat = PAGE_CATEGORIES[catKey];
  if (!cat) { console.warn(`Unknown category: ${catKey}`); continue; }
  console.log(`\n[${catKey}]`);
  const seenSlugs = new Set();
  for (const p of cat.paths) {
    const items = await scanPage(p);
    let added = 0;
    for (const it of items) {
      if (seenSlugs.has(it.slug)) continue;
      seenSlugs.add(it.slug);
      queue.push({ catKey, item: it });
      added++;
    }
    console.log(`  ${p}: ${items.length} urls, ${added} new unique`);
  }
  state.categories[catKey] = { folder: cat.folder, paths: cat.paths, total: seenSlugs.size, ok: 0, retried: 0, failed: 0, skipped: 0, items: [] };
}

console.log(`\nTotal: ${queue.length} unique images to process across ${selectedCats.length} categories`);
await saveState();

// Phase 2: Translate
console.log("\nPhase 2: Translating new slugs...");
await translateNewSlugs(queue.map(q => q.item.slug));

// Phase 3: Generate + verify
console.log("\nPhase 3: Generating + verifying...\n");

let done = 0;
const total = queue.length;

async function worker() {
  while (queue.length) {
    const q = queue.shift();
    if (!q) break;
    const result = await processImage(q.item, q.catKey);
    const cat = state.categories[q.catKey];
    cat.items.push(result);
    if (result.status === "generated") cat.ok++;
    else if (result.status === "ok-existing") cat.ok++;
    else if (result.status === "skipped") cat.skipped++;
    else cat.failed++;
    done++;
    const icon = { generated: "🆕", "ok-existing": "✓", skipped: "—", failed: "✗" }[result.status] || "?";
    if (done % 5 === 0 || result.status === "failed") {
      console.log(`  [${done}/${total}] ${icon} ${q.catKey}/${q.item.slug} (${q.item.w}×${q.item.h}) — ${result.actual || result.error || result.description}`);
    }
    if (done % 10 === 0) await saveState();
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await saveState();

console.log("\n=== Final ===");
for (const [k, v] of Object.entries(state.categories)) {
  console.log(`  ${k}: ok=${v.ok} retried=${v.retried} failed=${v.failed} skipped=${v.skipped} (total ${v.total})`);
}
console.log(`\nState file: ${STATE_FILE}`);
