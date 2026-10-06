import type { ReactNode } from "react";
import Link from "next/link";
import { PageHeader } from "./PageHeader";
import { FAQ } from "./FAQ";
import { RiskWarning } from "./Disclosures";
import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/site";
import type { FAQ as FAQItem } from "@/content/reviews";

export const calculators = [
  { href: "/tools/crypto-profit-calculator", title: "Crypto profit calculator", text: "Profit or loss on a trade, including fees and break-even price." },
  { href: "/tools/percentage-change-calculator", title: "Percentage change calculator", text: "Percentage gain or loss, and the gain needed to recover from a loss." },
  { href: "/tools/dca-calculator", title: "DCA average cost calculator", text: "Average purchase price across several buys." },
  { href: "/tools/trading-fee-calculator", title: "Trading fee calculator", text: "What fees cost you per trade and per month — with and without leverage." },
];

export function ToolPage({
  title, intro, path, children, howTo, faqs,
}: { title: string; intro: string; path: string; children: ReactNode; howTo: ReactNode; faqs: FAQItem[] }) {
  return (
    <>
      <PageHeader eyebrow="Free calculator" title={title} crumbs={[{ name: "Tools", path: "/tools" }, { name: title, path }]} intro={<p>{intro}</p>} />
      <div className="container-x mt-10">
        {children}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0">
            <section className="prose max-w-[44rem]">{howTo}</section>
            <FAQ items={faqs} />
          </div>
          <aside>
            <div className="card p-5 lg:sticky lg:top-24">
              <p className="eyebrow">More calculators</p>
              <ul className="mt-3 space-y-2.5 text-sm">
                {calculators.filter((c) => c.href !== path).map((c) => (
                  <li key={c.href}><Link href={c.href} className="text-muted hover:text-fg">{c.title} →</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
        <RiskWarning compact className="mt-14" />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: title,
          url: absoluteUrl(path),
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </>
  );
}
