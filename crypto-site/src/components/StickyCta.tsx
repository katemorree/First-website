import type { Platform } from "@/content/platforms";
import { isAffiliate } from "@/content/platforms";
import { AffiliateCta } from "./AffiliateCta";
import { PlatformLogo } from "./PlatformLogo";
import type { CtaPlacement } from "./AffiliateLink";

/** Bottom bar on phones with the main call to action. Hidden on desktop. */
export function StickyCta({ platform, placement = "sticky" }: { platform: Platform; placement?: CtaPlacement }) {
  return (
    <>
      <div aria-hidden className="h-20 lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <PlatformLogo platform={platform} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{platform.name}</p>
            <p className="truncate text-[0.68rem] text-subtle">{isAffiliate(platform) ? "Affiliate link · Capital at risk" : "Official site · Capital at risk"}</p>
          </div>
          <AffiliateCta platform={platform} placement={placement} showLabel={false} label="Visit" />
        </div>
      </div>
    </>
  );
}
