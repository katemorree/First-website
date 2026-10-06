"use client";

import { useState, type ReactNode } from "react";
import { cx } from "@/lib/format";

type Item = { id: string; tags: string[]; node: ReactNode };
type Filter = { value: string; label: string };

/** Category filter chips + a grid that shows only matching items. */
export function FilterGrid({
  filters,
  items,
  label,
  gridClassName = "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
}: {
  filters: Filter[];
  items: Item[];
  label: string;
  gridClassName?: string;
}) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? items : items.filter((i) => i.tags.includes(active));
  const all: Filter[] = [{ value: "all", label: "All" }, ...filters];

  return (
    <div>
      <div role="group" aria-label={label} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {all.map((f) => {
          const count = f.value === "all" ? items.length : items.filter((i) => i.tags.includes(f.value)).length;
          const on = active === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(f.value)}
              className={cx(
                "inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
                on ? "border-accent/50 bg-accent/10 text-fg" : "border-line bg-surface text-muted hover:border-line-strong hover:text-fg"
              )}
            >
              {f.label}
              <span className={cx("num text-xs", on ? "text-accent" : "text-subtle")}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{visible.length} results shown</p>
      <div className={cx("mt-6", gridClassName)}>
        {visible.map((i) => (
          <div key={i.id} className="animate-fade-up">{i.node}</div>
        ))}
      </div>
    </div>
  );
}
