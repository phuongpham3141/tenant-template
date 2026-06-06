import fs from 'node:fs';
import path from 'node:path';
const DIRS = ['/work/src/data', '/work/src/data/catalogs'];
const re = /\b(name|title|label|tagline|count|subtitle|eyebrow|cta|desc|description|blurb|caption|heading|role|company)\s*:\s*"([^"]+)"/g;
const set = new Set();
let files = 0;
function scan(file) {
  const src = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = re.exec(src))) {
    const v = m[2].trim();
    if (!v) continue;
    // skip pure codes / urls / very short tokens that don't need translation
    if (/^https?:\/\//.test(v)) continue;
    set.add(v);
  }
  files++;
}
for (const d of DIRS) {
  if (!fs.existsSync(d)) continue;
  for (const e of fs.readdirSync(d)) {
    if (e.endsWith('.ts')) scan(path.join(d, e));
  }
}
const arr = [...set];
const obj = {};
for (const s of arr) obj[s] = s;
fs.writeFileSync('/work/scripts/gen-out/data-vi.json', JSON.stringify(obj, null, 2));
console.log('scanned', files, 'data files | unique strings:', arr.length);
