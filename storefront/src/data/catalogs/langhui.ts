import type { PartnerProduct } from "@/data/partners";

/**
 * Catalog Langhui — 6 sản phẩm tấm ALC/AAC THẬT từ gdlanghui.com (site quốc tế). Ảnh chính thức (đã verify). Tên tiếng Việt.
 */

export const LANGHUI_PRODUCTS: PartnerProduct[] = [
  // ─── Block AAC ───────────────
  {
    model: "High Precision Autoclaved AeratedConcreate Blocks",
    slug: "aac-blocks",
    name: "Block bê tông khí chưng áp AAC độ chính xác cao Langhui",
    nameOriginal: "High Precision Autoclaved AeratedConcreate Blocks",
    series: "Block AAC",
    seriesOriginal: "aac-blocks",
    desc: "Block bê tông khí chưng áp AAC nhẹ, cường độ cao với khả năng cách nhiệt, cách âm, chống cháy, bền và chống thấm tốt. Vật liệu xây dựng tiết kiệm năng lượng, thân thiện môi trường, thi công thuận tiện với chi phí thấp, bề mặt đẹp và chịu lực tốt.",
    image: "/img/products/langhui/aac-blocks.png",
    specs: [{ k: "Đặc tính", v: "Nhẹ, cường độ cao, cách nhiệt, cách âm" }, { k: "Chống cháy & độ bền", v: "Chống cháy, bền, chống đóng băng, chống thấm, kháng chấn" }, { k: "Tính năng khác", v: "Hệ số hóa mềm cao, treo vật không nứt, thân thiện môi trường, tiết kiệm năng lượng" }, { k: "Thương hiệu", v: "Langhui (Guangdong Langhui)" }, { k: "Loại", v: "Bê tông khí chưng áp ALC/AAC" }],
    applications: ["Tường trong và tường ngoài, sàn, mái nhà khung thép", "Cao ốc văn phòng, nhà xưởng, tường chống cháy", "Tường cách âm và cải tạo nâng tầng công trình cũ"],
    sourceUrl: "https://gdlanghui.com/en/248.html",
  },
  // ─── Tường chống cháy ───────────────
  {
    model: "Firewalls",
    slug: "firewalls",
    name: "Tấm tường chống cháy ALC/AAC Langhui (bọc bảo vệ cột, dầm thép)",
    nameOriginal: "Firewalls",
    series: "Tường chống cháy",
    seriesOriginal: "firewalls",
    desc: "Giải pháp tường và lớp bọc chống cháy bằng tấm bê tông khí chưng áp ALC/AAC của Langhui, dùng để bao bọc bảo vệ cột và dầm thép. Tấm mỏng được lắp trên hệ khung xương thép nhẹ và cố định bằng vít tự khoan, tạo lớp ngăn cháy nhẹ, cách nhiệt và cách âm cho kết cấu thép.",
    image: "/img/products/langhui/firewalls.png",
    specs: [{ k: "Cấu tạo", v: "Tấm mỏng ALC/AAC lắp trên khung xương thép nhẹ, bắt vít tự khoan (theo sơ đồ kỹ thuật)" }, { k: "Ứng dụng kết cấu", v: "Bọc chống cháy cột thép chữ I và cột thép tròn" }, { k: "Loại", v: "Bê tông khí chưng áp ALC/AAC" }, { k: "Thương hiệu", v: "Langhui (Guangdong Langhui)" }],
    applications: ["Bọc chống cháy cột và dầm kết cấu thép", "Tường ngăn cháy cho nhà khung thép, nhà xưởng", "Công trình cao ốc, nhà máy cần chống cháy và cách nhiệt"],
    sourceUrl: "https://gdlanghui.com/en/250.html",
  },
  // ─── Tấm sàn/mái ───────────────
  {
    model: "Floor and roof panels",
    slug: "floor-roof-panels",
    name: "Tấm sàn & mái bê tông khí chưng áp ALC/AAC Langhui",
    nameOriginal: "Floor and roof panels",
    series: "Tấm sàn/mái",
    seriesOriginal: "floor-roof-panels",
    desc: "Tấm sàn và mái bê tông khí chưng áp ALC/AAC của Langhui dùng làm kết cấu sàn, mái cho công trình bê tông và nhà khung thép. Tấm được lắp ghép trên dầm thép, liên kết bằng góc thép và bu lông hóa chất, phù hợp cho thi công nhanh, nhẹ và linh hoạt.",
    image: "/img/products/langhui/floor-roof-panels.png",
    specs: [{ k: "Thương hiệu", v: "Langhui (Guangdong Langhui)" }, { k: "Loại", v: "Bê tông khí chưng áp ALC/AAC" }, { k: "Ứng dụng kết cấu", v: "Tấm sàn và tấm mái" }, { k: "Phương thức lắp đặt", v: "Ghép trên dầm thép, liên kết bằng góc thép và bu lông hóa chất M12" }],
    applications: ["Sàn và mái nhà khung thép", "Công trình kết cấu bê tông, cao ốc", "Nhà xưởng thi công lắp ghép nhanh"],
    sourceUrl: "https://gdlanghui.com/en/249.html",
  },
  // ─── Tấm tường ALC/AAC ───────────────
  {
    model: "Autoclaved Lightweight Concrete",
    slug: "autoclaved-lightweight-concrete-panel",
    name: "Tấm tường bê tông khí chưng áp ALC/AAC siêu mỏng Langhui",
    nameOriginal: "Autoclaved Lightweight Concrete",
    series: "Tấm tường ALC/AAC",
    seriesOriginal: "autoclaved-lightweight-concrete-panel",
    desc: "Tấm tường bê tông khí chưng áp ALC/AAC siêu mỏng của Langhui, có sẵn độ dày 50mm và 75mm. Loại tấm 50mm phù hợp cho thi công nhanh, các quy cách khác được thỏa thuận theo nhu cầu cung ứng.",
    image: "/img/products/langhui/autoclaved-lightweight-concrete-panel.png",
    specs: [{ k: "Độ dày", v: "50mm, 75mm" }, { k: "Tấm 50mm", v: "Dùng cho thi công nhanh (thin fast)" }, { k: "Quy cách khác", v: "Theo thỏa thuận giữa bên cung và bên cầu" }, { k: "Thương hiệu", v: "Langhui (Guangdong Langhui)" }, { k: "Loại", v: "Bê tông khí chưng áp ALC/AAC" }],
    applications: ["Tường ngăn nhà khung thép", "Công trình cần thi công nhanh, nhẹ", "Nhà xưởng, cao ốc, văn phòng"],
    sourceUrl: "https://gdlanghui.com/en/247.html",
  },
  {
    model: "Lightweight ultra-thin 50, 75mm AAC (ALC) concrete wall panels",
    slug: "lightweight-ultrathin-aac-panel",
    name: "Tấm tường bê tông khí chưng áp ALC/AAC siêu mỏng 50, 75mm Langhui",
    nameOriginal: "Lightweight ultra-thin 50, 75mm AAC (ALC) concrete wall panels",
    series: "Tấm tường ALC/AAC",
    seriesOriginal: "lightweight-ultrathin-aac-panel",
    desc: "Tấm tường bê tông khí chưng áp ALC/AAC siêu mỏng, trọng lượng nhẹ, chủ yếu dùng cho các công trình khung thép nhẹ. Langhui sở hữu dây chuyền và quy trình sản xuất tấm tiên tiến, đã đạt sản xuất hàng loạt và xuất khẩu số lượng lớn sang Úc, Nhật Bản, Hàn Quốc.",
    image: "/img/products/langhui/lightweight-ultrathin-aac-panel.png",
    gallery: ["/img/products/langhui/lightweight-ultrathin-aac-panel-g1.jpg", "/img/products/langhui/lightweight-ultrathin-aac-panel-g2.jpg"],
    specs: [{ k: "Độ dày", v: "50mm, 75mm" }, { k: "Đặc tính", v: "Siêu mỏng, trọng lượng nhẹ" }, { k: "Loại", v: "Bê tông khí chưng áp ALC/AAC" }, { k: "Thương hiệu", v: "Langhui (Guangdong Langhui)" }],
    applications: ["Tường ngăn nhà khung thép nhẹ", "Công trình xuất khẩu (Úc, Nhật, Hàn)", "Cao ốc, nhà xưởng"],
    sourceUrl: "https://gdlanghui.com/en/246.html",
  },
  {
    model: "wallboard",
    slug: "wallboard",
    name: "Tấm tường bê tông khí chưng áp ALC/AAC Langhui",
    nameOriginal: "wallboard",
    series: "Tấm tường ALC/AAC",
    seriesOriginal: "wallboard",
    desc: "Tấm tường bê tông khí chưng áp ALC/AAC của Langhui dùng làm vách ngăn trong và ngoài cho công trình. Tấm được lắp đặt bằng phương pháp kẹp giữ (clip/anchor) cố định vào dầm và sàn, mạch ghép trám bằng vữa xi măng.",
    image: "/img/products/langhui/wallboard.png",
    gallery: ["/img/products/langhui/wallboard-g1.jpg"],
    specs: [{ k: "Phương pháp lắp đặt", v: "Kẹp giữ (quản kẹp) cố định bằng đinh bắn L=25mm và bu lông neo kim loại M8" }, { k: "Xử lý mạch ghép", v: "Trám mạch bằng vữa xi măng, phủ matit và sơn tường nội thất" }, { k: "Thương hiệu", v: "Langhui (Guangdong Langhui)" }, { k: "Loại", v: "Bê tông khí chưng áp ALC/AAC" }],
    applications: ["Tường ngăn trong và ngoài nhà khung thép", "Nhà xưởng, cao ốc văn phòng", "Công trình cần thi công nhanh, lắp ghép khô"],
    sourceUrl: "https://gdlanghui.com/en/251.html",
  },
];