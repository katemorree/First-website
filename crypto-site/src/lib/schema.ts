import { site, absoluteUrl } from "./site";
import type { FAQ } from "@/content/reviews";

/** Helpers that build schema.org JSON-LD objects for Google rich results. */

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/icon.svg"),
  sameAs: Object.values(site.social).filter(Boolean),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: site.name,
  url: site.url,
  publisher: { "@id": absoluteUrl("/#organization") },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: absoluteUrl("/search?q={search_term_string}") },
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const articleSchema = (a: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated: string;
  image: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  image: [absoluteUrl(a.image)],
  datePublished: a.published,
  dateModified: a.updated,
  mainEntityOfPage: absoluteUrl(a.path),
  author: { "@type": "Organization", name: site.editorialTeam, url: absoluteUrl("/about") },
  publisher: { "@id": absoluteUrl("/#organization") },
});

export const faqSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/**
 * Review markup is only emitted when the score is marked "verified"
 * in platforms.ts — i.e. after you have actually tested the platform.
 */
export const reviewSchema = (r: {
  platformName: string;
  platformUrl: string;
  score: number;
  path: string;
  summary: string;
  published: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: { "@type": "Organization", name: r.platformName, url: r.platformUrl },
  reviewRating: { "@type": "Rating", ratingValue: r.score, bestRating: 5, worstRating: 1 },
  author: { "@type": "Organization", name: site.editorialTeam },
  publisher: { "@id": absoluteUrl("/#organization") },
  reviewBody: r.summary,
  datePublished: r.published,
  url: absoluteUrl(r.path),
});

export const itemListSchema = (name: string, items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: it.url })),
});
