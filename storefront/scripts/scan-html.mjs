import fs from 'node:fs';
const VN = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
function decode(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ');
}
for (const [file, label] of [['/tmp/en.html', '/en (EN)'], ['/tmp/cn.html', '/cn (CN)']]) {
  let h = fs.readFileSync(file, 'utf8');
  h = h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const texts = [...h.matchAll(/>([^<>]+)</g)].map((m) => decode(m[1]).trim());
  const attrs = [...h.matchAll(/(?:alt|placeholder|title)="([^"]+)"/g)].map((m) => decode(m[1]).trim());
  const all = [...new Set([...texts, ...attrs])]
    .filter((s) => s && VN.test(s) && s.length <= 120 && !/^[\d.,%\s+<>$★→·–—]+$/.test(s));
  console.log(`\n===== ${label} : ${all.length} đoạn còn TIẾNG VIỆT =====`);
  all.forEach((s) => console.log('  • ' + s.replace(/\s+/g, ' ')));
}
