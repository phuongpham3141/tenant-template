// Probe all GEMINI keys against 3 Imagen models to detect suspended accounts.
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const txt = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
const keys = [...txt.matchAll(/^GEMINI_API_KEY[A-Za-z_0-9]*=([^\s]+)/gm)];

const MODELS = ["imagen-4.0-fast-generate-001", "imagen-4.0-generate-001", "imagen-4.0-ultra-generate-001"];

for (let i = 0; i < keys.length; i++) {
  const name = keys[i][0].split("=")[0];
  const k = keys[i][1];
  const results = [];
  for (const model of MODELS) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${k}`, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ instances: [{ prompt: "red apple" }], parameters: { sampleCount: 1, aspectRatio: "1:1" } })
      });
      const j = await r.json();
      const short = model.split("-")[2]; // fast, generate, ultra
      const msg = r.status === 200 ? "OK" : ((j?.error?.status || "") + " " + (j?.error?.message || "?")).slice(0, 100);
      results.push(`${short}=${r.status} ${msg}`);
    } catch (e) { results.push(`err`); }
  }
  console.log(`[${i + 1}] ${name}:\n  ${results.join("\n  ")}\n`);
}
