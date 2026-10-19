import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solar ROI in Texas — How to Read Your Numbers 2026 | SaveOnRenewables",
  description:
    "What payback period, 25-year savings, and system cost actually mean for Texas solar in 2026. How to sanity-check any solar quote using real ERCOT rate data.",
  openGraph: {
    title: "Solar ROI in Texas — How to Read Your Numbers 2026",
    description:
      "Plain-language breakdown of solar ROI math for Texas homeowners. Payback period, 25-year savings, and how to spot an unrealistic quote.",
    url: "https://saveonrenewables.com/guides/solar-roi-texas",
    type: "article",
  },
  alternates: {
    canonical: "https://saveonrenewables.com/guides/solar-roi-texas",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Solar ROI in Texas — How to Read Your Numbers",
  description:
    "Plain-language guide to interpreting solar ROI for Texas homeowners — payback period, 25-year savings, and how to verify a solar quote.",
  datePublished: "2026-10-18",
  dateModified: "2026-10-18",
  author: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
  publisher: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
};

const metrics = [
  {
    term: "Payback Period",
    plain: "How many years until the system pays for itself",
    texas: "7–10 years for a typical Texas home (direct purchase, no federal credit in 2026)",
    watch: "Be skeptical of claims under 6 years unless your bill is very high or you're using a lease/PPA.",
  },
  {
    term: "25-Year Savings",
    plain: "Total electricity costs avoided over the system's lifetime, minus what you paid for it",
    texas: "$30,000–$60,000 range for a $200–$300/month Houston bill",
    watch: "This number assumes rates keep rising ~3% per year. If rates stay flat, it's lower. If they rise faster (likely), it's higher.",
  },
  {
    term: "System Size (kW)",
    plain: "How many kilowatts of panels are needed to offset your usage",
    texas: "A $200/month Houston bill at current rates needs roughly a 7–9 kW system",
    watch: "Oversizing your system beyond your usage doesn't help unless your buyback plan credits generously — otherwise excess generation earns very little.",
  },
  {
    term: "Gross vs Net Cost",
    plain: "Gross = sticker price. Net = after any credits or incentives.",
    texas: "In 2026, the 30% federal residential credit expired for direct purchases. Net cost = gross cost unless using a lease/PPA where the installer claims the credit.",
    watch: "Any quote showing a '30% federal credit' for a direct purchase in 2026 is using outdated assumptions.",
  },
];

export default function SolarRoiTexasPage() {
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
            <span className="text-gray-600">Solar ROI in Texas</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                Finance
              </span>
              <span className="text-xs text-gray-400">4 min read &middot; Updated Oct 2026</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Solar ROI in Texas — How to Read Your Numbers
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Every solar quote comes with a set of numbers — payback period, 25-year savings,
              system cost. Here&apos;s what they actually mean, what assumptions drive them, and
              how to quickly spot an unrealistic estimate.
            </p>
          </div>

          {/* The core formula */}
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
            <h2 className="text-xl font-bold text-gray-900 mb-3">The Core Formula</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              All solar ROI math flows from one simple equation:
            </p>
            <div className="bg-gray-50 rounded-2xl p-4 text-center font-mono text-sm text-gray-800 mb-4">
              Payback Period = System Cost &divide; Annual Electricity Savings
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your &quot;annual electricity savings&quot; is the total value of electricity your panels
              produce — both what you consume directly (avoided bill) and what you export back
              (buyback credits). The buyback rate you choose directly affects this number, which
              is why choosing the right plan matters so much.
            </p>
          </section>

          {/* Key metrics */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">The Four Numbers in Every Quote</h2>
            <div className="flex flex-col gap-4">
              {metrics.map((m) => (
                <div
                  key={m.term}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.75)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <h3 className="text-base font-bold text-gray-900 mb-1">{m.term}</h3>
                  <p className="text-sm text-gray-500 mb-2 italic">{m.plain}</p>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    <span className="font-semibold">In Texas:</span> {m.texas}
                  </p>
                  <p className="text-xs text-amber-700 bg-amber-50 rounded-xl px-3 py-2 leading-relaxed">
                    <span className="font-semibold">Watch for:</span> {m.watch}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What drives the numbers */}
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">The Three Assumptions That Move Everything</h2>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                <span className="font-semibold text-gray-800">1. Your electricity rate.</span> Our
                calculator uses live rate data from PowerToChoose. Many installer quotes use a
                flat assumption (often 12–14¢). If your actual rate is lower, your payback is
                longer. Check your current bill.
              </p>
              <p>
                <span className="font-semibold text-gray-800">2. Annual rate escalation.</span>{" "}
                Most 25-year savings projections assume rates rise 2–4% per year. ERCOT rates have
                historically been more volatile than this — with spikes and drops. Conservative
                estimates use 2%; realistic Texas estimates use 3–4%.
              </p>
              <p>
                <span className="font-semibold text-gray-800">3. System degradation.</span> Solar
                panels lose roughly 0.5% efficiency per year. Over 25 years, your system produces
                about 88% of its year-1 output in year 25. Good quotes account for this; some don&apos;t.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link
              href="/tools"
              className="flex-1 text-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-4 rounded-2xl text-sm shadow-md shadow-emerald-200 transition-colors"
            >
              Run My Numbers &rarr;
            </Link>
            <Link
              href="/buyback"
              className="flex-1 text-center border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 font-semibold px-6 py-4 rounded-2xl text-sm transition-colors"
            >
              Compare Buyback Plans
            </Link>
          </div>

          {/* Internal links */}
          <div className="text-center text-sm text-gray-400 space-x-4">
            <Link href="/guides" className="hover:text-emerald-600 transition-colors">All Guides</Link>
            <span>&middot;</span>
            <Link href="/guides/how-to-choose-solar-buyback-texas" className="hover:text-emerald-600 transition-colors">How to Choose a Buyback Plan</Link>
            <span>&middot;</span>
            <Link href="/solar-credits" className="hover:text-emerald-600 transition-colors">2026 Tax Credit Update</Link>
          </div>
        </div>
      </main>
    </>
  );
}
