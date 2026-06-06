import fs from 'node:fs';
function edit(p, pairs) {
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) {
    if (s.includes(a)) s = s.split(a).join(b);
    else console.log('NF', p.split('/').slice(-1)[0], JSON.stringify(a.slice(0, 44)));
  }
  fs.writeFileSync(p, s);
}
const H = '/work/src/components/home';

// factories: brandTags returns full name (td can translate it); years = number + translatable unit
edit(`${H}/factories.tsx`, [
  ['      const n = pr.name.split(/[—·\\-(]/)[0].trim();\n      return n.length > 18 ? n.slice(0, 18) + "…" : n;', '      return pr.name;'],
  ['return diff > 0 ? `${diff} năm` : null;', 'return diff > 0 ? String(diff) : null;'],
  ['{td(years)}', '{years} {t("factories.yrs")}'],
]);

// lang-switcher: add useT, translate section headers; cn label = own language
edit('/work/src/components/lang-switcher.tsx', [
  ['import { useEffect, useState } from "react";', 'import { useEffect, useState } from "react";\nimport { useT } from "@/components/i18n-provider";'],
  ['const active: LocaleCode = detectLocaleFromPath(path) ?? detectLocaleFromHost(host);', 'const active: LocaleCode = detectLocaleFromPath(path) ?? detectLocaleFromHost(host);\n  const t = useT();'],
  ['          Ngôn ngữ\n', '          {t("lang.language")}\n'],
  ['          Tiền tệ\n', '          {t("lang.currency")}\n'],
]);

// cn locale label shown in its own language
edit('/work/src/lib/i18n.ts', [
  ['label: "Tiếng Trung"', 'label: "中文"'],
]);

// add t-keys to vi-src
const vp = '/work/scripts/vi-src.json';
const vi = JSON.parse(fs.readFileSync(vp, 'utf8'));
Object.assign(vi, {
  'factories.yrs': 'năm',
  'lang.language': 'Ngôn ngữ',
  'lang.currency': 'Tiền tệ',
});
fs.writeFileSync(vp, JSON.stringify(vi, null, 2));
console.log('done; vi keys', Object.keys(vi).length);
