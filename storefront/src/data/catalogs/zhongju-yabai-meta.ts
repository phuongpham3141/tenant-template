/**
 * Metadata Zhongju Yabai (Guangdong Zhongju Yabai Building Materials Technology) — general metadata.
 * Source: gdzjyb.com. Manufacturer of inorganic pre-coated boards / fire-and-water board / clean board / wall cladding, based in Sanshui, Foshan, Guangdong.
 * Rich content: covers all four product lines — fire-and-water board (wood grain), clean board (medical-grade solid colors), wall cladding (pastel multi-color), and inorganic fireproof pre-coated board.
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
    "Zhongju Yabai (Guangdong Zhongju Yabai Building Materials Technology) wrote two sworn enemies — fire and water — into a single panel, and that is exactly where the name of its signature Fire-and-Water Board comes from. Built and surfaced from inorganic minerals, the board contains not a trace of organic combustible material from core to face. It will not ignite, melt, or drip when exposed to open flame, yet it breathes calmly in damp corridors and washroom zones and never grows mold or absorbs moisture. The product range spans realistic wood-grain Fire-and-Water Board, medical-grade solid-color clean board, soft pastel wall cladding, and inorganic fireproof pre-coated board — covering every wall surface from the operating room to the school corridor. On the automated production lines in Sanshui, Foshan, R&D, manufacturing, and sales are fully integrated, so Class A fire resistance plus formaldehyde-free plus antibacterial is no longer a lab showpiece but an everyday reality on the high-cleanliness walls of projects like Qingdao University Affiliated Hospital and Huaxin Hospital. When a wall has to survive a fire inspection and withstand daily disinfection wipe-downs alike, Zhongju Yabai's answer is to turn peace of mind into a mineral panel you can put on the wall.",
  heritage:
    "Located in the Sanshui District of Foshan, Guangdong, the company is a specialized manufacturer of inorganic pre-coated boards that integrates R&D, manufacturing, and sales, backed by an experienced technical team and automated production lines. With fully inorganic properties — Class A fire resistance, moisture and mold resistance, antibacterial performance, and zero formaldehyde emission — the products have been deployed at scale in high-cleanliness medical projects such as Qingdao University Affiliated Hospital and Huaxin Hospital, making them a preferred finishing material for cleanrooms and healthcare spaces.",
  technicalSpecs: [
    { label: "Material", value: "Inorganic mineral pre-coated board; both the surface layer and the core are inorganic (fire-and-water board / clean board / wall cladding / fireproof pre-coated board)" },
    { label: "Sizes", value: "Standard wall-panel and ceiling-panel formats, cut and customized to project partition, corridor, and ceiling dimensions" },
    { label: "Thickness", value: "Multiple board thicknesses by product line, matched to partition, wall-cladding, and ceiling structural requirements" },
    { label: "Fire Rating", value: "Class A non-combustible (GB 8624 Class A); will not ignite, melt, or drip in fire, with low smoke emission" },
    { label: "Surface", value: "Light-tone wood grain, solid matte, and pastel multi-color (beige / green / gray / blue / pink / white) smooth, easy-clean finishes" },
    { label: "Applications", value: "Hospitals and cleanrooms, operating rooms, laboratories, schools, hotels, office buildings, and public corridor ceilings" },
  ],
  manufacturing: [
    "Guangdong Zhongju Yabai Building Materials Technology — headquartered in the Sanshui District of Foshan, Guangdong, integrating R&D, manufacturing, and sales",
    "Inorganic pre-coated board process: both the surface layer and the core use inorganic mineral materials with no organic combustible content, achieving Class A non-combustibility at the source",
    "The fully inorganic, dense surface leaves bacteria with nothing to cling to and no place to survive, delivering medical-grade clean antibacterial performance",
    "Single-pass pre-coated finishing: wood grain, solid colors, and pastel multi-color finishes are all completed on the line, with uniform color and batch-to-batch consistency",
    "Automated production lines paired with an experienced technical team enable volume delivery to the requirements of hospital, cleanroom, and similar projects",
  ],
  careGuide: [
    { title: "Routine Cleaning", desc: "The dense inorganic surface resists soiling and wipes clean easily; a wrung-out damp cloth removes everyday stains, with no need for strong acidic or alkaline cleaning agents." },
    { title: "Medical Disinfection", desc: "Withstands repeated wipe-downs and spray disinfection with standard hospital and cleanroom disinfectants; the surface does not bleed color, peel, or lose its long-term cleanliness." },
    { title: "Moisture & Mold Resistance", desc: "The mineral substrate is inherently non-absorbent and mold-resistant, keeping surfaces dry and clean over the long term even in damp corridors and washroom zones." },
    { title: "Storage & Handling", desc: "Store lying flat in a dry place; protect the corners and edges of the boards during storage and transport to avoid impact and moisture damage." },
  ],
  installation: [
    "Define finish locations and layout: interior and exterior walls, partitions, ceilings, corridors, and cleanroom walls; lay out first to optimize seams and material use",
    "Install onto light-gauge steel framing or a structural base, fastening with inorganic-board-specific adhesives and accessories to ensure a flat, secure board surface",
    "Carefully handle seams and internal/external corner joints to keep surfaces flat and sealed while maintaining overall Class A fire performance",
    "In cleanroom/hospital environments, seal and trim edges to hygiene requirements, keeping seams smooth with no dirt-trapping dead corners for easy disinfection wipe-downs",
    "After installation, clean the walls, check seam flatness and sealing, and hand over the project once fire and cleanliness criteria pass inspection",
  ],
  certifications: [
    "Class A non-combustible decorative material (GB 8624 Class A) — will not ignite, melt, or drip in fire, with low smoke emission",
    "Zero formaldehyde emission — meets indoor air quality requirements for healthcare and cleanroom environments",
    "Antibacterial surface — bacteria cannot adhere or survive, suitable for operating rooms, laboratories, and cleanrooms",
    "Moisture and mold resistance — the inorganic substrate does not absorb moisture or grow mold, suited to high-humidity and high-hygiene settings",
    "Green, eco-friendly inorganic substrate — fully inorganic formulation with no organic volatile pollution",
  ],
  packaging: [
    { label: "Supply Method", value: "Delivered by board / size to suit the project; full-batch supply available per the project bill of materials" },
    { label: "Surface Options", value: "Light-tone wood grain, solid colors, and pastel multi-color (beige / green / gray / blue / pink / white) available" },
    { label: "Application Scope", value: "Interior and exterior walls, partitions, wall cladding, ceilings, and cleanroom finishes" },
    { label: "Protection", value: "Protective film on the board face, corner edge guards, transported lying flat and dry to prevent impact and moisture" },
    { label: "Samples", value: "Color cards and sample boards available to confirm patterns and surface feel before project volume orders" },
  ],
  whyChoose: [
    { icon: "🔥", title: "Class A Non-Combustible", desc: "A fully inorganic mineral formulation that will not ignite, melt, or drip in fire, with low smoke emission — a safety backstop for project fire compliance." },
    { icon: "🏥", title: "Medical-Grade Clean", desc: "Antibacterial and formaldehyde-free, already used in multiple top-tier hospitals, meeting operating-room and cleanroom hygiene standards." },
    { icon: "💧", title: "Moisture & Mold Resistant", desc: "The mineral substrate does not absorb moisture or grow mold, keeping even damp corridors and washroom zones clean and dry over the long term." },
    { icon: "🎨", title: "Multi-Color Finishes", desc: "From wood grain and solid colors to pastel multi-color, there is a finish for everything — even clean spaces can have a gentle palette." },
    { icon: "🏭", title: "Direct from the Source", desc: "Automated production lines in Sanshui, Foshan, with integrated R&D, manufacturing, and sales — consistent batches and controllable project lead times." },
  ],
  projectShowcase: [
    "Hospital and healthcare facility walls and ceilings, operating rooms, and cleanrooms",
    "Schools, laboratories, and research cleanroom spaces",
    "Interior finishes for hotels, apartments, and office buildings",
    "Public corridors, lobbies, and ceiling and wall-cladding projects",
  ],
  faq: [
    { q: "What exactly is Zhongju Yabai's Fire-and-Water Board?", a: "It is a pre-coated decorative board whose surface layer and core are both inorganic minerals — Class A non-combustible, moisture and mold resistant, antibacterial, and formaldehyde-free. It is often made in light wood-grain finishes for wall and ceiling surfaces, balancing fire safety with decorative appeal." },
    { q: "What is the difference between the fire-and-water board, clean board, wall cladding, and fireproof pre-coated board?", a: "They all belong to Zhongju Yabai's inorganic pre-coated board family: the fire-and-water board is mostly realistic wood grain; the clean board leans toward medical solid colors and high cleanliness; the wall cladding offers pastel multi-color options such as beige, green, gray, blue, pink, and white; and the fireproof pre-coated board emphasizes a Class A non-combustible finish. They share the same performance core — simply choose by application and appearance." },
    { q: "Why do hospitals and cleanrooms favor it?", a: "Because it meets three hard requirements at once: Class A fire resistance to pass fire inspections, formaldehyde-free and antibacterial performance to meet hygiene standards, and moisture and mold resistance to withstand repeated disinfection wipe-downs. It has already been used at scale in projects such as Qingdao University Affiliated Hospital and Huaxin Hospital." },
    { q: "What colors and textures are available for the surface?", a: "Options include light-tone wood grain (oak grain, warm-tone wood grain), solid matte, and pastel multi-color, with palettes spanning beige, green, gray, blue, pink, and white to match the style of the space." },
    { q: "Does Zhongju Yabai supply to Vietnam?", a: "Please contact Huayuesc to inquire. We can supply Zhongju Yabai inorganic pre-coated boards for local healthcare, education, and public building projects in Vietnam and assist with material selection." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
