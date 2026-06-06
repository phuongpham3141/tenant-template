import { getLocale } from "@/lib/t";
import { dataDict } from "@/messages/data";

/** Server-side data translator. Usage: const td = await getTd(); td(viString).
 *  Also localizes computed "<n> năm" (years) values that aren't in the dict. */
export async function getTd() {
  const locale = await getLocale();
  const d = dataDict(locale);
  return (s: string) => {
    if (d[s]) return d[s];
    const m = /^(\d+)\s*năm$/.exec(s);
    if (m) return locale === "cn" ? `${m[1]}年` : locale === "en" ? `${m[1]} yrs` : s;
    return s;
  };
}
