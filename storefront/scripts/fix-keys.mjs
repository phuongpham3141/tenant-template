import fs from 'node:fs';
const R = '/work/src/components/home/';
let n = 0;
function edit(file, pairs) {
  const p = R + file;
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) {
    if (s.includes(a)) { s = s.replace(a, b); n++; }
    else console.log('NOT FOUND in', file, ':', a.slice(0, 40));
  }
  fs.writeFileSync(p, s);
}
// factories brandTags: add index, unique key
edit('factories.tsx', [
  ['{brandTags(p).map((t) => (', '{brandTags(p).map((t, ti) => ('],
  ['key={t}', 'key={`${p.slug}-${ti}`}'],
]);
// mega-submenu sections items: add index, unique key
edit('mega-submenu.tsx', [
  ['{s.items.map((sub) => (', '{s.items.map((sub, si) => ('],
  ['key={sub.name}', 'key={`${sub.name}-${si}`}'],
]);
// product-section tabs: index i already in scope
edit('product-section.tsx', [
  ['key={t}', 'key={`${t}-${i}`}'],
]);
console.log('edits applied:', n);
