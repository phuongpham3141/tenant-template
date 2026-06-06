import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { NAV_CATEGORIES } from "@/data/home";
import { getT } from "@/lib/t";

const EXTRA_CATEGORIES = [
  { name: "Packaging & Printing", slug: "packaging-printing" },
  { name: "Pools & Spas", slug: "pool-spa" },
  { name: "Landscaping & Gardens", slug: "landscape-garden" },
  { name: "Rolling Doors & Automatic Gates", slug: "rolling-door" },
  { name: "Granite & Marble", slug: "stone-granite" },
  { name: "HVAC & Ventilation", slug: "hvac" },
  { name: "Children's Toys", slug: "toys" },
  { name: "Uniforms & Fabric", slug: "uniform-fabric" },
  { name: "Wall Tiles & Mosaic", slug: "tile-mosaic" },
  { name: "Camera & Security Systems", slug: "security-camera" },
  { name: "Stainless Steel & Sheet Metal", slug: "metal-sheet" },
  { name: "Smart Electronic Locks", slug: "smart-lock" },
  { name: "Decorative Glass & Mirrors", slug: "glass-mirror" },
  { name: "Ovens & Industrial Stoves", slug: "oven-stove" },
  { name: "Generators", slug: "generator" },
  { name: "Industrial Water Purifiers", slug: "water-purifier" },
  { name: "Solar Energy", slug: "solar" },
  { name: "Premium Aluminum & Glass", slug: "aluminum-glass" },
  { name: "Plastic Pipes & Valves", slug: "pipe-valve" },
  { name: "Industrial Fans", slug: "industrial-fan" },
  { name: "Curtains & Decor Materials", slug: "curtain-decor" },
  { name: "Engineered Wood Flooring", slug: "engineered-wood" },
  { name: "Paint & Finishing Materials", slug: "paint-finish" },
  { name: "Construction Steel", slug: "steel" },
  { name: "Elevators & Escalators", slug: "elevator" },
  { name: "Smart Home Devices", slug: "smart-home" },
  { name: "Coffee Brewing Equipment", slug: "coffee-equipment" },
  { name: "Industrial Freezers & Refrigerators", slug: "freezer" },
  { name: "Glass Display Cabinets", slug: "display-cabinet" },
  { name: "Upholstery Fabric", slug: "upholstery-fabric" },
  { name: "Waterproofing Materials", slug: "waterproof" },
  { name: "Electric Vehicles & Forklifts", slug: "electric-vehicle" },
];

const ALL_CATEGORIES = [
  ...NAV_CATEGORIES.map((c) => ({ name: c.name, slug: c.slug })),
  ...EXTRA_CATEGORIES,
];

const LETTER_ORDER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function firstLetter(name: string): string {
  const first = name.trim()[0]?.toUpperCase() ?? "Z";
  const normalized = first.normalize("NFD").replace(/[̀-ͯ]/g, "");
  return normalized || first;
}

const grouped: Record<string, { name: string; slug: string }[]> = {};
for (const c of ALL_CATEGORIES) {
  const l = firstLetter(c.name);
  if (!grouped[l]) grouped[l] = [];
  grouped[l].push(c);
}
for (const l of Object.keys(grouped)) {
  grouped[l].sort((a, b) => a.name.localeCompare(b.name, "en"));
}
const LETTERS = Array.from(new Set(LETTER_ORDER.split(""))).filter((l) => grouped[l]);

const VERTICALS = [
  { icon: "🏨", name: "Hotels & Resorts", count: "240+ suppliers" },
  { icon: "🏢", name: "Offices & Co-working", count: "180+ suppliers" },
  { icon: "🏠", name: "Condos & Apartments", count: "320+ suppliers" },
  { icon: "🍽️", name: "Restaurants & Cafes", count: "150+ suppliers" },
  { icon: "🏥", name: "Healthcare & Hospitals", count: "90+ suppliers" },
  { icon: "🏫", name: "Schools & Training", count: "75+ suppliers" },
  { icon: "🛍️", name: "Retail & Showrooms", count: "210+ suppliers" },
  { icon: "🏗️", name: "Projects & Construction", count: "400+ suppliers" },
];

export default async function ProductDirectoryPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("buyer_center_product_directory.breadcrumb_home"), href: "/" }, { label: t("buyer_center_product_directory.breadcrumb_buyer_center"), href: "/buyer-center" }, { label: t("buyer_center_product_directory.breadcrumb_product_directory") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/product-directory" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/10 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">{t("buyer_center_product_directory.badge")}</div>
            <h1 className="text-[22px] font-bold text-ink">{t("buyer_center_product_directory.title")}</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              {t("buyer_center_product_directory.intro")}
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-3 mb-4 sticky top-2 z-10">
            <div className="flex flex-wrap gap-1 justify-center">
              {LETTERS.map((l) => (
                <a key={l} href={`#letter-${l}`} className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-brand border border-line rounded-sm hover:bg-brand hover:text-white">{l}</a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[1fr_240px] gap-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-5">
              {LETTERS.map((l) => (
                <section key={l} id={`letter-${l}`} className="mb-5 last:mb-0 scroll-mt-20">
                  <div className="flex items-center gap-3 mb-2 pb-2 border-b border-line">
                    <div className="w-9 h-9 bg-brand text-white rounded-sm flex items-center justify-center font-extrabold text-[16px]">{l}</div>
                    <span className="text-[12px] text-mute">{grouped[l].length} {t("buyer_center_product_directory.categories_suffix")}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 max-md:grid-cols-2">
                    {grouped[l].map((c) => (
                      <Link key={c.slug} href={`/category/${c.slug}`} className="text-[12.5px] text-ink hover:text-brand py-1 border-b border-dashed border-line">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside className="bg-paper border border-line rounded p-4 self-start">
              <b className="block text-[13px] text-ink mb-3">{t("buyer_center_product_directory.browse_by_vertical")}</b>
              <ul className="space-y-1">
                {VERTICALS.map((v) => (
                  <li key={v.name}>
                    <Link href={`/category/${v.name.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "")}`} className="flex items-center gap-2 px-2 py-1.5 rounded-sm text-[12px] text-ink hover:bg-[#F5F7FA]">
                      <span className="w-5 text-center">{v.icon}</span>
                      <span className="flex-1 leading-tight">{v.name}</span>
                      <span className="text-[10px] text-mute">{v.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/buying-request" className="mt-3 block text-center px-3 py-2 bg-accent text-white rounded-sm text-[12px] font-bold hover:opacity-90">{t("buyer_center_product_directory.send_rfq")}</Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Product Directory — Buyer Center" };
