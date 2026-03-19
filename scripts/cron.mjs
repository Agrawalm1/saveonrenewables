/**
 * cron.mjs
 *
 * Runs the buyback rate fetcher every 6 hours.
 * Start with:  node scripts/cron.mjs
 *
 * Keep this process running in the background (e.g. with PM2):
 *   npm install -g pm2
 *   pm2 start scripts/cron.mjs --name buyback-cron
 *   pm2 save
 */

import cron from "node-cron";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FETCH_SCRIPT = path.join(__dirname, "fetch-buyback.mjs");

function runFetch() {
  console.log(`[${new Date().toISOString()}] Running buyback rate fetch...`);
  try {
    execSync(`node "${FETCH_SCRIPT}"`, { stdio: "inherit" });
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

// Run immediately on startup
runFetch();

// Every 6 hours daily
cron.schedule("0 */6 * * *", () => {
  runFetch();
});

// Every Monday at 8:00am CT — full weekly refresh
// Cron syntax: "0 8 * * 1"  (minute 0, hour 8, any day-of-month, any month, Monday)
cron.schedule("0 8 * * 1", () => {
  console.log(`[${new Date().toISOString()}] Monday morning weekly refresh...`);
  runFetch();
});

console.log("Buyback cron scheduler running.");
console.log("  → Every 6 hours (daily updates)");
console.log("  → Every Monday at 8am CT (weekly refresh)");
console.log("Press Ctrl+C to stop.\n");
