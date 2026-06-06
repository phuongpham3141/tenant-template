/**
 * Metadata Dulux Professional — trang chi tiết. Keyed by seriesOriginal (catKey).
 * Sourcing: duluxpro.com.cn — Dulux Professional (thuộc AkzoNobel).
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
const CERTS = ["Tiêu chuẩn quốc gia TQ (GB) cho sơn", "Nhãn môi trường (10 Ring) / VOC thấp", "Hệ chất lượng AkzoNobel toàn cầu", "ISO 9001 / ISO 14001"];
const MFG = [
  "Dulux Professional — dòng sơn chuyên nghiệp/công trình của AkzoNobel (tập đoàn sơn Hà Lan)",
  "Dải sản phẩm: sơn nội/ngoại thất, sơn giả đá, sơn tạo vân nghệ thuật, sơn khoáng vô cơ, sơn lót, bột trét",
  "Công nghệ sơn toàn cầu AkzoNobel; nhiều dòng khử mùi, kháng khuẩn, chống nấm mốc",
  "Hệ thống màu & giải pháp công trình chuyên nghiệp",
];
const PACK = [
  { label: "Quy cách", value: "Thùng/xô theo dòng (vd 18L, 5L); bột trét theo bao" },
  { label: "MOQ", value: "Theo container/pallet; mix nhiều mã OK" },
  { label: "Bảo quản", value: "Nơi khô mát, tránh nắng & đóng băng; đậy kín sau dùng" },
];
const INSTALL = [
  "Xử lý bề mặt sạch, khô, phẳng; trét bột & sơn lót trước khi sơn phủ",
  "Thi công đúng định mức & số lớp, đủ thời gian khô giữa các lớp",
  "Pha loãng theo tỉ lệ khuyến cáo của hãng; khuấy đều trước khi dùng",
  "Hệ ngoại thất/giả đá: thi công đúng quy trình lớp lót – phủ – bảo vệ",
];
const CARE = [
  { title: "Bảo quản", desc: "Đậy kín, để nơi khô mát tránh nắng/đóng băng; dùng trong hạn." },
  { title: "Thi công", desc: "Tuân thủ điều kiện nhiệt độ/độ ẩm; không thi công khi mưa/ẩm cao." },
  { title: "Vệ sinh", desc: "Vệ sinh dụng cụ bằng nước (sơn gốc nước) ngay sau khi dùng." },
];
const FAQ = [
  { q: "Dulux Pro có nhãn môi trường không?", a: "Có. Nhiều dòng đạt nhãn xanh/VOC thấp; cung cấp tài liệu kỹ thuật theo sản phẩm." },
  { q: "Tư vấn chọn hệ sơn theo hạng mục?", a: "Có. Gửi hạng mục (nội/ngoại thất, giả đá, chống thấm...) để được tư vấn dòng phù hợp." },
  { q: "MOQ & thời gian giao?", a: "Tính theo container/pallet; lịch giao báo theo đơn." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🎨", title: "AkzoNobel toàn cầu", desc: "Dulux Pro — dòng chuyên nghiệp của AkzoNobel, chất lượng quốc tế." };
const SHOW = ["Dự án nhà ở, chung cư, biệt thự", "Công trình thương mại & công cộng", "Dự án bàn giao & mặt đứng cao cấp"];
const INTERIOR = mk({
  story: "Sơn nội thất Dulux Professional — sơn nước khử mùi, nhiều dòng kháng khuẩn/chống mốc/chống ẩm, độ phủ cao, màu bền, dễ lau chùi.",
  heritage: "Sơn nội thất là dòng lõi với công nghệ AkzoNobel.",
  technicalSpecs: [{ label: "Loại", value: "Sơn nước nội thất" }, { label: "Đặc tính", value: "Khử mùi, kháng khuẩn/chống mốc (tuỳ dòng), độ phủ cao" }, { label: "Ứng dụng", value: "Tường & trần nội thất" }],
  whyChoose: [WHY, { icon: "🌬️", title: "Khử mùi – an toàn", desc: "Ít VOC, một số dòng kháng khuẩn, an toàn trong nhà." }, { icon: "🎨", title: "Màu bền, phủ tốt", desc: "Độ phủ cao, màu bền đẹp, dễ lau chùi." }],
  projectShowcase: SHOW,
});
const EXTERIOR = mk({
  story: "Sơn ngoại thất Dulux Professional — chịu thời tiết, chống bám bụi, bền màu dưới nắng mưa; có dòng đàn hồi che nứt cho mặt đứng.",
  heritage: "Dòng ngoại thất bảo vệ & làm đẹp mặt đứng công trình.",
  technicalSpecs: [{ label: "Loại", value: "Sơn nước ngoại thất (có dòng đàn hồi)" }, { label: "Đặc tính", value: "Chịu thời tiết, chống bám bụi, bền màu, che nứt (dòng đàn hồi)" }, { label: "Ứng dụng", value: "Tường ngoài, mặt đứng" }],
  whyChoose: [WHY, { icon: "☀️", title: "Bền thời tiết", desc: "Chịu nắng mưa, ít phai màu, chống rêu mốc." }, { icon: "🧱", title: "Che nứt", desc: "Dòng đàn hồi che vết nứt nhỏ, bảo vệ tường." }],
  projectShowcase: SHOW,
});
const PRIMER = mk({
  story: "Sơn lót Dulux Professional — kháng kiềm, tăng bám dính, chống thấm ngược, tạo nền bền cho lớp sơn phủ; có dòng lót giả đá/khoáng chuyên dụng.",
  heritage: "Sơn lót là bước nền quan trọng cho hệ sơn bền đẹp.",
  technicalSpecs: [{ label: "Loại", value: "Sơn lót nội/ngoại thất" }, { label: "Chức năng", value: "Kháng kiềm, tăng bám dính, chống thấm ngược" }, { label: "Ứng dụng", value: "Lớp nền trước sơn phủ" }],
  whyChoose: [WHY, { icon: "🛡️", title: "Nền bền", desc: "Kháng kiềm, tăng bám dính & tuổi thọ lớp phủ." }],
  projectShowcase: SHOW,
});
export const DULUX_PRO_SERIES_META: Record<string, SeriesMeta> = {
  interior: INTERIOR, exterior: EXTERIOR, primer: PRIMER,
  "real-stone": mk({
    story: "Sơn giả đá Dulux Professional — tái tạo hiệu ứng đá tự nhiên (granite, đá thật) cho mặt đứng cao cấp, đa dạng vân màu.",
    heritage: "Sơn giả đá mang vẻ đẹp đá tự nhiên với chi phí hợp lý.",
    technicalSpecs: [{ label: "Loại", value: "Sơn giả đá (real stone)" }, { label: "Hiệu ứng", value: "Vân đá tự nhiên, granite" }, { label: "Ứng dụng", value: "Mặt đứng, ốp trang trí cao cấp" }],
    whyChoose: [WHY, { icon: "🪨", title: "Đẹp như đá thật", desc: "Hiệu ứng đá tự nhiên sang trọng cho mặt đứng." }, { icon: "☀️", title: "Bền ngoài trời", desc: "Chịu thời tiết, giữ vẻ đẹp lâu dài." }],
    projectShowcase: SHOW,
  }),
  texture: mk({
    story: "Sơn tạo vân nghệ thuật Dulux Professional — hiệu ứng bề mặt trang trí (texture, vân nổi, đắp nổi) cho không gian ấn tượng.",
    heritage: "Sơn nghệ thuật tạo điểm nhấn thẩm mỹ cao cấp.",
    technicalSpecs: [{ label: "Loại", value: "Sơn tạo vân/đắp nổi nghệ thuật" }, { label: "Hiệu ứng", value: "Texture, vân nổi, đắp nổi" }, { label: "Ứng dụng", value: "Điểm nhấn nội/ngoại thất" }],
    whyChoose: [WHY, { icon: "✨", title: "Thẩm mỹ cao", desc: "Hiệu ứng bề mặt độc đáo, sang trọng." }, { icon: "🖌️", title: "Đa hiệu ứng", desc: "Nhiều kiểu vân & lớp cho thiết kế riêng." }],
    projectShowcase: SHOW,
  }),
  mineral: mk({
    story: "Sơn khoáng vô cơ Dulux Professional — gốc khoáng vô cơ thân thiện môi trường, thoáng khí, bền màu, chống kiềm hoá tốt cho nội/ngoại thất.",
    heritage: "Dòng khoáng vô cơ cho giải pháp sơn bền vững.",
    technicalSpecs: [{ label: "Loại", value: "Sơn khoáng vô cơ" }, { label: "Đặc tính", value: "Thoáng khí, bền màu, thân thiện môi trường" }, { label: "Ứng dụng", value: "Nội/ngoại thất, công trình bền vững" }],
    whyChoose: [WHY, { icon: "🌱", title: "Bền vững", desc: "Gốc khoáng vô cơ, thoáng khí, thân thiện môi trường." }, { icon: "🧱", title: "Bền màu", desc: "Chống kiềm hoá, giữ màu lâu dài." }],
    projectShowcase: SHOW,
  }),
  metal: mk({
    story: "Sơn hiệu ứng kim loại Dulux Professional — lớp phủ hiệu ứng ánh kim cho mặt đứng & trang trí cao cấp.",
    heritage: "Sơn kim loại cho hiệu ứng thẩm mỹ đặc biệt.",
    technicalSpecs: [{ label: "Loại", value: "Sơn hiệu ứng kim loại (gốc nước)" }, { label: "Hiệu ứng", value: "Ánh kim trang trí" }, { label: "Ứng dụng", value: "Mặt đứng, điểm nhấn cao cấp" }],
    whyChoose: [WHY, { icon: "🥇", title: "Ánh kim sang", desc: "Hiệu ứng kim loại độc đáo cho công trình cao cấp." }],
    projectShowcase: SHOW,
  }),
  waterproof: mk({
    story: "Chống thấm Dulux Professional — sơn/giải pháp chống thấm cho tường, mái, khu ướt; bảo vệ công trình khỏi thấm dột.",
    heritage: "Dòng chống thấm bảo vệ công trình.",
    technicalSpecs: [{ label: "Loại", value: "Sơn/giải pháp chống thấm" }, { label: "Đặc tính", value: "Đàn hồi, bám dính, bền nước" }, { label: "Ứng dụng", value: "Tường, mái, khu ướt" }],
    whyChoose: [WHY, { icon: "💧", title: "Chống thấm bền", desc: "Lớp phủ kín nước, bảo vệ kết cấu." }],
    projectShowcase: SHOW,
  }),
  other: INTERIOR,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DULUX_PRO_SERIES_META[seriesOriginal.trim()] || DULUX_PRO_SERIES_META.interior;
}
