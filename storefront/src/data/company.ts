/**
 * Huayue Supply Chain — Single source of truth for company facts.
 *
 * All pages displaying legal entity name, addresses, tax ID, hotline,
 * vision, industries… should IMPORT from this file (do not hardcode).
 *
 * Source of truth: Huayue Supply Chain brochure (PDF).
 */

export const COMPANY = {
  // ─── Legal identity ─────────────────────────────────────────────────────
  legalNameVi: "Công ty TNHH Chuỗi Cung Ứng Hua Việt (Việt Nam)",
  legalNameCn: "Công ty TNHH Chuỗi Cung Ứng Hua Việt (Việt Nam)",
  brandShort: "Huayuesc",
  brandCn: "Chuỗi cung ứng Hua Việt",
  taxId: "0111453693",
  domain: "huayuesc.vn",
  websiteUrl: "https://huayuesc.vn",

  // ─── Vision & Mission (from brochure cover + closing) ──────────────────
  visionCn: "Trở thành doanh nghiệp chuẩn mực trong lĩnh vực dịch vụ chuỗi cung ứng Trung – Việt, dẫn dắt một hệ sinh thái mới cho thương mại vật liệu xây dựng và trang trí nội thất giữa Trung Quốc và Việt Nam.",
  visionVi:
    "Trở thành công ty kiểu mẫu về dịch vụ chuỗi cung ứng Trung – Việt, dẫn dắt và kiến tạo một hệ sinh thái mới cho hoạt động thương mại vật liệu xây dựng và trang trí nội thất giữa Trung Quốc và Việt Nam.",

  missionCn: "Thông qua dịch vụ chuỗi cung ứng xuyên biên giới một điểm đến chuyên nghiệp, hiệu quả và đáng tin cậy, chúng tôi giúp hàng hoá sản xuất tại Trung Quốc toả sáng tại Việt Nam và tiếp sức cho thị trường Việt Nam nâng tầm và phát triển.",
  missionVi:
    "Thông qua dịch vụ chuỗi cung ứng một điểm đến chuyên nghiệp, hiệu quả cao và đáng tin cậy, chúng tôi giúp hàng hoá sản xuất tại Trung Quốc toả sáng tại Việt Nam, đồng thời giúp thị trường Việt Nam vươn lên một tầm cao mới.",

  taglineCn: "Không cần sang Trung Quốc —— một điểm đến để tìm nguồn hàng Trung Quốc cao cấp.",
  taglineVi:
    "Với Hua Việt, bạn không cần phải sang Trung Quốc —— vẫn có thể tìm nguồn sản phẩm Trung Quốc cao cấp một cách nhanh chóng và thuận tiện.",

  // ─── Three product industries (brochure page 4) ─────────────────────────
  industries: [
    {
      key: "construction-materials",
      nameVi: "Vật liệu xây dựng",
      nameCn: "Vật liệu xây dựng",
      icon: "🧱",
      examples: [
        "Gạch ốp lát",
        "Thiết bị vệ sinh",
        "Phụ kiện kim khí & kim loại",
        "Vật liệu & nẹp định hình cửa",
        "Sơn & chất phủ",
        "Ống & phụ kiện đường ống",
        "Thiết bị chiếu sáng",
      ],
    },
    {
      key: "decoration",
      nameVi: "Vật liệu trang trí nội thất",
      nameCn: "Vật liệu trang trí",
      icon: "🛋",
      examples: [
        "Giấy dán tường & vải dán tường",
        "Sàn gỗ công nghiệp / sàn gỗ tự nhiên",
        "Vật liệu trang trí trần",
        "Đá tự nhiên & đá nhân tạo",
        "Vật phẩm trang trí nội thất",
      ],
    },
    {
      key: "kitchen-bathroom-appliances",
      nameVi: "Thiết bị nhà bếp & nhà tắm",
      nameCn: "Thiết bị nhà bếp & nhà tắm",
      icon: "🔌",
      examples: [
        "Máy nước nóng dùng điện",
        "Bếp gas",
        "Máy hút mùi",
        "Nồi cơm điện",
        "Máy ép chậm",
        "Nắp bồn cầu thông minh",
      ],
    },
  ] as const,

  // ─── Four core services (brochure page 3) ───────────────────────────────
  services: [
    {
      key: "source-selection",
      nameVi: "Tuyển chọn nguồn hàng & Hỗ trợ tìm nguồn",
      nameCn: "Tuyển chọn nguồn hàng & Hỗ trợ tìm nguồn",
      desc: "Chúng tôi sàng lọc các nhà cung cấp Trung Quốc có tính cạnh tranh, kiểm soát chất lượng ngay tại nhà máy, quản lý đơn hàng và gom hàng tìm nguồn — giảm thiểu cả chi phí lẫn rủi ro trong khâu tìm nguồn.",
    },
    {
      key: "warehouse-cn",
      nameVi: "Lưu kho tại Trung Quốc & Gom hàng vận chuyển",
      nameCn: "Lưu kho tại Trung Quốc & Gom hàng vận chuyển",
      desc: "Chúng tôi xây dựng hoặc hợp tác cùng các kho hiện đại tại những khu công nghiệp và cảng trọng điểm của Trung Quốc, cung cấp dịch vụ quản lý kho an toàn và hiệu quả.",
    },
    {
      key: "logistics-customs",
      nameVi: "Logistics xuyên biên giới & Thông quan nhanh chóng",
      nameCn: "Logistics xuyên biên giới & Thông quan nhanh chóng",
      desc: "Giao từ cửa đến cửa và từ cảng đến cảng; đội ngũ thông quan của chúng tôi tại cảng Hải Phòng am hiểu luật xuất nhập khẩu, bảo đảm thông quan nhanh chóng, tuân thủ và tối ưu chi phí.",
    },
    {
      key: "vn-distribution",
      nameVi: "Phát triển kênh phân phối tại Việt Nam",
      nameCn: "Phát triển kênh phân phối nội địa",
      desc: "Mạng lưới đối tác rộng khắp Việt Nam — đưa các thương hiệu và sản phẩm Trung Quốc vào những kênh phân phối chủ lực.",
    },
  ] as const,

  // ─── Warehouse + Logistics + Customs (brochure page 6) ──────────────────
  warehouseTypes: [
    { nameVi: "Kho lưu trữ nhiệt độ thường", nameCn: "Khu lưu trữ nhiệt độ thường" },
    { nameVi: "Kho chuyên dụng cho hàng dễ cháy (sơn, dung môi)", nameCn: "Kho hàng dễ cháy (ví dụ: sơn, dung môi pha sơn)" },
    { nameVi: "Kho kiểm soát nhiệt độ & độ ẩm", nameCn: "Kho kiểm soát nhiệt độ và độ ẩm" },
  ] as const,

  // ─── Digital supply chain pillars (brochure page 7) ─────────────────────
  digitalPillars: [
    {
      nameVi: "Ra quyết định dựa trên dữ liệu",
      nameCn: "Ra quyết định dựa trên dữ liệu",
      desc: "Phân tích dữ liệu lớn để dự báo nhu cầu thị trường và tối ưu hoá tồn kho.",
    },
    {
      nameVi: "Tự động hoá thông minh",
      nameCn: "Tự động hoá thông minh",
      desc: "Thuật toán AI tự động xử lý đơn hàng, điều phối vận chuyển và tối ưu hoá tuyến logistics.",
    },
    {
      nameVi: "Mạng lưới hợp tác",
      nameCn: "Mạng lưới hợp tác",
      desc: "Nền tảng kết nối mọi nhà cung cấp, nhà sản xuất, công ty vận chuyển và kênh bán lẻ cuối cùng.",
    },
  ] as const,

  // ─── Offices (brochure page 8) ──────────────────────────────────────────
  offices: {
    cn: {
      key: "guangzhou",
      cityVi: "Quảng Châu",
      cityCn: "Quảng Châu",
      countryVi: "Trung Quốc",
      countryCn: "Trung Quốc",
      addressCn: "Tầng 3, Toà nhà 1, Cảng Shuyu Chuangxing, Bến Bắc, Làng Hoàng Phố, Đường Tân Cảng Đông, Quận Hải Châu, Quảng Châu, Trung Quốc",
      addressVi:
        "Tầng 3, Toà nhà 1, Cảng Shuyu Chuangxing, Bến Bắc, Làng Hoàng Phố, Đường Tân Cảng Đông, Quận Hải Châu, Quảng Châu, Trung Quốc",
      role: "Trung tâm tìm nguồn, đánh giá nhà máy, tìm nguồn & kiểm soát chất lượng",
      timezone: "GMT+8",
    },
    vn: {
      key: "hanoi",
      cityVi: "Hà Nội",
      cityCn: "Hà Nội",
      countryVi: "Việt Nam",
      countryCn: "Việt Nam",
      addressCn: "Tầng 7, Toà nhà Bảo Ngọc, Số 02 Đường Thanh Lãm, Phường Xuân Phương, Hà Nội, Việt Nam",
      addressVi:
        "Tầng 7, Toà nhà Bảo Ngọc, Số 02 Đường Thanh Lãm, Phường Xuân Phương, Hà Nội, Việt Nam",
      role: "Trụ sở chính · Vận hành · Phân phối tại Việt Nam",
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
    dataProtection: ["ISO/IEC 27001:2022", "NĐ 13/2023/NĐ-CP (VN)", "PIPL (China)", "GDPR (EU where applicable)"],
  } as const,
} as const;

export type Industry = (typeof COMPANY.industries)[number];
export type Service = (typeof COMPANY.services)[number];

/** Convenience: short legal line for footer. */
export const COMPANY_FOOTER_LINE = `© 2026 ${COMPANY.legalNameVi} · ${COMPANY.domain} · Tax ID: ${COMPANY.taxId}`;
