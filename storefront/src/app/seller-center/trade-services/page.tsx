import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CATEGORIES = [
  {
    icon: "🏭",
    name: "工厂验厂",
    providers: ["TÜV Rheinland", "SGS Vietnam", "Bureau Veritas"],
    from: "$420",
    desc: "依据 ISO 9001 / SA8000 的独立验厂报告——80% 越南采购商的要求。",
  },
  {
    icon: "🔬",
    name: "货物质量检验",
    providers: ["Intertek", "QIMA", "AsiaInspection"],
    from: "$220",
    desc: "集装箱封箱前在工厂按 AQL 2.5 抽检，含 48 小时内图文 + 视频报告。",
  },
  {
    icon: "🚛",
    name: "DDP 运输至越南",
    providers: ["VietExpress", "Cainiao Logistics", "DHL Trade"],
    from: "$1,800/柜",
    desc: "20'/40' 集装箱整柜服务，从供应商仓库到河内/胡志明市采购商仓库，已清关。",
  },
  {
    icon: "⚖",
    name: "双语法律合同",
    providers: ["Baker McKenzie VN", "YKVN", "VILAF"],
    from: "$680",
    desc: "起草 / 审核中越 OEM、NDA、经销合同。保障违约金条款 + 担保。",
  },
  {
    icon: "🌐",
    name: "专业翻译",
    providers: ["TransVN", "WordSworth Asia", "Yufan Translation"],
    from: "$0.05/字",
    desc: "翻译合同、CO/CQ、数据表、宣传册。在线提供与采购商会谈翻译。",
  },
  {
    icon: "📣",
    name: "OEM / B2B 营销",
    providers: ["Nanjing Adsmile", "Asia Trade Media", "Hua Marketing"],
    from: "$1,200/月",
    desc: "越南获客：Facebook/Zalo 广告、5K 采购商邮件触达、越南语 SEO 落地页。",
  },
  {
    icon: "📷",
    name: "产品摄影",
    providers: ["Studio M.O.", "Shenzhen ProShot", "Liang Visual"],
    from: "$15/SKU",
    desc: "白底图、场景图、360° 拍摄。后期修图——符合华越产品页上传标准。",
  },
  {
    icon: "💳",
    name: "贸易融资",
    providers: ["HSBC China", "ICBC Trade", "Standard Chartered"],
    from: "年息 5.4%",
    desc: "L/C 融资、保理、贴现。在采购商 60-90 天账期下释放现金流。",
  },
  {
    icon: "🛡",
    name: "货物保险",
    providers: ["PingAn", "PVI", "Bao Viet"],
    from: "FOB 价 1.1%",
    desc: "集装箱一切险，覆盖从供应商仓库到采购商仓库。按货值 110% 赔付。",
  },
  {
    icon: "📦",
    name: "海关申报",
    providers: ["Logistic VN", "Sino-VN Customs", "FastClear"],
    from: "$180/票",
    desc: "申报 HS 编码、东盟-中国 form E 原产地证。为采购商优化进口关税（降低 5-15%）。",
  },
  {
    icon: "🔢",
    name: "GS1 / EAN 条码",
    providers: ["GS1 China", "GS1 Vietnam"],
    from: "$95/SKU",
    desc: "为越南零售注册国际条码。入驻 Co.opmart、Bach Hoa Xanh 等必备。",
  },
  {
    icon: "✅",
    name: "CE / RoHS / FDA 认证",
    providers: ["TÜV SÜD", "SGS", "ICR Polska"],
    from: "$1,500",
    desc: "实验室测试 + 为电气产品出具 CE/RoHS，为食品接触类产品出具 FDA。",
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
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "供应商中心", href: "/seller-center" }, { label: "外贸服务市场" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trade-services" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/15 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🛒 FOREIGN TRADE SERVICE MARKETPLACE</div>
            <h1 className="text-[22px] font-bold text-ink">外贸服务市场</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              供应商出口越南所需的 12 类服务——从工厂验厂、产品摄影、DDP 运输，到 CE/RoHS 认证。所有服务商均经华越审核，并通过担保账户支付。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded p-4 hover:border-brand transition-colors">
                <div className="flex items-start gap-3 mb-2">
                  <div className="text-[28px]">{c.icon}</div>
                  <div className="flex-1">
                    <b className="block text-[13.5px] text-ink leading-tight">{c.name}</b>
                    <span className="text-[10.5px] text-mute"><b className="text-accent">{c.from}</b> 起</span>
                  </div>
                </div>
                <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                <div className="border-t border-line pt-2 mb-3">
                  <span className="text-[10.5px] text-mute">头部服务商：</span>
                  <ul className="mt-1 space-y-0.5">
                    {c.providers.map((p) => (
                      <li key={p} className="text-[11.5px] text-ink flex items-center gap-1">
                        <span className="text-success text-[10px]">●</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full bg-brand/10 text-brand text-[12px] font-semibold rounded-sm py-1.5 hover:bg-brand hover:text-white">
                  查看服务 →
                </button>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">⭐ 2026 年 5 月头部服务商</b>
              <Link href="#" className="text-brand text-[12px]">查看全部 →</Link>
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
              <b className="block text-[16px] mb-1">💼 成为华越服务商</b>
              <p className="text-[12px] opacity-85">您提供外贸服务？立即注册，触达 4,200+ 正出口越南的供应商。</p>
            </div>
            <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px] whitespace-nowrap">
              注册服务商 →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "外贸服务市场 — 供应商中心" };
