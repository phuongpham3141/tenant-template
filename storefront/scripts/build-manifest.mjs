import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const home = fs.readFileSync(path.join(ROOT, 'src/data/home.ts'), 'utf8');
const manifestPaths = fs.readFileSync(path.join(ROOT, 'scripts/home-image-manifest.txt'), 'utf8')
  .split('\n').map(s => s.trim()).filter(Boolean);

// ---- parse NAV_MENU name<->image pairs (name appears before image within same object) ----
const nameByImg = {};
const re = /name:\s*"([^"]+)"[\s\S]{0,140}?image:\s*"(\/img\/[^"?]+)/g;
let m; while ((m = re.exec(home))) { const img = m[2]; if (!nameByImg[img]) nameByImg[img] = m[1]; }

const STYLE_PROD = "Professional B2B e-commerce catalog product photography. Single product, centered, on a clean pure white seamless studio background, soft even studio lighting, sharp focus, high detail, photorealistic. No text, no watermark, no logo, no people.";
const STYLE_SCENE = "Photorealistic premium commercial photography, clean composition, soft natural lighting, sharp focus, high detail. No text, no watermark, no logo, no visible people.";

const HERO = {
  'heroint': "Wide cinematic hero banner: a modern international container seaport at golden sunrise, rows of stacked colorful shipping containers, tall cranes loading a large cargo vessel, calm sea reflecting warm light.",
  'hero-buyer-promo': "Wide hero banner: a stack of glossy product catalogs and a sleek open laptop on a clean modern wooden desk by a softly lit window, a small wrapped gift box and a subtle golden percentage tag beside the catalogs, premium minimalist office, warm professional atmosphere.",
  'hero-factory-tour': "Wide hero banner: a modern tablet and laptop on a clean wooden desk displaying a live video feed of a factory production floor with industrial machinery and conveyor belts, small picture-in-picture monitor windows showing different factory camera views, warm office lighting.",
  'hero-ddp-logistics': "Wide hero banner: a large cargo ship loaded with thousands of colorful shipping containers approaching a deepwater port at golden sunset, calm ocean reflecting orange sky, distant cranes and warehouses.",
};
const SOL = {
  'sol-hubs': "Aerial drone view of a dense modern industrial manufacturing cluster at sunset, rows of large factory buildings with metal roofs, warehouses, parked trucks, organized streets, soft warm light.",
  'sol-expo': "A large bright modern trade-show exhibition hall with rows of premium product booths, building materials and home furnishings on display, polished floors, professional lighting, wide angle.",
  'sol-mei': "A modern premium building-materials and home-decor showroom interior, elegant tile and stone displays, warm spotlights, clean upscale retail design, wide angle.",
  'sol-custom': "A modern OEM/ODM custom manufacturing workshop, clean assembly line with precision machinery and bright lighting, organized industrial space.",
  'showcase-construction-materials': "An organized display of premium construction materials, stacks of porcelain tiles, marble slabs, steel pipes and profiles, in a clean modern warehouse showroom, soft lighting, wide angle.",
  'showcase-noi-that': "A beautifully styled modern interior furniture showroom, sofa, dining set and cabinetry, warm natural light, elegant upscale staging, wide angle.",
};
const FACTORY = {
  'factory-midea': "Modern home-appliance manufacturing facility, clean bright automated assembly line producing air conditioners and refrigerators, robotic arms, organized industrial interior.",
  'factory-toshiba-elevator': "Modern elevator manufacturing facility with a tall elevator test tower and clean assembly bays, bright industrial interior.",
  'factory-linvol': "Modern elevator and escalator manufacturing plant, precision assembly lines and metal components, clean bright factory floor.",
  'factory-bravat': "Modern sanitary-ware ceramic factory, long production line with rows of glossy white toilets and basins, clean bright industrial interior.",
  'factory-kito': "Modern ceramic tile factory, large industrial kiln and conveyor lines carrying rows of polished porcelain tiles, clean bright facility.",
  'factory-fsl': "Modern LED lighting factory, automated assembly line of light bulbs and luminaires, clean bright industrial interior.",
  'factory-3trees': "Modern architectural paint and coatings factory, rows of large stainless mixing tanks and an automated paint-can filling line, clean bright industrial interior.",
  'factory-teka': "Modern kitchen appliance manufacturing facility, clean assembly line producing stainless steel range hoods, ovens and cooktops, bright organized industrial interior.",
  'factory-ttlock': "Modern smart lock and electronics manufacturing facility, precision assembly line with circuit boards and metal lock bodies, clean bright high-tech interior.",
};

// prefix theme subjects for numbered/unnamed thumbnails (vary by trailing number)
const THEMES = {
  bathroom: ["smart bidet toilet", "wall-hung ceramic toilet", "modern bathroom basin faucet", "rain shower head set", "bathroom vanity cabinet", "freestanding bathtub", "ceramic wash basin", "frameless glass shower enclosure", "stainless towel rack", "LED bathroom mirror cabinet"],
  ceramic: ["glazed porcelain floor tile sample", "marble-look porcelain slab", "wood-grain ceramic plank tile", "matte stone-look ceramic tile", "decorative mosaic wall tile", "large-format porcelain panel", "textured outdoor ceramic tile", "polished glazed ceramic tile"],
  cer: ["glazed porcelain tile", "marble-look porcelain slab", "wood-grain ceramic tile", "matte ceramic floor tile", "mosaic wall tile", "large-format porcelain panel", "exterior wall tile", "polished ceramic tile"],
  'kitchen-equipment': ["stainless steel range hood", "built-in gas cooktop", "built-in electric oven", "stainless kitchen sink", "countertop dishwasher", "kitchen mixer faucet", "induction cooktop", "stainless cookware set"],
  fur: ["modern fabric sofa", "solid wood dining table", "upholstered bed frame", "modern wardrobe cabinet", "ergonomic office chair", "wooden coffee table", "modern bookshelf", "TV media console"],
};
function inferSubject(stem) {
  const mm = stem.match(/^([a-z-]+?)-?(\d+)(?:-(\d+))?$/);
  if (!mm) return null;
  const pre = mm[1].replace(/-$/, ''); const idx = parseInt(mm[3] || mm[2] || '0', 10);
  for (const k of Object.keys(THEMES)) { if (pre === k || pre.startsWith(k)) { const arr = THEMES[k]; return arr[(idx - 1 + arr.length) % arr.length] || arr[0]; } }
  return null;
}

const out = [];
let named = 0, inferred = 0, scene = 0, miss = 0;
for (const raw of manifestPaths) {
  if (/^https?:/.test(raw)) { continue; } // unsplash handled separately later
  const stem = raw.replace(/^\/img\//, '').replace(/\.(jpg|jpeg|png|webp)$/, '');
  const key = raw.replace(/\?.*$/, '');
  if (HERO[stem]) { out.push({ path: key, kind: 'hero', aspect: '21:9', prompt: HERO[stem] + " " + STYLE_SCENE }); scene++; continue; }
  if (SOL[stem]) { out.push({ path: key, kind: 'scene', aspect: '1:1', prompt: SOL[stem] + " " + STYLE_SCENE }); scene++; continue; }
  const nm = nameByImg[key];
  if (nm) { out.push({ path: key, kind: 'named', aspect: '1:1', subject: nm, prompt: `${nm}. ${STYLE_PROD}` }); named++; continue; }
  const sub = inferSubject(stem);
  if (sub) { out.push({ path: key, kind: 'inferred', aspect: '1:1', subject: sub, prompt: `${sub}. ${STYLE_PROD}` }); inferred++; continue; }
  out.push({ path: key, kind: 'unknown', aspect: '1:1', subject: stem, prompt: `A premium ${stem.replace(/-/g, ' ')} product. ${STYLE_PROD}` }); miss++;
}
for (const [stem, p] of Object.entries(FACTORY)) {
  out.push({ path: `/img/${stem}.jpg`, kind: 'factory', aspect: '16:9', prompt: p + " " + STYLE_SCENE });
}
fs.writeFileSync(path.join(ROOT, 'scripts/home-gen-manifest.json'), JSON.stringify(out, null, 1));
console.log(`manifest entries: ${out.length}`);
console.log(`  named(NAV_MENU): ${named}, inferred(prefix): ${inferred}, scene/hero/sol: ${scene}, factory: 6, unknown: ${miss}`);
console.log('sample named:', JSON.stringify(out.filter(o => o.kind === 'named').slice(0, 4).map(o => o.subject)));
console.log('sample inferred:', JSON.stringify(out.filter(o => o.kind === 'inferred').slice(0, 5).map(o => `${o.path}=${o.subject}`)));
console.log('unknown:', JSON.stringify(out.filter(o => o.kind === 'unknown').map(o => o.path).slice(0, 25)));
