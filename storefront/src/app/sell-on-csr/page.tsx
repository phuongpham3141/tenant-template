import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const HERO_STATS = [
  { n: "20+", l: "已认证供应商", icon: "🏭" },
  { n: "越南分销伙伴", l: "越南企业经销商", icon: "🇻🇳" },
  { n: "逐年稳增", l: "受保障的订单价值", icon: "🛡" },
  { n: "32%", l: "工厂验厂通过率", icon: "✅" },
];

const VALUE_PROPS = [
  {
    icon: "🇻🇳",
    title: "已认证的越南分销伙伴与经销商",
    desc: "经销商均已完成完整企业认证，具有真实进口历史。按行业分布：家具 35%、建筑材料 22%、卫浴洁具 15%、家用电器 12%、其他行业 16%。",
  },
  {
    icon: "🤝",
    title: "中越双语团队",
    desc: "广州团队（寻源、品控、验厂）+ 河内团队（仓储、清关、销售）。通过微信、钉钉、Zalo 提供支持——工作时间内 30 分钟以内响应。",
  },
  {
    icon: "🛡",
    title: "交易保障——采购商 0% 手续费",
    desc: "通过越南和中国合作银行的担保账户。供应商承担 1.5%（已含在挂牌价中）。消除信任壁垒——越南经销商可放心下大单。",
  },
  {
    icon: "🚢",
    title: "连通海防港（主港）+ 辅港 + 陆路边境",
    desc: "叻坚（海防主港）· 吉莱 · 盖梅，外加友谊关（谅山）陆路通道，小单 5–7 天即达。现有承运合作伙伴：COSCO、MSC、OOCL、ONE。",
  },
  {
    icon: "📊",
    title: "详尽分析面板",
    desc: "按 SKU 的浏览量、询价 → 报价 → 订单的转化率、按销售额排名的头部经销商、按季节推荐的热销 SKU、图片 A/B 测试。可导出 Excel、CSV，或通过 API 自动获取。",
  },
  {
    icon: "💸",
    title: "双赢模式——共担市场风险",
    desc: "挂牌、验厂、询价匹配、横幅——100% 免费。唯一的 1.5% 交易保障费仅在订单成交后才产生。承诺：若供应商在头 12 个月内尚未盈利，则全额返还费用。",
  },
];

const PRICING_PILLARS = [
  {
    badge: "成交订单前",
    price: "0 元",
    priceSub: "完全免费",
    color: "#16A34A",
    headline: "挂牌、验厂及所有营销工具——100% 免费",
    desc: "华越相信价值应在收费之前得到证明。全部基础设施——从工厂验厂、不限量产品挂牌、AI 询价匹配，到首页横幅——对所有通过验厂的供应商均免费。",
    items: [
      "工厂注册与法律审查",
      "工厂实地验厂（ISO 19011 标准）",
      "不限量产品挂牌",
      "询价收件箱 + AI 前三匹配",
      "中越双语客户经理",
      "行业横幅与首页横幅",
      "越南经销商季度报告",
      "展会代表出席（广交会、VIETBUILD）",
    ],
    accent: false,
  },
  {
    badge: "订单成交后",
    price: "1.5%",
    priceSub: "按订单价值计",
    color: "#005F6B",
    headline: "交易保障——唯一费用，仅在成功交货后收取",
    desc: "我们只在供应商已接到订单且越南经销商已确认后才盈利。1.5% 费用涵盖通过越南和中国合作银行的担保账户服务——为采购商保障信任。采购商支付 0 元，供应商已将 1.5% 含入挂牌价中，无隐藏费用。",
    items: [
      "通过 3 家国际银行的担保账户",
      "越南采购商 0% 手续费——放心下大单",
      "仅在经销商确认货品无误后放款",
      "争议保护——若违背承诺则退款",
      "费率公开，除 1.5% 外无任何其他收费",
      "自动扣除——供应商无需额外操作",
    ],
    accent: true,
  },
  {
    badge: "我们的承诺",
    price: "不盈利",
    priceSub: "不收费",
    color: "#9C6A1F",
    headline: "若供应商尚未盈利，华越全额免费",
    desc: "我们坚信多方共赢模式。若头 12 个月内供应商未能从华越获得实际利润，我们将全额返还已缴的交易保障费——或继续免费延长 6 个月，共同寻找优化方向。这不是促销——这是我们的运营理念。",
    items: [
      "在服务合同中具约束力的承诺",
      "12 个月后若未盈利，100% 返还交易保障费",
      "或继续免费延长 6 个月——由供应商选择",
      "客户经理主动建议优化价格、产品",
      "华越与供应商共担市场风险",
      "理念：我们共赢——而非独赢",
    ],
    accent: false,
  },
];

