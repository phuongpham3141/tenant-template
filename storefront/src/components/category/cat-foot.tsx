import type { CategoryPage } from "@/data/categories";

export function CatFoot({ data }: { data: CategoryPage }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-5">
      <div className="bg-paper border border-line rounded p-5">
        <a className="text-brand text-[13px] font-semibold cursor-pointer inline-flex items-center gap-1 mb-3">
          Xem các nhà cung cấp {data.title} liên quan ›
        </a>
        <p className="text-[12.5px] text-mute leading-relaxed mb-4 max-w-[900px]">
          Tìm nguồn {data.title.toLowerCase()} trực tiếp từ các nhà máy đã được kiểm
          định tại Trung Quốc. Cybersilkroads kết nối bạn với hơn 40 nhà cung cấp đầu
          ngành, tích hợp dịch vụ audit nhà máy, kiểm hàng QC, và vận chuyển DDP
          tới kho Việt Nam. Báo giá nhanh trong 24 giờ, MOQ linh hoạt, OEM/ODM
          theo yêu cầu.
        </p>
        <form className="flex gap-2 max-w-[700px] max-md:flex-col">
          <input
            placeholder={`Tìm trong ${data.title}...`}
            className="flex-1 px-3.5 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
          />
          <select className="px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper text-ink outline-none">
            <option>Tất cả danh mục con</option>
            {data.sections.map((s) => (
              <option key={s.id}>{s.title}</option>
            ))}
          </select>
          <button className="px-6 py-2.5 bg-accent text-white font-bold text-[13px] rounded-sm hover:bg-red cursor-pointer">
            🔍 TÌM
          </button>
        </form>
      </div>
    </div>
  );
}
