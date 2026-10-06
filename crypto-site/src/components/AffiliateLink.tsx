"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

export type CtaPlacement = "card" | "table" | "review" | "comparison" | "sticky" | "article" | "deal" | "hero";

type Props = {
  href: string;
  platformSlug: string;
  platformName: string;
  sponsored: boolean;
  placement: CtaPlacement;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

/**
 * Every outbound "Visit platform" link goes through here so that:
 *  - affiliate links always get rel="sponsored" (Google's requirement)
 *  - non-affiliate links are never disguised as sponsored, and vice versa
 *  - clicks are tracked consistently
 */
export function AffiliateLink({ href, platformSlug, platformName, sponsored, placement, className, children, ariaLabel }: Props) {
  const rel = sponsored ? "sponsored nofollow noopener" : "nofollow noopener";

  function onClick() {
    const params = { platform: platformSlug, platform_name: platformName, placement, affiliate: sponsored };
    if (placement === "review") track("review_cta_clicked", params);
    else if (placement === "comparison") track("comparison_cta_clicked", params);
    else track("platform_clicked", params);
    if (sponsored) track("affiliate_signup_click", params);
  }

  return (
    <a href={href} target="_blank" rel={rel} onClick={onClick} className={className} aria-label={ariaLabel} data-affiliate={sponsored || undefined}>
      {children}
    </a>
  );
}
