import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";
import { platformsBy, ranked } from "@/content/platforms";
import { PageHeader } from "@/components/PageHeader";
import { PlatformCard } from "@/components/PlatformCard";
import { FilterGrid } from "@/components/FilterGrid";
import { AffiliateNotice, RiskWarning } from "@/components/Disclosures";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { ScoreNote } from "@/components/Score";

export const metadata: Metadata = pageMetadata({
  title: "Best Crypto Wallets (2026): Hardware, Software & Mobile",
  description:
    "Compare the best crypto wallets — hardware wallets like Ledger and Trezor, software wallets and mobile wallets — on security, coin support, price and ease of use.",
  path: "/wallets",
  kicker: "Wallets",
});

const faqs = [
  { q: "What is the best crypto wallet for beginners?", a: "For small amounts, a simple mobile or desktop wallet like Exodus or Trust Wallet is easy to start with. For larger amounts, a hardware wallet such as Trezor or Ledger is the safer choice." },
  { q: "What's the safest type of crypto wallet?", a: "A hardware wallet bought directly from the manufacturer, with the recovery phrase backed up offline, is the safest option for most people." },
  { q: "Are free wallets safe?", a: "Reputable free wallets are safe for everyday amounts if you protect your recovery phrase and device. Download them only from official websites or app stores — fake wallet apps are common." },
];

export default function WalletsPage() {
  const wallets = ranked(platformsBy("hardware-wallet", "software-wallet", "mobile-wallet"));
  const types = [
    { value: "hardware-wallet", label: "Hardware", desc: "Physical devices that keep keys offline. Best for long-term storage." },
    { value: "software-wallet", label: "Software", desc: "Desktop and browser wallets for everyday use and DeFi apps." },
    { value: "mobile-wallet", label: "Mobile", desc: "Phone wallets for spending, swapping and on-the-go access." },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Wallets"
        title="Best crypto wallets"
        crumbs={[{ name: "Wallets", path: "/wallets" }]}
        intro={<p>A wallet stores the keys to your crypto. Choose based on how much you hold and how often you use it. New to this? Read <Link href="/learn/what-is-a-crypto-wallet" className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">what a crypto wallet is</Link> first.</p>}
      >
        <AffiliateNotice />
      </PageHeader>

      <div className="container-x mt-12">
        <div className="grid gap-4 md:grid-cols-3">
          {types.map((t) => (
            <div key={t.value} className="card p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">{t.label} wallets</p>
              <p className="mt-2 text-sm text-muted">{t.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-semibold">All wallets</h2>
        <div className="mt-6">
          <FilterGrid
            label="Filter wallets by type"
            filters={types.map(({ value, label }) => ({ value, label }))}
            items={wallets.map((p) => ({ id: p.slug, tags: [p.category], node: <PlatformCard platform={p} /> }))}
          />
        </div>
        <div className="mt-4"><ScoreNote /></div>

        <div className="card mt-14 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Comparing hardware wallets?</h2>
          <p className="mt-2 text-muted">Our guide compares Ledger, Trezor and Coldcard on security, coin support and price.</p>
          <Link href="/learn/best-hardware-wallet" className="mt-4 inline-block font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">Best hardware wallets →</Link>
        </div>

        <div className="mx-auto max-w-3xl">
          <FAQ items={faqs} />
        </div>
        <RiskWarning className="mt-14" />
      </div>
      <JsonLd data={itemListSchema("Best crypto wallets", wallets.map((p) => ({ name: p.name, url: p.website })))} />
    </>
  );
}
