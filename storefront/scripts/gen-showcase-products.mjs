// Generate 96 showcase product gallery images (12 main cats × 8 images each).
// Uses Imagen Fast + Standard + Ultra cascade with Nano Banana fallback.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");
const CAT_OUT = path.join(ROOT, "scripts", "images-categorized", "showcases");

// 12 showcase products
const SHOWCASES = [
  { parent: "home-garden",             en: "Tall beige composite plant pot 80cm with lush green decorative foliage, modern garden centerpiece" },
  { parent: "construction-materials",  en: "Large white Calacatta marble pattern porcelain slab 1200x2400mm with elegant gold-gray veining, polished finish" },
  { parent: "bathroom-sanitary",       en: "Modern smart electronic toilet with sleek tankless white design, integrated LED display panel and built-in bidet" },
  { parent: "noi-that",                en: "L-shaped 6-seater velvet sectional sofa in emerald green with gold metal legs, luxury modern living room" },
  { parent: "kitchen-equipment",       en: "Modern modular kitchen cabinet system with high-gloss white acrylic doors, integrated handles, contemporary design" },
  { parent: "lighting",                en: "Modern crystal chandelier with 12 LED bulbs in luxurious dining room, elegant tiered design" },
  { parent: "doors-windows",           en: "Modern 4-panel aluminum sliding glass door system in dark grey frame with clear tempered glass, home entrance" },
  { parent: "hotel-supplies",          en: "5-star hotel bedroom 4-piece linen set: white duvet, pillows, fitted sheet, with elegant gold and cream accents" },
  { parent: "hardware-tools",          en: "Premium brushed gold PVD stainless steel 304 cabinet pull handles on dark wood drawers, modern hardware" },
  { parent: "decoration",              en: "Minimalist Italian-style composite stone art sculptures, abstract figurines in cream and white, modern decor set" },
  { parent: "outdoor-garden",          en: "6-seater PE rattan outdoor patio furniture set in dark brown with cream cushions, weather-resistant garden seating" },
  { parent: "electrical",              en: "Modern smart WiFi touch wall switch panel with 4 buttons, sleek glass surface, premium home automation" },
];

const VARIANTS = [
  { suffix: "1",     w: 600, h: 600,  ar: "1:1",  modifier: "main hero shot, centered on pure white seamless background, professional B2B catalog photography, sharp focus" },
  { suffix: "2",     w: 600, h: 600,  ar: "1:1",  modifier: "3/4 side angle view on white background, e-commerce product photography" },
  { suffix: "3",     w: 600, h: 600,  ar: "1:1",  modifier: "close-up macro detail showing premium texture and material finish, isolated on white" },
  { suffix: "4",     w: 600, h: 600,  ar: "1:1",  modifier: "in a stylish installed setting or interior context, luxury lifestyle photo" },
  { suffix: "5",     w: 600, h: 600,  ar: "1:1",  modifier: "top-down or back view variant on white background, showing alternate angle" },
  { suffix: "desc1", w: 1200, h: 500, ar: "16:9", modifier: "wide cinematic hero image in elegant installed environment or luxury showroom context, dramatic lighting" },
  { suffix: "desc2", w: 600, h: 400,  ar: "3:2",  modifier: "close-up detail showcasing premium quality finish, material, or feature" },
  { suffix: "desc3", w: 600, h: 400,  ar: "3:2",  modifier: "in modern installed environment showcasing scale, use case, and design" },
];

const ENV_TXT = await fs.readFile(ENV_PATH, "utf8");
const KEYS = [...ENV_TXT.matchAll(/^GEMINI_API_KEY[A-Za-z_0-9]*=([^\s]+)/gm)].map(m => m[1].trim());

const KEY_COOLDOWN = new Map();
function pickKey(modelFamily) {
  const now = Date.now();
  const avail = KEYS.filter(k => (KEY_COOLDOWN.get(`${modelFamily}:${k}`) ?? 0) <= now);
  if (avail.length) return avail[Math.floor(Math.random() * avail.length)];
  let best = KEYS[0], bestT = Infinity;
  for (const k of KEYS) { const t = KEY_COOLDOWN.get(`${modelFamily}:${k}`) ?? 0; if (t < bestT) { bestT = t; best = k; } }
  return best;
}

