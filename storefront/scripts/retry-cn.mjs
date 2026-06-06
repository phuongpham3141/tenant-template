import fs from "node:fs";
const KEY = fs.readFileSync("/tmp/.dskey", "utf8").trim();
const out = JSON.parse(fs.readFileSync("/work/scripts/gen-out/data.cn.json", "utf8"));
const todo = Object.keys(out).filter((k) => out[k] === k);
console.log("retry CN:", todo.length);
const BATCH = 20;
async function call(items) {
  const sys = "Translate each Vietnamese building-materials / e-commerce term into Simplified Chinese. Concise, industry-correct. Keep brand names, standard codes (JIS, EN, ASTM, ISO), dimensions/units (mm, kg, W, °) UNCHANGED. Return ONLY a JSON object mapping each input string to its Chinese translation.";
  const body = { model: "deepseek-chat", messages: [{ role: "system", content: sys }, { role: "user", content: JSON.stringify(Object.fromEntries(items.map((k) => [k, k]))) }], response_format: { type: "json_object" }, temperature: 1.0, max_tokens: 8000 };
  const r = await fetch("https://api.deepseek.com/chat/completions", { method: "POST", headers: { Authorization: "Bearer " + KEY, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json();
  if (!j.choices) { console.error("DS err", JSON.stringify(j).slice(0, 150)); return {}; }
  try { return JSON.parse(j.choices[0].message.content); } catch { console.error("parse fail @batch"); return {}; }
}
let done = 0;
for (let i = 0; i < todo.length; i += BATCH) {
  const b = todo.slice(i, i + BATCH);
  const got = await call(b);
  let c = 0; for (const k of b) { if (got[k] && got[k] !== k) { out[k] = got[k]; c++; } }
  done += c; console.log(`${Math.min(i + BATCH, todo.length)}/${todo.length} (+${c})`);
}
fs.writeFileSync("/work/scripts/gen-out/data.cn.json", JSON.stringify(out, null, 2));
console.log("RETRY DONE translated", done, "| still:", Object.keys(out).filter((k) => out[k] === k).length);
