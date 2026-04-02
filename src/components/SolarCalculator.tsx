"use client";

import { useState } from "react";

const COST_PER_WATT = 2.16;
const FEDERAL_TAX_CREDIT = 0.30;
const PEAK_SUN_HOURS = 4.5;
const KWH_PER_KW_PER_YEAR = PEAK_SUN_HOURS * 365;

function calculate(monthlyBill: number, ratePerKwh: number) {
  const annualKwh = (monthlyBill / ratePerKwh) * 12;
  const systemSizeKw = annualKwh / KWH_PER_KW_PER_YEAR;
  const grossCost = systemSizeKw * 1000 * COST_PER_WATT;
  const taxCredit = grossCost * FEDERAL_TAX_CREDIT;
  const netCost = grossCost - taxCredit;
  const annualSavings = monthlyBill * 12;
  const paybackYears = netCost / annualSavings;
  const savings25Year = annualSavings * 25 - netCost;

  return {
    systemSizeKw: systemSizeKw.toFixed(1),
    grossCost: Math.round(grossCost).toLocaleString(),
    taxCredit: Math.round(taxCredit).toLocaleString(),
    netCost: Math.round(netCost).toLocaleString(),
    paybackYears: paybackYears.toFixed(1),
    savings25Year: Math.round(savings25Year).toLocaleString(),
  };
}

type Results = ReturnType<typeof calculate>;

function ResultCard({ label, value, sub, highlight }: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col items-center gap-1 ${
        highlight
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
          : "bg-white/60 text-gray-900 shadow-sm"
      }`}
    >
      <p className={`text-xs font-semibold uppercase tracking-widest ${highlight ? "text-emerald-100" : "text-gray-400"}`}>
        {label}
      </p>
      <p className="text-2xl font-bold">{value}</p>
      {sub && <p className={`text-xs ${highlight ? "text-emerald-100" : "text-gray-400"}`}>{sub}</p>}
    </div>
  );
}

// TODO: Replace with your Formspree form ID from formspree.io/dashboard
const FORMSPREE_FORM_ID = "REPLACE_WITH_YOUR_FORM_ID";

interface LeadContext {
  monthlyBill: string;
  zipCode: string;
  systemSizeKw: string;
  paybackYears: string;
  savings25Year: string;
  netCost: string;
}

function LeadForm({ onSuccess, context }: { onSuccess: () => void; context: LeadContext }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isHomeowner, setIsHomeowner] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isHomeowner) { setError("Please let us know if you own your home."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          homeowner: isHomeowner,
          _subject: `New Solar Lead — Save on Renewables (${context.zipCode})`,
          monthly_bill: `$${context.monthlyBill}`,
          zip_code: context.zipCode,
          system_size: `${context.systemSizeKw} kW`,
          payback_period: `${context.paybackYears} years`,
          net_cost: `$${context.netCost}`,
          savings_25yr: `$${context.savings25Year}`,
        }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Could not connect. Please try again.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 text-left">Get Your Detailed Report</h3>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2 text-left">Are you a homeowner?</p>
        <div className="flex gap-3">
          {["Yes", "No", "I rent but I'm interested"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setIsHomeowner(option)}
              className={`flex-1 rounded-xl border py-2 text-sm font-medium transition-colors ${
                isHomeowner === option
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-200 bg-white/70 text-gray-600 hover:border-emerald-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold py-4 rounded-2xl shadow-md shadow-emerald-200 transition-colors"
      >
        {loading ? "Sending…" : "Send My Report →"}
      </button>
    </form>
  );
}

function SuccessMessage() {
  return (
    <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
      <div className="text-3xl mb-3">✓</div>
      <p className="text-gray-800 font-semibold text-lg mb-1">You&apos;re on the list.</p>
      <p className="text-gray-500 text-sm leading-relaxed">
        Got it! Vera or one of our advisors will reach out with your custom
        Texas grid-hedge strategy shortly.
      </p>
    </div>
  );
}

export default function SolarCalculator({
  ratePerKwh = 0.14,
  rateLabel = "Current",
}: {
  ratePerKwh?: number;
  rateLabel?: string;
}) {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleCalculate() {
    const bill = parseFloat(monthlyBill);
    if (!monthlyBill || isNaN(bill) || bill <= 0) {
      setError("Please enter a valid monthly electric bill.");
      return;
    }
    if (!zipCode || zipCode.length !== 5 || !/^\d{5}$/.test(zipCode)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }
    setError("");
    setResults(calculate(bill, ratePerKwh));
    setSubmitted(false);
  }

  return (
    <div
      className="w-full max-w-xl mt-10 rounded-3xl p-8"
      style={{
        background: "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.7)",
        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.08), 0 1px 0 rgba(255,255,255,0.9) inset",
      }}
    >
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Solar Savings Calculator</h2>
      <p className="text-sm text-gray-400 mb-6">{rateLabel} · Texas · Includes 30% Federal Tax Credit · Avg. market rate: {(ratePerKwh * 100).toFixed(1)}¢/kWh</p>

      {/* Inputs */}
      <div className="flex flex-col gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Electric Bill ($)</label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 180"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
          <input
            type="text"
            maxLength={5}
            placeholder="e.g. 78701"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <button
        onClick={handleCalculate}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold py-4 rounded-2xl shadow-md shadow-emerald-200 transition-colors"
      >
        Calculate My Solar Savings
      </button>

      {/* Results */}
      {results && (
        <div className="mt-8">
          {/* Result cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <ResultCard label="System Size" value={`${results.systemSizeKw} kW`} />
            <ResultCard label="Payback Period" value={`${results.paybackYears} yrs`} />
            <ResultCard label="25-Year Savings" value={`$${results.savings25Year}`} highlight />
          </div>

          {/* Cost breakdown */}
          <div className="bg-white/60 rounded-2xl p-4 text-sm text-gray-700 shadow-sm mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Gross System Cost</span>
              <span className="font-semibold">${results.grossCost}</span>
            </div>
            <div className="flex justify-between mb-2 text-emerald-600">
              <span>30% Federal Tax Credit</span>
              <span className="font-semibold">− ${results.taxCredit}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
              <span>Net Cost to You</span>
              <span>${results.netCost}</span>
            </div>
          </div>

          {/* Market insight */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 leading-relaxed mb-2">
            <span className="font-semibold">Market Insight:</span> With ERCOT hitting record solar
            production this month but data centers increasing grid demand, home solar is your best
            hedge against rising summer rates.
          </div>

          {/* Lead form or success */}
          {submitted ? (
            <SuccessMessage />
          ) : (
            <LeadForm
              onSuccess={() => setSubmitted(true)}
              context={{
                monthlyBill,
                zipCode,
                systemSizeKw: results.systemSizeKw,
                paybackYears: results.paybackYears,
                savings25Year: results.savings25Year,
                netCost: results.netCost,
              }}
            />
          )}

          {/* BestPWR CTA */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 mb-3">Want to compare live Texas energy rates?</p>
            <a
              href="https://www.bestpwr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-2xl text-sm transition-colors"
            >
              Compare Real-Time Texas Rates at bestpwr.com →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
