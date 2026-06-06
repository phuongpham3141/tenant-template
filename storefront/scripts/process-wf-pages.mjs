import fs from 'node:fs';
const R = '/work';
const wf = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const results = wf.result || wf;
const vi = JSON.parse(fs.readFileSync(`${R}/scripts/vi-src.json`, 'utf8'));
let added = 0;
const conflicts = [];
const editsByFile = {};
for (const r of results) {
  if (!r || !r.file) continue;
  for (const [k, v0] of Object.entries(r.keys || {})) {
    const v = String(v0).replace(/&amp;/g, '&');
    if (k in vi && vi[k] !== v) conflicts.push([k, vi[k], v]);
    if (!(k in vi)) added++;
    vi[k] = v;
  }
  editsByFile[r.file] = (r.edits || []).filter((e) => Array.isArray(e) && e.length === 2 && e[0] !== e[1]);
  if (r.deferred) console.log('DEFERRED', r.file, ':', String(r.deferred).slice(0, 90));
}
fs.writeFileSync(`${R}/scripts/vi-src.json`, JSON.stringify(vi, null, 2));
fs.writeFileSync(`${R}/scripts/wf-edits-pages.json`, JSON.stringify(editsByFile, null, 2));
console.log('vi keys', Object.keys(vi).length, '| added', added, '| conflicts', conflicts.length);
if (conflicts.length) console.log('CONFLICTS', JSON.stringify(conflicts.slice(0, 6)));
console.log('edits/file:', Object.entries(editsByFile).map(([f, e]) => `${f.split('/').slice(-2).join('/')}=${e.length}`).join('  '));
