import fs from 'node:fs';
import path from 'node:path';

// A) swap `import Link from "next/link"` -> locale-aware wrapper (skip the wrapper itself)
const ROOT = '/work/src';
const SKIP = '/work/src/components/i18n-link.tsx';
let count = 0;
const OLD = 'import Link from "next/link";';
const NEW = 'import Link from "@/components/i18n-link";';
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.tsx') && p !== SKIP) {
      let s = fs.readFileSync(p, 'utf8');
      if (s.includes(OLD)) {
        s = s.split(OLD).join(NEW);
        fs.writeFileSync(p, s);
        count++;
      }
    }
  }
}
walk(ROOT);
console.log('Link wrapper applied to', count, 'files');

// B) lang-switcher: detect active from path, drop host arg from localeHref, add import
const ls = `${ROOT}/components/lang-switcher.tsx`;
let s = fs.readFileSync(ls, 'utf8');
if (s.includes('  localeHref,\n')) s = s.replace('  localeHref,\n', '  localeHref,\n  detectLocaleFromPath,\n');
else console.log('lang-switcher: localeHref import line NF');
if (s.includes('const active: LocaleCode = detectLocaleFromHost(host);'))
  s = s.replace('const active: LocaleCode = detectLocaleFromHost(host);',
                'const active: LocaleCode = detectLocaleFromPath(path) ?? detectLocaleFromHost(host);');
else console.log('lang-switcher: active line NF');
const before = (s.match(/localeHref\(l\.code, path, host\)/g) || []).length;
s = s.split('localeHref(l.code, path, host)').join('localeHref(l.code, path)');
fs.writeFileSync(ls, s);
console.log('lang-switcher: localeHref calls fixed:', before);
