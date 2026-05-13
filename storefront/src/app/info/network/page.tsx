import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

type Tier = "national" | "provincial" | "city" | "industry";

type Association = {
  region: "VN" | "CN" | "ASEAN";
  tier: Tier;
  flag: string;
  abbr: string;
  color: string;
  name: string;
  nameEn: string;
  domain: string;
  founded: string;
  members: string;
  focus: string;
  mouStatus: string;
  keyEvent?: string;
  borderProvince?: boolean;
};

const TIER_LABEL: Record<Tier, { label: string; bg: string; fg: string }> = {
  national: { label: "Cấp quốc gia", bg: "#C8102E", fg: "#fff" },
  provincial: { label: "Cấp tỉnh", bg: "#005F6B", fg: "#fff" },
  city: { label: "Cấp thành phố", bg: "#7C5A1F", fg: "#fff" },
  industry: { label: "Hiệp hội ngành", bg: "#475569", fg: "#fff" },
};

const ASSOCIATIONS: Association[] = [
  // ===== VIETNAM (15) =====
  {
    region: "VN", tier: "national", flag: "🇻🇳", abbr: "VCCI", color: "#C8102E",
    name: "Liên đoàn Thương mại và Công nghiệp Việt Nam",
    nameEn: "Vietnam Chamber of Commerce and Industry",
    domain: "vcci.com.vn",
    founded: "1963",
    members: "200,000+ doanh nghiệp",
    focus: "Hiệp hội xuyên ngành cấp quốc gia · Vận hành Trung tâm Trọng tài Quốc tế VIAC · Đại diện chính thức tại WTO, ASEAN-BAC.",
    mouStatus: "MOU chiến lược 2024 · gia hạn 5 năm",
    keyEvent: "Joint trade mission Quảng Châu 4 lần/năm",
  },
  {
    region: "VN", tier: "national", flag: "🇻🇳", abbr: "VINASME", color: "#9333EA",
    name: "Hiệp hội Doanh nghiệp Nhỏ và Vừa Việt Nam",
    nameEn: "Vietnam Association of Small and Medium Enterprises",
    domain: "vinasme.vn",
    founded: "2005",
    members: "60,000+ SME",
    focus: "Đối tượng buyer chính của Cybersilkroads · Hỗ trợ chuyển đổi số, tài chính chuỗi cung ứng, đào tạo quản trị.",
    mouStatus: "Đối tác chiến lược · MOU 2024",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "HAWA", color: "#8B4513",
    name: "Hội Mỹ nghệ và Chế biến Gỗ TP HCM",
    nameEn: "Handicraft and Wood Industry Association of HCMC",
    domain: "hawa.org.vn",
    founded: "1991",
    members: "700+ doanh nghiệp gỗ",
    focus: "Nội thất gỗ, mỹ nghệ thủ công · Tổ chức HawaExpo (30,000 visitor/năm) · Đầu mối FSC/EUDR cho buyer EU.",
    mouStatus: "MOU 2024",
    keyEvent: "HawaExpo HCM 03/2026",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "VIFORES", color: "#2D5016",
    name: "Hiệp hội Gỗ và Lâm sản Việt Nam",
    nameEn: "Vietnam Timber and Forest Products Association",
    domain: "vinaforest.org.vn",
    founded: "2000",
    members: "600+ thành viên",
    focus: "Xuất khẩu gỗ và lâm sản (~$14 tỷ USD/năm) · Compliance EUDR, CARB Phase 2, Lacey Act · Đại diện cấp Bộ NN&PTNT.",
    mouStatus: "MOU 2024",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "VITAS", color: "#1E3A8A",
    name: "Hiệp hội Dệt may Việt Nam",
    nameEn: "Vietnam Textile and Apparel Association",
    domain: "vitas.org.vn",
    founded: "1999",
    members: "600+ doanh nghiệp",
    focus: "Dệt may, garment xuất khẩu · Chuẩn lao động ILO, BSCI, SA8000 · Nguyên phụ liệu nhập từ Trung Quốc.",
    mouStatus: "MOU 2025",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "VEIA", color: "#0E7490",
    name: "Hiệp hội Doanh nghiệp Điện tử Việt Nam",
    nameEn: "Vietnam Electronic Industries Association",
    domain: "veia.org.vn",
    founded: "2017",
    members: "350+ doanh nghiệp",
    focus: "Điện tử tiêu dùng, linh kiện, EMS · Hợp tác với Samsung, LG, Foxconn cluster · Hỗ trợ chuyển giao công nghệ.",
    mouStatus: "MOU 2025",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "VSA", color: "#475569",
    name: "Hiệp hội Thép Việt Nam",
    nameEn: "Vietnam Steel Association",
    domain: "vsa.com.vn",
    founded: "2001",
    members: "120+ nhà máy thép",
    focus: "Vật liệu xây dựng, cán thép, xuất nhập khẩu · Chống bán phá giá, biện pháp tự vệ thương mại.",
    mouStatus: "Đang đàm phán MOU 2026",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "VLA", color: "#0891B2",
    name: "Hiệp hội Doanh nghiệp Dịch vụ Logistics Việt Nam",
    nameEn: "Vietnam Logistics Business Association",
    domain: "vla.com.vn",
    founded: "1993",
    members: "500+ logistics provider",
    focus: "Forwarder, customs broker, 3PL, kho ngoại quan · Đại diện ngành tại VNACCS, hệ thống e-customs.",
    mouStatus: "MOU 2025",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "LEFASO", color: "#7C2D12",
    name: "Hiệp hội Da - Giày - Túi xách Việt Nam",
    nameEn: "Vietnam Leather, Footwear and Handbag Association",
    domain: "lefaso.org.vn",
    founded: "1990",
    members: "1,500+ doanh nghiệp",
    focus: "Da giày là ngành xuất khẩu top 4 Việt Nam (~$24 tỷ USD/năm) · Compliance LWG, REACH cho thị trường EU/Mỹ.",
    mouStatus: "MOU 2025",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "VPAS", color: "#0EA5E9",
    name: "Hiệp hội Nhựa Việt Nam",
    nameEn: "Vietnam Plastics Association",
    domain: "vpas.vn",
    founded: "1989",
    members: "400+ doanh nghiệp nhựa",
    focus: "Sản xuất nhựa, bao bì · Nhập nguyên liệu PE, PP, PVC từ Trung Quốc · Compliance food contact.",
    mouStatus: "MOU 2025",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "VASEP", color: "#0369A1",
    name: "Hiệp hội Chế biến và Xuất khẩu Thuỷ sản Việt Nam",
    nameEn: "Vietnam Association of Seafood Exporters and Producers",
    domain: "vasep.com.vn",
    founded: "1998",
    members: "270+ doanh nghiệp",
    focus: "Tôm, cá tra, hải sản chế biến · Xuất khẩu $11 tỷ USD/năm sang Mỹ, EU, Trung Quốc · HACCP, BAP, ASC compliance.",
    mouStatus: "MOU 2026",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "VINASA", color: "#7C3AED",
    name: "Hiệp hội Phần mềm và Dịch vụ CNTT Việt Nam",
    nameEn: "Vietnam Software and IT Services Association",
    domain: "vinasa.org.vn",
    founded: "2002",
    members: "550+ doanh nghiệp công nghệ",
    focus: "Outsourcing software, CNTT, AI, blockchain · Đầu mối ngành công nghệ — đối tác chiến lược cho hạ tầng Cybersilkroads.",
    mouStatus: "MOU 2025 · tech partnership",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "VICOFA", color: "#92400E",
    name: "Hiệp hội Cà phê - Ca cao Việt Nam",
    nameEn: "Vietnam Coffee - Cocoa Association",
    domain: "vicofa.org.vn",
    founded: "1990",
    members: "150+ doanh nghiệp",
    focus: "Việt Nam là nước xuất khẩu cà phê top 2 thế giới · Robusta, specialty coffee · Rainforest Alliance, UTZ, Organic.",
    mouStatus: "MOU 2026",
  },
  {
    region: "VN", tier: "city", flag: "🇻🇳", abbr: "HUBA", color: "#BE185D",
    name: "Hiệp hội Doanh nghiệp TP Hồ Chí Minh",
    nameEn: "Ho Chi Minh City Union of Business Associations",
    domain: "huba.vn",
    founded: "1989",
    members: "12,000+ doanh nghiệp HCM",
    focus: "Đại diện cộng đồng doanh nghiệp lớn nhất phía Nam · Đối tác chiến lược cho buyer doanh nghiệp khu vực TP HCM, Đông Nam Bộ.",
    mouStatus: "MOU 2025",
  },
  {
    region: "VN", tier: "industry", flag: "🇻🇳", abbr: "VPA-PORTS", color: "#0E7490",
    name: "Hiệp hội Cảng biển Việt Nam",
    nameEn: "Vietnam Seaports Association",
    domain: "vpa.org.vn",
    founded: "1994",
    members: "60+ cảng biển",
    focus: "Lạch Huyện, Cát Lái, Cái Mép - Thị Vải, Đà Nẵng, Tiên Sa · Phối hợp lịch tàu, tariff, throughput cho hàng nhập từ TQ.",
    mouStatus: "MOU 2026 · Logistics framework",
  },

  // ===== CHINA (16) =====
  // National-level
  {
    region: "CN", tier: "national", flag: "🇨🇳", abbr: "CCPIT", color: "#DE2910",
    name: "Hội đồng Xúc tiến Thương mại Quốc tế Trung Quốc",
    nameEn: "China Council for the Promotion of International Trade · 中国国际贸易促进委员会",
    domain: "ccpit.org",
    founded: "1952",
    members: "Tổ chức cấp quốc gia",
    focus: "Vận hành Canton Fair (200,000+ exhibitor, 600,000+ buyer/kỳ) · Trung tâm trọng tài CIETAC · Cơ quan xúc tiến thương mại chính thức của Trung Quốc.",
    mouStatus: "MOU 2024 · gia hạn 5 năm",
    keyEvent: "Canton Fair 04/2026 + 10/2026",
  },
  {
    region: "CN", tier: "industry", flag: "🇨🇳", abbr: "CFA", color: "#7C2D12",
    name: "Hiệp hội Đồ gỗ Trung Quốc",
    nameEn: "China National Furniture Association · 中国家具协会",
    domain: "cnfa.org.cn",
    founded: "1988",
    members: "5,000+ nhà máy nội thất",
    focus: "Tổ chức CIFF (China International Furniture Fair) tại Quảng Châu + Thượng Hải · Cluster Foshan Lecong, Đông Quan.",
    mouStatus: "MOU 2024",
    keyEvent: "CIFF Quảng Châu 03/2026",
  },
  {
    region: "CN", tier: "industry", flag: "🇨🇳", abbr: "CBDA", color: "#92400E",
    name: "Hiệp hội Trang trí Xây dựng Trung Quốc",
    nameEn: "China Building Decoration Association · 中国建筑装饰协会",
    domain: "cbda.cn",
    founded: "1984",
    members: "8,000+ doanh nghiệp",
    focus: "Vật liệu xây dựng, sanitary, gốm sứ ốp lát · Cluster Foshan Nanzhuang, Triều Châu.",
    mouStatus: "MOU 2025",
  },
  {
    region: "CN", tier: "industry", flag: "🇨🇳", abbr: "CCCMC", color: "#0F172A",
    name: "Phòng Thương mại Xuất nhập khẩu Kim loại, Khoáng sản & Hoá chất",
    nameEn: "China Chamber of Commerce of Metals, Minerals & Chemicals · 中国五矿化工进出口商会",
    domain: "cccmc.org.cn",
    founded: "1988",
    members: "6,000+ thành viên",
    focus: "Kim loại màu, khoáng sản, hoá chất công nghiệp · Compliance REACH, RoHS cho thị trường EU/Mỹ.",
    mouStatus: "MOU 2025",
  },
  {
    region: "CN", tier: "industry", flag: "🇨🇳", abbr: "CNLIC", color: "#4338CA",
    name: "Liên đoàn Công nghiệp Nhẹ Trung Quốc",
    nameEn: "China National Light Industry Council · 中国轻工业联合会",
    domain: "clii.com.cn",
    founded: "1993",
    members: "Ô-dù 22 hiệp hội con",
    focus: "Đồ gia dụng, đồ chơi, văn phòng phẩm, đồ nhựa, da giày · Bao trùm hơn 100 ngành hàng tiêu dùng.",
    mouStatus: "MOU 2025",
  },
  {
    region: "CN", tier: "industry", flag: "🇨🇳", abbr: "CCCME", color: "#0E7490",
    name: "Phòng Thương mại Xuất nhập khẩu Cơ khí và Điện tử",
    nameEn: "China Chamber of Commerce for Import & Export of Machinery and Electronic Products · 中国机电产品进出口商会",
    domain: "cccme.org.cn",
    founded: "1988",
    members: "10,000+ thành viên",
    focus: "Cơ khí, điện tử, máy móc, dụng cụ · Đầu mối thương mại lớn thứ 2 Trung Quốc về xuất khẩu.",
    mouStatus: "MOU 2026",
  },
  {
    region: "CN", tier: "industry", flag: "🇨🇳", abbr: "CFNA", color: "#15803D",
    name: "Phòng Thương mại Xuất nhập khẩu Thực phẩm và Nông sản Trung Quốc",
    nameEn: "China Chamber of Commerce of Foodstuffs, Native Produce & Animal By-products · 中国食品土畜进出口商会",
    domain: "cccfna.org.cn",
    founded: "1988",
    members: "5,000+ doanh nghiệp",
    focus: "Thực phẩm chế biến, nông sản, hương liệu · GACC food import licence, halal cho buyer Hồi giáo.",
    mouStatus: "MOU 2026",
  },
  {
    region: "CN", tier: "industry", flag: "🇨🇳", abbr: "CTJPA", color: "#DB2777",
    name: "Hiệp hội Đồ chơi & Sản phẩm Trẻ em Trung Quốc",
    nameEn: "China Toy and Juvenile Products Association · 中国玩具和婴童用品协会",
    domain: "ctja.org.cn",
    founded: "1986",
    members: "1,800+ nhà máy",
    focus: "Đồ chơi, sản phẩm trẻ em · Compliance EN 71 cho EU, ASTM F963 cho Mỹ, GB 6675 cho TQ · Trade fair China Toy Expo.",
    mouStatus: "MOU 2026",
  },
  {
    region: "CN", tier: "industry", flag: "🇨🇳", abbr: "CISA", color: "#525252",
    name: "Hiệp hội Sắt Thép Trung Quốc",
    nameEn: "China Iron and Steel Association · 中国钢铁工业协会",
    domain: "chinaisa.org.cn",
    founded: "1999",
    members: "270+ nhà máy thép",
    focus: "Sản lượng thép Trung Quốc chiếm 54% toàn cầu · Phối hợp với VSA về anti-dumping, biện pháp tự vệ thương mại.",
    mouStatus: "MOU 2026 · Industry coordination",
  },
  {
    region: "CN", tier: "industry", flag: "🇨🇳", abbr: "CCAGM", color: "#A16207",
    name: "Hiệp hội Công nghiệp Gốm sứ Trung Quốc",
    nameEn: "China Ceramic Industry Association · 中国陶瓷工业协会",
    domain: "ccagm.org.cn",
    founded: "1986",
    members: "3,500+ doanh nghiệp gốm",
    focus: "Gạch men ốp lát, sanitary, gốm sứ kỹ thuật · Cluster Foshan Nanzhuang, Triều Châu, Tấn Giang.",
    mouStatus: "MOU 2026",
  },

  // Provincial / City-level
  {
    region: "CN", tier: "provincial", flag: "🇨🇳", abbr: "GD-CCPIT", color: "#B91C1C",
    name: "Hội đồng Xúc tiến Thương mại Quảng Đông",
    nameEn: "CCPIT Guangdong Sub-Council · 广东国际贸易促进委员会",
    domain: "ccpitgd.org",
    founded: "1953",
    members: "Tỉnh Quảng Đông — 35% capacity sản xuất TQ",
    focus: "Cluster Foshan · Quảng Châu · Đông Quan · Thâm Quyến · Trung Sơn — trọng tâm sản xuất xuất khẩu sang ASEAN.",
    mouStatus: "MOU 2024",
  },
  {
    region: "CN", tier: "provincial", flag: "🇨🇳", abbr: "GX-CCPIT", color: "#A21CAF",
    name: "Hội đồng Xúc tiến Thương mại Quảng Tây",
    nameEn: "CCPIT Guangxi Sub-Council · 广西国际贸易促进委员会",
    domain: "ccpitgx.org.cn",
    founded: "1957",
    members: "Khu tự trị dân tộc Choang Quảng Tây",
    focus: "GIÁP BIÊN GIỚI VIỆT NAM — cửa khẩu Hữu Nghị Quan, Đông Hưng - Móng Cái · Tổ chức CAEXPO (China-ASEAN Expo) tại Nam Ninh hàng năm.",
    mouStatus: "MOU 2024 · Border trade priority",
    keyEvent: "CAEXPO Nam Ninh 09/2026",
    borderProvince: true,
  },
  {
    region: "CN", tier: "provincial", flag: "🇨🇳", abbr: "YN-CCPIT", color: "#16A34A",
    name: "Hội đồng Xúc tiến Thương mại Vân Nam",
    nameEn: "CCPIT Yunnan Sub-Council · 云南国际贸易促进委员会",
    domain: "ccpityn.org",
    founded: "1956",
    members: "Tỉnh Vân Nam — biên giới Việt Nam, Lào, Myanmar",
    focus: "GIÁP BIÊN GIỚI VIỆT NAM — Lào Cai, Hà Giang, Điện Biên · Cửa khẩu Hekou - Lào Cai · Cà phê, hoa cắt, khoáng sản.",
    mouStatus: "MOU 2025 · Border trade priority",
    borderProvince: true,
  },
  {
    region: "CN", tier: "provincial", flag: "🇨🇳", abbr: "ZJ-CCPIT", color: "#0891B2",
    name: "Hội đồng Xúc tiến Thương mại Chiết Giang",
    nameEn: "CCPIT Zhejiang Sub-Council · 浙江国际贸易促进委员会",
    domain: "ccpitzj.gov.cn",
    founded: "1956",
    members: "Tỉnh Chiết Giang — small commodity capital",
    focus: "Cluster Nghĩa Ô (chợ bán buôn lớn nhất thế giới với 75,000 booth), Ningbo (cảng), Hàng Châu (e-commerce).",
    mouStatus: "MOU 2025",
    keyEvent: "Yiwu Fair 10/2026",
  },
  {
    region: "CN", tier: "provincial", flag: "🇨🇳", abbr: "SH-CCPIT", color: "#DC2626",
    name: "Hội đồng Xúc tiến Thương mại Thượng Hải",
    nameEn: "CCPIT Shanghai Sub-Council · 上海国际贸易促进委员会",
    domain: "cpitshanghai.org.cn",
    founded: "1956",
    members: "Thành phố trực thuộc trung ương",
    focus: "Trung tâm tài chính - thương mại Đông Á · Tổ chức CIIE (China International Import Expo) hàng năm · Liên kết bonded zones.",
    mouStatus: "MOU 2025",
    keyEvent: "CIIE Shanghai 11/2026",
  },
  {
    region: "CN", tier: "city", flag: "🇨🇳", abbr: "FOSHAN", color: "#9A3412",
    name: "Phòng Thương mại Quốc tế Foshan",
    nameEn: "Foshan Chamber of International Commerce · 佛山市国际商会",
    domain: "fsccpit.com",
    founded: "1995",
    members: "12,000+ doanh nghiệp Foshan",
    focus: "TT số 1 thế giới về gốm sứ · Cluster Lecong (nội thất gỗ), Nanzhuang (gạch men), Bắc Đào (sanitary).",
    mouStatus: "MOU 2025 · City partnership",
  },
  {
    region: "CN", tier: "city", flag: "🇨🇳", abbr: "YIWU", color: "#EA580C",
    name: "Phòng Thương mại Quốc tế Yiwu (Nghĩa Ô)",
    nameEn: "Yiwu Chamber of International Commerce · 义乌国际商会",
    domain: "ywccpit.com",
    founded: "1995",
    members: "Trung tâm Yiwu Market",
    focus: "Chợ bán buôn lớn nhất thế giới — 75,000 booth, 2.1 triệu SKU · Đồ gia dụng, văn phòng phẩm, phụ kiện thời trang giá rẻ.",
    mouStatus: "MOU 2026",
  },

  // ===== ASEAN (10) =====
  {
    region: "ASEAN", tier: "national", flag: "🌏", abbr: "ASEAN BAC", color: "#005EB8",
    name: "Hội đồng Tư vấn Doanh nghiệp ASEAN",
    nameEn: "ASEAN Business Advisory Council",
    domain: "asean-bac.org",
    founded: "2003",
    members: "Body chính thức của ASEAN Heads of State",
    focus: "Tư vấn chính sách thương mại khu vực · RCEP implementation · Đại diện doanh nghiệp 10 nước ASEAN.",
    mouStatus: "Cooperation Letter 2025",
  },
  {
    region: "ASEAN", tier: "national", flag: "🇹🇭", abbr: "FTI", color: "#A4123F",
    name: "Liên đoàn Công nghiệp Thái Lan",
    nameEn: "Federation of Thai Industries · สภาอุตสาหกรรมแห่งประเทศไทย",
    domain: "fti.or.th",
    founded: "1967",
    members: "12,000+ doanh nghiệp",
    focus: "Ô tô, điện tử, food processing, hoá dầu · Đầu mối thương mại Thailand-Vietnam-China.",
    mouStatus: "MOU 2025",
  },
  {
    region: "ASEAN", tier: "national", flag: "🇹🇭", abbr: "TCC", color: "#7C2D12",
    name: "Phòng Thương mại Thái Lan",
    nameEn: "Thai Chamber of Commerce · หอการค้าไทย",
    domain: "thaichamber.org",
    founded: "1933",
    members: "100,000+ thành viên (qua chamber tỉnh)",
    focus: "Đại diện thương mại lâu đời nhất Thái Lan · Mạng lưới 76 chamber tỉnh · Hỗ trợ thương mại biên giới với Lào, Campuchia.",
    mouStatus: "MOU 2026",
  },
  {
    region: "ASEAN", tier: "national", flag: "🇮🇩", abbr: "KADIN", color: "#FFCD00",
    name: "Phòng Thương mại và Công nghiệp Indonesia",
    nameEn: "Kamar Dagang dan Industri Indonesia",
    domain: "kadin.id",
    founded: "1968",
    members: "7,000+ thành viên",
    focus: "Đối tác G2B chính thức với Chính phủ Indonesia · Tài nguyên, dầu cọ, food, manufacturing.",
    mouStatus: "MOU 2025",
  },
  {
    region: "ASEAN", tier: "national", flag: "🇲🇾", abbr: "FMM", color: "#010066",
    name: "Liên đoàn Nhà sản xuất Malaysia",
    nameEn: "Federation of Malaysian Manufacturers",
    domain: "fmm.org.my",
    founded: "1968",
    members: "3,500+ nhà sản xuất",
    focus: "Điện tử, dầu cọ, hoá chất, chế biến · Halal certification, ASEAN Trade Repository contributor.",
    mouStatus: "MOU 2026",
  },
  {
    region: "ASEAN", tier: "national", flag: "🇸🇬", abbr: "SBF", color: "#EF3340",
    name: "Liên đoàn Doanh nghiệp Singapore",
    nameEn: "Singapore Business Federation",
    domain: "sbf.org.sg",
    founded: "2002",
    members: "29,000+ thành viên",
    focus: "Cross-border banking, supply chain finance, ASEAN HQ services · Đầu mối tài chính cho mạng lưới CSR.",
    mouStatus: "MOU 2025 + Service Agreement",
  },
  {
    region: "ASEAN", tier: "national", flag: "🇵🇭", abbr: "PCCI", color: "#0038A8",
    name: "Phòng Thương mại và Công nghiệp Philippines",
    nameEn: "Philippine Chamber of Commerce and Industry",
    domain: "philippinechamber.com",
    founded: "1903",
    members: "30,000+ doanh nghiệp",
    focus: "Hiệp hội thương mại lâu đời nhất Đông Nam Á · Xuyên ngành Philippines.",
    mouStatus: "MOU 2026",
  },
  {
    region: "ASEAN", tier: "national", flag: "🇰🇭", abbr: "CCC", color: "#032EA1",
    name: "Phòng Thương mại Campuchia",
    nameEn: "Cambodia Chamber of Commerce",
    domain: "ccc.org.kh",
    founded: "1995",
    members: "2,500+ doanh nghiệp",
    focus: "Thương mại biên giới Việt Nam - Campuchia · Cluster Phnom Penh, Sihanoukville · Garment, agricultural exports.",
    mouStatus: "MOU 2026 · Indochina cluster",
  },
  {
    region: "ASEAN", tier: "national", flag: "🇱🇦", abbr: "LNCCI", color: "#CE1126",
    name: "Phòng Thương mại và Công nghiệp Quốc gia Lào",
    nameEn: "Lao National Chamber of Commerce and Industry",
    domain: "lncci.la",
    founded: "1989",
    members: "1,800+ doanh nghiệp",
    focus: "Thương mại biên giới Việt Nam - Lào · Lâm sản, thuỷ điện, khai khoáng · Đối tác chiến lược cho Đông Bắc VN.",
    mouStatus: "MOU 2026 · Indochina cluster",
  },
  {
    region: "ASEAN", tier: "national", flag: "🇲🇲", abbr: "UMFCCI", color: "#FECB00",
    name: "Liên đoàn Phòng Thương mại và Công nghiệp Myanmar",
    nameEn: "Union of Myanmar Federation of Chambers of Commerce and Industry",
    domain: "umfcci.com.mm",
    founded: "1919",
    members: "30,000+ doanh nghiệp",
    focus: "Thương mại với khu vực ASEAN-6 · Garment, gem, agricultural · Indochina cluster cùng Lào, Campuchia.",
    mouStatus: "MOU 2026 · Indochina cluster",
  },
];

