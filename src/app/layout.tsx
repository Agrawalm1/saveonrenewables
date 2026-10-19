import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saveonrenewables.com"),
  title: {
    default: "Save on Renewables — Houston Solar Advisor & Buyback Plans",
    template: "%s | SaveOnRenewables",
  },
  description:
    "Houston's trusted solar advisor. Compare Texas solar buyback plans, find the cheapest electricity rates, and calculate your payback period — free, no pressure.",
  keywords: [
    "Houston solar buyback plans",
    "best solar buyback Texas 2026",
    "CenterPoint solar rate comparison",
    "cheapest electricity rates Houston",
    "Texas solar advisor",
    "solar savings calculator Texas",
    "ERCOT solar buyback",
  ],
  openGraph: {
    type: "website",
    siteName: "Save on Renewables",
    title: "Houston Solar Advisor — Best Buyback Plans & Cheapest Rates",
    description:
      "Compare Texas solar buyback plans, find the cheapest Houston electricity rates, and calculate your system payback — free tool, real data, no pressure.",
    url: "https://saveonrenewables.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Houston Solar Advisor — Best Buyback Plans & Cheapest Rates",
    description:
      "Free Houston solar savings calculator. Compare buyback rates, find the market low, and see your 25-year savings in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
