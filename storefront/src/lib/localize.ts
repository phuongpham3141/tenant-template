import { getTd } from "@/lib/td";

/** Field names that must NOT be translated (codes, paths, slugs, phone). */
const SKIP = new Set([
  "model", "slug", "image", "gallery", "logo", "sourceUrl",
  "icon", "href", "category", "seriesOriginal", "hotline",
]);

/**
 * Deep-translate every Vietnamese string field of a data object via td().
 * Strings not in the dictionary pass through unchanged, so codes/paths/units
 * are safe. Run ONCE at the top of a page so all downstream {obj.x} renders
 * the localized value without wrapping each site.
 */
export function tdDeep<T>(v: T, td: (s: string) => string): T {
  if (typeof v === "string") return td(v) as unknown as T;
  if (Array.isArray(v)) return v.map((x) => tdDeep(x, td)) as unknown as T;
  if (v && typeof v === "object") {
    const o: Record<string, unknown> = {};
    for (const k in v as Record<string, unknown>) {
      const val = (v as Record<string, unknown>)[k];
      o[k] = SKIP.has(k) ? val : tdDeep(val, td);
    }
    return o as T;
  }
  return v;
}

export { getTd };
