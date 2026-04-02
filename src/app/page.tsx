import Link from "next/link";
import GridPulse from "@/components/GridPulse";
import SolarAlertSignup from "@/components/SolarAlertSignup";
import { cities } from "@/lib/cities";

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
    icon: "☀️",
    title: "Solar Advisor",
    desc: "Enter your bill. See your payback period, system size, and 25-year savings in seconds.",
    cta: "Calculate My Savings",
  },
  {
    href: "/grid-pulse",
    icon: "⚡",
    title: "Grid Pulse",
    desc: "Live ERCOT load data. Understand why Texas rates spike — and how solar protects you.",
    cta: "View Grid Status",
  },
  {
    href: "/buyback",
    icon: "💰",
    title: "Buyback Plans",
    desc: "Compare 2026 Texas solar buyback plans. Chariot GreenVolt vs. Tesla Electric and more.",
    cta: "Compare Plans",
  },
  {
    href: "/solar-credits",
    icon: "📋",
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
            Texas Solar Advisor · 2026
          </span>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-5">
            Save on Renewables
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
              className="inline-block border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 text-lg font-semibold px-8 py-4 rounded-2xl transition-colors"
            >
              Not sure? Take the quiz
            </Link>
          </div>
        </div>

        {/* Grid Pulse widget */}
        <div className="mb-12">
          <GridPulse />
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
              <div className="text-3xl">{s.icon}</div>
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
    </main>
    </>
  );
}
