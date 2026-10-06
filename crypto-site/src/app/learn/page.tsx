import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getArticleMeta, articleCategories, type ArticleCategory } from "@/lib/articles";
import { PageHeader } from "@/components/PageHeader";
import { ArticleCard } from "@/components/ArticleCard";
import { FilterGrid } from "@/components/FilterGrid";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = pageMetadata({
  title: "Learn Crypto: Beginner-Friendly Guides",
  description: "Plain-English crypto guides: how to buy Bitcoin, how wallets work, how to stay safe, and how trading, futures and leverage really work.",
  path: "/learn",
  kicker: "Learn",
});

export default function LearnPage() {
  const articles = getArticleMeta();
  const used = Array.from(new Set(articles.map((a) => a.category))) as ArticleCategory[];
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="Crypto, explained clearly"
        crumbs={[{ name: "Learn", path: "/learn" }]}
        intro={<p>Guides written for real beginners — no jargon without an explanation, and the risks are always included.</p>}
      >
        <ButtonLink href="/learn/crypto-for-beginners">Start with the beginner&apos;s guide</ButtonLink>
      </PageHeader>
      <div className="container-x mt-12">
        <FilterGrid
          label="Filter guides by topic"
          filters={used.map((c) => ({ value: c, label: articleCategories[c] }))}
          items={articles.map((a) => ({ id: a.slug, tags: [a.category], node: <ArticleCard article={a} /> }))}
        />
      </div>
    </>
  );
}
