// Image verification + auto-retry loop.
// For each image in public/img/, ask Gemini vision: "does this match the description?"
// If no, regenerate via Imagen and re-verify. Up to N tries per image.
//
// Usage:
//   node scripts/verify-and-retry.mjs                  # verify all, retry bad
//   node scripts/verify-and-retry.mjs --audit-only     # just audit, don't retry
//   node scripts/verify-and-retry.mjs --only=a,b,c     # specific slugs
//   node scripts/verify-and-retry.mjs --max-retries=N  # default 3

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");
const TRANS_FILE = path.join(ROOT, "scripts", "slug-translations.json");
const AUDIT_FILE = path.join(ROOT, "scripts", "audit-results.json");

const args = process.argv.slice(2);
const AUDIT_ONLY = args.includes("--audit-only");
const ONLY = args.find(a => a.startsWith("--only="))?.slice(7).split(",");
const MAX_RETRIES = parseInt(args.find(a => a.startsWith("--max-retries="))?.slice(14)) || 3;
const CONCURRENCY = parseInt(args.find(a => a.startsWith("--concurrency="))?.slice(14)) || 5;
const MIN_CONFIDENCE = 0.7;

const API_KEY = (await fs.readFile(ENV_PATH, "utf8")).match(/GEMINI_API_KEY=([^\s]+)/)?.[1]?.trim();
if (!API_KEY) { console.error("Missing key"); process.exit(1); }

const VISION_MODEL = "gemini-2.5-flash";
const IMAGEN_MODEL = "imagen-4.0-fast-generate-001";

const translations = JSON.parse(await fs.readFile(TRANS_FILE, "utf8"));

// =============== VISION VERIFY ===============
async function verifyImage(imgBuf, description) {
  // Resize to 256×256 for faster vision call (vision doesn't need high-res)
  const small = await sharp(imgBuf).resize(256, 256, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
  const b64 = small.toString("base64");

  const prompt = `You are reviewing an AI-generated B2B product catalog image.

The image was supposed to depict: "${description}"

Look at the image carefully and answer in JSON:
- matches: true if the image clearly shows the intended subject. false if it shows something completely different (e.g., food when furniture was requested, a burger when a faucet was requested).
- actual: 5-8 words describing what you actually see in the image
- confidence: 0.0-1.0 how confident you are in your matches decision

Be strict: if the image shows a different category of object (food vs hardware), set matches=false. If it shows the right object but stylized, set matches=true.

Respond with ONLY the JSON, no prose:
{"matches": true|false, "actual": "...", "confidence": 0.x}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${VISION_MODEL}:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{
      parts: [
        { text: prompt },
        { inlineData: { mimeType: "image/jpeg", data: b64 } }
      ]
    }],
    generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
  };
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json();
  if (!res.ok) throw new Error(`vision ${res.status}: ${JSON.stringify(json).slice(0, 200)}`);
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error(`vision no text: ${JSON.stringify(json).slice(0, 200)}`);
  return JSON.parse(text);
}

// =============== IMAGEN GENERATE ===============
async function genImage(description, tryIdx) {
  // Vary prompt slightly on retries to get different output
  const variants = [
    `A single ${description}, centered on a pure white seamless background, clean professional e-commerce product photography, soft studio lighting, sharp focus, no text, no watermarks, no people.`,
    `Studio product photo of a ${description}. Pure white background, professional B2B catalog photography, top-quality, no text, no people.`,
    `Clear professional photograph of one ${description} isolated on white background, e-commerce style, no clutter, no text, no people.`,
  ];
  const prompt = variants[Math.min(tryIdx, variants.length - 1)];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGEN_MODEL}:predict?key=${API_KEY}`;
  const body = {
    instances: [{ prompt }],
    parameters: { sampleCount: 1, aspectRatio: "1:1", personGeneration: "dont_allow" }
  };
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json();
  if (!res.ok) throw new Error(`imagen ${res.status}: ${JSON.stringify(json).slice(0, 200)}`);
  const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`imagen no data`);
  return Buffer.from(b64, "base64");
}

