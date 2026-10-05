"use client";

// components/common/useCountry.ts
//
// One shared country choice for the whole page, with no provider (same pattern
// as useCurrency.ts: a module-level store read through useSyncExternalStore, so
// the root layout stays a server component).
//
// WHAT CHANGES WITH THE COUNTRY: currency, number locale, measurement units,
// paper size and a few calculator defaults. The text of the site never changes,
// and the server-rendered HTML is the same for everybody (US defaults).
//
// HYDRATION: the server cannot know the visitor's country, so the first render
// on both sides uses DEFAULT_COUNTRY. After hydration, in an effect:
//   1. a country the visitor picked themselves (localStorage) always wins;
//   2. otherwise ask /api/geo once per session (cached in sessionStorage) and
//      apply the answer, flagged `isAuto` so the selector can say "detected
//      automatically".
// No browser location prompt is ever shown, and no redirect or reload happens.
//
// CURRENCY: applying a country also sets the currency, but only when the
// visitor has not chosen a currency themselves in CurrencySwitcher. When the
// visitor picks a country by hand, its currency is applied as a manual choice.

import { useEffect, useSyncExternalStore } from "react";
import {
  DEFAULT_COUNTRY,
  getCountry,
  isCountryCode,
  type CountryInfo,
  type PaperSize,
  type UnitSystem,
} from "@/lib/countries";
import type { CurrencyCode } from "@/lib/currency";
import { hasManualCurrency, setCurrency, useCurrency } from "@/components/common/useCurrency";

/** localStorage: the country the visitor picked by hand. */
export const COUNTRY_STORAGE_KEY = "numrexo.country";
/** sessionStorage: the geo lookup result for this session ("US", or "" for unknown). */
export const GEO_CACHE_KEY = "numrexo.geo";

interface CountryState {
  country: string;
  isAuto: boolean;
}

const SERVER_STATE: CountryState = { country: DEFAULT_COUNTRY, isAuto: false };

let state: CountryState = SERVER_STATE;
let hasHydrated = false;
/** True once the visitor picked a country in this page's lifetime (even if storage is blocked). */
let chosenManually = false;
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

function getSnapshot(): CountryState {
  return state;
}

/** Must never read storage — server and first client render have to match. */
function getServerSnapshot(): CountryState {
  return SERVER_STATE;
}

function readStoredCountry(): string | null {
  try {
    const stored = window.localStorage.getItem(COUNTRY_STORAGE_KEY);
    return isCountryCode(stored) ? stored.toUpperCase() : null;
  } catch {
    return null;
  }
}

/** Returns the cached geo result, "" for "looked up, unknown", or null for "not looked up yet". */
function readGeoCache(): string | null {
  try {
    return window.sessionStorage.getItem(GEO_CACHE_KEY);
  } catch {
    return null;
  }
}

function writeGeoCache(value: string): void {
  try {
    window.sessionStorage.setItem(GEO_CACHE_KEY, value);
  } catch {
    // Storage blocked: we may ask again on the next page load. That is fine.
  }
}

/** Update the store, and the currency unless the visitor chose one themselves. */
function applyCountry(code: string, isAuto: boolean): void {
  const info = getCountry(code);
  if (!info) return;

  if (state.country !== info.code || state.isAuto !== isAuto) {
    state = { country: info.code, isAuto };
    emit();
  }

  if (!hasManualCurrency()) {
    setCurrency(info.currency, "auto");
  }
}

/** Visitor-chosen country: remembered, always wins over detection, sets the currency too. */
export function setCountry(code: string): void {
  const info = getCountry(code);
  if (!info) return;

  chosenManually = true;
  try {
    window.localStorage.setItem(COUNTRY_STORAGE_KEY, info.code);
  } catch {
    // Private mode, or storage disabled. The choice still applies for this visit.
  }

  if (state.country !== info.code || state.isAuto) {
    state = { country: info.code, isAuto: false };
    emit();
  }

  // Picking a country is a deliberate request for that country's currency.
  setCurrency(info.currency, "user");
}

function applyDetected(code: string): void {
  // The visitor may have chosen a country while the request was in flight.
  if (chosenManually || readStoredCountry()) return;
  applyCountry(code, true);
}

function detectCountry(): void {
  const cached = readGeoCache();
  if (cached !== null) {
    if (isCountryCode(cached)) applyDetected(cached.toUpperCase());
    return;
  }

  if (typeof fetch !== "function") return;

  fetch("/api/geo", { cache: "no-store", credentials: "same-origin" })
    .then((response) => (response.ok ? response.json() : null))
    .then((data: { country?: unknown } | null) => {
      if (!data) return; // Not a real answer; do not cache, try again next visit.
      const code = isCountryCode(data.country) ? data.country.toUpperCase() : "";
      writeGeoCache(code);
      if (code) applyDetected(code);
    })
    .catch(() => {
      // Offline, blocked or the route is missing. Stay on the default.
    });
}

function hydrateCountry(): void {
  if (hasHydrated) return;
  hasHydrated = true;

  const stored = readStoredCountry();
  if (stored) {
    applyCountry(stored, false);
  } else {
    detectCountry();
  }

  // Keep two open tabs in agreement about a manual choice.
  try {
    window.addEventListener("storage", (event) => {
      if (event.key !== COUNTRY_STORAGE_KEY) return;
      if (isCountryCode(event.newValue)) {
        const next = event.newValue.toUpperCase();
        if (next !== state.country || state.isAuto) {
          state = { country: next, isAuto: false };
          emit();
        }
      }
    });
  } catch {
    // Ignore — cross-tab sync is a convenience, not a requirement.
  }
}

/**
 * Current country for event handlers, PDF builders and anything else that is
 * not a React render. Before hydration it falls back to a stored choice, then
 * to the default. Do not use it during render: use useCountry() so the
 * component re-renders when the country changes.
 */
export function getCountryNow(): CountryInfo {
  const fallback = getCountry(DEFAULT_COUNTRY) as CountryInfo;
  if (hasHydrated || typeof window === "undefined") {
    return getCountry(state.country) ?? fallback;
  }
  const stored = readStoredCountry();
  return (stored ? getCountry(stored) : undefined) ?? getCountry(state.country) ?? fallback;
}

export interface UseCountryResult {
  /** ISO-2 code, "US" until the visitor's country is known. */
  country: string;
  countryInfo: CountryInfo;
  /** Choose a country by hand. Remembered, and overrides automatic detection. */
  setCountry: (code: string) => void;
  /** True while the country is the one we detected rather than one the visitor chose. */
  isAuto: boolean;
  units: UnitSystem;
  paper: PaperSize;
  /** BCP-47 locale of the country (an English variant, e.g. "en-GB"). */
  locale: string;
  /** The currency in effect: the country's, unless the visitor picked another one. */
  currency: CurrencyCode;
}

export function useCountry(): UseCountryResult {
  // Called first so a stored currency is restored before the country effect runs.
  const { currency } = useCurrency();
  const { country, isAuto } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    hydrateCountry();
  }, []);

  const countryInfo = (getCountry(country) ?? getCountry(DEFAULT_COUNTRY)) as CountryInfo;

  return {
    country: countryInfo.code,
    countryInfo,
    setCountry,
    isAuto,
    units: countryInfo.units,
    paper: countryInfo.paper,
    locale: countryInfo.locale,
    currency,
  };
}
