import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { platformsBy, ranked } from "@/content/platforms";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { PlatformCard } from "@/components/PlatformCard";
import { AffiliateNotice, RiskWarning } from "@/components/Disclosures";
import { FAQ } from "@/components/FAQ";
import { IconAlert, IconCheck } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "AI Tools for Crypto Traders: What Works and What to Avoid",
  description:
    "AI tools for crypto research and technical analysis, what they're genuinely useful for, and the red flags of AI trading-bot scams.",
  path: "/ai-tools",
  kicker: "AI tools",
});

const goodUses = [
  "Summarising whitepapers, news and long research reports",
  "Spotting chart patterns and trendlines faster",
  "Backtesting a strategy idea on historical data",
  "Explaining concepts you don't understand yet",
];
const redFlags = [
  "Promises of guaranteed or fixed daily returns",
  "\"Our AI never loses\" or win rates near 100%",
  "You must deposit funds with them, not your own exchange",
  "Pressure to recruit friends or upgrade to unlock withdrawals",
];

const faqs = [
  { q: "Can AI predict crypto prices?", a: "No tool can reliably predict crypto prices. AI can process information quickly and find patterns in past data, but markets change and past patterns often stop working." },
  { q: "Are AI trading bots profitable?", a: "Some strategies make money in some market conditions and lose money in others. Any product promising consistent or guaranteed profits should be treated as a likely scam." },
];

export default function AiToolsPage() {
  const tools = ranked(platformsBy("ai"));
  return (
    <>
      <PageHeader
        eyebrow="AI tools"
        title="AI tools for crypto traders"
        crumbs={[{ name: "AI Tools", path: "/ai-tools" }]}
        intro={<p>AI can speed up research and analysis. It can&apos;t predict the market. Here&apos;s what&apos;s worth using — and how to spot the scams that borrow the &ldquo;AI&rdquo; label.</p>}
      >
        <AffiliateNotice />
      </PageHeader>

      <div className="container-x mt-12">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-semibold">Where AI genuinely helps</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {goodUses.map((x) => (
                <li key={x} className="flex gap-2.5"><IconCheck width={17} height={17} className="mt-0.5 shrink-0 text-accent" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="card border-red/25 p-6">
            <h2 className="font-semibold">Red flags of AI trading scams</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {redFlags.map((x) => (
                <li key={x} className="flex gap-2.5"><IconAlert width={17} height={17} className="mt-0.5 shrink-0 text-red" />{x}</li>
              ))}
            </ul>
          </div>
        </div>

        <section aria-labelledby="ai-list" className="mt-16">
          <SectionHeading id="ai-list" eyebrow="Tools" title="AI-assisted trading & research tools" intro="We're adding more as we test them. Paid plans are rarely necessary for beginners." />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {tools.map((p) => (
              <PlatformCard key={p.slug} platform={p} />
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-3xl">
          <FAQ items={faqs} />
        </div>
        <RiskWarning className="mt-14" />
      </div>
    </>
  );
}
