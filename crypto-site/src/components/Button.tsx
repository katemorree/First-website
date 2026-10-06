import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/format";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

/** Internal navigation button (for outbound platform links use AffiliateCta). */
export function ButtonLink({ href, children, variant = "primary", size = "md", className }: Props) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
        size === "lg" ? "h-12 px-6 text-[0.95rem]" : "h-10 px-4 text-sm",
        variant === "primary" && "bg-accent text-accent-ink hover:bg-accent-strong shadow-[0_0_0_1px_rgba(91,231,169,0.3),0_10px_30px_-12px_rgba(91,231,169,0.55)]",
        variant === "secondary" && "border border-line-strong bg-surface-2/60 text-fg backdrop-blur hover:border-subtle hover:bg-surface-3",
        variant === "ghost" && "text-muted hover:text-fg",
        className
      )}
    >
      {children}
    </Link>
  );
}
