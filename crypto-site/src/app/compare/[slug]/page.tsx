import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, getComparison } from "@/content/comparisons";
import { getPlatform, type Platform } from "@/content/platforms";
import { pageMetadata, ogImageUrl } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlatformLogo } from "@/components/PlatformLogo";
import { Score } from "@/components/Score";
import { ComparisonTable } from "@/components/ComparisonTable";
import { AffiliateCta } from "@/components/AffiliateCta";
import { AffiliateNotice, RiskWarning } from "@/components/Disclosures";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { ShareButtons } from "@/components/ShareButtons";
import { DraftMarker } from "@/components/DraftMarker";
import { IconCheck } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return pageMetadata({ title: c.metaTitle, description: c.description, path: `/compare/${c.slug}`, kicker: "Comparison", type: "article", publishedTime: c.published, modifiedTime: c.updated });
}

function ChooseCard({ p, reasons }: { p: Platform; reasons: string[] }) {
  return (
    <div className="card flex flex-col p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <PlatformLogo platform={p} />
          <h3 className="text-lg font-semibold">Choose {p.name} if…</h3>
        </div>
      </div>
      <ul className="mt-4 space-y-2.5 text-[0.95rem] text-muted">
        {reasons.map((x) => <li key={x} className="flex gap-2.5"><IconCheck width={17} height={17} className="mt-1 shrink-0 text-accent" />{x}</li>)}
      </ul>
      <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-start">
        <AffiliateCta platform={p} placement="comparison" full />
        {p.reviewSlug && (
          <Link href={`/reviews/${p.reviewSlug}`} className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-line-strong px-4 text-sm text-fg hover:border-subtle">
            {p.name} review
          </Link>
        )}
      </div>
    </div>
  );
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();
  const a = getPlatform(c.a);
  const b = getPlatform(c.b);
  const path = `/compare/${c.slug}`;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
        <div aria-hidden className="glow pointer-events-none absolute inset-0" />
        <div className="container-x relative pt-8 pb-12">
          <Breadcrumbs items={[{ name: "Comparisons", path: "/compare" }, { name: `${a.name} vs ${b.name}`, path }]} />
          <div className="mt-8 max-w-3xl animate-fade-up">
            <p className="eyebrow">Head to head</p>
            <h1 className="mt-3 text-[2rem] leading-[1.1] font-semibold sm:text-5xl">{c.title}</h1>
            <p className="mt-4 text-sm text-subtle">
              By {site.editorialTeam} · Updated <time dateTime={c.updated}>{formatDate(c.updated)}</time> <DraftMarker label="Facts need verifying" />
            </p>
          </div>
          <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
            {[a, b].map((p, i) => (
              <div key={p.slug} className={i === 0 ? "order-1" : "order-3"}>
                <div className="card flex flex-col items-center gap-3 p-4 text-center sm:flex-row sm:p-5 sm:text-left">
                  <PlatformLogo platform={p} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{p.name}</p>
                    <p className="hidden text-xs text-subtle sm:block">{p.bestFor}</p>
                  </div>
                  <Score platform={p} showMeter={false} />
                </div>
              </div>
            ))}
            <span className="order-2 font-mono text-sm text-subtle">VS</span>
          </div>
        </div>
      </section>

      <div className="container-x mt-10">
        <div className="mx-auto max-w-4xl">
          <AffiliateNotice />
          <div className="mt-8 space-y-4 text-[1.0625rem] leading-relaxed text-muted">
            {c.intro.map((x) => <p key={x}>{x}</p>)}
          </div>

          <h2 className="mt-12 text-2xl font-semibold">Side-by-side comparison</h2>
          <p className="mt-2 text-sm text-subtle">A dot marks the stronger option on that row. No dot means it&apos;s a tie or depends on you.</p>
          <div className="mt-6"><ComparisonTable a={a} b={b} rows={c.rows} /></div>

          <h2 className="mt-14 text-2xl font-semibold">Which should you choose?</h2>
        </div>
        <div className="mx-auto mt-6 grid max-w-5xl gap-5 md:grid-cols-2">
          <ChooseCard p={a} reasons={c.chooseA} />
          <ChooseCard p={b} reasons={c.chooseB} />
        </div>

        <div className="mx-auto max-w-4xl">
          <h2 className="mt-14 text-2xl font-semibold">Our verdict</h2>
          <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-muted">
            {c.verdict.map((x) => <p key={x}>{x}</p>)}
          </div>
          <p className="mt-4 text-sm text-subtle">
            We may earn a commission from either platform. Commission rates never decide our verdicts.{" "}
            <Link href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-fg">Affiliate disclosure</Link>
          </p>
          <FAQ items={c.faqs} />
          <div className="mt-10 border-t border-line pt-6"><ShareButtons url={absoluteUrl(path)} title={c.title} /></div>
          <RiskWarning className="mt-10" />
        </div>
      </div>
      <JsonLd data={articleSchema({ title: c.title, description: c.description, path, published: c.published, updated: c.updated, image: ogImageUrl(c.metaTitle, "Comparison") })} />
    </>
  );
}
