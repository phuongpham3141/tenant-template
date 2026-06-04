import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const HERO_STATS = [
  { n: "8-12", l: "从下单到收货的天数", icon: "⏱" },
  { n: "$30-200", l: "样品费（下达起订量时返还）", icon: "💰" },
  { n: "100%", l: "下达起订量时全额返还", icon: "↩" },
  { n: "4%", l: "下样品单后的投诉率（不下单则为 22%）", icon: "📉" },
];

const WHY_REASONS = [
  {
    icon: "🤲",
    title: "亲手感受真实材质",
    desc: "5,500K 影棚灯光 + 后期修图的图片，无法替代亲手触摸的体验。重量、细腻度、弹性、厚度——只有样品才能告诉您。",
  },
  {
    icon: "📐",
    title: "精确测量尺寸",
    desc: "网站上的尺寸与实际量产相比通常有 2-5 mm 的误差。下样品单用游标卡尺测量、核查公差——避免日后装柜时出现包装问题。",
  },
  {
    icon: "🌈",
    title: "在自然光下检查颜色",
    desc: "RGB 屏幕颜色 ≠ CMYK 实际颜色 ≠ Pantone 颜色。尤其是木材、织物、陶瓷——室内光与阳光下的纹理/色差可能相差 5-15%。",
  },
  {
    icon: "📦",
    title: "评估标准包装",
    desc: "纸箱抗冲击吗？有护角吗？气泡膜层数够吗？标签符合出口标准吗（FRAGILE、多语种）？样品能体现供应商真实的包装标准。",
  },
  {
    icon: "📜",
    title: "核验随附文件",
    desc: "说明书有越南语翻译吗？随附证书是原件还是模糊复印件？有发票吗？有质保卡吗？文件的专业程度反映供应商的成熟度。",
  },
  {
    icon: "🛡",
    title: "在起订量前检测合规性",
    desc: "样品可送独立实验室（SGS/BV）检测重金属、甲醛、耐用性。通过检测 = 下达 5 万美元起订量时更有信心；未通过 = 更换供应商。",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    icon: "🔍",
    title: "查找产品并申请样品",
    duration: "5 分钟",
    color: "#0E7490",
    desc: "在产品详情页点击“申请样品”按钮——表单自动填入 productId、供应商信息、起订量参考价。采购商只需填写收货地址，必要时选择规格。",
    actions: [
      "在产品详情页点击“申请样品”",
      "或通过询价表单提交（多产品）",
      "或复制 SKU 至与客户经理的询盘聊天",
    ],
  },
  {
    n: "02",
    icon: "⚙️",
    title: "配置样品——规格 / OEM",
    duration: "10-15 分钟",
    color: "#7C3AED",
    desc: "选择合适的样品类型：标准款（同目录）免打样费 · 规格款（不同颜色/尺寸）+$0-50 · OEM（定制 logo/品牌）+$80-300 打样费。客户经理在转发供应商前 2-4 小时内审核配置。",
    actions: [
      "标准款：供应商提供的 1 件标准样，无定制",
      "规格款：在供应商目录中选择不同颜色/尺寸",
      "OEM：上传 logo 文件（矢量 .ai/.svg），指定 Pantone 品牌色",
      "多供应商：向 3-5 家供应商申请以作比较",
    ],
  },
  {
    n: "03",
    icon: "💳",
    title: "向担保账户支付样品费",
    duration: "1-3 小时",
    color: "#16A34A",
    desc: "$30-200 费用 + $20-40 运费通过华越在越南合作银行的担保账户支付——不直接转给供应商。完整保留交易保障：若供应商交付样品有误，通过担保账户全额退款。",
    actions: [
      "方式：电汇 / VietQR / 信用卡",
      "为每个样品订单生成唯一订单号",
      "备注：与同一供应商下达起订量时，100% 返还样品费",
    ],
  },
  {
    n: "04",
    icon: "🏭",
    title: "供应商生产样品",
    duration: "3-7 天",
    color: "#92400E",
    desc: "供应商接单，开始准备样品。标准样从成品仓库提取（1-2 天）。规格款需逐件定制生产（3-5 天）。OEM 需开模/印 logo（5-10 天）。供应商通过控制台并附生产照片更新进度。",
    actions: [
      "供应商接单后采购商收到通知",
      "通过 Zalo OA / 控制台更新照片 + 视频进度",
      "采购商可通过华越直接与供应商沟通（配备翻译）",
      "可要求视频通话，在定稿前查看打样",
    ],
  },
  {
    n: "05",
    icon: "📦",
    title: "华越广州办事处",
    duration: "1-3 天",
    color: "#A21CAF",
    desc: "供应商将样品寄至华越广州办事处（位于海珠区，连接佛山和东莞产业带——多数签约供应商在 24-48 小时内送达）。CSR 每周将 8-15 件样品合并为 1 个航空主运单寄往河内——为采购商节省 50-60% 运费。",
    actions: [
      "广州办事处周一至周五办公，每周五发出批次",
      "每件样品贴 QR 码以便单独追踪",
      "华越广州团队初检：SKU 正确、规格正确、包装符合出口标准",
      "样品送达华越广州办事处时采购商收到通知",
    ],
  },
  {
    n: "06",
    icon: "✈️",
    title: "航空运输 + 越南末端配送",
    duration: "3-5 天",
    color: "#DC2626",
    desc: "主运单通过 DHL/FedEx/UPS 航空运输（广州 → 河内 4-5 天），在内排或新山一机场清关，随后通过 GHN/J&T 末端配送直达采购商。从下单起总交货时间 8-12 天。",
    actions: [
      "通过 Zalo OA + 邮件实时追踪",
      "清关：样品 <$200 = 商业样品，免增值税",
      "末端配送：河内/胡志明市 24-48 小时，偏远省份 2-4 天",
      "采购商签收 → 关闭订单 → 开始验货",
    ],
  },
];

