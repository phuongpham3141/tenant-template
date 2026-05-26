// Translate Vietnamese product slugs to English descriptions in batches via Gemini text API.
// Saves result to scripts/slug-translations.json for use by gen-thumbnails.mjs.

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const ENV_PATH = path.join(ROOT, ".env.local");
const SEEDS_FILE = path.join(ROOT, "scripts", "seeds-80x80.txt");
const OUT_FILE = path.join(ROOT, "scripts", "slug-translations.json");

const API_KEY = (await fs.readFile(ENV_PATH, "utf8")).match(/GEMINI_API_KEY=([^\s]+)/)?.[1]?.trim();
if (!API_KEY) { console.error("Missing key"); process.exit(1); }

const MODEL = "gemini-2.5-flash";
const BATCH = 30;

async function translateBatch(slugs) {
  const list = slugs.map(s => `- ${s}`).join("\n");
  const prompt = `These are Vietnamese product category slugs (dash-separated). For each slug, output a clear 3-8 word English product description that an image generator would understand. Output ONLY a JSON object mapping slug to description. No prose.

Example output:
{"bep-bbq-gas":"gas barbecue grill","ban-an":"wooden dining table"}

Slugs:
${list}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
  };
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json();
  if (!res.ok) throw new Error(`text ${res.status}: ${JSON.stringify(json).slice(0, 200)}`);
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error(`no text: ${JSON.stringify(json).slice(0, 200)}`);
  return JSON.parse(text);
}

const seedFileTxt = await fs.readFile(SEEDS_FILE, "utf8");
const slugs = seedFileTxt
  .split("\n")
  .map(l => l.match(/seed\/([^/]+)\/80\/80/)?.[1])
  .filter(Boolean);

console.log(`Translating ${slugs.length} slugs in batches of ${BATCH}...`);

let existing = {};
try { existing = JSON.parse(await fs.readFile(OUT_FILE, "utf8")); } catch {}

const pending = slugs.filter(s => !existing[s]);
console.log(`${Object.keys(existing).length} already done, ${pending.length} pending`);

for (let i = 0; i < pending.length; i += BATCH) {
  const batch = pending.slice(i, i + BATCH);
  try {
    const result = await translateBatch(batch);
    Object.assign(existing, result);
    await fs.writeFile(OUT_FILE, JSON.stringify(existing, null, 2));
    console.log(`  [${Math.min(i + BATCH, pending.length)}/${pending.length}] ✓ ${Object.keys(result).length} translations`);
    await new Promise(r => setTimeout(r, 1000));
  } catch (e) {
    console.error(`  batch ${i}: ${e.message.slice(0, 150)}`);
    await new Promise(r => setTimeout(r, 5000));
  }
}

console.log(`\nDone. Total: ${Object.keys(existing).length} translations saved to ${OUT_FILE}`);
