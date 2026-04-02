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

  return (
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
  );
}
