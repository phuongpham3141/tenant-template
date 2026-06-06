import fs from 'node:fs';
const DIR = '/work/src/components/home';
const edits = JSON.parse(fs.readFileSync('/work/scripts/wf-edits.json', 'utf8'));
let applied = 0, nf = 0;
for (const [file, pairs] of Object.entries(edits)) {
  const p = `${DIR}/${file}`;
  if (!fs.existsSync(p)) { console.log('NO FILE', file); continue; }
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) {
    if (s.includes(a)) { s = s.split(a).join(b); applied++; }
    else { console.log('NF', file, '::', JSON.stringify(a.slice(0, 55))); nf++; }
  }
  fs.writeFileSync(p, s);
}
console.log(`applied ${applied} | not-found ${nf}`);
