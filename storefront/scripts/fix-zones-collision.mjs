import fs from 'node:fs';
const vp = '/work/scripts/vi-src.json';
const vi = JSON.parse(fs.readFileSync(vp, 'utf8'));
// restore home value, move zones/page value to its own namespace
vi['zones.title'] = 'Khu công nghiệp';
vi['zonespage.title'] = "🗺️ Trading Zones — China's Industrial Clusters";
fs.writeFileSync(vp, JSON.stringify(vi, null, 2));

const ep = '/work/scripts/wf-edits-pages.json';
const ed = JSON.parse(fs.readFileSync(ep, 'utf8'));
const f = 'src/app/zones/page.tsx';
if (ed[f]) {
  ed[f] = ed[f].map(([a, b]) => [a, b.split('zones.title').join('zonespage.title')]);
  fs.writeFileSync(ep, JSON.stringify(ed, null, 2));
  console.log('zones/page edits remapped to zonespage.title');
} else {
  console.log('zones/page not in edits');
}
