// Batched VI->EN+CN translation of the data dictionary (keyed by VI string).
import fs from 'node:fs';
const KEY = fs.readFileSync('/tmp/.dskey', 'utf8').trim();
const SRC = JSON.parse(fs.readFileSync('/work/scripts/gen-out/data-vi.json', 'utf8'));
const keys = Object.keys(SRC);
const BATCH = 80;

async function call(targetName, items) {
  const sys = `Translate each Vietnamese building-materials/e-commerce term into ${targetName}. Keep concise, industry-correct. Keep brand names, standard codes (e.g. JIS SS400, EN S275JR, ASTM A36, ISO...), dimensions/units (mm, kg, m/s, °) UNCHANGED. Return ONLY a JSON object mapping each input string to its translation. No commentary.`;
  const body = {
    model: 'deepseek-chat',
    messages: [{ role: 'system', content: sys }, { role: 'user', content: JSON.stringify(Object.fromEntries(items.map(k => [k, k]))) }],
    response_format: { type: 'json_object' }, temperature: 1.0, max_tokens: 8000, stream: false,
  };
  const r = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST', headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  const j = await r.json();
  if (!j.choices) { console.error('DS err', JSON.stringify(j).slice(0, 200)); return {}; }
  try { return JSON.parse(j.choices[0].message.content); } catch { console.error('parse fail'); return {}; }
}

async function translateAll(targetName, outName) {
  const outFile = `/work/scripts/gen-out/data.${outName}.json`;
  // TÁI DÙNG bản dịch cũ (đỡ token)
  let out = {};
  try { out = JSON.parse(fs.readFileSync(outFile, 'utf8')); } catch {}
  const todo = keys.filter((k) => !(out[k] && out[k] !== k));
  console.log(`${targetName}: ${todo.length} new / ${keys.length} total (reusing ${keys.length - todo.length})`);
  for (let i = 0; i < todo.length; i += BATCH) {
    const batch = todo.slice(i, i + BATCH);
    const got = await call(targetName, batch);
    Object.assign(out, got);
    console.log(`${targetName} ${Math.min(i + BATCH, todo.length)}/${todo.length} new`);
  }
  for (const k of keys) if (!(k in out)) out[k] = k;
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
  console.log(`${outName} written:`, Object.keys(out).length);
}

await translateAll('English', 'en');
await translateAll('Simplified Chinese', 'cn');
console.log('DATA TRANSLATE DONE');
