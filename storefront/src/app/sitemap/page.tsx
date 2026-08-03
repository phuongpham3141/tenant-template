import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { ARTICLES as ARTICLES_SRC } from "@/lib/blog";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";
import { tdDeep } from "@/lib/localize";

type SitemapLink = { label: string; href: string; desc?: string };

type SitemapSection = {
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  links: SitemapLink[];
};

const SECTIONS_RAW: SitemapSection[] = [
  {
    icon: "🏠",
    color: "#005F6B",
    title: "Home & Discover",
    subtitle: "The platform's main entry points",
    links: [
      { label: "sitemap.lbl_home", href: "/", desc: "sitemap.desc_home" },
      { label: "sitemap.lbl_all_products", href: "/products", desc: "sitemap.desc_all_products" },
      { label: "sitemap.lbl_search", href: "/search", desc: "sitemap.desc_search" },
      { label: "sitemap.lbl_image_search", href: "/search/by-image", desc: "sitemap.desc_image_search" },
      { label: "sitemap.lbl_suppliers", href: "/suppliers", desc: "sitemap.desc_suppliers" },
      { label: "sitemap.lbl_zones", href: "/zones", desc: "sitemap.desc_zones" },
      { label: "sitemap.lbl_industry_channels", href: "/industry-channels", desc: "sitemap.desc_industry_channels" },
      { label: "sitemap.lbl_factory_tour", href: "/factory-tour", desc: "sitemap.desc_factory_tour" },
    ],
  },
  {
    icon: "🛒",
    color: "#16A34A",
    title: "Buying",
    subtitle: "From RFQ to receiving the goods",
    links: [
      { label: "sitemap.lbl_send_rfq", href: "/buying-request", desc: "sitemap.desc_send_rfq" },
      { label: "sitemap.lbl_trade_alert", href: "/trade-alert", desc: "sitemap.desc_trade_alert" },
      { label: "sitemap.lbl_trade_shows", href: "/trade-shows", desc: "sitemap.desc_trade_shows" },
      { label: "sitemap.lbl_help_center", href: "/help", desc: "sitemap.desc_help_center" },
    ],
  },
  {
    icon: "📊",
    color: "#0891B2",
    title: "Buyer Center — After Sign-In",
    subtitle: "The buyer dashboard with 12 features",
    links: [
      { label: "sitemap.lbl_overview_buyer", href: "/buyer-center", desc: "sitemap.desc_overview_buyer" },
      { label: "sitemap.lbl_my_orders", href: "/buyer-center/orders", desc: "sitemap.desc_my_orders" },
      { label: "sitemap.lbl_favorites", href: "/buyer-center/favorites", desc: "sitemap.desc_favorites" },
      { label: "sitemap.lbl_audit_reports", href: "/buyer-center/audited-reports", desc: "sitemap.desc_audit_reports" },
      { label: "sitemap.lbl_browsing_history", href: "/buyer-center/browsing-history", desc: "sitemap.desc_browsing_history" },
      { label: "sitemap.lbl_contact_chat", href: "/buyer-center/contact", desc: "sitemap.desc_contact_chat" },
      { label: "sitemap.lbl_meet_suppliers", href: "/buyer-center/meet-suppliers", desc: "sitemap.desc_meet_suppliers" },
      { label: "sitemap.lbl_new_buyer_guide", href: "/buyer-center/new-user-guide", desc: "sitemap.desc_new_buyer_guide" },
      { label: "sitemap.lbl_post_rfq", href: "/buyer-center/post-rfq", desc: "sitemap.desc_post_rfq" },
      { label: "sitemap.lbl_product_directory", href: "/buyer-center/product-directory", desc: "sitemap.desc_product_directory" },
      { label: "sitemap.lbl_secured_trading", href: "/buyer-center/secured-trading", desc: "sitemap.desc_secured_trading" },
      { label: "sitemap.lbl_supplier_discover", href: "/buyer-center/supplier-discover", desc: "sitemap.desc_supplier_discover" },
    ],
  },
  {
    icon: "🏭",
    color: "#9C6A1F",
    title: "Selling (Seller / Supplier)",
    subtitle: "Register and manage your supplier storefront",
    links: [
      { label: "sitemap.lbl_register_factory_a", href: "/register/factory", desc: "sitemap.desc_register_factory_a" },
      { label: "sitemap.lbl_register_dealer_a", href: "/register/dealer", desc: "sitemap.desc_register_dealer_a" },
    ],
  },
  {
    icon: "💼",
    color: "#7C2D12",
    title: "Seller Center — After Audit",
    subtitle: "10 operational tools for verified suppliers",
    links: [
      { label: "sitemap.lbl_overview_seller", href: "/seller-center", desc: "sitemap.desc_overview_seller" },
      { label: "sitemap.lbl_ai_assistant", href: "/seller-center/ai-assistant", desc: "sitemap.desc_ai_assistant" },
      { label: "sitemap.lbl_domestic_cn", href: "/seller-center/domestic-cn", desc: "sitemap.desc_domestic_cn" },
      { label: "sitemap.lbl_export_na", href: "/seller-center/export-na", desc: "sitemap.desc_export_na" },
      { label: "sitemap.lbl_gold_member", href: "/seller-center/gold-member", desc: "sitemap.desc_gold_member" },
      { label: "sitemap.lbl_logistics", href: "/seller-center/logistics", desc: "sitemap.desc_logistics" },
      { label: "sitemap.lbl_smart_expo", href: "/seller-center/smart-expo", desc: "sitemap.desc_smart_expo" },
      { label: "sitemap.lbl_trade_ehome", href: "/seller-center/trade-ehome", desc: "sitemap.desc_trade_ehome" },
      { label: "sitemap.lbl_trade_services", href: "/seller-center/trade-services", desc: "sitemap.desc_trade_services" },
      { label: "sitemap.lbl_trading_service", href: "/seller-center/trading-service", desc: "sitemap.desc_trading_service" },
    ],
  },
  {
    icon: "📚",
    color: "#7C3AED",
    title: "Information & Documents",
    subtitle: "Guides, policies, and research materials",
    links: [
      { label: "sitemap.lbl_about_csr", href: "/info/about-us", desc: "sitemap.desc_about_csr" },
      { label: "sitemap.lbl_network", href: "/info/network", desc: "sitemap.desc_network" },
      { label: "sitemap.lbl_audit_process", href: "/info/audit-process", desc: "sitemap.desc_audit_process" },
      { label: "sitemap.lbl_trade_assurance", href: "/info/trade-assurance", desc: "sitemap.desc_trade_assurance" },
      { label: "sitemap.lbl_disputes", href: "/info/disputes", desc: "sitemap.desc_disputes" },
      { label: "sitemap.lbl_sample_orders", href: "/info/sample-orders", desc: "sitemap.desc_sample_orders" },
      { label: "sitemap.lbl_import_guide", href: "/info/import-guide", desc: "sitemap.desc_import_guide" },
      { label: "sitemap.lbl_shipping_policy", href: "/info/shipping-policy", desc: "sitemap.desc_shipping_policy" },
      { label: "sitemap.lbl_ddp_calculator", href: "/info/ddp-calculator", desc: "sitemap.desc_ddp_calculator" },
      { label: "sitemap.lbl_order_tracking", href: "/info/order-tracking", desc: "sitemap.desc_order_tracking" },
      { label: "sitemap.lbl_payment_protection", href: "/info/payment-protection", desc: "sitemap.desc_payment_protection" },
      { label: "sitemap.lbl_find_products", href: "/info/find-products", desc: "sitemap.desc_find_products" },
      { label: "sitemap.lbl_api_integration", href: "/info/api-integration", desc: "sitemap.desc_api_integration" },
      { label: "sitemap.lbl_market_reports", href: "/info/market-reports", desc: "sitemap.desc_market_reports" },
      { label: "sitemap.lbl_industry_news", href: "/info/industry-news", desc: "sitemap.desc_industry_news" },
      { label: "sitemap.lbl_careers", href: "/info/careers", desc: "sitemap.desc_careers" },
      { label: "sitemap.lbl_contact", href: "/info/contact", desc: "sitemap.desc_contact" },
    ],
  },
  {
    icon: "⚖",
    color: "#475569",
    title: "Legal & Policies",
    subtitle: "Terms of use and data privacy",
    links: [
      { label: "sitemap.lbl_terms", href: "/info/terms-of-service", desc: "sitemap.desc_terms" },
      { label: "sitemap.lbl_privacy", href: "/info/privacy-policy", desc: "sitemap.desc_privacy" },
    ],
  },
  {
    icon: "🔐",
    color: "#A21CAF",
    title: "Account & Registration",
    subtitle: "Authentication and onboarding",
    links: [
      { label: "sitemap.lbl_login", href: "/login", desc: "sitemap.desc_login" },
      { label: "sitemap.lbl_register_buyer", href: "/register/buyer", desc: "sitemap.desc_register_buyer" },
      { label: "sitemap.lbl_register_dealer_as", href: "/register/dealer", desc: "sitemap.desc_register_dealer_as" },
      { label: "sitemap.lbl_register_factory_as", href: "/register/factory", desc: "sitemap.desc_register_factory_as" },
      { label: "sitemap.lbl_app", href: "/app", desc: "sitemap.desc_app" },
    ],
  },
];

