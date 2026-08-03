/**
 * Metadata OCEANO (欧神诺) —— rich text cho trang chi tiết sản phẩm. Khóa theo seriesOriginal (hệ màu ngọc).
 * Nguồn: catalog sản phẩm mới «Ngọc Trung Hoa» thu 2025 của OCEANO. OCEANO là thương hiệu gạch porcelain / tấm sintered cao cấp thuộc Tập đoàn DOBE Home.
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
  "Đạt tiêu chuẩn quốc gia về gạch gốm GB/T 4100 —— các chỉ tiêu độ hút nước, cường độ, độ mài mòn đều đạt chuẩn",
  "Giới hạn nhân phóng xạ loại A —— có thể dùng không hạn chế cho mọi không gian nội thất",
  "Phân cấp độ mài mòn và chống trượt bề mặt, chọn theo bối cảnh sử dụng, hài hòa giữa thẩm mỹ và an toàn",
  "Định hướng vật liệu xây dựng xanh —— quy cách lớn, mỏng hóa, giảm tiêu hao tài nguyên",
];
const MFG = [
  "OCEANO 欧神诺 —— thương hiệu gạch porcelain / tấm sintered cao cấp thuộc Tập đoàn DOBE Home, chuyên về gạch porcelain vân đá quy cách lớn",
  "Công nghệ «bề mặt vân khắc vi mô» thế hệ mới: hạt khô siêu mịn 400 mesh + tráng men 3 lớp, vân nổi khối, chạm vào ôn nhuận như ngọc",
  "Nâng cấp tăng độ dày phôi: 900×1800mm nâng lên 12mm, 1200×1600mm nâng lên 11mm, ổn định bền bỉ, độ phẳng cao",
  "Công nghệ canh chỉnh đối vị bằng kỹ thuật số hiện thực hóa thao tác cốt lõi của «khắc», phần nổi lõm và họa tiết vân đồng bộ chính xác, tái hiện chân thực chất đá",
];
const PACK = [
  { label: "Đóng gói", value: "Đóng theo tấm / theo thùng, chia gói theo quy cách; tấm lớn gia cố giá gỗ khi xuất hàng" },
  { label: "Số lượng đặt tối thiểu", value: "Tính theo pallet / container; có thể đóng ghép nhiều mẫu" },
  { label: "Bảo vệ vận chuyển", value: "Gạch quy cách lớn gia cố giá gỗ + chống góc, ngừa va đập nứt vỡ khi vận chuyển" },
  { label: "Dịch vụ", value: "Cung cấp mẫu chọn loại và phương án lát; xác nhận mẫu mã và quy cách trước khi đặt hàng công trình" },
];
const INSTALL = [
  "Lớp nền phải chắc chắn, phẳng, sạch; gạch quy cách lớn nên làm lớp cán phẳng và kiểm soát bộp",
  "Dùng keo dán gạch dán mỏng / hồ dán phủ kín mặt sau, đảm bảo tấm lớn phủ hồ đầy không bộp",
  "Lát theo mạch chừa của thiết kế hoặc mạch khít A', dùng ke chữ thập và dụng cụ cân chỉnh để kiểm soát chênh lệch cao thấp",
  "Sau khi lát và bảo dưỡng thì xử lý chà ron; trước khi chà ron làm sạch khe, chọn keo chà ron theo bảng màu",
];
const CARE = [
  { title: "Vệ sinh hằng ngày", desc: "Dùng chất tẩy rửa trung tính kết hợp khăn mềm / cây lau, bề mặt bóng tránh vật cứng cào xước." },
  { title: "Bảo dưỡng chống bẩn", desc: "Xử lý kịp thời các vết bẩn cứng đầu cục bộ; khu bếp và phòng tắm lưu ý chống dầu mỡ, chống cặn nước." },
  { title: "Bảo vệ khi mang vật nặng", desc: "Khi di chuyển vật nặng phải lót đệm, tránh va đập góc cạnh và va chạm điểm." },
  { title: "Bảo trì mạch chà ron", desc: "Giữ khe sạch và khô; khi keo chà ron lão hóa hoặc bám bẩn có thể xử lý lại." },
];
const FAQ = [
  { q: "Bộ sưu tập «Ngọc Trung Hoa» là gì?", a: "Là dòng sản phẩm gạch porcelain vân đá / tấm sintered mới do OCEANO ra mắt thu 2025, diễn giải mỹ học ngọc phương Đông qua năm hệ màu ngọc: Ngọc Đen, Ngọc Trắng, Ngọc Lam-Xám, Ngọc Đỏ, Ngọc Vàng, sử dụng công nghệ bề mặt vân khắc vi mô." },
  { q: "Có những quy cách và độ dày nào?", a: "Chủ lực là các quy cách lớn như 1200×2700mm, 1200×1600mm, 900×1800mm, 800×2700mm, 750×1500mm...; phôi được tăng độ dày lên 11–12mm, phẳng và ổn định." },
  { q: "Có dùng được trong nhà không? Độ phóng xạ thế nào?", a: "Được. Độ phóng xạ của sản phẩm đạt giới hạn loại A, có thể dùng không hạn chế cho tường và sàn các không gian nội thất như nhà ở, khách sạn, thương mại." },
  { q: "Tại Việt Nam có cung ứng không?", a: "Vui lòng liên hệ Huayue để nhận tư vấn về mẫu mã, quy cách, cung ứng và phương án lát phù hợp cho dự án." },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}

const WHY_BRAND = { icon: "💎", title: "Gạch porcelain vân đá cao cấp", desc: "OCEANO 欧神诺 —— thương hiệu gạch cao cấp thuộc Tập đoàn DOBE Home, chuyên về gạch porcelain vân đá và tấm sintered quy cách lớn." };
const WHY_TEXTURE = { icon: "🪨", title: "Bề mặt vân khắc vi mô", desc: "Hạt khô siêu mịn 400 mesh + tráng men 3 lớp, vân nổi khối, chạm vào ôn nhuận như ngọc, tạm biệt cảm giác nhựa lạnh lẽo." };
const WHY_BIG = { icon: "📐", title: "Quy cách lớn, phôi tăng độ dày", desc: "Các tấm lớn như 1200×2700mm, phôi tăng độ dày 11–12mm, phẳng ổn định, lát mạch khít A' bám sát hơn." };

function jade(p: { story: string; heritage: string; color: string; faces: string; sizes: string; showcase: string[] }): SeriesMeta {
  return mk({
    story: p.story,
    heritage: p.heritage,
    technicalSpecs: [
      { label: "Bộ sưu tập", value: "Ngọc Trung Hoa · gạch porcelain vân đá / tấm sintered" },
      { label: "Hệ màu", value: p.color },
      { label: "Công nghệ bề mặt", value: "Bề mặt vân khắc vi mô · hạt khô siêu mịn 400 mesh · tráng men 3 lớp" },
      { label: "Vân", value: p.faces },
      { label: "Quy cách chủ lực", value: p.sizes },
      { label: "Độ dày phôi", value: "11–12mm (phôi tăng độ dày cho quy cách lớn)" },
    ],
    whyChoose: [WHY_BRAND, WHY_TEXTURE, WHY_BIG, { icon: "🏛️", title: "Mỹ học ngọc phương Đông", desc: "Đưa ngọc vào gạch, vân ôn nhuận đại khí, phù hợp không gian nhà ở và khách sạn cao cấp." }],
    projectShowcase: p.showcase,
  });
}

export const OCEANO_SERIES_META: Record<string, SeriesMeta> = {
  "black-jade": jade({
    story:
      "Ngọc Đen là mạch trầm tĩnh đại khí nhất trong bộ sưu tập «Ngọc Trung Hoa» —— lấy tông cà phê và mực làm chủ đạo, vân ngọc tông sẫm như triều dâng đêm tối, lại như con nước lăn tăn ban mai, trải ra trên tấm lớn khí vận như sông dài cuộn chảy. Bề mặt vân khắc vi mô khiến vân tông sẫm không còn lạnh lẽo phản quang, mà ôn nhuận hàm súc, sâu thẳm bền nhìn; thiết kế nối vân một viên ba vân và một viên sáu vân giúp vân sống động liền mạch khi lát diện tích lớn, khí thế như cầu vồng. Sản phẩm phù hợp những không gian cần phong cách vững vàng và cảm giác sang trọng, biến một bức tường thành tâm điểm thị giác của gian phòng.",
    heritage: "Ngọc Đen diễn giải mỹ học phương Đông «trong tĩnh có thế» bằng vân ngọc tông sẫm, là gương mặt khí trường của bộ sưu tập Ngọc Trung Hoa OCEANO.",
    color: "Cà phê / Đen Brown · Black",
    faces: "Một viên ba vân (nối vân linh hoạt) / một viên sáu vân (thiết kế nối vân)",
    sizes: "1200×2700mm / 1200×1600mm",
    showcase: ["Tường nền tivi và sofa phòng khách", "Sảnh và câu lạc bộ khách sạn", "Lát toàn mảng sàn nhà ở cao cấp"],
  }),
  "white-jade": jade({
    story:
      "Ngọc Trắng là mạch thanh nhã trong trẻo nhất trong bộ sưu tập «Ngọc Trung Hoa» —— Tề Vân, Ngưng Chi, Băng Cơ, bản thân các cái tên đã chan chứa nét ôn nhuận. Trên nền trắng tuyết đến xám nhạt, vân ngọc thấp thoáng ẩn hiện, bề mặt mờ/lì mang lại cảm giác chạm mịn màng như mỡ tựa ngọc, ánh sáng lướt qua dịu dàng không chói. Nó tôn không gian thêm sáng sủa, sạch sẽ và cao cấp, là lựa chọn dễ phối cho phong cách tối giản hiện đại và sang trọng nhẹ, dù là tường hay sàn đều tạo nên mỹ học khoảng lặng trong trẻo thư thái.",
    heritage: "Ngọc Trắng với sắc ngọc sạch sẽ trong trẻo, trở thành nền sáng cho không gian tối giản hiện đại và sang trọng nhẹ.",
    color: "Trắng tuyết / Xám nhạt Snow White · Light Grey",
    faces: "Bề mặt mờ/lì, vân mịn màng hàm súc",
    sizes: "1200×1600mm / 900×1800mm / 750×1500mm...",
    showcase: ["Nhà ở tối giản hiện đại", "Phòng khách và phòng ngủ phong cách sang trọng nhẹ", "Không gian thương mại sáng sủa trong trẻo"],
  }),
  "sapphire-jade": jade({
    story:
      "Ngọc Lam-Xám là mạch đậm chất văn nhân nhất trong bộ sưu tập «Ngọc Trung Hoa» —— Lang Gia, Tiếp Thiên Bích, Ngọc Thấm Sênh Liên, giữa sắc lam xám và biếc lục ẩn chứa ý cảnh mây khói tựa sơn thủy. Vân ngọc lam mềm mại như núi xa pha đại, như nước biếc tiếp trời, rót vào không gian một nét thi vị phương Đông trầm tĩnh thanh nhã. Nó vừa đủ sức trấn giữ khí trường khi lát toàn mảng tường - sàn diện rộng, vừa điểm một nét thanh nhã nơi khoảng lặng, phù hợp không gian cao cấp theo đuổi phong cách và chiều sâu văn hóa.",
    heritage: "Ngọc Lam-Xám viết nên thi vị sơn thủy bằng vân ngọc lam biếc, là hệ màu đậm khí chất văn nhân phương Đông nhất trong bộ sưu tập Ngọc Trung Hoa.",
    color: "Lam xám / Biếc lục Sapphire Grey · Green",
    faces: "Bề mặt mờ/lì · bóng, nối vân tựa sơn thủy",
    sizes: "1200×2700mm / 800×2700mm / 750×1500mm...",
    showcase: ["Không gian tân Trung Hoa và phương Đông nhã sang", "Phòng trà, câu lạc bộ và khách sạn", "Tường nền phòng khách và tiền sảnh"],
  }),
  "red-jade": jade({
    story:
      "Ngọc Đỏ là mạch lãng mạn sống động nhất trong bộ sưu tập «Ngọc Trung Hoa» —— Thê Hà, Yên Chi Phi, Yên Chi Đại, Phù Dung, sắc hồng, phi và đại đan xen như ráng sớm nắng chiều, như cánh hoa nhuộm nhẹ. Sắc ngọc rực rỡ mà không phô trương, mang đến cho không gian giá trị cảm xúc ấm áp và cao cấp; vân mịn màng cùng độ bóng ôn nhuận khiến bức tường tựa một bức tranh hoa điểu tả ý. Nó phù hợp những không gian cần cá tính và chất nghệ thuật, là sắc màu điểm nhãn dưới ngòi bút của các nhà thiết kế.",
    heritage: "Ngọc Đỏ diễn giải sự lãng mạn và chất nghệ thuật bằng hoa văn sắc ráng, là hệ màu giàu biểu đạt cá tính nhất trong bộ sưu tập Ngọc Trung Hoa.",
    color: "Hồng / Phi / Đại Pink · Rosy · Dark",
    faces: "Bề mặt bóng · mờ/lì, hoa văn sắc ráng",
    sizes: "1200×2700mm / 1200×1600mm / 900×1800mm...",
    showcase: ["Không gian cá tính của nhà thiết kế", "Khách sạn boutique và cửa hàng buyer", "Tường nền nghệ thuật phòng khách và phòng ngủ"],
  }),
  "yellow-jade": jade({
    story:
      "Ngọc Vàng là mạch ấm áp tươi sáng nhất trong bộ sưu tập «Ngọc Trung Hoa» —— Thiên Sơn Kim Ngọc, Thiên Sơn Tuyết Ngọc, Kim Triện Ngọc, sắc ngọc vàng kem, vàng ấm như ánh kim tỏa chiếu, một bước lên mây. Tông màu ấm ôn nhuận khiến không gian thêm phần dễ chịu và tôn quý, vân ngọc ánh kim trải ra cục diện đại khí; bề mặt ôn nhuận chuyển sắc xa hoa kín đáo dưới ánh đèn, phù hợp tạo nên tổ ấm và không gian tiếp khách ấm cúng, tao nhã và có chất lượng.",
    heritage: "Ngọc Vàng trải bày nét ôn nhuận và tôn quý bằng sắc ngọc vàng ấm, là hệ màu giàu hơi ấm và khí chất sang trọng nhẹ nhất trong bộ sưu tập Ngọc Trung Hoa.",
    color: "Vàng kem / Vàng ấm Cream Yellow · Warm Gold",
    faces: "Bề mặt bóng, nối vân ngọc vàng ấm",
    sizes: "1200×1600mm / 900×1800mm / 750×1500mm...",
    showcase: ["Nhà ở sang trọng nhẹ ấm cúng", "Phòng khách và phòng ăn", "Phòng và suite khách sạn"],
  }),
};

/** Lấy metadata theo seriesOriginal (hệ màu ngọc), mặc định quay về white-jade. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return OCEANO_SERIES_META[seriesOriginal.trim()] || OCEANO_SERIES_META["white-jade"];
}
