import { ctaText, isAffiliate, outboundUrl, type Platform } from "@/content/platforms";
import { AffiliateLink, type CtaPlacement } from "./AffiliateLink";
import { IconExternal } from "./Icons";
import { cx } from "@/lib/format";

type Props = {
  platform: Platform;
  placement: CtaPlacement;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  full?: boolean;
  /** Show the small "Affiliate link" / "Official site" line under the button. */
  showLabel?: boolean;
  className?: string;
  label?: string;
};

export function AffiliateCta({ platform, placement, variant = "primary", size = "md", full, showLabel = true, className, label }: Props) {
  const sponsored = isAffiliate(platform);
  const code = platform.affiliate.referralCode?.trim();
  return (
    <div className={cx("flex flex-col gap-1.5", full && "w-full", className)}>
      <AffiliateLink
        href={outboundUrl(platform)}
        platformSlug={platform.slug}
        platformName={platform.name}
        sponsored={sponsored}
        placement={placement}
        ariaLabel={`${label ?? ctaText(platform)} (opens in a new tab${sponsored ? ", affiliate link" : ""})`}
        className={cx(
          "group inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
          size === "lg" ? "h-12 px-6 text-[0.95rem]" : "h-10 px-4 text-sm",
          full && "w-full",
          variant === "primary"
            ? "bg-accent text-accent-ink shadow-[0_0_0_1px_rgba(91,231,169,0.3),0_8px_24px_-12px_rgba(91,231,169,0.6)] hover:bg-accent-strong"
            : "border border-line-strong bg-surface-2 text-fg hover:border-subtle hover:bg-surface-3"
        )}
      >
        {label ?? ctaText(platform)}
        {!showLabel && sponsored && (
          <span title="Affiliate link" className="rounded bg-black/15 px-1 text-[0.6rem] font-semibold uppercase tracking-wide opacity-80">Ad</span>
        )}
        <IconExternal width={15} height={15} className="opacity-70 transition-transform group-hover:translate-x-0.5" />
      </AffiliateLink>
      {showLabel && (
        <span className={cx("text-[0.7rem] leading-tight text-subtle", full ? "text-center" : "")}>
          {sponsored ? (
            <>
              Affiliate link · we may earn a commission
              {code && (
                <>
                  {" "}· Code <span className="num text-muted">{code}</span>
                </>
              )}
            </>
          ) : (
            "Official website · not an affiliate link"
          )}
        </span>
      )}
    </div>
  );
}
