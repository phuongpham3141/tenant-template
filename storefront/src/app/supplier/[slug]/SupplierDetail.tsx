import { Img } from "@/components/ui/img";
import Link from "@/components/i18n-link";
import type { Factory, Product } from "@/data/home";
import { Vr360Frame } from "./Vr360Frame";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";

const CERTS = ["CE", "ISO 9001", "BSCI", "Sedex", "FSC", "RoHS"];

const TABS: { n: 1 | 2 | 3 | 4 | 5 | 6 | 7; label: string; icon: string }[] = [
  { n: 1, label: "Supplier Home", icon: "🏠" },
  { n: 7, label: "AI Assistant", icon: "🤖" },
  { n: 6, label: "360° Tour", icon: "🎬" },
  { n: 2, label: "Products", icon: "📦" },
  { n: 3, label: "Company Profile", icon: "🏢" },
  { n: 4, label: "Production Capacity", icon: "🏭" },
  { n: 5, label: "Contact", icon: "📞" },
];

export async function SupplierDetail({
  factory: f,
  heroProducts,
  ownProducts,
  allProducts,
}: {
  factory: Factory;
  heroProducts: Product[];
  ownProducts: Product[];
  allProducts: Product[];
}) {
  const t = await getT();
  const td = await getTd();
  const foundedYear = 2026 - parseInt(f.badges.years);
  const productList = ownProducts.length > 0 ? ownProducts : allProducts.slice(0, 24);
  // Per-supplier unique radio name to avoid collision when multiple supplier
  // pages are pre-rendered. Default checked = tab 1 (Supplier Home).
  const radioName = `sup-${f.slug}`;

  return (
    <div className="sup-root">
      {/* Hidden radios — drive tab + panel visibility via :has() */}
      {TABS.map((t) => (
        <input
          key={`r-${t.n}`}
          type="radio"
          name={radioName}
          id={`${radioName}-${t.n}`}
          defaultChecked={t.n === 1}
          className={`hidden sup-radio-${t.n}`}
        />
      ))}

      {/* Banner */}
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[220px] bg-brand-dark">
          <Img loading="lazy" decoding="async" src={`/img/${f.slug}-cover.jpg?v=6`} alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 px-7 py-6 flex items-end gap-5 text-white" style={{ background: "linear-gradient(transparent 30%, rgba(0,37,87,0.95))" }}>
            <div className="w-20 h-20 bg-white border-4 border-gold rounded flex items-center justify-center font-extrabold text-[28px] text-brand flex-shrink-0">
              {f.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {f.badges.gold && <span className="bg-gold text-brand-dark text-[10px] px-2 py-0.5 rounded-sm font-bold">GOLD SUPPLIER</span>}
                {f.badges.audited && <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">AUDITED</span>}
                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">{td(f.badges.years)}</span>
                <span className="text-[12.5px] text-gold">★ {f.rating} ({f.reviews} reviews)</span>
              </div>
              <h1 className="text-[26px] font-extrabold leading-tight max-md:text-[20px]">{f.name}</h1>
              <div className="text-[12.5px] opacity-90 flex items-center gap-3 flex-wrap mt-1">
                <span><span className="cn-flag" /> {f.location}</span>
                <span>•</span>
                <span><b className="text-gold">{td(f.meta)}</b></span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs nav — labels styled as buttons, click toggles radio */}
        <div className="flex gap-0 border-b border-line bg-paper mt-0 px-4 overflow-x-auto" role="tablist">
          {TABS.map((t) => (
            <label
              key={t.n}
              htmlFor={`${radioName}-${t.n}`}
              role="tab"
              className={`sup-tab sup-tab-${t.n} px-4 py-3 text-[13px] cursor-pointer border-b-2 -mb-px whitespace-nowrap transition`}
            >
              <span className="mr-1.5">{t.icon}</span>
              {t.label}
            </label>
          ))}
        </div>
      </div>

      {/* All 5 panels rendered server-side — CSS shows only the active one */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-[1fr_340px] gap-5 max-md:grid-cols-1">
        <div>
          <div className="sup-panel sup-panel-1">
            <HomeTab f={f} foundedYear={foundedYear} heroProducts={heroProducts} />
          </div>
          <div className="sup-panel sup-panel-2">
            <ProductsTab f={f} products={productList} radioName={radioName} />
          </div>
          <div className="sup-panel sup-panel-3">
            <CompanyTab f={f} foundedYear={foundedYear} />
          </div>
          <div className="sup-panel sup-panel-4">
            <CapacityTab f={f} />
          </div>
          <div className="sup-panel sup-panel-5">
            <ContactTab f={f} />
          </div>
          <div className="sup-panel sup-panel-6">
            <Vr360Tab f={f} />
          </div>
          <div className="sup-panel sup-panel-7">
            <AiTab f={f} foundedYear={foundedYear} />
          </div>
        </div>

        {/* Right sidebar — shared across all tabs */}
        <aside className="space-y-4">
          <div className="bg-paper border border-line rounded overflow-hidden">
            <div className="bg-brand text-white px-4 py-2.5 font-semibold text-[13px]">{t("supplier_slug_SupplierDetail.contact_prefix")} {f.name}</div>
            <form action="/buying-request" method="get" className="p-4 space-y-2.5">
              <input name="name" placeholder={t("supplier_slug_SupplierDetail.form_name")} className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <input name="email" type="email" placeholder={t("supplier_slug_SupplierDetail.form_email")} className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <input name="phone" placeholder={t("supplier_slug_SupplierDetail.form_phone")} className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <textarea name="q" placeholder={t("supplier_slug_SupplierDetail.form_requirements")} className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand min-h-[100px] resize-none" />
              <button type="submit" className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[13px] hover:opacity-90">{t("supplier_slug_SupplierDetail.send_rfq_24h")}</button>
            </form>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-2">{t("supplier_slug_SupplierDetail.main_tags")}</b>
            <div className="flex gap-1 flex-wrap">
              {f.tags.map((t) => (
                <span key={t} className="text-[11px] bg-[#F5F5F5] text-mute px-2 py-1 rounded-sm">{td(t)}</span>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-2">{t("supplier_slug_SupplierDetail.trade_protection")}</b>
            <ul className="space-y-1.5 text-[12px] text-mute leading-relaxed">
              <li>{t("supplier_slug_SupplierDetail.tp_refund")}</li>
              <li>{t("supplier_slug_SupplierDetail.tp_escrow")}</li>
              <li>{t("supplier_slug_SupplierDetail.tp_inspection")}</li>
              <li>{t("supplier_slug_SupplierDetail.tp_insurance")}</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* =================================================================== */
/* TAB 1 — SUPPLIER HOME                                              */
/* =================================================================== */
async function HomeTab({ f, foundedYear, heroProducts }: { f: Factory; foundedYear: number; heroProducts: Product[] }) {
  const t = await getT();
  const td = await getTd();
  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">About {f.name}</h2>
        <div className="text-[13px] text-ink leading-relaxed space-y-3">
          <p>{f.name} was founded in {foundedYear} with over {f.badges.years} of experience in {f.tags.join(", ")}. The factory is located in {f.location}, one of the largest industrial hubs in China.</p>
          <p>Today, {f.name} operates 3 production facilities spanning over 200,000 m², with more than 1,500 workers and an 80-engineer R&D team. Capacity {f.meta}, serving orders from 50 countries.</p>
          <p>Key customers include major brands across North America, Europe, and Southeast Asia. In Vietnam, the company has worked with over 80 dealers through Huayuesc since 2018, audited by our team twice a year.</p>
          <p>The factory supports OEM/ODM to drawing, with flexible MOQ from 50 units, a standard 25-day delivery time, and DDP shipping to Vietnam via the Pingxiang warehouse.</p>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.home_key_facts")}</h2>
        <div className="grid grid-cols-3 gap-4 text-[13px] max-md:grid-cols-2">
          {[
            ["Factory Area", "200,000 m²"],
            ["Employees", "1,500+"],
            ["Year Founded", `${foundedYear}`],
            ["Revenue", "$120M / yr"],
            ["Export Revenue", "$80M / yr (66%)"],
            ["Main Markets", "VN, US, EU, JP, KR"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-[11.5px] text-mute uppercase tracking-wider">{k}</div>
              <b className="block text-ink mt-1">{v}</b>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-4 max-md:grid-cols-2">
        {[
          { icon: "🥇", title: "Gold Supplier", desc: f.badges.gold ? `${f.badges.years} running` : "Audited" },
          { icon: "✅", title: "Verified", desc: "Audited on-site" },
          { icon: "📦", title: "On-Time Delivery", desc: "98.5% rate" },
          { icon: "🛡", title: "Trade Assurance", desc: "100% protection" },
        ].map((b) => (
          <div key={b.title} className="bg-paper border border-line rounded p-3 text-center">
            <div className="text-[28px]">{b.icon}</div>
            <b className="block text-[12.5px] text-ink mt-1">{b.title}</b>
            <div className="text-[11px] text-mute">{b.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.home_featured_products")}</h2>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {heroProducts.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block">
              <div className="aspect-square bg-[#F5F5F5]">
                {p.image ? <Img loading="lazy" decoding="async" src={p.image} alt={td(p.title)} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-2.5">
                <h4 className="text-[12px] text-ink line-clamp-2 mb-1">{td(p.title)}</h4>
                <div className="text-accent font-bold text-[13px]">{td(p.price)}<small className="text-mute font-normal text-[10px]">{td(p.unit)}</small></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.home_production_lines")}</h2>
        <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-video bg-[#F5F5F5] rounded overflow-hidden">
              <Img loading="lazy" decoding="async" src={`/img/${f.slug}-line-${i}.jpg?v=6`} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.home_certifications")}</h2>
        <div className="flex gap-3 flex-wrap">
          {CERTS.map((c) => (
            <div key={c} className="px-4 py-2 bg-paper border border-line rounded-sm text-[12.5px] font-semibold text-ink">
              ✓ {c}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 2 — PRODUCTS                                                   */
/* =================================================================== */
async function ProductsTab({ f, products, radioName }: { f: Factory; products: Product[]; radioName: string }) {
  const t = await getT();
  const td = await getTd();
  const categories = ["All", ...Array.from(new Set(products.flatMap((p) => p.tags ?? []))).slice(0, 6)];
  return (
    <div className="bg-paper border border-line rounded p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-[18px] font-bold text-ink">{t("supplier_slug_SupplierDetail.products_catalog")}</h2>
          <p className="text-[12px] text-mute mt-0.5">{products.length} products listed — updated weekly</p>
        </div>
        <div className="text-[12px] text-mute">
          <span>📊 Sold: <b className="text-ink">42,000+ units</b></span>
          <span className="ml-3">⭐ Avg. rating: <b className="text-ink">{f.rating}</b></span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4 pb-3 border-b border-line">
        {categories.map((c, i) => (
          <span
            key={c}
            className={`text-[11.5px] px-3 py-1.5 rounded-sm cursor-pointer ${
              i === 0 ? "bg-brand text-white font-semibold" : "bg-bg border border-line text-mute hover:border-brand"
            }`}
          >
            {td(c)}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand transition block">
            <div className="aspect-square bg-[#F5F5F5] relative">
              {p.image ? <Img loading="lazy" decoding="async" src={p.image} alt={td(p.title)} className="w-full h-full object-cover" /> : null}
              {p.badges?.includes("new") && (
                <span className="absolute top-1.5 left-1.5 bg-success text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold">NEW</span>
              )}
              {p.badges?.includes("top") && (
                <span className="absolute top-1.5 left-1.5 bg-gold text-brand-dark text-[9px] px-1.5 py-0.5 rounded-sm font-bold">BEST SELLER</span>
              )}
            </div>
            <div className="p-2.5">
              <h4 className="text-[12px] text-ink line-clamp-2 mb-1 min-h-[32px]">{td(p.title)}</h4>
              <div className="text-accent font-bold text-[13px]">
                {td(p.price)}<small className="text-mute font-normal text-[10px]">{td(p.unit)}</small>
              </div>
              <div className="text-[10.5px] text-mute mt-1 flex justify-between">
                <span>{td(p.moq)}</span>
                <span>★{p.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <div className="bg-bg border border-line rounded p-3.5">
          <b className="block text-[13px] text-ink mb-1">{t("supplier_slug_SupplierDetail.products_flexible_moq")}</b>
          <p className="text-[12px] text-mute leading-snug">
            {t("supplier_slug_SupplierDetail.products_flexible_moq_desc")}
          </p>
        </div>
        <div className="bg-bg border border-line rounded p-3.5">
          <b className="block text-[13px] text-ink mb-1">{t("supplier_slug_SupplierDetail.products_sample_title")}</b>
          <p className="text-[12px] text-mute leading-snug">
            {t("supplier_slug_SupplierDetail.products_sample_desc")}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <label
          htmlFor={`${radioName}-5`}
          className="px-6 py-2.5 bg-brand text-white rounded-sm text-[13px] font-bold hover:bg-brand-light cursor-pointer"
        >
          {t("supplier_slug_SupplierDetail.products_multi_rfq")}
        </label>
      </div>
    </div>
  );
}

/* =================================================================== */
/* TAB 3 — COMPANY PROFILE                                            */
/* =================================================================== */
async function CompanyTab({ f, foundedYear }: { f: Factory; foundedYear: number }) {
  const t = await getT();
  const milestones = [
    { y: foundedYear, t: "Founded", d: `Started as a small workshop in ${f.location.split(",")[0]} with 12 workers.` },
    { y: foundedYear + 3, t: "Facility 2", d: "Opened a second production facility — total area exceeded 50,000 m²." },
    { y: foundedYear + 6, t: "First Export", d: "First export order to the EU — achieved CE/RoHS certification." },
    { y: foundedYear + 9, t: "Huayuesc Partner", d: "Became a strategic partner, earning Audited + Gold badges." },
    { y: 2025, t: "ASEAN Expansion", d: "Vietnam revenue topped $8M/yr — a top-3 ASEAN market for the company." },
  ];

  const leaders = [
    { name: "Wang Lei", role: "CEO & Founder", initials: "WL", years: f.badges.years },
    { name: "Li Mei", role: "Chief Operating Officer (COO)", initials: "LM", years: "12 yr" },
    { name: "Zhang Wei", role: "R&D Director", initials: "ZW", years: "8 yr" },
    { name: "Nguyen Thu Ha", role: "Vietnam Country Manager", initials: "NH", years: "5 yr" },
  ];

  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">{f.name} Company Profile</h2>
        <p className="text-[13px] text-ink leading-relaxed mb-4">
          {f.name} is a privately held manufacturer specializing in {f.tags.join(", ")}, with {f.badges.years} of experience. Headquartered in {f.location}, the company has grown from a small workshop into a group with 3 production facilities, over 1,500 workers, and a distribution network in 50 countries.
        </p>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <div className="bg-bg border border-line rounded p-3">
            <b className="block text-[10.5px] uppercase tracking-wider text-mute mb-1">Legal Information</b>
            <ul className="text-[12.5px] text-ink space-y-1">
              <li>• China business code: <b>91440605MA****</b></li>
              <li>• Registered capital: <b>RMB 50 million</b></li>
              <li>• Entity type: <b>Limited Liability Company</b></li>
              <li>• Import/export registration: <b>GACC + AEO</b></li>
            </ul>
          </div>
          <div className="bg-bg border border-line rounded p-3">
            <b className="block text-[10.5px] uppercase tracking-wider text-mute mb-1">Financials</b>
            <ul className="text-[12.5px] text-ink space-y-1">
              <li>• 2025 revenue: <b>$120 million</b></li>
              <li>• Year-over-year growth: <b>+18%</b></li>
              <li>• Export share: <b>66%</b></li>
              <li>• Tianyancha credit score: <b>92/100</b></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-4">{t("supplier_slug_SupplierDetail.company_history")}</h2>
        <div className="relative pl-6">
          <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-line" />
          {milestones.map((m, i) => (
            <div key={i} className="relative mb-4 last:mb-0">
              <div className="absolute -left-[1.4rem] top-0.5 w-4 h-4 rounded-full bg-brand border-2 border-paper" />
              <div className="flex items-baseline gap-2 mb-1">
                <b className="text-[14px] text-brand">{m.y}</b>
                <b className="text-[13.5px] text-ink">{m.t}</b>
              </div>
              <p className="text-[12.5px] text-mute leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.company_leadership")}</h2>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {leaders.map((l) => (
            <div key={l.name} className="bg-bg border border-line rounded p-3 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[16px] mb-2">
                {l.initials}
              </div>
              <b className="block text-[13px] text-ink">{l.name}</b>
              <div className="text-[11px] text-mute mt-0.5">{l.role}</div>
              <div className="text-[10.5px] text-mute2 mt-1">{l.years} experience</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.company_awards")}</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• Top 100 {f.tags[0]} Manufacturers in China 2024</li>
            <li>• CIFF Innovative Design Award 2023</li>
            <li>• Guangdong Outstanding Export Enterprise 2022</li>
            <li>• High-Tech Enterprise Certification</li>
            <li>• Top 50 Trusted Brands in Foshan</li>
          </ul>
        </div>
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.company_associations")}</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• CCPIT (China Council for the Promotion of International Trade)</li>
            <li>• China {f.tags[0]} Association</li>
            <li>• Foshan Chamber of International Commerce</li>
            <li>• Official Huayuesc partner since 2018</li>
          </ul>
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 4 — PRODUCTION CAPACITY                                        */
/* =================================================================== */
async function CapacityTab({ f }: { f: Factory }) {
  const t = await getT();
  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">{f.name} Production Capacity</h2>
        <p className="text-[13px] text-ink leading-relaxed mb-4">
          3 production facilities in {f.location} spanning over 200,000 m². 12 automated production lines + 4 QC labs + 2 R&D labs. Capacity {f.meta} serving orders from 50 countries.
        </p>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {[
            { n: "200K m²", l: "Total Area", icon: "🏭" },
            { n: "1,500+", l: "Workers", icon: "👷" },
            { n: "12", l: "Automated Lines", icon: "🔧" },
            { n: "80", l: "R&D Engineers", icon: "🧪" },
          ].map((s) => (
            <div key={s.l} className="bg-bg border border-line rounded p-3 text-center">
              <div className="text-[22px]">{s.icon}</div>
              <b className="block text-[18px] font-extrabold text-brand mt-1">{s.n}</b>
              <div className="text-[11px] text-mute">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">Production Lines</h2>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {[
            { n: 1, name: "Main Line", capacity: "12,000 units/month", auto: "85% automated", staff: "120 workers" },
            { n: 2, name: "Custom OEM Line", capacity: "3,000 units/month", auto: "60% automated", staff: "85 workers" },
            { n: 3, name: "Premium Line", capacity: "1,500 units/month", auto: "Handcrafted", staff: "45 artisans" },
            { n: 4, name: "R&D / New Sample Line", capacity: "200 units/month", auto: "Handcrafted", staff: "20 engineers" },
          ].map((l) => (
            <div key={l.n} className="bg-bg border border-line rounded p-3 flex gap-3">
              <div className="aspect-video w-32 flex-shrink-0 bg-[#F5F5F5] rounded overflow-hidden">
                <Img loading="lazy" decoding="async" src={`/img/${f.slug}-line${l.n}.jpg?v=6`} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <b className="block text-[13px] text-ink">Line {l.n} — {l.name}</b>
                <div className="text-[11.5px] text-mute mt-1 space-y-0.5">
                  <div>📦 Capacity: <b className="text-ink">{l.capacity}</b></div>
                  <div>⚙️ Automation: <b className="text-ink">{l.auto}</b></div>
                  <div>👷 Staff: <b className="text-ink">{l.staff}</b></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.capacity_machinery")}</h2>
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {[
            { n: "12 units", t: "5-axis CNC", brand: "DMG Mori (Germany)" },
            { n: "8 units", t: "Welding / laser-cutting robots", brand: "FANUC (Japan)" },
            { n: "6 units", t: "Automated paint spraying", brand: "Wagner (Germany)" },
            { n: "4 lines", t: "Automated packaging", brand: "Bosch (Germany)" },
            { n: "20 units", t: "Industrial sewing machines", brand: "JUKI (Japan)" },
            { n: "10 units", t: "Hydraulic presses", brand: "Schuler (Germany)" },
          ].map((m, i) => (
            <div key={i} className="bg-bg border border-line rounded p-3">
              <b className="block text-[15px] text-brand">{m.n}</b>
              <div className="text-[12.5px] text-ink mt-0.5">{m.t}</div>
              <div className="text-[11px] text-mute mt-1">{m.brand}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.capacity_qc_system")}</h2>
        <div className="space-y-3">
          {[
            { stage: "1. Incoming Quality Control (IQC)", desc: "100% inspection of every material batch. A dedicated QC lab with XRF spectrometer, moisture meter, and mechanical testing. Samples retained for 18 months." },
            { stage: "2. In-Process Quality Control (IPQC)", desc: "Inspection at 5 stations along the line. Sample size per AQL 2.5. Early defect detection — defect rate reduced below 0.8%." },
            { stage: "3. Final Quality Control (FQC)", desc: "100% inspection before packing. Dimensions measured with digital calipers, finish checked with a gloss meter, plus functional testing." },
            { stage: "4. Pre-shipment Inspection", desc: "An independent Huayuesc inspector checks every order ≥$5K per AQL 2.5. A PDF report + 100+ photos + video are sent to the buyer within 4 hours." },
          ].map((q, i) => (
            <div key={i} className="border-l-4 border-brand bg-bg pl-4 py-2.5">
              <b className="block text-[13px] text-ink">{q.stage}</b>
              <p className="text-[12px] text-mute mt-0.5 leading-relaxed">{q.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.capacity_rnd")}</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• 80 full-time R&D engineers</li>
            <li>• R&D investment: <b>4.5% of revenue</b></li>
            <li>• 47 patents granted</li>
            <li>• 12 new models released per quarter</li>
            <li>• 3D design lab + industrial 3D printers</li>
          </ul>
        </div>
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.capacity_sustainability")}</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• ISO 14001 — environmental management</li>
            <li>• Rooftop solar — 30% of demand</li>
            <li>• Closed-loop wastewater treatment</li>
            <li>• Scrap recycling rate: <b>92%</b></li>
            <li>• FSC chain-of-custody for wood</li>
          </ul>
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 5 — CONTACT                                                    */
/* =================================================================== */
async function ContactTab({ f }: { f: Factory }) {
  const t = await getT();
  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[18px] font-bold text-ink mb-2">Contact {f.name}</h2>
        <p className="text-[13px] text-mute leading-relaxed">
          All communication goes through Huayuesc for Trade Assurance protection + automatic Chinese-Vietnamese translation. A dedicated account manager replies in <b className="text-ink">under 30 minutes</b> during business hours.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-5">
          <span className="inline-block text-[10.5px] uppercase tracking-wider font-bold bg-brand/10 text-brand px-2 py-0.5 rounded-sm mb-2">
            {t("supplier_slug_SupplierDetail.contact_hq_badge")}
          </span>
          <h3 className="text-[15px] font-bold text-ink mb-1">{f.name}</h3>
          <p className="text-[12.5px] text-mute leading-relaxed mb-3">
            Main production building, Tianhe Industrial Park, {f.location}
          </p>
          <ul className="space-y-1 text-[12px] text-ink">
            <li>✉ Email: <b>sales@{f.slug.replace(/-/g, "")}.com.cn</b></li>
            <li>🕒 Hours: <b>Mon-Sat, 8:30-18:00 (GMT+8)</b></li>
            <li>🌐 Languages: <b>Chinese, English, Vietnamese via CSR interpreter</b></li>
          </ul>
        </div>

        <div className="bg-paper border border-line rounded p-5">
          <span className="inline-block text-[10.5px] uppercase tracking-wider font-bold bg-gold/15 text-[#9C6A1F] px-2 py-0.5 rounded-sm mb-2">
            {t("supplier_slug_SupplierDetail.contact_vn_badge")}
          </span>
          <h3 className="text-[15px] font-bold text-ink mb-1">{t("supplier_slug_SupplierDetail.contact_vn_office")}</h3>
          <p className="text-[12.5px] text-mute leading-relaxed mb-3">
            21st Floor, Diamond Flower Tower, 48 Le Van Luong, Cau Giay, Hanoi
          </p>
          <ul className="space-y-1 text-[12px] text-ink">
            <li>✉ Email: <b>vn-{f.slug}@huayuesc.vn</b></li>
            <li>🕒 Hours: <b>Mon-Fri, 8:30-18:00 (GMT+7)</b></li>
            <li>🌐 Languages: <b>Vietnamese, with translation to Chinese</b></li>
          </ul>
        </div>
      </div>

      <div className="bg-paper border-2 border-brand rounded p-5 mt-4">
        <div className="flex items-start gap-4 max-md:flex-col">
          <div className="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[20px] flex-shrink-0">
            NH
          </div>
          <div className="flex-1">
            <span className="inline-block text-[10.5px] uppercase tracking-wider font-bold bg-brand text-white px-2 py-0.5 rounded-sm mb-1">
              {t("supplier_slug_SupplierDetail.contact_account_manager")}
            </span>
            <h3 className="text-[16px] font-bold text-ink mt-1">Nguyen Thu Ha</h3>
            <p className="text-[12px] text-mute">Sourcing Specialist · 5 years in {f.tags[0]}</p>
            <p className="text-[12.5px] text-ink mt-2 leading-relaxed">
              Ha manages {f.name}'s Vietnam dealers — from product advice and price negotiation to production tracking and dispute resolution. Replies via Zalo / Email in under 30 minutes during business hours.
            </p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <a href="https://zalo.me/huayuesc" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#0068FF] text-white rounded-sm text-[12px] font-semibold hover:opacity-90">{t("supplier_slug_SupplierDetail.contact_chat_zalo")}</a>
              <a href="mailto:mcy@huayuesc.com" className="px-3 py-1.5 border border-line text-ink rounded-sm text-[12px] font-semibold hover:border-brand">{t("supplier_slug_SupplierDetail.contact_email")}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-4 hover:border-brand transition cursor-pointer">
          <div className="text-[28px] mb-2">📨</div>
          <b className="block text-[13px] text-ink mb-1">{t("supplier_slug_SupplierDetail.contact_send_rfq")}</b>
          <p className="text-[11.5px] text-mute leading-snug mb-2">{t("supplier_slug_SupplierDetail.contact_send_rfq_desc")}</p>
          <Link href="/buying-request" className="text-[12px] text-brand font-semibold hover:underline">{t("supplier_slug_SupplierDetail.contact_open_rfq")}</Link>
        </div>
        <div className="bg-paper border border-line rounded p-4 hover:border-brand transition cursor-pointer">
          <div className="text-[28px] mb-2">🎥</div>
          <b className="block text-[13px] text-ink mb-1">{t("supplier_slug_SupplierDetail.contact_book_video")}</b>
          <p className="text-[11.5px] text-mute leading-snug mb-2">{t("supplier_slug_SupplierDetail.contact_book_video_desc")}</p>
          <Link href="/buyer-center/meet-suppliers" className="text-[12px] text-brand font-semibold hover:underline">{t("supplier_slug_SupplierDetail.contact_book")}</Link>
        </div>
        <div className="bg-paper border border-line rounded p-4 hover:border-brand transition cursor-pointer">
          <div className="text-[28px] mb-2">🏭</div>
          <b className="block text-[13px] text-ink mb-1">{t("supplier_slug_SupplierDetail.contact_factory_tour")}</b>
          <p className="text-[11.5px] text-mute leading-snug mb-2">{t("supplier_slug_SupplierDetail.contact_factory_tour_desc")}</p>
          <Link href="/factory-tour" className="text-[12px] text-brand font-semibold hover:underline">{t("supplier_slug_SupplierDetail.contact_register")}</Link>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h3 className="text-[15px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.contact_factory_location")}</h3>
        <div className="aspect-[16/7] bg-bg border border-line rounded flex items-center justify-center text-mute">
          <div className="text-center">
            <div className="text-[42px] mb-2">🗺</div>
            <p className="text-[13px]">{f.location}</p>
            <a
              href={`https://map.baidu.com/search/${encodeURIComponent(f.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 bg-brand text-white rounded-sm text-[12px] font-bold hover:bg-brand-light"
            >
              {t("supplier_slug_SupplierDetail.contact_open_maps")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 6 — TOUR 360°                                                   */
/* =================================================================== */
async function Vr360Tab({ f }: { f: Factory }) {
  const t = await getT();
  // Default demo comId (OPPEIN) when the supplier has no VR of its own — so you can preview a demo.
  const DEMO_COM_ID = "eKtTcaCAvhrm";
  const comId = f.vr360ComId ?? DEMO_COM_ID;
  const isOwnVr = !!f.vr360ComId;
  const vrUrl = `https://world-port.made-in-china.com/viewVR?comId=${comId}`;

  // Build the display name for the logo overlay (strip legal suffix + long province/city)
  const overlayName = f.name
    // Drop the province / city at the start of the string
    .replace(/^(Guangdong|Guangzhou|Hangzhou|Shenzhen|Foshan|Shanghai|Hong Kong|Taizhou|Dongguan|Ningbo|Beijing|Tianjin)\s+/i, "")
    // Drop the trailing parenthetical (e.g. "(HK)")
    .replace(/\s*[(（][^)）]*[)）]\s*$/g, "")
    // Drop the legal suffix + trailing dot
    .replace(/\s*,?\s*(Co\.,?\s*Ltd\.?|Co\.\s*Ltd\.?|Co\.,\s*Ltd|Inc\.?|Ltd\.?|Corp\.?|Limited|Holdings|Group)\.?$/gi, "")
    .replace(/\s*,?\s*(Co\.,?\s*Ltd\.?|Co\.\s*Ltd\.?|Co\.,\s*Ltd|Inc\.?|Ltd\.?|Corp\.?|Limited|Holdings|Group)\.?$/gi, "")
    // Clean up spaces + extra characters
    .replace(/\s+/g, " ")
    .replace(/[\s.,;:]+$/g, "")
    .trim()
    .toUpperCase();

  return (
    <>
      {/* Hero intro */}
      <div className="bg-paper border border-line rounded p-5">
        <div className="mb-3">
          <span className="inline-block bg-accent/15 text-accent text-[10.5px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm mb-1">
            {t("supplier_slug_SupplierDetail.vr_badge")}
          </span>
          <h2 className="text-[18px] font-bold text-ink">Tour the {f.name} factory in VR</h2>
          <p className="text-[13px] text-mute mt-1 leading-relaxed">
            Experience the factory on-site without flying to China. Drag to rotate 360°, and click hotspots to explore the production lines, finished-goods warehouse, QC lab, and meeting rooms.
          </p>
        </div>

        {!isOwnVr && (
          <div className="bg-gold/10 border border-gold/30 text-[#7C5A1F] rounded p-3 mb-3 text-[12.5px] flex items-start gap-2">
            <span className="text-[18px] flex-shrink-0">ℹ️</span>
            <span>
              <b>This is a demo</b> — the dedicated 360° tour for <b>{f.name}</b> is being filmed by Huayuesc. Contact your account manager to be notified when it is ready. For now, you are viewing a sample tour.
            </span>
          </div>
        )}

        {/* VR iframe + 2 overlays + native fullscreen button (kept within Huayuesc) */}
        <Vr360Frame vrUrl={vrUrl} overlayName={overlayName} factoryName={f.name} />

        <p className="text-[11px] text-mute2 italic mt-2 text-center">
          Tour provided by a VR technology partner ·{" "}
          {isOwnVr ? "Dedicated tour for this factory" : "Demo (this supplier is preparing its own tour)"}
        </p>
      </div>

      {/* What you can see */}
      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h3 className="text-[15px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.vr_what_you_see")}</h3>
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {[
            { icon: "🏭", t: "Factory Overview", d: "Drone shots of the exterior, signage, entrance, and container parking area." },
            { icon: "⚙️", t: "Production Lines", d: "Main production stations, machinery in operation, real workers." },
            { icon: "📦", t: "Finished-Goods Warehouse", d: "Warehouse scale, packing, labeling, and export-grade palletization." },
            { icon: "🔬", t: "QC Lab", d: "Quality inspection equipment, material testing lab, sample storage." },
            { icon: "🎨", t: "Sample Showroom", d: "Finished products on display — useful for choosing a variant before an RFQ." },
            { icon: "🤝", t: "Meeting Room", d: "In-person meeting space — book a video call with the sales team." },
          ].map((s) => (
            <div key={s.t} className="bg-bg border border-line rounded p-3">
              <div className="text-[24px] mb-1">{s.icon}</div>
              <b className="block text-[13px] text-ink">{s.t}</b>
              <p className="text-[11.5px] text-mute mt-0.5 leading-snug">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to use */}
      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h3 className="text-[15px] font-bold text-ink mb-3">{t("supplier_slug_SupplierDetail.vr_how_navigate")}</h3>
        <div className="grid grid-cols-2 gap-4 text-[12.5px] max-md:grid-cols-1">
          <ul className="space-y-1.5 text-ink">
            <li>🖱 <b>Drag</b> to rotate the 360° view</li>
            <li>🔍 <b>Scroll</b> or use the +/− buttons to zoom in/out</li>
            <li>🎯 <b>Click the hotspots</b> in the image to move to another area</li>
            <li>🗺 <b>The mini-map</b> in the corner helps you see where you are</li>
          </ul>
          <ul className="space-y-1.5 text-ink">
            <li>📱 <b>On mobile</b>: tilt the device to rotate (gyroscope), or touch and drag</li>
            <li>🥽 <b>Have a VR headset?</b> Tap the headset icon in the bottom bar to enter VR mode</li>
            <li>⛶ <b>Fullscreen</b>: the button at the top — the best experience</li>
            <li>🎧 <b>Turn on sound</b> to hear the actual machinery (if available)</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded p-5 text-white mt-4" style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}>
        <div className="flex items-start justify-between gap-4 max-md:flex-col">
          <div>
            <h3 className="text-[16px] font-bold mb-1">{t("supplier_slug_SupplierDetail.vr_cta_title")}</h3>
            <p className="text-[12.5px] opacity-90 leading-relaxed">
              {t("supplier_slug_SupplierDetail.vr_cta_desc")}
            </p>
          </div>
          <Link
            href="/factory-tour"
            className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm text-[13px] font-bold hover:bg-[#E8943A] whitespace-nowrap"
          >
            {t("supplier_slug_SupplierDetail.vr_cta_register")}
          </Link>
        </div>
      </div>
    </>
  );
}

async function AiTab({ f, foundedYear }: { f: Factory; foundedYear: number }) {
  const t = await getT();
  const shortName = f.name.split(/\s+/).slice(0, 2).join(" ");
  const yearsExperience = 2026 - foundedYear;
  const tags = f.tags.slice(0, 3).join(", ");

  const conversation: { role: "ai" | "user"; text: string; time: string }[] = [
    {
      role: "ai",
      time: "09:14",
      text: `Hello! I'm **CSR AI** — the virtual assistant for ${f.name}. I've been trained on ${shortName}'s entire catalogue, price lists, certificates, and order history. I can instantly answer questions about products, MOQ, lead time, samples, payment, and the OEM/ODM process. How can I help you today?`,
    },
    { role: "user", time: "09:15", text: `What are ${shortName}'s flagship products and minimum MOQ?` },
    {
      role: "ai",
      time: "09:15",
      text: `${shortName} has ${yearsExperience} years of experience in ${f.location.split(" · ")[0]}, specializing in ${tags.toLowerCase()}. There are 3 main product lines:\n\n📦 **Custom-to-drawing** — MOQ from 10 sets, lead time 25–30 days\n📦 **Standard modular** — MOQ from 20 sets, lead time 18–22 days\n📦 **Stock items** — MOQ from 5 sets, delivered in 7–10 days\n\nFor orders ≥ 50 sets, the MOQ is negotiable with up to 30% off. Which line are you interested in? I can send a detailed price list right away.`,
    },
    { role: "user", time: "09:17", text: "I'd like to order samples before committing to a bulk order. What's the process?" },
    {
      role: "ai",
      time: "09:17",
      text: `${shortName}'s sample process has 5 steps:\n\n1️⃣ Send your request with reference drawings/photos via the **Send RFQ** button (sidebar on this page)\n2️⃣ The ${shortName} design team does a **free** 3D render in 3–5 days\n3️⃣ Once the design is confirmed, pay a 50% deposit on the sample fee — about **$80–250/product** depending on complexity\n4️⃣ Sample production takes **7–15 days** at the factory\n5️⃣ Ship the sample to Vietnam via DHL/FedEx (~5 days, $80–120 depending on weight)\n\n💰 **100% of the sample fee is credited** to the official order if it is ≥ $5,000.`,
    },
    { role: "user", time: "09:19", text: "Does payment support Trade Assurance? Do you have EU/US export certificates?" },
    {
      role: "ai",
      time: "09:19",
      text: `Both are available ✅\n\n**Payment methods:**\n🛡️ **Huayuesc Escrow** (recommended) — the platform holds the deposit and releases it only when goods arrive at the agreed quality\n💳 **L/C** via VietinBank / Vietcombank\n🏦 **T/T** — 30% deposit + 70% after reviewing photos of the packed goods\n🔄 **OA 30/60 days** — for established partner customers (subject to approval)\n\n**Export certificates:**\n🏅 CE Marking (EU) · ISO 9001:2015 · BSCI · Sedex SMETA 4-pillar · FSC-COC · CARB Phase 2 / TSCA Title VI (US)\n\nDownload the full certificate set on the **Company Profile** tab → Quality Certificates section.`,
    },
    { role: "user", time: "09:21", text: "If I order 30 sets of custom goods, roughly how much in USD?" },
    {
      role: "ai",
      time: "09:21",
      text: `To quote 30 sets of custom goods accurately, I need a bit more:\n\n📐 Average dimensions per set\n🪵 Preferred material (MDF / HDF / solid wood / acrylic / lacquer)\n🔧 Hardware included (Blum / Hettich / Häfele or standard hardware)\n🚚 Delivery terms (FOB Guangzhou / CIF Hai Phong / DDP Hanoi)\n\n**Indicative price range for 30 standard sets:**\n• Economy tier: **$280–380/set**\n• Mid-range tier: **$520–680/set**\n• Premium tier: **$1,150–1,580/set**\n\n👉 Would you like me to auto-generate an RFQ from your specific configuration? Click the **Create RFQ** button below.`,
    },
  ];

  const trainingSources = [
    { icon: "📦", label: "Catalogue of 2,400+ product SKUs", value: f.tags.join(" · ") },
    { icon: "💵", label: "Price lists by MOQ + Incoterms", value: "FOB / CIF / DDP" },
    { icon: "🏅", label: "Quality certificate set", value: "CE · ISO 9001 · BSCI · FSC · CARB" },
    { icon: "📜", label: "Order history + customer reviews", value: `${f.reviews} reviews · ★ ${f.rating}` },
    { icon: "⏱️", label: "Actual lead time by product line", value: "Custom 25–30 · Modular 18–22 · Stock 7–10 days" },
    { icon: "🔄", label: "OEM/ODM process + samples", value: "5 steps · 7–15 days · sample fee credited" },
  ];

  const quickTopics = [
    "💵 Price by MOQ",
    "📐 Samples + 3D render",
    "🚚 Lead time + shipping",
    "🏅 EU / US certificates",
    "🛡️ Payment + Escrow",
    "🔧 OEM / ODM custom",
    "📞 Zoom meeting with sales",
    "🔍 Compare with other suppliers",
  ];

  return (
    <>
      <div className="bg-paper border border-line rounded p-5 mb-4">
        <div className="flex items-start gap-4 max-md:flex-col">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-[26px] flex-shrink-0" style={{ background: "linear-gradient(135deg, #005F6B 0%, #008899 100%)" }}>
            🤖
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="text-[18px] font-bold text-fg">CSR AI · {shortName}</h2>
              <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">● ONLINE</span>
              <span className="bg-gold text-brand-dark text-[10px] px-2 py-0.5 rounded-sm font-bold">BETA</span>
            </div>
            <p className="text-[12.5px] text-mute leading-relaxed">
              A virtual assistant trained specifically on <b>{f.name}</b>'s data. It answers <b>instantly, 24/7</b> in English about products, MOQ, lead time, samples, certificates, payment, and OEM/ODM. Every answer is sourced from the factory's catalogue + official documents.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-line">
          <div className="text-[11.5px] font-bold text-mute uppercase tracking-wide mb-2">{t("supplier_slug_SupplierDetail.ai_data_trained")}</div>
          <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
            {trainingSources.map((s) => (
              <div key={s.label} className="flex items-start gap-2 p-2 bg-bg rounded border border-line">
                <span className="text-[18px] flex-shrink-0">{s.icon}</span>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-fg leading-tight">{s.label}</div>
                  <div className="text-[11px] text-mute2 truncate">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-4 mb-4">
        <div className="text-[12px] font-bold text-mute mb-2">{t("supplier_slug_SupplierDetail.ai_tap_topic")}</div>
        <div className="flex flex-wrap gap-2">
          {quickTopics.map((t) => (
            <button
              key={t}
              type="button"
              className="px-3 py-1.5 bg-bg border border-line rounded-full text-[12px] text-fg hover:border-brand hover:text-brand cursor-pointer transition"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-line rounded overflow-hidden bg-paper">
        <div className="px-4 py-2.5 flex items-center justify-between text-white" style={{ background: "linear-gradient(90deg, #005F6B, #066875)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-[14px]">🤖</div>
            <div>
              <div className="text-[13px] font-bold leading-tight">CSR AI</div>
              <div className="text-[10.5px] opacity-90 leading-tight">Avg. response 1.2s · English + Tiếng Việt</div>
            </div>
          </div>
          <span className="text-[10.5px] bg-white/15 px-2 py-1 rounded">DEMO</span>
        </div>

        <div className="p-4 space-y-3 bg-bg" style={{ maxHeight: 520, overflowY: "auto" }}>
          {conversation.map((m, i) => {
            if (m.role === "ai") {
              return (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[13px] flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #005F6B, #008899)" }}>
                    🤖
                  </div>
                  <div className="max-w-[80%]">
                    <div className="bg-white border border-line rounded-lg rounded-tl-none px-3 py-2 text-[12.5px] text-fg leading-relaxed whitespace-pre-line">
                      {m.text.split(/(\*\*[^*]+\*\*)/).map((seg, j) =>
                        seg.startsWith("**") && seg.endsWith("**")
                          ? <b key={j}>{seg.slice(2, -2)}</b>
                          : <span key={j}>{seg}</span>
                      )}
                    </div>
                    <div className="text-[10px] text-mute2 mt-1 ml-1">CSR AI · {m.time}</div>
                  </div>
                </div>
              );
            }
            return (
              <div key={i} className="flex items-start gap-2 justify-end">
                <div className="max-w-[80%]">
                  <div className="text-white rounded-lg rounded-tr-none px-3 py-2 text-[12.5px] leading-relaxed" style={{ background: "linear-gradient(135deg, #005F6B, #066875)" }}>
                    {m.text}
                  </div>
                  <div className="text-[10px] text-mute2 mt-1 mr-1 text-right">You · {m.time}</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-bg border border-line flex items-center justify-center text-[13px] flex-shrink-0 mt-0.5">
                  👤
                </div>
              </div>
            );
          })}

          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[13px] flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #005F6B, #008899)" }}>
              🤖
            </div>
            <div className="bg-white border border-line rounded-lg rounded-tl-none px-4 py-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-mute2 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-mute2 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-mute2 inline-block" />
              <span className="text-[10.5px] text-mute2 ml-2">{t("supplier_slug_SupplierDetail.ai_typing")}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-line p-3 bg-paper">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={t("supplier_slug_SupplierDetail.ai_input_placeholder")}
              disabled
              className="flex-1 px-3 py-2 border border-line rounded text-[12.5px] bg-bg cursor-not-allowed"
            />
            <button
              type="button"
              disabled
              className="px-4 py-2 bg-mute2 text-white rounded text-[12.5px] font-bold cursor-not-allowed whitespace-nowrap"
            >
              {t("supplier_slug_SupplierDetail.ai_send")}
            </button>
          </div>
          <div className="flex items-start gap-2 mt-2 text-[10.5px] text-mute2 leading-relaxed">
            <span>🚧</span>
            <span>Live AI chat launches in <b className="text-fg">Q3/2026</b>. For now, you are viewing a demo conversation. Need an urgent answer? Click <b>Send RFQ</b> in the sidebar — the {shortName} sales team replies within 2h (China business hours).</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-4">
          <div className="text-[13px] font-bold text-fg mb-2">{t("supplier_slug_SupplierDetail.ai_can_answer")}</div>
          <ul className="text-[12px] text-mute space-y-1.5 leading-relaxed">
            <li>• Specific products (price, MOQ, lead time, material)</li>
            <li>• Sample process + custom ordering</li>
            <li>• Quality certificates and attached files</li>
            <li>• Payment methods + insurance</li>
            <li>• Comparing products within the same catalogue</li>
            <li>• Material recommendations to fit your budget</li>
            <li>• Logistics: FOB ports, ocean transit time, DDP Hanoi</li>
          </ul>
        </div>
        <div className="bg-paper border border-line rounded p-4">
          <div className="text-[13px] font-bold text-fg mb-2">{t("supplier_slug_SupplierDetail.ai_not_replace")}</div>
          <ul className="text-[12px] text-mute space-y-1.5 leading-relaxed">
            <li>• Special price negotiation for large orders</li>
            <li>• Signing long-term OEM contracts</li>
            <li>• Legal / dispute decisions</li>
            <li>• Quotes for complex projects ≥ $50K</li>
            <li>• VIP customers who need a dedicated Account Manager</li>
          </ul>
          <div className="mt-3 pt-3 border-t border-line text-[11.5px] text-mute2">
            👉 Every order is still confirmed by the {shortName} sales team before production. The AI just gives you <b className="text-fg">quick answers up front</b> so you don't have to wait across time zones.
          </div>
        </div>
      </div>
    </>
  );
}
