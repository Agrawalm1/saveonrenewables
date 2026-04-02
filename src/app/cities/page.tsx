import Link from "next/link";
import { cities } from "@/lib/cities";

export const metadata = {
  title: "Solar by City · Save on Renewables",
  description:
    "Explore solar savings estimates and live electricity rates for major Texas cities — Houston, Dallas, Austin, San Antonio, and more.",
};

export default function CitiesPage() {
  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Texas Solar · By City
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Solar Savings in Your Texas City
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Select your city to see live electricity rates, estimated system costs, and your
            personalized solar savings — all built on real market data.
          </p>
        </div>

        {/* City cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="group rounded-3xl p-7 flex flex-col gap-3 transition-transform hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.75)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
                textDecoration: "none",
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {city.name}
                </h2>
                <span className="text-emerald-500 text-lg">→</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{city.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                  {city.peakSunHours} peak sun hrs
                </span>
                <span className="text-xs text-gray-400">ZIP {city.zip}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer nudge */}
        <p className="text-center text-sm text-gray-400 mt-12">
          Don&apos;t see your city?{" "}
          <Link href="/tools" className="text-emerald-600 hover:underline font-medium">
            Use the Solar Advisor
          </Link>{" "}
          with any Texas ZIP code.
        </p>
      </div>
    </main>
  );
}
