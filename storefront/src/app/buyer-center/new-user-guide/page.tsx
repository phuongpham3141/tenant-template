import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const STEPS = [
  {
    n: 1,
    title: "创建采购商账户",
    desc: "使用企业邮箱注册，验证 OTP，填写企业信息（税号、地址、所属行业）。约需 3 分钟。",
    cta: "创建账户 →",
    href: "/account/register",
  },
  {
    n: 2,
    title: "采购商认证与完善资料",
    desc: "上传营业执照即可解锁交易保障、优先询价及工厂直供价。24 个工作小时内审核。",
    cta: "完善资料 →",
    href: "/account/verify",
  },
  {
    n: 3,
    title: "发出首条询价",
    desc: "一次描述——系统自动发送至 5–10 家匹配工厂。24 小时内收到含样品、交期及 DDP 到越南的报价。",
    cta: "发送询价 →",
    href: "/buying-request",
  },
  {
    n: 4,
    title: "跟进并敲定报价",
    desc: "比对报价、直接与供应商沟通、下单样品、签订合同。全流程受交易保障服务保护。",
    cta: "进入控制台 →",
    href: "/buyer-center",
  },
];

const FAQS = [
  {
    q: "华越与 Alibaba.com 或 Made-in-China.com 有何不同？",
    a: "华越是面向越南市场运营的中越 B2B 门户：7×24 中文支持、DDP 到越南仓库报价、合同支持、以及覆盖吉莱港—海防—凭祥的处理团队。您无需身处中国或精通英语即可完成交易。",
  },
  {
    q: "发送询价需要支付定金吗？",
    a: "无需。发送询价与接收报价完全免费、无任何承诺。只有在您选定供应商、签订合同并通过交易保障服务确认定金后才付款（担保账户托管款项，直至交货通过 QC 验收）。",
  },
  {
    q: "华越的起订量是多少？",
    a: "起订量视工厂和产品而定——通常为 50–500 个产品，建筑材料则为 100–500 ㎡。部分已认证供应商可为新采购商提供更低起订量，或在您未满整柜时拼柜（LCL）发货。",
  },
  {
    q: "DDP 到越南的交期与运费是多久、多少？",
    a: "平均生产周期 15–30 天。海运佛山—吉莱 7–10 天，陆运凭祥—河内 3–5 天。DDP 费用已包含进口关税 + 增值税 + 仓储费用，视货物种类约为 FOB 价的 8–15%。",
  },
  {
    q: "如果货物品质不达标，我能退款吗？",
    a: "可以。所有通过交易保障服务的订单均设三重保护：(1) 华越担保账户托管款项；(2) 出厂前 QC 验货（可选，$300/次）；(3) 运输保险。若货物与描述不符或存在技术缺陷，您可获 100% 退款或换发新批次。",
  },
];

const DOWNLOADS = [
  {
    icon: "📕",
    title: "2026 中国进口手册",
    desc: "84 页 · HS 编码 · 按品类划分进口关税 · 越南海关资料清单",
    size: "PDF · 4.2 MB",
  },
  {
    icon: "📘",
    title: "DDP 流程——从工厂到越南仓库",
    desc: "12 步流程图 · 示例时间表 · 凭祥与吉莱关键查验要点",
    size: "PDF · 2.8 MB",
  },
  {
    icon: "📗",
    title: "中越双语合同模板",
    desc: "5 份合同模板：购销、OEM、代工、独家经销、NDA——均经法务审核",
    size: "PDF · 1.5 MB",
  },
];

export default function NewUserGuidePage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "采购商中心", href: "/buyer-center" }, { label: "新用户指南" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/new-user-guide" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📖 BUYER ONBOARDING</div>
            <h1 className="text-[22px] font-bold text-ink">新用户指南</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              首次从中国批量采购？华越已将整个流程——从创建账户到在越南仓库收货——标准化为 4 个清晰步骤。读完本页，您将能在 10 分钟内自信地发出首条询价。
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🚀 4 步流程</b>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4 hover:border-brand transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[14px] flex-shrink-0">{s.n}</div>
                    <b className="text-[14px] text-ink">{s.title}</b>
                  </div>
                  <p className="text-[12.5px] text-mute leading-relaxed mb-3">{s.desc}</p>
                  <Link href={s.href} className="text-brand text-[12.5px] font-semibold hover:underline">{s.cta}</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">❓ 新采购商常见问题</b>
            <div className="space-y-2">
              {FAQS.map((f, i) => (
                <details key={i} className="border border-line rounded group" open={i === 0}>
                  <summary className="px-4 py-3 cursor-pointer text-[13px] font-semibold text-ink list-none flex justify-between items-center hover:bg-[#FAFBFC]">
                    <span>{f.q}</span>
                    <span className="text-mute text-[16px] group-open:rotate-180 transition-transform">⌃</span>
                  </summary>
                  <div className="px-4 pb-3 text-[12.5px] text-mute leading-relaxed border-t border-line pt-3">{f.a}</div>
                </details>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 max-md:grid-cols-1">
            {DOWNLOADS.map((d) => (
              <div key={d.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{d.icon}</div>
                <b className="block text-[13px] text-ink leading-tight mb-1">{d.title}</b>
                <p className="text-[11.5px] text-mute leading-snug mb-2">{d.desc}</p>
                <div className="flex justify-between items-center pt-2 border-t border-line">
                  <span className="text-[10.5px] text-mute">{d.size}</span>
                  <button className="text-brand text-[11.5px] font-semibold hover:underline">下载 ↓</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-dark text-white rounded p-5 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
            <div>
              <b className="block text-[16px] mb-1">需要专人协助？</b>
              <p className="text-[12.5px] opacity-90">Buyer Success 团队驻河内与胡志明市，提供中文支持。热线每日 8:00–22:00。</p>
            </div>
            <Link href="/buyer-center/contact" className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[13px] hover:opacity-90 whitespace-nowrap">📞 联系我们</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "新用户指南 — 采购商中心" };
