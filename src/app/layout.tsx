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
  title: "Save on Renewables — Your Texas Solar Advisor",
  description: "Find out how much you could save by switching to solar in Texas.",
  openGraph: {
    type: "website",
    siteName: "Save on Renewables",
    title: "Texas Solar Advisor — Is Solar Right for Your Home?",
    description:
      "Free Texas solar savings calculator. Enter your bill and ZIP — see your system size, payback period, and 25-year savings in seconds.",
    url: "https://saveonrenewables.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Texas Solar Advisor — Is Solar Right for Your Home?",
    description:
      "Free Texas solar savings calculator for Texas homeowners. Real data. No pressure.",
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
