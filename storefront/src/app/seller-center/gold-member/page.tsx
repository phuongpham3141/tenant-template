import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";
import { getT } from "@/lib/t";

const TIERS = [
  {
    name: "seller_center_gold_member.tier_free_name",
    price: "$0",
    per: "seller_center_gold_member.tier_per_year",
    color: "border-line",
    badge: "seller_center_gold_member.tier_free_badge",
    cta: "seller_center_gold_member.tier_free_cta",
    ctaColor: "bg-mute2/30 text-mute",
    desc: "seller_center_gold_member.tier_free_desc",
  },
  {
    name: "seller_center_gold_member.tier_gold_name",
    price: "$2,980",
    per: "seller_center_gold_member.tier_per_year",
    color: "border-gold ring-2 ring-gold",
    badge: "seller_center_gold_member.tier_gold_badge",
    cta: "seller_center_gold_member.tier_gold_cta",
    ctaColor: "bg-gold text-brand-dark",
    desc: "seller_center_gold_member.tier_gold_desc",
    highlight: true,
  },
  {
    name: "seller_center_gold_member.tier_diamond_name",
    price: "$6,800",
    per: "seller_center_gold_member.tier_per_year",
    color: "border-brand",
    badge: "seller_center_gold_member.tier_diamond_badge",
    cta: "seller_center_gold_member.tier_diamond_cta",
    ctaColor: "bg-brand text-white",
    desc: "seller_center_gold_member.tier_diamond_desc",
  },
];

const FEATURES = [
  { name: "seller_center_gold_member.feature_max_products", free: "30 SKU", gold: "5,000 SKU", diamond: "Không giới hạn" },
  { name: "seller_center_gold_member.feature_rfq_per_month", free: "10", gold: "Không giới hạn", diamond: "Không giới hạn + ưu tiên" },
  { name: "seller_center_gold_member.feature_search_position", free: "Bình thường", gold: "Top 30%", diamond: "Top 5%" },
  { name: "seller_center_gold_member.feature_industry_banner", free: "—", gold: "✓ (luân phiên)", diamond: "✓ (cố định 1 slot)" },
  { name: "seller_center_gold_member.feature_factory_audit", free: "Tự trả $1,200", gold: "1 lần / năm miễn phí", diamond: "2 lần / năm miễn phí" },
  { name: "seller_center_gold_member.feature_verified_badge", free: "—", gold: "✓", diamond: "✓ + vương miện Kim cương" },
  { name: "seller_center_gold_member.feature_analytics_dashboard", free: "Cơ bản", gold: "Đầy đủ", diamond: "Đầy đủ + competitor data" },
  { name: "seller_center_gold_member.feature_ai_assistant", free: "Demo 7 ngày", gold: "✓ Free", diamond: "✓ Free + custom training" },
  { name: "seller_center_gold_member.feature_account_manager", free: "—", gold: "Chia sẻ", diamond: "Chuyên trách" },
  { name: "seller_center_gold_member.feature_smart_expo", free: "1 expo / năm", gold: "Tất cả expo", diamond: "Tất cả + booth premium" },
];

const TESTIMONIALS = [
  {
    company: "Shenzhen Lighting Co.",
    role: "CEO Lý Cường",
    quote: "seller_center_gold_member.testimonial_1_quote",
    metric: "+312% đơn",
    avatar: 41,
  },
  {
    company: "Foshan Tile Master",
    role: "Sales Director Trương Mỹ",
    quote: "seller_center_gold_member.testimonial_2_quote",
    metric: "47 RFQ/tháng",
    avatar: 42,
  },
  {
    company: "Guangzhou KUKA Home",
    role: "Export Manager Vương Hoa",
    quote: "seller_center_gold_member.testimonial_3_quote",
    metric: "12K buyer/expo",
    avatar: 43,
  },
];

const ROI_ROWS = [
  { label: "seller_center_gold_member.roi_row_current_orders", v: "$4,200" },
  { label: "seller_center_gold_member.roi_row_projected_growth", v: "+$13,440" },
  { label: "seller_center_gold_member.roi_row_gold_fee", v: "−$248" },
  { label: "seller_center_gold_member.roi_row_net_profit", v: "+$2,729" },
];

