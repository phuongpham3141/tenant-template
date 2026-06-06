import { headers } from "next/headers";
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
