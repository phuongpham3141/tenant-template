/**
 * Lumina Floor (光年地板) — metadata theo series: nội dung văn bản phong phú cho trang chi tiết sản phẩm.
 * Lập chỉ mục theo seriesOriginal: "spc" (sàn nhựa đá hèm khóa) / "lvt" (sàn nhựa đàn hồi).
 * Nguồn tư liệu: Catalogue sản phẩm Lumina Floor của chuỗi cung ứng Huayue (bản song ngữ Việt - Trung) + thông số công nghệ thông dụng của ngành.
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

const BRAND_MFG = [
  "Lumina Floor được tạo nên bởi nhà máy tự vận hành thuộc chuỗi cung ứng Huayue — từ phối liệu lõi nền, in màng trang trí đến mở khuôn hèm khóa đều tự chủ toàn chuỗi, cung ứng trực tiếp từ nguồn, thời gian giao hàng ổn định",
  "Màng trang trí đến từ nhà cung cấp mẫu mã hàng đầu thế giới, hơn 800 mẫu hoa văn và màu sắc để lựa chọn, bao phủ các chủ đề thời thượng như vân gỗ, vân đá, xương cá, vân hình học",
  "Lõi nhựa đá dùng công thức kết hợp bột đá + PVC nguyên sinh độ tinh khiết cao, ép định hình một lần ở nhiệt độ và áp suất cao, mặt tấm phẳng phiu, ổn định kích thước, kháng biến dạng",
  "Hỗ trợ OEM / ODM: có thể đặt riêng mẫu mã, quy cách, loại hèm khóa và đóng gói theo từng dự án, số lượng đặt tối thiểu linh hoạt, phù hợp cả kênh công trình và kênh đại lý",
];
const BRAND_CARE = [
  { title: "Vệ sinh hằng ngày", desc: "Chỉ cần lau bằng cây lau hoặc khăn mềm vắt khô kèm chất tẩy trung tính; không cần đánh xi, không cần đánh bóng bảo trì, nhẹ nhàng mà bền." },
  { title: "Tránh trầy xước", desc: "Lắp đệm nỉ vào chân bàn ghế, kê tấm lót khi di chuyển vật nặng; nên đặt thảm chùi chân ở cửa ra vào để giảm cát sạn đưa vào." },
  { title: "Chống nước chống ẩm", desc: "Lõi nhựa đá vốn chống nước, nước đổ ra chỉ cần lau khô kịp thời; có thể dùng cho bếp, lối đi nhà vệ sinh và các khu vực dễ ẩm." },
  { title: "Thích ứng nhiệt độ", desc: "Tránh để nhiệt độ cao cục bộ thiêu đốt thời gian dài (ví dụ thiết bị sưởi không cách nhiệt tiếp xúc trực tiếp); ở nhiệt độ phòng bình thường và môi trường sàn sưởi thì ổn định." },
];
const BRAND_INSTALL = [
  "Trước khi thi công đo phòng và vẽ sơ đồ bố trí, tối ưu hóa khớp nối mẫu mã và hao hụt khi cắt",
  "Nền yêu cầu phẳng, khô, sạch, sai số độ phẳng kiểm soát trong phạm vi 2mm / 2m; chỗ không phẳng làm tự san phẳng trước",
  "Bản hèm khóa không cần bôi keo, chừa khe co giãn 8–10mm dọc tường, ghép so le, gõ nhẹ vào vị trí; bản tự dán bóc màng dán ngay, lăn ép thoát khí",
  "Diện tích lớn hoặc khu vực sàn sưởi lát phân vùng theo khuyến nghị của nhà sản xuất, sau khi lắp làm sạch mặt sàn, kiểm tra độ phẳng mạch ghép",
];
const BRAND_CERTS = [
  "Lõi thân thiện môi trường — phát thải formaldehyde đạt cấp E0 / E1, nội thất xanh dùng an tâm",
  "Cấp độ chống mài mòn AC3–AC5 (tùy theo độ dày lớp chống mài mòn), phù hợp cường độ lưu lượng từ nhà ở đến thương mại",
  "Bề mặt xử lý chống trượt (tham khảo R9–R10), nâng cao an toàn cho không gian gia đình và công cộng",
  "Lõi chống cháy chậm cấp B1, gặp lửa khó lan, ít khói",
];
const BRAND_PACK = [
  { label: "Đóng gói", value: "Đóng thùng giấy, trong thùng có mút xốp/góc bảo vệ; xuất khẩu quấn màng trên pallet" },
  { label: "Số lượng đặt tối thiểu", value: "Tính theo container / mét vuông; hỗ trợ trộn nhiều mẫu mã" },
  { label: "Thời gian giao hàng", value: "Mẫu mã có sẵn giao nhanh; mẫu mã đặt riêng thương lượng theo đơn hàng (tham khảo 15–30 ngày)" },
  { label: "Mẫu thử", value: "Cung cấp bảng màu và mẫu nhỏ, xác nhận mẫu mã và cảm giác tay trước khi đặt số lượng lớn" },
];

export const LUMINA_SERIES_META: Record<string, SeriesMeta> = {
  spc: {
    story:
      "Sàn SPC nhựa đá hèm khóa Lumina Floor, lấy đá làm cốt, lấy nhựa làm hồn — lõi cứng kết hợp từ bột đá và PVC nguyên sinh độ tinh khiết cao mang lại cho sàn độ ổn định kích thước xuất sắc cùng chất cảm dày dặn chắc chân. Sàn sinh ra đã chống nước, vốn đã chống mài mòn, xé bỏ những cái mác sợ nước, sợ ẩm, sợ biến dạng của sàn gỗ truyền thống; thiết kế hèm khóa lắp xong dùng ngay giúp việc làm mới cả căn phòng có thể nhanh đến mức hoàn thành trong một ngày. Với người trẻ theo đuổi cả vẻ đẹp lẫn hiệu quả, đây là mặt sàn vừa chịu được nhịp sống, vừa lên hình đẹp.",
    heritage:
      "SPC là vật liệu sàn hot được ưa chuộng tại Âu Mỹ và châu Á những năm gần đây. Lumina Floor làm thấu phân khúc này — dùng màng trang trí hàng đầu thế giới tái hiện thớ vân gỗ đá chân thực, rồi dùng chuỗi cung ứng từ nhà máy tự vận hành của Huayue để ép chi phí về vùng giá thân thiện, khiến chất cao cấp không còn là đặc quyền của giá cao.",
    technicalSpecs: [
      { label: "Loại", value: "Sàn SPC nhựa đá hèm khóa (lõi cứng nhựa đá)" },
      { label: "Độ dày tấm", value: "4mm – 8mm" },
      { label: "Lớp lót", value: "Đệm chống ồn EVA hoặc IXPE 1.0 / 1.5 / 2.0mm" },
      { label: "Lớp chống mài mòn", value: "0.2 / 0.3 / 0.5mm (lớp chống mài mòn PVC trong suốt)" },
      { label: "Cách lắp đặt", value: "Hèm khóa một cạnh / hèm khóa liền khối, lắp click không cần keo" },
      { label: "Mẫu mã", value: "Vân gỗ / vân đá / xương cá... 800+ hoa văn" },
      { label: "Phạm vi ứng dụng", value: "Nhà ở, căn hộ, văn phòng, bán lẻ, không gian thương mại nhẹ" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "💧", title: "Vốn đã chống nước", desc: "Lõi nhựa đá gặp nước không nở, không biến dạng, bếp tắm lối đi và khu vực ẩm ướt đều lát được an tâm." },
      { icon: "🛡️", title: "Cứng cáp chống mài mòn", desc: "Lõi cứng kết hợp nhiều cấp lớp chống mài mòn, kháng nén kháng xước, độ bền cao, phù hợp không gian thương mại lưu lượng người lớn." },
      { icon: "⚡", title: "Hèm khóa lắp nhanh", desc: "Ghép click không cần keo, nhà cũ không cần đục bỏ nền cũng lát trực tiếp được, từ thi công thô đến dọn vào ở nhanh hơn một bước." },
      { icon: "🌱", title: "Thân thiện môi trường chống ồn", desc: "Lõi cấp E0/E1 kết hợp đệm chống ồn EVA/IXPE, cảm giác chân yên tĩnh, nội thất xanh an tâm hơn." },
      { icon: "🎨", title: "Mẫu mã thời thượng", desc: "800+ vân gỗ vân đá và thớ vân xu hướng, từ gỗ thô wabi-sabi đến tối giản hiện đại, phối đủ trong một điểm." },
    ],
    projectShowcase: [
      "Cải tạo toàn nhà cho căn hộ trẻ trung và nhà diện tích nhỏ",
      "Không gian thương mại như quán cà phê, cửa hàng tuyển chọn, studio",
      "Mặt sàn văn phòng, không gian chia sẻ và showroom",
    ],
    faq: [
      { q: "Sàn SPC có lát được trên sàn sưởi không?", a: "Được. Lõi nhựa đá dẫn nhiệt ổn định, biến dạng nhỏ, phù hợp sưởi nước/sưởi điện; nên lát phân vùng theo nhà sản xuất và kiểm soát tốc độ tăng nhiệt." },
      { q: "Có lát trực tiếp lên gạch cũ/nền cũ được không?", a: "Với điều kiện nền phẳng, khô, bản hèm khóa có thể lát trực tiếp không cần đục bỏ; chỗ không phẳng làm tự san phẳng trước là được." },
      { q: "Chọn lớp chống mài mòn thế nào?", a: "Dùng trong nhà nên chọn 0.3mm, không gian thương mại và lưu lượng người lớn nên chọn 0.5mm; lớp chống mài mòn càng dày, tuổi thọ sử dụng càng dài." },
      { q: "Số lượng đặt tối thiểu và mẫu thử?", a: "Hỗ trợ đặt theo container/mét vuông, trộn nhiều mẫu mã; có thể gửi bảng màu và mẫu nhỏ trước để xác nhận mẫu mã và cảm giác tay." },
    ],
  },
  lvt: {
    story:
      "Sàn nhựa LVT đàn hồi Lumina Floor đưa chữ mềm đến mức cực hạn — kết cấu PVC đa lớp mang lại cảm giác chân ấm áp và khả năng chống ồn xuất sắc, giẫm lên như đi trên thảm mềm nhưng dễ chăm sóc hơn thảm mềm. Sàn mỏng và nhẹ, có nhiều hình thái để lựa chọn như lớp lót khô, tự dán, hèm khóa click, có thể ăn khớp với mọi tình huống cải tạo và thương mại. Khi không gian cần sự yên tĩnh, thoải mái và tự do thiết kế, LVT chính là chất cao cấp ẩn trong từng chi tiết.",
    heritage:
      "LVT (Luxury Vinyl Tile) là chủ lực thường xanh của sàn thương mại toàn cầu — lựa chọn quanh năm của sân bay, bệnh viện, chuỗi bán lẻ. Lumina Floor đưa phân khúc chuyên nghiệp này vào không gian gia đình trẻ trung, với mức giá thân thiện hơn và mẫu mã thời thượng hơn, khiến độ bền cấp thương mại bước vào đời sống thường ngày.",
    technicalSpecs: [
      { label: "Loại", value: "Sàn nhựa LVT đàn hồi đa lớp" },
      { label: "Độ dày tấm", value: "2mm / 3mm (lớp lót khô·tự dán); 4mm / 5mm (hèm khóa click)" },
      { label: "Lớp chống mài mòn", value: "0.2 / 0.3 / 0.5mm" },
      { label: "Cách lắp đặt", value: "Lớp lót khô dán keo phủ kín / tự dán bóc dán / hèm khóa click không cần keo" },
      { label: "Mẫu mã", value: "Vân gỗ / vân đá / vân dệt... 800+ hoa văn" },
      { label: "Đặc tính", value: "Chống ồn, cảm giác chân thoải mái, chống mài mòn dễ vệ sinh, dẻo dai chống trượt" },
      { label: "Phạm vi ứng dụng", value: "Nhà ở, văn phòng, y tế, giáo dục, bán lẻ thương mại" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🤫", title: "Chống ồn cảm giác chân êm", desc: "Kết cấu đàn hồi đa lớp hấp thụ tiếng bước chân, cảm giác giẫm mềm mại ấm áp, ở nhà làm việc yên tĩnh hơn." },
      { icon: "🪶", title: "Mỏng nhẹ dễ phối", desc: "Bản siêu mỏng 2–3mm không nâng cao mặt sàn, không vướng cửa, đặc biệt thân thiện với cải tạo nhà cũ và sửa chữa cục bộ." },
      { icon: "🧩", title: "Ba cách lắp", desc: "Dán keo phủ kín/tự dán/hèm khóa lựa chọn linh hoạt theo tình huống, từ cải tạo lắp nhanh đến công trình bền lâu đều bao phủ." },
      { icon: "🧽", title: "Chống mài mòn dễ vệ sinh", desc: "Lớp chống mài mòn cấp thương mại kháng giẫm kháng xước, vết bẩn lau một cái là sạch, chi phí bảo trì thấp." },
      { icon: "🦶", title: "Dẻo dai chống trượt", desc: "Bề mặt xử lý chống trượt kết hợp cảm giác chân đàn hồi, người già trẻ nhỏ ở nhà an tâm hơn, không gian công cộng an toàn hơn." },
    ],
    projectShowcase: [
      "Tình huống cần yên tĩnh bền lâu như bệnh viện, phòng khám, cơ sở dưỡng lão",
      "Trường học, trung tâm đào tạo, không gian mẹ và bé",
      "Bán lẻ chuỗi, văn phòng và cải tạo lắp nhanh căn hộ",
    ],
    faq: [
      { q: "Chọn bản tự dán hay bản hèm khóa?", a: "Theo đuổi cải tạo siêu tốc, nền phẳng thì chọn tự dán (bóc màng dán ngay); muốn không cần keo, tháo lắp tái sử dụng thì chọn bản hèm khóa click." },
      { q: "LVT và SPC khác nhau ở điểm nào?", a: "LVT mỏng hơn mềm hơn, cảm giác chân chống ồn; lõi SPC cứng hơn, kích thước ổn định hơn chống nước hơn. Chú trọng thoải mái chọn LVT, chú trọng ổn định chống nước chọn SPC." },
      { q: "Có phù hợp không gian thương mại không?", a: "Rất phù hợp. LVT là vật liệu sàn thường dùng của sân bay, bệnh viện, chuỗi bán lẻ, chống mài mòn dễ vệ sinh, thay được từng tấm để bảo trì." },
      { q: "Có nhận đặt riêng mẫu mã không?", a: "Hỗ trợ đặt riêng mẫu mã và quy cách OEM/ODM, có thể gửi mẫu xác nhận; số lượng đặt tối thiểu linh hoạt." },
    ],
  },
};

/** Helper: lấy metadata theo seriesOriginal, mặc định quay về spc. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return LUMINA_SERIES_META[seriesOriginal.trim().toLowerCase()] || LUMINA_SERIES_META.spc;
}
