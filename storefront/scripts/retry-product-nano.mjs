// Final retry for missing product images using Gemini 2.5 Flash Image (Nano Banana).
// Separate quota from Imagen Fast/Standard/Ultra.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");
const CAT_OUT = path.join(ROOT, "scripts", "images-categorized", "products");

const PRODUCTS = [
  { id: "ceramic-1", en: "white Calacatta marble pattern porcelain floor tile 600x1200mm with elegant gray and gold veining" },
  { id: "ceramic-2", en: "black Nero Marquina marble slab 1600x3200mm with striking white veining, polished" },
  { id: "ceramic-3", en: "beige travertine pattern porcelain floor tile 800x800mm with rustic stone texture" },
  { id: "ceramic-4", en: "vintage hexagonal terracotta orange mosaic wall tiles in honeycomb pattern" },
  { id: "ceramic-5", en: "large gray honed marble porcelain slab 1200x2400mm with subtle veining, matte finish" },
  { id: "ceramic-6", en: "3D wood-grain acoustic wall panel with vertical fluted slats in walnut wood finish" },
  { id: "ceramic-7", en: "light oak herringbone pattern SPC vinyl click flooring plank" },
  { id: "ceramic-8", en: "European oak engineered wood flooring plank with UV finish, warm honey color" },
  { id: "furniture-1", en: "L-shaped 6-seater velvet sectional sofa in emerald green with gold metal legs" },
  { id: "furniture-2", en: "modern 3-seat power recliner leather sofa in tan brown with USB charging ports" },
  { id: "furniture-3", en: "king-size walnut wood bed frame with upholstered headboard, hotel-grade" },
  { id: "furniture-4", en: "Nordic 6-seat dining table set with white marble top, stainless steel legs, wooden chairs" },
  { id: "furniture-5", en: "executive ergonomic high-back office chair in black leather with chrome base and headrest" },
  { id: "furniture-6", en: "5-star hotel bedroom 4-piece furniture set in cream and gold: bed, nightstand, dresser, wardrobe" },
  { id: "furniture-7", en: "modern modular kitchen cabinet system with high-gloss acrylic doors in white and dark gray" },
  { id: "furniture-8", en: "modern 4-door sliding wardrobe in MDF melamine wood finish" },
  { id: "bathroom-1", en: "modern smart electronic toilet with sleek tankless one-piece white design, LED display panel" },
  { id: "bathroom-2", en: "natural polished onyx stone oval bathroom vessel washbasin, warm amber translucent color" },
  { id: "bathroom-3", en: "brushed gold brass single-lever bathroom basin faucet with tall 35cm curved spout" },
  { id: "bathroom-4", en: "modern wall-mounted concealed thermostatic rain shower system with 30x30cm square rainfall head" },
  { id: "bathroom-5", en: "1.8 meter double-sink bathroom vanity cabinet in natural oak wood with two white basins" },
  { id: "bathroom-6", en: "modern freestanding oval acrylic bathtub 1700mm in matte black finish" },
  { id: "bathroom-7", en: "modern frameless walk-in glass shower enclosure 1200x900x2000mm with chrome fittings" },
  { id: "bathroom-8", en: "round bathroom wall mirror 800mm diameter with bright white LED light ring around perimeter" },
];

const VARIANTS = [
  { suffix: "1",     w: 600, h: 600,  modifier: "main hero shot, centered on white background, professional product photography" },
  { suffix: "2",     w: 600, h: 600,  modifier: "3/4 side angle view on white background, e-commerce product photo" },
  { suffix: "3",     w: 600, h: 600,  modifier: "close-up detail of texture or material, isolated on white" },
  { suffix: "4",     w: 600, h: 600,  modifier: "in a stylish installed setting or room context, lifestyle photo" },
  { suffix: "5",     w: 600, h: 600,  modifier: "top-down or back view variant on white background" },
  { suffix: "desc1", w: 1200, h: 500, modifier: "wide cinematic hero image in elegant installed setting or luxury showroom context" },
  { suffix: "desc2", w: 600, h: 400,  modifier: "close-up detail showing premium material, finish, or feature" },
  { suffix: "desc3", w: 600, h: 400,  modifier: "in modern installed environment showcasing scale and use case" },
];

