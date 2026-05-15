// Generic category generation: parses categories.ts, extracts (slug, VN name) for
// any --category=<slug>, uses Gemini text to expand to detailed English prompt,
// then runs gen+verify+retry loop (same as gen-home-garden.mjs).
//
// Usage:
//   node scripts/gen-category.mjs --category=construction-materials [--concurrency=2] [--only=slug1,slug2]

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");
const CAT_TS = path.join(ROOT, "src", "data", "categories.ts");

const args = process.argv.slice(2);
const CATEGORY = args.find(a => a.startsWith("--category="))?.slice(11);
if (!CATEGORY) { console.error("Need --category=<slug>"); process.exit(1); }

const CONCURRENCY = parseInt(args.find(a => a.startsWith("--concurrency="))?.slice(14)) || 2;
const ONLY = args.find(a => a.startsWith("--only="))?.slice(7).split(",");
const MAX_RETRIES = 4;
const MIN_CONFIDENCE = 0.75;

const CAT_OUT = path.join(ROOT, "scripts", "images-categorized", "danh_muc");
const STATE_FILE = path.join(ROOT, "scripts", `category-${CATEGORY}-state.json`);

// ============== KEY MANAGEMENT ==============
const ENV_TXT = await fs.readFile(ENV_PATH, "utf8");
const ALL_KEYS = [...ENV_TXT.matchAll(/^GEMINI_API_KEY[A-Za-z_0-9]*=([^\s]+)/gm)].map(m => m[1].trim());
console.log(`Probing ${ALL_KEYS.length} keys...`);
const KEYS = [];
for (let i = 0; i < ALL_KEYS.length; i++) {
  const k = ALL_KEYS[i];
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${k}`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ instances: [{ prompt: "red apple" }], parameters: { sampleCount: 1, aspectRatio: "1:1" } })
    });
    if (r.status === 200 || r.status === 429) { KEYS.push(k); console.log(`  key ${i + 1}: ${r.status === 429 ? "rate-ltd" : "OK"}`); }
    else console.log(`  key ${i + 1}: SKIP (${r.status})`);
  } catch { console.log(`  key ${i + 1}: err`); }
}
if (!KEYS.length) { console.error("No usable keys"); process.exit(1); }
console.log(`Using ${KEYS.length} keys\n`);

const KEY_COOLDOWN = new Map();
function pickKey() {
  const now = Date.now();
  const avail = KEYS.filter(k => (KEY_COOLDOWN.get(k) ?? 0) <= now);
  if (avail.length) return avail[Math.floor(Math.random() * avail.length)];
  let best = KEYS[0], bestT = Infinity;
  for (const k of KEYS) { const t = KEY_COOLDOWN.get(k) ?? 0; if (t < bestT) { bestT = t; best = k; } }
  return best;
}

// ============== PARSE categories.ts ==============
// Find the category block for the given slug, then extract products.
const catTsContent = await fs.readFile(CAT_TS, "utf8");

// Find block: "<CATEGORY>": { ... },\n  "next": OR end-of-CATEGORIES
const blockRegex = new RegExp(`"${CATEGORY}":\\s*\\{[\\s\\S]*?\\n  \\},`);
const blockMatch = catTsContent.match(blockRegex);
if (!blockMatch) { console.error(`Category "${CATEGORY}" not found in categories.ts`); process.exit(1); }
const block = blockMatch[0];

// Pattern A: static product: { name: "X", image: "/img/Y.jpg?v=3" or "/img/Y.jpg" }
const productPairs = [];
const reStatic = /\{\s*name:\s*"([^"]+)",\s*image:\s*"\/img\/([^."]+)\.jpg(?:\?[^"]*)?"\s*\}/g;
let m;
while ((m = reStatic.exec(block)) !== null) {
  productPairs.push({ slug: m[2], vn: m[1] });
}

// Pattern B: Array.from({length: N}, (_, i) => ({ name: [<list>][i], image: `/img/cat..-${i}.jpg?v=3` }))
// Pattern C: name: [...] + image: f(EXPR) — using helper "const f = (n) => /img/cat${n}.jpg"
const chunks = block.split(/products:\s*(?:Array\.from\b|\[)/);
for (let c = 1; c < chunks.length; c++) {
  const chunk = chunks[c];
  // Find names array between [ and ][i],
  const namesM = chunk.match(/name:\s*\[([\s\S]*?)\]\[i\]/);
  if (!namesM) continue;
  const names = [...namesM[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);

  // Try Pattern B: image template literal
  const imgTplM = chunk.match(/image:\s*`\/img\/([^`]+)`/);
  if (imgTplM) {
    const slugTpl = imgTplM[1].replace(/\.jpg\?.*$|\.jpg$/, "");
    names.forEach((vn, i) => {
      const slug = slugTpl.replace(/\$\{i\}/g, String(i));
      productPairs.push({ slug, vn });
    });
    continue;
  }

  // Try Pattern C: image: f(EXPR) — evaluate EXPR with i to get cat number
  const imgFnM = chunk.match(/image:\s*f\(([^)]+)\)/);
  if (imgFnM) {
    const expr = imgFnM[1].trim();
    names.forEach((vn, i) => {
      // Substitute 'i' with the index and evaluate the arithmetic expression
      let val;
      try { val = Function("i", `return ${expr}`)(i); } catch { return; }
      productPairs.push({ slug: `cat${val}`, vn });
    });
  }
}

