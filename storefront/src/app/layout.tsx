import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopStrip } from "@/components/home/top-strip";
import { Header } from "@/components/home/header";
import { NavBar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { StickyHeader } from "@/components/home/sticky-header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Cybersilkroads — Con đường tơ lụa trên không gian mạng",
  description:
    "Nền tảng B2B kết nối người mua Việt Nam với nhà sản xuất Trung Quốc. 2,400+ SKU từ 40+ nhà máy đã audit. Báo giá trực tiếp, không qua trung gian.",
  icons: {
    icon: [
      { url: "/logo/favicon-16.png?v=5", sizes: "16x16", type: "image/png" },
      { url: "/logo/favicon-32.png?v=5", sizes: "32x32", type: "image/png" },
      { url: "/logo/favicon-48.png?v=5", sizes: "48x48", type: "image/png" },
    ],
    apple: { url: "/logo/apple-touch-icon.png?v=5", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <StickyHeader />
        <TopStrip />
        <Header />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
