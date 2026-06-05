import type { CategoryPage } from "@/data/categories";

export function CatFoot({ data }: { data: CategoryPage }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-5">
      <div className="bg-paper border border-line rounded p-5">
        <a className="text-brand text-[13px] font-semibold cursor-pointer inline-flex items-center gap-1 mb-3">
          查看相关的{data.title}供应商 ›
        </a>
        <p className="text-[12.5px] text-mute leading-relaxed mb-4 max-w-[900px]">
          直接从经过审核认证的中国工厂采购{data.title.toLowerCase()}。Cybersilkroads
          为您对接 40 多家行业领先供应商，整合工厂验厂、QC 验货以及 DDP 送货
          至越南仓库等一站式服务。24 小时内快速报价，灵活 MOQ，支持按需 OEM/ODM
          定制。
        </p>
        <form className="flex gap-2 max-w-[700px] max-md:flex-col">
          <input
            placeholder={`在${data.title}中搜索...`}
            className="flex-1 px-3.5 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
          />
          <select className="px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper text-ink outline-none">
            <option>全部子分类</option>
            {data.sections.map((s) => (
              <option key={s.id}>{s.title}</option>
            ))}
          </select>
          <button className="px-6 py-2.5 bg-accent text-white font-bold text-[13px] rounded-sm hover:bg-[#B81827] cursor-pointer">
            🔍 搜索
          </button>
        </form>
      </div>
    </div>
  );
}
