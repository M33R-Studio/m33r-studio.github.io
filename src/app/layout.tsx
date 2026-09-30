import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "M33R Studio",
  description: "Make Beauty. Remove Friction. M33R Studio のプロダクト、M33RA と CodeTap を紹介します。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <a href="#main-content" className="skip-link">本文へ移動</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
