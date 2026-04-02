"use client";

import { useState } from "react";

export default function SolarAlertSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/mreoazqz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          _subject: "New Solar Alert Signup — Save on Renewables",
          type: "solar_alert",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Could not connect. Please try again.");
    }
    setLoading(false);
  }

  return (
    <section className="py-16 px-4">
      <div
        className="max-w-xl mx-auto rounded-3xl p-10 text-center"
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
          boxShadow: "0 8px 40px rgba(6,78,59,0.25)",
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-3">
          Solar Alerts
        </p>
        <h2 className="text-2xl font-black text-white mb-2">
          Stay ahead of the market.
        </h2>
        <p className="text-sm text-emerald-100/80 mb-8">
          We&apos;ll notify you when Texas buyback rates change, new solar incentives
          are announced, or ERCOT conditions make solar a no-brainer.
        </p>

        {submitted ? (
          <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-8">
            <p className="text-2xl mb-2">✓</p>
            <p className="text-white font-bold text-lg">You&apos;re on the list.</p>
            <p className="text-emerald-100/70 text-sm mt-1">
              We&apos;ll reach out when something important changes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white/90 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 bg-emerald-400 hover:bg-emerald-300 disabled:bg-emerald-400/50 text-emerald-950 font-bold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              {loading ? "Subscribing…" : "Alert Me →"}
            </button>
          </form>
        )}

        <p className="text-xs text-emerald-100/40 mt-4">No spam. Unsubscribe any time.</p>
      </div>
    </section>
  );
}