const REGION_META = {
  VN: {
    label: "Việt Nam",
    flag: "🇻🇳",
    color: "#C8102E",
    subtitle: "15 hiệp hội đối tác — quốc gia, ngành, thành phố",
    desc: "Mạng lưới hiệp hội ngành tại Việt Nam giúp Cybersilkroads kết nối trực tiếp tới buyer doanh nghiệp toàn quốc và đảm bảo tuân thủ quy định pháp lý nội địa. Bao gồm cấp quốc gia (VCCI, VINASME), 11 hiệp hội ngành chủ lực, và đối tác cấp thành phố (HUBA HCM).",
  },
  CN: {
    label: "Trung Quốc",
    flag: "🇨🇳",
    color: "#DE2910",
    subtitle: "16 hiệp hội đối tác — quốc gia, tỉnh giáp biên VN, thành phố cluster",
    desc: "10 hiệp hội ngành cấp quốc gia + 5 CCPIT cấp tỉnh + 2 phòng thương mại cấp thành phố. Trong đó CCPIT Quảng Tây và Vân Nam giáp biên giới Việt Nam, là hai đối tác chiến lược nhất cho thương mại đường bộ qua Hữu Nghị Quan, Móng Cái, Lào Cai, Hà Giang.",
  },
  ASEAN: {
    label: "ASEAN",
    flag: "🌏",
    color: "#005EB8",
    subtitle: "10 hiệp hội cấp quốc gia khu vực — biến CSR thành cây cầu 2 chiều",
    desc: "Mạng lưới 10 hiệp hội ASEAN gồm Thailand (FTI, TCC), Indonesia (KADIN), Malaysia (FMM), Singapore (SBF), Philippines (PCCI), và Indochina cluster (Cambodia CCC, Laos LNCCI, Myanmar UMFCCI) — biến CSR thành cây cầu hai chiều, mở cửa thị trường ASEAN cho hàng Việt Nam.",
  },
} as const;

