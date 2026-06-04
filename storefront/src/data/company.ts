/**
 * Huayue Supply Chain — Single source of truth for company facts.
 *
 * All pages displaying legal entity name, addresses, tax ID, hotline,
 * vision, industries… should IMPORT from this file (do not hardcode).
 *
 * Source of truth: 华越供应链画册 (Huayue Supply Chain brochure PDF).
 */

export const COMPANY = {
  // ─── Legal identity ─────────────────────────────────────────────────────
  legalNameVi: "华越供应链（越南）有限公司",
  legalNameCn: "华越供应链有限公司",
  brandShort: "Huayuesc",
  brandCn: "华越供应链",
  taxId: "0111453693",
  domain: "huayuesc.vn",
  websiteUrl: "https://huayuesc.vn",

  // ─── Vision & Mission (from brochure cover + closing) ──────────────────
  visionCn: "成为中越供应链服务的标杆企业，引领中越建材家居贸易新生态",
  visionVi:
    "成为中越供应链服务的标杆企业，引领并构建中越建材与家居贸易的全新生态。",

  missionCn: "通过专业、高效、可靠的一站式跨境供应链服务，助力中国制造闪耀越南，赋能越南市场升级发展",
  missionVi:
    "通过专业、高效、可靠的一站式跨境供应链服务，助力中国制造闪耀越南，同时推动越南市场迈向更高层级的发展。",

  taglineCn: "无需赴华，一站式采购中国优质商品",
  taglineVi:
    "选择华越，无需亲赴中国，即可快捷便利地采购到优质的中国商品。",

  // ─── Three product industries (brochure page 4) ─────────────────────────
  industries: [
    {
      key: "construction-materials",
      nameVi: "建材",
      nameCn: "建材",
      icon: "🧱",
      examples: [
        "瓷砖（porcelain）",
        "卫浴洁具（sanitaryware）",
        "五金件",
        "门材与型材",
        "涂料与涂层",
        "水管与管道配件",
        "照明设备",
      ],
    },
    {
      key: "decoration",
      nameVi: "装饰材料",
      nameCn: "装饰材料",
      icon: "🛋",
      examples: [
        "墙纸与墙布",
        "强化木地板／实木地板",
        "吊顶装饰材料",
        "天然石材与人造石",
        "室内装饰品",
      ],
    },
    {
      key: "kitchen-bathroom-appliances",
      nameVi: "厨卫小家电",
      nameCn: "厨卫小家电",
      icon: "🔌",
      examples: [
        "电热水器",
        "燃气灶",
        "抽油烟机",
        "电饭煲",
        "破壁机",
        "智能马桶盖",
      ],
    },
  ] as const,

  // ─── Four core services (brochure page 3) ───────────────────────────────
  services: [
    {
      key: "source-selection",
      nameVi: "源头精选与采购支持",
      nameCn: "源头精选与采购支持",
      desc: "甄选具有竞争力的中国供应商，工厂源头品质管控，集中订单管理与采购，降低成本与采购风险。",
    },
    {
      key: "warehouse-cn",
      nameVi: "中国境内仓储与集运",
      nameCn: "中国境内仓储与集运",
      desc: "在中国主要工业园区与港口自建或合作运营现代化仓库，提供安全高效的仓储管理服务。",
    },
    {
      key: "logistics-customs",
      nameVi: "跨境物流与高效清关",
      nameCn: "跨境物流与高效清关",
      desc: "门到门与港到港；海防港清关团队精通进出口法规，确保通关快捷、合规且节省成本。",
    },
    {
      key: "vn-distribution",
      nameVi: "本地化分销渠道拓展",
      nameCn: "本地化分销渠道拓展",
      desc: "依托遍布越南的广泛合作伙伴网络，助力中国品牌与产品深入越南主流分销渠道。",
    },
  ] as const,

  // ─── Warehouse + Logistics + Customs (brochure page 6) ──────────────────
  warehouseTypes: [
    { nameVi: "常温仓储区", nameCn: "常温仓储区" },
    { nameVi: "易燃品专用库（如油漆、稀释剂）", nameCn: "易燃品库（如油漆、稀释剂）" },
    { nameVi: "恒温恒湿库", nameCn: "恒温恒湿库" },
  ] as const,

  // ─── Digital supply chain pillars (brochure page 7) ─────────────────────
  digitalPillars: [
    {
      nameVi: "数据驱动决策",
      nameCn: "数据驱动决策",
      desc: "运用大数据分析预测市场需求，优化仓储管理。",
    },
    {
      nameVi: "智能自动化",
      nameCn: "智能自动化",
      desc: "依托AI算法自动处理订单、调度运输并优化物流路线。",
    },
    {
      nameVi: "协同网络",
      nameCn: "协同网络",
      desc: "搭建连接全链路供应商、制造商、运输企业与终端零售渠道的协同平台。",
    },
  ] as const,

  // ─── Offices (brochure page 8) ──────────────────────────────────────────
  offices: {
    cn: {
      key: "guangzhou",
      cityVi: "广州",
      cityCn: "广州",
      countryVi: "中国",
      countryCn: "中国",
      addressCn: "广州市海珠区新港东路黄埔村北码头数娱创兴港1号楼3楼",
      addressVi:
        "广州市海珠区新港东路黄埔村北码头数娱创兴港1号楼3楼",
      role: "采购中心·工厂验厂·采购与品控",
      timezone: "GMT+8",
    },
    vn: {
      key: "hanoi",
      cityVi: "河内",
      cityCn: "河内",
      countryVi: "越南",
      countryCn: "越南",
      addressCn: "越南河内市春芳坊清林街2号宝玉大厦7楼",
      addressVi:
        "越南河内市春芳坊清林街2号宝玉大厦7楼",
      role: "总部·运营·越南分销",
      timezone: "GMT+7",
    },
  } as const,

  // ─── Contact (brochure page 8) ──────────────────────────────────────────
  contact: {
    hotline: "+86 181-2225-6999",
    emails: {
      sales: "sales@huayuesc.vn",
      support: "support@huayuesc.vn",
      hr: "hr@huayuesc.vn",
      privacy: "privacy@huayuesc.vn",
      partnership: "partnership@huayuesc.vn",
    },
    social: {
      zalo: "https://zalo.me/huayuesc",
      facebook: "https://fb.com/huayuesc",
      wechat: "huayuesc_qc",
    },
  } as const,

  // ─── Legal / Regulatory ─────────────────────────────────────────────────
  legal: {
    arbitrationVenue: "越南国际仲裁中心（VIAC河内）",
    governingLaw: "越南法律",
    dataProtection: ["ISO/IEC 27001:2022", "越南第13/2023/NĐ-CP号法令", "PIPL（中国）", "GDPR（适用于欧盟时）"],
  } as const,
} as const;

export type Industry = (typeof COMPANY.industries)[number];
export type Service = (typeof COMPANY.services)[number];

/** Convenience: short legal line for footer. */
export const COMPANY_FOOTER_LINE = `© 2026 ${COMPANY.legalNameVi} · ${COMPANY.domain} · MST: ${COMPANY.taxId}`;
