import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const KPIS = [
  { v: "187", l: "2026 年 5 月订单", c: "text-brand", trend: "+12%" },
  { v: "23", l: "未回复询价", c: "text-accent", trend: "待处理" },
  { v: "412", l: "在售 SKU", c: "text-success", trend: "本周 +5" },
  { v: "4.8 ★", l: "平均评分", c: "text-gold", trend: "金牌前 8%" },
];

const ACTIVITY = [
  { time: "8 分钟前", text: "来自采购商 陈文 A 的新询价 #RFQ-9145 — 200 件 L 形丝绒沙发" },
  { time: "32 分钟前", text: "订单 AVN-9018 已支付 30% 定金 — 开始生产" },
  { time: "1 小时 20 分钟前", text: "河东家具就 4 月卧室套装批次给予 5★ 好评" },
  { time: "3 小时前", text: "TÜV 定期工厂验厂将于 5 月 18 日进行 — 请准备 QC 资料" },
  { time: "昨天", text: "胡志明市采购商来信咨询橡木贴面电视柜的起订量" },
];

const QUICK = [
  { label: "回复询价", icon: "📨", href: "/seller-center/trade-ehome", color: "bg-accent" },
  { label: "更新 FOB 价格", icon: "💲", href: "/seller-center/trade-ehome", color: "bg-brand" },
  { label: "发布新产品", icon: "➕", href: "/seller-center/trade-ehome", color: "bg-success" },
  { label: "查看销售报告", icon: "📊", href: "/seller-center/trade-ehome", color: "bg-gold text-brand-dark" },
];

const CHART = [
  { m: "12月", v: 42 },
  { m: "1月", v: 58 },
  { m: "2月", v: 65 },
  { m: "3月", v: 78 },
  { m: "4月", v: 124 },
  { m: "5月", v: 187 },
];

export default function SellerCenterPage() {
  const max = Math.max(...CHART.map((c) => c.v));
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "供应商中心" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4 flex justify-between items-start max-md:flex-col max-md:gap-3">
            <div>
              <h1 className="text-[20px] font-bold text-ink">您好，KUKA Home 有限公司 🏭</h1>
              <p className="text-[12.5px] text-mute mt-1">
                供应商活动概览 · 等级 <span className="bg-gold/30 text-brand-dark px-1.5 py-0.5 rounded-sm font-bold">Gold Tier 3</span> · 连续 6 年
              </p>
            </div>
            <Link href="/seller-center/gold-member" className="text-[12px] bg-brand text-white px-3 py-2 rounded-sm font-semibold whitespace-nowrap">⭐ 升级钻石会员</Link>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {KPIS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4">
                <b className={`block text-[24px] font-extrabold ${s.c}`}>{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{s.l}</span>
                <span className="text-[10.5px] text-success block mt-1.5 font-semibold">{s.trend}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-4">
              <div className="flex justify-between items-center mb-3">
                <b className="text-[14px] text-ink">近 6 个月业绩（订单数）</b>
                <span className="text-[10.5px] text-mute">12:30 更新</span>
              </div>
              <svg viewBox="0 0 320 140" className="w-full h-[140px]">
                {CHART.map((c, i) => {
                  const h = (c.v / max) * 110;
                  const x = 20 + i * 50;
                  return (
                    <g key={c.m}>
                      <rect x={x} y={120 - h} width="34" height={h} fill={i === CHART.length - 1 ? "#E8302C" : "#1F4F8E"} rx="2" />
                      <text x={x + 17} y={135} fontSize="10" textAnchor="middle" fill="#6B7280">{c.m}</text>
                      <text x={x + 17} y={115 - h} fontSize="9.5" textAnchor="middle" fill="#0B1220" fontWeight="bold">{c.v}</text>
                    </g>
                  );
                })}
              </svg>
              <p className="text-[11px] text-mute mt-2">较 2025 Q4 同期增长 145%——2026 年春节与婚庆旺季拉动家具订单。</p>
            </div>

            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[14px] text-ink mb-3">最近动态</b>
              <ul className="space-y-2.5">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="text-[12.5px] border-b border-dashed border-line pb-2 last:border-0">
                    <span className="text-mute text-[11px] block">{a.time}</span>
                    <span className="text-ink">{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-4 mb-4">
            <b className="block text-[14px] text-ink mb-3">快捷操作</b>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {QUICK.map((q) => (
                <Link key={q.label} href={q.href} className={`${q.color} text-white rounded-sm p-3 hover:opacity-95 flex items-center gap-3`}>
                  <span className="text-[22px]">{q.icon}</span>
                  <b className="text-[12.5px] leading-tight">{q.label}</b>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link href="/seller-center/smart-expo" className="bg-gold/20 border border-gold rounded p-4 hover:bg-gold/30">
              <b className="block text-[14px] text-ink mb-1">🎪 Smart Expo 六月开放报名</b>
              <p className="text-[12px] text-mute">Furniture Asia 线上展会 6 月 12–16 日——8K+ 东南亚采购商参与。立即报名展位，享免费展位设计支持。</p>
            </Link>
            <Link href="/seller-center/ai-assistant" className="bg-brand/10 border border-brand rounded p-4 hover:bg-brand/15">
              <b className="block text-[14px] text-ink mb-1">🤖 Maike AI：自动回复询价</b>
              <p className="text-[12px] text-mute">开启 Maike，响应时间减少 70%——采购商 5 分钟即可看到报价，而非 6 小时。金牌套餐免费使用。</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "供应商中心 — Huayuesc" };
