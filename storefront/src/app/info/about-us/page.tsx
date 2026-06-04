import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { COMPANY } from "@/data/company";

// ─── DATA ─────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { n: "3", l: "深耕行业", icon: "🎯" },
  { n: "4", l: "核心服务", icon: "⚙️" },
  { n: "2", l: "运营办公室", icon: "🏢" },
  { n: "20+", l: "已验厂供应商", icon: "🏭" },
];

const CORE_SERVICES = [
  {
    icon: "🔍",
    color: "#005F6B",
    image: "/img/sol-hubs.jpg?v=5",
    cn: "源头精选与采购支持",
    title: "源头精选与采购支持",
    desc: "甄选具有竞争力的中国供应商、在工厂端把控品质、管理订单并集中采购——最大限度降低成本与采购风险。",
  },
  {
    icon: "📦",
    color: "#9C6A1F",
    image: "/img/sol-mei.jpg?v=5",
    cn: "中国境内仓储与集运",
    title: "中国境内仓储与集运",
    desc: "在中国重点工业园区与港口自建或合作搭建现代化仓库，提供安全高效的仓储管理服务。",
  },
  {
    icon: "🚢",
    color: "#C8102E",
    image: "/img/hero-ddp-logistics.jpg?v=5",
    cn: "跨境物流与高效清关",
    title: "跨境物流与高效清关",
    desc: "门到门和港到港；华越驻海防港的清关团队精通进出口法规，确保清关快捷、合规且节省成本。",
  },
  {
    icon: "🤝",
    color: "#7C3AED",
    image: "/img/sol-expo.jpg?v=5",
    cn: "本地化分销渠道拓展",
    title: "越南分销渠道拓展",
    desc: "依托遍布越南的广泛合作伙伴网络——将中国品牌与产品导入63省市的主流分销渠道。",
  },
];

const INDUSTRIES = [
  {
    badge: "01",
    cn: "建材",
    title: "建筑材料",
    color: "#C8102E",
    image: "/img/cer1.jpg?v=5",
    examples: [
      "瓷砖",
      "卫浴洁具",
      "五金",
      "门类材料与型材",
      "油漆与涂料",
      "水管与配件",
      "照明灯具",
    ],
    extraImages: ["/img/cer2.jpg?v=5", "/img/cer3.jpg?v=5", "/img/cer6.jpg?v=5"],
  },
  {
    badge: "02",
    cn: "装饰材料",
    title: "室内装饰材料",
    color: "#9C6A1F",
    image: "/img/fur1.jpg?v=5",
    examples: [
      "墙纸/墙布",
      "强化/实木地板",
      "吊顶装饰材料",
      "天然与人造石材",
      "家居装饰品",
    ],
    extraImages: ["/img/fur2.jpg?v=5", "/img/fur3.jpg?v=5", "/img/fur7.jpg?v=5"],
  },
  {
    badge: "03",
    cn: "厨卫小家电",
    title: "厨卫家电",
    color: "#7C3AED",
    image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5",
    examples: [
      "电热水器",
      "燃气灶",
      "抽油烟机",
      "电饭煲",
      "破壁机",
      "智能马桶盖",
    ],
    extraImages: [
      "/img/kitchen-equipment-sc-prod-1.jpg?v=5",
      "/img/kitchen-equipment-sc-prod-2.jpg?v=5",
      "/img/kitchen-equipment-sc-prod-3.jpg?v=5",
    ],
  },
];

const WAREHOUSE_TYPES = [
  {
    cn: "常温仓储区",
    title: "常温仓",
    desc: "普通货物——陶瓷、家电、装饰材料",
    image: "/img/sol-hubs.jpg?v=5",
  },
  {
    cn: "易燃品库",
    title: "易燃品仓",
    desc: "油漆、溶剂、稀释剂——符合消防标准",
    image: "/img/son-epoxy-san.jpg?v=5",
  },
  {
    cn: "恒温恒湿库",
    title: "恒温恒湿仓",
    desc: "敏感电子设备、高端产品",
    image: "/img/sol-mei.jpg?v=5",
  },
];

