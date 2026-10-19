import type { Metadata } from "next";
import Link from "next/link";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { resolveAffiliateUrl } from "@/config/affiliates";

export const metadata: Metadata = {
  title: "Best Austin Solar Buyback Plans 2026 | SaveOnRenewables",
  description:
    "Solar buyback in Austin works differently than the rest of Texas. Central Austin uses Austin Energy (municipal). Suburbs use Oncor. Here's what each option pays — updated Oct 2026.",
  openGraph: {
    title: "Best Austin Solar Buyback Plans 2026",
    description:
      "Austin solar buyback guide — Austin Energy Value of Solar tariff vs Oncor territory REP plans. Which option pays more for your excess solar energy?",
    url: "https://saveonrenewables.com/austin-solar-buyback-plans",
    type: "article",
    siteName: "Save on Renewables",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Austin Solar Buyback Plans 2026",
    description: "Austin Energy vs Oncor solar buyback — which pays more for your excess solar?",
  },
  alternates: {
    canonical: "https://saveonrenewables.com/austin-solar-buyback-plans",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Austin Solar Buyback Plans 2026",
  description: "Guide to solar buyback in Austin, TX — Austin Energy Value of Solar tariff vs Oncor territory deregulated REP plans.",
  datePublished: "2026-10-18",
  dateModified: "2026-10-18",
  author: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
  publisher: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://saveonrenewables.com/austin-solar-buyback-plans" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Austin Energy in the deregulated Texas energy market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Central Austin is served by Austin Energy, a municipally-owned utility that is not part of Texas's deregulated ERCOT retail market. Austin Energy customers cannot switch retail electricity providers — you're on Austin Energy's rates and buyback program by default.",
      },
    },
    {
      "@type": "Question",
      name: "What does Austin Energy pay for solar buyback?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Austin Energy uses a Value of Solar (VOS) tariff rather than a traditional net metering credit. The VOS rate is set annually and reflects the value of solar to the grid. As of 2026, it is approximately 7–8¢/kWh — competitive with most deregulated REP plans.",
      },
    },
    {
      "@type": "Question",
      name: "Can Austin suburbs choose their own solar buyback plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Suburbs including Round Rock, Cedar Park, Pflugerville, Kyle, Buda, Leander, and Georgetown are in Oncor territory and part of Texas's deregulated market. Those homeowners can choose from all major buyback providers — Chariot, Almika, TXU, Octopus, and others.",
      },
    },
  ],
};

const oncorPlans = [
  {
    planId: "almika-60-plus",
    url: "https://almikasolar.net",
    provider: "Almika Energy",
    plan: "60 Energy Plus",
    buybackRate: "10.0¢/kWh",
    rateType: "Fixed",
    term: "60 months",
    highlight: "Highest fixed rate in Texas",
    badge: "Top Rate",
    badgeColor: "bg-orange-500 text-white",
  },
  {
    planId: "chariot-greenvolt",
    url: "https://chariotenergy.com/solar-buyback/",
    provider: "Chariot Energy",
    plan: "GreenVolt Buyback",
    buybackRate: "7.0¢/kWh",
    rateType: "Fixed",
    term: "12–36 months",
    highlight: "Most popular in Texas",
    badge: "Most Popular",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    planId: "txu-solar-match",
    url: "https://www.txu.com/electricity-plans/home-solar-buyback",
    provider: "TXU Energy",
    plan: "Solar Buyback Match",
    buybackRate: "~7.6¢/kWh",
    rateType: "Fixed",
    term: "12–36 months",
    highlight: "1:1 retail rate match",
    badge: "1:1 Match",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    planId: "octopus-solar",
    url: "https://octopusenergy.com/solar",
    provider: "Octopus Energy",
    plan: "Solar Buyback (all plans)",
    buybackRate: "Variable (ERCOT spot)",
    rateType: "Variable",
    term: "Month-to-month",
    highlight: "Earns most during 2–7pm peaks",
    badge: "Real-Time",
    badgeColor: "bg-purple-100 text-purple-700",
  },
];

