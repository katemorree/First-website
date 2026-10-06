import { NextResponse } from "next/server";
import { findPlatform, outboundUrl } from "@/content/platforms";

/**
 * Short links for social media bios and videos, e.g.  yoursite.com/go/bybit
 * They redirect to the platform's affiliate link (or official site if you
 * haven't added one yet). Change the link in platforms.ts and every /go/
 * link you've ever posted updates automatically.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const platform = findPlatform(slug.toLowerCase());
  if (!platform) {
    return NextResponse.redirect(new URL("/exchanges", _req.url), 307);
  }
  const res = NextResponse.redirect(outboundUrl(platform), 307);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}
