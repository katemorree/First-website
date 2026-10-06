"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/site";
import { Logo } from "./Logo";
import { IconClose, IconMenu, IconSearch, IconArrowRight } from "./Icons";
import { cx } from "@/lib/format";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the page changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and allow Escape to close while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      className={cx(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-xl" : "border-transparent bg-bg/40 backdrop-blur-md"
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx(
                    "rounded-lg px-3 py-2 text-[0.875rem] transition-colors",
                    isActive(item.href) ? "text-fg" : "text-muted hover:text-fg"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/search"
            aria-label="Search the site"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <IconSearch />
          </Link>
          <Link
            href="/exchanges"
            className="hidden h-9 items-center rounded-xl border border-line-strong bg-surface-2 px-3.5 text-sm font-medium text-fg transition-colors hover:border-subtle sm:inline-flex"
          >
            Compare exchanges
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-fg transition-colors hover:bg-surface-2 lg:hidden"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

    </header>
      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-[49] overflow-y-auto overscroll-contain border-t border-line bg-bg lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x py-4">
          <ul className="divide-y divide-line">
            <li>
              <Link href="/" className="flex items-center justify-between py-4 text-lg text-fg">
                Home <IconArrowRight className="text-subtle" />
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx("flex items-center justify-between py-4 text-lg", isActive(item.href) ? "text-accent" : "text-fg")}
                >
                  {item.label} <IconArrowRight className="text-subtle" />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tools" className="flex items-center justify-between py-4 text-lg text-fg">
                Calculators <IconArrowRight className="text-subtle" />
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-subtle">
            Crypto is high risk. Content is educational, not financial advice. Some links are affiliate links.
          </p>
        </nav>
      </div>
    </>
  );
}
