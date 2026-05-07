import type { ListingProduct } from "@/data/products";

export function ProdCard({ p }: { p: ListingProduct }) {
  return (
    <div className="bg-paper border border-line rounded grid grid-cols-[220px_1fr_220px] gap-4 p-3.5 hover:border-brand hover:shadow-[0_4px_12px_rgba(0,60,143,0.08)] transition max-[900px]:grid-cols-[180px_1fr] max-[900px]:gap-3 max-md:grid-cols-1">
      {/* Image */}
      <div className="relative">
        <div className="aspect-square bg-[#F5F5F5] rounded-sm overflow-hidden">
          <img src={p.img.src} alt={p.title} className="w-full h-full object-cover" />
        </div>
        {(p.amazing || p.monthLabel) && (
          <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
            {p.amazing && (
              <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">
                Tuyệt vời
              </span>
            )}
            {p.monthLabel && (
              <span className="bg-accent text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">
                {p.monthLabel}
              </span>
            )}
          </div>
        )}
        <span className="absolute top-1.5 right-1.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-[14px] text-mute hover:text-accent cursor-pointer">
          ♡
        </span>
        <span className="absolute bottom-1.5 left-1.5 bg-black/65 text-white text-[10.5px] px-1.5 py-0.5 rounded-sm font-medium">
          {p.isVideo ? "▶ " : ""}1/{p.img.total}
        </span>
        <span className="absolute bottom-1.5 right-1.5 w-6 h-6 bg-white/90 rounded-sm flex items-center justify-center text-[12px] text-mute cursor-pointer">
          ⌕
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col min-w-0 max-md:order-3">
        {p.guaranteed && (
          <span className="text-success text-[11.5px] font-semibold mb-1.5 flex items-center gap-1">
            ● Giao dịch bảo đảm
          </span>
        )}
        <h3 className="text-[14px] font-semibold text-ink leading-snug mb-2 line-clamp-2 hover:text-brand cursor-pointer">
          {p.title}
        </h3>
        <div className="flex items-baseline gap-1 mb-1.5">
          <span className="text-accent text-[18px] font-extrabold">{p.priceFrom}</span>
          <span className="text-accent text-[15px] font-bold">-{p.priceTo}</span>
          <small className="text-mute font-normal text-[12px] ml-1">{p.unit}</small>
        </div>
        <div className="text-[12px] text-mute mb-2">
          <b className="text-ink">{p.moq}</b> (Số lượng tối thiểu)
        </div>
        <p className="text-[12px] text-mute leading-relaxed line-clamp-2">{p.desc}</p>
      </div>

      {/* Supplier */}
      <div className="border-l border-line pl-4 flex flex-col max-[900px]:hidden max-md:!flex max-md:border-l-0 max-md:border-t max-md:pl-0 max-md:pt-3 max-md:order-2">
        <b className="text-[12.5px] font-semibold text-ink leading-tight mb-1.5 line-clamp-2">
          {p.supplier.name}
        </b>
        {p.supplier.audited && (
          <span className="text-gold text-[11.5px] font-semibold mb-1.5">
            ✓ Đã kiểm định
          </span>
        )}
        <span className="text-[11.5px] text-mute mb-3 flex items-center gap-1">
          {p.supplier.loc}
        </span>
        <div className="flex flex-col gap-1.5 mt-auto">
          <button className="px-3 py-1.5 bg-accent text-white text-[12px] font-semibold rounded-full cursor-pointer hover:bg-[#B81827]">
            Liên hệ ngay
          </button>
          <button className="px-3 py-1.5 bg-paper text-brand border border-brand text-[12px] font-semibold rounded-full cursor-pointer hover:bg-brand hover:text-white">
            💬 Chat
          </button>
        </div>
      </div>
    </div>
  );
}
