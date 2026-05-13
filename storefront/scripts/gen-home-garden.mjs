// Focused image generation for /category/home-garden ONLY.
// Manually mapped product names → detailed AI prompts → strict vision verify → retry.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");
const ENV_PATH = path.join(ROOT, ".env.local");
const CAT_OUT = path.join(ROOT, "scripts", "images-categorized", "danh_muc");
const STATE_FILE = path.join(ROOT, "scripts", "home-garden-state.json");

const ENV_TXT = await fs.readFile(ENV_PATH, "utf8");
const ALL_KEYS = [...ENV_TXT.matchAll(/^GEMINI_API_KEY[A-Za-z_0-9]*=([^\s]+)/gm)].map(m => m[1].trim());
console.log(`Probing ${ALL_KEYS.length} API key(s)...`);
const KEYS = [];
for (let i = 0; i < ALL_KEYS.length; i++) {
  const k = ALL_KEYS[i];
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${k}`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ instances: [{ prompt: "red apple" }], parameters: { sampleCount: 1, aspectRatio: "1:1" } })
    });
    if (r.status === 200 || r.status === 429) {
      KEYS.push(k);
      console.log(`  key ${i + 1}: ${r.status === 429 ? "rate-limited but usable" : "OK"}`);
    } else {
      console.log(`  key ${i + 1}: SKIPPED (${r.status})`);
    }
  } catch (e) { console.log(`  key ${i + 1}: SKIPPED (err)`); }
}
if (!KEYS.length) { console.error("No usable keys"); process.exit(1); }
console.log(`Using ${KEYS.length} keys\n`);

const KEY_COOLDOWN = new Map();
function pickKey() {
  const now = Date.now();
  const avail = KEYS.filter(k => (KEY_COOLDOWN.get(k) ?? 0) <= now);
  if (avail.length) return avail[Math.floor(Math.random() * avail.length)];
  let best = KEYS[0], bestT = Infinity;
  for (const k of KEYS) { const t = KEY_COOLDOWN.get(k) ?? 0; if (t < bestT) { bestT = t; best = k; } }
  return best;
}

// Manually mapped slug → { vn, en } for home-garden products
// Read from categories.ts knowledge
const PRODUCTS = [
  // Overview products
  { slug: "cat1-1",  vn: "Chậu cây composite cao 80cm",   en: "Large tall composite plant pot, 80cm height, beige color, with green leafy plant inside" },
  { slug: "cat1-2",  vn: "Tượng sư tử đá granite",        en: "Carved gray granite stone lion garden statue, standing pose, weathered surface" },
  { slug: "cat1-3",  vn: "Tường cây nhân tạo 1×1m",       en: "Artificial green plant wall panel 1 meter square, lush variety of fake foliage, mounted on wood frame" },
  { slug: "cat1-4",  vn: "Hoa hồng giả lụa cao cấp",      en: "Premium artificial silk red rose bouquet with vibrant red petals and green leaves" },
  { slug: "cat1-5",  vn: "Bình hoa gốm sứ Cảnh Đức",      en: "Traditional Jingdezhen blue and white porcelain ceramic vase with Chinese floral motif" },
  { slug: "cat1-6",  vn: "Bồn cây sợi thủy tinh vuông",   en: "Square fiberglass planter pot, light gray, modern minimalist design with small green plant" },
  { slug: "cat1-7",  vn: "Đèn sân vườn năng lượng mặt trời", en: "Solar-powered garden path lamp, black metal stake post with LED light, embedded in grass" },
  { slug: "cat1-8",  vn: "Cây ô liu nhân tạo 1.8m",       en: "Artificial olive tree 1.8 meters tall in a beige planter, realistic foliage and small olives" },
  { slug: "cat1-9",  vn: "Bộ máy cắt cỏ cầm tay 2-thì",   en: "Handheld 2-stroke gasoline grass trimmer brush cutter with orange shaft and cutting blade" },
  { slug: "cat1-10", vn: "Vòi tưới sen xoay 360°",        en: "Rotating 360-degree garden sprinkler watering nozzle with multiple spray patterns, plastic" },

  // Section 1: Trang trí trong nhà (indoor decoration)
  { slug: "cat1-s1-0", vn: "Tượng phật ngọc bích 30cm",       en: "Jade green Buddha statue figurine 30cm tall, traditional design, polished stone finish" },
  { slug: "cat1-s1-1", vn: "Hoa lan hồ điệp giả 5 cành",      en: "Artificial purple phalaenopsis orchid plant with 5 stems, in white ceramic pot" },
  { slug: "cat1-s1-2", vn: "Bình gốm sứ men rạn cổ",          en: "Antique style crackle-glazed ceramic vase, beige cream color with traditional craquelure pattern" },
  { slug: "cat1-s1-3", vn: "Tường cây giả khung nhôm 60×60",  en: "60x60cm artificial green plant wall panel in aluminum frame, mixed fake foliage" },
  { slug: "cat1-s1-4", vn: "Vách ngăn 4 cánh gỗ chạm",        en: "Carved wooden 4-panel folding room divider screen with intricate floral design, dark walnut" },
  { slug: "cat1-s1-5", vn: "Khung tranh canvas trừu tượng",   en: "Abstract modern art canvas painting in black wooden frame, geometric shapes, neutral tones" },
  { slug: "cat1-s1-6", vn: "Cây trầu bà giả 1.5m",            en: "Artificial pothos golden devil's ivy plant 1.5 meters, trailing green leaves in white pot" },
  { slug: "cat1-s1-7", vn: "Bộ tượng trang trí composite",    en: "Modern decorative composite stone sculpture set, three abstract minimalist figurines, white finish" },

  // Section 2: Trang trí sân vườn (garden decor)
  { slug: "cat1-s2-0", vn: "Tượng sư tử đá nguyên khối 1.2m", en: "Large 1.2m solid stone lion garden statue, classical Chinese guardian style, gray weathered finish" },
  { slug: "cat1-s2-1", vn: "Đài phun nước 3 tầng tròn",       en: "Three-tier round outdoor garden water fountain, stone or concrete, water cascading down levels" },
  { slug: "cat1-s2-2", vn: "Đèn vườn LED solar 6W",           en: "Solar LED 6W garden lawn light, black stake post with white frosted lamp head" },
  { slug: "cat1-s2-3", vn: "Tượng thiên thần composite",      en: "Composite stone angel garden statue with wings, classical European style, white weathered finish" },
  { slug: "cat1-s2-4", vn: "Cờ trang trí vườn vải polyester", en: "Colorful polyester garden decorative flag banner with floral pattern, hanging on wooden pole" },
  { slug: "cat1-s2-5", vn: "Quả cầu thủy tinh phản chiếu 30cm", en: "30cm reflective mirror gazing globe ball, iridescent blue color, on metal stand in garden" },
  { slug: "cat1-s2-6", vn: "Phù điêu tường vườn nhựa PU",     en: "Polyurethane PU wall relief sculpture for garden, classical floral design, beige stone effect" },
  { slug: "cat1-s2-7", vn: "Tượng cá chép phong thủy",        en: "Chinese feng shui koi carp fish stone garden statue, jumping pose, golden bronze finish" },

  // Section 3: Chậu hoa & Bồn cây (planters)
  { slug: "cat1-s3-0", vn: "Chậu composite tròn cao 60cm",    en: "Round tall composite plant pot 60cm height, modern beige minimalist design, empty" },
  { slug: "cat1-s3-1", vn: "Bồn cây nhựa PE chữ nhật",        en: "Rectangular PE plastic planter box, modern gray, with small green plants" },
  { slug: "cat1-s3-2", vn: "Chậu gốm sứ men trắng 40cm",      en: "40cm white glazed ceramic flower pot, smooth glossy finish, classic round shape" },
  { slug: "cat1-s3-3", vn: "Chậu xi măng vuông 50×50cm",      en: "50x50cm square concrete cement planter pot, gray rough texture, modern industrial style" },
  { slug: "cat1-s3-4", vn: "Chậu inox 304 đáy gỗ",            en: "Stainless steel 304 cylindrical planter pot with wooden bottom base, brushed silver finish" },
  { slug: "cat1-s3-5", vn: "Bồn trồng tự tưới balcony",       en: "Self-watering balcony planter box with built-in water reservoir, white plastic, with herbs growing" },
  { slug: "cat1-s3-6", vn: "Giá đỡ chậu 3 tầng kim loại",     en: "Three-tier metal plant pot stand, black wrought iron, holding 3 potted plants vertically" },
  { slug: "cat1-s3-7", vn: "Chậu treo tường thẳng đứng",      en: "Vertical wall-mounted plant pot, white modern, with trailing green plant" },

  // Section 4: Dụng cụ làm vườn (garden tools)
  { slug: "cat1-s4-0", vn: "Máy cắt cỏ cầm tay 2-thì 52cc",   en: "52cc 2-stroke gasoline handheld grass cutter brush trimmer, orange and black, with shoulder strap" },
  { slug: "cat1-s4-1", vn: "Kéo cắt cành cán dài 60cm",       en: "Long-handled 60cm garden pruning shears with red rubber grip and sharp steel blades" },
  { slug: "cat1-s4-2", vn: "Bộ cuốc xẻng cào 3 món",          en: "3-piece garden tool set: hoe, shovel, and rake, wooden handles with steel heads" },
  { slug: "cat1-s4-3", vn: "Máy phun thuốc đeo vai 16L",      en: "Shoulder-strap 16 liter garden sprayer pesticide pump, yellow plastic tank with hose nozzle" },
  { slug: "cat1-s4-4", vn: "Máy xới đất mini xăng 4-thì",     en: "Mini 4-stroke gasoline garden tiller cultivator machine, red with rotating tines" },
  { slug: "cat1-s4-5", vn: "Bình tưới hoa nhựa 5L",           en: "5 liter green plastic watering can with shower head spout, classic gardening style" },
  { slug: "cat1-s4-6", vn: "Găng tay làm vườn da bò",         en: "Cowhide leather gardening gloves, brown, heavy duty work gloves for garden" },
  { slug: "cat1-s4-7", vn: "Lưỡi cắt cỏ thép cứng",           en: "Hardened steel grass cutter trimmer blade replacement, sharp 3-blade circular design" },

  // Section 5: Đèn & Chiếu sáng sân vườn (outdoor lighting)
  { slug: "cat1-s5-0", vn: "Đèn solar sân vườn IP65 8W",      en: "IP65 waterproof 8W solar garden lawn light, black metal post with warm white LED head, on grass" },
  { slug: "cat1-s5-1", vn: "Đèn pha LED 50W IP66",            en: "50W IP66 outdoor LED floodlight wall-mounted, black aluminum housing, bright white beam" },
  { slug: "cat1-s5-2", vn: "Đèn cắm cỏ inox 304",             en: "Stainless steel 304 garden lawn spike light, silver brushed finish, with warm LED" },
  { slug: "cat1-s5-3", vn: "Dây đèn LED ngoài trời 10m",      en: "10 meter outdoor LED string fairy lights with warm white bulbs, hanging on patio" },
  { slug: "cat1-s5-4", vn: "Đèn chiếu gốc cây 18W",           en: "18W LED tree base uplight spotlight, ground-mounted black fixture illuminating tree trunk at night" },
  { slug: "cat1-s5-5", vn: "Đèn motif hươu LED Noel",         en: "LED reindeer Christmas outdoor decoration motif light, white wire frame deer shape, glowing" },
  { slug: "cat1-s5-6", vn: "Đèn lồng treo solar",             en: "Solar-powered hanging garden lantern light, vintage Edison-style bulb in metal cage frame" },
  { slug: "cat1-s5-7", vn: "Đèn cột sân vườn cao 2m",         en: "2-meter tall garden post light, black metal pillar with classic lantern fixture top" },

  // Section 6: Đồ gia dụng & Sundries (household)
  { slug: "cat1-s6-0", vn: "Bộ hộp đựng đồ nhựa PP 5 món",    en: "5-piece PP plastic storage box container set, clear transparent with lids, stackable" },
  { slug: "cat1-s6-1", vn: "Móc treo dán tường chịu lực 5kg", en: "Strong adhesive wall hook holder rated 5kg, white plastic, hanging from wall" },
  { slug: "cat1-s6-2", vn: "Giỏ vải gấp gọn cotton",          en: "Foldable cotton fabric storage basket, beige with rope handles, collapsible laundry basket" },
  { slug: "cat1-s6-3", vn: "Kệ tường 3 tầng gỗ + sắt",        en: "Three-tier wall-mounted floating shelf, wood planks with black metal industrial brackets" },
  { slug: "cat1-s6-4", vn: "Giá phơi đồ inox gấp",            en: "Foldable stainless steel laundry drying rack, silver chrome, free-standing" },
  { slug: "cat1-s6-5", vn: "Cây lau nhà xoay 360°",           en: "360-degree spinning rotating mop with microfiber head and yellow bucket, household cleaning tool" },
  { slug: "cat1-s6-6", vn: "Tổ chức ngăn kéo nhựa",           en: "Plastic drawer organizer dividers, modular compartments, white interlocking trays" },
  { slug: "cat1-s6-7", vn: "Hộp đựng giày trong suốt",        en: "Clear transparent plastic shoe storage box, stackable see-through container with lid" },

  // Section 7: Quà tặng & Đồ thủ công (festive)
  { slug: "cat1-s7-0", vn: "Cây thông Noel PVC 1.8m",         en: "1.8 meter artificial PVC Christmas tree, full lush green, with white star topper on a stand" },
  { slug: "cat1-s7-1", vn: "Bộ trang trí cây thông 50 món",   en: "50-piece Christmas tree ornament decoration set in red and gold, baubles, stars, and ribbons" },
  { slug: "cat1-s7-2", vn: "Đèn LED Noel 10m chống nước",     en: "10 meter waterproof LED Christmas string lights, multi-color twinkling fairy lights" },
  { slug: "cat1-s7-3", vn: "Thủ công resin tượng angel",      en: "Resin angel figurine craft decoration, cream white color with delicate detail, holiday decor" },
  { slug: "cat1-s7-4", vn: "Bí ngô Halloween nhựa LED",       en: "LED light-up plastic Halloween pumpkin jack-o-lantern decoration, orange with carved face" },
  { slug: "cat1-s7-5", vn: "Bóng bay HappyBirthday set",      en: "Happy Birthday party balloon set, colorful foil letter balloons spelling out HBD, festive arrangement" },
  { slug: "cat1-s7-6", vn: "Thủ công gỗ pyrography",          en: "Wood pyrography burned art decoration, rustic wooden plaque with burnt design pattern" },
  { slug: "cat1-s7-7", vn: "Vòng hoa cửa Noel handmade",      en: "Handmade Christmas door wreath with pine branches, red berries, ribbons, and pinecones" },

  // Section 8: Outdoor living & Sân thượng
  { slug: "cat1-s8-0", vn: "Bộ bàn ghế PE rattan 4 chỗ",      en: "4-seater PE rattan outdoor patio furniture set: 2 chairs, sofa, coffee table, brown weave" },
  { slug: "cat1-s8-1", vn: "Ô dù sân vườn 3m chân chữ thập",  en: "3-meter outdoor patio umbrella with cross base, beige canopy, standing on stone tile" },
  { slug: "cat1-s8-2", vn: "Bếp BBQ than củi inox",           en: "Stainless steel charcoal BBQ grill, portable outdoor barbecue with cooking grate" },
  { slug: "cat1-s8-3", vn: "Bể bơi bơm hơi gia đình 3m",      en: "3-meter family inflatable swimming pool, round blue, set up in backyard with kids" },
  { slug: "cat1-s8-4", vn: "Nhà kính nhựa PE mini 2×3m",      en: "Mini 2x3m PE plastic greenhouse for garden, transparent walls, metal frame, growing plants" },
  { slug: "cat1-s8-5", vn: "Xe đẩy vườn 4 bánh tải 200kg",    en: "200kg capacity 4-wheel garden wheelbarrow utility cart, red with metal frame and wooden bed" },
  { slug: "cat1-s8-6", vn: "Lều bạt sự kiện 3×3m chống thấm", en: "3x3m waterproof event tent canopy gazebo, white pop-up shelter for outdoor parties" },
  { slug: "cat1-s8-7", vn: "Ghế tắm nắng nhôm vải textilene", en: "Aluminum frame textilene fabric sun lounger beach chair, white mesh, poolside design" },
];

const VISION_MODEL = "gemini-2.5-flash";
const IMAGEN_MODEL = "imagen-4.0-fast-generate-001";
const MIN_CONFIDENCE = 0.75;
const MAX_RETRIES = 4;
const CONCURRENCY = parseInt(process.argv.find(a => a.startsWith("--concurrency="))?.slice(14)) || 4;
const ONLY = process.argv.find(a => a.startsWith("--only="))?.slice(7).split(",");

async function genImage(p, tryIdx) {
  const variants = [
    `Single product photo of: ${p.en}. Centered on pure white seamless background. Professional clean e-commerce product photography, soft studio lighting, sharp focus, no text, no watermarks, no people. The image MUST clearly show ${p.en.split(",")[0]}.`,
    `High-quality studio photo: ${p.en}. Pure white background, B2B catalog style, no text, no people, clear and recognizable.`,
    `Realistic professional photograph of ${p.en}, isolated on white background, e-commerce listing style, the product is the only subject and clearly identifiable.`,
    `${p.en}, professional product shot on white seamless background, the subject is unambiguous and recognizable, no other objects, no text.`,
  ];
  const prompt = variants[Math.min(tryIdx, variants.length - 1)];
  const body = { instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio: "1:1", personGeneration: "dont_allow" } };
  for (let attempt = 0; attempt < 12; attempt++) {
    const key = pickKey();
    const cooldownMs = (KEY_COOLDOWN.get(key) ?? 0) - Date.now();
    if (cooldownMs > 0) {
      // All keys cooling down; wait for the soonest
      const wait = Math.min(...KEYS.map(k => Math.max(0, (KEY_COOLDOWN.get(k) ?? 0) - Date.now())));
      if (wait > 0 && wait < 90000) await new Promise(r => setTimeout(r, wait + 500));
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGEN_MODEL}:predict?key=${pickKey()}`;
    const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    if (res.status === 429) {
      KEY_COOLDOWN.set(key, Date.now() + 65000);
      continue;
    }
    if (res.status === 400) { KEY_COOLDOWN.set(key, Date.now() + 86400000); continue; }
    const json = await res.json();
    if (!res.ok) throw new Error(`imagen ${res.status}`);
    const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) throw new Error("imagen no data (safety filter)");
    return Buffer.from(b64, "base64");
  }
  throw new Error("rate limited all attempts");
}

