/**
 * fetch-latest-rate.ts
 *
 * Fetches the single cheapest 12-month fixed plan for ZIP 77002 (Downtown Houston)
 * from the PowerToChoose API and appends it to data/rate-history.json as the
 * current month's entry.
 *
 * Run:  npx ts-node scripts/fetch-latest-rate.ts
 *   or: npm run fetch-latest-rate   (after adding the script to package.json)
 */

import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DATA_PATH = path.join(__dirname, "../data/rate-history.json");
const API_URL =
  "https://api.powertochoose.org/api/PowerToChoose/plans?zip_code=77002";

interface PtcPlan {
  company_name: string;
  plan_name: string;
  price_kwh500: number;  // rate at 500 kWh usage
  price_kwh1000: number; // rate at 1000 kWh usage
  price_kwh2000: number; // rate at 2000 kWh usage
  term_value: number;    // contract length in months
  plan_type_name: string;
}

interface PtcResponse {
  data: PtcPlan[];
}

interface RateEntry {
  month: string;
  label: string;
  rate: number;
  isCurrent?: boolean;
  source?: string;
  provider?: string;
  plan?: string;
}

interface RateHistory {
  region: string;
  unit: string;
  lastUpdated: string;
  months: RateEntry[];
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(date: Date): string {
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

async function fetchCheapest12MonthRate(): Promise<{
  rate: number;
  provider: string;
  plan: string;
}> {
  console.log(`Fetching plans from PowerToChoose API...`);
  const res = await fetch(API_URL, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`PowerToChoose API returned ${res.status}: ${res.statusText}`);
  }

  const json: PtcResponse = await res.json();
  const plans = json.data ?? [];

  if (plans.length === 0) {
    throw new Error("No plans returned from API.");
  }

  // Filter: 12-month fixed plans only
  const fixed12 = plans.filter(
    (p) => p.term_value === 12 && p.plan_type_name?.toLowerCase().includes("fixed")
  );

  const pool = fixed12.length > 0 ? fixed12 : plans;

  // Sort by 1000 kWh rate (most representative for Texas households)
  pool.sort((a, b) => a.price_kwh1000 - b.price_kwh1000);

  const cheapest = pool[0];
  return {
    rate: parseFloat((cheapest.price_kwh1000 * 100).toFixed(2)), // convert $/kWh → ¢/kWh
    provider: cheapest.company_name,
    plan: cheapest.plan_name,
  };
}

async function run() {
  const history: RateHistory = JSON.parse(readFileSync(DATA_PATH, "utf8"));

  const now = new Date();
  const key = monthKey(now);
  const label = monthLabel(now);

  // Fetch latest rate
  const { rate, provider, plan } = await fetchCheapest12MonthRate();
  console.log(`Cheapest 12-month plan: ${provider} — ${plan} @ ${rate}¢/kWh`);

  // Clear previous isCurrent flags
  history.months.forEach((m) => delete m.isCurrent);

  // Check if this month already exists — update it, otherwise append
  const existingIdx = history.months.findIndex((m) => m.month === key);
  const entry: RateEntry = { month: key, label, rate, isCurrent: true, source: "PowerToChoose", provider, plan };

  if (existingIdx >= 0) {
    history.months[existingIdx] = entry;
    console.log(`Updated existing entry for ${key}.`);
  } else {
    history.months.push(entry);
    console.log(`Appended new entry for ${key}.`);
  }

  // Keep rolling 24-month window
  if (history.months.length > 24) {
    history.months = history.months.slice(-24);
  }

  history.lastUpdated = now.toISOString();
  writeFileSync(DATA_PATH, JSON.stringify(history, null, 2));
  console.log(`rate-history.json updated. Current rate: ${rate}¢/kWh`);
}

run().catch((err) => {
  console.error("fetch-latest-rate failed:", err.message);
  process.exit(1);
});
