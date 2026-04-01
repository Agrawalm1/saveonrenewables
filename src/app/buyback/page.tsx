import { readFileSync } from "fs";
import path from "path";
import { fetchCurrentBestRate } from "@/lib/rates";

export const metadata = {
  title: "Solar Buyback Plans · Save on Renewables",
  description: "Compare the best Texas solar buyback plans in 2026 — Chariot, Almika, Rhythm, Green Mountain, and the BestPwr 12-month low.",
};

export const dynamic = "force-dynamic";

interface BuybackPlan {
  id: string;
  provider: string;
  plan: string;
  description: string;
  url: string;
  currentRate: number;
  previousRate: number | null;
  rateType: "fixed" | "variable";
  hotDeal: boolean;
  changePercent: number | null;
}

interface BuybackData {
  lastUpdated: string;
  plans: BuybackPlan[];
}

function loadBuybackData(): BuybackData {
  const filePath = path.join(process.cwd(), "data", "buyback-data.json");
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function fmt(rate: number) {
  return `${(rate * 100).toFixed(1)}¢`;
}

function PlanTile({ plan }: { plan: BuybackPlan }) {
  const isHot = plan.hotDeal || (plan.changePercent !== null && Math.abs(plan.changePercent) > 5);
  const changeUp = (plan.changePercent ?? 0) > 0;

  return (
    <div
      className={`rounded-3xl p-7 flex flex-col gap-5 ${isHot ? "ring-2 ring-orange-400" : ""}`}
      style={{
        position: "relative",
        zIndex: 0,
        isolation: "isolate",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isHot ? undefined : "1px solid rgba(255,255,255,0.75)",
        boxShadow: isHot ? "0 8px 40px rgba(251,146,60,0.15)" : "0 4px 30px rgba(0,0,0,0.06)",
      }}
    >
      {/* Top badges */}
      <div className="flex flex-wrap gap-2">
        {isHot && (
          <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            🔥 Hot Deal
          </span>
        )}
        <span className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
          plan.rateType === "fixed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
        }`}>
          {plan.rateType === "fixed" ? "Fixed Rate" : "Variable Rate"}
        </span>
      </div>

      {/* Provider & plan name */}
      <div>
        <p className="text-sm text-gray-400 font-medium mb-0.5">{plan.provider}</p>
        <h3 className="text-xl font-bold text-gray-900">{plan.plan}</h3>
      </div>

      {/* Rate */}
      <div className="flex items-end gap-3">
        <span className="text-5xl font-black text-emerald-600 leading-none">{fmt(plan.currentRate)}</span>
        <div className="flex flex-col gap-1 pb-1">
          <span className="text-sm text-gray-400">per kWh</span>
          {plan.changePercent !== null && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              changeUp ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
            }`}>
              {changeUp ? "▲" : "▼"} {Math.abs(plan.changePercent).toFixed(1)}% vs last week
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed flex-1">{plan.description}</p>

      {/* CTA Button */}
      <a
        href={plan.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-white font-bold bg-emerald-500 hover:bg-emerald-600 rounded-2xl transition-colors"
        style={{
          position: "relative",
          zIndex: 50,
          pointerEvents: "auto",
          padding: "14px 24px",
          textDecoration: "none",
          boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
        }}
      >
        View Plan at {plan.provider} →
      </a>
    </div>
  );
}

function BestPwrTile({ rate }: { rate: string }) {
  return (
    <div
      className="rounded-3xl p-7 flex flex-col gap-5 ring-2 ring-emerald-400"
      style={{
        position: "relative",
        zIndex: 0,
        isolation: "isolate",
        background: "linear-gradient(135deg, rgba(236,253,245,0.95) 0%, rgba(240,249,255,0.95) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 40px rgba(16,185,129,0.15)",
      }}
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          ⭐ Best of BestPwr
        </span>
        <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
          12-Month Low
        </span>
      </div>

      {/* Provider */}
      <div>
        <p className="text-sm text-gray-400 font-medium mb-0.5">BestPwr Marketplace</p>
        <h3 className="text-xl font-bold text-gray-900">Best Available 12-Month Plan</h3>
      </div>

      {/* Rate */}
      <div className="flex items-end gap-3">
        <span className="text-5xl font-black text-emerald-600 leading-none">{rate}</span>
        <div className="flex flex-col gap-1 pb-1">
          <span className="text-sm text-gray-400">per kWh</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
            2-Year Low · Harris County
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed flex-1">
        The current 12-month low across all Texas providers — found live on BestPwr. Rates are near a 2-year floor. Summer peaks historically hit 13–14¢. Lock this in before the grid heats up.
      </p>

      {/* CTA */}
      <a
        href="https://www.bestpwr.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-white font-bold bg-emerald-500 hover:bg-emerald-600 rounded-2xl transition-colors text-base"
        style={{
          position: "relative",
          zIndex: 50,
          pointerEvents: "auto",
          padding: "14px 24px",
          textDecoration: "none",
          boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
        }}
      >
        Compare Real-Time Rates at BestPwr.com →
      </a>
    </div>
  );
}

export default async function BuybackPage() {
  const [data, bestRateCents] = await Promise.all([
    Promise.resolve(loadBuybackData()),
    fetchCurrentBestRate(),
  ]);
  const bestRateLabel = bestRateCents != null ? `${bestRateCents.toFixed(1)}¢` : "7.6¢";
  const lastUpdated = new Date(data.lastUpdated).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  });

  // Sort: hot deals first, then by rate descending
  const sorted = [...data.plans].sort((a, b) => {
    if (a.hotDeal && !b.hotDeal) return -1;
    if (!a.hotDeal && b.hotDeal) return 1;
    return b.currentRate - a.currentRate;
  });

  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Houston · 2026 Plans
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Solar Buyback Plans</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-2">
            When your panels produce more than you use, these providers buy the surplus back.
            Rates updated every Monday morning.
          </p>
          <p className="text-xs text-gray-400">Last updated: {lastUpdated}</p>
        </div>

        {/* Explainer */}
        <div
          className="rounded-3xl p-7 mb-8"
          style={{
            position: "relative",
            zIndex: 0,
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3">How Solar Buyback Works in Texas</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Texas is a deregulated energy market — you can choose any retail electricity provider (REP).
            Solar buyback plans credit your bill for excess energy your panels export to the grid.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            A plan paying <strong>7¢/kWh</strong> back vs. <strong>2¢/kWh</strong> can mean thousands of dollars difference over your system&apos;s lifetime.
          </p>
        </div>

        {/* Best of BestPwr tile — always first */}
        <div className="mb-5" style={{ position: "relative", zIndex: 10, isolation: "isolate" }}>
          <BestPwrTile rate={bestRateLabel} />
        </div>

        {/* Provider tiles */}
        <div className="flex flex-col gap-5 mb-8" style={{ isolation: "isolate" }}>
          {sorted.map((plan) => (
            <PlanTile key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Hot deal explainer */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-sm text-orange-800 leading-relaxed mb-5">
          <span className="font-semibold">🔥 Hot Deal:</span> Badge appears when a rate moves more than 5% week-over-week. Variable rates shift with ERCOT conditions — act quickly.
        </div>

        {/* Market note */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 leading-relaxed">
          <span className="font-semibold">2026 Market Note:</span> With ERCOT demand at record highs from data center expansion, buyback rates during afternoon peaks (2–7pm) can spike on variable plans. Chariot&apos;s fixed GreenVolt rate offers the predictability most homeowners prefer.
        </div>
      </div>
    </main>
  );
}