const STEPS = [
  {
    n: 1,
    icon: "📝",
    color: "#0E7490",
    title: "注册与预审",
    duration: "1–2 天",
    desc: "在线填写表单（10 分钟）——上传营业执照、ISO 9001/14001、生产能力。华越在 24–48 小时内审核：核查天眼查、GACC 出口资质、投诉历史。约 32% 的申请通过预审。",
    actions: [
      "回答 32 道关于规模、产品、营收的问题",
      "从 5 个公开数据源交叉核查",
      "100% 申请均有回复——绝不弃之不顾",
    ],
  },
  {
    n: 2,
    icon: "🔍",
    color: "#7C2D12",
    title: "工厂实地验厂",
    duration: "7–15 天",
    desc: "华越验厂团队（广州 4 名品控人员）亲赴工厂：检查实际生产线、产能、品控体系、证书原件、劳动条件（ILO 标准）。在工厂验厂 1–2 天。出具 28–45 页 PDF 报告并在区块链上数字签名。",
    actions: [
      "按 ISO 19011 标准参观 12 个项目",
      "随机访谈 5–8 名工人（私下进行）",
      "拍摄 360° 视频 + 100–180 张证据照片",
      "检查正在生产的实际产品批次",
    ],
  },
  {
    n: 3,
    icon: "🚀",
    color: "#16A34A",
    title: "上架与培训",
    duration: "3–5 天",
    desc: "客户经理一对一指导：以针对越南语搜索优化的标题上架 SKU、规范图片（如需则重拍）、设置起订量和价格阶梯、如有则对接内部 API/ERP。通过 8 节中文 + 越南语视频进行培训。",
    actions: [
      "上架 10–30 款主力产品，配图片 + 视频",
      "设置接收放款的银行账户",
      "流程培训：响应时间、争议、包装",
      "集成 API 或 ERP 连接器（可选）",
    ],
  },
  {
    n: 4,
    icon: "💼",
    color: "#9C6A1F",
    title: "销售与接到首单",
    duration: "7–30 天",
    desc: "店铺公开后，AI 匹配自动将 SKU 推送给合适的越南经销商。供应商平均在 7–14 天内收到首个询价。首单平均 30 天。客户经理持续跟进并优化。",
    actions: [
      "询价自动转给最匹配的供应商",
      "通过控制台或移动应用报价",
      "以 5 种状态追踪订单，配图片/视频",
      "经销商确认后通过担保账户放款",
    ],
  },
];

const AUDIT_CRITERIA = [
  { label: "中国营业执照", required: true },
  { label: "GACC 出口资质", required: true },
  { label: "ISO 9001:2015 或同等认证", required: true },
  { label: "生产能力 ≥ 行业门槛", required: true },
  { label: "具备书面流程的质量控制体系", required: true },
  { label: "符合 ILO 基本劳动标准", required: true },
  { label: "ISO 14001（环境）", required: false },
  { label: "BSCI 或 SEDEX（社会责任审核）", required: false },
  { label: "行业认证（CE、FCC、RoHS、FDA）", required: false },
  { label: "天眼查信用评分 ≥ 70", required: false },
];

