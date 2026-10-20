// lib/flight/fx.ts
//
// Approximate exchange rates for showing flight-cost estimates in the visitor's
// currency.
//
// Elsewhere on the site we never convert money (lib/currency.ts: a $50 tip and a
// ₹50 tip are different questions, so only the label changes). Flight fares are
// different: the estimate is a real-world price worked out in US dollars, so a
// visitor in India needs that same price in rupees, not "$70" relabelled "₹70".
//
// These are fixed reference rates, not live quotes. A fare estimate already has
// a ±40% range, so a few percent of currency movement does not change the
// answer; update the table every few months.
// Source: mid-market rates on 2026-10-20 (Nepal Rastra Bank cross rates and
// TradingEconomics; AED is pegged at 3.6725).

import type { CurrencyCode } from "../currency";

export const FX_AS_OF = "October 2026";

/** Units of each currency per 1 US dollar. */
export const USD_TO: Record<CurrencyCode, number> = {
  USD: 1,
  INR: 94.73,
  EUR: 0.89,
  GBP: 0.748,
  CAD: 1.41,
  AUD: 1.428,
  NZD: 1.759,
  CHF: 0.825,
  SGD: 1.28,
  AED: 3.6725,
};

/** Convert a USD amount and round it to a "price-like" figure (45, 350, 5,900, 66,000). */
export function convertUsd(usd: number, to: CurrencyCode): number {
  const v = usd * (USD_TO[to] ?? 1);
  if (!Number.isFinite(v) || v <= 0) return 0;
  const digits = Math.floor(Math.log10(v)) + 1;
  const step = digits <= 2 ? 1 : Math.pow(10, digits - 2);
  return Math.round(v / step) * step;
}
