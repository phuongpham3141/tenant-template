import Link from "next/link";
import { ZONES } from "@/data/home";

export function Zones() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-5 max-md:px-3 max-md:mt-3">
      <div className="bg-paper px-5 py-3.5 flex justify-between items-center border-t-[3px] border-gold rounded-t border-l border-r border-line max-md:flex-col max-md:items-stretch max-md:gap-1.5 max-md:px-3 max-md:py-2.5">
        <h2 className="text-[18px] font-bold text-ink flex items-center gap-2.5 max-md:text-[15px]">
          <span className="w-7 h-7 bg-gold text-brand-dark rounded-sm flex items-center justify-center font-bold max-md:w-6 max-md:h-6 max-md:text-[12px]">
            📍
          </span>
          Cụm công nghiệp
        </h2>
        <span className="text-[12.5px] text-mute max-md:hidden">
          Cụm công nghiệp đã kiểm định, mua trực tiếp tại nguồn
        </span>
        <Link href="/zones" className="text-brand text-[12.5px] flex items-center gap-1 cursor-pointer max-md:self-end max-md:text-[11.5px]">
          Xem bản đồ cụm →
        </Link>
      </div>
      <div className="bg-paper rounded-b border-l border-r border-b border-line p-4 grid grid-cols-6 gap-2.5 md:max-xl:grid-cols-3 max-md:grid-cols-3 max-md:p-2.5 max-md:gap-2">
        {ZONES.map((z) => (
          <Link
            key={z.slug}
            href={`/zone/${z.slug}`}
            className="relative aspect-square rounded-sm overflow-hidden bg-brand-dark cursor-pointer block group"
          >
            {z.image ? (
              <img
                src={z.image}
                alt={z.name}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition"
              />
            ) : null}
            <div
              className="absolute inset-0 p-2.5 flex flex-col justify-end text-white max-md:p-2"
              style={{
                background: "linear-gradient(transparent 40%, rgba(0,37,87,0.92))",
              }}
            >
              <b className="block text-[13px] font-bold leading-tight mb-0.5 max-md:text-[11.5px]">
                {z.name}
              </b>
              <span className="text-[11px] opacity-90 max-md:text-[10.5px]">{z.count}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
