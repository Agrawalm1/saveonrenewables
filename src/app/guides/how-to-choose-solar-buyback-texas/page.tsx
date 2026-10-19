import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Choose a Texas Solar Buyback Plan 2026 | SaveOnRenewables",
  description:
    "Step-by-step guide to choosing a Texas solar buyback provider. Fixed vs variable rates, credit expiration rules, TDU coverage, and how to compare plans side-by-side.",
  openGraph: {
    title: "How to Choose a Texas Solar Buyback Plan 2026",
    description:
      "A practical framework for picking the right solar buyback provider in Texas. Covers fixed vs variable rates, credit rules, and the one number that matters most.",
    url: "https://saveonrenewables.com/guides/how-to-choose-solar-buyback-texas",
    type: "article",
  },
  alternates: {
    canonical: "https://saveonrenewables.com/guides/how-to-choose-solar-buyback-texas",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Choose a Texas Solar Buyback Plan",
  description:
    "Step-by-step guide to evaluating Texas solar buyback providers — fixed vs variable rates, credit rules, TDU coverage, and contract terms.",
  datePublished: "2026-10-18",
  dateModified: "2026-10-18",
  author: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
  publisher: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
};

const steps = [
  {
    n: "1",
    title: "Confirm your TDU territory",
    body: "Texas has four TDU territories: CenterPoint (Houston), Oncor (Dallas/Fort Worth), AEP Texas (West/South Texas), and Entergy Texas (Southeast Texas). Not all buyback plans are available in all territories. The first thing to check on any plan's EFL (Electricity Facts Label) is the list of TDUs it serves. Most major providers — Chariot, Almika, Octopus, TXU, Gexa — serve all four.",
  },
  {
    n: "2",
    title: "Understand fixed vs variable buyback rates",
    body: "A fixed buyback rate pays you the same credit per kWh regardless of market conditions — predictable, safe, best for long-term planning. A variable rate tracks ERCOT wholesale prices, which means higher earnings during summer afternoon peaks (2–7pm) but lower credits the rest of the year. Fixed is better for most homeowners; variable is better if you have a battery and can control when you export.",
  },
  {
    n: "3",
    title: "Compare buyback rate vs consumption rate together",
    body: "A high buyback rate on a plan with a high consumption rate can still be a net loss. You need to evaluate both numbers together. Ideally you want: a strong buyback rate (7¢+) AND a competitive consumption rate (below the market average for your area). The BestPwr market low shows you the cheapest consumption rate available right now — use that as your benchmark.",
  },
  {
    n: "4",
    title: "Check credit expiration and rollover rules",
    body: "This is where plans differ the most and where homeowners get surprised. Some plans let credits roll month-to-month indefinitely (Chariot's GreenVolt is the most popular example). Others cap annual credits at $1,000, expire unused credits each year, or require you to draw down credits within 12 months. Read the Terms of Service — specifically the section on 'excess generation credits' or 'solar credit expiration.'",
  },
  {
    n: "5",
    title: "Factor in contract length and early termination fees",
    body: "Fixed-rate plans require a term commitment — typically 12, 24, 36, or 60 months. Early termination fees usually run $100–$250, sometimes $15/remaining month. If you're planning to move, refinance, or upgrade your system in the next few years, a shorter term (12 months) gives you flexibility even if the longer term has a slightly better rate.",
  },
  {
    n: "6",
    title: "Calculate the dollar difference over your system's life",
    body: "Run the math. If your system exports 600 kWh/month: a plan paying 10¢ earns $60/month; a plan paying 5¢ earns $30/month. That's a $360/year difference, or $9,000 over a 25-year system life. Picking the right plan is one of the highest-leverage decisions a solar homeowner can make — worth 30 minutes of research.",
  },
];

export default function HowToChooseSolarBuybackPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main
        className="min-h-screen px-6 py-20"
        style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
      >
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 mb-8 flex items-center gap-1.5">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-emerald-600 transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-gray-600">How to Choose a Buyback Plan</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                Buying Guide
              </span>
              <span className="text-xs text-gray-400">5 min read &middot; Updated Oct 2026</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              How to Choose a Texas Solar Buyback Plan
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Choosing the right buyback provider can mean thousands of dollars difference over your
              system&apos;s lifetime. Here&apos;s the six-step framework we use to evaluate every plan.
            </p>
          </div>

          {/* Key insight callout */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8 text-sm text-emerald-800 leading-relaxed">
            <span className="font-semibold">The one number that matters most:</span> Multiply the
            buyback rate difference (in ¢/kWh) by your monthly export volume. A 5¢ difference on
            600 kWh/month = $360/year = $9,000 over 25 years. This dwarfs most other plan differences.
          </div>

          {/* Steps */}
          <section className="mb-10">
            <ol className="flex flex-col gap-5">
              {steps.map(({ n, title, body }) => (
                <li
                  key={n}
                  className="rounded-2xl p-6 flex gap-5"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.75)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                    {n}
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Quick comparison table */}
          <section
            className="rounded-3xl p-7 mb-8"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Fixed vs Variable: Quick Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-gray-500 font-semibold w-1/3"></th>
                    <th className="pb-3 text-emerald-700 font-semibold">Fixed Rate</th>
                    <th className="pb-3 text-blue-700 font-semibold">Variable Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["Predictability", "High — same rate every month", "Low — changes with ERCOT"],
                    ["Summer peak earnings", "Same as always", "Much higher (2–7pm peaks)"],
                    ["Best for", "Most homeowners", "Battery owners, flexible usage"],
                    ["Risk", "Rate locked at contract terms", "Can drop in shoulder months"],
                    ["Top example", "Chariot GreenVolt (7¢)", "Octopus Energy (ERCOT spot)"],
                  ].map(([label, fixed, variable]) => (
                    <tr key={label}>
                      <td className="py-2.5 text-gray-500 font-medium">{label}</td>
                      <td className="py-2.5 text-gray-700">{fixed}</td>
                      <td className="py-2.5 text-gray-700">{variable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link
              href="/buyback"
              className="flex-1 text-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-4 rounded-2xl text-sm shadow-md shadow-emerald-200 transition-colors"
            >
              Compare Live Buyback Rates &rarr;
            </Link>
            <Link
              href="/tools"
              className="flex-1 text-center border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 font-semibold px-6 py-4 rounded-2xl text-sm transition-colors"
            >
              Calculate My Solar Savings
            </Link>
          </div>

          {/* Internal links */}
          <div className="text-center text-sm text-gray-400 space-x-4">
            <Link href="/guides" className="hover:text-emerald-600 transition-colors">All Guides</Link>
            <span>&middot;</span>
            <Link href="/guides/solar-roi-texas" className="hover:text-emerald-600 transition-colors">Solar ROI Guide</Link>
            <span>&middot;</span>
            <Link href="/houston-solar-buyback-plans" className="hover:text-emerald-600 transition-colors">Houston Plans</Link>
          </div>
        </div>
      </main>
    </>
  );
}
