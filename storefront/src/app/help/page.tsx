import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

/**
 * /help — Huayuesc Help Center.
 *
 * Layout structured like enterprise B2B help portals (Alibaba, MIC, AWS):
 *   - Hero with global search
 *   - Quick stats (response time, channels, languages)
 *   - 6 topic categories (3×2 grid) with sub-articles
 *   - Featured guide cards (top 4 most-read)
 *   - Comprehensive FAQ (16 Q&A organized by buyer journey stage)
 *   - Status page link + System health indicator
 *   - 4 contact channels: chat, phone, email, video call
 */

const TOPIC_CATEGORIES = [
  {
    icon: "🛒",
    title: "查找产品与下单",
    desc: "询价、起订量、样品订购、OEM/ODM、AI 匹配",
    color: "#005F6B",
    articles: [
      { label: "如何高效发送询价", href: "/info/find-products" },
      { label: "6 步进口指南", href: "/info/import-guide" },
      { label: "起订量前先下样品单", href: "/info/sample-orders" },
      { label: "OEM/ODM 定制", href: "/info/import-guide" },
    ],
  },
  {
    icon: "💳",
    title: "支付与交易保障",
    desc: "T/T 担保、退款、争议解决、支付方式",
    color: "#E85D4E",
    articles: [
      { label: "什么是交易保障（担保）？", href: "/info/payment-protection" },
      { label: "T/T 支付方式", href: "/info/payment-protection" },
      { label: "投诉与退款", href: "/info/disputes" },
      { label: "汇率 + 银行手续费", href: "/info/payment-protection" },
    ],
  },
  {
    icon: "🚚",
    title: "运输与物流",
    desc: "贸易术语、DDP/CIF/FOB、海关、交货时间",
    color: "#F4A261",
    articles: [
      { label: "完整运输政策", href: "/info/shipping-policy" },
      { label: "DDP 运费快速计算", href: "/info/ddp-calculator" },
      { label: "经谅山陆路 5-7 天", href: "/info/shipping-policy" },
      { label: "实时订单追踪", href: "/info/order-tracking" },
    ],
  },
  {
    icon: "🛡",
    title: "验厂与质量",
    desc: "5 步验厂流程、品控检验、认证",
    color: "#2A9D8F",
    articles: [
      { label: "5 步验厂流程", href: "/info/audit-process" },
      { label: "合作行业协会网络", href: "/info/network" },
      { label: "供应商认证：ISO、CE、RoHS", href: "/info/audit-process" },
      { label: "区块链验厂报告", href: "/info/audit-process" },
    ],
  },
  {
    icon: "👤",
    title: "账户与安全",
    desc: "注册、2FA、KYC、设置、子账户",
    color: "#8B5CF6",
    articles: [
      { label: "采购商注册指南", href: "/register/buyer" },
      { label: "开启 2FA 保护账户", href: "/info/privacy-policy" },
      { label: "管理子账户", href: "/buyer-center" },
      { label: "忘记密码", href: "/info/quen-mat-khau" },
    ],
  },
  {
    icon: "⚖",
    title: "法律与合规",
    desc: "条款、隐私、NĐ 13/2023、Incoterms 2020",
    color: "#6B7880",
    articles: [
      { label: "使用条款", href: "/info/terms-of-service" },
      { label: "隐私政策", href: "/info/privacy-policy" },
      { label: "NĐ 13/2023 规定的 11 项权利", href: "/info/privacy-policy" },
      { label: "VIAC 河内仲裁", href: "/info/terms-of-service" },
    ],
  },
];

const FEATURED_GUIDES = [
  {
    icon: "🎯",
    title: "新采购商指南——头 30 天",
    desc: "从注册到首单：稳健起步，避开常见错误。",
    href: "/info/import-guide",
    readTime: "8 分钟",
  },
  {
    icon: "💰",
    title: "节省 22% 成本——案例研究",
    desc: "西贡展厅从中间商转向华越，每年节省 27 亿越南盾。",
    href: "/info/industry-news/case-study-showroom-sai-gon-tiet-kiem-22-percent",
    readTime: "7 分钟",
  },
  {
    icon: "📦",
    title: "下样品单的 5 个错误——新采购商需避免",
    desc: "样品是为 $20,000 订单买的 $200 保险——但做错了照样亏钱。",
    href: "/info/industry-news/5-sai-lam-pho-bien-khi-dat-sample",
    readTime: "5 分钟",
  },
  {
    icon: "📊",
    title: "叻坚港 vs 吉莱港——北部采购商该选哪个？",
    desc: "详细分析运费、交货时间、拥堵情况。每 40HQ 节省 $1,350。",
    href: "/info/industry-news/phan-tich-cang-lach-huyen-vs-cat-lai-2026",
    readTime: "8 分钟",
  },
];

