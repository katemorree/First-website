import Link from "next/link";
import { articleCategories, type ArticleMeta } from "@/lib/articles";
import { IconArrowRight, IconClock } from "./Icons";

export function ArticleCard({ article, featured = false }: { article: ArticleMeta; featured?: boolean }) {
  return (
    <article className="card card-hover group flex h-full flex-col p-5 sm:p-6">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">{articleCategories[article.category]}</p>
      <h3 className={featured ? "mt-3 text-xl font-semibold leading-snug" : "mt-3 text-lg font-semibold leading-snug"}>
        <Link href={`/learn/${article.slug}`} className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">{article.description}</p>
      <div className="mt-auto flex items-center justify-between pt-5 text-xs text-subtle">
        <span className="inline-flex items-center gap-1.5"><IconClock width={14} height={14} /> {article.readingMinutes} min read</span>
        <IconArrowRight width={16} height={16} className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
      </div>
    </article>
  );
}

/** Compact guide link used in the "Popular guides" list. */
export function GuideLink({ href, title, tag }: { href: string; title: string; tag: string }) {
  return (
    <Link href={href} className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-line-strong hover:bg-surface-2">
      <span className="flex min-w-0 flex-col">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">{tag}</span>
        <span className="mt-0.5 truncate font-medium text-fg">{title}</span>
      </span>
      <IconArrowRight width={16} height={16} className="shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent" />
    </Link>
  );
}
