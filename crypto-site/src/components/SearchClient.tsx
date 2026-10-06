"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { SearchItem } from "@/lib/search-index";
import { IconSearch, IconArrowRight } from "./Icons";

function score(item: SearchItem, terms: string[]) {
  const title = item.title.toLowerCase();
  const hay = `${title} ${item.description.toLowerCase()} ${item.keywords.toLowerCase()} ${item.type.toLowerCase()}`;
  let s = 0;
  for (const t of terms) {
    if (!hay.includes(t)) return 0;
    s += title.includes(t) ? 3 : 1;
    if (title.startsWith(t)) s += 2;
  }
  return s;
}

export function SearchClient({ index }: { index: SearchItem[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get("q") ?? "");

  // Keep the URL in sync so searches can be shared and bookmarked.
  useEffect(() => {
    const t = setTimeout(() => {
      const url = q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search";
      router.replace(url, { scroll: false });
    }, 250);
    return () => clearTimeout(t);
  }, [q, router]);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index
      .map((item) => ({ item, s: score(item, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30)
      .map((r) => r.item);
  }, [q, index]);

  const suggestions = ["Bybit", "Binance vs Bybit", "hardware wallet", "leverage", "fees", "how to buy bitcoin"];

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="site-search" className="sr-only">Search</label>
        <div className="flex h-14 items-center gap-3 rounded-2xl border border-line-strong bg-surface px-4 focus-within:border-accent">
          <IconSearch className="shrink-0 text-subtle" />
          <input
            id="site-search"
            type="search"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search exchanges, wallets, guides…"
            className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-fg outline-none placeholder:text-subtle"
          />
        </div>
      </form>

      {!q.trim() ? (
        <div className="mt-6">
          <p className="text-sm text-subtle">Try searching for</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => setQ(s)} className="h-9 rounded-full border border-line bg-surface px-4 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg">
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p role="status" aria-live="polite" className="text-sm text-subtle">
            {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{q.trim()}&rdquo;
          </p>
          <ul className="mt-4 space-y-2.5">
            {results.map((r) => (
              <li key={`${r.type}-${r.href}-${r.title}`}>
                <Link href={r.href} className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-surface-2">
                  <span className="min-w-0">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">{r.type}</span>
                    <span className="mt-0.5 block font-medium text-fg">{r.title}</span>
                    <span className="mt-0.5 line-clamp-1 block text-sm text-muted">{r.description}</span>
                  </span>
                  <IconArrowRight width={16} height={16} className="shrink-0 text-subtle group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
          {results.length === 0 && (
            <p className="mt-4 text-muted">
              Nothing found. Try a platform name like &ldquo;Kraken&rdquo; or a topic like &ldquo;wallet&rdquo;, or browse <Link href="/learn" className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">all guides</Link>.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
