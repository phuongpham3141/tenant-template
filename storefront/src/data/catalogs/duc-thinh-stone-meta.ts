/**
 * Rich metadata cho các dòng đá nhân tạo Đức Thịnh Stone — trang chi tiết sản phẩm.
 * Keyed by seriesOriginal (category: "quartz", "marble", "onyx").
 *
 * Honest sourcing:
 *   • Hồ sơ & thông số: ducthinhstone.com (Duc Thinh Stone Technology Co., Ltd).
 *   • Dòng đá kỹ thuật (engineered stone) sản xuất từ bột thạch anh/đá + resin.
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
  "ISO 9001 — Quản lý chất lượng",
  "Chứng nhận vật liệu không phóng xạ (NSF/Class A theo lô)",
  "Kiểm định độ hút nước, độ bền uốn, chống mài mòn",
  "Vật liệu thân thiện môi trường (low-VOC resin)",
];
const COMMON_MFG = [
  "Đức Thịnh Stone — nhà cung cấp & gia công đá nhân tạo (engineered stone) cho thị trường nội thất Việt Nam",
  "Đá kỹ thuật ép từ ~90% bột thạch anh / bột đá + nhựa resin dưới áp lực rung-ép chân không",
  "Tấm khổ lớn 3200×1600mm, 3000×1400/1600mm; độ dày 18–30mm; cắt theo kích thước yêu cầu",
  "Năng lực cung ứng lớn (hàng triệu m²/năm), nguồn nguyên liệu ổn định",
];
const COMMON_PACKAGING = [
  { label: "Đóng gói", value: "Giá sắt (A-frame) + nẹp góc + màng quấn; kiện gỗ cho xuất khẩu" },
  { label: "Khổ tấm", value: "3200×1600mm / 3000×1400mm / 3000×1600mm / 3000×1200mm + cắt theo yêu cầu" },
  { label: "Độ dày", value: "18 – 30mm tuỳ dòng" },
  { label: "MOQ", value: "Theo container; mix nhiều màu/khổ OK" },
  { label: "Bảo quản", value: "Dựng đứng trên giá A-frame, tránh va đập cạnh tấm" },
];
const COMMON_INSTALL = [
  "Đo đạc & lập bản vẽ cắt (nesting) tối ưu vân đá trước khi gia công",
  "Cắt CNC + mài cạnh; dùng keo chuyên dụng đá nhân tạo cho mối nối",
  "Đảm bảo mặt đỡ phẳng, chịu lực đều; gia cố với khẩu độ lớn (mặt bếp)",
  "Vệ sinh & đánh bóng mối nối sau lắp đặt",
];
const COMMON_CARE = [
  { title: "Vệ sinh hằng ngày", desc: "Lau bằng khăn mềm + nước ấm/chất tẩy trung tính. Tránh hoá chất tẩy mạnh, axit/kiềm đậm đặc." },
  { title: "Phòng ngừa", desc: "Dùng thớt/đế lót khi cắt và đặt nồi nóng. Đá thạch anh chịu nhiệt tốt nhưng tránh sốc nhiệt đột ngột." },
  { title: "Xử lý vết bẩn", desc: "Vết cứng đầu dùng dung dịch tẩy nhẹ + miếng cọ không gây xước; lau sạch ngay." },
];
const COMMON_FAQ = [
  { q: "Đá nhân tạo Đức Thịnh có cắt theo kích thước yêu cầu không?", a: "Có. Hỗ trợ cắt theo kích thước (cut-to-size) và gia công cạnh theo bản vẽ." },
  { q: "Đặt hàng tối thiểu và thời gian giao?", a: "Tính theo container/khối lượng; thời gian giao thương lượng theo đơn (tham khảo ~15 ngày)." },
  { q: "Có cung cấp mẫu (sample) để duyệt màu không?", a: "Có. Cung cấp mẫu tấm nhỏ để duyệt màu/vân trước khi đặt số lượng lớn." },
];
function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: COMMON_MFG, careGuide: COMMON_CARE, installation: COMMON_INSTALL,
    certifications: COMMON_CERTS, packaging: COMMON_PACKAGING, faq: COMMON_FAQ };
}

export const DTS_SERIES_META: Record<string, SeriesMeta> = {
  quartz: mk({
    story: "Đá thạch anh nhân tạo (engineered quartz) Đức Thịnh — ép từ ~90% bột thạch anh + resin, cho độ cứng cao, chống trầy xước, chống thấm và chịu axit tốt. Phù hợp mặt bếp, mặt lavabo, sàn và ốp tường.",
    heritage: "Quartz là dòng đá kỹ thuật phổ biến nhất cho mặt bếp nhờ độ bền vượt đá tự nhiên và bề mặt không xốp, kháng khuẩn.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Bột thạch anh ~90% + nhựa resin" },
      { label: "Khổ tấm", value: "3200×1600 / 3000×1400 / 3000×1600 mm" },
      { label: "Độ dày", value: "20 – 30 mm" },
      { label: "Bề mặt", value: "Đánh bóng / mài mờ (honed)" },
      { label: "Đặc tính", value: "Chống axit, vết bẩn, nhiệt, trầy xước" },
    ],
    whyChoose: [
      { icon: "💎", title: "Cứng & bền", value: undefined as never, desc: "Độ cứng cao hơn đá tự nhiên, chống trầy xước, ít cần bảo trì." } as never,
      { icon: "🛡️", title: "Không thấm, kháng khuẩn", desc: "Bề mặt không xốp, không ngấm nước/dầu, vệ sinh dễ." },
      { icon: "🎨", title: "Đa dạng vân màu", desc: "Nhiều tông trắng/xám/đen/be & dòng Calacatta vân vàng." },
    ],
    projectShowcase: ["Mặt bếp căn hộ & biệt thự", "Quầy lễ tân, mặt bàn thương mại", "Ốp tường & sàn nội thất cao cấp"],
  }),
  marble: mk({
    story: "Đá marble nhân tạo (engineered/artificial marble) Đức Thịnh — tái tạo vẻ đẹp vân marble tự nhiên với độ đồng đều cao, dễ gia công, giá hợp lý cho ốp tường, sàn và nội thất.",
    heritage: "Marble nhân tạo cho vân đẹp như đá tự nhiên nhưng đồng đều và ít khuyết tật hơn, phù hợp diện tích lớn.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Đá tự nhiên + bột marble + resin" },
      { label: "Khổ tấm", value: "3200×1600 / 2400×1600 mm + cắt theo yêu cầu" },
      { label: "Độ dày", value: "18 – 30 mm" },
      { label: "Bề mặt", value: "Đánh bóng / mài mờ / phun cát" },
      { label: "Ứng dụng", value: "Ốp tường, sàn, phòng tắm, phòng khách" },
    ],
    whyChoose: [
      { icon: "🏛️", title: "Vẻ đẹp marble", desc: "Vân marble sang trọng, đồng đều trên diện tích lớn." },
      { icon: "✂️", title: "Dễ gia công", desc: "Cắt/ghép linh hoạt, ít hao hụt hơn đá khối tự nhiên." },
      { icon: "💰", title: "Chi phí hợp lý", desc: "Giá tốt hơn marble tự nhiên cùng hiệu ứng thẩm mỹ." },
    ],
    projectShowcase: ["Sảnh & ốp tường khách sạn", "Sàn phòng khách biệt thự", "Mặt tiền & nội thất thương mại"],
  }),
  onyx: mk({
    story: "Đá onyx nhân tạo Đức Thịnh — hiệu ứng xuyên sáng (translucent) và vân onyx độc đáo cho các hạng mục trang trí điểm nhấn, vách xuyên sáng, quầy bar.",
    heritage: "Onyx nhân tạo tái hiện vẻ huyền ảo của onyx tự nhiên với độ bền cao hơn, phù hợp hạng mục backlit.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Bột khoáng + resin (hiệu ứng onyx)" },
      { label: "Khổ tấm", value: "Tấm lớn, cắt theo yêu cầu" },
      { label: "Đặc tính", value: "Vân onyx, một số dòng xuyên sáng (backlit)" },
      { label: "Ứng dụng", value: "Vách điểm nhấn, quầy bar, mặt bàn trang trí" },
    ],
    whyChoose: [
      { icon: "✨", title: "Hiệu ứng xuyên sáng", desc: "Đẹp khi chiếu sáng sau (backlit) cho điểm nhấn sang trọng." },
      { icon: "🎨", title: "Vân độc đáo", desc: "Vân onyx huyền ảo, mỗi tấm một vẻ." },
      { icon: "💪", title: "Bền hơn onyx tự nhiên", desc: "Ít nứt vỡ, dễ thi công hơn đá khối." },
    ],
    projectShowcase: ["Vách backlit sảnh khách sạn", "Quầy bar & lễ tân", "Điểm nhấn nội thất cao cấp"],
  }),
};

/** Helper: lấy meta theo seriesOriginal (category). */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DTS_SERIES_META[seriesOriginal.trim()] || DTS_SERIES_META.quartz;
}
