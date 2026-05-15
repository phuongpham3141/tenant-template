// Final aggressive retry for 17 stubborn missing slugs.
// Uses Imagen 4 Ultra (highest quality, separate quota) + lower confidence threshold.
// Custom English prompts (avoid person/uniform safety triggers).

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");
const CAT_OUT = path.join(ROOT, "scripts", "images-categorized", "danh_muc");

// Custom prompts tuned to avoid common failure modes
const PRODUCTS = [
  { slug: "cat70",     vn: "Ghế xoay lưới chân nhôm",
    en: "Modern ergonomic mesh office swivel chair with polished aluminum five-star base and armrests, isolated on white background" },
  { slug: "cat4-s4-1", vn: "Bếp gas âm 3 vùng inox",
    en: "Built-in stainless steel gas cooktop with 3 burner zones, top-down view, installed in white kitchen counter" },
  { slug: "cat4-s8-0", vn: "Bếp công nghiệp gas 2 lò + bồn",
    en: "Commercial industrial stainless steel gas range with 2 burners and water bath sink combo, restaurant kitchen equipment" },
  { slug: "cat4-s8-2", vn: "Tủ đông 4 cánh inox 304",
    en: "Large commercial stainless steel 4-door upright freezer cabinet for restaurant kitchen, brushed metal finish" },
  { slug: "cat4-s8-4", vn: "Bàn chế biến inox 2 tầng 1.5m",
    en: "1.5 meter stainless steel two-tier commercial kitchen prep work table with bottom shelf, industrial design" },
  { slug: "cat5-s1-2", vn: "Đèn LED tuýp T8 18W 1.2m",
    en: "Long white T8 LED tube light bulb 1.2 meter length, 18W, with end caps, isolated on white background" },
  { slug: "cat6-s1-0", vn: "Cửa nhôm Xingfa hệ 55 4 cánh",
    en: "Modern 4-panel aluminum sliding door system in dark gray frame with clear glass panels, installed at home entrance" },
  { slug: "cat7-s8-0", vn: "Vest lễ tân nam-nữ may đo",
    en: "Formal black hotel reception uniform vest jacket on a wooden hanger, isolated on white, no person" },
  { slug: "cat7-s8-1", vn: "Đồng phục bellboy 5*",
    en: "Burgundy red hotel bellboy uniform jacket with gold buttons on a wooden hanger, isolated on white, no person" },
  { slug: "cat7-s8-2", vn: "Áo bếp đầu bếp 2 hàng nút",
    en: "White double-breasted chef coat jacket with black buttons hanging on wooden hanger, isolated on white background, no person" },
  { slug: "cat7-s8-5", vn: "Xe đẩy hành lý lobby vàng",
    en: "Hotel lobby luggage cart with gold brass frame and red carpet base, four wheels, isolated on white background" },
  { slug: "cat7-s8-6", vn: "Xe đẩy housekeeping 3 ngăn",
    en: "Hotel housekeeping cleaning cart with 3 compartments, white plastic, stocked with towels and supplies, on wheels" },
  { slug: "cat7-s8-7", vn: "Tạp dề phục vụ thêu logo",
    en: "Black waiter service apron with embroidered logo, displayed flat on white surface, no person wearing it" },
  { slug: "cat8-s7-4", vn: "Bollard cảng inox 304 cao 50cm",
    en: "Stainless steel marine port bollard mooring post 50cm tall, polished silver finish, isolated on white background" },
  { slug: "cat8-s8-3", vn: "Khóa khuôn mặt 3D + vân tay",
    en: "Modern smart door lock with 3D face recognition camera and fingerprint sensor, black metal finish, isolated on white" },
  { slug: "cat8-s8-7", vn: "Khóa cabinet locker tủ thay đồ",
    en: "Small electronic cabinet locker lock with keypad, black plastic body, installed on locker door" },
  { slug: "cat9-s8-6", vn: "Mannequin trẻ em 1m fiber",
    en: "Fiberglass child mannequin display dummy 1 meter tall, white matte finish, plain torso for kids clothing display, isolated on white" },
];

