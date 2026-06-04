import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const HERO_STATS = [
  { n: "多数", l: "证据充分时投诉结果有利于采购商", icon: "⚖️" },
  { n: "<24h", l: "平均响应时间", icon: "⏱" },
  { n: "累计", l: "受华越保障的订单价值", icon: "🛡" },
  { n: "24/7", l: "紧急热线", icon: "📞" },
];

const COMPLAINT_TYPES = [
  {
    icon: "🎨",
    color: "#DC2626",
    title: "技术规格不符",
    desc: "交货不符合 PI/合同中约定的规格——尺寸、颜色、材质有误，认证（CE、FCC、RoHS）缺失或造假。",
    successRate: "94%",
    avgDays: "5",
    evidence: "仓库货品照片 · PO 规格 · 必要时提供实验室报告",
  },
  {
    icon: "📊",
    color: "#7C2D12",
    title: "品质不合格 / AQL 不达标",
    desc: "主要缺陷 + 次要缺陷率超过约定的 AQL 2.5。缺陷超出已确认产前样的容差范围。",
    successRate: "82%",
    avgDays: "9",
    evidence: "SGS/BV 报告 · 缺陷照片 · 对比样品 · 开箱视频",
  },
  {
    icon: "🔢",
    color: "#92400E",
    title: "数量短缺",
    desc: "实际清点数量少于 PO——且无事先通知。通常允许的容差为 ±2%（依据 Incoterms 2020）。",
    successRate: "96%",
    avgDays: "3",
    evidence: "装箱单 · 点货照片 · 集装箱卸货视频 · 仓库记录",
  },
  {
    icon: "⏰",
    color: "#1E3A8A",
    title: "交货延迟",
    desc: "供应商未在 PO 约定期限内交货，且无有效的不可抗力理由通知。通常容差为 14 天。",
    successRate: "78%",
    avgDays: "7",
    evidence: "PO 期限日期 · 邮件/聊天证据 · 损失记录（若有终端客户取消）",
  },
  {
    icon: "📦",
    color: "#0E7490",
    title: "包装不当导致损坏",
    desc: "因供应商包装不符合标准导致损坏——纸箱受潮、无托盘、易碎品无护角、无气泡膜等。",
    successRate: "85%",
    avgDays: "11",
    evidence: "卸货时纸箱状态照片 · 港口记录 · 与包装规格对比",
  },
  {
    icon: "🚢",
    color: "#0369A1",
    title: "运输途中损坏",
    desc: "因自然灾害、碰撞、火灾、船舶沉没等运输途中造成的损失——非供应商责任。通过海运保险处理，不走交易保障。",
    successRate: "91%",
    avgDays: "21",
    evidence: "提单 · 船公司记录 · 损失照片 · 保险公估报告",
  },
  {
    icon: "🚨",
    color: "#9F1239",
    title: "欺诈 / 诈骗",
    desc: "供应商收款后不生产、失联，或交付假冒品牌货品。最严重的情形——立即上报升级。",
    successRate: "100%",
    avgDays: "5",
    evidence: "全部沟通记录 · 付款追踪 · 天眼查供应商报告",
  },
  {
    icon: "©",
    color: "#581C87",
    title: "侵犯知识产权 / 抄袭",
    desc: "交付货品侵犯第三方商标、外观专利、著作权——采购商进口时存在法律风险。高优先级处理。",
    successRate: "89%",
    avgDays: "15",
    evidence: "知识产权原始文件 · 侵权货品照片 · 海关通知（若有）",
  },
];

