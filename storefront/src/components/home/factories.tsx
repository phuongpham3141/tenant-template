import Link from "next/link";
import { FACTORIES } from "@/data/home";

export function Factories() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-5 max-md:px-3 max-md:mt-3">
      <div className="bg-paper px-5 py-3.5 flex justify-between items-center border-t-[3px] border-accent rounded-t border-l border-r border-line max-md:flex-col max-md:items-stretch max-md:gap-2 max-md:px-3 max-md:py-2.5">
        <h2 className="text-[18px] font-bold text-ink flex items-center gap-2.5 max-md:text-[15px]">
          <span className="w-7 h-7 bg-accent text-white rounded-sm flex items-center justify-center font-bold max-md:w-6 max-md:h-6 max-md:text-[12px]">
            🏭
          </span>
          Nhà máy đối tác · 工厂直销
        </h2>
        <div className="flex gap-3.5 text-[12.5px] text-mute max-md:flex-wrap max-md:gap-2 max-md:text-[11.5px]">
          <span>
            <b className="text-ink">40+</b> Đã thẩm định
          </span>
          <span>
            <b className="text-ink">22</b> NCC hạng Vàng
          </span>
          <span>
            <b className="text-ink">38</b> Đã audit
          </span>
        </div>
        <Link href="/suppliers" className="text-brand text-[12.5px] flex items-center gap-1 cursor-pointer max-md:self-end max-md:text-[11.5px]">
          Xem tất cả nhà máy →
        </Link>
      </div>
      <div className="bg-paper rounded-b border-l border-r border-b border-line p-4 grid grid-cols-3 gap-3 max-md:grid-cols-1 max-md:p-2.5 max-md:gap-2">
        {FACTORIES.map((f) => (
          <Link
            key={f.slug}
            href={`/supplier/${f.slug}`}
            className="border border-line rounded-sm p-3.5 transition cursor-pointer hover:border-brand hover:shadow-[0_4px_10px_rgba(0,60,143,0.1)] block max-md:p-2.5"
          >
            <div className="flex gap-3 items-start mb-3 max-md:mb-2 max-md:gap-2">
              <div className="w-14 h-14 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[18px] text-brand flex-shrink-0 max-md:w-11 max-md:h-11 max-md:text-[14px]">
                {f.initials}
              </div>
              <div className="flex-1 min-w-0">
                <b className="block text-[13px] font-semibold text-ink leading-tight mb-0.5 line-clamp-2">
                  {f.name}
                </b>
                <span className="text-[11.5px] text-mute flex items-center gap-1">
                  <span className="cn-flag" />
                  {f.location}
                </span>
              </div>
            </div>
            <div className="flex gap-1 mb-2.5 flex-wrap">
              {f.badges.gold && (
                <span className="bg-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">
                  GOLD
                </span>
              )}
              {f.badges.audited && (
                <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">
                  AUDITED
                </span>
              )}
              <span className="bg-brand text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">
                {f.badges.years}
              </span>
            </div>
            <div className="flex gap-3 text-[11.5px] text-mute mb-2.5 pb-2.5 border-b border-dashed border-line">
              <span>
                <b className="text-accent">★ {f.rating}</b> ({f.reviews})
              </span>
              <span>{f.meta}</span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {f.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10.5px] bg-[#F5F5F5] text-mute px-2 py-0.5 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
