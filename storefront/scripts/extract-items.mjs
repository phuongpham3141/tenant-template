import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'src/data/home.ts'), 'utf8');
// extract the NAV_MENU array literal
const i = src.indexOf('export const NAV_MENU');
const eq = src.indexOf('= [', i);
const start = src.indexOf('[', eq);
// find matching ]
let depth = 0, end = -1;
for (let j = start; j < src.length; j++) {
  const c = src[j];
  if (c === '[') depth++;
  else if (c === ']') { depth--; if (depth === 0) { end = j; break; } }
}
const arrText = src.slice(start, end + 1);
const NAV = eval('(' + arrText + ')');

const items = [];
for (const g of NAV) {
  const cat = g.main?.name || '?';
  const catSlug = g.main?.slug || '?';
  for (let k = 0; k < (g.items || []).length; k++) {
    const it = g.items[k];
    items.push({ cat, catSlug, idx: k, name: it.name, slug: it.slug, image: (it.image || '').replace(/\?.*$/, '') });
  }
}
// uniqueness of primary images
const byImg = {};
for (const it of items) (byImg[it.image] ||= []).push(it.name);
const shared = Object.entries(byImg).filter(([, ns]) => new Set(ns).size > 1);
console.log('total group.items:', items.length);
console.log('distinct primary images:', Object.keys(byImg).length);
console.log('images shared across DIFFERENT names:', shared.length);
console.log('sample shared:', JSON.stringify(shared.slice(0, 5)));
fs.writeFileSync(path.join(ROOT, 'scripts/nav-items.json'), JSON.stringify(items, null, 1));
console.log('wrote nav-items.json');
