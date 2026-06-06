import fs from 'node:fs';
function moveBlock(path, startMark, endMark, anchor) {
  let s = fs.readFileSync(path, 'utf8');
  const i0 = s.indexOf(startMark);
  if (i0 < 0) return console.log('startMark NF', path);
  const i1 = s.indexOf(endMark, i0);
  if (i1 < 0) return console.log('endMark NF', path);
  const end = i1 + endMark.length;
  const block = s.slice(i0, end);
  s = s.slice(0, i0) + s.slice(end);
  const j = s.indexOf(anchor);
  if (j < 0) return console.log('anchor NF', path);
  const at = j + anchor.length;
  s = s.slice(0, at) + '\n  ' + block.trimEnd() + '\n' + s.slice(at);
  fs.writeFileSync(path, s);
  console.log('moved into', path.split('/').pop(), `(${block.length} chars)`);
}
const H = '/work/src/components/home';
moveBlock(`${H}/footer.tsx`, 'const FOOTER_COLS:', '\n];\n', 'const t = await getT();\n');
moveBlock(`${H}/hero-slider.tsx`, 'const HERO_SLIDES:', 'const N = HERO_SLIDES.length;', 'const t = useT();\n');
