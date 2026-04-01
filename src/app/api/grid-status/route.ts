import { NextResponse } from "next/server";

interface GridStatusResponse {
  gw: number;
  source: "ercot" | "simulated";
  updatedAt: string;
}

/** Time-of-day simulation fallback (existing behavior). */
function simulate(): number {
  const hour = new Date().getHours();
  if (hour >= 14 && hour <= 19) return 74.2;
  if (hour >= 9 && hour <= 13) return 61.8;
  if (hour >= 20 && hour <= 22) return 52.4;
  return 38.9;
}

/** Fetch current ERCOT system-wide actual load in GW. */
async function fetchErcotLoad(): Promise<number | null> {
  const now = new Date();
  const start = new Date(now.getTime() - 60 * 60 * 1000); // last hour

  const fmt = (d: Date) =>
    d.toISOString().replace("T", " ").slice(0, 19);

  const url =
    `https://www.ercot.com/api/1/services/read/getSummaryStats` +
    `?reportTypeId=13462` +
    `&startDateTime=${encodeURIComponent(fmt(start))}` +
    `&endDateTime=${encodeURIComponent(fmt(now))}`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 }, // cache 5 min
  });

  if (!res.ok) return null;

  // ERCOT returns { data: [{ DeliveredMW: number, ... }] }
  const json = await res.json();
  const rows: { DeliveredMW?: number }[] = json?.data ?? [];
  if (!rows.length) return null;

  // Take the most recent reading
  const mw = rows[rows.length - 1]?.DeliveredMW;
  if (typeof mw !== "number" || mw <= 0) return null;

  return Math.round((mw / 1000) * 10) / 10; // MW → GW, 1 decimal
}

export async function GET() {
  let gw: number;
  let source: "ercot" | "simulated";

  try {
    const live = await fetchErcotLoad();
    if (live !== null) {
      gw = live;
      source = "ercot";
    } else {
      gw = simulate();
      source = "simulated";
    }
  } catch {
    gw = simulate();
    source = "simulated";
  }

  const body: GridStatusResponse = {
    gw,
    source,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
  });
}
