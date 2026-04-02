"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────────────

type Ownership = "own" | "rent" | "buying";
type RoofAge = "under5" | "5to15" | "over15" | "notsure";
type Shade = "minimal" | "some" | "heavy";

interface Answers {
  ownership: Ownership | null;
  roofAge: RoofAge | null;
  monthlyBill: string;
  shade: Shade | null;
  zip: string;
}

// ─── Progress bar ────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
      <div
        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Option button ───────────────────────────────────────────────────────────

function OptionBtn({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-medium transition-all border ${
        selected
          ? "bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm"
          : "bg-white border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Note callout ─────────────────────────────────────────────────────────────

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-sm text-amber-800 leading-relaxed mt-4">
      {children}
    </div>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-3xl p-8 w-full"
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.07)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QuizPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    ownership: null,
    roofAge: null,
    monthlyBill: "",
    shade: null,
    zip: "",
  });
  const [billError, setBillError] = useState("");
  const [zipError, setZipError] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const totalSteps = 5;

  // Navigation helpers
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  // ── Step 1 — Ownership ──────────────────────────────────────────────────

  function Step1() {
    return (
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Do you own your home?</h2>
        <div className="flex flex-col gap-3">
          {(
            [
              { value: "own", label: "Yes, I own it" },
              { value: "rent", label: "I rent" },
              { value: "buying", label: "I&apos;m buying soon" },
            ] as { value: Ownership; label: string }[]
          ).map((o) => (
            <OptionBtn
              key={o.value}
              label={o.value === "buying" ? "I'm buying soon" : o.label}
              selected={answers.ownership === o.value}
              onClick={() => {
                setAnswers((a) => ({ ...a, ownership: o.value }));
              }}
            />
          ))}
        </div>

        {answers.ownership === "rent" && (
          <Note>
            Solar is typically installed by homeowners, but your landlord might be interested.{" "}
            <strong>Here&apos;s what you can tell them:</strong> Solar adds property value, reduces
            operating costs, and can be passed on as a selling point. You&apos;re welcome to keep going
            to learn more, or{" "}
            <Link href="/" className="text-emerald-600 underline">
              return to the homepage
            </Link>
            .
          </Note>
        )}

        <button
          disabled={!answers.ownership}
          onClick={next}
          className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white font-bold py-4 rounded-2xl transition-colors"
          style={{ boxShadow: answers.ownership ? "0 4px 14px rgba(16,185,129,0.3)" : "none" }}
        >
          Continue →
        </button>
      </Card>
    );
  }

  // ── Step 2 — Roof age ──────────────────────────────────────────────────

  function Step2() {
    return (
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How old is your roof?</h2>
        <div className="flex flex-col gap-3">
          {(
            [
              { value: "under5", label: "Under 5 years" },
              { value: "5to15", label: "5–15 years" },
              { value: "over15", label: "Over 15 years" },
              { value: "notsure", label: "Not sure" },
            ] as { value: RoofAge; label: string }[]
          ).map((o) => (
            <OptionBtn
              key={o.value}
              label={o.label}
              selected={answers.roofAge === o.value}
              onClick={() => setAnswers((a) => ({ ...a, roofAge: o.value }))}
            />
          ))}
        </div>

        {answers.roofAge === "over15" && (
          <Note>
            You may want to replace your roof before installing solar panels. A new roof typically
            costs $8,000–$15,000 but protects your solar investment for 25+ years.
          </Note>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={back}
            className="px-6 py-4 rounded-2xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            disabled={!answers.roofAge}
            onClick={next}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white font-bold py-4 rounded-2xl transition-colors"
            style={{ boxShadow: answers.roofAge ? "0 4px 14px rgba(16,185,129,0.3)" : "none" }}
          >
            Continue →
          </button>
        </div>
      </Card>
    );
  }

  // ── Step 3 — Monthly bill ──────────────────────────────────────────────

  function Step3() {
    const handleContinue = () => {
      const val = parseFloat(answers.monthlyBill);
      if (!answers.monthlyBill || isNaN(val) || val <= 0) {
        setBillError("Please enter a monthly bill greater than $0.");
        return;
      }
      setBillError("");
      next();
    };

    return (
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What&apos;s your average monthly electric bill?
        </h2>
        <p className="text-sm text-gray-400 mb-6">This drives your solar system size estimate.</p>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg">
            $
          </span>
          <input
            type="number"
            min="1"
            placeholder="150"
            value={answers.monthlyBill}
            onChange={(e) => {
              setAnswers((a) => ({ ...a, monthlyBill: e.target.value }));
              setBillError("");
            }}
            className="w-full pl-8 pr-4 py-4 border border-gray-200 rounded-2xl text-lg font-semibold text-gray-900 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        {billError && <p className="text-red-500 text-sm mt-2">{billError}</p>}

        <div className="flex gap-3 mt-6">
          <button
            onClick={back}
            className="px-6 py-4 rounded-2xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-colors"
            style={{ boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }}
          >
            Continue →
          </button>
        </div>
      </Card>
    );
  }

  // ── Step 4 — Shade ──────────────────────────────────────────────────

  function Step4() {
    return (
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How much shade does your roof get?
        </h2>
        <div className="flex flex-col gap-3">
          {(
            [
              { value: "minimal", label: "Minimal shade (most of the day sunny)" },
              { value: "some", label: "Some shade" },
              { value: "heavy", label: "Heavy shade" },
            ] as { value: Shade; label: string }[]
          ).map((o) => (
            <OptionBtn
              key={o.value}
              label={o.label}
              selected={answers.shade === o.value}
              onClick={() => setAnswers((a) => ({ ...a, shade: o.value }))}
            />
          ))}
        </div>

        {answers.shade === "heavy" && (
          <Note>
            Heavy shading reduces solar output significantly — sometimes by 50% or more. A
            professional site assessment is recommended before committing to an installation.
          </Note>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={back}
            className="px-6 py-4 rounded-2xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            disabled={!answers.shade}
            onClick={next}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white font-bold py-4 rounded-2xl transition-colors"
            style={{ boxShadow: answers.shade ? "0 4px 14px rgba(16,185,129,0.3)" : "none" }}
          >
            Continue →
          </button>
        </div>
      </Card>
    );
  }

  // ── Step 5 — ZIP ──────────────────────────────────────────────────

  function Step5() {
    const handleSubmit = () => {
      if (!/^\d{5}$/.test(answers.zip)) {
        setZipError("Please enter a valid 5-digit ZIP code.");
        return;
      }
      setZipError("");
      next(); // go to results (step 6)
    };

    return (
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What&apos;s your ZIP code?</h2>
        <p className="text-sm text-gray-400 mb-6">
          We&apos;ll use this to pull live electricity rates for your area.
        </p>
        <input
          type="text"
          maxLength={5}
          placeholder="77001"
          value={answers.zip}
          onChange={(e) => {
            setAnswers((a) => ({ ...a, zip: e.target.value.replace(/\D/g, "").slice(0, 5) }));
            setZipError("");
          }}
          className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg font-semibold text-gray-900 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        />
        {zipError && <p className="text-red-500 text-sm mt-2">{zipError}</p>}

        <div className="flex gap-3 mt-6">
          <button
            onClick={back}
            className="px-6 py-4 rounded-2xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-colors"
            style={{ boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }}
          >
            See My Results →
          </button>
        </div>
      </Card>
    );
  }

  // ── Lead capture submit ───────────────────────────────────────────────

  async function handleLeadSubmit(e: React.FormEvent, scoreLabel: string) {
    e.preventDefault();
    if (!leadEmail) return;
    setLeadSubmitting(true);
    try {
      await fetch("https://formspree.io/f/mreoazqz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Quiz Lead — Save on Renewables",
          email: leadEmail,
          homeowner: answers.ownership ?? "",
          monthly_bill: answers.monthlyBill,
          zip: answers.zip,
          shade: answers.shade ?? "",
          score: scoreLabel,
        }),
      });
      setLeadSubmitted(true);
    } finally {
      setLeadSubmitting(false);
    }
  }

  // ── Step 6 — Results ──────────────────────────────────────────────────

  function Results() {
    const bill = parseFloat(answers.monthlyBill) || 150;

    // Score logic
    const isRenter = answers.ownership === "rent";
    const isHeavyShade = answers.shade === "heavy";
    const isHomeowner = answers.ownership === "own" || answers.ownership === "buying";
    const isHighBill = bill > 100;
    const isGoodShade = answers.shade === "minimal" || answers.shade === "some";

    let score: "great" | "good" | "explore";
    if (isRenter && isHeavyShade) {
      score = "explore";
    } else if (isHomeowner && isHighBill && isGoodShade) {
      score = "great";
    } else {
      score = "good";
    }

    const scoreConfig = {
      great: {
        label: "Great Fit for Solar",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        badge: "bg-emerald-500",
      },
      good: {
        label: "Good Candidate",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        badge: "bg-blue-500",
      },
      explore: {
        label: "Worth Exploring",
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        badge: "bg-amber-500",
      },
    }[score];

    // Key numbers
    const systemKw = (bill / 0.14 / 365 / 4.5) * 1000;
    const grossCost = systemKw * 2.16;
    const netCost = grossCost * 0.7;
    const payback = netCost / (bill * 12);

    return (
      <div className="flex flex-col gap-5">
        {/* Score card */}
        <Card>
          <div className="text-center mb-6">
            <span
              className={`inline-block text-white text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ${scoreConfig.badge} mb-4`}
            >
              {scoreConfig.label}
            </span>
            <h2 className="text-3xl font-black text-gray-900">Your Solar Profile</h2>
            <p className="text-gray-400 text-sm mt-1">Based on your answers</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Est. System Size</p>
              <p className="text-2xl font-bold text-gray-900">{systemKw.toFixed(1)} kW</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Rough Payback</p>
              <p className="text-2xl font-bold text-gray-900">{payback.toFixed(1)} yrs</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed mb-6">
            Estimated system size based on your ${bill}/month bill at 14¢/kWh and 4.5 peak sun hours.
            Payback uses $2.16/W installed cost after 30% federal tax credit.
          </p>

          {/* Email capture */}
          {!leadSubmitted ? (
            <form
              onSubmit={(e) => handleLeadSubmit(e, scoreConfig.label)}
              className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5"
            >
              <p className="text-sm font-semibold text-gray-800 mb-1">Get your free solar report</p>
              <p className="text-xs text-gray-500 mb-4">
                We&apos;ll email you a personalized Texas solar breakdown — no spam, no pressure.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors whitespace-nowrap"
                  style={{ boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }}
                >
                  {leadSubmitting ? "Sending…" : "Get My Solar Report →"}
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
              <p className="text-sm font-semibold text-emerald-700">We&apos;ll be in touch!</p>
              <p className="text-xs text-gray-500 mt-1">Check your inbox for your personalized solar report.</p>
            </div>
          )}

          {/* Primary CTA */}
          <Link
            href="/tools"
            className="block text-center text-white font-bold bg-emerald-500 hover:bg-emerald-600 rounded-2xl py-4 px-6 transition-colors"
            style={{ textDecoration: "none", boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }}
          >
            Calculate My Exact Savings →
          </Link>
        </Card>

        {/* Secondary CTA */}
        <div
          className="rounded-3xl p-6 text-center"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.75)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          <p className="text-sm text-gray-500 mb-3">
            Also worth checking: live Texas electricity rates — locking in a low rate maximizes your
            solar payback.
          </p>
          <a
            href="https://www.bestpwr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-emerald-700 font-bold bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl py-3 px-6 transition-colors text-sm"
            style={{ textDecoration: "none" }}
          >
            Compare Rates at BestPwr.com →
          </a>
        </div>

        {/* Retake */}
        <p className="text-center text-sm text-gray-400">
          <button
            onClick={() => {
              setStep(1);
              setAnswers({ ownership: null, roofAge: null, monthlyBill: "", shade: null, zip: "" });
            }}
            className="text-emerald-600 hover:underline"
          >
            Start over
          </button>
        </p>
      </div>
    );
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
            Solar Fit Quiz
          </span>
          <h1 className="text-3xl font-bold text-gray-900">
            {step <= totalSteps ? "Is Solar Right for You?" : "Your Results"}
          </h1>
          {step <= totalSteps && (
            <p className="text-sm text-gray-400 mt-1">
              Step {step} of {totalSteps}
            </p>
          )}
        </div>

        {/* Progress bar — only on steps 1–5 */}
        {step <= totalSteps && <ProgressBar step={step} total={totalSteps} />}

        {/* Step content */}
        <div>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}
          {step === 5 && <Step5 />}
          {step === 6 && <Results />}
        </div>
      </div>
    </main>
  );
}
