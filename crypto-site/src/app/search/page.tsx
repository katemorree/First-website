import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { buildSearchIndex } from "@/lib/search-index";
import { SearchClient } from "@/components/SearchClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Search",
  description: "Search crypto exchange reviews, wallet comparisons, guides and calculators.",
  path: "/search",
  noIndex: true,
});

export default function SearchPage() {
  const index = buildSearchIndex();
  return (
    <div className="container-x pt-8 pb-10">
      <Breadcrumbs items={[{ name: "Search", path: "/search" }]} />
      <div className="mx-auto mt-8 max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Search</h1>
        <div className="mt-6">
          <Suspense fallback={<div className="h-14 rounded-2xl border border-line-strong bg-surface" />}>
            <SearchClient index={index} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
