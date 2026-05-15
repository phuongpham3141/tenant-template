/**
 * Blog data — articles for /info/industry-news.
 * Each article has slug, metadata, and full markdown-style content array.
 * Categories double as filter chips on the blog index.
 */

export type BlogCategory =
  | "xu-huong-gia"
  | "san-pham-moi"
  | "hoi-cho"
  | "chinh-sach-thue"
  | "case-study"
  | "phan-tich-thi-truong"
  | "huong-dan"
  | "ncc-profile";

export const CATEGORIES: Record<BlogCategory, { label: string; color: string }> = {
  "xu-huong-gia": { label: "Xu hướng giá", color: "var(--color-accent)" },
  "san-pham-moi": { label: "Sản phẩm mới", color: "#2A9D8F" },
  "hoi-cho": { label: "Hội chợ & Sự kiện", color: "#F4A261" },
  "chinh-sach-thue": { label: "Chính sách thuế", color: "#6B7880" },
  "case-study": { label: "Câu chuyện thành công", color: "#8B5CF6" },
  "phan-tich-thi-truong": { label: "Phân tích thị trường", color: "var(--color-brand)" },
  "huong-dan": { label: "Hướng dẫn sourcing", color: "#0EA5E9" },
  "ncc-profile": { label: "Profile NCC", color: "#D97706" },
};

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  authorRole: string;
  date: string;
  readMinutes: number;
  image: string;
  /** Tags for filtering and SEO. */
  tags: string[];
  /** Article body — array of paragraphs (string) or block objects. */
  content: BlogBlock[];
  featured?: boolean;
};

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "img"; src: string; caption?: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