const MARKETING_TOOLS = [
  {
    icon: "📢",
    title: "AI 询价匹配",
    desc: "当越南经销商发出询价时，AI 排名系统将最匹配的供应商推入前三——依据销售历史、评价、产能、响应时间。当多个候选同分时，高级套餐优先进入前三。",
  },
  {
    icon: "🏠",
    title: "首页焦点横幅",
    desc: "高级套餐供应商在华越首页享轮播横幅——每周展示 10 万+ 次浏览，平均点击率 4.2%。在高级供应商之间每 8 小时轮播一次。",
  },
  {
    icon: "📧",
    title: "交易预警——每周通讯",
    desc: "每周通讯发送至 12,000 名注册经销商。高级套餐供应商可在“新供应商”栏目（每月 1 次）或“最佳优惠”栏目（按行业）获得推荐。打开率 38%，点击率 8.5%。",
  },
  {
    icon: "🎯",
    title: "展会代表出席",
    desc: "华越代表高级套餐供应商出席广交会（广州，每年 2 次）、VIETBUILD 胡志明市、VIIF 河内——收集经销商名片，48 小时内将潜在客户转交供应商。高级套餐每年免费 2 场展会。",
  },
  {
    icon: "🎬",
    title: "工厂参观视频",
    desc: "华越为高级套餐供应商制作 90–180 秒工厂参观视频（每年免费 1 次，之后 800 美元/条）。置于店铺并通过交易预警分享——提升新经销商的信任度。",
  },
  {
    icon: "📈",
    title: "越南经销商季度报告",
    desc: "已认证套餐及以上供应商可获季度报告：本行业越南前 20 经销商、销售额变动、客户流失风险预测、市场机会（缺货 SKU）。30+ 页，由研究团队编制。",
  },
];

const STORIES = [
  {
    name: "Foshan Hanse Industrial",
    loc: "佛山",
    category: "办公家具",
    before: "20 单 / 月",
    after: "85 单 / 月",
    lift: "+325%",
    years: "入驻 CSR 6 年",
    quote: "在华越之前，我们通过中间经销商进入越南，利润率 8–12%。如今直接对接，利润率 22%，且建立了长期关系。",
  },
  {
    name: "OPPEIN Home Group",
    loc: "广州",
    category: "橱柜与家具",
    before: "80,000 美元 / 月",
    after: "420,000 美元 / 月",
    lift: "+425%",
    years: "入驻 CSR 5 年",
    quote: "近 3 年来，越南是 OPPEIN 增长最快的市场——超过了印尼和菲律宾。",
  },
  {
    name: "Taizhou Faucet Group",
    loc: "台州",
    category: "水龙头与卫浴洁具",
    before: "0 家越南经销商",
    after: "32 家越南经销商",
    lift: "+32 家经销商",
    years: "入驻 CSR 4 年",
    quote: "华越客户经理帮我们处理越南增值税法规——这是我们从中国本地无法自行办到的。",
  },
  {
    name: "Landbond Furniture",
    loc: "佛山",
    category: "中高端木制家具",
    before: "60,000 美元 / 月",
    after: "280,000 美元 / 月",
    lift: "+367%",
    years: "入驻 CSR 7 年",
    quote: "高级套餐非常值得——首页横幅带来了我们 40% 的高质量询价。",
  },
  {
    name: "Ortonbaths Group",
    loc: "深圳",
    category: "马桶与洗手盆",
    before: "对越南出口占 5%",
    after: "对越南出口占 32%",
    lift: "+540%",
    years: "入驻 CSR 3 年",
    quote: "3 年间，越南从第 8 大市场跃升至第 2（仅次于美国）。华越是主力渠道。",
  },
  {
    name: "Monalisa Ceramic",
    loc: "佛山",
    category: "瓷砖与地砖",
    before: "120,000 美元 / 月",
    after: "680,000 美元 / 月",
    lift: "+466%",
    years: "入驻 CSR 8 年",
    quote: "越南 24 家瓷砖经销商连锁都通过华越认识了 Monalisa。这比传统广告更有效地塑造了品牌。",
  },
];

