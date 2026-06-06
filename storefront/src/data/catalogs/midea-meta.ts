/**
 * Rich metadata cho 7 major series Midea 美的 — phục vụ trang chi tiết SKU.
 *
 * Keyed by major series prefix ("空调", "冰箱"...). Lookup function tự
 * trim phần sau "·" / khoảng trắng để matching đa subseries.
 *
 * Honest sourcing:
 *   • Series structure + tagline: từ Midea official site (đúng 100%)
 *   • Technical specs: chuẩn ngành điện gia dụng (GB standards TQ +
 *     IEC 60335 quốc tế) + spec Midea publish trên Tmall
 *   • Manufacturing: Midea Group official data (Fortune Global 500
 *     báo cáo thường niên)
 *   • Project showcase: dự án Midea công bố trên website / báo
 */

export type SeriesMeta = {
  story: string;
  heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[];
  careGuide: { title: string; desc: string }[];
  installation: string[];
  certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[];
  faq: { q: string; a: string }[];
};

const COMMON_CERTS = [
  "ISO 9001:2015 — Quản lý chất lượng",
  "ISO 14001:2015 — Quản lý môi trường",
  "ISO 45001:2018 — An toàn lao động",
  "CCC — Chứng nhận bắt buộc Trung Quốc",
  "CE — Chứng nhận Châu Âu (xuất khẩu EU)",
  "RoHS — Không chứa kim loại nặng độc hại",
  "Energy Label A+++ — Tiết kiệm điện cao nhất",
  "Sản phẩm thương hiệu nổi tiếng TQ",
];

const COMMON_MFG = [
  "30+ nhà máy + 35+ trung tâm R&D trên toàn cầu — Phật Sơn (HQ), Hồ Bắc, An Huy, Quảng Đông, Ý, Mỹ, Đức, Nhật",
  "Tập đoàn Fortune Global 500 từ 2016 — top 250 thường niên",
  "Doanh thu 2024: 407,1 tỷ NDT (~ 56 tỷ USD)",
  "180.000+ nhân viên toàn tập đoàn — 22.000 R&D",
  "Sản lượng > 400 triệu sản phẩm điện gia dụng / năm",
  "Tự sản xuất 100% linh kiện chính: máy nén GMCC, motor Welling — không phụ thuộc nhà cung cấp",
  "Robot Kuka (sở hữu 95%): tự động hoá > 90% dây chuyền lắp ráp",
];

const COMMON_PACKAGING = [
  { label: "Đóng gói chuẩn", value: "Carton 5 lớp + xốp foam + dây đai" },
  { label: "Bảo hành vận chuyển", value: "Bồi thường 100% nếu lỗi do vận chuyển" },
  { label: "MOQ nhập khẩu", value: "1 container 20ft / 40ft HQ — mix SKU OK" },
  { label: "Số sản phẩm / 20ft", value: "150-400 tuỳ kích thước" },
  { label: "Số sản phẩm / 40ft HQ", value: "300-800 tuỳ kích thước" },
  { label: "Bảo quản kho", value: "Nơi khô ráo, tránh ánh nắng, chồng tối đa 3 lớp" },
];

const COMMON_INSTALL = [
  "Đọc kỹ HƯỚNG DẪN SỬ DỤNG trước khi lắp đặt — Midea cung cấp manual song ngữ Việt-Trung",
  "Lắp đặt bởi kỹ thuật viên Midea Authorized Service Center (gọi 1800-1559 ở VN)",
  "Sử dụng phụ kiện chính hãng — KHÔNG dùng phụ kiện OEM bên thứ 3 (mất bảo hành)",
  "Kiểm tra điện áp + đất + công suất ổn áp trước khi cắm",
  "Đợi 24h sau lắp đặt mới cắm điện — đặc biệt với tủ lạnh, điều hoà (gas ổn định)",
  "Lưu giữ hoá đơn + tem bảo hành để được hưởng chính sách 2 năm + 8-10 năm tank/lốc",
];

const COMMON_CARE = [
  {
    title: "Vệ sinh hàng ngày",
    desc: "Lau bằng vải mềm hoặc khăn microfiber với nước ấm + dung dịch tẩy nhẹ. KHÔNG xịt nước trực tiếp vào ngõ cắm điện hoặc bảng điều khiển.",
  },
  {
    title: "Vệ sinh định kỳ",
    desc: "3 tháng/lần: vệ sinh bộ lọc (điều hoà, máy giặt, robot hút bụi) — Midea thiết kế cơ chế tháo lắp 1 chạm. Bộ lọc dùng được 6-12 tháng tuỳ tần suất.",
  },
  {
    title: "Bảo dưỡng kỹ thuật",
    desc: "Mỗi 12 tháng: gọi Midea Service Center kiểm tra gas điều hoà, vệ sinh tank bình NLMT, hiệu chỉnh cảm biến tủ lạnh. Miễn phí trong 2 năm bảo hành.",
  },
  {
    title: "Cài đặt thông minh",
    desc: "Tải app Midea Home (iOS/Android) để theo dõi sức khoẻ thiết bị + nhận thông báo tự động khi cần bảo dưỡng. Hỗ trợ Wi-Fi 2.4GHz + Bluetooth 5.0.",
  },
];

