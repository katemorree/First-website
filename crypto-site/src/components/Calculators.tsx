"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/format";

/* ───────── Shared helpers ───────── */

function toNum(v: string): number {
  const n = parseFloat(v.replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : NaN;
}

function fmt(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function fmtCoins(n: number) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: n < 1 ? 8 : 6 });
}

function pct(n: number) {
  if (!Number.isFinite(n)) return "—";
  return `${n > 0 ? "+" : ""}${fmt(n, 2)}%`;
}

/** Fires one "calculator_used" event the first time someone changes a value. */
function useTrackOnce(name: string, deps: unknown[]) {
  const first = useRef(true);
  const sent = useRef(false);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!sent.current) {
      sent.current = true;
      track("calculator_used", { calculator: name });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function Field({
  label, value, onChange, suffix, prefix, hint,
}: { label: string; value: string; onChange: (v: string) => void; suffix?: string; prefix?: string; hint?: string }) {
  const id = useId();
  const invalid = value.trim() !== "" && Number.isNaN(toNum(value));
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-fg">{label}</label>
      <div className={cx("mt-1.5 flex h-12 items-center rounded-xl border bg-bg/70 transition-colors focus-within:border-accent", invalid ? "border-red" : "border-line-strong")}>
        {prefix && <span className="pl-4 text-subtle">{prefix}</span>}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid || undefined}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="num h-full min-w-0 flex-1 bg-transparent px-4 text-[16px] text-fg outline-none"
        />
        {suffix && <span className="pr-4 text-sm text-subtle">{suffix}</span>}
      </div>
      {hint && <p id={`${id}-hint`} className="mt-1 text-xs text-subtle">{hint}</p>}
    </div>
  );
}

function Stat({ label, value, tone = "default", big = false, wide = false }: { label: string; value: string; tone?: "default" | "up" | "down"; big?: boolean; wide?: boolean }) {
  return (
    <div className={cx("rounded-xl border border-line bg-bg/50 px-4 py-3", wide && "sm:col-span-2")}>
      <dt className="text-xs uppercase tracking-wider text-subtle">{label}</dt>
      <dd className={cx("num mt-1 font-semibold", big ? "text-2xl" : "text-lg", tone === "up" && "text-accent", tone === "down" && "text-red", tone === "default" && "text-fg")}>
        {value}
      </dd>
    </div>
  );
}

function Shell({ inputs, results, note }: { inputs: ReactNode; results: ReactNode; note?: ReactNode }) {
  return (
    <div className="card overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="space-y-4 p-5 sm:p-7">{inputs}</div>
        <div className="border-t border-line bg-surface-2/50 p-5 sm:p-7 lg:border-t-0 lg:border-l">
          <p className="eyebrow">Results</p>
          <div aria-live="polite" className="mt-4">{results}</div>
          {note && <p className="mt-5 text-xs leading-relaxed text-subtle">{note}</p>}
        </div>
      </div>
    </div>
  );
}

const tone = (n: number) => (n > 0 ? "up" : n < 0 ? "down" : "default") as "up" | "down" | "default";

/* ───────── 1. Crypto profit calculator ───────── */

export function ProfitCalculator() {
  const [investment, setInvestment] = useState("1000");
  const [buy, setBuy] = useState("60000");
  const [sell, setSell] = useState("66000");
  const [buyFee, setBuyFee] = useState("0.1");
  const [sellFee, setSellFee] = useState("0.1");
  useTrackOnce("profit", [investment, buy, sell, buyFee, sellFee]);

  const r = useMemo(() => {
    const inv = toNum(investment), b = toNum(buy), s = toNum(sell), bf = toNum(buyFee) || 0, sf = toNum(sellFee) || 0;
    if (!(inv > 0 && b > 0 && s >= 0)) return null;
    const coins = (inv * (1 - bf / 100)) / b;
    const gross = coins * s;
    const sellFeeAmt = gross * (sf / 100);
    const net = gross - sellFeeAmt;
    const profit = net - inv;
    const fees = inv * (bf / 100) + sellFeeAmt;
    const breakeven = inv / (coins * (1 - sf / 100));
    return { coins, net, profit, roi: (profit / inv) * 100, fees, breakeven };
  }, [investment, buy, sell, buyFee, sellFee]);

  return (
    <Shell
      inputs={
        <>
          <Field label="Amount invested" value={investment} onChange={setInvestment} hint="In your currency, e.g. USD" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Buy price (per coin)" value={buy} onChange={setBuy} />
            <Field label="Sell price (per coin)" value={sell} onChange={setSell} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Buy fee" value={buyFee} onChange={setBuyFee} suffix="%" />
            <Field label="Sell fee" value={sellFee} onChange={setSellFee} suffix="%" />
          </div>
        </>
      }
      results={
        r ? (
          <dl className="grid gap-3 sm:grid-cols-2">
            <Stat wide big label="Profit / loss" value={fmt(r.profit)} tone={tone(r.profit)} />
            <Stat label="Return" value={pct(r.roi)} tone={tone(r.roi)} />
            <Stat label="Total fees" value={fmt(r.fees)} />
            <Stat label="Coins bought" value={fmtCoins(r.coins)} />
            <Stat label="Value after selling" value={fmt(r.net)} />
            <Stat wide label="Break-even sell price" value={fmt(r.breakeven)} />
          </dl>
        ) : (
          <p className="text-sm text-muted">Enter an amount, a buy price and a sell price to see results.</p>
        )
      }
      note="This calculates the result of a trade using prices you enter. It does not predict future prices. Taxes, spreads and network fees are not included."
    />
  );
}

