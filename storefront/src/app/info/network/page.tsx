import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { COMPANY } from "@/data/company";

// ─── DATA ────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { n: "63", l: "越南省市", icon: "🇻🇳" },
  { n: "3", l: "中国主力集群", icon: "🇨🇳" },
  { n: "4", l: "分销合作伙伴类型", icon: "🤝" },
  { n: "2", l: "运营办公室", icon: "🏢" },
];

const DISTRIBUTION_PARTNERS = [
  {
    icon: "🏪",
    color: "#005F6B",
    title: "建材分销经销商",
    summary: "连锁门店、瓷砖展厅、材料仓",
    desc: "各省市的瓷砖、卫浴、铺贴石材、油漆、地板经销商。",
    benefits: [
      "送货入仓 DDP 价",
      "按原厂质保",
      "经河内团队支持退换货",
      "越南语目录与样品",
    ],
  },
  {
    icon: "🏗",
    color: "#9C6A1F",
    title: "建筑承包商",
    summary: "建筑公司、房地产承包商、保障性住房",
    desc: "按项目报价，按施工进度交货，≥30 套订单免费提供样品。",
    benefits: [
      "整包项目报价",
      "按施工进度分批交货",
      "≥30 套订单免费样品",
      "经华越质保 + 退换货",
    ],
  },
  {
    icon: "🎨",
    color: "#7C2D12",
    title: "室内设计公司",
    summary: "设计工作室、室内设计",
    desc: "越南语目录 + 为下单 ≥30 套的 VIP 客户免费提供 3D 效果图。",
    benefits: [
      "中国品牌越南语目录",
      "真实木材/石材/面料样品",
      "为 VIP 客户免费提供 3D 效果图",
      "整包项目优惠折扣",
    ],
  },
  {
    icon: "🔌",
    color: "#7C3AED",
    title: "家电与厨房设备经销商",
    summary: "家电连锁、区域经销商",
    desc: "电热水器、燃气灶、抽油烟机、智能马桶盖。",
    benefits: [
      "区域独家经销合同",
      "中国原厂质保",
      "终端门店营销支持",
      "进货价优于自行进口的分销商",
    ],
  },
];

const CN_CLUSTERS = [
  {
    province: "广东",
    provinceCn: "广东省",
    color: "#C8102E",
    weight: "主力集群",
    cities: [
      { name: "佛山", spec: "陶瓷、卫浴、瓷砖——1,200+ 家工厂" },
      { name: "乐从 / 顺德", spec: "沙发、木质家具——中国最大家具市场" },
      { name: "东莞", spec: "橱柜、衣柜、高端 MDF" },
      { name: "中山", spec: "LED 灯、家电" },
      { name: "潮州", spec: "装饰墙地砖" },
    ],
  },
  {
    province: "福建",
    provinceCn: "福建省",
    color: "#0E7490",
    weight: "辅助集群",
    cities: [
      { name: "晋江", spec: "天然石材、强化地板" },
      { name: "厦门", spec: "进口木材加工" },
    ],
  },
  {
    province: "山东及其他",
    provinceCn: "山东省",
    color: "#475569",
    weight: "补充",
    cities: [
      { name: "永康", spec: "机械、五金" },
      { name: "秦皇岛", spec: "建筑玻璃" },
      { name: "美的（中山）", spec: "高端家电" },
    ],
  },
];

const PARTNERSHIP_MECHANISMS = [
  {
    icon: "📚",
    title: "中越双语目录",
    desc: "华越将中国品牌目录翻译并出版为越南语版，供经销商印刷/分享给客户。",
  },
  {
    icon: "🎤",
    title: "新品发布会",
    desc: "每年在河内和胡志明市举办，邀请中国品牌发布新品，直接对接房地产 / 承包商 / 设计公司。",
  },
  {
    icon: "💡",
    title: "专题论坛",
    desc: "环保建材、家电技术、瓷砖新工艺——与两国专家交流。",
  },
  {
    icon: "📢",
    title: "线上 + 线下传播",
    desc: "在越南行业媒体、Facebook/Zalo、线下活动开展中国品牌推广活动——让品牌触达本地采购商。",
  },
  {
    icon: "✈",
    title: "中国工厂参观团",
    desc: "越南采购团每年赴厂参观 2-4 次：广交会（4 月和 10 月）、CIFF（3 月和 9 月）、佛山陶瓷展（4 月和 10 月）。华越提供一站式组织。",
  },
];

