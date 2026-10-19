import type { Metadata } from "next";
import Link from "next/link";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { resolveAffiliateUrl } from "@/config/affiliates";

export const metadata: Metadata = {
  title: "Best Houston Solar Buyback Plans 2026 | SaveOnRenewables",
  description:
    "Compare the best Houston solar buyback plans in 2026. CenterPoint territory rate comparison, cheapest electricity rates, and which provider pays the most per kWh. Updated weekly.",
  openGraph: {
    title: "Best Houston Solar Buyback Plans 2026",
    description:
      "Side-by-side comparison of Houston solar buyback rates — Chariot, Almika, Octopus, TXU — plus the current 12-month market low from BestPwr. CenterPoint territory.",
    url: "https://saveonrenewables.com/houston-solar-buyback-plans",
    type: "article",
    siteName: "Save on Renewables",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Houston Solar Buyback Plans 2026",
    description:
      "Compare CenterPoint territory solar buyback rates. Find the plan that pays the most for your excess solar energy.",
  },
  alternates: {
    canonical: "https://saveonrenewables.com/houston-solar-buyback-plans",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Houston Solar Buyback Plans 2026",
  description:
    "Complete guide to solar buyback plans in Houston, TX — CenterPoint territory rate comparison, cheapest electricity rates, and how to maximize solar savings in 2026.",
  datePublished: "2026-01-01",
  dateModified: "2026-07-11",
  author: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
  publisher: { "@type": "Organization", name: "SaveOnRenewables", url: "https://saveonrenewables.com" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://saveonrenewables.com/houston-solar-buyback-plans" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best solar buyback plan in Houston in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Almika Energy's 60 Energy Plus pays the highest fixed rate at 10¢/kWh but requires a 5-year contract. For most Houston homeowners, Chariot Energy's GreenVolt at 7¢/kWh offers the best balance of rate and flexibility. Gexa Energy and Pulse Power are solid variable-rate alternatives available in CenterPoint territory.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cheapest electricity rate in Houston right now?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The current 12-month market low in Harris County is available live on BestPwr.com, which pulls real-time data from PowerToChoose.org. Rates fluctuate weekly — locking in now before summer peaks is typically the best strategy.",
      },
    },
    {
      "@type": "Question",
      name: "Does CenterPoint Energy offer a solar buyback program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CenterPoint Energy is the transmission and distribution utility (TDU) for Houston — they own the poles and wires but do not sell electricity. Your solar buyback credits come from your retail electricity provider (REP), not CenterPoint. You can choose any REP that serves CenterPoint territory.",
      },
    },
    {
      "@type": "Question",
      name: "How much can Houston solar panels save per month?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With a 10 kW system and a strong buyback plan, Houston homeowners typically offset $150–$250 per month in electricity costs. The exact savings depend on your usage, buyback rate, and how many peak sun hours your panels receive.",
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
    highlight: "Highest fixed rate",
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
    highlight: "Most popular in Houston",
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
    badgeColor: "bg-blue-100 text-blue-700",
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

export default function HoustonSolarBuybackPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            <Link href="/buyback" className="hover:text-emerald-600 transition-colors">Buyback Plans</Link>
            <span>/</span>
            <span className="text-gray-600">Houston</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              CenterPoint Territory &middot; Updated July 2026
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Best Houston Solar Buyback Plans 2026
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-6">
              Houston is one of the best cities in Texas for solar. CenterPoint territory supports all
              major buyback providers, and with ERCOT demand at record highs, locking in a strong
              buyback rate now is one of the smartest moves a Houston homeowner can make.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/buyback"
                className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-md shadow-emerald-200 transition-colors"
              >
                See Live Rates &rarr;
              </Link>
              <a
                href="https://bestpwr.com?utm_source=saveonrenewables&utm_medium=referral&utm_campaign=houston_seo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 text-sm font-semibold px-6 py-3 rounded-2xl transition-colors"
              >
                Compare Electricity Rates at BestPwr
              </a>
            </div>
          </div>

          {/* Why Houston */}
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
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Houston Is Ideal for Solar Buyback</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {[
                { stat: "5.2 hrs", label: "Peak sun hours/day (Harris County)" },
                { stat: "7–10 yr", label: "Typical system payback period" },
                { stat: "$200+", label: "Avg monthly bill offset with solar" },
              ].map(({ stat, label }) => (
                <div key={label} className="bg-emerald-50 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-emerald-600 mb-1">{stat}</p>
                  <p className="text-xs text-gray-500 leading-snug">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Houston sits in CenterPoint Energy&apos;s service territory, which covers all of Harris County
              and surrounding areas. Because Texas is a deregulated energy market, Houston homeowners
              choose their own retail electricity provider (REP) &mdash; including which buyback plan
              credits them for excess solar production.
            </p>
          </section>

          {/* CenterPoint explainer */}
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
            <h2 className="text-xl font-bold text-gray-900 mb-3">CenterPoint Solar Rate Comparison</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              CenterPoint Energy owns the grid infrastructure in Houston but does <strong>not</strong> sell
              electricity or set buyback rates. Your solar buyback credits are set entirely by your
              chosen REP &mdash; which means choosing the right provider is the single biggest lever
              you can pull to maximize solar ROI.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              All providers below are available in CenterPoint territory. The difference between the
              highest and lowest buyback rate is roughly <strong>5.3¢/kWh</strong> &mdash; on a 10 kW
              system exporting 800 kWh/month, that&apos;s a <strong>$42/month swing</strong> or over
              $500/year.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
              <span className="font-semibold">Rate data note:</span> Buyback rates listed below are
              sourced from each provider&apos;s published plan documents as of July 2026. Variable
              rates shift with ERCOT conditions. Always verify current rates before signing.
            </div>
          </section>

          {/* Plan comparison table */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Houston Solar Buyback Plan Comparison
            </h2>
            <div className="flex flex-col gap-4">
              {plans.map((p) => (
                <div
                  key={p.provider}
                  className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.75)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${p.badgeColor}`}>
                        {p.badge}
                      </span>
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
              <Link
                href="/buyback"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                View full plan details with live rates &rarr;
              </Link>
            </p>
          </section>

          {/* Cheapest electricity rates Houston */}
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
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Cheapest Electricity Rates in Houston (12-Month Plans)
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              For solar homeowners, the electricity rate you pay for consumption matters just as
              much as the buyback rate. A plan with a strong buyback rate <em>and</em> a low
              consumption rate gives you the best of both worlds.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              The current 12-month market low in Harris County is updated daily on{" "}
              <a
                href="https://bestpwr.com?utm_source=saveonrenewables&utm_medium=referral&utm_campaign=houston_seo_rates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 font-semibold hover:underline"
              >
                BestPwr.com
              </a>
              , which pulls live rate data from PowerToChoose.org. Summer peaks (June&ndash;September)
              historically push rates 30&ndash;40% above the winter floor, so locking in a 12-month
              fixed rate before summer is typically the best timing.
            </p>
            <a
              href="https://bestpwr.com?utm_source=saveonrenewables&utm_medium=referral&utm_campaign=houston_seo_rates"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-md shadow-emerald-200 transition-colors"
            >
              See Today&apos;s Cheapest Houston Rates at BestPwr &rarr;
            </a>
          </section>

          {/* How to choose */}
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">How to Choose a Houston Solar Buyback Plan</h2>
            <ol className="flex flex-col gap-4">
              {[
                {
                  n: "1",
                  title: "Confirm CenterPoint coverage",
                  body: "All plans listed above serve CenterPoint territory. If you're in Entergy or another TDU zone, coverage may differ — check the plan's EFL (Electricity Facts Label).",
                },
                {
                  n: "2",
                  title: "Compare buyback rate vs. consumption rate",
                  body: "A high buyback rate paired with a high consumption rate can still be a net loss. Use our Solar Advisor calculator to model your full bill scenario.",
                },
                {
                  n: "3",
                  title: "Check credit expiration rules",
                  body: "Some plans let credits roll month-to-month indefinitely. Others expire annually or cap at $1,000. Read the plan's Terms of Service.",
                },
                {
                  n: "4",
                  title: "Factor in contract length",
                  body: "Fixed-rate plans require a commitment. If you're planning to move or upgrade your system, a shorter contract (12 months) offers more flexibility.",
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {n}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-0.5">{title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-4">
              {[
                {
                  q: "Does CenterPoint Energy offer a solar buyback program?",
                  a: "CenterPoint is the TDU — they own the poles and wires but don't sell electricity. Your buyback credits come from your chosen retail provider, not CenterPoint. You can switch providers without changing your CenterPoint service.",
                },
                {
                  q: "What's the highest buyback rate available in Houston?",
                  a: "As of July 2026, Almika Energy pays 10¢/kWh — the highest fixed rate in Texas. It requires a 60-month contract. Chariot's GreenVolt at 7¢ is the most popular option for homeowners who want flexibility.",
                },
                {
                  q: "Can I switch my solar buyback provider?",
                  a: "Yes, as long as you're not under an active contract. Texas's deregulated market lets you switch providers at any time. Early termination fees typically range from $100–$250.",
                },
                {
                  q: "Do I need a special meter for solar buyback in Houston?",
                  a: "Yes — a bidirectional (net metering-capable) meter is required. CenterPoint installs these through your provider. Most providers handle the meter upgrade as part of the signup process.",
                },
              ].map(({ q, a }) => (
                <div
                  key={q}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    boxShadow: "0 2px 15px rgba(0,0,0,0.04)",
                  }}
                >
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
            <Link href="/cities/houston" className="hover:text-emerald-600 transition-colors">Houston Solar Data</Link>
          </div>

        </div>
      </main>
    </>
  );
}
