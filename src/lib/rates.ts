/**
 * Fetches the current best 12-month fixed rate from PowerToChoose.org.
 * Response is cached by Next.js for 7 days.
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

export async function fetchCurrentBestRate(zipCode = "77001"): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.powertochoose.org/api/PowerToChoose/plans?zip_code=${zipCode}&only_renewable=0&plan_type=1`,
      { next: { revalidate: 604800 } } // cache 7 days
    );
    if (!res.ok) return null;

    const json: PtcResponse = await res.json();
    if (!Array.isArray(json.data)) return null;

    const fixed12 = json.data.filter(
      (p) => p.term_value === 12 && p.price_kwh1000 > 0
    );
    if (!fixed12.length) return null;

    const best = Math.min(...fixed12.map((p) => p.price_kwh1000));
    return Math.round(best * 10) / 10;
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
