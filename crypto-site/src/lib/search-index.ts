import { platforms, categoryLabels } from "@/content/platforms";
import { reviews } from "@/content/reviews";
import { comparisons } from "@/content/comparisons";
import { getArticleMeta, articleCategories } from "./articles";
import { calculators } from "@/components/ToolPage";

export type SearchItem = { title: string; description: string; href: string; type: string; keywords: string };

/** Everything the site search can find. Built automatically from your content. */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const a of getArticleMeta())
    items.push({ title: a.title, description: a.description, href: `/learn/${a.slug}`, type: "Guide", keywords: articleCategories[a.category] });
  for (const r of reviews) items.push({ title: r.title, description: r.description, href: `/reviews/${r.slug}`, type: "Review", keywords: r.platformSlug });
  for (const c of comparisons) items.push({ title: c.title, description: c.description, href: `/compare/${c.slug}`, type: "Comparison", keywords: `${c.a} ${c.b} vs` });
  for (const t of calculators) items.push({ title: t.title, description: t.text, href: t.href, type: "Calculator", keywords: "tool calculator" });
  for (const p of platforms) {
    const href = p.reviewSlug
      ? `/reviews/${p.reviewSlug}`
      : p.category === "exchange"
        ? "/exchanges"
        : p.category.endsWith("wallet")
          ? "/wallets"
          : p.category === "ai"
            ? "/ai-tools"
            : `/trading-tools#${p.category}`;
    items.push({ title: p.name, description: p.tagline, href, type: categoryLabels[p.category], keywords: `${p.bestFor} ${p.features.join(" ")}` });
  }
  return items;
}
