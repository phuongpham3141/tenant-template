import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const BENEFITS = [
  { icon: "💰", title: "支付保障", desc: "采购商在签署 PI 时即向担保账户支付 30% 定金——您可安心生产，无惧中途取消。" },
  { icon: "🛡", title: "运输风险保险", desc: "华越为每笔 STS 订单投保一切险——集装箱损坏/起火/丢失时按 FOB 价的 110% 赔付。" },
  { icon: "⚖", title: "双语法律支持", desc: "Baker McKenzie + YKVN 团队协助处理合同纠纷。每笔订单免费提供 60 分钟与采购商会谈翻译。" },
  { icon: "📈", title: "扩大采购商资源", desc: "STS 订单显示「Verified Trade」徽章 → 搜索排名优先。越南采购商对 STS 订单的青睐度是普通订单的 4 倍。" },
];

const STEPS = [
  { n: 1, title: "采购商发询价 → 您报价", desc: "采购商在您的主页看到「已开通 STS」徽章。报价时附 30-40-30 条款。" },
  { n: 2, title: "签 PI + 担保账户已入款", desc: "采购商签署电子 PI 并将 30% 定金转入 Vietcombank 担保账户。您收到通知，开始生产。" },
  { n: 3, title: "生产 + 更新里程碑", desc: "每周将产线照片上传至 e-Home。到出厂期限 → 采购商再释放 40%。" },
  { n: 4, title: "QC 验货 + 封箱", desc: "QIMA/SGS 按 AQL 2.5 抽检 10% 批次——合格 → 集装箱封箱。QC 费用由采购商承担。" },
  { n: 5, title: "运输——您收到 70%", desc: "集装箱发往港口 → B/L 一经签发，担保账户即自动向您放款 70%（30% 定金 + 40% 出厂款）。" },
  { n: 6, title: "采购商收货 → 支付最后 30%", desc: "采购商在 14 天内于 App 确认 → 担保账户放清剩余 30%。订单关闭，您获得评分 + STS 信用。" },
];

const FEES = [
  { item: "STS 担保费", v: "0.5%", per: "按订单金额", note: "可与采购商 50/50 分摊（常见做法）" },
  { item: "AI 报价翻译费", v: "免费", per: "—", note: "金牌供应商已内置" },
  { item: "中越合同翻译", v: "免费", per: "前 60 分钟", note: "之后 $50/小时" },
  { item: "工厂 QC 验货", v: "采购商承担", per: "—", note: "您无需承担费用，仅接待 QC 团队" },
];

const CASES = [
  {
    title: "Foshan Tile——$84K 订单无惧应收账款",
    desc: "供应商为越南酒店连锁生产 4,200㎡ porcelain。采购商延迟支付最后 30% → 担保账户 14 天后自动转账。供应商无需催收即收齐货款。",
    metric: "100% 按期付款",
  },
  {
    title: "Shenzhen LED——凭 STS 徽章订单暴增 6×",
    desc: "开通 STS 3 个月后，供应商主页被推荐给 320 位新采购商。询价 → 订单转化率从 8% 升至 23%。",
    metric: "+520% 营收",
  },
  {
    title: "KUKA Home——集装箱受损获赔 $12K",
    desc: "装载 30 件沙发的集装箱在新加坡港发生碰撞。华越保险 11 天内赔付 $12,400——KUKA 及时补发替换批次，维护了对采购商的信誉。",
    metric: "11 天内赔付 $12K",
  },
];

export default function TradingServicePage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "供应商中心", href: "/seller-center" }, { label: "交易服务" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trading-service" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-success/15 text-success px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🔒 交易保障——面向供应商</div>
            <h1 className="text-[22px] font-bold text-ink">交易服务（供应商视角）</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              STS 不仅保护采购商——它同样保护<b>您</b>。在您裁料/浇坯/采购原材料之前，采购商已将真金白银的定金存入担保账户。集装箱损坏？保险赔付。采购商延迟付款？担保账户按时间表自动放款。发生纠纷？有双语法律支持。
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{b.icon}</div>
                <b className="block text-[13.5px] text-ink mb-1">{b.title}</b>
                <p className="text-[11.5px] text-mute leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🔄 6 步流程（供应商视角）</b>
            <div className="space-y-3">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 bg-success text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px bg-line mt-1 min-h-[20px]" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                    <p className="text-[12px] text-mute leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">💵 费用——供应商仅 0.5%</b>
            <p className="text-[12px] text-mute mb-4">相较于常见的应收账款成本与风险，担保费极低。多数供应商与采购商 50/50 分摊——实际仅付 0.25%。</p>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">费用项</th>
                  <th className="text-left px-3 py-2.5 font-medium">价格</th>
                  <th className="text-left px-3 py-2.5 font-medium">计费方式</th>
                  <th className="text-left px-3 py-2.5 font-medium">备注</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f) => (
                  <tr key={f.item} className="border-t border-line">
                    <td className="px-3 py-3 text-ink font-semibold">{f.item}</td>
                    <td className="px-3 py-3 text-accent font-bold">{f.v}</td>
                    <td className="px-3 py-3 text-mute">{f.per}</td>
                    <td className="px-3 py-3 text-mute text-[11.5px]">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">📋 真实案例——已受益的供应商</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.title} className="border border-line rounded p-4 bg-[#FAFBFC]">
                  <b className="block text-[13px] text-ink leading-tight mb-2">{c.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">成效</span>
                    <b className="text-[13px] text-success">{c.metric}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/seller-center/trade-ehome" className="block bg-success text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🔒 为您的所有订单开启 STS</b>
            <p className="text-[12.5px] opacity-90">进入 e-Home → 设置 → 自动启用 STS。采购商将在您的每个商品列表上看到「交易已认证」徽章。</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "交易服务 — 供应商中心" };
