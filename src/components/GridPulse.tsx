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
  source: "ercot" | "simulated";
}

function classifyLoad(gw: number): Omit<GridStatus, "gw" | "source"> {
  if (gw >= 68) {
    return {
      level: "Critical",
      color: "text-red-700",
      bgColor: "bg-red-50 border-red-200",
      dotColor: "bg-red-500",
      label: "Critical Load",
    };
  } else if (gw >= 55) {
    return {
      level: "High",
      color: "text-orange-700",
      bgColor: "bg-orange-50 border-orange-200",
      dotColor: "bg-orange-400",
      label: "High Load",
    };
  } else if (gw >= 45) {
    return {
      level: "Moderate",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50 border-yellow-200",
      dotColor: "bg-yellow-400",
      label: "Moderate Load",
    };
  } else {
    return {
      level: "Low",
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
    async function load() {
      try {
        const res = await fetch("/api/grid-status");
        const json = await res.json();
        const gw: number = json.gw;
        const source: "ercot" | "simulated" = json.source ?? "simulated";
        setStatus({ gw, source, ...classifyLoad(gw) });
        setUpdated(
          new Date(json.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } catch {
        // silent fallback — leave status null, show nothing
      }
    }

    load();
    // Refresh every 5 minutes
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return (
    <div className="rounded-3xl p-6 w-full animate-pulse" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 4px 30px rgba(0,0,0,0.06)" }}>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-5" />
      <div className="rounded-2xl bg-gray-100 p-5 mb-4 h-24" />
      <div className="h-3 bg-gray-200 rounded w-3/4" />
    </div>
  );

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${status.bgColor} ${status.color}`}
      >
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
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {status.source === "ercot" ? "Live ERCOT Data" : "ERCOT Status"}
            </span>
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
        <span className="font-semibold text-gray-800">
          Demand is surging due to new Texas Data Centers.
        </span>{" "}
        Protect your rates today — home solar locks you in against grid volatility.
      </p>
    </div>
  );
}