async function genImagen(model, prompt, ar) {
  const body = { instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio: ar, personGeneration: "dont_allow" } };
  for (let attempt = 0; attempt < 6; attempt++) {
    const key = pickKey(model);
    const cd = (KEY_COOLDOWN.get(`${model}:${key}`) ?? 0) - Date.now();
    if (cd > 0 && cd < 90000) await new Promise(r => setTimeout(r, cd + 500));
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${pickKey(model)}`, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body)
    });
    if (r.status === 429) { KEY_COOLDOWN.set(`${model}:${key}`, Date.now() + 65000); continue; }
    if (r.status === 400) { KEY_COOLDOWN.set(`${model}:${key}`, Date.now() + 86400000); continue; }
    const j = await r.json();
    if (!r.ok) throw new Error(`${r.status}`);
    const b64 = j?.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) throw new Error("no data");
    return Buffer.from(b64, "base64");
  }
  throw new Error(`${model} rate-limited`);
}

async function genNano(prompt) {
  const body = { contents: [{ parts: [{ text: prompt }] }] };
  for (let attempt = 0; attempt < 6; attempt++) {
    const key = pickKey("nano");
    const cd = (KEY_COOLDOWN.get(`nano:${key}`) ?? 0) - Date.now();
    if (cd > 0 && cd < 90000) await new Promise(r => setTimeout(r, cd + 500));
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${pickKey("nano")}`, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body)
    });
    if (r.status === 429) { KEY_COOLDOWN.set(`nano:${key}`, Date.now() + 65000); continue; }
    const j = await r.json();
    if (!r.ok) throw new Error(`${r.status}`);
    const parts = j?.candidates?.[0]?.content?.parts || [];
    const inline = parts.find(p => p.inlineData || p.inline_data);
    const data = inline?.inlineData?.data || inline?.inline_data?.data;
    if (!data) throw new Error("no data");
    return Buffer.from(data, "base64");
  }
  throw new Error("nano rate-limited");
}

// Cascade: Fast → Standard → Ultra → Nano
async function genCascade(prompt, ar) {
  const models = ["imagen-4.0-fast-generate-001", "imagen-4.0-generate-001", "imagen-4.0-ultra-generate-001"];
  for (const model of models) {
    try { return await genImagen(model, prompt, ar); } catch {}
  }
  return await genNano(`Generate a photographic image: ${prompt}`);
}

await fs.mkdir(IMG_DIR, { recursive: true });
await fs.mkdir(CAT_OUT, { recursive: true });

console.log(`Generating ${SHOWCASES.length * VARIANTS.length} showcase product images...\n`);

let ok = 0, fail = 0, total = 0;
for (const s of SHOWCASES) {
  console.log(`\n=== demo-${s.parent}-1 ===`);
  for (const v of VARIANTS) {
    total++;
    const slug = `demo-${s.parent}-1-${v.suffix}`;
    const fp = path.join(IMG_DIR, `${slug}.jpg`);
    const catPath = path.join(CAT_OUT, `${slug}.jpg`);
    try { await fs.access(fp); console.log(`  skip ${slug}`); ok++; continue; } catch {}
    const prompt = `${v.modifier}: ${s.en}. Sharp focus, no text, no watermarks, no people.`;
    try {
      const raw = await genCascade(prompt, v.ar);
      const resized = await sharp(raw).resize(v.w, v.h, { fit: "cover", position: "centre" }).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
      await fs.writeFile(fp, resized);
      await fs.writeFile(catPath, resized);
      ok++;
      console.log(`  ✓ ${slug}`);
    } catch (e) {
      fail++;
      console.log(`  ✗ ${slug}: ${e.message.slice(0, 60)}`);
    }
    await new Promise(r => setTimeout(r, 400));
  }
}

console.log(`\n=== Done: ${ok}/${total} ok, ${fail} failed ===`);
