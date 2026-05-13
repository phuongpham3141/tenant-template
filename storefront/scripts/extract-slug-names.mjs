// Parse source files to extract (slug, original Vietnamese name) pairs.
// Output to slug-real-names.json — used by gen-pipeline.mjs to build accurate prompts.
//
// Pattern 1: `{ name: "Chậu cây composite cao 80cm", image: "https://picsum.photos/seed/cat1-1/300/300" }`
// Pattern 2: `{ name: "...", image: \`/img/cat1-1.jpg?v=3\` }` (post-replacement)
// Pattern 3: `{ id: "ceramic-1", title: "Gạch...", ..., image: "/img/cer1.jpg" }` (home.ts products)
// Pattern 4: Dynamic seeds like `cat${n}-s${m}-${i}` paired with names in array

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "scripts", "slug-real-names.json");

const filesToScan = [
  "src/data/categories.ts",
  "src/data/home.ts",
  "src/data/products.ts",
];

const result = {};

for (const rel of filesToScan) {
  const full = path.join(ROOT, rel);
  let txt;
  try { txt = await fs.readFile(full, "utf8"); } catch { continue; }

  // Pattern A: { name: "X", image: "/img/Y.jpg?v=3" }
  // Also legacy: { name: "X", image: "https://picsum.photos/seed/Y/W/H" }
  const reA = /\{[^}]*?name:\s*"([^"]+)"[^}]*?image:\s*"(?:\/img\/([^."]+)\.jpg|https:\/\/picsum\.photos\/seed\/([^/]+)\/\d+\/\d+)"[^}]*?\}/g;
  let m;
  while ((m = reA.exec(txt)) !== null) {
    const name = m[1];
    const slug = m[2] || m[3];
    if (slug && !result[slug]) result[slug] = name;
  }

  // Pattern B: { id: "X", title: "...", ..., image: "/img/Y.jpg" }  (home.ts products)
  const reB = /\{[^}]*?title:\s*"([^"]+)"[^}]*?image:\s*"\/img\/([^."]+)\.jpg(?:\?[^"]*)?"[^}]*?\}/g;
  while ((m = reB.exec(txt)) !== null) {
    const name = m[1];
    const slug = m[2];
    if (slug && !result[slug]) result[slug] = name;
  }

  // Pattern C: zones array { slug: "X", name: "Y" } (no image but inferred zone1..N mapping)
  // Skip for now — zones already done

  // Pattern D: Dynamic seeds in template arrays — section.products + seed pattern
  // categories.ts has sections with products array containing { name: "..." } items
  // and image template like `/img/cat${n}-s${m}-${i}.jpg`
  // Find arrays where each item has a name and the section produces sequential slugs.
  //
  // Look for blocks: section i with `cat${n}-s${m}` template followed by products array
  // For each, indexed products map to cat${n}-s${m}-${i}.
  const reD = /image:\s*`\/img\/cat(\d+)-s(\d+)-\$\{i\}\.jpg(?:\?[^`]*)?`,\s*products:\s*\[([^\]]+)\]/g;
  while ((m = reD.exec(txt)) !== null) {
    const n = m[1], s = m[2], block = m[3];
    const names = [...block.matchAll(/name:\s*"([^"]+)"/g)].map(x => x[1]);
    names.forEach((name, i) => {
      const slug = `cat${n}-s${s}-${i}`;
      if (!result[slug]) result[slug] = name;
    });
  }

  // Pattern E: Hero products inside section { name, image: ... } with explicit slug
  // already covered by Pattern A

  // Pattern F: Factory slugs from FACTORIES array in home.ts
  // { slug: "oppein-home", name: "OPPEIN Home Group Inc.", ... }
  const reF = /\{[^}]*?slug:\s*"([^"]+)"[^}]*?name:\s*"([^"]+)"[^}]*?\}/g;
  while ((m = reF.exec(txt)) !== null) {
    const slug = m[1], name = m[2];
    // Save factory slug → for use with cover/line images
    if (!result[`factory-${slug}`]) result[`factory-${slug}`] = `${name} factory manufacturing scene`;
    if (!result[`${slug}-cover`]) result[`${slug}-cover`] = `${name} factory banner overview`;
  }
}

await fs.writeFile(OUT, JSON.stringify(result, Object.keys(result).sort(), 2));
console.log(`Extracted ${Object.keys(result).length} (slug → name) pairs to ${path.basename(OUT)}`);
console.log("Samples:");
for (const k of Object.keys(result).slice(0, 10)) console.log(`  ${k} → ${result[k]}`);
