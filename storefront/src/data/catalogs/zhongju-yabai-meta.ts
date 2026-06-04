/**
 * Metadata Zhongju Yabai 中居亚百 (Guangdong Zhongju Yabai Building Materials Technology) — meta dùng chung.
 * Nguồn: gdzjyb.com. Nhà sản xuất tấm phủ vô cơ 无机预涂板 / 冰火板 / 洁净板, Tam Thuỷ - Phật Sơn.
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
const BRAND: SeriesMeta = {
  story:
    "Guangdong Zhongju Yabai Building Materials Technology Co., Ltd. (广东中居亚百建材科技) 专业生产无机预涂板（又称冰火板/洁净板），是用于内外墙隔断和吊顶的高端饰面材料。公司集研发、生产和销售于一体，拥有经验丰富的技术团队和自动化生产线，位于广东佛山三水区。",
  heritage:
    "Sản phẩm có đặc tính chống cháy (cấp A), chống ẩm, chống mốc, kháng khuẩn và không phát thải formaldehyde — đạt yêu cầu cho bệnh viện, phòng sạch và môi trường y tế. Đã ứng dụng tại nhiều bệnh viện (ví dụ Bệnh viện trực thuộc ĐH Thanh Đảo, Bệnh viện Hoa Tín).",
  technicalSpecs: [
    { label: "Thương hiệu", value: "Zhongju Yabai 中居亚百（广东中居亚百）" },
    { label: "Sản phẩm", value: "无机预涂板/冰火板/洁净板，墙面板" },
    { label: "Đặc tính", value: "Chống cháy cấp A, chống ẩm-mốc, kháng khuẩn, không formaldehyde" },
    { label: "Cơ sở", value: "Tam Thuỷ, Phật Sơn, Quảng Đông — dây chuyền tự động hoá" },
  ],
  manufacturing: [
    "广东中居亚百建材科技有限公司（中居亚百）—— 佛山三水",
    "Tấm phủ vô cơ: cả lớp bề mặt và lõi đều là vật liệu vô cơ → vi khuẩn không sống được, đạt hiệu quả «sạch»",
    "Dây chuyền sản xuất tự động hoá; tích hợp R&D - sản xuất - kinh doanh",
    "Đặc tính: chống cháy A, chống ẩm, chống mốc, kháng khuẩn, không formaldehyde",
  ],
  careGuide: [
    { title: "Vệ sinh", desc: "Bề mặt vô cơ chống bám bẩn, dễ lau; lau bằng khăn ẩm, không cần hoá chất mạnh." },
    { title: "Bảo quản", desc: "Để nơi khô ráo, kê phẳng, tránh va đập cạnh tấm khi lưu kho và vận chuyển." },
    { title: "Độ bền", desc: "Chống ẩm-mốc nên giữ bề mặt sạch lâu dài; phù hợp môi trường yêu cầu vệ sinh cao." },
  ],
  installation: [
    "Xác định vị trí ốp: tường ngăn, tường ngoài, trần, hành lang, phòng sạch",
    "Lắp trên hệ khung xương/kết cấu; dùng keo/phụ kiện chuyên dụng cho tấm vô cơ",
    "Xử lý mạch ghép và điểm liên kết để đảm bảo phẳng, kín, chống cháy",
    "Hoàn thiện mép & mạch theo yêu cầu môi trường (bệnh viện/phòng sạch)",
  ],
  certifications: [
    "Chống cháy cấp A (vật liệu trang trí không cháy)",
    "Không phát thải formaldehyde — đạt tiêu chuẩn môi trường y tế/phòng sạch",
    "Kháng khuẩn — phù hợp bệnh viện, lab, phòng sạch",
  ],
  packaging: [
    { label: "Hình thức cung cấp", value: "Theo tấm/quy cách, giao theo dự án" },
    { label: "Bề mặt", value: "Nhiều vân & màu (vân gỗ, màu trơn, pastel...)" },
    { label: "Ứng dụng", value: "Tường, trần, ốp nội-ngoại thất" },
  ],
  whyChoose: [
    { icon: "🔥", title: "Chống cháy cấp A", desc: "Vật liệu vô cơ không cháy — an toàn cho công trình." },
    { icon: "🏥", title: "Chuẩn y tế", desc: "Kháng khuẩn, không formaldehyde — đạt chuẩn bệnh viện, phòng sạch." },
    { icon: "💧", title: "Chống ẩm-mốc", desc: "Bề mặt vô cơ chống ẩm, chống mốc, dễ lau sạch, bền đẹp." },
  ],
  projectShowcase: ["Bệnh viện & cơ sở y tế (phòng sạch)", "Trường học, phòng thí nghiệm", "Khách sạn, căn hộ, văn phòng", "Tường/trần & hành lang công cộng"],
  faq: [
    { q: "Tấm phủ vô cơ / «băng hỏa» của Zhongju Yabai là gì?", a: "Là tấm trang trí mà cả bề mặt và lõi đều là vật liệu vô cơ — chống cháy cấp A, chống ẩm-mốc, kháng khuẩn và không phát thải formaldehyde, dùng ốp tường/trần." },
    { q: "Dùng cho công trình nào?", a: "Bệnh viện, phòng sạch, trường học, phòng lab, khách sạn, văn phòng, hành lang công cộng — nơi yêu cầu chống cháy & vệ sinh cao." },
    { q: "Zhongju Yabai có cung cấp tại Việt Nam không?", a: "Liên hệ Huayuesc để được tư vấn cung cấp tấm vô cơ Zhongju Yabai cho dự án tại Việt Nam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
