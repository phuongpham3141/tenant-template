// Gemini/Imagen image generation script for Cybersilkroads home page.
// Reads GEMINI_API_KEY from .env.local, generates 56 unique images,
// resizes to target dimensions with sharp, saves to public/img/<seed>.jpg.
//
// Usage:
//   node scripts/gen-images.mjs            → generate all missing
//   node scripts/gen-images.mjs --only X,Y → only specific seeds
//   node scripts/gen-images.mjs --force    → regenerate even if exists

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");

async function readKey() {
  const txt = await fs.readFile(ENV_PATH, "utf8");
  return txt.match(/GEMINI_API_KEY=([^\s]+)/)?.[1]?.trim();
}

const API_KEY = await readKey();
if (!API_KEY) { console.error("Missing GEMINI_API_KEY in .env.local"); process.exit(1); }

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const ONLY = args.find(a => a.startsWith("--only="))?.slice(7).split(",");

// Try Imagen 4 first (better quality + aspect ratio support); fallback Gemini 2.5 Flash Image.
const MODEL_IMAGEN = "imagen-4.0-generate-001";
const MODEL_NANO = "gemini-2.5-flash-image";

const STYLE_PHOTO = "Photorealistic professional commercial photography, clean composition, soft natural lighting, no text overlays, no watermarks, sharp focus, high detail, suitable for B2B sourcing platform catalog.";
const STYLE_PRODUCT = "Clean professional product photography on pure white seamless background, studio lighting, sharp focus, no text, no watermarks, top-down or 3/4 angle, suitable for B2B e-commerce catalog.";
const STYLE_ICON = "Minimalist flat 3D icon, isometric angle, pure white background, vibrant teal and blue accent colors, clean modern style, no text, no watermarks.";

// Aspect ratio mapping for Imagen
function imagenAR(w, h) {
  const r = w / h;
  if (Math.abs(r - 16/9) < 0.1) return "16:9";
  if (Math.abs(r - 9/16) < 0.1) return "9:16";
  if (Math.abs(r - 4/3) < 0.1) return "4:3";
  if (Math.abs(r - 3/4) < 0.1) return "3:4";
  if (Math.abs(r - 1) < 0.1) return "1:1";
  // Wide hero 1600×700 (~2.29) → 16:9 closest
  if (r > 1.5) return "16:9";
  return "1:1";
}

