import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";
import { getT } from "@/lib/t";

const MODES = [
  {
    icon: "📦",
    title: "seller_center_logistics.mode_lcl_title",
    leadtime: "10-14 ngày",
    cost: "$45-70/CBM",
    bestFor: "seller_center_logistics.mode_lcl_bestfor",
    pros: ["seller_center_logistics.mode_lcl_pro1", "seller_center_logistics.mode_lcl_pro2", "seller_center_logistics.mode_lcl_pro3"],
  },
  {
    icon: "🚢",
    title: "seller_center_logistics.mode_fcl_title",
    leadtime: "8-12 ngày",
    cost: "$1,800-3,200/cont 40'",
    bestFor: "seller_center_logistics.mode_fcl_bestfor",
    pros: ["seller_center_logistics.mode_fcl_pro1", "seller_center_logistics.mode_fcl_pro2", "seller_center_logistics.mode_fcl_pro3"],
  },
  {
    icon: "✈",
    title: "seller_center_logistics.mode_air_title",
    leadtime: "2-4 ngày",
    cost: "$5.8-9.2/kg",
    bestFor: "seller_center_logistics.mode_air_bestfor",
    pros: ["seller_center_logistics.mode_air_pro1", "seller_center_logistics.mode_air_pro2", "seller_center_logistics.mode_air_pro3"],
  },
];

const FORWARDERS = [
  { name: "Maersk", coverage: "seller_center_logistics.fwd_maersk_coverage", img: 51 },
  { name: "COSCO Shipping", coverage: "seller_center_logistics.fwd_cosco_coverage", img: 52 },
  { name: "DHL Express", coverage: "seller_center_logistics.fwd_dhl_coverage", img: 53 },
  { name: "FedEx", coverage: "seller_center_logistics.fwd_fedex_coverage", img: 54 },
  { name: "VietExpress", coverage: "seller_center_logistics.fwd_vietexpress_coverage", img: 55 },
  { name: "Cainiao Logistics", coverage: "seller_center_logistics.fwd_cainiao_coverage", img: 56 },
  { name: "Yang Ming", coverage: "seller_center_logistics.fwd_yangming_coverage", img: 57 },
  { name: "Evergreen", coverage: "seller_center_logistics.fwd_evergreen_coverage", img: 58 },
];

const ROUTES = [
  { from: "seller_center_logistics.route1_from", to: "seller_center_logistics.route1_to", mode: "FCL 40'", time: "8 ngày", price: "$1,950" },
  { from: "seller_center_logistics.route2_from", to: "seller_center_logistics.route2_to", mode: "FCL 40'", time: "11 ngày", price: "$2,420" },
  { from: "seller_center_logistics.route3_from", to: "seller_center_logistics.route3_to", mode: "FCL 20'", time: "9 ngày", price: "$1,180" },
  { from: "seller_center_logistics.route4_from", to: "seller_center_logistics.route4_to", mode: "Air Express", time: "3 ngày", price: "$6.4/kg" },
  { from: "seller_center_logistics.route5_from", to: "seller_center_logistics.route5_to", mode: "LCL", time: "12 ngày", price: "$58/CBM" },
  { from: "seller_center_logistics.route6_from", to: "seller_center_logistics.route6_to", mode: "seller_center_logistics.route6_mode", time: "1 ngày", price: "$680/xe" },
];

