"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const primaryLinks = [
  { label: "Solar Advisor", href: "/tools" },
  { label: "Buyback Plans", href: "/buyback" },
  { label: "Grid Pulse", href: "/grid-pulse" },
  { label: "About", href: "/about" },
];

const allLinks = [
  ...primaryLinks,
  { label: "Take the Quiz", href: "/quiz" },
  { label: "Browse Cities", href: "/cities" },
  { label: "Solar Credits", href: "/solar-credits" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 20px rgba(0,0,0,0.04)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Save on Renewables"
            style={{ height: "80px", width: "auto", display: "block" }}
          />
        </Link>

        {/* Primary nav — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {primaryLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* CTA — desktop */}
          <a
            href="https://www.bestpwr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm shadow-emerald-200"
          >
            Compare Rates →
          </a>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-1">
          {allLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://www.bestpwr.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 text-center bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
          >
            Compare Rates at bestpwr.com →
          </a>
        </div>
      )}
    </header>
  );
}
