import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { ARTICLES } from "@/lib/blog";

type SitemapLink = { label: string; href: string; desc?: string };

type SitemapSection = {
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  links: SitemapLink[];
};

const SECTIONS: SitemapSection[] = [
  {
    icon: "🏠",
    color: "#005F6B",
    title: "Home & Discover",
    subtitle: "The platform's main entry points",
    links: [
      { label: "Home", href: "/", desc: "Starting point — featured products, RFQ form, promotions" },
      { label: "All Products", href: "/products", desc: "Catalog of 200K+ SKUs from 1,840+ verified suppliers" },
      { label: "Search", href: "/search", desc: "Full-text search by SKU, supplier, industry" },
      { label: "Image Search", href: "/search/by-image", desc: "Upload a photo to find similar products" },
      { label: "Suppliers", href: "/suppliers", desc: "A list of 1,840+ suppliers that passed audit" },
      { label: "Zones", href: "/zones", desc: "Manufacturing by cluster — Foshan, Dongguan, Yiwu..." },
      { label: "Industry Channels", href: "/industry-channels", desc: "Industry channels — furniture, sanitary, electronics..." },
      { label: "Factory Tour", href: "/factory-tour", desc: "360° video tours of partner factories" },
    ],
  },
  {
    icon: "🛒",
    color: "#16A34A",
    title: "Buying",
    subtitle: "From RFQ to receiving the goods",
    links: [
      { label: "Send RFQ", href: "/buying-request", desc: "RFQ form — AI matching pushes 5-10 suppliers within 24h" },
      { label: "Trade Alert (Newsletter)", href: "/trade-alert", desc: "12,000+ subscribed buyers — weekly news + sale alerts" },
      { label: "Trade Shows 2026", href: "/trade-shows", desc: "12 events CSR represents or co-hosts" },
      { label: "Help Center", href: "/help", desc: "300+ guides across the 5 stages of the buying journey" },
    ],
  },
  {
    icon: "📊",
    color: "#0891B2",
    title: "Buyer Center — After Sign-In",
    subtitle: "The buyer dashboard with 12 features",
    links: [
      { label: "Overview", href: "/buyer-center", desc: "A summary of RFQs, orders, and messages" },
      { label: "My Orders", href: "/buyer-center/orders", desc: "Real-time tracking, photos/video at each milestone" },
      { label: "Favorite Products", href: "/buyer-center/favorites", desc: "Wishlist of SKUs you are considering" },
      { label: "Factory Audit Reports", href: "/buyer-center/audited-reports", desc: "Download blockchain-signed audit reports" },
      { label: "Browsing History", href: "/buyer-center/browsing-history", desc: "Products viewed in the last 30 days" },
      { label: "Contact — Chat", href: "/buyer-center/contact", desc: "Chat with your account manager and suppliers" },
      { label: "Meet Suppliers Online", href: "/buyer-center/meet-suppliers", desc: "Book video calls with suppliers via the CSR dispatcher" },
      { label: "New Buyer Guide", href: "/buyer-center/new-user-guide", desc: "Your first 30 days — detailed onboarding" },
      { label: "Post RFQ", href: "/buyer-center/post-rfq", desc: "Multi-supplier RFQ with industry templates" },
      { label: "Product Directory", href: "/buyer-center/product-directory", desc: "Sorted by HS code, MOQ, delivery time" },
      { label: "Secured Trading", href: "/buyer-center/secured-trading", desc: "Trade Assurance (escrow) workflow" },
      { label: "Discover New Suppliers", href: "/buyer-center/supplier-discover", desc: "AI suggests suppliers based on purchase history" },
    ],
  },
  {
    icon: "🏭",
    color: "#9C6A1F",
    title: "Selling (Seller / Supplier)",
    subtitle: "Register and manage your supplier storefront",
    links: [
      { label: "Sell on Huayuesc", href: "/sell-on-csr", desc: "3 tiers (Free / Verified / Premium) — 4-step audit process" },
      { label: "Register a Factory", href: "/register/factory", desc: "Registration form + upload legal documents" },
      { label: "Register a Dealer", href: "/register/dealer", desc: "Distribution dealers in Vietnam/ASEAN" },
    ],
  },
  {
    icon: "💼",
    color: "#7C2D12",
    title: "Seller Center — After Audit",
    subtitle: "10 operational tools for verified suppliers",
    links: [
      { label: "Overview", href: "/seller-center", desc: "Sales, orders received, RFQ inbox, conversion" },
      { label: "AI Assistant", href: "/seller-center/ai-assistant", desc: "AI assistant writes quotes, translates to Vietnamese, optimizes listings" },
      { label: "Domestic CN", href: "/seller-center/domestic-cn", desc: "Domestic China sales via Taobao/Tmall" },
      { label: "Export NA", href: "/seller-center/export-na", desc: "North America export via Amazon FBA + 3PL" },
      { label: "Gold Member", href: "/seller-center/gold-member", desc: "Top tier — featured banner, priority RFQs" },
      { label: "Logistics", href: "/seller-center/logistics", desc: "Vessel booking, customs broker, container tracking" },
      { label: "Smart Expo", href: "/seller-center/smart-expo", desc: "Virtual booth at online trade fairs" },
      { label: "Trade eHome", href: "/seller-center/trade-ehome", desc: "Digital showroom for the furniture industry" },
      { label: "Trade Services", href: "/seller-center/trade-services", desc: "Translation, legal, and finance for suppliers" },
      { label: "Trading Service", href: "/seller-center/trading-service", desc: "CSR trade representation — outsourced buyer's agent" },
    ],
  },
  {
    icon: "📚",
    color: "#7C3AED",
    title: "Information & Documents",
    subtitle: "Guides, policies, and research materials",
    links: [
      { label: "About CSR", href: "/info/about-us", desc: "The 'digital silk road' vision — 4 pillars" },
      { label: "Association Partner Network", href: "/info/network", desc: "42 associations across VN · CN · ASEAN, 28+ MOUs" },
      { label: "Factory Audit Process", href: "/info/audit-process", desc: "7 steps, 32% pass rate, SGS/BV/TÜV/Intertek labs" },
      { label: "Trade Assurance", href: "/info/trade-assurance", desc: "Escrow via VCB · BIDV · Bank of China — payment protection" },
      { label: "Complaints & Disputes", href: "/info/disputes", desc: "3 escalation levels — Direct · Mediation · VIAC arbitration" },
      { label: "Sample Order", href: "/info/sample-orders", desc: "6-step process, Guangzhou Sample Center" },
      { label: "Import Guide", href: "/info/import-guide", desc: "9 sections — VNACCS, Form E, ACFTA, RCEP" },
      { label: "Shipping Policy", href: "/info/shipping-policy", desc: "Incoterms 2020, 5 VN ports, overland via Lang Son" },
      { label: "DDP Calculator", href: "/info/ddp-calculator", desc: "Interactive calculator — input CBM, weight, route" },
      { label: "Real-Time Order Tracking", href: "/info/order-tracking", desc: "5 stages, photos/video at each milestone" },
      { label: "Payment Protection", href: "/info/payment-protection", desc: "Escrow mechanism + insurance" },
      { label: "Find Products Efficiently", href: "/info/find-products", desc: "RFQ tips, AI matching, multi-supplier comparison" },
      { label: "API Integration", href: "/info/api-integration", desc: "REST + Webhook + 4 SDKs (Node/Py/PHP/Go)" },
      { label: "Market Reports", href: "/info/market-reports", desc: "48 reports/year, covering 12 industries" },
      { label: "Industry News (Blog)", href: "/info/industry-news", desc: "12+ analysis articles, weekly pulse" },
      { label: "Careers", href: "/info/careers", desc: "37+ open roles — Engineering, Product, Sales" },
      { label: "Contact", href: "/info/contact", desc: "8 offices across VN + ASEAN, region dropdown selector" },
    ],
  },
  {
    icon: "⚖",
    color: "#475569",
    title: "Legal & Policies",
    subtitle: "Terms of use and data privacy",
    links: [
      { label: "Terms of Service", href: "/info/terms-of-service", desc: "14 sections, VIAC arbitration, force majeure" },
      { label: "Privacy Policy", href: "/info/privacy-policy", desc: "ISO 27001, NĐ 13/2023, PIPL, GDPR compliance" },
    ],
  },
  {
    icon: "🔐",
    color: "#A21CAF",
    title: "Account & Registration",
    subtitle: "Authentication and onboarding",
    links: [
      { label: "Sign In", href: "/login", desc: "Email/password + Google + Apple + Facebook OAuth" },
      { label: "Register as Buyer", href: "/register/buyer", desc: "Individual or business — fast KYC" },
      { label: "Register as Dealer", href: "/register/dealer", desc: "VN/ASEAN distribution dealers — verified workflow" },
      { label: "Register as Factory", href: "/register/factory", desc: "Supplier factory — start the 7-step audit" },
      { label: "Download Mobile App", href: "/app", desc: "iOS + Android — RFQ + tracking on the go" },
    ],
  },
];

