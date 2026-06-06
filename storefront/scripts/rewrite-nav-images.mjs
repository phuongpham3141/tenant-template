import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const items = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/nav-items.json'), 'utf8'));
const homePath = path.join(ROOT, 'src/data/home.ts');
let src = fs.readFileSync(homePath, 'utf8');

const STYLE = "Professional B2B e-commerce catalog product photography. The product itself, centered, on a clean pure white seamless studio background, soft even studio lighting, sharp focus, photorealistic, realistic proportions. No people. CRITICAL: absolutely NO text, letters, words, numbers, labels, writing, logos, brand names or watermarks anywhere; if it normally comes in a bag/box/can show the bare product or plain completely unlabeled packaging.";

const manifest = [];
let cursor = 0, rewritten = 0, missed = [];
for (const it of items) {
  const newImg = `/img/nm-${it.catSlug}-${it.idx}.jpg`;
  // anchor: group.items entry has  "<name>", slug: "<slug>"  (name immediately followed by slug; highlights have name then image)
  const anchor = `"${it.name}", slug: "${it.slug}"`;
  const a = src.indexOf(anchor, cursor);
  if (a < 0) { missed.push(it.name + ' | ' + it.slug); continue; }
  // find next image: "..." after the anchor
  const imgKey = src.indexOf('image:', a);
  if (imgKey < 0) { missed.push('noimg:' + it.name); continue; }
  const q1 = src.indexOf('"', imgKey);
  const q2 = src.indexOf('"', q1 + 1);
  if (q1 < 0 || q2 < 0) { missed.push('noquote:' + it.name); continue; }
  src = src.slice(0, q1 + 1) + newImg + '?v=7' + src.slice(q2);
  cursor = q1 + newImg.length + 6;
  rewritten++;
  manifest.push({ path: newImg, kind: 'named', aspect: '1:1', subject: it.name, prompt: `${it.name}. ${STYLE}` });
}
fs.writeFileSync(homePath, src);
fs.writeFileSync(path.join(ROOT, 'scripts/nav-gen-manifest.json'), JSON.stringify(manifest, null, 1));
console.log(`rewritten ${rewritten}/${items.length} item images; missed ${missed.length}`);
if (missed.length) console.log('MISSED:', JSON.stringify(missed.slice(0, 20)));
console.log('manifest entries:', manifest.length);