export default async function LogisticsPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("seller_center_logistics.bc_home"), href: "/" }, { label: t("seller_center_logistics.bc_seller"), href: "/seller-center" }, { label: t("seller_center_logistics.bc_logistics") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/logistics" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/15 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🚢 INTERNATIONAL LOGISTICS</div>
            <h1 className="text-[22px] font-bold text-ink">{t("seller_center_logistics.hero_h1")}</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              {t("seller_center_logistics.hero_desc")}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {MODES.map((m) => (
              <div key={m.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[32px] mb-2">{m.icon}</div>
                <b className="block text-[14px] text-ink mb-2">{t(m.title)}</b>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-[#FAFBFC] rounded p-2">
                    <span className="text-[10px] text-mute block">{t("seller_center_logistics.label_leadtime")}</span>
                    <b className="text-[12px] text-brand">{m.leadtime}</b>
                  </div>
                  <div className="bg-[#FAFBFC] rounded p-2">
                    <span className="text-[10px] text-mute block">{t("seller_center_logistics.label_cost")}</span>
                    <b className="text-[12px] text-accent">{m.cost}</b>
                  </div>
                </div>
                <p className="text-[11px] text-mute mb-2"><b className="text-ink">{t("seller_center_logistics.label_bestfor")}</b> {t(m.bestFor)}</p>
                <ul className="space-y-1 border-t border-line pt-2">
                  {m.pros.map((p) => (
                    <li key={p} className="text-[11.5px] text-ink flex gap-1.5"><span className="text-success">✓</span> {t(p)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_logistics.calc_title")}</b>
            <div className="grid grid-cols-5 gap-3 max-md:grid-cols-1">
              <select className="border border-line rounded-sm px-3 py-2 text-[12.5px]">
                <option>{t("seller_center_logistics.calc_opt_from")}</option>
                <option>{t("seller_center_logistics.calc_opt_from_ninhba")}</option>
                <option>{t("seller_center_logistics.calc_opt_from_thamquyen")}</option>
              </select>
              <select className="border border-line rounded-sm px-3 py-2 text-[12.5px]">
                <option>{t("seller_center_logistics.calc_opt_to")}</option>
                <option>{t("seller_center_logistics.calc_opt_to_hcm")}</option>
                <option>{t("seller_center_logistics.calc_opt_to_danang")}</option>
              </select>
              <input type="text" placeholder="Volume (CBM)" className="border border-line rounded-sm px-3 py-2 text-[12.5px]" />
              <input type="text" placeholder="Weight (kg)" className="border border-line rounded-sm px-3 py-2 text-[12.5px]" />
              <button className="bg-brand text-white rounded-sm px-3 py-2 text-[12.5px] font-semibold">{t("seller_center_logistics.calc_btn")}</button>
            </div>
            <p className="text-[11px] text-mute mt-3">{t("seller_center_logistics.calc_note")}</p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_logistics.fwd_title")}</b>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {FORWARDERS.map((f) => (
                <div key={f.name} className="border border-line rounded p-3 flex items-center gap-3 hover:border-brand">
                  <img src={`/img/seller-fwd-${f.img}.jpg?v=6`} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <b className="block text-[12.5px] text-ink truncate">{f.name}</b>
                    <span className="text-[10.5px] text-mute">{t(f.coverage)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_logistics.routes_title")}</b>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">{t("seller_center_logistics.th_from")}</th>
                  <th className="text-left px-3 py-2.5 font-medium">{t("seller_center_logistics.th_to")}</th>
                  <th className="text-left px-3 py-2.5 font-medium">{t("seller_center_logistics.th_mode")}</th>
                  <th className="text-left px-3 py-2.5 font-medium">{t("seller_center_logistics.th_time")}</th>
                  <th className="text-left px-3 py-2.5 font-medium">{t("seller_center_logistics.th_price")}</th>
                </tr>
              </thead>
              <tbody>
                {ROUTES.map((r, i) => (
                  <tr key={i} className="border-t border-line hover:bg-[#FAFBFC]">
                    <td className="px-3 py-2.5 text-ink font-semibold">{t(r.from)}</td>
                    <td className="px-3 py-2.5 text-ink">{t(r.to)}</td>
                    <td className="px-3 py-2.5 text-mute">{t(r.mode)}</td>
                    <td className="px-3 py-2.5 text-brand">{r.time}</td>
                    <td className="px-3 py-2.5 text-accent font-semibold">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">{t("seller_center_logistics.tracking_title")}</b>
            <div className="border border-line rounded p-4 bg-[#FAFBFC]">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <b className="text-[13px] text-ink">Container TEMU-928412 · MAEU-7821</b>
                  <span className="text-[11px] text-mute block">{t("seller_center_logistics.tracking_route")}</span>
                </div>
                <span className="bg-success text-white text-[10.5px] font-bold px-2 py-0.5 rounded-sm">{t("seller_center_logistics.tracking_status")}</span>
              </div>
              <div className="grid grid-cols-5 gap-1 mt-3">
                {["seller_center_logistics.stage1", "seller_center_logistics.stage2", "seller_center_logistics.stage3", "seller_center_logistics.stage4", "seller_center_logistics.stage5"].map((stage, i) => (
                  <div key={stage} className="text-center">
                    <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${i <= 2 ? "bg-success text-white" : "bg-mute2/30 text-mute"}`}>{i + 1}</div>
                    <span className={`text-[10.5px] mt-1 block ${i <= 2 ? "text-ink font-semibold" : "text-mute"}`}>{t(stage)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="#" className="block bg-brand text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">{t("seller_center_logistics.cta_title")}</b>
            <p className="text-[12.5px] opacity-90">{t("seller_center_logistics.cta_desc")}</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Logistics quốc tế — Seller Center" };