const IMAGES = [
  // === Hero slides 1600×700 ===
  { seed: "heroint", w: 1600, h: 700, style: STYLE_PHOTO,
    prompt: "Modern Vietnamese B2B trade hub. Wide aerial sunrise view of a busy international container port with rows of stacked colorful shipping containers, cranes loading cargo onto large vessels, calm sea, golden hour warm light, no people visible, cinematic composition." },
  { seed: "hero-buyer-promo", w: 1600, h: 700, style: STYLE_PHOTO,
    prompt: "Promotional B2B sourcing scene. Stack of glossy product catalogs and a sleek laptop on a clean modern wooden desk, soft window light, a small wrapped gift box and a tiny golden percentage tag subtly placed beside the catalogs, premium minimalist office background, warm professional atmosphere." },
  { seed: "hero-factory-tour", w: 1600, h: 700, style: STYLE_PHOTO,
    prompt: "Virtual factory tour technology. Modern tablet and laptop on a clean wooden desk displaying a video feed of a factory production floor with industrial machinery and conveyor belts visible on screen, smaller picture-in-picture monitor windows showing different camera views of the factory, warm office lighting." },
  { seed: "hero-ddp-logistics", w: 1600, h: 700, style: STYLE_PHOTO,
    prompt: "Large cargo ship loaded with thousands of colorful shipping containers approaching a Vietnamese deepwater port at golden sunset, calm ocean reflecting orange sky, distant cranes and warehouses, cinematic logistics photography." },

  // === Sourcing solutions 640×360 ===
  { seed: "sol-hubs", w: 640, h: 360, style: STYLE_PHOTO,
    prompt: "Aerial drone view of a dense Chinese industrial manufacturing cluster at sunset, rows of large rectangular factory buildings with metal roofs, warehouses, parked trucks, organized streets, soft warm light." },
  { seed: "sol-mei", w: 640, h: 360, style: STYLE_PHOTO,
    prompt: "Premium minimalist showroom display. A sleek modern consumer electronic device and a stylish ceramic vase on a black marble pedestal lit by a single warm spotlight, dark gallery background, dramatic professional product showcase." },
  { seed: "sol-custom", w: 640, h: 360, style: STYLE_PHOTO,
    prompt: "OEM custom product workshop scene with colorful pantone color sample cards, fabric swatches and small 3D printed prototypes arranged on a wooden design desk, soft natural daylight from window." },
  { seed: "sol-expo", w: 640, h: 360, style: STYLE_PHOTO,
    prompt: "Modern computer monitor on a desk displaying a virtual showroom interface with product thumbnails and 3D booths, blue ambient digital lighting, futuristic technology aesthetic." },

  // === Sub-category small icons 120×120 ===
  { seed: "sub-gifts", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Red gift box wrapped with golden ribbon bow, simple isolated product." },
  { seed: "sub-electric", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Stylized electronic circuit board with glowing LED component and a small chip." },
  { seed: "sub-transport", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Cargo truck with a shipping container on its bed." },
  { seed: "sub-mfg", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Industrial CNC machine with rotating gear and metal workpiece." },
  { seed: "sub-metal", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Stacked steel ingots and a raw mineral ore chunk." },
  { seed: "sub-pack", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Stack of three colorful cardboard shipping boxes with packaging tape." },
  { seed: "sub-umb", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Three colorful umbrellas arranged together, one opened." },
  { seed: "sub-slip", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Pair of premium sport sneakers side by side." },
  { seed: "sub-case", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Modern smartphone case in matte black with subtle texture pattern." },
  { seed: "sub-expo1", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Factory building with chimney and conveyor belt." },
  { seed: "sub-expo2", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Delivery van and a small airplane representing global shipping." },
  { seed: "sub-expo3", w: 120, h: 120, style: STYLE_ICON,
    prompt: "Modern house under construction with crane and bricks." },

  // === Top strip favorites 64×64 ===
  { seed: "fav-oxford", w: 64, h: 64, style: STYLE_PRODUCT,
    prompt: "Premium Oxford fabric backpack in dark navy blue with leather accents, front view." },
  { seed: "fav-led", w: 64, h: 64, style: STYLE_PRODUCT,
    prompt: "Modern A19 LED light bulb with frosted glass and white base, side angle view." },
  { seed: "fav-powerbank", w: 64, h: 64, style: STYLE_PRODUCT,
    prompt: "Sleek matte black 20000mAh power bank with small digital display showing battery percentage." },

  // === Section banners 600×600 ===
  { seed: "marble1", w: 600, h: 600, style: STYLE_PHOTO,
    prompt: "Luxury showroom display of premium white Calacatta marble large format porcelain slabs leaning against a wall, dramatic veining patterns, polished surface reflecting soft warm spotlights, minimalist gallery setting." },
  { seed: "sofa1", w: 600, h: 600, style: STYLE_PHOTO,
    prompt: "Modern L-shaped sectional sofa in dusty rose velvet with brass legs, styled in an elegant minimalist Scandinavian living room with hardwood floor, soft daylight from large window, framed art on wall, throw pillows." },
  { seed: "toilet1", w: 600, h: 600, style: STYLE_PHOTO,
    prompt: "Modern smart toilet with sleek matte white tankless design, integrated LED display panel showing bidet controls, installed in a luxury minimalist bathroom with marble walls, soft ambient lighting." },

  // === Ceramic products 400×400 ===
  { seed: "cer1", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Single rectangular white marble pattern porcelain floor tile with elegant gray veining, top-down view." },
  { seed: "cer2", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Black Nero Marquina marble slab sample with striking white veining, vertical orientation, polished surface reflecting subtle light." },
  { seed: "cer3", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Travertine pattern beige porcelain floor tile 800x800mm with natural rustic stone texture, top-down view." },
  { seed: "cer4", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Hexagonal terracotta vintage mosaic wall tiles arranged in honeycomb pattern, earthy red-orange color." },
  { seed: "cer5", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Large gray honed marble porcelain slab 1200x2400mm with subtle veining, matte finish, vertical sample." },
  { seed: "cer6", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "3D wood-grain acoustic wall panel with vertical fluted slats in walnut wood finish, decorative." },
  { seed: "cer7", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Light oak herringbone pattern SPC vinyl click flooring plank close-up." },
  { seed: "cer8", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "European oak engineered wood flooring plank with UV finish, AB grade, warm honey color, top-down view." },

  // === Furniture products 400×400 ===
  { seed: "fur1", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "L-shaped 6-seat velvet sectional sofa in emerald green with gold metal legs, 3/4 angle." },
  { seed: "fur2", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Modern 3-seat power recliner leather sofa in tan brown with USB charging ports built into armrest, 3/4 angle." },
  { seed: "fur3", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "King-size walnut wood bed frame with upholstered headboard, hotel-grade design, 3/4 angle." },
  { seed: "fur4", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Nordic 6-seat dining table set with white marble top and brushed stainless steel legs, plus 6 black wooden chairs." },
  { seed: "fur5", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Executive ergonomic high-back office chair in black leather with chrome base and headrest, 3/4 angle." },
  { seed: "fur6", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Premium 5-star hotel bedroom 4-piece furniture set: bed, nightstand, dresser and wardrobe in cream and gold finish, room scene." },
  { seed: "fur7", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Modern kitchen with high-gloss white and dark gray cabinet doors, sleek handleless design, marble countertop, contemporary style." },
  { seed: "fur8", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Modern 4-door sliding wardrobe in MDF melamine wood finish, front view, frame visible." },

  // === Bathroom products 400×400 ===
  { seed: "bat1", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Sleek smart toilet with tankless one-piece design, integrated LED display panel and bidet, matte white finish, 3/4 angle." },
  { seed: "bat2", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Oval natural stone vessel washbasin in warm amber color, sitting on a wooden bathroom counter." },
  { seed: "bat3", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Modern brushed gold bathroom sink faucet with single lever handle and tall curved spout, mounted on a white basin, side angle view." },
  { seed: "bat4", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Modern wall-mounted square rainfall shower head in polished chrome with thermostatic control valve, installed in a tiled shower." },
  { seed: "bat5", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Double-sink bathroom vanity cabinet 1800mm wide in natural oak wood with white stone counter, two square white basins." },
  { seed: "bat6", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Freestanding oval acrylic bathtub 1700mm in matte black finish, modern minimalist design." },
  { seed: "bat7", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Frameless walk-in glass shower enclosure 1200x900x2000mm with chrome fittings, in a clean modern bathroom." },
  { seed: "bat8", w: 400, h: 400, style: STYLE_PRODUCT,
    prompt: "Round bathroom wall mirror with glowing white LED light rim, mounted on a marble wall, modern design." },

  // === Industrial zones 300×300 ===
  { seed: "zone1", w: 300, h: 300, style: STYLE_PHOTO,
    prompt: "Aerial view of the Foshan ceramic factory district in China, dense rows of large ceramic factory buildings with white roofs, organized industrial cluster." },
  { seed: "zone2", w: 300, h: 300, style: STYLE_PHOTO,
    prompt: "Aerial view of the Taizhou faucet manufacturing cluster in China, rows of metal-roofed factory buildings producing brass faucets." },
  { seed: "zone3", w: 300, h: 300, style: STYLE_PHOTO,
    prompt: "Aerial drone shot of a large industrial manufacturing zone with rows of rectangular factory buildings and warehouses, organized streets and parking lots, daytime soft overcast lighting." },
  { seed: "zone4", w: 300, h: 300, style: STYLE_PHOTO,
    prompt: "Aerial view of the Zhongshan lighting industry cluster with LED factory buildings and showrooms." },
  { seed: "zone5", w: 300, h: 300, style: STYLE_PHOTO,
    prompt: "Aerial view of the Jinjiang wood processing factory district in Fujian, China, with stacked lumber and wood factories." },
  { seed: "zone6", w: 300, h: 300, style: STYLE_PHOTO,
    prompt: "Aerial view of the Chaozhou sanitary ware factory district, ceramic toilet and sink factories, industrial zone." },

  // === Category showcase 300×300 (12 main categories) ===
  { seed: "showcase-home-garden", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Beautiful modern home garden with potted plants, outdoor furniture and decorative lighting on a wooden deck." },
  { seed: "showcase-construction-materials", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Stacked construction materials: bricks, steel rebar, cement bags and ceramic tiles in a building supply warehouse." },
  { seed: "showcase-bathroom-sanitary", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Modern luxury bathroom with a freestanding bathtub, glass shower enclosure, double vanity and marble walls." },
  { seed: "showcase-noi-that", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Elegant modern living room with comfortable sofa, coffee table and stylish armchair, contemporary interior design." },
  { seed: "showcase-kitchen-equipment", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Stainless steel commercial kitchen equipment including range, oven and prep tables in a professional kitchen." },
  { seed: "showcase-lighting", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Cluster of modern pendant lights, chandelier and LED bulbs hanging in a stylish showroom with warm glow." },
  { seed: "showcase-doors-windows", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Modern aluminum sliding glass door and large windows on a contemporary house facade, daytime." },
  { seed: "showcase-hotel-supplies", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Luxury hotel room amenity set with folded white towels, robes, bath products and a small flower arrangement on a bed." },
  { seed: "showcase-hardware-tools", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Assorted hardware tools: power drill, wrenches, screwdrivers, hammer and toolbox on a wooden workbench." },
  { seed: "showcase-decoration", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Decorative interior items: vases, candles, picture frames and ornamental sculptures on a shelf in a stylish home." },
  { seed: "showcase-outdoor-garden", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Outdoor garden with patio furniture, BBQ grill, parasol and lush plants on a wooden deck during sunset." },
  { seed: "showcase-electrical", w: 300, h: 300, style: STYLE_PRODUCT,
    prompt: "Electrical equipment and components: switches, sockets, circuit breakers, cables and electrical panels arranged neatly." },
];

async function genImagen(prompt, w, h) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_IMAGEN}:predict?key=${API_KEY}`;
  const body = {
    instances: [{ prompt }],
    parameters: { sampleCount: 1, aspectRatio: imagenAR(w, h), personGeneration: "dont_allow" }
  };
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json();
  if (!res.ok) throw new Error(`imagen ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`imagen no data: ${JSON.stringify(json).slice(0, 300)}`);
  return Buffer.from(b64, "base64");
}

async function genNano(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NANO}:generateContent?key=${API_KEY}`;
  const body = { contents: [{ parts: [{ text: prompt }] }] };
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json();
  if (!res.ok) throw new Error(`nano ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const inlineData = parts.find(p => p.inlineData || p.inline_data)?.inlineData || parts.find(p => p.inline_data)?.inline_data;
  if (!inlineData) throw new Error(`nano no image: ${JSON.stringify(json).slice(0, 300)}`);
  return Buffer.from(inlineData.data, "base64");
}

let useImagen = true;

async function gen(prompt, w, h) {
  if (useImagen) {
    try {
      return await genImagen(prompt, w, h);
    } catch (e) {
      if (/PERMISSION_DENIED|paid tier|billing|FAILED_PRECONDITION/i.test(e.message)) {
        console.log("Imagen requires paid tier — falling back to Nano Banana");
        useImagen = false;
      } else {
        throw e;
      }
    }
  }
  return await genNano(prompt);
}

await fs.mkdir(OUT_DIR, { recursive: true });

let ok = 0, skip = 0, fail = 0;
const targets = ONLY ? IMAGES.filter(i => ONLY.includes(i.seed)) : IMAGES;
console.log(`Generating ${targets.length} images → ${OUT_DIR}\n`);

for (const img of targets) {
  const out = path.join(OUT_DIR, `${img.seed}.jpg`);
  if (!FORCE) {
    try { await fs.access(out); console.log(`  skip ${img.seed} (exists)`); skip++; continue; } catch {}
  }
  try {
    const fullPrompt = `${img.prompt} ${img.style}`;
    const raw = await gen(fullPrompt, img.w, img.h);
    // Resize/crop to exact target dimensions, save as JPEG quality 85
    const resized = await sharp(raw).resize(img.w, img.h, { fit: "cover", position: "centre" }).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
    await fs.writeFile(out, resized);
    console.log(`  ✓ ${img.seed} (${img.w}×${img.h}, ${resized.length} bytes)`);
    ok++;
    await new Promise(r => setTimeout(r, 1200)); // rate limit
  } catch (e) {
    console.error(`  ✗ ${img.seed}: ${e.message}`);
    fail++;
  }
}

console.log(`\nDone — ok=${ok} skip=${skip} fail=${fail}`);
