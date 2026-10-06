"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { analyticsIds, anyTrackerConfigured } from "@/lib/analytics";

/**
 * Loads Google Analytics, Meta Pixel and TikTok Pixel — but ONLY if:
 *   1. you've added the ID as an environment variable, and
 *   2. the visitor clicked "Accept" on the cookie banner.
 * This keeps the site in line with GDPR/UK cookie rules.
 */

const KEY = "cookie-consent-v1";
type Consent = "granted" | "denied" | null;
const OPEN_EVENT = "open-cookie-settings";

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const c = readConsent();
    setConsent(c);
    setShowBanner(anyTrackerConfigured && c === null);
    setReady(true);
    const open = () => setShowBanner(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    const wasGranted = consent === "granted";
    setConsent(value);
    setShowBanner(false);
    // Trackers can't be unloaded once running — reload so a withdrawal takes effect.
    if (wasGranted && value === "denied") window.location.reload();
  }

  if (!anyTrackerConfigured || !ready) return null;
  const { ga, meta, tiktok } = analyticsIds;
  const on = consent === "granted";

  return (
    <>
      {on && ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(ga)},{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {on && meta && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(meta)});fbq('track','PageView');`}
        </Script>
      )}
      {on && tiktok && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load(${JSON.stringify(tiktok)});ttq.page();}(window,document,'ttq');`}
        </Script>
      )}

      {showBanner && (
        <div role="dialog" aria-live="polite" aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-[60] sm:left-auto sm:right-5 sm:bottom-5 sm:max-w-sm">
          <div className="rounded-2xl border border-line-strong bg-surface-2/95 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl">
            <p className="text-sm font-medium text-fg">Cookies & analytics</p>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">
              We&apos;d like to use analytics and advertising cookies to understand which pages help people and measure affiliate sign-ups.
              Nothing loads unless you accept. <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-fg">Privacy policy</Link>
            </p>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => choose("denied")} className="h-10 flex-1 rounded-xl border border-line-strong text-sm text-fg transition-colors hover:bg-surface-3">
                Reject
              </button>
              <button type="button" onClick={() => choose("granted")} className="h-10 flex-1 rounded-xl bg-accent text-sm font-medium text-accent-ink transition-colors hover:bg-accent-strong">
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  if (!anyTrackerConfigured) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className="self-start underline underline-offset-2 hover:text-fg">
      Cookie settings
    </button>
  );
}
