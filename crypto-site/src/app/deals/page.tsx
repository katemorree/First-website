import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { platforms } from "@/content/platforms";
import { PageHeader } from "@/components/PageHeader";
import { PlatformLogo } from "@/components/PlatformLogo";
import { AffiliateCta } from "@/components/AffiliateCta";
import { AffiliateNotice, RiskWarning } from "@/components/Disclosures";
import { ButtonLink } from "@/components/Button";
import { IconTag, IconCheck } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Crypto Sign-Up Offers & Deals",
  description: "Current sign-up offers from crypto exchanges, wallets and tools — with the terms explained clearly so you know what you're actually getting.",
  path: "/deals",
  kicker: "Deals",
});

const rules = [
  "We only list offers we've checked on the platform's own website",
  "Key terms (deposit or trading requirements, expiry) are shown up front",
  "An offer is never a reason to choose a platform that doesn't suit you",
];

export default function DealsPage() {
  // A deal appears here once you add an `offer` line to a platform in platforms.ts.
  const deals = platforms.filter((p) => p.affiliate.offer?.trim());
  return (
    <>
      <PageHeader
        eyebrow="Deals"
        title="Sign-up offers & deals"
        crumbs={[{ name: "Deals", path: "/deals" }]}
        intro={<p>Bonuses can be useful, but they usually come with conditions. We show the terms plainly — and an offer should never be the main reason you pick a platform.</p>}
      >
        <AffiliateNotice />
      </PageHeader>

      <div className="container-x mt-12">
        {deals.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {deals.map((p) => (
              <article key={p.slug} className="card flex flex-col p-6">
                <div className="flex items-center gap-3">
                  <PlatformLogo platform={p} />
                  <h2 className="text-lg font-semibold">{p.name}</h2>
                </div>
                <p className="mt-4 flex gap-2 text-fg"><IconTag className="mt-0.5 shrink-0 text-accent" />{p.affiliate.offer}</p>
                <p className="mt-2 text-sm text-subtle">Terms apply. Check the full conditions on {p.name}&apos;s website before signing up.</p>
                <div className="mt-auto pt-6"><AffiliateCta platform={p} placement="deal" /></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="card mx-auto max-w-2xl p-8 text-center sm:p-12">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-bg text-accent"><IconTag /></span>
            <h2 className="mt-5 text-xl font-semibold">No verified offers right now</h2>
            <p className="mx-auto mt-2 max-w-md text-muted">
              We only list deals after checking their terms. In the meantime, compare platforms on what matters more: fees, security and ease of use.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/exchanges">Compare exchanges</ButtonLink>
              <ButtonLink href="/wallets" variant="secondary">Compare wallets</ButtonLink>
            </div>
          </div>
        )}

        <section aria-labelledby="deal-rules" className="mx-auto mt-14 max-w-2xl">
          <h2 id="deal-rules" className="text-xl font-semibold">How we list deals</h2>
          <ul className="mt-4 space-y-2.5 text-muted">
            {rules.map((r) => <li key={r} className="flex gap-2.5"><IconCheck width={18} height={18} className="mt-0.5 shrink-0 text-accent" />{r}</li>)}
          </ul>
        </section>
        <RiskWarning className="mt-14" />
      </div>
    </>
  );
}
