/**
 * Metadata thiết bị vệ sinh ANBI — trang chi tiết sản phẩm.
 * Keyed by seriesOriginal (catKey: "smart-toilet","toilet","basin","faucet","cabinet"...).
 * Sourcing: anbichina.com — model + kích thước thật; mô tả vật liệu theo chuẩn ngành sứ vệ sinh.
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
const CERTS = ["Tiêu chuẩn quốc gia TQ (GB) cho sứ vệ sinh & sen vòi", "ISO 9001 quản lý chất lượng", "Men chống bám, dễ vệ sinh", "Kiểm định độ bền & độ kín nước"];
const MFG = [
  "ANBI — thương hiệu thiết bị vệ sinh Trung Quốc (sứ vệ sinh, sen vòi, tủ lavabo, phòng tắm)",
  "Dải sản phẩm trọn bộ phòng tắm: bồn cầu (thường & thông minh), chậu rửa, bồn tiểu, tủ, sen vòi, bồn tắm",
  "Sứ nung nhiệt độ cao, men chống bám; sen vòi đồng/hợp kim mạ crôm",
  "Kiểm soát chất lượng theo lô: thử kín nước, thử xả, độ bền lớp men/mạ",
];
const PACK = [
  { label: "Đóng gói", value: "Thùng carton + xốp định hình bảo vệ men sứ" },
  { label: "MOQ", value: "Theo container; mix nhiều model OK" },
  { label: "Phụ kiện kèm", value: "Bộ xả, gioăng, bu-lông lắp đặt theo sản phẩm" },
  { label: "Bảo quản", value: "Nơi khô ráo, tránh va đập cạnh men, để đứng" },
];
const INSTALL = [
  "Kiểm tra tâm xả/khoảng cách chờ (rough-in) khớp sản phẩm trước khi lắp",
  "Dùng gioăng/keo silicon chuyên dụng, siết bu-lông đều tay tránh nứt sứ",
  "Đấu cấp nước & thoát đúng kỹ thuật; thử xả/thử kín nước sau lắp",
  "Bồn cầu thông minh: đảm bảo nguồn điện & nước đúng yêu cầu, có tiếp đất",
];
const CARE = [
  { title: "Vệ sinh", desc: "Lau bằng khăn mềm + chất tẩy trung tính. Men chống bám giúp vệ sinh dễ; tránh bột mài mòn & axit mạnh." },
  { title: "Bảo dưỡng sen vòi", desc: "Định kỳ vệ sinh đầu sen chống cặn vôi; kiểm tra gioăng tránh rò rỉ." },
  { title: "Bồn cầu thông minh", desc: "Vệ sinh vòi rửa & lưới lọc theo hướng dẫn; kiểm tra nguồn điện an toàn." },
];
const FAQ = [
  { q: "Sản phẩm ANBI có đầy đủ phụ kiện lắp đặt không?", a: "Có. Mỗi sản phẩm kèm bộ xả/gioăng/bu-lông phù hợp; Huayuesc hỗ trợ tư vấn rough-in." },
  { q: "Kích thước chờ (rough-in) bồn cầu thế nào?", a: "Thông số kích thước D×R×C ghi trong từng sản phẩm; tâm xả tiêu chuẩn, vui lòng xác nhận theo model." },
  { q: "MOQ & thời gian giao?", a: "Tính theo container; lịch giao báo theo đơn." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const SHOW = ["Khách sạn & căn hộ dịch vụ", "Nhà ở dân dụng, biệt thự", "Công trình thương mại & công cộng"];
const WHY = { icon: "🛁", title: "Trọn bộ phòng tắm", desc: "Đồng bộ bồn cầu, chậu, sen vòi, tủ — một nhà cung cấp." };
const TOILET = mk({
  story: "Bồn cầu ANBI — sứ vệ sinh nung nhiệt độ cao, men chống bám, kiểu một khối/treo tường hiện đại, xả êm tiết kiệm nước.",
  heritage: "Bồn cầu là dòng lõi của ANBI với nhiều kiểu dáng & kích thước cho mọi không gian.",
  technicalSpecs: [{ label: "Chất liệu", value: "Sứ vệ sinh cao cấp, men chống bám" }, { label: "Kiểu", value: "Một khối / treo tường" }, { label: "Kích thước", value: "Ghi theo từng model (D×R×C)" }],
  whyChoose: [WHY, { icon: "💧", title: "Xả êm tiết kiệm", desc: "Công nghệ xả hiệu quả, ít ồn, tiết kiệm nước." }, { icon: "✨", title: "Men chống bám", desc: "Bề mặt men trơn, sạch nhanh, hạn chế bám bẩn." }],
  projectShowcase: SHOW,
});
const BASIN = mk({
  story: "Chậu rửa ANBI — sứ nghệ thuật & chậu đặt bàn/chân đứng, kiểu dáng đa dạng cho lavabo phòng tắm và quầy rửa.",
  heritage: "Dòng chậu nghệ thuật mang lại điểm nhấn thẩm mỹ cho không gian phòng tắm.",
  technicalSpecs: [{ label: "Chất liệu", value: "Sứ vệ sinh cao cấp" }, { label: "Kiểu lắp", value: "Đặt bàn / âm bàn / chân đứng" }, { label: "Kích thước", value: "Ghi theo từng model" }],
  whyChoose: [WHY, { icon: "🎨", title: "Thẩm mỹ cao", desc: "Mẫu mã đa dạng, men đẹp, dễ phối nội thất." }, { icon: "🧼", title: "Dễ vệ sinh", desc: "Men chống bám, lau chùi nhanh." }],
  projectShowcase: SHOW,
});
const FAUCET = mk({
  story: "Sen vòi ANBI — vòi nước & bộ sen tắm đồng/hợp kim mạ crôm, lõi gốm bền, dòng chảy ổn định.",
  heritage: "Sen vòi hoàn thiện trọn bộ phòng tắm ANBI cùng phong cách.",
  technicalSpecs: [{ label: "Chất liệu", value: "Đồng/hợp kim mạ crôm" }, { label: "Lõi van", value: "Trục gốm (ceramic cartridge)" }, { label: "Bề mặt", value: "Mạ crôm sáng bóng chống xỉn" }],
  whyChoose: [WHY, { icon: "🚿", title: "Dòng chảy êm", desc: "Lõi gốm đóng/mở mượt, hạn chế rò rỉ." }, { icon: "🛡️", title: "Lớp mạ bền", desc: "Mạ crôm chống xỉn màu, sáng đẹp lâu dài." }],
  projectShowcase: SHOW,
});
const CABINET = mk({
  story: "Tủ lavabo ANBI — thân tủ chống ẩm kèm chậu & gương, tối ưu lưu trữ cho phòng tắm hiện đại.",
  heritage: "Tủ lavabo tổ hợp giúp gọn gàng & tăng tiện ích phòng tắm.",
  technicalSpecs: [{ label: "Thân tủ", value: "Vật liệu chống ẩm" }, { label: "Kèm theo", value: "Chậu + (gương) tuỳ model" }, { label: "Kích thước", value: "Ghi theo từng model" }],
  whyChoose: [WHY, { icon: "🪞", title: "Trọn bộ", desc: "Tủ + chậu + gương đồng bộ, lắp nhanh." }, { icon: "💧", title: "Chống ẩm", desc: "Vật liệu chịu ẩm tốt cho môi trường phòng tắm." }],
  projectShowcase: SHOW,
});
export const ANBI_SERIES_META: Record<string, SeriesMeta> = {
  "smart-toilet": mk({
    story: "Bồn cầu thông minh ANBI — tích hợp nắp rửa điện tử: rửa ấm, sấy khô, khử mùi, nắp êm, một số có tự động đóng/mở & xả cảm ứng.",
    heritage: "Dòng cao cấp nhất của ANBI cho trải nghiệm vệ sinh hiện đại.",
    technicalSpecs: [{ label: "Loại", value: "Bồn cầu thông minh (nắp rửa điện tử)" }, { label: "Tính năng", value: "Rửa ấm, sấy, khử mùi, nắp êm" }, { label: "Chất liệu", value: "Sứ vệ sinh + bo mạch điện tử" }],
    whyChoose: [WHY, { icon: "🚽", title: "Rửa ấm – sấy khô", desc: "Vòi rửa nước ấm điều chỉnh, sấy khô, vệ sinh sạch sẽ." }, { icon: "🔆", title: "Tiện nghi", desc: "Khử mùi, nắp đóng êm, một số model cảm ứng tự động." }],
    projectShowcase: SHOW,
  }),
  "smart-seat": mk({
    story: "Nắp rửa thông minh ANBI — nâng cấp bồn cầu thường thành bồn cầu thông minh: rửa ấm, sấy, nắp êm.",
    heritage: "Giải pháp nâng cấp tiện nghi không cần thay cả bồn cầu.",
    technicalSpecs: [{ label: "Loại", value: "Nắp rửa điện tử lắp thay" }, { label: "Tính năng", value: "Rửa ấm, sấy, khử mùi" }, { label: "Tương thích", value: "Bồn cầu phổ thông" }],
    whyChoose: [WHY, { icon: "♻️", title: "Nâng cấp dễ", desc: "Lắp thay nắp thường, biến bồn cầu cũ thành thông minh." }, { icon: "🌡️", title: "Rửa ấm", desc: "Vòi rửa nước ấm, sấy khô tiện nghi." }],
    projectShowcase: SHOW,
  }),
  toilet: TOILET, "wall-toilet": TOILET, squat: TOILET,
  kids: mk({
    story: "Bộ thiết bị vệ sinh trẻ em ANBI — bồn cầu & chậu kích thước nhỏ, an toàn, phù hợp nhà trẻ & gia đình có trẻ nhỏ.",
    heritage: "Dòng chuyên biệt cho không gian vệ sinh trẻ em.",
    technicalSpecs: [{ label: "Đối tượng", value: "Trẻ em (kích thước nhỏ)" }, { label: "Chất liệu", value: "Sứ vệ sinh cao cấp" }, { label: "Kích thước", value: "Ghi theo từng model" }],
    whyChoose: [WHY, { icon: "🧒", title: "Vừa tầm trẻ", desc: "Kích thước & chiều cao phù hợp trẻ nhỏ, an toàn." }, { icon: "🏫", title: "Cho nhà trẻ", desc: "Lý tưởng cho mẫu giáo, nhà trẻ, gia đình." }],
    projectShowcase: SHOW,
  }),
  "art-basin": BASIN, basin: BASIN,
  urinal: mk({
    story: "Bồn tiểu nam ANBI — sứ vệ sinh cho nhà vệ sinh công cộng & thương mại, một số có cảm ứng xả tự động.",
    heritage: "Giải pháp vệ sinh nam cho công trình công cộng.",
    technicalSpecs: [{ label: "Chất liệu", value: "Sứ vệ sinh cao cấp" }, { label: "Ứng dụng", value: "Nhà vệ sinh công cộng/thương mại" }, { label: "Kích thước", value: "Ghi theo từng model" }],
    whyChoose: [WHY, { icon: "🏢", title: "Cho công trình", desc: "Bền, dễ vệ sinh cho nhà vệ sinh lưu lượng cao." }, { icon: "💧", title: "Tiết kiệm nước", desc: "Thiết kế xả hiệu quả, một số có cảm ứng." }],
    projectShowcase: SHOW,
  }),
  cabinet: CABINET, faucet: FAUCET, "shower-set": FAUCET, shower: FAUCET,
  "shower-room": mk({
    story: "Phòng tắm kính ANBI — vách kính cường lực + khung nhôm, ngăn nước gọn gàng cho phòng tắm hiện đại.",
    heritage: "Giải pháp phân vùng khô/ướt cho phòng tắm.",
    technicalSpecs: [{ label: "Chất liệu", value: "Kính cường lực + khung nhôm" }, { label: "Kiểu", value: "Vách/buồng tắm đứng" }, { label: "Kích thước", value: "Theo model/đặt" }],
    whyChoose: [WHY, { icon: "🚪", title: "Khô ráo", desc: "Phân vùng khô/ướt, giữ phòng tắm sạch khô." }, { icon: "🛡️", title: "Kính an toàn", desc: "Kính cường lực bền, an toàn khi vỡ." }],
    projectShowcase: SHOW,
  }),
  bathtub: mk({
    story: "Bồn tắm ANBI — chất liệu acrylic giữ nhiệt, kiểu dáng hiện đại cho phòng tắm cao cấp.",
    heritage: "Bồn tắm hoàn thiện không gian thư giãn phòng tắm.",
    technicalSpecs: [{ label: "Chất liệu", value: "Acrylic giữ nhiệt" }, { label: "Kiểu", value: "Đặt sàn / âm" }, { label: "Kích thước", value: "Theo model" }],
    whyChoose: [WHY, { icon: "🛀", title: "Giữ nhiệt", desc: "Acrylic giữ nhiệt nước lâu, bề mặt mịn." }, { icon: "🧽", title: "Dễ vệ sinh", desc: "Bề mặt nhẵn, chống bám, lau nhanh." }],
    projectShowcase: SHOW,
  }),
  "mop-basin": BASIN, other: TOILET,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return ANBI_SERIES_META[seriesOriginal.trim()] || ANBI_SERIES_META.toilet;
}
