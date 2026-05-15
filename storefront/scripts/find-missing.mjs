// Identify exactly which slugs are missing from public/img per category.
// Uses gen-category.mjs parsing logic to get expected list.

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");
const CAT_TS = path.join(ROOT, "src", "data", "categories.ts");

const CATEGORIES = [
  "home-garden", "construction-materials", "bathroom-sanitary",
  "noi-that", "kitchen-equipment", "lighting",
  "doors-windows", "hotel-supplies", "hardware-tools",
  "decoration", "outdoor-garden", "electrical",
];

const catTsContent = await fs.readFile(CAT_TS, "utf8");
const existingFiles = new Set((await fs.readdir(IMG_DIR)).filter(f => f.endsWith(".jpg")).map(f => f.replace(/\.jpg$/, "")));

const allMissing = {};
let totalExpected = 0, totalMissing = 0;

for (const CATEGORY of CATEGORIES) {
  const blockRegex = new RegExp(`"${CATEGORY}":\\s*\\{[\\s\\S]*?\\n  \\},`);
  const blockMatch = catTsContent.match(blockRegex);
  if (!blockMatch) { console.error(`Not found: ${CATEGORY}`); continue; }
  const block = blockMatch[0];

  const productPairs = [];

  // Pattern A: static {name:"X", image:"/img/Y.jpg"}
  const reStatic = /\{\s*name:\s*"([^"]+)",\s*image:\s*"\/img\/([^."]+)\.jpg(?:\?[^"]*)?"\s*\}/g;
  let m;
  while ((m = reStatic.exec(block)) !== null) {
    productPairs.push({ slug: m[2], vn: m[1] });
  }

  // Pattern B/C: dynamic
  const chunks = block.split(/products:\s*(?:Array\.from\b|\[)/);
  for (let c = 1; c < chunks.length; c++) {
    const chunk = chunks[c];
    const namesM = chunk.match(/name:\s*\[([\s\S]*?)\]\[i\]/);
    if (!namesM) continue;
    const names = [...namesM[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);
    const imgTplM = chunk.match(/image:\s*`\/img\/([^`]+)`/);
    if (imgTplM) {
      const slugTpl = imgTplM[1].replace(/\.jpg\?.*$|\.jpg$/, "");
      names.forEach((vn, i) => productPairs.push({ slug: slugTpl.replace(/\$\{i\}/g, String(i)), vn }));
      continue;
    }
    const imgFnM = chunk.match(/image:\s*f\(([^)]+)\)/);
    if (imgFnM) {
      const expr = imgFnM[1].trim();
      names.forEach((vn, i) => {
        let val; try { val = Function("i", `return ${expr}`)(i); } catch { return; }
        productPairs.push({ slug: `cat${val}`, vn });
      });
    }
  }

  const missing = productPairs.filter(p => !existingFiles.has(p.slug));
  totalExpected += productPairs.length;
  totalMissing += missing.length;
  if (missing.length) {
    allMissing[CATEGORY] = missing;
    console.log(`\n[${CATEGORY}] ${missing.length}/${productPairs.length} missing:`);
    missing.forEach(p => console.log(`  ${p.slug} | ${p.vn}`));
  } else {
    console.log(`[${CATEGORY}] OK ${productPairs.length}/${productPairs.length}`);
  }
}

await fs.writeFile(path.join(ROOT, "scripts", "missing-slugs.json"), JSON.stringify(allMissing, null, 2));
console.log(`\n=== Total: ${totalMissing}/${totalExpected} missing ===`);
