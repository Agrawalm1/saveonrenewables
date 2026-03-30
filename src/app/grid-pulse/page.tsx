import { readFileSync } from "fs";
import path from "path";
import GridPulse from "@/components/GridPulse";
import RateHistoryChart from "@/components/RateHistoryChart";
import Link from "next/link";
import { fetchCurrentBestRate, getCurrentMonthKey } from "@/lib/rates";

export const metadata = {
  title: "Grid Pulse · Save on Renewables",
  description: "Live ERCOT Texas grid load and 24-month rate history for Harris County.",
};

export const dynamic = "force-dynamic";

function loadRateHistory() {
  const filePath = path.join(process.cwd(), "data", "rate-history.json");
  return JSON.parse(readFileSync(filePath, "utf8"));
}

export default async function GridPulsePage() {
  const rateData = loadRateHistory();

  // Fetch current month's best rate live from PowerToChoose
  const liveRate = await fetchCurrentBestRate("77001");
  const { month, label } = getCurrentMonthKey();

  // Fallback: use the last historical rate if API fails
  const currentRate = liveRate ?? rateData.months[rateData.months.length - 1].rate;

  // Append current month as the live data point (keep last 24 months total)
  const allMonths = [
    ...rateData.months.slice(-23),
    { month, label, rate: currentRate, isCurrent: true },
  ];

  const enrichedData = { ...rateData, months: allMonths };

  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Live Data · ERCOT
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Texas Grid Pulse</h1>
          <p className="text-lg text-gray-500">
            Real-time ERCOT grid load and 24-month rate history — why right now is the best time to lock in solar.
          </p>
        </div>

        {/* Live grid status */}
        <GridPulse />

        {/* 24-month rate history chart */}
        <div className="mt-6">
          <RateHistoryChart months={enrichedData.months} region={enrichedData.region} />
        </div>

        {/* Chart explainer callout */}
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-sm text-emerald-800 leading-relaxed">
          <span className="font-semibold">Why the valley matters:</span> The current{" "}
          <span className="font-bold">{currentRate}¢/kWh</span>{" "}
          rate is near a 2-year low. Locking in solar now hedges against the summer peaks that historically hit 13–14¢.
        </div>

        {/* Explainer */}
        <div
          className="mt-6 rounded-3xl p-8"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Why Grid Load Affects Your Bill</h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              Texas runs on the ERCOT grid — an island grid with no meaningful connection to neighboring states. When demand spikes, prices spike. There&apos;s no outside buffer.
            </p>
            <p>
              <span className="font-semibold text-gray-800">Data centers are the new wildcard.</span> In 2025–2026, Texas added over 8 GW of data center load — the equivalent of several million new homes. This is pushing afternoon peaks to record levels.
            </p>
            <p>
              <span className="font-semibold text-gray-800">Variable-rate customers feel it immediately.</span> During a Critical load event, spot prices can spike 50–100× above normal. Customers on indexed or real-time pricing plans see these charges directly on their bill.
            </p>
            <p>
              Home solar generation peaks at the same time grid demand peaks — making it the most effective hedge against rate spikes available to Texas homeowners.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <Link
            href="/tools"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-md shadow-emerald-200 transition-colors"
          >
            Calculate My Solar Savings →
          </Link>
        </div>
      </div>
    </main>
  );
}
