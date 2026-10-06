import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { itemListSchema } from "@/lib/schema";
import { platformsBy, ranked } from "@/content/platforms";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { ExchangeTable } from "@/components/ExchangeTable";
import { PlatformCard } from "@/components/PlatformCard";
import { AffiliateNotice, RiskWarning } from "@/components/Disclosures";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { ScoreNote } from "@/components/Score";

export const metadata: Metadata = pageMetadata({
  title: "Best Crypto Exchanges (2026): Fees & Safety Compared",
  description:
    "Compare the best crypto exchanges side by side: trading fees, supported coins, security, beginner friendliness and availability — with honest pros and cons.",
  path: "/exchanges",
  kicker: "Exchanges",
});

const faqs = [
  { q: "What is the best crypto exchange?", a: "It depends on where you live and what you need. Kraken and Coinbase are strong for beginners in the US and Europe; Binance and Bybit offer lower fees and more products in the countries they serve." },
  { q: "Which crypto exchange has the lowest fees?", a: "At base tier, Binance, Bybit and OKX charge around 0.08–0.10% on spot trades. 'Instant buy' features and card payments usually cost much more than placing an order on the trading screen." },
  { q: "Is it safe to keep crypto on an exchange?", a: "Reputable exchanges use cold storage and security controls, but exchanges can be hacked or fail. Keep only what you trade on an exchange and move long-term holdings to your own wallet." },
];

export default function ExchangesPage() {
  const exchanges = ranked(platformsBy("exchange"));
  return (
    <>
      <PageHeader
        eyebrow="Exchanges"
        title="Best crypto exchanges, compared"
        crumbs={[{ name: "Exchanges", path: "/exchanges" }]}
        intro={<p>Fees, coin selection, security record and beginner friendliness — side by side. Availability varies by country, so always check a platform serves where you live.</p>}
      >
        <AffiliateNotice />
      </PageHeader>

      <div className="container-x mt-12">
        <SectionHeading eyebrow="Comparison table" title="At a glance" />
        <div className="mt-6">
          <ExchangeTable exchanges={exchanges} caption="Crypto exchange comparison" />
        </div>
        <div className="mt-3"><ScoreNote /></div>

        <section aria-labelledby="choose" className="mt-20 grid gap-6 md:grid-cols-3">
          <h2 id="choose" className="sr-only">How to choose</h2>
          {[
            { t: "New to crypto?", d: "Prioritise ease of use and regulation over the lowest fees.", l: "/learn/best-crypto-exchanges-for-beginners", c: "Best exchanges for beginners" },
            { t: "Comparing two?", d: "See fees, futures, leverage and KYC in one table.", l: "/compare/binance-vs-bybit", c: "Binance vs Bybit" },
            { t: "Worried about fees?", d: "See exactly what a trade costs at different fee levels.", l: "/tools/trading-fee-calculator", c: "Trading fee calculator" },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <h3 className="font-semibold">{x.t}</h3>
              <p className="mt-2 text-sm text-muted">{x.d}</p>
              <Link href={x.l} className="mt-4 inline-block text-sm font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">{x.c} →</Link>
            </div>
          ))}
        </section>

        <section aria-labelledby="ranked" className="mt-20">
          <SectionHeading id="ranked" eyebrow="In detail" title="Every exchange we cover" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {exchanges.map((p, i) => (
              <PlatformCard key={p.slug} platform={p} rank={i + 1} />
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-3xl">
          <FAQ items={faqs} />
        </div>
        <RiskWarning className="mt-14" />
      </div>
      <JsonLd data={itemListSchema("Best crypto exchanges", exchanges.map((p) => ({ name: p.name, url: p.reviewSlug ? absoluteUrl(`/reviews/${p.reviewSlug}`) : p.website })))} />
    </>
  );
}
