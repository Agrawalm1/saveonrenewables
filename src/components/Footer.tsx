import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-20">
      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* BestPWR Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-center mb-12 shadow-lg shadow-emerald-100">
          <p className="text-white/80 text-sm font-medium mb-1 uppercase tracking-widest">Texas Energy Marketplace</p>
          <h3 className="text-white text-2xl font-bold mb-4">
            Ready to switch? Compare real-time Texas rates.
          </h3>
          <a
            href="https://www.bestpwr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-emerald-700 font-bold px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors shadow-md"
          >
            Compare Real-Time Texas Rates at bestpwr.com →
          </a>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-sm">
          <div>
            <p className="font-semibold text-gray-900 mb-3">Tools</p>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/tools" className="hover:text-emerald-600">Solar Advisor</Link></li>
              <li><Link href="/quiz" className="hover:text-emerald-600">Solar Quiz</Link></li>
              <li><Link href="/grid-pulse" className="hover:text-emerald-600">Grid Pulse</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-3">Learn</p>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/buyback" className="hover:text-emerald-600">Buyback Plans</Link></li>
              <li><Link href="/solar-credits" className="hover:text-emerald-600">Solar Credits</Link></li>
              <li><Link href="/cities" className="hover:text-emerald-600">Browse Cities</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-3">Cities</p>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/cities/houston" className="hover:text-emerald-600">Houston</Link></li>
              <li><Link href="/cities/dallas" className="hover:text-emerald-600">Dallas</Link></li>
              <li><Link href="/cities/austin" className="hover:text-emerald-600">Austin</Link></li>
              <li><Link href="/cities/san-antonio" className="hover:text-emerald-600">San Antonio</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-3">Partner</p>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="https://www.bestpwr.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600">
                  bestpwr.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          © 2026 SaveOnRenewables.com · For informational purposes only · Not financial advice
        </p>
      </div>
    </footer>
  );
}
