export function NotFoundBlock({ keyword }: { keyword: string }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-6">
      <h3 className="text-[16px] font-bold text-ink mb-3">
        Haven't found what you need?
      </h3>
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-4">
          <b className="block text-[14px] font-bold text-ink mb-1.5">
            Easy Sourcing
          </b>
          <p className="text-[12px] text-mute mb-3 leading-relaxed">
            Describe your needs and verified suppliers will get back to you.
          </p>
          <form className="flex gap-2 max-md:flex-col">
            <input
              defaultValue={keyword}
              className="flex-1 px-3.5 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
            />
            <button className="px-5 py-2.5 bg-accent text-white font-bold text-[13px] rounded-sm hover:bg-[#B81827] cursor-pointer">
              Send Request
            </button>
          </form>
        </div>
        <div className="bg-paper border border-line rounded p-4">
          <b className="block text-[14px] font-bold text-ink mb-1.5">
            Product Alerts
          </b>
          <p className="text-[12px] text-mute mb-3 leading-relaxed">
            Sign up to get an email when new products or suppliers match your keyword.
          </p>
          <form className="flex gap-2 max-md:flex-col">
            <input
              placeholder="Product keyword"
              className="flex-1 px-3.5 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
            />
            <button className="px-5 py-2.5 bg-brand text-white font-bold text-[13px] rounded-sm hover:bg-brand-light cursor-pointer">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
