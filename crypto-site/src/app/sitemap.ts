import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { reviews } from "@/content/reviews";
import { comparisons } from "@/content/comparisons";
import { getArticleMeta } from "@/lib/articles";
import { calculators } from "@/components/ToolPage";

/** Generated at /sitemap.xml. New guides, reviews and comparisons are added automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: [string, number][] = [
    ["/", 1],
    ["/exchanges", 0.9],
    ["/wallets", 0.9],
    ["/trading-tools", 0.8],
    ["/ai-tools", 0.7],
    ["/learn", 0.8],
    ["/compare", 0.7],
    ["/reviews", 0.7],
    ["/deals", 0.5],
    ["/tools", 0.6],
    ["/about", 0.4],
    ["/affiliate-disclosure", 0.3],
    ["/risk-disclaimer", 0.3],
    ["/privacy-policy", 0.2],
    ["/terms", 0.2],
  ];
  return [
    ...staticPages.map(([path, priority]) => ({ url: absoluteUrl(path), priority })),
    ...calculators.map((c) => ({ url: absoluteUrl(c.href), priority: 0.6 })),
    ...reviews.map((r) => ({ url: absoluteUrl(`/reviews/${r.slug}`), lastModified: r.updated, priority: 0.8 })),
    ...comparisons.map((c) => ({ url: absoluteUrl(`/compare/${c.slug}`), lastModified: c.updated, priority: 0.8 })),
    ...getArticleMeta().map((a) => ({ url: absoluteUrl(`/learn/${a.slug}`), lastModified: a.updated, priority: 0.7 })),
  ];
}
