// Bulk thumbnail generator for mega-menu (80×80) — 724 unique Vietnamese product slugs.
// Reads seeds from seeds-80x80.txt, converts slug-with-dashes to spaced Vietnamese
// phrase, generates square thumbnails via Imagen 4, saves to public/img/<slug>.jpg
// AND mirrors to GiaoDien/images backup folder (passed as --backup=PATH).
//
// Usage:
//   node scripts/gen-thumbnails.mjs --backup=/path/to/backup [--limit=N] [--force]

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");
const SEEDS_FILE = path.join(ROOT, "scripts", "seeds-80x80.txt");
const TRANS_FILE = path.join(ROOT, "scripts", "slug-translations.json");

const translations = JSON.parse(await fs.readFile(TRANS_FILE, "utf8"));

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const LIMIT = parseInt(args.find(a => a.startsWith("--limit="))?.slice(8)) || Infinity;
const BACKUP = args.find(a => a.startsWith("--backup="))?.slice(9);

async function readKey() {
  const txt = await fs.readFile(ENV_PATH, "utf8");
  return txt.match(/GEMINI_API_KEY=([^\s]+)/)?.[1]?.trim();
}

const API_KEY = await readKey();
if (!API_KEY) { console.error("Missing GEMINI_API_KEY in .env.local"); process.exit(1); }

const MODEL = "imagen-4.0-fast-generate-001"; // cheaper for bulk thumbnails

async function genImagen(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`;
  const body = {
    instances: [{ prompt }],
    parameters: { sampleCount: 1, aspectRatio: "1:1", personGeneration: "dont_allow" }
  };
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json();
  if (!res.ok) throw new Error(`imagen ${res.status}: ${JSON.stringify(json).slice(0, 200)}`);
  const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`no data: ${JSON.stringify(json).slice(0, 200)}`);
  return Buffer.from(b64, "base64");
}

// Build prompt from slug using English translation (falls back to Vietnamese phrase).
function buildPrompt(slug) {
  const english = translations[slug] || slug.replace(/-/g, " ");
  return `A single ${english}, centered on a pure white seamless background, clean professional e-commerce product photography, soft studio lighting, sharp focus, no text, no watermarks, no people.`;
}

await fs.mkdir(OUT_DIR, { recursive: true });
if (BACKUP) await fs.mkdir(BACKUP, { recursive: true });

const seedFileTxt = await fs.readFile(SEEDS_FILE, "utf8");
const slugs = seedFileTxt
  .split("\n")
  .map(l => l.match(/seed\/([^/]+)\/80\/80/)?.[1])
  .filter(Boolean)
  .slice(0, LIMIT);

console.log(`Generating ${slugs.length} 80×80 thumbnails → ${OUT_DIR}`);
if (BACKUP) console.log(`Backup mirror → ${BACKUP}\n`); else console.log("");

let ok = 0, skip = 0, fail = 0;
const failed = [];

for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  const out = path.join(OUT_DIR, `${slug}.jpg`);
  const backupOut = BACKUP ? path.join(BACKUP, `${slug}.jpg`) : null;

  if (!FORCE) {
    try { await fs.access(out); skip++; if (i < 5 || i % 50 === 0) console.log(`  skip ${slug} (exists)`); continue; } catch {}
  }

  try {
    const raw = await genImagen(buildPrompt(slug));
    const resized = await sharp(raw).resize(80, 80, { fit: "cover", position: "centre" }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    await fs.writeFile(out, resized);
    if (backupOut) await fs.writeFile(backupOut, resized);
    ok++;
    if (i % 10 === 0 || i < 5) console.log(`  [${i + 1}/${slugs.length}] ✓ ${slug} (${resized.length}B)`);
    await new Promise(r => setTimeout(r, 600)); // rate limit, fast model
  } catch (e) {
    fail++;
    failed.push({ slug, err: e.message });
    console.error(`  [${i + 1}/${slugs.length}] ✗ ${slug}: ${e.message.slice(0, 100)}`);
    if (/quota|RESOURCE_EXHAUSTED|429/i.test(e.message)) {
      console.log("Rate limited — sleeping 30s");
      await new Promise(r => setTimeout(r, 30000));
    }
  }
}

if (failed.length) {
  await fs.writeFile(path.join(ROOT, "scripts", "thumbnails-failed.json"), JSON.stringify(failed, null, 2));
  console.log(`\nFailed list saved to scripts/thumbnails-failed.json`);
}

console.log(`\nDone — ok=${ok} skip=${skip} fail=${fail}`);