// =============== PER-IMAGE WORKFLOW ===============
async function processOne(slug, currentImgPath, description) {
  // Step 1: verify existing image
  let imgBuf;
  try {
    imgBuf = await fs.readFile(currentImgPath);
  } catch {
    return { slug, status: "missing", actual: null };
  }

  try {
    const verdict = await verifyImage(imgBuf, description);
    if (verdict.matches && verdict.confidence >= MIN_CONFIDENCE) {
      return { slug, status: "ok", actual: verdict.actual, confidence: verdict.confidence };
    }

    // Mismatch: retry
    if (AUDIT_ONLY) {
      return { slug, status: "mismatch", actual: verdict.actual, confidence: verdict.confidence };
    }

    for (let tryIdx = 0; tryIdx < MAX_RETRIES; tryIdx++) {
      const newRaw = await genImage(description, tryIdx);
      const newResized = await sharp(newRaw).resize(80, 80, { fit: "cover", position: "centre" }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      const newVerdict = await verifyImage(newRaw, description); // verify on full-res before resize
      if (newVerdict.matches && newVerdict.confidence >= MIN_CONFIDENCE) {
        await fs.writeFile(currentImgPath, newResized);
        return { slug, status: "retried-ok", tries: tryIdx + 1, actual: newVerdict.actual, confidence: newVerdict.confidence };
      }
    }
    return { slug, status: "retry-failed", actual: "still mismatched after " + MAX_RETRIES + " tries" };
  } catch (e) {
    return { slug, status: "error", error: e.message.slice(0, 200) };
  }
}

// =============== MAIN ===============
const files = await fs.readdir(IMG_DIR);
const slugs = files
  .filter(f => f.endsWith(".jpg"))
  .map(f => f.replace(/\.jpg$/, ""))
  .filter(s => !ONLY || ONLY.includes(s));

console.log(`Auditing ${slugs.length} images (concurrency=${CONCURRENCY}, max-retries=${MAX_RETRIES}${AUDIT_ONLY ? ", audit only" : ""})\n`);

let prev = {};
try { prev = JSON.parse(await fs.readFile(AUDIT_FILE, "utf8")).reduce((acc, r) => (acc[r.slug] = r, acc), {}); } catch {}

const results = [];
const stats = { ok: 0, mismatch: 0, "retried-ok": 0, "retry-failed": 0, error: 0, missing: 0 };

// Concurrency pool
async function runPool(items, fn) {
  const queue = [...items];
  let done = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const item = queue.shift();
      const r = await fn(item);
      results.push(r);
      stats[r.status] = (stats[r.status] || 0) + 1;
      done++;
      if (done % 25 === 0 || stats.mismatch + stats["retry-failed"] + stats.error <= 5) {
        const note = r.status === "ok" ? "" : ` (${r.status}${r.actual ? ": " + r.actual : ""})`;
        console.log(`  [${done}/${items.length}] ${r.status === "ok" ? "✓" : r.status === "retried-ok" ? "🔄" : "✗"} ${r.slug}${note}`);
      }
      // Persist progress every 50
      if (done % 50 === 0) {
        await fs.writeFile(AUDIT_FILE, JSON.stringify(results, null, 2));
      }
    }
  }));
}

await runPool(slugs, async (slug) => {
  const description = translations[slug] || slug.replace(/-/g, " ");
  const imgPath = path.join(IMG_DIR, `${slug}.jpg`);
  return processOne(slug, imgPath, description);
});

await fs.writeFile(AUDIT_FILE, JSON.stringify(results, null, 2));

console.log(`\n=== Summary ===`);
for (const [k, v] of Object.entries(stats)) console.log(`  ${k}: ${v}`);
console.log(`\nFull results: ${AUDIT_FILE}`);

const stillBad = results.filter(r => r.status === "mismatch" || r.status === "retry-failed");
if (stillBad.length) {
  console.log(`\n⚠️  ${stillBad.length} still bad:`);
  stillBad.slice(0, 20).forEach(r => console.log(`  - ${r.slug}: ${r.actual || r.error}`));
}