/* ───────── 2. Percentage change calculator ───────── */

export function PercentageCalculator() {
  const [from, setFrom] = useState("100");
  const [to, setTo] = useState("125");
  const [loss, setLoss] = useState("50");
  useTrackOnce("percentage", [from, to, loss]);

  const a = toNum(from), b = toNum(to), l = toNum(loss);
  const change = a > 0 && Number.isFinite(b) ? ((b - a) / a) * 100 : NaN;
  const diff = Number.isFinite(change) ? b - a : NaN;
  const recover = l > 0 && l < 100 ? (1 / (1 - l / 100) - 1) * 100 : NaN;

  return (
    <div className="grid gap-6">
      <Shell
        inputs={
          <>
            <h2 className="text-lg font-semibold">Percentage gain or loss</h2>
            <Field label="Starting value" value={from} onChange={setFrom} />
            <Field label="Ending value" value={to} onChange={setTo} />
          </>
        }
        results={
          <dl className="grid gap-3">
            <Stat big label="Percentage change" value={pct(change)} tone={tone(change)} />
            <Stat label="Difference" value={fmt(diff)} tone={tone(diff)} />
          </dl>
        }
      />
      <Shell
        inputs={
          <>
            <h2 className="text-lg font-semibold">Gain needed to recover a loss</h2>
            <Field label="Loss" value={loss} onChange={setLoss} suffix="%" hint="Between 0 and 100" />
          </>
        }
        results={
          <dl className="grid gap-3">
            <Stat big label="Gain needed to break even" value={Number.isFinite(recover) ? `+${fmt(recover)}%` : "—"} tone="up" />
          </dl>
        }
        note="A 50% loss needs a 100% gain to get back to where you started. Losses hurt more than equal-sized gains help."
      />
    </div>
  );
}

/* ───────── 3. DCA average cost calculator ───────── */

type Buy = { id: number; amount: string; price: string };

export function DcaCalculator() {
  const [buys, setBuys] = useState<Buy[]>([
    { id: 1, amount: "100", price: "60000" },
    { id: 2, amount: "100", price: "54000" },
    { id: 3, amount: "100", price: "63000" },
  ]);
  const [current, setCurrent] = useState("61000");
  const nextId = useRef(4);
  useTrackOnce("dca", [buys, current]);

  const update = (id: number, key: "amount" | "price", v: string) => setBuys((bs) => bs.map((b) => (b.id === id ? { ...b, [key]: v } : b)));
  const add = () => setBuys((bs) => [...bs, { id: nextId.current++, amount: bs.at(-1)?.amount ?? "100", price: "" }]);
  const remove = (id: number) => setBuys((bs) => (bs.length > 1 ? bs.filter((b) => b.id !== id) : bs));

  const r = useMemo(() => {
    let invested = 0, coins = 0;
    for (const b of buys) {
      const amt = toNum(b.amount), price = toNum(b.price);
      if (amt > 0 && price > 0) {
        invested += amt;
        coins += amt / price;
      }
    }
    const cur = toNum(current);
    const value = cur > 0 ? coins * cur : NaN;
    return { invested, coins, avg: coins > 0 ? invested / coins : NaN, value, pl: value - invested, plPct: ((value - invested) / invested) * 100 };
  }, [buys, current]);

  return (
    <Shell
      inputs={
        <>
          <p className="text-sm text-muted">Enter each purchase you made (or plan to make). The example values are only there to show how it works.</p>
          <div className="space-y-3">
            {buys.map((b, i) => (
              <fieldset key={b.id} className="rounded-xl border border-line p-3">
                <legend className="px-1 text-xs text-subtle">Purchase {i + 1}</legend>
                <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-2.5">
                  <Field label="Amount" value={b.amount} onChange={(v) => update(b.id, "amount", v)} />
                  <Field label="Price per coin" value={b.price} onChange={(v) => update(b.id, "price", v)} />
                  <button
                    type="button"
                    onClick={() => remove(b.id)}
                    disabled={buys.length === 1}
                    aria-label={`Remove purchase ${i + 1}`}
                    className="h-12 w-11 rounded-xl border border-line text-subtle transition-colors hover:border-red/50 hover:text-red disabled:opacity-30"
                  >
                    ✕
                  </button>
                </div>
              </fieldset>
            ))}
          </div>
          <button type="button" onClick={add} className="h-11 w-full rounded-xl border border-dashed border-line-strong text-sm text-muted transition-colors hover:border-accent hover:text-fg">
            + Add purchase
          </button>
          <Field label="Price to value your holding at" value={current} onChange={setCurrent} hint="e.g. today's price" />
        </>
      }
      results={
        <dl className="grid gap-3 sm:grid-cols-2">
          <Stat wide big label="Average cost per coin" value={fmt(r.avg)} />
          <Stat label="Total invested" value={fmt(r.invested)} />
          <Stat label="Coins accumulated" value={fmtCoins(r.coins)} />
          <Stat label="Value at that price" value={fmt(r.value)} />
          <Stat label="Profit / loss" value={`${fmt(r.pl)} (${pct(r.plPct)})`} tone={tone(r.pl)} />
        </dl>
      }
      note="Dollar-cost averaging spreads purchases over time; it does not guarantee a profit or protect against losses in a falling market. Fees are not included."
    />
  );
}

