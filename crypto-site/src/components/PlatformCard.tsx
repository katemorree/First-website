import Link from "next/link";
import { categoryLabels, type Platform } from "@/content/platforms";
import { PlatformLogo } from "./PlatformLogo";
import { BeginnerMeter, Score } from "./Score";
import { AffiliateCta } from "./AffiliateCta";
import { DraftMarker } from "./DraftMarker";
import { IconCheck, IconMinus, IconArrowRight } from "./Icons";
import type { CtaPlacement } from "./AffiliateLink";

type Props = { platform: Platform; rank?: number; placement?: CtaPlacement; compact?: boolean };

/** Full comparison card used for exchanges, wallets and tools. */
export function PlatformCard({ platform: p, rank, placement = "card", compact = false }: Props) {
  const isExchange = p.category === "exchange";
  const facts = isExchange
    ? [
        { k: "Trading fees", v: p.fees },
        { k: "Supported assets", v: p.assets },
      ]
    : [
        { k: "Price", v: p.pricing },
        { k: "Works on", v: p.devices },
      ];

  return (
    <article className="card card-hover flex h-full flex-col p-5 sm:p-6">
      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3.5">
          <PlatformLogo platform={p} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {rank && <span className="num text-xs text-subtle">#{rank}</span>}
              <h3 className="truncate text-lg font-semibold">{p.name}</h3>
            </div>
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-subtle">{categoryLabels[p.category]}</p>
          </div>
        </div>
        <Score platform={p} />
      </header>

      <p className="mt-4 text-sm text-muted">{p.tagline}</p>

      <dl className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line text-sm">
        <div className="bg-surface px-3.5 py-2.5">
          <dt className="text-[0.7rem] uppercase tracking-wider text-subtle">Best for</dt>
          <dd className="mt-0.5 text-fg">{p.bestFor}</dd>
        </div>
        {facts.map(
          (f) =>
            f.v && (
              <div key={f.k} className="bg-surface px-3.5 py-2.5">
                <dt className="flex items-center gap-2 text-[0.7rem] uppercase tracking-wider text-subtle">
                  {f.k} {!p.lastVerified && <DraftMarker />}
                </dt>
                <dd className="mt-0.5 text-fg">{f.v}</dd>
              </div>
            )
        )}
        <div className="flex items-center justify-between bg-surface px-3.5 py-2.5">
          <dt className="text-[0.7rem] uppercase tracking-wider text-subtle">Beginner friendly</dt>
          <dd><BeginnerMeter value={p.beginnerFriendliness} /></dd>
        </div>
      </dl>

      {!compact && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-subtle">Pros</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted">
              {p.pros.slice(0, 3).map((x) => (
                <li key={x} className="flex gap-2"><IconCheck width={16} height={16} className="mt-0.5 shrink-0 text-accent" /><span>{x}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-subtle">Cons</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted">
              {p.cons.slice(0, 3).map((x) => (
                <li key={x} className="flex gap-2"><IconMinus width={16} height={16} className="mt-0.5 shrink-0 text-red" /><span>{x}</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {p.availabilityNote && <p className="mt-4 text-xs text-subtle">⚠︎ {p.availabilityNote}</p>}

      <footer className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-start">
        <AffiliateCta platform={p} placement={placement} variant={isExchange ? "primary" : "secondary"} full />
        {p.reviewSlug && (
          <Link
            href={`/reviews/${p.reviewSlug}`}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-line-strong px-4 text-sm text-fg transition-colors hover:border-subtle hover:bg-surface-3"
          >
            Read review <IconArrowRight width={15} height={15} />
          </Link>
        )}
      </footer>
    </article>
  );
}

/** Small inline card used inside articles via [[platform:slug]]. */
export function PlatformInline({ platform: p }: { platform: Platform }) {
  return (
    <div className="not-prose card my-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex items-center gap-3.5">
        <PlatformLogo platform={p} />
        <div>
          <p className="font-semibold text-fg">
            {p.name}
            {p.score != null && <span className="num ml-2 text-sm font-normal text-muted">{p.score.toFixed(1)}/5</span>}
          </p>
          <p className="text-sm text-muted">Best for: {p.bestFor}</p>
          {p.reviewSlug && (
            <Link href={`/reviews/${p.reviewSlug}`} className="text-sm text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">
              Read our {p.name} review
            </Link>
          )}
        </div>
      </div>
      <AffiliateCta platform={p} placement="article" className="sm:w-auto sm:items-end" />
    </div>
  );
}
