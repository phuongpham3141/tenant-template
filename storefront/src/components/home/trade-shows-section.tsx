import Link from "next/link";

type TradeShow = {
  name: string;
  banner: string;
  duration: string;
  location: string;
  badge?: string;
  category?: string;
  href: string;
};

/* Real trade-show / conference imagery from Unsplash CDN. URL format
   `?w=W&h=H&fit=crop&auto=format&q=70` gives a deterministic crop. */
const UNSPLASH = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=70`;

const FEATURED: TradeShow = {
  name: "Canton Fair 2026 — Phase 1",
  banner: UNSPLASH("1505373877841-8d25f7d46678", 720, 420), // expo crowd
  duration: "15/04 – 05/05/2026",
  location: "Quảng Châu, Trung Quốc",
  badge: "NỔI BẬT",
  category: "Tổng hợp · 25K+ NCC",
  href: "/trade-shows",
};

const SHOWS: TradeShow[] = [
  {
    name: "Vietnam Expo 2026",
    banner: UNSPLASH("1540575467063-178a50c2df87", 200, 150), // conference hall
    duration: "09/04 – 12/04/2026",
    location: "Hà Nội, Việt Nam",
    category: "Đa ngành",
    href: "/trade-shows",
  },
  {
    name: "ProPak China 2026",
    banner: UNSPLASH("1559223607-a43c990c692c", 200, 150), // expo booth
    duration: "15/06 – 17/06/2026",
    location: "Shanghai, Trung Quốc",
    category: "Đóng gói & Logistics",
    href: "/trade-shows",
  },
  {
    name: "Furniture China 2026",
    banner: UNSPLASH("1492684223066-81342ee5ff30", 200, 150), // exhibition
    duration: "08/09 – 11/09/2026",
    location: "Shanghai, Trung Quốc",
    category: "Nội thất & Gia dụng",
    href: "/trade-shows",
  },
];

export function TradeShowsSection() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-6 max-md:px-3 max-md:mt-4">
      <div className="bg-paper border border-line rounded p-5 max-md:p-3">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 max-md:flex-col max-md:gap-2 max-md:mb-3">
          <div className="text-center flex-1 max-md:text-left">
            <h2 className="text-[20px] font-bold text-ink max-md:text-[17px]">
              Hội chợ thương mại
            </h2>
            <p className="text-[12.5px] text-mute mt-1 max-md:text-[12px]">
              Danh sách các hội chợ Cybersilkroads sẽ tham dự cùng đối tác Made-in-China.
            </p>
          </div>
          <Link
            href="/trade-shows"
            className="px-5 py-2 bg-accent text-white font-semibold text-[13px] rounded-sm hover:bg-red cursor-pointer flex-shrink-0 max-md:self-end max-md:py-1.5 max-md:px-4"
          >
            Xem thêm →
          </Link>
        </div>

        {/* Layout: featured left + timeline list right (right col stretches via items-stretch) */}
        <div className="grid grid-cols-[1fr_1fr] gap-5 items-stretch max-md:grid-cols-1 max-md:gap-3">
          {/* === Featured trade show ===================================
              Aspect ratio only locked on desktop (lg+). On tablet, the
              featured stretches via h-full to match the right column's
              natural height (cards no longer compressed via flex-1). */}
          <Link
            href={FEATURED.href}
            className="relative rounded overflow-hidden bg-brand-dark group/feat block xl:aspect-[16/10] md:max-xl:h-full md:max-xl:min-h-[440px] max-md:aspect-[16/9]"
          >
            <img
              src={FEATURED.banner}
              alt={FEATURED.name}
              className="w-full h-full object-cover opacity-85 group-hover/feat:opacity-95 transition"
            />
            {FEATURED.badge && (
              <span className="absolute top-3 left-3 bg-accent text-white text-[10.5px] px-2 py-0.5 rounded-sm font-bold tracking-wider z-10">
                ⭐ {FEATURED.badge}
              </span>
            )}
            {FEATURED.category && (
              <span className="absolute top-3 right-3 bg-black/45 text-white text-[10.5px] px-2 py-0.5 rounded-sm font-medium z-10 backdrop-blur-sm">
                {FEATURED.category}
              </span>
            )}
            <div
              className="absolute inset-0 px-5 py-4 flex flex-col justify-end text-white"
              style={{
                background:
                  "linear-gradient(transparent 30%, rgba(0,37,87,0.85))",
              }}
            >
              <h3 className="text-[22px] font-bold leading-tight mb-2 max-md:text-[17px]">
                {FEATURED.name}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] opacity-95 max-md:text-[11.5px]">
                <span className="flex items-center gap-1">
                  📅 {FEATURED.duration}
                </span>
                <span className="flex items-center gap-1">
                  📍 {FEATURED.location}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1.5 bg-gold text-brand-dark text-[12px] font-bold rounded-sm group-hover/feat:bg-warm transition">
                  📩 Đăng ký tham gia →
                </span>
                <span className="text-[11.5px] opacity-80">
                  Đoàn Cybersilkroads dẫn dắt · Hỗ trợ visa & lịch B2B
                </span>
              </div>
            </div>
          </Link>

          {/* === Trade-show list ======================================= */}
          <div className="relative h-full flex flex-col gap-2 max-md:gap-1.5">
            {/* Compact card — fixed-aspect landscape thumb (16:10), inline
                category badge above title, no decorative timeline circles.
                flex-1 only on desktop so cards fill the featured's locked
                aspect height; tablet/mobile size to natural content. */}
            {SHOWS.map((show) => (
              <Link
                key={show.name}
                href={show.href}
                className="relative flex-1 flex gap-2.5 items-center border border-line rounded p-2 hover:border-brand hover:shadow-sm hover:bg-cream cursor-pointer group/item transition"
              >
                {/* Thumbnail — 96×60 landscape, never crops the subject */}
                <div className="w-24 h-[60px] flex-shrink-0 rounded-sm overflow-hidden bg-surface-1 border border-line max-md:w-20 max-md:h-[52px]">
                  <img
                    src={show.banner}
                    alt={show.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-200"
                  />
                </div>
                {/* Body */}
                <div className="flex-1 min-w-0 leading-tight">
                  {show.category && (
                    <span className="inline-block text-[9.5px] uppercase tracking-wider text-brand bg-brand/10 px-1.5 py-px rounded-sm font-bold mb-1 align-middle">
                      {show.category}
                    </span>
                  )}
                  <b className="block text-[13.5px] text-ink leading-snug mb-1 group-hover/item:text-brand truncate max-md:text-[12.5px]">
                    {show.name}
                  </b>
                  <div className="text-[11px] text-mute flex items-center gap-x-3 gap-y-0 flex-wrap">
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      📅 {show.duration}
                    </span>
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      📍 {show.location}
                    </span>
                  </div>
                </div>
                {/* Trailing arrow — subtle, hover-coloured */}
                <span className="self-center text-mute2 text-[18px] group-hover/item:text-brand flex-shrink-0 pr-1 max-md:hidden">
                  →
                </span>
              </Link>
            ))}

            {/* Subscribe CTA — fills remaining space */}
            <div
              className="rounded p-3.5 text-white flex items-center gap-3 max-md:flex-col max-md:items-start max-md:gap-2"
              style={{ background: "linear-gradient(135deg,var(--color-brand),var(--color-brand-dark))" }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded bg-gold flex items-center justify-center text-[20px]">
                🔔
              </div>
              <div className="flex-1 min-w-0">
                <b className="block text-[13px] font-bold mb-0.5">
                  Cảnh báo Thương mại — Không bỏ lỡ hội chợ
                </b>
                <p className="text-[11.5px] opacity-85 leading-snug">
                  Nhận lịch hội chợ + lịch B2B match-making qua email mỗi tháng.
                </p>
              </div>
              <Link
                href="/trade-alert"
                className="px-3 py-1.5 bg-gold text-brand-dark text-[12px] font-bold rounded-sm cursor-pointer hover:bg-warm flex-shrink-0 whitespace-nowrap"
              >
                Đăng ký →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
