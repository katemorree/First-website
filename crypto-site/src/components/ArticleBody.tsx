import type { ArticleBlock } from "@/lib/articles";
import { findPlatform } from "@/content/platforms";
import { PlatformInline } from "./PlatformCard";

/** Renders an article: Markdown HTML plus any [[platform:slug]] cards. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        if (b.type === "html") return <div key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
        const p = findPlatform(b.slug);
        return p ? <PlatformInline key={i} platform={p} /> : null;
      })}
    </div>
  );
}