export default function AustinSolarBuybackPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main
        className="min-h-screen px-6 py-20"
        style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
      >
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 mb-8 flex items-center gap-1.5">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/buyback" className="hover:text-emerald-600 transition-colors">Buyback Plans</Link>
            <span>/</span>
            <span className="text-gray-600">Austin</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              Austin Energy + Oncor Territory &middot; Updated Oct 2026
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Best Austin Solar Buyback Plans 2026
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-6">
              Austin is unique in Texas — central Austin uses Austin Energy (a municipal utility),
              while the suburbs are in Oncor&apos;s deregulated territory. Your solar options depend
              on which side of the city limits you&apos;re on.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/buyback" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-md shadow-emerald-200 transition-colors">
                See Live Rates &rarr;
              </Link>
              <a
                href="https://bestpwr.com?utm_source=saveonrenewables&utm_medium=referral&utm_campaign=austin_seo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 text-sm font-semibold px-6 py-3 rounded-2xl transition-colors"
              >
                Compare Electricity Rates at BestPwr
              </a>
            </div>
          </div>

          {/* Austin Energy section */}
          <section className="rounded-3xl p-7 mb-8 ring-2 ring-blue-200" style={{ background: "rgba(240,249,255,0.8)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 4px 30px rgba(59,130,246,0.08)" }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                Central Austin
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Austin Energy — Value of Solar Program</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              If you live inside Austin city limits, you&apos;re served by <strong>Austin Energy</strong> —
              a municipally-owned utility that is <em>not</em> part of Texas&apos;s deregulated market.
              You cannot choose a different REP. Austin Energy uses a <strong>Value of Solar (VOS)
              tariff</strong> instead of traditional net metering.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {[
                { stat: "~7–8¢", label: "VOS buyback rate (set annually)" },
                { stat: "5.1 hrs", label: "Peak sun hours/day (Austin)" },
                { stat: "No", label: "Can't switch REPs in city limits" },
              ].map(({ stat, label }) => (
                <div key={label} className="bg-white/70 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-blue-600 mb-1">{stat}</p>
                  <p className="text-xs text-gray-500 leading-snug">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              The VOS rate is recalculated each year based on the value solar provides to the grid
              (capacity, energy, environmental). It&apos;s typically competitive with deregulated
              plans — around 7–8¢/kWh in 2026. Credits offset your Austin Energy bill; excess
              credits expire annually.
            </p>
          </section>

          {/* Oncor suburbs section */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                Austin Suburbs (Oncor Territory)
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Deregulated REP Plans</h2>
            <p className="text-sm text-gray-500 mb-4">
              Round Rock, Cedar Park, Pflugerville, Kyle, Buda, Leander, Georgetown, and most other
              Austin suburbs are in Oncor territory and can choose from all major Texas buyback providers.
            </p>
            <div className="flex flex-col gap-4">
              {oncorPlans.map((p) => (
                <div
                  key={p.provider}
                  className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                  style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.75)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${p.badgeColor}`}>{p.badge}</span>
                      <span className="text-xs text-gray-400">{p.rateType} &middot; {p.term}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{p.provider}</p>
                    <p className="text-xs text-gray-500">{p.plan} &mdash; {p.highlight}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-2xl font-black text-emerald-600 leading-none">{p.buybackRate}</p>
                      <p className="text-xs text-gray-400 mt-0.5">buyback credit</p>
                    </div>
                    <a
                      href={resolveAffiliateUrl(p.planId, p.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-emerald-200 whitespace-nowrap"
                    >
                      View Plan &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-4">
              {[
                { q: "Is Austin Energy in the deregulated Texas energy market?", a: "No. Central Austin is served by Austin Energy, a municipally-owned utility not part of Texas's deregulated market. Austin Energy customers cannot switch retail providers — you're on Austin Energy's rates and buyback program by default." },
                { q: "What does Austin Energy pay for solar buyback?", a: "Austin Energy uses a Value of Solar (VOS) tariff set annually. As of 2026, it's approximately 7–8¢/kWh — competitive with most deregulated plans. Credits offset your bill; unused credits expire annually." },
                { q: "How do I know if I'm in Austin Energy or Oncor territory?", a: "Check your current electric bill — it will show either Austin Energy or an Oncor-based REP. Alternatively, your ZIP code is the fastest indicator: 78701–78799 (Austin proper) is mostly Austin Energy. Suburbs like 78664 (Round Rock), 78613 (Cedar Park), and 78660 (Pflugerville) are Oncor territory." },
                { q: "Can Austin suburbs choose their own solar buyback plan?", a: "Yes. Suburbs in Oncor territory (Round Rock, Cedar Park, Pflugerville, Kyle, Buda, Leander, Georgetown) can choose from all major Texas buyback providers — Chariot, Almika, TXU, Octopus, and others." },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 2px 15px rgba(0,0,0,0.04)" }}>
                  <p className="text-sm font-semibold text-gray-800 mb-2">{q}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <LeadCaptureForm />
          </section>

          <div className="text-center text-sm text-gray-400 space-x-4">
            <Link href="/buyback" className="hover:text-emerald-600 transition-colors">Live Buyback Rates</Link>
            <span>&middot;</span>
            <Link href="/tools" className="hover:text-emerald-600 transition-colors">Solar Calculator</Link>
            <span>&middot;</span>
            <Link href="/dallas-solar-buyback-plans" className="hover:text-emerald-600 transition-colors">Dallas Plans</Link>
            <span>&middot;</span>
            <Link href="/houston-solar-buyback-plans" className="hover:text-emerald-600 transition-colors">Houston Plans</Link>
          </div>
        </div>
      </main>
    </>
  );
}
