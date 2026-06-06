import { Img } from "@/components/ui/img";
import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";
import { getT } from "@/lib/t";

const CHANNELS = [
  {
    name: "Tmall",
    operator: "Alibaba Group",
    audience: "Trung lưu + cao cấp đô thị",
    pros: ["1.2 tỷ user Taobao/Tmall", "Brand-friendly, phù hợp thương hiệu lớn", "Big sales 11.11, 6.18 doanh số 10× ngày thường"],
    cons: ["Phí setup ~ ¥60K + bảo lãnh ¥50K", "Cần TM trademark TQ", "Cạnh tranh khốc liệt"],
    fee: "¥60K setup · 0.5-5% commission",
    img: 81,
  },
  {
    name: "JD.com",
    operator: "JD Group",
    audience: "Tech-savvy, electronics, FMCG",
    pros: ["Logistics riêng — giao 1-2 ngày 90% TQ", "Chất lượng tốt, ít hàng giả", "Dữ liệu khách hàng minh bạch hơn Tmall"],
    cons: ["Phí setup ¥30-100K tuỳ ngành", "JD ưu tiên brand đã có chứng nhận", "Cần kho ở TQ"],
    fee: "¥30-100K setup · 2-8% commission",
    img: 82,
  },
  {
    name: "1688.com",
    operator: "Alibaba B2B",
    audience: "B2B nội địa, phân phối, OEM",
    pros: ["Chuyên B2B — phù hợp NCC sản xuất", "Phí thấp ~ ¥1,688/năm", "Dễ lên đơn lớn từ wholesalers"],
    cons: ["Margin thấp (B2B = giá sỉ)", "Cần catalog & mẫu phong phú", "Phải đầu tư showroom 1688"],
    fee: "¥1,688/năm · 0% commission",
    img: 83,
  },
];

const COMPARE = [
  { feature: "Phí setup ban đầu", tmall: "¥60K", jd: "¥30-100K", c1688: "¥1,688/năm" },
  { feature: "Commission", tmall: "0.5-5%", jd: "2-8%", c1688: "0%" },
  { feature: "Audience", tmall: "B2C đô thị", jd: "B2C tech", c1688: "B2B sỉ + OEM" },
  { feature: "Traffic miễn phí", tmall: "Trung bình", jd: "Cao", c1688: "Cao (B2B)" },
  { feature: "Phí marketing tối thiểu", tmall: "¥30K/tháng", jd: "¥15K/tháng", c1688: "¥5K/tháng" },
  { feature: "ROI điển hình năm đầu", tmall: "1.4-2.2×", jd: "1.6-2.5×", c1688: "1.8-3.0×" },
];

const SERVICES = [
  { icon: "🏪", title: "seller_center_domestic_cn.svc_shop_title", desc: "seller_center_domestic_cn.svc_shop_desc" },
  { icon: "✨", title: "seller_center_domestic_cn.svc_listing_title", desc: "seller_center_domestic_cn.svc_listing_desc" },
  { icon: "📢", title: "seller_center_domestic_cn.svc_ads_title", desc: "seller_center_domestic_cn.svc_ads_desc" },
  { icon: "💬", title: "seller_center_domestic_cn.svc_cs_title", desc: "seller_center_domestic_cn.svc_cs_desc" },
  { icon: "📈", title: "seller_center_domestic_cn.svc_report_title", desc: "seller_center_domestic_cn.svc_report_desc" },
];

const CASES = [
  {
    company: "OPPEIN Home (kitchen cabinet)",
    desc: "seller_center_domestic_cn.case_oppein_desc",
    metric: "Nội địa = 32% revenue",
    img: 91,
  },
  {
    company: "KUKA Home (sofa)",
    desc: "seller_center_domestic_cn.case_kuka_desc",
    metric: "−18% overhead",
    img: 92,
  },
];

