/**
 * Rich metadata cho các dòng thiết bị bếp Teka — phục vụ trang chi tiết sản phẩm.
 *
 * Keyed by seriesOriginal (category: "oven", "range-hood", "hob"...).
 *
 * Honest sourcing:
 *   • Hồ sơ doanh nghiệp: Teka Group (Tây Ban Nha) — 3 thương hiệu Teka (1924),
 *     Küppersbusch (1875), Intra (1871). Dữ liệu công bố trên teka.com.
 *   • Thông số sản phẩm: trang chi tiết teka.com/zh-cn (crawl thật).
 *   • Tiêu chuẩn: CE/CB/GB + nhãn năng lượng EU (EEI) theo từng sản phẩm.
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
  "CE — Chứng nhận Châu Âu",
  "CB Scheme — Chứng nhận an toàn điện quốc tế (IEC)",
  "Nhãn năng lượng EU — phân hạng A đến G theo EEI",
  "ISO 9001 — Quản lý chất lượng",
  "ISO 14001 — Quản lý môi trường",
  "RoHS — Không chứa kim loại nặng độc hại",
  "Red Dot & iF Design (dòng Küppersbusch cao cấp)",
];

const COMMON_MFG = [
  "Teka Group — tập đoàn thiết bị bếp & phòng tắm gốc châu Âu, sở hữu 3 thương hiệu: Teka (1924), Küppersbusch (1875, cao cấp Đức), Intra (1871, chậu inox Thuỵ Điển)",
  "15 nhà máy trên toàn cầu — phục vụ hơn 120 quốc gia",
  "~5.000 nhân viên; khoảng 50% hộ gia đình Tây Ban Nha dùng sản phẩm Teka",
  "Trung tâm R&D & thiết kế châu Âu — nhiều giải Red Dot, iF Design (Küppersbusch)",
  "Tiêu chuẩn sản xuất & kiểm định theo chuẩn EU; thử nghiệm an toàn điện, hiệu suất năng lượng từng lô",
];

const COMMON_PACKAGING = [
  { label: "Đóng gói", value: "Thùng carton nhiều lớp + xốp định hình + góc bảo vệ" },
  { label: "Bảo hành vận chuyển", value: "Bồi thường nếu hư hỏng do vận chuyển" },
  { label: "MOQ nhập khẩu", value: "1 container 20ft/40ft — mix nhiều model OK" },
  { label: "Tài liệu", value: "Manual + phiếu bảo hành; hỗ trợ hồ sơ nhập khẩu" },
  { label: "Bảo quản kho", value: "Nơi khô ráo, tránh nắng; để đứng, không chồng quá tải" },
];

const COMMON_INSTALL = [
  "Lắp đặt bởi kỹ thuật viên có chuyên môn theo đúng manual Teka",
  "Kiểm tra kích thước khoét tủ (cut-out) khớp với kích thước âm tủ của sản phẩm",
  "Đảm bảo nguồn điện/đường gas/cấp-thoát nước đúng tiêu chuẩn trước khi đấu nối",
  "Với hút mùi: lắp ống thoát đúng đường kính, hạn chế co gấp để giữ lưu lượng hút",
  "Nghiệm thu chạy thử toàn bộ chức năng trước khi bàn giao",
];

const COMMON_CARE = [
  { title: "Vệ sinh hàng ngày", desc: "Lau bề mặt bằng khăn mềm ẩm + dung dịch trung tính. Không dùng chất tẩy mài mòn hay vật cứng cào lên kính/inox." },
  { title: "Vệ sinh định kỳ", desc: "Vệ sinh lưới lọc mỡ (hút mùi), khay/khoang (lò), bộ lọc (máy giặt) định kỳ. Lò có chế độ tự làm sạch hơi nước (AquaClean) hoặc nhiệt phân." },
  { title: "Bảo dưỡng kỹ thuật", desc: "Kiểm tra gioăng cửa, đầu đốt, đường gas/nước định kỳ; gọi kỹ thuật khi có bất thường để giữ hiệu suất & an toàn." },
];

const COMMON_FAQ = [
  { q: "Sản phẩm Teka có phù hợp điện 220V Việt Nam không?", a: "Có. Các model crawl ở đây ghi điện áp 220-240V / 50-60Hz, phù hợp lưới điện Việt Nam. Huayuesc tư vấn cấu hình theo từng dự án." },
  { q: "Có hỗ trợ giấy tờ nhập khẩu & bảo hành không?", a: "Có. Cung cấp CO/CQ, tài liệu kỹ thuật; hỗ trợ hồ sơ nhập khẩu và chính sách bảo hành theo hãng." },
  { q: "Đặt hàng tối thiểu và thời gian giao?", a: "Tính theo container, có thể mix nhiều model. Lịch giao cụ thể báo theo đơn." },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: COMMON_MFG, careGuide: COMMON_CARE, installation: COMMON_INSTALL,
    certifications: COMMON_CERTS, packaging: COMMON_PACKAGING, faq: COMMON_FAQ };
}

const WHY_EU = { icon: "🇪🇺", title: "Thiết kế & chuẩn châu Âu", desc: "Gốc thương hiệu châu Âu (1924), chuẩn an toàn & hiệu suất EU." };

export const TEKA_SERIES_META: Record<string, SeriesMeta> = {
  oven: mk({
    story: "Dòng lò nướng âm tủ Teka — từ iOven/iOven P đa năng tới HLB/HSB/HLC và SteakMaster — nổi bật với nấu khí nóng đa chiều (MultiFunction), hệ tự làm sạch AquaClean (Thuỷ Khiết) và bảng điều khiển cảm ứng TFT.",
    heritage: "Lò nướng là sản phẩm lõi của Teka từ thập niên 1920, liên tục nâng cấp công nghệ khí nóng, hấp kết hợp và tự làm sạch.",
    technicalSpecs: [
      { label: "Dung tích", value: "63 – 71 L (dòng 60cm)" },
      { label: "Kích thước âm tủ", value: "595 × 595 × ~560 mm" },
      { label: "Nhiệt độ", value: "30°C – 270°C" },
      { label: "Tự làm sạch", value: "AquaClean (hơi nước) / nhiệt phân (Pyrolytic)" },
      { label: "Điện", value: "220-240V / 50-60Hz" },
      { label: "Hiệu suất NL", value: "phổ biến A / A+" },
    ],
    whyChoose: [WHY_EU,
      { icon: "♨️", title: "Khí nóng đa chiều", desc: "Phân bổ nhiệt đều nhiều tầng, nướng nhiều khay cùng lúc." },
      { icon: "💧", title: "Tự làm sạch AquaClean", desc: "Làm mềm cặn bẩn bằng hơi nước, vệ sinh nhanh không hoá chất." }],
    projectShowcase: ["Bếp căn hộ cao cấp, biệt thự", "Khu bếp showroom nội thất", "Dự án bàn giao bếp trọn gói"],
  }),
  "steam-oven": mk({
    story: "Dòng lò hấp & hấp-nướng kết hợp Teka (HLC/HSC 847, HSB...) — nấu bằng hơi giữ trọn dinh dưỡng, kết hợp nướng cho đa dạng món.",
    heritage: "Teka phát triển dòng hấp đáp ứng xu hướng nấu ăn lành mạnh, tích hợp trong cùng kích thước âm tủ tiêu chuẩn.",
    technicalSpecs: [
      { label: "Kiểu", value: "Lò hấp / hấp-nướng kết hợp" },
      { label: "Kích thước", value: "45cm hoặc 60cm âm tủ" },
      { label: "Điện", value: "220-240V / 50-60Hz" },
      { label: "Điều khiển", value: "Cảm ứng TFT / LED" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🥗", title: "Giữ dinh dưỡng", desc: "Nấu hơi giữ vitamin & độ ẩm thực phẩm." },
      { icon: "🍞", title: "Hấp + nướng", desc: "Một thiết bị cho cả hấp và nướng đối lưu." }],
    projectShowcase: ["Bếp gia đình cao cấp", "Căn hộ dịch vụ", "Showroom thiết bị bếp"],
  }),
  "microwave-oven": mk({
    story: "Lò vi sóng âm tủ Teka (MS/MC/HLC 847 C/HSC 644 C) — làm nóng nhanh, một số model kết hợp nướng, lắp âm đồng bộ tủ bếp.",
    heritage: "Teka cung cấp dòng vi sóng âm tủ đồng bộ thiết kế với lò nướng cùng hệ.",
    technicalSpecs: [
      { label: "Kiểu", value: "Vi sóng âm tủ / vi sóng-nướng" },
      { label: "Lắp đặt", value: "Âm tủ (built-in)" },
      { label: "Điện", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "⚡", title: "Làm nóng nhanh", desc: "Tiện lợi cho hâm/nấu nhanh hằng ngày." },
      { icon: "🧩", title: "Đồng bộ tủ bếp", desc: "Lắp âm khít, mặt kính đồng bộ với lò nướng." }],
    projectShowcase: ["Bếp căn hộ", "Bếp văn phòng/pantry", "Dự án nội thất"],
  }),
  "range-hood": mk({
    story: "Máy hút mùi Teka — dòng hút cạnh (CXW-220 DLV/iHood) và chữ T treo tường (DH/GFH) — lực hút mạnh, vận hành êm, lọc mỡ inox tháo rời.",
    heritage: "Hút mùi là thế mạnh lâu đời của Teka với nhiều kiểu dáng cho mọi bố trí bếp.",
    technicalSpecs: [
      { label: "Kiểu", value: "Hút cạnh / chữ T treo tường" },
      { label: "Mã chuẩn TQ", value: "CXW-220 (loại hút khói nhà bếp)" },
      { label: "Điện", value: "220-240V / 50Hz" },
      { label: "Lọc", value: "Lưới mỡ inox tháo rời, vệ sinh được" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🌪️", title: "Lực hút mạnh", desc: "Khử khói dầu hiệu quả cho bếp Á nhiều dầu mỡ." },
      { icon: "🔇", title: "Vận hành êm", desc: "Motor tối ưu độ ồn, nhiều cấp tốc độ." }],
    projectShowcase: ["Bếp căn hộ & nhà phố", "Nhà hàng nhỏ", "Showroom bếp"],
  }),
  hob: mk({
    story: "Bếp nấu Teka — bếp gas (IG/GFH/JZT) và bếp từ/điện âm — kính chịu lực, đầu đốt hiệu suất cao, an toàn ngắt gas.",
    heritage: "Teka cung cấp đa dạng bếp âm cho thị trường gas và điện/từ.",
    technicalSpecs: [
      { label: "Kiểu", value: "Bếp gas / bếp từ / bếp điện âm" },
      { label: "Mặt bếp", value: "Kính ceramic / inox" },
      { label: "An toàn", value: "Cảm biến ngắt gas khi tắt lửa (dòng gas)" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🔥", title: "Đầu đốt hiệu suất", desc: "Nhiệt mạnh, phân bổ đều, tiết kiệm gas." },
      { icon: "🛡️", title: "An toàn", desc: "Ngắt gas tự động, mặt kính chịu nhiệt." }],
    projectShowcase: ["Bếp gia đình", "Căn hộ", "Dự án bàn giao bếp"],
  }),
  "coffee-machine": mk({
    story: "Máy pha cà phê âm tủ Teka (CLC 855 GM) — tích hợp xay hạt, pha espresso/cappuccino tự động, lắp âm đồng bộ tủ bếp.",
    heritage: "Teka mở rộng sang thiết bị đồ uống cao cấp tích hợp cho bếp hiện đại.",
    technicalSpecs: [
      { label: "Kiểu", value: "Máy pha cà phê âm tủ tích hợp xay" },
      { label: "Lắp đặt", value: "Âm tủ (built-in)" },
      { label: "Điện", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "☕", title: "Xay & pha tự động", desc: "Từ hạt tới ly espresso/cappuccino một chạm." },
      { icon: "🧩", title: "Âm tủ sang trọng", desc: "Đồng bộ thiết kế với lò và vi sóng cùng hệ." }],
    projectShowcase: ["Bếp penthouse", "Khách sạn/căn hộ dịch vụ", "Showroom cao cấp"],
  }),
  refrigerator: mk({
    story: "Tủ lạnh Teka — gồm dòng inox thủ công nhiều cánh (RMF) và tủ âm/độc lập (RFD/RFC) phong cách châu Âu.",
    heritage: "Teka cung cấp giải pháp bảo quản lạnh đồng bộ cho bếp cao cấp.",
    technicalSpecs: [
      { label: "Kiểu", value: "Tủ lạnh độc lập / âm tủ / nhiều cánh inox" },
      { label: "Điện", value: "220-240V / 50Hz" },
      { label: "Hiệu suất NL", value: "theo nhãn năng lượng EU" },
    ],
    whyChoose: [WHY_EU,
      { icon: "❄️", title: "Bảo quản tối ưu", desc: "Phân vùng nhiệt độ, giữ thực phẩm tươi lâu." },
      { icon: "✨", title: "Inox cao cấp", desc: "Dòng RMF inox thủ công sang trọng, bền đẹp." }],
    projectShowcase: ["Bếp biệt thự", "Căn hộ cao cấp", "Showroom nội thất"],
  }),
  washer: mk({
    story: "Máy giặt Teka (WML/WDL) — cửa trước, inverter tiết kiệm điện, nhiều chương trình giặt cho gia đình.",
    heritage: "Teka cung cấp dòng thiết bị giặt cho không gian sống hiện đại.",
    technicalSpecs: [
      { label: "Kiểu", value: "Máy giặt cửa trước / giặt-sấy" },
      { label: "Điện", value: "220-240V / 50Hz" },
      { label: "Hiệu suất NL", value: "theo nhãn năng lượng EU" },
    ],
    whyChoose: [WHY_EU,
      { icon: "💧", title: "Giặt sạch tiết kiệm", desc: "Inverter êm, tiết kiệm điện nước." },
      { icon: "🌀", title: "Đa chương trình", desc: "Nhiều chế độ cho từng loại vải." }],
    projectShowcase: ["Căn hộ", "Nhà phố", "Căn hộ dịch vụ"],
  }),
  dryer: mk({
    story: "Máy sấy bơm nhiệt Teka (SHL) — sấy nhẹ nhàng, tiết kiệm điện, bảo vệ sợi vải.",
    heritage: "Teka bổ sung dòng sấy bơm nhiệt hiệu suất cao cho hệ giặt-sấy.",
    technicalSpecs: [
      { label: "Kiểu", value: "Máy sấy bơm nhiệt (heat pump)" },
      { label: "Điện", value: "220-240V / 50Hz" },
      { label: "Hiệu suất NL", value: "cao (heat pump)" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🌡️", title: "Sấy bơm nhiệt", desc: "Nhiệt thấp bảo vệ vải, tiết kiệm điện." },
      { icon: "👕", title: "Bảo vệ sợi vải", desc: "Sấy đều, giảm nhăn và co rút." }],
    projectShowcase: ["Căn hộ cao cấp", "Nhà phố", "Khu giặt chung cư"],
  }),
  sink: mk({
    story: "Chậu rửa Teka/Intra — dòng Square/ForSquare/Stone — inox và đá granite, kiểu dáng vuông hiện đại, một số có van xả tự động.",
    heritage: "Intra (1871, Thuỵ Điển) là thương hiệu chậu inox lâu đời trong tập đoàn Teka.",
    technicalSpecs: [
      { label: "Chất liệu", value: "Inox / đá granite (Tegranite)" },
      { label: "Kiểu", value: "Âm bàn / dương bàn, 1-2 hộc" },
      { label: "Dòng", value: "Square, ForSquare, Stone" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🪣", title: "Bền & dễ vệ sinh", desc: "Inox/đá chống bám bẩn, chống xước tốt." },
      { icon: "📐", title: "Thiết kế vuông", desc: "Góc R nhỏ hiện đại, tối ưu diện tích chậu." }],
    projectShowcase: ["Bếp gia đình", "Showroom bếp", "Dự án nội thất"],
  }),
  vacuum: mk({
    story: "Máy hút chân không thực phẩm Teka (VS 152) — đóng gói hút chân không, kéo dài bảo quản, lắp âm ngăn kéo.",
    heritage: "Teka bổ sung thiết bị bảo quản chuyên nghiệp cho bếp cao cấp.",
    technicalSpecs: [
      { label: "Kiểu", value: "Hút chân không âm ngăn kéo" },
      { label: "Điện", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🧪", title: "Bảo quản lâu", desc: "Hút chân không giữ thực phẩm tươi lâu hơn." },
      { icon: "🍳", title: "Sous-vide ready", desc: "Hỗ trợ nấu chân không nhiệt độ thấp." }],
    projectShowcase: ["Bếp penthouse", "Nhà hàng cao cấp", "Showroom"],
  }),
  "warming-drawer": mk({
    story: "Ngăn hâm & giữ ấm Teka (CP 15 GS) — kiểu kéo đẩy, giữ ấm đĩa/thức ăn, lắp âm đồng bộ tủ.",
    heritage: "Phụ kiện hoàn thiện cho hệ bếp âm cao cấp của Teka.",
    technicalSpecs: [
      { label: "Kiểu", value: "Ngăn hâm/giữ ấm dạng kéo (push-pull)" },
      { label: "Lắp đặt", value: "Âm tủ" },
      { label: "Điện", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🍽️", title: "Giữ ấm món ăn", desc: "Hâm đĩa và giữ nóng thức ăn trước khi dùng." },
      { icon: "🧩", title: "Đồng bộ tủ bếp", desc: "Lắp âm khít với lò và thiết bị cùng hệ." }],
    projectShowcase: ["Bếp cao cấp", "Khách sạn", "Showroom"],
  }),
};

/** Helper: lấy meta theo seriesOriginal (category) của Teka. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  const key = seriesOriginal.trim();
  return TEKA_SERIES_META[key] || TEKA_SERIES_META[key.split(/[·\/\s]/)[0].trim()];
}
