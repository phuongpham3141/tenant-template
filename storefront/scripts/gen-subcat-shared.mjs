// Generate 14 shared showcase images per main category (12 cats × 14 = 168 images).
// All subcats of same main category will reuse these images.
// Slug pattern: <parentSlug>-sc-fvideo, -sc-fmini-0..4, -sc-prod-0..7

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");
const CAT_OUT = path.join(ROOT, "scripts", "images-categorized", "subcats");

// Per-main-category themed prompt suffixes
const CATEGORIES = [
  { slug: "home-garden", theme: "home and garden decoration products such as planters, statues, lamps, outdoor furniture" },
  { slug: "construction-materials", theme: "construction materials and supplies such as steel pipes, tiles, wood planks, cement bags" },
  { slug: "bathroom-sanitary", theme: "bathroom fixtures and sanitary ware such as smart toilet, faucets, vanity, shower, bathtub" },
  { slug: "noi-that", theme: "modern interior furniture such as sofa, dining table, bed, wardrobe, office chair" },
  { slug: "kitchen-equipment", theme: "commercial kitchen equipment such as stainless steel range, refrigerator, prep table, cookware" },
  { slug: "lighting", theme: "modern lighting fixtures such as pendant lamp, LED bulb, chandelier, ceiling light, wall sconce" },
  { slug: "doors-windows", theme: "modern door and window products such as aluminum sliding door, frameless glass window, security door" },
  { slug: "hotel-supplies", theme: "luxury hotel amenities such as towels, robes, slippers, mini bar items, room linens" },
  { slug: "hardware-tools", theme: "hardware tools and accessories such as power drill, wrench set, hinges, locks, fasteners" },
  { slug: "decoration", theme: "decorative interior items such as vases, picture frames, mirrors, sculptures, ornamental art" },
  { slug: "outdoor-garden", theme: "outdoor garden products such as patio furniture, BBQ grill, parasol, garden tools, planters" },
  { slug: "electrical", theme: "electrical products such as wall sockets, circuit breakers, cables, smart switches, electrical panels" },
];

// For each main cat, define 14 sub-image prompts (1 fvideo + 5 fmini + 8 prod)
function imagesFor(theme) {
  return [
    { suffix: "fvideo",   prompt: `Wide angle showcase video thumbnail showing ${theme}. Professional B2B catalog photography, soft studio lighting, no text, no people.` },
    { suffix: "fmini-0",  prompt: `Single featured premium product from this category: ${theme}. Hero shot on white background, professional product photography, no text, no people.` },
    { suffix: "fmini-1",  prompt: `Top selling product example: ${theme}. Clean white background, e-commerce style, no text, no people.` },
    { suffix: "fmini-2",  prompt: `Best-rated item: ${theme}. Studio shot on white, professional B2B photography, no text, no people.` },
    { suffix: "fmini-3",  prompt: `Customer favorite: ${theme}. Pure white background, sharp focus, no text, no people.` },
    { suffix: "fmini-4",  prompt: `Most popular item: ${theme}. Clean catalog photo on white, no text, no people.` },
    { suffix: "prod-0",   prompt: `Product card 1: ${theme}. Centered on white seamless background, e-commerce catalog photo, no text, no people.` },
    { suffix: "prod-1",   prompt: `Product card 2 (different angle): ${theme}. White background, professional B2B, no text, no people.` },
    { suffix: "prod-2",   prompt: `Product card 3 (variant): ${theme}. Clean white background, sharp focus, no text, no people.` },
    { suffix: "prod-3",   prompt: `Product card 4: ${theme}. White seamless background, studio lighting, no text, no people.` },
    { suffix: "prod-4",   prompt: `Product card 5: ${theme}. Professional product shot on white, no text, no people.` },
    { suffix: "prod-5",   prompt: `Product card 6: ${theme}. Clean white background, e-commerce style, no text, no people.` },
    { suffix: "prod-6",   prompt: `Product card 7: ${theme}. White background catalog photo, no text, no people.` },
    { suffix: "prod-7",   prompt: `Product card 8: ${theme}. Studio shot on white, professional, no text, no people.` },
  ];
}

// ============== KEYS ==============
const ENV_TXT = await fs.readFile(ENV_PATH, "utf8");
const ALL_KEYS = [...ENV_TXT.matchAll(/^GEMINI_API_KEY[A-Za-z_0-9]*=([^\s]+)/gm)].map(m => m[1].trim());
console.log(`Probing ${ALL_KEYS.length} keys (Imagen Fast)...`);
const KEYS = [];
for (let i = 0; i < ALL_KEYS.length; i++) {
  const k = ALL_KEYS[i];
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${k}`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ instances: [{ prompt: "red apple" }], parameters: { sampleCount: 1, aspectRatio: "1:1" } })
    });
    if (r.status === 200 || r.status === 429) KEYS.push(k);
  } catch {}
}
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

async function genImagen(prompt, aspectRatio = "1:1") {
  const body = { instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio, personGeneration: "dont_allow" } };
  for (let attempt = 0; attempt < 8; attempt++) {
    const key = pickKey();
    const cd = (KEY_COOLDOWN.get(key) ?? 0) - Date.now();
    if (cd > 0) {
      const wait = Math.min(...KEYS.map(k => Math.max(0, (KEY_COOLDOWN.get(k) ?? 0) - Date.now())));
      if (wait > 0 && wait < 90000) await new Promise(r => setTimeout(r, wait + 500));
    }
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${pickKey()}`, {
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

await fs.mkdir(IMG_DIR, { recursive: true });
await fs.mkdir(CAT_OUT, { recursive: true });

let ok = 0, fail = 0, total = 0;
for (const cat of CATEGORIES) {
  const imgs = imagesFor(cat.theme);
  console.log(`\n=== ${cat.slug} (${imgs.length} images) ===`);
  for (const it of imgs) {
    total++;
    const slug = `${cat.slug}-sc-${it.suffix}`;
    const outPath = path.join(IMG_DIR, `${slug}.jpg`);
    const catPath = path.join(CAT_OUT, `${slug}.jpg`);
    // Use 4:3 for fvideo, 1:1 for others
    const ar = it.suffix === "fvideo" ? "4:3" : "1:1";
    const w = it.suffix === "fvideo" ? 600 : 400;
    const h = it.suffix === "fvideo" ? 450 : 400;
    let success = false;
    for (let tryIdx = 0; tryIdx < 3 && !success; tryIdx++) {
      try {
        const raw = await genImagen(it.prompt, ar);
        const resized = await sharp(raw).resize(w, h, { fit: "cover", position: "centre" }).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
        await fs.writeFile(outPath, resized);
        await fs.writeFile(catPath, resized);
        success = true;
        ok++;
        console.log(`  ✓ ${slug}`);
      } catch (e) {
        if (tryIdx === 2) { fail++; console.log(`  ✗ ${slug}: ${e.message.slice(0, 60)}`); }
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    await new Promise(r => setTimeout(r, 500));
  }
}

console.log(`\n=== Done: ${ok}/${total} ok, ${fail} failed ===`);
