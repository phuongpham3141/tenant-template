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
    title: "Ceramics & Stone Manufacturing Cluster",
    bullets: [
      "Foshan — 1,200 ceramic factories",
      "Large-format porcelain & marble slabs",
      "FOB / DDP Hai Phong quotes",
    ],
    image: "/img/sol-hubs.jpg?v=5",
    href: "/zones",
    subcats: [
      { name: "Porcelain Tile", image: "/img/cer1.jpg?v=5", href: "/category/construction-materials" },
      { name: "Large-Format Marble Slabs", image: "/img/cer2.jpg?v=5", href: "/category/construction-materials" },
      { name: "Engineered Wood Flooring", image: "/img/cer8.jpg?v=5", href: "/category/construction-materials" },
    ],
  },
  {
    title: "Furniture Manufacturing Cluster",
    bullets: [
      "Foshan — 3,000+ furniture factories",
      "Jinjiang — 340 woodworking factories",
      "OEM/ODM sofas, beds, cabinets & dining tables",
    ],
    image: "/img/sol-mei.jpg?v=5",
    href: "/zones",
    subcats: [
      { name: "Sofas & Living Room", image: "/img/fur1.jpg?v=5", href: "/category/noi-that" },
      { name: "Beds & Bedroom", image: "/img/fur3.jpg?v=5", href: "/category/noi-that" },
      { name: "Kitchen & Wardrobe Cabinets", image: "/img/fur7.jpg?v=5", href: "/category/noi-that" },
    ],
  },
  {
    title: "OEM/ODM Customization",
    bullets: [
      "Custom logo / size / color",
      "Free 3D design on orders of 30+ sets",
      "Samples available before large orders",
    ],
    image: "/img/sol-custom.jpg?v=5",
    href: "/buying-request",
    subcats: [
      { name: "Building Materials", image: "/img/showcase-construction-materials.jpg?v=5", href: "/category/construction-materials" },
      { name: "Custom Furniture", image: "/img/showcase-noi-that.jpg?v=5", href: "/category/noi-that" },
      { name: "5-Star Hotel OEM", image: "/img/fur6.jpg?v=5", href: "/category/noi-that" },
    ],
  },
  {
    title: "Smart Expo — Virtual Trade Show",
    bullets: [
      "Verified suppliers",
      "360° VR factory tours",
      "Video call to meet the QC manager",
    ],
    image: "/img/sol-expo.jpg?v=5",
    href: "/seller-center/smart-expo",
    subcats: [
      { name: "VR Factory Tour", image: "/img/sub-expo1.jpg?v=5", href: "/factory-tour" },
      { name: "Ceramics Catalog", image: "/img/sub-expo3.jpg?v=5", href: "/category/construction-materials" },
      { name: "Furniture Catalog", image: "/img/cer8.jpg?v=5", href: "/category/noi-that" },
    ],
  },
];

export function SourcingSolutions() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-6 max-md:px-3 max-md:mt-4">
      <h2 className="text-[20px] font-bold text-ink text-center mb-4 max-md:text-[17px] max-md:mb-3">
        Sourcing Solutions & Specialized Services
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
