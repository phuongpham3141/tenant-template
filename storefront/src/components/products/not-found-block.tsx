export function NotFoundBlock({ keyword }: { keyword: string }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-6">
      <h3 className="text-[16px] font-bold text-ink mb-3">
        Chưa tìm thấy thứ bạn cần?
      </h3>
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-4">
          <b className="block text-[14px] font-bold text-ink mb-1.5">
            Tìm nguồn dễ dàng
          </b>
          <p className="text-[12px] text-mute mb-3 leading-relaxed">
            Mô tả nhu cầu, các nhà cung cấp đã được audit sẽ phản hồi bạn.
          </p>
          <form className="flex gap-2 max-md:flex-col">
            <input
              defaultValue={keyword}
              className="flex-1 px-3.5 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
            />
            <button className="px-5 py-2.5 bg-accent text-white font-bold text-[13px] rounded-sm hover:bg-[#B81827] cursor-pointer">
              Gửi yêu cầu
            </button>
          </form>
        </div>
        <div className="bg-paper border border-line rounded p-4">
          <b className="block text-[14px] font-bold text-ink mb-1.5">
            Thông báo sản phẩm
          </b>
          <p className="text-[12px] text-mute mb-3 leading-relaxed">
            Đăng ký nhận email khi có sản phẩm/NCC mới phù hợp với từ khoá.
          </p>
          <form className="flex gap-2 max-md:flex-col">
            <input
              placeholder="Từ khóa sản phẩm"
              className="flex-1 px-3.5 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
            />
            <button className="px-5 py-2.5 bg-brand text-white font-bold text-[13px] rounded-sm hover:bg-brand-light cursor-pointer">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
