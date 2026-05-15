import { BannerSection } from "@/components/home/banner-section";
import { StatsBar } from "@/components/home/stats-bar";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { ProductSection } from "@/components/home/product-section";
import { Factories } from "@/components/home/factories";
import { Zones } from "@/components/home/zones";
import { SourcingSolutions } from "@/components/home/sourcing-solutions";
import { TradeShowsSection } from "@/components/home/trade-shows-section";
import { SECTIONS } from "@/data/home";

export default function Home() {
  return (
    <>
      <BannerSection />
      <StatsBar />
      <CategoryShowcase />
      {SECTIONS.map((s) => (
        <ProductSection key={s.id} section={s} />
      ))}
      <SourcingSolutions />
      <Factories />
      <TradeShowsSection />
      <Zones />
    </>
  );
}