const ENV_TXT = await fs.readFile(ENV_PATH, "utf8");
const KEYS = [...ENV_TXT.matchAll(/^GEMINI_API_KEY[A-Za-z_0-9]*=([^\s]+)/gm)].map(m => m[1].trim());
console.log(`Using ${KEYS.length} keys with Nano Banana`);

const KEY_COOLDOWN = new Map();
function pickKey() {
  const now = Date.now();
  const avail = KEYS.filter(k => (KEY_COOLDOWN.get(k) ?? 0) <= now);
  if (avail.length) return avail[Math.floor(Math.random() * avail.length)];
  let best = KEYS[0], bestT = Infinity;
  for (const k of KEYS) { const t = KEY_COOLDOWN.get(k) ?? 0; if (t < bestT) { bestT = t; best = k; } }
  return best;
}

async function genNano(prompt) {
  const body = { contents: [{ parts: [{ text: prompt }] }] };
  for (let attempt = 0; attempt < 8; attempt++) {
    const key = pickKey();
    const cd = (KEY_COOLDOWN.get(key) ?? 0) - Date.now();
    if (cd > 0) {
      const wait = Math.min(...KEYS.map(k => Math.max(0, (KEY_COOLDOWN.get(k) ?? 0) - Date.now())));
      if (wait > 0 && wait < 90000) await new Promise(r => setTimeout(r, wait + 500));
    }
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${pickKey()}`, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body)
    });
    if (r.status === 429) { KEY_COOLDOWN.set(key, Date.now() + 65000); continue; }
    if (r.status === 400) { KEY_COOLDOWN.set(key, Date.now() + 86400000); continue; }
    const j = await r.json();
    if (!r.ok) throw new Error(`${r.status}`);
    const parts = j?.candidates?.[0]?.content?.parts || [];
    const inline = parts.find(p => p.inlineData || p.inline_data);
    const data = inline?.inlineData?.data || inline?.inline_data?.data;
    if (!data) throw new Error("no image data");
    return Buffer.from(data, "base64");
  }
  throw new Error("rate-limited");
}

await fs.mkdir(IMG_DIR, { recursive: true });
await fs.mkdir(CAT_OUT, { recursive: true });

const queue = [];
for (const p of PRODUCTS) {
  for (const v of VARIANTS) {
    const slug = `${p.id}-${v.suffix}`;
    const fp = path.join(IMG_DIR, `${slug}.jpg`);
    try { await fs.access(fp); } catch { queue.push({ p, v, slug, fp }); }
  }
}

console.log(`Missing ${queue.length} images. Generating with Nano Banana...\n`);

let ok = 0, fail = 0;
for (const item of queue) {
  const { p, v, slug, fp } = item;
  const catPath = path.join(CAT_OUT, `${slug}.jpg`);
  const prompt = `Generate an image: ${v.modifier}: ${p.en}. Sharp focus, no text, no watermarks, no people. White background where applicable.`;
  let success = false;
  for (let tryIdx = 0; tryIdx < 3 && !success; tryIdx++) {
    try {
      const raw = await genNano(prompt);
      const resized = await sharp(raw).resize(v.w, v.h, { fit: "cover", position: "centre" }).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
      await fs.writeFile(fp, resized);
      await fs.writeFile(catPath, resized);
      success = true; ok++;
      console.log(`  ✓ ${slug}`);
    } catch (e) {
      if (tryIdx === 2) { fail++; console.log(`  ✗ ${slug}: ${e.message.slice(0, 60)}`); }
      await new Promise(r => setTimeout(r, 1500));
    }
  }
  await new Promise(r => setTimeout(r, 300));
}

console.log(`\n=== Done: ${ok}/${queue.length} ok, ${fail} failed ===`);