export default async function GoldMemberPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("seller_center_gold_member.breadcrumb_home"), href: "/" }, { label: t("seller_center_gold_member.breadcrumb_seller_center"), href: "/seller-center" }, { label: t("seller_center_gold_member.breadcrumb_gold_member") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/gold-member" />
        <div>
          <div className="bg-gradient-to-br from-gold/40 to-gold/10 border border-gold rounded p-5 mb-4">
            <div className="inline-block bg-brand-dark text-gold px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🥇 GOLD MEMBERSHIP</div>
            <h1 className="text-[24px] font-bold text-ink">{t("seller_center_gold_member.hero_title")}</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed max-w-[680px]">
              {t("seller_center_gold_member.hero_desc")}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-5 max-md:grid-cols-1">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`bg-paper border-2 ${tier.color} rounded p-5 relative`}>
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-brand-dark text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-sm tracking-wider">
                    {t(tier.badge)}
                  </div>
                )}
                <h3 className="text-[18px] font-bold text-ink">{t(tier.name)}</h3>
                <p className="text-[11.5px] text-mute mt-1 mb-3">{t(tier.desc)}</p>
                <div className="mb-4">
                  <span className="text-[28px] font-extrabold text-ink">{tier.price}</span>
                  <span className="text-[12px] text-mute">{t(tier.per)}</span>
                </div>
                <button className={`block w-full ${tier.ctaColor} rounded-sm py-2.5 text-[12.5px] font-semibold`}>
                  {t(tier.cta)}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4 overflow-x-auto">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_gold_member.compare_title")}</b>
            <table className="w-full text-[12.5px] min-w-[640px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">{t("seller_center_gold_member.compare_col_feature")}</th>
                  <th className="text-center px-3 py-2.5 font-medium">{t("seller_center_gold_member.compare_col_free")}</th>
                  <th className="text-center px-3 py-2.5 font-medium bg-gold/15 text-brand-dark">{t("seller_center_gold_member.compare_col_gold")}</th>
                  <th className="text-center px-3 py-2.5 font-medium">{t("seller_center_gold_member.compare_col_diamond")}</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((f) => (
                  <tr key={f.name} className="border-t border-line">
                    <td className="px-3 py-2.5 text-ink">{t(f.name)}</td>
                    <td className="px-3 py-2.5 text-center text-mute">{f.free}</td>
                    <td className="px-3 py-2.5 text-center text-ink font-semibold bg-gold/5">{f.gold}</td>
                    <td className="px-3 py-2.5 text-center text-brand font-semibold">{f.diamond}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_gold_member.testimonials_title")}</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {TESTIMONIALS.map((item) => (
                <div key={item.company} className="border border-line rounded p-4 bg-[#FAFBFC]">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={`/img/seller-gold-${item.avatar}.jpg?v=6`} alt="" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <b className="block text-[12.5px] text-ink leading-tight">{item.company}</b>
                      <span className="text-[11px] text-mute">{item.role}</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-ink leading-relaxed mb-3">"{t(item.quote)}"</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">{t("seller_center_gold_member.testimonials_result_label")}</span>
                    <b className="text-[14px] text-success">{item.metric}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[15px] text-ink mb-3">{t("seller_center_gold_member.roi_title")}</b>
              <p className="text-[11.5px] text-mute mb-3">{t("seller_center_gold_member.roi_desc")}</p>
              <table className="w-full text-[12.5px]">
                <tbody>
                  {ROI_ROWS.map((r, i) => (
                    <tr key={r.label} className={`border-b border-line last:border-0 ${i === ROI_ROWS.length - 1 ? "bg-success/10 font-bold" : ""}`}>
                      <td className="py-2 text-ink">{t(r.label)}</td>
                      <td className="py-2 text-right text-accent font-semibold">{r.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[11px] text-mute mt-3">{t("seller_center_gold_member.roi_note")}</p>
            </div>

            <div className="bg-brand-dark text-white rounded p-5 flex flex-col justify-center">
              <b className="block text-[18px] mb-2">{t("seller_center_gold_member.cta_box_title")}</b>
              <p className="text-[12.5px] opacity-90 leading-relaxed mb-4">
                {t("seller_center_gold_member.cta_box_desc")}
              </p>
              <button className="bg-gold text-brand-dark rounded-sm py-3 font-bold text-[14px] hover:opacity-95">
                {t("seller_center_gold_member.cta_box_button")}
              </button>
              <span className="text-[11px] opacity-70 mt-2 text-center">{t("seller_center_gold_member.cta_box_guarantee")}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Đăng ký Hội viên Vàng — Seller Center" };