const COOPERATION_LAYERS = [
  {
    n: "01",
    icon: "📜",
    title: "MOU văn bản chính thức",
    desc: "Ký giữa CSR và hiệp hội — công khai (không bí mật), thường có thời hạn 3 năm với option gia hạn. Scope ghi rõ về dữ liệu chia sẻ, joint marketing, các giới hạn pháp lý theo Luật Cạnh tranh, GDPR, PIPL, NĐ 13/2023.",
  },
  {
    n: "02",
    icon: "💎",
    title: "Cross-membership benefit",
    desc: "Thành viên hiệp hội đối tác giảm 20-40% phí tier Verified của CSR. Ngược lại, NCC tier Premium được áp dụng membership rate ưu đãi tại hiệp hội Trung Quốc / ASEAN.",
  },
  {
    n: "03",
    icon: "📊",
    title: "Co-publishing Báo cáo thị trường",
    desc: "Phối hợp với hiệp hội ngành để biên soạn Annual Industry Report — chia sẻ chi phí, tăng tin cậy data, branding chung trên cover.",
  },
  {
    n: "04",
    icon: "✈️",
    title: "Joint trade mission",
    desc: "Tổ chức đoàn doanh nghiệp Việt Nam đi Trung Quốc 4 lần/năm (Canton Fair, CIFF, CAEXPO Nam Ninh, CIIE Thượng Hải) và đoàn TQ đến VietnamWood, VIETBUILD, VIIF.",
  },
  {
    n: "05",
    icon: "🏛",
    title: "Liaison office tại trụ sở hiệp hội",
    desc: "Nhân sự liaison part-time tại các hiệp hội lớn (VCCI HN, VCCI HCM, KADIN Jakarta, FTI Bangkok, GX-CCPIT Nam Ninh) — designated contact + tủ tài liệu CSR đặt tại hiệp hội.",
  },
];