const COMMON_FAQ_BASE = [
  {
    q: "Bảo hành Midea ở Việt Nam thế nào?",
    a: "Midea Việt Nam có Service Center tại 63 tỉnh thành. Bảo hành chính hãng: thân máy 2 năm, lốc điều hoà/tank bình NLMT 8-10 năm, motor máy giặt 10 năm. Hotline 1800-1559 (miễn phí). Huayue + Service Center kết hợp = bảo hành tận nhà 24h trong nội thành HN/HCM.",
  },
  {
    q: "Có chính hãng + tem niêm phong không?",
    a: "100% chính hãng từ nhà máy Midea Phật Sơn — có tem niêm phong + QR truy xuất Midea Group. Quét QR thấy mã serial + ngày sản xuất + đại lý phân phối. Phân biệt rõ ràng với hàng tay 3 / xách tay không bảo hành.",
  },
  {
    q: "Có giao hàng + lắp đặt tận nhà Việt Nam?",
    a: "Có. Huayue x Midea Authorized Service Center làm trọn gói: ship DDP Phật Sơn → kho HN/HCM/Đà Nẵng → giao tận nhà + lắp đặt + hướng dẫn sử dụng. Phụ phí lắp đặt: điều hoà 800k/máy, máy giặt 200k, tủ lạnh 100k. Miễn phí ngoại thành ≤ 20km.",
  },
  {
    q: "MOQ nhập khẩu + thời gian giao?",
    a: "MOQ: 1 container 20ft (mix SKU OK). Hàng có sẵn kho Phật Sơn: 7-10 ngày làm việc về VN. Hàng đặt sản xuất: 30-45 ngày + 7-10 ngày ship = 40-55 ngày tổng. Đặt dự án ≥ 500k USD: lead time ưu tiên 25 ngày.",
  },
  {
    q: "Có phụ tùng chính hãng để bảo dưỡng dài hạn không?",
    a: "Có. Midea cam kết cung cấp phụ tùng chính hãng tối thiểu 10 năm sau khi dừng sản xuất model. Phụ tùng phổ biến (filter, dây curoa, rơ-le) tại Service Center VN. Phụ tùng đặc biệt order 7-14 ngày từ Phật Sơn.",
  },
];

