import { STATS } from "@/data/home";

export function StatsBar() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 max-md:px-3">
      <div className="bg-paper border border-line rounded my-4 p-4 grid grid-cols-5 gap-5 text-center max-md:grid-cols-3 max-md:gap-2 max-md:my-2 max-md:p-3">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-2.5 max-md:px-1 ${
              i === STATS.length - 1
                ? ""
                : "border-r border-line max-md:border-r-0"
            }`}
          >
            <b className="block text-[28px] font-extrabold text-brand tracking-tight leading-none max-md:text-[19px]">
              {s.value}
            </b>
            <span className="text-[11.5px] text-mute mt-1 block max-md:text-[10.5px] max-md:leading-tight">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