const TRADE_FAIRS_2026 = [
  { quarter: "Q1", events: [
    { date: "03/2026", name: "CIFF Quảng Châu", category: "Nội thất", role: "Đại diện cùng CFA" },
    { date: "03/2026", name: "HawaExpo HCM", category: "Gỗ & mỹ nghệ", role: "Đồng tổ chức cùng HAWA" },
    { date: "03/2026", name: "VietnamWood HCM", category: "Máy móc gỗ", role: "Booth chung" },
  ]},
  { quarter: "Q2", events: [
    { date: "04-05/2026", name: "Canton Fair Phase 1-2-3", category: "Comprehensive", role: "Đại diện cùng CCPIT" },
    { date: "04/2026", name: "HK Electronics Fair", category: "Điện tử", role: "Booth chung" },
    { date: "05/2026", name: "VIETBUILD HCM", category: "Vật liệu XD", role: "Đồng tổ chức cùng CBDA" },
  ]},
  { quarter: "Q3", events: [
    { date: "09/2026", name: "CIFF Thượng Hải", category: "Nội thất Eastern China", role: "Đại diện cùng CFA · SH-CCPIT" },
    { date: "09/2026", name: "CAEXPO Nam Ninh", category: "China-ASEAN Expo", role: "Đồng tổ chức cùng GX-CCPIT" },
    { date: "09/2026", name: "VIIF Hà Nội", category: "Công nghiệp tổng hợp", role: "Đồng tổ chức cùng VCCI" },
  ]},
  { quarter: "Q4", events: [
    { date: "10/2026", name: "Yiwu Fair", category: "Small commodity", role: "Booth chung cùng YIWU + ZJ-CCPIT" },
    { date: "10-11/2026", name: "Canton Fair Autumn", category: "Comprehensive", role: "Đại diện cùng CCPIT" },
    { date: "11/2026", name: "CIIE Shanghai", category: "China Import Expo", role: "Đại diện cùng SH-CCPIT" },
  ]},
];

