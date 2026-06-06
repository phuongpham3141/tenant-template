import { getLocale } from "@/lib/t";
import { dataDict } from "@/messages/data";

/** Server-side data translator. Usage: const td = await getTd(); td(viString).
 *  Also localizes computed patterns ("<n> năm", "Thành lập <year>") not in dict. */
export async function getTd() {
  const locale = await getLocale();
  const d = dataDict(locale);
  return (s: string) => {
    if (d[s]) return d[s];
    const m = /^(\d+)\s*năm$/.exec(s);
    if (m) return locale === "cn" ? `${m[1]}年` : locale === "en" ? `${m[1]} yrs` : s;
    const m2 = /^Thành lập\s+(\d{4})$/.exec(s);
    if (m2) return locale === "cn" ? `${m2[1]}年成立` : locale === "en" ? `Est. ${m2[1]}` : s;
    return s;
  };
}