const ESCALATION_TIERS = [
  {
    tier: "1",
    label: "直接对话",
    color: "#16A34A",
    duration: "0-3 天",
    bgRate: "62%",
    description: "采购商在控制台发起争议，供应商在 1 小时内收到通知。双方通过 CSR 聊天（配备翻译）直接协商，寻求自愿解决方案。约 62% 的案件在此层级结案——供应商承认问题并提出解决方案（折扣、补发货、部分退款）。",
    actions: [
      "采购商发起争议并附上证据",
      "供应商在 24-48 小时内响应",
      "对话过程由华越广州团队跟进",
      "达成协议 → 关闭争议",
    ],
  },
  {
    tier: "2",
    label: "华越调解",
    color: "#005F6B",
    duration: "3-14 天",
    bgRate: "31%",
    description: "若第 1 层级在 5 天内未达成协议，争议升级至第 2 层级——由华越争议专员（持有依据越南 NĐ 22/2017 号商事调解证书）接手。专员审查证据，组织采购商-供应商-CSR 三方通话，依据服务条款作出具约束力的裁决。",
    actions: [
      "争议专员审查案件 2-3 天",
      "三方通话 60-90 分钟（配备同声传译）",
      "CSR 依据证据 + 条款作出裁决",
      "执行：通过担保账户退款/换货/抵扣额度",
    ],
  },
  {
    tier: "3",
    label: "VIAC / CIETAC 仲裁",
    color: "#A21CAF",
    duration: "60-180 天",
    bgRate: "7%",
    description: "若一方不接受第 2 层级裁决，有权提交正式仲裁——按 PI 中约定的条款，越南法律适用 VIAC（越南国际仲裁中心），中国法律适用 CIETAC（中国国际经济贸易仲裁委员会）。仲裁裁决具有国际执行效力（1958 年纽约公约）。",
    actions: [
      "提交仲裁申请 + 费用约 $2,000-8,000",
      "指定 1-3 名仲裁员组成仲裁庭",
      "线上或在仲裁机构总部开庭审理",
      "裁决具约束力，依据纽约公约国际执行",
    ],
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "发现问题",
    deadline: "收货后 7 天内",
    desc: "采购商在自有仓库验货（不在港口——须在卸货并完成布置后）。7 天验货期是交易保障条款中公开的标准——此后系统自动确认且担保账户放款。",
    tips: [
      "货值 < $10K 时 100% 全检，> $10K 时抽检 32 件（依据 AQL 2.5）",
      "拍摄外箱开箱 + 内部产品视频，至少 90 秒",
      "随机测量 5 件尺寸，与 PO 规格对比",
    ],
  },
  {
    n: "02",
    title: "收集证据",
    deadline: "发现问题后 24 小时内",
    desc: "证据越详尽，争议越快得到有利处理。投入 2-4 小时准备充分证据，通常可将胜诉率从约 60% 提升至 90% 以上。",
    tips: [
      "8 张以上多角度照片，重点拍摄缺陷特写",
      "60-180 秒连续拍摄视频，不剪辑",
      "PO 规格与实物对比表（Excel/PDF）",
      "强烈建议：> $20K 订单提供第三方验货报告（SGS/BV）",
    ],
  },
  {
    n: "03",
    title: "在华越控制台发起争议",
    deadline: "7 天内",
    desc: "登录 /buyer-center/orders，选择订单 → “发起投诉” → 上传全部证据。系统立即自动冻结担保账户——供应商在争议解决前无法收款。",
    tips: [
      "选择正确的类别（规格不符 / 品质 / 数量 等）",
      "清晰描述问题，不带情绪——只陈述事实",
      "明确写出期望的解决方案（退款 X% / 换货 / 抵扣额度）",
    ],
  },
  {
    n: "04",
    title: "供应商响应",
    deadline: "供应商有 48 小时",
    desc: "供应商收到通知（邮件 + 微信/钉钉），须在 48 个工作小时内响应。不响应 = 丧失自我抗辩权，争议自动升级至第 2 层级，并推定为供应商责任。",
    tips: [
      "供应商承认问题 → 第 1 层级直接协商",
      "供应商否认 → 72 小时内上传反驳证据",
      "采购商可要求三方视频通话（配备翻译）",
    ],
  },
  {
    n: "05",
    title: "直接对话（第 1 层级）",
    deadline: "5 天",
    desc: "双方通过有调度员跟进的 CSR 聊天协商。约 62% 案件在此达成协议。常见方案：退款 15-50% + 保留货品、退款 100% + 退货、免费补发货、抵扣后续订单额度。",
    tips: [
      "提供至少 2 种方案供供应商选择",
      "在华越上以书面形式记录协议（自动具约束力）",
      "不要在系统外进行私下协议——无法律保护",
    ],
  },
  {
    n: "06",
    title: "华越调解（第 2 层级）",
    deadline: "14 天",
    desc: "若第 1 层级失败，由华越争议专员（持 NĐ 22/2017 号调解证书）接手。审查证据 2-3 天，组织三方通话 60-90 分钟，依据证据 + 服务条款作出裁决。裁决通过已签署条款对双方均具约束力。",
    tips: [
      "裁决依据：PO 规格、证据质量、供应商历史记录、AQL 标准",
      "供应商不执行 → 暂停账户 + 没收保证金",
      "采购商在裁决生效前有 5 天上诉期",
    ],
  },
  {
    n: "07",
    title: "执行并关闭争议",
    deadline: "5-10 天",
    desc: "裁决得到执行：退款通过担保账户退回采购商账户，换货免费寄出并享 QC 优先，或抵扣额度计入 CSR 钱包用于后续订单。违约供应商被扣减评分和保证金。",
    tips: [
      "退款在 5-10 个工作日内退回原账户",
      "换货免费快递寄出，并经出厂前 QC",
      "抵扣额度 12 个月内有效，适用于华越上所有供应商",
    ],
  },
];

