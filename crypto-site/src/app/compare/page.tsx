import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { comparisons } from "@/content/comparisons";
import { getPlatform } from "@/content/platforms";
import { PageHeader } from "@/components/PageHeader";
import { PlatformLogo } from "@/components/PlatformLogo";
import { IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Crypto Platform Comparisons",
  description: "Head-to-head comparisons of crypto exchanges, wallets and tools: fees, features, security and who each one suits best.",
  path: "/compare",
  kicker: "Comparisons",
});

export default function CompareIndex() {
  return (
    <>
      <PageHeader eyebrow="Comparisons" title="Head-to-head comparisons" crumbs={[{ name: "Comparisons", path: "/compare" }]} intro={<p>Two platforms, one table. We explain who each one suits instead of declaring a winner based on who pays more.</p>} />
      <div className="container-x mt-12 grid gap-5 md:grid-cols-2">
        {comparisons.map((c) => {
          const a = getPlatform(c.a);
          const b = getPlatform(c.b);
          return (
            <Link key={c.slug} href={`/compare/${c.slug}`} className="card card-hover group flex flex-col p-6">
              <div className="flex items-center gap-3">
                <PlatformLogo platform={a} />
                <span className="font-mono text-xs text-subtle">VS</span>
                <PlatformLogo platform={b} />
              </div>
              <h2 className="mt-5 text-xl font-semibold">{a.name} vs {b.name}</h2>
              <p className="mt-2 text-sm text-muted">{c.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">Compare <IconArrowRight width={15} height={15} className="transition-transform group-hover:translate-x-1" /></span>
            </Link>
          );
        })}
        <div className="card flex flex-col justify-center border-dashed p-6 text-sm text-muted">
          <p className="font-medium text-fg">More comparisons coming soon</p>
          <p className="mt-1">Meanwhile, see every exchange in one <Link href="/exchanges" className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">comparison table</Link>.</p>
        </div>
      </div>
    </>
  );
}
