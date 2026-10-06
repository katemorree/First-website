import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle, getRelatedArticles, articleCategories } from "@/lib/articles";
import { pageMetadata, ogImageUrl } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleCard } from "@/components/ArticleCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ShareButtons } from "@/components/ShareButtons";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { AffiliateNotice, RiskWarning } from "@/components/Disclosures";
import { NewsletterForm } from "@/components/Newsletter";
import { IconClock } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.metaTitle,
    description: a.description,
    path: `/learn/${a.slug}`,
    kicker: articleCategories[a.category],
    type: "article",
    publishedTime: a.published,
    modifiedTime: a.updated,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const path = `/learn/${a.slug}`;
  const related = getRelatedArticles(a);
  const hasPlatforms = a.blocks.some((b) => b.type === "platform");

  return (
    <>
      <ReadingProgress />
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
        <div aria-hidden className="glow pointer-events-none absolute inset-0" />
        <div className="container-x relative pt-8 pb-10 sm:pb-14">
          <Breadcrumbs items={[{ name: "Learn", path: "/learn" }, { name: a.title, path }]} />
          <div className="mt-8 max-w-3xl animate-fade-up">
            <p className="eyebrow">{articleCategories[a.category]}</p>
            <h1 className="mt-3 text-[2rem] leading-[1.1] font-semibold sm:text-[2.75rem]">{a.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{a.description}</p>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle">
              <span>By <Link href="/about" className="text-muted hover:text-fg">{site.editorialTeam}</Link></span>
              <span aria-hidden>·</span>
              <span>Updated <time dateTime={a.updated}>{formatDate(a.updated)}</time></span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1"><IconClock width={14} height={14} /> {a.readingMinutes} min read</span>
            </p>
          </div>
        </div>
      </header>

      <div className="container-x mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <article className="min-w-0 max-w-[44rem]">
          {hasPlatforms && <AffiliateNotice className="mb-8" />}
          <div id="article-body">
            <ArticleBody blocks={a.blocks} />
          </div>
          <FAQ items={a.faqs} />
          <div className="mt-10 border-t border-line pt-6"><ShareButtons url={absoluteUrl(path)} title={a.title} /></div>
          <RiskWarning compact className="mt-8" />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            {a.headings.length > 2 && (
              <nav aria-label="On this page" className="card p-5">
                <p className="eyebrow">On this page</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {a.headings.map((h) => (
                    <li key={h.id}><a href={`#${h.id}`} className="block leading-snug text-muted transition-colors hover:text-fg">{h.text}</a></li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="card p-5">
              <p className="font-medium">Get the weekly guide</p>
              <p className="mt-1 text-sm text-muted">Clear, hype-free crypto education.</p>
              <div className="mt-4"><NewsletterForm source="article-sidebar" stacked /></div>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="container-x mt-20">
          <h2 id="related" className="text-2xl font-semibold">Related guides</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((r) => <ArticleCard key={r.slug} article={r} />)}
          </div>
        </section>
      )}

      <JsonLd data={articleSchema({ title: a.title, description: a.description, path, published: a.published, updated: a.updated, image: ogImageUrl(a.metaTitle, articleCategories[a.category]) })} />
    </>
  );
}
