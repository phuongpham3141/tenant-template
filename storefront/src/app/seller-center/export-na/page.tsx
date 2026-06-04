import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CHANNELS = [
  { icon: "📦", name: "Amazon FBA", desc: "北美第一大电商平台。B2C 销售，FBA 负责仓储-配送-客服。适合消费品、电子、家居。", users: "200M+ Prime", commission: "8-15%", img: 61 },
  { icon: "🛒", name: "Walmart Marketplace", desc: "同比增长 38%。费率低于 Amazon，优先扶持美国本土产品 + 少数族裔供应商。", users: "120M+/月", commission: "6-15%", img: 62 },
  { icon: "🛍", name: "Shopify Plus", desc: "搭建自有品牌网站。利润率最高，但需自行引流。适合已有品牌认知度的品牌。", users: "自行引流", commission: "$2K/月", img: 63 },
  { icon: "🌐", name: "独立站", desc: "投入 DTC 独立站 + Google Shopping + Meta 广告。100% 掌控数据与客户关系。", users: "自行搭建", commission: "广告支出 10-20%", img: 64 },
];

const SERVICES = [
  { icon: "📋", title: "注册 EIN + 品牌备案", desc: "注册特拉华 LLC、EIN 税号，食品/化妆品 FDA、电子产品 FCC。USPTO 商标注册。" },
  { icon: "🏬", title: "搭建 FBA 仓 + 3PL", desc: "整柜入仓从中国 → 美国 4 大 FBA 中心。配备 3PL 自有仓作为备份，规避旺季高仓储费。" },
  { icon: "📣", title: "Amazon PPC + DSP 广告", desc: "美国团队投放 Sponsored Products、Sponsored Brand 视频、DSP 再营销。目标 ACOS < 18%。" },
  { icon: "💬", title: "英文客服", desc: "美国团队 + AI 7×24 回复评价、消息、A-to-Z 索赔。维持 4.5+ 评分是在 Amazon 生存的关键。" },
  { icon: "🔄", title: "退货管理（returns）", desc: "美国退货回 3PL 仓，翻新或清仓处理。家居类 Amazon 平均退货率 12-18%。" },
  { icon: "🧾", title: "税务合规（销售税）", desc: "在美国 12 个州注册税务关联（nexus），通过 TaxJar 定期申报。EIN 与 1099-K 申报。" },
];

const CASES = [
  {
    company: "Foshan Tile Master",
    product: "Vinyl flooring",
    desc: "2024 年 11 月以 4 个 SKU 开通 Amazon FBA。14 个月后实现 $2.4M 营收，地板品类前 50。扣除 Amazon 费用后毛利率 28%。",
    metric: "$2.4M / 14 个月",
    img: 71,
  },
  {
    company: "Shenzhen LED Co.",
    product: "Smart LED bulbs",
    desc: "Walmart Marketplace + Shopify 混合模式。Walmart 走量，Shopify 高毛利。从 $40K/月（2024 年底）增至 $480K/月（2026）。",
    metric: "12× 增长",
    img: 72,
  },
  {
    company: "Guangzhou Garment",
    product: "Activewear",
    desc: "Shopify DTC + Meta 广告。每月投入 $80K 营销，ROAS 2.8×。打造自有品牌，5 年退出路线图。",
    metric: "ROAS 稳定 2.8×",
    img: 73,
  },
];

const TIERS = [
  { name: "Starter", price: "$999", per: "/月", channels: "1 个渠道", skus: "最多 50 SKU", ad: "PPC 最高 $5K/月", support: "工作时间邮件支持" },
  { name: "Pro", price: "$2,499", per: "/月", channels: "3 个渠道", skus: "最多 500 SKU", ad: "PPC 最高 $25K/月", support: "专属客户经理，每周通话", highlight: true },
  { name: "Enterprise", price: "$4,999", per: "/月", channels: "全部渠道", skus: "不限", ad: "PPC 最高 $100K/月", support: "专属团队，7×24" },
];

export default function ExportNaPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "供应商中心", href: "/seller-center" }, { label: "出口北美" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/export-na" />
        <div>
          <div className="bg-gradient-to-br from-blue-700 to-red-600 text-white rounded p-6 mb-4" style={{ background: "linear-gradient(135deg,#1e40af,#dc2626)" }}>
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🌎 NORTH AMERICA OMNI-CHANNEL</div>
            <h1 className="text-[26px] font-bold leading-tight">北美全渠道出口——美国 · 加拿大 · 墨西哥</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              4.8 亿消费者。30 万亿美元 GDP。华越助力中国供应商「登陆」北美——从 EIN、FBA、PPC、英文客服，到销售税合规。一个伙伴，4 个销售渠道。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded p-4 hover:border-brand grid grid-cols-[80px_1fr] gap-3">
                <img src={`/img/seller-na-${c.img}.jpg?v=5`} alt="" className="w-20 h-20 rounded object-cover" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[20px]">{c.icon}</span>
                    <b className="text-[14px] text-ink">{c.name}</b>
                  </div>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-2">{c.desc}</p>
                  <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                    <div><span className="text-mute">受众：</span> <b className="text-brand">{c.users}</b></div>
                    <div><span className="text-mute">费用：</span> <b className="text-accent">{c.commission}</b></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🎁 一站式支持——6 项服务</b>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {SERVICES.map((s) => (
                <div key={s.title} className="border border-line rounded p-4 hover:border-brand">
                  <div className="text-[24px] mb-2">{s.icon}</div>
                  <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🏆 真实案例——已成功打入北美的供应商</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.company} className="border border-line rounded overflow-hidden hover:border-brand">
                  <img src={`/img/seller-na-case-${c.img}.jpg?v=5`} alt="" className="w-full h-[140px] object-cover" />
                  <div className="p-4">
                    <b className="block text-[13px] text-ink mb-1">{c.company}</b>
                    <span className="text-[11px] text-brand block mb-2">{c.product}</span>
                    <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                    <div className="border-t border-line pt-2 flex justify-between items-baseline">
                      <span className="text-[10.5px] text-mute">成效</span>
                      <b className="text-[13px] text-success">{c.metric}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">💲 价格——3 个灵活套餐</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {TIERS.map((t) => (
                <div key={t.name} className={`border-2 rounded p-4 ${t.highlight ? "border-accent ring-2 ring-accent/30 relative" : "border-line"}`}>
                  {t.highlight && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">热门</div>}
                  <b className="block text-[16px] text-ink">{t.name}</b>
                  <div className="my-3"><span className="text-[24px] font-extrabold text-accent">{t.price}</span><span className="text-[11px] text-mute">{t.per}</span></div>
                  <ul className="space-y-1.5 text-[11.5px]">
                    <li className="text-ink"><b>渠道：</b> {t.channels}</li>
                    <li className="text-ink"><b>SKU：</b> {t.skus}</li>
                    <li className="text-ink"><b>广告预算：</b> {t.ad}</li>
                    <li className="text-ink"><b>支持：</b> {t.support}</li>
                  </ul>
                  <button className={`w-full mt-4 ${t.highlight ? "bg-accent" : "bg-brand"} text-white rounded-sm py-2 text-[12.5px] font-semibold`}>
                    开通 {t.name} →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Link href="#" className="block bg-brand-dark text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🌎 预约免费咨询（60 分钟）</b>
            <p className="text-[12.5px] opacity-90">美国 + 广州团队分析您的产品——为您选择合适的渠道与预算。</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "出口北美 — 供应商中心" };
