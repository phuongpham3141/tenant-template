import fs from 'node:fs';
const edits = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let applied = 0, nf = 0;
const nfd = {};
for (const [file, pairs] of Object.entries(edits)) {
  const p = `/work/${file}`;
  if (!fs.existsSync(p)) { console.log('NO FILE', file); continue; }
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) {
    if (s.includes(a)) { s = s.split(a).join(b); applied++; }
    else { nf++; (nfd[file] = nfd[file] || []).push(JSON.stringify(a.slice(0, 42))); }
  }
  fs.writeFileSync(p, s);
}
console.log('applied', applied, '| not-found', nf);
for (const [f, arr] of Object.entries(nfd)) console.log('  NF', f.split('/').slice(-1)[0], `(${arr.length})`, arr.slice(0, 2).join(' '));
// module-level t()/td() safety
let bad = 0;
for (const file of Object.keys(edits)) {
  const p = `/work/${file}`;
  if (!fs.existsSync(p)) continue;
  const s = fs.readFileSync(p, 'utf8');
  if (/^( {0,8})[a-zA-Z_]+: td?\(/m.test(s)) { console.log('  ⚠️ module-level t/td in', file.split('/').slice(-1)[0]); bad++; }
}
console.log(bad === 0 ? '  module-level: none ✓' : `  ${bad} need fix`);
