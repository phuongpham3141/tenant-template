import fs from 'node:fs';
const R = '/work';
const wf = JSON.parse(fs.readFileSync(`${R}/scripts/wf-out.json`, 'utf8'));
const results = wf.result || wf;
const vi = JSON.parse(fs.readFileSync(`${R}/scripts/vi-src.json`, 'utf8'));

let added = 0;
const conflicts = [];
const editsByFile = {};
for (const r of results) {
  if (!r || !r.file) continue;
  for (const [k, v] of Object.entries(r.keys || {})) {
    if (k in vi && vi[k] !== v) conflicts.push([k, vi[k], v]);
    if (!(k in vi)) added++;
    vi[k] = v;
  }
  editsByFile[r.file] = (r.edits || []).filter((e) => Array.isArray(e) && e.length === 2 && e[0] !== e[1]);
}
// HTML entity cleanup in VI values (agents sometimes emit &amp;)
for (const k of Object.keys(vi)) vi[k] = vi[k].replace(/&amp;/g, '&');
fs.writeFileSync(`${R}/scripts/vi-src.json`, JSON.stringify(vi, null, 2));
fs.writeFileSync(`${R}/scripts/wf-edits.json`, JSON.stringify(editsByFile, null, 2));
console.log('total vi keys:', Object.keys(vi).length, '| added:', added, '| conflicts:', conflicts.length);
if (conflicts.length) console.log('CONFLICTS:', JSON.stringify(conflicts.slice(0, 8)));
console.log('edits/file:', Object.entries(editsByFile).map(([f, e]) => `${f}=${e.length}`).join('  '));
