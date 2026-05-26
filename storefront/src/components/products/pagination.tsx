export function Pagination() {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex justify-end items-center gap-1.5 mt-4 text-[13px] flex-wrap">
      <button className="w-8 h-8 border border-line rounded-sm bg-paper text-mute hover:border-brand hover:text-brand cursor-pointer">
        ‹
      </button>
      {pages.map((n) => (
        <button
          key={n}
          className={`w-8 h-8 rounded-sm cursor-pointer font-semibold ${
            n === 1
              ? "bg-accent text-white border border-accent"
              : "bg-paper text-ink border border-line hover:border-brand hover:text-brand"
          }`}
        >
          {n}
        </button>
      ))}
      <button className="px-3 h-8 border border-line rounded-sm bg-paper text-ink hover:border-brand hover:text-brand cursor-pointer">
        Tiếp ›
      </button>
    </div>
  );
}
