/**
 * Metadata đá nhân tạo Pengxiang 鹏翔 — trang chi tiết. Keyed by seriesOriginal (quartz/marble/onyx/terrazzo).
 * Sourcing: px-stone.com — Fujian Pengxiang Industrial (福建鹏翔实业), Nam An, Phúc Kiến.
 * Pengxiang là tập đoàn mẹ của Đức Thịnh Stone (pháp nhân Việt Nam).
 */
export type SeriesMeta = {
  story: string; heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[]; careGuide: { title: string; desc: string }[];
  installation: string[]; certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[]; faq: { q: string; a: string }[];
};
const CERTS = ["ISO 9001 — Quản lý chất lượng", "Chứng nhận vật liệu không phóng xạ", "Kiểm định độ hút nước, độ bền uốn, chống mài mòn", "Vật liệu thân thiện môi trường (low-VOC resin)"];
const MFG = [
  "Fujian Pengxiang Industrial — thành lập 2006, Nam An, Phúc Kiến (thủ phủ đá Trung Quốc)",
  "Nhà sản xuất đá nhân tạo hàng đầu: marble nhân tạo, thạch anh (quartz), onyx, terrazzo",
  "Tập đoàn mẹ của Đức Thịnh Stone (pháp nhân Việt Nam, nhà máy Nghệ An)",
  "Đá kỹ thuật ép ~90% bột đá/thạch anh + resin; tấm khổ lớn, cắt theo yêu cầu",
];
const PACK = [
  { label: "Đóng gói", value: "Giá sắt A-frame + nẹp góc + màng quấn; kiện gỗ xuất khẩu" },
  { label: "Khổ tấm", value: "3200×1600mm / 2400×1600mm + cắt theo yêu cầu" },
  { label: "Độ dày", value: "12 – 30mm tuỳ dòng" },
  { label: "MOQ", value: "Theo container; mix nhiều màu/khổ OK" },
];
const INSTALL = [
  "Đo đạc & lập bản vẽ cắt (nesting) tối ưu vân đá trước khi gia công",
  "Cắt CNC + mài cạnh; dùng keo chuyên dụng đá nhân tạo cho mối nối",
  "Đảm bảo mặt đỡ phẳng, chịu lực đều; gia cố với khẩu độ lớn",
  "Vệ sinh & đánh bóng mối nối sau lắp đặt",
];
const CARE = [
  { title: "Vệ sinh hằng ngày", desc: "Lau bằng khăn mềm + nước ấm/chất tẩy trung tính. Tránh hoá chất tẩy mạnh, axit/kiềm đậm đặc." },
  { title: "Phòng ngừa", desc: "Dùng thớt/đế lót khi cắt & đặt nồi nóng; tránh sốc nhiệt đột ngột." },
  { title: "Xử lý vết bẩn", desc: "Vết cứng đầu dùng dung dịch tẩy nhẹ + miếng cọ không gây xước; lau sạch ngay." },
];
const FAQ = [
  { q: "Đá Pengxiang có cắt theo kích thước yêu cầu không?", a: "Có. Hỗ trợ cắt theo kích thước (cut-to-size) và gia công cạnh theo bản vẽ." },
  { q: "Quan hệ với Đức Thịnh Stone?", a: "Pengxiang là tập đoàn mẹ; Đức Thịnh Stone là pháp nhân Việt Nam (nhà máy Nghệ An) cùng hệ sản phẩm." },
  { q: "MOQ & thời gian giao?", a: "Tính theo container; lịch giao báo theo đơn." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const SHOW = ["Mặt bếp căn hộ & biệt thự", "Ốp tường & sàn nội thất cao cấp", "Sảnh khách sạn, mặt tiền thương mại"];
const QUARTZ = mk({
  story: "Đá thạch anh nhân tạo (engineered quartz) Pengxiang — ép từ ~90% bột thạch anh + resin: độ cứng cao, chống trầy xước, chống thấm, chịu axit. Phù hợp mặt bếp, lavabo, sàn, ốp tường.",
  heritage: "Quartz là dòng đá kỹ thuật phổ biến nhất cho mặt bếp nhờ bền & bề mặt không xốp.",
  technicalSpecs: [{ label: "Vật liệu", value: "Bột thạch anh ~90% + nhựa resin" }, { label: "Khổ tấm", value: "3200×1600 / 3000×1600 mm" }, { label: "Độ dày", value: "12 – 30 mm" }, { label: "Bề mặt", value: "Đánh bóng / mài mờ" }, { label: "Đặc tính", value: "Chống axit, vết bẩn, nhiệt, trầy xước" }],
  whyChoose: [{ icon: "💎", title: "Cứng & bền", desc: "Cứng hơn đá tự nhiên, chống trầy, ít bảo trì." }, { icon: "🛡️", title: "Không thấm", desc: "Bề mặt không xốp, không ngấm nước/dầu." }, { icon: "🎨", title: "Đa vân màu", desc: "Nhiều tông & dòng Calacatta vân vàng." }],
  projectShowcase: SHOW,
});
const MARBLE = mk({
  story: "Đá marble nhân tạo (engineered/artificial marble) Pengxiang — tái tạo vân marble tự nhiên với độ đồng đều cao, dễ gia công, giá hợp lý cho ốp tường, sàn, nội thất.",
  heritage: "Marble nhân tạo cho vân đẹp đồng đều, ít khuyết tật, phù hợp diện tích lớn.",
  technicalSpecs: [{ label: "Vật liệu", value: "Đá tự nhiên + bột marble + resin" }, { label: "Khổ tấm", value: "3200×1600 / 2400×1600 mm + cắt theo yêu cầu" }, { label: "Độ dày", value: "12 – 30 mm" }, { label: "Bề mặt", value: "Đánh bóng / mài mờ" }, { label: "Ứng dụng", value: "Ốp tường, sàn, phòng tắm, sảnh" }],
  whyChoose: [{ icon: "🏛️", title: "Vẻ đẹp marble", desc: "Vân marble sang trọng, đồng đều diện tích lớn." }, { icon: "✂️", title: "Dễ gia công", desc: "Cắt/ghép linh hoạt, ít hao hụt hơn đá khối." }, { icon: "💰", title: "Chi phí hợp lý", desc: "Giá tốt hơn marble tự nhiên cùng thẩm mỹ." }],
  projectShowcase: SHOW,
});
export const PENGXIANG_SERIES_META: Record<string, SeriesMeta> = {
  quartz: QUARTZ, marble: MARBLE, other: MARBLE,
  onyx: mk({
    story: "Đá onyx nhân tạo Pengxiang — hiệu ứng xuyên sáng (translucent) & vân onyx độc đáo cho hạng mục điểm nhấn, vách backlit, quầy bar.",
    heritage: "Onyx nhân tạo tái hiện vẻ huyền ảo của onyx tự nhiên với độ bền cao hơn.",
    technicalSpecs: [{ label: "Vật liệu", value: "Bột khoáng + resin (hiệu ứng onyx)" }, { label: "Đặc tính", value: "Vân onyx, một số dòng xuyên sáng (backlit)" }, { label: "Ứng dụng", value: "Vách điểm nhấn, quầy bar, mặt bàn trang trí" }],
    whyChoose: [{ icon: "✨", title: "Xuyên sáng", desc: "Đẹp khi chiếu sáng sau (backlit), sang trọng." }, { icon: "🎨", title: "Vân độc đáo", desc: "Vân onyx huyền ảo, mỗi tấm một vẻ." }],
    projectShowcase: SHOW,
  }),
  terrazzo: mk({
    story: "Đá terrazzo (đá mài) nhân tạo Pengxiang — hạt đá/thuỷ tinh rải đều trên nền, phong cách terrazzo hiện đại cho sàn, ốp tường, mặt bàn.",
    heritage: "Terrazzo trở lại xu hướng thiết kế hiện đại với độ bền & thẩm mỹ.",
    technicalSpecs: [{ label: "Vật liệu", value: "Hạt đá/thuỷ tinh + nền resin/xi măng" }, { label: "Hiệu ứng", value: "Terrazzo hạt rải, đa màu" }, { label: "Ứng dụng", value: "Sàn, ốp tường, mặt bàn" }],
    whyChoose: [{ icon: "🎯", title: "Phong cách terrazzo", desc: "Hạt rải hiện đại, hợp xu hướng thiết kế." }, { icon: "💪", title: "Bền chắc", desc: "Chịu mài mòn tốt cho sàn lưu lượng cao." }],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return PENGXIANG_SERIES_META[seriesOriginal.trim()] || PENGXIANG_SERIES_META.marble;
}
