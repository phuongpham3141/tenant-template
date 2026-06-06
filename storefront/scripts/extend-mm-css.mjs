import fs from 'node:fs';
const f = '/work/src/app/globals.css';
let s = fs.readFileSync(f, 'utf8');

function block(tmpl) {
  const lines = [];
  for (let i = 16; i <= 46; i++) lines.push(tmpl(i));
  return lines.join(',\n') + ' {';
}

const a1 = '.mm-wrap:has(.mm-sub-16:hover) .mm-sub-panel-16 {';
const n1 = block((i) => `.mm-wrap:has(.mm-sub-${i}:hover) .mm-sub-panel-${i}`);
const a2 = '.mm-wrap:has(.mm-sub-panel-16:hover) .mm-sub-panel-16 {';
const n2 = block((i) => `.mm-wrap:has(.mm-sub-panel-${i}:hover) .mm-sub-panel-${i}`);

let c = 0;
if (s.includes('.mm-sub-46:hover')) {
  console.log('Already extended (sub-46 present) — skipping.');
} else {
  if (s.includes(a1)) { s = s.replace(a1, n1); c++; } else console.log('A1 NOT FOUND');
  if (s.includes(a2)) { s = s.replace(a2, n2); c++; } else console.log('A2 NOT FOUND');
  fs.writeFileSync(f, s);
}
console.log('replacements:', c,
  '| reveal sub-46:', s.includes('.mm-wrap:has(.mm-sub-46:hover) .mm-sub-panel-46'),
  '| keepopen panel-46:', s.includes('.mm-wrap:has(.mm-sub-panel-46:hover) .mm-sub-panel-46'));