const OUTCOMES = [
  { icon: "💰", title: "全额退款 100%", pct: "38%", desc: "通过担保账户全额退还订单价值。适用于欺诈、严重规格不符、供应商不交货等情形。" },
  { icon: "📊", title: "部分退款", pct: "27%", desc: "视程度退款 15-70%。采购商保留货品，适用于不严重但可降价销售的瑕疵。" },
  { icon: "🔄", title: "换货", pct: "19%", desc: "供应商免费补发货并享 QC 优先。适用于采购商需要符合规格货品以供应终端客户的情形。" },
  { icon: "🎟", title: "抵扣额度 / 代金券", pct: "11%", desc: "抵扣额度计入 CSR 钱包用于后续订单，通常为损失价值的 100-150% 以留住采购商。" },
  { icon: "⚖️", title: "仲裁", pct: "5%", desc: "未达成协议的大额争议提交 VIAC / CIETAC。裁决具国际约束力。" },
];

const CASE_STUDIES = [
  {
    title: "$42K 木制家具订单——木纹不符",
    industry: "家具",
    days: "11 天",
    outcome: "退款 35% + 保留货品",
    detail: "河内采购商订购 220 件橱柜，佛山供应商交货尺寸正确，但“深胡桃木”木纹比已确认样品偏浅。采购商提交 24 张照片 + Pantone 对比表发起争议。供应商起初否认（“天然木纹存在色差”）。第 2 层级调解审查 CSR 存档的批次样品——确认色差超出容差。裁决退款 35% 货值，采购商保留货品以较低价格转售给二级经销商。",
  },
  {
    title: "$18K LED 灯具订单——12% 灯不亮",
    industry: "电子产品",
    days: "7 天",
    outcome: "免费换货 + 赔偿",
    detail: "胡志明市采购商订购 1,200 个 LED 面板灯，随机抽检 100 个发现 12% 不亮（缺陷率超过 AQL 2.5）。SGS 报告确认为电路缺陷。第 1 层级：供应商立即承认，免费快递补发 150 个灯 + 后续 $500 代金券。7 天内关闭争议——无需升级至第 2 层级。",
  },
  {
    title: "$76K 卫浴订单——供应商违约",
    industry: "卫浴",
    days: "21 天",
    outcome: "全额退款 100%",
    detail: "海防采购商订购 380 个佛山马桶。收取 30% 定金后，供应商停止响应 14 天，天眼查显示该供应商进入破产预警名单。CSR 立即上报升级，查封担保账户，供应商 5 天未响应后第 2 层级调解自动触发。通过越南合作银行在 14 个工作日内全额退款 100%。供应商被永久暂停 CSR 资格。",
  },
  {
    title: "$135K 纺织订单——侵犯知识产权",
    industry: "纺织",
    days: "28 天",
    outcome: "全额退款 100% + 法律费用赔偿",
    detail: "岘港采购商订购 5,000 件衬衫。货物抵达仙沙港时，海关因检测到标志与已注册马德里协定的品牌高度相似而扣留货物。供应商起初否认，但第 3 层级 VIAC 仲裁在 28 天内审结，判令供应商全额退款 100% + 赔偿 $14K 海关仓储费及法律费用。裁决通过纽约公约在中国执行。",
  },
];

