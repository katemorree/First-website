import Link from "next/link";
import { IconAlert, IconInfo } from "./Icons";
import { cx } from "@/lib/format";

/** Short affiliate disclosure — place near the top of any page with affiliate links. */
export function AffiliateNotice({ className }: { className?: string }) {
  return (
    <p className={cx("flex items-start gap-2 text-[0.8rem] leading-relaxed text-subtle", className)}>
      <IconInfo width={15} height={15} className="mt-0.5 shrink-0 text-muted" />
      <span>
        Some links on this page are affiliate links. If you sign up through them we may earn a commission, at no extra cost to you. This
        never affects our ratings.{" "}
        <Link href="/affiliate-disclosure" className="text-muted underline decoration-line-strong underline-offset-2 hover:text-fg">
          Learn more
        </Link>
      </span>
    </p>
  );
}

/** Risk warning box. */
export function RiskWarning({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <aside
      role="note"
      aria-label="Risk warning"
      className={cx("rounded-2xl border border-amber/25 bg-amber/[0.06] text-sm leading-relaxed", compact ? "p-4" : "p-5 sm:p-6", className)}
    >
      <div className="flex items-start gap-3">
        <IconAlert className="mt-0.5 shrink-0 text-amber" />
        <div className="space-y-2 text-muted">
          <p className="font-medium text-fg">Cryptocurrency is high risk</p>
          <p>
            Crypto prices are extremely volatile and you could lose all of the money you put in. Leveraged products (futures, margin) carry
            even higher risk. Content on this site is for education only and is not financial, investment or tax advice.
          </p>
          {!compact && (
            <p>
              Some links are affiliate links, which means we may receive compensation if you sign up. Always do your own research and check
              that a platform is legal and regulated where you live.{" "}
              <Link href="/risk-disclaimer" className="text-fg underline decoration-line-strong underline-offset-2">Full risk disclaimer</Link>
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
