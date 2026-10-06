/**
 * Analytics event helper. Sends the same event to every tracker you've
 * switched on (Google Analytics, Meta Pixel, TikTok Pixel). If none are
 * configured, or the visitor declined cookies, it quietly does nothing.
 *
 * Affiliate events:
 *   platform_clicked        – any "Visit" button on cards, tables and directories
 *   review_cta_clicked      – a "Visit" button on a review page
 *   comparison_cta_clicked  – a "Visit" button on a comparison page
 *   affiliate_signup_click  – fires on EVERY outbound affiliate click (your main conversion)
 */

export type AnalyticsEvent =
  | "platform_clicked"
  | "review_cta_clicked"
  | "comparison_cta_clicked"
  | "affiliate_signup_click"
  | "newsletter_signup"
  | "share_clicked"
  | "calculator_used";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Params) => void };
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
    window.fbq?.("trackCustom", event, params);
    window.ttq?.track(event, params);
    if (process.env.NODE_ENV === "development") console.info("[analytics]", event, params);
  } catch {
    // Never let analytics break the page.
  }
}

export const analyticsIds = {
  ga: process.env.NEXT_PUBLIC_GA_ID || "",
  meta: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "",
};

export const anyTrackerConfigured = Boolean(analyticsIds.ga || analyticsIds.meta || analyticsIds.tiktok);