export default function SitemapPage() {
  const totalLinks = SECTIONS.reduce((acc, s) => acc + s.links.length, 0) + ARTICLES.length;
  const sectionsCount = SECTIONS.length + 1; // +1 for blog

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Sitemap" },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-light blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-10 max-md:py-7">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            🗺 SITEMAP
          </span>
          <h1 className="text-[36px] font-extrabold leading-[1.1] mb-3 max-md:text-[24px]">
            Huayuesc Sitemap
          </h1>
          <p className="text-[14.5px] opacity-90 max-w-[760px] leading-relaxed mb-6 max-md:text-[13px]">
            {totalLinks}+ pages organized into {sectionsCount} functional groups. Use this sitemap to quickly explore all of the platform's features and documentation. XML sitemap for search engines: <a href="/sitemap.xml" className="underline text-gold hover:opacity-80">/sitemap.xml</a>
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">📄</div>
              <div className="text-[22px] font-extrabold">{totalLinks}+</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">Total pages</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">🗂</div>
              <div className="text-[22px] font-extrabold">{sectionsCount}</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">Functional groups</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">📰</div>
              <div className="text-[22px] font-extrabold">{ARTICLES.length}</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">Blog articles</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">🌐</div>
              <div className="text-[22px] font-extrabold">EN</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">URL slugs (SEO ready)</div>
            </div>
          </div>
        </div>
      </section>

      {/* === Section anchors quick nav ====================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <div className="bg-paper border border-line rounded p-4">
          <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">📍 JUMP TO A GROUP</div>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="text-[12px] font-semibold px-2.5 py-1 rounded-sm border cursor-pointer hover:opacity-80"
                style={{ borderColor: `${s.color}40`, color: s.color, background: `${s.color}08` }}
              >
                <span className="mr-1">{s.icon}</span>
                {s.title}
              </a>
            ))}
            <a
              href="#blog"
              className="text-[12px] font-semibold px-2.5 py-1 rounded-sm border cursor-pointer hover:opacity-80"
              style={{ borderColor: "#E8943A40", color: "#E8943A", background: "#E8943A08" }}
            >
              <span className="mr-1">📰</span>
              Latest Blog
            </a>
          </div>
        </div>
      </div>

      {/* === SECTIONS ======================================================= */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6 space-y-6">
        {SECTIONS.map((s) => (
          <section
            key={s.title}
            id={s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="bg-paper border border-line rounded overflow-hidden scroll-mt-20"
          >
            {/* Header */}
            <div
              className="px-5 py-4 border-b border-line flex items-center justify-between gap-3 flex-wrap"
              style={{ background: `linear-gradient(135deg, ${s.color}10, ${s.color}03)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center text-[22px] flex-shrink-0 shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}DD)`, color: "#fff" }}
                >
                  {s.icon}
                </div>
                <div>
                  <h2 className="text-[18px] font-extrabold text-ink leading-tight">{s.title}</h2>
                  <p className="text-[12px] text-mute mt-0.5">{s.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[22px] font-extrabold leading-none" style={{ color: s.color }}>
                  {s.links.length}
                </div>
                <div className="text-[10.5px] uppercase tracking-wider text-mute">pages</div>
              </div>
            </div>

            {/* Links grid */}
            <ul className="grid grid-cols-2 gap-x-5 gap-y-1 p-4 max-md:grid-cols-1">
              {s.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block py-2 px-2.5 rounded-sm hover:bg-bg group"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-[13.5px] font-semibold text-ink group-hover:text-brand">{l.label}</span>
                      <span className="text-[10.5px] text-mute2 font-mono">{l.href}</span>
                    </div>
                    {l.desc && (
                      <span className="block text-[11.5px] text-mute leading-snug mt-0.5">{l.desc}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* === Blog articles section ======================================= */}
        <section id="blog" className="bg-paper border border-line rounded overflow-hidden scroll-mt-20">
          <div
            className="px-5 py-4 border-b border-line flex items-center justify-between gap-3 flex-wrap"
            style={{ background: "linear-gradient(135deg, #E8943A10, #E8943A03)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center text-[22px] flex-shrink-0 shadow-sm text-white"
                style={{ background: "linear-gradient(135deg, #E8943A, #C97520)" }}
              >
                📰
              </div>
              <div>
                <h2 className="text-[18px] font-extrabold text-ink leading-tight">Blog — Industry News</h2>
                <p className="text-[12px] text-mute mt-0.5">{ARTICLES.length} articles on market analysis, case studies, and guides</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/info/industry-news"
                className="text-[12px] text-brand font-semibold hover:underline whitespace-nowrap"
              >
                View All →
              </Link>
              <div className="text-right">
                <div className="text-[22px] font-extrabold leading-none text-[#E8943A]">{ARTICLES.length}</div>
                <div className="text-[10.5px] uppercase tracking-wider text-mute">articles</div>
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-x-5 gap-y-1 p-4 max-md:grid-cols-1">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/info/industry-news/${a.slug}`}
                  className="block py-2 px-2.5 rounded-sm hover:bg-bg group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink group-hover:text-brand leading-snug flex-1 line-clamp-2">{a.title}</span>
                    <span className="text-[10px] text-mute2 whitespace-nowrap">{a.readMinutes} min</span>
                  </div>
                  <span className="block text-[10.5px] text-mute2 font-mono mt-1">/info/industry-news/{a.slug}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* === Footer note ==================================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-8 mb-10">
        <div className="bg-bg border border-line rounded p-5 text-center">
          <p className="text-[13px] text-mute leading-relaxed max-w-[680px] mx-auto">
            <b className="text-ink">XML sitemap for search engines</b>: <a href="/sitemap.xml" className="text-brand font-semibold hover:underline">huayuesc.vn/sitemap.xml</a>
            {" · "}
            Updated automatically when a new page or blog post is added. All slugs are standardized in English to optimize international SEO.
          </p>
          <div className="mt-3 flex justify-center gap-3 flex-wrap">
            <Link href="/help" className="text-[12px] px-4 py-2 border border-line rounded-sm font-semibold text-ink hover:border-brand hover:text-brand">
              Help Center
            </Link>
            <Link href="/info/contact" className="text-[12px] px-4 py-2 bg-brand text-white rounded-sm font-bold hover:bg-brand-light">
              Contact CSR
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "Sitemap — Huayuesc",
  description: "A map of the entire Huayuesc site — 80+ pages organized into 9 functional groups. XML sitemap for search engines at /sitemap.xml.",
};
