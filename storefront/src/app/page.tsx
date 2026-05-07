import { BannerSection } from "@/components/home/banner-section";
import { StatsBar } from "@/components/home/stats-bar";
import { ProductSection } from "@/components/home/product-section";
import { Factories } from "@/components/home/factories";
import { Zones } from "@/components/home/zones";
import { SECTIONS } from "@/data/home";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  return (
    <>
      <BannerSection />
      <StatsBar />
      {SECTIONS.map((s) => (
        <ProductSection key={s.id} section={s} allParams={sp} />
      ))}
      <Factories />
      <Zones />
    </>
  );
}
