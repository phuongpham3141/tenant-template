import fs from 'node:fs';
import path from 'node:path';
// Catch EVERY quoted string in data files that contains a Vietnamese-specific
// diacritic letter → it is display text (names, categories, prices like "Liên
// hệ", "58 năm", hot searches, HQ/desc, venues...). Brands/slugs/codes/urls
// (no diacritics) are skipped automatically.
const VN = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const DIRS = ['/work/src/data', '/work/src/data/catalogs'];
const strRe = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
const set = new Set();
let files = 0;
function scan(file) {
  const src = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = strRe.exec(src))) {
    const v = m[1];
    if (!v || v.length > 200) continue;
    if (/^https?:\/\//.test(v) || /\.(jpg|png|webp|svg|jpeg|gif)$/i.test(v)) continue;
    if (VN.test(v)) set.add(v);
  }
  files++;
}
for (const d of DIRS) {
  if (!fs.existsSync(d)) continue;
  for (const e of fs.readdirSync(d)) if (e.endsWith('.ts')) scan(path.join(d, e));
}
const obj = {};
for (const s of [...set]) obj[s] = s;
fs.writeFileSync('/work/scripts/gen-out/data-vi.json', JSON.stringify(obj, null, 2));
console.log('scanned', files, 'files | VN-diacritic strings:', set.size);
