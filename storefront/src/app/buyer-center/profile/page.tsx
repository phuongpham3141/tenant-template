import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const PERSONAL = [
  { label: "Họ và tên", value: "Trần Văn A" },
  { label: "Email", value: "tran.van.a@example.com" },
  { label: "Số điện thoại", value: "+84 901 234 567" },
  { label: "Địa chỉ", value: "Số 12 Nguyễn Trãi, Hà Nội, Việt Nam" },
];

const BUSINESS = [
  { label: "Tên công ty", value: "Công ty TNHH Thương mại ABC" },
  { label: "Mã số thuế", value: "0312345678" },
  { label: "Ngành hàng chính", value: "Nội thất, Xây dựng" },
  { label: "Quy mô", value: "10–50 nhân viên" },
  { label: "Năm thành lập", value: "2018" },
];

const PREFERENCES = [
  { label: "Ngôn ngữ ưu tiên", value: "Tiếng Việt" },
  { label: "Tiền tệ hiển thị", value: "USD ($)" },
  { label: "Cảng đích mặc định", value: "Cát Lái — HCM" },
  { label: "Đơn vị đo lường", value: "Mét (m, m², m³)" },
];

const SECURITY = [
  { label: "Mật khẩu", value: "••••••••" },
  { label: "Xác thực 2 lớp (2FA)", value: "Chưa bật" },
  { label: "Phiên đăng nhập đang hoạt động", value: "2 thiết bị" },
];

function ProfileSection({ title, items, ctaLabel }: { title: string; items: { label: string; value: string }[]; ctaLabel: string }) {
  return (
    <div className="bg-paper border border-line rounded overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 border-b border-line bg-surface-2">
        <h2 className="font-bold text-ink text-[14px]">{title}</h2>
        <button type="button" className="text-brand text-[12px] hover:underline">
          {ctaLabel}
        </button>
      </div>
      <dl className="divide-y divide-line">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[160px_1fr] gap-3 px-4 py-3 text-[13px] max-md:grid-cols-1 max-md:gap-0.5">
            <dt className="text-mute">{item.label}</dt>
            <dd className="text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function BuyerProfilePage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực người mua", href: "/buyer-center" }, { label: "Hồ sơ" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/profile" />
        <div className="space-y-4">
          <div className="bg-paper border border-line rounded p-5 flex items-center gap-4 max-md:flex-col max-md:items-start max-md:gap-3">
            <div className="w-16 h-16 rounded-full bg-brand text-paper flex items-center justify-center text-[28px] font-bold flex-shrink-0">
              T
            </div>
            <div className="flex-1">
              <h1 className="text-[22px] font-bold text-ink">Trần Văn A</h1>
              <p className="text-[12.5px] text-mute mt-0.5">Buyer · Hà Nội · Tham gia 03/2024</p>
              <p className="text-[11.5px] text-success mt-1">✓ Hồ sơ đã xác thực</p>
            </div>
            <button type="button" className="px-4 py-2 border border-brand text-brand rounded-sm font-semibold text-[12.5px] hover:bg-brand hover:text-paper transition">
              Đổi ảnh đại diện
            </button>
          </div>

          <ProfileSection title="Thông tin cá nhân" items={PERSONAL} ctaLabel="Chỉnh sửa" />
          <ProfileSection title="Thông tin doanh nghiệp" items={BUSINESS} ctaLabel="Chỉnh sửa" />
          <ProfileSection title="Sở thích & Mặc định" items={PREFERENCES} ctaLabel="Chỉnh sửa" />
          <ProfileSection title="Bảo mật" items={SECURITY} ctaLabel="Quản lý" />
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Hồ sơ — Buyer Center" };
