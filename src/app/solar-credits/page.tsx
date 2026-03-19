import Link from "next/link";

export const metadata = {
  title: "Solar Tax Credits 2026 · Save on Renewables",
  description: "The 30% federal homeowner solar tax credit expired Dec 2025. Learn how leases and PPAs still unlock savings in 2026.",
};

function OptionCard({
  title,
  tag,
  tagColor,
  description,
  bullets,
  highlight,
}: {
  title: string;
  tag: string;
  tagColor: string;
  description: string;
  bullets: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl p-7 ${highlight ? "ring-2 ring-emerald-400" : ""}`}
      style={{
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: highlight ? undefined : "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
      }}
    >
      <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${tagColor}`}>
        {tag}
      </span>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-5">{description}</p>
      <ul className="space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SolarCreditsPage() {
  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            2026 Policy Update
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Solar Tax Credits in 2026</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            The rules changed. Here&apos;s what you need to know — and how to still access maximum savings.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex gap-4">
          <div className="text-2xl">⚠️</div>
          <div>
            <h2 className="font-bold text-red-800 text-lg mb-1">
              The 30% Homeowner Tax Credit Expired December 2025
            </h2>
            <p className="text-red-700 text-sm leading-relaxed">
              The residential clean energy credit (previously 30% of system cost for direct purchases) was not renewed by Congress and expired at the end of December 2025. If you purchased a solar system directly after that date, you <strong>cannot claim the 30% credit on your federal taxes</strong>.
            </p>
          </div>
        </div>

        {/* Good news */}
        <div
          className="rounded-3xl p-7 mb-8"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-3">The Good News: You Can Still Access These Savings</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Through <strong>Solar Leases</strong> and <strong>Power Purchase Agreements (PPAs)</strong>, you can still effectively access the value of the 30% tax credit — because the <em>installer</em> owns the system, claims the credit, and passes the savings on to you through a lower monthly rate.
          </p>
        </div>

        {/* Options grid */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <OptionCard
            title="Direct Purchase"
            tag="Credit Expired"
            tagColor="bg-red-100 text-red-700"
            description="You buy and own the system outright. No federal tax credit in 2026."
            bullets={[
              "You own the system fully",
              "Highest long-term ROI",
              "No monthly payments after payoff",
              "30% federal credit no longer applies",
            ]}
          />
          <OptionCard
            title="Solar Lease"
            tag="Credit Accessible"
            tagColor="bg-emerald-100 text-emerald-700"
            description="Installer owns the system, leases it to you at a fixed monthly rate."
            highlight
            bullets={[
              "Installer claims the 30% credit",
              "Passes savings to you via lower rate",
              "No upfront cost",
              "Fixed predictable payments",
              "Installer handles maintenance",
            ]}
          />
          <OptionCard
            title="PPA (Power Purchase Agreement)"
            tag="Credit Accessible"
            tagColor="bg-emerald-100 text-emerald-700"
            description="You pay a set price per kWh for power the panels produce — usually below retail."
            bullets={[
              "Installer claims the 30% credit",
              "You pay per kWh used, often at 20–30% below retail",
              "No upfront cost",
              "Savings scale with your usage",
            ]}
          />
        </div>

        {/* Which is right */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 leading-relaxed mb-8">
          <span className="font-semibold">Bottom Line for Texas Homeowners in 2026:</span> If you want to go solar without a large upfront investment and still capture tax credit savings, a Lease or PPA is your best path. If you have cash or strong financing and want maximum lifetime ROI, a direct purchase still makes sense — just without the federal credit.
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">Run the numbers for your home with our calculator.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-md shadow-emerald-200 transition-colors"
            >
              Solar Advisor →
            </Link>
            <a
              href="https://www.bestpwr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-2xl border border-gray-200 transition-colors"
            >
              Compare Texas Solar Providers at bestpwr.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
