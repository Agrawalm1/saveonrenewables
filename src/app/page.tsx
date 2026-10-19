import type { Metadata } from "next";
import Link from "next/link";
import GridPulse from "@/components/GridPulse";
import SolarAlertSignup from "@/components/SolarAlertSignup";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import FloatingCTA from "@/components/FloatingCTA";
import { cities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Houston Solar Advisor — Best Buyback Plans & Cheapest Rates | SaveOnRenewables",
  description:
    "Houston's free solar advisor. Compare 2026 Texas solar buyback plans, find the cheapest electricity rates in CenterPoint territory, and calculate your payback period in seconds.",
  openGraph: {
    title: "Houston Solar Advisor — Best Buyback Plans & Cheapest Rates",
    description:
      "Compare Texas solar buyback plans, find Houston's cheapest electricity rates, and see your 25-year solar savings — free, no pressure.",
    url: "https://saveonrenewables.com",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much do solar panels cost in Texas in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The average solar installation in Texas costs $2.00–$2.50 per watt before incentives. For a typical 10 kW system, that's $20,000–$25,000 gross. Through solar leases and PPAs, you can access equivalent savings with no upfront cost.",
      },
    },
    {
      "@type": "Question",
      name: "What is a solar buyback plan in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Texas is a deregulated energy market, so you choose your own electricity provider. Solar buyback plans credit your bill for excess energy your panels export to the grid. Choosing the right provider can mean thousands of dollars difference over your system's lifetime.",
      },
    },
    {
      "@type": "Question",
      name: "Is solar worth it in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Texas has some of the best solar conditions in the US, with 4.5–5.5 peak sun hours per day depending on your city. With ERCOT grid demand rising due to data center expansion, locking in solar savings now protects you from future rate increases.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take for solar to pay for itself in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The typical payback period in Texas is 7–10 years, depending on your electricity bill, system size, and which buyback plan you choose. With rising ERCOT rates, payback periods are getting shorter each year.",
      },
    },
    {
      "@type": "Question",
      name: "What happened to the 30% federal solar tax credit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 30% residential solar tax credit expired at the end of December 2025 for direct purchases. However, through Solar Leases and Power Purchase Agreements (PPAs), the installer claims the credit and passes the savings to you through a lower monthly rate.",
      },
    },
  ],
};

const sections = [
  {
    href: "/tools",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    title: "Solar Advisor",
    desc: "Enter your bill. See your payback period, system size, and 25-year savings in seconds.",
    cta: "Calculate My Savings",
  },
  {
    href: "/grid-pulse",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    title: "Grid Pulse",
    desc: "Live ERCOT load data. Understand why Texas rates spike — and how solar protects you.",
    cta: "View Grid Status",
  },
  {
    href: "/buyback",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Buyback Plans",
    desc: "Compare 2026 Texas solar buyback plans. Chariot GreenVolt vs. Almika and more.",
    cta: "Compare Plans",
  },
  {
    href: "/solar-credits",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    title: "Solar Credits",
    desc: "The 30% federal credit expired Dec 2025. Learn how Leases and PPAs still unlock savings.",
    cta: "Read the Update",
  },
];

export default function Home() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Texas Solar Advisor
          </span>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-5">
            Is Solar Worth It in Texas?
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
            A high-trust, simple advisor for Texas solar shoppers. Real data. No pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold px-10 py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-colors"
            >
              Calculate My Solar Savings →
            </Link>
            <Link
              href="/quiz"
              className="inline-block border-2 border-emerald-400 text-emerald-700 hover:border-emerald-600 hover:bg-emerald-50 text-lg font-semibold px-8 py-4 rounded-2xl transition-colors"
            >
              Not sure? Take the quiz
            </Link>
          </div>
        </div>

        {/* Grid Pulse widget */}
        <div className="mb-12">
          <GridPulse />
        </div>

        {/* Social proof */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "5.5hrs", label: "Peak sun hours in W. Texas" },
              { value: "7–10yr", label: "Typical Texas payback" },
              { value: "$200+", label: "Avg monthly bill savings" },
              { value: "6", label: "Buyback plans compared" },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-2xl p-4 text-center bg-emerald-50">
                <p className="text-2xl font-black text-emerald-600 mb-1">{value}</p>
                <p className="text-xs text-gray-500 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-3xl p-7 flex flex-col gap-3 transition-transform hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">{s.icon}</div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">{s.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
              <span className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 mt-auto">
                {s.cta} →
              </span>
            </Link>
          ))}
        </div>

        {/* Lead Capture */}
        <div className="mb-12">
          <LeadCaptureForm />
        </div>

        {/* Browse by City */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 text-center mb-4">
            Solar savings by Texas city
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="px-4 py-2 rounded-full border border-gray-200 bg-white/70 text-sm text-gray-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors backdrop-blur-sm"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>

      </div>

      <SolarAlertSignup />
      <FloatingCTA />
    </main>
    </>
  );
}