const TRADE_FAIRS = [
  { month: "3月", name: "CIFF 广州", desc: "中国国际家具博览会——家具行业", color: "#005F6B" },
  { month: "4月", name: "广交会第 1-3 期", desc: "中国最大 B2B 展会", color: "#C8102E" },
  { month: "4月", name: "佛山陶瓷展", desc: "瓷砖与卫浴专业展", color: "#9C6A1F" },
  { month: "6月", name: "VIETBUILD 胡志明市", desc: "越南建材展——华越邀请中国工厂参展团", color: "#7C3AED" },
  { month: "9月", name: "CIFF 上海", desc: "CIFF 第 2 场——规模大于广州", color: "#005F6B" },
  { month: "10月", name: "广交会秋季", desc: "秋季展——品类丰富", color: "#C8102E" },
  { month: "10月", name: "佛山陶瓷秋季展", desc: "秋季展——陶瓷新品系列", color: "#9C6A1F" },
  { month: "11月", name: "VIETBUILD 河内", desc: "北部场", color: "#7C3AED" },
];

const BUYER_BENEFITS = [
  { icon: "💰", title: "源头真实价", desc: "不经中间商之手，无暗中加价，有来自工厂的审计留痕。" },
  { icon: "✅", title: "源头品质把控", desc: "华越广州 QC 团队出厂前按 AQL 2.5 验货。" },
  { icon: "🚛", title: "全程 DDP 运抵越南", desc: "含物流 + 清关 + 税费 + 送货入仓。无需操心订舱、海关。" },
  { icon: "🇻🇳", title: "越南语支持", desc: "全程经河内团队沟通——无需懂中文。" },
  { icon: "🎁", title: "免费样品与 3D", desc: "面向 ≥30 套订单——先投入以敲定正确款式。" },
  { icon: "📊", title: "市场更新", desc: "每月工厂价格报告、CNY/VND 汇率、新税收政策。" },
];

const FAQS = [
  {
    q: "我想成为华越在本省的分销经销商——流程如何？",
    a: "发邮件至 partnership@huayuesc.vn 并附：营业执照、现有展厅/仓库信息、正在分销的行业（建材 / 家具 / 家电）、覆盖区域。华越河内团队将在 5 个工作日内电话联系，必要时上门拜访。核实后签订经销合同——无会员费，仅按销售额分成佣金。",
  },
  {
    q: "我是建筑承包商——华越能为我的项目提供什么支持？",
    a: "华越为建材与室内装饰（瓷砖、卫浴、铺贴石材、油漆、地板）提供送货到工地的 DDP 报价。支持：≥30 套订单免费提供样品、按施工进度交货、按原厂质保 + 如有瑕疵华越负责退换货。请联系 sales@huayuesc.vn 或 +86 181-2225-6999。",
  },
  {
    q: "我是室内设计公司——能为我的 VIP 客户提供优惠吗？",
    a: "可以。华越为设计公司提供合作套餐：中国品牌的越南语目录、木材/石材/面料样品、为高端客户免费提供 3D 效果图（≥30 套订单）、整包项目的优惠折扣。",
  },
  {
    q: "我想赴华参观工厂——华越组团吗？",
    a: "组团。华越组织越南采购团赴广交会（4 月和 10 月）、CIFF 广州（3 月和 9 月）、佛山陶瓷展（4 月和 10 月）。每团 10-25 名采购商，配专业翻译，由华越广州采购团队接待。行前预约与工厂的商务对接。请联系 partnership@huayuesc.vn。",
  },
  {
    q: "为什么我该通过华越采购，而不是自己赴华或通过中间商？",
    a: "自己赴华：要懂中文、熟悉市场、与工厂有关系、操心物流 + 清关。通过中间商：无法在源头把控品质、易被暗中加价、缺乏清晰法律保障。华越：越南注册法人主体（税号 0111453693），出厂前在工厂验货，DDP 送货入仓，7×24 越南语支持，有交易保障——货物若不符承诺即可退款。",
  },
];

// ─── PAGE ────────────────────────────────────────────────────────────────

