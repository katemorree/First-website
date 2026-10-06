"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/format";

type State = { status: "idle" | "loading" | "success" | "error"; message?: string };

export function NewsletterForm({ source = "unknown", className, stacked = false }: { source?: string; className?: string; stacked?: boolean }) {
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), company: data.get("company") }),
      });
      const json = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setState({ status: "success", message: json.message || "You're in. Check your inbox to confirm." });
      track("newsletter_signup", { source });
      form.reset();
    } catch (err) {
      setState({ status: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  const id = `newsletter-email-${source}`;
  return (
    <form onSubmit={onSubmit} className={cx("w-full", className)} noValidate={false}>
      <div className={cx("flex flex-col gap-2.5", !stacked && "sm:flex-row")}>
        <label htmlFor={id} className="sr-only">Email address</label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          maxLength={254}
          className={cx("h-12 w-full min-w-0 rounded-xl border border-line-strong bg-bg/70 px-4 text-[16px] text-fg placeholder:text-subtle focus:border-accent focus:outline-none", !stacked && "sm:flex-1")}
        />
        {/* Honeypot field: hidden from people, bots fill it in */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Company<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="h-12 shrink-0 rounded-xl bg-accent px-6 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong disabled:opacity-60"
        >
          {state.status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={cx("mt-2.5 min-h-5 text-sm", state.status === "error" ? "text-red" : state.status === "success" ? "text-accent" : "text-subtle")}
      >
        {state.message ?? "Free. One useful email a week at most. Unsubscribe anytime."}
      </p>
    </form>
  );
}

export function NewsletterSection() {
  return (
    <section aria-labelledby="newsletter-title" className="container-x mt-24">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:p-14">
        <div aria-hidden className="glow pointer-events-none absolute inset-0 opacity-80" />
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Newsletter</p>
            <h2 id="newsletter-title" className="mt-3 text-2xl font-semibold sm:text-3xl">Smarter crypto decisions, once a week</h2>
            <p className="mt-3 max-w-md text-muted">
              Plain-English guides, platform changes worth knowing about and fee updates. No hype, no price predictions, no spam.
            </p>
          </div>
          <NewsletterForm source="home" />
        </div>
      </div>
    </section>
  );
}
