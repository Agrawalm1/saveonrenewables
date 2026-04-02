#!/usr/bin/env node
/**
 * Weekly buyback plan URL availability checker.
 * Reads buyback-data.json, pings each plan URL, and exits with code 1
 * if any are broken (causing GitHub Actions to fail and email the owner).
 * If all pass, updates `lastChecked` in buyback-data.json.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const DATA_PATH = path.join(__dirname, "..", "data", "buyback-data.json");

function fetchUrl(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.request(
      url,
      {
        method: "HEAD",
        timeout: 10000,
        headers: {
          "User-Agent": "SaveOnRenewables-BuybackChecker/1.0",
        },
      },
      (res) => {
        resolve({ url, status: res.statusCode, ok: res.statusCode < 400 });
      }
    );
    req.on("error", (err) => {
      resolve({ url, status: null, ok: false, error: err.message });
    });
    req.on("timeout", () => {
      req.destroy();
      resolve({ url, status: null, ok: false, error: "timeout" });
    });
    req.end();
  });
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const plans = data.plans;

  console.log(`Checking ${plans.length} buyback plan URLs...\n`);

  const results = await Promise.all(
    plans.map((plan) =>
      fetchUrl(plan.url).then((result) => ({ ...result, plan: plan.plan, provider: plan.provider }))
    )
  );

  const failed = results.filter((r) => !r.ok);
  const passed = results.filter((r) => r.ok);

  for (const r of passed) {
    console.log(`✅  ${r.provider} — ${r.plan} (${r.status})`);
  }

  for (const r of failed) {
    console.log(`❌  ${r.provider} — ${r.plan} | status=${r.status ?? "none"} error=${r.error ?? ""}`);
  }

  if (failed.length > 0) {
    console.log(`\n⚠️  ${failed.length} plan URL(s) are unreachable. Update buyback-data.json.`);
    process.exit(1);
  }

  // All passed — update lastChecked
  data.lastChecked = new Date().toISOString();
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`\n✅  All ${plans.length} URLs are live. lastChecked updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