export default function NetworkPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "首页", href: "/" },
          { label: "信息", href: "/help" },
          { label: "合作伙伴网络" },
        ]}
      />

      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #003A42 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-12 max-md:py-8 grid grid-cols-[auto_1fr] gap-8 items-center max-md:grid-cols-1 max-md:gap-4">
          <div className="w-24 h-24 rounded-2xl bg-gold/20 border-2 border-gold flex items-center justify-center text-[52px] flex-shrink-0 max-md:w-16 max-md:h-16 max-md:text-[36px]">
            🤝
          </div>
          <div>
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">
              合作伙伴网络
            </span>
            <h1 className="text-[34px] font-extrabold leading-tight mb-3 max-md:text-[22px]">
              合作伙伴网络——越南分销 &amp; 中国工厂
            </h1>
            <p className="text-[14.5px] opacity-90 leading-relaxed max-w-[820px] max-md:text-[13px]">
              华越的供应链建立在两张相辅相成的网络之上：
              <b className="text-gold">遍布越南 63 省市的分销合作伙伴</b>（出口端）与{" "}
              <b className="text-gold">中国制造集群的顶尖工厂</b>（进口端）。
              这正是华越按宣传册落实
              <i> 本地化分销渠道拓展</i>与<i>源头精选</i>服务的方式。
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/15">
          <div className="max-w-[1200px] mx-auto px-4 py-4 grid grid-cols-4 gap-3 max-md:grid-cols-2 max-md:py-3">
            {HERO_STATS.map((s) => (
              <div key={s.l} className="text-center border-r border-white/15 last:border-r-0 max-md:border-r-0 max-md:py-1.5">
                <div className="text-[20px] mb-0.5">{s.icon}</div>
                <b className="block text-[22px] text-gold leading-none max-md:text-[18px]">{s.n}</b>
                <small className="text-[11px] opacity-80 uppercase tracking-wider">{s.l}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TWO NETWORKS DIAGRAM ═══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-8 max-md:mt-5">
        <div className="text-center mb-6">
          <h2 className="text-[24px] font-bold text-ink mb-1.5 max-md:text-[20px]">
            两张网络——一条供应链
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            甄选的中国工厂 ⇄ 越南分销合作伙伴——华越充当桥梁
          </p>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch max-md:grid-cols-1">
          {/* CN side */}
          <div className="bg-paper border-2 border-line rounded-lg p-6 max-md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[32px]">🇨🇳</span>
              <div>
                <b className="block text-[17px] text-ink leading-tight">进口端——中国</b>
                <small className="text-[11.5px] text-mute">广州办事处</small>
              </div>
            </div>
            <p className="text-[13px] text-ink/80 mb-3 leading-relaxed">
              华越采购团队（广州市海珠区数娱创兴港 3 层）在 3 大主力集群甄选并验厂合作工厂。
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-ink/85">
              <li className="flex gap-2"><span className="text-success">●</span> 采购与甄选（源头精选）</li>
              <li className="flex gap-2"><span className="text-success">●</span> 出厂前 AQL 2.5 QC</li>
              <li className="flex gap-2"><span className="text-success">●</span> 每 12 个月定期实地验厂</li>
              <li className="flex gap-2"><span className="text-success">●</span> 翻译与行业协会关系</li>
            </ul>
          </div>

          {/* Bridge */}
          <div className="flex items-center justify-center max-md:py-2">
            <div className="bg-brand text-white px-4 py-6 rounded-lg text-center max-md:py-3 max-md:w-full">
              <div className="text-[40px] mb-1 max-md:text-[28px]">🚢</div>
              <b className="block text-[13px] leading-tight">华越</b>
              <small className="text-[10.5px] opacity-85">物流 + DDP 清关</small>
            </div>
          </div>

          {/* VN side */}
          <div className="bg-paper border-2 border-line rounded-lg p-6 max-md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[32px]">🇻🇳</span>
              <div>
                <b className="block text-[17px] text-ink leading-tight">出口端——越南</b>
                <small className="text-[11.5px] text-mute">海防总部</small>
              </div>
            </div>
            <p className="text-[13px] text-ink/80 mb-3 leading-relaxed">
              总部位于河内市春芳坊宝玉大厦——仓储、清关、分销至越南 63 个省市。
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-ink/85">
              <li className="flex gap-2"><span className="text-accent">●</span> 建材与家具分销经销商</li>
              <li className="flex gap-2"><span className="text-accent">●</span> 建筑承包商与室内设计</li>
              <li className="flex gap-2"><span className="text-accent">●</span> 家电与厨房设备经销商</li>
              <li className="flex gap-2"><span className="text-accent">●</span> 海防仓储 + VNACCS 清关</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ 4 DISTRIBUTION PARTNER TYPES ═════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="text-center mb-6">
          <span className="inline-block bg-accent/10 text-accent px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            出口端——越南
          </span>
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            四类分销合作伙伴
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            每类均有专属扶持计划——按销售额分成佣金，无会员费
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {DISTRIBUTION_PARTNERS.map((p) => (
            <div key={p.title} className="bg-paper border border-line rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="px-5 py-3 text-white flex items-center gap-3" style={{ backgroundColor: p.color }}>
                <span className="text-[28px]">{p.icon}</span>
                <div>
                  <b className="block text-[15px] leading-tight">{p.title}</b>
                  <small className="text-[11px] opacity-90">{p.summary}</small>
                </div>
              </div>
              <div className="p-5 max-md:p-4">
                <p className="text-[13px] text-ink/85 mb-3 leading-relaxed">{p.desc}</p>
                <ul className="space-y-1.5">
                  {p.benefits.map((b) => (
                    <li key={b} className="text-[12.5px] text-ink/85 flex gap-2">
                      <span className="text-success font-bold flex-shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3 CHINA CLUSTERS MAP ═════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="text-center mb-6">
          <span className="inline-block bg-brand/10 text-brand px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            进口端——中国
          </span>
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            三大主力工厂集群
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            华越广州办事处与中国各制造重镇直接对接
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {CN_CLUSTERS.map((c) => (
            <div key={c.province} className="bg-paper border border-line rounded-lg overflow-hidden">
              <div className="px-5 py-4 text-white" style={{ backgroundColor: c.color }}>
                <small className="text-[10px] uppercase tracking-wider opacity-85">{c.weight}</small>
                <b className="block text-[18px] leading-tight mt-0.5">{c.province}</b>
                <span className="text-[12px] opacity-90 italic">{c.provinceCn}</span>
              </div>
              <ul className="divide-y divide-line">
                {c.cities.map((city) => (
                  <li key={city.name} className="px-4 py-2.5">
                    <b className="block text-[13px] text-ink leading-tight">{city.name}</b>
                    <span className="text-[11.5px] text-mute leading-snug">{city.spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PARTNERSHIP MECHANISMS ═══════════════════════════════════ */}
      <section className="bg-bg mt-10 py-10 max-md:py-7 max-md:mt-7">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
              合作伙伴合作机制
            </h2>
            <p className="text-[13px] text-mute max-md:text-[12px]">
              依宣传册<i>「展会服务」</i>与<i>「市场推广」</i>章节
            </p>
          </div>
          <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-3 max-md:grid-cols-1">
            {PARTNERSHIP_MECHANISMS.map((m) => (
              <div key={m.title} className="bg-paper border border-line rounded-lg p-4 text-center hover:border-brand hover:shadow-sm transition-all">
                <div className="text-[38px] mb-2">{m.icon}</div>
                <b className="block text-[13.5px] text-ink mb-2 leading-tight">{m.title}</b>
                <p className="text-[11.5px] text-mute leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRADE FAIR CALENDAR ══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            华越每年参加的展会日历
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            华越采购团有日程、专业翻译、机场接机
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {TRADE_FAIRS.map((f, i) => (
            <div key={i} className="bg-paper border border-line rounded-lg overflow-hidden flex">
              <div className="px-3 py-3 text-white font-bold text-[15px] flex items-center justify-center min-w-[58px]" style={{ backgroundColor: f.color }}>
                {f.month}
              </div>
              <div className="p-3 flex-1">
                <b className="block text-[13px] text-ink mb-0.5 leading-tight">{f.name}</b>
                <span className="text-[11px] text-mute leading-snug">{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BUYER BENEFITS ═══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="bg-paper border border-line rounded-lg p-6 max-md:p-4">
          <div className="text-center mb-5">
            <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
              越南采购商与分销合作伙伴的收益
            </h2>
            <p className="text-[13px] text-mute max-md:text-[12px]">
              相比自行直接采购或通过无法律保障的中间商采购
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {BUYER_BENEFITS.map((b) => (
              <div key={b.title} className="border border-line rounded p-4 hover:border-brand hover:bg-bg transition">
                <div className="text-[24px] mb-1.5">{b.icon}</div>
                <b className="block text-[13.5px] text-ink mb-1">{b.title}</b>
                <p className="text-[12px] text-mute leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PULL QUOTE ═══════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 mt-10 max-md:mt-7">
        <blockquote className="bg-bg border-l-4 border-gold rounded-r-lg px-6 py-5 max-md:px-4 max-md:py-4">
          <p className="text-[16px] text-ink italic leading-relaxed max-md:text-[14px]">
            「华越不是产品挂牌平台——我们是供应链。货物经过真实的仓库、真实的集装箱、真实的清关团队。合作伙伴网络正是运转的血脉：缺一方，链条即断。」
          </p>
          <footer className="mt-3 text-[12.5px] text-mute not-italic">— 合作团队，华越越南</footer>
        </blockquote>
      </section>

      {/* ═══ FAQ ═════════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 mt-10 max-md:mt-7">
        <h2 className="text-[22px] font-bold text-ink mb-4 flex items-center gap-2 max-md:text-[18px]">
          <span>❓</span> 常见问题
        </h2>
        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <details key={i} {...(i === 0 ? { open: true } : {})} className="border border-line rounded-lg group/faq bg-paper">
              <summary className="px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-center hover:bg-bg">
                <b className="text-[13.5px] text-ink leading-snug pr-3">{f.q}</b>
                <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0">▾</span>
              </summary>
              <p className="px-4 pb-4 pt-3 text-[13px] text-ink/85 leading-relaxed border-t border-line">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═════════════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 my-10 max-md:my-7">
        <div
          className="rounded-lg p-7 text-white max-md:p-5"
          style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 60%, #003A42 100%)" }}
        >
          <div className="grid grid-cols-[1fr_auto] gap-5 items-center max-md:grid-cols-1">
            <div>
              <span className="inline-block bg-gold text-brand-dark px-2 py-0.5 text-[10px] font-bold rounded-sm tracking-wider mb-2">
                联系合作
              </span>
              <b className="block text-[20px] mb-1.5 max-md:text-[17px]">成为华越分销合作伙伴</b>
              <p className="text-[13px] opacity-90 leading-relaxed max-md:text-[12.5px]">
                建材经销商、建筑承包商、室内设计公司或家电经销商——请提交营业执照及展厅/仓库信息。华越河内团队将在 5 个工作日内联系。
              </p>
              <p className="text-[12px] opacity-80 mt-2">
                📞 {COMPANY.contact.hotline} · ✉ <a href={`mailto:${COMPANY.contact.emails.partnership}`} className="underline hover:text-gold">{COMPANY.contact.emails.partnership}</a>
              </p>
            </div>
            <div className="flex flex-col gap-2 max-md:w-full">
              <a
                href={`mailto:${COMPANY.contact.emails.partnership}?subject=%E7%94%B3%E8%AF%B7%E6%88%90%E4%B8%BA%E5%8D%8E%E8%B6%8A%E5%88%86%E9%94%80%E5%90%88%E4%BD%9C%E4%BC%99%E4%BC%B4`}
                className="px-5 py-2.5 bg-gold text-brand-dark rounded font-bold text-[13px] hover:bg-[#E8943A] cursor-pointer text-center whitespace-nowrap"
              >
                ✉ 提交申请
              </a>
              <Link
                href="/info/contact"
                className="px-5 py-2.5 border-2 border-white/40 text-white rounded font-bold text-[13px] hover:bg-white/10 cursor-pointer text-center whitespace-nowrap"
              >
                📍 查看办公室
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "合作伙伴网络——Huayuesc 华越供应链",
  description:
    "华越连接广东、福建、山东的顶尖工厂与越南 4 类分销合作伙伴：建材经销商、建筑承包商、室内设计公司、家电经销商。覆盖 63 省市，2 个运营办公室海防 + 广州。",
};