export default async function SitemapPage() {
  const t = await getT();
  const td = await getTd();
  const SECTIONS = tdDeep(SECTIONS_RAW, td);
  const ARTICLES = tdDeep(ARTICLES_SRC, td);
  const totalLinks = SECTIONS.reduce((acc, s) => acc + s.links.length, 0) + ARTICLES.length;
  const sectionsCount = SECTIONS.length + 1; // +1 for blog

  return (
    <>
      <Breadcrumb
        trail={[
          { label: t("sitemap.breadcrumb_home"), href: "/" },
          { label: t("sitemap.breadcrumb_self") },
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
            {t("sitemap.badge")}
          </span>
          <h1 className="text-[36px] font-extrabold leading-[1.1] mb-3 max-md:text-[24px]">
            {t("sitemap.h1")}
          </h1>
          <p className="text-[14.5px] opacity-90 max-w-[760px] leading-relaxed mb-6 max-md:text-[13px]">
            {totalLinks}+ {td("pages organized into")} {sectionsCount} {td("functional groups. Use this sitemap to quickly explore all of the platform's features and documentation. XML sitemap for search engines:")} <a href="/sitemap.xml" className="underline text-gold hover:opacity-80">/sitemap.xml</a>
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">📄</div>
              <div className="text-[22px] font-extrabold">{totalLinks}+</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">{t("sitemap.stat_total_pages")}</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">🗂</div>
              <div className="text-[22px] font-extrabold">{sectionsCount}</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">{t("sitemap.stat_functional_groups")}</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">📰</div>
              <div className="text-[22px] font-extrabold">{ARTICLES.length}</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">{t("sitemap.stat_blog_articles")}</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">🌐</div>
              <div className="text-[22px] font-extrabold">EN</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">{t("sitemap.stat_url_slugs")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* === Section anchors quick nav ====================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <div className="bg-paper border border-line rounded p-4">
          <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">{t("sitemap.jump_to_group")}</div>
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
              {t("sitemap.latest_blog")}
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
                  <p className="text-[12px] text-mute mt-0.5">{t(s.subtitle)}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[22px] font-extrabold leading-none" style={{ color: s.color }}>
                  {s.links.length}
                </div>
                <div className="text-[10.5px] uppercase tracking-wider text-mute">{t("sitemap.pages_label")}</div>
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
                      <span className="text-[13.5px] font-semibold text-ink group-hover:text-brand">{t(l.label)}</span>
                      <span className="text-[10.5px] text-mute2 font-mono">{l.href}</span>
                    </div>
                    {l.desc && (
                      <span className="block text-[11.5px] text-mute leading-snug mt-0.5">{t(l.desc)}</span>
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
                <h2 className="text-[18px] font-extrabold text-ink leading-tight">{t("sitemap.blog_title")}</h2>
                <p className="text-[12px] text-mute mt-0.5">{ARTICLES.length} {td("articles on market analysis, case studies, and guides")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/info/industry-news"
                className="text-[12px] text-brand font-semibold hover:underline whitespace-nowrap"
              >
                {t("sitemap.view_all")}
              </Link>
              <div className="text-right">
                <div className="text-[22px] font-extrabold leading-none text-[#E8943A]">{ARTICLES.length}</div>
                <div className="text-[10.5px] uppercase tracking-wider text-mute">{t("sitemap.articles_label")}</div>
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
            <b className="text-ink">{t("sitemap.footer_xml_label")}</b>: <a href="/sitemap.xml" className="text-brand font-semibold hover:underline">huayuesc.vn/sitemap.xml</a>
            {" · "}
            {t("sitemap.footer_note")}
          </p>
          <div className="mt-3 flex justify-center gap-3 flex-wrap">
            <Link href="/help" className="text-[12px] px-4 py-2 border border-line rounded-sm font-semibold text-ink hover:border-brand hover:text-brand">
              {t("sitemap.footer_help")}
            </Link>
            <Link href="/info/contact" className="text-[12px] px-4 py-2 bg-brand text-white rounded-sm font-bold hover:bg-brand-light">
              {t("sitemap.footer_contact")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata() {
  const td = await getTd();
  return {
    title: td("Sitemap") + " · Huayuesc",
    description: td("A map of the entire Huayuesc site — 80+ pages organized into 9 functional groups. XML sitemap for search engines at /sitemap.xml."),
  };
}
