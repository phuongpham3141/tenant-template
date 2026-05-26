import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

type Topic = {
  title: string;
  intro: string;
  paragraphs: string[];
  /** Optional emoji icon shown in the hero banner. */
  icon?: string;
  /** Optional category label for hero (e.g. "VỀ CHÚNG TÔI"). */
  category?: string;
  /** Quick-fact pills displayed under the hero (e.g. founded year, locations). */
  quickFacts?: { label: string; value: string }[];
  /** Optional headings for the body — splits paragraphs into sections of N
   *  Use null entry to keep paragraph without a heading. */
  sectionTitles?: (string | null)[];
  /** Optional pull-quote shown after the first section. */
  pullQuote?: { text: string; author?: string };
  /** Optional checklist bullets after main paragraphs. */
  checklist?: string[];
  faq?: { q: string; a: string }[];
  related?: { label: string; href: string }[];
  /** Primary call-to-action button at end of article. */
  primaryCta?: { label: string; href: string };
};

const TOPICS: Record<string, Topic> = {
  "about-us": {
    title: "Cybersilkroads — Con đường tơ lụa trên không gian mạng",
    intro:
      "Một tầm nhìn chiến lược do Việt Nam khởi xướng — biến vị thế ngã tư cáp quang biển thành cây cầu mềm cho dòng chảy tri thức, sáng tạo và thương mại số giữa các nền văn minh.",
    icon: "🌏",
    category: "TẦM NHÌN VIỆT NAM",
    quickFacts: [
      { label: "Khởi xướng", value: "Việt Nam" },
      { label: "Phạm vi", value: "Toàn cầu" },
      { label: "4 trụ cột", value: "Gateway · Merchants · Tech · Spirit" },
      { label: "Vận hành", value: "Beeagents.com" },
      { label: "Văn phòng", value: "Hà Nội + Quảng Châu" },
      { label: "Cam kết", value: "Hòa bình · Thịnh vượng" },
    ],
    sectionTitles: [
      "Định nghĩa & Bối cảnh",
      "Bốn trụ cột chính",
      "Phong cách & Tinh thần",
      "Sứ mệnh dành cho Việt Nam",
    ],
    paragraphs: [
      "Cybersilkroads là khái niệm chiến lược về 'Con đường tơ lụa trên không gian mạng' — do Việt Nam khởi xướng và làm trọng tâm. Khác với 'Digital Silk Road' (DSR) tập trung vào hạ tầng cứng và kiểm soát dữ liệu tập trung, Cybersilkroads tập trung vào sự kết nối mềm: dòng chảy tự do của tri thức, văn hóa, sáng tạo. Chúng tôi tận dụng vị trí 'ngã tư đường' của Việt Nam trong hệ thống cáp quang biển và các trung tâm dữ liệu khu vực, xây dựng kinh tế số dựa trên trí tuệ — lấy con người và nội dung sáng tạo làm hàng hóa cốt lõi thay vì chỉ thiết bị phần cứng.",
      "Cybersilkroads vận hành trên 4 trụ cột nền tảng. (A) Trọng điểm Kết nối — Việt Nam là cửa ngõ dữ liệu cho Đông Nam Á và thế giới qua hệ thống cáp quang biển và vị trí chiến lược tại Biển Đông; phát triển hạ tầng Cloud và Edge Computing tự chủ để bảo vệ chủ quyền dữ liệu. (B) Thương nhân số — đối tượng chính là cộng đồng lập trình viên, nhà sáng tạo nội dung, kỹ sư AI Việt Nam; 'hàng hóa' trên con đường này là phần mềm, nội dung số, giải pháp AI và giá trị văn hóa được mã hóa. (C) Công nghệ Nhân văn — tích hợp triết lý phương Đông vào thuật toán: sự tĩnh tại, tính nhân quả và sự cân bằng; công nghệ không chỉ để tăng trưởng kinh tế mà còn nuôi dưỡng hạnh phúc nội tâm và hòa bình xã hội. (D) Sự tự do & Khát vọng — mang âm hưởng phóng khoáng, mạnh mẽ kết hợp với sự chiêm nghiệm sâu sắc, không khoan nhượng trước áp đặt nhưng luôn mở lòng hợp tác toàn cầu.",
      "Cybersilkroads dùng ngôn ngữ và hình ảnh đối thoại giữa truyền thống và hiện đại — lụa là, gió mùa, ngã tư đường gặp gỡ mã nguồn, luồng dữ liệu, băng thông. Phong cách thể hiện sự hiểu biết sâu về công nghệ (Python, AI, Blockchain, 5G) đan xen tầm nhìn chiến lược. Cảm xúc nền tảng: mạnh mẽ, tự tin, tự do, từng trải. Không coi mình là đối đầu trực tiếp với bất kỳ mô hình nào khác — Cybersilkroads là một 'sự lựa chọn thay thế nhân văn và linh hoạt' cho các quốc gia đang phát triển muốn xây dựng không gian mạng vừa thịnh vượng vừa giữ được bản sắc.",
      "Trung tâm của Cybersilkroads là trí tuệ con người Việt Nam — những người 'dệt' nên con đường bằng từng dòng lệnh và sự sáng tạo. Mục tiêu cuối cùng: xây dựng một không gian mạng hòa bình, thịnh vượng, nơi Việt Nam đóng vai trò nhịp cầu kết nối các nền văn minh số. Trên thực tế, Cybersilkroads triển khai dưới dạng nền tảng B2B kết nối thương nhân Việt Nam với hệ sinh thái sản xuất khu vực — thương mại có ý nghĩa, có chiều sâu văn hóa, không chỉ là giao dịch. Vận hành bởi Beeagents.com.",
    ],
    pullQuote: {
      text: "Việt Nam không cạnh tranh để đối đầu — Việt Nam dệt nên một con đường khác. Cybersilkroads là cây cầu mềm cho tri thức, không phải bức tường cứng cho kiểm soát.",
      author: "Tầm nhìn Cybersilkroads",
    },
    checklist: [
      "🌐 Trọng điểm kết nối — vị thế ngã tư cáp quang biển Đông Nam Á",
      "👥 Thương nhân số — lập trình viên, sáng tạo nội dung, kỹ sư AI Việt Nam",
      "☯ Công nghệ nhân văn — triết lý phương Đông trong thuật toán",
      "🤘 Tinh thần tự do — mạnh mẽ, phóng khoáng, không khoan nhượng",
      "🤝 Lựa chọn thay thế — không đối đầu, mà bổ sung và linh hoạt",
      "🇻🇳 Trí tuệ Việt Nam — con người là trung tâm, dệt nên con đường",
    ],
    related: [
      { label: "Mạng lưới kết nối hiệp hội", href: "/info/network" },
      { label: "Quy trình kiểm định", href: "/info/audit-process" },
      { label: "Tin tức ngành", href: "/info/industry-news" },
      { label: "Liên hệ", href: "/info/contact" },
    ],
    primaryCta: { label: "Tham gia con đường tơ lụa số", href: "/buying-request" },
  },
  "careers": {
    title: "Tuyển dụng — Cùng Cybersilkroads đưa Việt Nam vươn mình",
    intro:
      "Việt Nam đang bước vào kỷ nguyên vươn mình của dân tộc. Cybersilkroads tin rằng cuộc bứt phá ấy phải được dệt nên bằng chính bàn tay và trí tuệ người Việt — bằng những kỹ sư công nghệ, nhà sáng tạo nội dung, và những người dám đặt lại câu hỏi cho cách thế giới vận hành. Chúng tôi liên tục tìm kiếm người tài trong lĩnh vực công nghệ, không vì một vị trí công việc, mà vì một tầm nhìn dài hạn: biến không gian mạng thành con đường tơ lụa thế kỷ 21 mà Việt Nam đứng ở vị trí trung tâm.",
    icon: "🚀",
    category: "TUYỂN DỤNG",
    quickFacts: [
      { label: "Vị trí mở", value: "37+" },
      { label: "Engineering", value: "18 vị trí" },
      { label: "Product & Design", value: "6 vị trí" },
      { label: "Sales & BD", value: "9 vị trí" },
      { label: "Văn phòng", value: "8 (5 VN + 3 ASEAN)" },
      { label: "Remote-friendly", value: "65% vị trí" },
      { label: "Stock options", value: "Senior trở lên" },
      { label: "Onboarding", value: "2 tuần có mentor" },
    ],
    sectionTitles: [
      "1. Sứ mệnh — Cybersilkroads trong kỷ nguyên vươn mình của dân tộc",
      "2. Văn hoá CSR — Triết lý phương Đông gặp công nghệ phương Tây",
      "3. Engineering & Product — 24 vị trí công nghệ đang mở",
      "4. Sales · BD · Operations — 13 vị trí kinh doanh và vận hành",
      "5. Lương, ESOP, phúc lợi & lộ trình phát triển",
      "6. Quy trình ứng tuyển — 6 bước, 2-3 tuần",
      "7. Một ngày làm việc tại CSR & câu chuyện những người đi cùng",
    ],
    paragraphs: [
      "Năm 2026, Việt Nam đang ở bước ngoặt lịch sử. Đảng và Nhà nước đặt mục tiêu trở thành quốc gia có thu nhập cao vào 2045 — nghĩa là chỉ 19 năm để đi từ nước thu nhập trung bình thấp lên thu nhập cao, một nhiệm vụ chưa từng có nước ASEAN nào hoàn thành ngoài Singapore và Hàn Quốc. Cuộc 'vươn mình' này không thể dựa vào lao động giá rẻ hay tài nguyên thô — nó chỉ có thể được xây dựng bằng công nghệ, đổi mới sáng tạo và hội nhập sâu vào chuỗi giá trị toàn cầu. Cybersilkroads chọn đứng ở chính giao điểm đó: chúng tôi xây nền tảng B2B công nghệ cao kết nối doanh nghiệp Việt Nam với hệ sinh thái sản xuất Trung Quốc và toàn ASEAN, biến vị thế ngã tư cáp quang biển của Việt Nam thành lợi thế cạnh tranh thực. Mỗi kỹ sư, mỗi nhà thiết kế, mỗi BD chúng tôi tuyển không chỉ làm việc cho một công ty — họ là một phần của cú vươn mình ấy. Từng dòng code, từng prototype, từng thương vụ đóng được đều là một viên gạch xây nên Việt Nam mới của 2045.",
      "Văn hoá CSR là sự gặp gỡ giữa hai thế giới. Bên trong, chúng tôi vận hành bằng triết lý phương Đông — tĩnh tại để nhìn rõ vấn đề trước khi hành động, nhân quả trong từng quyết định kỹ thuật, cân bằng giữa tốc độ và bền vững. Bên ngoài, chúng tôi giao tiếp với thế giới bằng ngôn ngữ công nghệ phương Tây — TypeScript, Rust, Kubernetes, vector database, LLM, distributed systems, observability. Không có 'leadership Trung Quốc' hay 'leadership Mỹ' áp đặt một cách máy móc; chúng tôi chọn cái phù hợp nhất cho từng tình huống. Chính sách rõ ràng: không micromanage — mỗi engineer được quyền chọn stack và cách giải quyết bài toán, miễn đạt SLA và performance budget; không meeting vô nghĩa — mọi cuộc họp ≥4 người phải có agenda viết trước, kết quả ghi lại; không bureaucracy — proposal kỹ thuật được approve hoặc reject trong 48 giờ, không treo. Chúng tôi đặt cao văn viết: mọi quyết định lớn đều có RFC (Request for Comments) công khai trong nội bộ — học từ Amazon, Stripe, Cloudflare. Chúng tôi expect mỗi thành viên đóng góp tối thiểu 1 sáng kiến/quý — không phải KPI, mà là cách văn hoá đảm bảo mọi người thực sự *suy nghĩ*, không chỉ thực thi.",
      "Engineering & Product (24 vị trí, ưu tiên cao nhất 2026): Senior/Staff Frontend Engineer (Next.js 16, React Server Components, Tailwind v4) × 4 — xây platform B2B cho 600+ đại lý Việt Nam, performance budget LCP <1.5s, stack TypeScript strict. Senior Backend Engineer (Node.js + PostgreSQL + Redis) × 3 — domain-driven design, event sourcing cho Bảo đảm Giao dịch (tài khoản trung gian), scale 10x trong 18 tháng. Distributed Systems Engineer (Go + gRPC + Kafka) × 2 — message bus xuyên biên giới, replication CN-VN, chịu network partitioning. AI/ML Engineer (LLM ops, RAG, fine-tuning) × 3 — RFQ matching engine, AI dispute mediation, Vietnamese NLP cho product description, hybrid search Meilisearch + vector DB. Data Engineer (dbt + Airflow + ClickHouse) × 2 — pipeline báo cáo thị trường, ETL từ SHFE/LME/Vietcombank/Tổng cục Hải quan. Site Reliability Engineer (Kubernetes + Terraform + Prometheus) × 2 — multi-region (HN, HCM, SG), 99.95% SLA cho API, on-call rotation. Security Engineer (penetration testing, SOC 2 audit prep) × 1 — chuẩn ISO 27001 và NĐ 13/2023. Mobile Engineer (React Native, Capacitor) × 1 — app cho buyer mua trên di động. Product Designer (Figma, design systems) × 3 — chúng tôi đang xây design system riêng kiểu Stripe DocSite, ưu tiên người hiểu B2B UX không chỉ B2C. Product Manager B2B × 2 — owner của RFQ flow và Bảo đảm Giao dịch, viết spec rõ ràng, từng làm enterprise SaaS hoặc fintech. DevRel Engineer × 1 — viết docs, code samples, talk tại tech conference cho cộng đồng dev VN.",
      "Sales · BD · Operations (13 vị trí): Quản lý tài khoản B2B × 4 (HN 2, HCM 2) — quản 80-120 dealer doanh nghiệp, target retention >85%, đi gặp khách 30% thời gian. Sales Development Representative × 3 — outbound enterprise sales cho doanh nghiệp ≥500 nhân viên, KPI 50 meeting/tháng. Bảo đảm Giao dịch Officer × 2 — mediation tranh chấp, hiểu về trung gian thanh toán, học luật thương mại quốc tế. Customs & Logistics Specialist × 1 (Hải Phòng) — VNACCS/VCIS expert, 5+ năm broker license. Partnership Manager × 1 — phụ trách quan hệ với hiệp hội (VCCI, HAWA, CCPIT), ký MOU, organize trade fair representation. Content Lead × 1 — biên tập Báo cáo thị trường, quản đội 4 analyst, có background economic research. Marketing Manager (B2B SEO + ABM) × 1. Tất cả JD chi tiết kèm mức lương min/max và kỳ vọng cụ thể đều public tại careers.cybersilkroads.com — chúng tôi tin minh bạch lương là điều kiện đầu của một thị trường lao động lành mạnh.",
      "Lương & ESOP: chúng tôi trả lương cứng theo benchmark Top 25% thị trường VN cho từng role, kèm ESOP (Employee Stock Options) cho mọi nhân viên cấp Senior trở lên. Vesting 4 năm với cliff 1 năm theo chuẩn YC — strike price thấp đáng kể so với fair market value tại thời điểm grant. Bonus quý theo KPI cá nhân + công ty (10-30% lương cứng). Sales/Account commission 8-15% deal closed, không cap. Phúc lợi đầy đủ và vượt chuẩn: BHXH BHYT đúng luật, bảo hiểm sức khoẻ private (Bảo Việt Premium hoặc tương đương) cho nhân viên + người thân từ năm 2 với hạn mức 1 tỷ VNĐ/năm, gói khám sức khoẻ định kỳ tại Vinmec/FV/Family Medical Practice; ngân sách đào tạo cá nhân 25-40 triệu VNĐ/năm (sách, khoá online, conference, certification — Engineering có ngân sách AWS/GCP credit riêng); macbook hoặc thinkpad theo lựa chọn; setup home office 15 triệu VNĐ. 18 ngày phép năm + thưởng Tết tháng 13 + thưởng dự án. Văn hoá thực tế: 6 ngày work-from-anywhere/năm (làm tại Đà Lạt, Hội An, Bali tuỳ chọn), Friday off đầu mỗi quý. Lộ trình phát triển: Junior → Mid → Senior → Staff/Lead → Principal/Manager → Director/VP, mỗi cấp tăng 25-40% lương; tracks song song cho Engineering (Individual Contributor) và Management — không bắt engineer giỏi phải lên manager nếu không muốn. Performance review 6 tháng một lần, công khai criteria và process.",
      "Quy trình ứng tuyển (6 bước, 2-3 tuần): (1) Apply qua careers.cybersilkroads.com hoặc gửi CV về hr@cybersilkroads.com kèm portfolio/GitHub nếu có. (2) HR screening 3-5 ngày — chúng tôi cam kết phản hồi 100% ứng viên (kể cả không pass), không bao giờ ghosting. (3) Phỏng vấn HR (30 phút) tìm hiểu motivation và compensation expectation. (4) Phỏng vấn kỹ thuật với Hiring Manager (60 phút) — Engineering: review một dự án bạn từng làm, hỏi sâu về trade-offs; Sales/BD: roleplay 1 tình huống thực với buyer khó tính; Product: design challenge live. (5) Bài test thực tế (4-8 giờ làm tại nhà, có thời hạn 5 ngày) — Engineering nhận một take-home phản ánh bài toán thực CSR đang giải; Sales nhận case study. Bài test được PAID nếu chất lượng cao kể cả không offer (chúng tôi đánh giá bằng giờ làm việc của bạn). (6) Onsite/video round cuối với Founder + 1-2 senior — thiên về văn hoá, vision, long-term fit. Offer trong 5-7 ngày kể từ round cuối, có 1 tuần để ứng viên decide. Negotiate được — chúng tôi tôn trọng đối thoại lương minh bạch, không hờn dỗi.",
      "Một ngày tại CSR (Engineering Hà Nội): 9:00 đến văn phòng tầng 21 Diamond Flower hoặc đăng nhập từ home (theo lịch hybrid 2-3 ngày tại VP/tuần). 9:30 standup async qua Linear (15 phút viết, không họp video) — mọi người đọc trong giờ thuận tiện. 10:00-12:00 deep work block — không meeting, không Slack, focus mode. 12:00-13:30 ăn trưa cùng team (canteen tầng 4 hoặc đặt đồ — chi phí ăn trưa hỗ trợ 50k/ngày), thường có discussion ngẫu nhiên về kỹ thuật, sách, hoặc thị trường. 14:00 sprint review (45 phút thứ 5) hoặc deep work tiếp. 15:30 1-1 với manager (15 phút mỗi tuần — mandatory, không cancel). 16:00-18:00 deep work hoặc pair programming. 18:00 về. Đội Engineering có Tech Talk Friday (60 phút, ai có topic đăng ký) — tháng qua có buổi về 'PostgreSQL TOAST and why we redesigned product description storage', 'LLM cost optimization at $0.002 per RFQ match'. Câu chuyện điển hình: Hùng — Frontend Engineer, gia nhập 2024 từ một startup edtech, sau 18 tháng lên Senior, đang lead redesign full Buyer Center. Hân — Product Designer, từng làm tại một bank, gia nhập CSR vì 'lần đầu tiên thấy B2B làm UX nghiêm túc tại Việt Nam'. Wei — Distributed Systems, người Đài Loan, làm remote từ Đài Bắc, đến Hà Nội 1 tuần/quý — chứng minh chúng tôi remote-first thật sự, không nói cho có.",
    ],
    pullQuote: {
      text: "Việt Nam vươn mình không phải bằng khẩu hiệu — nó vươn mình bằng dòng code chất lượng, bằng quyết định kỹ thuật đúng, bằng những người trẻ chọn ở lại trong nước thay vì ra đi. Chúng tôi tuyển những người ấy, vì họ chính là Việt Nam của 2045.",
      author: "Phạm Phương — Founder & CEO Cybersilkroads",
    },
    checklist: [
      "💰 Lương Top 25% thị trường VN + ESOP cho Senior trở lên (vesting 4 năm)",
      "🏥 Bảo hiểm sức khoẻ private hạn mức 1 tỷ VNĐ/năm cho nhân viên + người thân",
      "📚 Ngân sách đào tạo cá nhân 25-40 triệu VNĐ/năm",
      "💻 Macbook hoặc Thinkpad + 15 triệu setup home office",
      "🌏 65% vị trí remote-friendly · 6 ngày work-from-anywhere/năm",
      "📈 Tracks song song IC + Management — không bắt engineer phải lên manager",
      "🤝 Cam kết phản hồi 100% ứng viên, không ghosting · Bài test PAID nếu chất lượng cao",
      "🇻🇳 Cùng đưa Việt Nam vươn mình trong kỷ nguyên 2026-2045",
    ],
    faq: [
      {
        q: "Tôi không có background công nghệ truyền thống (không CS degree, tự học) — có cơ hội không?",
        a: "Hoàn toàn có. Chúng tôi đánh giá bằng portfolio và bài test thực tế, không bằng cấp. ~30% engineer hiện tại của CSR học từ bootcamp, tự học, hoặc chuyển ngành (vật lý, toán, kỹ thuật khác). Quan trọng là cách bạn nghĩ về vấn đề và cách bạn học. Nếu bạn có GitHub repo chứng minh hoặc sản phẩm thực đã ship, đó là tín hiệu mạnh hơn nhiều so với CV chuẩn FAANG.",
      },
      {
        q: "So với FAANG / Big Tech / Bank thì sao?",
        a: "Lương cứng có thể thấp hơn FAANG 15-25% (chúng tôi không thể beat Google offer USD), nhưng ESOP có upside cao đáng kể nếu CSR thành công như kế hoạch. Workload cân bằng hơn — không có on-call 24/7 cho 80% role, không có code review 50 người, không có ladder politics ngột ngạt. Quan trọng nhất: tại CSR bạn build sản phẩm cho Việt Nam, đứng đầu thị trường vertical mình chọn — impact thực, không phải chỉ tối ưu một feature trong rừng feature. Nhiều người chuyển từ FAANG/Big4 về CSR vì lý do meaning, không vì lương.",
      },
      {
        q: "Có chương trình internship / fresher không?",
        a: "Có. Chương trình 'CSR Forge' 6 tháng cho fresher Engineering / Design / Content / Sales — lương 8-15 triệu/tháng tuỳ track, mentor 1-1 với Senior, có roadmap cụ thể, kết thúc 6 tháng có review chuyển full-time (tỷ lệ chuyển 78%). Recruit 2 đợt/năm — tháng 3 và tháng 9, công bố trên careers.cybersilkroads.com và LinkedIn 6 tuần trước.",
      },
      {
        q: "Văn phòng có chế độ remote như thế nào?",
        a: "65% vị trí remote-friendly. Engineering, Design, Content, Marketing có thể fully remote sau probation 3 tháng (vào VP 1 ngày/tuần khi cần). Sales/Account on-site 3 ngày/tuần vì gặp khách hàng. Logistics/Customs (Hải Phòng) on-site full vì tính chất công việc. Có nhân viên remote tại Đà Lạt, Đà Nẵng, Hội An, Singapore, Đài Bắc — chúng tôi không phân biệt remote vs onsite trong promotion hay project assignment.",
      },
      {
        q: "Tôi có thể đi công tác Trung Quốc / ASEAN không?",
        a: "Có, là một trong những điểm hấp dẫn nhất. Quản lý tài khoản, Sourcing, Partnership Manager đi Trung Quốc 2-4 lần/năm (Canton Fair, NCC visit, MOU signing với hiệp hội). Engineering/Product cũng có cơ hội đi 1-2 lần/năm cho user research với NCC. Vị trí ASEAN-facing có thể công tác Bangkok / Jakarta / Singapore. Toàn bộ visa, vé, khách sạn, ăn uống do CSR chi trả 100%; per diem $80-120/ngày tuỳ thành phố.",
      },
      {
        q: "Có yêu cầu tiếng Trung không?",
        a: "Đa số vị trí Engineering / Product / Design tại Hà Nội KHÔNG yêu cầu tiếng Trung — tiếng Anh thương mại tốt là đủ. Sourcing, Partnership với hiệp hội Trung Quốc cần HSK 4+ hoặc tiếng Trung thương mại. Chúng tôi hỗ trợ ngân sách học tiếng Trung tại Tâm Việt / Hanu Confucius Institute cho nhân viên muốn phát triển — đã có 12 nhân viên tham gia chương trình này trong 2025.",
      },
      {
        q: "Quy trình tuyển có bài test mất nhiều thời gian — có được trả phí không?",
        a: "Có. Bài take-home Engineering tốn trung bình 4-8 giờ. Nếu chất lượng đạt mức 'thực sự nghiêm túc' theo đánh giá của Hiring Manager (kể cả khi cuối cùng không offer vì lý do khác), CSR trả $50-150 tuỳ độ phức tạp. Đây là cách chúng tôi tôn trọng thời gian của ứng viên. Bài test cho Sales/BD và Design không có format take-home dài nên không có khoản này.",
      },
      {
        q: "CSR có support visa cho người nước ngoài không?",
        a: "Có. Chúng tôi đã sponsor work permit cho 4 engineer nước ngoài (Đài Loan, Singapore, Indonesia, Hàn Quốc) trong 2024-2025. Chi phí visa, thẻ tạm trú, dịch thuật do CSR chi trả. Yêu cầu: vị trí Senior trở lên (theo quy định Bộ LĐ-TBXH cho lao động nước ngoài tại VN). Có gói relocation 30-60 triệu VNĐ tuỳ trường hợp.",
      },
    ],
    related: [
      { label: "Liên hệ HR", href: "/info/contact" },
      { label: "Mạng lưới kết nối hiệp hội", href: "/info/network" },
      { label: "Giới thiệu CSR", href: "/info/about-us" },
      { label: "Văn hoá kỹ thuật (Engineering Blog)", href: "/info/industry-news" },
    ],
    primaryCta: { label: "Gửi CV — cùng dệt con đường tơ lụa số", href: "mailto:hr@cybersilkroads.com" },
  },
  "terms-of-service": {
    title: "Điều khoản sử dụng — Cybersilkroads (CSR)",
    intro:
      "Đây là thoả thuận pháp lý ràng buộc giữa bạn và Cybersilkroads (CSR), vận hành bởi Beeagents.com — một pháp nhân đăng ký tại Việt Nam (mã số doanh nghiệp 0XXXXXXXXX). Vui lòng đọc kỹ trước khi sử dụng nền tảng. Bằng việc đăng ký tài khoản, gửi RFQ, hoặc bất kỳ giao dịch nào trên nền tảng, bạn xác nhận đã hiểu, chấp nhận và đồng ý chịu sự ràng buộc của toàn bộ điều khoản dưới đây.",
    icon: "📜",
    category: "PHÁP LÝ",
    quickFacts: [
      { label: "Phiên bản", value: "v3.2 (2026)" },
      { label: "Hiệu lực từ", value: "01/01/2026" },
      { label: "Pháp lý áp dụng", value: "Luật Việt Nam" },
      { label: "Trọng tài", value: "VIAC Hà Nội" },
      { label: "Liability cap", value: "$10,000 / giao dịch" },
      { label: "Notice period", value: "30 ngày" },
      { label: "Refund policy", value: "100% (Bảo đảm Giao dịch)" },
      { label: "Pháp nhân", value: "Beeagents.com" },
    ],
    sectionTitles: [
      "1. Phạm vi áp dụng & Định nghĩa",
      "2. Đăng ký tài khoản & Xác minh",
      "3. Quyền & Nghĩa vụ Buyer (Người mua)",
      "4. Quyền & Nghĩa vụ Supplier (NCC)",
      "5. Giao dịch, Thanh toán & Bảo đảm Giao dịch",
      "6. Vận chuyển, Hải quan & Thuế",
      "7. Hoàn tiền, Đổi hàng & Bồi thường",
      "8. Sở hữu trí tuệ & Cấm hành vi",
      "9. Bảo mật, Cookies & Dữ liệu cá nhân",
      "10. Trách nhiệm & Giới hạn pháp lý",
      "11. Bất khả kháng (Force Majeure)",
      "12. Tranh chấp, Trọng tài & Luật áp dụng",
      "13. Chấm dứt & Đóng tài khoản",
      "14. Sửa đổi điều khoản & Thông báo",
    ],
    paragraphs: [
      "Cybersilkroads (sau đây gọi tắt 'CSR' hoặc 'Nền tảng') là nền tảng B2B trung gian kết nối người mua tại Việt Nam với nhà cung cấp tại Trung Quốc và khu vực ASEAN. CSR vận hành tại các tên miền cybersilkroads.com, vi.cybersilkroads.com, en.cybersilkroads.com, cn.cybersilkroads.com cùng các mobile app phụ trợ. Pháp nhân chính: Beeagents.com (Việt Nam, MST 0XXXXXXXXX) — văn phòng Hà Nội + công ty con CSR China Sourcing Co., Ltd. tại Quảng Châu. CSR KHÔNG sở hữu hàng hoá của Supplier, KHÔNG là bên bán hàng trực tiếp, mà đóng vai trò: nền tảng kỹ thuật, dịch vụ trung gian (trung gian + Bảo đảm Giao dịch), nhà cung cấp dịch vụ logistics + audit. Người dùng phân thành 4 nhóm: (a) Visitor — chưa đăng ký, xem được nội dung công khai. (b) Buyer — cá nhân/doanh nghiệp Việt Nam mua hàng (yêu cầu đủ 18 tuổi, đại diện pháp lý nếu thay mặt doanh nghiệp). (c) Supplier — NCC đã pass quy trình audit 5 bước (xem /info/audit-process), được phân tier Đã xác minh / Vàng / Cao cấp. (d) Partner — đối tác chiến lược (logistics, payment, certification, training).",
      "Đăng ký tài khoản yêu cầu cung cấp thông tin chính xác: họ tên, email, số điện thoại di động (xác minh OTP), công ty + mã số thuế (cho doanh nghiệp), địa chỉ giao hàng tại Việt Nam. Mỗi cá nhân chỉ được tạo tối đa 1 tài khoản Buyer; doanh nghiệp có thể có 1 master account + tối đa 10 sub-account cho nhân viên. CSR thực hiện KYC (Know Your Customer) cho mọi giao dịch ≥$10,000 USD theo Luật Phòng chống rửa tiền VN — Buyer cần cung cấp giấy phép kinh doanh + CCCD đại diện pháp lý. Bạn có trách nhiệm bảo mật mật khẩu, không chia sẻ tài khoản — CSR không chịu trách nhiệm cho thiệt hại do bạn để lộ thông tin đăng nhập. Khuyến nghị bật 2FA tại /buyer-center/settings/security. CSR có quyền tạm khoá hoặc chấm dứt tài khoản (theo quy trình ở Mục 13) nếu: thông tin gian lận, hành vi spam, vi phạm bản quyền, lạm dụng trung gian, vi phạm điều khoản này, hoặc theo yêu cầu hợp pháp của cơ quan chức năng.",
      "Quyền của Buyer: (i) Truy cập miễn phí toàn bộ nền tảng — KHÔNG có phí thành viên, phí giao dịch, hoặc commission. (ii) Gửi không giới hạn RFQ tới Supplier verified. (iii) Sử dụng dịch vụ Bảo đảm Giao dịch (Trung gian) miễn phí cho mọi đơn ≥$100. (iv) Yêu cầu audit on-site free cho đơn ≥$5,000 USD. (v) Hỗ trợ Customer Success 24/7 tiếng Việt. (vi) Quyền khiếu nại trong 7 ngày kể từ ngày nhận hàng. (vii) Quyền truy cập, sửa, xoá dữ liệu cá nhân theo NĐ 13/2023. Nghĩa vụ của Buyer: (a) Cung cấp thông tin chính xác khi đăng ký + giao dịch. (b) Tuân thủ pháp luật Việt Nam (đặc biệt: cấm nhập hàng giả, hàng cấm, hàng vi phạm IP đã đăng ký tại VN). (c) Thanh toán đầy đủ, đúng hạn theo PI/PO đã ký. (d) Phản hồi yêu cầu xác nhận hàng trong 14 ngày kể từ ngày giao (sau đó hệ thống auto-release). (e) KHÔNG sử dụng nền tảng cho hoạt động bất hợp pháp (rửa tiền, trốn thuế, gian lận).",
      "Quyền của Supplier: (i) Hiển thị sản phẩm + nhận RFQ từ Buyer Việt Nam. (ii) Hưởng commission rate cạnh tranh (5% cho đơn thông thường, 3% cho hội viên Vàng). (iii) Quyền pre-screen Buyer — từ chối đơn không phù hợp capability. (iv) Hỗ trợ marketing tại Việt Nam (landing page tiếng Việt, dịch catalogue). (v) Báo cáo audit blockchain-signed có giá trị marketing. Nghĩa vụ của Supplier: (a) Pass quy trình audit 5 bước trước khi go-live. (b) Cập nhật giá + MOQ + thời gian giao chính xác. (c) Phản hồi RFQ trong 24 giờ. (d) Sản xuất + giao hàng đúng PO đã ký, không thay đổi spec không thông báo. (e) Hợp tác với QC inspector của CSR trước xuất xưởng. (f) Không bypass nền tảng (cấm liên hệ Buyer ngoài CSR để giao dịch trực tiếp — vi phạm bị banned vĩnh viễn + phạt 5% giá trị đơn).",
      "Mọi giao dịch ≥$100 USD trên CSR được bảo vệ bởi Bảo đảm Giao dịch (Trung gian) — đây là điểm khác biệt cốt lõi của nền tảng. Cơ chế: (1) Buyer thanh toán T/T 30% deposit + 70% balance vào tài khoản trung gian của CSR tại ngân hàng đối tác (Vietcombank cho VND, Bank of China + HSBC cho USD). (2) Tiền KHÔNG được release cho Supplier cho đến khi: Buyer xác nhận hàng đúng mô tả qua dashboard, HOẶC 14 ngày kể từ ngày giao mà Buyer không phản hồi (auto-release), HOẶC dispute được giải quyết theo Mục 7. (3) Phí dịch vụ: CSR thu 5% commission từ Supplier (KHÔNG thu Buyer). (4) Phương thức thanh toán hỗ trợ: T/T (telegraphic transfer), Letter of Credit (L/C — cho đơn ≥$100K), Online Banking quốc tế qua Wise/Payoneer (cho đơn nhỏ <$5K). (5) Tỷ giá: theo Vietcombank realtime, có buffer 0.5% phòng biến động. (6) Phí ngân hàng: Buyer trả phí chuyển tiền đi (~0.1-0.3%), Supplier trả phí nhận tiền về.",
      "Vận chuyển hàng hoá tuân thủ Incoterms 2020 (FOB / CIF / DDP) — chi tiết tại /info/shipping-policy. Hải quan: CSR Logistics đứng tên doanh nghiệp khai báo (theo uỷ quyền của Buyer), sử dụng e-customs Tổng cục Hải quan VN. Thuế nhập khẩu: tính theo HS code chính xác + biểu thuế MFN của Bộ Tài chính (riêng hàng từ Trung Quốc/ASEAN có ưu đãi ACFTA, RCEP — giảm 0-10%). VAT: 10% trên giá CIF + thuế nhập khẩu. Thuế tiêu thụ đặc biệt: chỉ áp dụng cho rượu, bia, thuốc lá (CSR không kinh doanh các mặt hàng này). Phí thông quan: $80-150/lô, đã bao gồm trong DDP. Buyer chịu trách nhiệm: cung cấp thông tin HS code chính xác, đảm bảo hàng không thuộc Danh mục cấm nhập (Phụ lục Nghị định 69/2018/NĐ-CP), thanh toán bổ sung nếu hải quan re-classify HS code dẫn đến thuế cao hơn (CSR thông báo trước, Buyer có 7 ngày phản hồi).",
      "Bảo đảm Giao dịch Refund Policy: Buyer có quyền yêu cầu hoàn tiền/đổi hàng/bồi thường nếu hàng không đúng cam kết. Quy trình: (Bước 1) Gửi khiếu nại qua dashboard hoặc dispute@cybersilkroads.com TRONG 7 NGÀY kể từ ngày nhận hàng, kèm chứng cứ (ảnh, video, biên bản nghiệm thu). (Bước 2) Đội Bảo đảm Giao dịch review trong 24 giờ, liên hệ Buyer + Supplier để xác minh. (Bước 3) Quyết định trong 3-7 ngày làm việc với 4 phương án: (a) Hoàn 100% từ tài khoản trung gian — nếu hàng sai mô tả nghiêm trọng (sai SKU, sai chủng loại). (b) Đổi hàng miễn phí — Supplier sản xuất lại + free DDP về VN, thời gian giao mới được commit. (c) Bồi thường thoả thuận — giảm giá X% nếu lỗi nhỏ Buyer chấp nhận giữ. (d) Hỗ trợ giảm giá đơn tiếp — Buyer dùng credit cho lần sau. Lịch sử Q1-Q3/2025: 312 dispute, 87% giải quyết có lợi cho Buyer, 13% chia đôi 50/50, 0% Buyer thua hoàn toàn. Trường hợp dispute không thoả thuận được trong 21 ngày → chuyển lên trọng tài VIAC theo Mục 12.",
      "Toàn bộ nội dung do CSR tạo ra (giao diện, code, brand identity, tài liệu, hình ảnh original, video, blog post) thuộc bản quyền của Beeagents.com. Người dùng được phép xem, in cho mục đích cá nhân/doanh nghiệp nội bộ; KHÔNG được sao chép, phân phối, sửa đổi, reverse-engineer mà không có văn bản đồng ý. Hình ảnh sản phẩm do Supplier upload thuộc bản quyền của Supplier — Buyer chỉ được dùng cho mục đích bán lại sản phẩm đó của Supplier (không dùng cho sản phẩm khác). Logo 'Cybersilkroads' và 'CSR' là nhãn hiệu đã đăng ký bảo hộ tại Cục Sở hữu trí tuệ VN (số đăng ký 4-202X-XXXXX). Cấm hành vi: scraping nền tảng (rate limit + WAF), tạo tài khoản fake hàng loạt, spam RFQ vô tổ chức, đăng nội dung vi phạm IP/khiêu dâm/bạo lực, lừa đảo Buyer khác, đe doạ/quấy rối nhân viên CSR. Vi phạm bị xử lý theo Luật Sở hữu trí tuệ VN + Bộ luật Hình sự nếu cần.",
      "CSR thu thập, xử lý dữ liệu cá nhân theo Chính sách bảo mật chi tiết tại /info/privacy-policy — tuân thủ NĐ 13/2023/NĐ-CP, PIPL 2021 và GDPR khi áp dụng. Người dùng có 11 quyền cơ bản (xem, sửa, xoá, hạn chế xử lý, portability, etc.) — gửi yêu cầu tới privacy@cybersilkroads.com. Truyền dữ liệu xuyên biên giới VN–CN qua SCCs đã đăng ký Cục An toàn thông tin (mã TDXBG-2026-XXXX). Cookies: 4 nhóm (thiết yếu / phân tích / marketing / partner), banner consent với 3 lựa chọn — chi tiết tại /info/quan-ly-cookies. CSR KHÔNG bán dữ liệu cho data broker. Lưu giữ chứng từ giao dịch 10 năm theo Luật Quản lý thuế VN. Khi Buyer đóng tài khoản: hard-delete trong 30 ngày + cấp Certificate of Erasure nếu yêu cầu.",
      "Trách nhiệm của CSR giới hạn ở việc cung cấp nền tảng + dịch vụ trung gian theo điều khoản này. CSR cam kết uptime ≥99.5% (đo trên cybersilkroads-status.io) nhưng KHÔNG bảo đảm liên tục 100% — gián đoạn do bảo trì định kỳ thông báo 48h trước. CSR cung cấp thông tin Supplier dựa trên audit thực tế nhưng KHÔNG bảo đảm tuyệt đối — Buyer có trách nhiệm tự thẩm định bổ sung khi cần (đặc biệt với đơn ≥$50K). Trách nhiệm bồi thường tối đa của CSR cho mỗi giao dịch giới hạn ở: (a) Giá trị giao dịch đó, hoặc (b) $10,000 USD, tuỳ theo số nào nhỏ hơn. CSR KHÔNG chịu trách nhiệm cho thiệt hại gián tiếp như: mất doanh thu kỳ vọng, thiệt hại uy tín thương hiệu, mất khách hàng cuối, chi phí cơ hội, lãi vay phát sinh do delay. Trường hợp CSR cố ý vi phạm (gross negligence/willful misconduct), giới hạn này không áp dụng theo Điều 442 Bộ luật Dân sự VN.",
      "Bất khả kháng (Force Majeure): CSR, Buyer và Supplier được miễn trách nhiệm nếu không thực hiện được nghĩa vụ do sự kiện vượt khả năng kiểm soát hợp lý, bao gồm nhưng không giới hạn: (i) Thiên tai (động đất, lũ lụt, bão, hoả hoạn). (ii) Chiến tranh, khủng bố, bạo loạn, đình công công cộng. (iii) Sự cố hạ tầng quốc gia (đứt cáp internet quốc tế, mất điện diện rộng, đóng cửa khẩu). (iv) Đại dịch quy mô lớn (COVID-style lockdown). (v) Quyết định/lệnh của cơ quan nhà nước (cấm vận, thay đổi chính sách thuế đột ngột, đình chỉ tạm thời ngành sản xuất). (vi) Sự cố cyberattack quy mô quốc gia (DDoS đại quy mô không thể chống đỡ thông thường). Bên gặp force majeure phải thông báo bên kia trong 5 ngày kể từ khi sự kiện xảy ra. Nếu sự kiện kéo dài >60 ngày, các bên có quyền đàm phán huỷ hợp đồng + hoàn cọc theo tỉ lệ hoàn thành công việc.",
      "Tranh chấp 3 cấp giải quyết: (Cấp 1 — Mediation tại CSR) Đội Dispute Resolution trung gian đàm phán Buyer + Supplier trong 7 ngày làm việc. Tỉ lệ thoả thuận thành: 91%. Miễn phí. (Cấp 2 — Trọng tài VIAC) Nếu không thoả thuận được, vụ việc được chuyển lên Trung tâm Trọng tài Quốc tế Việt Nam (VIAC) tại Hà Nội theo Quy tắc tố tụng VIAC 2017. Ngôn ngữ: tiếng Việt (mặc định) hoặc tiếng Anh (theo thoả thuận). Số trọng tài viên: 1 (cho tranh chấp <$50K), 3 (cho ≥$50K). Phí trọng tài theo biểu phí VIAC (~3-5% giá trị tranh chấp), phân chia theo phán quyết. Quyết định VIAC là CUỐI CÙNG và RÀNG BUỘC, có giá trị thi hành tại Việt Nam và Trung Quốc theo Công ước New York 1958. (Cấp 3 — Toà án) Tranh chấp giữa Người dùng và CSR (không liên quan giao dịch) áp dụng luật Việt Nam, toà án có thẩm quyền là TAND TP Hà Nội. CSR KHÔNG chấp nhận đơn kiện tập thể (class-action) — mỗi tranh chấp giải quyết cá nhân.",
      "Chấm dứt tài khoản: (a) Người dùng tự nguyện đóng — bất cứ lúc nào qua /buyer-center/settings, hoàn tất trong 7 ngày làm việc, dữ liệu lưu 90 ngày để xử lý nốt giao dịch đang dở rồi hard-delete. (b) CSR chấm dứt do người dùng vi phạm — thông báo bằng văn bản qua email 7 ngày trước khi áp dụng, trừ trường hợp khẩn cấp (gian lận trung gian, cyberattack). Người dùng có 7 ngày để giải trình hoặc khôi phục. (c) CSR chấm dứt do vi phạm pháp luật — áp dụng ngay, không thông báo trước; CSR có thể hợp tác với cơ quan điều tra. Sau chấm dứt: tài khoản vô hiệu hoá, không đăng nhập được; giao dịch đang xử lý vẫn được hoàn tất theo trạng thái tài khoản trung gian; tiền cọc của Buyer được hoàn theo Mục 7; commission của Supplier được giải quyết theo PO ký trước thời điểm chấm dứt.",
      "CSR có quyền sửa đổi điều khoản này để phù hợp với pháp luật, công nghệ và thực tế kinh doanh. Quy trình: (i) Soạn thảo + review nội bộ + Legal Counsel ký duyệt. (ii) Thông báo người dùng 30 NGÀY trước khi áp dụng qua: email cho mọi tài khoản đang hoạt động, banner trên website + app, push notification mobile app. (iii) Người dùng tiếp tục sử dụng nền tảng sau ngày hiệu lực = chấp nhận điều khoản mới. Người dùng không đồng ý có quyền đóng tài khoản trước ngày hiệu lực — không bị tính phí, dữ liệu hoàn tất xoá theo Mục 13. (iv) Phiên bản cũ được archive tại /info/terms-of-service/lich-su để tham chiếu. (v) Trường hợp thay đổi material ảnh hưởng quyền lợi (vd: tăng commission rate, thay đổi liability cap), CSR yêu cầu re-consent rõ ràng — không tự động áp dụng.",
    ],
    pullQuote: {
      text: "Điều khoản sử dụng không phải để bảo vệ chúng tôi khỏi bạn — mà để định nghĩa rõ ràng cách Cybersilkroads, Buyer và Supplier hợp tác công bằng. Sự minh bạch là nền tảng của niềm tin B2B.",
      author: "Lê Hoàng Quân — Legal Counsel Cybersilkroads",
    },
    checklist: [
      "Pháp nhân Beeagents.com (Việt Nam, MST 0XXXXXXXXX) — đăng ký kinh doanh đầy đủ",
      "Tuân thủ Luật Việt Nam: Bộ luật Dân sự, Luật Thương mại, Luật Quản lý thuế, NĐ 13/2023, NĐ 69/2018",
      "Bảo đảm Giao dịch (Trung gian) tại Vietcombank, BIDV, Bank of China — bảo vệ 100% giá trị giao dịch",
      "Trọng tài 3 cấp: Mediation CSR (91% thoả thuận) → VIAC Hà Nội → TAND Hà Nội",
      "Liability cap $10K hoặc giá trị giao dịch (tuỳ thấp hơn) — tuân thủ Điều 442 BLDS VN",
      "Quy trình refund Bảo đảm Giao dịch: 87% có lợi Buyer (báo cáo Q1-Q3/2025)",
      "Force majeure clause đầy đủ — bảo vệ cả 3 bên khi sự cố ngoài kiểm soát",
      "Notice 30 ngày khi sửa đổi material + re-consent rõ ràng",
    ],
    faq: [
      {
        q: "Tôi có thể từ chối điều khoản không?",
        a: "Có. Nếu không đồng ý, đừng đăng ký tài khoản hoặc giao dịch. Bạn vẫn có thể xem nội dung công khai (sản phẩm, blog, info pages) như Visitor mà không bị ràng buộc bởi điều khoản giao dịch.",
      },
      {
        q: "Điều khoản có áp dụng cho Buyer cá nhân không?",
        a: "Có, nhưng CSR ưu tiên dịch vụ cho Buyer doanh nghiệp (có MST). Buyer cá nhân được phép giao dịch nhưng giới hạn $5,000 USD/đơn (theo quy định Phòng chống rửa tiền) và một số dịch vụ enterprise (audit free, quản lý tài khoản dedicated) không áp dụng.",
      },
      {
        q: "Liability cap $10K có áp dụng cho mọi trường hợp không?",
        a: "Không. Cap không áp dụng khi CSR cố ý vi phạm (gross negligence/willful misconduct) hoặc trong trường hợp pháp luật VN buộc trách nhiệm vô hạn (Điều 442 BLDS — vi phạm hợp đồng có yếu tố lừa đảo).",
      },
      {
        q: "Tôi muốn kiện CSR ở Trung Quốc được không?",
        a: "Theo điều khoản này, mọi tranh chấp giải quyết tại Việt Nam (VIAC Hà Nội hoặc TAND Hà Nội). Tuy nhiên, quyết định VIAC có hiệu lực thi hành tại TQ theo Công ước New York 1958, nên Buyer có thể yêu cầu enforcement tại TQ nếu cần.",
      },
      {
        q: "CSR có thể đổi commission rate đột ngột không?",
        a: "Không. Thay đổi commission rate (hiện 5%) là thay đổi material ảnh hưởng quyền lợi của Supplier — phải thông báo 30 ngày trước + có quyền opt-out (đóng tài khoản trước ngày hiệu lực, không bị penalty).",
      },
    ],
    related: [
      { label: "Chính sách bảo mật", href: "/info/privacy-policy" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
      { label: "Khiếu nại & tranh chấp", href: "/info/disputes" },
      { label: "Chính sách vận chuyển", href: "/info/shipping-policy" },
      { label: "Liên hệ Legal", href: "/info/contact" },
    ],
    primaryCta: { label: "Có thắc mắc? Liên hệ Legal", href: "/info/contact" },
  },
  "privacy-policy": {
    title: "Chính sách bảo mật & Bảo vệ dữ liệu cá nhân",
    intro:
      "Cybersilkroads (CSR) — vận hành bởi Beeagents.com — cam kết bảo mật dữ liệu người dùng theo tiêu chuẩn ISO/IEC 27001:2022, Nghị định 13/2023/NĐ-CP của Việt Nam, Personal Information Protection Law (PIPL) của Trung Quốc và GDPR (EU) khi áp dụng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ, chia sẻ và bảo vệ dữ liệu cá nhân của bạn — bằng ngôn ngữ rõ ràng, không ẩn ý.",
    icon: "🔒",
    category: "PHÁP LÝ",
    quickFacts: [
      { label: "Phiên bản", value: "v3.2 (2026)" },
      { label: "Hiệu lực từ", value: "01/01/2026" },
      { label: "Tiêu chuẩn", value: "ISO/IEC 27001:2022" },
      { label: "Mã hoá", value: "TLS 1.3 + AES-256" },
      { label: "Tuân thủ VN", value: "NĐ 13/2023" },
      { label: "Tuân thủ CN", value: "PIPL 2021" },
      { label: "DPO", value: "privacy@cybersilkroads.com" },
      { label: "Notify breach", value: "<72 giờ" },
    ],
    sectionTitles: [
      "1. Phạm vi & Định nghĩa",
      "2. Thông tin chúng tôi thu thập",
      "3. Mục đích & Cơ sở pháp lý xử lý",
      "4. Cookies & Công nghệ theo dõi",
      "5. Chia sẻ với bên thứ ba",
      "6. Truyền dữ liệu xuyên biên giới VN–CN",
      "7. Lưu trữ & Vòng đời dữ liệu",
      "8. Biện pháp bảo mật kỹ thuật & tổ chức",
      "9. 11 Quyền của bạn theo NĐ 13/2023",
      "10. Bảo vệ trẻ em dưới 16 tuổi",
      "11. Sự cố dữ liệu & Quy trình thông báo",
      "12. Sửa đổi chính sách & Liên hệ DPO",
    ],
    paragraphs: [
      "Chính sách này áp dụng cho toàn bộ dịch vụ tại Cybersilkroads (cybersilkroads.com và các tên miền phụ vi.*, en.*, cn.*), bao gồm website B2B, mobile app (iOS/Android sắp ra mắt), Tích hợp API cho enterprise customer, và mọi tương tác offline với đội Hà Nội + Quảng Châu. Định nghĩa: 'Dữ liệu cá nhân' = thông tin có thể nhận dạng trực tiếp/gián tiếp một cá nhân (theo Điều 2 NĐ 13/2023). 'Người dùng' = Buyer (cá nhân/doanh nghiệp Việt Nam), Supplier (NCC Trung Quốc), Visitor (chưa đăng ký). 'Bên kiểm soát dữ liệu' = Beeagents.com (đăng ký tại Việt Nam, MST 0XXXXXXXXX). 'Bên xử lý dữ liệu' = các nhà cung cấp dịch vụ được ủy quyền (cloud hosting, payment processors, logistics partners). 'Đồng thuận' = sự chấp thuận có hiểu biết, tự nguyện và rõ ràng theo Điều 11 NĐ 13/2023.",
      "Chúng tôi thu thập 5 nhóm dữ liệu chính: (A) Thông tin tài khoản — họ tên, email, số điện thoại, công ty, mã số thuế, địa chỉ giao hàng, mật khẩu (đã hash bcrypt). (B) Thông tin giao dịch — RFQ, đơn hàng, sản phẩm yêu thích, lịch sử thanh toán (chỉ status, không lưu số thẻ — payment processor đối tác xử lý), tracking number, dispute history. (C) Thông tin thiết bị & log — địa chỉ IP, user agent, OS, browser, ngôn ngữ, thời gian truy cập, các trang đã xem (lưu 90 ngày phục vụ analytics + security audit). (D) Nội dung giao tiếp — chat với supplier qua nền tảng, transcript video call (chỉ lưu khi người dùng confirm), email gửi qua hệ thống, comments trên review. (E) Thông tin bên thứ ba — khi đăng nhập qua Google/Apple/Facebook, chúng tôi nhận: email, tên, avatar (chỉ những trường bạn đồng ý chia sẻ qua OAuth consent screen). KHÔNG thu thập: số CMND/CCCD/passport, thông tin sinh trắc học, dữ liệu y tế, tôn giáo, quan điểm chính trị (theo định nghĩa 'dữ liệu cá nhân nhạy cảm' tại Điều 2.4 NĐ 13/2023).",
      "Chúng tôi xử lý dữ liệu dựa trên 4 cơ sở pháp lý theo Điều 11 NĐ 13/2023: (1) Sự đồng thuận — bạn check 'Tôi đồng ý' khi đăng ký, có quyền rút lại bất cứ lúc nào. (2) Thực hiện hợp đồng — xử lý dữ liệu cần thiết để cung cấp dịch vụ B2B đã thoả thuận (RFQ, đặt hàng, vận chuyển, after-sales). (3) Nghĩa vụ pháp lý — lưu trữ chứng từ thuế 10 năm theo Luật Quản lý thuế VN, lưu hoá đơn điện tử theo Nghị định 123/2020/NĐ-CP. (4) Lợi ích chính đáng — phòng chống gian lận, bảo mật hệ thống, cải thiện sản phẩm (chỉ áp dụng khi không xâm phạm quyền lợi căn bản của bạn). Mục đích cụ thể: cung cấp & cá nhân hoá dịch vụ, kết nối Buyer–Supplier, xử lý thanh toán & vận chuyển, gửi notification giao dịch, ngăn chặn gian lận / abuse, cải tiến sản phẩm thông qua phân tích aggregate data, marketing (chỉ với Buyer đồng ý opt-in), tuân thủ pháp luật + yêu cầu cơ quan chức năng.",
      "Cybersilkroads sử dụng 4 nhóm cookies với chính sách rõ ràng và bảng quản lý cookies tại /info/quan-ly-cookies: (a) Cookies thiết yếu — duy trì đăng nhập, giỏ hàng RFQ, ngôn ngữ, không yêu cầu đồng thuận theo Điều 6 NĐ 13/2023 (necessary for service). Ví dụ: csr_session, csr_locale, csr_csrf. (b) Cookies phân tích — Google Analytics 4 (anonymized IP), Hotjar session replay (mask sensitive fields), Mixpanel funnel. Yêu cầu opt-in. Lưu 24 tháng. (c) Cookies marketing — Facebook Pixel, Google Ads, LinkedIn Insight, TikTok Pixel. Yêu cầu opt-in. Lưu 12 tháng. (d) Cookies từ NCC partner — chỉ kích hoạt khi bạn click vào product page của Supplier (cá biệt). Banner cookie consent xuất hiện khi truy cập lần đầu, có 3 lựa chọn: Đồng ý tất cả / Chỉ thiết yếu / Tuỳ chỉnh. Có thể đổi lựa chọn bất cứ lúc nào tại /buyer-center/settings/privacy.",
      "Chúng tôi chia sẻ dữ liệu với 5 nhóm bên thứ ba, mỗi nhóm có hợp đồng Data Processing Agreement (DPA) ràng buộc tuân thủ NĐ 13/2023 + GDPR-equivalent: (1) Suppliers/NCC — chỉ chia sẻ thông tin tối thiểu cần thiết để hoàn tất đơn hàng (tên người liên hệ, công ty, địa chỉ giao, SKU yêu cầu); KHÔNG chia sẻ email/số điện thoại trực tiếp — mọi giao tiếp đi qua relay của CSR. (2) Payment processors — Vietcombank, BIDV, Bank of China (trung gian), Stripe (international card); họ chỉ thấy thông tin tối thiểu để xử lý giao dịch + tuân thủ KYC. (3) Logistics partners — Sinotrans, Vinatrans, DHL Forwarding; chia sẻ địa chỉ giao + tracking number + nội dung kê khai hải quan. (4) Service providers — AWS Singapore (hosting), Cloudflare (CDN, anti-DDoS), Twilio (SMS OTP), SendGrid (email transactional), Sentry (error tracking, scrubs PII). (5) Cơ quan nhà nước — chỉ khi có yêu cầu hợp pháp bằng văn bản (lệnh khám xét, công văn truy tố), CSR công bố báo cáo Transparency Report hàng năm về số lượng yêu cầu nhận được. KHÔNG bao giờ bán dữ liệu cho data broker hoặc bên thứ ba để marketing.",
      "Cybersilkroads vận hành xuyên biên giới Việt Nam – Trung Quốc, dữ liệu Buyer Việt Nam có thể được transfer sang server tại Quảng Châu để đội Quảng Châu hỗ trợ audit / kiểm hàng / xử lý dispute. Truyền dữ liệu xuyên biên giới được bảo vệ bởi 3 lớp: (i) Standard Contractual Clauses (SCCs) — hợp đồng giữa Beeagents.com (Việt Nam) và pháp nhân CSR China Sourcing Co., Ltd. (Quảng Châu, công ty con) tuân thủ template chuẩn của Bộ Tư pháp Việt Nam. (ii) Encryption-in-transit — tất cả traffic VN↔CN qua TLS 1.3, certificate pinning, không thể intercept. (iii) Đăng ký Truyền dữ liệu xuyên biên giới với Cục An toàn thông tin theo Điều 25 NĐ 13/2023 (đã hoàn tất tháng 02/2026, mã đăng ký TDXBG-2026-XXXX). Bạn có quyền yêu cầu CSR KHÔNG transfer dữ liệu sang Trung Quốc — chúng tôi sẽ tôn trọng nhưng có thể giới hạn dịch vụ audit on-site.",
      "Vòng đời dữ liệu cá nhân tại CSR theo nguyên tắc 'tối thiểu cần thiết': (a) Tài khoản đang hoạt động — lưu trữ liên tục, cập nhật theo yêu cầu của bạn. (b) Tài khoản không hoạt động ≥18 tháng — gửi email cảnh báo + tự động xoá nếu không phản hồi trong 90 ngày tiếp theo. (c) Đơn hàng đã hoàn thành — lưu chi tiết 7 năm theo nghĩa vụ thuế Việt Nam, sau đó anonymize. (d) Chứng từ giao dịch + hoá đơn — lưu 10 năm theo Luật Quản lý thuế. (e) Communication logs (chat, email) — lưu 24 tháng cho dispute resolution, sau đó xoá vĩnh viễn. (f) Server logs — 90 ngày, sau đó aggregate vào báo cáo analytics (không có PII). (g) Cookies — theo time-to-live đã nêu ở Mục 4. Khi bạn yêu cầu xoá tài khoản (quyền tại Mục 9), CSR thực hiện hard-delete trong 30 ngày + xác nhận qua email + cấp 'Certificate of Erasure' nếu yêu cầu (cho doanh nghiệp cần audit trail).",
      "Biện pháp bảo mật kỹ thuật: (1) Mã hoá truyền tải — TLS 1.3 với forward secrecy, HSTS preload, certificate transparency monitoring. (2) Mã hoá lưu trữ — AES-256-GCM cho database tại nghỉ, key management qua AWS KMS với key rotation 90 ngày. (3) Hashing mật khẩu — bcrypt với work factor 12 + per-user salt + pepper. (4) Phát hiện xâm nhập — WAF Cloudflare layer 7, anomaly detection AI cho login patterns, rate limiting tự động block brute-force. (5) Phân quyền truy cập nội bộ — principle of least privilege, role-based access control (RBAC), 2FA bắt buộc cho mọi nhân viên có quyền truy cập production. (6) Audit logging — mọi truy cập dữ liệu được log với timestamp, IP, user, action; logs được lưu trên hệ thống write-once 12 tháng. (7) Penetration testing — 2 lần/năm bởi đối tác an ninh độc lập (KPMG VN cho năm 2026). (8) Bug bounty program — security@cybersilkroads.com + thưởng $100-5,000 tuỳ severity. Biện pháp tổ chức: nhân viên ký NDA + tham gia training bảo mật mỗi quý; data center AWS Singapore + Hà Nội đạt ISO 27001/SOC 2 Type II; quy trình incident response có RTO 4h, RPO 1h; backup tự động hàng giờ + offsite hàng ngày.",
      "Theo Điều 9–22 NĐ 13/2023, bạn có 11 quyền cơ bản với dữ liệu cá nhân của mình: (1) Quyền được biết — biết dữ liệu nào được thu thập, mục đích, thời gian lưu trữ. (2) Quyền đồng ý — chấp thuận hoặc từ chối xử lý. (3) Quyền truy cập — yêu cầu xem dữ liệu của mình (xuất file JSON/CSV trong 30 ngày). (4) Quyền rút lại đồng ý — bất cứ lúc nào, không cần giải thích. (5) Quyền xoá — 'right to erasure', xoá tài khoản + toàn bộ dữ liệu trong 30 ngày (trừ chứng từ phải lưu theo luật thuế). (6) Quyền hạn chế xử lý — yêu cầu CSR ngừng tạm xử lý dữ liệu trong khi giải quyết khiếu nại. (7) Quyền cung cấp dữ liệu — yêu cầu chuyển dữ liệu sang nhà cung cấp khác (data portability). (8) Quyền phản đối — phản đối xử lý cho mục đích marketing, profiling. (9) Quyền khiếu nại — gửi khiếu nại tới Cục An toàn thông tin (Bộ TT&TT) hoặc tới chúng tôi. (10) Quyền yêu cầu bồi thường thiệt hại — nếu CSR vi phạm gây thiệt hại. (11) Quyền tự bảo vệ — tự thực hiện các biện pháp bảo vệ dữ liệu (đổi mật khẩu, bật 2FA, opt-out cookie). Để thực hiện bất kỳ quyền nào, gửi email tới privacy@cybersilkroads.com — phản hồi trong 7 ngày làm việc, xử lý hoàn tất trong 30 ngày.",
      "Cybersilkroads là nền tảng B2B dành cho doanh nghiệp, KHÔNG hướng tới trẻ em dưới 16 tuổi. Khi đăng ký, người dùng phải xác nhận đủ 18 tuổi (hoặc tuổi thành niên theo pháp luật quốc gia cư trú). Nếu phát hiện tài khoản của trẻ em, chúng tôi sẽ vô hiệu hoá ngay và xoá toàn bộ dữ liệu trong 7 ngày. Phụ huynh phát hiện con em mình đã tạo tài khoản có thể liên hệ privacy@cybersilkroads.com — chúng tôi xác minh và xoá ưu tiên không tính phí.",
      "Quy trình ứng phó sự cố dữ liệu (Data Breach Response Plan) tuân thủ Điều 23 NĐ 13/2023: (Bước 1) Phát hiện — đội Security 24/7 monitor 365/365, hoặc nhận report từ Bug Bounty / nhân viên / đối tác. (Bước 2) Khoanh vùng — trong 4h, identify scope, ngừng leak, lock affected systems. (Bước 3) Đánh giá — security forensic xác định bao nhiêu user bị ảnh hưởng, dữ liệu nào, mức độ nghiêm trọng. (Bước 4) Thông báo cơ quan chức năng — trong 72 giờ kể từ phát hiện, gửi báo cáo cho Cục An toàn thông tin (Bộ TT&TT) theo template chuẩn. (Bước 5) Thông báo người dùng — gửi email/SMS cho mọi user bị ảnh hưởng trong 72 giờ, mô tả sự cố + dữ liệu bị lộ + biện pháp khắc phục + khuyến nghị (đổi mật khẩu, bật 2FA, monitoring tài khoản). (Bước 6) Khắc phục — fix vulnerability, audit toàn hệ thống, post-mortem report public trong 30 ngày. (Bước 7) Bồi thường — nếu user chứng minh thiệt hại trực tiếp, CSR có chính sách bồi thường minh bạch. Lịch sử CSR: 0 sự cố nghiêm trọng từ 2018 đến nay.",
      "Chính sách này được CSR review tối thiểu 1 lần/năm và cập nhật khi có thay đổi pháp luật, công nghệ hoặc dịch vụ. Phiên bản hiện tại là v3.2, hiệu lực 01/01/2026. Phiên bản cũ được archive tại /info/privacy-policy/lich-su để tham chiếu. Khi có thay đổi material (ảnh hưởng quyền lợi user), CSR thông báo qua: (a) Email tới mọi user đang hoạt động ít nhất 30 ngày trước khi áp dụng. (b) Banner hiển thị trên website/app trong 60 ngày. (c) Yêu cầu user re-consent nếu thay đổi mục đích xử lý dữ liệu. Liên hệ DPO (Data Protection Officer): Email privacy@cybersilkroads.com (phản hồi <72h), điện thoại +84 24 1234 5678 (giờ hành chính), thư tay 'DPO — Cybersilkroads / Beeagents.com', Tầng 12, Tòa nhà Cybersilkroads, 26 Phạm Hùng, Cầu Giấy, Hà Nội. Cơ quan chức năng để khiếu nại độc lập: Cục An toàn thông tin (Bộ TT&TT), 18 Nguyễn Du, Hà Nội — website ais.gov.vn.",
    ],
    pullQuote: {
      text: "Bảo mật không phải checkbox — nó là một quá trình. Cybersilkroads invest 12% engineering effort vào security & privacy, với mục tiêu trở thành nền tảng B2B Việt Nam đầu tiên đạt chứng chỉ SOC 2 Type II vào Q4/2026.",
      author: "Đội An toàn thông tin Cybersilkroads",
    },
    checklist: [
      "ISO/IEC 27001:2022 + SOC 2 Type II (Q4/2026)",
      "Tuân thủ NĐ 13/2023/NĐ-CP (Việt Nam) + PIPL 2021 (Trung Quốc) + GDPR khi áp dụng",
      "Mã hoá TLS 1.3 (transit) + AES-256-GCM (rest), bcrypt cho mật khẩu",
      "11 quyền của chủ thể dữ liệu — phản hồi 7 ngày, xử lý 30 ngày",
      "Truyền xuyên biên giới VN-CN qua SCCs + đăng ký Cục An toàn thông tin",
      "Pen-test 2 lần/năm + Bug Bounty $100-5,000",
      "Data breach notification trong 72 giờ — 0 sự cố từ 2018",
      "DPO: privacy@cybersilkroads.com — phản hồi <72 giờ",
    ],
    faq: [
      {
        q: "CSR có bán dữ liệu của tôi cho bên thứ ba không?",
        a: "TUYỆT ĐỐI KHÔNG. Mô hình kinh doanh của Cybersilkroads dựa vào 5% commission từ Supplier khi giao dịch thành công, KHÔNG dựa vào bán dữ liệu. Chúng tôi không chia sẻ dữ liệu với data broker, marketing aggregator, hay bất kỳ bên thứ ba nào không liên quan trực tiếp đến giao dịch của bạn.",
      },
      {
        q: "Tôi có thể yêu cầu xoá toàn bộ dữ liệu không?",
        a: "Có. Gửi email privacy@cybersilkroads.com với subject 'Yêu cầu xoá dữ liệu — [tên/email tài khoản]'. Chúng tôi xác minh danh tính (qua OTP), thực hiện hard-delete trong 30 ngày, và gửi 'Certificate of Erasure' nếu yêu cầu. Lưu ý: chứng từ thuế (hoá đơn) phải được lưu 10 năm theo Luật Quản lý thuế VN — phần này không thể xoá.",
      },
      {
        q: "Dữ liệu của tôi có được transfer sang Trung Quốc không?",
        a: "Có thể, nếu giao dịch của bạn cần đội Quảng Châu hỗ trợ (audit nhà máy, kiểm hàng, xử lý dispute). Truyền dữ liệu xuyên biên giới VN-CN được bảo vệ bởi Standard Contractual Clauses (SCCs), TLS 1.3 encryption, và đã đăng ký với Cục An toàn thông tin VN. Bạn có quyền yêu cầu KHÔNG transfer — gửi email DPO, chúng tôi sẽ tôn trọng dù có thể giới hạn dịch vụ audit on-site.",
      },
      {
        q: "Mật khẩu của tôi có an toàn nếu CSR bị hack?",
        a: "Có. Chúng tôi sử dụng bcrypt hashing với work factor 12 + per-user salt + pepper — kể cả nếu database bị leak, mật khẩu cần hàng tỷ năm computer power để crack. Tuy nhiên, khuyến nghị bạn vẫn nên: (1) đặt mật khẩu mạnh + duy nhất, (2) bật 2FA tại /buyer-center/settings/security, (3) đổi mật khẩu nếu nghe có sự cố tại các site khác bạn dùng email tương tự.",
      },
      {
        q: "Tôi nhận email lạ tự xưng là Cybersilkroads — làm sao xác minh?",
        a: "Email chính thức của CSR luôn từ domain @cybersilkroads.com (KHÔNG phải @cybersilkroad.com hay tương tự lừa đảo). Email giao dịch từ no-reply@cybersilkroads.com. Email từ DPO/Legal/HR có domain @cybersilkroads.com. Nếu nghi ngờ, forward email đó tới security@cybersilkroads.com để chúng tôi verify trong 4 giờ. Nguyên tắc vàng: CSR KHÔNG BAO GIỜ yêu cầu mật khẩu qua email/điện thoại.",
      },
    ],
    related: [
      { label: "Điều khoản sử dụng", href: "/info/terms-of-service" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
      { label: "Khiếu nại & tranh chấp", href: "/info/disputes" },
      { label: "Liên hệ DPO", href: "/info/contact" },
    ],
    primaryCta: { label: "Liên hệ DPO ngay", href: "/info/contact" },
  },
  "import-guide": {
    title: "Hướng dẫn nhập khẩu từ Trung Quốc",
    intro: "Quy trình nhập khẩu B2B 5 bước — từ tìm NCC đến nhận hàng tại kho. Trung bình 32-48 ngày.",
    icon: "📦",
    category: "HƯỚNG DẪN",
    quickFacts: [
      { label: "Số bước", value: "5" },
      { label: "Sản xuất", value: "20-30 ngày" },
      { label: "Vận chuyển", value: "12-18 ngày" },
      { label: "Tổng", value: "32-48 ngày" },
      { label: "T/T cọc", value: "30%" },
      { label: "T/T cuối", value: "70%" },
    ],
    sectionTitles: [
      "Bước 1 — Tìm sản phẩm & Gửi RFQ",
      "Bước 2 — Đặt mẫu (Sample Order)",
      "Bước 3 — Đặt cọc T/T 30% qua Tài khoản trung gian",
      "Bước 4 — Kiểm hàng on-site & Thanh toán 70%",
      "Bước 5 — Vận chuyển DDP & Thông quan",
      "Bước 6 — Nhận hàng & Xác nhận chất lượng",
      "Hồ sơ chứng từ cần chuẩn bị",
      "Ví dụ tính thuế thực tế (Excel-style breakdown)",
      "Ưu đãi thuế ACFTA + RCEP — Form E và Form RCEP",
    ],
    paragraphs: [
      "Duyệt sản phẩm theo 12 danh mục chính trên Cybersilkroads (cybersilkroads.com/products), hoặc gửi RFQ chi tiết qua /buying-request. Trong 24 giờ, hệ thống AI matching gửi RFQ tới 5-10 NCC verified phù hợp nhất. Mỗi báo giá nhận về có: giá FOB + giá DDP về kho VN, MOQ, thời gian giao, sample policy, payment terms. Buyer có thể gọi video trực tiếp với NCC qua Cybersilkroads để xem nhà máy + sản phẩm thực tế trước khi đặt mẫu. Tip: gửi RFQ càng chi tiết (kích thước, vật liệu, OEM logo, target retail) — báo giá càng chính xác, ít cần đàm phán lại.",
      "Yêu cầu sample là bước KHÔNG THỂ BỎ QUA khi sourcing lần đầu với một NCC. Quy trình: (1) Click 'Yêu cầu mẫu' trên trang chi tiết sản phẩm. (2) Phí sample $30-200 + ship $20-40 (combined với sample khác qua Trung tâm Mẫu Quảng Châu của CSR). (3) Thời gian giao 8-12 ngày từ lúc đặt đến nhận tại kho VN. (4) Test sample 2-4 tuần với chức năng thực tế. (5) Phí sample được hoàn 100% khi đặt MOQ với cùng NCC. CSR khuyến nghị đặt 3-5 mẫu cùng SKU để test consistency của NCC. Đối với sản phẩm OEM (logo, custom màu/size), yêu cầu thêm 'sample OEM' phí $80-300 — verify khả năng tuỳ chỉnh trước khi đặt MOQ. (Xem chi tiết tại /info/sample-orders).",
      "Sau khi sample đạt yêu cầu và xác nhận PO (Purchase Order) chính thức, Buyer thanh toán 30% deposit T/T (Telegraphic Transfer) vào tài khoản trung gian Bảo đảm Giao dịch của CSR tại Vietcombank/BIDV (cho VND) hoặc Bank of China/HSBC (cho USD). Tiền KHÔNG đi trực tiếp tới NCC — nằm tại tài khoản trung gian của CSR cho tới khi giao dịch hoàn tất. NCC nhận PO + xác nhận tài khoản trung gian → bắt đầu sản xuất ngay. Buyer nhận PI (Proforma Invoice) qua email trong 24 giờ với chi tiết: tổng giá trị, breakdown theo SKU, ngày dự kiến xuất xưởng, terms vận chuyển. Thời gian giao sản xuất: 20-30 ngày cho hàng standard, 30-45 ngày cho OEM custom. Phí ngân hàng chuyển T/T: ~0.1-0.3% + $20-50 fixed, do Buyer chịu (đã include trong DDP).",
      "Trước khi xuất xưởng (1-2 ngày), đội QC Cybersilkroads tại Quảng Châu đến nhà máy kiểm hàng on-site — MIỄN PHÍ cho đơn ≥$5,000 USD, $200/lần cho đơn nhỏ hơn. Quy trình kiểm: (i) Số lượng — đếm 100% (cho đơn <500 unit) hoặc AQL 2.5 sample (cho đơn ≥500). (ii) Chất lượng — đo kích thước, kiểm material theo spec PO, test functional 10% mẫu ngẫu nhiên. (iii) Đóng gói — verify carton chuẩn xuất khẩu, label đúng, packing list khớp. (iv) Tài liệu — Form E (Certificate of Origin), Commercial Invoice, Packing List, BL/AWB. Báo cáo QC: 100+ ảnh + 5-10 video, gửi Buyer trong 4 giờ. Sau khi Buyer approve QC, thanh toán 70% balance T/T qua tài khoản trung gian → NCC release container. Nếu không đạt, NCC sửa miễn phí (lùi 5-10 ngày) hoặc Buyer từ chối nhận hàng (Bảo đảm Giao dịch hoàn 100% deposit).",
      "Cybersilkroads Logistics lo toàn bộ thủ tục từ pickup tại nhà máy đến giao kho Buyer (Incoterm DDP — Delivered Duty Paid). Quy trình: (1) Pickup container/lô hàng tại nhà máy. (2) Vận chuyển ra cảng xuất TQ (Foshan/Shenzhen/Ningbo) hoặc cửa khẩu Hữu Nghị (đường bộ). (3) Khai báo xuất khẩu TQ + thuê tàu/xe tải. (4) Vận chuyển 5-22 ngày tuỳ route (xem /info/shipping-policy). (5) Thông quan VN qua e-customs VNACCS/VCIS — 75% hàng từ NCC verified đi luồng xanh trong 2 giờ. (6) Thanh toán thuế nhập khẩu + VAT 10% (đã include trong DDP). (7) Vận chuyển nội địa VN tới kho Buyer (1-2 ngày). Thời gian giao tổng: 5-7 ngày qua đường bộ Lạng Sơn, 18-22 ngày qua đường biển. Tracking realtime qua /buyer-center/orders + Zalo OA push.",
      "Buyer nhận hàng tại kho, ký biên bản giao nhận với tài xế CSR Logistics. Khuyến nghị: (a) Kiểm số kiện theo packing list trước khi ký nhận. (b) Quay video unboxing 1-2 carton ngẫu nhiên để có chứng cứ trong trường hợp dispute. (c) Kiểm chất lượng + số lượng chi tiết trong 7 ngày kể từ ngày nhận — đây là cửa sổ khiếu nại Bảo đảm Giao dịch. Sau 7 ngày, hệ thống auto-release tiền cho NCC. Nếu phát hiện sai sót: gửi khiếu nại qua /buyer-center/orders/{order-id}/dispute kèm ảnh/video chứng cứ → đội Bảo đảm Giao dịch xử lý trong 3-5 ngày → 87% case có lợi cho Buyer (refund 100%, đổi hàng, hoặc bồi thường thoả thuận). Sau khi confirm hàng OK, Buyer rate đơn 1-5 sao + viết review (giúp Buyer khác tham khảo).",
      "Hồ sơ chứng từ chuẩn cho mọi đơn nhập khẩu B2B từ TQ về VN (CSR cung cấp 90% — Buyer chỉ cần ký + giữ): (1) Commercial Invoice — hóa đơn thương mại tiếng Anh, có ký + đóng dấu NCC, declare giá trị thực tế (CSR cấm under-invoicing). (2) Packing List — chi tiết số kiện, trọng lượng net/gross, kích thước, SKU breakdown. (3) Bill of Lading (B/L) cho đường biển hoặc CMR cho đường bộ — vận đơn quốc tế, original gửi Buyer hoặc telex release. (4) Certificate of Origin — Form E (ACFTA) hoặc Form RCEP (RCEP) để hưởng ưu đãi thuế. (5) Quality Certificate — chứng nhận xuất xưởng, ISO 9001 nếu có. (6) Test Report — cho hàng có yêu cầu kỹ thuật (CE, RoHS, FDA, FCC). (7) Phytosanitary Certificate — cho hàng nông sản, gỗ. (8) Insurance Policy — cho CIF/DDP, do CSR mua qua Bảo Việt/PVI. (9) Customs Declaration (Tờ khai hải quan VN) — CSR khai theo uỷ quyền. (10) E-invoice VAT — phát hành cho Buyer doanh nghiệp để khấu trừ thuế.",
      "Ví dụ tính thuế thực tế cho đơn nội thất gỗ HS 9403.50 từ KUKA Hangzhou, giá trị $20,000 FOB, vận chuyển CIF Lạch Huyện, Buyer Hà Nội: (a) Giá FOB Foshan: $20,000. (b) Cước biển + bảo hiểm CIF: $4,000 → CIF $24,000. (c) Thuế nhập khẩu MFN HS 9403.50: 20% (sau Thông tư 12/2026 giảm từ 25%) → $4,800. Nếu có Form E ACFTA: 0% (miễn thuế!) → tiết kiệm $4,800. (d) VAT 10% × (CIF + Thuế NK) = 10% × $28,800 = $2,880 (nếu không Form E) hoặc 10% × $24,000 = $2,400 (nếu có Form E). (e) Phí thông quan: $120. (f) Vận chuyển nội địa Hải Phòng → kho HN: $280. (g) Phí dịch vụ CSR (5% commission do NCC trả, KHÔNG tính Buyer): $0. TỔNG DDP nếu KHÔNG Form E: $20,000 + $4,000 + $4,800 + $2,880 + $120 + $280 = $32,080. TỔNG DDP NẾU CÓ Form E: $20,000 + $4,000 + $0 + $2,400 + $120 + $280 = $26,800. Tiết kiệm: $5,280 = 16.5%.",
      "Ưu đãi thuế ACFTA (ASEAN-China FTA, hiệu lực 2010) + RCEP (Regional Comprehensive Economic Partnership, hiệu lực 01/01/2022) là CHÌA KHOÁ giảm 5-15% thuế nhập khẩu. Để hưởng ưu đãi, Buyer cần: (i) Form E (cho ACFTA) — Certificate of Origin do cơ quan có thẩm quyền TQ cấp (CCPIT, AQSIQ), miễn phí cho NCC verified của CSR. (ii) Form RCEP — cho 15 nước RCEP (TQ, Nhật, Hàn, Úc, NZ, ASEAN). Một số mặt hàng (linh kiện điện tử, máy móc) hưởng RCEP có lợi hơn ACFTA. CSR auto pick FTA tốt nhất cho mỗi đơn. Lưu ý: hàng phải đáp ứng Quy tắc Xuất xứ (RoO) — nguyên liệu chính từ TQ hoặc nước thành viên FTA. NCC verified của CSR đều có khả năng cấp Form E/RCEP đúng quy chuẩn để Buyer hưởng full ưu đãi. Đối với một số HS code đặc thù (gỗ, dệt may), Form E giảm thuế từ 25% xuống 0% — tiết kiệm khổng lồ.",
    ],
    pullQuote: {
      text: "Quy trình 6 bước minh bạch + ưu đãi ACFTA/RCEP đúng cách — buyer Việt Nam giảm 30-40% chi phí so với mua qua broker truyền thống. Đó là sự khác biệt của Cybersilkroads.",
      author: "Đội Customer Success Cybersilkroads",
    },
    checklist: [
      "Báo giá miễn phí trong 24h từ 5-10 NCC verified",
      "Sample $30-200, hoàn 100% khi đặt MOQ — Trung tâm Mẫu gom vận chuyển",
      "Bảo đảm Giao dịch (Trung gian) tại VCB/BIDV/BoC — không mất tiền cọc",
      "Kiểm định tại chỗ miễn phí cho đơn ≥$5K — báo cáo 100+ ảnh + video",
      "DDP all-in-one — không phải lo thuế, hải quan, nội địa",
      "Form E + Form RCEP — tiết kiệm 5-15% thuế NK",
      "E-customs VNACCS/VCIS — 75% hàng đi luồng xanh trong 2 giờ",
      "Tracking realtime + bảo hiểm Marine 0.5% giá trị",
    ],
    faq: [
      {
        q: "MOQ nhỏ nhất là bao nhiêu?",
        a: "Tùy nhà máy — phổ biến từ $500-2000 hoặc 50-100 đơn vị. Một số NCC chấp nhận MOQ $200 cho buyer mới qua Cybersilkroads. CSR có chương trình 'Combine MOQ' giúp 2-3 buyer cùng ngành gộp đơn để đạt MOQ giá tốt mà mỗi bên chỉ lấy 1/3.",
      },
      {
        q: "Có cần giấy phép nhập khẩu không?",
        a: "Phần lớn vật liệu xây dựng, nội thất, sanitary, đèn LED, điện gia dụng KHÔNG cần giấy phép. Cần giấy phép cho: thực phẩm chức năng, mỹ phẩm, thiết bị y tế, hoá chất, dược phẩm, sách, phương tiện. Cybersilkroads tư vấn cụ thể theo HS code trước khi đặt hàng. Buyer mới có thể email legal@cybersilkroads.com để được tư vấn miễn phí.",
      },
      {
        q: "Thuế nhập khẩu cụ thể bao nhiêu cho từng loại hàng?",
        a: "Vật liệu xây dựng (gạch, đá, xi măng) HS 6907-6914: 5-10% MFN, 0% với Form E. Nội thất gỗ HS 9403: 20% MFN (giảm từ 25% theo TT 12/2026), 0% với Form E. Đèn LED HS 9405: 5% MFN, 0% với Form E. Sanitary HS 6911-6912: 15-20% MFN, 0% với Form E. Điện tử HS 8536-8543: 0-15% MFN, 0% với Form E. Buyer luôn nên ưu tiên NCC cấp được Form E để tiết kiệm thuế.",
      },
      {
        q: "Có cần Buyer doanh nghiệp hay cá nhân cũng được?",
        a: "Cá nhân được nhập với hạn mức $5,000 USD/đơn theo quy định Phòng chống rửa tiền. Doanh nghiệp (có MST) được nhập không giới hạn + có thể khấu trừ VAT đầu vào (10%). Khuyến nghị Buyer thường xuyên (≥3 đơn/năm) đăng ký doanh nghiệp để tối ưu thuế.",
      },
      {
        q: "Thời gian giao có thể nhanh hơn 5-7 ngày không?",
        a: "Có với Air Freight Express (DHL/FedEx) — 2-4 ngày Foshan → Hà Nội. Cước $8-15/kg (đắt gấp 5-7x sea freight). Phù hợp sample, hàng hotfix, hàng giá trị cao kích thước nhỏ. Min charge $100/đơn. Liên hệ logistics@cybersilkroads.com để booking.",
      },
      {
        q: "Cybersilkroads thu phí thế nào với Buyer?",
        a: "MIỄN PHÍ HOÀN TOÀN cho Buyer. Cybersilkroads thu 5% commission từ Supplier khi giao dịch thành công. Buyer chỉ trả: giá hàng (theo PO với NCC) + cước DDP (transparent breakdown). Không có phí thành viên, phí giao dịch, phí trung gian, phí kiểm định tại chỗ (miễn phí cho đơn ≥$5K).",
      },
    ],
    related: [
      { label: "Tính cước DDP", href: "/info/ddp-calculator" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
      { label: "Đặt mẫu", href: "/info/sample-orders" },
      { label: "Quy trình kiểm định", href: "/info/audit-process" },
      { label: "Chính sách vận chuyển", href: "/info/shipping-policy" },
    ],
    primaryCta: { label: "Bắt đầu — Gửi RFQ", href: "/buying-request" },
  },
  "ddp-calculator": {
    title: "Tính cước DDP",
    intro: "Cước DDP (Delivered Duty Paid) đã bao gồm thuế nhập khẩu, VAT, vận chuyển về kho.",
    paragraphs: [
      "DDP = giá hàng + phí vận chuyển + thuế nhập khẩu + VAT 10% + phí thông quan + giao tận kho. Không phát sinh thêm.",
      "Tham khảo: container 20ft (~28 m³) từ Foshan về Hà Nội = $1,800-2,400. Container 40ft (~58 m³) = $2,800-3,500. Hàng lẻ LCL: $90-130/m³.",
      "Thuế nhập khẩu phụ thuộc HS code. Cybersilkroads cung cấp công cụ tính cước online — chỉ cần nhập giá FOB và HS code, hệ thống ước tính DDP trong 30 giây.",
    ],
    related: [{ label: "Gửi RFQ để có báo giá DDP chính xác", href: "/buying-request" }],
  },
  "payment-protection": {
    title: "Bảo vệ thanh toán — Bảo đảm Giao dịch",
    intro: "Tiền của bạn được giữ tại tài khoản trung gian của Cybersilkroads. Hoàn 100% nếu hàng không như mô tả.",
    icon: "🛡",
    category: "AN TOÀN GIAO DỊCH",
    quickFacts: [
      { label: "Hoàn tiền", value: "100%" },
      { label: "Cửa sổ KN", value: "7 ngày" },
      { label: "Xử lý", value: "3 ngày" },
      { label: "Tỷ lệ thắng", value: "87%" },
    ],
    sectionTitles: ["Cơ chế Bảo đảm Giao dịch", "Khi có sự cố", "Phương án xử lý"],
    paragraphs: [
      "Mọi giao dịch trên Cybersilkroads đều được bảo vệ bởi Bảo đảm Giao dịch. Tiền cọc T/T 30% và 70% còn lại của bạn nằm trong tài khoản tài khoản trung gian ngân hàng đối tác (không trong tay Cybersilkroads, không trong tay NCC). NCC chỉ nhận tiền sau khi bạn xác nhận đã nhận hàng đạt chất lượng. Nếu bạn không xác nhận sau 14 ngày kể từ ngày giao, hệ thống tự động release để tránh giam tiền vô lý.",
      "Nếu hàng không đúng mô tả, chậm trễ hoặc lỗi, gửi khiếu nại trong 7 ngày kể từ ngày nhận hàng. Đính kèm ảnh/video chứng minh, số đơn hàng, hoá đơn vận chuyển. Đội tranh chấp Cybersilkroads xác nhận trong 24 giờ và bắt đầu điều tra. Liên hệ NCC bằng tiếng Trung, audit sản phẩm tại kho buyer nếu cần. Đưa ra phương án xử lý trong 3-5 ngày làm việc.",
      "3 phương án xử lý: (1) Hoàn tiền 100% từ tài khoản trung gian — nếu hàng sai mô tả nghiêm trọng. (2) Đổi hàng miễn phí — NCC sản xuất lại + free DDP về VN. (3) Bồi thường thỏa thuận — giảm giá X% nếu lỗi nhỏ buyer chấp nhận giữ lại. Cybersilkroads trực tiếp đứng ra giải quyết với NCC, buyer không cần biết tiếng Trung. Tỷ lệ khiếu nại được xử lý có lợi cho buyer: 87% (báo cáo Q3/2025).",
    ],
    pullQuote: {
      text: "Bảo đảm Giao dịch là 'điểm khác biệt số 1' của Cybersilkroads. Buyer mới có thể đặt đơn $50K mà yên tâm như đặt với nhà cung cấp nội địa Việt Nam.",
      author: "Đội Bảo đảm Giao dịch",
    },
    checklist: [
      "Tiền cọc giữ tại tài khoản trung gian ngân hàng đối tác (không phải Cybersilkroads)",
      "NCC chỉ nhận tiền khi buyer xác nhận hàng đạt chất lượng",
      "Cửa sổ khiếu nại 7 ngày, xử lý 3-5 ngày làm việc",
      "Tỷ lệ refund/replace cho buyer: 87%",
      "Cybersilkroads đứng ra negotiate với NCC bằng tiếng Trung",
    ],
    related: [
      { label: "Khiếu nại & tranh chấp", href: "/info/disputes" },
      { label: "Hướng dẫn nhập khẩu", href: "/info/import-guide" },
      { label: "Quy trình kiểm định", href: "/info/audit-process" },
    ],
    primaryCta: { label: "Đặt đơn an toàn ngay", href: "/buying-request" },
  },
  "disputes": {
    title: "Khiếu nại & tranh chấp",
    intro: "Quy trình khiếu nại 7 ngày — đảm bảo công bằng cho buyer.",
    paragraphs: [
      "Gửi khiếu nại qua email dispute@alibabavn.com hoặc chat trực tiếp trong dashboard buyer. Đính kèm ảnh/video chứng minh, số đơn hàng, hóa đơn.",
      "Đội tranh chấp xác nhận nhận khiếu nại trong 24h. Liên hệ NCC, audit sản phẩm tại kho VN nếu cần. Đưa ra phương án xử lý trong 3-5 ngày.",
      "Tỷ lệ khiếu nại được xử lý thắng cho buyer: 87% (báo cáo Q3/2025). Trung bình 3.2 ngày để có phản hồi.",
    ],
  },
  "sample-orders": {
    title: "Đặt hàng mẫu — Trước khi đặt MOQ",
    intro:
      "Đặt mẫu là bước không thể bỏ qua khi sourcing lần đầu với một NCC. Phí sample $30-200 nhỏ hơn rất nhiều so với rủi ro nhập 1 container hàng sai. CSR tối ưu quá trình này thành workflow 4 ngày, gom nhiều mẫu để tiết kiệm cước, và hoàn 100% phí khi đặt MOQ.",
    icon: "📦",
    category: "DỊCH VỤ BUYER",
    quickFacts: [
      { label: "Phí mẫu", value: "$30-200" },
      { label: "Phí ship", value: "$20-40 (gộp)" },
      { label: "Thời gian giao", value: "8-12 ngày" },
      { label: "Hoàn phí", value: "100% khi MOQ" },
      { label: "Số mẫu/đơn", value: "Không giới hạn" },
      { label: "OEM mẫu", value: "Có hỗ trợ" },
    ],
    sectionTitles: [
      "Tại sao phải đặt mẫu?",
      "Quy trình đặt mẫu 4 bước",
      "Tối ưu chi phí — Combine sample shipping",
      "Sample OEM — Tuỳ chỉnh trước MOQ",
    ],
    paragraphs: [
      "Sản phẩm trên Cybersilkroads có ảnh, video, spec đầy đủ — nhưng không gì thay thế được việc cầm sản phẩm trên tay. Buyer có thể kiểm tra: chất lượng vật liệu thực tế (cảm nhận trọng lượng, độ mịn, độ bền), độ chính xác kích thước, màu sắc dưới ánh sáng tự nhiên (so với ảnh studio thường lệch), packaging (carton có chống va đập đủ?), tài liệu kèm theo (manual, certificate, hoá đơn). Theo thống kê CSR, 22% đơn MOQ không đặt mẫu trước có khiếu nại về chất lượng — con số này giảm xuống 4% khi buyer đặt mẫu trước. Phí mẫu $50-150 nhỏ hơn nhiều so với rủi ro nhập 1 container hàng sai mô tả.",
      "Quy trình đặt mẫu trên CSR: (1) Tìm sản phẩm và click 'Yêu cầu mẫu' trên trang chi tiết sản phẩm — form pre-fill productId + thông tin NCC. (2) Điền địa chỉ giao hàng VN, chọn mẫu nào (default mẫu chuẩn — có thể chọn variant: màu khác, size khác, OEM logo nếu cần). (3) Thanh toán phí sample qua tài khoản trung gian CSR — phí sản phẩm $30-200 + phí ship $20-40. (4) Nhận tracking trong 24h, mẫu được gom với các sample khác trong tuần thành 1 chuyến hàng air về CSR Hà Nội, sau đó forward đến địa chỉ buyer. Tổng thời gian giao 8-12 ngày: 3-7 ngày sản xuất + 4-5 ngày vận chuyển air + 1 ngày forward nội địa.",
      "Thay vì mỗi sample shipping riêng (mỗi lô $40-80 cước air), CSR áp dụng mô hình 'Trung tâm Mẫu' tại văn phòng Quảng Châu: NCC ship sample về CSR Quảng Châu, đội logistics gom 8-15 sample mỗi tuần thành 1 master shipment air về Hà Nội (chỉ 1 lần cước $80-150 chia đều cho các buyer). Kết quả: buyer chỉ trả $20-40/sample thay vì $40-80 nếu tự ship. Đối với buyer thường xuyên đặt mẫu (5+ sample/tháng), CSR cung cấp 'Gói đăng ký mẫu' $99/tháng — không giới hạn sample, chỉ trả phí sản phẩm.",
      "CSR hỗ trợ đặt sample OEM (custom logo, custom màu, custom kích thước nhỏ) trước khi đặt MOQ. NCC yêu cầu phí mock-up $80-300 + phí mẫu thường, thời gian giao tăng 5-10 ngày để làm khuôn/in logo. Đây là cách an toàn để verify khả năng OEM của NCC trước khi commit đơn lớn. Sau khi nhận sample OEM đạt yêu cầu, buyer có thể đặt MOQ — toàn bộ phí sample (gồm phí mock-up) được hoàn 100% vào hoá đơn MOQ. Buyer cũng có thể yêu cầu video call với NCC để xem mock-up trước khi production, tránh sai sót.",
    ],
    pullQuote: {
      text: "$50 phí sample là khoản đầu tư rẻ nhất cho buyer mới. Nó giúp bạn kiểm tra chất lượng thật, hiểu NCC, và nhất là — yên tâm khi đặt 50,000 USD MOQ tiếp theo.",
      author: "Đội Customer Success CSR",
    },
    checklist: [
      "Phí sample $30-200, hoàn 100% khi đặt MOQ với cùng NCC",
      "Trung tâm Mẫu Quảng Châu — gom shipping tiết kiệm 50-60%",
      "Thời gian giao 8-12 ngày từ lúc đặt đến nhận tay tại VN",
      "Hỗ trợ sample OEM (logo, màu, size) trước khi đặt MOQ",
      "Gói đăng ký mẫu $99/tháng cho buyer power-user",
    ],
    faq: [
      {
        q: "Có thể đặt sample không qua CSR không?",
        a: "Có thể nhưng không khuyến nghị. Tự đặt với NCC sẽ phải đàm phán bằng tiếng Trung, trả cước air đầy đủ, không có Bảo đảm Giao dịch. Qua CSR rẻ hơn 30-50% và an toàn hơn.",
      },
      {
        q: "Sample có khác hàng MOQ không?",
        a: "Mẫu chuẩn = giống hàng MOQ. Tuy nhiên, một số NCC làm sample bằng máy thủ công thay vì line sản xuất, có thể có khác biệt nhỏ về finish. Khi đặt MOQ, CSR luôn QC trước xuất xưởng để đảm bảo đồng nhất.",
      },
      {
        q: "Phí mẫu có VAT không?",
        a: "Không. Sample dưới $200 được khai như 'commercial sample' miễn thuế nhập khẩu + VAT theo quy định Việt Nam. Trên $200, áp dụng thuế bình thường.",
      },
    ],
    related: [
      { label: "Tìm sản phẩm để đặt mẫu", href: "/products" },
      { label: "Hướng dẫn nhập khẩu", href: "/info/import-guide" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
    ],
    primaryCta: { label: "Tìm sản phẩm để đặt mẫu", href: "/products" },
  },
  "order-tracking": {
    title: "Theo dõi đơn hàng — Realtime tracking",
    intro:
      "CSR cung cấp 5-stage realtime tracking từ lúc đặt cọc đến lúc hàng vào kho buyer. Mỗi bước đều có ảnh/video từ NCC, từ kho CSR Quảng Châu, từ shipping carrier, đến tận nội địa Việt Nam. Buyer không bao giờ phải hỏi 'đơn hàng giờ ở đâu?'.",
    icon: "📍",
    category: "DỊCH VỤ BUYER",
    quickFacts: [
      { label: "Stages", value: "5" },
      { label: "Ảnh/đơn", value: "30-80" },
      { label: "Video/đơn", value: "5-15" },
      { label: "Update freq.", value: "2-3 lần/ngày" },
      { label: "Channels", value: "Email + Zalo OA" },
      { label: "API tracking", value: "Có cho enterprise" },
    ],
    sectionTitles: [
      "5 trạng thái — Vòng đời đơn hàng",
      "Cập nhật ảnh/video — Tận mắt thấy",
      "Multi-channel notification",
      "Khi có sự cố — Phản ứng nhanh",
    ],
    paragraphs: [
      "Mỗi đơn hàng trên CSR đi qua 5 trạng thái rõ ràng, có timestamp + chứng cứ ảnh/video tại mỗi mốc: (1) Đặt cọc T/T 30% — tài khoản trung gian nhận tiền, NCC nhận PO chính thức. (2) Sản xuất — NCC bắt đầu production, có kế hoạch sản xuất + ngày dự kiến hoàn thành. (3) Kiểm hàng — đội QC CSR đến nhà máy 1-2 ngày trước xuất xưởng, audit hàng theo PO + spec, gửi báo cáo + ảnh/video. (4) Vận chuyển — hàng load lên container/xe tải, có tracking number quốc tế (cho hàng biển: Bill of Lading; cho hàng bộ: vehicle plate + GPS), realtime location update mỗi 6h. (5) Đã giao — hàng vào kho CSR Hữu Nghị (đường bộ) hoặc Hải Phòng/Cát Lái (đường biển), thông quan hoàn tất, vận chuyển nội địa đến kho buyer. Buyer ký nhận → đơn đóng → tài khoản trung gian giải ngân.",
      "Khác biệt lớn nhất của CSR vs các nền tảng khác: chúng tôi cung cấp ảnh/video THỰC TẾ tại mỗi mốc, không chỉ status text. Cụ thể: Sản xuất — 5-10 ảnh dây chuyền đang chạy lô của bạn + 2-3 video timelapse production. Kiểm hàng — 30-50 ảnh + 5-8 video chi tiết (đo kích thước, kiểm material, đếm số lượng, kiểm packaging). Vận chuyển — ảnh container đóng kín + video load hàng + ảnh CMR (vận đơn quốc tế) + ảnh thông quan + ảnh vào kho. Đã giao — ảnh giao tận nơi cho buyer + biên bản nghiệm thu + barcode scan. Tổng cộng 30-80 ảnh + 5-15 video cho mỗi đơn, lưu trên cloud, buyer download bất cứ lúc nào.",
      "Thông báo cập nhật qua nhiều kênh đồng thời: (1) Email — nội dung đầy đủ + link xem chi tiết + ảnh thumbnail. (2) Zalo OA Cybersilkroads — push notification realtime, nhanh nhất trên mobile. (3) SMS cho các mốc quan trọng (giao hàng) — nội dung ngắn gọn. (4) Dashboard /buyer-center/orders — view tổng quan tất cả đơn, filter theo trạng thái, search theo PO number/sản phẩm/NCC. (5) API tracking cho enterprise (Buyer ≥$100K/năm) — webhook real-time để integrate vào ERP nội bộ của doanh nghiệp.",
      "Khi có sự cố (NCC trễ thời hạn, hàng hỏng trong vận chuyển, vướng hải quan, etc.), CSR thông báo PROACTIVE trong vòng 2 giờ kể từ lúc phát hiện — không đợi buyer hỏi. Mỗi sự cố có response plan: NCC trễ → CSR đàm phán phạt + tăng tốc, đề xuất compensation cho buyer (giảm giá, miễn phí vận chuyển). Hàng hỏng vận chuyển → bảo hiểm CIF cover 100%, NCC ship bù miễn phí, thời gian giao mới được communicate. Vướng hải quan → CSR Logistics team xử lý, support 24/7, thời hạn mới được ước tính. Buyer luôn có 1 dedicated Quản lý tài khoản (cho đơn ≥$10K) để liên hệ trực tiếp khi có vấn đề.",
    ],
    pullQuote: {
      text: "Buyer Việt Nam cần biết hàng đang ở đâu — không phải vì không tin tưởng CSR, mà vì họ có khách hàng cuối đang chờ. Realtime tracking là cách chúng tôi tôn trọng kế hoạch kinh doanh của bạn.",
      author: "Đội Logistics Cybersilkroads",
    },
    checklist: [
      "5 trạng thái rõ ràng từ đặt cọc đến giao hàng",
      "30-80 ảnh + 5-15 video THỰC TẾ mỗi đơn",
      "Notification multi-channel: email + Zalo + SMS + dashboard",
      "Proactive alert trong 2h khi có sự cố",
      "API tracking cho enterprise integrate ERP",
    ],
    related: [
      { label: "Vào trang đơn hàng", href: "/buyer-center/orders" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
      { label: "Khiếu nại", href: "/info/disputes" },
    ],
    primaryCta: { label: "Xem dashboard đơn hàng", href: "/buyer-center/orders" },
  },
  "find-products": {
    title: "Tìm sản phẩm trên Cybersilkroads",
    intro: "3 cách tìm sản phẩm hiệu quả nhất.",
    paragraphs: [
      "Cách 1 — Duyệt danh mục: 12 ngành chính, hơn 932 phân loại con. Phù hợp khi bạn biết rõ loại sản phẩm cần.",
      "Cách 2 — Search: nhập từ khóa tiếng Việt hoặc tiếng Anh. Hệ thống tự động dịch sang tiếng Trung và search trên kho dữ liệu nhà máy.",
      "Cách 3 — Gửi RFQ: mô tả nhu cầu, hệ thống AI matching gửi đến 5-10 NCC phù hợp nhất. Bạn nhận báo giá trong 24h.",
    ],
    related: [
      { label: "Duyệt danh mục", href: "/products" },
      { label: "Gửi RFQ", href: "/buying-request" },
    ],
  },
  "network": {
    title: "Mạng lưới đối tác hiệp hội — Việt Nam · Trung Quốc · ASEAN",
    intro:
      "Cybersilkroads không vận hành một đội audit độc quyền — chúng tôi xây dựng mạng lưới hợp tác sâu với các hiệp hội thương mại B2B chính thức tại Việt Nam, Trung Quốc và toàn khu vực ASEAN. Cách tiếp cận này biến CSR từ một nền tảng đơn lẻ thành một hub kết nối chính thức giữa các thị trường — buyer Việt Nam được tiếp cận tới hàng nghìn NCC đã được hiệp hội ngành mẹ chứng nhận, và NCC cũng được mở cửa vào thị trường ASEAN qua mạng lưới partner của chúng tôi. Đây là cách chúng tôi 'dệt' con đường tơ lụa số: không bằng văn phòng đại diện, mà bằng quan hệ hiệp hội xuyên biên giới.",
    icon: "🤝",
    category: "MẠNG LƯỚI ĐỐI TÁC",
    quickFacts: [
      { label: "Hiệp hội VN đối tác", value: "12+" },
      { label: "Hiệp hội TQ đối tác", value: "9+" },
      { label: "Hiệp hội ASEAN", value: "7+" },
      { label: "Tổng NCC tiếp cận", value: "180,000+" },
      { label: "Trade fair đại diện", value: "24 sự kiện/năm" },
      { label: "MOU đã ký", value: "28 thoả thuận" },
      { label: "Phạm vi địa lý", value: "10 quốc gia" },
      { label: "Ngôn ngữ hỗ trợ", value: "VI · ZH · EN · TH · ID · MS" },
    ],
    sectionTitles: [
      "1. Tầm nhìn — Một mạng lưới, một con đường",
      "2. Đối tác hiệp hội tại Việt Nam — VCCI, HAWA, VITAS, VEIA, VINASME",
      "3. Đối tác hiệp hội tại Trung Quốc — CCPIT, CFA, CCCMC, Foshan/Guangdong",
      "4. Đối tác hiệp hội ASEAN — FTI, KADIN, FMM, SBF, JFCCII",
      "5. Cơ chế hợp tác cụ thể — MOU, trade mission, joint trade fair",
      "6. Lợi ích cho buyer Việt Nam từ mạng lưới hiệp hội",
      "7. Các sự kiện trade fair & business matching xuyên ASEAN",
    ],
    paragraphs: [
      "Tầm nhìn của Cybersilkroads không phải là cạnh tranh với các nền tảng B2B toàn cầu — mà là kết nối các thị trường ASEAN với hệ sinh thái sản xuất Trung Quốc theo một cách mà các nền tảng global không làm được: thông qua quan hệ hiệp hội chính thức. Khu vực Đông Nam Á có quy mô GDP $3.6 nghìn tỷ USD (2025), tăng trưởng 5.1%/năm, và là đối tác thương mại lớn nhất của Trung Quốc kể từ 2020. Trong dòng chảy này, Việt Nam đang ở vị trí đặc biệt — vừa là cửa ngõ giữa ASEAN và Trung Quốc trên đất liền (qua Lạng Sơn, Móng Cái), vừa là nơi 5 trong 6 hành lang cáp quang biển của khu vực hội tụ. Cybersilkroads đặt mình vào chính giao điểm đó: thay vì xây 'đội audit Quảng Châu' kiểu thường, chúng tôi ký MOU với các hiệp hội ngành chính thức của cả 3 khối — Việt Nam, Trung Quốc, ASEAN — để tận dụng mạng lưới đã có sẵn của họ. Mô hình này linh hoạt hơn, có pháp lý rõ ràng hơn, và quan trọng nhất: tạo ra giá trị thực cho cả buyer và supplier mà chỉ một văn phòng đại diện đơn lẻ không thể có.",
      "Đối tác hiệp hội tại Việt Nam (12+ tổ chức): (1) VCCI — Phòng Thương mại và Công nghiệp Việt Nam (Vietnam Chamber of Commerce and Industry), thành lập 1963, đại diện cho 200,000+ doanh nghiệp Việt Nam, đối tác chính thức cấp tổng cục. (2) HAWA — Hiệp hội Mỹ nghệ và Chế biến Gỗ TP HCM (Handicraft and Wood Industry Association of Ho Chi Minh City), 700+ thành viên ngành gỗ, tổ chức HawaExpo hàng năm với 30,000 visitor. (3) VIFORES — Hiệp hội Gỗ và Lâm sản Việt Nam, đại diện ngành xuất khẩu $14 tỷ USD/năm. (4) VITAS — Hiệp hội Dệt may Việt Nam (Vietnam Textile and Apparel Association), 600+ thành viên, đối tác về tiêu chuẩn lao động và xuất khẩu. (5) VEIA — Hiệp hội Doanh nghiệp Điện tử Việt Nam (Vietnam Electronic Industries Association), kết nối tới 350+ doanh nghiệp điện tử. (6) VSA — Hiệp hội Thép Việt Nam. (7) VINASME — Hiệp hội Doanh nghiệp Nhỏ và Vừa Việt Nam (Vietnam Association of Small and Medium Enterprises), 60,000+ thành viên — đối tác chiến lược của CSR vì SME chính là đối tượng buyer lớn nhất. (8) VAFI — Hiệp hội Doanh nghiệp Có vốn Đầu tư Nước ngoài Việt Nam. (9) Hiệp hội Doanh nghiệp Cơ khí Việt Nam (VAMI). (10) Hiệp hội Hồ tiêu, Cà phê, Cao su Việt Nam (cho ngành nông sản chế biến — phụ phẩm cho thị trường TQ). (11) VLA — Hiệp hội Doanh nghiệp Dịch vụ Logistics Việt Nam (Vietnam Logistics Business Association). (12) Hiệp hội Doanh nghiệp Trẻ Việt Nam (Vietnam Young Entrepreneurs Association). MOU với mỗi hiệp hội đều có nội dung cụ thể: ưu đãi phí thành viên CSR cho doanh nghiệp thuộc hiệp hội, chia sẻ Báo cáo thị trường ngành, đồng tổ chức webinar và trade mission, joint booth tại trade fair quốc tế.",
      "Đối tác hiệp hội tại Trung Quốc (9+ tổ chức): (1) CCPIT — China Council for the Promotion of International Trade (中国国际贸易促进委员会), thành lập 1952, là tổ chức xúc tiến thương mại chính thức của Trung Quốc, vận hành Canton Fair (China Import and Export Fair) — hội chợ B2B lớn nhất thế giới với 200,000+ exhibitor và 600,000+ buyer mỗi kỳ. (2) China Furniture Association (CFA, 中国家具协会) — đại diện 5,000+ nhà máy nội thất, tổ chức CIFF (China International Furniture Fair) tại Quảng Châu và Thượng Hải. (3) China Building Decoration Association (CBDA, 中国建筑装饰协会) — ngành vật liệu xây dựng, sanitary, gốm sứ. (4) CCCMC — China Chamber of Commerce of Metals, Minerals & Chemicals Importers & Exporters (中国五矿化工进出口商会). (5) China National Light Industry Council (CNLIC, 中国轻工业联合会) — bao trùm ngành đồ gia dụng, đồ chơi, dụng cụ. (6) China Chamber of Commerce for Import and Export of Machinery and Electronic Products (CCCME, 中国机电产品进出口商会). (7) Guangdong Federation of Industry and Commerce (广东省工商业联合会) — đại diện doanh nghiệp tỉnh Quảng Đông, nơi tập trung 35% capacity sản xuất xuất khẩu của TQ. (8) Foshan Chamber of International Commerce (佛山市国际商会) — Foshan là cluster lớn nhất thế giới cho gốm sứ, sanitary, nội thất gỗ. (9) Shenzhen Chamber of Commerce — đối tác cho ngành điện tử, công nghệ, linh kiện chính xác. Các MOU với hiệp hội Trung Quốc cho phép CSR tiếp cận trực tiếp 180,000+ NCC chính thức (đã được hiệp hội ngành xác minh tư cách kinh doanh), đại diện CSR tại các trade fair lớn (booth chung), và nhận early-access danh sách NCC mới đăng ký mỗi năm.",
      "Đối tác hiệp hội ASEAN (7+ tổ chức) — đây là phần đặc biệt quan trọng cho tầm nhìn 'connecting all SE Asian markets and China' của CSR: (1) ASEAN BAC — ASEAN Business Advisory Council, body chính thức tư vấn cho ASEAN Heads of State về policy thương mại khu vực. (2) FTI — Federation of Thai Industries (สภาอุตสาหกรรมแห่งประเทศไทย), đại diện 12,000+ doanh nghiệp Thái Lan, đặc biệt mạnh về ô tô, điện tử, food processing. (3) KADIN Indonesia — Kamar Dagang dan Industri Indonesia, hiệp hội thương mại lớn nhất Indonesia với 7,000+ thành viên, là đối tác cấp G2B chính thức với chính phủ Indonesia. (4) FMM — Federation of Malaysian Manufacturers, đại diện 3,500+ nhà sản xuất Malaysia, mạnh về điện tử, dầu cọ, hoá chất. (5) SBF — Singapore Business Federation, đối tác cấp doanh nghiệp lớn nhất Singapore, mạnh về tài chính cross-border và supply chain finance. (6) PCCI — Philippine Chamber of Commerce and Industry, đại diện 30,000+ doanh nghiệp Philippines. (7) Cambodia Chamber of Commerce (CCC) + Lao National Chamber of Commerce and Industry (LNCCI) + Myanmar Federation of Chambers of Commerce and Industry (UMFCCI) — gói 'Indochina Cluster' cho 3 nước có quan hệ chặt với Việt Nam. Mạng lưới ASEAN này biến Cybersilkroads thành cây cầu hai chiều: NCC Trung Quốc tiếp cận buyer Thailand/Indonesia/Malaysia/Philippines qua hệ thống CSR; doanh nghiệp Việt Nam có cơ hội export sản phẩm chế biến sang các thị trường ASEAN láng giềng. Đặc biệt với hiệu lực RCEP (Regional Comprehensive Economic Partnership) từ 2022 — bao trùm 15 quốc gia, 30% GDP toàn cầu — CSR ở vị trí lý tưởng để khai thác ưu đãi thuế giữa các nước thành viên.",
      "Cơ chế hợp tác cụ thể với mỗi hiệp hội đối tác đều có 5 layer: (a) MOU văn bản chính thức — ký giữa CSR và hiệp hội, công khai (không bí mật), thông thường có thời hạn 3 năm với option gia hạn, scope ghi rõ về dữ liệu chia sẻ, joint marketing, co-organize event, và các giới hạn pháp lý theo Luật cạnh tranh + GDPR/PIPL/NĐ 13/2023. (b) Cross-membership benefit — thành viên hiệp hội đối tác được giảm 20-40% phí tier Verified của CSR; ngược lại, NCC tier Premium của CSR được áp dụng membership rate ưu đãi tại hiệp hội Trung Quốc / ASEAN. (c) Co-publishing Báo cáo thị trường — phối hợp với hiệp hội ngành để biên soạn báo cáo Annual Industry Report (giảm chi phí cho cả hai bên, tăng tin cậy của data). (d) Joint trade mission — tổ chức đoàn doanh nghiệp Việt Nam đi Trung Quốc 4 lần/năm (Canton Fair tháng 4, 10 + CIFF Quảng Châu tháng 3 + CIFF Thượng Hải tháng 9) và đoàn doanh nghiệp Trung Quốc đến VietnamWood, VIETBUILD, VIIF — chi phí chia sẻ giữa CSR và hiệp hội đối tác. (e) Liaison office tại trụ sở hiệp hội — CSR có nhân sự liaison part-time tại các hiệp hội lớn (VCCI Hà Nội, VCCI HCM, KADIN Jakarta, FTI Bangkok) — không phải full office mà là designated contact person + tủ tài liệu CSR đặt tại hiệp hội.",
      "Lợi ích cụ thể cho buyer Việt Nam từ mạng lưới hiệp hội này (so với việc tự sourcing trực tiếp): (1) Truy cập danh sách NCC chính thức được CCPIT/CFA/CBDA xác minh — không phải broker đội lốt, đã có pháp lý kinh doanh đầy đủ tại TQ và lịch sử xuất khẩu thực. (2) Tham gia trade mission có CSR + hiệp hội tổ chức (chi phí ~50-60% so với tự đi): bay từ HN/HCM, khách sạn 4-sao tại Quảng Châu, transport đến trade fair, phiên dịch chuyên ngành, business matching pre-arranged 8-12 cuộc gặp NCC trong 3 ngày. (3) Tài liệu báo giá song ngữ Việt-Trung do liaison của CSR + đối tác hiệp hội xác nhận tính hợp pháp — không phải email broker sketchy. (4) Khi có tranh chấp, CSR có thể leverage uy tín của hiệp hội để mediate — 'face-saving culture' của NCC Trung Quốc khiến họ coi reputation với hiệp hội ngành quan trọng hơn lợi nhuận của 1 đơn cụ thể, vì vậy mediation qua hiệp hội đạt thoả thuận trong 78% case (so với 45% nếu chỉ là 1-1 dispute). (5) Cơ hội mở rộng ra ASEAN — sản phẩm Việt Nam (đặc biệt là chế biến nông sản, đồ gỗ, may mặc) có thể được CSR đẩy lên hệ thống KADIN, FTI, FMM cho buyer khu vực, không chỉ là kênh nhập từ TQ một chiều.",
      "Lịch trade fair & business matching CSR đại diện hoặc đồng tổ chức trong 2026 (24 sự kiện): Q1 — CIFF Quảng Châu (3/2026, nội thất), Hong Kong Electronics Fair (4/2026), VietnamWood HCM (3/2026); Q2 — Canton Fair Phase 1-2-3 (4-5/2026, comprehensive), VIETBUILD HCM (5/2026, vật liệu xây dựng); Q3 — CIFF Thượng Hải (9/2026), VIIF Hà Nội (9/2026, công nghiệp), Bangkok International Gift Fair (10/2026); Q4 — Canton Fair Autumn (10-11/2026), VIETBUILD Hà Nội (11/2026), CES Asia (12/2026). Buyer Việt Nam có thể đăng ký tham gia đoàn doanh nghiệp do CSR + VCCI / HAWA / VITAS đồng tổ chức tại trade-shows.cybersilkroads.com — chi phí gói 'Standard Mission' $580-1,200 cho 4 ngày 3 đêm, gói 'Executive Mission' với gặp gỡ founder NCC + nhà máy visit $1,800-3,500. Mỗi đoàn có CSR liaison + hiệp hội VN co-leader đi cùng, đảm bảo doanh nghiệp Việt Nam vừa được hỗ trợ ngôn ngữ, vừa có pháp lý protection trong các thoả thuận sơ bộ.",
    ],
    pullQuote: {
      text: "Chúng tôi không xây vương quốc riêng — chúng tôi dệt mạng lưới. Mỗi MOU với một hiệp hội là một sợi tơ thêm vào con đường tơ lụa số. Khi bạn dùng Cybersilkroads, bạn không chỉ dùng một platform — bạn đang đứng trên 28 thoả thuận thương mại chính thức xuyên 3 khối kinh tế.",
      author: "Đội Partnership Cybersilkroads",
    },
    checklist: [
      "🇻🇳 12+ hiệp hội Việt Nam: VCCI · HAWA · VIFORES · VITAS · VEIA · VINASME · VLA",
      "🇨🇳 9+ hiệp hội Trung Quốc: CCPIT · CFA · CBDA · CCCMC · CNLIC · CCCME",
      "🌏 7+ hiệp hội ASEAN: ASEAN BAC · FTI Thailand · KADIN Indonesia · FMM Malaysia · SBF Singapore",
      "📜 28 MOU đã ký — công khai, kèm scope dữ liệu rõ ràng",
      "🎫 24 trade fair đại diện hoặc đồng tổ chức/năm",
      "👥 Tiếp cận tới 180,000+ NCC qua mạng lưới hiệp hội",
      "🤝 Mediation tranh chấp leverage uy tín hiệp hội — pass rate 78%",
      "🚀 Cơ hội export 2 chiều — Việt Nam đi ASEAN, không chỉ nhập từ TQ",
    ],
    faq: [
      {
        q: "Tôi có cần là thành viên hiệp hội nào để dùng Cybersilkroads không?",
        a: "Không bắt buộc. Mọi doanh nghiệp Việt Nam đều có thể đăng ký buyer account miễn phí trên CSR. Tuy nhiên, nếu bạn là thành viên VCCI / HAWA / VITAS / VINASME hoặc các hiệp hội đối tác khác, bạn được giảm 20-40% phí tier Verified và được mời tham gia trade mission ưu tiên. Verify membership bằng cách upload thẻ hội viên còn hiệu lực trong dashboard.",
      },
      {
        q: "MOU với các hiệp hội có công khai không?",
        a: "Có. Toàn bộ MOU và tóm tắt scope hợp tác được công bố tại partnerships.cybersilkroads.com — chúng tôi tin minh bạch là điều kiện để xây tin cậy lâu dài. Nội dung công khai: tên hai bên, ngày ký, thời hạn, scope chính, cam kết không độc quyền (CSR không yêu cầu hiệp hội từ chối hợp tác với platform khác). Các điều khoản tài chính cụ thể (revenue share nếu có) được giữ riêng theo yêu cầu của một số hiệp hội.",
      },
      {
        q: "CSR có thể giúp tôi export hàng Việt Nam sang ASEAN không?",
        a: "Có, đây là một trong những use case quan trọng của mạng lưới ASEAN. Nếu bạn là nhà sản xuất/nhà cung cấp Việt Nam (đặc biệt: chế biến nông sản, đồ gỗ nội thất, may mặc, thủ công mỹ nghệ), liên hệ partnership@cybersilkroads.com để được hỗ trợ list lên hệ thống KADIN/FTI/FMM partner network. Quy trình tương tự sourcing flow nhưng theo chiều ngược: NCC Việt Nam → buyer ASEAN. Hiện đã có 38 doanh nghiệp Việt Nam tham gia chương trình này (chủ yếu ngành gỗ và thủ công).",
      },
      {
        q: "Khác gì giữa CSR và Alibaba.com hay MIC, khi họ cũng có quan hệ với CCPIT?",
        a: "Khác biệt cốt lõi: Alibaba/MIC dùng quan hệ CCPIT chủ yếu để có 'PR endorsement' trên website và slot tại Canton Fair. CSR dùng quan hệ hiệp hội để xây dựng dispute mediation pathway, joint trade mission cho buyer Việt Nam đi đoàn (chi phí thấp hơn 50%), và đặc biệt để leverage 'reputation pressure' khi xử lý tranh chấp — điều mà platform global không làm được vì họ trung lập với mọi quốc gia. CSR thiên vị buyer Việt Nam một cách công khai và đó là điểm mạnh, không phải yếu.",
      },
      {
        q: "Trade mission có phù hợp cho doanh nghiệp nhỏ (≤20 nhân viên) không?",
        a: "Rất phù hợp. Thực tế ~62% người tham gia trade mission của CSR là doanh nghiệp SME (≤30 nhân viên). Lý do: chi phí thấp ($580-1,200 gói cơ bản), được hỗ trợ ngôn ngữ + pháp lý mà SME không có in-house, và cơ hội networking với các SME ASEAN khác (KADIN, FTI cũng đại diện rất nhiều SME). Mỗi đoàn được thiết kế chỉ 12-25 doanh nghiệp để đảm bảo chất lượng matching, không phải đoàn 100 người mất kiểm soát.",
      },
      {
        q: "Hiệp hội nào quan trọng nhất cho ngành nội thất gỗ?",
        a: "Cho ngành nội thất gỗ — buyer Việt Nam sẽ làm việc qua mạng lưới: HAWA (VN, hiệp hội chủ lực) + VIFORES (VN, ngành rộng hơn gồm cả lâm sản) ở phía Việt; CFA China Furniture Association + Foshan Chamber + Guangdong Federation phía Trung Quốc. CSR có chuyên viên dedicated cho ngành này tại Hà Nội và liaison tại HAWA HCM — gặp trực tiếp tại sự kiện HawaExpo (3/2026) và CIFF Quảng Châu (3/2026 và 9/2026 cho session Thượng Hải).",
      },
      {
        q: "Tôi muốn ký MOU giữa hiệp hội của tôi và CSR — quy trình thế nào?",
        a: "Liên hệ partnership@cybersilkroads.com với thông tin: tên hiệp hội, số thành viên, ngành, mục tiêu hợp tác cụ thể. Đội Partnership của CSR review trong 7-10 ngày, schedule call 60 phút để discuss scope. Quy trình từ first contact → MOU ký thường 8-14 tuần. CSR cởi mở với mọi hiệp hội B2B chính thức — không có quota.",
      },
    ],
    related: [
      { label: "Quy trình kiểm định nhà máy", href: "/info/audit-process" },
      { label: "Trade Show CSR đại diện", href: "/trade-shows" },
      { label: "Báo cáo thị trường", href: "/info/market-reports" },
      { label: "Liên hệ Partnership team", href: "/info/contact" },
    ],
    primaryCta: { label: "Đăng ký trade mission tiếp theo", href: "/trade-shows" },
  },
  "audit-process": {
    title: "Quy trình kiểm định nhà máy — Tấm khiên đầu tiên cho buyer Việt Nam",
    intro:
      "Pass rate trung bình 32% — nghĩa là 2 trong 3 nhà máy đăng ký đã bị loại trước khi buyer Việt Nam phải tiếp xúc. Quy trình kiểm định của Cybersilkroads gồm 7 bước nghiêm ngặt, kéo dài 14-22 ngày, kết hợp giữa kiểm tra pháp lý qua hệ thống Tianyancha + GACC, audit on-site theo chuẩn ISO 19011, lab test sản phẩm tại đối tác SGS · Bureau Veritas · TÜV Rheinland · Intertek, và compliance kiểm tra theo BSCI/SEDEX/SA8000 cho điều kiện lao động. Audit lại 2 lần/năm để duy trì tier Verified — không có khái niệm 'đã pass thì xong'.",
    icon: "🔍",
    category: "QUY TRÌNH KIỂM ĐỊNH",
    quickFacts: [
      { label: "Số bước", value: "7" },
      { label: "Thời gian", value: "14-22 ngày" },
      { label: "Pass rate", value: "32%" },
      { label: "Tài liệu pháp lý", value: "18 mục" },
      { label: "Hạng mục on-site", value: "12 mục" },
      { label: "Đối tác lab", value: "SGS · BV · TÜV · Intertek" },
      { label: "Audit lại", value: "2 lần/năm" },
      { label: "Chi phí cho NCC", value: "Free (CSR chịu)" },
    ],
    sectionTitles: [
      "1. Vì sao Audit là tấm khiên đầu tiên cho buyer Việt Nam",
      "2. Bước 1 — Đăng ký & Pre-screening pháp lý (2-3 ngày)",
      "3. Bước 2 — Audit hồ sơ pháp lý (3-5 ngày, 18 tài liệu)",
      "4. Bước 3 — Audit on-site theo chuẩn ISO 19011 (1-2 ngày)",
      "5. Bước 4 — Lab test sản phẩm cùng SGS · BV · TÜV (5-10 ngày)",
      "6. Bước 5 — Compliance lao động theo BSCI/SEDEX/SA8000",
      "7. Bước 6 — Onboarding tier Verified (3-5 ngày)",
      "8. Bước 7 — Re-audit định kỳ & xử lý vi phạm",
      "9. Audit chuyên ngành — Thực phẩm, Điện tử, Hoá chất, Đồ chơi",
      "10. Mẫu báo cáo audit — cấu trúc 80-120 trang",
    ],
    paragraphs: [
      "Sourcing B2B xuyên biên giới có một bài toán cấu trúc: 70% rủi ro buyer gặp phải không nằm ở giá hay logistics, mà ở chính nhà máy — họ thực sự là ai, năng lực thực vs claim trên website, có đang ngắc ngoải tài chính không, có vi phạm lao động trẻ em hay môi trường không, sản phẩm có đạt chất lượng đồng nhất qua các batch không. Trên Alibaba.com global, mọi NCC đều có thể tự tạo Verified badge bằng cách trả phí và submit giấy tờ — không có audit on-site thực. Made-in-China, Global Sources cũng tương tự. Báo cáo của Allianz Trade 2024 cho thấy 38% giao dịch B2B Trung Quốc - Đông Nam Á gặp ít nhất 1 vấn đề chất lượng nghiêm trọng, 12% liên quan đến nhà máy 'broker' không phải nhà máy thật. Cybersilkroads chọn cách khác: không tin claim của NCC, kiểm tra mọi thứ — và chỉ chấp nhận 32% trong số đăng ký. Đây là tấm khiên đầu tiên bảo vệ buyer Việt Nam, trước khi đến tầng thứ hai (Bảo đảm Giao dịch (tài khoản trung gian)) và tầng thứ ba (QC trước xuất xưởng).",
      "Bước 1 — Pre-screening pháp lý (2-3 ngày): NCC tự đăng ký qua /sell-on-csr hoặc được scout tại Canton Fair, China International Furniture Fair (CIFF), HKTDC fair. Form đăng ký 32 câu hỏi: thông tin pháp nhân (mã số thuế, năm thành lập, vốn điều lệ, nhân sự thực tế), sản phẩm chủ lực (HS code, MOQ, thời gian giao), doanh thu xuất khẩu 3 năm gần nhất theo thị trường, certifications hiện có. CSR cross-check ngay 5 nguồn dữ liệu công khai: (a) Tianyancha (天眼查) — đối thủ của VietnamCredit, cho phép tra giấy phép, lịch sử thay đổi vốn, kiện tụng, blacklist; (b) Qichacha (企查查) — backup verification source; (c) GACC (China Customs) — kiểm tra license xuất khẩu thực tế và HS code đã từng khai báo; (d) Alibaba.com / MIC public profile + customer reviews lịch sử; (e) China Court Open Database (中国裁判文书网) — án phạt hành chính, vi phạm IP, gian lận thanh toán. NCC có 'red flag' hợp lý (kiện tụng quá 3 vụ chưa giải quyết, blacklist GACC, vi phạm lao động trẻ em ghi nhận) bị reject ngay với thư phản hồi rõ ràng — không bao giờ ghosting.",
      "Bước 2 — Audit hồ sơ pháp lý (3-5 ngày, 18 mục): NCC pass pre-screening nộp đầy đủ 18 tài liệu chính thức (NCC chỉ phải nộp một lần, encrypted via private S3 bucket, retention 7 năm, GDPR-style controls). Danh sách: (1) Business License gốc (营业执照), (2) Tax Registration (税务登记证), (3) Organization Code (组织机构代码证) hoặc unified social credit code (统一社会信用代码), (4) Foreign Trade Operator Registration (对外贸易经营者备案登记表), (5) Customs Declaration Registration (报关单位注册登记证书), (6) ISO 9001:2015 Quality Management certificate, (7) ISO 14001:2015 Environmental Management (nếu có — cộng điểm), (8) ISO 45001:2018 OH&S Management (cộng điểm), (9) Product certifications theo ngành (CE / FCC / RoHS / REACH / FDA / FSC / GREENGUARD / OEKO-TEX), (10) BSCI hoặc SEDEX SMETA audit report 12 tháng gần nhất (cộng điểm), (11) 12 hợp đồng xuất khẩu gần nhất (showing real export activity), (12) Sao kê ngân hàng 3 tháng từ tài khoản công ty (chứng minh dòng tiền vận hành thực — không phải shell company), (13) Bảng lương công nhân tháng gần nhất (verify số nhân lực vs claim — sai lệch >15% là red flag), (14) Layout nhà máy + diện tích sàn được công chứng (kiểm tra diện tích thực vs claim), (15) Hợp đồng thuê đất hoặc giấy chứng nhận quyền sử dụng đất, (16) 30+ ảnh nhà máy (ngoài, dây chuyền, kho nguyên liệu, kho thành phẩm, văn phòng, khu nghỉ công nhân), (17) Reference contacts từ 5 khách hàng lớn nhất 3 năm gần (CSR sẽ gọi xác minh ngẫu nhiên 2-3 reference), (18) Chính sách QC nội bộ + SOP văn bản. Đội Audit cross-check trong 3-5 ngày, dùng AI để detect tài liệu giả mạo (font inconsistency, metadata, watermark forensics). Bước này loại trung bình 40% NCC pass pre-screening — chủ yếu vì broker đội lốt, nhà máy 'phantom' chỉ có văn phòng, giấy tờ giả, hoặc dòng tiền không đủ vận hành.",
      "Bước 3 — Audit on-site theo chuẩn ISO 19011 (1-2 ngày): Đội QC 2-3 người (1 Lead Auditor + 1-2 Sector Specialist tuỳ ngành) đến nhà máy ngay theo lịch — KHÔNG báo trước quá 5 ngày để tránh staging. ISO 19011:2018 là tiêu chuẩn quốc tế cho management system audit, CSR áp dụng nguyên bản. Lịch trình ngày 1: 7:30 đến nhà máy, 8:00 opening meeting với chủ nhà máy + plant manager (giới thiệu scope, methodology, không có gì để giấu); 8:30-12:00 đi tour 12 hạng mục — (i) Mặt bằng tổng thể & thoát hiểm, (ii) Dây chuyền sản xuất chính (đếm máy thực vs claim, kiểm idle/active rate), (iii) Công nhân (đếm thực, kiểm độ tuổi minimum 16+, ID check sample), (iv) Kho nguyên liệu (origin tracking, supplier list, certificate of analysis), (v) Kho thành phẩm (quy cách đóng gói, palletization, label tiếng Anh + tiếng VN nếu có), (vi) Lab QC nội bộ (thiết bị calibration, SOP, sampling rate AQL), (vii) Phòng PCCC + thoát hiểm (theo GB 50016-2014), (viii) Khu nghỉ + canteen công nhân (điều kiện sống, nước sạch, AC), (ix) Phòng metrology (cân + thước được calibrated bởi CMA-certified lab), (x) Khu xử lý nước thải / khí thải (compliance GB 8978-1996), (xi) Server room / IT (PLM, ERP system maturity), (xii) Bộ phận R&D / mẫu mới (innovation capacity); 12:00-13:30 ăn trưa cùng quản lý + interview ngẫu nhiên 5-8 công nhân về điều kiện làm việc (private 1-1, có translator nếu cần); 13:30-15:30 quay video 360° toàn bộ nhà máy + chụp 100-180 ảnh evidence + đo đạc thực tế bằng laser distance meter; 15:30-17:00 quan sát một batch sản phẩm thực đang chạy end-to-end, ghi nhận sai lỗi quan sát được; 17:00-18:00 closing meeting, ký Audit Field Notes. Báo cáo finaledited 80-120 trang trong 5 ngày làm việc, ký số bằng chứng chỉ doanh nghiệp lưu trữ trên blockchain (Polygon mainnet) để không thể chỉnh sửa lịch sử. NCC nhận bản tóm tắt; buyer xem được phần được phép share trên product page.",
      "Bước 4 — Lab test sản phẩm cùng đối tác bên thứ ba (5-10 ngày): NCC gửi 3-5 mẫu sản phẩm chủ lực về phòng test theo ngành. CSR partnership với 4 lab quốc tế: (a) SGS — chuẩn quốc tế, branch tại Quảng Châu, Thâm Quyến, Thượng Hải, Ningbo. (b) Bureau Veritas (BV) — đặc biệt mạnh về furniture, building materials, textiles. (c) TÜV Rheinland — chuyên electrical safety, EMC, machinery. (d) Intertek — strong cho consumer goods, toys, food contact materials. Test theo 4 trục: (1) Material safety — XRF spectrometry kiểm chì/cadmium/thuỷ ngân/arsenic; GC-MS kiểm formaldehyde, VOC, phthalate; FTIR cho polymer composition. (2) Cơ tính — độ bền uốn/kéo/nén/va đập theo ASTM D790 / ISO 178; độ cứng Rockwell / Shore; abrasion resistance Taber. (3) Độ bền môi trường — UV chamber 500h theo ISO 4892-3, salt-spray 200h theo ASTM B117, thermal cycling -20°C / +70°C × 100 cycles, humidity 95% × 240h. (4) Functional theo sản phẩm — điện trở + lumen output cho đèn LED, water flow + leak test cho sanitary, drop test 1.2m cho electronics, IP rating cho sản phẩm có claim chống nước/bụi. Kết quả test có chứng chỉ 3rd-party (không thể CSR thông đồng với NCC vì lab độc lập), là baseline để monitor consistency qua re-audit. Phí lab test $300-1,800 tuỳ ngành — CSR chia sẻ chi phí với NCC (NCC trả 50% trong 6 tháng đầu, 100% từ năm 2). Buyer xem được test certificate trên product detail page với link verify trực tiếp về SGS/BV portal.",
      "Bước 5 — Compliance lao động theo BSCI / SEDEX SMETA / SA8000 (3-5 ngày, có thể chạy song song bước 4): Đây là phần quan trọng đặc biệt cho buyer Việt Nam có khách hàng cuối là EU, Mỹ, Nhật — những thị trường có quy định chặt về nguồn gốc đạo đức của hàng nhập. CSR yêu cầu NCC pass tối thiểu một trong: (a) BSCI 2.0 audit gần nhất với rating A/B (không quá 18 tháng) — Business Social Compliance Initiative do amfori EU vận hành, kiểm 13 lĩnh vực: Working Hours, Compensation, Workers Rights, Occupational H&S, Special Protection for Young Workers, No Forced/Child Labour, etc. (b) SEDEX SMETA 4-Pillar audit — covers Labour Standards, Health & Safety, Environment, Business Ethics. (c) SA8000:2014 certification — chuẩn cao nhất, ít NCC đạt nhưng có thể replace BSCI/SEDEX. Nếu NCC chưa có audit nào trong số trên, CSR mời partner audit firm (Intertek, SGS, TÜV, hoặc QIMA) thực hiện BSCI mini-audit chi phí $1,200-2,800 — CSR chịu 100% chi phí cho NCC mới trong năm đầu. Kết quả compliance được ghi rõ trên profile NCC với badge tương ứng (BSCI A / B / C / D + ngày hết hạn). Buyer Việt Nam nhập hàng để re-export sang EU có thể download Compliance Bundle Pack chứa toàn bộ audit reports — một số khách hàng cuối (IKEA, Walmart) yêu cầu bộ này.",
      "Bước 6 — Onboarding tier Verified (3-5 ngày): NCC pass cả 5 bước trên (chỉ ~32% pass rate cuối) được mời lên tier 'Nhà cung cấp đã xác minh' với phù hiệu ✓ ĐÃ KIỂM ĐỊNH hiển thị trên mọi listing. Onboarding gồm: (i) Training 4 buổi mỗi buổi 90 phút — sử dụng dashboard NCC, response RFQ best practice, SOP CSR (response time SLA <24h, packaging standard, dispute handling), Bảo đảm Giao dịch flow, Tích hợp API nếu có ERP nội bộ. (ii) Shoot ảnh sản phẩm chuẩn — CSR có đội photography đối tác (1 ngày tại nhà máy, $400 chi phí, 50 ảnh chuẩn marketing — option, không bắt buộc nhưng khuyến nghị mạnh). (iii) Video factory tour 90-180 giây — free cho tier Premium, $800 cho tier Verified. (iv) Listing 10-30 sản phẩm chủ lực với title SEO tiếng Việt, description đầy đủ, mỗi sản phẩm tối thiểu 8 ảnh + 1 video, certifications attach. (v) Setup Bảo đảm Giao dịch — verify tài khoản ngân hàng để nhận giải ngân từ tài khoản trung gian (Bank of China hoặc ICBC).",
      "Bước 7 — Re-audit định kỳ + xử lý vi phạm: NCC verified bị audit lại tự động 2 lần/năm: 1 lần on-site đầy đủ (lịch ngẫu nhiên trong cửa sổ ±30 ngày so với anniversary), 1 lần audit nhẹ (legal docs refresh + product spot-test 1 sample ngẫu nhiên). Re-audit phải thoả: (a) Production capacity không giảm >25% so với baseline ban đầu. (b) Số nhân sự không giảm >30%. (c) Complaint rate trong 6 tháng <5% trên tổng đơn (đo bằng dispute opened / orders shipped). (d) AQL pass rate ≥98% qua các batch QC inspection. (e) Không có vi phạm pháp luật mới (Tianyancha re-check). Nếu fail soft: NCC được warning + kế hoạch khắc phục 30 ngày. Nếu fail hard (ví dụ phát hiện child labour, fraud, IP infringement nghiêm trọng): suspended ngay lập tức, public notice trong dashboard buyer, refund 100% mọi đơn đang trong Bảo đảm Giao dịch (tài khoản trung gian). CSR đã suspend 47 NCC trong 2024-2025 vì các lý do nói trên — danh sách public trên trustpage.cybersilkroads.com như cam kết minh bạch.",
      "Audit chuyên ngành — một số ngành có thêm yêu cầu đặc thù: (a) Thực phẩm + Đồ uống — yêu cầu HACCP certification, FDA registration nếu xuất Mỹ, halal certification cho buyer Đông Nam Á có khách hàng Hồi giáo, GAP/GMP cho ingredients tracing, QS license của TQ; lab test thêm aflatoxin, pesticide residue, heavy metals; lưu mẫu tham chiếu 18 tháng. (b) Điện tử + thiết bị điện — CCC mark (China Compulsory Certification) bắt buộc cho TQ; thêm CE EMC + LVD cho EU, FCC + UL cho Mỹ; test EMC chamber tại TÜV; battery test theo UN 38.3 nếu có lithium; RoHS + WEEE compliance. (c) Đồ chơi trẻ em — EN 71-1/2/3 cho EU, ASTM F963 + CPSIA cho Mỹ, GB 6675 cho TQ; test age-appropriate, mechanical hazard, chemical (no lead, phthalate); third-party lab test mọi SKU mới, không sample-based. (d) Hoá chất + Mỹ phẩm — REACH SVHC list cho EU, FDA OTC monograph cho Mỹ, GMP cosmetic theo ISO 22716; MSDS đầy đủ; test allergen, heavy metals, microbial limit; storage condition compliance. (e) Đồ gỗ — FSC hoặc PEFC chain of custody cho buyer EU/Mỹ (anti-deforestation regulation EUDR có hiệu lực 2026); CARB Phase 2 cho formaldehyde emission xuất Mỹ; E1 hoặc tốt hơn cho EU. CSR có chuyên gia ngành cho mỗi vertical — Lead Auditor có background tối thiểu 8-12 năm trong ngành đó trước khi join CSR.",
      "Mẫu báo cáo audit (80-120 trang, cấu trúc chuẩn): (Section 1) Executive Summary 2 trang — pass/fail decision, key findings, score breakdown 0-100. (Section 2) Company Profile 8-12 trang — pháp lý, ownership structure, history, organization chart, key personnel. (Section 3) Production Capacity 10-15 trang — máy móc inventory, idle/active rate quan sát, monthly output chart 12 tháng, expansion plans. (Section 4) Quality Management 12-18 trang — QC SOP review, AQL methodology, complaint handling history, ISO 9001 conformance. (Section 5) Workplace Conditions 10-14 trang — H&S compliance, worker interviews summary (anonymized), BSCI/SEDEX rating. (Section 6) Environmental 6-10 trang — wastewater, emissions, waste disposal, ISO 14001 conformance. (Section 7) Financial Health 4-8 trang — bank statement analysis, cashflow assessment, going concern verdict. (Section 8) Product Quality Lab Results 15-25 trang — full test results với chart, comparison vs baseline, certificate copies. (Section 9) Risk Assessment 6-10 trang — top 5 risks identified, mitigation recommendations. (Section 10) Photo Evidence 30-50 photos. (Section 11) Audit Trail — auditor names + credentials, methodology references (ISO 19011, BSCI, SMETA), blockchain signature hash. Buyer được download bản tóm tắt 8-12 trang dưới Section 1 + 2 + 5 + 8 trên product page sau khi đăng nhập business account.",
    ],
    pullQuote: {
      text: "Chúng tôi từ chối 68% nhà máy đăng ký — không phải để tỏ ra khắc nghiệt, mà vì đó chính xác là số nhà máy không đủ chuẩn để đứng trước buyer Việt Nam. Mỗi 'không' là một rủi ro được loại trừ trước khi nó kịp gây thiệt hại.",
      author: "Lead Auditor — Cybersilkroads Audit Team",
    },
    checklist: [
      "🛡 Pass rate 32% — 68% nhà máy bị loại trước khi tới buyer",
      "📋 18 tài liệu pháp lý + cross-check Tianyancha · GACC · Court DB",
      "🏭 Audit on-site theo ISO 19011, không báo trước quá 5 ngày",
      "🧪 Lab test cùng SGS · Bureau Veritas · TÜV Rheinland · Intertek",
      "👷 Compliance BSCI / SEDEX SMETA / SA8000 cho điều kiện lao động",
      "🔄 Re-audit tự động 2 lần/năm — không có 'pass thì xong'",
      "📄 Báo cáo 80-120 trang ký số blockchain, không thể chỉnh sửa",
      "💸 Free cho NCC trong năm đầu — CSR đầu tư vì sự tin cậy của hệ thống",
    ],
    faq: [
      {
        q: "Audit có báo trước cho NCC không?",
        a: "Re-audit định kỳ chỉ thông báo trước 5 ngày — đủ để NCC sắp xếp staff đón tiếp nhưng không đủ để 'staging' (dọn dẹp, tuyển công nhân tạm, ẩn dây chuyền lỗi). Audit ban đầu cho NCC mới có thể schedule trước hơn (10-14 ngày) vì cần phối hợp logistics. CSR có quyền surprise audit cho các NCC có complaint rate tăng đột biến — không cần báo trước.",
      },
      {
        q: "Buyer Việt Nam có được xem báo cáo audit đầy đủ không?",
        a: "Có hạn chế. Bản đầy đủ 80-120 trang chứa thông tin nhạy cảm (tài chính, ownership) chỉ CSR + cơ quan kiểm tra ngoài giữ. Buyer business account xem được bản tóm tắt 8-12 trang gồm Executive Summary, Company Profile, Workplace Conditions, Lab Results — đủ để đánh giá độ tin cậy mà không xâm phạm bí mật kinh doanh NCC. Bản full có thể request trong dispute hoặc legal proceeding với consent của NCC.",
      },
      {
        q: "Audit có chi phí gì cho NCC không?",
        a: "Free trong năm đầu (CSR chịu 100% — cost trung bình $2,400-4,800/audit/NCC tuỳ độ phức tạp). Từ năm 2 trở đi, NCC tier Verified trả $800-1,500/năm để cover lab test cost; tier Premium tiếp tục free. CSR đầu tư mạnh vào audit không phải vì charity — đó là moat cạnh tranh quan trọng nhất, vì 90% platform B2B khác không làm được.",
      },
      {
        q: "Nếu NCC pass audit rồi sau đó chất lượng giảm — sao biết?",
        a: "5 cơ chế: (a) Re-audit 2 lần/năm. (b) QC pre-shipment cho mọi đơn ≥$5,000 — phát hiện sớm lệch chuẩn. (c) Buyer rating + dispute rate được monitor realtime, threshold 5% mở dispute → auto trigger investigation. (d) Buyer có thể request bất kỳ lúc nào audit ngẫu nhiên cho NCC mình đang làm việc, chi phí chia sẻ. (e) CSR random sample QC độc lập 5% đơn shipped để cross-check rating của buyer.",
      },
      {
        q: "Pass rate 32% có thấp quá không, có làm khó NCC tốt?",
        a: "Pass rate 32% là KPI cốt lõi của hệ thống, không phải bug. Nếu chúng tôi pass 70-80% như Alibaba global, badge 'Verified' mất ý nghĩa. NCC tốt thực sự pass dễ — số NCC bị reject chủ yếu là broker, shell company, NCC chưa đủ trưởng thành cho B2B xuất khẩu (chưa có export license, không có ISO, fraud audit lịch sử). NCC bị reject lần đầu có thể re-apply sau 6 tháng nếu khắc phục được điểm fail.",
      },
      {
        q: "Audit có đảm bảo 100% không bao giờ có rủi ro?",
        a: "Không — không có hệ thống nào đảm bảo 0% rủi ro. Audit của chúng tôi giảm rủi ro xuống ~3-5% (so với 35-45% của Alibaba global theo Allianz Trade 2024). Còn lại được bảo vệ bởi tầng 2 (Bảo đảm Giao dịch (tài khoản trung gian) refund) và tầng 3 (Marine Insurance Bảo Việt/PVI cho rủi ro shipping). Triết lý CSR: defense-in-depth, không bao giờ dựa vào một lớp bảo vệ duy nhất.",
      },
      {
        q: "Tôi muốn audit độc lập một NCC ngoài hệ thống CSR — có làm được không?",
        a: "Có. CSR cung cấp 'Standalone Factory Audit' service cho buyer doanh nghiệp lớn muốn audit NCC mình tự tìm — chi phí $2,800-5,500 tuỳ ngành và độ sâu, deliverable trong 14-21 ngày, full report 80-120 trang ký số. Service này đặc biệt phù hợp khi buyer đã có shortlist 5-10 NCC từ Canton Fair và cần lọc trước khi sign HĐ. Liên hệ audit@cybersilkroads.com.",
      },
    ],
    related: [
      { label: "Mạng lưới kết nối hiệp hội", href: "/info/network" },
      { label: "Bảo đảm Giao dịch (tài khoản trung gian)", href: "/info/trade-assurance" },
      { label: "Đăng ký nhà máy CSR", href: "/sell-on-csr" },
      { label: "Theo dõi đơn realtime", href: "/info/order-tracking" },
    ],
    primaryCta: { label: "Tìm sản phẩm từ NCC đã pass audit", href: "/products" },
  },
  "industry-news": {
    title: "Tin tức ngành sourcing",
    intro: "Cập nhật xu hướng giá cả, sản phẩm mới, hội chợ.",
    paragraphs: [
      "Mỗi tuần, đội nội dung Cybersilkroads xuất bản 8-12 bài về xu hướng giá nguyên liệu, sản phẩm mới ra mắt, sự kiện hội chợ, thay đổi chính sách thuế.",
      "Đăng ký Cảnh báo Thương mại để nhận newsletter hàng tuần qua email và Zalo OA. Đã có 12,000+ buyer Việt Nam đăng ký.",
    ],
    related: [{ label: "Đăng ký Cảnh báo Thương mại", href: "/trade-alert" }],
  },
  "contact": {
    title: "Liên hệ Cybersilkroads",
    intro: "Hà Nội · Quảng Châu · Online 24/7. Chọn kênh phù hợp để được phản hồi nhanh nhất.",
    icon: "📞",
    category: "LIÊN HỆ",
    quickFacts: [
      { label: "Văn phòng", value: "2 (HN + QC)" },
      { label: "Hỗ trợ online", value: "24/7" },
      { label: "Phản hồi email", value: "<6 giờ" },
      { label: "Phản hồi chat", value: "<5 phút" },
    ],
    sectionTitles: [
      "🇻🇳 Văn phòng Hà Nội",
      "🇨🇳 Văn phòng Quảng Châu",
      "💬 Hỗ trợ online 24/7",
    ],
    paragraphs: [
      "Tầng 12, Tòa nhà Cybersilkroads, 26 Phạm Hùng, Cầu Giấy, Hà Nội. Tel: +84 24 1234 5678. Email: hanoi@cybersilkroads.com. Giờ làm việc: 8h00-18h00 thứ 2 - thứ 7. Đội Hà Nội phụ trách: tư vấn buyer Việt Nam, after-sales, tranh chấp, chứng từ hải quan VN. Tất cả nói tiếng Việt thuần. Có khu trưng bày sample miễn phí cho buyer ghé thăm.",
      "26/F, Tianhe Plaza, Tianhe District, Guangzhou, China. Tel: +86 20 1234 5678. WeChat: cybersilkroads_qc. Email: guangzhou@cybersilkroads.com. Đội Quảng Châu phụ trách: audit nhà máy, kiểm hàng on-site, sourcing mới, đối tác NCC. Có 8 auditor full-time đi 30+ thành phố Trung Quốc. Buyer Việt Nam có thể yêu cầu video call trực tiếp với đội QC tại nhà máy.",
      "Hỗ trợ tức thì qua nhiều kênh: Email support@cybersilkroads.com (phản hồi <6 giờ), Live chat trên website (5 phút), Zalo OA: Cybersilkroads (chat tiếng Việt 24/7), Facebook Messenger: fb.com/cybersilkroads. Đội support 12 người chia 3 ca, đảm bảo có người phản hồi cả ngoài giờ hành chính, kể cả ngày nghỉ lễ.",
    ],
    checklist: [
      "Sales / Tư vấn sourcing: sales@cybersilkroads.com",
      "Bảo đảm Giao dịch / Tranh chấp: dispute@cybersilkroads.com",
      "Tuyển dụng: hr@cybersilkroads.com",
      "Báo chí / PR: pr@cybersilkroads.com",
      "DPO bảo mật: privacy@cybersilkroads.com",
    ],
    related: [
      { label: "Tuyển dụng", href: "/info/careers" },
      { label: "Mạng lưới kết nối hiệp hội", href: "/info/network" },
      { label: "Trung tâm trợ giúp", href: "/help" },
    ],
    primaryCta: { label: "Gửi RFQ ngay", href: "/buying-request" },
  },
  "shipping-policy": {
    title: "Chính sách vận chuyển — Cybersilkroads (CSR)",
    intro:
      "Vận chuyển hàng hoá B2B từ Trung Quốc về Việt Nam tuân thủ Incoterms 2020 với 4 phương thức chính: EXW, FOB, CIF, DDP. Cybersilkroads vận hành với 2 đối tác logistics chiến lược (Sinotrans + Vinatrans) và 5 cảng đích Việt Nam, đảm bảo thời gian giao tối ưu cho mọi quy mô đơn hàng.",
    icon: "🚚",
    category: "VẬN CHUYỂN",
    quickFacts: [
      { label: "Incoterms", value: "2020" },
      { label: "Phương thức", value: "EXW · FOB · CIF · DDP" },
      { label: "Cảng đích VN", value: "5 cảng + 1 đường bộ" },
      { label: "Thời gian giao DDP", value: "5-22 ngày" },
      { label: "Đối tác logistics", value: "Sinotrans + Vinatrans" },
      { label: "Bảo hiểm", value: "0.5% giá trị hàng" },
      { label: "Insurance carrier", value: "Bảo Việt + PVI" },
      { label: "Hỗ trợ tracking", value: "Realtime API" },
    ],
    sectionTitles: [
      "1. Incoterms 2020 — 4 phương thức tại CSR",
      "2. So sánh chi tiết EXW · FOB · CIF · DDP",
      "3. Mạng lưới cảng đích Việt Nam",
      "4. Đường bộ qua cửa khẩu Hữu Nghị (Lạng Sơn)",
      "5. Thời gian giao chi tiết theo route",
      "6. Bảo hiểm hàng hoá & Khiếu nại vận chuyển",
      "7. Thủ tục hải quan Việt Nam",
      "8. Ưu đãi thuế ACFTA + RCEP",
      "9. Tracking realtime & Notification",
      "10. Trường hợp đặc biệt — Hàng nguy hiểm, oversize, fragile",
    ],
    paragraphs: [
      "Cybersilkroads áp dụng Incoterms 2020 — chuẩn quốc tế của Phòng Thương mại Quốc tế (ICC) cho hợp đồng mua bán quốc tế. 4 phương thức được hỗ trợ trên nền tảng (theo thứ tự trách nhiệm Buyer giảm dần): (a) EXW (Ex Works) — Buyer tự đến nhà máy lấy hàng, tự lo cước + thuế + thông quan + nội địa. (b) FOB (Free on Board) — Supplier giao hàng lên tàu tại cảng xuất, từ đó Buyer chịu trách nhiệm. (c) CIF (Cost, Insurance & Freight) — Supplier giao hàng tại cảng nhập VN đã gồm cước biển + bảo hiểm; Buyer lo thuế + thông quan + nội địa. (d) DDP (Delivered Duty Paid) — Supplier/CSR giao hàng tận kho Buyer, đã gồm tất cả: cước, thuế, thông quan, nội địa, bảo hiểm. Đây là Incoterm phổ biến nhất tại CSR (78% đơn 2025 dùng DDP).",
      "Bảng so sánh chi tiết để Buyer chọn phù hợp:",
      // Note: paragraphs not directly support tables — but for now just inline as text. Could use 'list' block in future.
      "DDP (khuyến nghị mặc định): CSR lo TOÀN BỘ — gọi xe tải đến nhà máy pickup, vận chuyển ra cảng/biên giới, làm thủ tục xuất khẩu CN, thuê tàu/xe tải qua biên giới, thông quan VN (CSR đứng tên doanh nghiệp khai báo), thanh toán thuế nhập khẩu + VAT 10%, vận chuyển nội địa VN tới kho Buyer. Buyer chỉ ký nhận hàng tại kho. Phù hợp 90% Buyer mới, đặc biệt ai chưa có forwarder riêng. Chi phí: $400-700/CBM tuỳ cảng đích, đã include all-in-one. Thời gian giao: 5-7 ngày qua Lạng Sơn, 18-22 ngày qua đường biển.",
      "CIF (cho Buyer có forwarder + customs broker): Supplier/CSR ship hàng đến cảng VN (Hải Phòng/Cát Lái/Đà Nẵng), bảo hiểm Marine Insurance bao hàng đến cảng. Buyer tự thuê customs broker làm thủ tục thông quan + thanh toán thuế VAT + đưa hàng về kho. Tiết kiệm 15-25% so với DDP nếu đã có hạ tầng logistics nội địa. Chi phí: $250-400/CBM. Thời gian giao: 12-15 ngày tới cảng VN. Phù hợp doanh nghiệp ≥3 năm kinh nghiệm nhập khẩu, có team logistics nội bộ.",
      "FOB (cho Buyer chuyên nghiệp): Supplier/CSR giao hàng đến cảng xuất Trung Quốc (Foshan/Shenzhen/Ningbo/Shanghai), từ đó Buyer tự thuê tàu + bảo hiểm + thông quan VN. Tiết kiệm 30-40% so với DDP nhưng cần năng lực logistics cao. Chi phí: $80-150/CBM phí pickup + handling tại cảng xuất. Thời gian giao: 1-2 ngày tới cảng. Phù hợp với buyer cực kỳ chuyên nghiệp hoặc tổng công ty có sister company tại HK/Singapore xử lý logistics.",
      "EXW (đặc biệt — không khuyến nghị): Buyer tự đến nhà máy lấy hàng, không khuyến nghị cho 99% Buyer Việt Nam. Chỉ phù hợp với: (i) Buyer có văn phòng đại diện tại Trung Quốc, (ii) hàng siêu đặc thù cần Buyer kiểm trực tiếp tại nhà máy, (iii) đơn nhỏ <$1K. CSR vẫn hỗ trợ EXW nhưng Buyer chịu mọi rủi ro vận chuyển từ nhà máy đến cảng/biên giới.",
      "Mạng lưới cảng đích Việt Nam của CSR: (1) Cảng Lạch Huyện (Hải Phòng, Bắc) — port deep-water mới, throughput cao, ít tắc nghẽn, lý tưởng cho Buyer Bắc + Trung. Cước CIF $280/CBM. Thông quan e-customs nhanh 0.5-1 ngày. (2) Cảng Cát Lái (TP HCM, Nam) — port lớn nhất VN, infrastructure mature, cho Buyer Nam. Cước CIF $320/CBM. Thông quan thường tắc nghẽn cao điểm 2-3 ngày. (3) Cảng Đà Nẵng (Trung) — cho Buyer miền Trung + Tây Nguyên. Cước CIF $350/CBM. Thời gian giao tương tự Hải Phòng. (4) Cảng Tiên Sa (Đà Nẵng phụ) — chuyên container đặc biệt. (5) Cảng Cái Mép - Thị Vải (Vũng Tàu) — port nước sâu cho mega-vessel, thường dùng cho đơn ≥40HQ. CSR đang đầu tư mở văn phòng tại Hải Phòng (Q3/2026) để rút ngắn thời gian giao DDP về kho Buyer Bắc xuống 7-9 ngày.",
      "Đường bộ qua cửa khẩu Hữu Nghị (Lạng Sơn) — lựa chọn tốc độ nhất cho Buyer Bắc + đơn nhỏ. Tuyến: Foshan/Quảng Châu/Nam Ninh → Hữu Nghị (TQ) → Hữu Nghị (VN) → Hà Nội → kho Buyer. Thời gian giao 5-7 ngày tổng (vs 18-22 ngày đường biển). Cước cao hơn 30-45%: $130-160/CBM cho LCL, $3,200-3,800 cho FCL 20-40HQ. Phù hợp: hàng hot trend, sample, đơn replenishment khẩn, hàng có vòng đời ngắn. Cửa khẩu Hữu Nghị nâng cấp 02/2026 với hệ thống e-customs mới — thông quan giảm từ 2-3 ngày xuống 0.5-1 ngày. CSR ký MOU với 2 forwarder đường bộ (Sinotrans + Vinatrans) để guarantee năng lực và giá ổn định.",
      "Thời gian giao chi tiết theo route phổ biến (đến kho Buyer Hà Nội): (i) Foshan/Quảng Châu → Hữu Nghị (đường bộ): 5-7 ngày. (ii) Foshan → Lạch Huyện (biển): 12-15 ngày, +1-2 ngày đến HN. (iii) Thượng Hải → Lạch Huyện (biển): 9-12 ngày, +1-2 ngày đến HN. (iv) Đông Quan/Thâm Quyến → Cát Lái (biển): 10-12 ngày, +5-7 ngày đến HN. (v) Air freight Foshan → Hà Nội: 2-4 ngày (cho hàng siêu khẩn, sample, $8-15/kg). Thời gian giao bao gồm: pickup tại nhà máy (1-2 ngày), vận chuyển đến cảng xuất (0.5-1 ngày), tàu/xe tải (5-12 ngày), thông quan VN (0.5-2 ngày), nội địa VN (0.5-2 ngày). Buffer ±2 ngày cho yếu tố thời tiết, tắc cảng, kiểm hoá đột xuất.",
      "Bảo hiểm hàng hoá tự động cho mọi đơn DDP/CIF: (a) Marine Cargo Insurance — phí 0.5% giá trị CIF, do CSR mua qua đối tác Bảo Việt (cho VND) + PVI Insurance (cho USD). (b) Mức bồi thường 110% giá trị hàng trong trường hợp tổn thất toàn bộ (general average + particular average + total loss). (c) Phạm vi bao: hư hỏng do thiên tai, đắm tàu, va chạm, cướp biển, force majeure trong vận chuyển. KHÔNG bao: hư hỏng do chất lượng đóng gói kém của NCC (xử lý qua Bảo đảm Giao dịch), hao mòn tự nhiên, khai báo không trung thực. Khiếu nại bảo hiểm: gửi thông báo trong 7 ngày kể từ ngày nhận hàng + biên bản nghiệm thu + ảnh/video chứng cứ. Thời gian xử lý 14-21 ngày làm việc. CSR hỗ trợ Buyer làm hồ sơ — không tính phí.",
      "Thủ tục hải quan Việt Nam: CSR Logistics đứng tên doanh nghiệp khai báo (theo uỷ quyền của Buyer qua hợp đồng dịch vụ logistics) sử dụng hệ thống VNACCS/VCIS — nền tảng e-customs của Tổng cục Hải quan từ 2014. Quy trình: (1) Khai báo điện tử trong 24h trước khi tàu/xe đến cảng/biên giới. (2) Hải quan tự động phân loại luồng (xanh — thông qua, vàng — kiểm hồ sơ, đỏ — kiểm thực tế). 75% hàng từ NCC verified của CSR đi luồng xanh trong 2 giờ. (3) Thanh toán thuế nhập khẩu + VAT qua chuyển khoản ngân hàng đối tác (Vietcombank). (4) Lấy lệnh giao hàng (D/O), pick up container/lô hàng. (5) Vận chuyển nội địa đến kho Buyer. CSR có 4 customs broker certified Bộ Tài chính làm việc tại 5 cảng — đảm bảo thông quan kể cả ngày nghỉ lễ.",
      "Ưu đãi thuế ưu đãi đặc biệt theo các Hiệp định Thương mại Tự do (FTA): (a) ACFTA (ASEAN-China FTA) — hàng từ Trung Quốc nguyên xứ vào VN được miễn thuế hoặc giảm thuế đáng kể cho 7,000+ HS code. Yêu cầu Form E (CO Form E — Certificate of Origin from China). NCC verified của CSR đều cung cấp Form E miễn phí. Tiết kiệm trung bình 5-15% thuế nhập khẩu. (b) RCEP (Regional Comprehensive Economic Partnership) — hiệu lực 01/2022, ưu đãi cho 92% biểu thuế giữa 15 nước RCEP. Form RCEP. Một số sản phẩm hưởng RCEP có lợi hơn ACFTA (đặc biệt: máy móc, linh kiện điện tử). CSR auto-pick FTA tốt nhất cho mỗi đơn. (c) EVFTA, CPTPP — không áp dụng cho hàng từ TQ về VN, chỉ cho EU/CPTPP members. Cybersilkroads tư vấn HS code chính xác để Buyer hưởng được ưu đãi tối đa.",
      "Tracking realtime + notification multi-channel cho mọi đơn: (i) Dashboard /buyer-center/orders — view tổng quan, filter theo status. (ii) Email — cập nhật theo từng mốc (pickup, xuất xưởng, nhập cảng, thông quan, giao kho). (iii) Zalo OA Cybersilkroads — push notification realtime. (iv) SMS — chỉ cho 2 mốc quan trọng (sắp giao + đã giao). (v) API tracking webhook — cho Buyer enterprise (≥$100K/năm) tích hợp ERP nội bộ. (vi) Vehicle GPS — cho hàng đường bộ qua Lạng Sơn, view location realtime trên bản đồ. Mỗi đơn có 30-80 ảnh + 5-15 video chứng cứ tại các mốc, lưu cloud, Buyer download bất cứ lúc nào.",
      "Trường hợp đặc biệt: (a) Hàng nguy hiểm (Dangerous Goods — IMDG) — pin lithium, hoá chất, sơn, dung môi. CSR yêu cầu MSDS (Material Safety Data Sheet), UN classification, đóng gói chuyên dụng. Phụ phí 30-80% cước thông thường. Chỉ có 5/40 NCC verified hỗ trợ DG. (b) Hàng oversize — kích thước ≥12m hoặc trọng lượng ≥30 tấn/đơn vị. Yêu cầu xe tải đặc biệt (low-bed trailer), giấy phép vận chuyển quá khổ. Phụ phí 50-150%. (c) Hàng fragile (gốm sứ, kính, đá tự nhiên) — đóng gói pallet gỗ + foam đa lớp + corner protector + 'Fragile' label đa ngôn ngữ. Phụ phí 5-10%. (d) Hàng cold chain (yêu cầu nhiệt độ kiểm soát) — refrigerated container 0-25°C, chi phí gấp 2-3x normal. (e) Hàng có giá trị cao ($50K+/lô) — bảo hiểm tăng 1% giá trị, container có GPS lock, hộ tống qua biên giới.",
    ],
    pullQuote: {
      text: "Logistics là cốt lõi của B2B cross-border. Một container chậm 5 ngày có thể làm Buyer mất khách hàng cuối — chúng tôi đầu tư mạnh vào partnership và infrastructure để đảm bảo predictability.",
      author: "Đặng Thanh Hà — Logistics Coordinator Cybersilkroads",
    },
    checklist: [
      "Incoterms 2020 chuẩn ICC — 4 phương thức EXW · FOB · CIF · DDP",
      "5 cảng đích VN: Lạch Huyện · Cát Lái · Đà Nẵng · Tiên Sa · Cái Mép",
      "Đường bộ Lạng Sơn 5-7 ngày — lý tưởng cho hàng hot trend",
      "Marine Insurance auto qua Bảo Việt + PVI — 0.5% giá trị, bồi thường 110%",
      "E-customs VNACCS/VCIS — 75% hàng đi luồng xanh trong 2 giờ",
      "Ưu đãi ACFTA + RCEP — tiết kiệm 5-15% thuế NK",
      "Tracking 5 kênh: Dashboard + Email + Zalo + SMS + API webhook",
      "Hỗ trợ DG · Oversize · Fragile · Cold chain · High-value",
    ],
    faq: [
      {
        q: "DDP có rẻ hơn tự lo logistics không?",
        a: "Tuỳ Buyer. Nếu Buyer có sẵn customs broker + forwarder, DDP đắt hơn 12-18%. Nếu Buyer mới hoặc không có team logistics, DDP rẻ hơn 5-15% so với thuê forwarder ngoài (CSR có giá tốt do volume lớn). 78% Buyer CSR chọn DDP vì sự tiện lợi + transparent pricing.",
      },
      {
        q: "Có thể chia nhỏ đơn hàng để né thuế không?",
        a: "KHÔNG. Hành vi này (under-invoicing, splitting shipment) vi phạm Luật Hải quan VN — phạt 1-3x giá trị thuế trốn + có thể truy cứu hình sự. CSR tuyệt đối không hỗ trợ. Tuy nhiên, có cách hợp pháp: claim ưu đãi ACFTA/RCEP (tiết kiệm 5-15% thuế).",
      },
      {
        q: "Thời gian giao 5-7 ngày qua Lạng Sơn có chính xác không?",
        a: "Có, đó là thời gian giao từ pickup tại nhà máy đến kho Buyer Hà Nội (đã bao gồm thông quan + nội địa). Buyer Đà Nẵng/HCM cộng thêm 1-2 ngày vận chuyển nội địa. Buffer ±2 ngày cho điều kiện thời tiết hoặc kiểm hoá đột xuất.",
      },
      {
        q: "Bảo hiểm có bao hàng hỏng do đóng gói kém không?",
        a: "Không. Bảo hiểm Marine Cargo chỉ bao tổn thất do thiên tai, va chạm, force majeure trong vận chuyển. Hỏng do đóng gói kém = lỗi NCC, xử lý qua Bảo đảm Giao dịch refund 100% (xem /info/payment-protection). Vì vậy CSR audit packaging chuẩn xuất khẩu trước khi đồng ý ship.",
      },
      {
        q: "Tôi có thể tracking đơn hàng qua API không?",
        a: "Có, dành cho Buyer enterprise ≥$100K/năm. Liên hệ sales@cybersilkroads.com để được cấp API key + webhook URL. Documentation tại docs.cybersilkroads.com/api/tracking. Free tier 1000 requests/ngày, Pro $99/tháng cho unlimited.",
      },
      {
        q: "Có dịch vụ vận chuyển hàng siêu khẩn không?",
        a: "Có, Air Freight Express qua đối tác DHL/FedEx. Thời gian giao 2-4 ngày Foshan → Hà Nội. Cước $8-15/kg (đắt gấp 5-7x sea freight). Phù hợp sample, hàng hotfix, hàng giá trị cao kích thước nhỏ. Min charge $100/đơn.",
      },
    ],
    related: [
      { label: "Tính cước DDP", href: "/info/ddp-calculator" },
      { label: "Hướng dẫn nhập khẩu", href: "/info/import-guide" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
      { label: "Theo dõi đơn hàng", href: "/info/order-tracking" },
    ],
    primaryCta: { label: "Tính cước DDP cho đơn của bạn", href: "/info/ddp-calculator" },
  },
  "trade-assurance": {
    title: "Bảo đảm Giao dịch — Bảo vệ thanh toán xuyên biên giới",
    intro:
      "Cơ chế trung gian do Cybersilkroads vận hành cùng Vietcombank, BIDV và Bank of China — buyer thanh toán vào tài khoản trung gian, NCC chỉ nhận tiền sau khi hàng đã giao đúng chất lượng và đặc tả. Mỗi đồng buyer chuyển đi đều có lá chắn pháp lý.",
    icon: "🛡",
    category: "BẢO VỆ GIAO DỊCH",
    quickFacts: [
      { label: "Phí cho buyer", value: "0%" },
      { label: "Phí cho NCC", value: "1.5% / đơn" },
      { label: "Ngân hàng trung gian", value: "VCB · BIDV · BoC" },
      { label: "Inspection period", value: "7 ngày" },
      { label: "Bồi hoàn tối đa", value: "100% giá trị" },
      { label: "Đã bảo vệ 2025", value: "$42M+" },
    ],
    sectionTitles: [
      "Bảo đảm Giao dịch là gì & vì sao buyer Việt Nam cần",
      "Cách hoạt động — 5 bước từ PO đến giải ngân",
      "Phạm vi bảo vệ — được & không được",
      "Quy trình mở tranh chấp (dispute) & bằng chứng",
      "Mức phí, giới hạn & các đối tác ngân hàng",
    ],
    paragraphs: [
      "B2B xuyên biên giới truyền thống có một khoảng trống nguy hiểm: buyer thường phải chuyển 30% đặt cọc trước khi NCC bắt đầu sản xuất, và 70% còn lại trước khi NCC giao B/L. Nếu NCC giao sai spec, sai chất lượng, hoặc tệ nhất là không giao hàng, buyer gần như không có công cụ pháp lý quốc tế nào để lấy lại tiền nhanh chóng — kiện tụng xuyên biên giới mất 12-24 tháng và chi phí luật sư thường vượt giá trị đơn dưới $50K. Bảo đảm Giao dịch giải quyết khoảng trống này: thay vì chuyển trực tiếp cho NCC, buyer chuyển vào tài khoản trung gian do bên thứ ba — hệ thống ngân hàng đối tác của Cybersilkroads — kiểm soát. NCC chỉ thấy được tiền sau khi buyer xác nhận hàng đã nhận đúng. Mô hình này đã trở thành chuẩn mực cho các nền tảng B2B nghiêm túc trên thế giới (Alibaba Bảo đảm Giao dịch, Made-in-China Secure Trade) và Cybersilkroads vận hành phiên bản nội địa hoá cho thị trường Việt Nam — sử dụng ngân hàng Việt Nam cho đầu thanh toán và Bank of China cho đầu giải ngân.",
      "Quy trình 5 bước: (1) Buyer tạo PO trên Cybersilkroads, chọn checkbox 'Bảo vệ bằng Bảo đảm Giao dịch' — phí 0% cho buyer, NCC đã bao gồm 1.5% trong giá list. (2) Buyer chuyển tiền (TT bank wire hoặc ACH) vào tài khoản trung gian tại Vietcombank chi nhánh HCM/HN hoặc BIDV chi nhánh HCM/HN — số tài khoản và mã đơn được sinh ra duy nhất cho từng PO, có IBAN/SWIFT đầy đủ. (3) Cybersilkroads thông báo NCC tiền đã được khoá, NCC bắt đầu sản xuất và giao hàng theo Incoterms thoả thuận; với FOB/CIF, B/L gốc được Cybersilkroads giữ; với DDP, mã tracking được monitor liên tục. (4) Buyer nhận hàng tại cảng VN hoặc kho riêng, có 7 ngày để kiểm tra (inspection period); nếu hàng đạt yêu cầu, buyer ký xác nhận trên dashboard hoặc qua email confirm — Cybersilkroads giải ngân cho NCC qua Bank of China trong vòng 24 giờ làm việc. (5) Nếu trong 7 ngày buyer phát hiện vấn đề — sai spec, sai số lượng, kém chất lượng — buyer mở dispute trên dashboard kèm bằng chứng; tiền tiếp tục bị khoá cho đến khi tranh chấp được giải quyết.",
      "Bảo đảm Giao dịch bảo vệ buyer trong các trường hợp: (a) Hàng giao không đúng đặc tả kỹ thuật trong Hợp đồng/PI — sai size, sai màu, sai chất liệu, sai chứng nhận (CE, FCC, RoHS thiếu hoặc giả). (b) Số lượng giao thiếu so với PO (ví dụ PO 1000 cái, giao 850 cái mà không thông báo). (c) Chất lượng kém theo tiêu chuẩn AQL 2.5 — quá nhiều lỗi major/minor so với mẫu pre-production đã ký. (d) NCC default — không giao hàng đúng thời hạn (tolerance 14 ngày), không phản hồi sau khi đã thu tiền. (e) Hàng hư hỏng do đóng gói sai standards (carton ướt, rách, không có pallet đúng quy cách). Bảo đảm Giao dịch KHÔNG bảo vệ: (a) Hàng hư hỏng do shipping line — đó là phạm vi của Marine Insurance qua Bảo Việt/PVI mà buyer phải mua riêng. (b) Buyer đổi ý sau khi đã ký off mẫu — sample đã được approved bằng văn bản tay/email coi như binding. (c) Buyer không thực hiện inspection trong 7 ngày, hệ thống tự động giải ngân theo điều khoản (silence = acceptance). (d) Force majeure — bão lũ, đại dịch, chiến tranh — đã có điều khoản riêng trong Điều khoản dịch vụ.",
      "Khi có vấn đề, buyer mở dispute trên CSR Dashboard → Orders → Open Dispute. Hệ thống yêu cầu upload tối thiểu: (a) Hình ảnh sản phẩm thực tế tại kho (không phải tại cảng — phải sau khi đã unload), tối thiểu 8 ảnh ở các góc và close-up lỗi. (b) Video unboxing 60-180 giây cho thấy điều kiện carton ngoài + sản phẩm bên trong. (c) Bảng so sánh chi tiết spec PO vs spec thực tế. (d) Khuyến nghị mạnh: báo cáo inspection của bên thứ ba (SGS, Bureau Veritas, TÜV Rheinland) — chi phí $200-450 cho 1 container, được coi là evidence cao nhất trong dispute. Cybersilkroads Dispute Officer sẽ review trong 3 ngày làm việc, tổ chức call 3 phương buyer-NCC-CSR (tiếng Việt + tiếng Trung dịch song song), tìm phương án thoả thuận: refund partial, replacement free, hoặc credit cho đơn sau. Nếu không đạt thoả thuận trong 14 ngày, CSR ra phán quyết dựa trên bằng chứng và điều khoản — buyer được hoàn tiền (full hoặc partial) trong 5-10 ngày làm việc; NCC bị trừ rating, đóng băng 10% reserved fund, và nếu tái phạm có thể bị huỷ tier Verified.",
      "Mức phí và giới hạn: Buyer 0% phí — Cybersilkroads không thu thêm. NCC trả 1.5% giá trị đơn, đã bao gồm trong giá list công khai (không phải phí ẩn). Giới hạn mỗi đơn: $1.000.000 cho tier Free và Pro buyer, $5.000.000 cho tier Enterprise (đã KYC doanh nghiệp đầy đủ). Giới hạn theo năm: $5M/buyer/năm cho Free + Pro, $50M/năm cho Enterprise — vượt phải mở contract riêng và tài khoản trung gian qua Bank of China branch Quảng Châu trực tiếp. Đối tác ngân hàng đầu Việt Nam: Vietcombank (chi nhánh HCM Sở giao dịch + HN Trần Quang Khải), BIDV (HCM Quận 1 + HN Hai Bà Trưng); đầu Trung Quốc: Bank of China chi nhánh Quảng Châu Tianhe và Thâm Quyến Futian. Số liệu 2025: Cybersilkroads đã bảo vệ $42.7M giá trị đơn cho 1,840 buyer Việt Nam, tỷ lệ dispute 2.3%, thời gian giải quyết trung bình 11 ngày làm việc, tỷ lệ buyer được hoàn tiền (full hoặc partial) 87% trong các vụ có evidence đầy đủ.",
    ],
    pullQuote: {
      text: "Mỗi đồng buyer Việt Nam thanh toán đều được bảo vệ bằng pháp lý ngân hàng — đó là điều kiện tiên quyết để cây cầu thương mại xuyên biên giới đứng vững, không phải là tính năng cộng thêm.",
      author: "Đội Bảo đảm Giao dịch Cybersilkroads",
    },
    checklist: [
      "🏦 Trung gian qua Vietcombank · BIDV · Bank of China",
      "💸 Buyer trả 0% phí — NCC trả 1.5% đã bao gồm trong giá",
      "🛡 Bảo vệ tối đa 100% giá trị đơn",
      "🔍 Inspection period 7 ngày sau khi nhận hàng",
      "⚖ Dispute mediation 3 ngày, giải quyết trung bình 11 ngày",
      "📊 Đã bảo vệ $42M+ giá trị đơn trong 2025",
    ],
    faq: [
      {
        q: "Mọi đơn trên Cybersilkroads đều phải dùng Bảo đảm Giao dịch?",
        a: "Không bắt buộc — buyer có thể tắt Bảo đảm Giao dịch nếu đã có quan hệ lâu năm với NCC và muốn TT trực tiếp. Nhưng chúng tôi khuyến nghị mạnh sử dụng cho đơn đầu tiên với mọi NCC mới, hoặc đơn có giá trị > $5,000. Khoảng 78% đơn trên CSR đang dùng Bảo đảm Giao dịch.",
      },
      {
        q: "Nếu buyer và NCC tự thoả thuận thanh toán ngoài CSR, có được bảo vệ không?",
        a: "Không. Bảo đảm Giao dịch chỉ áp dụng cho thanh toán đi qua tài khoản trung gian của CSR. Mọi giao dịch P2P giữa buyer và NCC bên ngoài hệ thống đều nằm ngoài phạm vi bảo vệ. Đây cũng là lý do CSR khuyến cáo không chuyển khoản cá nhân — luôn chuyển vào account mã đơn riêng.",
      },
      {
        q: "Báo cáo inspection bên thứ ba (SGS, Bureau Veritas) có bắt buộc khi mở dispute không?",
        a: "Không bắt buộc cho đơn dưới $20,000 — ảnh và video chi tiết là đủ. Với đơn trên $20,000 hoặc tranh chấp phức tạp về AQL/chất lượng, chúng tôi khuyến nghị mạnh có báo cáo bên thứ ba (chi phí $200-450/container) — evidence này có trọng số cao nhất trong phán quyết của Dispute Officer.",
      },
      {
        q: "Bảo đảm Giao dịch có cover phí logistics không?",
        a: "Không trực tiếp. Bảo đảm Giao dịch chỉ cover giá trị hàng (FOB hoặc CIF value). Phí shipping, customs duty, và các phí tại cảng VN không nằm tại tài khoản trung gian. Tuy nhiên, nếu đơn được phán quyết hoàn tiền do lỗi hoàn toàn của NCC, NCC sẽ phải bồi thường thêm freight loss theo điều khoản — phần này thương lượng case-by-case.",
      },
      {
        q: "Nếu NCC phá sản hoặc đóng cửa trong khi đang sản xuất, buyer được gì?",
        a: "Tiền vẫn nằm trong tài khoản trung gian chứ không phải ở NCC. CSR sẽ refund 100% cho buyer trong vòng 7 ngày làm việc (chỉ cần xác nhận pháp lý NCC đã ngừng hoạt động qua Tianyancha hoặc thông báo chính thức). Đây là một trong những lợi ích lớn nhất của tài khoản trung gian so với TT trực tiếp — tiền không bao giờ thuộc tài sản kê biên của NCC.",
      },
    ],
    related: [
      { label: "Quy trình kiểm định nhà máy", href: "/info/audit-process" },
      { label: "Theo dõi đơn realtime", href: "/info/order-tracking" },
      { label: "Điều khoản dịch vụ", href: "/info/terms-of-service" },
      { label: "Chính sách vận chuyển", href: "/info/shipping-policy" },
    ],
    primaryCta: { label: "Tạo đơn được bảo vệ Bảo đảm Giao dịch", href: "/buying-request" },
  },
  "market-reports": {
    title: "Báo cáo thị trường — Market Intelligence cho buyer Việt Nam",
    intro:
      "48 báo cáo phát hành mỗi năm, 12 ngành cover đầy đủ — từ giá nhà máy Quảng Đông, biến động tỷ giá CNY/VND, chỉ số nguyên liệu Shanghai Futures cho đến chính sách thuế mới của Tổng cục Hải quan. Buyer doanh nghiệp Việt Nam có dữ liệu để đàm phán ngang hàng với nhà máy Trung Quốc, không còn phải đoán mò giá.",
    icon: "📊",
    category: "TÀI LIỆU NGHIÊN CỨU",
    quickFacts: [
      { label: "Báo cáo / năm", value: "48" },
      { label: "Ngành cover", value: "12" },
      { label: "Subscriber", value: "8,400+" },
      { label: "Pro", value: "$290 / quý" },
      { label: "Enterprise", value: "$980 / năm" },
      { label: "Cập nhật", value: "Thứ 5 hàng tuần" },
    ],
    sectionTitles: [
      "Vì sao buyer Việt Nam cần Market Intelligence",
      "4 cấp độ báo cáo — từ Weekly Pulse đến Annual Industry Report",
      "12 ngành cover & dữ liệu đặc thù Trung Quốc - Việt Nam",
      "Phương pháp thu thập, nguồn dữ liệu & validation",
      "Các gói subscription & cách truy cập",
    ],
    paragraphs: [
      "Sourcing B2B từ Trung Quốc lâu nay là cuộc chơi mà NCC nắm hết thông tin và buyer Việt Nam đi theo. Nhà máy Foshan biết chính xác giá thép HRC hôm nay là 3,820 NDT/tấn (giảm 4.2% so với tháng trước), biết tỷ giá CNY/VND đang ở 3,485 (mạnh hơn 0.8% trong tuần), biết chính sách hoàn thuế GTGT 13% sắp giảm xuống 9% cho ngành furniture export — và tất cả những thông tin này được dùng để định giá cho buyer Việt Nam. Trong khi đó, buyer chỉ thấy con số cuối cùng nhà máy báo, không có cách nào kiểm chứng. Cybersilkroads phát hành Market Intelligence Reports để cân bằng lại sân chơi: tổng hợp dữ liệu từ 1,200+ NCC verified trên hệ thống (anonymized & aggregated), từ Shanghai Futures Exchange (SHFE), London Metal Exchange (LME), từ PBOC, từ Tổng cục Hải quan VN, từ Bộ Thương mại Trung Quốc (MOFCOM) — biên tập thành báo cáo tiếng Việt thuần, dễ hiểu, không jargon, kèm chart và actionable insights cụ thể cho buyer.",
      "4 cấp độ báo cáo theo nhịp khác nhau: (a) Weekly Pulse — bản tin mỗi sáng thứ 5, 4-6 trang, miễn phí cho mọi member CSR; cập nhật biến động giá tuần qua, tin tức ngành nóng, alerts về thuế hoặc chính sách mới. (b) Monthly Deep Dive — phân tích sâu một ngành cụ thể, 20-30 trang, phát hành thứ 5 đầu tháng; ví dụ 'Furniture & Sanitary Q3 2026 — chuyển dịch giá MDF E1 và xu hướng mạ nano cho thiết bị vệ sinh', tier Pro. (c) Quarterly Market Outlook — báo cáo chiến lược 60+ trang, phát hành tuần đầu mỗi quý; bao gồm forecast giá nguyên liệu 6 tháng tới, dự báo tỷ giá theo kịch bản (base/bear/bull), phân tích chính sách Trung Quốc và Việt Nam có khả năng tác động đến import; tier Pro. (d) Annual Industry Report — báo cáo thường niên 120+ trang phát hành tuần thứ 2 tháng 1, full data set cho 1 ngành kèm bản đồ cluster nhà máy ở Quảng Đông/Chiết Giang/Phúc Kiến, danh sách top 50 NCC theo doanh số xuất khẩu sang VN, lịch trade fair khu vực; tier Enterprise.",
      "12 ngành cover (mỗi ngành 8-12 báo cáo/năm): (1) Nội thất gỗ — đặc biệt tập trung Foshan Lecong, Shunde và Đông Quan. (2) Sanitary & gạch men — Foshan Nanzhuang, Triều Châu cluster. (3) Đồ điện gia dụng — Mỹ Đích Trung Sơn, Cự Hà. (4) Vật liệu xây dựng — đá tự nhiên Phúc Kiến, kính Tần Hoàng Đảo. (5) Cơ khí & dụng cụ — Vĩnh Khang, Ninh Ba. (6) Đèn chiếu sáng — Cổ Trấn (Trung Sơn). (7) Đồ nhựa — Đài Châu, Du Diếm. (8) Hoá mỹ phẩm — Quảng Châu cosmetic cluster. (9) Phụ tùng ô tô — Trung Sơn, Đông Quan. (10) Đồ chơi & văn phòng phẩm — Sán Đầu, Nghĩa Ô. (11) Bao bì giấy & nhựa — Đông Quan, Hợp Phì. (12) Điện tử tiêu dùng — Thâm Quyến Hoa Cường Bắc, Đông Quan. Mỗi báo cáo ngành đều có phần riêng cho thị trường Việt Nam: top SKU đang bán chạy, dealer chủ lực, biến động nhập khẩu theo cảng (Lạch Huyện vs Cát Lái vs đường bộ Hữu Nghị), và alerts thuế hải quan VN theo HS code chuyên ngành.",
      "Phương pháp luận chúng tôi áp dụng triple-source validation: mọi số liệu critical phải có ít nhất 3 nguồn độc lập đồng thuận. Dữ liệu giá nhà máy: tổng hợp từ 1,200+ NCC verified trên CSR (anonymized — không lộ danh tính từng NCC, chỉ aggregate) + crawl giá public từ 1688.com và Made-in-China.com + báo cáo cluster của các Hiệp hội ngành Trung Quốc. Tỷ giá: Vietcombank, BIDV, ACB cho VND; PBOC fix rate cho CNY; Reuters spot cho USD. Nguyên liệu: SHFE Shanghai Futures (thép, cao su, đồng, nhôm, kẽm), LME London Metal, ICE Brent crude. Chính sách: Tổng cục Hải quan Việt Nam, GACC (China General Administration of Customs), MOFCOM, Bộ Tài chính VN, State Taxation Administration China. Mỗi báo cáo có appendix công khai phương pháp luận đầy đủ — buyer có thể kiểm chứng độc lập. Đội ngũ biên tập: 4 analyst tại Hà Nội (chuyên ngành kinh tế quốc tế FTU, NEU) + 2 analyst tại Quảng Châu (background tại Tencent Industry Research và CITIC) + 1 chief economist từng làm tại Vietcombank Securities.",
      "Subscription tiers: (a) Free — Weekly Pulse hàng tuần + 1 báo cáo Monthly Deep Dive mỗi quý (ngành buyer chọn), không giới hạn user trong tổ chức, đăng nhập business account là đủ. (b) Pro $290/quý hoặc $980/năm — full Weekly Pulse + tất cả Monthly Deep Dive cho 3 ngành buyer chọn + Quarterly Market Outlook cho 3 ngành đó + dashboard analytics tương tác (filter giá theo cluster, period, supplier tier), tối đa 5 user trong tổ chức. (c) Enterprise $980/năm/user hoặc $3,800/năm/team (10 user) — full library 12 ngành, Annual Industry Reports đầy đủ, custom report request 2 lần/năm (analyst làm theo brief riêng cho doanh nghiệp), 1-on-1 analyst call hàng tháng (60 phút, qua Google Meet với chief analyst), API access vào raw data set, white-label cho doanh nghiệp tư vấn. Truy cập: docs.cybersilkroads.com/reports — đăng nhập business account bằng email công ty (không nhận email cá nhân @gmail.com cho tier Pro/Enterprise).",
    ],
    pullQuote: {
      text: "Quyết định sourcing $200,000 không thể dựa vào cảm tính hay chỉ một báo giá đơn lẻ. Chúng tôi cung cấp dữ liệu đa nguồn để buyer Việt Nam đàm phán ngang hàng với nhà máy Trung Quốc — đó là cốt lõi của thương mại công bằng.",
      author: "Chief Economist, Cybersilkroads Research",
    },
    checklist: [
      "📅 48 báo cáo phát hành mỗi năm — Weekly · Monthly · Quarterly · Annual",
      "🏭 Cover 12 ngành chủ lực sourcing TQ-VN với cluster mapping chi tiết",
      "👥 8,400+ subscriber doanh nghiệp Việt Nam đang theo dõi",
      "✅ Triple-source validation — 3 nguồn độc lập cho mọi số liệu critical",
      "📞 1-on-1 analyst call hàng tháng cho tier Enterprise",
      "📱 Dashboard PDF + tương tác online + API access (Enterprise)",
    ],
    faq: [
      {
        q: "Báo cáo có dịch tiếng Anh hoặc tiếng Trung không?",
        a: "Tier Free và Pro chỉ có tiếng Việt. Tier Enterprise có thêm bản tiếng Anh (Quarterly và Annual) — phù hợp cho doanh nghiệp Việt có chi nhánh ở Sing/Mỹ hoặc đối tác joint-venture nước ngoài. Tiếng Trung chưa có (sẽ có Q3 2026).",
      },
      {
        q: "Tôi cần custom report cho ngành/SKU rất riêng — có làm được không?",
        a: "Tier Enterprise được 2 custom report/năm (mỗi report 30-50 trang, làm trong 4-6 tuần). Brief: buyer mô tả mục tiêu (ví dụ 'phân tích 20 NCC khoá kéo Quảng Đông + giá HSP YKK so với khoá Trung Quốc'), CSR Research team báo lại scope và proposal trong 3 ngày. Ngoài quota, $4,500-12,000 mỗi report tuỳ độ phức tạp.",
      },
      {
        q: "Dữ liệu có cập nhật realtime không?",
        a: "Báo cáo PDF cập nhật theo nhịp phát hành (tuần/tháng/quý). Dashboard online tier Pro/Enterprise có một số chỉ số cập nhật hàng ngày: tỷ giá CNY/VND/USD, giá thép HRC SHFE, giá đồng LME. Realtime feed (WebSocket) chỉ có cho tier Enterprise + add-on $200/tháng — phù hợp doanh nghiệp lớn cần monitor giá nguyên liệu để hedging.",
      },
      {
        q: "Trial gói Pro có không?",
        a: "Có. Dùng thử miễn phí 14 ngày cho gói Pro — full quyền truy cập 3 ngành buyer chọn, không cần thẻ tín dụng, hết trial tự động chuyển về Free (không tự động charge). Đăng ký tại docs.cybersilkroads.com/trial.",
      },
      {
        q: "Báo cáo có chia sẻ giá NCC cụ thể (theo tên) không?",
        a: "Không, vì lý do bảo mật và competition. Chúng tôi chỉ aggregate (ví dụ 'top 10 NCC Foshan furniture có giá MDF trung bình $X/CBM, range $Y-Z'). Nếu buyer muốn quote cụ thể từ NCC nào đó, vui lòng dùng RFQ trên Cybersilkroads — đó là kênh chính thức và minh bạch.",
      },
      {
        q: "Tôi đã subscribe rồi nhưng không nhận được Weekly Pulse?",
        a: "Email từ research@cybersilkroads.com có thể vào Spam/Promotions. Khuyến nghị whitelist domain. Nếu vẫn không nhận, đăng nhập docs.cybersilkroads.com/reports — mọi báo cáo đều xem được trên web kể cả khi email không tới. Liên hệ support@cybersilkroads.com nếu issue lặp lại.",
      },
    ],
    related: [
      { label: "Tin tức ngành (blog)", href: "/info/industry-news" },
      { label: "Đăng ký Cảnh báo Thương mại", href: "/trade-alert" },
      { label: "Mạng lưới kết nối hiệp hội", href: "/info/network" },
      { label: "Liên hệ Research team", href: "/info/contact" },
    ],
    primaryCta: { label: "Xem mẫu Weekly Pulse miễn phí", href: "/info/industry-news" },
  },
  "api-integration": {
    title: "Tích hợp API — REST API & Webhook cho doanh nghiệp",
    intro:
      "86 REST endpoints + 24 webhook event + 4 SDK chính thức (Node · Python · PHP · Go) để doanh nghiệp tích hợp Cybersilkroads với ERP nội bộ (SAP, Oracle, Misa, Bravo, FAST), PIM, hoặc hệ thống quản lý 3PL. Đẩy SKU tự động, đồng bộ inventory, pull đơn về ERP, push tracking lên CSR — tất cả không nhập tay.",
    icon: "⚙️",
    category: "LẬP TRÌNH VIÊN · TÍCH HỢP",
    quickFacts: [
      { label: "API version", value: "v2.1 (REST)" },
      { label: "Endpoints", value: "86" },
      { label: "Webhook events", value: "24" },
      { label: "SDK chính thức", value: "Node · Py · PHP · Go" },
      { label: "Rate free", value: "1,000 calls / ngày" },
      { label: "Uptime SLA", value: "99.95% (Ent)" },
    ],
    sectionTitles: [
      "Vì sao tích hợp API — bài toán doanh nghiệp",
      "Authentication, API key & bảo mật",
      "Endpoints chính & resource model",
      "Webhook & event-driven sync",
      "Sandbox, SDK chính thức & code examples",
      "Pricing tier & enterprise contract",
    ],
    paragraphs: [
      "Doanh nghiệp Việt Nam có quy mô từ 50 SKU trở lên đều đã có một hệ thống nội bộ: ERP (SAP B1, Oracle NetSuite, Misa, Bravo, FAST, AccNet), PIM (Akeneo, in-house), WMS cho kho riêng, hoặc TMS cho 3PL. Khi onboarding lên Cybersilkroads, vấn đề là làm sao tránh nhập tay — tránh trường hợp đơn về CSR rồi phải copy-paste sang ERP để issue VAT invoice (NĐ 123/2020 yêu cầu hoá đơn điện tử trong vòng 24h), tránh inventory bị lệch giữa kho thực và listing trên CSR, tránh tracking phải update tay từ 3PL về buyer dashboard. Tích hợp API giải quyết: tự động đẩy SKU mới từ PIM lên CSR khi NCC release, đồng bộ inventory realtime giữa kho NCC và listing (mỗi 5-15 phút), tự động pull đơn về ERP để trigger workflow (issue PO nội bộ → sản xuất → invoice → kế toán), push tracking từ TMS/3PL về CSR cho buyer xem trên dashboard không phải hỏi NCC. Trung bình 1 NCC verified xử lý 80-200 đơn/tháng — tự động hoá tiết kiệm 40-60 giờ làm việc/tháng cho admin team.",
      "Authentication: OAuth 2.0 cho user-facing app (3rd party developer build app trên CSR Marketplace) + API key Bearer token cho server-to-server (use case chính của ERP integration). Tạo API key tại Account Settings → Developer → API Keys: chọn scope (read-only / write / admin), IP whitelist (khuyến nghị mạnh — chỉ cho phép IP của server ERP), expiration (90/180/365 ngày — khuyến nghị 90, rotate đều đặn). Mỗi key có audit log đầy đủ: timestamp, endpoint, IP source, response code, response time — xem được tại Developer → Audit Log với retention 90 ngày (Free), 1 năm (Pro), 3 năm (Enterprise). Bảo mật bổ sung: HMAC SHA-256 signature cho webhook (verify request đúng từ CSR), TLS 1.3 only, certificate pinning cho mobile SDK, mTLS optional cho Enterprise. Compromise key? Một click revoke trong dashboard, key cũ chết trong < 60 giây trên toàn cluster.",
      "86 endpoints chia theo 9 resource group: (a) /products — GET list/detail, POST tạo mới, PATCH update, DELETE archive; bulk upload qua CSV (max 10,000 SKU/request), bulk update qua JSON array. (b) /orders — GET list theo filter (date range, status, buyer), GET detail từng đơn, PATCH status (sản xuất → đóng gói → giao kho → ship), POST tracking number + carrier. (c) /rfq — GET inbox RFQ chờ báo giá, POST quote response (kèm price, leadtime, MOQ, attachment file PDF). (d) /buyers — GET CRM contacts (chỉ buyer của NCC mình, không cross-tenant), GET buyer profile (rating, history). (e) /messages — GET threads, POST new message (hỗ trợ attachment ảnh/PDF), POST seen marker. (f) /audit-reports — GET danh sách báo cáo audit của factory mình (PDF download URL, signed expiry 24h). (g) /trade-assurance — GET trạng thái trung gian của đơn (funded / shipped / inspecting / released / disputed), POST upload bằng chứng cho dispute. (h) /catalog — GET danh mục, brands, certifications. (i) /metrics — GET conversion rate, RFQ-to-quote-to-order funnel, top SKU theo doanh số (chỉ data của NCC mình). Full reference + Postman collection + OpenAPI 3.1 spec tại docs.cybersilkroads.com/api.",
      "Webhook là kênh event-driven thay cho polling — server CSR chủ động POST đến endpoint của doanh nghiệp khi có sự kiện. 24 event hỗ trợ: order.created, order.paid (TA Đã nạp tài khoản trung gian), order.shipped, order.delivered, order.disputed, order.completed; rfq.received, rfq.quoted, rfq.expired; message.new, message.urgent (flagged AI); audit.scheduled, audit.passed, audit.failed; ta.escrow.funded, ta.escrow.released, ta.dispute.opened, ta.refund.processed; product.published, product.suspended, product.low_stock; price.changed, certification.expired; buyer.followed, buyer.review_posted. Webhook config tại Developer → Webhooks: URL endpoint của doanh nghiệp, list event subscribe, secret key cho HMAC verify. Retry policy: nếu endpoint trả non-2xx, CSR retry với exponential backoff 1 phút, 2, 4, 8, 16, 32 — tổng 6 lần trong khoảng 1 giờ; sau đó vào dead letter queue, doanh nghiệp xem trong dashboard và replay tay. Verify request bằng HMAC: header X-CSR-Signature = HMAC_SHA256(body, secret_key) — code mẫu trong SDK của 4 ngôn ngữ.",
      "Sandbox environment (api-sandbox.cybersilkroads.com) hoàn toàn tách biệt production: data riêng, không charge thật khi test Bảo đảm Giao dịch, có sẵn 50 NCC mock + 200 buyer mock + 1,000 đơn lịch sử để test. Free unlimited sandbox calls — không tính vào rate limit production. SDK chính thức được maintain bởi đội Cybersilkroads Engineering, version đồng bộ với API: (a) Node.js — `npm install @csr/sdk` — TypeScript types đầy đủ, async/await native, retry built-in. (b) Python — `pip install csr-sdk` — sync và async client (httpx), Pydantic v2 models. (c) PHP — `composer require csr/sdk` — PSR-18 HTTP client, hỗ trợ Laravel facade và service provider. (d) Go — `go get github.com/cybersilkroads/go-sdk` — context-aware, struct types generate từ OpenAPI spec. Code examples cho 12 use case phổ biến nhất (bulk upload SKU, đồng bộ inventory, listen webhook order, response RFQ tự động bằng template, ...) tại docs.cybersilkroads.com/cookbook. Community SDK (do bên thứ ba làm): Ruby, Java, .NET — không official support nhưng có repo trên GitHub.",
      "4 tier pricing: (a) Free — 1,000 calls/ngày, rate 60 req/phút, 5 webhook endpoints, sandbox unlimited; phù hợp NCC nhỏ, dev/test, hoặc startup chưa scale. (b) Pro $99/tháng — 50,000 calls/ngày, rate 600 req/phút, 50 webhook endpoints, priority support qua email (response 24h), audit log retention 1 năm. (c) Enterprise $1,200/tháng — không giới hạn calls (fair use 1M calls/ngày base, contact nếu cần thêm), rate 6,000 req/phút, 500 webhook endpoints, SLA uptime 99.95% với credit refund khi miss, dedicated CSM (Customer Success Manager), audit log 3 năm, mTLS option, SSO SAML, dedicated cluster trong AWS Singapore (option). (d) Custom Enterprise — cho khách hàng > 5M calls/tháng hoặc cần on-premise sync, white-label API, IP cố định, hợp đồng riêng, NDA. Đối tác tích hợp ERP có sẵn (zero-code connector): Misa SME, Bravo, FAST Accounting, KiotViet, Sapo, Haravan — list mở rộng tháng 6/2026 với SAP B1 và Oracle NetSuite. Liên hệ developer@cybersilkroads.com để được demo session 60 phút và quote contract Enterprise.",
    ],
    pullQuote: {
      text: "API đầu tiên của hệ thống là cánh cổng. API tốt là cây cầu — bền, ổn định, chịu được tải peak và mở lúc 3 giờ sáng cũng như 3 giờ chiều. Cybersilkroads xây cây cầu, không xây cánh cổng.",
      author: "Đội Engineering Cybersilkroads",
    },
    checklist: [
      "🔌 86 REST endpoints + 24 webhook event — bao trùm full lifecycle B2B",
      "📦 4 SDK chính thức: Node.js · Python · PHP · Go (TypeScript types đầy đủ)",
      "🧪 Sandbox tách biệt production — free unlimited test calls",
      "🔐 OAuth 2.0 + API key + HMAC SHA-256 webhook verify + IP whitelist",
      "📊 Rate limit minh bạch theo tier — log đầy đủ trong dashboard",
      "🤝 Connector ERP có sẵn: Misa, Bravo, FAST, KiotViet, Sapo, Haravan",
    ],
    faq: [
      {
        q: "Tôi đang dùng SAP B1 hoặc Oracle NetSuite — có connector sẵn không?",
        a: "SAP B1 và Oracle NetSuite connector đang trong roadmap Q2 2026, hiện chưa có zero-code option. Tuy nhiên Cybersilkroads SDK Node.js/Python/PHP có thể tích hợp tay với SAP DI Server (PHP/.NET) hoặc NetSuite SuiteScript trong 5-10 ngày-người. Tier Enterprise có dedicated solution architect hỗ trợ thiết kế integration miễn phí.",
      },
      {
        q: "Tài liệu API có bằng tiếng Việt không?",
        a: "Có. docs.cybersilkroads.com/api hỗ trợ tiếng Việt và tiếng Anh, switch ở header. Code examples giữ nguyên tiếng Anh (theo convention dev quốc tế), nhưng giải thích, error message reference và best practices đều có bản tiếng Việt do đội Hà Nội biên dịch.",
      },
      {
        q: "Sandbox có data thật không?",
        a: "Không. Sandbox có 50 NCC mock và 200 buyer mock đã được CSR generate sẵn để test mọi flow (RFQ → quote → order → Bảo đảm Giao dịch → shipped → delivered → dispute → refund). Data này không liên quan đến account production. Reset sandbox bất kỳ lúc nào qua API DELETE /sandbox/reset hoặc nút trong dashboard.",
      },
      {
        q: "Webhook fail (server tôi down) thì sao?",
        a: "Cybersilkroads retry 6 lần với exponential backoff (1, 2, 4, 8, 16, 32 phút — tổng ~1 giờ). Sau đó event vào Dead Letter Queue, hiển thị trong Developer → Webhooks → DLQ. Doanh nghiệp xem được payload đầy đủ và replay tay (1 click) hoặc replay batch trong khoảng thời gian. DLQ retention 30 ngày Free / 90 ngày Pro / 365 ngày Enterprise.",
      },
      {
        q: "API có hỗ trợ GraphQL không?",
        a: "Hiện chưa. REST v2.1 là interface chính thức — đầy đủ tính năng, có OpenAPI 3.1 spec, được monitor SLA. GraphQL beta đang được nội bộ test cho /products và /orders, dự kiến public Q3 2026 cho tier Enterprise. Hiện tại nếu cần fetch nhiều resource cùng lúc (ví dụ order + buyer + tracking), dùng endpoint /orders/{id}?expand=buyer,tracking — REST hỗ trợ field expansion.",
      },
      {
        q: "Tôi cần access vào báo cáo Bảo đảm Giao dịch qua API — endpoint nào?",
        a: "GET /trade-assurance/orders/{order_id} trả về full status (funded/shipped/inspecting/released/disputed/refunded), timeline event, tài khoản trung gian info (masked), bằng chứng đã upload nếu có dispute. POST /trade-assurance/disputes/{order_id}/evidence để upload evidence (multipart, max 50MB/file, 10 file/dispute). Webhook ta.dispute.opened và ta.refund.processed cho event-driven workflow. Chi tiết schema tại docs.cybersilkroads.com/api/trade-assurance.",
      },
    ],
    related: [
      { label: "Bảo đảm Giao dịch", href: "/info/trade-assurance" },
      { label: "Theo dõi đơn realtime", href: "/info/order-tracking" },
      { label: "Điều khoản dịch vụ", href: "/info/terms-of-service" },
      { label: "Liên hệ Developer team", href: "/info/contact" },
    ],
    primaryCta: { label: "Đăng ký API key & truy cập docs", href: "/info/contact" },
  },
  "locale": {
    title: "Ngôn ngữ & Tiền tệ",
    intro: "Cybersilkroads hỗ trợ tiếng Việt (mặc định) và tiếng Anh. Tiền tệ: VND, USD.",
    paragraphs: [
      "Tiếng Việt là ngôn ngữ chính. Tiếng Anh dành cho người mua quốc tế quan tâm thị trường VN.",
      "Tiền tệ hiển thị theo lựa chọn: VND (mặc định), USD. Tỷ giá cập nhật theo Vietcombank realtime.",
      "Phiên bản tiếng Trung sẽ ra mắt Q3/2026 cho NCC tiếp cận buyer Trung Quốc đại lục.",
    ],
  },
};

const SOCIAL_TOPICS = ["social-f", "social-y", "social-l", "social-z", "social-t"];

function getTopic(topic: string): Topic {
  if (TOPICS[topic]) return TOPICS[topic];
  if (SOCIAL_TOPICS.includes(topic)) {
    const platform: Record<string, string> = { "social-f": "Facebook", "social-y": "YouTube", "social-l": "LinkedIn", "social-z": "Zalo OA", "social-t": "TikTok" };
    const name = platform[topic] || "Social";
    return {
      title: `Cybersilkroads trên ${name}`,
      intro: `Theo dõi Cybersilkroads trên ${name} để cập nhật sản phẩm mới, ưu đãi và tin tức ngành.`,
      paragraphs: [
        `Kênh ${name} chính thức của Cybersilkroads cập nhật nội dung mỗi ngày: video factory tour, livestream Canton Fair, hướng dẫn sourcing, story dealer thành công.`,
        `Tham gia cộng đồng 50,000+ buyer Việt Nam quan tâm đến nhập khẩu B2B từ Trung Quốc.`,
      ],
      related: [{ label: "Đăng ký Cảnh báo Thương mại", href: "/trade-alert" }],
    };
  }
  return {
    title: topic.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" "),
    intro: "Trang nội dung này đang được hoàn thiện.",
    paragraphs: [
      "Đội ngũ Cybersilkroads đang biên tập nội dung chi tiết cho chủ đề này. Vui lòng quay lại sau hoặc gửi yêu cầu cụ thể qua RFQ.",
      "Trong lúc chờ, bạn có thể duyệt sản phẩm theo danh mục hoặc gửi yêu cầu báo giá để được hỗ trợ trực tiếp.",
    ],
    related: [
      { label: "Duyệt sản phẩm", href: "/products" },
      { label: "Gửi RFQ", href: "/buying-request" },
      { label: "Trung tâm trợ giúp", href: "/help" },
    ],
  };
}

/* Build a slug-friendly anchor id from a section heading. */
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const t = getTopic(topic);

  // Pair section titles with paragraphs (1:1, with title=null meaning no header)
  const sections = t.paragraphs.map((p, i) => ({
    title: t.sectionTitles?.[i] ?? null,
    paragraph: p,
    id: slugify(t.sectionTitles?.[i] ?? `phan-${i + 1}`),
  }));
  const tocItems = sections.filter((s) => s.title);

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Thông tin", href: "/help" },
          { label: t.title },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-10 max-md:py-7 grid grid-cols-[auto_1fr] gap-6 items-center max-md:grid-cols-1 max-md:gap-3">
          <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-[40px] flex-shrink-0 max-md:w-14 max-md:h-14 max-md:text-[28px]">
            {t.icon || "📄"}
          </div>
          <div>
            {t.category && (
              <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2.5">
                {t.category}
              </span>
            )}
            <h1 className="text-[32px] font-extrabold leading-tight mb-2 max-md:text-[22px]">
              {t.title}
            </h1>
            <p className="text-[14px] opacity-90 leading-relaxed max-w-[680px] max-md:text-[12.5px]">
              {t.intro}
            </p>
          </div>
        </div>
        {/* Quick facts strip */}
        {t.quickFacts && t.quickFacts.length > 0 && (
          <div className="border-t border-white/10 bg-black/15">
            <div className="max-w-[1100px] mx-auto px-4 py-3 grid grid-cols-6 gap-3 text-center max-md:grid-cols-3 max-md:gap-2 max-md:py-2.5">
              {t.quickFacts.map((f) => (
                <div key={f.label} className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
                  <b className="block text-[15px] text-gold leading-tight max-md:text-[13px]">{f.value}</b>
                  <small className="text-[10.5px] opacity-75 uppercase tracking-wider max-md:text-[10px]">{f.label}</small>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* === BODY: article + sticky sidebar ================================ */}
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[1fr_280px] gap-7 max-lg:grid-cols-1 max-md:mt-4 max-md:mb-7">
        {/* === Article column =========================================== */}
        <article className="bg-paper border border-line rounded p-7 max-md:p-4">
          {/* Sections */}
          {sections.map((s, i) => (
            <div key={i} className={i > 0 ? "mt-6" : ""}>
              {s.title && (
                <h2 id={s.id} className="text-[19px] font-bold text-ink mb-3 pb-2 border-b border-line scroll-mt-20 max-md:text-[16px]">
                  {s.title}
                </h2>
              )}
              {/* Drop cap on first para of first section */}
              {i === 0 && !s.title ? (
                <p className="text-[14px] text-ink leading-relaxed first-letter:text-[44px] first-letter:font-extrabold first-letter:text-brand first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:mt-1">
                  {s.paragraph}
                </p>
              ) : (
                <p className="text-[14px] text-ink leading-relaxed">{s.paragraph}</p>
              )}

              {/* Pull-quote after first section */}
              {i === 0 && t.pullQuote && (
                <blockquote className="my-6 border-l-4 border-gold pl-5 py-2 italic text-[16px] text-ink leading-relaxed max-md:text-[14.5px]">
                  &ldquo;{t.pullQuote.text}&rdquo;
                  {t.pullQuote.author && (
                    <footer className="mt-2 text-[12.5px] text-mute not-italic">— {t.pullQuote.author}</footer>
                  )}
                </blockquote>
              )}
            </div>
          ))}

          {/* Checklist */}
          {t.checklist && t.checklist.length > 0 && (
            <div className="mt-7 bg-bg border-l-4 border-brand rounded-r p-5 max-md:p-3.5">
              <b className="block text-[14px] text-ink mb-3">✨ Cam kết của Cybersilkroads</b>
              <ul className="space-y-2">
                {t.checklist.map((c, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] text-ink leading-relaxed">
                    <span className="text-success font-bold flex-shrink-0">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ */}
          {t.faq && t.faq.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-line">
              <h2 className="text-[19px] font-bold text-ink mb-4 max-md:text-[16px]">❓ Câu hỏi thường gặp</h2>
              <div className="space-y-2">
                {t.faq.map((q, i) => (
                  <details key={i} {...(i === 0 ? { open: true } : {})} className="border border-line rounded group/faq">
                    <summary className="px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-center hover:bg-bg">
                      <b className="text-[13.5px] text-ink leading-snug">{q.q}</b>
                      <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0 ml-3">▾</span>
                    </summary>
                    <p className="px-4 pb-4 pt-3 text-[13px] text-mute leading-relaxed border-t border-line">{q.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA card */}
          <div
            className="mt-8 rounded p-6 text-white max-md:p-4"
            style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
          >
            <div className="grid grid-cols-[1fr_auto] gap-4 items-center max-md:grid-cols-1">
              <div>
                <b className="block text-[16px] mb-1">Sẵn sàng bắt đầu sourcing?</b>
                <p className="text-[12.5px] opacity-85 leading-snug">
                  Gửi RFQ miễn phí, nhận báo giá từ 5-10 NCC trong 24h. Không qua trung gian, không phí ẩn.
                </p>
              </div>
              <div className="flex gap-2 max-md:flex-col">
                <Link
                  href={t.primaryCta?.href || "/buying-request"}
                  className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px] hover:bg-[#E8943A] cursor-pointer text-center inline-block whitespace-nowrap"
                >
                  📩 {t.primaryCta?.label || "Gửi RFQ ngay"}
                </Link>
                <Link
                  href="/help"
                  className="px-5 py-2.5 border-2 border-white/40 text-white rounded-sm font-bold text-[13px] hover:bg-white/10 cursor-pointer text-center inline-block whitespace-nowrap"
                >
                  💬 Trợ giúp
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* === Sticky sidebar =========================================== */}
        <aside className="space-y-4 max-lg:hidden">
          <div className="bg-paper border border-line rounded p-4 sticky top-[5rem]">
            {tocItems.length > 0 && (
              <>
                <b className="block text-[12px] uppercase tracking-wider text-mute font-bold mb-2.5">
                  📑 Mục lục
                </b>
                <ul className="space-y-1.5 mb-4 pb-4 border-b border-line">
                  {tocItems.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-[12.5px] text-ink hover:text-brand cursor-pointer block py-0.5"
                      >
                        → {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <b className="block text-[12px] uppercase tracking-wider text-mute font-bold mb-2.5">
              🔗 Liên kết liên quan
            </b>
            <ul className="space-y-1.5">
              {(t.related && t.related.length > 0
                ? t.related
                : [
                    { label: "Trung tâm trợ giúp", href: "/help" },
                    { label: "Liên hệ", href: "/info/contact" },
                  ]
              ).map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-[12.5px] text-brand hover:underline cursor-pointer block py-0.5">
                    → {r.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/buying-request"
              className="mt-4 block text-center py-2 bg-accent text-white rounded-sm font-bold text-[12.5px] cursor-pointer hover:opacity-90"
            >
              🚀 Gửi RFQ
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = getTopic(topic);
  return { title: `${t.title} — Cybersilkroads` };
}
