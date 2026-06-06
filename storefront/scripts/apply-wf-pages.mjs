import fs from 'node:fs';
const R = '/work';
const edits = JSON.parse(fs.readFileSync(`${R}/scripts/wf-edits-pages.json`, 'utf8'));
let applied = 0, nf = 0;
const nfFiles = {};
for (const [file, pairs] of Object.entries(edits)) {
  const p = `${R}/${file}`;
  if (!fs.existsSync(p)) { console.log('NO FILE', file); continue; }
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) {
    if (s.includes(a)) { s = s.split(a).join(b); applied++; }
    else { nf++; (nfFiles[file] = nfFiles[file] || []).push(JSON.stringify(a.slice(0, 38))); }
  }
  fs.writeFileSync(p, s);
}
console.log('applied', applied, '| not-found', nf);
for (const [f, arr] of Object.entries(nfFiles)) console.log('  NF', f.split('/').slice(-2).join('/'), `(${arr.length})`, arr.slice(0, 3).join(' '));
// SAFETY: detect module-level t() (would crash with "t is not defined")
console.log('--- module-level t() check ---');
let bad = 0;
for (const file of Object.keys(edits)) {
  const p = `${R}/${file}`;
  if (!fs.existsSync(p)) continue;
  const s = fs.readFileSync(p, 'utf8');
  const m = s.match(/^( {0,8})[a-zA-Z_]+: t\(/m);
  if (m) { console.log('  ⚠️ MODULE-LEVEL t() in', file.split('/').slice(-2).join('/')); bad++; }
}
console.log(bad === 0 ? '  none ✓' : `  ${bad} files need module-level fix`);
