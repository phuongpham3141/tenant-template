export function Trending({ chips }: { chips: string[] }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-6">
      <h3 className="text-[14px] font-bold text-ink mb-2.5">Danh mục thịnh hành:</h3>
      <div className="flex gap-2 flex-wrap">
        {chips.map((c) => (
          <a
            key={c}
            className="px-3 py-1.5 bg-paper border border-line rounded-full text-[12.5px] text-ink hover:border-brand hover:text-brand cursor-pointer"
          >
            {c}
          </a>
        ))}
      </div>
    </div>
  );
}
