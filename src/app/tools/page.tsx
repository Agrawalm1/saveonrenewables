import SolarCalculator from "@/components/SolarCalculator";
import { fetchMarketRate } from "@/lib/rates";

export const metadata = {
  title: "Solar Advisor · Save on Renewables",
  description: "Calculate your solar savings with live Texas rates.",
};

export default async function ToolsPage() {
  const marketRateCents = await fetchMarketRate() ?? 14.0;
  const ratePerKwh = marketRateCents / 100;

  const now = new Date();
  const label = now.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <main
      className="min-h-screen flex flex-col items-center px-6 py-20 text-center"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
        Tools · Solar Advisor
      </span>
      <h1 className="text-4xl font-bold text-gray-900 mb-4 max-w-2xl leading-tight">
        Your Solar Advisor
      </h1>
      <p className="text-lg text-gray-500 max-w-xl mb-2">
        Enter your monthly bill and ZIP code to see your personalized savings breakdown — built on live Texas rate data.
      </p>
      <SolarCalculator ratePerKwh={ratePerKwh} rateLabel={label} />
    </main>
  );
}