const SAMPLE_TYPES = [
  {
    type: "标准款",
    color: "#0E7490",
    icon: "📦",
    fee: "$30-100",
    leadtime: "8-10 天",
    desc: "与目录完全一致的样品，无定制。适合采购商在下达标准起订量前核验基准品质。",
    bestFor: "首次与新供应商采购 · 核验基准品质 · 测试标准包装",
    pros: ["最便宜、最快", "供应商从现成成品仓库提取", "打样费 = $0"],
    cons: ["无法定制", "可能与采购商所需的确切颜色/尺寸不符"],
  },
  {
    type: "规格款",
    color: "#7C3AED",
    icon: "🎨",
    fee: "$50-150",
    leadtime: "10-12 天",
    desc: "在供应商目录中选择不同颜色 / 尺寸 / 材质，但尚未 OEM。适合采购商在起订量前核验某一具体规格。",
    bestFor: "核验具体规格 · 比较同 SKU 的 2-3 种颜色 · 测试特殊尺寸",
    pros: ["比标准款更贴近实际起订量", "供应商定制生产 3-5 件", "完整的交易保障"],
    cons: ["比标准款贵 30-50%", "交货时间 +2-3 天", "部分供应商在规格款起订量 >1000 时会拒绝"],
  },
  {
    type: "OEM",
    color: "#A21CAF",
    icon: "🏷",
    fee: "$80-300 + 打样费",
    leadtime: "12-21 天",
    desc: "定制自有品牌 logo、定制 Pantone 颜色，可定制包装。这是下达 OEM 起订量前必须的样品——不可省略。",
    bestFor: "自有品牌 OEM · 测试 logo 印刷品质 · 定制包装 · 自有标签",
    pros: ["带有采购商品牌的完整产品", "可在起订量前拍摄营销照片", "核验供应商真实的 OEM 能力"],
    cons: ["最贵、最慢", "打样费 80-300 美元不立即返还（仅下起订量时）", "需要规范的矢量 logo 文件"],
  },
];