if (!productPairs.length) { console.error(`No products parsed for "${CATEGORY}"`); process.exit(1); }
console.log(`Parsed ${productPairs.length} products from category "${CATEGORY}"`);

// ============== TRANSLATE VN → detailed EN ==============
const TRANS_CACHE = path.join(ROOT, "scripts", "slug-detailed-prompts.json");
let detailedPrompts = {};
try { detailedPrompts = JSON.parse(await fs.readFile(TRANS_CACHE, "utf8")); } catch {}

async function expandPrompts(pairs) {
  const pending = pairs.filter(p => !detailedPrompts[p.slug]);
  if (!pending.length) return;
  console.log(`Expanding ${pending.length} prompts via Gemini text...`);
  const BATCH = 25;
  for (let i = 0; i < pending.length; i += BATCH) {
    const batch = pending.slice(i, i + BATCH);
    const list = batch.map(p => `${p.slug}: ${p.vn}`).join("\n");
    const prompt = `For each Vietnamese B2B product (slug: name), output a detailed 12-25 word English description suitable as an image generation prompt. Be specific about: product type, size, material, color, key features, typical setting. Avoid vague terms.

Output ONLY a JSON object: {"slug1": "english desc 1", "slug2": "english desc 2", ...}

Products:
${list}`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${pickKey()}`;
    const body = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", temperature: 0.2 } };
    try {
      const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json();
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      const result = JSON.parse(text);
      Object.assign(detailedPrompts, result);
      await fs.writeFile(TRANS_CACHE, JSON.stringify(detailedPrompts, null, 2));
      console.log(`  [${Math.min(i + BATCH, pending.length)}/${pending.length}] +${Object.keys(result).length}`);
    } catch (e) { console.error(`  batch err: ${e.message.slice(0, 100)}`); }
    await new Promise(r => setTimeout(r, 800));
  }
}

await expandPrompts(productPairs);

// ============== GEN + VERIFY ==============
async function genImage(p, tryIdx) {
  const en = detailedPrompts[p.slug] || p.vn;
  const variants = [
    `Single product photo: ${en}. Centered on pure white seamless background, clean B2B e-commerce product photography, soft studio lighting, sharp focus, no text, no watermarks, no people.`,
    `Studio product shot: ${en}. White background, professional catalog photography, recognizable subject, no text, no people.`,
    `Professional photograph of ${en}, isolated white background, clear and identifiable, e-commerce style.`,
    `${en}, professional product photo on white seamless background, subject is unambiguous, no text.`,
  ];
  const prompt = variants[Math.min(tryIdx, variants.length - 1)];
  const body = { instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio: "1:1", personGeneration: "dont_allow" } };
  for (let attempt = 0; attempt < 12; attempt++) {
    const key = pickKey();
    const cooldownMs = (KEY_COOLDOWN.get(key) ?? 0) - Date.now();
    if (cooldownMs > 0) {
      const wait = Math.min(...KEYS.map(k => Math.max(0, (KEY_COOLDOWN.get(k) ?? 0) - Date.now())));
      if (wait > 0 && wait < 90000) await new Promise(r => setTimeout(r, wait + 500));
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${pickKey()}`;
    const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    if (res.status === 429) { KEY_COOLDOWN.set(key, Date.now() + 65000); continue; }
    if (res.status === 400) { KEY_COOLDOWN.set(key, Date.now() + 86400000); continue; }
    const json = await res.json();
    if (!res.ok) throw new Error(`imagen ${res.status}`);
    const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) throw new Error("safety filter");
    return Buffer.from(b64, "base64");
  }
  throw new Error("rate limited all attempts");
}

