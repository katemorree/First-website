import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { platformsBy, ranked, categoryLabels, type PlatformCategory } from "@/content/platforms";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { PlatformCard } from "@/components/PlatformCard";
import { AffiliateNotice, RiskWarning } from "@/components/Disclosures";

export const metadata: Metadata = pageMetadata({
  title: "Best Crypto Trading Tools: Charting, Portfolio & Analytics",
  description:
    "The crypto trading tools worth knowing: charting platforms, trading terminals, portfolio trackers, tax tools and market analytics — with honest pros and cons.",
  path: "/trading-tools",
  kicker: "Trading tools",
});

const groups: { category: PlatformCategory; intro: string }[] = [
  { category: "charting", intro: "Charts, indicators and alerts. The foundation of any trading setup." },
  { category: "terminal", intro: "Place and manage orders across several exchanges from one screen." },
  { category: "portfolio", intro: "Track holdings and profit/loss across exchanges and wallets, and prepare tax reports." },
  { category: "analytics", intro: "Derivatives positioning, on-chain and DeFi data for deeper research." },
];

export default function TradingToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trading tools"
        title="Crypto trading tools"
        crumbs={[{ name: "Trading Tools", path: "/trading-tools" }]}
        intro={<p>Good tools help you make clearer decisions; they don&apos;t make trading less risky. Most offer free plans — try those before paying.</p>}
      >
        <AffiliateNotice />
        <nav aria-label="Tool categories" className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {[...groups.map((g) => ({ href: `#${g.category}`, label: categoryLabels[g.category] })), { href: "/ai-tools", label: "AI trading tools" }].map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex h-9 shrink-0 items-center rounded-full border border-line bg-surface px-4 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg">
              {l.label}
            </Link>
          ))}
        </nav>
      </PageHeader>

      <div className="container-x">
        {groups.map(({ category, intro }) => {
          const items = ranked(platformsBy(category));
          return (
            <section key={category} id={category} aria-labelledby={`${category}-title`} className="mt-16 scroll-mt-24">
              <SectionHeading id={`${category}-title`} title={categoryLabels[category]} intro={intro} />
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {items.map((p) => (
                  <PlatformCard key={p.slug} platform={p} />
                ))}
              </div>
            </section>
          );
        })}
        <RiskWarning className="mt-16" />
      </div>
    </>
  );
}
