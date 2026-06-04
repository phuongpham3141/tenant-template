import type { CategoryPage } from "@/data/categories";

export function CatFoot({ data }: { data: CategoryPage }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-5">
      <div className="bg-paper border border-line rounded p-5">
        <a className="text-brand text-[13px] font-semibold cursor-pointer inline-flex items-center gap-1 mb-3">
          View related {data.title} suppliers ›
        </a>
        <p className="text-[12.5px] text-mute leading-relaxed mb-4 max-w-[900px]">
          Source {data.title.toLowerCase()} directly from audited factories in
          China. Huayuesc connects you with over 40 industry-leading suppliers,
          bundling factory audit services, QC inspection, and DDP shipping to
          your warehouse in Vietnam. Fast quotes within 24 hours, flexible MOQ,
          and OEM/ODM on request.
        </p>
        <form className="flex gap-2 max-w-[700px] max-md:flex-col">
          <input
            placeholder={`Search in ${data.title}...`}
            className="flex-1 px-3.5 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
          />
          <select className="px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper text-ink outline-none">
            <option>All Subcategories</option>
            {data.sections.map((s) => (
              <option key={s.id}>{s.title}</option>
            ))}
          </select>
          <button className="px-6 py-2.5 bg-accent text-white font-bold text-[13px] rounded-sm hover:bg-[#B81827] cursor-pointer">
            🔍 SEARCH
          </button>
        </form>
      </div>
    </div>
  );
}
