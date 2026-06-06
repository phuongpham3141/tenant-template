import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', f), 'utf8'));
const home = read('home-gen-manifest.json');
const fac = read('factory-banner-manifest.json');
const feat = read('feat-manifest.json');
const retry2 = read('retry2-manifest.json');

const sizeFor = (p) => {
  const s = p.replace('/img/', '').replace('.jpg', '');
  if (s.startsWith('hero')) return '1536x1024';
  if (s.startsWith('factory-')) return '1536x1024';
  if (s.startsWith('feat-')) return '1024x1536';
  return '1024x1024';
};
const heroStems = ['heroint', 'hero-buyer-promo', 'hero-factory-tour', 'hero-ddp-logistics'];
const solStems = ['sol-hubs', 'sol-expo', 'sol-mei', 'sol-custom', 'showcase-construction-materials', 'showcase-noi-that'];

const out = [];
for (const e of home) {
  const s = e.path.replace('/img/', '').replace('.jpg', '');
  if (heroStems.includes(s) || solStems.includes(s)) {
    let prompt = e.prompt;
    if (s === 'hero-buyer-promo') { const r = retry2.find((x) => x.path === e.path); if (r) prompt = r.prompt; }
    out.push({ path: e.path, size: sizeFor(e.path), prompt });
  }
}
// Factory banners (MOST IMPORTANT) — must look like REAL photographs, professional, NOT CGI/stylized.
const REAL = "Authentic professional editorial industrial photograph, real factory, natural realistic factory lighting, true-to-life colours, photojournalistic, documentary, sharp focus, high detail, clean and professional. NOT a 3D render, NOT CGI, NOT illustration, NOT stylized, no neon glow. No people, no text, no letters, no numbers, no logos, no watermarks, no brand names.";
const REALISTIC_FACTORY = {
  'factory-midea': "A real modern home-appliance manufacturing factory floor: an automated production line with industrial robotic arms assembling air conditioners and refrigerators, stainless conveyor belts and assembly stations, an organized bright facility.",
  'factory-toshiba-elevator': "A real modern elevator manufacturing facility: a tall elevator test tower and assembly bays with elevator cabins, steel rails and components, an organized industrial interior.",
  'factory-linvol': "A real modern elevator and escalator manufacturing plant: long assembly lines with brushed-metal escalator steps and elevator components, machinery and workbenches.",
  'factory-bravat': "A real modern sanitary-ware ceramic factory: a long production line with neat rows of glossy white ceramic toilets and washbasins on conveyors, kilns and racks in the background.",
  'factory-kito': "A real modern ceramic tile factory: a large industrial kiln and long roller conveyor lines carrying rows of polished porcelain floor tiles, stacks of finished tiles.",
  'factory-fsl': "A real modern LED lighting factory: an automated assembly line producing light bulbs and luminaires, electronic components and testing stations, an organized bright facility.",
  'factory-3trees': "A real modern architectural paint and coatings factory: rows of large stainless steel mixing tanks and an automated paint-can filling and labelling line, pipes and gangways.",
  'factory-teka': "A real modern kitchen appliance factory: an assembly line producing stainless steel range hoods, built-in ovens and cooktops, robotic arms and conveyors.",
  'factory-ttlock': "A real modern smart-lock and electronics factory: precision assembly lines with robotic arms, green circuit boards and brushed-metal smart lock bodies, SMT machines and workbenches.",
};
for (const e of fac) {
  const s = e.path.replace('/img/', '').replace('.jpg', '');
  const subj = REALISTIC_FACTORY[s] || e.prompt;
  out.push({ path: e.path, size: sizeFor(e.path), prompt: `${subj} ${REAL}` });
}
for (const e of feat) out.push({ path: e.path, size: sizeFor(e.path), prompt: e.prompt });
fs.writeFileSync(path.join(ROOT, 'scripts/openai-impact-manifest.json'), JSON.stringify(out, null, 1));
console.log('openai manifest entries:', out.length, '| sizes:', JSON.stringify(out.reduce((a, e) => { a[e.size] = (a[e.size] || 0) + 1; return a; }, {})));
