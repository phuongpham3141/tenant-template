import Link from "next/link";

type SolutionSub = { name: string; image: string; href: string };

type SolutionCard = {
  title: string;
  bullets: string[];
  image: string;
  href: string;
  subcats: SolutionSub[];
};

const SOLUTIONS: SolutionCard[] = [
  {
    title: "Tìm nguồn từ Cụm",
    bullets: [
      "Khu công nghiệp tập trung",
      "Cạnh tranh giá nguồn",
      "Sản phẩm OEM/ODM gốc",
    ],
    image: "/img/sol-hubs.jpg?v=2",
    href: "/zones",
    subcats: [
      { name: "Quà tặng & Thể thao", image: "/img/sub-gifts.jpg?v=2", href: "/category/decoration" },
      { name: "Điện & Điện tử", image: "/img/sub-electric.jpg?v=2", href: "/category/electrical" },
      { name: "Vận chuyển", image: "/img/sub-transport.jpg?v=2", href: "/category/hardware-tools" },
    ],
  },
  {
    title: "Sản phẩm đạt giải MEI",
    bullets: [
      "Chất lượng sản xuất vượt trội",
      "Thiết kế đột phá",
      "Được chuyên gia ngành đánh giá",
    ],
    image: "/img/sol-mei.jpg?v=2",
    href: "/info/mei-awards",
    subcats: [
      { name: "Sản xuất & Chế biến", image: "/img/sub-mfg.jpg?v=2", href: "/category/construction-materials" },
      { name: "Luyện kim & Khoáng sản", image: "/img/sub-metal.jpg?v=2", href: "/category/hardware-tools" },
      { name: "Đóng gói & In ấn", image: "/img/sub-pack.jpg?v=2", href: "/category/decoration" },
    ],
  },
  {
    title: "Tùy chỉnh sản phẩm",
    bullets: [
      "Tùy chỉnh Logo / Kích thước / Màu",
      "Thiết kế riêng theo yêu cầu",
      "Có sẵn mẫu trước đặt hàng",
    ],
    image: "/img/sol-custom.jpg?v=2",
    href: "/buying-request",
    subcats: [
      { name: "Ô dù", image: "/img/sub-umb.jpg?v=2", href: "/category/outdoor-garden" },
      { name: "Dép & Giày", image: "/img/sub-slip.jpg?v=2", href: "/category/hotel-supplies" },
      { name: "Ốp điện thoại", image: "/img/sub-case.jpg?v=2", href: "/category/electrical" },
    ],
  },
  {
    title: "Triển lãm thông minh — Hội chợ ảo",
    bullets: [
      "Nhà cung cấp đã được kiểm định",
      "Triển lãm tại hội chợ quốc tế",
      "Gian hàng ảo 24/7",
    ],
    image: "/img/sol-expo.jpg?v=2",
    href: "/seller-center/smart-expo",
    subcats: [
      { name: "Sản xuất & Chế biến", image: "/img/sub-expo1.jpg?v=2", href: "/category/construction-materials" },
      { name: "Vận chuyển & Xe", image: "/img/sub-expo2.jpg?v=2", href: "/category/hardware-tools" },
      { name: "Xây dựng & Trang trí", image: "/img/sub-expo3.jpg?v=2", href: "/category/construction-materials" },
    ],
  },
];

export function SourcingSolutions() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-6 max-md:px-3 max-md:mt-4">
      <h2 className="text-[20px] font-bold text-ink text-center mb-4 max-md:text-[17px] max-md:mb-3">
        Giải pháp Tìm nguồn & Dịch vụ chuyên biệt
      </h2>
      <div className="grid grid-cols-4 gap-3 md:max-xl:grid-cols-2 md:max-xl:gap-2.5 max-md:grid-cols-1 max-md:gap-2">
        {SOLUTIONS.map((s) => (
          <div
            key={s.title}
            className="bg-paper border border-line rounded overflow-hidden flex flex-col"
          >
            {/* Top: image with overlay text */}
            <Link
              href={s.href}
              className="relative aspect-[16/9] bg-brand-dark text-white block group/sol"
            >
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover opacity-65 group-hover/sol:opacity-50 transition-opacity"
              />
              <div
                className="absolute inset-0 px-4 py-4 flex flex-col justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,37,87,0.85) 0%, rgba(0,37,87,0.4) 100%)",
                }}
              >
                <h3 className="text-[18px] font-bold leading-tight mb-2 max-md:text-[16px]">
                  {s.title}
                </h3>
                <ul className="space-y-0.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-[11.5px] opacity-90 leading-snug max-md:text-[11px]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
            {/* Bottom: 3 sub-icons with labels */}
            <div className="grid grid-cols-3 gap-1.5 p-3 max-md:p-2">
              {s.subcats.map((sub) => (
                <Link
                  key={sub.name}
                  href={sub.href}
                  className="flex flex-col items-center gap-1.5 group/sub"
                >
                  <div className="w-[52px] h-[52px] rounded-full bg-surface-1 overflow-hidden border border-line group-hover/sub:border-accent transition-colors max-md:w-[44px] max-md:h-[44px]">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-full h-full object-cover group-hover/sub:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10.5px] text-ink text-center leading-tight line-clamp-2 group-hover/sub:text-accent max-md:text-[10px]">
                    {sub.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
