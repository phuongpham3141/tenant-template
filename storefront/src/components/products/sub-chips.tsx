import type { LeafCategoryPage } from "@/data/products";

export function SubChips({ chips }: { chips: LeafCategoryPage["chips"] }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-3 flex gap-2 flex-wrap">
      {chips.map((c) => (
        <a
          key={c.name}
          className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium cursor-pointer ${
            c.active
              ? "bg-brand text-white"
              : "bg-paper border border-line text-ink hover:border-brand hover:text-brand"
          }`}
        >
          {c.name}
        </a>
      ))}
    </div>
  );
}
