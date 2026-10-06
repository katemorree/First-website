import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { LogoMark } from "./Logo";
import { IconInstagram, IconTikTok, IconX, IconYouTube } from "./Icons";
import { CookieSettingsButton } from "./Analytics";

const socials = [
  { key: "x", label: "X (Twitter)", Icon: IconX },
  { key: "tiktok", label: "TikTok", Icon: IconTikTok },
  { key: "instagram", label: "Instagram", Icon: IconInstagram },
  { key: "youtube", label: "YouTube", Icon: IconYouTube },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-surface/60">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg">
              <LogoMark className="h-8 w-8" />
              <span className="text-lg font-semibold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">{site.description}</p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ key, label, Icon }) =>
                site.social[key] ? (
                  <a
                    key={key}
                    href={site.social[key]}
                    target="_blank"
                    rel="noopener me"
                    aria-label={`${site.name} on ${label}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <Icon />
                  </a>
                ) : null
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle">{group.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-3 border-t border-line pt-8 text-xs leading-relaxed text-subtle">
          <p>
            <strong className="font-medium text-muted">Risk warning:</strong> Cryptocurrencies are highly volatile and unregulated in some
            countries. You can lose all of your investment. Leveraged trading is especially risky. Nothing on this website is financial,
            investment, legal or tax advice. Past performance does not indicate future results.
          </p>
          <p>
            <strong className="font-medium text-muted">Affiliate disclosure:</strong> {site.name} is reader-supported. Some links are affiliate
            links and we may receive compensation when you sign up, at no extra cost to you. Compensation never influences our scores or
            recommendations. <Link href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-fg">Read our disclosure</Link>.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} {site.name}. All rights reserved.</p>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
