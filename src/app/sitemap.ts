import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://saveonrenewables.com";
  const now = new Date();

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${base}/cities/${city.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    { url: base,                        lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${base}/tools`,             lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/quiz`,              lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/buyback`,           lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/cities`,            lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    ...cityPages,
    { url: `${base}/grid-pulse`,        lastModified: now, changeFrequency: "daily",   priority: 0.6 },
    { url: `${base}/solar-credits`,     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
