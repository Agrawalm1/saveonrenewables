"use client";

import { useState } from "react";
import type { Metadata } from "next";

// Note: metadata export must be in a server component.
// We export it here for Next.js to pick up at build time.
// The page is a client component for form interactivity.

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("https://formspree.io/f/mreoazqz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Contact Form — Save on Renewables",
          name,
          email,
          message,
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-14">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Get in Touch
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Have a question, feedback, or partnership inquiry? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Form card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 text-2xl font-bold">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-500">Thanks for reaching out. We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can we help?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-colors"
                style={{ boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }}
              >
                {submitting ? "Sending…" : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
