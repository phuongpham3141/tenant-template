import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopStrip } from "@/components/home/top-strip";
import { Header } from "@/components/home/header";
import { NavBar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AlibabaVN — Nền tảng sourcing hàng Trung Quốc",
  description:
    "Nền tảng B2B kết nối người mua Việt Nam với nhà sản xuất Trung Quốc. 2,400+ SKU từ 40+ nhà máy đã audit. Báo giá trực tiếp, không qua trung gian.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
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
