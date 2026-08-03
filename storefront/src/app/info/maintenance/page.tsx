import type { Metadata } from "next";
import { getT } from "@/lib/t";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("maintenance.title") };
}

export default async function MaintenancePage() {
  const t = await getT();
  return (
    <main className="min-h-[62vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-[600px] w-full text-center bg-white border border-line rounded-xl shadow-sm px-6 py-14">
        <div className="text-[60px] leading-none mb-5" aria-hidden="true">
          🛠️
        </div>
        <h1 className="text-[22px] md:text-[26px] font-bold text-[#1f2937] mb-3">
          {t("maintenance.title")}
        </h1>
        <p className="text-[14px] md:text-[15px] text-[#6b7280] leading-relaxed">
          {t("maintenance.desc")}
        </p>
      </div>
    </main>
  );
}