const FAQ = [
  {
    q: "Tôi có cần là thành viên hiệp hội nào để dùng Cybersilkroads không?",
    a: "Không bắt buộc. Mọi doanh nghiệp Việt Nam đều có thể đăng ký buyer account miễn phí. Tuy nhiên, nếu bạn là thành viên VCCI / HAWA / VITAS / VINASME / HUBA hoặc các hiệp hội đối tác khác, bạn được giảm 20-40% phí tier Verified và mời tham gia trade mission ưu tiên.",
  },
  {
    q: "Vì sao CCPIT Quảng Tây và Vân Nam quan trọng đặc biệt?",
    a: "Hai tỉnh này là hai cửa ngõ đất liền của Trung Quốc với Việt Nam. Quảng Tây giáp Lạng Sơn (cửa khẩu Hữu Nghị Quan) và Quảng Ninh (cửa khẩu Đông Hưng - Móng Cái). Vân Nam giáp Lào Cai, Hà Giang, Điện Biên. Toàn bộ thương mại đường bộ giữa hai nước đi qua các cửa khẩu thuộc hai tỉnh này — chiếm ~38% kim ngạch xuất khẩu của TQ sang VN. CCPIT cấp tỉnh giúp CSR điều phối lịch tàu, customs e-clearance, và truy cập nhà máy địa phương trực tiếp.",
  },
  {
    q: "MOU với các hiệp hội có công khai không?",
    a: "Có. Toàn bộ MOU được công bố tại partnerships.cybersilkroads.com. Nội dung công khai: tên hai bên, ngày ký, thời hạn, scope chính, cam kết không độc quyền. Các điều khoản tài chính cụ thể được giữ riêng theo yêu cầu của một số hiệp hội.",
  },
  {
    q: "CSR có thể giúp tôi export hàng Việt Nam sang ASEAN không?",
    a: "Có. Liên hệ partnership@cybersilkroads.com để được hỗ trợ list lên hệ thống KADIN/FTI/FMM/SBF/PCCI partner network. Đặc biệt cho ngành gỗ, thủ công, thuỷ sản, da giày, cà phê — các ngành VN đang xuất khẩu mạnh. Hiện đã có 38 doanh nghiệp Việt Nam tham gia chương trình này.",
  },
  {
    q: "Trade mission có phù hợp cho doanh nghiệp nhỏ (≤20 nhân viên) không?",
    a: "Rất phù hợp. ~62% người tham gia là SME. Chi phí thấp ($580-1,200 gói cơ bản cho 4 ngày 3 đêm tại Quảng Châu hoặc Nam Ninh), được hỗ trợ ngôn ngữ + pháp lý mà SME không có in-house. Mỗi đoàn chỉ 12-25 doanh nghiệp để đảm bảo chất lượng matching.",
  },
  {
    q: "Khác gì giữa CSR và Alibaba.com / MIC, khi họ cũng có quan hệ với CCPIT?",
    a: "CSR dùng quan hệ hiệp hội để xây dispute mediation pathway, joint trade mission cho buyer Việt Nam đi đoàn (chi phí thấp hơn 50%), và đặc biệt để leverage 'reputation pressure' khi xử lý tranh chấp — điều mà platform global trung lập không làm được. CSR thiên vị buyer Việt Nam một cách công khai và đó là điểm mạnh.",
  },
  {
    q: "Tôi muốn ký MOU giữa hiệp hội của tôi và CSR — quy trình thế nào?",
    a: "Liên hệ partnership@cybersilkroads.com. Đội Partnership review trong 7-10 ngày, schedule call 60 phút. Quy trình từ first contact → MOU ký thường 8-14 tuần. CSR cởi mở với mọi hiệp hội B2B chính thức — không có quota.",
  },
];

