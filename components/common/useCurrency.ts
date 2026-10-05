"use client";

// components/common/useCurrency.ts
//
// One shared currency choice for the whole page, with no provider to wire up.
//
// WHY NOT REACT CONTEXT: a provider would have to wrap app/layout.tsx, which
// would turn part of the root layout into a client boundary for every route on
// the site — including the 90-odd pages that have nothing to do with money.
// A tiny module-level store read through useSyncExternalStore gives the same
// shared state to any component that asks for it, costs nothing on pages that
// never import it, and leaves the layout a server component.
//
// HYDRATION: the server has no idea what the visitor picked last time, so the
// first render on both sides must agree on the default. We read localStorage in
// an effect, after hydration, and then notify subscribers. That is why
// getServerSnapshot always returns DEFAULT_CURRENCY.

import { useCallback, useEffect, useSyncExternalStore } from "react";
import {
  CURRENCY_MANUAL_KEY,
  CURRENCY_STORAGE_KEY,
  DEFAULT_CURRENCY,
  currencyInfo,
  compactMoney,
  currencySymbol,
  formatMoney,
  isCurrencyCode,
  marketOf,
  type CurrencyCode,
  type Market,
} from "@/lib/currency";

let currentCurrency: CurrencyCode = DEFAULT_CURRENCY;
let hasHydrated = false;
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): CurrencyCode {
  return currentCurrency;
}

/** Must never read localStorage — server and first client render have to match. */
function getServerSnapshot(): CurrencyCode {
  return DEFAULT_CURRENCY;
}

/**
 * "user": the visitor picked this (CurrencySwitcher, or the country selector).
 *   It is remembered, and it stops automatic country detection from ever
 *   changing the currency again.
 * "auto": applied because of a detected or restored country. It lives in memory
 *   only, so it is never mistaken for a manual choice on the next visit.
 */
export type CurrencySource = "user" | "auto";

export function setCurrency(code: CurrencyCode, source: CurrencySource = "user"): void {
  if (!isCurrencyCode(code)) return;
  if (source === "user") {
    // Record the choice even when it equals the current value: picking the
    // currency that auto-detection already chose is still a manual choice.
    try {
      window.localStorage.setItem(CURRENCY_MANUAL_KEY, "1");
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, code);
    } catch {
      // Private mode, or storage disabled. The choice still applies for this visit.
    }
  }
  if (code === currentCurrency) return;
  currentCurrency = code;
  emit();
}

/**
 * True when the visitor has ever picked a currency themselves, including before
 * country detection existed (a stored currency with no "auto" writes means it
 * was a manual pick). Automatic detection must not overwrite it.
 */
export function hasManualCurrency(): boolean {
  try {
    return (
      window.localStorage.getItem(CURRENCY_MANUAL_KEY) === "1" ||
      isCurrencyCode(window.localStorage.getItem(CURRENCY_STORAGE_KEY))
    );
  } catch {
    return false;
  }
}

/** Stable (module-level) setter for the hook: always a manual choice. */
function setCurrencyFromUser(code: CurrencyCode): void {
  setCurrency(code, "user");
}

function hydrateFromStorage(): void {
  if (hasHydrated) return;
  hasHydrated = true;

  try {
    const stored = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (isCurrencyCode(stored) && stored !== currentCurrency) {
      currentCurrency = stored;
      emit();
    }
  } catch {
    // Nothing stored, or storage unavailable. Stay on the default.
  }

  // Keep two open tabs in agreement.
  try {
    window.addEventListener("storage", (event) => {
      if (event.key !== CURRENCY_STORAGE_KEY) return;
      if (isCurrencyCode(event.newValue) && event.newValue !== currentCurrency) {
        currentCurrency = event.newValue;
        emit();
      }
    });
  } catch {
    // Ignore — cross-tab sync is a convenience, not a requirement.
  }
}

export interface UseCurrencyResult {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  /** Symbol for the chosen currency, e.g. "$" or "₹". */
  symbol: string;
  /** BCP-47 locale for the chosen currency, for toLocaleString() calls. */
  locale: string;
  /** Format a number as money in the chosen currency. */
  money: (value: number, decimals?: number) => string;
  /** "india" for INR, "west" for every other currency. Pick presets/defaults by this. */
  market: Market;
  /** Short form for preset buttons — "$350K" in en-US, "₹3.5L" in en-IN. */
  compact: (value: number) => string;
}

export function useCurrency(): UseCurrencyResult {
  const currency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    hydrateFromStorage();
  }, []);

  const money = useCallback(
    (value: number, decimals?: number) =>
      formatMoney(value, currency, decimals === undefined ? {} : { decimals }),
    [currency],
  );

  const compact = useCallback((value: number) => compactMoney(value, currency), [currency]);

  return {
    currency,
    setCurrency: setCurrencyFromUser,
    symbol: currencySymbol(currency),
    locale: currencyInfo(currency).locale,
    market: marketOf(currency),
    money,
    compact,
  };
}
