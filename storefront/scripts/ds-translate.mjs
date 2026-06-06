// Dịch hàng loạt VI -> EN + CN qua DeepSeek. Trả JSON cùng key.
// Chạy trong container/VM có internet. Key đọc từ /tmp/.dskey.
import fs from 'node:fs';

const KEY = fs.readFileSync('/tmp/.dskey', 'utf8').trim();
const SRC = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); // { key: "tiếng Việt", ... }
const OUT = process.argv[3]; // output path prefix

// Một số bản dịch đã thu hoạch / cố định (ưu tiên hơn DeepSeek để chuẩn thuật ngữ)
const FIXED = {
  en: {
    'cat.home-garden': 'Home & Garden', 'cat.construction-materials': 'Building Materials',
    'cat.bathroom-sanitary': 'Bathroom & Sanitary', 'cat.noi-that': 'Furniture',
    'cat.kitchen-equipment': 'Kitchen Equipment', 'cat.lighting': 'Lighting',
    'cat.doors-windows': 'Doors & Locks', 'cat.electrical': 'Electrical & Appliances',
  },
  cn: {
    'cat.home-garden': '家居与园艺', 'cat.construction-materials': '建筑材料',
    'cat.bathroom-sanitary': '卫浴洁具', 'cat.noi-that': '家具',
    'cat.kitchen-equipment': '厨房设备', 'cat.lighting': '灯具照明',
    'cat.doors-windows': '门窗与门锁', 'cat.electrical': '电气与电器',
  },
};

async function translate(targetName, fixedMap) {
  const outFile = `${OUT}.${targetName === 'English' ? 'en' : 'cn'}.json`;
  // TÁI DÙNG bản dịch cũ (đỡ tốn token): load output trước đó nếu có
  let reuse = {};
  try { reuse = JSON.parse(fs.readFileSync(outFile, 'utf8')); } catch {}
  // chỉ gửi key chưa có trong fixedMap VÀ chưa có bản dịch tái dùng (khác chuỗi VI gốc)
  const todo = Object.fromEntries(
    Object.entries(SRC).filter(([k]) => !fixedMap[k] && !(reuse[k] && reuse[k] !== SRC[k]))
  );
  if (Object.keys(todo).length === 0) {
    const merged = { ...reuse, ...fixedMap };
    for (const k of Object.keys(SRC)) if (!(k in merged)) merged[k] = SRC[k];
    fs.writeFileSync(outFile, JSON.stringify(merged, null, 2));
    console.log(targetName, 'all reused, 0 new keys');
    return;
  }
  const sys = `You are a professional UI localizer for a B2B building-materials e-commerce site (China→Vietnam supply chain). Translate each value into ${targetName} (the source may be Vietnamese OR English — translate to ${targetName} either way; if already in ${targetName}, return it unchanged). Keep it concise, natural, e-commerce tone. Preserve any leading emoji, %s placeholders, and punctuation like "→". Do NOT translate brand names or standard codes (JIS/EN/ASTM/ISO...). Return ONLY a JSON object with the SAME keys, values = translation. No markdown, no commentary.`;
  const todoKeys = Object.keys(todo);
  const BATCH = 70;
  const got = {};
  for (let i = 0; i < todoKeys.length; i += BATCH) {
    const chunk = Object.fromEntries(todoKeys.slice(i, i + BATCH).map((k) => [k, SRC[k]]));
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'system', content: sys }, { role: 'user', content: JSON.stringify(chunk) }],
        response_format: { type: 'json_object' }, temperature: 1.0, max_tokens: 8192, stream: false,
      }),
    });
    const j = await res.json();
    if (!j.choices) { console.error('DS error', JSON.stringify(j).slice(0, 200)); continue; }
    try { Object.assign(got, JSON.parse(j.choices[0].message.content)); } catch { console.error('parse fail batch', i); }
    console.log(`  ${targetName} ${Math.min(i + BATCH, todoKeys.length)}/${todoKeys.length}`);
  }
  const merged = { ...reuse, ...got, ...fixedMap };
  for (const k of Object.keys(SRC)) if (!(k in merged)) merged[k] = SRC[k];
  fs.writeFileSync(outFile, JSON.stringify(merged, null, 2));
  console.log(targetName, 'done:', Object.keys(merged).length, 'keys |', todoKeys.length, 'new');
}

await translate('English', FIXED.en);
await translate('Simplified Chinese', FIXED.cn);
console.log('ALL DONE');
