import fs from 'node:fs';
const H = '/work/src/components/home';
let warn = 0;
function edit(file, pairs) {
  const p = `${H}/${file}`;
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b, all] of pairs) {
    if (!s.includes(a)) { console.log('NF', file, '::', JSON.stringify(a.slice(0, 45))); warn++; continue; }
    s = all ? s.split(a).join(b) : s.replace(a, b);
  }
  fs.writeFileSync(p, s);
}

// mega-submenu: panels become pure (receive t as prop), drop next/headers dep
edit('mega-submenu.tsx', [
  ['import { getT } from "@/lib/t";\n', ''],
  ['export async function CategoryOverviewPanel({ group }: { group: NavMenuGroup }) {\n  const t = await getT();',
   'export function CategoryOverviewPanel({ group, t }: { group: NavMenuGroup; t: (k: string) => string }) {'],
  ['export async function SubItemPanel({\n  groupSlug,\n  item,\n}: {\n  groupSlug: string;\n  item: NavSubItem;\n}) {\n  const t = await getT();',
   'export function SubItemPanel({\n  groupSlug,\n  item,\n  t,\n}: {\n  groupSlug: string;\n  item: NavSubItem;\n  t: (k: string) => string;\n}) {'],
]);

// pass t at the 3 call sites
for (const file of ['navbar.tsx', 'banner-section.tsx', 'sticky-header.tsx']) {
  edit(file, [['<CategoryOverviewPanel group={group} />', '<CategoryOverviewPanel group={group} t={t} />', true]]);
}

console.log(warn === 0 ? 'mega fix OK ✓' : `${warn} warnings`);
