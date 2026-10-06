import Link from "next/link";
import { platformsBy, ranked } from "@/content/platforms";
import { PlatformLogo } from "./PlatformLogo";
import { BeginnerMeter } from "./Score";

/**
 * The "terminal" panel in the homepage hero. Every number here comes from
 * platforms.ts — nothing is made up for decoration.
 */
export function HeroScreener() {
  const rows = ranked(platformsBy("exchange")).slice(0, 5);
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-b from-accent/30 via-line to-transparent opacity-70" />
      <div className="relative overflow-hidden rounded-[1.3rem] border border-line bg-surface/95 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur">
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" aria-hidden />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">Exchange screener</span>
          </div>
          <span className="font-mono text-[0.65rem] text-subtle">Spot · base tier</span>
        </div>
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Top exchanges by editorial score with spot fees and beginner friendliness</caption>
          <thead>
            <tr className="font-mono text-[0.62rem] uppercase tracking-wider text-subtle">
              <th scope="col" className="px-4 py-2.5 font-normal sm:px-5">Platform</th>
              <th scope="col" className="px-2 py-2.5 font-normal">Taker fee</th>
              <th scope="col" className="hidden px-2 py-2.5 font-normal sm:table-cell">Beginner</th>
              <th scope="col" className="px-4 py-2.5 text-right font-normal sm:px-5">Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.slug} className="border-t border-line/70">
                <th scope="row" className="px-4 py-3 font-normal sm:px-5">
                  <span className="flex items-center gap-2.5">
                    <PlatformLogo platform={p} size="sm" />
                    <span className="font-medium text-fg">{p.name}</span>
                  </span>
                </th>
                <td className="num px-2 py-3 text-muted">{p.feeSchedule ? `${p.feeSchedule.spotTaker.toFixed(2)}%` : "—"}</td>
                <td className="hidden px-2 py-3 sm:table-cell"><BeginnerMeter value={p.beginnerFriendliness} /></td>
                <td className="num px-4 py-3 text-right font-semibold text-fg sm:px-5">{p.score?.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-line px-4 py-3 sm:px-5">
          <span className="text-[0.7rem] text-subtle">Scores are editorial, not paid placements</span>
          <Link href="/exchanges" className="text-xs font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">Full comparison →</Link>
        </div>
      </div>
    </div>
  );
}
