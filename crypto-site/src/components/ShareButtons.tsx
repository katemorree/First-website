"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { IconLink, IconShare, IconTelegram, IconWhatsApp, IconX } from "./Icons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  useEffect(() => setCanNativeShare(typeof navigator.share === "function"), []);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "X", href: `https://x.com/intent/post?url=${u}&text=${t}`, Icon: IconX },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, Icon: IconTelegram },
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: IconWhatsApp },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("share_clicked", { method: "copy" });
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
      track("share_clicked", { method: "native" });
    } catch {}
  }

  const btn = "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg";

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-xs text-subtle">Share</span>
      {links.map(({ name, href, Icon }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${name}`} className={btn} onClick={() => track("share_clicked", { method: name })}>
          <Icon />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" className={btn}>
        <IconLink width={17} height={17} />
      </button>
      {canNativeShare && (
        <button type="button" onClick={nativeShare} aria-label="More sharing options" className={`${btn} sm:hidden`}>
          <IconShare width={17} height={17} />
        </button>
      )}
      <span role="status" aria-live="polite" className="text-xs text-accent">{copied ? "Link copied" : ""}</span>
    </div>
  );
}
