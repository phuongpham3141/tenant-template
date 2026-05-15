import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/blog";

const BASE_URL = "https://cybersilkroads.com";

type Priority = 0.3 | 0.5 | 0.7 | 0.8 | 0.9 | 1.0;
type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

function entry(path: string, priority: Priority, changeFrequency: ChangeFreq): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homepage: MetadataRoute.Sitemap = [entry("/", 1.0, "daily")];

  const primary: MetadataRoute.Sitemap = [
    entry("/products", 0.9, "daily"),
    entry("/buying-request", 0.9, "weekly"),
    entry("/sell-on-csr", 0.9, "weekly"),
    entry("/suppliers", 0.8, "weekly"),
    entry("/zones", 0.8, "weekly"),
    entry("/trade-shows", 0.8, "weekly"),
    entry("/factory-tour", 0.7, "monthly"),
    entry("/industry-channels", 0.7, "weekly"),
    entry("/trade-alert", 0.7, "weekly"),
    entry("/help", 0.7, "weekly"),
    entry("/sitemap", 0.5, "monthly"),
  ];

  const search: MetadataRoute.Sitemap = [
    entry("/search", 0.7, "weekly"),
    entry("/search/by-image", 0.6, "monthly"),
  ];

  const auth: MetadataRoute.Sitemap = [
    entry("/login", 0.5, "yearly"),
    entry("/register/buyer", 0.7, "monthly"),
    entry("/register/dealer", 0.6, "monthly"),
    entry("/register/factory", 0.7, "monthly"),
    entry("/app", 0.5, "monthly"),
  ];

  const info: MetadataRoute.Sitemap = [
    entry("/info/about-us", 0.8, "monthly"),
    entry("/info/careers", 0.7, "weekly"),
    entry("/info/contact", 0.8, "monthly"),
    entry("/info/network", 0.8, "monthly"),
    entry("/info/audit-process", 0.8, "monthly"),
    entry("/info/trade-assurance", 0.8, "monthly"),
    entry("/info/disputes", 0.8, "monthly"),
    entry("/info/sample-orders", 0.8, "monthly"),
    entry("/info/import-guide", 0.8, "monthly"),
    entry("/info/shipping-policy", 0.8, "monthly"),
    entry("/info/ddp-calculator", 0.8, "monthly"),
    entry("/info/order-tracking", 0.7, "monthly"),
    entry("/info/payment-protection", 0.7, "monthly"),
    entry("/info/find-products", 0.7, "monthly"),
    entry("/info/api-integration", 0.7, "monthly"),
    entry("/info/market-reports", 0.7, "weekly"),
    entry("/info/industry-news", 0.8, "daily"),
    entry("/info/terms-of-service", 0.5, "yearly"),
    entry("/info/privacy-policy", 0.5, "yearly"),
  ];

  const blog: MetadataRoute.Sitemap = ARTICLES.map((a) =>
    entry(`/info/industry-news/${a.slug}`, 0.7, "monthly"),
  );

  const buyerCenter: MetadataRoute.Sitemap = [
    entry("/buyer-center", 0.5, "weekly"),
    entry("/buyer-center/orders", 0.5, "weekly"),
    entry("/buyer-center/favorites", 0.4, "weekly"),
    entry("/buyer-center/audited-reports", 0.4, "monthly"),
    entry("/buyer-center/browsing-history", 0.3, "weekly"),
    entry("/buyer-center/contact", 0.4, "monthly"),
    entry("/buyer-center/meet-suppliers", 0.5, "monthly"),
    entry("/buyer-center/new-user-guide", 0.7, "monthly"),
    entry("/buyer-center/post-rfq", 0.7, "weekly"),
    entry("/buyer-center/product-directory", 0.5, "weekly"),
    entry("/buyer-center/secured-trading", 0.6, "monthly"),
    entry("/buyer-center/supplier-discover", 0.6, "weekly"),
  ];

  const sellerCenter: MetadataRoute.Sitemap = [
    entry("/seller-center", 0.5, "weekly"),
    entry("/seller-center/ai-assistant", 0.5, "monthly"),
    entry("/seller-center/domestic-cn", 0.5, "monthly"),
    entry("/seller-center/export-na", 0.5, "monthly"),
    entry("/seller-center/gold-member", 0.5, "monthly"),
    entry("/seller-center/logistics", 0.5, "monthly"),
    entry("/seller-center/smart-expo", 0.5, "monthly"),
    entry("/seller-center/trade-ehome", 0.5, "monthly"),
    entry("/seller-center/trade-services", 0.5, "monthly"),
    entry("/seller-center/trading-service", 0.5, "monthly"),
  ];

  return [
    ...homepage,
    ...primary,
    ...search,
    ...auth,
    ...info,
    ...blog,
    ...buyerCenter,
    ...sellerCenter,
  ];
}
