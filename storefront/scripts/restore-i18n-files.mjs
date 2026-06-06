import fs from 'node:fs';
// Restore the path-locale versions of lib/t.ts + i18n-provider.tsx that
// build-i18n-infra clobbered.
fs.writeFileSync('/work/src/lib/t.ts',
`import { headers } from "next/headers";
import { detectLocaleFromHost, type LocaleCode } from "@/lib/i18n";
import { getMessages, type Messages } from "@/messages";

/** Server Components: active locale from x-locale header (path /en /cn) or Host. */
export async function getLocale(): Promise<LocaleCode> {
  const h = await headers();
  const fromHeader = h.get("x-locale");
  if (fromHeader === "en" || fromHeader === "cn" || fromHeader === "vi") return fromHeader;
  return detectLocaleFromHost(h.get("host"));
}

export function makeT(m: Messages) {
  return (key: string): string => (m as Record<string, string>)[key] ?? key;
}

export async function getT() {
  return makeT(getMessages(await getLocale()));
}
`);

fs.writeFileSync('/work/src/components/i18n-provider.tsx',
`"use client";

import { createContext, useContext } from "react";
import { vi } from "@/messages/vi";
import type { Messages } from "@/messages";
import type { LocaleCode } from "@/lib/i18n";

const Ctx = createContext<{ messages: Messages; locale: LocaleCode }>({ messages: vi, locale: "vi" });

export function I18nProvider({
  messages,
  locale,
  children,
}: {
  messages: Messages;
  locale: LocaleCode;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={{ messages, locale }}>{children}</Ctx.Provider>;
}

export function useT() {
  const m = useContext(Ctx).messages;
  return (key: string): string => (m as Record<string, string>)[key] ?? key;
}

export function useLocale(): LocaleCode {
  return useContext(Ctx).locale;
}
`);
console.log('restored lib/t.ts + i18n-provider.tsx (path-locale versions)');
