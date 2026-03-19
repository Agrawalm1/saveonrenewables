"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RateEntry {
  month: string;
  label: string;
  rate: number;
  isCurrent?: boolean;
}

interface Props {
  months: RateEntry[];
  region?: string;
}

export default function RateHistoryChart({ months, region = "Harris County, TX" }: Props) {
  const labels = months.map((m) => m.label);
  const rates = months.map((m) => m.rate);

  const currentIdx = months.findIndex((m) => m.isCurrent);
  const currentRate = currentIdx >= 0 ? rates[currentIdx] : rates[rates.length - 1];
  const maxRate = Math.max(...rates);
  const minRate = Math.min(...rates);

  // Y-axis: auto-scale with padding so the valley is visually dramatic
  const yMin = Math.max(0, Math.floor(minRate) - 1);
  const yMax = Math.ceil(maxRate) + 1;

  // Point colors: current = emerald, summer peaks = red, rest = slate
  const pointColors = rates.map((r, i) => {
    if (i === currentIdx) return "#10B981"; // emerald — the valley
    if (r >= 13.0) return "#EF4444";        // red — summer peak
    return "#94A3B8";                        // slate — normal
  });

  const pointRadii = rates.map((_, i) => (i === currentIdx ? 8 : 4));
  const pointHoverRadii = rates.map((_, i) => (i === currentIdx ? 10 : 6));

  const data = {
    labels,
    datasets: [
      {
        label: "Avg Rate (¢/kWh)",
        data: rates,
        fill: true,
        tension: 0.4,
        borderColor: "#10B981",
        borderWidth: 2.5,
        backgroundColor: (context: { chart: ChartJS }) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(16,185,129,0.18)");
          gradient.addColorStop(1, "rgba(16,185,129,0.01)");
          return gradient;
        },
        pointBackgroundColor: pointColors,
        pointBorderColor: pointColors,
        pointRadius: pointRadii,
        pointHoverRadius: pointHoverRadii,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#94A3B8",
          font: { size: 11 },
          maxRotation: 45,
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        min: yMin,
        max: yMax,
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: {
          color: "#94A3B8",
          font: { size: 11 },
          callback: (value) => `${value}¢`,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(255,255,255,0.95)",
        titleColor: "#111827",
        bodyColor: "#6B7280",
        borderColor: "rgba(0,0,0,0.08)",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (item: TooltipItem<"line">) => {
            const idx = item.dataIndex;
            const isCurr = months[idx]?.isCurrent;
            return ` ${item.formattedValue}¢/kWh${isCurr ? "  ← Current (Best Rate)" : ""}`;
          },
        },
      },
    },
  };

  return (
    <div
      className="rounded-3xl p-7 w-full"
      style={{
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">24-Month Rate History</h3>
          <p className="text-sm text-gray-400">{region} · Cheapest 12-month fixed plan</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-emerald-500">{currentRate}¢</p>
          <p className="text-xs text-emerald-600 font-semibold">Current Rate</p>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 260 }}>
        <Line data={data} options={options} />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-5 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          Current rate (valley)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
          Summer peak (&gt;13¢)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-400 inline-block" />
          Historical average
        </span>
      </div>
    </div>
  );
}
