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
    { url: base,                                          lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${base}/tools`,                               lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/buyback`,                             lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/houston-solar-buyback-plans`,         lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/dallas-solar-buyback-plans`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/austin-solar-buyback-plans`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/guides`,                              lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/guides/how-to-choose-solar-buyback-texas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/guides/solar-roi-texas`,              lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/guides/centerpoint-vs-oncor-solar`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/quiz`,                                lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cities`,                              lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    ...cityPages,
    { url: `${base}/grid-pulse`,                          lastModified: now, changeFrequency: "daily",   priority: 0.6 },
    { url: `${base}/solar-credits`,                       lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about`,                               lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`,                             lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy`,                             lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
