import fs from 'node:fs';
import path from 'node:path';
const VN = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const DIRS = ['/work/src/data', '/work/src/data/catalogs', '/work/src/components/home'];
const FILES = ['/work/src/components/lang-switcher.tsx', '/work/src/lib/i18n.ts'];
const strRe = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
const set = new Set();
let n = 0;
function scan(file) {
  if (!fs.existsSync(file)) return;
  const src = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = strRe.exec(src))) {
    const v = m[1];
    if (!v || v.length > 200) continue;
    if (/^https?:\/\//.test(v) || /\.(jpg|png|webp|svg|jpeg|gif)$/i.test(v)) continue;
    if (VN.test(v)) set.add(v);
  }
  n++;
}
for (const d of DIRS) {
  if (!fs.existsSync(d)) continue;
  for (const e of fs.readdirSync(d)) if (e.endsWith('.ts') || e.endsWith('.tsx')) scan(path.join(d, e));
}
for (const f of FILES) scan(f);
const obj = {};
for (const s of [...set]) obj[s] = s;
fs.writeFileSync('/work/scripts/gen-out/data-vi.json', JSON.stringify(obj, null, 2));
console.log('scanned', n, 'files | VN strings:', set.size);
