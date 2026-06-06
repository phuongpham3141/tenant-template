import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopStrip } from "@/components/home/top-strip";
import { Header } from "@/components/home/header";
import { NavBar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { StickyHeader } from "@/components/home/sticky-header";
import { getLocale, getT } from "@/lib/t";
import { getMessages } from "@/messages";
import { I18nProvider } from "@/components/i18n-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
  title: t("meta.title"),
  description: t("meta.desc"),
  icons: {
    icon: [
      { url: "/logo/favicon-16.png?v=6", sizes: "16x16", type: "image/png" },
      { url: "/logo/favicon-32.png?v=6", sizes: "32x32", type: "image/png" },
      { url: "/logo/favicon-48.png?v=6", sizes: "48x48", type: "image/png" },
    ],
    apple: { url: "/logo/apple-touch-icon.png?v=6", sizes: "180x180" },
  },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = getMessages(locale);
  return (
    <html lang={locale} className={`${inter.variable} antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <I18nProvider messages={messages} locale={locale}>
        <StickyHeader />
        <TopStrip />
        <Header />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
        </I18nProvider>
      </body>
    </html>
  );
}
