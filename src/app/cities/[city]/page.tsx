import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, getCityBySlug } from "@/lib/cities";
import { fetchMarketRate } from "@/lib/rates";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  const rate = await fetchMarketRate(city.zip);
  const rateLabel = rate != null ? `${rate.toFixed(1)}¢/kWh` : "competitive rates";
  return {
    title: `Solar in ${city.name}, TX · Save on Renewables`,
    description: `Live electricity rate in ${city.name}: ${rateLabel}. See estimated solar system costs, payback period, and 25-year savings for ${city.name} homeowners.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const marketRateCents = await fetchMarketRate(city.zip);
  const rateCents = marketRateCents ?? 13.5;
  const ratePerKwh = rateCents / 100;

  // --- Calculations ---
  const monthlyBill = 150; // baseline assumption
  const annualKwh = (monthlyBill / ratePerKwh / 12) * 12; // kWh/year consumed
  const systemKw = annualKwh / (city.peakSunHours * 365);
  const grossCost = systemKw * 1000 * 2.16;
  const taxCredit = grossCost * 0.3;
  const netCost = grossCost - taxCredit;
  const annualSavings = annualKwh * ratePerKwh;
  const paybackYears = netCost / annualSavings;
  const savings25yr = annualSavings * 25 - netCost;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const cityInsights: Record<string, string> = {
    houston:
      "Houston sits in CenterPoint Energy's territory — one of Texas's largest TDUs. With summer bills regularly topping $300 and coastal humidity keeping AC running year-round, solar payback in Houston is among the fastest in the state. Houston homeowners also benefit from proximity to a deep pool of solar installers driving competitive pricing.",
    dallas:
      "Dallas is served primarily by Oncor, the largest TDU in Texas. North Texas summers are brutal — July average highs near 96°F push electricity bills to record levels. Dallas homeowners going solar typically see payback in 8–9 years, with 25-year savings averaging $40,000–$55,000 at current rates.",
    austin:
      "Austin Energy serves much of the city with its own utility, but homeowners in surrounding areas (Cedar Park, Round Rock, Pflugerville) are in Oncor or Pedernales territory with full provider choice. Austin's tech culture and strong environmental awareness have made it one of Texas's fastest-growing solar markets.",
    "san-antonio":
      "San Antonio is largely served by CPS Energy, a city-owned utility — but outlying areas in Bexar County fall into deregulated territory. With 5.0 peak sun hours per day and summer temperatures regularly exceeding 100°F, San Antonio has some of the best solar economics in Texas.",
    "fort-worth":
      "Fort Worth is Oncor territory and benefits from the same deep pool of competitive electricity providers as Dallas. The city's rapid suburban expansion means newer rooftops — ideal for solar installations. Fort Worth homeowners typically target 9–10kW systems to cover HVAC-heavy summer loads.",
    "corpus-christi":
      "Corpus Christi enjoys the highest solar irradiance of any major Texas city, with 5.2 peak sun hours daily and a coastal climate that keeps temperatures moderated year-round. AEP Texas Central serves the area. Lower heating loads mean solar savings skew heavily toward cooling — the longest-running and highest-cost season.",
    plano:
      "Plano is deep in Oncor territory, part of the Dallas-Fort Worth metro. Its dense suburban residential neighborhoods with consistent roof exposure make it ideal for solar. Plano's median household income drives higher electricity usage — and higher potential savings. Average systems in Plano run 10–12kW.",
    lubbock:
      "Lubbock has the highest peak sun hours of any city in our coverage area at 5.5 hrs/day — a significant advantage that shortens payback periods by 1–2 years compared to the state average. Lubbock Power & Light serves most of the city. The flat West Texas landscape means minimal shading, maximizing year-round panel output.",
  };

  const cityInsight = cityInsights[slug] ?? null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much do solar panels cost in ${city.name}, Texas?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A typical solar installation in ${city.name} costs around ${fmt(grossCost)} before incentives. After the 30% federal tax credit the net cost comes to approximately ${fmt(netCost)}, based on a $150/month electric bill at the current ${city.name} market rate.`,
        },
      },
      {
        "@type": "Question",
        name: `How long is the solar payback period in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `At current electricity rates in ${city.name} (${rateCents.toFixed(1)}¢/kWh) and ${city.peakSunHours} peak sun hours per day, the estimated payback period is approximately ${paybackYears.toFixed(1)} years.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the electricity rate in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The current median 12-month fixed electricity rate in ${city.name} is approximately ${rateCents.toFixed(1)}¢ per kWh, based on live data from PowerToChoose.`,
        },
      },
    ],
  };

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
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-400">
          <Link href="/cities" className="hover:text-emerald-600 transition-colors">
            Cities
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600 font-medium">{city.name}</span>
        </div>

        {/* Hero */}
        <div className="text-center mb-10">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            {city.name}, Texas · Live Data
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Solar in {city.name}, TX
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{city.description}</p>
        </div>

        {/* Live rate tile */}
        <div
          className="rounded-3xl p-7 mb-6 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(236,253,245,0.95) 0%, rgba(240,249,255,0.95) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 8px 40px rgba(16,185,129,0.12)",
          }}
        >
          <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">
            Live Market Rate · {city.name}
          </p>
          <p className="text-6xl font-black text-emerald-600 leading-none mb-2">
            {rateCents.toFixed(1)}¢
          </p>
          <p className="text-sm text-gray-500">per kWh · median 12-month fixed plan</p>
          {marketRateCents == null && (
            <p className="text-xs text-amber-600 mt-2">Using estimated rate — live data temporarily unavailable.</p>
          )}
        </div>

        {/* Savings breakdown */}
        <div
          className="rounded-3xl p-7 mb-6"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.75)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Your Solar Estimate — {city.name}
          </h2>
          <p className="text-sm text-gray-400 mb-6">Based on a $150/month electric bill at today&apos;s rate.</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">System Size</p>
              <p className="text-2xl font-bold text-gray-900">{systemKw.toFixed(1)} kW</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Gross Cost</p>
              <p className="text-2xl font-bold text-gray-900">{fmt(grossCost)}</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4">
              <p className="text-xs text-emerald-600 uppercase tracking-wider mb-1">30% Federal Tax Credit</p>
              <p className="text-2xl font-bold text-emerald-700">−{fmt(taxCredit)}</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4">
              <p className="text-xs text-emerald-600 uppercase tracking-wider mb-1">Net Cost</p>
              <p className="text-2xl font-bold text-emerald-700">{fmt(netCost)}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Payback Period</p>
              <p className="text-2xl font-bold text-gray-900">{paybackYears.toFixed(1)} yrs</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">25-Year Savings</p>
              <p className="text-2xl font-bold text-gray-900">{fmt(savings25yr)}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            Estimates use $2.16/W installed cost, {city.peakSunHours} peak sun hours/day, and today&apos;s live {city.name} market rate.
            Actual results vary. Get a professional quote for precise numbers.
          </p>
        </div>

        {/* City info */}
        <div
          className="rounded-3xl p-7 mb-6"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.75)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Solar Conditions in {city.name}
          </h2>
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Peak sun hours per day</span>
              <span className="font-semibold text-gray-900">{city.peakSunHours} hrs</span>
            </div>
            <div className="flex justify-between">
              <span>Latitude</span>
              <span className="font-semibold text-gray-900">{city.lat}° N</span>
            </div>
            <div className="flex justify-between">
              <span>Market electricity rate</span>
              <span className="font-semibold text-gray-900">{rateCents.toFixed(1)}¢/kWh</span>
            </div>
            <div className="flex justify-between">
              <span>Annual sun advantage vs. national avg</span>
              <span className="font-semibold text-emerald-600">
                +{((city.peakSunHours / 4.0 - 1) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* City insight */}
        {cityInsight && (
          <div
            className="rounded-3xl p-7 mb-6"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.75)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Why Solar Makes Sense in {city.name}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{cityInsight}</p>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link
            href="/tools"
            className="flex-1 text-center text-white font-bold bg-emerald-500 hover:bg-emerald-600 rounded-2xl transition-colors py-4 px-6"
            style={{ boxShadow: "0 4px 14px rgba(16,185,129,0.3)", textDecoration: "none" }}
          >
            Calculate My Exact Savings →
          </Link>
          <a
            href="https://www.bestpwr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-emerald-700 font-bold bg-emerald-50 hover:bg-emerald-100 rounded-2xl transition-colors py-4 px-6"
            style={{ textDecoration: "none", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            Compare Live Texas Rates →
          </a>
        </div>

        {/* Back to cities */}
        <p className="text-center text-sm text-gray-400">
          <Link href="/cities" className="text-emerald-600 hover:underline">
            ← Back to all Texas cities
          </Link>
        </p>
      </div>
    </main>
    </>
  );
}
