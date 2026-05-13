// Generate AI banners for factory cards + trade shows (replacing Unsplash stock).
// Each factory gets a unique AI-generated manufacturing scene matching its industry.
// Uses verify loop to ensure quality.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");
const CAT_OUT = path.join(ROOT, "scripts", "images-categorized", "ncc");

const API_KEY = (await fs.readFile(ENV_PATH, "utf8")).match(/GEMINI_API_KEY=([^\s]+)/)?.[1]?.trim();
if (!API_KEY) { process.exit(1); }

const VISION_MODEL = "gemini-2.5-flash";
const IMAGEN_MODEL = "imagen-4.0-fast-generate-001";

// Factory slug → AI prompt subject (specific to each factory's industry)
const FACTORIES = {
  "dongpeng-ceramics":   "Aerial wide view of a large modern ceramic tile factory warehouse interior with neat rows of stacked porcelain floor tiles on pallets, industrial overhead lighting, polished concrete floor, no people",
  "monalisa-group":      "Modern ceramic tile production line with conveyor belt carrying glossy decorative tiles, robotic arms, clean factory floor, no people",
  "newpearl-ceramics":   "Wide angle view of an automated ceramic tile manufacturing facility with conveyor belts and tile-pressing machines, clean industrial environment, no people",
  "ortonbaths-group":    "Bathroom sanitary ware factory with rows of white ceramic toilets and washbasins on assembly line conveyors, industrial setting, no people",
  "kuka-home":           "Modern furniture manufacturing facility with rows of finished upholstered sofas in plastic wrapping ready for shipment, large warehouse, no people",
  "oppein-home":         "Modern kitchen cabinet factory with rows of finished glossy kitchen cabinet doors stacked on shelves, industrial woodworking environment, no people",
  "landbond-furniture":  "Wide view of a wooden furniture factory floor with stacks of finished wooden chairs and tables, lumber pallets, industrial setting, no people",
  "zuoyou-furniture":    "Furniture warehouse interior with long aisles of stacked finished sofas and chairs in protective wrapping, industrial storage, no people",
  "redapple-furniture":  "Furniture production floor with assembly stations for wooden bedroom furniture, lumber and finished pieces, industrial setting, no people",
  "fallback-factory":    "Wide angle interior of a clean modern Chinese manufacturing factory with industrial machinery and conveyor belts, organized production floor, no people",
};

async function genImagen(prompt, w, h) {
  const r = w / h;
  let ar = "1:1";
  if (r > 1.5) ar = "16:9";
  else if (r > 1.2) ar = "4:3";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGEN_MODEL}:predict?key=${API_KEY}`;
  const body = { instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio: ar, personGeneration: "dont_allow" } };
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    if (res.status === 429) { await new Promise(r => setTimeout(r, 20000 + attempt * 15000)); continue; }
    const json = await res.json();
    if (!res.ok) throw new Error(`imagen ${res.status}`);
    const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) throw new Error("no data");
    return Buffer.from(b64, "base64");
  }
  throw new Error("rate limited");
}

async function verifyImage(imgBuf, description) {
  const small = await sharp(imgBuf).resize(256, 256, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
  const b64 = small.toString("base64");
  const prompt = `Looking at this AI-generated image. Expected: "${description}".\n\nReturn ONLY JSON: {"matches": true|false, "actual": "5-8 word description", "confidence": 0.x}\n\nBe strict — wrong subject category means false.`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${VISION_MODEL}:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: b64 } }] }],
    generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
  };
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
}

const STYLE = ". Photorealistic professional industrial photography, soft natural lighting, sharp focus, no text, no watermarks, no people, high detail.";
await fs.mkdir(IMG_DIR, { recursive: true });
await fs.mkdir(CAT_OUT, { recursive: true });

const W = 640, H = 360;

console.log(`Generating ${Object.keys(FACTORIES).length} factory banners (${W}×${H})...`);

for (const [slug, subject] of Object.entries(FACTORIES)) {
  const outName = slug === "fallback-factory" ? "factory-fallback.jpg" : `factory-${slug}.jpg`;
  const outPath = path.join(IMG_DIR, outName);
  const catPath = path.join(CAT_OUT, outName);

  try {
    await fs.access(outPath);
    console.log(`  skip ${slug} (exists)`);
    continue;
  } catch {}

  let success = false;
  for (let tryIdx = 0; tryIdx < 3 && !success; tryIdx++) {
    try {
      const raw = await genImagen(subject + STYLE, W, H);
      const verdict = await verifyImage(raw, subject);
      if (verdict.matches && verdict.confidence >= 0.7) {
        const resized = await sharp(raw).resize(W, H, { fit: "cover", position: "centre" }).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
        await fs.writeFile(outPath, resized);
        await fs.writeFile(catPath, resized);
        console.log(`  ✓ ${slug} (try ${tryIdx + 1}) — ${verdict.actual}`);
        success = true;
      } else {
        console.log(`  ↻ ${slug} try ${tryIdx + 1} mismatch: ${verdict.actual}`);
      }
      await new Promise(r => setTimeout(r, 1500));
    } catch (e) {
      console.error(`  ✗ ${slug} try ${tryIdx + 1}: ${e.message.slice(0, 100)}`);
    }
  }
  if (!success) console.error(`  ✗✗ ${slug} FAILED after 3 tries`);
}

console.log("\nDone");
