/**
 * fetch-buyback.mjs
 *
 * Fetches the latest Houston solar buyback rates for Chariot Energy,
 * Green Mountain Energy, and Rhythm Energy, then saves to data/buyback-data.json.
 *
 * NOTE: Chariot, Green Mountain, and Rhythm do not expose public JSON APIs for
 * real-time buyback rates. To fetch live data you would add web scraping here
 * (e.g. using 'playwright' or 'cheerio') pointed at each provider's rate page.
 *
 * For now, this script simulates realistic rate fluctuations based on seed values,
 * so the full pipeline (cron → JSON → page) works end-to-end. Replace the
 * simulateRateFetch() calls below with real scrapers when available.
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "../data/buyback-data.json");
const HOT_DEAL_THRESHOLD = 0.05; // 5%

// ---------------------------------------------------------------------------
// Simulated fetchers — replace each with a real scraper when ready
// ---------------------------------------------------------------------------

async function fetchChariotRate() {
  // Real target: https://chariotenergy.com/electricity-plans/solar/
  // Returns $/kWh buyback rate
  return simulateRateFetch(0.07, 0.004); // fixed plan — small drift
}

async function fetchGreenMountainRate() {
  // Real target: https://www.greenmountainenergy.com/electricity-plans/solar/
  return simulateRateFetch(0.055, 0.008); // variable — moderate drift
}

async function fetchRhythmRate() {
  // Real target: https://www.gotrhythm.com/solar-buyback
  return simulateRateFetch(0.06, 0.01); // variable — higher drift
}

/**
 * Simulates a market rate with small random fluctuations.
 * Replace with real fetch + parse logic.
 */
function simulateRateFetch(baseRate, maxDelta) {
  const delta = (Math.random() * 2 - 1) * maxDelta; // ± maxDelta
  return parseFloat(Math.max(0.01, baseRate + delta).toFixed(4));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function run() {
  console.log(`[${new Date().toISOString()}] Fetching buyback rates...`);

  // Load existing data
  let existing;
  try {
    existing = JSON.parse(readFileSync(DATA_PATH, "utf8"));
  } catch {
    console.error("Could not read buyback-data.json — using empty baseline.");
    existing = { plans: [] };
  }

  // Map existing plans by id for quick lookup (rate + url)
  const previousById = {};
  for (const p of existing.plans ?? []) {
    previousById[p.id] = { rate: p.currentRate, url: p.url };
  }

  // Fetch latest rates (simulate all 4 providers)
  const [chariotRate, almIkaRate, rhythmRate, greenMountainRate] = await Promise.all([
    fetchChariotRate(),
    simulateRateFetch(0.065, 0.008),  // Almika
    fetchRhythmRate(),
    fetchGreenMountainRate(),
  ]);

  // Provider URL registry — preserved even after rate updates
  const URLS = {
    "chariot-greenvolt":   "https://chariotenergy.com/solar-buyback",
    "almika-solar":        "https://almikasolar.net",
    "rhythm-sellback":     "https://gotrhythm.com/texas-solar-buyback",
    "green-mountain-solar":"https://greenmountainenergy.com/solar",
  };

  function buildPlan(id, provider, plan, description, rateType, newRate) {
    const prev = previousById[id]?.rate ?? null;
    const changePercent =
      prev !== null ? parseFloat((((newRate - prev) / prev) * 100).toFixed(2)) : null;
    const hotDeal =
      changePercent !== null && Math.abs(changePercent) > HOT_DEAL_THRESHOLD * 100;

    if (hotDeal) {
      console.log(
        `  🔥 Hot Deal detected for ${provider} — rate changed ${changePercent > 0 ? "+" : ""}${changePercent}%`
      );
    }

    return { id, provider, plan, description, url: URLS[id], currentRate: newRate, previousRate: prev, rateType, hotDeal, changePercent };
  }

  const plans = [
    buildPlan("chariot-greenvolt",   "Chariot Energy",        "GreenVolt Solar Buyback",   "100% renewable, fixed buyback rate — no surprises on your credit.",         "fixed",    chariotRate),
    buildPlan("almika-solar",        "Almika Solar",           "Solar Buyback Plan",         "Competitive buyback rates for Texas homeowners with flexible contract terms.","variable", almIkaRate),
    buildPlan("rhythm-sellback",     "Rhythm Energy",          "Solar Sellback",             "Time-of-use pricing with strong afternoon peak buyback potential.",           "variable", rhythmRate),
    buildPlan("green-mountain-solar","Green Mountain Energy",  "Solar Buyback Rewards",      "Crediting excess solar energy at competitive variable rates.",                "variable", greenMountainRate),
  ];

  const output = {
    lastUpdated: new Date().toISOString(),
    plans,
  };

  writeFileSync(DATA_PATH, JSON.stringify(output, null, 2));
  console.log(`[${new Date().toISOString()}] buyback-data.json updated.`);
  plans.forEach((p) => {
    console.log(
      `  ${p.provider}: $${p.currentRate}/kWh ${p.hotDeal ? "🔥 HOT DEAL" : ""}`
    );
  });
}

run().catch((err) => {
  console.error("fetch-buyback failed:", err);
  process.exit(1);
});
