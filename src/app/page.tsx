import Link from "next/link";
import GridPulse from "@/components/GridPulse";

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
          <Link
            href="/tools"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold px-10 py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-colors"
          >
            Calculate My Solar Savings →
          </Link>
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

        {/* BestPWR CTA */}
        <div className="text-center">
          <a
            href="https://www.bestpwr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-2xl border border-gray-200 transition-colors shadow-sm"
          >
            Compare Real-Time Texas Rates at bestpwr.com →
          </a>
        </div>
      </div>
    </main>
  );
}
