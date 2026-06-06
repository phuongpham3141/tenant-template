/**
 * Rich metadata cho các dòng ống Lesso 联塑 — phục vụ trang chi tiết sản phẩm.
 *
 * Keyed by seriesOriginal (tag Trung gốc: "给水", "排水", "电力通信"...).
 *
 * Honest sourcing:
 *   • Hồ sơ doanh nghiệp: China Liansu Group Holdings (中国联塑集团控股)
 *     — niêm yết HKEX mã 2128, báo cáo thường niên công bố.
 *   • Tiêu chuẩn kỹ thuật: GB/T quốc gia Trung Quốc + ISO áp dụng cho
 *     từng chủng loại ống (PVC-U / PE / PP-R / PE-RT).
 *   • Thông số sản phẩm: trang sản phẩm chính thức lessopipe.com.
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
  "ISO 9001 — Hệ thống quản lý chất lượng",
  "ISO 14001 — Hệ thống quản lý môi trường",
  "ISO 45001 — An toàn & sức khoẻ nghề nghiệp",
  "CCC — Chứng nhận bắt buộc Trung Quốc",
  "Thương hiệu nổi tiếng quốc gia TQ",
  "Sản phẩm miễn kiểm tra cấp quốc gia",
  "Hợp chuẩn GB/T — Tiêu chuẩn quốc gia Trung Quốc theo từng chủng loại ống",
];

const COMMON_MFG = [
  "China Liansu Group — nhà sản xuất ống nhựa lớn nhất Châu Á, niêm yết HKEX mã 2128 từ 2010",
  "Thành lập 1986 tại Phật Sơn, Quảng Đông — hơn 30 cơ sở sản xuất trên toàn Trung Quốc + nước ngoài",
  "Công suất ống nhựa > 3 triệu tấn/năm — quy mô lớn nhất thế giới cho ống nhựa",
  "Hệ sinh thái vật liệu xây dựng tích hợp: ống & phụ kiện, van, vật liệu hoàn thiện, thiết bị vệ sinh",
  "Dây chuyền đùn tự động, kiểm tra trực tuyến (online) đường kính – độ dày – áp suất từng mét ống",
  "Phòng thí nghiệm vật liệu cấp quốc gia — thử áp suất thuỷ tĩnh, va đập, lão hoá nhiệt",
];

const COMMON_PACKAGING = [
  { label: "Đóng bó/đóng kiện", value: "Bó ống quấn màng PE + đai nhựa; phụ kiện đóng thùng carton" },
  { label: "Độ dài tiêu chuẩn", value: "Ống cứng thường 4m hoặc 6m; ống cuộn PE theo cuộn" },
  { label: "In nhận diện", value: "In trực tiếp trên thân ống: thương hiệu, quy cách, tiêu chuẩn, áp suất" },
  { label: "MOQ nhập khẩu", value: "1 container 20ft / 40ft HQ — mix nhiều quy cách OK" },
  { label: "Bảo quản kho", value: "Nơi khô ráo, tránh nắng trực tiếp; kê phẳng, không chồng quá cao" },
];

const COMMON_INSTALL = [
  "Đọc kỹ tiêu chuẩn thi công tương ứng với chủng loại ống trước khi lắp đặt",
  "Cắt ống vuông góc, vát mép và làm sạch bavia trước khi nối",
  "Chọn đúng phương pháp nối theo vật liệu: hàn nhiệt (PP-R/PE-RT), hàn đối đầu/điện trở (PE), dán keo (PVC-U), kẹp ép (inox)",
  "Kiểm tra áp lực toàn tuyến sau lắp đặt trước khi nghiệm thu & lấp đất",
  "Với ống chôn ngầm: tạo lớp đệm cát, lấp & đầm theo đúng quy trình tránh biến dạng",
];

const COMMON_CARE = [
  {
    title: "Trước khi lắp đặt",
    desc: "Kiểm tra thân ống không nứt, không móp; đầu nối, gioăng cao su còn nguyên vẹn. Để ống ổn định nhiệt độ với môi trường lắp đặt.",
  },
  {
    title: "Trong vận hành",
    desc: "Vận hành trong giới hạn áp suất danh định & nhiệt độ cho phép của từng dòng ống. Tránh va đập cơ học mạnh lên tuyến ống lộ thiên.",
  },
  {
    title: "Bảo trì định kỳ",
    desc: "Kiểm tra rò rỉ tại mối nối, van; vệ sinh lưới lọc đầu tuyến. Với hệ cấp nước nóng, kiểm tra giãn nở nhiệt & gối đỡ.",
  },
];

const COMMON_FAQ = [
  {
    q: "Sản phẩm Lesso có giấy tờ tiêu chuẩn để nhập khẩu vào Việt Nam không?",
    a: "Có. Lesso cung cấp CO (xuất xứ), CQ (chất lượng), báo cáo thử nghiệm theo tiêu chuẩn GB/T tương ứng. Huayuesc hỗ trợ làm hồ sơ nhập khẩu & hợp chuẩn tại Việt Nam.",
  },
  {
    q: "Đặt hàng tối thiểu (MOQ) và thời gian giao là bao lâu?",
    a: "MOQ thường tính theo container; có thể mix nhiều quy cách trong 1 cont. Thời gian sản xuất + vận chuyển về Việt Nam tuỳ chủng loại, Huayuesc báo lịch cụ thể theo đơn.",
  },
  {
    q: "Có hỗ trợ tư vấn chọn cấp áp suất / vật liệu phù hợp không?",
    a: "Có. Gửi điều kiện sử dụng (môi chất, nhiệt độ, áp suất, chôn ngầm hay lộ thiên), đội kỹ thuật sẽ tư vấn dòng ống & phụ kiện phù hợp.",
  },
];

function mk(
  partial: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">
): SeriesMeta {
  return {
    ...partial,
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    faq: COMMON_FAQ,
  };
}

export const LESSO_SERIES_META: Record<string, SeriesMeta> = {
  // 给水 — Cấp nước
  给水: mk({
    story:
      "Dòng ống cấp nước Lesso gồm PVC-U, PE và PP-R — phục vụ từ tuyến cấp nước đô thị, cấp nước công trình tới hệ nước nóng-lạnh trong nhà. Đây là nhóm sản phẩm lõi làm nên vị thế nhà sản xuất ống nhựa lớn nhất Châu Á của Lesso.",
    heritage:
      "Lesso phát triển ống cấp nước từ năm 1986, liên tục mở rộng dải vật liệu PVC-U → PE100 → PP-R để phủ toàn bộ nhu cầu cấp nước dân dụng, đô thị và công nghiệp.",
    technicalSpecs: [
      { label: "Vật liệu", value: "PVC-U / PE80 / PE100 / PP-R" },
      { label: "Cấp áp suất", value: "0.63 – 2.5 MPa tuỳ dòng" },
      { label: "Kết nối", value: "Dán keo (PVC-U), hàn nhiệt (PP-R), hàn đối đầu/điện trở (PE)" },
      { label: "Nhiệt độ nước nóng (PP-R)", value: "tới 70°C dài hạn, 95°C ngắn hạn" },
      { label: "Tiêu chuẩn", value: "GB/T 10002 (PVC-U), GB/T 13663 (PE), GB/T 18742 (PP-R)" },
    ],
    whyChoose: [
      { icon: "💧", title: "An toàn nước sạch", desc: "Vật liệu đạt yêu cầu tiếp xúc nước sinh hoạt, không thôi nhiễm kim loại nặng." },
      { icon: "🔧", title: "Đồng bộ ống + phụ kiện", desc: "Ống và phụ kiện cùng hệ, dung sai khít, mối nối kín – bền." },
      { icon: "🏭", title: "Quy mô #1 Châu Á", desc: "Năng lực cung ứng lớn, ổn định cho dự án khối lượng lớn." },
    ],
    projectShowcase: [
      "Cấp nước khu đô thị & chung cư cao tầng",
      "Hệ nước nóng-lạnh PP-R trong nhà ở, khách sạn",
      "Tuyến cấp nước chôn ngầm khu công nghiệp",
    ],
  }),

  // 排水 — Thoát nước
  排水: mk({
    story:
      "Nhóm thoát nước Lesso trải từ ống PVC-U thoát nước trong nhà, ống gân sóng 2 vách HDPE/PVC-U, ống cấu trúc vách quấn (ống Krah) tới hệ thoát nước xi-phông mái và hố ga nhựa — đáp ứng thoát nước công trình, thị chính và hạ tầng ngầm.",
    heritage:
      "Ống gân sóng và ống cấu trúc vách quấn là thế mạnh hạ tầng của Lesso, được dùng rộng trong các dự án thoát nước & thị chính quy mô lớn tại Trung Quốc.",
    technicalSpecs: [
      { label: "Vật liệu", value: "PVC-U / HDPE" },
      { label: "Cấp cứng vòng (SN)", value: "SN4 / SN8 tuỳ dòng gân sóng" },
      { label: "Cấu tạo", value: "Vách đặc / gân sóng 2 vách / vách rỗng quấn" },
      { label: "Nhiệt độ môi chất", value: "≤ 40°C (thoát nước thông thường)" },
      { label: "Tiêu chuẩn", value: "GB/T 5836 (PVC-U), GB/T 19472 (gân sóng HDPE)" },
    ],
    whyChoose: [
      { icon: "🌀", title: "Gân sóng cứng vòng cao", desc: "Chịu tải đất tốt, nhẹ, thi công nhanh cho tuyến chôn ngầm." },
      { icon: "🏗️", title: "Cho hạ tầng quy mô lớn", desc: "Ống Krah & vách quấn cho cống thoát nước, thị chính đường kính lớn." },
      { icon: "🏠", title: "Đồng bộ trong nhà", desc: "Hệ thoát nước cùng tầng & xi-phông mái cho công trình hiện đại." },
    ],
    projectShowcase: [
      "Thoát nước mưa & nước thải khu dân cư, thị chính",
      "Hệ thoát nước xi-phông mái cho trung tâm hội chợ, nhà ga",
      "Tuyến cống hạ tầng đường kính lớn (ống Krah)",
    ],
  }),

  // 电力通信 — Ống điện & viễn thông
  电力通信: mk({
    story:
      "Dòng ống luồn cáp Lesso gồm ống bảo vệ cáp điện lực, ống viễn thông (thực bích, đa lỗ, tổ ong, lưới ô) và ống MPP thi công không đào hở — bảo vệ tuyến cáp ngầm trong hạ tầng đô thị.",
    heritage:
      "Lesso cung cấp giải pháp ống luồn cáp đồng bộ cho lưới điện và viễn thông ngầm, gắn với làn sóng ngầm hoá hạ tầng đô thị Trung Quốc.",
    technicalSpecs: [
      { label: "Vật liệu", value: "PE / PVC / PVC-C / MPP (PP biến tính)" },
      { label: "Cấu tạo", value: "Vách đặc / đa lỗ / tổ ong / lưới ô" },
      { label: "Thi công", value: "Chôn hở & không đào hở (MPP chịu kéo cao)" },
      { label: "Đặc tính", value: "Cách điện, chống cháy lan (dòng chuyên dụng)" },
      { label: "Tiêu chuẩn", value: "GB/T quốc gia cho ống bảo vệ cáp" },
    ],
    whyChoose: [
      { icon: "⚡", title: "Bảo vệ cáp bền lâu", desc: "Cách điện, chống ăn mòn, bảo vệ cáp trong môi trường ngầm." },
      { icon: "🛠️", title: "Không đào hở (MPP)", desc: "Ống MPP chịu kéo cao cho khoan kéo ngầm, giảm phá mặt đường." },
      { icon: "🧩", title: "Đa cấu trúc", desc: "Tổ ong / đa lỗ / lưới ô tối ưu số tuyến cáp trên 1 mặt cắt." },
    ],
    projectShowcase: [
      "Ngầm hoá lưới điện & cáp viễn thông đô thị",
      "Hào kỹ thuật, hầm, tuyến metro",
      "Tuyến băng đường khoan kéo ngầm (MPP)",
    ],
  }),

  // 采暖 — Cấp nhiệt & sưởi ấm
  采暖: mk({
    story:
      "Dòng cấp nhiệt & sưởi ấm Lesso gồm ống sưởi sàn PE-RT, ống chống thẩm thấu oxy, ống mạng cấp 2 cấp nhiệt tập trung và phụ kiện (bộ chia-góp nước, van lọc) — cho sưởi sàn dân dụng và cấp nhiệt khu vực.",
    heritage:
      "PE-RT là vật liệu lõi cho sưởi sàn nhờ độ dẻo, chịu nhiệt và khả năng uốn cong tốt — Lesso phát triển nhiều series gia dụng cao cấp cho thị trường sưởi ấm.",
    technicalSpecs: [
      { label: "Vật liệu", value: "PE-RT (loại I/II), có lớp chống thẩm thấu oxy (EVOH)" },
      { label: "Nhiệt độ làm việc", value: "tới 70°C dài hạn" },
      { label: "Ứng dụng", value: "Sưởi sàn, sưởi tường, cấp nhiệt tập trung cấp 2" },
      { label: "Kết nối", value: "Hàn nhiệt / kẹp ép qua phụ kiện" },
      { label: "Tiêu chuẩn", value: "GB/T 28799 (PE-RT cấp nhiệt)" },
    ],
    whyChoose: [
      { icon: "🔥", title: "Sưởi sàn êm, dẻo", desc: "PE-RT uốn cong tốt, bán kính uốn nhỏ, dễ rải vòng sưởi sàn." },
      { icon: "🛡️", title: "Chống thẩm thấu oxy", desc: "Lớp EVOH ngăn oxy, bảo vệ thiết bị kim loại trong hệ sưởi." },
      { icon: "🧰", title: "Phụ kiện đồng bộ", desc: "Bộ chia-góp nước, van lọc cùng hệ cho lắp đặt trọn gói." },
    ],
    projectShowcase: [
      "Sưởi sàn nhà ở, biệt thự",
      "Mạng cấp nhiệt tập trung cấp 2 khu dân cư",
      "Sưởi ấm công trình công cộng phía Bắc TQ",
    ],
  }),

  // 通风 — Thông gió
  通风: mk({
    story:
      "Nhóm thông gió Lesso gồm ống cấp khí tươi PE, ống gió PVC-U, ống composite lá nhôm và các loại kẹp/phụ kiện đỡ ống — cho hệ thông gió & cấp khí tươi trong công trình dân dụng và chăn nuôi.",
    heritage:
      "Cùng với xu hướng cấp khí tươi trong nhà ở hiện đại, Lesso bổ sung dải ống gió và phụ kiện cố định cho hệ thông gió.",
    technicalSpecs: [
      { label: "Vật liệu", value: "PE / PVC-U / composite lá nhôm" },
      { label: "Ứng dụng", value: "Cấp khí tươi nhà ở, ống gió công trình, thông gió chăn nuôi" },
      { label: "Phụ kiện", value: "Kẹp ống lắp nhanh, kẹp inox bọc cao su, tê đuôi én" },
      { label: "Đặc tính", value: "Nhẹ, bề mặt nhẵn giảm tổn thất áp" },
      { label: "Tiêu chuẩn", value: "Theo tiêu chuẩn ống nhựa tương ứng" },
    ],
    whyChoose: [
      { icon: "🌬️", title: "Cấp khí tươi sạch", desc: "Bề mặt trong nhẵn, ít bám bụi, dễ vệ sinh đường ống gió." },
      { icon: "🔩", title: "Phụ kiện cố định đa dạng", desc: "Kẹp lắp nhanh & phụ kiện đỡ cho thi công gọn, chắc." },
      { icon: "🪶", title: "Trọng lượng nhẹ", desc: "Lắp đặt nhanh, giảm tải treo cho trần & vách." },
    ],
    projectShowcase: [
      "Hệ cấp khí tươi căn hộ, biệt thự",
      "Ống gió công trình thương mại",
      "Thông gió trang trại chăn nuôi",
    ],
  }),

  // 农业 — Nông nghiệp & thuỷ sản
  农业: mk({
    story:
      "Nhóm nông nghiệp & thuỷ sản Lesso gồm ống dẫn nước PE, ống tưới áp thấp, dây tưới nhỏ giọt, ống mềm gia cường, máng/ống trồng cây và giải pháp lồng nuôi – khung lồng – nhà nổi trên biển cho nuôi trồng thuỷ sản.",
    heritage:
      "Lesso mở rộng từ ống tưới tiêu sang giải pháp nông nghiệp công nghệ cao (canh tác giá thể) và nuôi trồng hải sản (lồng HDPE chịu sóng).",
    technicalSpecs: [
      { label: "Vật liệu", value: "PE / HDPE / PVC-U / sợi gia cường" },
      { label: "Ứng dụng", value: "Tưới tiêu, dẫn nước, canh tác giá thể, lồng nuôi thuỷ sản" },
      { label: "Dải sản phẩm", value: "Ống tưới, nhỏ giọt, ống mềm, khung & lồng nuôi" },
      { label: "Đặc tính", value: "Chịu thời tiết, kháng UV (dòng ngoài trời)" },
      { label: "Tiêu chuẩn", value: "GB/T cho ống PE/PVC tưới tiêu" },
    ],
    whyChoose: [
      { icon: "🌾", title: "Tưới tiết kiệm nước", desc: "Nhỏ giọt & phun mưa giảm lượng nước, tăng hiệu quả canh tác." },
      { icon: "🐟", title: "Lồng nuôi chịu sóng", desc: "Khung & lồng HDPE bền với môi trường biển, kháng UV." },
      { icon: "🌱", title: "Canh tác công nghệ cao", desc: "Máng & ống trồng giá thể cho nông nghiệp đô thị, nhà màng." },
    ],
    projectShowcase: [
      "Hệ tưới nhỏ giọt đồng ruộng, vườn cây",
      "Trang trại nuôi biển – lồng tròn HDPE",
      "Mô hình canh tác giá thể nhà màng",
    ],
  }),

  // 工业 — Công nghiệp đặc thù
  工业: mk({
    story:
      "Nhóm công nghiệp đặc thù Lesso gồm ống PVC SCH80 tiêu chuẩn Mỹ, ống PVC-U công nghiệp, ống composite RTP/sợi thép cho dầu khí – khai khoáng và ống mềm dẫn hydro rào cản cao — cho môi trường áp lực & ăn mòn khắc nghiệt.",
    heritage:
      "Lesso phục vụ các ngành công nghiệp nặng (hoá chất, khai khoáng, dầu khí) bằng dòng ống chịu áp & chịu ăn mòn chuyên dụng, gồm cả giải pháp ống dẫn hydro cho năng lượng mới.",
    technicalSpecs: [
      { label: "Vật liệu", value: "PVC SCH80 / PVC-U / composite RTP (sợi thuỷ tinh) / cốt sợi thép" },
      { label: "Ứng dụng", value: "Dầu khí, hoá chất, khai khoáng, dẫn hydro" },
      { label: "Đặc tính", value: "Chịu áp cao, chống ăn mòn hoá chất" },
      { label: "Dẫn hydro", value: "Ống mềm rào cản cao cho hệ hydro (≤10 MPa, -20~65°C)" },
      { label: "Tiêu chuẩn", value: "ASTM (SCH80) + GB/T công nghiệp" },
    ],
    whyChoose: [
      { icon: "🛢️", title: "Chịu áp & ăn mòn", desc: "Cho môi chất hoá chất, dầu khí, bùn quặng khắc nghiệt." },
      { icon: "🧪", title: "Chuẩn quốc tế", desc: "PVC SCH80 chuẩn Mỹ cho hệ công nghiệp xuất khẩu." },
      { icon: "🔋", title: "Năng lượng mới", desc: "Giải pháp ống dẫn hydro cho hạ tầng năng lượng sạch." },
    ],
    projectShowcase: [
      "Tuyến hoá chất & xử lý nước công nghiệp",
      "Đường ống thu gom mỏ dầu khí (RTP)",
      "Hệ lưu trữ – vận chuyển hydro",
    ],
  }),

  // 消防 — PCCC & cứu hoả
  消防: mk({
    story:
      "Nhóm PCCC Lesso gồm ống PVC-C chữa cháy, ống composite thép-nhựa phủ EP, ống mềm chữa cháy dạng cuộn và các loại ống luồn dây mạ kẽm/chống cháy chuyên dụng — cho hệ phòng cháy & tuyến điện an toàn cháy.",
    heritage:
      "Lesso cung cấp giải pháp PCCC đồng bộ từ ống cấp nước chữa cháy tới ống luồn dây chống cháy cho công trình thương mại & công cộng.",
    technicalSpecs: [
      { label: "Vật liệu", value: "PVC-C / composite thép-nhựa phủ EP / thép mạ kẽm" },
      { label: "Ứng dụng", value: "Cấp nước chữa cháy, ống luồn dây chống cháy" },
      { label: "Cấp ống luồn dây", value: "Nhẹ / trung / nặng / siêu nặng (mạ kẽm)" },
      { label: "Đặc tính", value: "Chịu nhiệt, chống cháy lan, cách điện" },
      { label: "Tiêu chuẩn", value: "GB/T cho ống PCCC & ống luồn dây kim loại" },
    ],
    whyChoose: [
      { icon: "🧯", title: "An toàn cháy nổ", desc: "Vật liệu chống cháy lan cho tuyến cấp nước & điện trong PCCC." },
      { icon: "🔩", title: "Đa cấp độ bền", desc: "Ống luồn dây mạ kẽm nhiều cấp theo yêu cầu công trình." },
      { icon: "🏢", title: "Cho công trình lớn", desc: "Đồng bộ cho khách sạn, tổ hợp thương mại, công cộng." },
    ],
    projectShowcase: [
      "Hệ cấp nước chữa cháy toà nhà cao tầng",
      "Tuyến điện chống cháy trung tâm thương mại",
      "Ống luồn dây mạ kẽm hạ tầng công cộng",
    ],
  }),

  // 燃气 — Khí gas
  燃气: mk({
    story:
      "Dòng khí gas Lesso gồm ống PE chôn ngầm dẫn khí gas và ống composite nhôm-nhựa dùng cho khí — cho hệ phân phối khí đốt đô thị và dân dụng an toàn.",
    heritage:
      "Ống PE dẫn khí là tiêu chuẩn cho mạng phân phối khí ngầm nhờ độ kín, dẻo và tuổi thọ cao; Lesso sản xuất theo tiêu chuẩn ống khí chuyên dụng.",
    technicalSpecs: [
      { label: "Vật liệu", value: "PE (chuyên dụng khí gas) / composite nhôm-nhựa" },
      { label: "Nhiệt độ làm việc", value: "-20 ~ 40°C (ống PE dẫn khí)" },
      { label: "Áp suất", value: "tối đa dài hạn ≤ 0.7 MPa (tuỳ dòng)" },
      { label: "Màu nhận diện", value: "Vàng hoặc đen sọc vàng cho tuyến khí" },
      { label: "Tiêu chuẩn", value: "GB 15558 (ống PE dẫn khí)" },
    ],
    whyChoose: [
      { icon: "🔥", title: "An toàn khí đốt", desc: "Mối nối hàn kín, không rò rỉ cho mạng phân phối khí." },
      { icon: "♻️", title: "Tuổi thọ dài", desc: "Ống PE chôn ngầm bền 50 năm thiết kế, kháng ăn mòn." },
      { icon: "🚧", title: "Nhận diện rõ ràng", desc: "Màu chuyên dụng giúp nhận biết tuyến khí, an toàn thi công." },
    ],
    projectShowcase: [
      "Mạng phân phối khí đốt đô thị",
      "Tuyến khí dân dụng khu dân cư",
      "Cấp khí công nghiệp",
    ],
  }),
};

/** Helper: lấy meta theo seriesOriginal (tag Trung gốc của Lesso). */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  const key = seriesOriginal.split(/[·\/\s]/)[0].trim();
  return LESSO_SERIES_META[key];
}
