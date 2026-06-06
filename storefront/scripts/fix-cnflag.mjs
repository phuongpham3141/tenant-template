import fs from 'node:fs';
const p = '/work/src/app/globals.css';
let s = fs.readFileSync(p, 'utf8');
const neu = `.cn-flag {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  line-height: 1;
  font-size: 12px;
}
.cn-flag::after {
  content: "🇨🇳";
}`;
const start = s.indexOf('.cn-flag {');
const afterStart = s.indexOf('.cn-flag::after {', start);
if (start < 0 || afterStart < 0) { console.log('NF cn-flag blocks'); process.exit(1); }
const afterEnd = s.indexOf('}', afterStart) + 1;
const before = s.slice(start, afterEnd);
s = s.slice(0, start) + neu + s.slice(afterEnd);
fs.writeFileSync(p, s);
console.log('replaced', before.length, 'chars -> China flag emoji. has 🇨🇳:', s.includes('content: "🇨🇳"'));
