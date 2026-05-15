import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const txt = await fs.readFile(path.join(ROOT, "src/data/categories.ts"), "utf8");
const cats = ["home-garden","construction-materials","bathroom-sanitary","noi-that","kitchen-equipment","lighting","doors-windows","hotel-supplies","hardware-tools","decoration","outdoor-garden","electrical"];

let totalSubcats = 0;
const per = {};
for (const cat of cats) {
  const m = txt.match(new RegExp(`"${cat}":\\s*\\{[\\s\\S]*?\\n  \\},`));
  if (!m) continue;
  const block = m[0];
  // Find sections array
  const secStart = block.indexOf("sections:");
  if (secStart === -1) continue;
  const sectionsBlock = block.slice(secStart);
  // Match slug values in subcats — every slug except the top-level category one
  const slugs = [...sectionsBlock.matchAll(/slug:\s*"([^"]+)"/g)].map(x => x[1]);
  const uniq = [...new Set(slugs)];
  per[cat] = uniq.length;
  totalSubcats += uniq.length;
}
console.log(JSON.stringify(per, null, 2));
console.log("TOTAL SUBCATS:", totalSubcats);
console.log("IMAGES @ 14/subcat:", totalSubcats * 14);
