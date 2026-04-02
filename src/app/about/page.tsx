import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · Save on Renewables",
  description:
    "Texas-based solar advisory platform helping homeowners make data-driven solar decisions.",
};

export default function AboutPage() {
  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-14">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            About Us
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Save on Renewables</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            We&apos;re a Texas-based solar advisory platform helping homeowners make confident,
            data-driven decisions about solar energy.
          </p>
        </div>

        {/* Our Mission */}
        <div
          className="rounded-3xl p-8 mb-6"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Save on Renewables was built because the Texas solar market is confusing. Installers
            have sales incentives. National comparison sites don&apos;t understand Texas&apos;s
            deregulated market. We built an independent, honest advisor that gives you real
            numbers — no pressure, no commission on installations.
          </p>
        </div>

        {/* What Makes Us Different */}
        <div
          className="rounded-3xl p-8 mb-6"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-5">What Makes Us Different</h2>
          <ul className="space-y-3">
            {[
              "Texas-specific: we understand ERCOT, deregulation, and buyback plans",
              "Live data: rates update automatically from PowerToChoose",
              "No installer kickbacks: we don't earn from installation referrals",
              "Free forever: the calculator and quiz cost nothing to use",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 text-xs font-bold">✓</span>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div
          className="rounded-3xl p-8 mb-6"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Questions or feedback? Reach us at{" "}
            <span className="text-gray-400 italic">[your email here]</span>.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl transition-colors text-sm"
            style={{ boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }}
          >
            Send Us a Message →
          </Link>
        </div>
      </div>
    </main>
  );
}
