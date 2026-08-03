/**
 * SUNCREATE 建研晟创 đá vô cơ — metadata cho trang chi tiết sản phẩm, theo seriesOriginal (mã hệ màu).
 * Nguồn: «华越供应链-无机石选材手册». NSX 广州建研晟创 (广州建筑集团 · Fortune 500). NPP VN: Huayue.
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

export const SUNCREATE_SERIES_META: Record<string, SeriesMeta> = {
  "TW": {
    "story": "Đá vô cơ SUNCREATE hệ Trắng mang sắc trắng tinh khôi, sáng và thanh khiết, được đúc sẵn dạng tấm từ vật liệu vô cơ đặc chắc và mài bóng đạt độ bóng cao. Không chỉ đẹp, nhóm màu này còn hội tụ 8 đặc tính của đá vô cơ SUNCREATE: siêu chống mài mòn, chống bám bẩn, độ bóng cao & đặc chắc, chống cháy đỉnh cao, tính thiết kế cao, không độc – không phóng xạ, kháng khuẩn chống mốc và thấp carbon thân thiện môi trường. Nhờ đó, hệ Trắng phù hợp cho cả không gian dân dụng cao cấp lẫn khu vực thương mại lưu lượng lớn — nơi đòi hỏi bề mặt vừa thẩm mỹ vừa bền bỉ theo thời gian.",
    "heritage": "SUNCREATE (建研晟创) là thương hiệu đá vô cơ thuộc Tập đoàn Kiến trúc Quảng Châu (广州建筑集团) — doanh nghiệp lọt Top 500 thế giới (Fortune Global 500, 2025) — cùng Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研). Toàn bộ danh mục gồm 204 mã màu thuộc 11 hệ màu, nhập khẩu và phân phối tại Việt Nam bởi Huayue.",
    "technicalSpecs": [
      {
        "label": "Loại vật liệu",
        "value": "Đá vô cơ đúc sẵn cao cấp (高品质预制型无机石材)"
      },
      {
        "label": "Hệ màu",
        "value": "Trắng"
      },
      {
        "label": "Bề mặt",
        "value": "Đánh bóng — độ bóng cao, đặc chắc (高光高致密)"
      },
      {
        "label": "8 đặc tính",
        "value": "Chống mài mòn · chống bẩn · độ bóng cao · chống cháy · thiết kế linh hoạt · không độc/phóng xạ · thấp carbon · kháng khuẩn"
      },
      {
        "label": "Nhà sản xuất",
        "value": "SUNCREATE 建研晟创 (广州建筑集团 · Fortune 500)"
      },
      {
        "label": "Ứng dụng",
        "value": "Sàn/tường dân dụng & thương mại, mặt tiền, sảnh lớn"
      }
    ],
    "manufacturing": [
      "SUNCREATE (建研晟创) — đá vô cơ đúc sẵn cao cấp (无机石材), hậu thuẫn kỹ thuật từ Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研)",
      "Công nghệ ép đúc vật liệu vô cơ đặc chắc + mài bóng đạt độ bóng cao, độ phẳng và độ cứng bề mặt ổn định",
      "204 mã màu thuộc 11 hệ màu — bảng màu phong phú từ trắng/xám/đen tới dòng cao cấp Ngự & nghệ thuật terrazzo",
      "Cung ứng theo quy cách tấm tiêu chuẩn, cắt & gia công theo yêu cầu dự án"
    ],
    "careGuide": [
      {
        "title": "Vệ sinh hằng ngày",
        "desc": "Lau bằng khăn mềm ẩm; tránh vật cứng cào xước và hóa chất tẩy mạnh có tính axit/kiềm cao."
      },
      {
        "title": "Xử lý vết bẩn",
        "desc": "Lau sớm vết dầu/nước màu; bề mặt đặc chắc ít thấm nên dễ làm sạch."
      },
      {
        "title": "Khu vực lưu lượng cao",
        "desc": "Đặt thảm chùi chân ở lối vào để giảm cát sạn mài mòn bề mặt."
      },
      {
        "title": "Bảo dưỡng định kỳ",
        "desc": "Kiểm tra mạch, xử lý kịp thời các khe hở để giữ bề mặt phẳng đẹp lâu dài."
      }
    ],
    "installation": [
      "Chuẩn bị mặt nền phẳng, sạch, khô; xác định bố cục mạch và hướng vân trước khi thi công",
      "Dùng keo/vữa dán chuyên dụng cho đá; căn chỉnh mạch khít, phẳng mặt",
      "Cắt & mài cạnh theo kích thước thực tế; xử lý góc, khe co giãn hợp lý",
      "Vệ sinh bề mặt sau thi công, nghiệm thu độ phẳng và độ đồng màu"
    ],
    "certifications": [
      "Nhà sản xuất: 广州建研晟创 SUNCREATE — thành viên Tập đoàn Kiến trúc Quảng Châu (广州建筑集团)",
      "广州建筑集团 — Fortune Global 500 (Top 500 doanh nghiệp lớn nhất thế giới) 2025",
      "Đá vô cơ: không độc, không phóng xạ (无毒无辐射) — an toàn cho không gian trong nhà",
      "Kháng khuẩn chống mốc & chống cháy cấp cao — phù hợp không gian công cộng, lưu lượng lớn",
      "Nhập khẩu, phân phối & hỗ trợ bảo hành tại Việt Nam bởi Huayue"
    ],
    "packaging": [
      {
        "label": "Hình thức cung ứng",
        "value": "Tấm đá vô cơ đúc sẵn, đóng kiện theo quy cách"
      },
      {
        "label": "Quy cách",
        "value": "Theo quy cách tấm tiêu chuẩn — liên hệ Huayue để biết kích thước & báo giá"
      },
      {
        "label": "Bảo vệ vận chuyển",
        "value": "Kê góc, chèn lót, kiện gỗ/khung thép cho tấm lớn, giảm sứt vỡ khi vận chuyển"
      },
      {
        "label": "Dịch vụ",
        "value": "Tư vấn chọn màu → báo giá DDP → giao hàng → hỗ trợ đổi trả nếu lỗi (qua Huayue)"
      }
    ],
    "whyChoose": [
      {
        "icon": "🛡️",
        "title": "Siêu chống mài mòn",
        "desc": "Bề mặt vô cơ đặc chắc, chịu mài mòn cao — bền đẹp cả ở khu vực đi lại nhiều."
      },
      {
        "icon": "🔥",
        "title": "Chống cháy đỉnh cao",
        "desc": "Vật liệu vô cơ không bắt lửa, chống cháy cấp cao — an tâm cho không gian công cộng."
      },
      {
        "icon": "☢️",
        "title": "Không độc – không phóng xạ",
        "desc": "An toàn cho sức khỏe, dùng được trong nhà, phòng ngủ, không gian trẻ em."
      },
      {
        "icon": "🦠",
        "title": "Kháng khuẩn chống mốc",
        "desc": "Bề mặt đặc, ít thấm — hạn chế vi khuẩn và nấm mốc, dễ vệ sinh."
      },
      {
        "icon": "✨",
        "title": "Độ bóng cao & đặc chắc",
        "desc": "Đánh bóng đạt độ bóng cao (高光高致密), sáng đẹp và ít bám bẩn."
      },
      {
        "icon": "🌿",
        "title": "Thấp carbon, thân thiện MT",
        "desc": "Quy trình thấp carbon, thân thiện môi trường — lựa chọn bền vững."
      }
    ],
    "projectShowcase": [
      "Sảnh & hành lang toà nhà thương mại, khách sạn",
      "Mặt tiền & không gian trưng bày dự án",
      "Nhà ở cao cấp, biệt thự, showroom"
    ],
    "faq": [
      {
        "q": "Đá vô cơ SUNCREATE khác gì đá terrazzo gốc nhựa / đá nhân tạo?",
        "a": "Đây là đá vô cơ (无机石) gốc chất kết dính vô cơ — chống cháy cấp cao, không độc, không phóng xạ và thấp carbon; khác với đá nhân tạo/terrazzo gốc nhựa (resin)."
      },
      {
        "q": "Có an toàn để dùng trong nhà không?",
        "a": "Có. Đá vô cơ không độc, không phóng xạ (无毒无辐射), kháng khuẩn chống mốc — an toàn cho phòng khách, phòng ngủ, không gian trẻ em và khu vực công cộng."
      },
      {
        "q": "Có bao nhiêu màu để chọn?",
        "a": "204 mã màu thuộc 11 hệ màu: trắng, xám, đen, đỏ, nâu, vàng be, xanh lá, xanh dương, vân tơ tằm, dòng cao cấp Ngự và dòng nghệ thuật terrazzo."
      },
      {
        "q": "Mua & báo giá tại Việt Nam thế nào?",
        "a": "Liên hệ Huayue — nhà nhập khẩu & phân phối tại Việt Nam — để nhận mẫu, quy cách tấm, báo giá DDP và hỗ trợ thi công."
      }
    ]
  },
  "TG": {
    "story": "Đá vô cơ SUNCREATE hệ Xám mang gam xám trung tính, điềm đạm và hiện đại, được đúc sẵn dạng tấm từ vật liệu vô cơ đặc chắc và mài bóng đạt độ bóng cao. Không chỉ đẹp, nhóm màu này còn hội tụ 8 đặc tính của đá vô cơ SUNCREATE: siêu chống mài mòn, chống bám bẩn, độ bóng cao & đặc chắc, chống cháy đỉnh cao, tính thiết kế cao, không độc – không phóng xạ, kháng khuẩn chống mốc và thấp carbon thân thiện môi trường. Nhờ đó, hệ Xám phù hợp cho cả không gian dân dụng cao cấp lẫn khu vực thương mại lưu lượng lớn — nơi đòi hỏi bề mặt vừa thẩm mỹ vừa bền bỉ theo thời gian.",
    "heritage": "SUNCREATE (建研晟创) là thương hiệu đá vô cơ thuộc Tập đoàn Kiến trúc Quảng Châu (广州建筑集团) — doanh nghiệp lọt Top 500 thế giới (Fortune Global 500, 2025) — cùng Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研). Toàn bộ danh mục gồm 204 mã màu thuộc 11 hệ màu, nhập khẩu và phân phối tại Việt Nam bởi Huayue.",
    "technicalSpecs": [
      {
        "label": "Loại vật liệu",
        "value": "Đá vô cơ đúc sẵn cao cấp (高品质预制型无机石材)"
      },
      {
        "label": "Hệ màu",
        "value": "Xám"
      },
      {
        "label": "Bề mặt",
        "value": "Đánh bóng — độ bóng cao, đặc chắc (高光高致密)"
      },
      {
        "label": "8 đặc tính",
        "value": "Chống mài mòn · chống bẩn · độ bóng cao · chống cháy · thiết kế linh hoạt · không độc/phóng xạ · thấp carbon · kháng khuẩn"
      },
      {
        "label": "Nhà sản xuất",
        "value": "SUNCREATE 建研晟创 (广州建筑集团 · Fortune 500)"
      },
      {
        "label": "Ứng dụng",
        "value": "Sàn/tường dân dụng & thương mại, mặt tiền, sảnh lớn"
      }
    ],
    "manufacturing": [
      "SUNCREATE (建研晟创) — đá vô cơ đúc sẵn cao cấp (无机石材), hậu thuẫn kỹ thuật từ Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研)",
      "Công nghệ ép đúc vật liệu vô cơ đặc chắc + mài bóng đạt độ bóng cao, độ phẳng và độ cứng bề mặt ổn định",
      "204 mã màu thuộc 11 hệ màu — bảng màu phong phú từ trắng/xám/đen tới dòng cao cấp Ngự & nghệ thuật terrazzo",
      "Cung ứng theo quy cách tấm tiêu chuẩn, cắt & gia công theo yêu cầu dự án"
    ],
    "careGuide": [
      {
        "title": "Vệ sinh hằng ngày",
        "desc": "Lau bằng khăn mềm ẩm; tránh vật cứng cào xước và hóa chất tẩy mạnh có tính axit/kiềm cao."
      },
      {
        "title": "Xử lý vết bẩn",
        "desc": "Lau sớm vết dầu/nước màu; bề mặt đặc chắc ít thấm nên dễ làm sạch."
      },
      {
        "title": "Khu vực lưu lượng cao",
        "desc": "Đặt thảm chùi chân ở lối vào để giảm cát sạn mài mòn bề mặt."
      },
      {
        "title": "Bảo dưỡng định kỳ",
        "desc": "Kiểm tra mạch, xử lý kịp thời các khe hở để giữ bề mặt phẳng đẹp lâu dài."
      }
    ],
    "installation": [
      "Chuẩn bị mặt nền phẳng, sạch, khô; xác định bố cục mạch và hướng vân trước khi thi công",
      "Dùng keo/vữa dán chuyên dụng cho đá; căn chỉnh mạch khít, phẳng mặt",
      "Cắt & mài cạnh theo kích thước thực tế; xử lý góc, khe co giãn hợp lý",
      "Vệ sinh bề mặt sau thi công, nghiệm thu độ phẳng và độ đồng màu"
    ],
    "certifications": [
      "Nhà sản xuất: 广州建研晟创 SUNCREATE — thành viên Tập đoàn Kiến trúc Quảng Châu (广州建筑集团)",
      "广州建筑集团 — Fortune Global 500 (Top 500 doanh nghiệp lớn nhất thế giới) 2025",
      "Đá vô cơ: không độc, không phóng xạ (无毒无辐射) — an toàn cho không gian trong nhà",
      "Kháng khuẩn chống mốc & chống cháy cấp cao — phù hợp không gian công cộng, lưu lượng lớn",
      "Nhập khẩu, phân phối & hỗ trợ bảo hành tại Việt Nam bởi Huayue"
    ],
    "packaging": [
      {
        "label": "Hình thức cung ứng",
        "value": "Tấm đá vô cơ đúc sẵn, đóng kiện theo quy cách"
      },
      {
        "label": "Quy cách",
        "value": "Theo quy cách tấm tiêu chuẩn — liên hệ Huayue để biết kích thước & báo giá"
      },
      {
        "label": "Bảo vệ vận chuyển",
        "value": "Kê góc, chèn lót, kiện gỗ/khung thép cho tấm lớn, giảm sứt vỡ khi vận chuyển"
      },
      {
        "label": "Dịch vụ",
        "value": "Tư vấn chọn màu → báo giá DDP → giao hàng → hỗ trợ đổi trả nếu lỗi (qua Huayue)"
      }
    ],
    "whyChoose": [
      {
        "icon": "🛡️",
        "title": "Siêu chống mài mòn",
        "desc": "Bề mặt vô cơ đặc chắc, chịu mài mòn cao — bền đẹp cả ở khu vực đi lại nhiều."
      },
      {
        "icon": "🔥",
        "title": "Chống cháy đỉnh cao",
        "desc": "Vật liệu vô cơ không bắt lửa, chống cháy cấp cao — an tâm cho không gian công cộng."
      },
      {
        "icon": "☢️",
        "title": "Không độc – không phóng xạ",
        "desc": "An toàn cho sức khỏe, dùng được trong nhà, phòng ngủ, không gian trẻ em."
      },
      {
        "icon": "🦠",
        "title": "Kháng khuẩn chống mốc",
        "desc": "Bề mặt đặc, ít thấm — hạn chế vi khuẩn và nấm mốc, dễ vệ sinh."
      },
      {
        "icon": "✨",
        "title": "Độ bóng cao & đặc chắc",
        "desc": "Đánh bóng đạt độ bóng cao (高光高致密), sáng đẹp và ít bám bẩn."
      },
      {
        "icon": "🌿",
        "title": "Thấp carbon, thân thiện MT",
        "desc": "Quy trình thấp carbon, thân thiện môi trường — lựa chọn bền vững."
      }
    ],
    "projectShowcase": [
      "Sảnh & hành lang toà nhà thương mại, khách sạn",
      "Mặt tiền & không gian trưng bày dự án",
      "Nhà ở cao cấp, biệt thự, showroom"
    ],
    "faq": [
      {
        "q": "Đá vô cơ SUNCREATE khác gì đá terrazzo gốc nhựa / đá nhân tạo?",
        "a": "Đây là đá vô cơ (无机石) gốc chất kết dính vô cơ — chống cháy cấp cao, không độc, không phóng xạ và thấp carbon; khác với đá nhân tạo/terrazzo gốc nhựa (resin)."
      },
      {
        "q": "Có an toàn để dùng trong nhà không?",
        "a": "Có. Đá vô cơ không độc, không phóng xạ (无毒无辐射), kháng khuẩn chống mốc — an toàn cho phòng khách, phòng ngủ, không gian trẻ em và khu vực công cộng."
      },
      {
        "q": "Có bao nhiêu màu để chọn?",
        "a": "204 mã màu thuộc 11 hệ màu: trắng, xám, đen, đỏ, nâu, vàng be, xanh lá, xanh dương, vân tơ tằm, dòng cao cấp Ngự và dòng nghệ thuật terrazzo."
      },
      {
        "q": "Mua & báo giá tại Việt Nam thế nào?",
        "a": "Liên hệ Huayue — nhà nhập khẩu & phân phối tại Việt Nam — để nhận mẫu, quy cách tấm, báo giá DDP và hỗ trợ thi công."
      }
    ]
  },
  "TK": {
    "story": "Đá vô cơ SUNCREATE hệ Đen mang sắc đen sâu, sang trọng và mạnh mẽ, được đúc sẵn dạng tấm từ vật liệu vô cơ đặc chắc và mài bóng đạt độ bóng cao. Không chỉ đẹp, nhóm màu này còn hội tụ 8 đặc tính của đá vô cơ SUNCREATE: siêu chống mài mòn, chống bám bẩn, độ bóng cao & đặc chắc, chống cháy đỉnh cao, tính thiết kế cao, không độc – không phóng xạ, kháng khuẩn chống mốc và thấp carbon thân thiện môi trường. Nhờ đó, hệ Đen phù hợp cho cả không gian dân dụng cao cấp lẫn khu vực thương mại lưu lượng lớn — nơi đòi hỏi bề mặt vừa thẩm mỹ vừa bền bỉ theo thời gian.",
    "heritage": "SUNCREATE (建研晟创) là thương hiệu đá vô cơ thuộc Tập đoàn Kiến trúc Quảng Châu (广州建筑集团) — doanh nghiệp lọt Top 500 thế giới (Fortune Global 500, 2025) — cùng Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研). Toàn bộ danh mục gồm 204 mã màu thuộc 11 hệ màu, nhập khẩu và phân phối tại Việt Nam bởi Huayue.",
    "technicalSpecs": [
      {
        "label": "Loại vật liệu",
        "value": "Đá vô cơ đúc sẵn cao cấp (高品质预制型无机石材)"
      },
      {
        "label": "Hệ màu",
        "value": "Đen"
      },
      {
        "label": "Bề mặt",
        "value": "Đánh bóng — độ bóng cao, đặc chắc (高光高致密)"
      },
      {
        "label": "8 đặc tính",
        "value": "Chống mài mòn · chống bẩn · độ bóng cao · chống cháy · thiết kế linh hoạt · không độc/phóng xạ · thấp carbon · kháng khuẩn"
      },
      {
        "label": "Nhà sản xuất",
        "value": "SUNCREATE 建研晟创 (广州建筑集团 · Fortune 500)"
      },
      {
        "label": "Ứng dụng",
        "value": "Sàn/tường dân dụng & thương mại, mặt tiền, sảnh lớn"
      }
    ],
    "manufacturing": [
      "SUNCREATE (建研晟创) — đá vô cơ đúc sẵn cao cấp (无机石材), hậu thuẫn kỹ thuật từ Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研)",
      "Công nghệ ép đúc vật liệu vô cơ đặc chắc + mài bóng đạt độ bóng cao, độ phẳng và độ cứng bề mặt ổn định",
      "204 mã màu thuộc 11 hệ màu — bảng màu phong phú từ trắng/xám/đen tới dòng cao cấp Ngự & nghệ thuật terrazzo",
      "Cung ứng theo quy cách tấm tiêu chuẩn, cắt & gia công theo yêu cầu dự án"
    ],
    "careGuide": [
      {
        "title": "Vệ sinh hằng ngày",
        "desc": "Lau bằng khăn mềm ẩm; tránh vật cứng cào xước và hóa chất tẩy mạnh có tính axit/kiềm cao."
      },
      {
        "title": "Xử lý vết bẩn",
        "desc": "Lau sớm vết dầu/nước màu; bề mặt đặc chắc ít thấm nên dễ làm sạch."
      },
      {
        "title": "Khu vực lưu lượng cao",
        "desc": "Đặt thảm chùi chân ở lối vào để giảm cát sạn mài mòn bề mặt."
      },
      {
        "title": "Bảo dưỡng định kỳ",
        "desc": "Kiểm tra mạch, xử lý kịp thời các khe hở để giữ bề mặt phẳng đẹp lâu dài."
      }
    ],
    "installation": [
      "Chuẩn bị mặt nền phẳng, sạch, khô; xác định bố cục mạch và hướng vân trước khi thi công",
      "Dùng keo/vữa dán chuyên dụng cho đá; căn chỉnh mạch khít, phẳng mặt",
      "Cắt & mài cạnh theo kích thước thực tế; xử lý góc, khe co giãn hợp lý",
      "Vệ sinh bề mặt sau thi công, nghiệm thu độ phẳng và độ đồng màu"
    ],
    "certifications": [
      "Nhà sản xuất: 广州建研晟创 SUNCREATE — thành viên Tập đoàn Kiến trúc Quảng Châu (广州建筑集团)",
      "广州建筑集团 — Fortune Global 500 (Top 500 doanh nghiệp lớn nhất thế giới) 2025",
      "Đá vô cơ: không độc, không phóng xạ (无毒无辐射) — an toàn cho không gian trong nhà",
      "Kháng khuẩn chống mốc & chống cháy cấp cao — phù hợp không gian công cộng, lưu lượng lớn",
      "Nhập khẩu, phân phối & hỗ trợ bảo hành tại Việt Nam bởi Huayue"
    ],
    "packaging": [
      {
        "label": "Hình thức cung ứng",
        "value": "Tấm đá vô cơ đúc sẵn, đóng kiện theo quy cách"
      },
      {
        "label": "Quy cách",
        "value": "Theo quy cách tấm tiêu chuẩn — liên hệ Huayue để biết kích thước & báo giá"
      },
      {
        "label": "Bảo vệ vận chuyển",
        "value": "Kê góc, chèn lót, kiện gỗ/khung thép cho tấm lớn, giảm sứt vỡ khi vận chuyển"
      },
      {
        "label": "Dịch vụ",
        "value": "Tư vấn chọn màu → báo giá DDP → giao hàng → hỗ trợ đổi trả nếu lỗi (qua Huayue)"
      }
    ],
    "whyChoose": [
      {
        "icon": "🛡️",
        "title": "Siêu chống mài mòn",
        "desc": "Bề mặt vô cơ đặc chắc, chịu mài mòn cao — bền đẹp cả ở khu vực đi lại nhiều."
      },
      {
        "icon": "🔥",
        "title": "Chống cháy đỉnh cao",
        "desc": "Vật liệu vô cơ không bắt lửa, chống cháy cấp cao — an tâm cho không gian công cộng."
      },
      {
        "icon": "☢️",
        "title": "Không độc – không phóng xạ",
        "desc": "An toàn cho sức khỏe, dùng được trong nhà, phòng ngủ, không gian trẻ em."
      },
      {
        "icon": "🦠",
        "title": "Kháng khuẩn chống mốc",
        "desc": "Bề mặt đặc, ít thấm — hạn chế vi khuẩn và nấm mốc, dễ vệ sinh."
      },
      {
        "icon": "✨",
        "title": "Độ bóng cao & đặc chắc",
        "desc": "Đánh bóng đạt độ bóng cao (高光高致密), sáng đẹp và ít bám bẩn."
      },
      {
        "icon": "🌿",
        "title": "Thấp carbon, thân thiện MT",
        "desc": "Quy trình thấp carbon, thân thiện môi trường — lựa chọn bền vững."
      }
    ],
    "projectShowcase": [
      "Sảnh & hành lang toà nhà thương mại, khách sạn",
      "Mặt tiền & không gian trưng bày dự án",
      "Nhà ở cao cấp, biệt thự, showroom"
    ],
    "faq": [
      {
        "q": "Đá vô cơ SUNCREATE khác gì đá terrazzo gốc nhựa / đá nhân tạo?",
        "a": "Đây là đá vô cơ (无机石) gốc chất kết dính vô cơ — chống cháy cấp cao, không độc, không phóng xạ và thấp carbon; khác với đá nhân tạo/terrazzo gốc nhựa (resin)."
      },
      {
        "q": "Có an toàn để dùng trong nhà không?",
        "a": "Có. Đá vô cơ không độc, không phóng xạ (无毒无辐射), kháng khuẩn chống mốc — an toàn cho phòng khách, phòng ngủ, không gian trẻ em và khu vực công cộng."
      },
      {
        "q": "Có bao nhiêu màu để chọn?",
        "a": "204 mã màu thuộc 11 hệ màu: trắng, xám, đen, đỏ, nâu, vàng be, xanh lá, xanh dương, vân tơ tằm, dòng cao cấp Ngự và dòng nghệ thuật terrazzo."
      },
      {
        "q": "Mua & báo giá tại Việt Nam thế nào?",
        "a": "Liên hệ Huayue — nhà nhập khẩu & phân phối tại Việt Nam — để nhận mẫu, quy cách tấm, báo giá DDP và hỗ trợ thi công."
      }
    ]
  },
  "TR": {
    "story": "Đá vô cơ SUNCREATE hệ Đỏ mang sắc đỏ ấm, nổi bật và ấn tượng, được đúc sẵn dạng tấm từ vật liệu vô cơ đặc chắc và mài bóng đạt độ bóng cao. Không chỉ đẹp, nhóm màu này còn hội tụ 8 đặc tính của đá vô cơ SUNCREATE: siêu chống mài mòn, chống bám bẩn, độ bóng cao & đặc chắc, chống cháy đỉnh cao, tính thiết kế cao, không độc – không phóng xạ, kháng khuẩn chống mốc và thấp carbon thân thiện môi trường. Nhờ đó, hệ Đỏ phù hợp cho cả không gian dân dụng cao cấp lẫn khu vực thương mại lưu lượng lớn — nơi đòi hỏi bề mặt vừa thẩm mỹ vừa bền bỉ theo thời gian.",
    "heritage": "SUNCREATE (建研晟创) là thương hiệu đá vô cơ thuộc Tập đoàn Kiến trúc Quảng Châu (广州建筑集团) — doanh nghiệp lọt Top 500 thế giới (Fortune Global 500, 2025) — cùng Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研). Toàn bộ danh mục gồm 204 mã màu thuộc 11 hệ màu, nhập khẩu và phân phối tại Việt Nam bởi Huayue.",
    "technicalSpecs": [
      {
        "label": "Loại vật liệu",
        "value": "Đá vô cơ đúc sẵn cao cấp (高品质预制型无机石材)"
      },
      {
        "label": "Hệ màu",
        "value": "Đỏ"
      },
      {
        "label": "Bề mặt",
        "value": "Đánh bóng — độ bóng cao, đặc chắc (高光高致密)"
      },
      {
        "label": "8 đặc tính",
        "value": "Chống mài mòn · chống bẩn · độ bóng cao · chống cháy · thiết kế linh hoạt · không độc/phóng xạ · thấp carbon · kháng khuẩn"
      },
      {
        "label": "Nhà sản xuất",
        "value": "SUNCREATE 建研晟创 (广州建筑集团 · Fortune 500)"
      },
      {
        "label": "Ứng dụng",
        "value": "Sàn/tường dân dụng & thương mại, mặt tiền, sảnh lớn"
      }
    ],
    "manufacturing": [
      "SUNCREATE (建研晟创) — đá vô cơ đúc sẵn cao cấp (无机石材), hậu thuẫn kỹ thuật từ Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研)",
      "Công nghệ ép đúc vật liệu vô cơ đặc chắc + mài bóng đạt độ bóng cao, độ phẳng và độ cứng bề mặt ổn định",
      "204 mã màu thuộc 11 hệ màu — bảng màu phong phú từ trắng/xám/đen tới dòng cao cấp Ngự & nghệ thuật terrazzo",
      "Cung ứng theo quy cách tấm tiêu chuẩn, cắt & gia công theo yêu cầu dự án"
    ],
    "careGuide": [
      {
        "title": "Vệ sinh hằng ngày",
        "desc": "Lau bằng khăn mềm ẩm; tránh vật cứng cào xước và hóa chất tẩy mạnh có tính axit/kiềm cao."
      },
      {
        "title": "Xử lý vết bẩn",
        "desc": "Lau sớm vết dầu/nước màu; bề mặt đặc chắc ít thấm nên dễ làm sạch."
      },
      {
        "title": "Khu vực lưu lượng cao",
        "desc": "Đặt thảm chùi chân ở lối vào để giảm cát sạn mài mòn bề mặt."
      },
      {
        "title": "Bảo dưỡng định kỳ",
        "desc": "Kiểm tra mạch, xử lý kịp thời các khe hở để giữ bề mặt phẳng đẹp lâu dài."
      }
    ],
    "installation": [
      "Chuẩn bị mặt nền phẳng, sạch, khô; xác định bố cục mạch và hướng vân trước khi thi công",
      "Dùng keo/vữa dán chuyên dụng cho đá; căn chỉnh mạch khít, phẳng mặt",
      "Cắt & mài cạnh theo kích thước thực tế; xử lý góc, khe co giãn hợp lý",
      "Vệ sinh bề mặt sau thi công, nghiệm thu độ phẳng và độ đồng màu"
    ],
    "certifications": [
      "Nhà sản xuất: 广州建研晟创 SUNCREATE — thành viên Tập đoàn Kiến trúc Quảng Châu (广州建筑集团)",
      "广州建筑集团 — Fortune Global 500 (Top 500 doanh nghiệp lớn nhất thế giới) 2025",
      "Đá vô cơ: không độc, không phóng xạ (无毒无辐射) — an toàn cho không gian trong nhà",
      "Kháng khuẩn chống mốc & chống cháy cấp cao — phù hợp không gian công cộng, lưu lượng lớn",
      "Nhập khẩu, phân phối & hỗ trợ bảo hành tại Việt Nam bởi Huayue"
    ],
    "packaging": [
      {
        "label": "Hình thức cung ứng",
        "value": "Tấm đá vô cơ đúc sẵn, đóng kiện theo quy cách"
      },
      {
        "label": "Quy cách",
        "value": "Theo quy cách tấm tiêu chuẩn — liên hệ Huayue để biết kích thước & báo giá"
      },
      {
        "label": "Bảo vệ vận chuyển",
        "value": "Kê góc, chèn lót, kiện gỗ/khung thép cho tấm lớn, giảm sứt vỡ khi vận chuyển"
      },
      {
        "label": "Dịch vụ",
        "value": "Tư vấn chọn màu → báo giá DDP → giao hàng → hỗ trợ đổi trả nếu lỗi (qua Huayue)"
      }
    ],
    "whyChoose": [
      {
        "icon": "🛡️",
        "title": "Siêu chống mài mòn",
        "desc": "Bề mặt vô cơ đặc chắc, chịu mài mòn cao — bền đẹp cả ở khu vực đi lại nhiều."
      },
      {
        "icon": "🔥",
        "title": "Chống cháy đỉnh cao",
        "desc": "Vật liệu vô cơ không bắt lửa, chống cháy cấp cao — an tâm cho không gian công cộng."
      },
      {
        "icon": "☢️",
        "title": "Không độc – không phóng xạ",
        "desc": "An toàn cho sức khỏe, dùng được trong nhà, phòng ngủ, không gian trẻ em."
      },
      {
        "icon": "🦠",
        "title": "Kháng khuẩn chống mốc",
        "desc": "Bề mặt đặc, ít thấm — hạn chế vi khuẩn và nấm mốc, dễ vệ sinh."
      },
      {
        "icon": "✨",
        "title": "Độ bóng cao & đặc chắc",
        "desc": "Đánh bóng đạt độ bóng cao (高光高致密), sáng đẹp và ít bám bẩn."
      },
      {
        "icon": "🌿",
        "title": "Thấp carbon, thân thiện MT",
        "desc": "Quy trình thấp carbon, thân thiện môi trường — lựa chọn bền vững."
      }
    ],
    "projectShowcase": [
      "Sảnh & hành lang toà nhà thương mại, khách sạn",
      "Mặt tiền & không gian trưng bày dự án",
      "Nhà ở cao cấp, biệt thự, showroom"
    ],
    "faq": [
      {
        "q": "Đá vô cơ SUNCREATE khác gì đá terrazzo gốc nhựa / đá nhân tạo?",
        "a": "Đây là đá vô cơ (无机石) gốc chất kết dính vô cơ — chống cháy cấp cao, không độc, không phóng xạ và thấp carbon; khác với đá nhân tạo/terrazzo gốc nhựa (resin)."
      },
      {
        "q": "Có an toàn để dùng trong nhà không?",
        "a": "Có. Đá vô cơ không độc, không phóng xạ (无毒无辐射), kháng khuẩn chống mốc — an toàn cho phòng khách, phòng ngủ, không gian trẻ em và khu vực công cộng."
      },
      {
        "q": "Có bao nhiêu màu để chọn?",
        "a": "204 mã màu thuộc 11 hệ màu: trắng, xám, đen, đỏ, nâu, vàng be, xanh lá, xanh dương, vân tơ tằm, dòng cao cấp Ngự và dòng nghệ thuật terrazzo."
      },
      {
        "q": "Mua & báo giá tại Việt Nam thế nào?",
        "a": "Liên hệ Huayue — nhà nhập khẩu & phân phối tại Việt Nam — để nhận mẫu, quy cách tấm, báo giá DDP và hỗ trợ thi công."
      }
    ]
  },
  "TC": {
    "story": "Đá vô cơ SUNCREATE hệ Nâu cà phê mang tông nâu cà phê trầm ấm, được đúc sẵn dạng tấm từ vật liệu vô cơ đặc chắc và mài bóng đạt độ bóng cao. Không chỉ đẹp, nhóm màu này còn hội tụ 8 đặc tính của đá vô cơ SUNCREATE: siêu chống mài mòn, chống bám bẩn, độ bóng cao & đặc chắc, chống cháy đỉnh cao, tính thiết kế cao, không độc – không phóng xạ, kháng khuẩn chống mốc và thấp carbon thân thiện môi trường. Nhờ đó, hệ Nâu cà phê phù hợp cho cả không gian dân dụng cao cấp lẫn khu vực thương mại lưu lượng lớn — nơi đòi hỏi bề mặt vừa thẩm mỹ vừa bền bỉ theo thời gian.",
    "heritage": "SUNCREATE (建研晟创) là thương hiệu đá vô cơ thuộc Tập đoàn Kiến trúc Quảng Châu (广州建筑集团) — doanh nghiệp lọt Top 500 thế giới (Fortune Global 500, 2025) — cùng Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研). Toàn bộ danh mục gồm 204 mã màu thuộc 11 hệ màu, nhập khẩu và phân phối tại Việt Nam bởi Huayue.",
    "technicalSpecs": [
      {
        "label": "Loại vật liệu",
        "value": "Đá vô cơ đúc sẵn cao cấp (高品质预制型无机石材)"
      },
      {
        "label": "Hệ màu",
        "value": "Nâu cà phê"
      },
      {
        "label": "Bề mặt",
        "value": "Đánh bóng — độ bóng cao, đặc chắc (高光高致密)"
      },
      {
        "label": "8 đặc tính",
        "value": "Chống mài mòn · chống bẩn · độ bóng cao · chống cháy · thiết kế linh hoạt · không độc/phóng xạ · thấp carbon · kháng khuẩn"
      },
      {
        "label": "Nhà sản xuất",
        "value": "SUNCREATE 建研晟创 (广州建筑集团 · Fortune 500)"
      },
      {
        "label": "Ứng dụng",
        "value": "Sàn/tường dân dụng & thương mại, mặt tiền, sảnh lớn"
      }
    ],
    "manufacturing": [
      "SUNCREATE (建研晟创) — đá vô cơ đúc sẵn cao cấp (无机石材), hậu thuẫn kỹ thuật từ Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研)",
      "Công nghệ ép đúc vật liệu vô cơ đặc chắc + mài bóng đạt độ bóng cao, độ phẳng và độ cứng bề mặt ổn định",
      "204 mã màu thuộc 11 hệ màu — bảng màu phong phú từ trắng/xám/đen tới dòng cao cấp Ngự & nghệ thuật terrazzo",
      "Cung ứng theo quy cách tấm tiêu chuẩn, cắt & gia công theo yêu cầu dự án"
    ],
    "careGuide": [
      {
        "title": "Vệ sinh hằng ngày",
        "desc": "Lau bằng khăn mềm ẩm; tránh vật cứng cào xước và hóa chất tẩy mạnh có tính axit/kiềm cao."
      },
      {
        "title": "Xử lý vết bẩn",
        "desc": "Lau sớm vết dầu/nước màu; bề mặt đặc chắc ít thấm nên dễ làm sạch."
      },
      {
        "title": "Khu vực lưu lượng cao",
        "desc": "Đặt thảm chùi chân ở lối vào để giảm cát sạn mài mòn bề mặt."
      },
      {
        "title": "Bảo dưỡng định kỳ",
        "desc": "Kiểm tra mạch, xử lý kịp thời các khe hở để giữ bề mặt phẳng đẹp lâu dài."
      }
    ],
    "installation": [
      "Chuẩn bị mặt nền phẳng, sạch, khô; xác định bố cục mạch và hướng vân trước khi thi công",
      "Dùng keo/vữa dán chuyên dụng cho đá; căn chỉnh mạch khít, phẳng mặt",
      "Cắt & mài cạnh theo kích thước thực tế; xử lý góc, khe co giãn hợp lý",
      "Vệ sinh bề mặt sau thi công, nghiệm thu độ phẳng và độ đồng màu"
    ],
    "certifications": [
      "Nhà sản xuất: 广州建研晟创 SUNCREATE — thành viên Tập đoàn Kiến trúc Quảng Châu (广州建筑集团)",
      "广州建筑集团 — Fortune Global 500 (Top 500 doanh nghiệp lớn nhất thế giới) 2025",
      "Đá vô cơ: không độc, không phóng xạ (无毒无辐射) — an toàn cho không gian trong nhà",
      "Kháng khuẩn chống mốc & chống cháy cấp cao — phù hợp không gian công cộng, lưu lượng lớn",
      "Nhập khẩu, phân phối & hỗ trợ bảo hành tại Việt Nam bởi Huayue"
    ],
    "packaging": [
      {
        "label": "Hình thức cung ứng",
        "value": "Tấm đá vô cơ đúc sẵn, đóng kiện theo quy cách"
      },
      {
        "label": "Quy cách",
        "value": "Theo quy cách tấm tiêu chuẩn — liên hệ Huayue để biết kích thước & báo giá"
      },
      {
        "label": "Bảo vệ vận chuyển",
        "value": "Kê góc, chèn lót, kiện gỗ/khung thép cho tấm lớn, giảm sứt vỡ khi vận chuyển"
      },
      {
        "label": "Dịch vụ",
        "value": "Tư vấn chọn màu → báo giá DDP → giao hàng → hỗ trợ đổi trả nếu lỗi (qua Huayue)"
      }
    ],
    "whyChoose": [
      {
        "icon": "🛡️",
        "title": "Siêu chống mài mòn",
        "desc": "Bề mặt vô cơ đặc chắc, chịu mài mòn cao — bền đẹp cả ở khu vực đi lại nhiều."
      },
      {
        "icon": "🔥",
        "title": "Chống cháy đỉnh cao",
        "desc": "Vật liệu vô cơ không bắt lửa, chống cháy cấp cao — an tâm cho không gian công cộng."
      },
      {
        "icon": "☢️",
        "title": "Không độc – không phóng xạ",
        "desc": "An toàn cho sức khỏe, dùng được trong nhà, phòng ngủ, không gian trẻ em."
      },
      {
        "icon": "🦠",
        "title": "Kháng khuẩn chống mốc",
        "desc": "Bề mặt đặc, ít thấm — hạn chế vi khuẩn và nấm mốc, dễ vệ sinh."
      },
      {
        "icon": "✨",
        "title": "Độ bóng cao & đặc chắc",
        "desc": "Đánh bóng đạt độ bóng cao (高光高致密), sáng đẹp và ít bám bẩn."
      },
      {
        "icon": "🌿",
        "title": "Thấp carbon, thân thiện MT",
        "desc": "Quy trình thấp carbon, thân thiện môi trường — lựa chọn bền vững."
      }
    ],
    "projectShowcase": [
      "Sảnh & hành lang toà nhà thương mại, khách sạn",
      "Mặt tiền & không gian trưng bày dự án",
      "Nhà ở cao cấp, biệt thự, showroom"
    ],
    "faq": [
      {
        "q": "Đá vô cơ SUNCREATE khác gì đá terrazzo gốc nhựa / đá nhân tạo?",
        "a": "Đây là đá vô cơ (无机石) gốc chất kết dính vô cơ — chống cháy cấp cao, không độc, không phóng xạ và thấp carbon; khác với đá nhân tạo/terrazzo gốc nhựa (resin)."
      },
      {
        "q": "Có an toàn để dùng trong nhà không?",
        "a": "Có. Đá vô cơ không độc, không phóng xạ (无毒无辐射), kháng khuẩn chống mốc — an toàn cho phòng khách, phòng ngủ, không gian trẻ em và khu vực công cộng."
      },
      {
        "q": "Có bao nhiêu màu để chọn?",
        "a": "204 mã màu thuộc 11 hệ màu: trắng, xám, đen, đỏ, nâu, vàng be, xanh lá, xanh dương, vân tơ tằm, dòng cao cấp Ngự và dòng nghệ thuật terrazzo."
      },
      {
        "q": "Mua & báo giá tại Việt Nam thế nào?",
        "a": "Liên hệ Huayue — nhà nhập khẩu & phân phối tại Việt Nam — để nhận mẫu, quy cách tấm, báo giá DDP và hỗ trợ thi công."
      }
    ]
  },
  "TY": {
    "story": "Đá vô cơ SUNCREATE hệ Vàng be mang sắc vàng be ấm áp, gần gũi, được đúc sẵn dạng tấm từ vật liệu vô cơ đặc chắc và mài bóng đạt độ bóng cao. Không chỉ đẹp, nhóm màu này còn hội tụ 8 đặc tính của đá vô cơ SUNCREATE: siêu chống mài mòn, chống bám bẩn, độ bóng cao & đặc chắc, chống cháy đỉnh cao, tính thiết kế cao, không độc – không phóng xạ, kháng khuẩn chống mốc và thấp carbon thân thiện môi trường. Nhờ đó, hệ Vàng be phù hợp cho cả không gian dân dụng cao cấp lẫn khu vực thương mại lưu lượng lớn — nơi đòi hỏi bề mặt vừa thẩm mỹ vừa bền bỉ theo thời gian.",
    "heritage": "SUNCREATE (建研晟创) là thương hiệu đá vô cơ thuộc Tập đoàn Kiến trúc Quảng Châu (广州建筑集团) — doanh nghiệp lọt Top 500 thế giới (Fortune Global 500, 2025) — cùng Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研). Toàn bộ danh mục gồm 204 mã màu thuộc 11 hệ màu, nhập khẩu và phân phối tại Việt Nam bởi Huayue.",
    "technicalSpecs": [
      {
        "label": "Loại vật liệu",
        "value": "Đá vô cơ đúc sẵn cao cấp (高品质预制型无机石材)"
      },
      {
        "label": "Hệ màu",
        "value": "Vàng be"
      },
      {
        "label": "Bề mặt",
        "value": "Đánh bóng — độ bóng cao, đặc chắc (高光高致密)"
      },
      {
        "label": "8 đặc tính",
        "value": "Chống mài mòn · chống bẩn · độ bóng cao · chống cháy · thiết kế linh hoạt · không độc/phóng xạ · thấp carbon · kháng khuẩn"
      },
      {
        "label": "Nhà sản xuất",
        "value": "SUNCREATE 建研晟创 (广州建筑集团 · Fortune 500)"
      },
      {
        "label": "Ứng dụng",
        "value": "Sàn/tường dân dụng & thương mại, mặt tiền, sảnh lớn"
      }
    ],
    "manufacturing": [
      "SUNCREATE (建研晟创) — đá vô cơ đúc sẵn cao cấp (无机石材), hậu thuẫn kỹ thuật từ Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研)",
      "Công nghệ ép đúc vật liệu vô cơ đặc chắc + mài bóng đạt độ bóng cao, độ phẳng và độ cứng bề mặt ổn định",
      "204 mã màu thuộc 11 hệ màu — bảng màu phong phú từ trắng/xám/đen tới dòng cao cấp Ngự & nghệ thuật terrazzo",
      "Cung ứng theo quy cách tấm tiêu chuẩn, cắt & gia công theo yêu cầu dự án"
    ],
    "careGuide": [
      {
        "title": "Vệ sinh hằng ngày",
        "desc": "Lau bằng khăn mềm ẩm; tránh vật cứng cào xước và hóa chất tẩy mạnh có tính axit/kiềm cao."
      },
      {
        "title": "Xử lý vết bẩn",
        "desc": "Lau sớm vết dầu/nước màu; bề mặt đặc chắc ít thấm nên dễ làm sạch."
      },
      {
        "title": "Khu vực lưu lượng cao",
        "desc": "Đặt thảm chùi chân ở lối vào để giảm cát sạn mài mòn bề mặt."
      },
      {
        "title": "Bảo dưỡng định kỳ",
        "desc": "Kiểm tra mạch, xử lý kịp thời các khe hở để giữ bề mặt phẳng đẹp lâu dài."
      }
    ],
    "installation": [
      "Chuẩn bị mặt nền phẳng, sạch, khô; xác định bố cục mạch và hướng vân trước khi thi công",
      "Dùng keo/vữa dán chuyên dụng cho đá; căn chỉnh mạch khít, phẳng mặt",
      "Cắt & mài cạnh theo kích thước thực tế; xử lý góc, khe co giãn hợp lý",
      "Vệ sinh bề mặt sau thi công, nghiệm thu độ phẳng và độ đồng màu"
    ],
    "certifications": [
      "Nhà sản xuất: 广州建研晟创 SUNCREATE — thành viên Tập đoàn Kiến trúc Quảng Châu (广州建筑集团)",
      "广州建筑集团 — Fortune Global 500 (Top 500 doanh nghiệp lớn nhất thế giới) 2025",
      "Đá vô cơ: không độc, không phóng xạ (无毒无辐射) — an toàn cho không gian trong nhà",
      "Kháng khuẩn chống mốc & chống cháy cấp cao — phù hợp không gian công cộng, lưu lượng lớn",
      "Nhập khẩu, phân phối & hỗ trợ bảo hành tại Việt Nam bởi Huayue"
    ],
    "packaging": [
      {
        "label": "Hình thức cung ứng",
        "value": "Tấm đá vô cơ đúc sẵn, đóng kiện theo quy cách"
      },
      {
        "label": "Quy cách",
        "value": "Theo quy cách tấm tiêu chuẩn — liên hệ Huayue để biết kích thước & báo giá"
      },
      {
        "label": "Bảo vệ vận chuyển",
        "value": "Kê góc, chèn lót, kiện gỗ/khung thép cho tấm lớn, giảm sứt vỡ khi vận chuyển"
      },
      {
        "label": "Dịch vụ",
        "value": "Tư vấn chọn màu → báo giá DDP → giao hàng → hỗ trợ đổi trả nếu lỗi (qua Huayue)"
      }
    ],
    "whyChoose": [
      {
        "icon": "🛡️",
        "title": "Siêu chống mài mòn",
        "desc": "Bề mặt vô cơ đặc chắc, chịu mài mòn cao — bền đẹp cả ở khu vực đi lại nhiều."
      },
      {
        "icon": "🔥",
        "title": "Chống cháy đỉnh cao",
        "desc": "Vật liệu vô cơ không bắt lửa, chống cháy cấp cao — an tâm cho không gian công cộng."
      },
      {
        "icon": "☢️",
        "title": "Không độc – không phóng xạ",
        "desc": "An toàn cho sức khỏe, dùng được trong nhà, phòng ngủ, không gian trẻ em."
      },
      {
        "icon": "🦠",
        "title": "Kháng khuẩn chống mốc",
        "desc": "Bề mặt đặc, ít thấm — hạn chế vi khuẩn và nấm mốc, dễ vệ sinh."
      },
      {
        "icon": "✨",
        "title": "Độ bóng cao & đặc chắc",
        "desc": "Đánh bóng đạt độ bóng cao (高光高致密), sáng đẹp và ít bám bẩn."
      },
      {
        "icon": "🌿",
        "title": "Thấp carbon, thân thiện MT",
        "desc": "Quy trình thấp carbon, thân thiện môi trường — lựa chọn bền vững."
      }
    ],
    "projectShowcase": [
      "Sảnh & hành lang toà nhà thương mại, khách sạn",
      "Mặt tiền & không gian trưng bày dự án",
      "Nhà ở cao cấp, biệt thự, showroom"
    ],
    "faq": [
      {
        "q": "Đá vô cơ SUNCREATE khác gì đá terrazzo gốc nhựa / đá nhân tạo?",
        "a": "Đây là đá vô cơ (无机石) gốc chất kết dính vô cơ — chống cháy cấp cao, không độc, không phóng xạ và thấp carbon; khác với đá nhân tạo/terrazzo gốc nhựa (resin)."
      },
      {
        "q": "Có an toàn để dùng trong nhà không?",
        "a": "Có. Đá vô cơ không độc, không phóng xạ (无毒无辐射), kháng khuẩn chống mốc — an toàn cho phòng khách, phòng ngủ, không gian trẻ em và khu vực công cộng."
      },
      {
        "q": "Có bao nhiêu màu để chọn?",
        "a": "204 mã màu thuộc 11 hệ màu: trắng, xám, đen, đỏ, nâu, vàng be, xanh lá, xanh dương, vân tơ tằm, dòng cao cấp Ngự và dòng nghệ thuật terrazzo."
      },
      {
        "q": "Mua & báo giá tại Việt Nam thế nào?",
        "a": "Liên hệ Huayue — nhà nhập khẩu & phân phối tại Việt Nam — để nhận mẫu, quy cách tấm, báo giá DDP và hỗ trợ thi công."
      }
    ]
  },
  "TN": {
    "story": "Đá vô cơ SUNCREATE hệ Xanh lá mang sắc xanh lá tươi mát, gần với thiên nhiên, được đúc sẵn dạng tấm từ vật liệu vô cơ đặc chắc và mài bóng đạt độ bóng cao. Không chỉ đẹp, nhóm màu này còn hội tụ 8 đặc tính của đá vô cơ SUNCREATE: siêu chống mài mòn, chống bám bẩn, độ bóng cao & đặc chắc, chống cháy đỉnh cao, tính thiết kế cao, không độc – không phóng xạ, kháng khuẩn chống mốc và thấp carbon thân thiện môi trường. Nhờ đó, hệ Xanh lá phù hợp cho cả không gian dân dụng cao cấp lẫn khu vực thương mại lưu lượng lớn — nơi đòi hỏi bề mặt vừa thẩm mỹ vừa bền bỉ theo thời gian.",
    "heritage": "SUNCREATE (建研晟创) là thương hiệu đá vô cơ thuộc Tập đoàn Kiến trúc Quảng Châu (广州建筑集团) — doanh nghiệp lọt Top 500 thế giới (Fortune Global 500, 2025) — cùng Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研). Toàn bộ danh mục gồm 204 mã màu thuộc 11 hệ màu, nhập khẩu và phân phối tại Việt Nam bởi Huayue.",
    "technicalSpecs": [
      {
        "label": "Loại vật liệu",
        "value": "Đá vô cơ đúc sẵn cao cấp (高品质预制型无机石材)"
      },
      {
        "label": "Hệ màu",
        "value": "Xanh lá"
      },
      {
        "label": "Bề mặt",
        "value": "Đánh bóng — độ bóng cao, đặc chắc (高光高致密)"
      },
      {
        "label": "8 đặc tính",
        "value": "Chống mài mòn · chống bẩn · độ bóng cao · chống cháy · thiết kế linh hoạt · không độc/phóng xạ · thấp carbon · kháng khuẩn"
      },
      {
        "label": "Nhà sản xuất",
        "value": "SUNCREATE 建研晟创 (广州建筑集团 · Fortune 500)"
      },
      {
        "label": "Ứng dụng",
        "value": "Sàn/tường dân dụng & thương mại, mặt tiền, sảnh lớn"
      }
    ],
    "manufacturing": [
      "SUNCREATE (建研晟创) — đá vô cơ đúc sẵn cao cấp (无机石材), hậu thuẫn kỹ thuật từ Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研)",
      "Công nghệ ép đúc vật liệu vô cơ đặc chắc + mài bóng đạt độ bóng cao, độ phẳng và độ cứng bề mặt ổn định",
      "204 mã màu thuộc 11 hệ màu — bảng màu phong phú từ trắng/xám/đen tới dòng cao cấp Ngự & nghệ thuật terrazzo",
      "Cung ứng theo quy cách tấm tiêu chuẩn, cắt & gia công theo yêu cầu dự án"
    ],
    "careGuide": [
      {
        "title": "Vệ sinh hằng ngày",
        "desc": "Lau bằng khăn mềm ẩm; tránh vật cứng cào xước và hóa chất tẩy mạnh có tính axit/kiềm cao."
      },
      {
        "title": "Xử lý vết bẩn",
        "desc": "Lau sớm vết dầu/nước màu; bề mặt đặc chắc ít thấm nên dễ làm sạch."
      },
      {
        "title": "Khu vực lưu lượng cao",
        "desc": "Đặt thảm chùi chân ở lối vào để giảm cát sạn mài mòn bề mặt."
      },
      {
        "title": "Bảo dưỡng định kỳ",
        "desc": "Kiểm tra mạch, xử lý kịp thời các khe hở để giữ bề mặt phẳng đẹp lâu dài."
      }
    ],
    "installation": [
      "Chuẩn bị mặt nền phẳng, sạch, khô; xác định bố cục mạch và hướng vân trước khi thi công",
      "Dùng keo/vữa dán chuyên dụng cho đá; căn chỉnh mạch khít, phẳng mặt",
      "Cắt & mài cạnh theo kích thước thực tế; xử lý góc, khe co giãn hợp lý",
      "Vệ sinh bề mặt sau thi công, nghiệm thu độ phẳng và độ đồng màu"
    ],
    "certifications": [
      "Nhà sản xuất: 广州建研晟创 SUNCREATE — thành viên Tập đoàn Kiến trúc Quảng Châu (广州建筑集团)",
      "广州建筑集团 — Fortune Global 500 (Top 500 doanh nghiệp lớn nhất thế giới) 2025",
      "Đá vô cơ: không độc, không phóng xạ (无毒无辐射) — an toàn cho không gian trong nhà",
      "Kháng khuẩn chống mốc & chống cháy cấp cao — phù hợp không gian công cộng, lưu lượng lớn",
      "Nhập khẩu, phân phối & hỗ trợ bảo hành tại Việt Nam bởi Huayue"
    ],
    "packaging": [
      {
        "label": "Hình thức cung ứng",
        "value": "Tấm đá vô cơ đúc sẵn, đóng kiện theo quy cách"
      },
      {
        "label": "Quy cách",
        "value": "Theo quy cách tấm tiêu chuẩn — liên hệ Huayue để biết kích thước & báo giá"
      },
      {
        "label": "Bảo vệ vận chuyển",
        "value": "Kê góc, chèn lót, kiện gỗ/khung thép cho tấm lớn, giảm sứt vỡ khi vận chuyển"
      },
      {
        "label": "Dịch vụ",
        "value": "Tư vấn chọn màu → báo giá DDP → giao hàng → hỗ trợ đổi trả nếu lỗi (qua Huayue)"
      }
    ],
    "whyChoose": [
      {
        "icon": "🛡️",
        "title": "Siêu chống mài mòn",
        "desc": "Bề mặt vô cơ đặc chắc, chịu mài mòn cao — bền đẹp cả ở khu vực đi lại nhiều."
      },
      {
        "icon": "🔥",
        "title": "Chống cháy đỉnh cao",
        "desc": "Vật liệu vô cơ không bắt lửa, chống cháy cấp cao — an tâm cho không gian công cộng."
      },
      {
        "icon": "☢️",
        "title": "Không độc – không phóng xạ",
        "desc": "An toàn cho sức khỏe, dùng được trong nhà, phòng ngủ, không gian trẻ em."
      },
      {
        "icon": "🦠",
        "title": "Kháng khuẩn chống mốc",
        "desc": "Bề mặt đặc, ít thấm — hạn chế vi khuẩn và nấm mốc, dễ vệ sinh."
      },
      {
        "icon": "✨",
        "title": "Độ bóng cao & đặc chắc",
        "desc": "Đánh bóng đạt độ bóng cao (高光高致密), sáng đẹp và ít bám bẩn."
      },
      {
        "icon": "🌿",
        "title": "Thấp carbon, thân thiện MT",
        "desc": "Quy trình thấp carbon, thân thiện môi trường — lựa chọn bền vững."
      }
    ],
    "projectShowcase": [
      "Sảnh & hành lang toà nhà thương mại, khách sạn",
      "Mặt tiền & không gian trưng bày dự án",
      "Nhà ở cao cấp, biệt thự, showroom"
    ],
    "faq": [
      {
        "q": "Đá vô cơ SUNCREATE khác gì đá terrazzo gốc nhựa / đá nhân tạo?",
        "a": "Đây là đá vô cơ (无机石) gốc chất kết dính vô cơ — chống cháy cấp cao, không độc, không phóng xạ và thấp carbon; khác với đá nhân tạo/terrazzo gốc nhựa (resin)."
      },
      {
        "q": "Có an toàn để dùng trong nhà không?",
        "a": "Có. Đá vô cơ không độc, không phóng xạ (无毒无辐射), kháng khuẩn chống mốc — an toàn cho phòng khách, phòng ngủ, không gian trẻ em và khu vực công cộng."
      },
      {
        "q": "Có bao nhiêu màu để chọn?",
        "a": "204 mã màu thuộc 11 hệ màu: trắng, xám, đen, đỏ, nâu, vàng be, xanh lá, xanh dương, vân tơ tằm, dòng cao cấp Ngự và dòng nghệ thuật terrazzo."
      },
      {
        "q": "Mua & báo giá tại Việt Nam thế nào?",
        "a": "Liên hệ Huayue — nhà nhập khẩu & phân phối tại Việt Nam — để nhận mẫu, quy cách tấm, báo giá DDP và hỗ trợ thi công."
      }
    ]
  },
  "TB": {
    "story": "Đá vô cơ SUNCREATE hệ Xanh dương mang sắc xanh dương mát mắt, tinh khiết, được đúc sẵn dạng tấm từ vật liệu vô cơ đặc chắc và mài bóng đạt độ bóng cao. Không chỉ đẹp, nhóm màu này còn hội tụ 8 đặc tính của đá vô cơ SUNCREATE: siêu chống mài mòn, chống bám bẩn, độ bóng cao & đặc chắc, chống cháy đỉnh cao, tính thiết kế cao, không độc – không phóng xạ, kháng khuẩn chống mốc và thấp carbon thân thiện môi trường. Nhờ đó, hệ Xanh dương phù hợp cho cả không gian dân dụng cao cấp lẫn khu vực thương mại lưu lượng lớn — nơi đòi hỏi bề mặt vừa thẩm mỹ vừa bền bỉ theo thời gian.",
    "heritage": "SUNCREATE (建研晟创) là thương hiệu đá vô cơ thuộc Tập đoàn Kiến trúc Quảng Châu (广州建筑集团) — doanh nghiệp lọt Top 500 thế giới (Fortune Global 500, 2025) — cùng Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研). Toàn bộ danh mục gồm 204 mã màu thuộc 11 hệ màu, nhập khẩu và phân phối tại Việt Nam bởi Huayue.",
    "technicalSpecs": [
      {
        "label": "Loại vật liệu",
        "value": "Đá vô cơ đúc sẵn cao cấp (高品质预制型无机石材)"
      },
      {
        "label": "Hệ màu",
        "value": "Xanh dương"
      },
      {
        "label": "Bề mặt",
        "value": "Đánh bóng — độ bóng cao, đặc chắc (高光高致密)"
      },
      {
        "label": "8 đặc tính",
        "value": "Chống mài mòn · chống bẩn · độ bóng cao · chống cháy · thiết kế linh hoạt · không độc/phóng xạ · thấp carbon · kháng khuẩn"
      },
      {
        "label": "Nhà sản xuất",
        "value": "SUNCREATE 建研晟创 (广州建筑集团 · Fortune 500)"
      },
      {
        "label": "Ứng dụng",
        "value": "Sàn/tường dân dụng & thương mại, mặt tiền, sảnh lớn"
      }
    ],
    "manufacturing": [
      "SUNCREATE (建研晟创) — đá vô cơ đúc sẵn cao cấp (无机石材), hậu thuẫn kỹ thuật từ Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研)",
      "Công nghệ ép đúc vật liệu vô cơ đặc chắc + mài bóng đạt độ bóng cao, độ phẳng và độ cứng bề mặt ổn định",
      "204 mã màu thuộc 11 hệ màu — bảng màu phong phú từ trắng/xám/đen tới dòng cao cấp Ngự & nghệ thuật terrazzo",
      "Cung ứng theo quy cách tấm tiêu chuẩn, cắt & gia công theo yêu cầu dự án"
    ],
    "careGuide": [
      {
        "title": "Vệ sinh hằng ngày",
        "desc": "Lau bằng khăn mềm ẩm; tránh vật cứng cào xước và hóa chất tẩy mạnh có tính axit/kiềm cao."
      },
      {
        "title": "Xử lý vết bẩn",
        "desc": "Lau sớm vết dầu/nước màu; bề mặt đặc chắc ít thấm nên dễ làm sạch."
      },
      {
        "title": "Khu vực lưu lượng cao",
        "desc": "Đặt thảm chùi chân ở lối vào để giảm cát sạn mài mòn bề mặt."
      },
      {
        "title": "Bảo dưỡng định kỳ",
        "desc": "Kiểm tra mạch, xử lý kịp thời các khe hở để giữ bề mặt phẳng đẹp lâu dài."
      }
    ],
    "installation": [
      "Chuẩn bị mặt nền phẳng, sạch, khô; xác định bố cục mạch và hướng vân trước khi thi công",
      "Dùng keo/vữa dán chuyên dụng cho đá; căn chỉnh mạch khít, phẳng mặt",
      "Cắt & mài cạnh theo kích thước thực tế; xử lý góc, khe co giãn hợp lý",
      "Vệ sinh bề mặt sau thi công, nghiệm thu độ phẳng và độ đồng màu"
    ],
    "certifications": [
      "Nhà sản xuất: 广州建研晟创 SUNCREATE — thành viên Tập đoàn Kiến trúc Quảng Châu (广州建筑集团)",
      "广州建筑集团 — Fortune Global 500 (Top 500 doanh nghiệp lớn nhất thế giới) 2025",
      "Đá vô cơ: không độc, không phóng xạ (无毒无辐射) — an toàn cho không gian trong nhà",
      "Kháng khuẩn chống mốc & chống cháy cấp cao — phù hợp không gian công cộng, lưu lượng lớn",
      "Nhập khẩu, phân phối & hỗ trợ bảo hành tại Việt Nam bởi Huayue"
    ],
    "packaging": [
      {
        "label": "Hình thức cung ứng",
        "value": "Tấm đá vô cơ đúc sẵn, đóng kiện theo quy cách"
      },
      {
        "label": "Quy cách",
        "value": "Theo quy cách tấm tiêu chuẩn — liên hệ Huayue để biết kích thước & báo giá"
      },
      {
        "label": "Bảo vệ vận chuyển",
        "value": "Kê góc, chèn lót, kiện gỗ/khung thép cho tấm lớn, giảm sứt vỡ khi vận chuyển"
      },
      {
        "label": "Dịch vụ",
        "value": "Tư vấn chọn màu → báo giá DDP → giao hàng → hỗ trợ đổi trả nếu lỗi (qua Huayue)"
      }
    ],
    "whyChoose": [
      {
        "icon": "🛡️",
        "title": "Siêu chống mài mòn",
        "desc": "Bề mặt vô cơ đặc chắc, chịu mài mòn cao — bền đẹp cả ở khu vực đi lại nhiều."
      },
      {
        "icon": "🔥",
        "title": "Chống cháy đỉnh cao",
        "desc": "Vật liệu vô cơ không bắt lửa, chống cháy cấp cao — an tâm cho không gian công cộng."
      },
      {
        "icon": "☢️",
        "title": "Không độc – không phóng xạ",
        "desc": "An toàn cho sức khỏe, dùng được trong nhà, phòng ngủ, không gian trẻ em."
      },
      {
        "icon": "🦠",
        "title": "Kháng khuẩn chống mốc",
        "desc": "Bề mặt đặc, ít thấm — hạn chế vi khuẩn và nấm mốc, dễ vệ sinh."
      },
      {
        "icon": "✨",
        "title": "Độ bóng cao & đặc chắc",
        "desc": "Đánh bóng đạt độ bóng cao (高光高致密), sáng đẹp và ít bám bẩn."
      },
      {
        "icon": "🌿",
        "title": "Thấp carbon, thân thiện MT",
        "desc": "Quy trình thấp carbon, thân thiện môi trường — lựa chọn bền vững."
      }
    ],
    "projectShowcase": [
      "Sảnh & hành lang toà nhà thương mại, khách sạn",
      "Mặt tiền & không gian trưng bày dự án",
      "Nhà ở cao cấp, biệt thự, showroom"
    ],
    "faq": [
      {
        "q": "Đá vô cơ SUNCREATE khác gì đá terrazzo gốc nhựa / đá nhân tạo?",
        "a": "Đây là đá vô cơ (无机石) gốc chất kết dính vô cơ — chống cháy cấp cao, không độc, không phóng xạ và thấp carbon; khác với đá nhân tạo/terrazzo gốc nhựa (resin)."
      },
      {
        "q": "Có an toàn để dùng trong nhà không?",
        "a": "Có. Đá vô cơ không độc, không phóng xạ (无毒无辐射), kháng khuẩn chống mốc — an toàn cho phòng khách, phòng ngủ, không gian trẻ em và khu vực công cộng."
      },
      {
        "q": "Có bao nhiêu màu để chọn?",
        "a": "204 mã màu thuộc 11 hệ màu: trắng, xám, đen, đỏ, nâu, vàng be, xanh lá, xanh dương, vân tơ tằm, dòng cao cấp Ngự và dòng nghệ thuật terrazzo."
      },
      {
        "q": "Mua & báo giá tại Việt Nam thế nào?",
        "a": "Liên hệ Huayue — nhà nhập khẩu & phân phối tại Việt Nam — để nhận mẫu, quy cách tấm, báo giá DDP và hỗ trợ thi công."
      }
    ]
  },
  "TL": {
    "story": "Đá vô cơ SUNCREATE hệ Vân tơ tằm mang vân tơ tằm mềm mại, tinh tế, được đúc sẵn dạng tấm từ vật liệu vô cơ đặc chắc và mài bóng đạt độ bóng cao. Không chỉ đẹp, nhóm màu này còn hội tụ 8 đặc tính của đá vô cơ SUNCREATE: siêu chống mài mòn, chống bám bẩn, độ bóng cao & đặc chắc, chống cháy đỉnh cao, tính thiết kế cao, không độc – không phóng xạ, kháng khuẩn chống mốc và thấp carbon thân thiện môi trường. Nhờ đó, hệ Vân tơ tằm phù hợp cho cả không gian dân dụng cao cấp lẫn khu vực thương mại lưu lượng lớn — nơi đòi hỏi bề mặt vừa thẩm mỹ vừa bền bỉ theo thời gian.",
    "heritage": "SUNCREATE (建研晟创) là thương hiệu đá vô cơ thuộc Tập đoàn Kiến trúc Quảng Châu (广州建筑集团) — doanh nghiệp lọt Top 500 thế giới (Fortune Global 500, 2025) — cùng Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研). Toàn bộ danh mục gồm 204 mã màu thuộc 11 hệ màu, nhập khẩu và phân phối tại Việt Nam bởi Huayue.",
    "technicalSpecs": [
      {
        "label": "Loại vật liệu",
        "value": "Đá vô cơ đúc sẵn cao cấp (高品质预制型无机石材)"
      },
      {
        "label": "Hệ màu",
        "value": "Vân tơ tằm"
      },
      {
        "label": "Bề mặt",
        "value": "Đánh bóng — độ bóng cao, đặc chắc (高光高致密)"
      },
      {
        "label": "8 đặc tính",
        "value": "Chống mài mòn · chống bẩn · độ bóng cao · chống cháy · thiết kế linh hoạt · không độc/phóng xạ · thấp carbon · kháng khuẩn"
      },
      {
        "label": "Nhà sản xuất",
        "value": "SUNCREATE 建研晟创 (广州建筑集团 · Fortune 500)"
      },
      {
        "label": "Ứng dụng",
        "value": "Sàn/tường dân dụng & thương mại, mặt tiền, sảnh lớn"
      }
    ],
    "manufacturing": [
      "SUNCREATE (建研晟创) — đá vô cơ đúc sẵn cao cấp (无机石材), hậu thuẫn kỹ thuật từ Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研)",
      "Công nghệ ép đúc vật liệu vô cơ đặc chắc + mài bóng đạt độ bóng cao, độ phẳng và độ cứng bề mặt ổn định",
      "204 mã màu thuộc 11 hệ màu — bảng màu phong phú từ trắng/xám/đen tới dòng cao cấp Ngự & nghệ thuật terrazzo",
      "Cung ứng theo quy cách tấm tiêu chuẩn, cắt & gia công theo yêu cầu dự án"
    ],
    "careGuide": [
      {
        "title": "Vệ sinh hằng ngày",
        "desc": "Lau bằng khăn mềm ẩm; tránh vật cứng cào xước và hóa chất tẩy mạnh có tính axit/kiềm cao."
      },
      {
        "title": "Xử lý vết bẩn",
        "desc": "Lau sớm vết dầu/nước màu; bề mặt đặc chắc ít thấm nên dễ làm sạch."
      },
      {
        "title": "Khu vực lưu lượng cao",
        "desc": "Đặt thảm chùi chân ở lối vào để giảm cát sạn mài mòn bề mặt."
      },
      {
        "title": "Bảo dưỡng định kỳ",
        "desc": "Kiểm tra mạch, xử lý kịp thời các khe hở để giữ bề mặt phẳng đẹp lâu dài."
      }
    ],
    "installation": [
      "Chuẩn bị mặt nền phẳng, sạch, khô; xác định bố cục mạch và hướng vân trước khi thi công",
      "Dùng keo/vữa dán chuyên dụng cho đá; căn chỉnh mạch khít, phẳng mặt",
      "Cắt & mài cạnh theo kích thước thực tế; xử lý góc, khe co giãn hợp lý",
      "Vệ sinh bề mặt sau thi công, nghiệm thu độ phẳng và độ đồng màu"
    ],
    "certifications": [
      "Nhà sản xuất: 广州建研晟创 SUNCREATE — thành viên Tập đoàn Kiến trúc Quảng Châu (广州建筑集团)",
      "广州建筑集团 — Fortune Global 500 (Top 500 doanh nghiệp lớn nhất thế giới) 2025",
      "Đá vô cơ: không độc, không phóng xạ (无毒无辐射) — an toàn cho không gian trong nhà",
      "Kháng khuẩn chống mốc & chống cháy cấp cao — phù hợp không gian công cộng, lưu lượng lớn",
      "Nhập khẩu, phân phối & hỗ trợ bảo hành tại Việt Nam bởi Huayue"
    ],
    "packaging": [
      {
        "label": "Hình thức cung ứng",
        "value": "Tấm đá vô cơ đúc sẵn, đóng kiện theo quy cách"
      },
      {
        "label": "Quy cách",
        "value": "Theo quy cách tấm tiêu chuẩn — liên hệ Huayue để biết kích thước & báo giá"
      },
      {
        "label": "Bảo vệ vận chuyển",
        "value": "Kê góc, chèn lót, kiện gỗ/khung thép cho tấm lớn, giảm sứt vỡ khi vận chuyển"
      },
      {
        "label": "Dịch vụ",
        "value": "Tư vấn chọn màu → báo giá DDP → giao hàng → hỗ trợ đổi trả nếu lỗi (qua Huayue)"
      }
    ],
    "whyChoose": [
      {
        "icon": "🛡️",
        "title": "Siêu chống mài mòn",
        "desc": "Bề mặt vô cơ đặc chắc, chịu mài mòn cao — bền đẹp cả ở khu vực đi lại nhiều."
      },
      {
        "icon": "🔥",
        "title": "Chống cháy đỉnh cao",
        "desc": "Vật liệu vô cơ không bắt lửa, chống cháy cấp cao — an tâm cho không gian công cộng."
      },
      {
        "icon": "☢️",
        "title": "Không độc – không phóng xạ",
        "desc": "An toàn cho sức khỏe, dùng được trong nhà, phòng ngủ, không gian trẻ em."
      },
      {
        "icon": "🦠",
        "title": "Kháng khuẩn chống mốc",
        "desc": "Bề mặt đặc, ít thấm — hạn chế vi khuẩn và nấm mốc, dễ vệ sinh."
      },
      {
        "icon": "✨",
        "title": "Độ bóng cao & đặc chắc",
        "desc": "Đánh bóng đạt độ bóng cao (高光高致密), sáng đẹp và ít bám bẩn."
      },
      {
        "icon": "🌿",
        "title": "Thấp carbon, thân thiện MT",
        "desc": "Quy trình thấp carbon, thân thiện môi trường — lựa chọn bền vững."
      }
    ],
    "projectShowcase": [
      "Sảnh & hành lang toà nhà thương mại, khách sạn",
      "Mặt tiền & không gian trưng bày dự án",
      "Nhà ở cao cấp, biệt thự, showroom"
    ],
    "faq": [
      {
        "q": "Đá vô cơ SUNCREATE khác gì đá terrazzo gốc nhựa / đá nhân tạo?",
        "a": "Đây là đá vô cơ (无机石) gốc chất kết dính vô cơ — chống cháy cấp cao, không độc, không phóng xạ và thấp carbon; khác với đá nhân tạo/terrazzo gốc nhựa (resin)."
      },
      {
        "q": "Có an toàn để dùng trong nhà không?",
        "a": "Có. Đá vô cơ không độc, không phóng xạ (无毒无辐射), kháng khuẩn chống mốc — an toàn cho phòng khách, phòng ngủ, không gian trẻ em và khu vực công cộng."
      },
      {
        "q": "Có bao nhiêu màu để chọn?",
        "a": "204 mã màu thuộc 11 hệ màu: trắng, xám, đen, đỏ, nâu, vàng be, xanh lá, xanh dương, vân tơ tằm, dòng cao cấp Ngự và dòng nghệ thuật terrazzo."
      },
      {
        "q": "Mua & báo giá tại Việt Nam thế nào?",
        "a": "Liên hệ Huayue — nhà nhập khẩu & phân phối tại Việt Nam — để nhận mẫu, quy cách tấm, báo giá DDP và hỗ trợ thi công."
      }
    ]
  },
  "YCR": {
    "story": "Đá vô cơ SUNCREATE hệ Cao cấp (dòng Ngự) mang dòng cao cấp 'Ngự' — vân đá phong phú, đẳng cấp, được đúc sẵn dạng tấm từ vật liệu vô cơ đặc chắc và mài bóng đạt độ bóng cao. Không chỉ đẹp, nhóm màu này còn hội tụ 8 đặc tính của đá vô cơ SUNCREATE: siêu chống mài mòn, chống bám bẩn, độ bóng cao & đặc chắc, chống cháy đỉnh cao, tính thiết kế cao, không độc – không phóng xạ, kháng khuẩn chống mốc và thấp carbon thân thiện môi trường. Nhờ đó, hệ Cao cấp (dòng Ngự) phù hợp cho cả không gian dân dụng cao cấp lẫn khu vực thương mại lưu lượng lớn — nơi đòi hỏi bề mặt vừa thẩm mỹ vừa bền bỉ theo thời gian.",
    "heritage": "SUNCREATE (建研晟创) là thương hiệu đá vô cơ thuộc Tập đoàn Kiến trúc Quảng Châu (广州建筑集团) — doanh nghiệp lọt Top 500 thế giới (Fortune Global 500, 2025) — cùng Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研). Toàn bộ danh mục gồm 204 mã màu thuộc 11 hệ màu, nhập khẩu và phân phối tại Việt Nam bởi Huayue.",
    "technicalSpecs": [
      {
        "label": "Loại vật liệu",
        "value": "Đá vô cơ đúc sẵn cao cấp (高品质预制型无机石材)"
      },
      {
        "label": "Hệ màu",
        "value": "Cao cấp (dòng Ngự)"
      },
      {
        "label": "Bề mặt",
        "value": "Đánh bóng — độ bóng cao, đặc chắc (高光高致密)"
      },
      {
        "label": "8 đặc tính",
        "value": "Chống mài mòn · chống bẩn · độ bóng cao · chống cháy · thiết kế linh hoạt · không độc/phóng xạ · thấp carbon · kháng khuẩn"
      },
      {
        "label": "Nhà sản xuất",
        "value": "SUNCREATE 建研晟创 (广州建筑集团 · Fortune 500)"
      },
      {
        "label": "Ứng dụng",
        "value": "Sàn/tường dân dụng & thương mại, mặt tiền, sảnh lớn"
      }
    ],
    "manufacturing": [
      "SUNCREATE (建研晟创) — đá vô cơ đúc sẵn cao cấp (无机石材), hậu thuẫn kỹ thuật từ Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研)",
      "Công nghệ ép đúc vật liệu vô cơ đặc chắc + mài bóng đạt độ bóng cao, độ phẳng và độ cứng bề mặt ổn định",
      "204 mã màu thuộc 11 hệ màu — bảng màu phong phú từ trắng/xám/đen tới dòng cao cấp Ngự & nghệ thuật terrazzo",
      "Cung ứng theo quy cách tấm tiêu chuẩn, cắt & gia công theo yêu cầu dự án"
    ],
    "careGuide": [
      {
        "title": "Vệ sinh hằng ngày",
        "desc": "Lau bằng khăn mềm ẩm; tránh vật cứng cào xước và hóa chất tẩy mạnh có tính axit/kiềm cao."
      },
      {
        "title": "Xử lý vết bẩn",
        "desc": "Lau sớm vết dầu/nước màu; bề mặt đặc chắc ít thấm nên dễ làm sạch."
      },
      {
        "title": "Khu vực lưu lượng cao",
        "desc": "Đặt thảm chùi chân ở lối vào để giảm cát sạn mài mòn bề mặt."
      },
      {
        "title": "Bảo dưỡng định kỳ",
        "desc": "Kiểm tra mạch, xử lý kịp thời các khe hở để giữ bề mặt phẳng đẹp lâu dài."
      }
    ],
    "installation": [
      "Chuẩn bị mặt nền phẳng, sạch, khô; xác định bố cục mạch và hướng vân trước khi thi công",
      "Dùng keo/vữa dán chuyên dụng cho đá; căn chỉnh mạch khít, phẳng mặt",
      "Cắt & mài cạnh theo kích thước thực tế; xử lý góc, khe co giãn hợp lý",
      "Vệ sinh bề mặt sau thi công, nghiệm thu độ phẳng và độ đồng màu"
    ],
    "certifications": [
      "Nhà sản xuất: 广州建研晟创 SUNCREATE — thành viên Tập đoàn Kiến trúc Quảng Châu (广州建筑集团)",
      "广州建筑集团 — Fortune Global 500 (Top 500 doanh nghiệp lớn nhất thế giới) 2025",
      "Đá vô cơ: không độc, không phóng xạ (无毒无辐射) — an toàn cho không gian trong nhà",
      "Kháng khuẩn chống mốc & chống cháy cấp cao — phù hợp không gian công cộng, lưu lượng lớn",
      "Nhập khẩu, phân phối & hỗ trợ bảo hành tại Việt Nam bởi Huayue"
    ],
    "packaging": [
      {
        "label": "Hình thức cung ứng",
        "value": "Tấm đá vô cơ đúc sẵn, đóng kiện theo quy cách"
      },
      {
        "label": "Quy cách",
        "value": "Theo quy cách tấm tiêu chuẩn — liên hệ Huayue để biết kích thước & báo giá"
      },
      {
        "label": "Bảo vệ vận chuyển",
        "value": "Kê góc, chèn lót, kiện gỗ/khung thép cho tấm lớn, giảm sứt vỡ khi vận chuyển"
      },
      {
        "label": "Dịch vụ",
        "value": "Tư vấn chọn màu → báo giá DDP → giao hàng → hỗ trợ đổi trả nếu lỗi (qua Huayue)"
      }
    ],
    "whyChoose": [
      {
        "icon": "🛡️",
        "title": "Siêu chống mài mòn",
        "desc": "Bề mặt vô cơ đặc chắc, chịu mài mòn cao — bền đẹp cả ở khu vực đi lại nhiều."
      },
      {
        "icon": "🔥",
        "title": "Chống cháy đỉnh cao",
        "desc": "Vật liệu vô cơ không bắt lửa, chống cháy cấp cao — an tâm cho không gian công cộng."
      },
      {
        "icon": "☢️",
        "title": "Không độc – không phóng xạ",
        "desc": "An toàn cho sức khỏe, dùng được trong nhà, phòng ngủ, không gian trẻ em."
      },
      {
        "icon": "🦠",
        "title": "Kháng khuẩn chống mốc",
        "desc": "Bề mặt đặc, ít thấm — hạn chế vi khuẩn và nấm mốc, dễ vệ sinh."
      },
      {
        "icon": "✨",
        "title": "Độ bóng cao & đặc chắc",
        "desc": "Đánh bóng đạt độ bóng cao (高光高致密), sáng đẹp và ít bám bẩn."
      },
      {
        "icon": "🌿",
        "title": "Thấp carbon, thân thiện MT",
        "desc": "Quy trình thấp carbon, thân thiện môi trường — lựa chọn bền vững."
      }
    ],
    "projectShowcase": [
      "Sảnh & hành lang toà nhà thương mại, khách sạn",
      "Mặt tiền & không gian trưng bày dự án",
      "Nhà ở cao cấp, biệt thự, showroom"
    ],
    "faq": [
      {
        "q": "Đá vô cơ SUNCREATE khác gì đá terrazzo gốc nhựa / đá nhân tạo?",
        "a": "Đây là đá vô cơ (无机石) gốc chất kết dính vô cơ — chống cháy cấp cao, không độc, không phóng xạ và thấp carbon; khác với đá nhân tạo/terrazzo gốc nhựa (resin)."
      },
      {
        "q": "Có an toàn để dùng trong nhà không?",
        "a": "Có. Đá vô cơ không độc, không phóng xạ (无毒无辐射), kháng khuẩn chống mốc — an toàn cho phòng khách, phòng ngủ, không gian trẻ em và khu vực công cộng."
      },
      {
        "q": "Có bao nhiêu màu để chọn?",
        "a": "204 mã màu thuộc 11 hệ màu: trắng, xám, đen, đỏ, nâu, vàng be, xanh lá, xanh dương, vân tơ tằm, dòng cao cấp Ngự và dòng nghệ thuật terrazzo."
      },
      {
        "q": "Mua & báo giá tại Việt Nam thế nào?",
        "a": "Liên hệ Huayue — nhà nhập khẩu & phân phối tại Việt Nam — để nhận mẫu, quy cách tấm, báo giá DDP và hỗ trợ thi công."
      }
    ]
  },
  "YCA": {
    "story": "Đá vô cơ SUNCREATE hệ Nghệ thuật mang dòng nghệ thuật terrazzo — hạt đá đa sắc, cá tính, được đúc sẵn dạng tấm từ vật liệu vô cơ đặc chắc và mài bóng đạt độ bóng cao. Không chỉ đẹp, nhóm màu này còn hội tụ 8 đặc tính của đá vô cơ SUNCREATE: siêu chống mài mòn, chống bám bẩn, độ bóng cao & đặc chắc, chống cháy đỉnh cao, tính thiết kế cao, không độc – không phóng xạ, kháng khuẩn chống mốc và thấp carbon thân thiện môi trường. Nhờ đó, hệ Nghệ thuật phù hợp cho cả không gian dân dụng cao cấp lẫn khu vực thương mại lưu lượng lớn — nơi đòi hỏi bề mặt vừa thẩm mỹ vừa bền bỉ theo thời gian.",
    "heritage": "SUNCREATE (建研晟创) là thương hiệu đá vô cơ thuộc Tập đoàn Kiến trúc Quảng Châu (广州建筑集团) — doanh nghiệp lọt Top 500 thế giới (Fortune Global 500, 2025) — cùng Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研). Toàn bộ danh mục gồm 204 mã màu thuộc 11 hệ màu, nhập khẩu và phân phối tại Việt Nam bởi Huayue.",
    "technicalSpecs": [
      {
        "label": "Loại vật liệu",
        "value": "Đá vô cơ đúc sẵn cao cấp (高品质预制型无机石材)"
      },
      {
        "label": "Hệ màu",
        "value": "Nghệ thuật"
      },
      {
        "label": "Bề mặt",
        "value": "Đánh bóng — độ bóng cao, đặc chắc (高光高致密)"
      },
      {
        "label": "8 đặc tính",
        "value": "Chống mài mòn · chống bẩn · độ bóng cao · chống cháy · thiết kế linh hoạt · không độc/phóng xạ · thấp carbon · kháng khuẩn"
      },
      {
        "label": "Nhà sản xuất",
        "value": "SUNCREATE 建研晟创 (广州建筑集团 · Fortune 500)"
      },
      {
        "label": "Ứng dụng",
        "value": "Sàn/tường dân dụng & thương mại, mặt tiền, sảnh lớn"
      }
    ],
    "manufacturing": [
      "SUNCREATE (建研晟创) — đá vô cơ đúc sẵn cao cấp (无机石材), hậu thuẫn kỹ thuật từ Viện Nghiên cứu Kiến trúc Quảng Châu (广州建研)",
      "Công nghệ ép đúc vật liệu vô cơ đặc chắc + mài bóng đạt độ bóng cao, độ phẳng và độ cứng bề mặt ổn định",
      "204 mã màu thuộc 11 hệ màu — bảng màu phong phú từ trắng/xám/đen tới dòng cao cấp Ngự & nghệ thuật terrazzo",
      "Cung ứng theo quy cách tấm tiêu chuẩn, cắt & gia công theo yêu cầu dự án"
    ],
    "careGuide": [
      {
        "title": "Vệ sinh hằng ngày",
        "desc": "Lau bằng khăn mềm ẩm; tránh vật cứng cào xước và hóa chất tẩy mạnh có tính axit/kiềm cao."
      },
      {
        "title": "Xử lý vết bẩn",
        "desc": "Lau sớm vết dầu/nước màu; bề mặt đặc chắc ít thấm nên dễ làm sạch."
      },
      {
        "title": "Khu vực lưu lượng cao",
        "desc": "Đặt thảm chùi chân ở lối vào để giảm cát sạn mài mòn bề mặt."
      },
      {
        "title": "Bảo dưỡng định kỳ",
        "desc": "Kiểm tra mạch, xử lý kịp thời các khe hở để giữ bề mặt phẳng đẹp lâu dài."
      }
    ],
    "installation": [
      "Chuẩn bị mặt nền phẳng, sạch, khô; xác định bố cục mạch và hướng vân trước khi thi công",
      "Dùng keo/vữa dán chuyên dụng cho đá; căn chỉnh mạch khít, phẳng mặt",
      "Cắt & mài cạnh theo kích thước thực tế; xử lý góc, khe co giãn hợp lý",
      "Vệ sinh bề mặt sau thi công, nghiệm thu độ phẳng và độ đồng màu"
    ],
    "certifications": [
      "Nhà sản xuất: 广州建研晟创 SUNCREATE — thành viên Tập đoàn Kiến trúc Quảng Châu (广州建筑集团)",
      "广州建筑集团 — Fortune Global 500 (Top 500 doanh nghiệp lớn nhất thế giới) 2025",
      "Đá vô cơ: không độc, không phóng xạ (无毒无辐射) — an toàn cho không gian trong nhà",
      "Kháng khuẩn chống mốc & chống cháy cấp cao — phù hợp không gian công cộng, lưu lượng lớn",
      "Nhập khẩu, phân phối & hỗ trợ bảo hành tại Việt Nam bởi Huayue"
    ],
    "packaging": [
      {
        "label": "Hình thức cung ứng",
        "value": "Tấm đá vô cơ đúc sẵn, đóng kiện theo quy cách"
      },
      {
        "label": "Quy cách",
        "value": "Theo quy cách tấm tiêu chuẩn — liên hệ Huayue để biết kích thước & báo giá"
      },
      {
        "label": "Bảo vệ vận chuyển",
        "value": "Kê góc, chèn lót, kiện gỗ/khung thép cho tấm lớn, giảm sứt vỡ khi vận chuyển"
      },
      {
        "label": "Dịch vụ",
        "value": "Tư vấn chọn màu → báo giá DDP → giao hàng → hỗ trợ đổi trả nếu lỗi (qua Huayue)"
      }
    ],
    "whyChoose": [
      {
        "icon": "🛡️",
        "title": "Siêu chống mài mòn",
        "desc": "Bề mặt vô cơ đặc chắc, chịu mài mòn cao — bền đẹp cả ở khu vực đi lại nhiều."
      },
      {
        "icon": "🔥",
        "title": "Chống cháy đỉnh cao",
        "desc": "Vật liệu vô cơ không bắt lửa, chống cháy cấp cao — an tâm cho không gian công cộng."
      },
      {
        "icon": "☢️",
        "title": "Không độc – không phóng xạ",
        "desc": "An toàn cho sức khỏe, dùng được trong nhà, phòng ngủ, không gian trẻ em."
      },
      {
        "icon": "🦠",
        "title": "Kháng khuẩn chống mốc",
        "desc": "Bề mặt đặc, ít thấm — hạn chế vi khuẩn và nấm mốc, dễ vệ sinh."
      },
      {
        "icon": "✨",
        "title": "Độ bóng cao & đặc chắc",
        "desc": "Đánh bóng đạt độ bóng cao (高光高致密), sáng đẹp và ít bám bẩn."
      },
      {
        "icon": "🌿",
        "title": "Thấp carbon, thân thiện MT",
        "desc": "Quy trình thấp carbon, thân thiện môi trường — lựa chọn bền vững."
      }
    ],
    "projectShowcase": [
      "Sảnh & hành lang toà nhà thương mại, khách sạn",
      "Mặt tiền & không gian trưng bày dự án",
      "Nhà ở cao cấp, biệt thự, showroom"
    ],
    "faq": [
      {
        "q": "Đá vô cơ SUNCREATE khác gì đá terrazzo gốc nhựa / đá nhân tạo?",
        "a": "Đây là đá vô cơ (无机石) gốc chất kết dính vô cơ — chống cháy cấp cao, không độc, không phóng xạ và thấp carbon; khác với đá nhân tạo/terrazzo gốc nhựa (resin)."
      },
      {
        "q": "Có an toàn để dùng trong nhà không?",
        "a": "Có. Đá vô cơ không độc, không phóng xạ (无毒无辐射), kháng khuẩn chống mốc — an toàn cho phòng khách, phòng ngủ, không gian trẻ em và khu vực công cộng."
      },
      {
        "q": "Có bao nhiêu màu để chọn?",
        "a": "204 mã màu thuộc 11 hệ màu: trắng, xám, đen, đỏ, nâu, vàng be, xanh lá, xanh dương, vân tơ tằm, dòng cao cấp Ngự và dòng nghệ thuật terrazzo."
      },
      {
        "q": "Mua & báo giá tại Việt Nam thế nào?",
        "a": "Liên hệ Huayue — nhà nhập khẩu & phân phối tại Việt Nam — để nhận mẫu, quy cách tấm, báo giá DDP và hỗ trợ thi công."
      }
    ]
  }
};

/** Lấy metadata theo seriesOriginal (mã hệ màu), fallback về hệ Trắng (TW). */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return SUNCREATE_SERIES_META[seriesOriginal.trim()] || SUNCREATE_SERIES_META["TW"];
}
