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
    title: "Cụm sản xuất gốm sứ & đá",
    bullets: [
      "Phật Sơn — 1.200 nhà máy gốm sứ",
      "Tấm porcelain & marble lớn",
      "Báo giá FOB / DDP Hải Phòng",
    ],
    image: "/img/sol-hubs.jpg?v=4",
    href: "/zones",
    subcats: [
      { name: "Gạch porcelain", image: "/img/cer1.jpg?v=4", href: "/category/construction-materials" },
      { name: "Đá marble tấm lớn", image: "/img/cer2.jpg?v=4", href: "/category/construction-materials" },
      { name: "Sàn gỗ kỹ thuật", image: "/img/cer8.jpg?v=4", href: "/category/construction-materials" },
    ],
  },
  {
    title: "Cụm sản xuất nội thất",
    bullets: [
      "Phật Sơn — 3.000+ nhà máy nội thất",
      "Tấn Giang — 340 nhà máy gỗ",
      "Sofa, giường, tủ, bàn ăn OEM/ODM",
    ],
    image: "/img/sol-mei.jpg?v=4",
    href: "/zones",
    subcats: [
      { name: "Sofa & Phòng khách", image: "/img/fur1.jpg?v=4", href: "/category/noi-that" },
      { name: "Giường & Phòng ngủ", image: "/img/fur3.jpg?v=4", href: "/category/noi-that" },
      { name: "Tủ bếp & Tủ áo", image: "/img/fur7.jpg?v=4", href: "/category/noi-that" },
    ],
  },
  {
    title: "Tùy chỉnh OEM/ODM",
    bullets: [
      "Tùy chỉnh Logo / Kích thước / Màu",
      "Thiết kế 3D miễn phí với đơn ≥ 30 bộ",
      "Có sẵn mẫu trước đặt hàng lớn",
    ],
    image: "/img/sol-custom.jpg?v=4",
    href: "/buying-request",
    subcats: [
      { name: "Vật liệu xây dựng", image: "/img/showcase-construction-materials.jpg?v=4", href: "/category/construction-materials" },
      { name: "Nội thất tùy chỉnh", image: "/img/showcase-noi-that.jpg?v=4", href: "/category/noi-that" },
      { name: "OEM khách sạn 5 sao", image: "/img/fur6.jpg?v=4", href: "/category/noi-that" },
    ],
  },
  {
    title: "Triển lãm thông minh — Hội chợ ảo",
    bullets: [
      "Nhà cung cấp đã được kiểm định",
      "Tour nhà máy VR 360°",
      "Video call gặp QC manager",
    ],
    image: "/img/sol-expo.jpg?v=4",
    href: "/seller-center/smart-expo",
    subcats: [
      { name: "Tour nhà máy VR", image: "/img/sub-expo1.jpg?v=4", href: "/factory-tour" },
      { name: "Catalog gốm sứ", image: "/img/sub-expo3.jpg?v=4", href: "/category/construction-materials" },
      { name: "Catalog nội thất", image: "/img/cer8.jpg?v=4", href: "/category/noi-that" },
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
                  <div className="w-[52px] h-[52px] rounded-full bg-[#F5F5F5] overflow-hidden border border-line group-hover/sub:border-accent transition-colors max-md:w-[44px] max-md:h-[44px]">
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
