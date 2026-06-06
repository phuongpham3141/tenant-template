// OpenAI gpt-image-1 batch generator (quality=high) with backoff + resume cache + cost tracking.
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'scripts/gen-out');
fs.mkdirSync(OUT, { recursive: true });
const args = process.argv.slice(2);
function argv(name, def) { const i = args.indexOf(`--${name}`); if (i >= 0 && args[i + 1] && !args[i + 1].startsWith('--')) return args[i + 1]; return def; }
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, argv('manifest', 'scripts/openai-impact-manifest.json')), 'utf8'));
const FROM = parseInt(argv('from', '0'), 10);
const TO = parseInt(argv('to', String(MANIFEST.length)), 10);
const FORCE = args.includes('--force');
const MODEL = argv('model', 'gpt-image-1');
const QUALITY = argv('quality', 'high');
const KEY = process.env.OKEY || (fs.existsSync(path.join(ROOT, '.env.local')) ? fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').match(/OPENAI_API_KEY=([^\s]+)/)?.[1]?.trim() : null);
if (!KEY) { console.error('NO OPENAI KEY'); process.exit(1); }
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const stemOf = (p) => p.replace(/^\/img\//, '').replace(/\.(jpg|jpeg|png|webp)$/, '');

async function genOne(e) {
  let last = '';
  for (let a = 0; a < 5; a++) {
    try {
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + KEY },
        body: JSON.stringify({ model: MODEL, prompt: e.prompt, size: e.size || '1024x1024', quality: QUALITY, n: 1 }),
      });
      if (res.status === 429 || res.status >= 500) { last = 'HTTP ' + res.status; await sleep(Math.min(90000, 6000 * 2 ** a) + Math.random() * 3000); continue; }
      const j = await res.json().catch(() => ({}));
      if (!res.ok) { last = 'HTTP ' + res.status + ': ' + JSON.stringify(j).slice(0, 200); await sleep(4000 * (a + 1)); continue; }
      const b64 = j?.data?.[0]?.b64_json;
      if (!b64) { last = 'no-image:' + JSON.stringify(j).slice(0, 160); await sleep(3000); continue; }
      return { buf: Buffer.from(b64, 'base64'), tokens: j?.usage?.output_tokens || 0 };
    } catch (err) { last = String(err).slice(0, 140); await sleep(5000 * (a + 1)); }
  }
  throw new Error(last || 'fail');
}

const slice = MANIFEST.slice(FROM, TO);
let ok = 0, skip = 0, fail = 0, tok = 0;
const results = [];
for (let i = 0; i < slice.length; i++) {
  const e = slice[i];
  const stem = stemOf(e.path);
  const outFile = path.join(OUT, stem + '.jpg');
  if (!FORCE && fs.existsSync(outFile) && fs.statSync(outFile).size > 2000) { skip++; continue; }
  try {
    const { buf, tokens } = await genOne(e);
    fs.writeFileSync(outFile, buf);
    tok += tokens; ok++;
    results.push({ stem, tokens });
    console.log(`OK   [${FROM + i}] ${stem} (${(buf.length / 1024 | 0)}KB, ${tokens}tok)`);
  } catch (err) { fail++; console.log(`FAIL [${FROM + i}] ${stem}: ${String(err).slice(0, 140)}`); }
}
const cost = tok * 40 / 1e6; // gpt-image-1 image output tokens ~ $40 / 1M
fs.writeFileSync(path.join(OUT, `_openai-${FROM}-${TO}.json`), JSON.stringify({ ok, skip, fail, tokens: tok, costUSD: +cost.toFixed(4), results }, null, 1));
console.log(`DONE ${FROM}-${TO}: ok=${ok} skip=${skip} fail=${fail} tokens=${tok} cost=$${cost.toFixed(3)}`);
