import fs from 'node:fs';
const src = fs.readFileSync('/work/src/data/home.ts', 'utf8');
// Pull display string values: name/title/label/tagline/count (skip slugs, hrefs, images)
const re = /\b(name|title|label|tagline|count|subtitle|eyebrow|cta)\s*:\s*"([^"]+)"/g;
const set = new Set();
let m;
while ((m = re.exec(src))) {
  const v = m[2].trim();
  // skip pure codes/standards/dims that don't need translation (heuristic: ALL-CAPS codes, pure numbers/units)
  if (!v) continue;
  set.add(v);
}
const arr = [...set];
const obj = {};
for (const s of arr) obj[s] = s;
fs.writeFileSync('/work/scripts/gen-out/data-vi.json', JSON.stringify(obj, null, 2));
console.log('unique data strings:', arr.length);
console.log('sample:', arr.slice(0, 8));
