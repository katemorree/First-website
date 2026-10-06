import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { reviews, getReview } from "@/content/reviews";
import { getPlatform } from "@/content/platforms";
import { pageMetadata, ogImageUrl } from "@/lib/seo";
import { articleSchema, reviewSchema } from "@/lib/schema";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlatformLogo } from "@/components/PlatformLogo";
import { Score, BeginnerMeter } from "@/components/Score";
import { AffiliateCta } from "@/components/AffiliateCta";
import { AffiliateNotice, RiskWarning } from "@/components/Disclosures";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { StickyCta } from "@/components/StickyCta";
import { ShareButtons } from "@/components/ShareButtons";
import { DraftMarker } from "@/components/DraftMarker";
import { IconCheck, IconMinus, IconArrowRight } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getReview(slug);
  if (!r) return {};
  return pageMetadata({
    title: r.metaTitle,
    description: r.description,
    path: `/reviews/${r.slug}`,
    kicker: "Review",
    type: "article",
    publishedTime: r.published,
    modifiedTime: r.updated,
  });
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-line pt-10 first:border-0 first:pt-0">
      <h2 id={`${id}-h`} className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Rows({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface text-[0.95rem]">
      {rows.map((r) => (
        <div key={r.label} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-6">
          <dt className="text-subtle">{r.label}</dt>
          <dd className="font-medium text-fg sm:text-right">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const r = getReview(slug);
  if (!r) notFound();
  const p = getPlatform(r.platformSlug);
  const path = `/reviews/${r.slug}`;

  const toc = [
    ["overview", "Overview"], ["features", "Key features"], ["fees", "Fees"], ["coins", "Supported cryptocurrencies"],
    ["deposits", "Deposits & withdrawals"], ["security", "Security"], ["tools", "Trading tools"], ["app", "Mobile app"],
    ["pros-cons", "Pros & cons"], ["who", "Who it's for"], ["alternatives", "Alternatives"], ["verdict", "Final verdict"],
  ];

  const schemas: object[] = [
    articleSchema({ title: r.title, description: r.description, path, published: r.published, updated: r.updated, image: ogImageUrl(r.metaTitle, "Review") }),
  ];
  // Review rich results only once you've personally verified the score.
  if (p.score != null && p.scoreStatus === "verified") {
    schemas.push(reviewSchema({ platformName: p.name, platformUrl: p.website, score: p.score, path, summary: r.summary, published: r.published }));
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
        <div aria-hidden className="glow pointer-events-none absolute inset-0" />
        <div className="container-x relative pt-8 pb-10 sm:pb-14">
          <Breadcrumbs items={[{ name: "Reviews", path: "/reviews" }, { name: `${p.name} review`, path }]} />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div className="animate-fade-up">
              <div className="flex items-center gap-4">
                <PlatformLogo platform={p} size="lg" />
                <p className="eyebrow">Exchange review</p>
              </div>
              <h1 className="mt-5 text-[2rem] leading-[1.1] font-semibold sm:text-5xl">{r.title}</h1>
              <p className="mt-4 text-sm text-subtle">
                By <Link href="/about" className="text-muted hover:text-fg">{site.editorialTeam}</Link> · Updated <time dateTime={r.updated}>{formatDate(r.updated)}</time>
                {!p.lastVerified && <> · <DraftMarker label="Facts need verifying" /></>}
              </p>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Our score</span>
                <Score platform={p} size="lg" />
              </div>
              <div className="mt-4"><AffiliateCta platform={p} placement="review" full size="lg" /></div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x mt-10 grid gap-12 lg:grid-cols-[1fr_20rem]">
        <article className="min-w-0">
          <AffiliateNotice />
          <div className="card mt-6 p-5 sm:p-6">
            <p className="eyebrow">The short version</p>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-fg">{r.summary}</p>
          </div>

          <div className="mt-12 space-y-10">
            <Section id="overview" title={`${p.name} overview`}>
              {r.overview.map((x) => <p key={x}>{x}</p>)}
            </Section>

            <Section id="features" title="Key features">
              <div className="grid gap-3 sm:grid-cols-2">
                {r.keyFeatures.map((f) => (
                  <div key={f.title} className="rounded-xl border border-line bg-surface p-4">
                    <h3 className="font-semibold text-fg">{f.title}</h3>
                    <p className="mt-1.5 text-sm">{f.text}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="fees" title={`${p.name} fees`}>
              <Rows rows={r.fees.rows} />
              <p className="text-sm">{r.fees.note} <DraftMarker /></p>
              <p className="text-sm">
                Estimate your own costs with our <Link href="/tools/trading-fee-calculator" className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">trading fee calculator</Link>.
              </p>
            </Section>

            <Section id="coins" title="Supported cryptocurrencies">
              {r.supportedCrypto.map((x) => <p key={x}>{x}</p>)}
            </Section>

            <Section id="deposits" title="Deposit & withdrawal options">
              <Rows rows={r.depositsWithdrawals} />
            </Section>

            <Section id="security" title="Security">
              {r.security.map((x) => <p key={x}>{x}</p>)}
            </Section>

            <Section id="tools" title="Trading tools">
              {r.tradingTools.map((x) => <p key={x}>{x}</p>)}
            </Section>

            <Section id="app" title="Mobile app">
              {r.mobileApp.map((x) => <p key={x}>{x}</p>)}
            </Section>

            <Section id="pros-cons" title="Pros and cons">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-5">
                  <h3 className="font-semibold text-fg">Pros</h3>
                  <ul className="mt-3 space-y-2 text-[0.95rem]">
                    {p.pros.map((x) => <li key={x} className="flex gap-2.5"><IconCheck width={17} height={17} className="mt-1 shrink-0 text-accent" />{x}</li>)}
                  </ul>
                </div>
                <div className="rounded-xl border border-red/20 bg-red/[0.04] p-5">
                  <h3 className="font-semibold text-fg">Cons</h3>
                  <ul className="mt-3 space-y-2 text-[0.95rem]">
                    {p.cons.map((x) => <li key={x} className="flex gap-2.5"><IconMinus width={17} height={17} className="mt-1 shrink-0 text-red" />{x}</li>)}
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="who" title={`Who ${p.name} is best for`}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-fg">Good fit if…</h3>
                  <ul className="mt-3 space-y-2 text-[0.95rem]">
                    {r.bestFor.map((x) => <li key={x} className="flex gap-2.5"><IconCheck width={17} height={17} className="mt-1 shrink-0 text-accent" />{x}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-fg">Who should avoid it</h3>
                  <ul className="mt-3 space-y-2 text-[0.95rem]">
                    {r.avoidIf.map((x) => <li key={x} className="flex gap-2.5"><IconMinus width={17} height={17} className="mt-1 shrink-0 text-red" />{x}</li>)}
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="alternatives" title={`${p.name} alternatives`}>
              <div className="grid gap-3">
                {r.alternatives.map((alt) => {
                  const ap = getPlatform(alt.platformSlug);
                  return (
                    <div key={ap.slug} className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <PlatformLogo platform={ap} size="sm" />
                        <div>
                          <p className="font-semibold text-fg">{ap.name}</p>
                          <p className="text-sm">{alt.reason}</p>
                        </div>
                      </div>
                      {ap.reviewSlug ? (
                        <Link href={`/reviews/${ap.reviewSlug}`} className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">
                          Read review <IconArrowRight width={15} height={15} />
                        </Link>
                      ) : (
                        <AffiliateCta platform={ap} placement="review" variant="secondary" showLabel={false} />
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-sm">
                Comparing two directly? See <Link href="/compare/binance-vs-bybit" className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">Binance vs Bybit</Link>.
              </p>
            </Section>

            <Section id="verdict" title="Final verdict">
              {r.verdict.map((x) => <p key={x}>{x}</p>)}
              <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <PlatformLogo platform={p} />
                  <div>
                    <p className="font-semibold text-fg">{p.name}</p>
                    <p className="text-sm">Best for: {p.bestFor}</p>
                  </div>
                </div>
                <AffiliateCta platform={p} placement="review" />
              </div>
            </Section>
          </div>

          <FAQ items={r.faqs} />
          <div className="mt-10 border-t border-line pt-6"><ShareButtons url={absoluteUrl(path)} title={r.title} /></div>
          <RiskWarning className="mt-10" />
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <div className="card p-5">
              <p className="eyebrow">Score breakdown</p>
              <dl className="mt-4 space-y-3 text-sm">
                {r.scoreBreakdown.map((s) => (
                  <div key={s.label} className="grid grid-cols-[1fr_auto] gap-y-1.5">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="num text-fg">{s.score.toFixed(1)}</dd>
                    <dd aria-hidden className="col-span-2 h-1 overflow-hidden rounded-full bg-surface-3"><span className="block h-full rounded-full bg-accent" style={{ width: `${(s.score / 5) * 100}%` }} /></dd>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-line pt-3">
                  <dt className="text-muted">Beginner friendly</dt><dd><BeginnerMeter value={p.beginnerFriendliness} /></dd>
                </div>
              </dl>
              {p.scoreStatus === "draft" && <p className="mt-3"><DraftMarker label="Draft scores" /></p>}
            </div>
            <nav aria-label="On this page" className="card p-5">
              <p className="eyebrow">On this page</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {toc.map(([id, label]) => (
                  <li key={id}><a href={`#${id}`} className="text-muted transition-colors hover:text-fg">{label}</a></li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </div>

      <StickyCta platform={p} placement="review" />
      <JsonLd data={schemas} />
    </>
  );
}