async function verifyImage(imgBuf, p) {
  const small = await sharp(imgBuf).resize(256, 256, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
  const b64 = small.toString("base64");
  const prompt = `Strict check: this AI-generated B2B product image was MEANT to depict:
- Vietnamese name: "${p.vn}"
- Detailed English: "${p.en}"

Look at the image carefully and answer:
- matches: true ONLY if the image clearly shows the SPECIFIC product type described (right category AND right item type). False if generic, wrong category, abstract, or just visually similar but different product.
- actual: 5-10 word description of what you see
- confidence: 0.0-1.0

Examples of FALSE: book when plant pot expected, stone when lion statue expected, vase when plant wall expected.
Examples of TRUE: plant pot when plant pot expected (even if color differs), garden lion when lion statue expected.

Return ONLY JSON: {"matches": true|false, "actual": "...", "confidence": 0.x}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${VISION_MODEL}:generateContent?key=${pickKey()}`;
  const body = {
    contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: b64 } }] }],
    generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
  };
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json();
  if (!res.ok) throw new Error(`vision ${res.status}`);
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
}

await fs.mkdir(IMG_DIR, { recursive: true });
await fs.mkdir(CAT_OUT, { recursive: true });

let state = { startedAt: new Date().toISOString(), updatedAt: null, items: [] };
async function saveState() {
  state.updatedAt = new Date().toISOString();
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
}

