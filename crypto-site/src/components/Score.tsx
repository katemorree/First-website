import Link from "next/link";
import type { Platform } from "@/content/platforms";
import { DraftMarker } from "./DraftMarker";
import { cx } from "@/lib/format";

/** Editorial score, e.g. "4.4 / 5", with a thin meter. */
export function Score({ platform, size = "md", showMeter = true }: { platform: Platform; size?: "md" | "lg"; showMeter?: boolean }) {
  if (platform.score == null) return null;
  const pct = (platform.score / 5) * 100;
  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex items-center gap-1.5">
        {platform.scoreStatus === "draft" && <DraftMarker title="Draft score — set after your own testing" />}
        <span className={cx("num font-semibold text-fg", size === "lg" ? "text-3xl" : "text-lg")}>{platform.score.toFixed(1)}</span>
        <span className="num text-xs text-subtle">/5</span>
      </div>
      {showMeter && (
        <span className="block h-1 w-16 overflow-hidden rounded-full bg-surface-3" aria-hidden>
          <span className="block h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
        </span>
      )}
      <span className="sr-only">Editorial score {platform.score} out of 5</span>
    </div>
  );
}

export function ScoreNote() {
  return (
    <p className="text-xs text-subtle">
      Scores are our editorial opinion and are never influenced by commissions.{" "}
      <Link href="/about#methodology" className="underline decoration-line-strong underline-offset-2 hover:text-fg">How we score</Link>
    </p>
  );
}

export function BeginnerMeter({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1" role="img" aria-label={`Beginner friendliness ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={cx("h-1.5 w-3.5 rounded-full", i <= value ? "bg-accent" : "bg-surface-3")} />
      ))}
    </span>
  );
}