/* ───────── 4. Trading fee calculator ───────── */

export type FeePreset = { label: string; maker: number; taker: number };

export function FeeCalculator({ presets }: { presets: FeePreset[] }) {
  const [size, setSize] = useState("1000");
  const [leverage, setLeverage] = useState("1");
  const [fee, setFee] = useState("0.1");
  const [trades, setTrades] = useState("10");
  const [orderType, setOrderType] = useState<"taker" | "maker">("taker");
  const [preset, setPreset] = useState("");
  useTrackOnce("fees", [size, leverage, fee, trades, preset]);

  function applyPreset(label: string, type = orderType) {
    setPreset(label);
    const p = presets.find((x) => x.label === label);
    if (p) setFee(String(type === "maker" ? p.maker : p.taker));
  }

  const s = toNum(size), lev = Math.max(1, toNum(leverage) || 1), f = toNum(fee), n = toNum(trades);
  const position = s * lev;
  const perSide = position * (f / 100);
  const roundTrip = perSide * 2;
  const monthly = Number.isFinite(n) ? roundTrip * n : NaN;
  const moveToBreakEven = (roundTrip / position) * 100;
  const selectId = useId();

  return (
    <Shell
      inputs={
        <>
          <div>
            <label htmlFor={selectId} className="block text-sm font-medium text-fg">Load a platform&apos;s base fee (optional)</label>
            <select
              id={selectId}
              value={preset}
              onChange={(e) => applyPreset(e.target.value)}
              className="mt-1.5 h-12 w-full rounded-xl border border-line-strong bg-bg/70 px-3 text-[16px] text-fg focus:border-accent focus:outline-none"
            >
              <option value="">Custom</option>
              {presets.map((p) => <option key={p.label} value={p.label}>{p.label}</option>)}
            </select>
          </div>
          <fieldset>
            <legend className="text-sm font-medium text-fg">Order type</legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(["taker", "maker"] as const).map((t) => (
                <label key={t} className={cx("flex h-11 cursor-pointer items-center justify-center rounded-xl border text-sm transition-colors", orderType === t ? "border-accent/60 bg-accent/10 text-fg" : "border-line text-muted hover:text-fg")}>
                  <input type="radio" name="order-type" value={t} checked={orderType === t} onChange={() => { setOrderType(t); if (preset) applyPreset(preset, t); }} className="sr-only" />
                  {t === "taker" ? "Taker (market order)" : "Maker (limit order)"}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Trade amount (your money)" value={size} onChange={setSize} />
            <Field label="Leverage" value={leverage} onChange={setLeverage} suffix="x" hint="1 = no leverage (spot)" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Fee per side" value={fee} onChange={(v) => { setFee(v); setPreset(""); }} suffix="%" />
            <Field label="Round-trip trades per month" value={trades} onChange={setTrades} />
          </div>
        </>
      }
      results={
        position > 0 && Number.isFinite(f) ? (
          <>
          <dl className="grid gap-3 sm:grid-cols-2">
            <Stat wide big label="Fees per month" value={fmt(monthly)} tone="down" />
            <Stat label="Position size" value={fmt(position)} />
            <Stat label="Fee to open" value={fmt(perSide)} />
            <Stat label="Round-trip fee" value={fmt(roundTrip)} />
            <Stat label="Price move to cover fees" value={`${fmt(moveToBreakEven, 3)}%`} />
          </dl>
            {lev > 1 && (
              <div role="note" className="mt-3 rounded-xl border border-amber/25 bg-amber/[0.06] px-4 py-3 text-sm text-muted">
                With {fmt(lev, 0)}x leverage, fees are charged on the full {fmt(position)} position — {fmt(lev, 0)}× more than spot. Round-trip fees equal{" "}
                <span className="num text-fg">{fmt((roundTrip / s) * 100)}%</span> of your own money.
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-muted">Enter a trade amount and fee to see results.</p>
        )
      }
      note="Preset fees are base-tier rates from our platform data and may be out of date — check the platform's fee page. Funding, spreads and withdrawal fees are not included."
    />
  );
}
