// Nano Banana Pro (gemini-3-pro-image) batch generator with backoff + resume cache.
// Runs in a plain node container (fetch + fs, no sharp). Saves JPEG to scripts/gen-out/<stem>.jpg.
// Usage: node nano-gen.mjs --from N --to M [--force] [--model gemini-3-pro-image]
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'scripts/gen-out');
fs.mkdirSync(OUT, { recursive: true });

const args = process.argv.slice(2);
function argv(name, def) { const i = args.indexOf(`--${name}`); if (i >= 0 && args[i + 1] && !args[i + 1].startsWith('--')) return args[i + 1]; return def; }
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, argv('manifest', 'scripts/home-gen-manifest.json')), 'utf8'));
const FROM = parseInt(argv('from', '0'), 10);
const TO = parseInt(argv('to', String(MANIFEST.length)), 10);
const FORCE = args.includes('--force');
const MODEL = argv('model', 'gemini-3-pro-image');

const KEY = process.env.GKEY || (fs.existsSync(path.join(ROOT, '.env.local')) ? fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').match(/GEMINI_API_KEY=([^\s]+)/)?.[1]?.trim() : null);
if (!KEY) { console.error('NO KEY'); process.exit(1); }

const stemOf = (p) => p.replace(/^https?:\/\/.*$/, m => 'ext-' + Buffer.from(m).toString('hex').slice(0, 12)).replace(/^\/img\//, '').replace(/\.(jpg|jpeg|png|webp)$/, '');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function genOne(entry) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
  const body = { contents: [{ parts: [{ text: entry.prompt }] }], generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: entry.aspect || '1:1' } } };
  let lastErr = '';
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      if (res.status === 429 || res.status >= 500) { lastErr = `HTTP ${res.status}`; await sleep(Math.min(60000, 4000 * 2 ** attempt) + Math.floor(Math.random() * 2000)); continue; }
      const j = await res.json().catch(() => ({}));
      if (!res.ok) { lastErr = `HTTP ${res.status}: ${JSON.stringify(j).slice(0, 160)}`; await sleep(3000 * (attempt + 1)); continue; }
      const parts = j?.candidates?.[0]?.content?.parts || [];
      const d = (parts.find(p => p.inlineData) || {}).inlineData || (parts.find(p => p.inline_data) || {}).inline_data;
      if (!d) { lastErr = 'no-image:' + JSON.stringify(j).slice(0, 160); await sleep(3000); continue; }
      return { buf: Buffer.from(d.data, 'base64'), tokens: j?.usageMetadata?.candidatesTokenCount || 0 };
    } catch (e) { lastErr = String(e).slice(0, 120); await sleep(4000 * (attempt + 1)); }
  }
  throw new Error(lastErr || 'fail');
}

const slice = MANIFEST.slice(FROM, TO);
const results = [];
let okN = 0, skipN = 0, failN = 0, tok = 0;
for (let i = 0; i < slice.length; i++) {
  const e = slice[i];
  const stem = stemOf(e.path);
  const outFile = path.join(OUT, stem + '.jpg');
  if (!FORCE && fs.existsSync(outFile) && fs.statSync(outFile).size > 2000) { skipN++; results.push({ stem, status: 'skip' }); continue; }
  try {
    const { buf, tokens } = await genOne(e);
    fs.writeFileSync(outFile, buf);
    tok += tokens; okN++;
    results.push({ stem, status: 'ok', bytes: buf.length, subject: e.subject || e.kind });
    console.log(`OK   [${FROM + i}] ${stem} (${(buf.length / 1024 | 0)}KB)`);
  } catch (err) {
    failN++; results.push({ stem, status: 'fail', error: String(err).slice(0, 160) });
    console.log(`FAIL [${FROM + i}] ${stem}: ${String(err).slice(0, 120)}`);
  }
}
fs.writeFileSync(path.join(OUT, `_result-${FROM}-${TO}.json`), JSON.stringify({ from: FROM, to: TO, ok: okN, skip: skipN, fail: failN, tokens: tok, results }, null, 1));
console.log(`DONE range ${FROM}-${TO}: ok=${okN} skip=${skipN} fail=${failN} imgTokens=${tok}`);