const u = (id: string, w = 1200, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=70`;

export const ARTICLES: BlogArticle[] = [
  {
    slug: "xu-huong-gia-gom-su-foshan-q1-2026",
    title: "Xu hướng giá gốm sứ Foshan Q1/2026 — Tăng 8% do nhiên liệu",
    excerpt: "Phân tích biến động giá nguyên liệu, gas, electricity và tác động lên các nhà máy gốm sứ Foshan. Dự báo cho buyer Việt Nam và thời điểm nên đặt hàng.",
    category: "xu-huong-gia",
    author: "Trần Phương Thảo",
    authorRole: "Senior Sourcing Manager",
    date: "2026-04-28",
    readMinutes: 6,
    image: u("1565008447742-97f6f38c985c"),
    tags: ["Foshan", "Gốm sứ", "Giá", "Q1/2026"],
    featured: true,
    content: [
      { type: "p", text: "Tháng 3/2026, Hiệp hội Gốm sứ Quảng Đông công bố giá xuất xưởng trung bình ngành gốm sứ Foshan tăng 8% so với cùng kỳ năm trước. Đội Sourcing Cybersilkroads đã làm việc trực tiếp với 14 nhà máy đối tác tại Foshan trong 4 tuần qua để hiểu nguyên nhân và đưa ra khuyến nghị cho buyer Việt Nam." },
      { type: "h2", text: "3 nguyên nhân chính" },
      { type: "p", text: "Thứ nhất, giá khí đốt tự nhiên (LNG) sử dụng cho lò nung tăng 22% từ tháng 11/2025 do căng thẳng địa chính trị làm đảo lộn chuỗi cung từ Australia và Qatar. Lò nung gốm sứ tiêu thụ khí đốt chiếm 18-25% chi phí sản xuất, nên đây là cú đánh trực tiếp." },
      { type: "p", text: "Thứ hai, chi phí điện công nghiệp tại Quảng Đông tăng 6% sau cải cách giá điện tier-2 (cho doanh nghiệp lớn) áp dụng từ Q1/2026. Các nhà máy gốm sứ là khách hàng tier-2 điển hình." },
      { type: "p", text: "Thứ ba, lương công nhân lành nghề tăng 4-5% do cạnh tranh từ ngành điện tử Thâm Quyến và năng lượng mới. NCC top tier (Dongpeng, Monalisa, NewPearl) phải tăng lương để giữ thợ giỏi." },
      { type: "img", src: u("1551434678-e076c223a692", 1200, 500), caption: "Dây chuyền nung gốm sứ tại Foshan — chi phí năng lượng chiếm 25% giá thành" },
      { type: "h2", text: "Khuyến nghị cho buyer Việt Nam" },
      { type: "list", items: [
        "Đặt MOQ trước tháng 6/2026 — giá có thể tăng tiếp 3-5% trong Q3 nếu khí đốt tiếp tục biến động.",
        "Ưu tiên NCC có hệ thống lò điện thay vì lò gas — chi phí ổn định hơn (Monalisa, Foshan Orient Bath đã chuyển 60% lò sang điện).",
        "Đàm phán hợp đồng năm — Cybersilkroads đang giúp 8 đại lý Việt Nam khoá giá theo hợp đồng năm với 3 NCC top tier.",
        "Combine đơn — giảm phí vận chuyển bù phần tăng giá. Đơn ≥40HQ có giá DDP rẻ hơn 12-15% so với LCL.",
      ]},
      { type: "quote", text: "Tăng giá 8% là đáng kể nhưng không phải khủng hoảng. Buyer thông minh sẽ dùng đây làm cơ hội đàm phán hợp đồng dài hạn với NCC, khoá giá cho 12 tháng tới.", author: "Wang Lei — Country Manager Quảng Châu" },
      { type: "h2", text: "Tác động ngắn hạn vs dài hạn" },
      { type: "p", text: "Trong ngắn hạn (Q2-Q3/2026), buyer nhập gốm sứ từ Foshan sẽ thấy giá DDP tăng khoảng 3-5% (sau khi tính cước vận chuyển không đổi). Đối với đơn $50K, buyer có thể trả thêm $1,500-2,500." },
      { type: "p", text: "Dài hạn (2027+), Cybersilkroads dự báo giá ổn định trở lại khi LNG có nguồn cung mới từ Mỹ và các NCC chuyển sang lò điện. Đây cũng là cơ hội để các NCC trung-nhỏ áp dụng công nghệ mới, có thể giảm 5-10% chi phí và competitive hơn." },
    ],
  },
  {
    slug: "canton-fair-2026-phase-1-5-san-pham-viet-nam-nen-san",
    title: "Canton Fair 2026 — 5 sản phẩm Việt Nam nên săn",
    excerpt: "Từ 15/04 đến 05/05, Canton Fair phase 1 sẽ giới thiệu hàng nghìn sản phẩm mới. Cybersilkroads dẫn đoàn 30 buyer Việt Nam — đây là 5 ngành hàng được dự báo hot nhất.",
    category: "hoi-cho",
    author: "Nguyễn Văn Đức",
    authorRole: "Sourcing Director",
    date: "2026-04-25",
    readMinutes: 5,
    image: u("1505373877841-8d25f7d46678"),
    tags: ["Canton Fair", "2026", "Quảng Châu", "Hội chợ"],
    content: [
      { type: "p", text: "Canton Fair (Quảng Châu Spring Fair) phase 1 diễn ra từ 15/04 đến 05/05/2026 tại Pazhou Complex, Quảng Châu — sự kiện B2B lớn nhất thế giới với 25,000+ exhibitor và 200,000+ buyer toàn cầu. Cybersilkroads dẫn đoàn 30 buyer Việt Nam tham dự, bao gồm visa support, lịch B2B match-making với 80+ NCC pre-screened." },
      { type: "h2", text: "1. LED Smart Lighting — Tích hợp Wi-Fi Tuya" },
      { type: "p", text: "LED panel 60×60 với điều khiển Wi-Fi qua app Tuya/Smart Life đang là xu hướng cho dự án văn phòng và khách sạn. Giá DDP về Hà Nội $13-18/cái cho đơn ≥500 cái. Top NCC: Zhongshan Light, Foshan Lighting, Opple." },
      { type: "h2", text: "2. Bồn cầu thông minh — Phân khúc giữa" },
      { type: "p", text: "Smart toilet với sấy khô + nước ấm đã hết là 'cao cấp', giờ phổ thông cho căn hộ tầm trung Việt Nam. Phân khúc $180-280/cái có 14 NCC competitive tại Foshan. Ortonbaths, NewPearl, Dongpeng dẫn đầu về tỉ lệ buyer Việt Nam." },
      { type: "h2", text: "3. Sofa modular — Kích thước Bắc Âu" },
      { type: "p", text: "Sofa modular 4-7 ghế thiết kế Bắc Âu (góc cạnh thẳng, bọc velvet/bouclé) phổ biến trong căn hộ trẻ. Showroom Sài Gòn báo doanh số tăng 40% YoY. KUKA, ZuoYou, Landbond đều có booth lớn tại Canton Fair." },
      { type: "img", src: u("1540575467063-178a50c2df87", 1200, 500), caption: "Pazhou Complex — Canton Fair phase 1 chuyên về điện tử, đèn chiếu sáng, gia dụng" },
      { type: "h2", text: "4. Phụ kiện cửa nhôm — Hopo, Roto" },
      { type: "p", text: "Việt Nam đang có làn sóng cửa nhôm hệ Xingfa Class 100. Phụ kiện cao cấp Hopo (Trung Quốc) và Roto (Đức làm tại TQ) là điểm nhấn để contractor competitive. Đơn 500+ bộ giảm 18-22% so với phân phối nội địa Việt Nam." },
      { type: "h2", text: "5. Đèn LED studio cho TikTok creator" },
      { type: "p", text: "Niche nhưng growing fast — đèn LED panel ring + softbox cho creator nội dung. NCC tại Thâm Quyến (Godox, Aputure 1st-tier) và Quảng Châu (private label) ra mẫu mới mỗi quý. Đơn 100-300 unit price $35-65, retail Việt Nam bán $80-120." },
      { type: "quote", text: "Canton Fair không phải nơi mua hàng — đó là nơi gặp NCC, xem mẫu, đàm phán hợp đồng năm. Đoàn 30 buyer của Cybersilkroads năm nay tập trung vào đàm phán dài hạn thay vì spot order.", author: "Nguyễn Văn Đức — Sourcing Director" },
      { type: "h2", text: "Đăng ký tham gia đoàn" },
      { type: "p", text: "Cybersilkroads support 30 suất, mỗi suất bao gồm: visa Trung Quốc free, vé máy bay Hà Nội-Quảng Châu khứ hồi, khách sạn 4 sao 5 đêm gần Pazhou, lịch B2B match-making 1-on-1 với 80+ NCC, phiên dịch tiếng Trung 1 buyer-1 phiên dịch, transfer xe đến hội chợ. Phí đoàn $850/người (giá thị trường $2,500). Đăng ký trước 31/03." },
    ],
  },
  {
    slug: "thue-nhap-khau-noi-that-go-q1-2026-giam-5",
    title: "Thuế nhập khẩu nội thất gỗ Q1/2026 — Giảm 5%",
    excerpt: "Bộ Tài chính ban hành Thông tư mới giảm thuế MFN cho nội thất gỗ HS 9403 từ 25% xuống 20%. Phân tích tác động cho buyer nhập khẩu từ Trung Quốc.",
    category: "chinh-sach-thue",
    author: "Lê Hoàng Quân",
    authorRole: "Legal Counsel",
    date: "2026-04-20",
    readMinutes: 4,
    image: u("1556745757-8d76bdb6984b"),
    tags: ["Thuế", "Nội thất gỗ", "HS 9403", "MFN"],
    content: [
      { type: "p", text: "Thông tư 12/2026/TT-BTC ban hành ngày 15/04/2026 chính thức giảm thuế nhập khẩu MFN cho nhóm HS 9403 (nội thất gỗ và phụ kiện) từ 25% xuống 20%, có hiệu lực 01/05/2026. Đây là tin tức tích cực cho buyer Việt Nam đang nhập nội thất gỗ từ Trung Quốc, đặc biệt cho dự án nội thất khách sạn và showroom cao cấp." },
      { type: "h2", text: "Phạm vi áp dụng" },
      { type: "table", headers: ["HS Code", "Mô tả", "Thuế cũ", "Thuế mới"], rows: [
        ["9403.30", "Bàn ghế gỗ văn phòng", "25%", "20%"],
        ["9403.40", "Tủ gỗ phòng bếp", "25%", "20%"],
        ["9403.50", "Đồ gỗ phòng ngủ", "25%", "20%"],
        ["9403.60", "Đồ gỗ phòng ăn", "25%", "20%"],
        ["9403.90", "Phụ kiện gỗ khác", "25%", "20%"],
      ]},
      { type: "p", text: "Đáng chú ý: HS 9403.10 (đồ gỗ kim loại) vẫn giữ thuế 25%; HS 4419 (đồ gỗ nhà bếp nhỏ) vẫn 30%. Buyer nên kiểm tra HS code chính xác qua Cybersilkroads logistics team trước khi đặt." },
      { type: "h2", text: "Tác động lên giá DDP" },
      { type: "p", text: "Đối với đơn $20,000 nội thất phòng khách Sofa từ KUKA Hangzhou, công thức tính trước/sau:" },
      { type: "p", text: "TRƯỚC (thuế 25%): Giá FOB $20,000 + Cước CIF $4,000 = CIF $24,000. Thuế NK $24,000 × 25% = $6,000. VAT 10% × ($24,000+$6,000) = $3,000. Tổng DDP $33,000." },
      { type: "p", text: "SAU (thuế 20%): Giá FOB $20,000 + Cước CIF $4,000 = CIF $24,000. Thuế NK $24,000 × 20% = $4,800. VAT 10% × ($24,000+$4,800) = $2,880. Tổng DDP $31,680." },
      { type: "p", text: "Buyer tiết kiệm $1,320 (gần 4%) cho mỗi $20K đơn nội thất gỗ. Với showroom làm 5-10 đơn/năm, mức tiết kiệm là $7,000-13,000 — bằng đúng phí Premium Membership của Cybersilkroads." },
      { type: "img", src: u("1567789884554-0b844b597180", 1200, 500), caption: "Đối với showroom dự án, giảm 5% thuế tương đương 4% giá DDP — một biên đáng kể" },
      { type: "h2", text: "Khuyến nghị" },
      { type: "list", items: [
        "Đơn nội thất gỗ đang ký với thời hạn xuất xưởng SAU 01/05 — đàm phán lùi xuất xưởng để hưởng thuế mới.",
        "Hợp đồng năm với KUKA / Landbond / RedApple — yêu cầu adjust giá DDP theo policy mới.",
        "Đơn nội thất kim loại + gỗ — cần khai báo HS chính xác để tránh bị áp tier cao.",
        "Cybersilkroads cập nhật calculator DDP với thuế mới — xem tại /info/ddp-calculator.",
      ]},
    ],
  },
  {
    slug: "case-study-showroom-sai-gon-tiet-kiem-22-percent",
    title: "Case study: Showroom Sài Gòn tiết kiệm 22% nhờ chuyển sang Cybersilkroads",
    excerpt: "Showroom Sài Gòn (TP HCM) chuyển từ broker truyền thống sang Cybersilkroads cho 18 đơn năm 2025. Phân tích chi tiết: giá nguồn, cước, thuế, dispute.",
    category: "case-study",
    author: "Phạm Quốc Anh",
    authorRole: "Customer Success Lead",
    date: "2026-04-15",
    readMinutes: 7,
    image: u("1517245386807-bb43f82c33c4"),
    tags: ["Case study", "Showroom", "TP HCM", "Sofa"],
    content: [
      { type: "p", text: "Showroom Sài Gòn (giấu tên thật theo yêu cầu) là chuỗi nội thất 6 cửa hàng tại TP HCM với doanh thu 2025 đạt 45 tỷ đồng, chuyên sofa + bàn ghế ăn nhập khẩu Trung Quốc. Trước 2024, họ làm việc qua một broker tại Quảng Châu (commission 12%, không transparent). Năm 2025, họ chuyển 18 đơn hàng (tổng giá trị $480K) sang Cybersilkroads. Đây là phân tích chi tiết." },
      { type: "h2", text: "Cấu trúc chi phí trước (broker truyền thống)" },
      { type: "table", headers: ["Hạng mục", "% giá nhập", "Ghi chú"], rows: [
        ["Giá hàng FOB Foshan", "100%", "Báo giá qua broker, không xác minh được"],
        ["Phí broker", "12%", "Hidden trong giá hàng"],
        ["Cước CIF Cát Lái", "15%", "Broker tự lo, không transparent"],
        ["Thuế + VAT", "33%", "Thường khai cao hơn thực tế ~3%"],
        ["Vận chuyển nội địa", "4%", "Tự lo"],
        ["Chi phí dispute (1 đơn lỗi 2024)", "8%", "Broker không hỗ trợ, mất tiền"],
        ["TỔNG OVERHEAD trên FOB", "+72%", "Đối với đơn $20K → DDP ~$34.4K"],
      ]},
      { type: "h2", text: "Cấu trúc chi phí sau (Cybersilkroads)" },
      { type: "table", headers: ["Hạng mục", "% giá nhập", "Ghi chú"], rows: [
        ["Giá hàng FOB Foshan", "100%", "Báo giá trực tiếp từ NCC qua RFQ"],
        ["Cybersilkroads commission", "0%", "NCC trả 5%, không tính buyer"],
        ["Cước DDP", "20%", "Transparent breakdown"],
        ["Thuế + VAT", "30%", "Đúng theo HS, có chứng từ"],
        ["Vận chuyển nội địa", "0%", "Đã trong DDP"],
        ["Chi phí dispute (0 đơn lỗi 2025)", "0%", "Bảo đảm Giao dịch — refund hết"],
        ["TỔNG OVERHEAD trên FOB", "+50%", "Đối với đơn $20K → DDP ~$30K"],
      ]},
      { type: "p", text: "Tiết kiệm: 22% (từ 72% xuống 50% overhead). Trên 18 đơn $480K, showroom tiết kiệm khoảng $107K = 2.7 tỷ đồng năm 2025." },
      { type: "img", src: u("1493946740644-2d8a1f1a6aff", 1200, 500), caption: "Container đầu tiên của Showroom Sài Gòn được CSR audit on-site Foshan trước xuất" },
      { type: "h2", text: "Quy trình chuyển đổi" },
      { type: "list", items: [
        "Tuần 1-2: Showroom share lịch sử đơn hàng 2024 với CSR — phân tích MOQ, NCC, sản phẩm, mùa cao điểm.",
        "Tuần 3: CSR đề xuất 4 NCC alternative cho 3 sản phẩm chủ lực — sample miễn phí ship về SGN.",
        "Tuần 4-6: Showroom test sample, so sánh chất lượng với hàng cũ. 3/4 NCC đạt yêu cầu.",
        "Tuần 7: Đặt đơn đầu tiên $25K (sofa modular) qua CSR — Bảo đảm Giao dịch (trung gian).",
        "Tuần 8-12: Sản xuất + audit + DDP. Đơn về kho HCM đúng thời hạn, 0 khiếu nại.",
        "Tháng 4-12/2025: Chuyển dần các đơn còn lại. Cuối năm 2025: 100% sourcing qua CSR.",
      ]},
      { type: "quote", text: "Bảo đảm Giao dịch (tài khoản trung gian) là yếu tố quyết định. Trước đây tôi luôn lo lắng broker biến mất với 30% cọc — giờ thì tiền nằm tại tài khoản trung gian ngân hàng đối tác, NCC chỉ nhận khi tôi xác nhận hàng OK.", author: "Chủ Showroom Sài Gòn (giấu tên)" },
      { type: "h2", text: "Bài học rút ra" },
      { type: "p", text: "Buyer Việt Nam có showroom 5+ cửa hàng nên đánh giá lại supply chain mỗi 6 tháng. Broker truyền thống đủ tốt cho buyer nhỏ ($5-15K/đơn), nhưng với showroom doanh thu 30+ tỷ/năm, mức commission 10-12% của broker tương đương lương 2-3 nhân viên full-time. CSR cung cấp transparent pricing + Bảo đảm Giao dịch + đội Quảng Châu — biến chi phí broker thành dịch vụ hữu hình." },
    ],
  },
  {
    slug: "phan-tich-cang-lach-huyen-vs-cat-lai-2026",
    title: "Phân tích: Cảng Lạch Huyện vs Cát Lái — Buyer Bắc nên chọn đâu?",
    excerpt: "Cảng Lạch Huyện (Hải Phòng) vs Cát Lái (TP HCM) — so sánh cước phí, thời gian giao, tắc nghẽn, dịch vụ thông quan cho buyer Bắc Việt Nam Q1/2026.",
    category: "phan-tich-thi-truong",
    author: "Đặng Thanh Hà",
    authorRole: "Logistics Coordinator",
    date: "2026-04-10",
    readMinutes: 8,
    image: u("1581092335397-9583eb92d232"),
    tags: ["Logistics", "Cảng", "Hải Phòng", "Cát Lái", "DDP"],
    content: [
      { type: "p", text: "Buyer Việt Nam ở miền Bắc thường đối mặt câu hỏi: nhập hàng qua cảng Lạch Huyện (Hải Phòng) hay vẫn theo thói quen qua Cát Lái (TP HCM) rồi vận chuyển ra Bắc? Phân tích chi tiết Q1/2026 dựa trên dữ liệu 240 đơn DDP của Cybersilkroads." },
      { type: "h2", text: "So sánh cước phí (đơn 1×40HQ từ Foshan)" },
      { type: "table", headers: ["Hạng mục", "Lạch Huyện (HP)", "Cát Lái (HCM)"], rows: [
        ["Cước biển từ Foshan/Shekou", "$2,200", "$2,400"],
        ["Phí thông quan", "$120", "$150"],
        ["Vận chuyển nội địa đến HN", "$280", "$1,400 (HCM→HN)"],
        ["Tổng DDP về HN", "$2,600", "$3,950"],
        ["Thời gian đường biển", "7-9 ngày", "10-12 ngày"],
        ["Thời gian giao tổng (đến kho HN)", "10-12 ngày", "14-17 ngày"],
        ["Tỉ lệ tắc nghẽn (Q1/2026)", "Thấp (8%)", "Cao (32%)"],
      ]},
      { type: "p", text: "Tiết kiệm khi qua Lạch Huyện: $1,350/40HQ và 4-5 ngày thời gian giao. Đối với buyer Bắc nhập 12 container/năm, tiết kiệm $16,200/năm = ~410 triệu đồng." },
      { type: "img", src: u("1565008447742-97f6f38c985c", 1200, 500), caption: "Cảng Lạch Huyện — tăng trưởng 2x so với 2023, đang thu hút buyer Bắc Việt Nam" },
      { type: "h2", text: "Tại sao Lạch Huyện rẻ hơn?" },
      { type: "list", items: [
        "Khoảng cách HN-Hải Phòng chỉ 120km, nội địa qua cao tốc 5B chỉ 2-3 giờ. Cát Lái cách HN ~1,800km, đi xe tải 2 ngày.",
        "Cảng Lạch Huyện vận hành từ 2018, năng lực hiện đại (HBP Cube cranes), throughput cao, ít tắc.",
        "Cát Lái quá tải từ 2022 — thường xuyên có 'congestion surcharge' $80-150/container do tàu phải neo chờ.",
        "Hải quan Hải Phòng có e-customs từ 2021, thông quan nhanh hơn 30% so với Cát Lái.",
      ]},
      { type: "h2", text: "Khi nào nên qua Cát Lái?" },
      { type: "p", text: "Cát Lái vẫn là lựa chọn tốt khi: (1) Buyer ở miền Nam — vận chuyển ngược ra Bắc không kinh tế. (2) NCC ở Đông Quan/Thâm Quyến — gần Hồng Kông/Yantian thuận tiện hơn route Foshan→Lạch Huyện. (3) Hàng siêu khổ/quá tải — Cát Lái có thiết bị đặc biệt nâng container 50+ tấn. (4) Hàng khẩn cần Air-freight — sân bay TSN gần Cát Lái 30 phút." },
      { type: "h2", text: "Đường bộ Lạng Sơn — Lựa chọn thứ 3" },
      { type: "p", text: "Đối với hàng nhỏ (<5 CBM) hoặc cần thời gian giao cực ngắn (5-7 ngày tổng), Cybersilkroads có route đường bộ qua Cửa khẩu Hữu Nghị (Lạng Sơn). Cước $80-120/CBM, gấp đôi đường biển nhưng nhanh hơn 5-7 ngày. Phù hợp với showroom cần cập nhật mẫu nhanh hoặc hàng hot." },
      { type: "quote", text: "80% buyer Bắc của Cybersilkroads đã chuyển qua Lạch Huyện trong 2025. Tiết kiệm thực tế trung bình $1,200-1,500/container — dùng đó nâng cấp packaging hoặc giảm giá retail.", author: "Đặng Thanh Hà — Logistics Coordinator" },
      { type: "h2", text: "Kế hoạch 2026" },
      { type: "p", text: "Cybersilkroads đang đầu tư mở văn phòng đại diện tại Hải Phòng (Q3/2026) để rút ngắn thời gian giao DDP về kho buyer Bắc xuống 7-9 ngày. Đồng thời, ký MOU với 2 forwarder lớn tại Lạch Huyện để có ưu đãi cước cố định cho buyer Cybersilkroads. Buyer trên nền tảng sẽ được benefit này tự động." },
    ],
  },
  {
    slug: "cybersilkroads-ai-sourcing-llm-matching-beta",
    title: "Cybersilkroads ra mắt AI Sourcing — LLM matching beta",
    excerpt: "CSR phát hành công cụ AI Sourcing dùng LLM để tự động match RFQ của buyer với 4,000+ NCC trong database. Beta test miễn phí cho 100 buyer đầu tiên.",
    category: "san-pham-moi",
    author: "Vũ Mạnh Hùng",
    authorRole: "AI Engineer Lead",
    date: "2026-04-05",
    readMinutes: 5,
    image: u("1581092446327-9b52bd1570c2"),
    tags: ["AI", "LLM", "RAG", "Sourcing", "Beta"],
    content: [
      { type: "p", text: "Cybersilkroads chính thức phát hành tính năng AI Sourcing — sử dụng LLM (large language model) để hiểu RFQ tiếng Việt phức tạp và tự động match với NCC phù hợp nhất trong database 4,200+ nhà máy đối tác. Beta test miễn phí cho 100 buyer đầu tiên đăng ký từ 05/04/2026." },
      { type: "h2", text: "Vấn đề cũ: Search keyword không hiểu ngữ cảnh" },
      { type: "p", text: "Trước đây, buyer Việt Nam gửi RFQ với mô tả phức tạp như 'Cần sourcing 500 chiếc ghế lưới ergonomic chân nhôm có gối tựa đầu, target retail 4-5 triệu/cái, OEM in logo bên hông' — hệ thống search keyword cũ chỉ match từ 'ghế lưới' và 'ergonomic', bỏ qua các yêu cầu về giá, OEM, target retail. Kết quả: buyer nhận 30+ báo giá không relevant, mất thời gian filter manual." },
      { type: "h2", text: "Giải pháp: AI Sourcing với LLM + RAG" },
      { type: "p", text: "AI Sourcing của CSR sử dụng kiến trúc RAG (Retrieval-Augmented Generation): (1) LLM Vietnamese-tuned (custom fine-tune trên 50,000+ RFQ lịch sử của CSR) hiểu được ngữ cảnh, target retail, yêu cầu OEM, sự ưu tiên ngầm. (2) Vector database 4,200 NCC với embedding của capabilities, sản phẩm chính, giá range, MOQ flexibility. (3) Re-ranking layer dùng business signals (rating, audit score, response time, dispute history) để chọn top 5-7 NCC match nhất." },
      { type: "img", src: u("1565793298595-6a879b1d9492", 1200, 500), caption: "AI Sourcing dashboard — buyer thấy NCC match cùng confidence score, lý do match, comparison table" },
      { type: "h2", text: "Kết quả beta (40 buyer test trong tháng 3/2026)" },
      { type: "table", headers: ["Metric", "Search keyword cũ", "AI Sourcing"], rows: [
        ["Số NCC match (trung bình)", "28", "5-7"],
        ["Tỉ lệ NCC liên quan", "31%", "94%"],
        ["Thời gian tìm NCC phù hợp", "3.2 ngày", "8 phút"],
        ["Tỉ lệ buyer mua hàng từ top match", "12%", "58%"],
        ["Buyer satisfaction", "3.4/5", "4.7/5"],
      ]},
      { type: "p", text: "Đặc biệt ấn tượng: AI Sourcing match được nhiều RFQ phức tạp mà search keyword bỏ sót. Ví dụ: buyer cần 'sofa modular 4-7 ghế Bắc Âu màu xám/be cho căn hộ 80m² target retail 25-40tr' — AI hiểu được phong cách Bắc Âu (chân thẳng, vải bouclé), kích thước phù hợp căn hộ nhỏ, giá trung-cao, và match đúng KUKA Hangzhou + ZuoYou Shenzhen." },
      { type: "h2", text: "Cách dùng" },
      { type: "list", items: [
        "Vào /buying-request, click 'Use AI Sourcing (BETA)' ở góc trên phải.",
        "Mô tả nhu cầu bằng tiếng Việt tự nhiên — càng chi tiết càng tốt (target retail, customer demographic, OEM yêu cầu).",
        "AI trả về top 5-7 NCC trong 60 giây + lý do match + so sánh price/MOQ/thời gian giao.",
        "Click 'Send RFQ to all matched' — RFQ tự động được forward cho NCC, response trong 24h.",
      ]},
      { type: "quote", text: "AI Sourcing không thay thế con người — nó giúp đội Sourcing CSR tập trung vào case khó (custom OEM, đơn lớn) thay vì phải sàng lọc thủ công mỗi RFQ. Hiệu quả tăng 4x.", author: "Vũ Mạnh Hùng — AI Engineer Lead" },
      { type: "h2", text: "Roadmap" },
      { type: "p", text: "Q3/2026: AI Pricing — dự đoán giá DDP với accuracy >92% dựa trên giá lịch sử + cước biển realtime + tỉ giá. Q4/2026: AI Negotiation Assistant — gợi ý câu trả lời đàm phán với NCC tiếng Trung. 2027: Multi-modal AI — buyer upload ảnh sản phẩm cần tìm, AI tìm NCC + so sánh visual similarity với 4,200 NCC catalogue." },
    ],
  },
  {
    slug: "ddp-lang-son-lead-time-5-7-ngay",
    title: "DDP đường bộ qua Lạng Sơn — Thời gian giao mới 5-7 ngày",
    excerpt: "Cửa khẩu Hữu Nghị nâng cấp infrastructure Q1/2026, Cybersilkroads ký MOU với 2 forwarder để cung cấp DDP đường bộ 5-7 ngày từ Foshan/Quảng Châu.",
    category: "san-pham-moi",
    author: "Đặng Thanh Hà",
    authorRole: "Logistics Coordinator",
    date: "2026-03-30",
    readMinutes: 4,
    image: u("1559223607-a43c990c692c"),
    tags: ["DDP", "Lạng Sơn", "Đường bộ", "Logistics"],
    content: [
      { type: "p", text: "Sau cải tạo cửa khẩu quốc tế Hữu Nghị (Lạng Sơn) hoàn thành 02/2026 với hệ thống e-customs mới, Cybersilkroads ký MOU với 2 forwarder lớn (Sinotrans + Vinatrans) để cung cấp gói DDP đường bộ với thời gian giao 5-7 ngày — nhanh hơn đường biển 7-10 ngày." },
      { type: "h2", text: "Lộ trình + Thời gian giao" },
      { type: "list", items: [
        "Foshan/Quảng Châu → Nam Ninh (TQ): 1 ngày, đường cao tốc.",
        "Nam Ninh → Cửa khẩu Hữu Nghị (TQ): 0.5 ngày.",
        "Hữu Nghị thông quan TQ + VN: 0.5-1 ngày (e-customs new).",
        "Hữu Nghị → Hà Nội: 1 ngày, cao tốc Hà Nội-Lạng Sơn.",
        "Hà Nội → kho buyer (toàn miền Bắc): 0.5-1 ngày.",
        "TỔNG: 5-7 ngày từ pickup tại Foshan đến kho buyer.",
      ]},
      { type: "h2", text: "Cước so với đường biển" },
      { type: "table", headers: ["Loại hàng", "Đường biển (Cát Lái/HP)", "Đường bộ Lạng Sơn"], rows: [
        ["LCL <3 CBM", "$120/CBM, 14-18 ngày", "$160/CBM, 5-7 ngày"],
        ["LCL 3-10 CBM", "$95/CBM, 12-15 ngày", "$130/CBM, 5-7 ngày"],
        ["FCL 20HQ", "$2,400, 10-12 ngày", "$3,200, 6-7 ngày"],
        ["FCL 40HQ", "$2,600, 10-12 ngày", "$3,800, 6-7 ngày"],
      ]},
      { type: "p", text: "Đường bộ đắt hơn 30-45% nhưng nhanh hơn 7-10 ngày. Phù hợp với: hàng hot trend cần cập nhật stock nhanh, sample order, đơn nhỏ (<3 CBM), showroom cần xoay vòng inventory tốc độ cao." },
      { type: "img", src: u("1492684223066-81342ee5ff30", 1200, 500), caption: "Cửa khẩu Hữu Nghị mới — e-customs giúp thông quan giảm từ 2-3 ngày xuống còn 0.5-1 ngày" },
      { type: "h2", text: "Khuyến nghị" },
      { type: "p", text: "Sử dụng đường bộ khi: (a) Sản phẩm có vòng đời ngắn (smart device, fashion accessory) — kém 1 tháng có thể lỗi mốt. (b) Đặt hàng mẫu — luôn ưu tiên đường bộ để test nhanh. (c) Đơn replenishment — bù stock kịp mùa cao điểm. (d) Hàng giá trị cao + nhỏ gọn — cước cao % nhưng absolute không lớn." },
      { type: "p", text: "Để đặt DDP đường bộ qua Cybersilkroads, chọn 'Đường bộ Lạng Sơn' trong calculator /info/ddp-calculator hoặc note rõ trong RFQ. Đội Logistics CSR tự động phân tích và đề xuất route tối ưu." },
    ],
  },
  {
    slug: "oppein-home-profile-top-1-chau-a",
    title: "OPPEIN Home — Profile NCC tủ bếp số 1 châu Á",
    excerpt: "OPPEIN Home Group (Quảng Châu) là nhà sản xuất tủ bếp số 1 châu Á với doanh thu $4.2B năm 2025. Cybersilkroads phỏng vấn CEO và đi tour nhà máy 200,000m².",
    category: "ncc-profile",
    author: "Trần Phương Thảo",
    authorRole: "Senior Sourcing Manager",
    date: "2026-03-25",
    readMinutes: 6,
    image: u("1493946740644-2d8a1f1a6aff"),
    tags: ["OPPEIN", "Tủ bếp", "Quảng Châu", "NCC profile"],
    content: [
      { type: "p", text: "OPPEIN Home Group (欧派家居集团) thành lập 1994 tại Quảng Châu, hiện là nhà sản xuất tủ bếp + tủ quần áo + nội thất nguyên căn lớn nhất châu Á. Doanh thu 2025: $4.2B với 6,200+ nhân viên và 4 khu phức hợp sản xuất tổng diện tích 200,000m². Cybersilkroads vừa hoàn thành audit định kỳ Q1/2026 và phỏng vấn deputy CEO Mr. Chen Liang. Đây là profile chi tiết." },
      { type: "h2", text: "Quy mô + năng lực sản xuất" },
      { type: "list", items: [
        "4 nhà máy: Quảng Châu (HQ, 80,000m²), Thanh Viễn (60,000m²), Vô Tích (35,000m²), Thiên Tân (25,000m²).",
        "Capacity: 8,000 bộ tủ bếp/ngày, 5,000 bộ tủ quần áo/ngày, 12,000 bộ nội thất phụ trợ/ngày.",
        "Dây chuyền tự động hoá Industry 4.0 — tỉ lệ robot 65%, đang nâng lên 80% vào 2027.",
        "Lao động lành nghề: 4,200 thợ mộc + thợ kim loại (lương trung bình 12,000 RMB/tháng = 1,650 USD).",
        "R&D: 280 kỹ sư + designer, ra mẫu mới mỗi 14 ngày.",
      ]},
      { type: "h2", text: "Sản phẩm chủ lực" },
      { type: "p", text: "Tủ bếp 'Modern Italian' line — bằng MDF E0 + UV finish, hardware Hettich/Blum, soft-close drawer chuẩn EU. Range giá retail Việt Nam 35-95 triệu/căn bếp 4m. OPPEIN cũng có dòng entry-level 'Compact' cho căn hộ 60-80m² target $800-1,200/căn bếp. Buyer Việt Nam thường order 50-200 bếp/đơn cho dự án căn hộ chung cư." },
      { type: "img", src: u("1567789884554-0b844b597180", 1200, 500), caption: "Showroom OPPEIN Quảng Châu — 12,000m² trưng bày 200+ design tủ bếp" },
      { type: "h2", text: "Why work with OPPEIN qua Cybersilkroads" },
      { type: "list", items: [
        "Audit on-site 2 lần/năm bởi đội Quảng Châu CSR — đảm bảo chất lượng đều.",
        "Pricing transparent — CSR đàm phán giá B2B cho buyer Việt Nam, thường rẻ hơn 8-12% so với approach trực tiếp.",
        "OEM thoải mái — OPPEIN có MOQ 30 bộ cho design tuỳ chỉnh, thời gian giao 25-35 ngày.",
        "Bảo đảm Giao dịch — trung gian + kiểm định + xử lý tranh chấp. Đặc biệt quan trọng với đơn $50K+.",
        "Thời gian giao DDP về Hà Nội: 28-32 ngày (production 22-25 + shipping 6-7 qua Lạng Sơn hoặc Lạch Huyện).",
      ]},
      { type: "quote", text: "Buyer Việt Nam đang là phân khúc growth fastest cho OPPEIN — 2025 doanh thu Việt Nam tăng 67%. Chúng tôi commit cung cấp cho thị trường VN giá ưu đãi và thời gian giao priority.", author: "Chen Liang — Deputy CEO OPPEIN" },
      { type: "h2", text: "Case successful: Chuỗi căn hộ Hồ Tây 280 căn" },
      { type: "p", text: "Q4/2025, một developer căn hộ tại Hồ Tây (Hà Nội) đặt 280 bếp OPPEIN dòng Modern Italian qua Cybersilkroads. Tổng giá trị $410,000 DDP. Thời gian giao: 32 ngày từ ký PO đến giao toàn bộ container 4×40HQ về kho dự án. Tiết kiệm $58,000 (~14%) so với phương án nhập qua phân phối Việt Nam. Developer nhận xét: 'Audit on-site CSR tại OPPEIN Quảng Châu giúp chúng tôi an tâm về chất lượng — chính chủ đầu tư cũng được mời sang xem dây chuyền sản xuất.'" },
      { type: "p", text: "Cybersilkroads dự báo OPPEIN sẽ duy trì vị thế top 1 châu Á thêm 5-7 năm nhờ R&D mạnh và automation đầu ngành. Buyer Việt Nam có dự án căn hộ 50+ căn nên cân nhắc OPPEIN trong shortlist sourcing." },
    ],
  },
  {
    slug: "5-sai-lam-pho-bien-khi-dat-sample",
    title: "5 sai lầm phổ biến khi đặt sample — Buyer mới cần tránh",
    excerpt: "Đặt hàng mẫu là bước không thể bỏ qua khi sourcing lần đầu. Nhưng có 5 sai lầm phổ biến khiến sample không phản ánh đúng chất lượng MOQ. Đội CSR chia sẻ kinh nghiệm.",
    category: "huong-dan",
    author: "Phạm Quốc Anh",
    authorRole: "Customer Success Lead",
    date: "2026-03-20",
    readMinutes: 5,
    image: u("1559223607-a43c990c692c"),
    tags: ["Mẫu", "Hướng dẫn", "Buyer mới"],
    content: [
      { type: "p", text: "Đặt sample là bảo hiểm tốt nhất cho buyer mới. Nhưng đội Customer Success Cybersilkroads thường xuyên gặp những trường hợp sample 'đẹp như mơ' nhưng MOQ về lại 'kém như mong đợi'. Phân tích 5 sai lầm phổ biến nhất và cách khắc phục." },
      { type: "h2", text: "Sai lầm 1: Chỉ đặt 1 sample duy nhất" },
      { type: "p", text: "Buyer mới thường đặt 1 sample đại diện. Vấn đề: NCC có thể chọn lọc cẩn thận sample (golden sample) khác với batch production. Đề xuất: đặt 3-5 mẫu cùng SKU từ 1 NCC — nếu cả 5 đều OK, tin được. Nếu chỉ 1/5 đẹp, đó là red flag. Phí thêm chỉ 2-3x sample ban đầu nhưng giảm rủi ro 80%." },
      { type: "h2", text: "Sai lầm 2: Không yêu cầu sample đầy đủ packaging" },
      { type: "p", text: "Nhiều buyer chỉ test sản phẩm, bỏ qua packaging. NCC ship sample bằng bubble wrap đẹp nhưng đến MOQ lại đóng carton mỏng dễ vỡ. Đề xuất: yêu cầu NCC ship sample CHÍNH XÁC như packaging MOQ (kèm carton, foam, label, manual). Buyer test nguyên hộp sao cho match production thực tế." },
      { type: "h2", text: "Sai lầm 3: Chỉ test sample mới — không test 'sample đã dùng'" },
      { type: "p", text: "Đặc biệt với sản phẩm có chức năng (đèn LED, smart home, vòi nước, thiết bị điện): chỉ test sample vừa nhận chỉ tốt cho 'ngày đầu'. Nên dùng sample 2-4 tuần liên tục để phát hiện vấn đề về độ bền, giảm độ sáng (LED), rò rỉ (vòi)... Đây là cách tốt nhất phát hiện QC issue tiềm ẩn." },
      { type: "img", src: u("1556745757-8d76bdb6984b", 1200, 500), caption: "Test sample 2-4 tuần trước khi đặt MOQ — đầu tư nhỏ tránh thiệt hại lớn" },
      { type: "h2", text: "Sai lầm 4: Không lưu mẫu reference" },
      { type: "p", text: "Buyer dùng sample test xong vứt đi. Khi MOQ về có vấn đề chất lượng, không có mẫu so sánh để claim với NCC. Đề xuất: KHÔNG bao giờ vứt mẫu — lưu trong tủ kho, label rõ 'SAMPLE REF: PO-XXX, ngày YYYY-MM-DD'. Khi MOQ có sai khác, có chứng cứ ngay để CSR đàm phán refund/replace." },
      { type: "h2", text: "Sai lầm 5: Không quay video unboxing sample" },
      { type: "p", text: "Cybersilkroads khuyến nghị buyer quay video unboxing sample (5-10 phút) — chứng cứ về tình trạng nhận, packaging, label, sản phẩm. Khi có dispute, video này gấp 10x giá trị so với photo. Cybersilkroads cũng quay video kiểm hàng tại Quảng Châu — buyer so sánh 2 video để verify NCC ship đúng spec." },
      { type: "h2", text: "Best practice tổng hợp" },
      { type: "list", items: [
        "Đặt 3-5 sample cùng SKU từ 1 NCC (test consistency)",
        "Yêu cầu sample đầy đủ packaging chuẩn xuất khẩu",
        "Test sample 2-4 tuần liên tục với chức năng",
        "Lưu mẫu reference trong tủ kho có label rõ ràng",
        "Quay video unboxing — chứng cứ cho dispute",
        "Đặt mẫu qua CSR để có Bảo đảm Giao dịch + Trung tâm Mẫu gom vận chuyển",
      ]},
      { type: "quote", text: "$200 tốn cho 5 sample tốt hơn $20,000 thiệt hại trong 1 đơn MOQ sai. Đầu tư vào sample là đầu tư rẻ nhất cho buyer mới.", author: "Phạm Quốc Anh — Customer Success Lead" },
    ],
  },
  {
    slug: "vietnam-expo-2026-doan-cybersilkroads-30-buyer",
    title: "Vietnam Expo 2026 — Đoàn Cybersilkroads dẫn 30 buyer",
    excerpt: "09/04 - 12/04 tại Trung tâm Triển lãm Quốc tế Hà Nội. Đoàn Cybersilkroads tổ chức B2B match-making với 50+ NCC Trung Quốc đến VN. Đăng ký miễn phí cho buyer.",
    category: "hoi-cho",
    author: "Đội Marketing CSR",
    authorRole: "Cybersilkroads",
    date: "2026-03-15",
    readMinutes: 4,
    image: u("1540575467063-178a50c2df87"),
    tags: ["Vietnam Expo", "Hà Nội", "B2B", "Match-making"],
    content: [
      { type: "p", text: "Vietnam Expo 2026 — sự kiện thương mại quốc tế lớn nhất Việt Nam — sẽ diễn ra từ 09/04 đến 12/04/2026 tại Trung tâm Triển lãm Quốc tế Hà Nội (148 Giảng Võ). Cybersilkroads sẽ có booth hall A2-15 và tổ chức chương trình B2B match-making cho 30 buyer Việt Nam gặp 50+ NCC Trung Quốc đến VN." },
      { type: "h2", text: "Vì sao Vietnam Expo quan trọng?" },
      { type: "p", text: "Đây là dịp duy nhất trong năm khi NCC top tier Trung Quốc đến tận Hà Nội — buyer không cần bay sang TQ. Năm 2026 có 50+ NCC từ Cybersilkroads ecosystem (Foshan, Quảng Châu, Thâm Quyến, Hàng Châu) tham dự, mang theo sample mẫu mới và sẵn sàng đàm phán MOQ trực tiếp." },
      { type: "h2", text: "Chương trình của booth Cybersilkroads" },
      { type: "list", items: [
        "9h - 12h hàng ngày: Sample showcase 200+ sản phẩm best-seller, buyer đến xem trực tiếp.",
        "13h - 17h: B2B match-making — đặt lịch trước 30 phút, gặp NCC theo ngành hàng quan tâm.",
        "Live audit demo: 11/04 và 12/04, đội QC CSR demo quy trình audit nhà máy live cho buyer.",
        "Networking dinner: 11/04, 19h tại JW Marriott — 100 buyer + 50 NCC + đại diện Cybersilkroads.",
      ]},
      { type: "img", src: u("1505373877841-8d25f7d46678", 1200, 500), caption: "Vietnam Expo Hà Nội 2025 — booth Cybersilkroads thu hút 800+ buyer trong 4 ngày" },
      { type: "h2", text: "30 suất đoàn miễn phí" },
      { type: "p", text: "Cybersilkroads tài trợ 30 suất đoàn miễn phí cho buyer Việt Nam, mỗi suất bao gồm: vé tham dự VIP (giá thị trường 500K), lịch B2B match-making 1-on-1 với 5-8 NCC theo ngành quan tâm, phiên dịch tiếng Trung 1 buyer-1 phiên dịch trong các cuộc gặp, networking dinner 11/04 (giá thị trường 1.5tr), follow-up support 30 ngày sau Expo." },
      { type: "h2", text: "Đăng ký" },
      { type: "p", text: "Đăng ký qua /buying-request với note 'Vietnam Expo 2026' hoặc email events@cybersilkroads.com. Ưu tiên buyer có doanh thu ≥10 tỷ/năm và đang sourcing đơn ≥$20K. Deadline: 25/03/2026 hoặc khi đủ 30 suất." },
      { type: "quote", text: "Vietnam Expo là sân nhà của buyer Việt Nam. Chúng tôi mời NCC đến tận VN thay vì buyer phải bay sang TQ — tiết kiệm visa, vé, thời gian.", author: "Đội Marketing Cybersilkroads" },
    ],
  },
  {
    slug: "phan-tich-pricing-tier-moq-500-vs-100",
    title: "Phân tích pricing tier — Khi nào nên đặt MOQ 500 vs 100?",
    excerpt: "Bảng giá tier rõ ràng nhưng quyết định đặt MOQ 100 hay 500 không đơn giản. Phân tích chi tiết về cash flow, kho bãi, vòng quay vốn cho buyer Việt Nam.",
    category: "huong-dan",
    author: "Lê Hoàng Quân",
    authorRole: "Finance Advisor",
    date: "2026-03-10",
    readMinutes: 6,
    image: u("1565008447742-97f6f38c985c"),
    tags: ["MOQ", "Pricing", "Cash flow", "Hướng dẫn"],
    content: [
      { type: "p", text: "Hầu hết product pages trên Cybersilkroads có pricing tier với 4 mức MOQ: 1-49, 50-99, 100-499, 500+. Buyer mới thường thấy 'mức 500 rẻ hơn 22% — tiết kiệm 22% chắc chắn nên đặt 500'. Nhưng quyết định không đơn giản như vậy." },
      { type: "h2", text: "Phân tích case: Đặt 500 vs 100 ghế văn phòng" },
      { type: "p", text: "Giả sử buyer A là showroom Hà Nội đang đắn đo giữa MOQ 100 ghế ($30/cái = $3,000) và MOQ 500 ghế ($23/cái = $11,500, giảm 22%)." },
      { type: "table", headers: ["Yếu tố", "MOQ 100", "MOQ 500"], rows: [
        ["Tiền cọc T/T 30%", "$900", "$3,450"],
        ["Tổng vốn lock", "$3,000", "$11,500"],
        ["Cước DDP đến HN", "$320 (~10%)", "$580 (~5%)"],
        ["Tổng chi DDP", "$3,320", "$12,080"],
        ["Giá vốn mỗi ghế DDP", "$33.20", "$24.16"],
        ["Tiết kiệm nếu bán hết", "—", "$4,520 (27%)"],
        ["Thời gian bán hết (1 ghế/ngày)", "100 ngày", "500 ngày = 16 tháng"],
        ["Chi phí kho bãi 16 tháng", "$0 (kho có sẵn)", "$1,800 (thuê extra space)"],
        ["Chi phí vốn 16 tháng (lãi 8%/năm)", "$0", "$1,200"],
        ["Tiết kiệm THỰC TẾ", "—", "$1,520 (13%)"],
      ]},
      { type: "p", text: "Phân tích: Mức tiết kiệm thực tế chỉ 13% (không phải 22% như quảng cáo) sau khi tính chi phí kho bãi và vốn lock 16 tháng. Đối với showroom turn-over chậm, MOQ 500 có thể RẺ HƠN $1,520 nhưng cũng có thể ĐẮT HƠN nếu sản phẩm hết mốt sau 6 tháng." },
      { type: "h2", text: "Khi nên đặt MOQ cao hơn" },
      { type: "list", items: [
        "Sản phẩm core (ghế văn phòng, sofa cơ bản) bán ổn định 12+ tháng — turn-over đảm bảo.",
        "Có chuỗi showroom 5+ cửa hàng — phân bổ MOQ 500 thành 100/cửa hàng tốc độ bán nhanh hơn.",
        "Sản phẩm có lifecycle dài (hardware, building materials) — không lo lỗi mốt.",
        "Buyer có vốn dự phòng — không phụ thuộc vào dòng tiền MOQ này.",
        "NCC đang giảm giá ưu đãi cuối năm — opportunistic, không thường có.",
      ]},
      { type: "img", src: u("1556745757-8d76bdb6984b", 1200, 500), caption: "Quyết định MOQ là cân bằng giữa tiết kiệm giá và rủi ro inventory" },
      { type: "h2", text: "Khi nên đặt MOQ thấp" },
      { type: "list", items: [
        "Sản phẩm thử nghiệm — chưa biết đáp ứng thị trường thế nào.",
        "Sản phẩm theo trend — fashion, smart device, có thể lỗi mốt 6-9 tháng.",
        "Showroom mới mở — cần test demand trước khi commit lớn.",
        "Cash flow tight — vốn nên xoay vòng nhanh, không lock.",
        "NCC chưa từng làm việc — sourcing lần đầu, ưu tiên test relationship.",
      ]},
      { type: "h2", text: "Mô hình hybrid: Combine 2 buyer thành 1 đơn" },
      { type: "p", text: "Cybersilkroads thường giúp 2-3 buyer cùng ngành combine đơn để đạt MOQ 500 hưởng giá tốt nhưng mỗi buyer chỉ lấy 100-200. Ví dụ: 2 showroom HN + 1 showroom Hải Phòng cùng đặt sofa, mỗi bên 150-200 cái → tổng 500 → giá tier 4. Lợi ích chia đều, rủi ro inventory thấp. Liên hệ Quản lý tài khoản CSR để arrange." },
      { type: "quote", text: "Buyer thông minh không tối ưu giá đơn vị — họ tối ưu cash-on-cash return. MOQ 100 với turnover 90 ngày thường tốt hơn MOQ 500 turnover 500 ngày, dù giá đơn vị cao hơn.", author: "Lê Hoàng Quân — Finance Advisor" },
    ],
  },
  {
    slug: "trade-alert-newsletter-12000-buyer-dang-ky",
    title: "Cảnh báo Thương mại — 12,000+ buyer Việt Nam đăng ký newsletter hàng tuần",
    excerpt: "Cảnh báo Thương mại là email newsletter miễn phí của Cybersilkroads gửi mỗi thứ 5 với xu hướng giá, sản phẩm mới, deal limited. Đã có 12,000+ buyer subscribe.",
    category: "san-pham-moi",
    author: "Đội Content CSR",
    authorRole: "Cybersilkroads",
    date: "2026-03-05",
    readMinutes: 3,
    image: u("1493946740644-2d8a1f1a6aff"),
    tags: ["Newsletter", "Cảnh báo Thương mại", "Email"],
    content: [
      { type: "p", text: "Cybersilkroads ra mắt Cảnh báo Thương mại năm 2023 và đã có 12,000+ buyer Việt Nam đăng ký nhận newsletter hàng tuần. Đây là kênh email miễn phí giúp buyer cập nhật xu hướng ngành sourcing mà không cần chủ động tìm kiếm." },
      { type: "h2", text: "Nội dung mỗi số" },
      { type: "list", items: [
        "📊 Xu hướng giá 5 nguyên liệu chính (gốm sứ, gỗ, kim loại, nhựa, vải) — cập nhật từ Quảng Châu Spot Price Index.",
        "🆕 5 sản phẩm mới ra mắt từ NCC top tier — kèm ảnh, giá tham khảo, MOQ.",
        "🎯 3-5 deal limited tuần — discount 8-15% cho first 10 buyers đặt RFQ.",
        "📅 Hội chợ + sự kiện 7 ngày tới — Vietnam Expo, Canton Fair, ProPak.",
        "📈 1 case study buyer thành công — học từ buyer khác.",
        "❓ FAQ tuần — câu hỏi từ buyer khác có thể bạn cũng đang thắc mắc.",
      ]},
      { type: "h2", text: "Lịch gửi" },
      { type: "p", text: "Mỗi thứ 5, 14h00 (giờ Hà Nội). Email từ trade-alert@cybersilkroads.com, subject 'Cảnh báo Thương mại #XXX — [highlight tuần]'. Read time 5-7 phút, mobile-optimized HTML email với ảnh và link CTA." },
      { type: "h2", text: "Đăng ký" },
      { type: "p", text: "Đăng ký miễn phí qua banner Cảnh báo Thương mại ở footer website hoặc /trade-alert. Có thể unsubscribe bất cứ lúc nào — không spam. Bonus: 3 buyer mới đăng ký mỗi tuần được tặng credit $50 cho đơn đầu (random drawing)." },
      { type: "img", src: u("1497366216548-37526070297c", 1200, 500), caption: "Cảnh báo Thương mại mobile preview — short, scannable, actionable" },
      { type: "p", text: "Cảnh báo Thương mại là một phần của tinh thần Cybersilkroads: chia sẻ tri thức tự do giữa các thương nhân số. Buyer mới và lâu năm đều có thể học hỏi, đỡ bỏ lỡ cơ hội thị trường." },
    ],
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(cat?: BlogCategory): BlogArticle[] {
  if (!cat) return ARTICLES;
  return ARTICLES.filter((a) => a.category === cat);
}

export function getRelatedArticles(slug: string, limit = 3): BlogArticle[] {
  const article = getArticle(slug);
  if (!article) return [];
  return ARTICLES
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, limit);
}