const COST_TABLE = [
  { item: "样品费（标准款）", range: "$30-100", note: "视行业而定——陶瓷最便宜，电子产品最贵" },
  { item: "样品费（规格款）", range: "$50-150", note: "颜色/尺寸定制比标准款加收 30-50%" },
  { item: "样品费（OEM）", range: "$80-300", note: "另加 logo 打样费 $80-300" },
  { item: "华越广州办事处 → 越南运费（合并）", range: "$20-40", note: "批量合并时按每件计算。比单独寄送节省 50-60%" },
  { item: "单独寄送费（快递）", range: "$60-120", note: "若采购商急需，不合并批次" },
  { item: "越南国内末端配送", range: "$2-5", note: "GHN/J&T 直达采购商仓库，已含在运费中" },
  { item: "样品订阅套餐", range: "$99/月", note: "样品不限量，仅付产品费——适合每月 >5 件样品的采购商" },
  { item: "关税 / 增值税", range: "$0", note: "样品 <$200 = 商业样品，依据 NĐ 134/2016 免税" },
];

const PRE_MOQ_CHECKLIST = [
  {
    category: "材质",
    icon: "🧪",
    items: [
      "用电子秤测量实际重量（与规格对比）",
      "用游标卡尺在 5 个不同点测量材料厚度",
      "弯折/划痕测试——材料是否易刮花、易断裂？",
      "（可选）送 SGS 实验室检测重金属 + 甲醛——$200-450",
    ],
  },
  {
    category: "尺寸",
    icon: "📐",
    items: [
      "按 PO 规格测量完整尺寸（长 × 宽 × 高）",
      "核查公差：五金件 ±2 mm，木制品 ±5 mm，电子产品 ±1 mm",
      "在 1 件样品上测量 3-5 个不同点以核验一致性",
      "与上次寄送的 OEM 样品对比（若返单）",
    ],
  },
  {
    category: "工艺与颜色",
    icon: "🎨",
    items: [
      "检查表面工艺：哑光/亚光/亮光——是否符合 PI 规格？",
      "在 3 种条件下检查颜色：室内（3000K）+ 阳光（5500K）+ 白光 LED（4000K）",
      "用分光光度计或实体色卡核验 Pantone 色值",
      "检查表面是否有划痕、凹陷、缺陷",
    ],
  },
  {
    category: "包装",
    icon: "📦",
    items: [
      "纸箱硬度够吗？用从上往下按压的方式测试",
      "易碎品是否有护角？",
      "气泡膜 / 泡沫——保护层数够吗？",
      "标签是否多语种（中-英-越）？是否有 FRAGILE、THIS SIDE UP、MAX STACK？",
    ],
  },
  {
    category: "文件与证书",
    icon: "📜",
    items: [
      "说明书有越南语或英语吗？有安全指引吗？",
      "证书（CE/FCC/RoHS/CB）——原件还是扫描件？能扫 QR 码核验吗？",
      "发票 / 商业发票是否完整包含 HS 编码、FOB 价格、重量？",
      "若有 SGS/BV 检测报告——在独立实验室门户上核验",
    ],
  },
];

const SAMPLE_SUB_FEATURES = [
  { icon: "♾", title: "样品不限量", desc: "每月样品数量不限——仅付产品费" },
  { icon: "🚀", title: "优先运输", desc: "您的样品优先合并发运，每周 2 次而非 1 次" },
  { icon: "🤝", title: "专属客户经理", desc: "专属客户经理负责样品订单，4 小时响应" },
  { icon: "📞", title: "免费供应商视频通话", desc: "通过华越广州团队安排与供应商的打样视频通话审核" },
  { icon: "📊", title: "控制台追踪", desc: "追踪所有进行中的样品、预计到达时间、供应商对比" },
  { icon: "↩", title: "起订量时全额返还", desc: "下达 ≥$5K 起订量时全月样品费全额返还" },
];

