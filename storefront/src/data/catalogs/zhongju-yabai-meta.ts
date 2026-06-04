/**
 * Zhongju Yabai 中居亚百 (Guangdong Zhongju Yabai Building Materials Technology) metadata — shared meta.
 * Source: gdzjyb.com. Manufacturer of inorganic pre-coated panels (无机预涂板 / 冰火板 / 洁净板), Foshan – Sanshui.
 */
export type SeriesMeta = {
  story: string; heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[]; careGuide: { title: string; desc: string }[];
  installation: string[]; certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[]; faq: { q: string; a: string }[];
};
const BRAND: SeriesMeta = {
  story:
    "Guangdong Zhongju Yabai Building Materials Technology Co., Ltd. (中居亚百) specializes in inorganic pre-coated panels — also known as ice-fire panels / clean panels — a premium surface cladding material for partition walls and interior/exterior ceilings. The company integrates R&D, manufacturing and sales, with an experienced engineering team and an automated production line; it is based in the Sanshui district of Foshan, Guangdong.",
  heritage:
    "The products are fire-resistant (Class A), anti-damp, anti-mold, antibacterial and formaldehyde-free — meeting the requirements of hospitals, cleanrooms and medical environments. They have been used in many hospitals (for example, the Affiliated Hospital of Qingdao University and Huaxin Hospital).",
  technicalSpecs: [
    { label: "Brand", value: "Zhongju Yabai 中居亚百 (Guangdong Zhongju Yabai)" },
    { label: "Products", value: "Inorganic pre-coated panels (ice-fire / clean panels), wall cladding panels" },
    { label: "Properties", value: "Class A fire-resistant, anti-damp/anti-mold, antibacterial, formaldehyde-free" },
    { label: "Facility", value: "Sanshui, Foshan, Guangdong — automated production line" },
  ],
  manufacturing: [
    "Guangdong Zhongju Yabai Building Materials Technology (中居亚百) — Sanshui, Foshan",
    "Inorganic pre-coated panels: both the surface layer and the core are inorganic, so bacteria cannot survive, achieving a 'clean' result",
    "Automated production line; integrated R&D – manufacturing – sales",
    "Properties: Class A fire-resistant, anti-damp, anti-mold, antibacterial, formaldehyde-free",
  ],
  careGuide: [
    { title: "Cleaning", desc: "The inorganic surface resists soiling and is easy to clean; wipe with a damp cloth, no harsh chemicals needed." },
    { title: "Storage", desc: "Store in a dry place on level supports, avoiding edge impacts during warehousing and transport." },
    { title: "Durability", desc: "Anti-damp/anti-mold keeps the surface clean over the long term; suitable for high-hygiene environments." },
  ],
  installation: [
    "Identify the cladding location: partition wall, exterior wall, ceiling, corridor, cleanroom",
    "Mount onto the framing/structure; use adhesive/fittings made for inorganic panels",
    "Treat joints and connection points to ensure a flat, tight, fire-resistant finish",
    "Finish edges and joints per environmental requirements (hospital/cleanroom)",
  ],
  certifications: [
    "Class A fire-resistant (non-combustible decorative material)",
    "Formaldehyde-free — meets medical/cleanroom environmental standards",
    "Antibacterial — suitable for hospitals, labs and cleanrooms",
  ],
  packaging: [
    { label: "Supply format", value: "By panel/specification, delivered per project" },
    { label: "Surface", value: "Many grains & colors (wood grain, solid color, pastel, etc.)" },
    { label: "Application", value: "Walls, ceilings, interior and exterior cladding" },
  ],
  whyChoose: [
    { icon: "🔥", title: "Class A fire-resistant", desc: "Non-combustible inorganic material — safe for buildings." },
    { icon: "🏥", title: "Medical-grade", desc: "Antibacterial, formaldehyde-free — meets hospital and cleanroom standards." },
    { icon: "💧", title: "Anti-damp/anti-mold", desc: "The inorganic surface resists damp and mold, cleans easily and stays attractive." },
  ],
  projectShowcase: ["Hospitals & medical facilities (cleanrooms)", "Schools and laboratories", "Hotels, apartments, offices", "Walls/ceilings & public corridors"],
  faq: [
    { q: "What is Zhongju Yabai's inorganic 'ice-fire' panel?", a: "It is a decorative panel whose surface and core are both inorganic — Class A fire-resistant, anti-damp/anti-mold, antibacterial and formaldehyde-free, used for wall/ceiling cladding." },
    { q: "What projects is it used for?", a: "Hospitals, cleanrooms, schools, labs, hotels, offices and public corridors — anywhere requiring high fire resistance and hygiene." },
    { q: "Does Zhongju Yabai supply to Vietnam?", a: "Contact Huayuesc for advice on supplying Zhongju Yabai inorganic panels for projects in Vietnam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