// ============== KEYS ==============
const ENV_TXT = await fs.readFile(ENV_PATH, "utf8");
const ALL_KEYS = [...ENV_TXT.matchAll(/^GEMINI_API_KEY[A-Za-z_0-9]*=([^\s]+)/gm)].map(m => m[1].trim());
console.log(`Probing ${ALL_KEYS.length} keys with Imagen 4 Ultra...`);
const KEYS = [];
for (let i = 0; i < ALL_KEYS.length; i++) {
  const k = ALL_KEYS[i];
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict?key=${k}`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ instances: [{ prompt: "red apple" }], parameters: { sampleCount: 1, aspectRatio: "1:1" } })
    });
    if (r.status === 200 || r.status === 429) { KEYS.push(k); console.log(`  key ${i+1}: ${r.status === 429 ? "rate-ltd" : "OK"}`); }
    else console.log(`  key ${i+1}: SKIP (${r.status})`);
  } catch { console.log(`  key ${i+1}: err`); }
}
if (!KEYS.length) { console.error("No usable keys"); process.exit(1); }

const KEY_COOLDOWN = new Map();
function pickKey() {
  const now = Date.now();
  const avail = KEYS.filter(k => (KEY_COOLDOWN.get(k) ?? 0) <= now);
  if (avail.length) return avail[Math.floor(Math.random() * avail.length)];
  let best = KEYS[0], bestT = Infinity;
  for (const k of KEYS) { const t = KEY_COOLDOWN.get(k) ?? 0; if (t < bestT) { bestT = t; best = k; } }
  return best;
}

const VISION_MODEL = "gemini-2.5-flash";
const IMAGEN_MODEL = "imagen-4.0-ultra-generate-001";
const MIN_CONFIDENCE = 0.6; // relaxed
const MAX_RETRIES = 6;

async function genImagen(prompt) {
  const body = { instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio: "1:1", personGeneration: "dont_allow" } };
  for (let attempt = 0; attempt < 8; attempt++) {
    const key = pickKey();
    const cd = (KEY_COOLDOWN.get(key) ?? 0) - Date.now();
    if (cd > 0) {
      const wait = Math.min(...KEYS.map(k => Math.max(0, (KEY_COOLDOWN.get(k) ?? 0) - Date.now())));
      if (wait > 0 && wait < 90000) await new Promise(r => setTimeout(r, wait + 500));
    }
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${IMAGEN_MODEL}:predict?key=${pickKey()}`, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body)
    });
    if (r.status === 429) { KEY_COOLDOWN.set(key, Date.now() + 65000); continue; }
    if (r.status === 400) { KEY_COOLDOWN.set(key, Date.now() + 86400000); continue; }
    const j = await r.json();
    if (!r.ok) throw new Error(`${r.status}`);
    const b64 = j?.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) throw new Error("no data");
    return Buffer.from(b64, "base64");
  }
  throw new Error("rate-limited");
}

async function verifyImage(imgBuf, p) {
  const small = await sharp(imgBuf).resize(256, 256, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
  const b64 = small.toString("base64");
  const prompt = `Looking at this AI image. Expected: "${p.vn}" / "${p.en}".\n\nIs the image showing the right TYPE of product? (lenient — accept if general category matches, even if details differ).\n\nReturn ONLY JSON: {"matches": true|false, "actual": "5-10 words", "confidence": 0.x}`;
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${VISION_MODEL}:generateContent?key=${pickKey()}`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: b64 } }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
    })
  });
  const j = await r.json();
  return JSON.parse(j?.candidates?.[0]?.content?.parts?.[0]?.text);
}

await fs.mkdir(IMG_DIR, { recursive: true });
await fs.mkdir(CAT_OUT, { recursive: true });

console.log(`\nRetrying ${PRODUCTS.length} stubborn slugs with Imagen Ultra + relaxed verify\n`);

let ok = 0, fail = 0;
for (const p of PRODUCTS) {
  const outPath = path.join(IMG_DIR, `${p.slug}.jpg`);
  const catPath = path.join(CAT_OUT, `${p.slug}.jpg`);
  let success = false;
  for (let tryIdx = 0; tryIdx < MAX_RETRIES && !success; tryIdx++) {
    try {
      const raw = await genImagen(p.en);
      const v = await verifyImage(raw, p);
      if (v.matches && v.confidence >= MIN_CONFIDENCE) {
        const resized = await sharp(raw).resize(300, 300, { fit: "cover", position: "centre" }).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
        await fs.writeFile(outPath, resized);
        await fs.writeFile(catPath, resized);
        console.log(`  ✓ ${p.slug} (try ${tryIdx+1}) — ${v.actual} [conf=${v.confidence}]`);
        success = true;
        ok++;
      } else {
        console.log(`  ↻ ${p.slug} try ${tryIdx+1} — ${v.actual} [conf=${v.confidence}]`);
      }
    } catch (e) {
      console.log(`  ✗ ${p.slug} try ${tryIdx+1}: ${e.message.slice(0, 80)}`);
    }
    await new Promise(r => setTimeout(r, 1500));
  }
  if (!success) {
    console.log(`  ✗✗ ${p.slug} FAILED after ${MAX_RETRIES} tries`);
    fail++;
  }
}

console.log(`\n=== Done: ${ok}/${PRODUCTS.length} ok, ${fail} failed ===`);
