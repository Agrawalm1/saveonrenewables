/**
 * Centralized affiliate/tracking config for all provider CTA buttons.
 *
 * To activate an affiliate link: set `affiliateUrl` to the full tracking URL
 * provided by the affiliate network. When null, UTM params are appended to
 * the provider's direct landing page from buyback-data.json.
 *
 * Plan IDs must match the `id` field in data/buyback-data.json.
 */

export interface AffiliateConfig {
  /** Full affiliate/tracking URL. null = fall back to plan.url + UTM params. */
  affiliateUrl: string | null;
  /** Query params appended when affiliateUrl is null. */
  trackingParams: Record<string, string>;
}

const UTM_BASE = {
  utm_source: "saveonrenewables",
  utm_medium: "referral",
  utm_campaign: "solar_buyback",
};

export const affiliates: Record<string, AffiliateConfig> = {
  "almika-60-plus": {
    affiliateUrl: null,
    trackingParams: { ...UTM_BASE, utm_content: "almika_60plus" },
  },
  "chariot-greenvolt": {
    affiliateUrl: null,
    trackingParams: { ...UTM_BASE, utm_content: "chariot_greenvolt" },
  },
  "txu-solar-match": {
    affiliateUrl: null,
    trackingParams: { ...UTM_BASE, utm_content: "txu_solar_match" },
  },
  "octopus-solar": {
    affiliateUrl: null,
    trackingParams: { ...UTM_BASE, utm_content: "octopus_solar" },
  },
  "rhythm-powershift": {
    affiliateUrl: null,
    trackingParams: { ...UTM_BASE, utm_content: "rhythm_powershift" },
  },
  "green-mountain-rewards": {
    affiliateUrl: null,
    trackingParams: { ...UTM_BASE, utm_content: "green_mountain_rewards" },
  },
  bestpwr: {
    affiliateUrl:
      "https://bestpwr.com?utm_source=saveonrenewables&utm_medium=referral&utm_campaign=market_low_tile",
    trackingParams: { ...UTM_BASE, utm_content: "bestpwr_market_low" },
  },
};

/**
 * Returns the best available action URL for a provider CTA.
 * Uses affiliateUrl if set; otherwise appends tracking params to fallbackUrl.
 */
export function resolveAffiliateUrl(planId: string, fallbackUrl: string): string {
  const config = affiliates[planId];
  const params = config?.trackingParams ?? UTM_BASE;

  if (config?.affiliateUrl) {
    return config.affiliateUrl;
  }

  try {
    const u = new URL(fallbackUrl);
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
    return u.toString();
  } catch {
    return fallbackUrl;
  }
}
