/**
 * Metadata Comfee —— nội dung rich text cho trang chi tiết sản phẩm. Lấy seriesOriginal (nhóm thiết bị nhà bếp) làm khóa.
 * Comfee là thương hiệu thiết bị nhà bếp xuất khẩu của Tập đoàn Midea. Nguồn: catalog sản phẩm Comfee thị trường Việt Nam.
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

const CERTS = [
  "Hệ thống chất lượng Tập đoàn Midea —— Comfee là thương hiệu thiết bị nhà bếp xuất khẩu của Midea, dùng chung nguồn lực R&D và sản xuất của Midea",
  "Tuân thủ các tiêu chuẩn an toàn và hiệu suất năng lượng cho thiết bị gia dụng (theo chứng nhận của thị trường xuất khẩu)",
  "Thiết bị nhà bếp âm tủ thiết kế theo kích thước chuẩn châu Âu, tương thích với hầu hết các loại tủ bếp",
  "Kết nối IoT nhà thông minh —— hỗ trợ điều khiển từ xa qua App và liên kết thiết bị (một số model)",
];
const MFG = [
  "Comfee —— thương hiệu thiết bị nhà bếp xuất khẩu của Tập đoàn Midea (Fortune Global 500)",
  "Dòng sản phẩm thiết bị nhà bếp âm tủ: bếp từ, máy hút mùi, máy rửa chén, lò nướng âm tủ, lò vi sóng âm tủ",
  "Trang bị công nghệ AI thông minh: AI nấu ăn, AI Inverter, AI Wash nhận diện vết bẩn, AI điều khiển không chạm...",
  "Dựa trên hệ thống sản xuất và chuỗi cung ứng toàn cầu của Midea, chất lượng ổn định, đảm bảo phụ kiện và dịch vụ",
];
const PACK = [
  { label: "Hình thức cung cấp", value: "Đóng gói nguyên máy, kèm phụ kiện lắp đặt và hướng dẫn sử dụng" },
  { label: "Tùy chỉnh", value: "Có thể cấu hình model và số lượng theo nhu cầu dự án/đại lý" },
  { label: "Bảo vệ vận chuyển", value: "Bảo vệ nhiều lớp bằng xốp + thùng carton, mặt kính có góc bảo vệ" },
  { label: "Dịch vụ", value: "Hậu mãi theo hệ thống Midea, cung cấp hướng dẫn lắp đặt và hỗ trợ kỹ thuật" },
];
const INSTALL = [
  "Trước khi lắp đặt sản phẩm âm tủ, kiểm tra kích thước khoét lỗ tủ bếp và điều kiện nguồn điện/thoát khói",
  "Chừa khoảng tản nhiệt và bảo trì theo hướng dẫn, đảm bảo thông gió tốt",
  "Để nhân viên chuyên nghiệp đấu nối nguồn điện (một số model công suất lớn cần đường điện riêng) và cấp thoát nước/thoát khói",
  "Cấp điện chạy thử, kiểm tra các chức năng, nút bấm/cảm ứng và liên kết App có hoạt động bình thường không",
];
const CARE = [
  { title: "Vệ sinh hằng ngày", desc: "Lau mặt kính và bảng điều khiển bằng khăn mềm ẩm, tránh axit kiềm mạnh và vật cứng cào xước." },
  { title: "Xử lý dầu mỡ", desc: "Vệ sinh định kỳ lưới lọc máy hút mùi và mặt bếp để khử dầu, duy trì lực hút và thẩm mỹ." },
  { title: "Bảo dưỡng máy rửa chén", desc: "Định kỳ vệ sinh lưới lọc, châm muối làm mềm nước và nước trợ xả để duy trì hiệu quả rửa." },
  { title: "An toàn điện", desc: "Thiết bị nhà bếp công suất lớn tránh dùng chung đường điện với các thiết bị tải nặng khác, chú ý tiếp đất ở môi trường ẩm ướt." },
];
const FAQ = [
  { q: "Comfee và Midea có quan hệ thế nào?", a: "Comfee là thương hiệu thiết bị nhà bếp xuất khẩu của Tập đoàn Midea, dùng chung nguồn lực R&D, sản xuất và chuỗi cung ứng của Midea." },
  { q: "Đây có phải thiết bị nhà bếp âm tủ không?", a: "Đúng vậy. Bếp từ, máy hút mùi, máy rửa chén, lò nướng và lò vi sóng đều được thiết kế theo kích thước âm tủ/chuẩn châu Âu, tương thích với tủ bếp hiện đại trọn bộ." },
  { q: "Có hỗ trợ điều khiển thông minh không?", a: "Một số model hỗ trợ IoT nhà thông minh và điều khiển từ xa qua App (như máy rửa chén), đồng thời trang bị các tính năng thông minh như AI Inverter, AI nhận diện..." },
  { q: "Tại Việt Nam có cung cấp lắp đặt và hậu mãi không?", a: "Vui lòng liên hệ Huayue để được tư vấn chọn model phù hợp dự án, cung cấp hàng, lắp đặt và phương án hậu mãi." },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}

const WHY_BRAND = { icon: "🔥", title: "Sản phẩm của Midea", desc: "Comfee là thương hiệu thiết bị nhà bếp xuất khẩu của Tập đoàn Midea (Fortune Global 500), chất lượng tập đoàn lớn đáng tin cậy." };
const WHY_AI = { icon: "🤖", title: "Thiết bị nhà bếp AI thông minh", desc: "Các công nghệ thông minh như AI nấu ăn / AI Inverter / AI nhận diện / AI cảm ứng giúp nấu nướng và vệ sinh nhàn hơn." };
const WHY_BUILTIN = { icon: "🧩", title: "Thẩm mỹ âm tủ", desc: "Thiết kế theo kích thước chuẩn châu Âu, hòa làm một với tủ bếp trọn bộ, mặt tiền nhà bếp gọn gàng sang trọng hơn." };

export const COMFEE_SERIES_META: Record<string, SeriesMeta> = {
  "induction-hob": mk({
    story:
      "Bếp từ Comfee, giao «độ chính xác lửa» cho AI —— mô-đun công suất Germany IGBT hiệu suất cao mang lại khả năng gia nhiệt nhanh và ổn định, liên kết nấu tự động AI cùng thao tác núm xoay/cảm ứng giúp xào lửa lớn và hầm lửa nhỏ đều làm chủ dễ dàng. Một tấm mặt kính vi tinh thể đen lắp âm mặt bàn, phẳng dễ lau, ngoại hình bắt mắt; nhiều quy cách (từ bếp đôi đến nhiều vùng nấu) đáp ứng nhu cầu bếp Á và Âu, là trái tim hiệu quả của nhà bếp âm tủ hiện đại.",
    heritage: "Bếp từ là nhóm sản phẩm cốt lõi của thiết bị nhà bếp âm tủ Comfee, dung hòa hiệu quả và trải nghiệm bằng công nghệ Germany IGBT và AI nấu ăn.",
    technicalSpecs: [
      { label: "Loại", value: "Bếp từ âm tủ (mặt kính vi tinh thể)" },
      { label: "Công nghệ cốt lõi", value: "Mô-đun công suất Germany IGBT hiệu suất cao · AI nấu tự động · thao tác núm xoay/cảm ứng" },
      { label: "Quy cách", value: "Nhiều model từ bếp đôi đến nhiều vùng nấu (dòng CIH / CMH)" },
      { label: "Mặt bếp", value: "Kính vi tinh thể đen, phẳng dễ lau" },
      { label: "Phù hợp", value: "Nhà bếp âm tủ trọn bộ, bếp Á và Âu" },
    ],
    whyChoose: [WHY_BRAND, { icon: "⚡", title: "Germany IGBT", desc: "Mô-đun công suất hiệu suất cao, gia nhiệt nhanh, lửa ổn định, hiệu suất năng lượng cao." }, WHY_AI, WHY_BUILTIN],
    projectShowcase: ["Nhà bếp âm tủ hiện đại", "Bếp trọn bộ căn hộ và nhà ở", "Dự án nhà hoàn thiện và nhà mẫu"],
  }),
  "range-hood": mk({
    story:
      "Máy hút mùi Comfee, giúp nhà bếp «xào lửa lớn cũng trong lành như mới» —— mô tơ AI Inverter mang lại lực hút mạnh mẽ và êm ái, AI cảm biến khói tự động tăng tốc khi khói dầu bốc lên, lúc bình thường chạy tốc độ thấp tiết kiệm điện; AI Waving điều khiển không chạm bằng cử chỉ, tay dính dầu cũng thao tác dễ dàng, sạch sẽ và vệ sinh. Thân máy đen tối giản cùng bảng cảm ứng, lắp vào mặt tiền tủ bếp, vừa đẹp vừa mạnh.",
    heritage: "Máy hút mùi là nhóm sản phẩm then chốt bảo vệ không khí nhà bếp của Comfee, mang lại trải nghiệm hút khói thông minh hơn nhờ AI Inverter và điều khiển không chạm.",
    technicalSpecs: [
      { label: "Loại", value: "Máy hút mùi treo tường/âm tủ" },
      { label: "Công nghệ cốt lõi", value: "Mô tơ AI Inverter · AI cảm biến khói tự động điều tốc · AI Waving điều khiển không chạm" },
      { label: "Quy cách", value: "Nhiều model 70/90cm (dòng CH)" },
      { label: "Bảng điều khiển", value: "Thân máy đen + thao tác cảm ứng" },
      { label: "Phù hợp", value: "Nhà bếp âm tủ trọn bộ, nhà bếp mở" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🌬️", title: "Mạnh mẽ êm ái", desc: "AI Inverter lực hút lớn, cảm biến khói tự động tăng tốc, êm và hiệu quả." }, { icon: "👋", title: "Điều khiển không chạm", desc: "AI Waving thao tác bằng cử chỉ, tay dính dầu cũng điều khiển dễ dàng." }, WHY_BUILTIN],
    projectShowcase: ["Nhà bếp mở và bán mở", "Bếp trọn bộ căn hộ và nhà ở", "Dự án phân tách bếp Á-Âu"],
  }),
  dishwasher: mk({
    story:
      "Máy rửa chén Comfee, mang «tự do rửa chén» vào mọi gian bếp —— rửa nước nóng áp lực cao + AI Wash tự động nhận diện mức độ bẩn, bẩn nhiều thì rửa kỹ; sấy khí nóng/AI Heat Dry giúp chén bát khô ráo không vệt nước, một số model trang bị diệt khuẩn nhiệt cao/UV càng yên tâm. Nhiều kiểu lắp đặt âm tủ, độc lập và bán âm, giá để chén 3 tầng chứa được chén bát Á-Âu, kết hợp IoT thông minh và đa chương trình, giải phóng đôi tay, tiết kiệm nước và yên tâm.",
    heritage: "Máy rửa chén là nhóm sản phẩm ngôi sao giải phóng đôi tay trong bếp của Comfee, mang lại sự sạch sẽ yên tâm nhờ AI Wash nhận diện và sấy-diệt khuẩn đa lớp.",
    technicalSpecs: [
      { label: "Loại", value: "Âm tủ / Độc lập / Bán âm (nhiều model)" },
      { label: "Dung tích", value: "8–15 bộ chén bát (châu Âu), 2–3 tầng giá để chén" },
      { label: "Công nghệ cốt lõi", value: "Rửa nước nóng áp lực cao · AI Wash nhận diện vết bẩn · sấy khí nóng/AI Heat Dry · diệt khuẩn nhiệt cao/UV · AI Inverter · IoT" },
      { label: "Chương trình", value: "8–10 chương trình rửa" },
      { label: "Độ ồn", value: "Khoảng 42–48 dB" },
      { label: "Phù hợp", value: "Nhà bếp âm tủ trọn bộ, căn hộ và nhà ở" },
    ],
    whyChoose: [WHY_BRAND, { icon: "💧", title: "Rửa kỹ sấy khô", desc: "Rửa nước nóng áp lực cao + AI nhận diện vết bẩn + sấy khí nóng, chén bát sạch và khô ráo." }, { icon: "🦠", title: "Diệt khuẩn nhiệt cao", desc: "Một số model trang bị diệt khuẩn nhiệt cao/UV, chén bát cho bé cũng yên tâm." }, WHY_AI],
    projectShowcase: ["Nhà bếp âm tủ hiện đại", "Căn hộ và nhà ở", "Homestay và quán ăn nhỏ"],
  }),
  oven: mk({
    story:
      "Lò nướng âm tủ Comfee, đưa «nghi thức làm bánh» vào tủ bếp —— khoang dung tích lớn cùng nhiều chế độ gia nhiệt đáp ứng nhu cầu nướng, quay, hấp tích hợp, kiểm soát nhiệt chính xác giúp bánh ngọt, bánh mì và thịt nướng đều chuẩn vị. Cửa kính đen cùng núm xoay/bảng điều khiển tối giản, lắp âm mặt tiền gọn gàng sạch sẽ, là trợ thủ đắc lực cho làm bánh tại nhà và bếp Âu.",
    heritage: "Lò nướng âm tủ là thành viên quan trọng trong các bối cảnh bếp Âu của Comfee, đáp ứng nhu cầu làm bánh tại nhà nhờ kiểm soát nhiệt ổn định và dung tích lớn.",
    technicalSpecs: [
      { label: "Loại", value: "Lò nướng điện âm tủ (dòng CO)" },
      { label: "Chế độ gia nhiệt", value: "Nhiều chế độ gia nhiệt, nướng/quay/hấp tích hợp" },
      { label: "Kiểm soát nhiệt", value: "Kiểm soát nhiệt chính xác, gia nhiệt đều" },
      { label: "Bảng điều khiển", value: "Cửa kính đen + núm xoay/cảm ứng" },
      { label: "Phù hợp", value: "Nhà bếp âm tủ trọn bộ, làm bánh tại nhà và bếp Âu" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🍞", title: "Kiểm soát nhiệt ổn định", desc: "Đa chế độ kiểm soát nhiệt chính xác, nướng quay chuẩn vị." }, WHY_BUILTIN, WHY_AI],
    projectShowcase: ["Nhà bếp làm bánh tại nhà", "Bếp Âu và nhà bếp mở", "Bếp trọn bộ căn hộ và biệt thự"],
  }),
  microwave: mk({
    story:
      "Lò vi sóng âm tủ Comfee, giúp «hâm nóng nhanh» cũng có nét sang trọng —— lắp âm tủ bếp tiết kiệm không gian mặt bàn, đa mức vi sóng cùng chương trình rã đông/hâm nóng đáp ứng nhu cầu hằng ngày, bảng điều khiển tối giản thao tác trực quan. Cùng tông cùng hệ với các thiết bị nhà bếp âm tủ cùng dòng, giúp mặt tiền nhà bếp gọn gàng đồng bộ, là lựa chọn thực dụng cho nhà bếp nhịp sống hiện đại.",
    heritage: "Lò vi sóng âm tủ là nhóm sản phẩm thực dụng hoàn thiện ma trận thiết bị nhà bếp âm tủ của Comfee, cùng tông cùng hệ với cả bộ thiết bị nhà bếp.",
    technicalSpecs: [
      { label: "Loại", value: "Lò vi sóng âm tủ (dòng CMW)" },
      { label: "Chức năng", value: "Đa mức vi sóng · chương trình rã đông/hâm nóng" },
      { label: "Lắp đặt", value: "Lắp âm tủ bếp, tiết kiệm không gian mặt bàn" },
      { label: "Bảng điều khiển", value: "Bảng điều khiển tối giản, thao tác trực quan" },
      { label: "Phù hợp", value: "Nhà bếp âm tủ trọn bộ, căn hộ và nhà ở" },
    ],
    whyChoose: [WHY_BRAND, WHY_BUILTIN, { icon: "⏱️", title: "Hâm nóng nhanh", desc: "Đa mức vi sóng và chương trình, hâm nóng rã đông hằng ngày tiết kiệm thời gian." }, WHY_AI],
    projectShowcase: ["Nhà bếp âm tủ hiện đại", "Căn hộ và nhà diện tích nhỏ", "Homestay và phòng pantry văn phòng"],
  }),
};

/** Lấy metadata theo seriesOriginal (nhóm thiết bị nhà bếp), mặc định quay về induction-hob. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return COMFEE_SERIES_META[seriesOriginal.trim()] || COMFEE_SERIES_META["induction-hob"];
}
