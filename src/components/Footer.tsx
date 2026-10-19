import Link from "next/link";
import { cities } from "@/lib/cities";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-20">
      <div className="max-w-5xl mx-auto px-6 py-14">
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
              <li><Link href="/guides" className="hover:text-emerald-600">Guides</Link></li>
              <li><Link href="/houston-solar-buyback-plans" className="hover:text-emerald-600">Houston Solar</Link></li>
              <li><Link href="/dallas-solar-buyback-plans" className="hover:text-emerald-600">Dallas Solar</Link></li>
              <li><Link href="/austin-solar-buyback-plans" className="hover:text-emerald-600">Austin Solar</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-3">Cities</p>
            <ul className="space-y-2 text-gray-500">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/cities/${city.slug}`} className="hover:text-emerald-600">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-3">Company</p>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li><Link href="/about" className="hover:text-emerald-600">About</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-600">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center mb-4">
          <a
            href="https://bestpwr.com?utm_source=saveonrenewables&utm_medium=referral&utm_campaign=footer_badge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-600 transition-colors font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            Powered by BESTPWR &mdash; Texas Energy Data &amp; Analytics
          </a>
        </div>
        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} SaveOnRenewables.com &middot; For informational purposes only &middot; Not financial advice &middot;{" "}
          <Link href="/privacy" className="hover:text-emerald-600">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
}
