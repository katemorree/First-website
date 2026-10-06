import type { Metadata } from "next";
import { site, absoluteUrl } from "./site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  /** Short label shown above the title on the social image. */
  kicker?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  /** Set true when the title already contains the brand or should not get " | Satsight". */
  absoluteTitle?: boolean;
};

export function ogImageUrl(title: string, kicker?: string) {
  const params = new URLSearchParams({ title });
  if (kicker) params.set("kicker", kicker);
  return `/og?${params.toString()}`;
}

/** Builds title, description, canonical, Open Graph and X/Twitter tags for a page. */
export function pageMetadata(p: PageSeo): Metadata {
  const image = ogImageUrl(p.title, p.kicker);
  return {
    title: p.absoluteTitle ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: { canonical: p.path },
    robots: p.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: p.type ?? "website",
      url: absoluteUrl(p.path),
      siteName: site.name,
      title: p.title,
      description: p.description,
      locale: site.locale,
      images: [{ url: image, width: 1200, height: 630, alt: p.title }],
      ...(p.type === "article" ? { publishedTime: p.publishedTime, modifiedTime: p.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
      images: [image],
      ...(site.xHandle ? { site: site.xHandle, creator: site.xHandle } : {}),
    },
  };
}
