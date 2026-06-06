import fs from 'node:fs';
const R = '/work';
const msgDir = `${R}/src/messages`;
fs.mkdirSync(msgDir, { recursive: true });

const vi = JSON.parse(fs.readFileSync(`${R}/scripts/vi-src.json`, 'utf8'));
const en = JSON.parse(fs.readFileSync(`${R}/scripts/gen-out/msg.en.json`, 'utf8'));
const cn = JSON.parse(fs.readFileSync(`${R}/scripts/gen-out/msg.cn.json`, 'utf8'));

const entries = (o) => Object.entries(o).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join('\n');

// vi.ts is the source of keys + types
fs.writeFileSync(`${msgDir}/vi.ts`,
`// Auto-generated message catalog (Vietnamese = source of truth for keys).
// Flat dotted keys. Add a key here + in en.ts/cn.ts to translate a string.
export const vi = {
${entries(vi)}
} as const;

export type MsgKey = keyof typeof vi;
export type Messages = Record<MsgKey, string>;
`);

for (const [name, obj] of [['en', en], ['cn', cn]]) {
  fs.writeFileSync(`${msgDir}/${name}.ts`,
`import type { Messages } from "./vi";
export const ${name}: Messages = {
${entries(obj)}
};
`);
}

fs.writeFileSync(`${msgDir}/index.ts`,
`import { vi } from "./vi";
import { en } from "./en";
import { cn } from "./cn";
import type { LocaleCode } from "@/lib/i18n";
import type { Messages } from "./vi";

const CATALOGS = { vi, en, cn } as const;
export function getMessages(locale: LocaleCode): Messages { return CATALOGS[locale] ?? vi; }
export type { Messages, MsgKey } from "./vi";
`);

// NOTE: src/lib/t.ts (getLocale via x-locale header) and src/components/i18n-provider.tsx
// (locale context + useLocale) are owned by build-path-locale.mjs. We deliberately do NOT
// regenerate them here — doing so previously clobbered the path-locale versions and broke
// the build. This script only (re)builds the message catalogs under src/messages/.

console.log('catalogs written:', fs.readdirSync(msgDir).join(','));