const LOGISTICS_FLOW = [
  { icon: "📥", cn: "卸货平台", title: "卸货门", desc: "标准集装箱" },
  { icon: "📦", cn: "分拣打包台", title: "分拣与打包", desc: "按SKU和目的地" },
  { icon: "🚛", cn: "合作物流驻点", title: "物流合作伙伴", desc: "COSCO、MSC、OOCL驻仓" },
];

const DIGITAL_PILLARS = [
  {
    icon: "📊",
    cn: "数据驱动决策",
    title: "数据驱动决策",
    desc: "通过大数据分析预测市场需求并优化库存。",
    benefit: "提升经营收入",
    color: "#005F6B",
  },
  {
    icon: "🤖",
    cn: "智能自动化",
    title: "智能自动化",
    desc: "AI算法自动处理订单、调度运输并优化物流路线。",
    benefit: "降低运营成本",
    color: "#9C6A1F",
  },
  {
    icon: "🔗",
    cn: "协同网络",
    title: "协同网络",
    desc: "平台连接全部供应商、制造商、运输公司及终端零售渠道。",
    benefit: "提升资金使用效率",
    color: "#7C3AED",
  },
];

const PROMOTION_IMAGES = [
  "/img/sol-expo.jpg?v=5",
  "/img/sub-expo1.jpg?v=5",
  "/img/sub-expo3.jpg?v=5",
  "/img/sol-mei.jpg?v=5",
  "/img/hero-factory-tour.jpg?v=5",
  "/img/sol-custom.jpg?v=5",
];

// ─── PAGE ─────────────────────────────────────────────────────────────────

