import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CATEGORIES = [
  {
    icon: "🏭",
    name: "Factory audit",
    providers: ["TÜV Rheinland", "SGS Vietnam", "Bureau Veritas"],
    from: "$420",
    desc: "Independent audit reports to ISO 9001 / SA8000 — required by 80% of Vietnamese buyers.",
  },
  {
    icon: "🔬",
    name: "Quality inspection",
    providers: ["Intertek", "QIMA", "AsiaInspection"],
    from: "$220",
    desc: "AQL 2.5 inspection at the factory before sealing the container, with photo + video report within 48h.",
  },
  {
    icon: "🚛",
    name: "DDP shipping to Vietnam",
    providers: ["VietExpress", "Cainiao Logistics", "DHL Trade"],
    from: "$1,800/cont",
    desc: "All-in 20'/40' container from the supplier's warehouse to the buyer's warehouse in Hanoi/Ho Chi Minh City, customs cleared.",
  },
  {
    icon: "⚖",
    name: "Bilingual legal contracts",
    providers: ["Baker McKenzie VN", "YKVN", "VILAF"],
    from: "$680",
    desc: "Draft / review VI-ZH OEM, NDA, and distribution contracts. Protective penalty + escrow clauses.",
  },
  {
    icon: "🌐",
    name: "Specialized translation",
    providers: ["TransVN", "WordSworth Asia", "Yufan Translation"],
    from: "$0.05/word",
    desc: "Translate contracts, CO/CQ, datasheets, and brochures. Online interpretation for buyer meetings.",
  },
  {
    icon: "📣",
    name: "OEM / B2B marketing",
    providers: ["Nanjing Adsmile", "Asia Trade Media", "Hua Marketing"],
    from: "$1,200/month",
    desc: "Vietnam lead-gen: Facebook/Zalo Ads, email outreach to 5K buyers, Vietnamese-language SEO landing pages.",
  },
  {
    icon: "📷",
    name: "Product photography",
    providers: ["Studio M.O.", "Shenzhen ProShot", "Liang Visual"],
    from: "$15/SKU",
    desc: "White-background, lifestyle, and 360° shots. Post-production — ready to upload to Huayuesc product pages.",
  },
  {
    icon: "💳",
    name: "Trade finance",
    providers: ["HSBC China", "ICBC Trade", "Standard Chartered"],
    from: "5.4%/yr interest",
    desc: "L/C financing, factoring, and discounting. Free up cash flow when buyers pay on 60–90 day terms.",
  },
  {
    icon: "🛡",
    name: "Cargo insurance",
    providers: ["PingAn", "PVI", "Bảo Việt"],
    from: "1.1% of FOB price",
    desc: "All-Risk container insurance covering from the supplier's warehouse to the buyer's. 110% value payout.",
  },
  {
    icon: "📦",
    name: "Customs declaration",
    providers: ["Logistic VN", "Sino-VN Customs", "FastClear"],
    from: "$180/declaration",
    desc: "File HS codes and ASEAN-CN C/O Form E. Optimize import duty for buyers (5–15% reduction).",
  },
  {
    icon: "🔢",
    name: "GS1 / EAN barcodes",
    providers: ["GS1 China", "GS1 Vietnam"],
    from: "$95/SKU",
    desc: "Register international barcodes for Vietnamese retail. Essential for selling at Co.opmart and Bach Hoa Xanh.",
  },
  {
    icon: "✅",
    name: "CE / RoHS / FDA certification",
    providers: ["TÜV SÜD", "SGS", "ICR Polska"],
    from: "$1,500",
    desc: "Lab testing + CE/RoHS certificates for electrical goods, and FDA for food-contact items.",
  },
];

const TOP_PROVIDERS = [
  { name: "TÜV Rheinland", rating: 4.9, jobs: "1,420 jobs", tag: "Audit · Cert" },
  { name: "QIMA", rating: 4.8, jobs: "2,310 jobs", tag: "Inspection" },
  { name: "VietExpress", rating: 4.8, jobs: "980 jobs", tag: "DDP Logistics" },
  { name: "Baker McKenzie", rating: 4.9, jobs: "320 jobs", tag: "Legal" },
  { name: "Studio M.O.", rating: 4.7, jobs: "640 jobs", tag: "Photo" },
  { name: "Sino-VN Customs", rating: 4.8, jobs: "1,180 jobs", tag: "Customs" },
];

export default function TradeServicesPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Seller Center", href: "/seller-center" }, { label: "Import-Export Service Marketplace" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trade-services" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/15 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🛒 FOREIGN TRADE SERVICE MARKETPLACE</div>
            <h1 className="text-[22px] font-bold text-ink">Import-Export Service Marketplace</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              The 12 service categories a supplier needs to export to Vietnam — from factory audits, product photography, and DDP shipping to CE/RoHS certification. Every provider has been audited by Huayuesc and is paid through escrow.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded p-4 hover:border-brand transition-colors">
                <div className="flex items-start gap-3 mb-2">
                  <div className="text-[28px]">{c.icon}</div>
                  <div className="flex-1">
                    <b className="block text-[13.5px] text-ink leading-tight">{c.name}</b>
                    <span className="text-[10.5px] text-mute">From <b className="text-accent">{c.from}</b></span>
                  </div>
                </div>
                <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                <div className="border-t border-line pt-2 mb-3">
                  <span className="text-[10.5px] text-mute">Top providers:</span>
                  <ul className="mt-1 space-y-0.5">
                    {c.providers.map((p) => (
                      <li key={p} className="text-[11.5px] text-ink flex items-center gap-1">
                        <span className="text-success text-[10px]">●</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full bg-brand/10 text-brand text-[12px] font-semibold rounded-sm py-1.5 hover:bg-brand hover:text-white">
                  View services →
                </button>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">⭐ Top providers in May 2026</b>
              <Link href="#" className="text-brand text-[12px]">View All →</Link>
            </div>
            <div className="grid grid-cols-6 gap-3 max-md:grid-cols-2">
              {TOP_PROVIDERS.map((p, i) => (
                <div key={p.name} className="border border-line rounded p-3 text-center hover:border-brand">
                  <img src={`/img/seller-trade-prov-${i}.jpg?v=5`} alt="" className="w-12 h-12 mx-auto mb-2 rounded object-cover" />
                  <b className="block text-[11.5px] text-ink leading-tight mb-1">{p.name}</b>
                  <div className="text-[10.5px] text-gold mb-1">★ {p.rating}</div>
                  <span className="text-[10px] text-mute block">{p.jobs}</span>
                  <span className="text-[9.5px] text-brand block mt-1 font-semibold">{p.tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-dark text-white rounded p-5 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:text-center">
            <div>
              <b className="block text-[16px] mb-1">💼 Become a Service Provider on Huayuesc</b>
              <p className="text-[12px] opacity-85">Offer import-export services? Sign up to reach 4,200+ suppliers exporting to Vietnam.</p>
            </div>
            <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px] whitespace-nowrap">
              Register as a Provider →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Import-Export Service Marketplace — Seller Center" };
