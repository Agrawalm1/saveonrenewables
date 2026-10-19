"use client";

import { useState } from "react";

interface FormState {
  zip: string;
  bill: string;
  email: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function LeadCaptureForm() {
  const [form, setForm] = useState<FormState>({ zip: "", bill: "", email: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://formspree.io/f/mreoazqz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Solar Lead — SaveOnRenewables (Buyback Page)",
          zip: form.zip.trim(),
          monthly_bill: `$${form.bill}`,
          email: form.email.trim(),
          source: "buyback_lead_capture",
        }),
      });
      if (!res.ok) {
        setErrorMsg("Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-3xl p-8 text-center"
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.75)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
        }}
      >
        <div className="text-4xl mb-3">&#10003;</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re on the list!</h3>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
          We&apos;ll match your ZIP and usage to the highest buyback rate available and notify you of rate changes.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-7"
      style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.75)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
      }}
    >
      <div className="mb-5">
        <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
          Free &middot; No Pressure
        </span>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Find Your Highest Buyback Rate</h2>
        <p className="text-sm text-gray-500">
          Enter your Houston ZIP and bill &mdash; we&apos;ll match you to the best solar buyback plan available.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5" htmlFor="lc-zip">
              ZIP Code
            </label>
            <input
              id="lc-zip"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="77001"
              value={form.zip}
              onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
              required
              pattern="[0-9]{5}"
              className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5" htmlFor="lc-bill">
              Avg Monthly Electric Bill
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium pointer-events-none">
                $
              </span>
              <input
                id="lc-bill"
                type="number"
                min="1"
                max="9999"
                placeholder="220"
                value={form.bill}
                onChange={(e) => setForm((f) => ({ ...f, bill: e.target.value }))}
                required
                className="w-full rounded-xl border border-gray-200 bg-white/80 pl-8 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5" htmlFor="lc-email">
            Email Address
          </label>
          <input
            id="lc-email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
            className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-bold text-sm rounded-2xl px-6 py-4 transition-colors shadow-md shadow-emerald-200"
        >
          {status === "loading" ? "Checking rates\u2026" : "Get Highest Solar Buyback Rates \u2192"}
        </button>

        <p className="text-center text-xs text-gray-400">
          100% Free. No spam guarantee. Rate data powered by BestPwr.
        </p>
      </form>
    </div>
  );
}
