import fs from 'node:fs';
const R = '/work/src/components/home/';
let n = 0;
function edit(file, pairs) {
  const p = R + file;
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) {
    if (s.includes(a)) { s = s.replace(a, b); n++; }
    else console.log('NOT FOUND', file, ':', a.slice(0, 36));
  }
  fs.writeFileSync(p, s);
}
edit('mega-submenu.tsx', [
  ['{item.sections.map((s) => (', '{item.sections.map((s, si) => ('],
  ['key={s.title}', 'key={`${s.title}-${si}`}'],
  ['{item.highlights.slice(0, 6).map((h) => (', '{item.highlights.slice(0, 6).map((h, hi) => ('],
  ['key={h.name}', 'key={`${h.name}-${hi}`}'],
  ['key={b.name}', 'key={`${b.name}-${i}`}'],
]);
edit('sourcing-solutions.tsx', [
  ['{s.subcats.map((sub) => (', '{s.subcats.map((sub, si) => ('],
  ['key={sub.name}', 'key={`${sub.name}-${si}`}'],
]);
console.log('edits:', n);