const EMERGENCY_CHANNELS = [
  { icon: "🚨", title: "24/7 紧急热线", value: "+86 181-2225-6999", desc: "适用于欺诈、侵犯知识产权、海关扣货——立即来电，30 分钟内响应" },
  { icon: "💬", title: "争议在线客服", value: "dashboard /buyer-center", desc: "在订单上点击“发起投诉”——直接与争议专员对话" },
  { icon: "✉", title: "争议团队邮箱", value: "dispute@huayuesc.vn", desc: "提交复杂案件并附上证据——工作时间内 2 小时内响应" },
  { icon: "📱", title: "WhatsApp / Zalo", value: "+84 +86 181-2225-6999", desc: "适用于网络不稳定的偏远地区采购商，由升级经理负责" },
];

const FAQ = [
  {
    q: "我收货已经 10 天才发现问题——还能提起投诉吗？",
    a: "正式验货期为收货后 7 天。7 天后，担保账户自动放款，通过交易保障提起投诉的权利失效。但若属于隐蔽缺陷（例如机器运行 30 天后才因材料不良损坏），您仍可在 30 天内发起争议——不过举证责任更高，需提供独立实验室报告证明系供应商责任。超过 30 天：只能依据越南《商法 2005》提交 VIAC 仲裁（依据第 318 条，投诉时效为 6 个月）。",
  },
  {
    q: "投诉费用是多少？",
    a: "第 1 层级（直接对话）和第 2 层级（CSR 调解）——对采购商完全免费。CSR 将争议处理系统作为交易保障的一部分进行投入。第 3 层级（VIAC 河内仲裁）——仲裁费用 $2,000-8,000，视争议金额而定，通常由败诉方承担。若采购商胜诉，CSR 为第 3 层级提供法律费用支持——不额外收费。",
  },
  {
    q: "我需要聘请律师吗？",
    a: "并非必须。第 1 层级和第 2 层级只需采购商与华越争议专员直接对接——他们持有依据 NĐ 22/2017 号的商事调解证书，并已处理数千起案件。第 3 层级（VIAC）则建议 > $50K 订单聘请律师——CSR 备有为客户提供优惠费率的合作律所名单（Baker McKenzie、YKVN、VILAF 等——费率 $200-450/小时）。",
  },
  {
    q: "供应商已交货 5 天，但我需要更多时间验货（仓库在偏远省份，货未到）——如何延期？",
    a: "在 /buyer-center/orders 控制台选择订单 → “申请延长验货期”。系统允许免费自动延长至累计 21 天（7 + 14 天额外天数）——只需正当理由（仓库偏远、出差中、春节假期）。供应商收到延期通知，但无否决权。21 天后即截止，担保账户自动放款。",
  },
  {
    q: "若裁决对我不利，我有权上诉吗？",
    a: "有。第 2 层级裁决（华越调解）在生效执行前有 5 天上诉期。采购商可附上新证据或新法律论点提交上诉——由（级别更高的）高级争议专员重新审查 7-10 天。若仍不同意，采购商有权提交第 3 层级——按 PI 中条款提交 VIAC 河内仲裁。仲裁裁决为终局，不可上诉（依据《商事仲裁法 2010》）。",
  },
  {
    q: "我担心发起争议后供应商报复（将我列入黑名单、抬高后续订单价格……）",
    a: "CSR 服务条款绝对禁止报复行为。供应商若被发现对曾发起争议（且裁决已生效）的采购商抬价或拒单，将立即被暂停 90 天 + 冻结 25% 保证金。采购商可通过 dispute@huayuesc.vn 举报报复行为——CSR 将独立调查处理。实际上，报复极为罕见，因为供应商担心失去“已认证”等级。",
  },
  {
    q: "投诉会影响我作为采购商的评分吗？",
    a: "不会。CSR 仅依据争议历史追踪供应商评分，不会依据采购商是否发起争议来追踪其评分。鼓励采购商在确有问题时发起争议——这正是系统自我完善的方式。但若采购商提起虚假投诉（不实主张），其评分可能被下调并失去访问高级供应商的权限。",
  },
  {
    q: "特殊情形：货物为违禁品或违反越南法律——如何处理？",
    a: "若货物违反 NĐ 69/2018 号（禁止进口）、《食品安全法》或专业领域法规（药品、危险化学品检疫等）：海关扣货，CSR 立即升级至第 3 层级 VIAC 仲裁 + 向海关总局报告。采购商获全额退款 100% + 法律费用赔偿。供应商被永久暂停平台资格并列入公开黑名单 trustpage.huayuesc.vn。",
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

export default function KhieuNaiPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "首页", href: "/" },
          { label: "信息", href: "/help" },
          { label: "投诉与争议" },
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
            ⚖️ 投诉与争议
          </span>
          <h1 className="text-[40px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            当一切不按计划进行时<br />
            <span className="text-gold">华越始终站在您这边</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[780px] leading-relaxed mb-7 max-md:text-[13px]">
            三级争议解决体系——从直接对话，到依据 NĐ 22/2017 号的华越调解，再到依据 1958 年纽约公约的 VIAC 河内国际仲裁。越南采购商受法律保护，而非空头承诺。证据充分时，多数案件以有利于采购商的结果收场。
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} {...s} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <a
              href="#mo-disputes"
              className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              📝 立即发起投诉
            </a>
            <a
              href="tel:19006688"
              className="px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              🚨 紧急热线 +86 181-2225-6999
            </a>
          </div>
        </div>
      </section>

      {/* === When to file =================================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-7">
        <div className="bg-paper border-l-4 border-gold rounded-r p-5">
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-[26px] flex-shrink-0">
              ⏰
            </div>
            <div className="flex-1">
              <h2 className="text-[18px] font-bold text-ink mb-2">验货期——收货后 7 天</h2>
              <p className="text-[13px] text-mute leading-relaxed mb-3">
                这是采购商有权通过交易保障免费验货并提起投诉的期间。7 天后，担保账户自动向供应商放款，投诉权转入更高举证标准模式（隐蔽缺陷 30 天，或依据《商法 2005》仲裁——时效 6 个月）。
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-[12px] max-md:grid-cols-1">
                <div className="bg-success/10 border border-success/30 rounded-sm p-3">
                  <div className="font-bold text-success">0-7 天</div>
                  <div className="text-mute">交易保障 · 免费 · 多数有利于采购商</div>
                </div>
                <div className="bg-gold/10 border border-gold/30 rounded-sm p-3">
                  <div className="font-bold text-[#9C6A1F]">8-30 天</div>
                  <div className="text-mute">隐蔽缺陷 · 需实验室报告 · 胜诉率 71%</div>
                </div>
                <div className="bg-mute/10 border border-mute2/30 rounded-sm p-3">
                  <div className="font-bold text-mute">31 天 - 6 个月</div>
                  <div className="text-mute">VIAC 仲裁 · 费用 $2-8K · 胜诉率 54%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Complaint types ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">8 类投诉</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">投诉分类——每类各有专属流程</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            胜诉率、解决时长和所需证据因类别而异。发起争议时选择正确类别可将处理速度提升 30-40%。
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {COMPLAINT_TYPES.map((t) => (
            <article key={t.title} className="bg-paper border border-line rounded overflow-hidden hover:border-brand hover:shadow-md transition flex flex-col">
              <div className="px-4 pt-3 pb-2 border-b border-line" style={{ background: `linear-gradient(135deg, ${t.color}10, ${t.color}03)` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[26px]">{t.icon}</span>
                  <span className="text-[10.5px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: t.color, color: "#fff" }}>
                    {t.successRate} 胜诉
                  </span>
                </div>
                <b className="block text-[14px] font-bold text-ink leading-tight">{t.title}</b>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[12px] text-mute leading-relaxed mb-3 flex-1">{t.desc}</p>
                <div className="text-[11px] space-y-1 border-t border-line pt-2.5">
                  <div className="flex justify-between"><span className="text-mute">⏱ 平均解决时长</span><b className="text-ink">{t.avgDays} 天</b></div>
                  <div className="text-mute pt-1">📎 <span className="text-ink">{t.evidence}</span></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === 3-tier escalation =============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">3 级解决体系</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">升级体系——层级越高越正式</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            每起案件都从第 1 层级（直接对话）开始。仅在未达成协议时才升级至更高层级。原则：先快速、低成本、自愿协商，后走正式程序。
          </p>
        </div>
        <div className="space-y-4">
          {ESCALATION_TIERS.map((t) => (
            <div key={t.tier} className="bg-paper border-l-4 rounded-r p-5 max-md:p-4" style={{ borderColor: t.color }}>
              <div className="flex items-start gap-4 max-md:flex-col">
                <div className="w-16 h-16 rounded flex items-center justify-center font-extrabold text-[32px] flex-shrink-0 text-white shadow-md" style={{ backgroundColor: t.color }}>
                  {t.tier}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <div>
                      <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: t.color }}>第 {t.tier} 层级</span>
                      <h3 className="text-[20px] font-bold text-ink leading-tight">{t.label}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-[10px] text-mute uppercase">时长</div>
                        <b className="text-[14px] text-ink">{t.duration}</b>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-mute uppercase">本层级处理案件占比</div>
                        <b className="text-[18px] font-extrabold" style={{ color: t.color }}>{t.bgRate}</b>
                      </div>
                    </div>
                  </div>
                  <p className="text-[13px] text-mute leading-relaxed mb-3">{t.description}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] max-md:grid-cols-1">
                    {t.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span style={{ color: t.color }} className="flex-shrink-0">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section id="mo-disputes" className="max-w-[1200px] mx-auto px-4 mt-12 scroll-mt-20">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">7 步流程</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">从发现问题到关闭争议</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            简单案件整个流程平均 3.2 天内结案，需第 2 层级调解的复杂案件为 11-21 天。
          </p>
        </div>
        <div className="space-y-3">
          {PROCESS_STEPS.map((s, idx) => (
            <article key={s.n} className="bg-paper border border-line rounded p-5 max-md:p-4 flex gap-4 max-md:flex-col">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[16px] shadow-md">
                  {s.n}
                </div>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="flex-1 w-0.5 bg-line mt-2 min-h-[20px] max-md:hidden" aria-hidden="true" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <h3 className="text-[16px] font-bold text-ink">{s.title}</h3>
                  <span className="text-[10.5px] bg-accent/15 text-accent px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                    🕒 {s.deadline}
                  </span>
                </div>
                <p className="text-[13px] text-mute leading-relaxed mb-3">{s.desc}</p>
                <div className="bg-bg border border-line rounded p-3">
                  <b className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5 block">💡 重要提示</b>
                  <ul className="space-y-1 text-[12px]">
                    {s.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span className="text-brand flex-shrink-0">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Outcomes distribution ========================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">可能的结果</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">2025 年争议结果分布</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            数据来自华越已解决的争议——证据充分时，多数以各种形式有利于采购商。
          </p>
        </div>
        <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {OUTCOMES.map((o) => (
            <div key={o.title} className="bg-paper border border-line rounded p-4 hover:border-brand transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[28px]">{o.icon}</span>
                <span className="text-[20px] font-extrabold text-brand">{o.pct}</span>
              </div>
              <b className="block text-[14px] text-ink mb-2 leading-tight">{o.title}</b>
              <p className="text-[11.5px] text-mute leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Case studies =================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">典型案例</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">4 个真实案例（已匿名处理）</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            选自已关闭的争议——代表越南采购商最常遇到的 4 类情形。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {CASE_STUDIES.map((c) => (
            <article key={c.title} className="bg-paper border border-line rounded p-5">
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <div>
                  <span className="inline-block text-[10px] uppercase tracking-wider font-bold bg-bg border border-line px-2 py-0.5 rounded-sm text-mute mb-1">
                    {c.industry}
                  </span>
                  <h3 className="text-[15px] font-bold text-ink leading-tight">{c.title}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3 text-[12px]">
                <div className="bg-bg border border-line rounded p-2">
                  <div className="text-mute uppercase tracking-wider text-[10px]">⏱ 时长</div>
                  <b className="text-ink">{c.days}</b>
                </div>
                <div className="bg-success/10 border border-success/30 rounded p-2">
                  <div className="text-success uppercase tracking-wider text-[10px]">✓ 结果</div>
                  <b className="text-success">{c.outcome}</b>
                </div>
              </div>
              <p className="text-[12.5px] text-ink leading-relaxed">{c.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* === Emergency channels ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="rounded p-5 max-md:p-4 border-2 border-accent" style={{ background: "linear-gradient(135deg, #DC262610, #DC262603)" }}>
          <div className="flex items-start gap-4 mb-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-[26px] text-white flex-shrink-0 animate-pulse">
              🚨
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-ink mb-1">紧急情形——请立即联系</h2>
              <p className="text-[13px] text-mute leading-relaxed">
                适用于欺诈、严重侵犯知识产权、海关扣货、供应商失联——不必等待自动流程，立即 24/7 来电/在线沟通，由高级争议专员优先处理。
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            {EMERGENCY_CHANNELS.map((c) => (
              <div key={c.title} className="bg-paper border border-line rounded p-3.5">
                <div className="text-[24px] mb-1.5">{c.icon}</div>
                <b className="block text-[13px] text-ink mb-1">{c.title}</b>
                <div className="text-[12.5px] text-accent font-bold mb-1.5 break-all">{c.value}</div>
                <p className="text-[11px] text-mute leading-snug">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Legal references =============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="bg-paper border border-line rounded p-5">
          <h2 className="text-[18px] font-bold text-ink mb-3">📚 法律依据——参考</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 text-[12.5px]">
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">越南法律</b>
              <ul className="space-y-1.5 text-mute">
                <li>• 《商法 2005》——第 318 条（投诉时效）</li>
                <li>• 《商事仲裁法 2010》</li>
                <li>• NĐ 22/2017/NĐ-CP 号关于商事调解的法令</li>
                <li>• 《民法典 2015》——合同制度</li>
                <li>• NĐ 13/2023/NĐ-CP 号——个人数据保护</li>
              </ul>
            </div>
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">国际</b>
              <ul className="space-y-1.5 text-mute">
                <li>• 1958 年纽约公约——仲裁裁决的执行</li>
                <li>• UNCITRAL 国际商事仲裁示范法</li>
                <li>• ICC 仲裁规则 2021</li>
                <li>• Incoterms 2020（ICC）——责任划分</li>
                <li>• CISG 1980——国际货物销售合同</li>
              </ul>
            </div>
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">仲裁机构</b>
              <ul className="space-y-1.5 text-mute">
                <li>• <b className="text-ink">VIAC</b> — 越南国际仲裁中心（河内 + 胡志明市）</li>
                <li>• <b className="text-ink">CIETAC</b> — 中国国际经济贸易仲裁委员会（北京）</li>
                <li>• <b className="text-ink">SIAC</b> — 新加坡国际仲裁中心（适用于东盟案件）</li>
                <li>• <b className="text-ink">HKIAC</b> — 香港国际仲裁中心</li>
              </ul>
            </div>
          </div>
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
          <h3 className="text-[28px] font-extrabold mb-2 max-md:text-[22px]">现在就要发起投诉？</h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[660px] mx-auto leading-relaxed">
            登录采购商控制台，选择需投诉的订单，点击“发起投诉”。系统自动冻结担保账户并启动7步流程。情形严重时也可拨打24/7紧急热线。
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/buyer-center/orders"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              📝 前往采购商控制台
            </Link>
            <a
              href="mailto:dispute@huayuesc.vn"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              ✉ dispute@huayuesc.vn
            </a>
            <a
              href="tel:19006688"
              className="inline-block px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              🚨 +86 181-2225-6999 — 24/7
            </a>
          </div>
          <div className="mt-5 pt-5 border-t border-white/15 text-[11.5px] opacity-75 max-w-[680px] mx-auto leading-relaxed">
            第1层级（对话）和第2层级（华越调解）完全免费。第3层级（VIAC河内仲裁）费用$2,000-8,000——按裁决由败诉方承担。CSR将争议处理系统作为交易保障的核心组成部分进行投入，不额外收费。
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "投诉与争议 — 华越争议解决",
  description: "三级争议解决体系：直接对话、依据 NĐ 22/2017 号的华越调解、依据 1958 年纽约公约的 VIAC 河内仲裁。证据充分时，多数案件以有利于采购商的结果收场，平均 3.2 天解决。24/7 热线：+86 181-2225-6999。",
};