const filtered = ONLY ? PRODUCTS.filter(p => ONLY.includes(p.slug)) : PRODUCTS;
console.log(`Generating ${filtered.length} home-garden images, concurrency=${CONCURRENCY}\n`);

const queue = [...filtered];
let done = 0;

async function worker() {
  while (queue.length) {
    const p = queue.shift();
    if (!p) break;
    const outPath = path.join(IMG_DIR, `${p.slug}.jpg`);
    const catPath = path.join(CAT_OUT, `${p.slug}.jpg`);
    let result = { slug: p.slug, vn: p.vn, en: p.en, status: "failed", actual: null, tries: 0 };
    for (let tryIdx = 0; tryIdx < MAX_RETRIES; tryIdx++) {
      try {
        const raw = await genImage(p, tryIdx);
        const v = await verifyImage(raw, p);
        result.tries = tryIdx + 1;
        result.actual = v.actual;
        result.confidence = v.confidence;
        if (v.matches && v.confidence >= MIN_CONFIDENCE) {
          const resized = await sharp(raw).resize(300, 300, { fit: "cover", position: "centre" }).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
          await fs.writeFile(outPath, resized);
          await fs.writeFile(catPath, resized);
          result.status = "ok";
          break;
        } else {
          result.status = "mismatch";
        }
      } catch (e) {
        result.status = "error";
        result.error = e.message.slice(0, 120);
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    state.items.push(result);
    done++;
    const icon = result.status === "ok" ? "✓" : "✗";
    console.log(`  [${done}/${PRODUCTS.length}] ${icon} ${p.slug} (${result.tries}x) | ${p.vn} → ${result.actual || result.error}`);
    if (done % 5 === 0) await saveState();
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await saveState();

const ok = state.items.filter(r => r.status === "ok").length;
const fail = state.items.filter(r => r.status !== "ok");
console.log(`\n=== Done: ${ok}/${PRODUCTS.length} ok ===`);
if (fail.length) {
  console.log("Failed:");
  fail.forEach(r => console.log(`  ${r.slug} | ${r.vn} → ${r.actual || r.error}`));
}
