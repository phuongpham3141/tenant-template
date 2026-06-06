import fs from 'node:fs';
const wf = JSON.parse(fs.readFileSync('/work/scripts/wf-wrap.json', 'utf8'));
const results = wf.result || wf;
const editsByFile = {};
for (const r of results) {
  if (!r || !r.file) continue;
  editsByFile[r.file] = (r.edits || []).filter((e) => Array.isArray(e) && e.length === 2 && e[0] !== e[1]);
  if (r.deferred) console.log('DEFERRED', r.file, ':', String(r.deferred).slice(0, 90));
}

// PRE-FIX: ProductCard is sync in the file → make async BEFORE the agent's async-assuming edits
const ps = 'src/components/home/product-section.tsx';
if (editsByFile[ps]) {
  editsByFile[ps].unshift(['function ProductCard({ p }: { p: Product }) {', 'async function ProductCard({ p }: { p: Product }) {']);
}

// mega-submenu callers: pass td prop (navbar/banner = server getTd; sticky = client identity)
editsByFile['src/components/home/navbar.tsx'] = [
  ['import { getT } from "@/lib/t";', 'import { getT } from "@/lib/t";\nimport { getTd } from "@/lib/td";'],
  ['const t = await getT();', 'const t = await getT();\n  const td = await getTd();'],
  ['<CategoryOverviewPanel group={group} t={t} />', '<CategoryOverviewPanel group={group} t={t} td={td} />'],
];
editsByFile['src/components/home/banner-section.tsx'] = [
  ['import { getT } from "@/lib/t";', 'import { getT } from "@/lib/t";\nimport { getTd } from "@/lib/td";'],
  ['const t = await getT();', 'const t = await getT();\n  const td = await getTd();'],
  ['<CategoryOverviewPanel group={group} t={t} />', '<CategoryOverviewPanel group={group} t={t} td={td} />'],
];
editsByFile['src/components/home/sticky-header.tsx'] = [
  ['<CategoryOverviewPanel group={group} t={t} />', '<CategoryOverviewPanel group={group} t={t} td={(s: string) => s} />'],
];

fs.writeFileSync('/work/scripts/wf-wrap-edits.json', JSON.stringify(editsByFile, null, 2));
console.log('files:', Object.entries(editsByFile).map(([f, e]) => `${f.split('/').slice(-1)[0]}=${e.length}`).join(' '));
