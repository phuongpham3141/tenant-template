import type { FeaturedSupplier } from "@/data/products";

export function SupBanner({ sup }: { sup: FeaturedSupplier }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-4">
      <div className="bg-paper border border-line rounded overflow-hidden grid grid-cols-[420px_1fr] max-md:grid-cols-1">
        {/* Video / image side */}
        <div className="relative bg-brand-dark overflow-hidden">
          <div className="aspect-[16/11] relative">
            <img
              src={sup.videoSrc}
              alt={sup.name}
              className="w-full h-full object-cover opacity-85"
            />
            <span className="absolute top-2.5 left-2.5 bg-black/60 text-white px-2 py-0.5 rounded-sm text-[11px] font-semibold">
              📹 Video
            </span>
            <span className="absolute top-2.5 left-[68px] bg-black/60 text-white px-2 py-0.5 rounded-sm text-[11px] font-semibold">
              🖼 1/3
            </span>
            <span className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/95 text-brand-dark flex items-center justify-center text-[14px] font-bold shadow">
              360°
            </span>
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/85 to-transparent text-white text-[12.5px] font-medium">
              {sup.videoCaption}
            </div>
          </div>
        </div>
        {/* Info side */}
        <div className="p-4 flex flex-col">
          <div className="flex gap-3 items-start mb-3">
            <div className="w-14 h-14 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[18px] text-brand flex-shrink-0">
              {sup.logo}
            </div>
            <div className="flex-1 min-w-0">
              <b className="block text-[14px] font-bold text-ink leading-tight mb-1 line-clamp-2">
                {sup.name}
              </b>
              <div className="flex items-center gap-2 flex-wrap">
                {sup.audited && (
                  <span className="bg-gold text-brand-dark text-[10.5px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">
                    ✓ Đã kiểm định
                  </span>
                )}
                <span className="text-gold text-[12px]">
                  {"★".repeat(sup.rating)}
                  <span className="text-mute2">{"★".repeat(5 - sup.rating)}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mb-3.5">
            <a className="flex-1 px-3.5 py-2 bg-accent text-white text-[12.5px] font-semibold rounded-full text-center cursor-pointer hover:bg-red">
              📧 Liên hệ ngay
            </a>
            <a className="flex-1 px-3.5 py-2 bg-paper text-brand border border-brand text-[12.5px] font-semibold rounded-full text-center cursor-pointer hover:bg-brand hover:text-white">
              💬 Chat với NCC
            </a>
          </div>
          <div className="grid grid-cols-5 gap-1.5 max-md:grid-cols-3">
            {sup.miniProducts.map((mp, i) => (
              <a
                key={i}
                className="border border-line rounded-sm p-1.5 cursor-pointer hover:border-brand block"
              >
                <div className="aspect-square bg-surface-1 rounded-sm overflow-hidden mb-1">
                  <img src={mp.img} alt={mp.title} className="w-full h-full object-cover" />
                </div>
                <span className="block text-[10.5px] text-ink leading-tight line-clamp-2 min-h-[26px]">
                  {mp.title}
                </span>
                <span className="block text-accent text-[11.5px] font-bold mt-0.5">
                  {mp.price}
                  <small className="text-mute font-normal text-[10px] ml-0.5">{mp.unit}</small>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
