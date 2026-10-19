import type { Metadata } from "next";
import Link from "next/link";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { resolveAffiliateUrl } from "@/config/affiliates";

export const metadata: Metadata = {
  title: "Best Dallas Solar Buyback Plans 2026 | SaveOnRenewables",
  description:
    "Compare the best Dallas solar buyback plans in 2026. Oncor territory rate comparison — Chariot, Almika, TXU, Octopus, Gexa, and the current 12-month market low from BestPwr. Updated weekly.",
  openGraph: {
    title: "Best Dallas Solar Buyback Plans 2026",
    description:
      "Side-by-side comparison of Dallas solar buyback rates in Oncor territory. Find the plan that pays the most for your excess solar energy — updated weekly.",
    url: "https://saveonrenewables.com/dallas-solar-buyback-plans",
    type: "article",
    siteName: "Save on Renewables",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dallas Solar Buyback Plans 2026",
    description: "Compare Oncor territory solar buyback rates. Find the plan that pays the most for your excess solar energy.",
  },
  alternates: {
    canonical: "https://saveonrenewables.com/dallas-solar-buyback-plans",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Dallas Solar Buyback Plans 2026",
  description: "Complete guide to solar buyback plans in Dallas, TX — Oncor territory rate comparison and how to maximize solar savings in 2026.",
  datePublished: "2026-10-18",
  dateModified: "2026-10-18",
  author: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
  publisher: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://saveonrenewables.com/dallas-solar-buyback-plans" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best solar buyback plan in Dallas in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Almika Energy's 60 Energy Plus pays the highest fixed rate at 10¢/kWh but requires a 5-year contract. For most Dallas homeowners, Chariot Energy's GreenVolt at 7¢/kWh offers the best balance of rate and flexibility — available in Oncor territory with 12, 24, or 36-month terms.",
      },
    },
    {
      "@type": "Question",
      name: "Does Oncor Energy offer a solar buyback program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oncor is the transmission and distribution utility (TDU) for Dallas/Fort Worth — they own the poles and wires but do not sell electricity. Your solar buyback credits come from your retail electricity provider (REP), not Oncor. You can choose any REP that serves Oncor territory.",
      },
    },
    {
      "@type": "Question",
      name: "How much solar does Dallas get?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dallas averages 4.8 peak sun hours per day, producing roughly 1,750 kWh per installed kW per year. This is slightly less than Houston (5.2 hrs) but still excellent for solar — well above the national average of 4.0–4.5 hrs.",
      },
    },
    {
      "@type": "Question",
      name: "Can I switch my solar buyback provider in Dallas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Texas's deregulated market lets you switch providers at any time as long as you're not under an active contract. Early termination fees typically range from $100–$250. Your Oncor service and meter are unaffected by switching REPs.",
      },
    },
  ],
};

const plans = [
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
  {
    planId: "gexa-solar",
    url: "https://www.gexaenergy.com/solar",
    provider: "Gexa Energy",
    plan: "Gexa Eco Save Solar",
    buybackRate: "~6.0¢/kWh",
    rateType: "Variable",
    term: "12 months",
    highlight: "One of Texas's largest REPs",
    badge: "Big REP",
    badgeColor: "bg-sky-100 text-sky-700",
  },
  {
    planId: "pulse-solar",
    url: "https://www.pulsepower.com/solar",
    provider: "Pulse Power",
    plan: "Pulse Solar Buyback",
    buybackRate: "~5.0¢/kWh",
    rateType: "Variable",
    term: "12–24 months",
    highlight: "Texas-owned, no base fee",
    badge: "Local",
    badgeColor: "bg-green-100 text-green-700",
  },
];