const FAQ_BY_STAGE = [
  {
    stage: "注册前",
    faqs: [
      {
        q: "华越与 Alibaba.com 或 Made-in-China 有何不同？",
        a: "CSR 100% 专注于越南采购商：24/7 越南语支持、越南盾支付、Vietcombank/BIDV 担保账户、DDP 直送越南仓库、≥$5K 订单免费实地验厂、通过 VIAC 河内提供越南语争议支持。Alibaba 和 MIC 是全球平台，适合美国/欧盟/中东买家，但没有专为越南市场服务的基础设施/团队。",
      },
      {
        q: "华越的服务费是多少？",
        a: "对采购商完全免费。无会员费、无交易费、无担保费、无实地验厂费（≥$5K 订单）。华越仅在交易成功时向供应商收取 5% 佣金。采购商只需支付：货款（按 PO）+ DDP 运费（透明）。",
      },
      {
        q: "我必须是企业才能注册吗？",
        a: "并非必须。个人可注册，每单可交易至 $5,000 美元（依据越南反洗钱法）。但企业（持税号）有 2 项优势：进口金额不限 + 可抵扣 10% 进项增值税。常下单的采购商（每年 ≥3 单）建议注册企业。",
      },
    ],
  },
  {
    stage: "查找产品与发送询价",
    faqs: [
      {
        q: "如何高效发送询价？",
        a: "点击首页顶部的“发送询价”或访问 /buying-request。描述越详细越好：产品名称 + 尺寸 + 材质 + 数量 + 目标零售价 + OEM 要求（logo、定制颜色）+ 期限。24 小时内，AI 匹配系统会将询价发送给 5-10 家合适的已认证供应商。提示：附上参考图/样品图，让供应商更好理解。",
      },
      {
        q: "华越的起订量是多少？",
        a: "视工厂而定——常见为 $500-2000 或 50-100 件。部分供应商通过免费验厂计划，对新采购商接受低至 $200 的起订量。CSR 提供“合并起订量”，帮助 2-3 家同行业采购商拼单达到优惠起订量，而各方仅取 1/3。",
      },
      {
        q: "我想按自己的图纸做 OEM/ODM——支持吗？",
        a: "支持。CSR 支持 OEM（印 logo、改颜色、小幅定制尺寸）和 ODM（完全按采购商技术图纸设计）。样品打样费 $80-300，交货时间增加 5-10 天。下达起订量前先订 OEM 样品——核实实际定制能力。全部打样费在下达起订量时 100% 返还。",
      },
    ],
  },
  {
    stage: "支付与交易保障",
    faqs: [
      {
        q: "交易保障（担保）如何运作？",
        a: "采购商的30% T/T定金和70%尾款保管在CSR位于Vietcombank/BIDV（越南盾）或中国银行/HSBC（美元）的担保账户中——不直接打给供应商。供应商仅在以下情况后才收款：(a) 采购商确认货品符合描述，或(b) 交货后14天采购商未回应（自动放款）。若货品不符合承诺，采购商在7天内投诉→CSR调查→退款/换货/赔偿。",
      },
      {
        q: "支持哪些支付方式？",
        a: "T/T（电汇）——最常用，适用于所有订单。L/C（信用证）——适用于 ≥$100K 订单，最安全但费用高。通过 Wise/Payoneer 的国际网银——适用于 <$5K 小单，费用低。不支持：PayPal（费用高）、西联汇款（无担保）、现金（违反反洗钱规定）。",
      },
      {
        q: "我可以用越南盾支付吗？",
        a: "可以。采购商将越南盾支付至 CSR 的 Vietcombank/BIDV 账户，CSR 按 Vietcombank 实时汇率 + 0.5% 浮动缓冲（合同中注明）兑换为美元。银行手续费：约 0.1-0.3% 转账费 + $20-50 固定费。部分小单（<$10K）可 100% 用越南盾境内支付，不经外币——节省银行手续费。",
      },
    ],
  },
  {
    stage: "运输与海关",
    faqs: [
      {
        q: "DDP运至越南需要多久？",
        a: "DDP送达河内采购商仓库的时间：(a) 经谅山陆路5-7天——最快，适合小单和热门趋势品。(b) 海运佛山→叻坚→河内：合计13-17天。(c) 海运东莞/深圳→吉莱→河内：15-19天。(d) DHL/FedEx空运：2-4天，$8-15/kg。采购商可在计算器/info/ddp-calculator中选择最优路线。",
      },
      {
        q: "需要进口许可证吗？",
        a: "大部分建筑材料、家具、卫浴、LED灯、家用电器不需要许可证。以下需许可证：保健食品、化妆品、医疗器械、化学品、药品、书籍、车辆。CSR按HS编码免费咨询——邮箱legal@huayuesc.vn。",
      },
      {
        q: "DDP是否已含进口税+增值税？",
        a: "是的。DDP全包含：海运/陆运费、0.5%海运保险、进口税（按HS编码，享ACFTA/RCEP优惠）、10%增值税、清关费、越南国内运输。采购商只需在仓库签收。特殊情况（海关重新归类HS、征收更高税）：CSR提前通知，采购商有7天回应期。",
      },
    ],
  },
  {
    stage: "收货之后",
    faqs: [
      {
        q: "我发现货品与描述不符——该怎么办？",
        a: "在收货后 7 天内提交交易保障投诉。路径：/buyer-center/orders/{order-id}/dispute。附上证据：照片、开箱视频、验收记录。交易保障团队在 24 小时内响应，并在 3-5 天内决定：全额退款、换货或协商赔偿。2025 年第 1-3 季度历史：87% 案件有利于采购商。",
      },
      {
        q: "首单顺利后我想再下单——流程如何？",
        a: "比首单快50%！返单：在控制台选择“Reorder”→CSR自动以相同规格生成新PO→采购商只需确认数量+交货日期。无需重新验厂（已认证）。无需重新测样（已有）。交货时间仍为5-22天，视路线而定。许多越南采购商每年向2-3家主力供应商下6-12单——流程非常顺畅。",
      },
      {
        q: "可以开具增值税发票吗？",
        a: "可以。CSR通过财政部电子发票系统为所有DDP订单开具10%增值税电子发票（依据123/2020/NĐ-CP号法令）。发票在交货后3天内发送至采购商邮箱。企业采购商可用此发票抵扣10%进项增值税——节省可观税费。",
      },
    ],
  },
];