function TierBadge({ tier }: { tier: Tier }) {
  const t = TIER_LABEL[tier];
  return (
    <span
      className="inline-block text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-sm"
      style={{ backgroundColor: t.bg, color: t.fg }}
    >
      {t.label}
    </span>
  );
}

function LogoCard({ a }: { a: Association }) {
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${a.domain}&sz=128`;
  return (
    <article
      className="group bg-paper border rounded overflow-hidden hover:shadow-md transition flex flex-col"
      style={a.borderProvince ? { borderColor: "#A21CAF", borderWidth: 2 } : undefined}
    >
      {/* Header — accent stripe with flag */}
      <div className="px-4 pt-4 pb-3 border-b border-line flex items-center gap-3" style={{ background: `linear-gradient(135deg, ${a.color}10, ${a.color}03)` }}>
        {/* Logo tile — abbreviation as primary visual, brand-colored gradient bg */}
        <div
          className="relative w-16 h-16 rounded-md flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden border"
          style={{
            background: `linear-gradient(135deg, ${a.color} 0%, ${a.color}DD 100%)`,
            borderColor: `${a.color}40`,
          }}
        >
          <span
            className="font-extrabold text-white text-center leading-none px-1 drop-shadow-sm"
            style={{ fontSize: a.abbr.length > 7 ? "10px" : a.abbr.length > 5 ? "12px" : a.abbr.length > 3 ? "15px" : "18px" }}
          >
            {a.abbr}
          </span>
          {/* Small favicon badge in bottom-right corner */}
          <div className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-sm bg-white border border-white/40 overflow-hidden shadow-sm">
            <img
              src={faviconUrl}
              alt=""
              loading="lazy"
              className="w-full h-full object-contain"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="text-[14px]">{a.flag}</span>
            <b className="text-[15px] font-extrabold text-ink truncate" style={{ color: a.color }}>{a.abbr}</b>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <TierBadge tier={a.tier} />
            <span className="text-[10px] text-mute2 font-semibold">Est. {a.founded}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3 flex-1 flex flex-col">
        {a.borderProvince && (
          <div className="text-[10.5px] bg-[#A21CAF]/10 border border-[#A21CAF]/30 text-[#A21CAF] px-2 py-1 rounded-sm mb-2 font-bold flex items-center gap-1.5">
            🌐 GIÁP BIÊN GIỚI VIỆT NAM
          </div>
        )}
        <h3 className="text-[13.5px] font-bold text-ink leading-tight mb-1">{a.name}</h3>
        <p className="text-[10.5px] text-mute2 italic mb-2 leading-tight line-clamp-2">{a.nameEn}</p>

        <div className="flex items-center gap-1.5 mb-2.5 text-[11px] flex-wrap">
          <span className="bg-bg border border-line px-1.5 py-0.5 rounded-sm text-mute font-semibold">👥 {a.members}</span>
        </div>

        <p className="text-[12px] text-ink leading-relaxed mb-3 flex-1">{a.focus}</p>

        {a.keyEvent && (
          <div className="text-[11px] bg-gold/10 border border-gold/30 text-[#7C5A1F] px-2 py-1 rounded-sm mb-2.5 font-semibold">
            🎫 {a.keyEvent}
          </div>
        )}

        <div className="border-t border-line pt-2.5 flex items-center justify-between gap-2 mt-auto">
          <span className="text-[10.5px] text-success bg-success/10 border border-success/25 px-1.5 py-0.5 rounded-sm font-bold">
            ✓ {a.mouStatus}
          </span>
          <a
            href={`https://${a.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-brand font-semibold hover:underline whitespace-nowrap"
          >
            {a.domain} →
          </a>
        </div>
      </div>
    </article>
  );
}

function RegionSection({ region }: { region: "VN" | "CN" | "ASEAN" }) {
  const meta = REGION_META[region];
  const items = ASSOCIATIONS.filter((a) => a.region === region);

  // For CN, sort: provincial border-VN first, then national, then provincial, then city, then industry
  const tierOrder: Record<Tier, number> = { provincial: 1, national: 2, city: 3, industry: 4 };
  const sorted = [...items].sort((a, b) => {
    if (a.borderProvince && !b.borderProvince) return -1;
    if (!a.borderProvince && b.borderProvince) return 1;
    return tierOrder[a.tier] - tierOrder[b.tier];
  });

  return (
    <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
      <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-md flex items-center justify-center text-[28px] flex-shrink-0 shadow-sm"
            style={{ background: `linear-gradient(135deg, ${meta.color}25, ${meta.color}05)` }}
          >
            {meta.flag}
          </div>
          <div>
            <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: meta.color }}>
              KHU VỰC · REGION
            </span>
            <h2 className="text-[26px] font-extrabold text-ink leading-tight max-md:text-[20px]">{meta.label}</h2>
            <p className="text-[12.5px] text-mute mt-0.5">{meta.subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[28px] font-extrabold leading-none" style={{ color: meta.color }}>{items.length}</div>
          <div className="text-[10.5px] text-mute uppercase tracking-wider">hiệp hội đối tác</div>
        </div>
      </div>

      <p className="text-[13.5px] text-ink leading-relaxed bg-bg border border-line rounded p-4 mb-5">
        {meta.desc}
      </p>

      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
        {sorted.map((a) => (
          <LogoCard key={a.abbr} a={a} />
        ))}
      </div>
    </section>
  );
}

