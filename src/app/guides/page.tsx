import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Texas Solar Guides — Free Resources | SaveOnRenewables",
  description:
    "Plain-language Texas solar guides. How to choose a buyback plan, understand your solar ROI, and compare CenterPoint vs Oncor territory — no sales pitch.",
  openGraph: {
    title: "Texas Solar Guides — Free Resources",
    description:
      "Honest, plain-language guides for Texas solar shoppers. Buyback plans, ROI math, and TDU territory comparisons.",
    url: "https://saveonrenewables.com/guides",
  },
};

const guides = [
  {
    href: "/guides/how-to-choose-solar-buyback-texas",
    badge: "Buying Guide",
    badgeColor: "bg-emerald-100 text-emerald-700",
    title: "How to Choose a Texas Solar Buyback Plan",
    desc: "A step-by-step framework for picking the right buyback provider — fixed vs variable, credit rules, TDU coverage, and the one number that matters most.",
    cta: "Read the Guide",
    time: "5 min read",
  },
  {
    href: "/guides/solar-roi-texas",
    badge: "Finance",
    badgeColor: "bg-blue-100 text-blue-700",
    title: "Solar ROI in Texas — How to Read Your Numbers",
    desc: "Payback period, 25-year savings, system cost — what these numbers actually mean, what assumptions drive them, and how to sanity-check any solar quote.",
    cta: "Read the Guide",
    time: "4 min read",
  },
  {
    href: "/guides/centerpoint-vs-oncor-solar",
    badge: "City Comparison",
    badgeColor: "bg-purple-100 text-purple-700",
    title: "CenterPoint vs Oncor: Houston vs Dallas Solar",
    desc: "Texas has four TDU territories and solar rules differ between them. Here's what changes between Houston (CenterPoint) and Dallas (Oncor) — and what stays the same.",
    cta: "Read the Guide",
    time: "4 min read",
  },
];

export default function GuidesPage() {
  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
            Guides &amp; Resources
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Texas Solar Guides
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Plain-language guides for Texas solar shoppers. Real information, no sales pitch.
          </p>
        </div>

        {/* Guide cards */}
        <div className="flex flex-col gap-5 mb-12">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group rounded-3xl p-7 flex flex-col gap-3 transition-transform hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.75)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${g.badgeColor}`}>
                  {g.badge}
                </span>
                <span className="text-xs text-gray-400">{g.time}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                {g.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p>
              <span className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 mt-1">
                {g.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom CTAs */}
        <div
          className="rounded-3xl p-7 text-center"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          <p className="text-sm text-gray-500 mb-4">Ready to run your own numbers?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-2xl text-sm shadow-md shadow-emerald-200 transition-colors"
            >
              Solar Savings Calculator &rarr;
            </Link>
            <Link
              href="/buyback"
              className="inline-block border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 font-semibold px-6 py-3 rounded-2xl text-sm transition-colors"
            >
              Compare Buyback Plans
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
