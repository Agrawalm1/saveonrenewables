import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CenterPoint vs Oncor Solar: Houston vs Dallas Compared 2026 | SaveOnRenewables",
  description:
    "How solar works differently in Houston (CenterPoint) vs Dallas (Oncor). TDU fees, bidirectional meter process, peak sun hours, and which buyback plans are available in each territory.",
  openGraph: {
    title: "CenterPoint vs Oncor Solar: Houston vs Dallas Compared 2026",
    description:
      "Side-by-side solar comparison between Houston's CenterPoint territory and Dallas's Oncor territory — TDU fees, sun hours, meter setup, and available buyback plans.",
    url: "https://saveonrenewables.com/guides/centerpoint-vs-oncor-solar",
    type: "article",
  },
  alternates: {
    canonical: "https://saveonrenewables.com/guides/centerpoint-vs-oncor-solar",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CenterPoint vs Oncor: Solar in Houston vs Dallas",
  description:
    "Comparison of solar conditions, TDU fees, and buyback availability between Houston (CenterPoint) and Dallas (Oncor) territories in Texas.",
  datePublished: "2026-10-18",
  dateModified: "2026-10-18",
  author: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
  publisher: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
};

const rows = [
  { label: "Territory",           centerpoint: "Harris County + surrounding areas", oncor: "Dallas/Fort Worth + most of North Texas" },
  { label: "Peak sun hours/day",  centerpoint: "5.2 hrs (Houston avg)", oncor: "4.8 hrs (DFW avg)" },
  { label: "Annual solar output", centerpoint: "~1,900 kWh/kW installed", oncor: "~1,750 kWh/kW installed" },
  { label: "TDU delivery charge", centerpoint: "~$0.047/kWh + $4.39/mo base", oncor: "~$0.038/kWh + $3.42/mo base" },
  { label: "Bidirectional meter", centerpoint: "Installed by your REP (no extra charge)", oncor: "Installed by your REP (no extra charge)" },
  { label: "Meter upgrade time",  centerpoint: "2–6 weeks after REP request", oncor: "2–4 weeks after REP request" },
  { label: "Buyback plan options",centerpoint: "All 6 major providers available", oncor: "All 6 major providers available" },
  { label: "Best fixed rate",     centerpoint: "Almika 10¢ or Chariot 7¢", oncor: "Same — both serve all TDUs" },
];

export default function CenterpointVsOncorPage() {
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
            <span className="text-gray-600">CenterPoint vs Oncor Solar</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                City Comparison
              </span>
              <span className="text-xs text-gray-400">4 min read &middot; Updated Oct 2026</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              CenterPoint vs Oncor:<br />Houston vs Dallas Solar
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Texas has four TDU territories and your TDU affects your solar experience — delivery
              fees, meter setup timelines, and how buyback credits interact with your bill.
              Here&apos;s how Houston and Dallas compare.
            </p>
          </div>

          {/* What is a TDU */}
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
            <h2 className="text-xl font-bold text-gray-900 mb-3">What is a TDU and why does it matter?</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              In Texas&apos;s deregulated energy market, the <strong>TDU (Transmission and Distribution
              Utility)</strong> owns the poles, wires, and meters but does <em>not</em> sell electricity.
              CenterPoint serves Houston; Oncor serves Dallas/Fort Worth. They maintain the grid and
              set the physical infrastructure — but your buyback plan and electricity rate come from
              your chosen REP (Retail Electricity Provider).
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              This matters for solar because: (1) TDU delivery charges appear on your bill regardless
              of which REP you choose, (2) TDUs handle bidirectional meter installation after your
              REP submits the paperwork, and (3) TDU fees slightly affect your net savings calculation.
            </p>
          </section>

          {/* Comparison table */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Side-by-Side Comparison</h2>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.75)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="grid grid-cols-3 bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500 px-5 py-3 gap-4">
                <span></span>
                <span className="text-emerald-700">CenterPoint (Houston)</span>
                <span className="text-blue-700">Oncor (Dallas)</span>
              </div>
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 gap-4 px-5 py-4 text-sm ${i < rows.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span className="font-medium text-gray-700">{row.label}</span>
                  <span className="text-gray-600">{row.centerpoint}</span>
                  <span className="text-gray-600">{row.oncor}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Key differences */}
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">The Practical Differences</h2>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                <span className="font-semibold text-gray-800">Sun hours favor Houston.</span> With
                5.2 peak sun hours vs Dallas&apos;s 4.8, a Houston system produces roughly 8% more
                electricity per installed kW. This translates directly into a shorter payback period
                — typically 6–9 months faster for the same system size.
              </p>
              <p>
                <span className="font-semibold text-gray-800">TDU delivery charges differ.</span>{" "}
                CenterPoint&apos;s delivery charge (~4.7¢/kWh) is slightly higher than Oncor&apos;s
                (~3.8¢/kWh). This shows up as a fixed line item on your bill that isn&apos;t offset
                by solar credits — it&apos;s what you pay for grid access regardless of usage. Both
                are reasonable and in line with national averages.
              </p>
              <p>
                <span className="font-semibold text-gray-800">Buyback plan availability is identical.</span>{" "}
                All major Texas buyback providers — Chariot, Almika, TXU, Octopus, Gexa, and Pulse
                Power — serve both CenterPoint and Oncor territories. You&apos;re not at a disadvantage
                for being in Dallas vs Houston when it comes to provider choice.
              </p>
              <p>
                <span className="font-semibold text-gray-800">Meter installation is similar.</span>{" "}
                Both TDUs process bidirectional meter upgrades through your REP. The process is
                roughly 2–6 weeks in CenterPoint territory, 2–4 weeks in Oncor territory. Neither
                charges you directly for this — costs are bundled into TDU pass-through charges.
              </p>
            </div>
          </section>

          {/* Bottom line */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-sm text-emerald-800 leading-relaxed mb-8">
            <span className="font-semibold">Bottom line:</span> Houston has a slight solar production
            advantage due to more sun hours, and CenterPoint territory has strong coverage from all
            major buyback providers. Dallas/Oncor is nearly equivalent for plan choice but produces
            a bit less energy per panel. In both cities, <strong>choosing the right buyback plan
            matters far more than which TDU territory you&apos;re in.</strong>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link
              href="/houston-solar-buyback-plans"
              className="flex-1 text-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-4 rounded-2xl text-sm shadow-md shadow-emerald-200 transition-colors"
            >
              Houston Buyback Plans &rarr;
            </Link>
            <Link
              href="/dallas-solar-buyback-plans"
              className="flex-1 text-center border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 font-semibold px-6 py-4 rounded-2xl text-sm transition-colors"
            >
              Dallas Buyback Plans &rarr;
            </Link>
          </div>

          <div className="text-center text-sm text-gray-400 space-x-4">
            <Link href="/guides" className="hover:text-emerald-600 transition-colors">All Guides</Link>
            <span>&middot;</span>
            <Link href="/buyback" className="hover:text-emerald-600 transition-colors">Live Buyback Rates</Link>
            <span>&middot;</span>
            <Link href="/tools" className="hover:text-emerald-600 transition-colors">Solar Calculator</Link>
          </div>
        </div>
      </main>
    </>
  );
}
