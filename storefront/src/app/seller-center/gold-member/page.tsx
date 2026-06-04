import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const TIERS = [
  {
    name: "免费",
    price: "$0",
    per: "/年",
    color: "border-line",
    badge: "免费",
    cta: "使用中",
    ctaColor: "bg-mute2/30 text-mute",
    desc: "适合新供应商、试水市场",
  },
  {
    name: "金牌",
    price: "$2,980",
    per: "/年",
    color: "border-gold ring-2 ring-gold",
    badge: "最受欢迎",
    cta: "升级金牌",
    ctaColor: "bg-gold text-brand-dark",
    desc: "适合认真出口越南的供应商",
    highlight: true,
  },
  {
    name: "钻石",
    price: "$6,800",
    per: "/年",
    color: "border-brand",
    badge: "Premium",
    cta: "联系咨询",
    ctaColor: "bg-brand text-white",
    desc: "适合大品牌、追求最大曝光",
  },
];

const FEATURES = [
  { name: "可发布产品上限", free: "30 SKU", gold: "5,000 SKU", diamond: "不限" },
  { name: "每月可接收询价", free: "10", gold: "不限", diamond: "不限 + 优先" },
  { name: "搜索结果排名位置", free: "普通", gold: "前 30%", diamond: "前 5%" },
  { name: "行业首页 Banner", free: "—", gold: "✓（轮播）", diamond: "✓（固定 1 个位）" },
  { name: "工厂验厂 + TÜV 报告", free: "自费 $1,200", gold: "每年 1 次免费", diamond: "每年 2 次免费" },
  { name: "金牌徽章 + 认证卖家", free: "—", gold: "✓", diamond: "✓ + 钻石皇冠" },
  { name: "详细数据分析看板", free: "基础", gold: "完整", diamond: "完整 + 竞品数据" },
  { name: "Maike AI 助手", free: "7 天试用", gold: "✓ 免费", diamond: "✓ 免费 + 定制训练" },
  { name: "专属客户经理", free: "—", gold: "共享", diamond: "专属" },
  { name: "参与 Smart Expo", free: "每年 1 场", gold: "全部展会", diamond: "全部 + 高级展位" },
];

const TESTIMONIALS = [
  {
    company: "Shenzhen Lighting Co.",
    role: "CEO 李强",
    quote: "升级金牌 3 个月后，来自越南采购商的订单增长 4×——主要得益于 LED 灯具行业 Banner 和优先询价。首月即收回金牌费用。",
    metric: "+312% 订单",
    avatar: 41,
  },
  {
    company: "Foshan Tile Master",
    role: "销售总监 张美",
    quote: "胡志明市采购商在华越搜索 porcelain 瓷砖——金牌将我们推上结果前三。入站询价从每月 8 条增至 47 条。免费 TÜV 验厂助我们签下大型酒店连锁。",
    metric: "47 条询价/月",
    avatar: 42,
  },
  {
    company: "Guangzhou KUKA Home",
    role: "出口经理 王华",
    quote: "钻石会员 + Smart Expo 让我们一周内触达 12K 东南亚采购商——相当于 6 个月线下展会的效果。$6,800 的费用相比广交会 $40K+ 的开支微不足道。",
    metric: "12K 采购商/场",
    avatar: 43,
  },
];

const ROI_ROWS = [
  { label: "当前月均订单额", v: "$4,200" },
  { label: "升级金牌后预计增长（3.2×）", v: "+$13,440" },
  { label: "年度金牌费用（按 12 个月分摊）", v: "−$248" },
  { label: "每月新增净利润（毛利率 22%）", v: "+$2,729" },
];

