/**
 * Sylvania (Feilo Sylvania) metadata — detail page.
 * A single brand meta shared across all product/solution lines.
 * Sourcing: sylvania-group.com — an international lighting group since 1901.
 */
export type SeriesMeta = {
  story: string; heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[]; careGuide: { title: string; desc: string }[];
  installation: string[]; certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[]; faq: { q: string; a: string }[];
};
const BRAND: SeriesMeta = {
  story:
    "Sylvania is one of the oldest and most respected lighting brands in the world, dating back to 1901. Today part of the Feilo Sylvania group (following its merger with Shanghai Feilo Acoustics), Sylvania combines Western lighting technology with a Chinese supply chain, offering a comprehensive portfolio: indoor & industrial LED luminaires, smart lighting (SylSmart), emergency lighting (LiFeSafe), and energy solutions (Power).",
  heritage:
    "Over 120 years of history, operating across multiple continents (Europe, the Americas, Asia, and Africa). The portfolio spans architectural, industrial, retail, office, and urban lighting segments.",
  technicalSpecs: [
    { label: "Brand", value: "Sylvania / Feilo Sylvania" },
    { label: "Founded", value: "1901 (over 120 years)" },
    { label: "Scope", value: "LED luminaires, smart lighting, emergency, energy" },
    { label: "Operations", value: "Multi-continent — Western technology + Chinese supply chain" },
  ],
  manufacturing: [
    "Feilo Sylvania international lighting group — multi-continent R&D + manufacturing network",
    "Some lines manufactured in Europe (e.g. OptiClip TERRA — Saint Etienne factory, France)",
    "Combines Western lighting technology with a Chinese supply chain (Feilo)",
    "The SylSmart digital platform is built on security-by-design principles",
  ],
  careGuide: [
    { title: "Maintenance", desc: "LED luminaires have a long lifespan and low maintenance; clean surfaces and inspect drivers periodically as recommended." },
    { title: "Smart systems", desc: "SylSmart is configured & monitored via the app/digital platform — remote updates, scheduling, and analytics." },
    { title: "Emergency", desc: "LiFeSafe offers Self-Test/DALI Self-Test functions that automatically check the battery & backup luminaire." },
  ],
  installation: [
    "Select the configuration by application (office, industrial, retail, emergency, etc.)",
    "Installed by a qualified electrician; proper driver & control wiring",
    "For smart systems: zoning, mesh pairing, and configuration via the app",
    "Lighting acceptance testing (illuminance, UGR glare control) to project standards",
  ],
  certifications: [
    "Compliant with European lighting standards (EN 60598-1, etc.)",
    "ISO 14644-1 cleanroom (LiteGuard line)",
    "Emergency per ISO7001 / BS3864 (LiFeSafe line)",
    "Quality management system to international group standards",
  ],
  packaging: [
    { label: "Supply format", value: "Project-based / by product line" },
    { label: "Solution", value: "Luminaires + smart controls + 360 Services" },
    { label: "Warranty", value: "Varies by line (e.g. OptiClip TERRA carries a 5-year warranty)" },
  ],
  whyChoose: [
    { icon: "💡", title: "120+ years of heritage", desc: "One of the oldest & most respected lighting brands in the world (since 1901)." },
    { icon: "🌍", title: "International", desc: "Western technology + Chinese supply chain (Feilo Sylvania)." },
    { icon: "🔗", title: "Ecosystem", desc: "From LED luminaires to smart lighting, emergency, and energy." },
  ],
  projectShowcase: ["Offices & commercial buildings", "Industrial & logistics", "Retail, hospitality & education", "Urban & outdoor lighting"],
  faq: [
    { q: "What are Sylvania and Feilo Sylvania?", a: "Sylvania is an international lighting brand dating to 1901; it is now part of the Feilo Sylvania group following its merger with Shanghai Feilo Acoustics." },
    { q: "Is it available in Vietnam?", a: "Contact Huayuesc for advice on the right supply plan & lighting project for your needs." },
    { q: "Does Sylvania offer smart lighting solutions?", a: "Yes — the SylSmart platform (Standalone/Connected/Connected Pro/Energy) plus 360 Services digital services." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
