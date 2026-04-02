#!/usr/bin/env node
/**
 * update-rate-history.js
 * Run by GitHub Actions on the 1st of each month.
 * Fetches the current best 12-month fixed rate from PowerToChoose
 * for Houston (77001) and appends it to data/rate-history.json.
 */

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data/rate-history.json");
const ZIP = "77001";

async function fetchMedianRate(zipCode) {
  const url = `https://api.powertochoose.org/api/PowerToChoose/plans?zip_code=${zipCode}&only_renewable=0&plan_type=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`PowerToChoose API error: ${res.status}`);

  const json = await res.json();
  const plans = Array.isArray(json.data) ? json.data : [];

  const rates = plans
    .filter((p) => p.term_value === 12 && p.price_kwh1000 > 0)
    .map((p) => p.price_kwh1000)
    .sort((a, b) => a - b);

  if (!rates.length) throw new Error("No 12-month fixed plans found");

  // Median rate — representative of what homeowners actually pay
  const mid = Math.floor(rates.length / 2);
  const median =
    rates.length % 2 !== 0 ? rates[mid] : (rates[mid - 1] + rates[mid]) / 2;

  return Math.round(median * 10) / 10;
}

async function main() {
  const now = new Date();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const monthLabel = `${months[now.getMonth()]} ${now.getFullYear()}`;

  console.log(`Fetching median rate for ${monthLabel} (ZIP ${ZIP})...`);
  const rate = await fetchMedianRate(ZIP);
  console.log(`  Median 12-month rate: ${rate}¢/kWh`);

  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  // Don't add duplicates
  const exists = data.months.some((m) => m.month === monthKey);
  if (exists) {
    console.log(`  ${monthLabel} already in history — updating rate.`);
    const entry = data.months.find((m) => m.month === monthKey);
    entry.rate = rate;
  } else {
    data.months.push({ month: monthKey, label: monthLabel, rate });
    console.log(`  Appended ${monthLabel} → ${rate}¢`);
  }

  // Keep last 24 months only
  data.months = data.months.slice(-24);
  data.lastUpdated = now.toISOString();
  data.region = "Harris County, TX";
  data.unit = "¢/kWh";

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  console.log("  Saved to data/rate-history.json");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