const FAQ = [
  {
    q: "我不会说越南语——会有问题吗？",
    a: "不会。华越客户经理精通中文 + 越南语 + 英语，在所有沟通中充当桥梁。店铺会自动翻译为越南语（由人工翻译团队复核，而非纯 AI）。来自经销商的消息经客户经理转达——供应商收到的是已翻译并归纳的信息。",
  },
  {
    q: "工厂验厂需要多长时间、有什么费用？",
    a: "在工厂验厂 1–2 天，从预约起整个周期 7–15 天。所有套餐均免费——华越承担验厂团队和差旅费用。供应商只需安排配合人员（验厂当天 1 名品控主管 + 1 名生产主管）。高级套餐每年额外免费 1 次验厂以维持认证。",
  },
  {
    q: "我已在 Alibaba.com 开店——还需要华越吗？",
    a: "如果越南市场对您的战略重要，则需要。Alibaba.com 是通用的全球平台；华越是面向越南的专属渠道——经销商画像不同（越南中大型 B2B 企业，而非一件代发商）、价格和贸易术语不同（侧重 DDP，少用 FOB）、信任机制不同（通过越中合作银行的交易保障，而非支付宝）。许多供应商两者并用。",
  },
  {
    q: "如果一切都免费，华越如何盈利？",
    a: "我们仅在成交订单价值上收取 1.5% 费用，通过交易保障服务——该费用已由供应商含入挂牌价中，并非隐藏费用。采购商支付 0 元。我们的模式与供应商的成功紧密绑定：只有供应商卖出货品时我们才盈利。若供应商尚未盈利，我们分文不取。",
  },
  {
    q: "“不盈利不收费”承诺具体如何运作？",
    a: "自供应商正式上架起 12 个月后，若来自华越订单的总利润（扣除生产、运输、1.5% 费用后）仍未转正，供应商有权选择两种方案之一：(1) 全额返还该 12 个月内已缴的交易保障费。(2) 继续免费延长交易保障 6 个月——华越与供应商共担市场风险。此承诺明确写入服务合同——并非营销口号。",
  },
  {
    q: "我可以随时退出华越吗？",
    a: "可以。供应商可在控制台自行关闭店铺，即时生效——无长期约束合同，无取消费用。由于挂牌 100% 免费，无任何款项需返还。处于交易保障中的订单须先完成担保流程（放款或处理争议），账户才能彻底关闭。",
  },
  {
    q: "通过华越向越南出口有哪些特殊法律要求？",
    a: "供应商需具备：(1) GACC 出口资质（出具 Form E 以享 ACFTA 优惠）。(2) 符合越南海关标准的商业发票和装箱单。(3) 原产地证书（如适用，Form E 或 RCEP）。(4) 对于特殊货物：质量证书、安全数据表（化学品）、检测报告（电气/电子）。华越客户经理在每批货物前审核单证——免费。",
  },
  {
    q: "我想销售给越南经销商但不直接出口——有替代模式吗？",
    a: "有“CSR Fulfilled”模式，自2026年第3季度起推行：供应商以FOB将货物交给位于香港或广州的华越物流，华越负责全部运输+清关+配送至越南经销商。供应商只需运至口岸。物流费8–15%（视行业而定），无设置费。目前正与8家高级套餐供应商试运行。",
  },
  {
    q: "交易保障是强制的吗？",
    a: "强烈建议但非强制。华越约78%的订单正在使用交易保障。供应商采用可提高成交率（据内部数据，经销商信任度高出3.4倍），尤其在与新经销商的首单中。每单1.5%费用已含在挂牌价中，无隐藏费用。",
  },
];

