// Regen home page products (bat1-8, cer1-8, fur1-8, zone1-6, marble1, sofa1, toilet1)
// with Imagen 4 Ultra — slugs like "bat" confused earlier AI into generating literal bats.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");
const CAT_OUT = path.join(ROOT, "scripts", "images-categorized", "home");

const PRODUCTS = [
  // Bathroom (bat = bathroom prefix, NOT animal)
  { slug: "bat1", w: 400, h: 400, vn: "Bồn cầu thông minh tự xả màn hình LED tích hợp bidet liền khối",
    en: "Modern smart electronic toilet with sleek tankless one-piece white ceramic design, integrated LED touch display panel and built-in bidet seat, side view in luxury bathroom" },
  { slug: "bat2", w: 400, h: 400, vn: "Lavabo đá Onyx tự nhiên 600×420mm đánh bóng",
    en: "Natural polished onyx stone oval bathroom vessel washbasin, warm amber translucent color, sitting on wooden vanity counter" },
  { slug: "bat3", w: 400, h: 400, vn: "Vòi trộn đồng vàng brushed tay đơn cần 35cm",
    en: "Brushed gold brass single-lever bathroom basin faucet with tall 35cm curved spout, modern design on white sink" },
  { slug: "bat4", w: 400, h: 400, vn: "Bộ sen mưa âm tường ổn nhiệt đầu sen 30×30cm",
    en: "Modern wall-mounted concealed thermostatic rain shower system with 30x30cm square rainfall shower head in polished chrome, installed in tiled shower" },
  { slug: "bat5", w: 400, h: 400, vn: "Tủ lavabo phòng tắm 2 chậu 1800mm gỗ tự nhiên",
    en: "1.8 meter double-sink bathroom vanity cabinet in natural oak wood with two square white ceramic basins and stone counter" },
  { slug: "bat6", w: 400, h: 400, vn: "Bồn tắm acrylic độc lập hình oval 1700mm đen mờ",
    en: "Modern freestanding oval acrylic bathtub 1700mm in matte black finish, minimalist design in luxury bathroom" },
  { slug: "bat7", w: 400, h: 400, vn: "Phòng tắm kính walk-in 1200×900×2000mm không khung",
    en: "Modern frameless walk-in glass shower enclosure 1200x900x2000mm with clear glass panels and chrome fittings in tiled bathroom" },
  { slug: "bat8", w: 400, h: 400, vn: "Gương tròn LED chống mờ cảm ứng phòng tắm 800mm",
    en: "Round bathroom wall mirror 800mm diameter with bright white LED light ring around perimeter, mounted on marble tile wall, modern design" },

  // Ceramic
  { slug: "cer1", w: 400, h: 400, vn: "Gạch Porcelain vân đá Calacatta trắng 600×1200",
    en: "Large rectangular white Calacatta marble pattern porcelain floor tile sample 600x1200mm with elegant gray and gold veining, polished surface" },
  { slug: "cer2", w: 400, h: 400, vn: "Tấm đá marble Nero Marquina đen 1600×3200mm",
    en: "Large black Nero Marquina marble slab 1600x3200mm with striking white veining, polished glossy finish, displayed vertically in showroom" },
  { slug: "cer3", w: 400, h: 400, vn: "Gạch lát sàn vân đá Travertine rustic 800×800",
    en: "Beige travertine pattern porcelain floor tile 800x800mm with natural rustic stone texture, top-down view" },
  { slug: "cer4", w: 400, h: 400, vn: "Gạch mosaic ốp tường Hexagon Terracotta vintage 200×230mm",
    en: "Vintage hexagonal terracotta orange mosaic wall tiles in honeycomb pattern, rustic earthy color" },
  { slug: "cer5", w: 400, h: 400, vn: "Tấm Porcelain marble xám honed finish 1200×2400mm",
    en: "Large gray honed marble porcelain slab 1200x2400mm with subtle veining, matte finish, vertical sample" },
  { slug: "cer6", w: 400, h: 400, vn: "Tấm ốp tường acoustic vân gỗ 3D trang trí 2400×600",
    en: "3D wood-grain acoustic wall panel with vertical fluted slats in walnut wood finish, decorative" },
  { slug: "cer7", w: 400, h: 400, vn: "Sàn SPC vinyl click vân xương cá 1900×190×6mm",
    en: "Light oak herringbone pattern SPC vinyl click flooring plank close-up, wood grain texture" },
  { slug: "cer8", w: 400, h: 400, vn: "Sàn gỗ kỹ thuật sồi Châu Âu UV finish hạng AB",
    en: "European oak engineered wood flooring plank with UV finish, warm honey color, top-down view" },

  // Furniture
  { slug: "fur1", w: 400, h: 400, vn: "Sofa góc chữ L 6 chỗ ngồi bọc nhung",
    en: "Large L-shaped 6-seater velvet sectional sofa in emerald green with gold metal legs, 3/4 angle in modern living room" },
  { slug: "fur2", w: 400, h: 400, vn: "Sofa thư giãn da điện 3 chỗ hiện đại có cổng USB",
    en: "Modern 3-seat power recliner leather sofa in tan brown with USB charging ports built into armrest, 3/4 angle" },
  { slug: "fur3", w: 400, h: 400, vn: "Giường gỗ óc chó king size 1800×2000mm tiêu chuẩn khách sạn",
    en: "King-size walnut wood bed frame 1800x2000mm with upholstered headboard, hotel-grade design, 3/4 angle" },
  { slug: "fur4", w: 400, h: 400, vn: "Bộ bàn ăn Bắc Âu 6 chỗ mặt đá marble chân inox",
    en: "Nordic Scandinavian 6-seat dining table set with white marble top and brushed stainless steel legs, plus 6 wooden chairs" },
  { slug: "fur5", w: 400, h: 400, vn: "Ghế giám đốc da công thái học lưng cao có tựa đầu",
    en: "Executive ergonomic high-back office chair in black leather with chrome base and headrest, 3/4 angle" },
  { slug: "fur6", w: 400, h: 400, vn: "Bộ nội thất phòng ngủ khách sạn 5 sao 4 món",
    en: "Premium 5-star hotel bedroom 4-piece furniture set in cream and gold: bed, nightstand, dresser and wardrobe" },
  { slug: "fur7", w: 400, h: 400, vn: "Tủ bếp module OPPEIN acrylic bóng tùy chỉnh",
    en: "Modern modular kitchen cabinet system with high-gloss acrylic doors in white and dark gray, integrated handles" },
  { slug: "fur8", w: 400, h: 400, vn: "Tủ quần áo cửa trượt 4 cánh MDF melamine hiện đại",
    en: "Modern 4-door sliding wardrobe in MDF melamine wood finish, contemporary design, front view" },

  // Section banners
  { slug: "marble1", w: 600, h: 600, vn: "Bộ sưu tập marble Dongpeng",
    en: "Luxury showroom display of premium white Calacatta marble large format porcelain slabs leaning against wall, dramatic veining" },
  { slug: "sofa1", w: 600, h: 600, vn: "Bộ sưu tập sofa KUKA",
    en: "Modern L-shaped sectional sofa in dusty rose velvet with brass legs in elegant minimalist Scandinavian living room" },
  { slug: "toilet1", w: 600, h: 600, vn: "Bồn cầu thông minh Ortonbaths",
    en: "Modern smart electronic toilet with sleek matte white tankless design and integrated LED display panel showing bidet controls, in luxury bathroom" },

  // Zones (industrial clusters)
  { slug: "zone1", w: 300, h: 300, vn: "Phật Sơn — Gốm sứ",
    en: "Aerial view of Foshan ceramic factory industrial district with dense rows of large factory buildings producing ceramic tiles, organized industrial cluster" },
  { slug: "zone2", w: 300, h: 300, vn: "Đài Châu — Vòi nước",
    en: "Aerial view of Taizhou faucet manufacturing industrial cluster in China with rows of metal-roofed factory buildings, brass faucet production" },
  { slug: "zone3", w: 300, h: 300, vn: "Phật Sơn — Nội thất",
    en: "Aerial drone shot of Foshan furniture factory district with rows of rectangular factory buildings and warehouses producing furniture" },
  { slug: "zone4", w: 300, h: 300, vn: "Trung Sơn — Đèn chiếu sáng",
    en: "Aerial view of Zhongshan lighting industry cluster with LED factory buildings and lighting showrooms in industrial zone" },
  { slug: "zone5", w: 300, h: 300, vn: "Tấn Giang — Gỗ",
    en: "Aerial view of Jinjiang wood processing factory district in Fujian China with stacked lumber piles and wood furniture factories" },
  { slug: "zone6", w: 300, h: 300, vn: "Triều Châu — Vệ sinh",
    en: "Aerial view of Chaozhou sanitary ware factory district with ceramic toilet and sink manufacturing buildings, industrial zone" },
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
const MIN_CONFIDENCE = 0.7;
const MAX_RETRIES = 4;

function imagenAR(w, h) {
  const r = w / h;
  if (Math.abs(r - 1) < 0.1) return "1:1";
  if (r > 1.5) return "16:9";
  if (r > 1.2) return "4:3";
  return "1:1";
}

async function genImagen(prompt, w, h) {
  const body = { instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio: imagenAR(w, h), personGeneration: "dont_allow" } };
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
  const prompt = `Strict check: AI image should depict:\nVN: "${p.vn}"\nEN: "${p.en}"\n\nReturn ONLY JSON: {"matches": true|false, "actual": "5-10 words", "confidence": 0.x}\nFalse if shows completely wrong category (e.g., animal/bat when bathroom expected).`;
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

console.log(`\nRegenerating ${PRODUCTS.length} home page products with Imagen Ultra\n`);

let ok = 0, fail = 0;
for (const p of PRODUCTS) {
  const outPath = path.join(IMG_DIR, `${p.slug}.jpg`);
  const catPath = path.join(CAT_OUT, `${p.slug}.jpg`);
  let success = false;
  for (let tryIdx = 0; tryIdx < MAX_RETRIES && !success; tryIdx++) {
    try {
      const raw = await genImagen(p.en, p.w, p.h);
      const v = await verifyImage(raw, p);
      if (v.matches && v.confidence >= MIN_CONFIDENCE) {
        const resized = await sharp(raw).resize(p.w, p.h, { fit: "cover", position: "centre" }).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
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
  if (!success) { fail++; console.log(`  ✗✗ ${p.slug} FAILED`); }
}

console.log(`\n=== Done: ${ok}/${PRODUCTS.length} ok, ${fail} failed ===`);
