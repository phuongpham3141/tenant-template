/**
 * Metadata sơn 3TREES 三棵树 (SKSHU) — trang chi tiết. Keyed by seriesOriginal (catKey).
 * Sourcing: 3treesgroup.com — SKSHU Paint (三棵树涂料, niêm yết Thượng Hải 603737).
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
const CERTS = ["Tiêu chuẩn quốc gia TQ (GB) cho sơn & chống thấm", "Nhãn xanh – môi trường (10 Ring)", "Hàm lượng VOC thấp / khử mùi", "ISO 9001 / ISO 14001"];
const MFG = [
  "3TREES (SKSHU Paint) — một trong những hãng sơn lớn nhất Trung Quốc, niêm yết Thượng Hải mã 603737, thành lập 2002 tại Phúc Kiến",
  "Dải sản phẩm: sơn nội/ngoại thất, sơn giả đá, sơn nghệ thuật, chống thấm, keo dán, keo chà ron, bột trét",
  "Định hướng sơn xanh – khử mùi – ít VOC; nhiều dòng kháng khuẩn/chống nấm mốc/hấp thụ formaldehyde",
  "Hệ thống R&D & kiểm định chất lượng theo tiêu chuẩn quốc gia",
];
const PACK = [
  { label: "Quy cách", value: "Thùng/xô theo dòng (vd 18L, 5L); keo theo tuýp/xô" },
  { label: "MOQ", value: "Theo container/pallet; mix nhiều mã OK" },
  { label: "Bảo quản", value: "Nơi khô mát, tránh nắng & đóng băng; đậy kín sau dùng" },
];
const INSTALL = [
  "Xử lý bề mặt sạch, khô, phẳng; trét bột & sơn lót trước khi sơn phủ",
  "Thi công đúng định mức & số lớp, đủ thời gian khô giữa các lớp",
  "Pha loãng theo tỉ lệ khuyến cáo; khuấy đều trước khi dùng",
  "Chống thấm: thi công nhiều lớp, thử nước nghiệm thu trước khi che phủ",
];
const CARE = [
  { title: "Bảo quản", desc: "Đậy kín, để nơi khô mát tránh nắng/đóng băng; dùng hết trong hạn." },
  { title: "Thi công", desc: "Tuân thủ điều kiện nhiệt độ/độ ẩm; không thi công khi mưa hoặc ẩm cao." },
  { title: "Vệ sinh", desc: "Vệ sinh dụng cụ bằng nước (sơn gốc nước) ngay sau khi dùng." },
];
const FAQ = [
  { q: "Sơn 3TREES có nhãn môi trường không?", a: "Có. Nhiều dòng đạt nhãn xanh, khử mùi, VOC thấp; cung cấp tài liệu kỹ thuật theo sản phẩm." },
  { q: "Tư vấn chọn hệ sơn/chống thấm theo hạng mục?", a: "Có. Gửi hạng mục (nội/ngoại thất, mái, nhà vệ sinh...) để được tư vấn dòng phù hợp." },
  { q: "MOQ & thời gian giao?", a: "Tính theo container/pallet; lịch giao báo theo đơn." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🌳", title: "Sơn xanh hàng đầu TQ", desc: "3TREES — thương hiệu sơn lớn, định hướng khoẻ & thân thiện môi trường." };
const SHOW = ["Nhà ở, căn hộ, biệt thự", "Công trình thương mại & công cộng", "Dự án bàn giao & cải tạo"];
const INTERIOR = mk({
  story: "Sơn nội thất 3TREES — sơn nước (latex) khử mùi, ít VOC, nhiều dòng kháng khuẩn/chống nấm mốc/hấp thụ formaldehyde, độ phủ tốt, màu bền.",
  heritage: "Sơn nội thất là dòng lõi của 3TREES với định hướng sơn khoẻ.",
  technicalSpecs: [{ label: "Loại", value: "Sơn nước nội thất (latex)" }, { label: "Đặc tính", value: "Khử mùi, ít VOC, kháng khuẩn/chống mốc (tuỳ dòng)" }, { label: "Ứng dụng", value: "Tường & trần nội thất" }],
  whyChoose: [WHY, { icon: "🌬️", title: "Khử mùi – an toàn", desc: "Ít VOC, một số dòng hấp thụ formaldehyde, an toàn trong nhà." }, { icon: "🎨", title: "Màu bền, phủ tốt", desc: "Độ phủ cao, màu bền đẹp, dễ lau chùi." }],
  projectShowcase: SHOW,
});
export const TREES_SERIES_META: Record<string, SeriesMeta> = {
  interior: INTERIOR,
  exterior: mk({
    story: "Sơn ngoại thất 3TREES — chịu thời tiết, chống bám bụi, bền màu dưới nắng mưa, bảo vệ mặt đứng công trình.",
    heritage: "Dòng ngoại thất bảo vệ & làm đẹp mặt đứng công trình.",
    technicalSpecs: [{ label: "Loại", value: "Sơn nước ngoại thất" }, { label: "Đặc tính", value: "Chịu thời tiết, chống bám bụi, bền màu" }, { label: "Ứng dụng", value: "Tường ngoài, mặt đứng" }],
    whyChoose: [WHY, { icon: "☀️", title: "Bền thời tiết", desc: "Chịu nắng mưa, ít phai màu, chống rêu mốc." }, { icon: "🧱", title: "Bảo vệ tường", desc: "Bảo vệ mặt đứng, kéo dài tuổi thọ công trình." }],
    projectShowcase: SHOW,
  }),
  "faux-stone": mk({
    story: "Sơn giả đá 3TREES — tái tạo hiệu ứng đá tự nhiên cho mặt đứng, đa dạng vân & màu, thay thế ốp đá tiết kiệm.",
    heritage: "Sơn giả đá mang vẻ đẹp đá tự nhiên với chi phí hợp lý.",
    technicalSpecs: [{ label: "Loại", value: "Sơn giả đá (faux stone)" }, { label: "Hiệu ứng", value: "Vân đá tự nhiên đa dạng" }, { label: "Ứng dụng", value: "Mặt đứng, ốp trang trí" }],
    whyChoose: [WHY, { icon: "🪨", title: "Đẹp như đá thật", desc: "Hiệu ứng đá tự nhiên sang trọng cho mặt đứng." }, { icon: "💰", title: "Tiết kiệm", desc: "Thay thế ốp đá, nhẹ & chi phí hợp lý." }],
    projectShowcase: SHOW,
  }),
  artistic: mk({
    story: "Sơn nghệ thuật 3TREES — hiệu ứng bề mặt trang trí cao cấp (texture, vân, kim loại) cho không gian nội/ngoại thất ấn tượng.",
    heritage: "Sơn nghệ thuật tạo điểm nhấn thẩm mỹ cao cấp.",
    technicalSpecs: [{ label: "Loại", value: "Sơn nghệ thuật trang trí" }, { label: "Hiệu ứng", value: "Texture, vân, kim loại (tuỳ dòng)" }, { label: "Ứng dụng", value: "Điểm nhấn nội/ngoại thất" }],
    whyChoose: [WHY, { icon: "✨", title: "Thẩm mỹ cao", desc: "Hiệu ứng bề mặt độc đáo, sang trọng." }, { icon: "🖌️", title: "Đa hiệu ứng", desc: "Nhiều kiểu vân & màu cho thiết kế riêng." }],
    projectShowcase: SHOW,
  }),
  waterproof: mk({
    story: "Chống thấm 3TREES — sơn & màng chống thấm (JS polymer xi măng, màng tự dính, sơn linh hoạt) cho mái, tường, nhà vệ sinh, tầng hầm.",
    heritage: "Dòng chống thấm bảo vệ công trình khỏi thấm dột.",
    technicalSpecs: [{ label: "Loại", value: "Sơn/màng chống thấm (JS, tự dính, đàn hồi)" }, { label: "Đặc tính", value: "Đàn hồi, bám dính tốt, bền nước" }, { label: "Ứng dụng", value: "Mái, tường, nhà vệ sinh, tầng hầm" }],
    whyChoose: [WHY, { icon: "💧", title: "Chống thấm bền", desc: "Lớp phủ kín nước, đàn hồi theo kết cấu." }, { icon: "🏠", title: "Đa hạng mục", desc: "Cho mái, tường, khu ướt, tầng hầm." }],
    projectShowcase: SHOW,
  }),
  joint: mk({
    story: "Keo chà ron / làm đẹp mạch 3TREES — lấp mạch gạch đẹp, chống thấm, chống ố, đa dạng màu kể cả ánh kim.",
    heritage: "Keo chà ron hoàn thiện & bảo vệ mạch gạch ốp lát.",
    technicalSpecs: [{ label: "Loại", value: "Keo chà ron / làm đẹp mạch (epoxy/PU)" }, { label: "Đặc tính", value: "Chống thấm, chống ố, nhiều màu" }, { label: "Ứng dụng", value: "Mạch gạch ốp lát, sàn" }],
    whyChoose: [WHY, { icon: "✨", title: "Mạch đẹp – sạch", desc: "Lấp mạch đẹp, chống bám bẩn & nấm mốc." }, { icon: "🌈", title: "Đa màu", desc: "Nhiều màu kể cả ánh kim, hợp mọi gạch." }],
    projectShowcase: SHOW,
  }),
  adhesive: mk({
    story: "Keo dán 3TREES — keo dán đa năng không cần đinh, bám dính mạnh cho thi công nội thất nhanh gọn.",
    heritage: "Keo dán hỗ trợ thi công hoàn thiện tiện lợi.",
    technicalSpecs: [{ label: "Loại", value: "Keo dán đa năng / không cần đinh" }, { label: "Đặc tính", value: "Bám dính mạnh, đa vật liệu" }, { label: "Ứng dụng", value: "Dán phào, len, vật trang trí" }],
    whyChoose: [WHY, { icon: "🔩", title: "Không cần đinh", desc: "Dán chắc không khoan đục, gọn & nhanh." }],
    projectShowcase: SHOW,
  }),
  primer: mk({
    story: "Sơn lót 3TREES — tạo lớp nền bám dính, kháng kiềm, chống thấm ngược, tăng độ bền cho lớp sơn phủ.",
    heritage: "Sơn lót là bước nền quan trọng cho hệ sơn bền đẹp.",
    technicalSpecs: [{ label: "Loại", value: "Sơn lót nội/ngoại thất" }, { label: "Chức năng", value: "Kháng kiềm, tăng bám dính, chống thấm ngược" }, { label: "Ứng dụng", value: "Lớp nền trước sơn phủ" }],
    whyChoose: [WHY, { icon: "🛡️", title: "Nền bền", desc: "Kháng kiềm, tăng bám dính & tuổi thọ lớp phủ." }],
    projectShowcase: SHOW,
  }),
  floor: mk({
    story: "Sơn sàn 3TREES — sơn epoxy/PU siêu bền cho sàn công nghiệp, nhà xưởng, gara: chịu mài mòn, dễ vệ sinh.",
    heritage: "Sơn sàn cho công trình công nghiệp & thương mại.",
    technicalSpecs: [{ label: "Loại", value: "Sơn sàn epoxy / PU" }, { label: "Đặc tính", value: "Siêu bền, chịu mài mòn, dễ vệ sinh" }, { label: "Ứng dụng", value: "Nhà xưởng, gara, kho, sàn công nghiệp" }],
    whyChoose: [WHY, { icon: "🏭", title: "Siêu bền", desc: "Chịu mài mòn & tải trọng cho sàn công nghiệp." }],
    projectShowcase: SHOW,
  }),
  putty: mk({
    story: "Bột trét & vữa 3TREES — bột bả tường tạo phẳng, vữa chuyên dụng cho nền sơn hoàn thiện.",
    heritage: "Bột trét & vữa là nền hoàn thiện cho hệ sơn.",
    technicalSpecs: [{ label: "Loại", value: "Bột trét tường / vữa" }, { label: "Chức năng", value: "Tạo phẳng, bám dính nền" }, { label: "Ứng dụng", value: "Xử lý bề mặt trước sơn" }],
    whyChoose: [WHY, { icon: "🧱", title: "Nền phẳng mịn", desc: "Tạo bề mặt phẳng mịn cho lớp sơn đẹp." }],
    projectShowcase: SHOW,
  }),
  tool: mk({
    story: "Dụng cụ thi công 3TREES — con lăn, dụng cụ sơn lót/phủ hỗ trợ thi công hiệu quả.",
    heritage: "Dụng cụ đồng bộ cho hệ thi công sơn.",
    technicalSpecs: [{ label: "Loại", value: "Dụng cụ thi công (con lăn...)" }, { label: "Chức năng", value: "Thi công sơn hiệu quả, đều" }],
    whyChoose: [WHY, { icon: "🧰", title: "Thi công hiệu quả", desc: "Dụng cụ đồng bộ giúp lớp sơn đều, nhanh." }],
    projectShowcase: SHOW,
  }),
  insulation: mk({
    story: "Vật liệu cách nhiệt 3TREES — thanh bông khoáng & vật liệu hệ cách nhiệt cho tường, hệ thi công sơn-cách nhiệt.",
    heritage: "Vật liệu hệ ngoài cho giải pháp cách nhiệt – sơn.",
    technicalSpecs: [{ label: "Loại", value: "Vật liệu cách nhiệt (bông khoáng)" }, { label: "Chức năng", value: "Cách nhiệt, chống cháy" }, { label: "Ứng dụng", value: "Hệ tường ngoài cách nhiệt" }],
    whyChoose: [WHY, { icon: "🔥", title: "Cách nhiệt – chống cháy", desc: "Bông khoáng cách nhiệt & chống cháy cho tường." }],
    projectShowcase: SHOW,
  }),
  other: INTERIOR,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TREES_SERIES_META[seriesOriginal.trim()] || TREES_SERIES_META.interior;
}
