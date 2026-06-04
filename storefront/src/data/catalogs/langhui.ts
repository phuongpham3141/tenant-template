import type { PartnerProduct } from "@/data/partners";

/**
 * Langhui 朗辉建材 catalog — 6 real ALC/AAC panel products from gdlanghui.com (international site). Official images (verified). English names.
 */

export const LANGHUI_PRODUCTS: PartnerProduct[] = [
  // ─── AAC blocks ───────────────
  {
    model: "High Precision Autoclaved AeratedConcreate Blocks",
    slug: "aac-blocks",
    name: "Langhui High-Precision Autoclaved Aerated Concrete (AAC) Blocks",
    nameOriginal: "High Precision Autoclaved AeratedConcreate Blocks",
    series: "AAC Blocks",
    seriesOriginal: "aac-blocks",
    desc: "Lightweight, high-strength autoclaved aerated concrete (AAC) blocks with excellent thermal insulation, sound insulation, fire resistance, durability and water resistance. An energy-efficient, eco-friendly building material that is easy to install at low cost, with an attractive surface and strong load-bearing performance.",
    image: "/img/products/langhui/aac-blocks.png",
    specs: [{ k: "Properties", v: "Lightweight, high strength, thermal and sound insulation" }, { k: "Fire resistance & durability", v: "Fire-resistant, durable, freeze-resistant, water-resistant, seismic-resistant" }, { k: "Other features", v: "High softening coefficient, holds fixings without cracking, eco-friendly, energy-efficient" }, { k: "Brand", v: "Langhui 朗辉 (Guangdong Langhui)" }, { k: "Type", v: "Autoclaved aerated concrete ALC/AAC" }],
    applications: ["Interior and exterior walls, floors and roofs for steel-frame buildings", "Office towers, factories, fire-rated walls", "Acoustic walls and renovation/vertical extension of existing buildings"],
    sourceUrl: "https://gdlanghui.com/en/248.html",
  },
  // ─── Fire-rated walls ───────────────
  {
    model: "Firewalls",
    slug: "firewalls",
    name: "Langhui ALC/AAC Fire-Rated Wall Panels (steel column & beam encasement)",
    nameOriginal: "Firewalls",
    series: "Fire-Rated Walls",
    seriesOriginal: "firewalls",
    desc: "Fire-rated wall and encasement solution using Langhui ALC/AAC autoclaved aerated concrete panels, used to protect and encase steel columns and beams. The thin panels are mounted on a lightweight steel framing system and fixed with self-drilling screws, forming a lightweight fire barrier that provides thermal and acoustic insulation for steel structures.",
    image: "/img/products/langhui/firewalls.png",
    specs: [{ k: "Construction", v: "Thin ALC/AAC panels mounted on lightweight steel framing, fixed with self-drilling screws (per engineering drawings)" }, { k: "Structural application", v: "Fire encasement of I-section steel columns and round steel columns" }, { k: "Type", v: "Autoclaved aerated concrete ALC/AAC" }, { k: "Brand", v: "Langhui 朗辉 (Guangdong Langhui)" }],
    applications: ["Fire encasement of steel columns and beams", "Fire-rated partitions for steel-frame buildings and factories", "Office towers and plants requiring fire resistance and thermal insulation"],
    sourceUrl: "https://gdlanghui.com/en/250.html",
  },
  // ─── Floor/roof panels ───────────────
  {
    model: "Floor and roof panels",
    slug: "floor-roof-panels",
    name: "Langhui ALC/AAC Autoclaved Aerated Concrete Floor & Roof Panels",
    nameOriginal: "Floor and roof panels",
    series: "Floor/Roof Panels",
    seriesOriginal: "floor-roof-panels",
    desc: "Langhui ALC/AAC autoclaved aerated concrete floor and roof panels used as floor and roof structures for concrete and steel-frame buildings. The panels are assembled onto steel beams and connected with steel angles and chemical bolts, ideal for fast, lightweight and flexible construction.",
    image: "/img/products/langhui/floor-roof-panels.png",
    specs: [{ k: "Brand", v: "Langhui 朗辉 (Guangdong Langhui)" }, { k: "Type", v: "Autoclaved aerated concrete ALC/AAC" }, { k: "Structural application", v: "Floor panels and roof panels" }, { k: "Installation method", v: "Assembled onto steel beams, connected with steel angles and M12 chemical bolts" }],
    applications: ["Floors and roofs for steel-frame buildings", "Concrete-structure buildings and office towers", "Factories built with prefabricated assembly"],
    sourceUrl: "https://gdlanghui.com/en/249.html",
  },
  // ─── ALC/AAC wall panels ───────────────
  {
    model: "Autoclaved Lightweight Concrete",
    slug: "autoclaved-lightweight-concrete-panel",
    name: "Langhui Ultra-Thin ALC/AAC Autoclaved Aerated Concrete Wall Panels",
    nameOriginal: "Autoclaved Lightweight Concrete",
    series: "ALC/AAC Wall Panels",
    seriesOriginal: "autoclaved-lightweight-concrete-panel",
    desc: "Langhui ultra-thin ALC/AAC autoclaved aerated concrete wall panels, available in 50mm and 75mm thicknesses. The 50mm panel suits fast construction; other specifications are agreed upon according to supply requirements.",
    image: "/img/products/langhui/autoclaved-lightweight-concrete-panel.png",
    specs: [{ k: "Thickness", v: "50mm, 75mm" }, { k: "50mm panel", v: "For fast construction (thin fast)" }, { k: "Other specs", v: "By agreement between supplier and buyer" }, { k: "Brand", v: "Langhui 朗辉 (Guangdong Langhui)" }, { k: "Type", v: "Autoclaved aerated concrete ALC/AAC" }],
    applications: ["Partition walls for steel-frame buildings", "Projects requiring fast, lightweight construction", "Factories, office towers and offices"],
    sourceUrl: "https://gdlanghui.com/en/247.html",
  },
  {
    model: "Lightweight ultra-thin 50, 75mm AAC (ALC) concrete wall panels",
    slug: "lightweight-ultrathin-aac-panel",
    name: "Langhui Ultra-Thin Lightweight 50, 75mm ALC/AAC Concrete Wall Panels",
    nameOriginal: "Lightweight ultra-thin 50, 75mm AAC (ALC) concrete wall panels",
    series: "ALC/AAC Wall Panels",
    seriesOriginal: "lightweight-ultrathin-aac-panel",
    desc: "Ultra-thin, lightweight ALC/AAC autoclaved aerated concrete wall panels, used mainly for lightweight steel-frame buildings. Langhui operates an advanced panel production line and process, has achieved mass production and exports large volumes to Australia, Japan and South Korea.",
    image: "/img/products/langhui/lightweight-ultrathin-aac-panel.png",
    gallery: ["/img/products/langhui/lightweight-ultrathin-aac-panel-g1.jpg", "/img/products/langhui/lightweight-ultrathin-aac-panel-g2.jpg"],
    specs: [{ k: "Thickness", v: "50mm, 75mm" }, { k: "Properties", v: "Ultra-thin, lightweight" }, { k: "Type", v: "Autoclaved aerated concrete ALC/AAC" }, { k: "Brand", v: "Langhui 朗辉 (Guangdong Langhui)" }],
    applications: ["Partition walls for lightweight steel-frame buildings", "Export projects (Australia, Japan, Korea)", "Office towers and factories"],
    sourceUrl: "https://gdlanghui.com/en/246.html",
  },
  {
    model: "wallboard",
    slug: "wallboard",
    name: "Langhui ALC/AAC Autoclaved Aerated Concrete Wall Panels",
    nameOriginal: "wallboard",
    series: "ALC/AAC Wall Panels",
    seriesOriginal: "wallboard",
    desc: "Langhui ALC/AAC autoclaved aerated concrete wall panels used as interior and exterior partitions in buildings. The panels are installed using a clip/anchor retaining method fixed to beams and floors, with joints grouted using cement mortar.",
    image: "/img/products/langhui/wallboard.png",
    gallery: ["/img/products/langhui/wallboard-g1.jpg"],
    specs: [{ k: "Installation method", v: "Clip retainers fixed with L=25mm shot pins and M8 metal anchor bolts" }, { k: "Joint treatment", v: "Joints grouted with cement mortar, then skim coat and interior wall paint" }, { k: "Brand", v: "Langhui 朗辉 (Guangdong Langhui)" }, { k: "Type", v: "Autoclaved aerated concrete ALC/AAC" }],
    applications: ["Interior and exterior partitions for steel-frame buildings", "Factories and office towers", "Projects requiring fast, dry-assembly construction"],
    sourceUrl: "https://gdlanghui.com/en/251.html",
  },
];
