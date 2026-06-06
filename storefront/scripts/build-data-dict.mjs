import fs from 'node:fs';
const en = JSON.parse(fs.readFileSync('/work/scripts/gen-out/data.en.json', 'utf8'));
const cn = JSON.parse(fs.readFileSync('/work/scripts/gen-out/data.cn.json', 'utf8'));
// manual supplement for STATS values (key "value" was excluded from extraction)
Object.assign(en, { '12 năm': '12 years' });
Object.assign(cn, { '12 năm': '12年' });
const lit = (o) => Object.entries(o).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join('\n');
fs.writeFileSync('/work/src/messages/data.ts',
`// Auto-generated data dictionary (keyed by Vietnamese source string).
// Fallback to the VI string when a key is missing (graceful, fill incrementally).
import type { LocaleCode } from "@/lib/i18n";
const EN: Record<string, string> = {
${lit(en)}
};
const CN: Record<string, string> = {
${lit(cn)}
};
const DATA: Partial<Record<LocaleCode, Record<string, string>>> = { en: EN, cn: CN };
export function dataDict(locale: LocaleCode): Record<string, string> { return DATA[locale] ?? {}; }
`);
fs.writeFileSync('/work/src/lib/td.ts',
`import { getLocale } from "@/lib/t";
import { dataDict } from "@/messages/data";

/** Server-side data translator. Usage: const td = await getTd(); td(viString).
 *  Also localizes computed "<n> năm" (years) values that aren't in the dict. */
export async function getTd() {
  const locale = await getLocale();
  const d = dataDict(locale);
  return (s: string) => {
    if (d[s]) return d[s];
    const m = /^(\\d+)\\s*năm$/.exec(s);
    if (m) return locale === "cn" ? \`\${m[1]}年\` : locale === "en" ? \`\${m[1]} yrs\` : s;
    return s;
  };
}
`);
console.log('data dict written; en', Object.keys(en).length, 'cn', Object.keys(cn).length);
