import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const LAYERS = [
  {
    icon: "💰",
    title: "支付担保",
    desc: "您的款项托管于华越担保账户，仅在货物通过 QC 验收且您确认足额收货后才向供应商放款。",
    bullets: ["托管于合作银行（Vietcombank / BIDV）", "按里程碑放款：30% 定金 – 40% 出厂 – 30% 收货", "延期交货 > 30 天则 100% 退款"],
  },
  {
    icon: "🔍",
    title: "工厂 QC 验货",
    desc: "独立 QC 团队在集装箱封箱前，按 AQL 2.5 随机抽检 10% 产量。",
    bullets: ["48 小时内提供详细图文 + 视频报告", "按适用的 ISO/EN/ASTM 标准检测", "采购商有权拒收不合格批次"],
  },
  {
    icon: "🚢",
    title: "运输保险",
    desc: "凡经交易保障服务的每个集装箱均投保一切险（All-Risk），赔付额最高可达货值的 110%。",
    bullets: ["与 PVI / Bao Viet 合作承保", "覆盖从供应商仓库到采购商仓库（DDP）", "理赔 14 天内处理"],
  },
];

const TIMELINE = [
  { n: 1, title: "签订合同并通过担保账户支付定金", desc: "采购商将订单金额的 30% 转入担保账户。供应商看到「已付定金」后开始生产。" },
  { n: 2, title: "生产 + 进度跟踪", desc: "供应商每周更新产线照片。您可选择加购阶段性 QC（在线检验 in-line inspection）。" },
  { n: 3, title: "出货前 QC 验货", desc: "供应商报完工后，华越 QC 团队到厂抽检 10% 批次。合格 → 集装箱封箱。" },
  { n: 4, title: "运输 + 保险", desc: "集装箱发往盐田/上海港。自动启动一切险（All-Risk）。在采购商中心实时追踪。" },
  { n: 5, title: "收货并确认", desc: "您在越南仓库验货，点击「确认足额收货」→ 担保账户向供应商放清尾款，订单关闭。" },
];

const FEES = [
  { service: "担保服务", fee: "0.5%", per: "按交易金额", note: "自动适用于所有 STS 订单" },
  { service: "一切险（All-Risk）", fee: "1.2%", per: "按 FOB 货值", note: "视航线与货值可上下浮动" },
  { service: "工厂 QC 验货", fee: "$300", per: "/每家工厂每次", note: "可选——若供应商已有认证，采购商可跳过" },
  { service: "阶段性 QC（in-line）", fee: "$220", per: "/次", note: "建议用于 > $50,000 或 OEM 订单" },
  { service: "中越合同翻译", fee: "免费", per: "前 60 分钟", note: "之后 $50/小时" },
];

const CASES = [
  {
    title: "胡志明市展厅采购 $42K porcelain 瓷砖",
    desc: "QC 发现 8% 批次因中国境内运输而开裂。采购商获 100% 换发不良批次，费用由供应商承担，担保账户托管款项直至收到通过 QC 的新批次。",
    saved: "$3,360",
  },
  {
    title: "岘港四星级酒店订购 80 台智能马桶",
    desc: "集装箱在新加坡中转时部分起火。华越保险 9 天内赔付 $14,400（FOB 价的 110%）——采购商及时重新订货，赶上开业。",
    saved: "$14,400",
  },
  {
    title: "河内家具经销商签订 $120K OEM 合同",
    desc: "供应商较合同延期 45 天生产。采购商触发违约条款——担保账户自动向采购商退还 30% 货款，订单无费用取消。",
    saved: "$36,000",
  },
];

export default function SecuredTradingPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "采购商中心", href: "/buyer-center" }, { label: "交易保障服务" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/secured-trading" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-success/15 text-success px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🔒 交易保障</div>
            <h1 className="text-[22px] font-bold text-ink">交易保障服务</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              跨境批量采购——风险往往大于利润：货不对板、延期交货、供应商卷款、集装箱受损。STS 是一道三重防护，让您安心付款：只有当货物如约送达，款项才会到达供应商手中。
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🛡 采购商三重防护</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {LAYERS.map((l) => (
                <div key={l.title} className="border border-line rounded p-4 hover:border-brand">
                  <div className="text-[32px] mb-2">{l.icon}</div>
                  <b className="block text-[14px] text-ink mb-2">{l.title}</b>
                  <p className="text-[12px] text-mute leading-relaxed mb-3">{l.desc}</p>
                  <ul className="space-y-1 border-t border-line pt-3">
                    {l.bullets.map((b) => (
                      <li key={b} className="text-[11.5px] text-ink flex gap-1.5"><span className="text-success">✓</span> {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🔄 5 步流程</b>
            <div className="space-y-3">
              {TIMELINE.map((t, i) => (
                <div key={t.n} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">{t.n}</div>
                    {i < TIMELINE.length - 1 && <div className="flex-1 w-px bg-line mt-1 min-h-[20px]" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <b className="block text-[13px] text-ink mb-1">{t.title}</b>
                    <p className="text-[12px] text-mute leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">💵 服务费率表</b>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute text-[11.5px]">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">服务</th>
                  <th className="text-left px-3 py-2.5 font-medium">费用</th>
                  <th className="text-left px-3 py-2.5 font-medium">单位</th>
                  <th className="text-left px-3 py-2.5 font-medium">备注</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f) => (
                  <tr key={f.service} className="border-t border-line">
                    <td className="px-3 py-3 text-ink font-semibold">{f.service}</td>
                    <td className="px-3 py-3 text-accent font-bold">{f.fee}</td>
                    <td className="px-3 py-3 text-mute">{f.per}</td>
                    <td className="px-3 py-3 text-mute text-[11.5px]">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">📋 真实案例</b>
              <span className="text-[11px] text-mute">近 6 个月 3 个典型案例</span>
            </div>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.title} className="border border-line rounded p-4 bg-[#FAFBFC]">
                  <b className="block text-[13px] text-ink leading-tight mb-2">{c.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">采购商获保障</span>
                    <b className="text-[16px] text-success">{c.saved}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/buying-request" className="block bg-accent text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🚀 开启您的首笔 STS 订单</b>
            <p className="text-[12.5px] opacity-90">发送询价 → 选择供应商 → 开启 STS——您的资金从第一秒起即安全无忧。</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "交易保障服务 — 采购商中心" };
