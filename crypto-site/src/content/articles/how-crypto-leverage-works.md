---
title: "How Crypto Leverage Works (and Why It's So Risky)"
metaTitle: "How Crypto Leverage Works: Margin & Liquidation"
description: "Leverage explained with simple numbers: margin, position size, liquidation price, funding fees, and practical rules to limit your risk."
category: trading
published: "2026-10-06"
updated: "2026-10-06"
related: [spot-vs-futures-trading, how-to-keep-crypto-safe]
faqs:
  - q: "What does 10x leverage mean?"
    a: "Your position is 10 times larger than the money you put in. A 1% price move changes your margin by about 10%."
  - q: "What's a safe leverage level?"
    a: "No leverage level is 'safe'. Lower leverage gives price more room before liquidation, but losses can still be large. Many experienced traders use 1–3x, if any."
---

Leverage lets you open a trade larger than the money in your account. It magnifies gains — and losses — by the same amount.

> **Warning:** leveraged trading is one of the fastest ways to lose money in crypto. This page explains how it works so you understand the risk. It is not a recommendation to use it.

## The basic maths

Say you have **$100** and use **10x leverage**:

- Your **position size** is $1,000.
- Your **margin** (the money at risk) is $100.
- A **1%** price move = $10 gain or loss = **10%** of your margin.

| Price move | Spot ($100) | 10x ($100 margin) | 50x ($100 margin) |
| --- | --- | --- | --- |
| +5% | +$5 | +$50 | +$250 |
| −2% | −$2 | −$20 | −$100 (liquidated) |
| −5% | −$5 | −$50 | Liquidated |
| −10% | −$10 | Liquidated | Liquidated |

## Liquidation

The exchange won't let your losses exceed your margin. Before that happens, it **liquidates** — closes your position automatically — and you lose your margin plus a liquidation fee.

A rough rule: at **10x**, a move of a little under **10%** against you liquidates the position. At **50x**, it's under **2%**. Crypto regularly moves that much in minutes.

## Hidden costs

- **Trading fees** are charged on the full position size, not your margin — at 10x, fees take ten times the bite.
- **Funding payments** are charged or paid every few hours on perpetual contracts.

## If you use leverage anyway

1. Use **isolated margin** so one trade can't drain your whole account.
2. Keep leverage **low** (many experienced traders stay at 1–3x).
3. Always set a **stop-loss** before entering.
4. Risk a **small fixed percentage** of your account per trade.
5. Never add money to a losing position to "save" it.

Use our [percentage change calculator](/tools/percentage-change-calculator) to see how big a gain you need to recover from a loss — it's sobering.
