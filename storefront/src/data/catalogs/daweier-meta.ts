/**
 * Metadata Daweier 达威尔 — trang chi tiết. Keyed by seriesOriginal (catKey: sink/faucet/drain/accessory...).
 * Sourcing: daweier.cn — Kaiping Daweier Kitchen & Bath (开平达威尔厨卫), Quảng Đông. Chậu inox, vòi, địa lậu.
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
const CERTS = ["Tiêu chuẩn quốc gia TQ (GB) cho thiết bị bếp & vệ sinh", "Inox SUS304 cấp thực phẩm", "ISO 9001 quản lý chất lượng", "Kiểm định chống ăn mòn & độ kín nước"];
const MFG = [
  "Daweier (Khai Bình, Quảng Đông) — chuyên chậu rửa inox thủ công, vòi bếp, địa lậu (floor drain) & phụ kiện",
  "Chậu inox SUS304 cấp thực phẩm; dòng thủ công (handmade) & dập kéo (drawn)",
  "Địa lậu là dòng thế mạnh — nhiều kiểu thoát ngang/thoát dưới chống mùi",
  "Kiểm soát chất lượng: thử kín nước, chống ăn mòn, độ dày tấm inox",
];
const PACK = [
  { label: "Đóng gói", value: "Hộp carton + xốp/màng bảo vệ bề mặt inox" },
  { label: "Phụ kiện kèm", value: "Bộ xả, giỏ lọc, gioăng (tuỳ sản phẩm)" },
  { label: "MOQ", value: "Theo lô/container; mix nhiều mã OK" },
];
const INSTALL = [
  "Chậu: khoét mặt bàn đúng kích thước (cut-out), bắt kẹp & bơm silicon viền",
  "Vòi: lắp vào lỗ chờ, đấu cấp nước nóng/lạnh, kiểm tra rò rỉ",
  "Địa lậu: lắp đúng cao độ sàn, đảm bảo dốc thoát & bẫy chống mùi",
  "Thử nước nghiệm thu trước khi bàn giao",
];
const CARE = [
  { title: "Vệ sinh inox", desc: "Lau bằng khăn mềm + nước rửa trung tính theo vân xước; tránh bùi nhùi thép & axit mạnh gây xước/ăn mòn." },
  { title: "Chống đọng", desc: "Lau khô sau khi dùng để tránh vết nước/ố; thông giỏ lọc & bẫy thoát định kỳ." },
  { title: "Vòi/địa lậu", desc: "Vệ sinh đầu vòi chống cặn vôi; kiểm tra gioăng & bẫy chống mùi địa lậu." },
];
const FAQ = [
  { q: "Chậu Daweier dùng inox loại nào?", a: "Inox SUS304 cấp thực phẩm, chống gỉ & bền với môi trường bếp." },
  { q: "Có hỗ trợ kích thước khoét bàn (cut-out) không?", a: "Có. Thông số kích thước theo từng model; Huayuesc hỗ trợ bản vẽ lắp đặt." },
  { q: "MOQ & thời gian giao?", a: "Tính theo lô/container; lịch giao báo theo đơn." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🍳", title: "Inox SUS304 bền", desc: "Chậu/phụ kiện inox 304 cấp thực phẩm, chống gỉ, bền đẹp." };
const SHOW = ["Bếp gia đình & chung cư", "Nhà hàng, bếp thương mại", "Dự án bàn giao bếp & vệ sinh"];
const SINK = mk({
  story: "Chậu rửa inox Daweier — dòng thủ công (handmade R10) & dập kéo, inox SUS304 dày, đáy chống ồn, nhiều kiểu đơn/đôi cho bếp gia đình & thương mại.",
  heritage: "Chậu inox thủ công là dòng lõi của Daweier.",
  technicalSpecs: [{ label: "Chất liệu", value: "Inox SUS304 cấp thực phẩm" }, { label: "Công nghệ", value: "Thủ công (handmade) / dập kéo (drawn)" }, { label: "Đặc tính", value: "Đáy chống ồn, chống gỉ, dễ vệ sinh" }, { label: "Kiểu", value: "Đơn/đôi, âm bàn/dương bàn" }],
  whyChoose: [WHY, { icon: "🔇", title: "Chống ồn", desc: "Lớp đáy giảm ồn khi xả nước, êm hơn." }, { icon: "🧽", title: "Dễ vệ sinh", desc: "Góc R hợp lý, bề mặt mịn, lau chùi nhanh." }],
  projectShowcase: SHOW,
});
export const DAWEIER_SERIES_META: Record<string, SeriesMeta> = {
  sink: SINK, basin: SINK, other: SINK,
  faucet: mk({
    story: "Vòi bếp Daweier — vòi nước nóng-lạnh cho bồn rửa, lõi gốm bền, dòng chảy ổn định, mạ chống xỉn.",
    heritage: "Vòi bếp hoàn thiện bộ bồn rửa Daweier.",
    technicalSpecs: [{ label: "Chất liệu", value: "Đồng/inox mạ" }, { label: "Lõi van", value: "Trục gốm (ceramic cartridge)" }, { label: "Ứng dụng", value: "Bồn rửa bếp" }],
    whyChoose: [WHY, { icon: "🚿", title: "Dòng chảy êm", desc: "Lõi gốm đóng/mở mượt, ít rò rỉ." }, { icon: "🛡️", title: "Mạ bền", desc: "Lớp mạ chống xỉn màu, sáng đẹp lâu dài." }],
    projectShowcase: SHOW,
  }),
  drain: mk({
    story: "Địa lậu (floor drain) Daweier — thoát sàn inox/đồng chống mùi, nhiều kiểu thoát ngang & thoát dưới, lưu lượng thoát lớn cho nhà tắm, ban công, bếp.",
    heritage: "Địa lậu là dòng thế mạnh chuyên sâu của Daweier.",
    technicalSpecs: [{ label: "Chất liệu", value: "Inox SUS304 / đồng" }, { label: "Kiểu", value: "Thoát ngang (E) / thoát dưới; vuông (L05)" }, { label: "Đặc tính", value: "Chống mùi, lưu lượng thoát lớn" }, { label: "Ứng dụng", value: "Nhà tắm, ban công, bếp" }],
    whyChoose: [WHY, { icon: "👃", title: "Chống mùi", desc: "Bẫy chống mùi hiệu quả, ngăn mùi cống ngược." }, { icon: "💧", title: "Thoát nhanh", desc: "Lưu lượng thoát lớn, hạn chế đọng nước sàn." }],
    projectShowcase: SHOW,
  }),
  accessory: mk({
    story: "Phụ kiện bồn rửa Daweier — bộ xả, đầu xả, ống thoát, giỏ lọc & phụ kiện đồng bộ cho bồn rửa inox.",
    heritage: "Phụ kiện đồng bộ hoàn thiện hệ bồn rửa.",
    technicalSpecs: [{ label: "Chất liệu", value: "Inox / hợp kim / nhựa ABS" }, { label: "Gồm", value: "Bộ xả, đầu xả, ống thoát, giỏ lọc" }, { label: "Ứng dụng", value: "Bồn rửa bếp" }],
    whyChoose: [WHY, { icon: "🧩", title: "Đồng bộ", desc: "Phụ kiện khớp chuẩn với chậu Daweier, lắp nhanh." }],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DAWEIER_SERIES_META[seriesOriginal.trim()] || DAWEIER_SERIES_META.sink;
}