function StatTile({ n, l, icon }: { n: string; l: string; icon: string }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded p-4 backdrop-blur-sm">
      <div className="text-[20px] mb-1">{icon}</div>
      <div className="text-[24px] font-extrabold leading-none">{n}</div>
      <div className="text-[11px] opacity-85 mt-1">{l}</div>
    </div>
  );
}

export default function SellOnCsrPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "入驻 CSR" }]} />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-light blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-12 max-md:py-8">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            🏭 入驻CSR · 供应商专属
          </span>
          <h1 className="text-[42px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            B2B出口越南<br />
            <span className="text-gold">借力第一专业平台</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[760px] leading-relaxed mb-7 max-md:text-[13px]">
            专注越南–中国市场的B2B平台，覆盖家具、材料、卫浴洁具、家用电器行业。<b className="text-gold">挂牌100%免费</b>——只有供应商成交订单后我们才收费。“不盈利不收费”承诺：若尚未盈利，华越全额免费。40+合作工厂在采用多方共赢模式24个月后实现300%+增长。
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} {...s} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link href="/register/factory" className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]">
              🚀 立即注册工厂
            </Link>
            <Link href="/info/audit-process" className="px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10">
              📋 查看验厂流程
            </Link>
            <Link href="/info/contact" className="px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90">
              💬 预约30分钟咨询
            </Link>
          </div>
        </div>
      </section>

      {/* === Why Huayuesc ============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">为何选择华越</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">20+工厂选择我们平台的6大理由</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            并非通用全球平台——华越是面向越南市场的深耕渠道，为每笔交易配备专属基础设施和团队。
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[32px] mb-2">{v.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{v.title}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Pricing philosophy ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">收费政策 · 双赢模式</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">
            挂牌100%免费——只在交易成交时收费
          </h2>
          <p className="text-[13.5px] text-mute mt-2 max-w-[760px] mx-auto leading-relaxed">
            华越本着<b className="text-ink">多方共赢</b>的原则，助力各方互通商贸。我们不收注册费、不收验厂费、不收年度会员费。唯一的费用是1.5%交易保障——仅在供应商成交订单且经销商确认收货后才产生。<b className="text-ink">若供应商尚未盈利，华越承诺全额免费。</b>
          </p>
        </div>

        {/* Top callout — big "100% free" stripe */}
        <div className="rounded p-5 mb-5 border-2 border-success bg-success/5 flex items-center justify-between gap-5 max-md:flex-col max-md:text-center">
          <div className="flex items-center gap-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-success text-white flex items-center justify-center text-[26px] flex-shrink-0">
              🎁
            </div>
            <div>
              <b className="block text-[18px] text-ink leading-tight">注册、验厂、挂牌全流程——100%免费</b>
              <p className="text-[12.5px] text-mute mt-1">
                无隐藏费用，无长期约束合同，无需缴纳押金。供应商可随时退出平台。
              </p>
            </div>
          </div>
          <Link
            href="/register/factory"
            className="px-5 py-2.5 bg-success text-white rounded-sm font-bold text-[13px] hover:opacity-90 whitespace-nowrap"
          >
            免费注册 →
          </Link>
        </div>

        {/* 3 pricing pillars */}
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {PRICING_PILLARS.map((p) => (
            <div
              key={p.headline}
              className={`bg-paper border-2 rounded p-5 flex flex-col ${
                p.accent ? "shadow-md ring-1" : ""
              }`}
              style={{
                borderColor: p.accent ? p.color : "#E5E7EB",
                ...(p.accent ? { boxShadow: `0 4px 12px ${p.color}20` } : {}),
              }}
            >
              <span
                className="inline-block self-start text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm mb-3"
                style={{ background: `${p.color}15`, color: p.color }}
              >
                {p.badge}
              </span>
              <div className="mb-3">
                <span className="text-[40px] font-extrabold leading-none" style={{ color: p.color }}>
                  {p.price}
                </span>
                <div className="text-[12px] text-mute mt-1">{p.priceSub}</div>
              </div>
              <h3 className="text-[15px] font-bold text-ink leading-tight mb-2 min-h-[3em]">
                {p.headline}
              </h3>
              <p className="text-[12px] text-mute leading-relaxed mb-4 flex-shrink-0">{p.desc}</p>
              <ul className="space-y-2 text-[12.5px] text-ink mb-1 flex-1">
                {p.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="flex-shrink-0" style={{ color: p.color }}>
                      ✓
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom commitment banner */}
        <div
          className="mt-5 rounded p-5 text-white max-md:p-4"
          style={{ background: "linear-gradient(135deg, #9C6A1F 0%, #7C5A1F 100%)" }}
        >
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-white/15 border-2 border-gold flex items-center justify-center text-[26px] flex-shrink-0">
              🤝
            </div>
            <div className="flex-1">
              <b className="block text-[16px] mb-1">“不盈利不收费”承诺——以书面形式写入服务合同</b>
              <p className="text-[13px] opacity-90 leading-relaxed">
                若头12个月内供应商未能从华越获得实际利润，我们将<b>全额返还已缴的交易保障费</b>——或继续免费延长6个月，共同寻找优化方向。我们坚信，只有各方共赢，B2B平台才有价值。
              </p>
            </div>
            <Link
              href="/info/contact"
              className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px] hover:bg-[#E8943A] whitespace-nowrap"
            >
              与BD团队沟通 →
            </Link>
          </div>
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">4步流程</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">从注册到首单平均30天</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            验厂免费，客户经理一对一从第一天起全程指导，直至接到首单。
          </p>
        </div>
        <div className="space-y-3">
          {STEPS.map((s) => (
            <article key={s.n} className="bg-paper border-l-4 rounded-r p-5 max-md:p-4" style={{ borderColor: s.color }}>
              <div className="flex gap-4 max-md:flex-col">
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded flex items-center justify-center font-extrabold text-white text-[20px] shadow-md"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.n}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[28px]">{s.icon}</span>
                      <div>
                        <h3 className="text-[17px] font-bold text-ink leading-tight">{s.title}</h3>
                        <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: s.color }}>
                          第 {s.n} 步
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-bg border border-line px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider text-mute">
                      🕒 {s.duration}
                    </span>
                  </div>
                  <p className="text-[13px] text-mute leading-relaxed mb-3">{s.desc}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] max-md:grid-cols-1">
                    {s.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span style={{ color: s.color }} className="flex-shrink-0">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Audit criteria ================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="bg-paper border border-line rounded p-6 max-md:p-4">
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand font-bold">验厂标准</span>
              <h2 className="text-[22px] font-bold text-ink mt-1 max-md:text-[18px]">10项标准体系——必备+加分</h2>
              <p className="text-[13px] text-mute mt-1">平均通过率32%——以严格标准保护越南经销商</p>
            </div>
            <Link
              href="/info/audit-process"
              className="text-[12.5px] text-brand font-semibold hover:underline whitespace-nowrap"
            >
              查看流程详情 →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 max-md:grid-cols-1">
            {AUDIT_CRITERIA.map((c) => (
              <div key={c.label} className="flex items-center gap-2.5 text-[13px]">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    c.required ? "bg-brand text-white" : "bg-bg border border-line text-mute"
                  }`}
                >
                  {c.required ? "✓" : "+"}
                </span>
                <span className="text-ink flex-1">{c.label}</span>
                {c.required ? (
                  <span className="text-[10px] text-accent font-bold">必备</span>
                ) : (
                  <span className="text-[10px] text-mute2">加分</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Marketing tools ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">营销工具</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">华越主动将供应商推送给经销商</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            不只是被动的店铺——我们运营6个主动营销渠道，让供应商精准触达有需求的经销商。
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {MARKETING_TOOLS.map((m) => (
            <div key={m.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[28px] mb-2">{m.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{m.title}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Success stories ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">成功案例</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">6家多年合作工厂——真实数据</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            来自与华越同行3至8年的工厂负责人的直接分享。
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {STORIES.map((s) => (
            <article key={s.name} className="bg-paper border border-line rounded p-5">
              <div className="flex justify-between items-start mb-2 flex-wrap gap-1">
                <b className="text-[14.5px] text-ink leading-tight">{s.name}</b>
                <span className="text-[10.5px] text-mute2 whitespace-nowrap">{s.years}</span>
              </div>
              <div className="flex justify-between text-[11.5px] text-mute mb-3 flex-wrap gap-1">
                <span>📍 {s.loc}</span>
                <span>· {s.category}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-line text-[12px]">
                <div>
                  <div className="text-mute text-[10.5px] uppercase tracking-wider">入驻CSR前</div>
                  <b className="text-ink text-[12.5px]">{s.before}</b>
                </div>
                <div>
                  <div className="text-mute text-[10.5px] uppercase tracking-wider">入驻CSR后</div>
                  <b className="text-success text-[12.5px]">{s.after}</b>
                </div>
              </div>
              <div className="mt-2 text-center bg-success/10 border border-success/25 text-success font-bold py-1.5 rounded-sm text-[13px]">
                {s.lift}
              </div>
              <p className="text-[11.5px] text-mute italic mt-3 leading-relaxed border-l-2 border-gold pl-2.5">
                &ldquo;{s.quote}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* === FAQ =========================================================== */}
      <section className="max-w-[900px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">常见问题</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">供应商最关心的8个问题</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            汇总自过去12个月对越南分销伙伴、已注册供应商及20+现有合作伙伴的访谈。
          </p>
        </div>
        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <details key={i} className="group bg-paper border border-line rounded">
              <summary className="cursor-pointer px-4 py-3 flex justify-between items-center gap-3 list-none">
                <b className="text-[13.5px] text-ink flex-1">{f.q}</b>
                <span className="text-mute group-open:rotate-180 transition-transform text-[12px]">▾</span>
              </summary>
              <div className="px-4 pb-4 pt-1 text-[13px] text-mute leading-relaxed border-t border-line">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* === Final CTA ====================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 mb-10">
        <div
          className="rounded p-8 text-white text-center max-md:p-5"
          style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
        >
          <h3 className="text-[30px] font-extrabold mb-3 max-md:text-[22px]">
            准备好提升越南出口业绩了吗？
          </h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[680px] mx-auto leading-relaxed">
            注册免费，验厂免费。平均30天即可上架并接到首单。20+供应商已选择华越——无隐藏交易费，中越双语客户经理一对一服务。
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/register/factory"
              className="inline-block px-8 py-3.5 bg-gold text-brand-dark rounded-sm font-bold text-[15px] hover:bg-[#E8943A]"
            >
              🚀 立即注册工厂
            </Link>
            <Link
              href="/info/contact"
              className="inline-block px-8 py-3.5 border-2 border-white/40 text-white rounded-sm font-bold text-[15px] hover:bg-white/10"
            >
              💬 预约30分钟咨询
            </Link>
          </div>
          <div className="mt-6 pt-5 border-t border-white/15 text-[12px] opacity-80 flex justify-center gap-5 flex-wrap">
            <span>📞 +86 20 8888 1234（广州）</span>
            <span>📞 +84 24 3556 7788（河内）</span>
            <span>✉ supplier@huayuesc.vn</span>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "入驻CSR — 通过华越向越南做B2B出口",
  description:
    "专注越南–中国市场的B2B平台。已认证的越南分销伙伴与经销商、通过越南和中国合作银行的交易保障、中越双语客户经理。20+供应商已注册，验厂免费，从注册到首单30天。",
};
