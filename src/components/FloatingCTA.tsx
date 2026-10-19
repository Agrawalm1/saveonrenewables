"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 md:hidden px-6">
      <Link
        href="/tools"
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-300 transition-colors"
      >
        Get My Savings Estimate →
      </Link>
    </div>
  );
}