async function verifyImage(imgBuf, p) {
  const en = detailedPrompts[p.slug] || p.vn;
  const small = await sharp(imgBuf).resize(256, 256, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
  const b64 = small.toString("base64");
  const prompt = `Strict check: this AI-generated image should depict:
- Vietnamese: "${p.vn}"
- English detail: "${en}"

Be STRICT. Return false if image shows wrong category (e.g., food when furniture expected).

Return ONLY JSON: {"matches": true|false, "actual": "5-10 word desc", "confidence": 0.x}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${pickKey()}`;
  const body = {
    contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: b64 } }] }],
    generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
  };
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
}

// ============== RUN ==============
await fs.mkdir(IMG_DIR, { recursive: true });
await fs.mkdir(CAT_OUT, { recursive: true });

const filtered = ONLY ? productPairs.filter(p => ONLY.includes(p.slug)) : productPairs;
console.log(`\nGenerating ${filtered.length} images for "${CATEGORY}", concurrency=${CONCURRENCY}\n`);

let state = { category: CATEGORY, startedAt: new Date().toISOString(), items: [] };
async function saveState() {
  state.updatedAt = new Date().toISOString();
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
}

const queue = [...filtered];
let done = 0;

async function worker() {
  while (queue.length) {
    const p = queue.shift();
    if (!p) break;
    const outPath = path.join(IMG_DIR, `${p.slug}.jpg`);
    const catPath = path.join(CAT_OUT, `${p.slug}.jpg`);
    let result = { slug: p.slug, vn: p.vn, status: "failed", tries: 0 };
    for (let tryIdx = 0; tryIdx < MAX_RETRIES; tryIdx++) {
      try {
        const raw = await genImage(p, tryIdx);
        const v = await verifyImage(raw, p);
        result.tries = tryIdx + 1;
        result.actual = v.actual;
        result.confidence = v.confidence;
        if (v.matches && v.confidence >= MIN_CONFIDENCE) {
          const resized = await sharp(raw).resize(300, 300, { fit: "cover", position: "centre" }).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
          await fs.writeFile(outPath, resized);
          await fs.writeFile(catPath, resized);
          result.status = "ok";
          break;
        } else result.status = "mismatch";
      } catch (e) {
        result.status = "error";
        result.error = e.message.slice(0, 120);
      }
    }
    state.items.push(result);
    done++;
    const icon = result.status === "ok" ? "✓" : "✗";
    console.log(`  [${done}/${filtered.length}] ${icon} ${p.slug} (${result.tries}x) | ${p.vn} → ${result.actual || result.error}`);
    if (done % 5 === 0) await saveState();
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await saveState();

const ok = state.items.filter(r => r.status === "ok").length;
const fail = state.items.filter(r => r.status !== "ok");
console.log(`\n=== Done: ${ok}/${filtered.length} ok ===`);
if (fail.length) {
  console.log("Failed:");
  fail.forEach(r => console.log(`  ${r.slug} | ${r.vn} → ${r.actual || r.error}`));
}
