import Link from "next/link";

export const metadata = {
  title: "Page Not Found · Save on Renewables",
};

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <div className="max-w-md w-full text-center">
        <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
          404
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          That page doesn&apos;t exist. Try one of these instead:
        </p>

        <div
          className="rounded-3xl p-6 mb-8 text-left"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          }}
        >
          <ul className="space-y-3">
            {[
              { href: "/tools", label: "Solar Savings Calculator" },
              { href: "/buyback", label: "Buyback Plans" },
              { href: "/grid-pulse", label: "Texas Grid Pulse" },
              { href: "/quiz", label: "Solar Fit Quiz" },
              { href: "/cities", label: "Browse Cities" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center justify-between text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors py-1"
                >
                  {label}
                  <span className="text-emerald-400">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl transition-colors"
          style={{ boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
