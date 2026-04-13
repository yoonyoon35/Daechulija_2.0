import type { MetadataRoute } from "next";
import { guideArticles } from "@/lib/guide/registry";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const guideEntries: MetadataRoute.Sitemap = [
    { url: `${base}/guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...guideArticles.map((a) => ({
      url: `${base}/guide/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...guideEntries,
  ];
}