export default function DallasSolarBuybackPage() {
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
            <span className="text-gray-600">Dallas</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              Oncor Territory &middot; Updated Oct 2026
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Best Dallas Solar Buyback Plans 2026
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-6">
              Dallas and the DFW metro sit in Oncor&apos;s service territory — one of the largest
              deregulated markets in Texas. All major buyback providers serve Oncor, and with
              ERCOT demand at record highs, locking in a strong buyback rate now protects your
              solar investment for years to come.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/buyback" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-md shadow-emerald-200 transition-colors">
                See Live Rates &rarr;
              </Link>
              <a
                href="https://bestpwr.com?utm_source=saveonrenewables&utm_medium=referral&utm_campaign=dallas_seo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 text-sm font-semibold px-6 py-3 rounded-2xl transition-colors"
              >
                Compare Electricity Rates at BestPwr
              </a>
            </div>
          </div>

          {/* Why Dallas */}
          <section className="rounded-3xl p-7 mb-8" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 4px 30px rgba(0,0,0,0.06)" }}>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Dallas is Great for Solar Buyback</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {[
                { stat: "4.8 hrs", label: "Peak sun hours/day (DFW)" },
                { stat: "7–9 yr", label: "Typical system payback period" },
                { stat: "$180+", label: "Avg monthly bill offset with solar" },
              ].map(({ stat, label }) => (
                <div key={label} className="bg-emerald-50 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-emerald-600 mb-1">{stat}</p>
                  <p className="text-xs text-gray-500 leading-snug">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Dallas is served by Oncor Electric Delivery, which covers the DFW metro and most of
              North Texas. Because Texas is a deregulated energy market, Dallas homeowners choose
              their own retail electricity provider — including which buyback plan credits them for
              excess solar production.
            </p>
          </section>

          {/* Plan comparison */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Dallas Solar Buyback Plan Comparison</h2>
            <div className="flex flex-col gap-4">
              {plans.map((p) => (
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
            <p className="mt-4 text-center">
              <Link href="/buyback" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                View full plan details with live rates &rarr;
              </Link>
            </p>
          </section>

          {/* Oncor explainer */}
          <section className="rounded-3xl p-7 mb-8" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 4px 30px rgba(0,0,0,0.06)" }}>
            <h2 className="text-xl font-bold text-gray-900 mb-3">How Solar Buyback Works with Oncor</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Oncor owns the grid infrastructure in Dallas but does <strong>not</strong> sell
              electricity or set buyback rates. Your solar buyback credits are set entirely by your
              chosen REP — which means choosing the right provider is the single biggest lever you
              can pull to maximize solar ROI.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              All providers above are available in Oncor territory. The difference between the highest
              and lowest buyback rate is roughly <strong>5.0¢/kWh</strong> — on a 10 kW system
              exporting 700 kWh/month, that&apos;s a <strong>$35/month swing</strong> or over $420/year.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
              <span className="font-semibold">Rate data note:</span> Buyback rates listed are sourced
              from each provider&apos;s published plan documents as of Oct 2026. Variable rates shift with
              ERCOT conditions. Always verify current rates before signing.
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-4">
              {[
                { q: "Does Oncor offer a solar buyback program?", a: "Oncor is the TDU — they own the poles and wires but don't sell electricity. Your buyback credits come from your chosen retail provider, not Oncor. You can switch providers without changing your Oncor service." },
                { q: "What's the highest buyback rate in Dallas?", a: "As of Oct 2026, Almika Energy pays 10¢/kWh — the highest fixed rate in Texas. It requires a 60-month contract. Chariot's GreenVolt at 7¢ is the most popular option for homeowners who want flexibility." },
                { q: "How does Dallas compare to Houston for solar?", a: "Houston has slightly more peak sun hours (5.2 vs 4.8), meaning a Dallas system produces about 8% less per installed kW. However, all major buyback providers serve both territories, so plan selection is the same." },
                { q: "Do I need a special meter for solar buyback in Dallas?", a: "Yes — a bidirectional meter is required for net metering. Oncor installs these through your REP at no direct charge. Most providers handle the meter upgrade as part of the signup process, typically within 2–4 weeks." },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 2px 15px rgba(0,0,0,0.04)" }}>
                  <p className="text-sm font-semibold text-gray-800 mb-2">{q}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Lead Capture */}
          <section className="mb-10">
            <LeadCaptureForm />
          </section>

          {/* Internal links */}
          <div className="text-center text-sm text-gray-400 space-x-4">
            <Link href="/buyback" className="hover:text-emerald-600 transition-colors">Live Buyback Rates</Link>
            <span>&middot;</span>
            <Link href="/tools" className="hover:text-emerald-600 transition-colors">Solar Advisor Calculator</Link>
            <span>&middot;</span>
            <Link href="/houston-solar-buyback-plans" className="hover:text-emerald-600 transition-colors">Houston Plans</Link>
            <span>&middot;</span>
            <Link href="/guides/centerpoint-vs-oncor-solar" className="hover:text-emerald-600 transition-colors">CenterPoint vs Oncor</Link>
          </div>
        </div>
      </main>
    </>
  );
}
