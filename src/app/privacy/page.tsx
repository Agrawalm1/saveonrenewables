import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · Save on Renewables",
  description: "Privacy policy for SaveOnRenewables.com — what we collect, how we use it, and your rights.",
};

export default function PrivacyPage() {
  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0f9ff 50%, #fafafa 100%)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-14">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Legal
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: April 2026</p>
        </div>

        <div className="flex flex-col gap-6">
          {/* What we collect */}
          <section
            className="rounded-3xl p-8"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">What We Collect</h2>
            <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Email addresses</strong> — only when you voluntarily submit them via our
                  opt-in forms (solar alert signup, quiz lead capture, contact form).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Usage analytics</strong> — anonymous page views and interactions via
                  Vercel Analytics. No personal identifiers are stored.
                </span>
              </li>
            </ul>
          </section>

          {/* How we use it */}
          <section
            className="rounded-3xl p-8"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">How We Use It</h2>
            <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500 font-bold">•</span>
                <span>
                  Email addresses are used solely to send Texas solar market updates and
                  information you opted into. We do not sell, rent, or share your email with
                  third parties for marketing purposes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500 font-bold">•</span>
                <span>
                  Analytics data is used to understand how visitors use the site so we can
                  improve it. This data is anonymous and aggregated.
                </span>
              </li>
            </ul>
          </section>

          {/* Third parties */}
          <section
            className="rounded-3xl p-8"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Formspree</strong> — processes form submissions on our behalf. Your
                  submitted data is transmitted securely. See{" "}
                  <a
                    href="https://formspree.io/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    Formspree&apos;s Privacy Policy
                  </a>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Vercel Analytics</strong> — anonymous usage data collected by our
                  hosting provider. No cookies or personal identifiers used. See{" "}
                  <a
                    href="https://vercel.com/docs/analytics/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    Vercel&apos;s Privacy Policy
                  </a>
                  .
                </span>
              </li>
            </ul>
          </section>

          {/* Your rights */}
          <section
            className="rounded-3xl p-8"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500 font-bold">•</span>
                <span>
                  You can unsubscribe from our emails at any time using the unsubscribe link
                  in any email we send.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500 font-bold">•</span>
                <span>
                  To request deletion of your data, email us at{" "}
                  <span className="text-gray-400 italic">[your email here]</span> with the
                  subject line &quot;Data Deletion Request&quot;.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
