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
  legalNameVi: "CÔNG TY TNHH CHUỖI CUNG ỨNG HUAYUE VIỆT NAM",
  legalNameCn: "华越供应链有限公司",
  brandShort: "Huayuesc",
  brandCn: "华越供应链",
  taxId: "0111453693",
  domain: "huayuesc.vn",
  websiteUrl: "https://huayuesc.vn",

  // ─── Vision & Mission (from brochure cover + closing) ──────────────────
  visionCn: "成为中越供应链服务的标杆企业，引领中越建材家居贸易新生态",
  visionVi:
    "Trở thành công ty kiểu mẫu về dịch vụ chuỗi cung ứng Trung – Việt, dẫn dắt và kiến tạo nền sinh thái mới cho thương mại vật liệu xây dựng và đồ nội thất giữa Trung Quốc và Việt Nam.",

  missionCn: "通过专业、高效、可靠的一站式跨境供应链服务，助力中国制造闪耀越南，赋能越南市场升级发展",
  missionVi:
    "Thông qua dịch vụ chuỗi cung ứng một trạm chuyên nghiệp, hiệu quả cao và đáng tin cậy, giúp ngành chế tạo Trung Quốc tỏa sáng tại Việt Nam, đồng thời giúp thị trường Việt Nam phát triển lên tầng cao mới.",

  taglineCn: "无需赴华，一站式采购中国优质商品",
  taglineVi:
    "Đến với Huayue — bạn không cần đi Trung Quốc, vẫn mua được sản phẩm Trung Quốc ưu việt một cách nhanh chóng và tiện lợi.",

  // ─── Three product industries (brochure page 4) ─────────────────────────
  industries: [
    {
      key: "construction-materials",
      nameVi: "Vật liệu xây dựng",
      nameCn: "建材",
      icon: "🧱",
      examples: [
        "Gạch men sứ porcelain",
        "Thiết bị vệ sinh sanitaryware",
        "Kim khí ngũ kim",
        "Vật liệu cửa & profile",
        "Sơn & lớp phủ",
        "Ống nước & phụ kiện đường ống",
        "Thiết bị chiếu sáng",
      ],
    },
    {
      key: "decoration",
      nameVi: "Vật liệu trang trí nội thất",
      nameCn: "装饰材料",
      icon: "🛋",
      examples: [
        "Giấy dán tường & vải dán tường",
        "Sàn gỗ công nghiệp / sàn gỗ tự nhiên",
        "Vật liệu trang trí trần",
        "Đá tự nhiên & đá nhân tạo",
        "Đồ trang trí nội thất",
      ],
    },
    {
      key: "kitchen-bathroom-appliances",
      nameVi: "Đồ điện gia dụng nhà bếp & phòng tắm",
      nameCn: "厨卫小家电",
      icon: "🔌",
      examples: [
        "Bình nóng lạnh điện",
        "Bếp gas",
        "Máy hút mùi",
        "Nồi cơm điện",
        "Máy ép phá tế bào",
        "Nắp bồn cầu thông minh",
      ],
    },
  ] as const,

  // ─── Four core services (brochure page 3) ───────────────────────────────
  services: [
    {
      key: "source-selection",
      nameVi: "Tinh chọn nguồn gốc & Hỗ trợ thu mua",
      nameCn: "源头精选与采购支持",
      desc: "Sàng lọc nhà cung cấp Trung Quốc có sức cạnh tranh, kiểm soát chất lượng tại xưởng, quản lý đơn hàng và thu mua tập trung — giảm thiểu giá thành lẫn rủi ro thu mua.",
    },
    {
      key: "warehouse-cn",
      nameVi: "Kho bãi tại Trung Quốc & Tập trung vận chuyển",
      nameCn: "中国境内仓储与集运",
      desc: "Xây dựng hoặc hợp tác với các kho hiện đại tại các khu công nghiệp và bến cảng chủ chốt Trung Quốc, cung cấp dịch vụ quản lý kho chứa an toàn và hiệu quả.",
    },
    {
      key: "logistics-customs",
      nameVi: "Vận chuyển xuyên biên giới & Thông quan hiệu quả",
      nameCn: "跨境物流与高效清关",
      desc: "Door-to-door và port-to-port; đội ngũ thông quan tại cảng Hải Phòng am hiểu luật XNK, đảm bảo thông quan nhanh chóng, đúng pháp luật và tiết kiệm chi phí.",
    },
    {
      key: "vn-distribution",
      nameVi: "Phát triển kênh phân phối tại Việt Nam",
      nameCn: "本地化分销渠道拓展",
      desc: "Mạng lưới đối tác rộng lớn tại Việt Nam — đưa thương hiệu và sản phẩm Trung Quốc thâm nhập các kênh phân phối chính.",
    },
  ] as const,

  // ─── Warehouse + Logistics + Customs (brochure page 6) ──────────────────
  warehouseTypes: [
    { nameVi: "Kho nhiệt độ thường", nameCn: "常温仓储区" },
    { nameVi: "Kho riêng cho chất dễ cháy (sơn, dung môi)", nameCn: "易燃品库（如油漆、稀释剂）" },
    { nameVi: "Kho nhiệt độ & độ ẩm ổn định", nameCn: "恒温恒湿库" },
  ] as const,

  // ─── Digital supply chain pillars (brochure page 7) ─────────────────────
  digitalPillars: [
    {
      nameVi: "Quyết sách dữ liệu hóa",
      nameCn: "数据驱动决策",
      desc: "Phân tích big data để dự báo nhu cầu thị trường và tối ưu kho chứa.",
    },
    {
      nameVi: "Tự động hóa thông minh",
      nameCn: "智能自动化",
      desc: "Thuật toán AI tự động xử lý đơn hàng, điều phối vận chuyển và tối ưu lộ trình logistics.",
    },
    {
      nameVi: "Mạng lưới hợp tác",
      nameCn: "协同网络",
      desc: "Nền tảng liên kết toàn bộ nhà cung cấp, nhà sản xuất, công ty vận chuyển và kênh bán lẻ cuối cùng.",
    },
  ] as const,

  // ─── Offices (brochure page 8) ──────────────────────────────────────────
  offices: {
    cn: {
      key: "guangzhou",
      cityVi: "Quảng Châu",
      cityCn: "广州",
      countryVi: "Trung Quốc",
      countryCn: "中国",
      addressCn: "广州市海珠区新港东路黄埔村北码头数娱创兴港1号楼3楼",
      addressVi:
        "Tầng 3, Tòa 1, Cảng Shuyu Chuangxing (数娱创兴港), bến tàu phía Bắc làng Hoàng Phố, đường Tân Cảng Đông (新港东路), quận Hải Châu, Quảng Châu, Trung Quốc",
      role: "Trung tâm thu mua, audit nhà máy, sourcing & QC",
      timezone: "GMT+8",
    },
    vn: {
      key: "haiphong",
      cityVi: "Hải Phòng",
      cityCn: "海防",
      countryVi: "Việt Nam",
      countryCn: "越南",
      addressCn: "越南海防港南亭武工业区",
      addressVi: "Khu công nghiệp Nam Đình Vũ, cảng Hải Phòng, Việt Nam",
      role: "Trụ sở chính · Kho bãi · Thông quan · Phân phối VN",
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
    arbitrationVenue: "VIAC Hà Nội",
    governingLaw: "Pháp luật Việt Nam",
    dataProtection: ["ISO/IEC 27001:2022", "NĐ 13/2023/NĐ-CP (VN)", "PIPL (TQ)", "GDPR (EU khi áp dụng)"],
  } as const,
} as const;

export type Industry = (typeof COMPANY.industries)[number];
export type Service = (typeof COMPANY.services)[number];

/** Convenience: short legal line for footer. */
export const COMPANY_FOOTER_LINE = `© 2026 ${COMPANY.legalNameVi} · ${COMPANY.domain} · MST: ${COMPANY.taxId}`;
