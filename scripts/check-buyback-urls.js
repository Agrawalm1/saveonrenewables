#!/usr/bin/env node
/**
 * Weekly buyback plan URL availability checker.
 * Reads buyback-data.json, pings each plan URL, and exits with code 1
 * if any are broken (causing GitHub Actions to fail and email the owner).
 * If all pass, updates `lastChecked` in buyback-data.json.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const DATA_PATH = path.join(__dirname, "..", "data", "buyback-data.json");

function request(url, method) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.request(
      url,
      {
        method,
        timeout: 10000,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; SaveOnRenewables-Checker/1.0)" },
      },
      (res) => {
        // Consume response body to avoid socket hang
        res.resume();
        resolve({ status: res.statusCode, ok: res.statusCode < 400 });
      }
    );
    req.on("error", (err) => resolve({ status: null, ok: false, error: err.message }));
    req.on("timeout", () => { req.destroy(); resolve({ status: null, ok: false, error: "timeout" }); });
    req.end();
  });
}

async function fetchUrl(url) {
  // Try HEAD first (fast, no body download)
  const head = await request(url, "HEAD");
  // If HEAD fails for any reason (405, 403, timeout, blocked), retry with GET
  // Some CDNs and WAFs block HEAD requests from CI/cloud IP ranges
  if (!head.ok) {
    return request(url, "GET");
  }
  return head;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const plans = data.plans;

  console.log(`Checking ${plans.length} buyback plan URLs...\n`);

  const results = await Promise.all(
    plans.map(async (plan) => {
      const result = await fetchUrl(plan.url);
      return { ...result, plan: plan.plan, provider: plan.provider };
    })
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
