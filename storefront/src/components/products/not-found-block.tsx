export function NotFoundBlock({ keyword }: { keyword: string }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-6">
      <h3 className="text-[16px] font-bold text-ink mb-3">
        没找到您需要的？
      </h3>
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-4">
          <b className="block text-[14px] font-bold text-ink mb-1.5">
            轻松寻源
          </b>
          <p className="text-[12px] text-mute mb-3 leading-relaxed">
            描述您的需求，已认证的供应商将主动回复您。
          </p>
          <form className="flex gap-2 max-md:flex-col">
            <input
              defaultValue={keyword}
              className="flex-1 px-3.5 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
            />
            <button className="px-5 py-2.5 bg-accent text-white font-bold text-[13px] rounded-sm hover:bg-[#B81827] cursor-pointer">
              提交需求
            </button>
          </form>
        </div>
        <div className="bg-paper border border-line rounded p-4">
          <b className="block text-[14px] font-bold text-ink mb-1.5">
            产品提醒
          </b>
          <p className="text-[12px] text-mute mb-3 leading-relaxed">
            订阅后，当有符合关键词的新产品/供应商时邮件通知您。
          </p>
          <form className="flex gap-2 max-md:flex-col">
            <input
              placeholder="产品关键词"
              className="flex-1 px-3.5 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
            />
            <button className="px-5 py-2.5 bg-brand text-white font-bold text-[13px] rounded-sm hover:bg-brand-light cursor-pointer">
              订阅
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
