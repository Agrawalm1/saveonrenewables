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
              <li><Link href="/cities" className="hover:text-emerald-600">Browse Cities</Link></li>
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

        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} SaveOnRenewables.com · For informational purposes only · Not financial advice ·{" "}
          <Link href="/privacy" className="hover:text-emerald-600">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
}
