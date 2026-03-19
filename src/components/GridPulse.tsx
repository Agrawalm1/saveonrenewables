"use client";

import { useEffect, useState } from "react";

type LoadLevel = "Low" | "Moderate" | "High" | "Critical";

interface GridStatus {
  level: LoadLevel;
  gw: number;
  color: string;
  bgColor: string;
  dotColor: string;
  label: string;
}

function getStatus(hour: number): GridStatus {
  // Simulate ERCOT load by time of day (Texas peak = afternoon)
  if (hour >= 14 && hour <= 19) {
    return {
      level: "Critical",
      gw: 74.2,
      color: "text-red-700",
      bgColor: "bg-red-50 border-red-200",
      dotColor: "bg-red-500",
      label: "Critical Load",
    };
  } else if (hour >= 9 && hour <= 13) {
    return {
      level: "High",
      gw: 61.8,
      color: "text-orange-700",
      bgColor: "bg-orange-50 border-orange-200",
      dotColor: "bg-orange-400",
      label: "High Load",
    };
  } else if (hour >= 20 && hour <= 22) {
    return {
      level: "Moderate",
      gw: 52.4,
      color: "text-yellow-700",
      bgColor: "bg-yellow-50 border-yellow-200",
      dotColor: "bg-yellow-400",
      label: "Moderate Load",
    };
  } else {
    return {
      level: "Low",
      gw: 38.9,
      color: "text-emerald-700",
      bgColor: "bg-emerald-50 border-emerald-200",
      dotColor: "bg-emerald-500",
      label: "Low Load",
    };
  }
}

export default function GridPulse({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<GridStatus | null>(null);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    const now = new Date();
    setStatus(getStatus(now.getHours()));
    setUpdated(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
  }, []);

  if (!status) return null;

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${status.bgColor} ${status.color}`}>
        <span className={`w-2 h-2 rounded-full animate-pulse ${status.dotColor}`} />
        ERCOT {status.label} · {status.gw} GW
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-6 w-full"
      style={{
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${status.dotColor}`} />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Live ERCOT Status</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Texas Grid Load</h3>
        </div>
        <span className="text-xs text-gray-400">Updated {updated}</span>
      </div>

      {/* Load display */}
      <div className={`rounded-2xl border p-5 mb-4 ${status.bgColor}`}>
        <div className="flex items-end justify-between">
          <div>
            <p className={`text-4xl font-black ${status.color}`}>{status.gw} GW</p>
            <p className={`text-sm font-semibold mt-1 ${status.color}`}>{status.label}</p>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end gap-1 h-12">
            {[45, 58, 62, 70, status.gw, 68, 72].map((val, i) => (
              <div
                key={i}
                style={{ height: `${(val / 80) * 100}%` }}
                className={`w-4 rounded-t-sm ${i === 4 ? status.dotColor : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-sm text-gray-600 leading-relaxed">
        <span className="font-semibold text-gray-800">Demand is surging due to new Texas Data Centers.</span>{" "}
        Protect your rates today — home solar locks you in against grid volatility.
      </p>
    </div>
  );
}