export default function AboutUsPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "首页", href: "/" },
          { label: "信息", href: "/help" },
          { label: "公司介绍" },
        ]}
      />

      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/img/heroint.jpg?v=5"
            alt="集装箱货轮——华越中越供应链"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, rgba(0,37,87,0.95) 0%, rgba(0,95,107,0.85) 50%, rgba(200,16,46,0.5) 100%)",
            }}
          />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-16 max-md:py-10 text-white">
          <span className="inline-block bg-gold text-brand-dark px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-4">
            关于华越 · 关于我们
          </span>
          <div className="grid grid-cols-[1fr_auto] gap-8 items-end max-md:grid-cols-1 max-md:gap-5">
            <div>
              <h1 className="text-[38px] font-extrabold leading-tight mb-3 max-md:text-[24px]">
                {COMPANY.brandShort}{" "}
                <span className="text-gold">{COMPANY.brandCn}</span>
              </h1>
              <p className="text-[18px] font-bold leading-snug mb-2 text-gold max-md:text-[15px]">
                {COMPANY.visionCn}
              </p>
              <p className="text-[14.5px] leading-relaxed opacity-95 max-w-[760px] italic max-md:text-[12.5px]">
                {COMPANY.visionVi}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-5 py-4 text-center min-w-[200px] max-md:w-full">
              <div className="text-[11px] uppercase tracking-wider opacity-80 mb-1">
                法定名称
              </div>
              <b className="block text-[14px] leading-tight text-gold mb-2">
                华越（越南）供应链有限公司
              </b>
              <div className="text-[11.5px] opacity-90 leading-snug">
                税号：<b>{COMPANY.taxId}</b>
                <br />
                域名：<b>{COMPANY.domain}</b>
              </div>
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/15 bg-black/30">
          <div className="max-w-[1200px] mx-auto px-4 py-3.5 grid grid-cols-4 gap-3 text-white max-md:grid-cols-2 max-md:gap-2 max-md:py-3">
            {HERO_STATS.map((s) => (
              <div key={s.l} className="text-center border-r border-white/15 last:border-r-0 max-md:border-r-0">
                <div className="text-[18px] mb-0.5">{s.icon}</div>
                <b className="block text-[22px] text-gold leading-none max-md:text-[18px]">{s.n}</b>
                <small className="text-[10.5px] opacity-80 uppercase tracking-wider">{s.l}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GIỚI THIỆU CÔNG TY ═══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-6">
        <div className="grid grid-cols-[1fr_1.2fr] gap-8 items-center max-md:grid-cols-1 max-md:gap-5">
          <div className="relative">
            <img
              src="/img/hero-buyer-promo.jpg?v=5"
              alt="华越介绍——中越供应链"
              className="w-full aspect-[4/5] object-cover rounded-lg shadow-lg max-md:aspect-[16/10]"
            />
            <div className="absolute -bottom-4 -right-4 bg-brand text-white px-4 py-3 rounded-lg shadow-lg max-md:relative max-md:-bottom-0 max-md:-right-0 max-md:mt-3 max-md:inline-block">
              <span className="text-[10.5px] uppercase tracking-wider opacity-80">核心理念</span>
              <b className="block text-gold text-[14px] mt-0.5">
                {COMPANY.taglineCn}
              </b>
            </div>
          </div>
          <div>
            <span className="inline-block bg-accent/10 text-accent px-2.5 py-0.5 text-[11px] font-bold rounded-sm tracking-wider mb-2">
              企业介绍
            </span>
            <h2 className="text-[28px] font-extrabold text-ink leading-tight mb-2 max-md:text-[22px]">
              引领中越建材家居贸易新通路
            </h2>
            <p className="text-[15px] text-mute font-semibold mb-4 max-md:text-[13px]">
              开辟全新贸易通道——将建材、家具、家电从中国送往越南。
            </p>
            <p className="text-[14px] text-ink leading-relaxed mb-3 max-md:text-[13px]">
              <b>华越</b>是一家提供一站式供应链服务的综合服务商，专注于将中国优质建材、装饰材料、厨卫家电出口至越南市场。
            </p>
            <p className="text-[14px] text-ink leading-relaxed mb-4 max-md:text-[13px]">
              我们打通采购、仓储、物流、清关、分销直至本地化营销的全链条——为客户提供<b className="text-brand">从中国工厂到越南终端消费点的全程供应链服务</b>。
            </p>
            <blockquote className="border-l-4 border-gold bg-bg pl-4 py-2 italic text-[13.5px] text-ink leading-relaxed">
              「从中国工厂到越南终端，华越让跨境供应链更简单、更高效」
              <br />
              <span className="text-mute not-italic text-[12px]">
                从中国工厂到越南客户——华越让国际供应链更简单、更高效。
              </span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══ 4 DỊCH VỤ TRỌNG TÂM ═══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 max-md:mt-8">
        <div className="text-center mb-8">
          <span className="inline-block bg-brand/10 text-brand px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            核心业务
          </span>
          <h2 className="text-[26px] font-extrabold text-ink leading-tight mb-1.5 max-md:text-[20px]">
            四大核心服务——全程供应链
          </h2>
          <p className="text-[14px] text-mute italic max-md:text-[12.5px]">
            全链条一站式服务 · 提供全方位供应链
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-3">
          {CORE_SERVICES.map((s, i) => (
            <div key={s.title} className="bg-paper border border-line rounded-lg overflow-hidden flex hover:shadow-lg transition-shadow max-md:flex-col">
              <div className="w-[140px] flex-shrink-0 relative max-md:w-full max-md:aspect-[16/9]">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${s.color}90 0%, transparent 100%)` }} />
                <div className="absolute top-2 left-2 w-10 h-10 rounded-lg bg-white/95 flex items-center justify-center text-[22px] shadow">
                  {s.icon}
                </div>
                <div className="absolute bottom-2 left-2 text-white text-[11px] font-bold opacity-90 max-md:bottom-3 max-md:text-[13px]">
                  0{i + 1}
                </div>
              </div>
              <div className="p-4 flex-1 min-w-0">
                <div className="text-[11px] text-mute2 italic mb-0.5">{s.cn}</div>
                <b className="block text-[15px] text-ink leading-tight mb-2" style={{ color: s.color }}>{s.title}</b>
                <p className="text-[12.5px] text-ink/80 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3 NGÀNH SẢN PHẨM ═════════════════════════════════════════ */}
      <section className="bg-bg mt-12 py-12 max-md:mt-8 max-md:py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block bg-accent/10 text-accent px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
              专注领域
            </span>
            <h2 className="text-[26px] font-extrabold text-ink leading-tight mb-1.5 max-md:text-[20px]">
              中国优质产品——三大深耕行业
            </h2>
            <p className="text-[13px] text-mute leading-relaxed max-w-[720px] mx-auto max-md:text-[12px]">
              <i>性价比高、品类丰富、产业链成熟、创新速度快</i> — 性价比高、品类丰富、产业链成熟、创新速度快。
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-4">
            {INDUSTRIES.map((ind) => (
              <div key={ind.title} className="bg-paper rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={ind.image} alt={ind.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 w-12 h-12 rounded flex items-center justify-center text-white font-extrabold text-[20px]" style={{ backgroundColor: ind.color }}>
                    {ind.badge}
                  </div>
                </div>
                <div className="p-5 max-md:p-4">
                  <div className="text-[12px] text-mute italic mb-0.5">{ind.cn}</div>
                  <b className="block text-[17px] text-ink mb-3 leading-tight" style={{ color: ind.color }}>{ind.title}</b>
                  <ul className="space-y-1 mb-3">
                    {ind.examples.map((e) => (
                      <li key={e} className="text-[12.5px] text-ink/85 flex gap-2">
                        <span className="text-success font-bold flex-shrink-0">✓</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-line">
                    {ind.extraImages.map((src, i) => (
                      <div key={i} className="aspect-square rounded overflow-hidden bg-bg">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRIỂN LÃM & QUẢNG BÁ ═════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 max-md:mt-8">
        <div className="grid grid-cols-[1.2fr_1fr] gap-8 items-center max-md:grid-cols-1 max-md:gap-5">
          <div>
            <span className="inline-block bg-brand/10 text-brand px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
              展贸服务 + 推广服务
            </span>
            <h2 className="text-[24px] font-extrabold text-ink leading-tight mb-3 max-md:text-[19px]">
              品牌场景化展示 + 专业服务配套
            </h2>
            <p className="text-[14px] text-ink leading-relaxed mb-3 max-md:text-[13px]">
              采用<b>「品牌场景化展示 + 专业服务配套」</b>模式——营造便捷的交易环境，让客户可在展厅现场直接下单。
            </p>
            <ul className="space-y-2 text-[13.5px] text-ink/85">
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">🎤</span>
                <span>每年举办中国品牌<b>新品发布会</b></span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">💡</span>
                <span>围绕环保建材、家电技术的<b>专题论坛</b></span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">🏢</span>
                <span>吸引<b>房地产投资商、建筑公司、室内装饰设计公司</b>参与</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">📢</span>
                <span>越南<b>线上 + 线下传播</b>让中国品牌触达本地采购商</span>
              </li>
            </ul>
            <div className="mt-4 bg-gold/10 border-l-4 border-gold px-4 py-3 italic text-[14px] text-ink rounded-r max-md:text-[12.5px]">
              「无需赴华，一站式采购中国优质商品」
              <br />
              <span className="text-mute not-italic text-[12px]">
                来到华越——您无需亲赴中国，即可快捷便利地买到中国优质产品。
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {PROMOTION_IMAGES.map((src, i) => (
              <div key={i} className={i === 0 ? "col-span-2 row-span-2 aspect-square rounded-lg overflow-hidden" : "aspect-square rounded-lg overflow-hidden"}>
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KHO · VẬN CHUYỂN · THÔNG QUAN ═══════════════════════════ */}
      <section className="bg-brand-dark text-white mt-12 py-12 max-md:mt-8 max-md:py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-7">
            <span className="inline-block bg-gold text-brand-dark px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
              仓储 · 物流 · 清关
            </span>
            <h2 className="text-[26px] font-extrabold leading-tight mb-1.5 max-md:text-[20px]">
              以「保税存储」为核心
            </h2>
            <p className="text-[14px] opacity-85 max-md:text-[12.5px]">
              <i>「入库—存储—出库—清关」</i>全流程自动化与数据化
            </p>
          </div>

          {/* 3 warehouse types */}
          <div className="mb-7">
            <b className="block text-[11px] uppercase tracking-wider text-gold mb-3">仓储 — 3类专用仓</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-3">
              {WAREHOUSE_TYPES.map((w) => (
                <div key={w.title} className="bg-white/5 border border-white/15 rounded-lg overflow-hidden hover:border-gold/50 transition">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={w.image} alt={w.title} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] text-gold italic mb-0.5">{w.cn}</div>
                    <b className="block text-[14.5px] mb-1">{w.title}</b>
                    <p className="text-[12px] opacity-80 leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics flow */}
          <div className="mb-7">
            <b className="block text-[11px] uppercase tracking-wider text-gold mb-3">物流 — 3级</b>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {LOGISTICS_FLOW.map((l, i) => (
                <div key={l.title} className="bg-white/5 border border-white/15 rounded-lg p-4 flex items-center gap-3">
                  <div className="text-[32px] flex-shrink-0">{l.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10.5px] text-gold italic">{l.cn}</div>
                    <b className="block text-[13.5px] leading-tight">{l.title}</b>
                    <span className="text-[11.5px] opacity-75">{l.desc}</span>
                  </div>
                  {i < LOGISTICS_FLOW.length - 1 && <span className="text-gold/60 text-[20px] max-md:hidden">→</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Customs box */}
          <div className="bg-accent/15 border-2 border-accent rounded-lg p-5 max-md:p-4">
            <div className="grid grid-cols-[auto_1fr] gap-4 items-center max-md:grid-cols-1">
              <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center text-[32px] flex-shrink-0 max-md:w-12 max-md:h-12 max-md:text-[24px]">
                🛃
              </div>
              <div>
                <div className="text-[11px] text-gold uppercase tracking-wider mb-0.5">清关</div>
                <b className="block text-[16px] mb-1.5 max-md:text-[14.5px]">流程极简——对接海防港</b>
                <p className="text-[13px] opacity-90 leading-relaxed max-md:text-[12px]">
                  华越清关团队（河内总部）与海防港海关系统对接。报关数据实时传输、申报流程极简——相比传统自主申报模式大幅缩短清关时间。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SỐ HÓA CHUỖI CUNG ỨNG ═══════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 max-md:mt-8">
        <div className="text-center mb-7">
          <span className="inline-block bg-brand/10 text-brand px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            供应链服务
          </span>
          <h2 className="text-[26px] font-extrabold text-ink leading-tight mb-1.5 max-md:text-[20px]">
            全流程可视化 — 供应链全面数字化
          </h2>
          <p className="text-[13.5px] text-mute leading-relaxed max-w-[760px] mx-auto max-md:text-[12px]">
            客户可全程跟踪订单，从工厂端原材料到越南终端消费者手中。
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-4">
          {DIGITAL_PILLARS.map((d) => (
            <div key={d.title} className="bg-paper border border-line rounded-lg overflow-hidden">
              <div className="p-5 text-white" style={{ backgroundColor: d.color }}>
                <div className="text-[36px] mb-2">{d.icon}</div>
                <div className="text-[12px] italic opacity-85">{d.cn}</div>
                <b className="block text-[16px] mt-0.5">{d.title}</b>
              </div>
              <div className="p-4">
                <p className="text-[13px] text-ink/85 leading-relaxed mb-3">{d.desc}</p>
                <div className="bg-bg border-l-4 border-success px-3 py-2 rounded-r flex items-center gap-2">
                  <span className="text-success text-[16px]">↑</span>
                  <b className="text-[12.5px] text-ink">{d.benefit}</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SỨ MỆNH + LIÊN HỆ ═══════════════════════════════════════ */}
      <section className="mt-12 mb-12 max-md:mt-8 max-md:mb-7">
        <div className="max-w-[1200px] mx-auto px-4">
          <div
            className="rounded-2xl overflow-hidden text-white"
            style={{ background: "linear-gradient(135deg, #C8102E 0%, #002557 100%)" }}
          >
            <div className="px-8 py-10 text-center max-md:px-5 max-md:py-7">
              <span className="inline-block bg-gold text-brand-dark px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">
                使命
              </span>
              <h2 className="text-[24px] font-extrabold leading-tight mb-3 max-md:text-[18px]">
                助力中国制造闪耀越南，赋能越南市场升级发展
              </h2>
              <p className="text-[14.5px] opacity-95 leading-relaxed max-w-[820px] mx-auto italic mb-5 max-md:text-[12.5px]">
                通过专业、高效、可靠的一站式供应链服务，我们助力中国制造闪耀越南，同时赋能越南市场升级发展。
              </p>
            </div>

            {/* Contact split into 2 cards */}
            <div className="grid grid-cols-2 border-t border-white/15 max-md:grid-cols-1">
              {/* VN */}
              <div className="px-7 py-6 border-r border-white/15 max-md:border-r-0 max-md:border-b max-md:px-5 max-md:py-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[28px]">🇻🇳</span>
                  <div>
                    <small className="text-[10.5px] uppercase tracking-wider opacity-75">越南地址 · 总部</small>
                    <b className="block text-[15px] leading-tight">{COMPANY.legalNameVi}</b>
                  </div>
                </div>
                <p className="text-[12.5px] opacity-90 leading-relaxed mb-2">
                  {COMPANY.offices.vn.addressVi}
                </p>
                <p className="text-[11.5px] opacity-70 italic">
                  {COMPANY.offices.vn.addressCn}
                </p>
                <div className="mt-3 pt-3 border-t border-white/15 text-[12px] opacity-90 space-y-1">
                  <div><b>税号：</b> {COMPANY.taxId}</div>
                  <div><b>域名：</b> <a href={COMPANY.websiteUrl} className="text-gold underline hover:opacity-80">{COMPANY.domain}</a></div>
                </div>
              </div>

              {/* CN */}
              <div className="px-7 py-6 max-md:px-5 max-md:py-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[28px]">🇨🇳</span>
                  <div>
                    <small className="text-[10.5px] uppercase tracking-wider opacity-75">中国地址 · 代表处</small>
                    <b className="block text-[15px] leading-tight">华越广州采购团队</b>
                  </div>
                </div>
                <p className="text-[12.5px] opacity-90 leading-relaxed mb-2">
                  {COMPANY.offices.cn.addressVi}
                </p>
                <p className="text-[11.5px] opacity-70 italic">
                  {COMPANY.offices.cn.addressCn}
                </p>
                <div className="mt-3 pt-3 border-t border-white/15 text-[12px] opacity-90">
                  <b>职能：</b> 采购 · 验厂 · 出厂前 QC
                </div>
              </div>
            </div>

            {/* Hotline strip */}
            <div className="px-7 py-5 bg-black/30 border-t border-white/15 grid grid-cols-2 gap-4 items-center max-md:grid-cols-1 max-md:px-5 max-md:py-4">
              <div>
                <small className="text-[10.5px] uppercase tracking-wider opacity-75">联系电话 · 热线</small>
                <b className="block text-gold text-[22px] mt-0.5 max-md:text-[18px]">{COMPANY.contact.hotline}</b>
                <span className="text-[11.5px] opacity-80">中越双语支持 · 8:00–22:00</span>
              </div>
              <div className="flex gap-2 max-md:flex-col">
                <Link
                  href="/buying-request"
                  className="flex-1 px-5 py-2.5 bg-gold text-brand-dark rounded font-bold text-[13px] hover:bg-[#E8943A] cursor-pointer text-center whitespace-nowrap"
                >
                  📨 提交报价询价
                </Link>
                <Link
                  href="/info/contact"
                  className="flex-1 px-5 py-2.5 border-2 border-white/40 text-white rounded font-bold text-[13px] hover:bg-white/10 cursor-pointer text-center whitespace-nowrap"
                >
                  📍 查看两地办公室
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "公司介绍——Huayuesc 华越供应链 · 华越（越南）供应链有限公司",
  description:
    "华越（华越供应链）是一家提供一站式供应链服务的综合服务商，专注于将中国建材、装饰材料及厨卫家电出口至越南。河内总部 + 广州代表处。税号 0111453693。",
};
