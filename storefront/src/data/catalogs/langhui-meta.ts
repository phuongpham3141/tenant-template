/**
 * Metadata Langhui (Guangdong Langhui Building Material Technology) — shared brand metadata.
 * Source: gdlanghui.com. ALC/AAC autoclaved aerated concrete panel manufacturer, Foshan-Gaoming.
 * Rich-content version: covers AAC blocks, fire-rated walls, floor/roof panels, ultra-thin wall panels, and the full product range.
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
    "Guangdong Langhui Building Material Technology Co., Ltd. (Langhui) transforms ordinary sand, lime and cement into walls that breathe yet stand unbreakable. Its core process is autoclaved aerated concrete (Autoclaved Lightweight Concrete, ALC/AAC for short) — inside high-temperature, high-pressure autoclaves, countless fine, evenly distributed air pockets are permanently sealed within the concrete, producing panels light enough for one person to carry yet able to resist intense fire, block out noise, and shut out heat and cold. From 50mm ultra-thin partition panels, to structural panels that carry floors and roofs, to fire-rated walls that encase steel columns and beams, Langhui answers every demand modern steel-frame buildings place on lightness, speed, safety and energy efficiency with one consistent aerated-concrete language. For projects that value schedule and quality in equal measure, this is a material that puts construction speed and building lifespan in your hands at the same time.",
  heritage:
    "Langhui is located in the Gaoming key industrial development zone of Foshan. Its modern production base covers roughly 246 mu (about 16.4 hectares) with a total investment of approximately RMB 420 million, sitting at the heart of the Greater Bay Area and making full use of the region's synergies in production, logistics and technology. Backed by one of China's leading ultra-thin ALC/AAC panel production lines, Langhui panels are already exported in volume to light steel-frame projects in Australia, Japan and South Korea, earning a solid reputation in international markets.",
  technicalSpecs: [
    { label: "Brand", value: "Langhui (Guangdong Langhui Building Material Technology)" },
    { label: "Material type", value: "Autoclaved aerated concrete ALC/AAC, including wall panels, floor panels, roof panels, fire-rated wall panels and AAC blocks" },
    { label: "Common thicknesses", value: "Ultra-thin wall panels 50mm / 75mm; floor panels, roof panels and blocks selected by application and load" },
    { label: "Dry density grade", value: "Grades B05 to B07 (approximately 500 to 700 kg per cubic meter), a lightweight wall material" },
    { label: "Fire performance", value: "Inorganic non-combustible material that does not burn or release toxic smoke when exposed to fire, suitable for fire encasement and fire-rated partitions" },
    { label: "Physical properties", value: "Lightweight, high strength, thermally insulating, sound insulating, frost resistant, impermeable and seismic resistant, with a high softening coefficient and resistance to cracking when hanging heavy loads" },
  ],
  manufacturing: [
    "Guangdong Langhui Building Material Technology (Langhui) operates its own production base in Foshan Gaoming, covering roughly 246 mu (about 16.4 hectares) with an investment of approximately RMB 420 million",
    "Centered on one of China's leading ultra-thin ALC/AAC production lines, with full in-house control of batching, casting, cutting and autoclave curing",
    "Sand, lime, cement and a foaming agent are cast in scientifically calibrated proportions, then cured and formed in high-temperature, high-pressure autoclaves for fine, uniform air pockets and stable dimensions",
    "Leveraging the Greater Bay Area's advantages in production, logistics and technology to deliver stable, high-volume supply of ultra-thin wall panels, floor panels, roof panels and fire-rated wall panels",
    "Supports custom panel profiles and thicknesses by application; Langhui ALC panels are already exported in large volumes to Australia, Japan, South Korea and other overseas markets",
  ],
  careGuide: [
    { title: "Store away from moisture", desc: "Stack panels flat in a dry, covered area, raised off the ground; during storage, protect edges and corners from impact, rain and moisture seepage." },
    { title: "Cutting and drilling", desc: "Use a dedicated hand saw, power saw or hole saw for clean, straight cuts; after grooving for conduit, promptly fill and pack the channels with mortar to avoid hollow spots." },
    { title: "Finishing treatment", desc: "Use a bonding primer and thin-coat plaster suited to AAC substrates; fill joints per specification and embed mesh tape to effectively prevent the finish layer from cracking." },
    { title: "Protecting finished work", desc: "After installation, protect wall surfaces and panel edges from heavy impact; in wet areas, apply a waterproof base coat before finishing to extend the wall's service life." },
  ],
  installation: [
    "Select the panel type by application: interior and exterior partitions, exterior walls, floors, roofs, and fire encasement of steel columns and beams, choosing thickness based on load and fire rating",
    "Wall panels are secured to beams and floor slabs with a clip (panel clip) connection, using L=25mm shot pins and M8 metal anchors; fire-rated wall panels are mounted on a light steel framing and locked with self-drilling screws",
    "Floor and roof panels are laid over steel beams and connected with steel angle cleats and M12 chemical anchors, controlling overlap and anchorage per the technical drawings",
    "Pack panel joints tightly with cement mortar and detail the connection nodes properly to ensure continuous, reliable sound insulation, fire resistance and crack resistance",
    "Once the joints are dry, skim with filler and apply interior wall paint, or complete a thin-coat plaster finish as the project requires, delivering a flat, attractive wall",
  ],
  certifications: [
    "Autoclaved aerated concrete panels, compliant with ALC/AAC product technical standards and lightweight wall material requirements",
    "Inorganic non-combustible material with fire resistance and fire-endurance performance, suitable for fire encasement of steel structures and fire-rated partitions",
    "Floor and roof panels verified by structural calculation to provide the corresponding load-bearing and crack-resistance performance, compatible with steel-frame and concrete construction",
    "Energy-saving, eco-friendly building material that insulates against heat and sound — green and low-carbon, aligned with modern building energy-efficiency requirements",
    "Products exported in volume to Australia, Japan and South Korea, meeting the supply and quality requirements of those international markets",
  ],
  packaging: [
    { label: "Supply method", value: "Supplied by the panel and by specification, delivered to site in batches aligned with the project schedule" },
    { label: "Common specifications", value: "Ultra-thin wall panels 50mm / 75mm; floor panels, roof panels, fire-rated wall panels and AAC blocks selected by application" },
    { label: "Transport protection", value: "Stacked as full bundles, shrink-wrapped and secured, separated by timber dunnage to prevent edge and corner damage and moisture during transit" },
    { label: "Accompanying connectors", value: "Panel clips, shot pins, metal anchors, steel angle cleats, chemical anchors and other installation accessories can be supplied with the panels" },
    { label: "Applications", value: "Interior and exterior partitions, exterior walls, floors, roofs, fire-rated walls, and fire encasement of steel columns and beams" },
  ],
  whyChoose: [
    { icon: "🧱", title: "Focused on ALC/AAC", desc: "Company-owned base in Foshan Gaoming with a leading ultra-thin panel line, covering the full range of wall, floor, roof and fire-rated wall panels." },
    { icon: "🪶", title: "Light yet strong", desc: "Fine air pockets give low self-weight with considerable strength, reducing structural loads and making the panels easy to handle and quick to assemble." },
    { icon: "🔥", title: "Fire safety", desc: "An inorganic non-combustible material that does not burn or release toxic smoke when exposed to fire — a reliable choice for fire encasement of steel columns and beams and for fire-rated partitions." },
    { icon: "🌡️", title: "Thermal and sound insulation", desc: "The closed-cell air-pocket structure delivers excellent thermal insulation and sound insulation, making walls more energy efficient and interiors quieter." },
    { icon: "🌏", title: "Export quality", desc: "Exported in volume to steel-frame projects in Australia, Japan and South Korea, proven over the long term in international markets." },
  ],
  projectShowcase: [
    "Interior and exterior partitions, floor and roof assembly for light steel-frame housing",
    "Office buildings, factories and other projects needing lightweight partitions and fast dry-process construction",
    "Fire encasement of steel columns and beams, and fire-rated partition projects",
    "Vertical extensions and renovations of existing buildings, and projects with sound insulation, fire safety and energy-efficiency requirements",
  ],
  faq: [
    { q: "What exactly are Langhui's ALC/AAC panels?", a: "ALC/AAC is autoclaved aerated concrete (Autoclaved Lightweight Concrete) — sand, lime, cement and a foaming agent are cured and formed in an autoclave, sealing fine air pockets inside. It is lightweight, high in strength, fire resistant, and sound and thermally insulating, and can be used for walls, floors, roofs and fire encasement." },
    { q: "What panel types does Langhui offer?", a: "These include 50mm / 75mm ultra-thin wall panels, standard ALC/AAC wall panels, floor and roof panels, fire-rated wall panels (encasing steel columns and beams), and high-precision AAC blocks, selectable by application, load and fire rating." },
    { q: "How are the panels installed and connected on site?", a: "Wall panels are mostly fixed to beams and floor slabs with panel clips plus shot pins and metal anchors; floor and roof panels are laid over steel beams and connected with steel angle cleats and chemical anchors; fire-rated wall panels are mounted on light steel framing and locked with self-drilling screws. Joints are packed with cement mortar before finishing." },
    { q: "Why do steel-frame buildings often choose ALC/AAC panels?", a: "Because they are light, reduce structural loads, and are fire resistant, sound and thermally insulating, and seismic resistant; combined with dry-process assembly they can significantly speed up the schedule, making them a high-value solution for walls, floors and roofs in light steel and steel-frame housing." },
    { q: "Can Langhui supply projects in Vietnam?", a: "Langhui panels are already exported to many countries in volume. To supply Langhui ALC/AAC wall panels, floor panels, roof panels or fire-rated wall panels for projects in Vietnam, please contact Huayuesc supply chain to discuss selection and delivery." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