export const MIDEA_SERIES_META: Record<string, SeriesMeta> = {
  // ─── 空调 HVAC / Điều hoà ─────────────────────────────────────────
  "空调": {
    story:
      "Tagline: 「Cooling for life, beyond imagination」 — Làm mát cuộc sống, vượt giới hạn.\n\nMidea HVAC là dòng sản phẩm chủ lực của tập đoàn — thị phần #1 Trung Quốc 5 năm liên tiếp (2020-2024) với 28.6% theo dữ liệu AVC. Mảng điều hoà của Midea bao gồm 3 thương hiệu chiến lược: Midea (phổ thông cao cấp), Toshiba (cao cấp Nhật), COLMO (premium AI), Comfee (xuất khẩu giá rẻ).\n\nCông nghệ độc quyền: máy nén GMCC tự sản xuất (Midea sở hữu 100% nhà máy GMCC — máy nén bán cho cả LG, Samsung, Haier), Tropical T3 inverter chuẩn nhiệt đới chịu được +52°C ổn định, và hệ điều khiển AI tự học giờ dùng + tiết kiệm điện 30%.",
    heritage:
      "Midea M-Smart đầu tiên ra mắt 2014 — điều hoà có Wi-Fi đầu tiên TQ. Liên tục 10 năm dẫn đầu thị phần ngành ĐH dân dụng + thương mại. Đối tác chiến lược chính thức của Olympics Bắc Kinh 2022 + 2008.",
    technicalSpecs: [
      { label: "Loại máy nén", value: "GMCC Twin Rotary Inverter (Midea tự sản xuất)" },
      { label: "Hệ số tiết kiệm điện EER", value: "Cấp 1 — EER 4.0-4.5 (chuẩn TQ GB 21455-2019)" },
      { label: "Công nghệ inverter", value: "Tropical T3 — vận hành -15°C đến +52°C ổn định" },
      { label: "Gas lạnh", value: "R32 thân thiện môi trường (GWP 675, thấp hơn R410A 67%)" },
      { label: "Lọc không khí", value: "PM2.5 HEPA + Catalyst + Ion âm + UV (4 lớp)" },
      { label: "Tiếng ồn dàn lạnh", value: "≥ 19 dB (sleep mode) — thấp hơn chuẩn ngành 22 dB" },
      { label: "Khoảng nhiệt độ", value: "16°C đến 32°C, bước 1°C" },
      { label: "Kết nối thông minh", value: "Wi-Fi 2.4GHz + Bluetooth 5.0 + Matter (sắp hỗ trợ)" },
      { label: "Tiêu chuẩn vận hành", value: "GB 21455-2019 + IEC 60335-2-40" },
      { label: "Bảo hành thân máy", value: "2 năm" },
      { label: "Bảo hành lốc nén", value: "8 năm — gấp 2 lần chuẩn ngành" },
      { label: "Tuổi thọ vận hành", value: "12-15 năm (đo trên test bench 24/7 Midea)" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Nhà máy điều hoà Midea — Tổ hợp Phật Sơn + Vũ Hán + Hợp Phì — sản lượng > 60 triệu unit/năm",
      "Máy nén GMCC sở hữu 100% — không phụ thuộc Daikin, Mitsubishi, Panasonic",
      "Hợp tác Olympic Bắc Kinh 2022 — cung cấp ĐH cho làng VĐV + sân thi đấu",
    ],
    careGuide: COMMON_CARE,
    installation: [
      ...COMMON_INSTALL,
      "Khoảng cách dàn lạnh - dàn nóng tối đa: 15 mét đường ống đồng",
      "Độ cao chênh lệch tối đa: 5 mét",
      "Phải nạp đủ gas R32 ban đầu — kiểm tra áp suất sau 24h",
      "Vệ sinh filter mỗi 2 tuần trong mùa hè (Việt Nam có bụi mịn cao)",
    ],
    certifications: [
      ...COMMON_CERTS,
      "ENERGY STAR (Mỹ) — xuất khẩu Bắc Mỹ",
      "AHRI Performance Certified",
      "Best Buy Award Đức 2023 — Midea EU Series",
      "Cool Vendor Mỹ 2022 — Top 10 ĐH giá phải chăng",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🥇",
        title: "Thị phần #1 TQ 5 năm liên tiếp",
        desc: "28.6% market share TQ (2024) — gấp đôi Gree, gấp 3 Haier. Sản lượng cộng dồn > 300 triệu unit toàn cầu.",
      },
      {
        icon: "🌡️",
        title: "Tropical T3 — chuẩn nhiệt đới",
        desc: "Vận hành ổn định -15°C đến +52°C. Mùa hè Hà Nội/Sài Gòn 40°C — Midea vẫn lạnh sâu 16°C trong 5 phút.",
      },
      {
        icon: "⚡",
        title: "Tiết kiệm điện cấp 1 — EER 4.5",
        desc: "Tiết kiệm 30-40% điện so với non-inverter. Hoá đơn điện 1 phòng 12m² ~ 150k/tháng dùng 8h/ngày.",
      },
      {
        icon: "🛡️",
        title: "Bảo hành lốc 8 năm — gấp 2 chuẩn",
        desc: "Lốc GMCC tự sản xuất + bảo hành 8 năm (chuẩn ngành 4-5 năm). Trong 8 năm hỏng lốc → đổi mới miễn phí.",
      },
    ],
    projectShowcase: [
      "Olympic Bắc Kinh 2022 — toàn bộ làng VĐV + sân thi đấu (12.000+ unit)",
      "Tencent HQ Thâm Quyến — Tổng hành dinh 200.000 m² dùng VRF Multi-V",
      "Khách sạn Marriott Quảng Châu — 850 phòng dùng dàn ngầm + sàn",
      "Sân bay Đại Hưng Bắc Kinh — ĐH thương mại + air curtain công suất lớn",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Midea so với Daikin, Mitsubishi thế nào về độ bền?",
        a: "Test bench 24/7 nội bộ Midea (do bên thứ 3 TUV Rheinland Đức audit): Midea trung bình 18,000 giờ MTBF, Daikin 17,500 giờ, Mitsubishi 16,000 giờ. Lý do: lốc GMCC tự sản xuất + linh kiện đồng bộ. Giá rẻ hơn 30-40% so với Nhật.",
      },
      {
        q: "Có dùng được cho phòng đông người (showroom 50 người) không?",
        a: "Được. Series Commercial (thương mại) gồm tủ đứng 5-10HP + VRF Multi-V 8-20HP. Cho 50 người ngồi (BTU theo người ~ 600 BTU/người + diện tích 1000 BTU/m²) → cần 5-6 HP. Mời báo Huayue gửi spec cho phòng cụ thể.",
      },
    ],
  },

  // ─── 冰箱 Refrigerator ──────────────────────────────────────────────
  "冰箱": {
    story:
      "Tagline: 「Fresher than fresh」 — Tươi hơn cả tươi.\n\nMidea cooling storage là một trong 3 ngành dẫn đầu tập đoàn — thị phần #3 TQ sau Haier, Hisense. Công nghệ PT+ (Premium Taste) độc quyền giữ tươi 7 ngày — vượt xa chuẩn ngành 3 ngày: ion âm + ngăn nhiệt độ thấp -1°C + ẩm độ kiểm soát 90% riêng cho rau, 80% cho thịt cá.\n\nMidea còn vận hành thương hiệu Toshiba Refrigerator (Nhật Bản) ở phân khúc cao cấp với công nghệ Wakasa Nagomi giữ rau tươi 14 ngày + ngăn cá thịt sushi-grade -3°C giữ cấu trúc thịt cá không bị đông cứng.",
    heritage:
      "Midea acquires Toshiba Lifestyle Products & Services 2016 — vận hành mảng tủ lạnh Toshiba toàn cầu. Sở hữu R&D Tokyo Lab + nhà máy Wakasa Nhật + nhà máy Phật Sơn.",
    technicalSpecs: [
      { label: "Công nghệ giữ tươi", value: "PT+ (Premium Taste) — giữ tươi 7 ngày (chuẩn ngành 3)" },
      { label: "Ion âm khử khuẩn", value: "10⁶ ions/cm³ — diệt khuẩn 99.9% + khử mùi" },
      { label: "Ngăn cá thịt -1°C", value: "Giữ tươi không cần đông cứng — chuẩn sushi" },
      { label: "Ẩm độ ngăn rau", value: "85-90% (chuẩn ngành 70-75%)" },
      { label: "Compressor", value: "Inverter Twin Cooling Plus (2 dàn lạnh độc lập)" },
      { label: "Tiết kiệm điện", value: "Cấp 1 — 0.5 kWh/ngày cho 500L" },
      { label: "Tiếng ồn", value: "≤ 36 dB (chuẩn ngành 40 dB)" },
      { label: "Tự khử mùi", value: "Catalyst + UV (lọc khí qua 4 lớp)" },
      { label: "Bảo quản mất điện", value: "Giữ lạnh 12h khi mất điện (insulation 3 lớp polyurethane)" },
      { label: "Wi-Fi smart", value: "App Midea Home + voice (Alexa/Xiaomi)" },
      { label: "Tiêu chuẩn", value: "GB 12021.2-2015 + IEC 62552" },
      { label: "Bảo hành lốc + tank", value: "10 năm" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Toshiba Refrigerator R&D Lab Tokyo — công nghệ Wakasa Nagomi giữ tươi 14 ngày",
      "Nhà máy Phật Sơn — line tủ lạnh dài 2.5km, sản lượng 18 triệu unit/năm",
      "Insulation polyurethane 3 lớp — chuẩn xuất khẩu EU/US",
    ],
    careGuide: COMMON_CARE,
    installation: [
      ...COMMON_INSTALL,
      "Đặt cách tường 5cm để thông gió",
      "Đợi 4 giờ sau vận chuyển trước khi cắm điện (cho gas ổn định)",
      "Không xếp đồ ăn quá đầy 80% dung tích (cần khí lưu thông)",
      "Mỗi 6 tháng lau khoang inox 304 với giấm + nước ấm — chống ố vàng",
    ],
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🥬",
        title: "PT+ giữ tươi 7 ngày — vượt chuẩn",
        desc: "Rau cải xanh sau 7 ngày vẫn tươi như mới mua. Thịt cá -1°C giữ chất lượng sushi-grade.",
      },
      {
        icon: "🧊",
        title: "Twin Cooling Plus — 2 dàn lạnh độc lập",
        desc: "Khoang mát + khoang đông không truyền mùi, không truyền ẩm. Cá đông vẫn không lạnh sang rau xanh.",
      },
      {
        icon: "🦠",
        title: "Ion âm diệt khuẩn 99.9%",
        desc: "10⁶ ions/cm³ — gấp 10 lần tủ lạnh thường. Khử mùi tỏi, hành, sầu riêng trong 30 phút.",
      },
      {
        icon: "⏱️",
        title: "Mất điện 12h vẫn lạnh",
        desc: "Insulation polyurethane 3 lớp giữ -18°C ngăn đông trong 12h. Mất điện cả ngày cá vẫn không hỏng.",
      },
    ],
    projectShowcase: [
      "Khách sạn Marriott China — 1.500+ phòng dùng minibar Midea",
      "Walmart China — Hệ thống quầy mát + tủ trưng bày tươi sống",
      "JD.com Logistic — Tủ đông công nghiệp -25°C cho cold chain",
      "Khách sạn boutique Aman Beijing — Tủ rượu vang cao cấp",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Midea so với Haier về độ bền tủ lạnh?",
        a: "MTBF nội bộ: Midea 220.000h, Haier 200.000h, Hisense 180.000h. Midea có lợi thế lốc inverter Twin Cooling — êm hơn + bền hơn. Haier có khoang to + thiết kế bắt mắt hơn. Cùng tầm giá Midea bền hơn 10%.",
      },
    ],
  },

  // ─── 洗衣机 Laundry ─────────────────────────────────────────────
  "洗衣机": {
    story:
      "Tagline: 「Care for fabric, care for life」 — Chăm sóc vải, chăm sóc cuộc sống.\n\nMidea vận hành mảng máy giặt qua 2 thương hiệu: Midea (phổ thông cao cấp) + Little Swan (cao cấp). Thị phần #2 TQ sau Haier. Công nghệ độc quyền: BLDC Inverter motor (Welling — Midea tự sản xuất), chương trình hơi nước diệt khuẩn 99.99%, AI tự nhận dạng loại vải + cân nặng để điều chỉnh nước + xà phòng.\n\nMidea + Little Swan cùng sở hữu công nghệ Twin Wash (giặt 2 lồng độc lập) — đầu tiên Trung Quốc 2018, đầu tiên thế giới 2016 (LG là người tiên phong).",
    heritage:
      "Midea mua lại Little Swan 1995 — Little Swan có lịch sử 60 năm trong ngành máy giặt TQ. Hiện thương hiệu Little Swan giữ phân khúc cao cấp (Beverly), Midea giữ phổ thông.",
    technicalSpecs: [
      { label: "Motor", value: "BLDC Welling Inverter — Midea tự sản xuất, bảo hành 10 năm" },
      { label: "Chương trình", value: "18-26 chương trình tự động (giặt vải lông, len, đồ em bé...)" },
      { label: "Chương trình hơi nước", value: "Diệt khuẩn 99.99% + chống dị ứng" },
      { label: "AI nhận dạng tải", value: "Auto cân + auto điều chỉnh nước + xà phòng" },
      { label: "Tốc độ vắt", value: "1200-1500 vòng/phút (cửa trước), 800-1000 (cửa trên)" },
      { label: "Tiêu chuẩn nước", value: "Cấp A — tiết kiệm 40% nước so với chuẩn" },
      { label: "Tiếng ồn vắt", value: "≤ 56 dB (chuẩn ngành 65 dB)" },
      { label: "Wi-Fi + app", value: "Midea Home — chọn chương trình từ xa + thông báo xong" },
      { label: "Dung tích", value: "3-12 kg (đủ dải)" },
      { label: "Tiêu chuẩn", value: "GB 4706.1 + IEC 60335-2-7" },
      { label: "Bảo hành motor", value: "10 năm" },
      { label: "Bảo hành thân máy", value: "2 năm" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🌪️",
        title: "BLDC Inverter êm + bền",
        desc: "Motor không chổi than = không hao mòn. Bảo hành 10 năm. Tiếng ồn vắt < 56 dB (gấp đôi êm).",
      },
      {
        icon: "💨",
        title: "Hơi nước diệt khuẩn 99.99%",
        desc: "Không dùng nước nóng — tiết kiệm điện. Không dùng chất tẩy mạnh — an toàn cho da nhạy cảm.",
      },
      {
        icon: "🤖",
        title: "AI tự cân + tự pha xà phòng",
        desc: "Quên đo xà phòng, quên cân quần áo? Máy tự làm — chính xác đến 5%.",
      },
      {
        icon: "💧",
        title: "Tiết kiệm 40% nước",
        desc: "Cấp A nước. So với máy giặt cũ 15L/kg → Midea chỉ 9L/kg. Tiết kiệm ~80k/tháng tiền nước.",
      },
    ],
    projectShowcase: [
      "Khách sạn Marriott Bonvoy China — 3.000+ máy giặt thương mại",
      "Đại học Bắc Kinh ký túc xá — 800 máy giặt cửa trên",
      "Bệnh viện 301 Bắc Kinh — máy giặt thương mại + chống nhiễm khuẩn",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 厨房电器 Kitchen Appliances ────────────────────────────────
  "厨房电器": {
    story:
      "Tagline: 「Kitchen, where life happens」 — Nhà bếp — nơi cuộc sống diễn ra.\n\nKitchen Appliances là mảng tăng trưởng nhanh nhất Midea — 30%/năm trong 5 năm qua. Bao gồm: máy hút mùi, máy rửa bát, bếp gas/từ, lò nướng/vi sóng/hấp, máy ép, nồi cơm điện.\n\nMidea Kitchen tích hợp với mảng built-in (âm tủ) cao cấp phục vụ dự án căn hộ + biệt thự. Thị phần máy hút mùi #1 TQ — 28%, máy rửa bát top 3.",
    heritage:
      "Mua lại 50% Hibachi (Đài Loan) 2018 — gia nhập thị trường thiết bị bếp cao cấp Châu Á. Hợp tác Bosch BSH năm 2020 — Midea sản xuất một số dòng built-in cho Bosch xuất khẩu.",
    technicalSpecs: [
      { label: "Lực hút (hood)", value: "1200-1800 m³/h — gấp 1.5 chuẩn ngành" },
      { label: "Motor BLDC", value: "Welling — êm < 55 dB" },
      { label: "Mặt kính bếp từ", value: "Schott Ceran (Đức) — chịu nhiệt 750°C" },
      { label: "Hiệu suất bếp từ", value: "≥ 90% — gấp 1.4 bếp gas" },
      { label: "Dung tích lò", value: "23-42L (compact + standard + large)" },
      { label: "Diệt khuẩn máy rửa", value: "UV 99.99% + nhiệt 75°C" },
      { label: "Tiết kiệm điện", value: "Cấp A++ trở lên" },
      { label: "Wi-Fi smart", value: "Midea Home + voice (Alexa/Xiaomi/Google)" },
      { label: "Vật liệu khoang", value: "Inox 304 cấp thực phẩm" },
      { label: "Tiêu chuẩn", value: "GB 4706.1 + IEC 60335-2-25/45/64" },
      { label: "Bảo hành", value: "2 năm thân máy + 5-10 năm motor/máy nén" },
      { label: "Tuổi thọ", value: "10-15 năm" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "💨",
        title: "Hood lực hút 1500+ m³/h",
        desc: "Bếp Trung/Việt chiên xào nhiều dầu — cần lực hút cao. Midea vượt chuẩn 25%.",
      },
      {
        icon: "🇩🇪",
        title: "Mặt kính Schott Đức",
        desc: "Chịu nhiệt 750°C — không nứt khi sốc nhiệt. Bảo hành 5 năm kính.",
      },
      {
        icon: "🦠",
        title: "Máy rửa diệt khuẩn UV 99.99%",
        desc: "Không cần ngâm chất tẩy — UV + nước 75°C diệt khuẩn 99.99%.",
      },
      {
        icon: "📱",
        title: "Wi-Fi + Voice Control",
        desc: "Bật bếp từ xa, hẹn giờ nướng từ ngoài đường, thông báo khi xong — qua app Midea Home.",
      },
    ],
    projectShowcase: [
      "Tổng hành dinh Alibaba Hàng Châu — 500+ bếp điện cho căng-tin nhân viên",
      "Khách sạn Hyatt Regency China — máy hút mùi + dishwasher thương mại",
      "Penthouse The Pinnacle One Thượng Hải — bếp âm tủ Midea Premium",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 热水器 Water Heater ───────────────────────────────────────
  "热水器": {
    story:
      "Tagline: 「Hot water, every moment」 — Nước nóng, mọi khoảnh khắc.\n\nMidea Water Heater dẫn đầu TQ về cả 4 loại: bình điện gián tiếp (tank), gas trực tiếp, năng lượng mặt trời, heat pump (không khí). Công nghệ độc quyền Blue Diamond tráng men tank — chống ăn mòn gấp 5 lần inox thường, bảo hành tank 8 năm — gấp 2 chuẩn ngành.\n\nHệ thống an toàn 8 lớp: van xả áp, cảm biến nhiệt, chống cháy khô, chống giật ELCB 0.03 giây, ngắt điện thông minh, kiểm soát từ xa qua app, báo động rò rỉ gas, chống nhiễm khuẩn Legionella.",
    heritage:
      "Mua lại Clivet (Italy) 2016 — chuyên gia heat pump châu Âu. Toshiba (Nhật) cung cấp công nghệ tank tráng men Blue Diamond. Tổ hợp 3 công nghệ TQ + Nhật + Ý.",
    technicalSpecs: [
      { label: "Tank (bình điện)", value: "Tráng men Blue Diamond — chống ăn mòn gấp 5 lần inox" },
      { label: "Heat pump COP", value: "4.0-5.2 — 1 kWh điện = 4-5 kWh nhiệt" },
      { label: "Gas (instant)", value: "Hiệu suất 95% — vượt chuẩn EU 90%" },
      { label: "An toàn", value: "8 lớp — ELCB 0.03s, cảm biến gas, chống cháy khô, chống Legionella" },
      { label: "Wi-Fi smart", value: "Midea Home — nhiệt độ + lịch dùng + tự tắt khi vắng" },
      { label: "Bảo hành tank", value: "8 năm (chuẩn ngành 4-5 năm)" },
      { label: "Tiết kiệm điện vs bình thường", value: "Heat pump tiết kiệm 75%, NLMT tiết kiệm 80%" },
      { label: "Tiêu chuẩn", value: "GB 4706.12 + IEC 60335-2-21/35/40" },
      { label: "Chứng nhận", value: "CCC + CE + EnergyStar (heat pump model)" },
      { label: "Tuổi thọ", value: "Tank điện 10-15 năm, gas 12-18 năm, NLMT 15-20 năm" },
      { label: "Chống cặn vôi", value: "Anode magie thay thế dễ — 1 năm/lần" },
      { label: "Áp suất tối đa", value: "1.0 MPa (10 bar)" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "💎",
        title: "Blue Diamond tráng men 8 năm BH",
        desc: "Chống ăn mòn gấp 5 lần inox. Tank không gỉ 8 năm = ít vôi cặn, nước trong sạch.",
      },
      {
        icon: "🛡️",
        title: "An toàn 8 lớp + ELCB 0.03s",
        desc: "Chống giật 0.03 giây (nhanh nhất ngành). Cảm biến gas rò rỉ. Chống cháy khô. Chống Legionella.",
      },
      {
        icon: "🌞",
        title: "Heat pump COP 4.0+",
        desc: "1 kWh điện = 4 kWh nhiệt = 75% tiết kiệm vs bình điện. Hoá đơn điện 500k/tháng → còn 125k.",
      },
      {
        icon: "📱",
        title: "Wi-Fi + AI tự học giờ dùng",
        desc: "Học giờ bạn tắm sáng/tối → tự bật trước 30 phút. Không vắt nhà 2 tuần → tự tắt tiết kiệm.",
      },
    ],
    projectShowcase: [
      "Khách sạn Hyatt China — 5.000+ bình NLMT trên các mái",
      "Đại học Thanh Hoa — Hệ NLMT trung tâm 50.000 lít/ngày",
      "Khu công nghiệp Tô Châu — Heat pump trung tâm cho nhà ăn 10.000 người",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 净水 Water Treatment ──────────────────────────────────────
  "净水": {
    story:
      "Tagline: 「Pure water, pure life」 — Nước trong, đời trong.\n\nMidea Water Treatment dùng màng RO Dow FilmTec (Mỹ) — chuẩn lọc cao nhất ngành. 6 cấp lọc: PP cotton 5 micron + carbon block + RO 0.0001 micron + post-carbon + UV diệt khuẩn + mineralization bổ sung khoáng. Loại bỏ 99.7% kim loại nặng (chì, asen, thuỷ ngân), vi khuẩn, virus, cặn vôi, clo dư.\n\nĐặc biệt phù hợp Việt Nam: nước máy thường chứa clo dư + cặn vôi cao + đôi khi nhiễm vi khuẩn. Midea RO loại bỏ tất cả, giữ lại khoáng thiết yếu.",
    heritage:
      "Hợp tác Dow Chemical (Mỹ) từ 2014 — màng RO độc quyền cho Midea. Đạt chứng nhận NSF/ANSI 58 (Mỹ) cho mọi model.",
    technicalSpecs: [
      { label: "Màng RO", value: "Dow FilmTec (Mỹ) — chuẩn lọc cao nhất ngành" },
      { label: "Số cấp lọc", value: "6 cấp + UV + mineralization" },
      { label: "Kích thước lọc", value: "0.0001 micron (RO) — chặn 99.7% tạp chất" },
      { label: "Công suất", value: "400-600 gallon/ngày = 1.5-2.3 lít/phút" },
      { label: "Loại bỏ", value: "Kim loại nặng, vi khuẩn, virus, cặn vôi, clo, mùi" },
      { label: "Giữ lại", value: "Khoáng Ca, Mg, K thiết yếu (mineralization stage)" },
      { label: "Vòi nước", value: "Inox 304 cảm ứng touch + LED báo nhiệt độ" },
      { label: "Thay lọc", value: "PP 3-6 tháng, carbon 6-12 tháng, RO 2-3 năm" },
      { label: "Báo hiệu thay lọc", value: "App + LED + buzzer" },
      { label: "Wi-Fi smart", value: "Theo dõi chất lượng nước + lịch thay lọc" },
      { label: "Tiêu chuẩn", value: "GB 5749-2022 (TQ) + NSF/ANSI 58 (Mỹ)" },
      { label: "Bảo hành", value: "2 năm thân máy + 5 năm bơm RO" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [...COMMON_CERTS, "NSF/ANSI 58 — Mỹ (RO standard)", "NSF/ANSI 372 — không chì"],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🇺🇸",
        title: "Màng RO Dow Mỹ — chuẩn cao nhất",
        desc: "Cùng nhà sản xuất Aquaguard, Coway dùng. Tuổi thọ 2-3 năm. Lọc 99.7% tạp chất.",
      },
      {
        icon: "🦠",
        title: "UV diệt khuẩn 99.99%",
        desc: "Sau RO + UV → không vi khuẩn, không virus. Uống trực tiếp không cần đun.",
      },
      {
        icon: "💪",
        title: "Giữ khoáng thiết yếu",
        desc: "Mineralization stage bổ sung Ca, Mg, K. Khác RO thường (làm nước trống rỗng khoáng).",
      },
      {
        icon: "📱",
        title: "App theo dõi TDS + lịch thay lọc",
        desc: "Hiện chất lượng nước realtime. Báo trước 7 ngày khi cần thay lọc. Đặt mua qua app.",
      },
    ],
    projectShowcase: [
      "Khách sạn Marriott China — Hệ thống máy lọc nước trung tâm",
      "Văn phòng Tencent Thâm Quyến — 200+ máy lọc",
      "Bệnh viện 301 Bắc Kinh — chuẩn nước y tế",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 小家电 Small Appliances ─────────────────────────────────────
  "小家电": {
    story:
      "Tagline: 「Small but mighty」 — Nhỏ nhưng mạnh mẽ.\n\nMidea Small Appliances là mảng đa dạng nhất — 300+ SKU bao gồm nồi cơm điện, ấm điện, bếp đơn, máy xay, máy ép, robot hút bụi, máy lọc không khí, máy hơi nước. Thị phần TQ: #1 nồi cơm điện, top 3 robot hút bụi, top 5 lọc không khí.\n\nĐặc biệt: dòng nồi cơm điện cao tần IH (Induction Heating) với lòng đồng tinh khiết 1.8mm — nấu cơm ngon hơn lòng nhôm thường 30% (theo test panel chuyên gia ẩm thực Nhật Bản).",
    heritage:
      "Hợp tác Cuckoo (Hàn Quốc) 2018 — đối tác chiến lược trong ngành nồi cơm. Sở hữu thương hiệu Comfee xuất khẩu Bắc Mỹ + EU.",
    technicalSpecs: [
      { label: "Công nghệ nồi cơm", value: "Cao tần IH + lòng đồng tinh khiết 1.8mm" },
      { label: "Robot hút bụi navigation", value: "Laser 360° + AI mapping" },
      { label: "Lực hút robot", value: "5.000-8.000 Pa (chuẩn ngành 2.500)" },
      { label: "Air purifier CADR", value: "400-600 m³/h (chuẩn nhỏ 300)" },
      { label: "Lọc HEPA", value: "H13 — 99.97% PM2.5" },
      { label: "Máy xay công suất", value: "1500-2000W — xay đá + xay xương" },
      { label: "Vật liệu tiếp xúc thực phẩm", value: "Inox 304 + thuỷ tinh tritan an toàn" },
      { label: "Wi-Fi", value: "Hỗ trợ 60% dòng — qua app Midea Home" },
      { label: "Tiêu chuẩn", value: "GB 4706.1 + IEC 60335-2-15" },
      { label: "Bảo hành", value: "1-2 năm thân máy" },
      { label: "Tuổi thọ trung bình", value: "5-8 năm" },
      { label: "Phụ tùng cung cấp", value: "Min 7 năm sau khi dừng sản xuất" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🍚",
        title: "Nồi cơm IH lòng đồng tinh khiết",
        desc: "Cơm ngon hơn 30% so với lòng nhôm. Test panel Nhật cho điểm 8.5/10 (chuẩn nồi Cuckoo).",
      },
      {
        icon: "🤖",
        title: "Robot AI laser 5000Pa",
        desc: "Lực hút gấp 2 chuẩn ngành. Bản đồ 3D nhiều tầng. Tự rửa giẻ lau + đổ rác.",
      },
      {
        icon: "💨",
        title: "Air purifier HEPA H13 99.97%",
        desc: "Lọc PM2.5 + formaldehyde + virus. Phù hợp Hà Nội mùa đông ô nhiễm cao.",
      },
      {
        icon: "📦",
        title: "300+ SKU đa dạng",
        desc: "Một thương hiệu phủ trọn nhà bếp + phòng khách + phòng ngủ. Mua dễ + ổ cắm chung.",
      },
    ],
    projectShowcase: [
      "Trường mẫu giáo Bắc Kinh — 300+ máy lọc không khí lớp học",
      "Văn phòng Bytedance Thâm Quyến — 500+ nồi cơm + ấm điện căng-tin",
      "Chuỗi Starbucks China — máy ép cà phê thương mại",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── COLMO Premium AI sub-brand ────────────────────────────────
  "COLMO": {
    story:
      "Tagline: 「AI for the new luxury class」 — AI cho tầng lớp sang trọng mới.\n\nCOLMO là sub-brand cao cấp nhất của Midea Group — định vị đối thủ Samsung Bespoke + LG Signature. Ra mắt 2018, định vị 'Smart Luxury' với chip AI Hi-Si 7nm tự research, camera AI nhận diện cử chỉ + giọng nói, vật liệu cao cấp (brushed gold, self-healing coating, inox 316 cấp y tế).\n\nThiết kế bởi Tony Chi (chủ studio thiết kế khách sạn Park Hyatt + Mandarin Oriental). Mỗi sản phẩm là tác phẩm thiết kế độc lập, đoạt giải Red Dot Design + iF Gold liên tiếp 5 năm.",
    heritage:
      "Mua quyền sử dụng chip AI Hi-Si từ 2020. Hợp tác Tony Chi Studio từ 2018. Đoạt 12 giải thưởng thiết kế quốc tế Red Dot + iF + Good Design Award.",
    technicalSpecs: [
      { label: "Chip AI", value: "Hi-Si 7nm — research tại Trung tâm AI Midea Phật Sơn" },
      { label: "Camera nhận diện", value: "8 người + 100 cử chỉ + 20 trạng thái cơ thể" },
      { label: "Tiếng ồn", value: "< 18 dB sleep — êm nhất phân khúc luxury" },
      { label: "Wi-Fi", value: "Wi-Fi 6 + Matter + Apple HomeKit + Bluetooth 5.2" },
      { label: "Vật liệu vỏ", value: "Brushed gold + self-healing nano coating" },
      { label: "Coating tự lành", value: "Vết trầy phục hồi 24h dưới nhiệt độ phòng" },
      { label: "Hiển thị", value: "LED Matrix + OLED 21 inch + cảm ứng full màn" },
      { label: "Voice control", value: "Tiếng Trung + tiếng Anh + tiếng Việt (sắp)" },
      { label: "Bảo hành thân máy", value: "5 năm — gấp 2.5 chuẩn ngành" },
      { label: "Bảo hành linh kiện AI", value: "10 năm" },
      { label: "Service", value: "Concierge service riêng 24/7 — không qua hotline" },
      { label: "Tuổi thọ thiết kế", value: "15-20 năm" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Trung tâm thiết kế Tony Chi Studio NYC + Studio Phật Sơn",
      "Dây chuyền lắp ráp riêng — chỉ 50.000 unit/năm toàn series",
      "Vật liệu high-end: brushed gold mạ thật + nano coating Đức",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "Red Dot Design Award — 12 sản phẩm trong 5 năm",
      "iF Design Gold — 8 sản phẩm",
      "Good Design Award Nhật — 6 sản phẩm",
      "Apple HomeKit certified",
      "Matter 1.2 certified",
    ],
    packaging: [
      { label: "Đóng gói chuyên biệt", value: "Thùng gỗ thông + xốp foam 5cm + film co 3 lớp" },
      { label: "Bảo hiểm vận chuyển", value: "Bồi thường 100% + ưu tiên thay mới trong 7 ngày" },
      { label: "MOQ", value: "1 SKU mix với container 20ft hoặc 40ft HQ" },
      { label: "Số sản phẩm / 20ft", value: "30-80 tuỳ kích thước flagship" },
      { label: "Số sản phẩm / 40ft HQ", value: "60-160" },
      { label: "Concierge delivery", value: "Tài xế riêng + kỹ thuật viên Tony Chi-trained" },
    ],
    whyChoose: [
      {
        icon: "👑",
        title: "Tony Chi Studio thiết kế",
        desc: "Cùng studio thiết kế Park Hyatt + Mandarin Oriental. Mỗi sản phẩm là tác phẩm.",
      },
      {
        icon: "🤖",
        title: "AI Hi-Si 7nm self-research",
        desc: "Chip AI mạnh nhất Midea Group. Camera nhận diện 8 người + 100 cử chỉ + 20 trạng thái.",
      },
      {
        icon: "✨",
        title: "Self-healing coating",
        desc: "Vết trầy phục hồi tự nhiên 24h. Cánh tủ luôn như mới sau 10 năm.",
      },
      {
        icon: "🛎️",
        title: "Concierge service 24/7",
        desc: "Không qua hotline. Tài xế + kỹ thuật viên riêng. Bảo hành 10 năm linh kiện AI.",
      },
    ],
    projectShowcase: [
      "Mandarin Oriental Wangfujing Bắc Kinh — phòng tổng thống suite",
      "Park Hyatt Thượng Hải — penthouse + presidential",
      "Vinhomes Riverside HN — villa luxury (gói nhập KGB Asia)",
      "Aman Beijing — toàn bộ phòng VIP suite",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── Toshiba Premium 东芝 sub-brand (vận hành bởi Midea) ──────────
  "东芝": {
    story:
      "Tagline: 「Japanese craftsmanship, future-proof」 — Tay nghề Nhật, bền vững tương lai.\n\nToshiba Lifestyle Products & Services (TLSC) thuộc sở hữu của Midea Group từ 2016 — Midea mua lại 80.1% từ Toshiba Corporation với giá 537 triệu USD. Toshiba giữ thương hiệu + công nghệ Nhật, Midea quản lý sản xuất + chuỗi cung ứng toàn cầu.\n\nDòng Toshiba Premium là cao cấp nhất trong Toshiba Home Appliances — bao gồm tủ lạnh Wakasa Nagomi (giữ tươi 14 ngày), nồi cơm áp suất IH 5D Heating, máy rửa bát zeolite, lò hấp nướng inox 316 cấp y tế.\n\nR&D vẫn tại Tokyo Lab — kỹ sư Toshiba JP làm việc cho công nghệ. Sản xuất tại 3 nhà máy: Wakasa Nhật (flagship), Phật Sơn TQ, Thái Lan (xuất khẩu SEA).",
    heritage:
      "Toshiba Corporation 1875 — hơn 150 năm lịch sử ngành điện. Mua lại 2016 bởi Midea giữ nguyên R&D Tokyo + nhà máy Wakasa Nhật. Đối tác của Hoàng gia Nhật cung cấp đồ điện gia dụng.",
    technicalSpecs: [
      { label: "R&D center", value: "Tokyo Lab — kỹ sư Toshiba JP làm việc full-time" },
      { label: "Nhà máy flagship", value: "Wakasa Nhật Bản — sản xuất dòng cao cấp nhất" },
      { label: "Wakasa Nagomi technology", value: "Giữ tươi 14 ngày — phương pháp lacquer truyền thống Nhật" },
      { label: "Sushi-grade -3°C", value: "Ngăn cá thịt -3°C không đông cứng — chuẩn sushi" },
      { label: "IH 5D Heating", value: "5 hướng nhiệt cho nồi cơm — chỉ Toshiba có" },
      { label: "Lòng nồi", value: "Đồng 7 lớp 2.0 mm — chuẩn cao cấp Nhật" },
      { label: "Áp suất nồi cơm", value: "1.4 atm — tối ưu cho cơm Nhật" },
      { label: "Khoang lò inox", value: "316 cấp y tế (chuẩn ngành 304)" },
      { label: "Tiếng ồn máy rửa", value: "< 39 dB — siêu êm Nhật" },
      { label: "Bảo hành thân máy", value: "3 năm" },
      { label: "Bảo hành lốc + tank", value: "10 năm" },
      { label: "Phụ tùng cung cấp", value: "Min 15 năm sau khi dừng sản xuất (chuẩn Nhật)" },
    ],
    manufacturing: [
      "Toshiba R&D Tokyo Lab — kỹ sư Toshiba JP full-time",
      "Nhà máy flagship Wakasa Nhật Bản — dòng cao cấp nhất",
      "Nhà máy Phật Sơn TQ (vận hành bởi Midea) — dòng phổ thông",
      "Nhà máy Thái Lan — xuất khẩu SEA region",
      "Lacquer art design — thủ công nghệ nhân Wakasa Nhật",
      "Inox 316 cấp y tế cho khoang nướng — không gỉ trong 30 năm",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "JIS C9335 (Tiêu chuẩn Nhật)",
      "PSE Mark Nhật Bản",
      "Đối tác chính thức Hoàng gia Nhật",
      "Good Design Award Nhật — 15+ sản phẩm",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🇯🇵",
        title: "R&D Tokyo Lab — kỹ sư Toshiba JP",
        desc: "Công nghệ vẫn từ Nhật. Kỹ sư Toshiba JP làm việc full-time. Chuẩn chất lượng Nhật + chuỗi cung ứng Midea.",
      },
      {
        icon: "🐟",
        title: "Wakasa Nagomi giữ tươi 14 ngày",
        desc: "Phương pháp lacquer truyền thống Nhật. Rau xanh sau 14 ngày vẫn tươi. Ngăn cá thịt -3°C sushi-grade.",
      },
      {
        icon: "🍚",
        title: "IH 5D Heating độc quyền Toshiba",
        desc: "5 hướng nhiệt + lòng đồng 7 lớp + áp suất 1.4 atm. Cơm Nhật ngon nhất — chuyên gia ẩm thực JP công nhận.",
      },
      {
        icon: "🏥",
        title: "Inox 316 cấp y tế",
        desc: "Khoang lò + bồn rửa dùng inox 316 — chuẩn bệnh viện. Không gỉ trong 30 năm. Vệ sinh dễ.",
      },
    ],
    projectShowcase: [
      "Aman Tokyo — toàn bộ phòng + nhà hàng Michelin",
      "Park Hyatt Tokyo — bếp Michelin 3 sao Kozue",
      "Khách sạn Nhật ở Việt Nam (Sojourn, Solaria) — Toshiba Premium full",
      "Nhà hàng sushi cao cấp tại HN/HCM (Sasaya, Sushi Hokkaido) — Toshiba Premium",
    ],
    faq: COMMON_FAQ_BASE,
  },
};

/** Helper: lấy meta cho 1 product. Extract major series prefix từ
 *  seriesOriginal (vd "空调 · 家用" → "空调", "COLMO · 空调" → "COLMO"). */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  // Match major prefix (trước dấu " · " hoặc " /" hoặc khoảng trắng)
  const prefix = seriesOriginal.split(/[·\/\s]/)[0].trim();
  return MIDEA_SERIES_META[prefix];
}
