import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { reviews } from "@/content/reviews";
import { getPlatform } from "@/content/platforms";
import { PageHeader } from "@/components/PageHeader";
import { PlatformLogo } from "@/components/PlatformLogo";
import { IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Crypto Platform Reviews",
  description: "In-depth, independent reviews of crypto exchanges and platforms: fees, security, features, pros and cons, and who each one suits.",
  path: "/reviews",
  kicker: "Reviews",
});

export default function ReviewsIndex() {
  return (
    <>
      <PageHeader eyebrow="Reviews" title="Platform reviews" crumbs={[{ name: "Reviews", path: "/reviews" }]} intro={<p>Detailed, independent reviews. Each one covers fees, security, features and who should avoid the platform.</p>} />
      <div className="container-x mt-12 grid gap-5 md:grid-cols-2">
        {reviews.map((r) => {
          const p = getPlatform(r.platformSlug);
          return (
            <Link key={r.slug} href={`/reviews/${r.slug}`} className="card card-hover group flex items-center gap-4 p-5">
              <PlatformLogo platform={p} />
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold">{r.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{r.description}</p>
              </div>
              <IconArrowRight className="shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          );
        })}
      </div>
    </>
  );
}
