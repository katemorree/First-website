import Link from "next/link";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="num text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/search" variant="secondary">Search the site</ButtonLink>
      </div>
      <p className="mt-8 text-sm text-subtle">
        Popular: <Link href="/exchanges" className="hover:text-fg">Exchanges</Link> · <Link href="/wallets" className="hover:text-fg">Wallets</Link> ·{" "}
        <Link href="/learn" className="hover:text-fg">Guides</Link>
      </p>
    </div>
  );
}