export default function GoldMemberPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "供应商中心", href: "/seller-center" }, { label: "申请金牌会员" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/gold-member" />
        <div>
          <div className="bg-gradient-to-br from-gold/40 to-gold/10 border border-gold rounded p-5 mb-4">
            <div className="inline-block bg-brand-dark text-gold px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🥇 GOLD MEMBERSHIP</div>
            <h1 className="text-[24px] font-bold text-ink">成为金牌供应商——突破越南出口</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed max-w-[680px]">
              华越 91% 的 B2B 订单来自金牌/钻石供应商。当采购商搜索「porcelain 瓷砖 起订量 500㎡」或「橱柜 OEM」时，算法会优先展示带徽章的供应商——金牌 = 信任 + 流量 + 透明的验厂报告。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-5 max-md:grid-cols-1">
            {TIERS.map((t) => (
              <div key={t.name} className={`bg-paper border-2 ${t.color} rounded p-5 relative`}>
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-brand-dark text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-sm tracking-wider">
                    {t.badge}
                  </div>
                )}
                <h3 className="text-[18px] font-bold text-ink">{t.name}</h3>
                <p className="text-[11.5px] text-mute mt-1 mb-3">{t.desc}</p>
                <div className="mb-4">
                  <span className="text-[28px] font-extrabold text-ink">{t.price}</span>
                  <span className="text-[12px] text-mute">{t.per}</span>
                </div>
                <button className={`block w-full ${t.ctaColor} rounded-sm py-2.5 text-[12.5px] font-semibold`}>
                  {t.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4 overflow-x-auto">
            <b className="block text-[15px] text-ink mb-4">📋 功能详细对比</b>
            <table className="w-full text-[12.5px] min-w-[640px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">功能</th>
                  <th className="text-center px-3 py-2.5 font-medium">免费</th>
                  <th className="text-center px-3 py-2.5 font-medium bg-gold/15 text-brand-dark">金牌</th>
                  <th className="text-center px-3 py-2.5 font-medium">钻石</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((f) => (
                  <tr key={f.name} className="border-t border-line">
                    <td className="px-3 py-2.5 text-ink">{f.name}</td>
                    <td className="px-3 py-2.5 text-center text-mute">{f.free}</td>
                    <td className="px-3 py-2.5 text-center text-ink font-semibold bg-gold/5">{f.gold}</td>
                    <td className="px-3 py-2.5 text-center text-brand font-semibold">{f.diamond}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">💬 借助金牌成功的供应商</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {TESTIMONIALS.map((t) => (
                <div key={t.company} className="border border-line rounded p-4 bg-[#FAFBFC]">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={`/img/seller-gold-${t.avatar}.jpg?v=5`} alt="" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <b className="block text-[12.5px] text-ink leading-tight">{t.company}</b>
                      <span className="text-[11px] text-mute">{t.role}</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-ink leading-relaxed mb-3">"{t.quote}"</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">成效</span>
                    <b className="text-[14px] text-success">{t.metric}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[15px] text-ink mb-3">📊 金牌 ROI 测算</b>
              <p className="text-[11.5px] text-mute mb-3">基于近 12 个月内 142 家升级金牌的家具供应商平均数据。</p>
              <table className="w-full text-[12.5px]">
                <tbody>
                  {ROI_ROWS.map((r, i) => (
                    <tr key={r.label} className={`border-b border-line last:border-0 ${i === ROI_ROWS.length - 1 ? "bg-success/10 font-bold" : ""}`}>
                      <td className="py-2 text-ink">{r.label}</td>
                      <td className="py-2 text-right text-accent font-semibold">{r.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[11px] text-mute mt-3">* 数据仅供参考。实际取决于品类、仓库位置和生产能力。</p>
            </div>

            <div className="bg-brand-dark text-white rounded p-5 flex flex-col justify-center">
              <b className="block text-[18px] mb-2">🚀 准备好升级了吗？</b>
              <p className="text-[12.5px] opacity-90 leading-relaxed mb-4">
                今日开通金牌——24 小时内激活，附赠价值 $1,200 的 TÜV 验厂套餐；5 月前 50 名报名者另享 30 天免费行业 Banner。
              </p>
              <button className="bg-gold text-brand-dark rounded-sm py-3 font-bold text-[14px] hover:opacity-95">
                立即升级金牌 — $2,980/年
              </button>
              <span className="text-[11px] opacity-70 mt-2 text-center">30 天内不满意 → 100% 退费。</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "申请金牌会员 — 供应商中心" };
