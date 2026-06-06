import fs from 'node:fs';
const H = '/work/src/components/home';
let warn = 0;
function edit(file, pairs) {
  const p = `${H}/${file}`;
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b, all] of pairs) {
    if (!s.includes(a)) { console.log('NF', file, '::', JSON.stringify(a.slice(0, 40))); warn++; continue; }
    s = all ? s.split(a).join(b) : s.replace(a, b);
  }
  fs.writeFileSync(p, s);
}

// stats-bar (not async yet)
edit('stats-bar.tsx', [
  ['import { STATS } from "@/data/home";', 'import { STATS } from "@/data/home";\nimport { getTd } from "@/lib/td";'],
  ['export function StatsBar() {\n  return (', 'export async function StatsBar() {\n  const td = await getTd();\n  return ('],
  ['{s.value}', '{td(s.value)}', true],
  ['{s.label}', '{td(s.label)}', true],
]);

// category-showcase (async, has getT)
edit('category-showcase.tsx', [
  ['import { getT } from "@/lib/t";', 'import { getT } from "@/lib/t";\nimport { getTd } from "@/lib/td";'],
  ['const t = await getT();', 'const t = await getT();\n  const td = await getTd();'],
  ['{it.name}', '{td(it.name)}', true],
]);

// zones (async, has getT)
edit('zones.tsx', [
  ['import { getT } from "@/lib/t";', 'import { getT } from "@/lib/t";\nimport { getTd } from "@/lib/td";'],
  ['const t = await getT();', 'const t = await getT();\n  const td = await getTd();'],
  ['{z.name}', '{td(z.name)}', true],
  ['{z.count}', '{td(z.count)}', true],
]);

console.log(warn === 0 ? 'wrap-data OK ✓' : `${warn} warnings`);
