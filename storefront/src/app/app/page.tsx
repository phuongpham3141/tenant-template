import { Img } from "@/components/ui/img";
import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { getT } from "@/lib/t";

export default async function AppPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("app.crumb_home"), href: "/" }, { label: t("app.crumb_download") }]} />
      <div className="max-w-[1200px] mx-auto px-4 mt-6 mb-10">
        <div className="bg-paper border border-line rounded grid grid-cols-[1fr_360px] gap-7 p-7 max-md:grid-cols-1 max-md:p-5">
          <div className="flex flex-col justify-center">
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">{t("app.badge")}</span>
            <h1 className="text-[34px] font-extrabold text-ink leading-tight mb-3 max-md:text-[24px]">
              {t("app.hero_title_1")}<span className="text-brand">{t("app.hero_title_2")}</span>
            </h1>
            <p className="text-[14px] text-mute leading-relaxed mb-5 max-w-[520px]">
              {t("app.hero_desc")}
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-[420px] max-md:grid-cols-1">
              <a className="border border-line rounded p-3 flex items-center gap-3 bg-black text-white cursor-pointer hover:opacity-90">
                <span className="text-[28px]">🍎</span>
                <div>
                  <div className="text-[10px] opacity-80">{t("app.download_on")}</div>
                  <b className="block text-[15px]">App Store</b>
                </div>
              </a>
              <a className="border border-line rounded p-3 flex items-center gap-3 bg-black text-white cursor-pointer hover:opacity-90">
                <span className="text-[28px]">🤖</span>
                <div>
                  <div className="text-[10px] opacity-80">{t("app.download_on")}</div>
                  <b className="block text-[15px]">Google Play</b>
                </div>
              </a>
            </div>
            <div className="mt-5 pt-5 border-t border-line flex items-center gap-4 max-md:flex-col max-md:items-start">
              <div className="w-28 h-28 bg-paper border border-line rounded p-1.5 flex-shrink-0">
                <Img loading="lazy" decoding="async" src="/img/qrcode.jpg?v=6" alt={t("app.qr_alt")} className="w-full h-full object-cover rounded-sm" />
              </div>
              <div>
                <b className="block text-[13px] text-ink mb-1">{t("app.scan_title")}</b>
                <p className="text-[12px] text-mute leading-relaxed">{t("app.scan_desc")}</p>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-line">
              <b className="block text-[13px] text-ink mb-2">{t("app.features_title")}</b>
              <div className="grid grid-cols-2 gap-2 text-[12.5px] text-mute max-md:grid-cols-1">
                <span>{t("app.feature_rfq")}</span>
                <span>{t("app.feature_chat")}</span>
                <span>{t("app.feature_track")}</span>
                <span>{t("app.feature_alert")}</span>
                <span>{t("app.feature_sample")}</span>
                <span>{t("app.feature_history")}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <Img loading="lazy" decoding="async" src="/img/app-phone.jpg?v=6" alt={t("app.phone_alt")} className="w-full max-w-[320px] rounded-2xl shadow-[0_20px_60px_rgba(0,37,87,0.3)]" />
              <div className="absolute -top-3 -right-3 bg-gold text-brand-dark px-3 py-1.5 rounded-full text-[11px] font-bold rotate-12 shadow">
                +5% OFF
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {[
            { v: "60K+", l: "app.stat_downloads" },
            { v: "4.7 ★", l: "app.stat_rating" },
            { v: "32K+", l: "app.stat_rfq" },
          ].map((s) => (
            <div key={s.l} className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[26px] font-extrabold text-brand">{s.v}</b>
              <span className="text-[12px] text-mute">{t(s.l)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Download App — Huayuesc" };
