/**
 * Metadata các dòng vật liệu chống thấm Yuhong — trang chi tiết sản phẩm.
 * Keyed by seriesOriginal (key: "membrane-poly","membrane-bitumen","membrane-sa","pu","water","bitumen-coat","rigid").
 *
 * Honest sourcing: yuhong.com.cn — Beijing Oriental Yuhong (BOWS, SZSE 002271),
 * nhà sản xuất chống thấm lớn nhất Trung Quốc.
 */
export type SeriesMeta = {
  story: string; heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[];
  careGuide: { title: string; desc: string }[];
  installation: string[]; certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[]; faq: { q: string; a: string }[];
};
const CERTS = [
  "Tiêu chuẩn quốc gia TQ (GB) cho màng & sơn chống thấm",
  "ISO 9001 / ISO 14001 / ISO 45001",
  "Chứng nhận sản phẩm xanh, hàm lượng VOC thấp",
  "Thương hiệu nổi tiếng quốc gia TQ",
];
const MFG = [
  "Beijing Oriental Yuhong (SZSE 002271) — nhà sản xuất chống thấm lớn nhất Trung Quốc, thành lập 1995",
  "Hàng chục cơ sở sản xuất khắp Trung Quốc; hệ R&D & phòng thử nghiệm cấp quốc gia",
  "Dây chuyền tự động cho màng bitum/cao phân tử & sơn; kiểm soát chất lượng theo lô",
  "Cung ứng cho các đại dự án hạ tầng: đường sắt cao tốc, sân bay, tàu điện ngầm, hồ chứa",
];
const PACK = [
  { label: "Màng cuộn", value: "Cuộn rộng 1m, dài 10–20m/cuộn; pallet quấn màng" },
  { label: "Sơn/coating", value: "Thùng 20kg (hoặc theo quy cách hãng)" },
  { label: "MOQ", value: "Theo container; mix nhiều mã OK" },
  { label: "Bảo quản", value: "Nơi khô mát, tránh nắng; màng dựng đứng, sơn đậy kín" },
];
const INSTALL = [
  "Xử lý bề mặt sạch, khô, phẳng, không bụi dầu trước khi thi công",
  "Màng khò/dán: khò nhiệt hoặc bóc lớp tự dính theo đúng hướng dẫn; chồng mí đủ rộng",
  "Sơn: thi công nhiều lớp theo định mức, đủ thời gian khô giữa các lớp",
  "Thử ngâm nước nghiệm thu trước khi cán bảo vệ / ốp lát",
];
const CARE = [
  { title: "Bảo quản", desc: "Để nơi khô ráo, tránh nắng nóng & nguồn lửa (màng bitum). Sơn đậy kín tránh đóng váng." },
  { title: "Thi công", desc: "Tuân thủ định mức & nhiệt độ thi công khuyến nghị; không thi công khi trời mưa/ẩm cao." },
  { title: "Nghiệm thu", desc: "Kiểm tra chồng mí, bo góc, cổ ống; thử nước trước khi che phủ." },
];
const FAQ = [
  { q: "Vật liệu Yuhong có tiêu chuẩn GB để nhập khẩu không?", a: "Có. Cung cấp tiêu chuẩn áp dụng (GB) + báo cáo thử nghiệm; Huayuesc hỗ trợ hồ sơ nhập khẩu." },
  { q: "Tư vấn chọn hệ chống thấm theo hạng mục?", a: "Có. Gửi hạng mục (mái, tầng hầm, nhà vệ sinh, hồ nước...) để được tư vấn màng/sơn phù hợp." },
  { q: "MOQ & thời gian giao?", a: "Tính theo container; lịch giao báo theo đơn." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🏆", title: "Số 1 chống thấm Trung Quốc", desc: "Thương hiệu dẫn đầu, dùng cho đại dự án hạ tầng quốc gia." };
const SHOW = ["Sân vận động Tổ Chim (Bird's Nest)", "Đường sắt cao tốc & tàu điện ngầm", "Sân bay, hồ chứa, hầm metro"];

export const YUHONG_SERIES_META: Record<string, SeriesMeta> = {
  "membrane-poly": mk({
    story: "Màng chống thấm cao phân tử Yuhong (TPO, HDPE/PMH, PME) — độ bền hoá học & cơ học cao, hàn nhiệt kín, dùng cho mái, tầng hầm, hồ chứa và hạng mục tiền trải (pre-applied).",
    heritage: "Dòng cao phân tử là giải pháp hiện đại cho công trình yêu cầu độ bền & tuổi thọ cao.",
    technicalSpecs: [
      { label: "Vật liệu", value: "TPO / HDPE / PE cao phân tử" },
      { label: "Độ dày phổ biến", value: "1.2 – 2.0 mm" },
      { label: "Kết nối", value: "Hàn nhiệt / tự dính lớp nền" },
      { label: "Ứng dụng", value: "Mái, tầng hầm, hồ chứa, tiền trải" },
    ],
    whyChoose: [WHY,
      { icon: "🔥", title: "Hàn nhiệt kín", desc: "Mối nối hàn nhiệt liền khối, bền & kín nước." },
      { icon: "🛡️", title: "Kháng hoá chất", desc: "Chịu môi trường & lão hoá tốt, tuổi thọ cao." }],
    projectShowcase: SHOW,
  }),
  "membrane-bitumen": mk({
    story: "Màng bitum cải tính SBS/APP Yuhong (dòng TKB, PMB, ARC) — đàn hồi cao, chịu nhiệt-lạnh, khò nhiệt thi công, cho mái, tầng hầm, hạng mục chịu lực.",
    heritage: "Màng bitum cải tính là chủ lực truyền thống của Yuhong cho công trình dân dụng & hạ tầng.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Bitum cải tính SBS / APP, gia cường polyester/sợi thuỷ tinh" },
      { label: "Độ dày", value: "3 mm / 4 mm" },
      { label: "Thi công", value: "Khò nhiệt (torch-on)" },
      { label: "Đặc tính", value: "Đàn hồi, chịu nhiệt độ rộng, chống đâm xuyên rễ (ARC)" },
    ],
    whyChoose: [WHY,
      { icon: "🌡️", title: "Chịu nhiệt rộng", desc: "Đàn hồi tốt cả nhiệt cao & lạnh sâu (dòng chuyên dụng)." },
      { icon: "🌿", title: "Chống xuyên rễ", desc: "Dòng ARC chống rễ cây đâm xuyên cho mái xanh." }],
    projectShowcase: SHOW,
  }),
  "membrane-sa": mk({
    story: "Màng tự dính Yuhong (TKB 2xx/3xx/4xx, SAM) — bóc dán nguội không cần khò lửa, an toàn thi công, dán nguội/ướt cho tầng hầm, nhà vệ sinh, mái.",
    heritage: "Công nghệ tự dính giúp thi công nhanh, an toàn, phù hợp không gian kín.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Bitum tự dính cải tính, có/không cốt" },
      { label: "Thi công", value: "Bóc dán nguội / dán ướt (wet-lay)" },
      { label: "Ưu điểm", value: "Không dùng lửa, an toàn, nhanh" },
      { label: "Ứng dụng", value: "Tầng hầm, nhà vệ sinh, mái" },
    ],
    whyChoose: [WHY,
      { icon: "🧊", title: "Dán nguội an toàn", desc: "Không cần khò lửa, thi công trong không gian kín an toàn." },
      { icon: "⏱️", title: "Thi công nhanh", desc: "Bóc lớp ly khai & dán, tiết kiệm thời gian." }],
    projectShowcase: SHOW,
  }),
  pu: mk({
    story: "Sơn chống thấm Polyurethane (PU) Yuhong (SPU, GES) — màng liền mạch đàn hồi cao, bám dính tốt, cho mái, sân thượng, nhà vệ sinh, kết cấu phức tạp.",
    heritage: "Sơn PU tạo lớp phủ liền mạch, lý tưởng cho bề mặt nhiều chi tiết.",
    technicalSpecs: [
      { label: "Loại", value: "Polyurethane 1 thành phần / 2 thành phần" },
      { label: "Đặc tính", value: "Đàn hồi cao, liền mạch, bám dính tốt" },
      { label: "Thi công", value: "Lăn/quét nhiều lớp theo định mức" },
      { label: "Ứng dụng", value: "Mái, sân thượng, nhà vệ sinh, ban công" },
    ],
    whyChoose: [WHY,
      { icon: "🎯", title: "Liền mạch", desc: "Không mối nối, phủ kín cổ ống & góc cạnh phức tạp." },
      { icon: "💪", title: "Đàn hồi cao", desc: "Co giãn theo kết cấu, chống nứt theo vết nứt nền." }],
    projectShowcase: SHOW,
  }),
  water: mk({
    story: "Sơn chống thấm gốc nước Yuhong (JS/JSA polymer-cement, HCA acrylic, VPC) — thân thiện môi trường, thi công bề mặt ẩm, cho nhà vệ sinh, bể nước, tường ngoài.",
    heritage: "Dòng gốc nước an toàn, ít mùi, phù hợp công trình dân dụng trong nhà.",
    technicalSpecs: [
      { label: "Loại", value: "Polymer xi măng (JS/JSA) / acrylic (HCA) / thấm khí (VPC)" },
      { label: "Đặc tính", value: "Gốc nước, ít mùi, thi công bề mặt ẩm" },
      { label: "Ứng dụng", value: "Nhà vệ sinh, bể nước, tường ngoài, ban công" },
    ],
    whyChoose: [WHY,
      { icon: "🌱", title: "Thân thiện môi trường", desc: "Gốc nước, ít VOC, an toàn thi công trong nhà." },
      { icon: "💧", title: "Bám bề mặt ẩm", desc: "Thi công được trên nền ẩm, lý tưởng khu vực ướt." }],
    projectShowcase: SHOW,
  }),
  "bitumen-coat": mk({
    story: "Sơn chống thấm gốc nhựa đường Yuhong (PBC không đóng rắn, BBC, BCW) — bám dính cực mạnh, tự liền vết thủng, cho tầng hầm, cầu đường, hạng mục chôn ngầm.",
    heritage: "Sơn nhựa đường không đóng rắn tạo lớp dẻo vĩnh viễn, tự bịt kín vi nứt.",
    technicalSpecs: [
      { label: "Loại", value: "Nhựa đường cao su không đóng rắn (PBC) / gốc nước (BCW)" },
      { label: "Đặc tính", value: "Bám dính mạnh, dẻo vĩnh viễn, tự liền" },
      { label: "Ứng dụng", value: "Tầng hầm, cầu đường, hạng mục chôn ngầm" },
    ],
    whyChoose: [WHY,
      { icon: "🩹", title: "Tự liền vết nứt", desc: "Lớp dẻo không đóng rắn tự bịt kín vi nứt & lỗ thủng." },
      { icon: "🧲", title: "Bám dính mạnh", desc: "Bám chắc bê tông, phối hợp tốt với màng cuộn." }],
    projectShowcase: SHOW,
  }),
  rigid: mk({
    story: "Chống thấm cứng Yuhong (PCC xi măng thẩm thấu kết tinh) — thấm sâu vào bê tông, tạo tinh thể bịt mao mạch, chống thấm từ bên trong, cho bể nước, tầng hầm, hồ.",
    heritage: "Công nghệ thẩm thấu kết tinh tự bịt kín bê tông, hiệu quả lâu dài & tự phục hồi vi nứt.",
    technicalSpecs: [
      { label: "Loại", value: "Xi măng thẩm thấu kết tinh (crystalline)" },
      { label: "Cơ chế", value: "Tạo tinh thể bịt mao mạch trong bê tông" },
      { label: "Ứng dụng", value: "Bể nước, tầng hầm, hồ, kết cấu bê tông" },
    ],
    whyChoose: [WHY,
      { icon: "💎", title: "Kết tinh tự bịt", desc: "Tinh thể phát triển trong bê tông, chống thấm từ bên trong." },
      { icon: "♻️", title: "Tự phục hồi", desc: "Tái kết tinh bịt vi nứt mới khi gặp nước." }],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return YUHONG_SERIES_META[seriesOriginal.trim()] || YUHONG_SERIES_META["membrane-bitumen"];
}
