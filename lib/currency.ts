// lib/currency.ts
//
// WHY THIS EXISTS
//
// Every money calculator on the site printed a hard-coded "₹". The written
// content around those calculators is mostly written for a US/UK reader, so a
// visitor from Chicago landed on a tipping guide that quoted rupees. That
// mismatch is the single clearest signal that a page was assembled rather than
// written, and it is why these pages do not hold Tier-1 traffic.
//
// The fix is not to swap one hard-coded symbol for another. It is to let the
// reader pick, default to USD (where the traffic we want is), and keep INR in
// the list so Indian visitors are not pushed out.
//
// This module is deliberately plain TypeScript with no React and no
// dependencies, so it can be imported from a server component, a client
// component, or a test without dragging anything else in.
//
// IMPORTANT: nothing here converts between currencies. There are no exchange
// rates in this file on purpose — a tip on a $50 bill and a tip on a ₹50 bill
// are two different questions, not the same question converted. We only change
// how a number is labelled and formatted, never the arithmetic.

export type CurrencyCode = "USD" | "GBP" | "EUR" | "CAD" | "AUD" | "INR";

export interface CurrencyInfo {
  code: CurrencyCode;
  /** Symbol used in prose and next to input fields. */
  symbol: string;
  /** BCP-47 locale that gives this currency its conventional digit grouping. */
  locale: string;
  /** Shown in the switcher dropdown. */
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$", locale: "en-US", label: "USD ($) — United States" },
  GBP: { code: "GBP", symbol: "£", locale: "en-GB", label: "GBP (£) — United Kingdom" },
  EUR: { code: "EUR", symbol: "€", locale: "en-IE", label: "EUR (€) — Europe" },
  CAD: { code: "CAD", symbol: "$", locale: "en-CA", label: "CAD ($) — Canada" },
  AUD: { code: "AUD", symbol: "$", locale: "en-AU", label: "AUD ($) — Australia" },
  INR: { code: "INR", symbol: "₹", locale: "en-IN", label: "INR (₹) — India" },
};

/** Order shown in the dropdown. USD first because it is the default. */
export const CURRENCY_ORDER: CurrencyCode[] = ["USD", "GBP", "EUR", "CAD", "AUD", "INR"];

export const DEFAULT_CURRENCY: CurrencyCode = "USD";

/** localStorage key. Namespaced so it cannot collide with anything else. */
export const CURRENCY_STORAGE_KEY = "numrexo.currency";

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(CURRENCIES, value);
}

export function currencyInfo(code: CurrencyCode): CurrencyInfo {
  return CURRENCIES[code] ?? CURRENCIES[DEFAULT_CURRENCY];
}

export function currencySymbol(code: CurrencyCode): string {
  return currencyInfo(code).symbol;
}

interface FormatMoneyOptions {
  /** Decimal places. Defaults to 2 below 1000 and 0 at or above it. */
  decimals?: number;
}

/**
 * Format a number as money in the given currency.
 *
 * Uses Intl.NumberFormat, so Indian visitors get 1,00,000 and American visitors
 * get 100,000 from the same call. The old code used toLocaleString() with no
 * locale, which meant the grouping depended on the visitor's browser and could
 * disagree with the ₹ symbol printed next to it.
 */
export function formatMoney(
  value: number,
  code: CurrencyCode = DEFAULT_CURRENCY,
  options: FormatMoneyOptions = {},
): string {
  if (!Number.isFinite(value)) return `${currencySymbol(code)}0`;

  const info = currencyInfo(code);
  const decimals =
    options.decimals ?? (Math.abs(value) >= 1000 || Number.isInteger(value) ? 0 : 2);

  const formatted = new Intl.NumberFormat(info.locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return `${info.symbol}${formatted}`;
}

/**
 * Short form for preset buttons: "$350K" for an American reader, "₹3.5L" for an
 * Indian one. Intl already knows each locale's own shorthand, so we do not have
 * to hard-code "L" and "Cr" — which is what the amortization presets used to do,
 * on a page that had just switched its default to dollars.
 */
export function compactMoney(value: number, code: CurrencyCode = DEFAULT_CURRENCY): string {
  if (!Number.isFinite(value)) return `${currencySymbol(code)}0`;
  const info = currencyInfo(code);
  const formatted = new Intl.NumberFormat(info.locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
  return `${info.symbol}${formatted}`;
}

/** Plain number formatting (no symbol), locale-correct for the chosen currency. */
export function formatNumber(value: number, code: CurrencyCode = DEFAULT_CURRENCY): string {
  if (!Number.isFinite(value)) return "0";
  return new Intl.NumberFormat(currencyInfo(code).locale).format(value);
}