export default function KetNoiPage() {
  const totalCount = ASSOCIATIONS.length;
  const provincialCnt = ASSOCIATIONS.filter((a) => a.tier === "provincial").length;
  const industryCnt = ASSOCIATIONS.filter((a) => a.tier === "industry").length;
  const nationalCnt = ASSOCIATIONS.filter((a) => a.tier === "national").length;
  const cityCnt = ASSOCIATIONS.filter((a) => a.tier === "city").length;

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Thông tin", href: "/help" },
          { label: "Mạng lưới kết nối" },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-light blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-12 max-md:py-8">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            🤝 MẠNG LƯỚI KẾT NỐI
          </span>
          <h1 className="text-[40px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            Một mạng lưới<br />
            Một con đường tơ lụa số
          </h1>
          <p className="text-[15px] opacity-90 max-w-[760px] leading-relaxed mb-7 max-md:text-[13px]">
            Cybersilkroads dệt mạng lưới hợp tác với <b>{totalCount} hiệp hội B2B chính thức</b> tại Việt Nam, Trung Quốc và toàn ASEAN — bao gồm CCPIT cấp quốc gia, 5 CCPIT cấp tỉnh (đặc biệt Quảng Tây và Vân Nam giáp biên giới VN), 2 phòng thương mại cấp thành phố cluster (Foshan, Yiwu), 16 hiệp hội ngành chủ lực, và mạng lưới ASEAN 10 nước. Tổng tiếp cận 200,000+ NCC qua đối tác mẹ.
          </p>

          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {[
              { n: `${totalCount}`, l: "Hiệp hội đối tác", icon: "🏛" },
              { n: `${provincialCnt}`, l: "CCPIT cấp tỉnh", icon: "🗺" },
              { n: "200K+", l: "NCC tiếp cận", icon: "🏭" },
              { n: "10", l: "Quốc gia ASEAN", icon: "🌏" },
            ].map((s) => (
              <div key={s.l} className="bg-white/10 border border-white/20 rounded p-4 backdrop-blur-sm">
                <div className="text-[20px] mb-1">{s.icon}</div>
                <div className="text-[24px] font-extrabold leading-none">{s.n}</div>
                <div className="text-[11px] opacity-85 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Tier breakdown ================================================ */}
      <div className="max-w-[1200px] mx-auto px-4 mt-7">
        <div className="bg-paper border border-line rounded p-5">
          <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <div>
              <h2 className="text-[18px] font-bold text-ink">Phân tầng đối tác — 4 cấp độ</h2>
              <p className="text-[12.5px] text-mute mt-0.5">Mỗi cấp có vai trò và scope hợp tác khác nhau</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {[
              { tier: "national" as Tier, count: nationalCnt, desc: "VCCI, CCPIT, KADIN, FMM... — đại diện thương mại cấp quốc gia, đối tác cấp Bộ và Chính phủ." },
              { tier: "provincial" as Tier, count: provincialCnt, desc: "CCPIT Quảng Tây, Vân Nam, Quảng Đông, Chiết Giang, Thượng Hải — kết nối trực tiếp tỉnh sản xuất TQ." },
              { tier: "city" as Tier, count: cityCnt, desc: "Foshan, Yiwu, HUBA HCM — phòng thương mại cấp thành phố tại các cluster sản xuất - thương mại trọng yếu." },
              { tier: "industry" as Tier, count: industryCnt, desc: "Hiệp hội ngành chuyên sâu — gỗ, dệt, điện tử, thép, gốm, đồ chơi, thuỷ sản, da giày, nhựa, logistics, software." },
            ].map((t) => {
              const meta = TIER_LABEL[t.tier];
              return (
                <div key={t.tier} className="bg-bg border border-line rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <TierBadge tier={t.tier} />
                    <span className="text-[20px] font-extrabold" style={{ color: meta.bg }}>{t.count}</span>
                  </div>
                  <p className="text-[11.5px] text-mute leading-relaxed">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* === Border highlight =============================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-7">
        <div className="rounded p-5 border-2" style={{ borderColor: "#A21CAF", background: "linear-gradient(135deg, #A21CAF08, #A21CAF02)" }}>
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-[26px] flex-shrink-0" style={{ background: "#A21CAF20" }}>
              🌐
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="inline-block bg-[#A21CAF] text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm">
                  ƯU TIÊN CHIẾN LƯỢC
                </span>
                <h3 className="text-[18px] font-bold text-ink">Hai đối tác CCPIT giáp biên giới Việt Nam</h3>
              </div>
              <p className="text-[13px] text-ink leading-relaxed mb-2">
                <b>CCPIT Quảng Tây</b> và <b>CCPIT Vân Nam</b> là hai cửa ngõ đường bộ giữa Trung Quốc và Việt Nam. Toàn bộ thương mại cross-border land transport (~38% kim ngạch xuất khẩu TQ → VN) đi qua các cửa khẩu thuộc hai tỉnh này: Hữu Nghị Quan (Lạng Sơn), Đông Hưng - Móng Cái, Hekou - Lào Cai. CSR phối hợp với hai CCPIT cấp tỉnh để điều phối lịch tàu, customs e-clearance, và truy cập trực tiếp NCC địa phương.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[11px] bg-paper border border-[#A21CAF]/40 text-[#A21CAF] px-2 py-0.5 rounded-sm font-semibold">🚛 Hữu Nghị Quan (Lạng Sơn)</span>
                <span className="text-[11px] bg-paper border border-[#A21CAF]/40 text-[#A21CAF] px-2 py-0.5 rounded-sm font-semibold">🚛 Đông Hưng - Móng Cái</span>
                <span className="text-[11px] bg-paper border border-[#A21CAF]/40 text-[#A21CAF] px-2 py-0.5 rounded-sm font-semibold">🚛 Hekou - Lào Cai</span>
                <span className="text-[11px] bg-paper border border-[#A21CAF]/40 text-[#A21CAF] px-2 py-0.5 rounded-sm font-semibold">🎫 CAEXPO Nam Ninh 09/2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Vision flow diagram =========================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">TẦM NHÌN</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Cây cầu hai chiều giữa 3 thị trường</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Khác với platform B2B truyền thống chỉ là kênh nhập một chiều, Cybersilkroads vận hành hai dòng chảy: hàng Trung Quốc → Việt Nam, và hàng Việt Nam → ASEAN — qua chính mạng lưới hiệp hội chính thức của 3 khối.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 items-stretch max-md:grid-cols-1 max-md:gap-3">
          {(["VN", "CN", "ASEAN"] as const).map((r, idx) => {
            const meta = REGION_META[r];
            const count = ASSOCIATIONS.filter((a) => a.region === r).length;
            return (
              <div
                key={r}
                className="relative bg-paper border-2 rounded p-5 text-center"
                style={{ borderColor: `${meta.color}40` }}
              >
                {idx > 0 && (
                  <span
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[14px] bg-paper border-2 max-md:hidden"
                    style={{ borderColor: meta.color, color: meta.color }}
                    aria-hidden="true"
                  >
                    ↔
                  </span>
                )}
                <div className="text-[42px] mb-2">{meta.flag}</div>
                <div className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: meta.color }}>
                  {meta.label}
                </div>
                <div className="text-[36px] font-extrabold mt-1" style={{ color: meta.color }}>{count}</div>
                <div className="text-[12px] text-mute">hiệp hội đối tác</div>
                <p className="text-[11.5px] text-ink mt-3 leading-relaxed">{meta.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* === Regions =========================================================== */}
      <RegionSection region="VN" />
      <RegionSection region="CN" />
      <RegionSection region="ASEAN" />

      {/* === How cooperation works ========================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 max-md:mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">CƠ CHẾ HỢP TÁC</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">5 layer hợp tác cụ thể với mỗi hiệp hội</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Không phải PR endorsement — mỗi quan hệ đối tác đều có cơ chế vận hành cụ thể, được công khai trong MOU.
          </p>
        </div>
        <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {COOPERATION_LAYERS.map((l) => (
            <div key={l.n} className="bg-paper border border-line rounded p-4 hover:border-brand transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold text-mute2 tracking-widest">{l.n}</span>
                <span className="text-[24px]">{l.icon}</span>
              </div>
              <b className="block text-[14px] text-ink mb-2 leading-tight">{l.title}</b>
              <p className="text-[11.5px] text-mute leading-relaxed">{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Trade fairs 2026 =============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 max-md:mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">HỘI CHỢ THƯƠNG MẠI 2026</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">12 sự kiện CSR đại diện hoặc đồng tổ chức</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Buyer Việt Nam tham gia đoàn doanh nghiệp do CSR + hiệp hội ngành đồng tổ chức — chi phí thấp hơn 50% so với tự đi, có pháp lý protection. Bao gồm CAEXPO Nam Ninh (đồng tổ chức cùng CCPIT Quảng Tây) và Yiwu Fair (cùng CCPIT Chiết Giang).
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {TRADE_FAIRS_2026.map((q) => (
            <div key={q.quarter} className="bg-paper border border-line rounded overflow-hidden">
              <div
                className="px-4 py-3 text-white"
                style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
              >
                <b className="block text-[16px] font-extrabold">{q.quarter} 2026</b>
                <span className="text-[11px] opacity-85">{q.events.length} sự kiện</span>
              </div>
              <ul className="p-3 space-y-2.5">
                {q.events.map((e, i) => (
                  <li key={i} className="border-l-2 border-gold pl-2.5">
                    <div className="text-[10.5px] text-mute2 font-semibold uppercase tracking-wider">{e.date}</div>
                    <b className="block text-[12.5px] text-ink leading-tight">{e.name}</b>
                    <div className="text-[11px] text-mute mt-0.5">{e.category}</div>
                    <div className="text-[10.5px] text-brand mt-0.5 font-semibold">{e.role}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link
            href="/trade-shows"
            className="inline-block px-6 py-2.5 border border-brand text-brand rounded-sm text-[13px] font-bold hover:bg-brand hover:text-white"
          >
            Xem lịch trade fair đầy đủ →
          </Link>
        </div>
      </section>

      {/* === Benefits split =================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 max-md:mt-9">
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          <div className="bg-paper border border-line rounded p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center text-[22px] flex-shrink-0">
                🛒
              </div>
              <div>
                <span className="text-[10.5px] uppercase tracking-wider text-brand font-bold">CHO BUYER</span>
                <h3 className="text-[18px] font-bold text-ink">Doanh nghiệp Việt Nam</h3>
              </div>
            </div>
            <ul className="space-y-2.5 text-[13px] text-ink leading-relaxed">
              <li className="flex gap-2.5"><span className="text-success flex-shrink-0">✓</span><span>Truy cập NCC chính thức được CCPIT/CFA/CBDA xác minh — không broker, không scam</span></li>
              <li className="flex gap-2.5"><span className="text-success flex-shrink-0">✓</span><span>Vận chuyển đường bộ nhanh qua Quảng Tây / Vân Nam — phối hợp cấp tỉnh, không tắc cửa khẩu</span></li>
              <li className="flex gap-2.5"><span className="text-success flex-shrink-0">✓</span><span>Tham gia trade mission chi phí ~50% so với tự đi · business matching pre-arranged</span></li>
              <li className="flex gap-2.5"><span className="text-success flex-shrink-0">✓</span><span>Mediation tranh chấp leverage uy tín hiệp hội — pass rate 78% (so với 45% nếu tự đàm phán)</span></li>
              <li className="flex gap-2.5"><span className="text-success flex-shrink-0">✓</span><span>Cơ hội mở rộng export sản phẩm Việt sang ASEAN qua mạng lưới KADIN/FTI/FMM</span></li>
            </ul>
          </div>

          <div className="bg-paper border border-line rounded p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold text-brand-dark flex items-center justify-center text-[22px] flex-shrink-0">
                🏭
              </div>
              <div>
                <span className="text-[10.5px] uppercase tracking-wider text-[#9C6A1F] font-bold">CHO SUPPLIER</span>
                <h3 className="text-[18px] font-bold text-ink">Nhà cung cấp Trung Quốc & ASEAN</h3>
              </div>
            </div>
            <ul className="space-y-2.5 text-[13px] text-ink leading-relaxed">
              <li className="flex gap-2.5"><span className="text-success flex-shrink-0">✓</span><span>Tiếp cận buyer Việt Nam đã KYC qua VCCI / VINASME / HUBA — không lead rác</span></li>
              <li className="flex gap-2.5"><span className="text-success flex-shrink-0">✓</span><span>Booth chung CSR + hiệp hội tại trade fair — chi phí thấp, exposure cao</span></li>
              <li className="flex gap-2.5"><span className="text-success flex-shrink-0">✓</span><span>Listing được endorsed bởi CFA / CBDA / GD-CCPIT — buyer ASEAN tin tưởng nhanh hơn</span></li>
              <li className="flex gap-2.5"><span className="text-success flex-shrink-0">✓</span><span>Reputation pressure ngược chiều — NCC giữ uy tín với hiệp hội ngành mẹ, cố tránh dispute</span></li>
              <li className="flex gap-2.5"><span className="text-success flex-shrink-0">✓</span><span>Cross-membership rate ưu đãi tại các hiệp hội ASEAN khi đăng ký Premium tier CSR</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* === FAQ =========================================================== */}
      <section className="max-w-[900px] mx-auto px-4 mt-12 max-md:mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">CÂU HỎI THƯỜNG GẶP</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Mạng lưới kết nối — FAQ</h2>
        </div>
        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <details key={i} className="group bg-paper border border-line rounded">
              <summary className="cursor-pointer px-4 py-3 flex justify-between items-center gap-3 list-none">
                <b className="text-[13.5px] text-ink flex-1">{f.q}</b>
                <span className="text-mute group-open:rotate-180 transition-transform text-[12px]">▾</span>
              </summary>
              <div className="px-4 pb-4 pt-1 text-[13px] text-mute leading-relaxed border-t border-line">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* === CTA =========================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 mb-10 max-md:mt-9">
        <div
          className="rounded p-8 text-white text-center max-md:p-5"
          style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
        >
          <h3 className="text-[28px] font-extrabold mb-2 max-md:text-[22px]">Tham gia con đường tơ lụa số</h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[660px] mx-auto leading-relaxed">
            Tham gia trade mission tiếp theo cùng VCCI · HAWA · CCPIT Quảng Tây · CCPIT Quảng Đông, hoặc liên hệ Partnership team nếu hiệp hội của bạn muốn ký MOU với Cybersilkroads.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/trade-shows"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              ✈️ Đăng ký trade mission 2026
            </Link>
            <a
              href="mailto:partnership@cybersilkroads.com"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              🤝 Liên hệ Partnership team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Mạng lưới kết nối — 41 hiệp hội B2B Việt Nam · Trung Quốc · ASEAN",
  description: "41 hiệp hội thương mại đối tác chính thức của Cybersilkroads: VCCI, HAWA, VITAS, CCPIT (cấp quốc gia + 5 tỉnh: Quảng Đông, Quảng Tây, Vân Nam, Chiết Giang, Thượng Hải), CFA, CBDA, ASEAN BAC, FTI, KADIN, FMM. Tiếp cận 200,000+ NCC qua đối tác.",
};