const SYSTEM_STATUS = [
  { service: "网站+App", status: "Operational", uptime: "99.97%" },
  { service: "交易保障（担保）", status: "Operational", uptime: "100%" },
  { service: "AI寻源匹配", status: "Operational", uptime: "99.94%" },
  { service: "DDP物流", status: "Operational", uptime: "99.91%" },
];

const CONTACT_CHANNELS = [
  { icon: "💬", title: "在线客服", desc: "5分钟内响应", info: "每日8:00-22:00", href: "#chat" },
  { icon: "📞", title: "热线", desc: "+84 24 1234 5678", info: "周一至周六8:00-18:00", href: "tel:+842412345678" },
  { icon: "📧", title: "邮件支持", desc: "6小时内响应", info: "support@huayuesc.vn", href: "mailto:support@huayuesc.vn" },
  { icon: "📹", title: "视频通话", desc: "需提前预约", info: "与客户经理一对一", href: "/info/contact" },
];

export default function HelpPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "帮助中心" }]} />

      {/* === HERO + Search ============================================== */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-12 max-md:py-7 text-center">
          <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">
            🆘 帮助中心 · 华越
          </span>
          <h1 className="text-[34px] font-extrabold leading-tight mb-3 max-md:text-[24px]">
            欢迎来到帮助中心
          </h1>
          <p className="text-[14px] opacity-90 leading-relaxed mb-5 max-md:text-[12.5px] max-w-[680px] mx-auto">
            300+篇指南、80+FAQ、24/7越南语支持。立即查找答案，或直接联系华越河内+广州团队。
          </p>
          <form action="/search" method="get" className="flex max-w-[640px] mx-auto bg-white rounded-md overflow-hidden shadow-lg">
            <input
              name="q"
              placeholder="例如：如何发询价、起订量、DDP运输、交易保障……"
              className="flex-1 px-4 py-3 outline-none text-[14px] text-ink"
            />
            <button type="submit" className="px-6 bg-accent text-white font-bold text-[13.5px] cursor-pointer hover:opacity-90">
              🔍 搜索
            </button>
          </form>

          {/* Quick stats strip */}
          <div className="grid grid-cols-4 gap-4 mt-7 text-center max-md:grid-cols-2 max-md:gap-3">
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">300+</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">指南文章</small>
            </div>
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">&lt;5 分钟</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">客服响应</small>
            </div>
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">24/7</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">越南语支持</small>
            </div>
            <div>
              <b className="block text-[18px] text-gold leading-tight">99.97%</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">上月在线率</small>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-4 mt-7 mb-10 max-md:mt-4">
        {/* === 6 Topic Categories ========================================= */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">📚 按主题浏览</h2>
        <div className="grid grid-cols-3 gap-3 mb-8 max-md:grid-cols-1">
          {TOPIC_CATEGORIES.map((c) => (
            <div key={c.title} className="bg-paper border border-line rounded p-4 hover:border-brand hover:shadow-sm transition">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded flex items-center justify-center text-[22px] flex-shrink-0"
                  style={{ backgroundColor: c.color + "15", color: c.color }}
                >
                  {c.icon}
                </div>
                <div>
                  <b className="block text-[14px] text-ink">{c.title}</b>
                  <p className="text-[11.5px] text-mute leading-snug mt-0.5">{c.desc}</p>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                {c.articles.map((a) => (
                  <li key={a.label}>
                    <Link href={a.href} className="text-[12.5px] text-brand hover:underline cursor-pointer">
                      → {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* === Featured Guides ============================================ */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">⭐ 精选指南</h2>
        <div className="grid grid-cols-2 gap-3 mb-8 max-md:grid-cols-1">
          {FEATURED_GUIDES.map((g) => (
            <Link
              key={g.title}
              href={g.href}
              className="bg-paper border border-line rounded p-4 hover:border-brand hover:shadow-sm transition cursor-pointer flex gap-3 items-start group/guide"
            >
              <div className="w-12 h-12 bg-bg rounded flex items-center justify-center text-[24px] flex-shrink-0">
                {g.icon}
              </div>
              <div className="flex-1 min-w-0">
                <b className="block text-[14px] text-ink leading-snug mb-1 group-hover/guide:text-brand">{g.title}</b>
                <p className="text-[12px] text-mute leading-relaxed mb-1.5">{g.desc}</p>
                <span className="text-[11px] text-mute2">⏱ {g.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* === FAQ by Stage ============================================== */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">❓ 按阶段划分的常见问题</h2>
        <div className="space-y-5 mb-8">
          {FAQ_BY_STAGE.map((stage) => (
            <div key={stage.stage} className="bg-paper border border-line rounded p-5 max-md:p-3.5">
              <b className="block text-[14px] text-brand uppercase tracking-wider mb-3 pb-2 border-b border-line">
                {stage.stage}
              </b>
              <div className="space-y-2">
                {stage.faqs.map((f, i) => (
                  <details key={i} className="border border-line rounded group/faq">
                    <summary className="px-4 py-3 cursor-pointer flex justify-between items-start gap-3 list-none [&::-webkit-details-marker]:hidden hover:bg-bg">
                      <b className="text-[13.5px] text-ink leading-snug flex-1">{f.q}</b>
                      <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0">▾</span>
                    </summary>
                    <p className="px-4 pb-4 pt-3 text-[13px] text-mute leading-relaxed border-t border-line">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* === System Status ============================================= */}
        <div className="bg-paper border border-line rounded p-5 mb-6 max-md:p-3.5">
          <div className="flex justify-between items-center mb-3 max-md:flex-col max-md:items-start max-md:gap-2">
            <h2 className="text-[16px] font-bold text-ink flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              系统状态——所有服务运行正常
            </h2>
            <Link
              href="https://huayuesc-status.io"
              className="text-[12px] text-brand hover:underline cursor-pointer"
            >
              详细状态页→
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-md:gap-2">
            {SYSTEM_STATUS.map((s) => (
              <div key={s.service} className="border border-line rounded p-2.5 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <small className="text-[11px] text-mute">{s.service}</small>
                </div>
                <b className="block text-[14px] text-success">{s.uptime}</b>
              </div>
            ))}
          </div>
        </div>

        {/* === Contact Channels ========================================== */}
        <div
          className="rounded p-6 text-white max-md:p-4"
          style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
        >
          <h2 className="text-[18px] font-bold mb-1 max-md:text-[16px]">仍需人工支持？</h2>
          <p className="text-[12.5px] opacity-85 mb-4 max-md:text-[12px]">
            华越河内+广州客户成功团队——24/7响应，为采购商提供100%越南语支持。
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {CONTACT_CHANNELS.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="bg-white/10 hover:bg-white/15 border border-white/20 rounded p-3 cursor-pointer transition block"
              >
                <div className="text-[24px] mb-1.5">{c.icon}</div>
                <b className="block text-[13px] mb-0.5">{c.title}</b>
                <p className="text-[11px] opacity-85 leading-snug">{c.desc}</p>
                <small className="text-[10.5px] opacity-70 mt-1 block truncate">{c.info}</small>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/15 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:text-center">
            <span className="text-[12.5px] opacity-85">
              📍 河内办事处：求纸郡范雄街26号 · 广州天河广场26楼
            </span>
            <Link
              href="/buying-request"
              className="px-4 py-2 bg-gold text-brand-dark rounded-sm font-bold text-[12.5px] cursor-pointer hover:bg-[#E8943A] whitespace-nowrap"
            >
              🚀 立即发送询价
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "帮助中心 — 华越",
  description:
    "300+篇指南、80+FAQ，涵盖从中国到越南的B2B采购。询价、交易保障、DDP、海关。24/7越南语支持。",
};
