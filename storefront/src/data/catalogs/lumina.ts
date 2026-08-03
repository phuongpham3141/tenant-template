import type { PartnerProduct } from "@/data/partners";

/**
 * Lumina Floor (光年地板) — danh mục sản phẩm: thương hiệu sàn trẻ trung của nhà máy tự vận hành thuộc chuỗi cung ứng Huayue.
 * Lấy sàn SPC (nhựa đá) thân thiện môi trường và sàn nhựa LVT độ đàn hồi cao làm cốt lõi; 800+ mẫu mã/màu sắc, nhiều độ dày và lớp chống mài mòn để lựa chọn.
 * Nguồn tư liệu: Catalogue sản phẩm Lumina Floor của chuỗi cung ứng Huayue (bản song ngữ Việt - Trung). Hình ảnh được render từng trang từ catalogue.
 */

const SPC_SPECS = [
  { k: "Loại", v: "Sàn SPC nhựa đá (lõi cứng nhựa đá)" },
  { k: "Độ dày", v: "4mm – 8mm" },
  { k: "Lớp lót", v: "Đệm chống ồn EVA hoặc IXPE 1.0 / 1.5 / 2.0mm" },
  { k: "Lớp chống mài mòn", v: "PVC trong suốt 0.2 / 0.3 / 0.5mm" },
  { k: "Cách lắp đặt", v: "Hèm khóa (click-lock) lắp không cần keo" },
  { k: "Cấp độ môi trường", v: "Cấp E0 / E1" },
  { k: "Phạm vi ứng dụng", v: "Nhà ở, căn hộ, văn phòng, bán lẻ, thương mại nhẹ" },
];
const LVT_SPECS = [
  { k: "Loại", v: "Sàn nhựa LVT đàn hồi đa lớp" },
  { k: "Lớp chống mài mòn", v: "0.2 / 0.3 / 0.5mm" },
  { k: "Bề mặt", v: "Xử lý chống trượt · vân gỗ/vân đá mô phỏng thật" },
  { k: "Cấp độ môi trường", v: "Cấp E0 / E1" },
  { k: "Phạm vi ứng dụng", v: "Nhà ở, văn phòng, y tế, giáo dục, bán lẻ" },
];