const PITFALLS = [
  {
    icon: "🚫",
    title: "为省费用自行直接联系供应商",
    why: "丧失交易保障，没有专业翻译，无法利用华越广州办事处合并发货。省下 $20-40，但风险更高。",
  },
  {
    icon: "⚠️",
    title: "只下一家供应商的样品就立即下起订量",
    why: "没有比较基准。最佳实践：向 3-5 家供应商申请同 SKU 样品，比较品质 + 价格 + 交货时间，再向最优供应商下起订量。",
  },
  {
    icon: "🔇",
    title: "下起订量前未仔细检查样品",
    why: "样品漂亮，但起订量在不同生产线生产可能差异显著。投入 1-2 小时测量 + 拍照 + 实验室检测样品 = 避免起订量时 $50K+ 的损失。",
  },
  {
    icon: "💸",
    title: "舍不得为 OEM 样品花 $80-300 打样费",
    why: "OEM 不打样 = 盲下单。logo 可能印偏，颜色可能与 Pantone 不符，包装可能印不出来——量产 5,000 件后才发现就太迟了。",
  },
  {
    icon: "📵",
    title: "跳过打样审核视频通话",
    why: "免费服务，但许多采购商跳过。定稿样品前与供应商进行 15 分钟视频通话，可避免基本失误（logo 尺寸、色彩模式、字体）。",
  },
  {
    icon: "📅",
    title: "临近中国春节 / 国庆才下样品单",
    why: "中国春节（1-2 月）→ 供应商放假 7-15 天。国庆（10 月初）→ 7 天。交货时间可能翻倍。请提前 4-6 周规划。",
  },
];

