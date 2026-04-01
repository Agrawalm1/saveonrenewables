/**
 * Fetches rate data from PowerToChoose.org.
 * Responses are cached by Next.js for 24 hours.
 */

interface PtcPlan {
  price_kwh500: number;
  price_kwh1000: number;
  price_kwh2000: number;
  term_value: number;
  renewable_energy_id: number;
}

interface PtcResponse {
  data: PtcPlan[];
}

async function fetchPlans(zipCode: string): Promise<PtcPlan[]> {
  const res = await fetch(
    `https://api.powertochoose.org/api/PowerToChoose/plans?zip_code=${zipCode}&only_renewable=0&plan_type=1`,
    { next: { revalidate: 86400 } } // cache 24 hours
  );
  if (!res.ok) return [];
  const json: PtcResponse = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

/** Best (lowest) 12-month fixed rate in cents/kWh. Used for rate tiles. */
export async function fetchCurrentBestRate(zipCode = "77001"): Promise<number | null> {
  try {
    const plans = await fetchPlans(zipCode);
    const fixed12 = plans.filter((p) => p.term_value === 12 && p.price_kwh1000 > 0);
    if (!fixed12.length) return null;
    const best = Math.min(...fixed12.map((p) => p.price_kwh1000));
    return Math.round(best * 10) / 10;
  } catch {
    return null;
  }
}

/**
 * Median 12-month fixed rate in cents/kWh.
 * More representative of what the average homeowner actually pays —
 * used for solar savings calculations.
 */
export async function fetchMarketRate(zipCode = "77001"): Promise<number | null> {
  try {
    const plans = await fetchPlans(zipCode);
    const fixed12 = plans
      .filter((p) => p.term_value === 12 && p.price_kwh1000 > 0)
      .map((p) => p.price_kwh1000)
      .sort((a, b) => a - b);
    if (!fixed12.length) return null;
    const mid = Math.floor(fixed12.length / 2);
    const median = fixed12.length % 2 !== 0
      ? fixed12[mid]
      : (fixed12[mid - 1] + fixed12[mid]) / 2;
    return Math.round(median * 10) / 10;
  } catch {
    return null;
  }
}

export function getCurrentMonthKey(): { month: string; label: string } {
  const d = new Date();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return {
    month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    label: `${months[d.getMonth()]} ${d.getFullYear()}`,
  };
}
