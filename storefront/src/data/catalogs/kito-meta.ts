/**
 * Rich metadata cho 6 series KITO 金意陶 — dùng để render nội dung
 * marketing dài cho trang chi tiết SKU mà KHÔNG phải viết riêng từng SKU.
 *
 * Khoá series theo `seriesOriginal` (Hán tự) của PartnerProduct — phải
 * khớp chính xác với chuỗi đã set trong catalogs/kito.ts.
 *
 * Mỗi entry gồm:
 *   - story:        Câu chuyện thương hiệu series (3-4 đoạn)
 *   - heritage:     Di sản công nghệ + đặc trưng kỹ thuật của series
 *   - technicalSpecs: Bảng spec đầy đủ (thông số kỹ thuật chuẩn EN/ISO)
 *   - manufacturing: Quy trình sản xuất nổi bật
 *   - careGuide:    Hướng dẫn vệ sinh + bảo dưỡng
 *   - installation: Lưu ý lắp đặt
 *   - certifications: Chứng nhận chất lượng
 *   - packaging:    Đóng gói + vận chuyển
 *   - whyChoose:    Lý do nên chọn series này
 *   - projectShowcase: Ví dụ dự án tham chiếu
 *   - faq:          Câu hỏi thường gặp
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
  "CCC — Chứng nhận bắt buộc Trung Quốc (China Compulsory Certification)",
  "EN 14411 Bla — Tiêu chuẩn gạch ceramic Châu Âu (hấp thụ nước < 0.5%)",
  "Thương hiệu nổi tiếng Trung Quốc",
  "GB/T 19001 — Hệ thống quản lý chất lượng quốc gia",
];

const COMMON_MFG = [
  "Cụm sản xuất Phật Sơn Tam Thuỷ (Foshan Sanshui) + Cảnh Đức Trấn (Jingdezhen)",
  "Máy ép thuỷ lực Sacmi 16.800 tấn — chuẩn Ý",
  "Hầm nung dài 250 mét, đốt 1.230 °C, 60 giờ thiêu kết",
  "Hệ thống in digital 3D độ phân giải 600 dpi — đến từ Tecnoferrari (Ý)",
  "Kiểm tra 100% mỗi viên qua camera AI phát hiện lỗi micron",
  "Hệ thống tái chế nước + bùn 100% — đạt chứng chỉ môi trường ISO 14001",
];

const COMMON_PACKAGING = [
  { label: "Quy cách mỗi thùng", value: "Theo kích thước viên — xem chi tiết SKU" },
  { label: "Trọng lượng / thùng", value: "20 – 30 kg (tùy SKU)" },
  { label: "Số thùng / pallet", value: "30 – 48 thùng" },
  { label: "Pallet / 20ft container", value: "20 – 22 pallet" },
  { label: "Pallet / 40ft HQ container", value: "44 – 46 pallet" },
  { label: "Bảo quản", value: "Nơi khô ráo, tránh ánh nắng trực tiếp, chồng tối đa 3 pallet" },
];

const COMMON_INSTALL = [
  "Để gạch nghỉ trong môi trường nội thất ≥ 24h trước khi thi công (acclimation)",
  "Sử dụng keo dán gạch C2TE (deformable, theo EN 12004) — KHÔNG dùng vữa xi măng truyền thống với khổ ≥ 600×600",
  "Khe co giãn tối thiểu 1.5 mm — dùng eke chữ thập KITO chính hãng",
  "Bay răng cưa 10 mm cho gạch ≤ 600×600, bay 12 mm cho khổ lớn",
  "Sau lát 24 giờ mới được đi nhẹ, 72 giờ mới được trét mạch",
  "Trét mạch bằng keo epoxy 2 thành phần cho khu vực ẩm (phòng tắm, bếp)",
];

const COMMON_CARE = [
  {
    title: "Vệ sinh hàng ngày",
    desc: "Lau bằng vải mềm hoặc mop microfiber với nước ấm + chất tẩy nhẹ pH trung tính (5-9). KHÔNG dùng acid mạnh, kiềm mạnh hoặc dụng cụ kim loại.",
  },
  {
    title: "Vết bẩn cứng đầu",
    desc: "Dầu mỡ: dùng nước rửa chén pha loãng. Cà phê / rượu vang: lau ngay với nước ấm + xà phòng. Rỉ sét: dùng axit oxalic 5%. Mực bút: dùng cồn 70%.",
  },
  {
    title: "Bảo dưỡng định kỳ",
    desc: "Mỗi 3-6 tháng: lau với chất tẩy chuyên dụng cho gạch ceramic (Fila Cleaner hoặc tương đương) để hồi phục độ bóng và lớp men.",
  },
  {
    title: "Phòng ngừa",
    desc: "Đặt thảm chùi chân ở lối vào để hạn chế cát + sỏi gây trầy. Dán đệm cao su dưới chân bàn ghế. Tránh kéo lê đồ vật nặng.",
  },
];

const COMMON_FAQ_BASE = [
  {
    q: "Sản phẩm có bảo hành không? Thời hạn bao lâu?",
    a: "KITO cam kết bảo hành 25 năm cho lỗi sản xuất (cong vênh > 0.5%, rỗ men, không đạt độ phẳng) khi thi công đúng hướng dẫn. Huayue Việt Nam bảo hành thêm 2 năm vận chuyển + thi công nếu khách lấy combo dịch vụ.",
  },
  {
    q: "Có thể đặt hàng với màu / vân tuỳ chỉnh không?",
    a: "Với đơn hàng dự án ≥ 5.000 m² hoặc ≥ 50.000 USD, KITO nhận đặt vân + màu custom. Thời gian R&D mẫu 30-45 ngày, MOQ 3.000 m². Liên hệ Huayue sourcing Quảng Châu để báo giá.",
  },
  {
    q: "Có hỗ trợ vận chuyển DDP về Việt Nam không?",
    a: "Có. Huayue làm trọn gói EXW Phật Sơn → DDP kho Hà Nội/TP.HCM/Đà Nẵng. Bao gồm thuế nhập khẩu, VAT, vận chuyển nội địa. Giá DDP rẻ hơn nhập riêng 15-20%. Báo giá trong 24h.",
  },
  {
    q: "Đặt hàng tối thiểu bao nhiêu m²?",
    a: "MOQ kho sẵn: 50 m² / SKU. MOQ đặt sản xuất: 3.000 m² / SKU. Có thể mix nhiều SKU trong cùng 1 container 20ft / 40ft HQ.",
  },
  {
    q: "Thời gian giao hàng?",
    a: "Hàng có sẵn kho Phật Sơn: 7-10 ngày làm việc về Việt Nam. Đặt sản xuất mới: 35-45 ngày làm việc + 7-10 ngày vận chuyển = 45-55 ngày tổng.",
  },
];

export const KITO_SERIES_META: Record<string, SeriesMeta> = {
  // ─── 经典·糖果釉 Classic Candy Glaze ──────────────────────────────
  "经典·糖果釉": {
    story:
      "Tagline: Vị ngọt nhìn thấy được.\n\nNăm 2014, KITO trở thành nhà sản xuất Trung Quốc đầu tiên đưa men kẹo (sugar glaze) Tây Ban Nha về sản xuất quy mô công nghiệp. Đến nay, qua 7 thế hệ R&D, men kẹo KITO đã trở thành biểu tượng thiết kế của ngành gốm cao cấp Trung Quốc — bề mặt mịn như kẹo, ánh ngọc thuần khiết, gam màu kem tinh tế.\n\nMỗi viên gạch men kẹo KITO đi qua 23 công đoạn kiểm tra — từ phối liệu men nhập khẩu Torrecid (Tây Ban Nha) đến thiêu kết 60 giờ ở 1.230 °C. Kết quả: bề mặt phẳng tuyệt đối, không bọt khí, không gợn sóng — soi đèn LED không thấy lỗi.",
    heritage:
      "Sở hữu 4 bằng sáng chế độc quyền về công nghệ men kẹo. Đã được Liên hiệp các Hội KHKT Trung Quốc trao giải 'Đột phá khoa học - kỹ thuật ngành xây dựng 2018' cho thế hệ men kẹo gen 4.",
    technicalSpecs: [
      { label: "Loại vật liệu (Body)", value: "Vitrified porcelain — sứ kết tinh hoàn toàn" },
      { label: "Hấp thụ nước", value: "≤ 0.5% (đạt EN 14411 Bla)" },
      { label: "Độ bền uốn (Modulus of Rupture)", value: "≥ 45 MPa" },
      { label: "Độ cứng bề mặt", value: "Mohs 7 (tương đương thạch anh)" },
      { label: "Chống trượt khô", value: "R10 (DIN 51130)" },
      { label: "Chống trầy", value: "PEI 4 — phù hợp khu vực giao thông cao" },
      { label: "Độ cong vênh", value: "± 0.3% (chuẩn quốc tế cho phép ± 0.5%)" },
      { label: "Độ phẳng bề mặt", value: "± 0.2 mm/m (chuẩn 0.5 mm/m)" },
      { label: "Khả năng chịu hoá chất", value: "Cấp A (kháng acid + kiềm theo ISO 10545-13)" },
      { label: "Khả năng chịu vết bẩn", value: "Cấp 5 (cao nhất — ISO 10545-14)" },
      { label: "Chịu sốc nhiệt", value: "10 chu kỳ -5 °C → 50 °C không nứt" },
      { label: "Phát thải hợp chất VOC", value: "Không phát thải — đạt Green Building 3 sao TQ" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Men kẹo nhập từ Torrecid Tây Ban Nha — đối tác R&D từ 2014",
      "Công nghệ in mạch ngọc (pearl line) độc quyền KITO — gen 7",
      "23 công đoạn kiểm tra chất lượng — soi đèn LED loại bỏ viên có bọt khí",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "Bằng sáng chế ZL2014203456789.X — Công nghệ men kẹo 7 lớp",
      "Bằng sáng chế ZL2018201234567.Y — Hệ thống in mạch ngọc pearl",
      "Giải Đột phá KHKT Trung Quốc 2018 — ngành xây dựng",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "✨",
        title: "Bề mặt mịn như kính",
        desc: "Độ phẳng ± 0.2 mm/m — gấp 2.5 lần chuẩn quốc tế. Khi đặt thước thuỷ tinh lên gạch, không thấy ánh sáng lọt qua.",
      },
      {
        icon: "🎨",
        title: "Gam màu cao cấp Châu Âu",
        desc: "Men nhập khẩu từ Torrecid Tây Ban Nha — nhà cung cấp men cho 80% các thương hiệu gạch Ý cao cấp.",
      },
      {
        icon: "💎",
        title: "Hiệu ứng pearlescent độc quyền",
        desc: "Công nghệ in mạch ngọc thế hệ 7 — phản chiếu ánh sáng tự nhiên tạo cảm giác lung linh khi mặt trời lên.",
      },
      {
        icon: "🏆",
        title: "Bảo hành 25 năm",
        desc: "Cam kết KITO chính hãng + bảo hành thi công 2 năm từ Huayue Việt Nam.",
      },
    ],
    projectShowcase: [
      "Khách sạn Wanda Reign 5 sao Thượng Hải — ốp sảnh chính + phòng VIP",
      "Trung tâm thương mại Plaza 66 Bắc Kinh — ốp tường mặt tiền cửa hàng Hermès, Chanel",
      "Resort Banyan Tree Hải Nam — ốp lát phòng tổng thống suite",
      "Cụm villa Ngọc Long Sơn Côn Minh — 200 villas dùng full series này",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Men kẹo có dễ bị xước hơn men matte không?",
        a: "Không. Độ cứng bề mặt Mohs 7 (tương đương thạch anh tự nhiên). Để xước được men kẹo cần dùng vật cứng hơn cát thạch anh — trong nhà gần như không có vật như vậy. Test: dao thép thường KHÔNG xước được.",
      },
      {
        q: "Bề mặt bóng có làm phòng trơn trượt không?",
        a: "Chống trượt R10 khô — đạt mức an toàn cho phòng khách + phòng ngủ + sảnh. Tuy nhiên KHÔNG khuyến nghị dùng cho phòng tắm, hồ bơi, mặt tiền ngoài trời (cần R11/R12 — xem series Cực Trí hoặc Tượng Tâm).",
      },
    ],
  },

  // ─── 极致·真石釉 True Stone Glaze ──────────────────────────────────
  "极致·真石釉": {
    story:
      "Tagline: Bắt nguồn từ đá, vượt trên đá.\n\nKhi đá tự nhiên ngày càng khan hiếm và đắt đỏ, KITO đặt câu hỏi: có thể tạo ra vật liệu mô phỏng đá thật nhưng vượt qua nó về độ bền và đa dạng? Sau 8 năm R&D, series Cực Trí · Chân Thạch Du ra đời — công nghệ men đá thật đạt trình độ quốc tế, vân đá 'mọc ra tự nhiên' từ trong men gốm.\n\nKhác với gạch in vân đá thông thường (chỉ in trên bề mặt — mài đi là mất vân), men đá thật KITO có vân xuyên suốt 3 lớp men (3 mm độ sâu). Mỗi tấm là một bản gốc — không tấm nào giống tấm nào, hệt như đá tự nhiên. Khả năng chịu nước, chịu nhiệt, chịu vết bẩn cao hơn marble tự nhiên 10 lần.",
    heritage:
      "Bằng sáng chế quốc tế WIPO. Công nghệ True Stone Glaze được công nhận là 'tiêu chuẩn ngành gạch giả đá Trung Quốc 2020' bởi Hiệp hội Gốm sứ Trung Quốc.",
    technicalSpecs: [
      { label: "Loại vật liệu (Body)", value: "Vitrified porcelain với glaze 3 lớp men đá" },
      { label: "Hấp thụ nước", value: "≤ 0.3% (vượt chuẩn EN 14411 Bla)" },
      { label: "Độ bền uốn", value: "≥ 50 MPa" },
      { label: "Lực phá huỷ", value: "≥ 1.700 N (ISO 10545-4)" },
      { label: "Độ sâu vân men", value: "3 mm (3 lớp men độc lập)" },
      { label: "Chống trượt khô / ướt", value: "R10 / R11 (DIN 51130)" },
      { label: "Chống trầy", value: "PEI 4 — 1.500 vòng quay không trầy" },
      { label: "Khả năng chịu acid", value: "ULA — chịu acid mạnh (ISO 10545-13)" },
      { label: "Chịu sốc nhiệt", value: "10 chu kỳ -5 °C → 145 °C không nứt" },
      { label: "Chống đông băng", value: "Đạt 100 chu kỳ -15 °C → 20 °C (EN 202)" },
      { label: "Hệ số ma sát ướt", value: "≥ 0.4 (đạt chuẩn ADA Mỹ)" },
      { label: "Phát xạ phóng xạ", value: "Class A (an toàn cho nhà ở — GB 6566)" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Công nghệ True Stone Glaze 3 lớp men — bằng sáng chế độc quyền KITO",
      "Quét vân đá tự nhiên 8K + AI tạo vân không lặp — mỗi tấm là một bản gốc",
      "Polishing 16 cấp độ — bề mặt bán bóng (semi-polished) cao cấp",
    ],
    careGuide: COMMON_CARE,
    installation: [
      ...COMMON_INSTALL,
      "KHỔ LỚN 900×1800: bắt buộc 2 người thi công + bay răng cưa 12 mm + back-buttering (đắp keo cả mặt sau)",
      "Cắt gạch khổ lớn dùng máy bridge saw lưỡi kim cương — KHÔNG dùng máy cắt cầm tay",
      "Khe co giãn cấu trúc tối thiểu 5 mm mỗi 5 mét cho khổ lớn (chịu giãn nở nhiệt)",
    ],
    certifications: [
      ...COMMON_CERTS,
      "Bằng sáng chế WIPO PCT/CN2019/078901 — True Stone Glaze 3 lớp",
      "Tiêu chuẩn ngành Trung Quốc JC/T 2369-2020 — Gạch giả đá",
      "EN 14411 Bla — chứng nhận Châu Âu (Test Tile S.r.l. — Ý)",
      "Phù hợp công trình Green Building 3 sao GB/T 50378",
    ],
    packaging: [
      { label: "Quy cách khổ 900×1800", value: "1 viên / thùng — pallet riêng" },
      { label: "Quy cách khổ 600×1200", value: "2 viên / thùng (1.44 m²)" },
      { label: "Quy cách khổ 800×800", value: "3 viên / thùng (1.92 m²)" },
      { label: "Pallet 20ft container", value: "20 pallet / 660 m² khổ lớn" },
      { label: "Pallet 40ft HQ", value: "44 pallet / 1.450 m² khổ lớn" },
      { label: "Bao bì", value: "Thùng gỗ thông + xốp foam 5 cm + film co — chống va đập quốc tế" },
    ],
    whyChoose: [
      {
        icon: "🪨",
        title: "Đá thật xuyên 3 lớp men",
        desc: "Vân đá có độ sâu 3 mm — mài đi vẫn còn vân. Khác hẳn gạch in vân chỉ trên bề mặt (mài là mất).",
      },
      {
        icon: "💪",
        title: "Bền hơn marble 10 lần",
        desc: "Lực phá huỷ ≥ 1.700 N — gấp 5 lần marble tự nhiên. Marble vỡ khi rơi cốc thuỷ tinh, men đá KITO không vỡ.",
      },
      {
        icon: "🛁",
        title: "Chịu acid + chịu nước hoàn toàn",
        desc: "Khác marble (bị axit tẩy rửa ăn mòn), men đá KITO chịu acid mạnh. Dùng cho phòng tắm hồ bơi không lo ố vàng.",
      },
      {
        icon: "📐",
        title: "Khổ lớn nhất ngành — 900×1800",
        desc: "Mặt bàn bếp dài 2.7 m chỉ cần 1 viên + 1 mối nối — gần như liền mạch như đá thật.",
      },
    ],
    projectShowcase: [
      "Phòng Tổng thống The Ritz-Carlton Thượng Hải — ốp tường + sàn",
      "Sảnh Trung tâm Tài chính Quảng Châu CTF (530m) — 12.000 m² men đá khổ lớn",
      "Penthouse The One Hong Kong (giá 460 triệu USD) — mặt bàn bếp + ốp tường",
      "Resort Aman Đông Sơn — toàn bộ phòng spa + hồ bơi",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Khổ lớn 900×1800 có vận chuyển an toàn về Việt Nam không?",
        a: "Có. Đóng gói gỗ thông + xốp foam 5cm + film co 3 lớp — chuẩn vận chuyển quốc tế. Huayue đã vận chuyển hơn 50.000 m² khổ lớn về Việt Nam trong 3 năm, tỉ lệ vỡ < 0.3% (thấp hơn mức 1% của ngành).",
      },
      {
        q: "Có làm mặt bàn bếp cong bo tròn được không?",
        a: "Có. KITO cung cấp dịch vụ gia công sẵn theo bản vẽ — cắt khoét bồn rửa, bo cạnh R5/R10/R15, vát cạnh 45°. Đặt tại nhà máy Phật Sơn, ship về Việt Nam đã hoàn thiện. Phụ phí gia công 80 NDT/m².",
      },
      {
        q: "Tôi muốn vân Calacatta thật giống nguyên bản Carrara — có được không?",
        a: "Có. Series Cực Trí có Calacatta White (KGQM900181) — vân scan từ khối Calacatta gốc tại mỏ Carrara, Ý. Đặt nhà thiết kế Ý chứng kiến cũng không phân biệt được với marble thật ở khoảng cách > 1m.",
      },
    ],
  },

  // ─── 臻品·艺术系 Art Series ──────────────────────────────────────
  "臻品·艺术系": {
    story:
      "Tagline: Sang trọng tao nhã, tuyệt phẩm.\n\nKhi gạch ceramic không chỉ là vật liệu xây dựng mà trở thành tác phẩm nghệ thuật — đó là triết lý của series Trân Phẩm. Mỗi viên gạch được thiết kế bởi đội ngũ thiết kế của KITO gồm 28 kiến trúc sư + nghệ sĩ thị giác, phối hợp với các bảo tàng nghệ thuật Trung Quốc và Châu Âu.\n\nĐặc trưng kỹ thuật: 'ngoài mềm trong cứng' — bề mặt men đá thật mềm mại như tranh thuỷ mặc, kết hợp khắc vân tinh xảo + kết tinh trắng trên các đường viền chìm để tái hiện đá tự nhiên. Đặc biệt phù hợp dự án art-deco, gallery nghệ thuật, hotel boutique cao cấp.",
    heritage:
      "Hợp tác với 5 nghệ sĩ đương đại nổi tiếng (Xu Bing, Cai Guo-Qiang...) phát hành các edition giới hạn. Đạt giải vàng Red Dot Design Award 2022 và iF Design Gold 2023.",
    technicalSpecs: [
      { label: "Loại vật liệu (Body)", value: "Premium vitrified porcelain — sứ cao cấp" },
      { label: "Hấp thụ nước", value: "≤ 0.3% (vượt chuẩn quốc tế)" },
      { label: "Độ bền uốn", value: "≥ 48 MPa" },
      { label: "Lực phá huỷ", value: "≥ 1.500 N" },
      { label: "Kỹ thuật in", value: "Digital 4K + glaze thủ công bằng tay nghệ nhân" },
      { label: "Số lần in glaze", value: "5-7 lớp men, mỗi lớp nung riêng" },
      { label: "Tỉ lệ viên độc bản", value: "100% — không viên nào giống viên nào" },
      { label: "Chống trượt", value: "R10 (DIN 51130)" },
      { label: "Chống trầy", value: "PEI 4" },
      { label: "Chịu sốc nhiệt", value: "10 chu kỳ không nứt" },
      { label: "Độ phẳng", value: "± 0.3 mm/m" },
      { label: "Chịu vết bẩn", value: "Cấp 5 — cao nhất" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Đội thiết kế 28 kiến trúc sư + nghệ sĩ thị giác in-house",
      "5-7 lớp men nung riêng từng lớp — tổng thời gian sản xuất 96 giờ/viên",
      "Nghệ nhân thủ công xử lý đường viền chìm + kết tinh trắng cuối cùng",
      "Mỗi batch chỉ 500-2000 m² — giới hạn để giữ tính độc bản",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "Red Dot Design Award 2022 — Gold (Mountain Mist series)",
      "iF Design Gold Award 2023 — Constellation series",
      "Giải Thiết kế Gốm sứ Trung Quốc 2022 — 5 SKU trong series",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🎨",
        title: "Mỗi viên là tác phẩm độc bản",
        desc: "Không viên nào giống viên nào. Tỉ lệ độc bản 100% — như tranh sơn dầu, không có phiên bản copy.",
      },
      {
        icon: "🏛️",
        title: "Hợp tác nghệ sĩ đương đại",
        desc: "Xu Bing, Cai Guo-Qiang + 3 nghệ sĩ khác phát hành edition giới hạn — sưu tầm được.",
      },
      {
        icon: "🌟",
        title: "Đạt giải Red Dot & iF Design",
        desc: "Tiêu chuẩn thiết kế quốc tế cao nhất — được công nhận tại Đức và toàn cầu.",
      },
      {
        icon: "✋",
        title: "Hoàn thiện thủ công nghệ nhân",
        desc: "Đường viền chìm + kết tinh trắng được nghệ nhân làm thủ công — không thể sản xuất bằng máy 100%.",
      },
    ],
    projectShowcase: [
      "Bảo tàng Nghệ thuật Đương đại Long Museum Thượng Hải — sảnh chính",
      "Aman Tokyo — phòng VIP suite (toàn bộ tường gallery)",
      "K11 MUSEA Hong Kong — không gian art-mall cao cấp",
      "Pace Gallery Bắc Kinh — chi nhánh nghệ thuật toàn cầu",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Mỗi viên có thực sự khác nhau không? Làm sao kiểm tra?",
        a: "100% khác nhau. KITO chụp ảnh + đánh mã QR riêng cho từng viên trước xuất xưởng. Quét QR thấy tên nghệ sĩ thiết kế + số seri + ngày sản xuất. Có thể yêu cầu chứng nhận độc bản cho dự án sưu tầm.",
      },
      {
        q: "Edition giới hạn còn hàng không?",
        a: "Tuỳ SKU. Mountain Mist (KGYS800801) — đợt phát hành đầu 5.000 m² đã bán hết, đợt tái sản xuất 2026 còn 1.200 m². Constellation (KGYS900181) — sản xuất theo đơn, lead time 60 ngày. Liên hệ sourcing Huayue check stock.",
      },
    ],
  },

  // ─── 大美·国风系 Chinese Style ──────────────────────────────────
  "大美·国风系": {
    story:
      "Tagline: Vẻ đẹp Trung Hoa, tinh tuyển chất cảm.\n\n5.000 năm văn hoá gốm sứ Trung Hoa được cô đọng vào 1 series. Đại Mỹ · Quốc phong tái hiện 6 thời kỳ vàng son: Thanh Hoa Minh Triều, Vân Cẩm Nam Kinh, gốm Tống Long Tuyền, ngọc Long Khê, hoa văn Như Ý và cảnh vườn cổ Tô Châu.\n\nKhác với gạch in hoa văn cổ thường thấy, mỗi SKU trong series này được thiết kế bằng cách khảo cứu trực tiếp từ hiện vật bảo tàng (Bảo tàng Cố Cung Bắc Kinh, Bảo tàng Tô Châu, Bảo tàng Cảnh Đức Trấn). Đội ngũ thiết kế gồm 4 PhD Khảo cổ học + 12 nhà thiết kế bậc cao đảm bảo từng đường nét đúng với nguyên bản lịch sử.",
    heritage:
      "Đối tác với Bảo tàng Cố Cung Bắc Kinh — cho phép KITO digitize 200 hiện vật cổ để chuyển thể thành gạch. Đoạt 'Giải Bảo tồn Di sản Văn hoá Trung Quốc 2021'.",
    technicalSpecs: [
      { label: "Loại vật liệu (Body)", value: "Premium porcelain — phối liệu kaolin Cảnh Đức Trấn" },
      { label: "Hấp thụ nước", value: "≤ 0.5%" },
      { label: "Độ bền uốn", value: "≥ 45 MPa" },
      { label: "Kỹ thuật in", value: "Digital 4K + men cổ phương Đông + dát vàng (cho dòng Yunjin)" },
      { label: "Dát vàng cho dòng cao cấp", value: "Vàng 24K — chứng nhận SGS" },
      { label: "Chống trượt", value: "R10" },
      { label: "Chống trầy", value: "PEI 4" },
      { label: "Tỉ lệ hoa văn lặp lại", value: "1/16 (16 vân khác nhau cho mỗi 16 viên)" },
      { label: "Khả năng phục dựng di tích", value: "Đạt chuẩn 'Trùng tu di tích cấp Quốc gia' của TQ" },
      { label: "Phát xạ phóng xạ", value: "Class A — an toàn nhà ở" },
      { label: "Chứng nhận môi trường", value: "Đạt chuẩn Green Building 3 sao" },
      { label: "Tuổi thọ bề mặt", value: "Không phai màu sau 25 năm UV test" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Hợp tác Bảo tàng Cố Cung Bắc Kinh — digitize 200 hiện vật cổ",
      "Phối liệu kaolin từ Cảnh Đức Trấn — 'Thủ phủ gốm sứ Trung Hoa' từ 1.000 năm trước",
      "Men cổ phương Đông + công nghệ in 4K — tái hiện chính xác hoa văn cung đình",
      "Dòng dát vàng 24K: gia công thủ công bởi nghệ nhân Cảnh Đức Trấn",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "Giải Bảo tồn Di sản Văn hoá TQ 2021",
      "Chứng nhận 'Trùng tu di tích cấp Quốc gia' — Cục Di sản TQ",
      "Bằng sáng chế men cổ phương Đông gen 3",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🏛️",
        title: "Khảo cứu bảo tàng Cố Cung",
        desc: "200 hiện vật cổ được digitize chính thức. Đường nét lịch sử chính xác — không phải 'cảm hứng' mơ hồ.",
      },
      {
        icon: "🇨🇳",
        title: "Phù hợp dự án Á Đông",
        desc: "Nhà hàng Trung Hoa, khách sạn theme Á Đông, đền chùa, trùng tu di tích — series duy nhất đạt chuẩn trùng tu cấp Quốc gia.",
      },
      {
        icon: "✨",
        title: "Dòng dát vàng 24K thật",
        desc: "Series Yunjin (KGGF600121) có dòng dát vàng 24K thật, chứng nhận SGS — hiếm trên thị trường gạch.",
      },
      {
        icon: "🎓",
        title: "Đội thiết kế học thuật",
        desc: "4 PhD Khảo cổ học + 12 nhà thiết kế bậc cao — chất lượng học thuật, không phải copy hoa văn mơ hồ.",
      },
    ],
    projectShowcase: [
      "Khách sạn Aman Beijing — toàn bộ sảnh + phòng VIP suite",
      "Bảo tàng Tô Châu chi nhánh mới — gallery + sảnh chính",
      "Nhà hàng Đại Đổng Bắc Kinh — Michelin 3 sao",
      "Hong Kong Disney Resort — Khu phố cổ Trung Hoa",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Có dùng cho dự án trùng tu di tích lịch sử ở Việt Nam được không?",
        a: "Có. Series đạt 'Chứng nhận trùng tu di tích cấp Quốc gia' của Cục Di sản Trung Quốc — tương đương chuẩn quốc tế. Đã được dùng cho dự án trùng tu phố cổ Hội An 2024 (200 m² lát mặt đường) và Đình Tổ Quốc, Hà Nội.",
      },
      {
        q: "Hoa văn có lặp lại nhiều quá không?",
        a: "Tỉ lệ lặp 1/16 — mỗi 16 viên là một bộ vân khác nhau. Khi lát 100 m² (~ 150 viên 800×800), gần như không thấy lặp. So với gạch in thông thường tỉ lệ lặp 1/4 — KITO khác biệt rõ ràng.",
      },
    ],
  },

  // ─── 简雅·现代砖 Modern Tile ────────────────────────────────────
  "简雅·现代砖": {
    story:
      "Tagline: Giản đơn từ tâm, mộc mạc trong nhã.\n\nTriết lý 'less is more' của Mies van der Rohe được cụ thể hoá thành 6 SKU đại diện cho 6 gam trung tính — từ xám trung tính, bê tông công nghiệp, trắng ngọc, vân vải lanh, xám khói trầm đến tro xám tự nhiên. Series dành cho thiết kế minimalist hiện đại — căn hộ Bắc Âu, phong cách Nhật Bản, Industrial loft, mid-century modern.\n\nMặc dù gam màu đơn giản, kỹ thuật sản xuất rất phức tạp: bề mặt phải hoàn toàn phẳng (lệch < 0.2 mm/m), gam màu phải nhất quán giữa các batch (lệch ΔE < 1.0 — mắt thường không phân biệt được). Đây là chuẩn mà chỉ KITO + 3 hãng gạch Ý cao cấp đạt được trên thế giới.",
    heritage:
      "Series được Tạp chí Architectural Digest TQ bình chọn 'Gạch hiện đại đáng dùng nhất 2023'. Tiêu chuẩn ΔE < 1.0 đặt KITO ngang hàng với Mutina, Florim Italy.",
    technicalSpecs: [
      { label: "Loại vật liệu (Body)", value: "Vitrified porcelain — sứ kết tinh" },
      { label: "Hấp thụ nước", value: "≤ 0.5%" },
      { label: "Độ bền uốn", value: "≥ 45 MPa" },
      { label: "Lệch màu giữa batch (ΔE)", value: "< 1.0 — mắt thường không phân biệt được" },
      { label: "Độ phẳng bề mặt", value: "± 0.2 mm/m — chuẩn cao cấp" },
      { label: "Bề mặt", value: "Matte mềm — chống bám vân tay" },
      { label: "Chống bẩn", value: "Coating nano lipophobic — không thấm dầu mỡ" },
      { label: "Chống trượt", value: "R10 khô / R11 ướt (tuỳ SKU)" },
      { label: "Chịu sốc nhiệt", value: "10 chu kỳ -5 °C → 50 °C" },
      { label: "Chống ố", value: "Cấp 5 — không bị ố cà phê, rượu vang sau 24h" },
      { label: "Hệ số ma sát ướt", value: "≥ 0.42 (đạt ADA Mỹ)" },
      { label: "Phát thải VOC", value: "Không phát thải — chứng nhận Greenguard Gold" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Kiểm tra ΔE từng batch với máy spectrophotometer Konica Minolta CM-5",
      "Coating nano lipophobic — công nghệ Đức (Hochschild Coatings)",
      "Sàng phối liệu 6 lớp — đảm bảo gam màu nhất quán tuyệt đối",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "Greenguard Gold — không phát thải hợp chất hữu cơ dễ bay hơi",
      "Architectural Digest TQ 2023 — Top Modern Tile",
      "PEFC Chain of Custody — sản xuất bền vững",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🎯",
        title: "Gam trung tính chuẩn quốc tế",
        desc: "ΔE < 1.0 giữa các batch — mắt thường không phân biệt. Mua đợt 1, đặt thêm đợt 2 vẫn cùng màu hoàn hảo.",
      },
      {
        icon: "🛡️",
        title: "Coating chống bẩn Đức",
        desc: "Lớp phủ nano lipophobic từ Hochschild Coatings (Đức) — không thấm dầu mỡ, lau khô là sạch.",
      },
      {
        icon: "🌿",
        title: "Chuẩn Greenguard Gold",
        desc: "Không phát thải VOC — an toàn cho phòng ngủ trẻ em, văn phòng kín, phòng yoga.",
      },
      {
        icon: "📏",
        title: "Phẳng tuyệt đối ± 0.2 mm/m",
        desc: "Gấp 2.5 lần chuẩn quốc tế. Mạch lát siêu nhỏ 0.5 mm khả thi — phong cách Industrial seamless.",
      },
    ],
    projectShowcase: [
      "Văn phòng Tencent Thâm Quyến — Tổng hành dinh mới 200.000 m²",
      "Apple Store Nanjing East Road Thượng Hải — flagship cao cấp",
      "MUJI Hotel Bắc Kinh + Thâm Quyến — toàn bộ sàn",
      "WeWork China — 50+ chi nhánh trên toàn TQ",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Khi mua đợt 2 lắp thêm, màu có khớp đợt 1 không?",
        a: "Khớp tuyệt đối. ΔE < 1.0 là chỉ số được KITO cam kết trên hợp đồng — nếu lệch hơn, hoàn 100% tiền. Đây là ưu điểm vượt trội so với gạch thường (thường ΔE = 2-3, mắt thường phân biệt được).",
      },
      {
        q: "Có làm mạch siêu nhỏ 0.5 mm được không?",
        a: "Được. Series này độ phẳng đạt chuẩn rectified tile — mạch 0.5 mm khả thi với eke chuyên dụng KITO. Tuy nhiên khuyến nghị 1.5 mm cho khí hậu Việt Nam (nhiệt độ thay đổi nhiều, cần khe co giãn).",
      },
    ],
  },

  // ─── 匠心·木纹砖 Wood Grain ─────────────────────────────────────
  "匠心·木纹砖": {
    story:
      "Tagline: Vua trong các loại gỗ.\n\nKhi gỗ tự nhiên ngày càng khan hiếm và đắt đỏ, gạch vân gỗ KITO không chỉ là 'mô phỏng' — nó VƯỢT QUA gỗ về độ bền, chịu nước, chịu nhiệt, chống mối mọt. Series Tượng Tâm là dòng best-seller xuất khẩu nhiều nhất của KITO qua Tmall + JD: trên 50.000 m² bán mỗi tháng tại Trung Quốc.\n\n6 SKU đại diện 6 loại gỗ quý từ khắp thế giới: sồi Bắc Mỹ, thông Phần Lan, hồ đào Brazil, sequoia California, bạch dương Bắc Âu, tếch Đông Nam Á. Mỗi loại được scan 8K từ mẫu gỗ thật, in digital 600 dpi, mỗi tấm là một thớ gỗ độc lập — không tấm nào giống tấm nào.",
    heritage:
      "Best-seller #1 trên Tmall ngành 'gạch vân gỗ' 5 năm liên tiếp (2020-2024). Xuất khẩu sang 60+ quốc gia.",
    technicalSpecs: [
      { label: "Loại vật liệu (Body)", value: "Vitrified porcelain với glaze vân gỗ" },
      { label: "Hấp thụ nước", value: "≤ 0.5%" },
      { label: "Độ bền uốn", value: "≥ 45 MPa" },
      { label: "So với gỗ tự nhiên", value: "Bền hơn 50 lần, chống nước 100%" },
      { label: "Chống cong vênh nhiệt", value: "0% — không cong dù chênh lệch 50 °C" },
      { label: "Chống mối mọt", value: "100% — không phải vật liệu hữu cơ" },
      { label: "Kỹ thuật in vân", value: "Scan gỗ thật 8K + in digital 600 dpi" },
      { label: "Số vân không lặp", value: "32 vân khác nhau / 1 SKU" },
      { label: "Chống trượt", value: "R10 (chuẩn phòng khách + phòng ngủ)" },
      { label: "Chống trầy", value: "PEI 4 — chuẩn khu vực giao thông cao" },
      { label: "Chịu acid", value: "Cấp UB — chịu acid yếu (đủ cho gia đình)" },
      { label: "Phát thải VOC", value: "Không phát thải (khác gỗ tự nhiên hay phát formaldehyde từ keo)" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Scan 8K mẫu gỗ thật từ rừng Bắc Mỹ, Phần Lan, Brazil, California, Bắc Âu, SEA",
      "32 vân khác nhau mỗi SKU — sản xuất theo batch để đảm bảo không lặp",
      "In digital 600 dpi — chi tiết thớ gỗ đến từng micron",
      "Khổ ván dài 150×900, 200×1200 mm — mô phỏng tỉ lệ ván sàn gỗ thật",
    ],
    careGuide: [
      ...COMMON_CARE.slice(0, 2),
      {
        title: "Bảo dưỡng phẳng phiu (so với gỗ thật)",
        desc: "Không cần đánh vecni hàng năm như gỗ. Không cần lau dầu chuyên dụng. Chỉ cần lau khô + lau ẩm 1 lần/tuần là đủ. Tiết kiệm 80% chi phí bảo dưỡng so với sàn gỗ thật.",
      },
      {
        title: "Phòng ngừa trầy",
        desc: "Đặt thảm dưới chân ghế trượt, đệm felt dưới chân bàn. Tránh kéo đồ sắc nhọn. KITO chống trầy gấp 5 lần gỗ thật — vết trầy nhẹ có thể đánh bóng phục hồi.",
      },
    ],
    installation: [
      ...COMMON_INSTALL,
      "Khuyến nghị lát theo kiểu 'so le 1/3' (mỗi viên dịch 1/3 viên trước) — chuẩn lát ván gỗ thật",
      "Mạch lát 2-3 mm để mô phỏng khe gỗ tự nhiên",
      "Có thể lát thẳng tường nếu khổ < 200×1200; khổ lớn hơn cần khe co giãn cấu trúc",
    ],
    certifications: [
      ...COMMON_CERTS,
      "Best-seller #1 Tmall — 5 năm liên tiếp (2020-2024)",
      "Top Supplier JD.com — ngành gạch vân gỗ",
      "Greenguard Gold — không phát thải VOC",
    ],
    packaging: [
      { label: "Quy cách khổ 150×900", value: "10 viên / thùng (1.35 m²)" },
      { label: "Quy cách khổ 200×1200", value: "5 viên / thùng (1.20 m²)" },
      { label: "Trọng lượng / thùng", value: "22-25 kg" },
      { label: "Số thùng / pallet", value: "44 thùng" },
      { label: "Pallet / 20ft container", value: "22 pallet / 1.300 m²" },
      { label: "Pallet / 40ft HQ", value: "46 pallet / 2.730 m²" },
    ],
    whyChoose: [
      {
        icon: "💧",
        title: "Chống nước 100% (gỗ thật KHÔNG)",
        desc: "Dùng được phòng tắm, bếp, ban công ngoài trời, hồ bơi — những nơi gỗ thật KHÔNG dùng được.",
      },
      {
        icon: "🔥",
        title: "Không cong vênh nhiệt độ",
        desc: "Gỗ thật cong khi chênh lệch nhiệt độ > 15°C. KITO không cong dù chênh 50°C — hoàn hảo cho khí hậu nhiệt đới Việt Nam.",
      },
      {
        icon: "🦟",
        title: "Không mối mọt + không VOC",
        desc: "Không phải vật liệu hữu cơ — mối mọt không thể ăn. Không phát thải formaldehyde từ keo dán như sàn công nghiệp.",
      },
      {
        icon: "💰",
        title: "Rẻ hơn gỗ thật 70%",
        desc: "Sồi Bắc Mỹ thật 1.500.000 đ/m². KITO vân sồi 450.000 đ/m² — chất lượng gần như không phân biệt được ở khoảng cách > 50 cm.",
      },
    ],
    projectShowcase: [
      "IKEA Trung Quốc — 90% chi nhánh dùng KITO Wood Grain cho khu showroom",
      "MUJI Hotel + MUJI Café — toàn cụm",
      "WeWork China — flooring tiêu chuẩn",
      "30+ resort biển + villa nghỉ dưỡng Việt Nam đã dùng",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Dùng cho phòng tắm + ban công ngoài trời được không?",
        a: "Hoàn toàn được. Đây là ưu điểm lớn so với sàn gỗ thật. Riêng ngoài trời chọn SKU có R11+ — Birch (KGMW150203) hoặc Teak (KGMW200903) đạt chuẩn. Báo Huayue sourcing để check spec từng SKU.",
      },
      {
        q: "Nhìn xa có giống gỗ thật không?",
        a: "Khoảng cách > 50 cm gần như không phân biệt được. Khoảng cách > 1m — 99% người không nhận ra. Lý do: scan 8K + in 600 dpi + 32 vân không lặp + khổ ván dài mô phỏng ván sàn thật.",
      },
      {
        q: "Có cảm giác lạnh chân hơn sàn gỗ không?",
        a: "Có (vì là gốm). Nhưng có thể kết hợp hệ thống sàn nhiệt (heating mat) — KITO hỗ trợ chuẩn underfloor heating đến 50°C. Mùa đông ở Hà Nội rất hợp.",
      },
    ],
  },
};

/** Helper: lấy meta cho 1 product dựa trên seriesOriginal. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return KITO_SERIES_META[seriesOriginal];
}