const FAQ = [
  {
    q: "我可以不通过华越，直接向供应商下样品单吗？",
    a: "技术上可以，但不推荐。自行向供应商下单：须用中文谈判，支付全额航空运费（$60-120 而非 $20-40），没有交易保障（供应商交错样品 = 损失钱款），没有华越广州团队跟进进度。通过 CSR 便宜 30-50% 且更安全——这正是华越广州办事处的价值所在。",
  },
  {
    q: "样品与起订量货品有何区别？",
    a: "标准样是从成品仓库提取或在小线上试产的产品——基本与起订量货品相同。但部分供应商用手工机（样品线）而非自动化生产线制作样品 → 在表面工艺和一致性上可能有细微差异。下达起订量时，CSR 始终进行出厂前 QC（出货前检验 AQL 2.5），确保起订量货品与已确认样品一致。",
  },
  {
    q: "我可以同时向多家供应商申请样品以作比较吗？",
    a: "完全推荐。专业采购商的最佳实践：“多供应商样品”——通过华越上的询价向不同供应商申请 3-5 件同 SKU 样品。华越将全部合并为 1 个航空主运单寄往越南，采购商在同一天收到以便直接比较。运费仍仅为 $20-40/件（合并），而非各供应商单独寄送的 $60-120。",
  },
  {
    q: "起订量时 100% 返还样品费——具体如何操作？",
    a: "当采购商在收到样品后 90 天内向同一供应商下达起订量时，全部样品费（产品 + OEM 打样费，不含运费）直接从起订量发票中抵扣。例如：您支付 $250 样品费 + $30 运费 → 下达 $5,000 起订量 → 只需支付 $4,750（抵扣 250）。$30 运费不返还，因为那是已发生的物流成本。",
  },
  {
    q: "样品进口到越南需要缴关税 / 增值税吗？",
    a: "不需要，前提是样品价值低于 200 美元。依据关于进出口税管理的 NĐ 134/2016/NĐ-CP 号法令，价值低于 $200 的商业样品免征进口税和增值税。CSR 将样品申报为“Commercial Sample, No Commercial Value”并标注实际价值以快速清关。超过 $200 则照常征收进口税 + 10% 增值税。",
  },
  {
    q: "$99/月的样品订阅套餐值得吗？",
    a: "值得，适合每月 >5 件样品的采购商。例如：每月采购众多新 SKU 的贸易商、为客户展示而申请样品的设计工作室、二级经销商的采购代理。单件样品需 $50-150 产品费 + $20-40 运费 → 5 件 = $350-950。订阅仅 $99 + 产品费，节省 70% 以上。对常下单的采购商，从第 2 个月起 ROI 即十分明显。",
  },
  {
    q: "我已收到样品，检查后觉得不错——应立即下起订量还是再测试一下？",
    a: "建议在下起订量前再测试 7-14 天。具体：(1) 耐用性测试——样品能承受 1 周实际使用吗？(2) 终端客户测试——向 3-5 位潜在客户展示样品，收集反馈。(3) 实验室检测（可选，$200-450），针对儿童用品 / 食品接触 / 电气产品的材料安全。(4) 核实供应商仍有产能及起订量交货时间。投入这 2 周可避免 90% 的起订量风险。",
  },
  {
    q: "若样品在运输中损坏——如何处理？",
    a: "CSR 通过 DHL/FedEx/UPS 寄送样品并附完整保险。若样品因运输损坏（纸箱受潮、倾倒、压扁）：采购商在收货时拍照 + 记录，发送至 dispute@huayuesc.vn。交易保障在 5-7 个工作日内全额退还样品费（含运费）。供应商免费重寄新样品，交货时间 5-7 天。此类事故罕见——2025 年发生率 <1%。",
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

export default function DatMauPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "首页", href: "/" },
          { label: "信息", href: "/help" },
          { label: "样品订购" },
        ]}
      />

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
            📦 样品订购
          </span>
          <h1 className="text-[40px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            $50 样品费——最划算的保险<br />
            <span className="text-gold">为您下一笔 50,000 美元起订量护航</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[780px] leading-relaxed mb-7 max-md:text-[13px]">
            首次与供应商采购时，下样品单是不可省略的一步。据 CSR 2025 数据：<b className="text-gold">未先下样品单的起订量订单中有 22%</b> 出现品质投诉——而这一数字<b className="text-gold">在采购商下样品单后降至 4%</b>。华越广州办事处合并发运可节省 50-60% 运费，交货时间 8-12 天，与同一供应商下达起订量时 100% 返还费用。
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} {...s} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link
              href="/products"
              className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              🔍 查找产品下样品单
            </Link>
            <a
              href="#sample-subscription"
              className="px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              ♾ 样品订阅套餐 $99/月
            </a>
          </div>
        </div>
      </section>

      {/* === Why samples matter ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">为何要下样品单</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">6 件无法通过图片 / 规格知晓的事</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            目录有完整参数、精美的影棚图片、详尽的工厂参观视频——但仍有 6 项要素只有亲手拿到样品才能核验。
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {WHY_REASONS.map((r) => (
            <div key={r.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[32px] mb-2">{r.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{r.title}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Big comparison stat */}
        <div className="mt-6 bg-paper border-2 border-gold rounded p-5 grid grid-cols-2 gap-4 items-center max-md:grid-cols-1">
          <div className="text-center border-r border-line pr-4 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-4">
            <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1">起订量前不下样品单</div>
            <div className="text-[48px] font-extrabold text-accent leading-none">22%</div>
            <div className="text-[12px] text-mute mt-1">起订量订单出现品质投诉</div>
          </div>
          <div className="text-center">
            <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1">起订量前充分下样品单</div>
            <div className="text-[48px] font-extrabold text-success leading-none">4%</div>
            <div className="text-[12px] text-mute mt-1">——仅花 $50-200 即降低 5.5 倍风险</div>
          </div>
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">6 步流程</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">从点击“申请样品”到亲手拿到样品</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            整个流程平均 8-12 天。采购商只需做 2 步（申请 + 支付）。其余 4 步由供应商 + 华越广州办事处 + CSR 物流自动完成。
          </p>
        </div>
        <div className="space-y-3">
          {PROCESS_STEPS.map((s, idx) => (
            <article key={s.n} className="bg-paper border-l-4 rounded-r p-5 max-md:p-4" style={{ borderColor: s.color }}>
              <div className="flex gap-4 max-md:flex-col">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded flex items-center justify-center font-extrabold text-white text-[18px] shadow-md"
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
                        <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: s.color }}>第 {s.n} 步</span>
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

      {/* === 华越广州办事处说明 ========================================= */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="rounded p-6 max-md:p-4 border-2 border-[#A21CAF]" style={{ background: "linear-gradient(135deg, #A21CAF08, #A21CAF02)" }}>
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-16 h-16 rounded-md flex items-center justify-center text-[30px] flex-shrink-0" style={{ background: "#A21CAF20" }}>
              🏪
            </div>
            <div className="flex-1">
              <span className="inline-block bg-[#A21CAF] text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm mb-2">
                CSR 创新
              </span>
              <h2 className="text-[20px] font-bold text-ink mb-2">华越广州办事处——合并发运节省 50-60%</h2>
              <p className="text-[13px] text-ink leading-relaxed mb-3">
                与其每件样品单独寄送（航空运费 $60-120/批），CSR 在广州运营华越广州办事处（位于海珠区，连接佛山和东莞产业带）。供应商在 24-48 小时内将样品送至该中心。每周，中心将<b>来自多位越南采购商的 8-15 件样品</b>合并为<b>1 个航空主运单</b>，通过 DHL/FedEx 寄往河内——各采购商<b>仅分摊 1 次 $80-150 的运费</b>。
              </p>
              <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
                <div className="bg-paper border border-line rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-[#A21CAF]">$60-120</div>
                  <div className="text-[11px] text-mute">单独寄送（每件）</div>
                </div>
                <div className="bg-paper border border-line rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-[#A21CAF]">$20-40</div>
                  <div className="text-[11px] text-mute">通过华越广州办事处（合并）</div>
                </div>
                <div className="bg-success/10 border border-success/30 rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-success">−60%</div>
                  <div className="text-[11px] text-success">平均节省</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === 3 sample types ================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">3 类样品</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">标准款 · 规格款 · OEM——按用途正确选择</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            每类的成本、交货时间和精确度各不相同。选错类型可能让您为一件不符合实际用途的样品花费 $300。
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {SAMPLE_TYPES.map((s) => (
            <article key={s.type} className="bg-paper border-2 rounded overflow-hidden flex flex-col" style={{ borderColor: s.color }}>
              <div className="px-5 py-4 text-white" style={{ background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}DD 100%)` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[28px]">{s.icon}</span>
                  <h3 className="text-[20px] font-extrabold">{s.type}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                  <div>
                    <div className="opacity-80">费用</div>
                    <b className="text-[14px]">{s.fee}</b>
                  </div>
                  <div>
                    <div className="opacity-80">交货时间</div>
                    <b className="text-[14px]">{s.leadtime}</b>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[12.5px] text-mute leading-relaxed mb-3">{s.desc}</p>
                <div className="bg-bg border border-line rounded p-2.5 mb-3">
                  <b className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1 block">适合</b>
                  <p className="text-[11.5px] text-ink leading-snug">{s.bestFor}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <b className="block text-success mb-1">✓ 优点</b>
                    <ul className="space-y-0.5 text-mute">
                      {s.pros.map((p, i) => <li key={i}>• {p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <b className="block text-accent mb-1">✕ 缺点</b>
                    <ul className="space-y-0.5 text-mute">
                      {s.cons.map((c, i) => <li key={i}>• {c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Cost breakdown table =========================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">透明费用</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">详细费用表——无隐藏费用</h2>
        </div>
        <div className="bg-paper border border-line rounded overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-bg border-b-2 border-brand">
                <th className="text-left px-4 py-3 font-bold text-ink">项目</th>
                <th className="text-left px-4 py-3 font-bold text-ink">费用</th>
                <th className="text-left px-4 py-3 font-bold text-ink max-md:hidden">备注</th>
              </tr>
            </thead>
            <tbody>
              {COST_TABLE.map((c, i) => (
                <tr key={i} className="border-b border-line hover:bg-bg/50">
                  <td className="px-4 py-2.5 text-ink font-semibold">{c.item}</td>
                  <td className="px-4 py-2.5 text-brand font-bold">{c.range}</td>
                  <td className="px-4 py-2.5 text-mute text-[12px] max-md:hidden">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11.5px] text-mute mt-3 italic text-center">
          💡 90 天内与同一供应商下达 ≥$5K 起订量时，全部产品费 + 打样费 100% 返还。运费不返还（已发生）。
        </p>
      </section>

      {/* === Pre-MOQ checklist ============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">起订量前检查清单</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">收到样品时需检查的 5 类项目</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            按此清单投入 1-2 小时仔细检查样品，可避免 90% 的起订量风险。可打印或保存为模板。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {PRE_MOQ_CHECKLIST.map((c) => (
            <article key={c.category} className="bg-paper border border-line rounded p-5">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-line">
                <div className="w-12 h-12 rounded-md bg-brand/10 border border-brand/30 flex items-center justify-center text-[24px] flex-shrink-0">
                  {c.icon}
                </div>
                <h3 className="text-[16px] font-bold text-ink">{c.category}</h3>
              </div>
              <ul className="space-y-2 text-[12.5px]">
                {c.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-ink leading-relaxed">
                    <input type="checkbox" className="mt-0.5 flex-shrink-0 cursor-pointer" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* === 样品订阅套餐 ============================================ */}
      <section id="sample-subscription" className="max-w-[1200px] mx-auto px-4 mt-12 scroll-mt-20">
        <div className="rounded overflow-hidden border-2 border-gold">
          <div className="px-6 py-5 text-brand-dark bg-gold">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-[36px]">♾</span>
                <div>
                  <span className="text-[10.5px] uppercase tracking-wider font-bold">高级用户计划</span>
                  <h2 className="text-[24px] font-extrabold leading-tight">样品订阅套餐</h2>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[36px] font-extrabold leading-none">$99</div>
                <div className="text-[12px]">/月——无需承诺</div>
              </div>
            </div>
          </div>
          <div className="p-6 max-md:p-4 bg-paper">
            <p className="text-[13px] text-ink leading-relaxed mb-4">
              适合每月 &gt;5 件样品的采购商（贸易商、设计工作室、采购代理、专业采购经销商）。固定支付 $99——每件样品仅付产品费，不付中心运费。ROI 通常从第 2 个月起即十分明显。
            </p>
            <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
              {SAMPLE_SUB_FEATURES.map((f) => (
                <div key={f.title} className="bg-bg border border-line rounded p-3 hover:border-gold transition">
                  <div className="text-[24px] mb-1.5">{f.icon}</div>
                  <b className="block text-[13px] text-ink mb-1 leading-tight">{f.title}</b>
                  <p className="text-[11.5px] text-mute leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href="mailto:sales@huayuesc.vn?subject=样品订购套餐咨询"
                className="inline-block px-6 py-3 bg-brand text-white rounded-sm font-bold text-[14px] hover:bg-brand-light"
              >
                🚀 订阅样品套餐
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === Common pitfalls ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-accent font-bold">⚠️ 请避免这些</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">下样品单时 6 个常见错误</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            汇总自 600 多位 CSR 采购商的反馈。避免这 6 点 = 平均每年节省 $1,200 及大量时间。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {PITFALLS.map((p) => (
            <div key={p.title} className="bg-paper border border-line rounded p-4 hover:border-accent transition">
              <div className="flex gap-3 items-start">
                <span className="text-[24px] flex-shrink-0">{p.icon}</span>
                <div className="flex-1">
                  <b className="block text-[13.5px] text-ink mb-1.5 leading-tight">{p.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{p.why}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === FAQ =========================================================== */}
      <section className="max-w-[900px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">常见问题</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">8 个最重要的问题</h2>
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
          <h3 className="text-[28px] font-extrabold mb-2 max-md:text-[22px]">今天就下您的第一笔样品单</h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[660px] mx-auto leading-relaxed">
            在 20 万+ SKU 目录中查找产品，点击“申请样品”——华越广州办事处合并运输，交货时间 8-12 天，下达起订量时 100% 返还费用。没有任何理由跳过这一步。
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              🔍 浏览 20 万+ 产品
            </Link>
            <Link
              href="/buying-request"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              📝 多供应商询价
            </Link>
            <a
              href="mailto:sales@huayuesc.vn"
              className="inline-block px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              💬 与客户经理一对一咨询
            </a>
          </div>
          <div className="mt-5 pt-5 border-t border-white/15 text-[11.5px] opacity-75 max-w-[680px] mx-auto leading-relaxed">
            样品 &lt;$200 依据 NĐ 134/2016 免征进口税 + 增值税。交易保障适用于所有样品。90 天内下达 ≥$5K 起订量时 100% 返还产品费 + 打样费。
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "样品订购 — 华越",
  description: "从中国供应商订购样品并寄往越南的 6 步流程。华越广州办事处合并发运节省 50-60% 运费，交货时间 8-12 天，下达起订量时 100% 返还费用。借助样品将投诉风险从 22% 降至 4%。",
};