export const LUMINA_PRODUCTS: PartnerProduct[] = [
  // ─── Sàn SPC nhựa đá hèm khóa ───────────────────────────────
  {
    model: "771476",
    slug: "lumina-spc-771476",
    name: "Sàn SPC nhựa đá hèm khóa Lumina 771476",
    nameOriginal: "LuminaFloor SPC 771476",
    series: "Sàn SPC nhựa đá",
    seriesOriginal: "spc",
    desc: "Sàn nhựa đá (SPC) hèm khóa thân thiện môi trường, lõi cứng, lắp xong dùng ngay, chống nước chống mài mòn, 800+ mẫu mã tùy chọn.",
    longDesc:
      "771476 là mẫu cơ bản được ưa chuộng trong dòng SPC của Lumina Floor. Lõi cứng kết hợp bột đá và PVC nguyên sinh độ tinh khiết cao giúp sàn sinh ra đã chống nước, không sợ ẩm, khó biến dạng; màng trang trí độ phân giải cao tái hiện chân thực thớ vân gỗ thật, lớp phủ chống mài mòn UV kháng xước kháng giẫm đạp. Hèm khóa một cạnh lắp click không cần keo, gạch cũ hay nền cũ chỉ cần cân bằng phẳng là có thể lát trực tiếp, từ thi công thô đến dọn vào ở nhanh hơn một bước. Dù cải tạo nhà thuê hay hoàn thiện nhà mới đều có thể tạo nên chất lượng cao cấp với ngân sách thân thiện.",
    image: "/img/products/lumina/page-4.png",
    features: ["Lõi cứng nhựa đá, chống nước kháng biến dạng", "Màng trang trí vân gỗ độ nét cao, chất cảm chân thực", "Hèm khóa không cần keo, nền cũ lát trực tiếp được", "Lớp chống mài mòn UV, kháng xước chịu giẫm đạp"],
    applications: ["Căn hộ / nhà diện tích nhỏ lát toàn bộ", "Cải tạo nhanh nhà cho thuê", "Văn phòng và không gian chia sẻ", "Mặt sàn bán lẻ và showroom"],
    specs: SPC_SPECS,
    sourceUrl: "",
  },
  {
    model: "771478",
    slug: "lumina-spc-771478",
    name: "Sàn SPC nhựa đá hèm khóa Lumina 771478",
    nameOriginal: "LuminaFloor SPC 771478",
    series: "Sàn SPC nhựa đá",
    seriesOriginal: "spc",
    desc: "Sàn SPC nhựa đá hèm khóa, bề mặt vân gỗ/vân đá mô phỏng thật, kháng xước chống mài mòn, chống nước chống ẩm, phù hợp lát diện tích lớn.",
    longDesc:
      "771478 lấy gam vân gỗ trung tính trầm ổn và bền nhìn làm chủ đạo, là lựa chọn an tâm để lát thông liền diện tích lớn cho phòng khách, phòng ngủ. Lõi cứng ổn định kích thước, trong môi trường nóng lạnh khó co giãn nhiệt; kết hợp đệm lót chống ồn EVA / IXPE giúp tiếng bước chân nhẹ hơn, cảm giác giẫm chắc chắn hơn. Hèm khóa ghép so le, gõ nhẹ vào vị trí, mạch ghép phẳng phiu tự nhiên, liền thành một mảng bề thế như sàn gỗ nguyên tấm.",
    image: "/img/products/lumina/page-5.png",
    features: ["Vân gỗ trung tính, dễ phối bền nhìn", "Ổn định kích thước, nóng lạnh không biến dạng", "Đệm lót chống ồn, cảm giác chân thoải mái", "Lát liền diện tích lớn, mạch ghép tự nhiên"],
    applications: ["Lát thông phòng khách / phòng ngủ", "Căn hộ và nhà bàn giao tinh", "Homestay và phòng khách sạn", "Khu mở văn phòng"],
    specs: SPC_SPECS,
    sourceUrl: "",
  },
  {
    model: "771497",
    slug: "lumina-spc-771497",
    name: "Sàn SPC nhựa đá hèm khóa Lumina 771497",
    nameOriginal: "LuminaFloor SPC 771497",
    series: "Sàn SPC nhựa đá",
    seriesOriginal: "spc",
    desc: "Sàn SPC nhựa đá hèm khóa, mẫu mã thời thượng hợp xu hướng, thân thiện môi trường không phụ gia formaldehyde, lựa chọn hàng đầu cho nội thất xanh.",
    longDesc:
      "771497 ra đời cho những không gian trẻ trung theo đuổi cá tính — thớ vân táo bạo và phối màu xu hướng khiến mặt sàn cũng trở thành một phần của thiết kế. Lõi thân thiện môi trường cấp E0 / E1, không phụ gia formaldehyde, vào ở an tâm hơn; lớp chống mài mòn cấp thương mại vừa chịu được lượng người qua lại dày đặc, vừa giữ độ bền đẹp như mới lâu dài. Quán cà phê, cửa hàng tuyển chọn, studio dùng làm nền, cảm giác không gian được nâng tầm tức thì.",
    image: "/img/products/lumina/page-6.png",
    features: ["Thớ vân xu hướng, đậm chất thiết kế", "Thân thiện môi trường cấp E0/E1 không phụ gia formaldehyde", "Chống mài mòn cấp thương mại, bền đẹp như mới", "Chống nước dễ vệ sinh, chăm sóc nhẹ nhàng"],
    applications: ["Quán cà phê / cửa hàng tuyển chọn", "Studio và không gian trưng bày", "Cửa hàng bán lẻ hợp xu hướng", "Không gian gia đình trẻ cá tính"],
    specs: SPC_SPECS,
    sourceUrl: "",
  },
  // ─── Sàn nhựa LVT đàn hồi ───────────────────────────────
  {
    model: "771500",
    slug: "lumina-lvt-771500",
    name: "Sàn nhựa LVT đàn hồi Lumina (lớp lót khô)",
    nameOriginal: "LuminaFloor LVT",
    series: "Sàn nhựa LVT đàn hồi",
    seriesOriginal: "lvt",
    desc: "Sàn nhựa LVT đàn hồi cao, cảm giác chân thoải mái, chống ồn chống mài mòn, bản lớp lót khô lát phối với nền tự san phẳng.",
    longDesc:
      "Bản lớp lót khô của Lumina LVT thắng ở chữ mềm — kết cấu đàn hồi đa lớp mang lại cảm giác chân ấm áp và khả năng chống ồn xuất sắc, giẫm lên yên tĩnh mà dễ chịu. Thiết kế siêu mỏng 2mm / 3mm không nâng cao mặt sàn, không vướng cửa, là lựa chọn thân thiện cho cải tạo nhà cũ và sửa chữa cục bộ. Phối với nền tự san phẳng láng đều dán keo phủ kín, phẳng phiu sát bám, bền lâu, lớp chống mài mòn cấp thương mại giúp sàn vẫn ung dung trong các tình huống tần suất sử dụng cao.",
    image: "/img/products/lumina/page-7.png",
    features: ["Kết cấu đàn hồi đa lớp, chống ồn cảm giác chân êm", "Siêu mỏng 2–3mm không vướng cửa", "Chống mài mòn cấp thương mại dễ vệ sinh", "Dẻo dai chống trượt an toàn hơn"],
    applications: ["Bệnh viện / phòng khám / cơ sở dưỡng lão", "Trường học và trung tâm đào tạo", "Văn phòng và chỗ làm việc mở", "Cửa hàng bán lẻ chuỗi"],
    specs: [{ k: "Độ dày", v: "2mm / 3mm (lớp lót khô)" }, ...LVT_SPECS],
    sourceUrl: "",
  },
  {
    model: "771518",
    slug: "lumina-lvt-771518",
    name: "Sàn nhựa LVT đàn hồi tự dán Lumina 771518",
    nameOriginal: "LuminaFloor LVT 771518",
    series: "Sàn nhựa LVT đàn hồi",
    seriesOriginal: "lvt",
    desc: "Sàn nhựa LVT đàn hồi tự dán, bóc màng dán ngay, thi công nhanh gọn, chống mài mòn chống trượt, dễ làm sạch.",
    longDesc:
      "771518 là phúc âm của phái lắp nhanh — mặt sau tự có lớp keo, bóc màng dán ngay, lăn ép thoát khí, một người trong một buổi chiều có thể cải tạo xong một căn phòng mà không cần thợ chuyên nghiệp. Siêu mỏng nhẹ nhàng, cắt tỉa dễ dàng, gặp đường ống và góc tường cũng xử lý linh hoạt. Bề mặt chống mài mòn chống trượt vừa hợp cải tạo nhà ở, vừa đảm đương được cải tạo nhanh cho văn phòng và cửa hàng.",
    image: "/img/products/lumina/page-8.png",
    features: ["Keo tự dán mặt sau, bóc màng dán ngay", "Không cần dụng cụ chuyên nghiệp, thân thiện với DIY", "Siêu mỏng nhẹ nhàng, cắt tỉa linh hoạt", "Chống mài mòn chống trượt, dễ làm sạch"],
    applications: ["Cải tạo nhanh nhà cho thuê", "Sửa chữa cục bộ văn phòng", "Lắp nhanh cửa hàng", "Cải tạo nhà ở DIY"],
    specs: [{ k: "Độ dày", v: "2mm / 3mm (tự dán)" }, ...LVT_SPECS],
    sourceUrl: "",
  },
  {
    model: "771560",
    slug: "lumina-lvt-771560",
    name: "Sàn nhựa LVT đàn hồi hèm khóa Lumina 771560",
    nameOriginal: "LuminaFloor LVT 771560",
    series: "Sàn nhựa LVT đàn hồi",
    seriesOriginal: "lvt",
    desc: "Sàn nhựa LVT đàn hồi hèm khóa (4mm / 5mm click-lock), lắp không cần keo, tháo lắp lại được, cảm giác chân thoải mái.",
    longDesc:
      "771560 hợp nhất cảm giác chân thoải mái của LVT với sự tiện lợi của hèm khóa — kết cấu hèm khóa click 4mm / 5mm, lắp không cần keo, tháo lắp lại được, chuyển nhà cũng mang theo lát lại được. Thân đàn hồi đa lớp dung hòa cả chống ồn và độ bền, bề mặt chống trượt, phù hợp không gian nhà có người già trẻ nhỏ, cũng phù hợp những nơi thương mại cần bảo trì linh hoạt, có thể thay từng tấm.",
    image: "/img/products/lumina/page-9.png",
    features: ["Hèm khóa click, không keo không mùi keo", "Tháo lắp lại được, tái sử dụng linh hoạt", "Đàn hồi chống ồn, cảm giác chân thoải mái", "Thay được từng tấm, bảo trì tiện lợi"],
    applications: ["Nhà ở có người già trẻ nhỏ", "Văn phòng và không gian họp", "Bán lẻ chuỗi và showroom", "Mặt sàn thương mại cần bảo trì linh hoạt"],
    specs: [{ k: "Độ dày", v: "4mm / 5mm (hèm khóa click)" }, ...LVT_SPECS],
    sourceUrl: "",
  },
];
