import Link from "next/link";
import type { Platform } from "@/content/platforms";
import { PlatformLogo } from "./PlatformLogo";
import { BeginnerMeter } from "./Score";
import { AffiliateCta } from "./AffiliateCta";
import { DraftMarker } from "./DraftMarker";

/**
 * Exchange comparison table. On wide screens it's a real <table>;
 * on phones the table scrolls sideways with the platform column pinned.
 */
export function ExchangeTable({ exchanges, caption }: { exchanges: Platform[]; caption: string }) {
  return (
    <div className="relative">
      <div className="relative overflow-x-auto rounded-2xl border border-line bg-surface" tabIndex={0} role="region" aria-label={caption}>
        <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line text-[0.7rem] uppercase tracking-wider text-subtle">
              <th scope="col" className="sticky left-0 z-10 bg-surface px-4 py-3.5 font-medium">Platform</th>
              <th scope="col" className="px-4 py-3.5 font-medium">Best for</th>
              <th scope="col" className="px-4 py-3.5 font-medium">
                <span className="inline-flex items-center gap-1.5">Spot fees <DraftMarker /></span>
              </th>
              <th scope="col" className="px-4 py-3.5 font-medium">Assets</th>
              <th scope="col" className="px-4 py-3.5 font-medium">Beginner</th>
              <th scope="col" className="px-4 py-3.5 font-medium">Score</th>
              <th scope="col" className="px-4 py-3.5 font-medium"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {exchanges.map((p) => (
              <tr key={p.slug} className="border-b border-line last:border-0 hover:bg-surface-2/60">
                <th scope="row" className="sticky left-0 z-10 bg-surface px-4 py-4 font-normal">
                  <div className="flex items-center gap-3">
                    <PlatformLogo platform={p} size="sm" />
                    <div>
                      <p className="font-semibold text-fg">{p.name}</p>
                      {p.reviewSlug && (
                        <Link href={`/reviews/${p.reviewSlug}`} className="text-xs text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">Review</Link>
                      )}
                    </div>
                  </div>
                </th>
                <td className="max-w-[14rem] px-4 py-4 text-muted">{p.bestFor}</td>
                <td className="px-4 py-4">
                  {p.feeSchedule ? (
                    <span className="num text-fg">{p.feeSchedule.spotMaker}% / {p.feeSchedule.spotTaker}%</span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                  <span className="block text-[0.7rem] text-subtle">maker / taker</span>
                </td>
                <td className="px-4 py-4 text-muted">{p.assets}</td>
                <td className="px-4 py-4"><BeginnerMeter value={p.beginnerFriendliness} /></td>
                <td className="px-4 py-4">
                  {p.score != null && <span className="num text-base font-semibold text-fg">{p.score.toFixed(1)}</span>}
                </td>
                <td className="px-4 py-4">
                  <AffiliateCta platform={p} placement="table" showLabel={false} className="w-max" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-subtle sm:hidden">← Swipe to see all columns →</p>
    </div>
  );
}