export default async function DomesticCnPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("seller_center_domestic_cn.bc_home"), href: "/" }, { label: t("seller_center_domestic_cn.bc_seller"), href: "/seller-center" }, { label: t("seller_center_domestic_cn.bc_domestic") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/domestic-cn" />
        <div>
          <div className="bg-gradient-to-br from-red-700 to-yellow-500 text-white rounded p-6 mb-4" style={{ background: "linear-gradient(135deg,#b91c1c,#eab308)" }}>
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">{t("seller_center_domestic_cn.hero_badge")}</div>
            <h1 className="text-[26px] font-bold leading-tight">{t("seller_center_domestic_cn.hero_title")}</h1>
            <p className="text-[14px] opacity-95 mt-2 leading-relaxed max-w-[680px]">
              {t("seller_center_domestic_cn.hero_desc")}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded overflow-hidden hover:border-brand">
                <Img loading="lazy" decoding="async" src={`/img/seller-cn-${c.img}.jpg?v=6`} alt="" className="w-full h-[120px] object-cover" />
                <div className="p-4">
                  <b className="block text-[14px] text-ink">{c.name}</b>
                  <span className="text-[11px] text-mute mb-2 block">{t("seller_center_domestic_cn.label_operator")} {c.operator}</span>
                  <p className="text-[11.5px] text-ink mb-2"><b>{t("seller_center_domestic_cn.label_audience")}</b> {c.audience}</p>
                  <div className="border-t border-line pt-2">
                    <span className="text-[10.5px] text-mute font-semibold uppercase tracking-wider">{t("seller_center_domestic_cn.label_pros")}</span>
                    <ul className="mt-1 mb-2 space-y-0.5">
                      {c.pros.map((p) => <li key={p} className="text-[11.5px] text-ink flex gap-1"><span className="text-success">✓</span> {p}</li>)}
                    </ul>
                    <span className="text-[10.5px] text-mute font-semibold uppercase tracking-wider">{t("seller_center_domestic_cn.label_cons")}</span>
                    <ul className="mt-1 mb-2 space-y-0.5">
                      {c.cons.map((p) => <li key={p} className="text-[11.5px] text-mute flex gap-1"><span className="text-accent">!</span> {p}</li>)}
                    </ul>
                  </div>
                  <div className="bg-[#FAFBFC] rounded-sm px-2 py-1.5 text-[11px] text-accent font-semibold">{c.fee}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4 overflow-x-auto">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_domestic_cn.compare_title")}</b>
            <table className="w-full text-[12.5px] min-w-[560px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">{t("seller_center_domestic_cn.compare_th_factor")}</th>
                  <th className="text-left px-3 py-2.5 font-medium">Tmall</th>
                  <th className="text-left px-3 py-2.5 font-medium">JD.com</th>
                  <th className="text-left px-3 py-2.5 font-medium">1688</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((c) => (
                  <tr key={c.feature} className="border-t border-line">
                    <td className="px-3 py-2.5 text-ink font-semibold">{c.feature}</td>
                    <td className="px-3 py-2.5 text-mute">{c.tmall}</td>
                    <td className="px-3 py-2.5 text-mute">{c.jd}</td>
                    <td className="px-3 py-2.5 text-mute">{c.c1688}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_domestic_cn.services_title")}</b>
            <div className="grid grid-cols-5 gap-3 max-md:grid-cols-2">
              {SERVICES.map((s) => (
                <div key={s.title} className="border border-line rounded p-3 hover:border-brand">
                  <div className="text-[24px] mb-2">{s.icon}</div>
                  <b className="block text-[12.5px] text-ink mb-1">{t(s.title)}</b>
                  <p className="text-[11px] text-mute leading-relaxed">{t(s.desc)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_domestic_cn.cases_title")}</b>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.company} className="border border-line rounded overflow-hidden hover:border-brand grid grid-cols-[140px_1fr] max-md:grid-cols-1">
                  <Img loading="lazy" decoding="async" src={`/img/seller-cn-case-${c.img}.jpg?v=6`} alt="" className="w-full h-full object-cover max-md:h-[140px]" />
                  <div className="p-4">
                    <b className="block text-[13px] text-ink mb-2">{c.company}</b>
                    <p className="text-[11.5px] text-mute leading-relaxed mb-3">{t(c.desc)}</p>
                    <div className="border-t border-line pt-2 flex justify-between items-baseline">
                      <span className="text-[10.5px] text-mute">{t("seller_center_domestic_cn.cases_result")}</span>
                      <b className="text-[13px] text-success">{c.metric}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="#" className="block bg-brand text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">{t("seller_center_domestic_cn.cta_title")}</b>
            <p className="text-[12.5px] opacity-90">{t("seller_center_domestic_cn.cta_desc")}</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Bán hàng nội địa Trung Quốc — Seller Center" };
