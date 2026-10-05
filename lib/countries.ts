// lib/countries.ts
//
// WHY THIS EXISTS
//
// The site's copy is English and aimed at the US and other Tier-1 markets, but
// the people reading it are in many countries. This module is the single table
// that says, for each country we know about, which currency, number locale,
// measurement system and paper size it uses. The text of the site never changes
// with the country — only those defaults do.
//
// Like lib/currency.ts this is deliberately plain TypeScript with no React and
// no dependencies, so a server component, a route handler, a client component
// or a test can import it.
//
// A note on currencies: CurrencyCode (lib/currency.ts) only covers the
// currencies the calculators can label. A country whose own currency is not in
// that list (Sweden, Japan, Mexico, ...) falls back to USD, the same neutral
// default the rest of the site uses. We never convert between currencies, so
// the fallback only changes the label, not any arithmetic.

import type { CurrencyCode } from "@/lib/currency";

export type UnitSystem = "imperial" | "metric";
export type PaperSize = "letter" | "a4";
/** Day/month/year order a country writes dates in. Omitted where it is mixed. */
export type DateStyle = "mdy" | "dmy" | "ymd";

export interface CountryInfo {
  /** ISO 3166-1 alpha-2, upper case. */
  code: string;
  /** English name, as shown in the selector. */
  name: string;
  /** Flag emoji (regional-indicator pair). Some platforms show the letters instead. */
  flag: string;
  currency: CurrencyCode;
  /** BCP-47 locale. Always an English variant because the site text is English. */
  locale: string;
  units: UnitSystem;
  paper: PaperSize;
  dateStyle?: DateStyle;
  /** Extra search terms ("uk", "usa", "holland"). */
  aliases?: string[];
}

export const DEFAULT_COUNTRY = "US";

/** Build a flag emoji from an ISO-2 code so no flag has to be typed by hand. */
function flagOf(code: string): string {
  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map((char) => 0x1f1e6 + char.charCodeAt(0) - 65),
  );
}

interface Spec {
  units?: UnitSystem;
  paper?: PaperSize;
  dateStyle?: DateStyle;
  aliases?: string[];
}

function c(
  code: string,
  name: string,
  currency: CurrencyCode,
  locale: string,
  spec: Spec = {},
): CountryInfo {
  return {
    code,
    name,
    flag: flagOf(code),
    currency,
    locale,
    units: spec.units ?? "metric",
    paper: spec.paper ?? "a4",
    ...(spec.dateStyle ? { dateStyle: spec.dateStyle } : {}),
    ...(spec.aliases ? { aliases: spec.aliases } : {}),
  };
}

const LETTER: Spec = { paper: "letter" };

/**
 * Tier-1 markets first (the order here is the order of the unfiltered list),
 * then India, then everything else alphabetically by name.
 */
export const COUNTRIES: readonly CountryInfo[] = [
  // --- Tier 1 ---------------------------------------------------------------
  c("US", "United States", "USD", "en-US", {
    units: "imperial",
    paper: "letter",
    dateStyle: "mdy",
    aliases: ["usa", "u.s.", "u.s.a.", "america", "united states of america"],
  }),
  c("GB", "United Kingdom", "GBP", "en-GB", {
    dateStyle: "dmy",
    aliases: ["uk", "u.k.", "britain", "great britain", "england", "scotland", "wales", "northern ireland"],
  }),
  c("CA", "Canada", "CAD", "en-CA", { paper: "letter" }),
  c("AU", "Australia", "AUD", "en-AU", { dateStyle: "dmy" }),
  c("NZ", "New Zealand", "NZD", "en-NZ", { dateStyle: "dmy", aliases: ["aotearoa"] }),
  c("IE", "Ireland", "EUR", "en-IE", { dateStyle: "dmy" }),
  c("DE", "Germany", "EUR", "en-DE", { dateStyle: "dmy", aliases: ["deutschland"] }),
  c("FR", "France", "EUR", "en-FR", { dateStyle: "dmy" }),
  c("NL", "Netherlands", "EUR", "en-NL", { dateStyle: "dmy", aliases: ["holland", "the netherlands"] }),
  c("SE", "Sweden", "USD", "en-SE", { dateStyle: "ymd", aliases: ["sverige"] }),
  c("NO", "Norway", "USD", "en-NO", { dateStyle: "dmy", aliases: ["norge"] }),
  c("DK", "Denmark", "USD", "en-DK", { dateStyle: "dmy", aliases: ["danmark"] }),
  c("FI", "Finland", "EUR", "en-FI", { dateStyle: "dmy", aliases: ["suomi"] }),
  c("CH", "Switzerland", "CHF", "en-CH", { dateStyle: "dmy", aliases: ["schweiz", "suisse", "svizzera"] }),
  c("AT", "Austria", "EUR", "en-AT", { dateStyle: "dmy", aliases: ["osterreich"] }),
  c("BE", "Belgium", "EUR", "en-BE", { dateStyle: "dmy", aliases: ["belgique", "belgie"] }),
  c("ES", "Spain", "EUR", "en-ES", { dateStyle: "dmy", aliases: ["espana"] }),
  c("IT", "Italy", "EUR", "en-IT", { dateStyle: "dmy", aliases: ["italia"] }),
  c("PT", "Portugal", "EUR", "en-PT", { dateStyle: "dmy" }),
  c("SG", "Singapore", "SGD", "en-SG", { dateStyle: "dmy" }),
  c("AE", "United Arab Emirates", "AED", "en-AE", { dateStyle: "dmy", aliases: ["uae", "emirates", "dubai", "abu dhabi"] }),
  c("JP", "Japan", "USD", "en-JP", { dateStyle: "ymd", aliases: ["nippon"] }),
  c("KR", "South Korea", "USD", "en-KR", { dateStyle: "ymd", aliases: ["korea", "republic of korea"] }),
  c("HK", "Hong Kong", "USD", "en-HK", { dateStyle: "dmy" }),
  c("LU", "Luxembourg", "EUR", "en-LU", { dateStyle: "dmy" }),
  c("IS", "Iceland", "USD", "en-IS", { dateStyle: "dmy" }),
  c("IL", "Israel", "USD", "en-IL", { dateStyle: "dmy" }),

  // --- India (kept selectable: INR + the 'india' number market) ---------------
  c("IN", "India", "INR", "en-IN", { dateStyle: "dmy", aliases: ["bharat", "hindustan"] }),

  // --- Everyone else, A-Z -----------------------------------------------------
  c("AR", "Argentina", "USD", "en-AR", { dateStyle: "dmy" }),
  c("BD", "Bangladesh", "USD", "en-BD", { dateStyle: "dmy" }),
  c("BR", "Brazil", "USD", "en-BR", { dateStyle: "dmy", aliases: ["brasil"] }),
  c("CL", "Chile", "USD", "en-CL", { ...LETTER, dateStyle: "dmy" }),
  c("CN", "China", "USD", "en-CN", { dateStyle: "ymd", aliases: ["prc"] }),
  c("CO", "Colombia", "USD", "en-CO", { ...LETTER, dateStyle: "dmy" }),
  c("HR", "Croatia", "EUR", "en-HR", { dateStyle: "dmy", aliases: ["hrvatska"] }),
  c("CY", "Cyprus", "EUR", "en-CY", { dateStyle: "dmy" }),
  c("CZ", "Czechia", "USD", "en-CZ", { dateStyle: "dmy", aliases: ["czech republic"] }),
  c("EG", "Egypt", "USD", "en-EG", { dateStyle: "dmy" }),
  c("EE", "Estonia", "EUR", "en-EE", { dateStyle: "dmy" }),
  c("GR", "Greece", "EUR", "en-GR", { dateStyle: "dmy", aliases: ["hellas"] }),
  c("HU", "Hungary", "USD", "en-HU", { dateStyle: "ymd" }),
  c("ID", "Indonesia", "USD", "en-ID", { dateStyle: "dmy" }),
  c("KE", "Kenya", "USD", "en-KE", { dateStyle: "dmy" }),
  c("KW", "Kuwait", "USD", "en-KW", { dateStyle: "dmy" }),
  c("LV", "Latvia", "EUR", "en-LV", { dateStyle: "dmy" }),
  c("LT", "Lithuania", "EUR", "en-LT", { dateStyle: "ymd" }),
  c("MY", "Malaysia", "USD", "en-MY", { dateStyle: "dmy" }),
  c("MT", "Malta", "EUR", "en-MT", { dateStyle: "dmy" }),
  c("MX", "Mexico", "USD", "en-MX", { ...LETTER, dateStyle: "dmy", aliases: ["mexico"] }),
  c("NP", "Nepal", "USD", "en-NP", { dateStyle: "ymd" }),
  c("NG", "Nigeria", "USD", "en-NG", { dateStyle: "dmy" }),
  c("PK", "Pakistan", "USD", "en-PK", { dateStyle: "dmy" }),
  c("PH", "Philippines", "USD", "en-PH", { ...LETTER, dateStyle: "mdy" }),
  c("PL", "Poland", "USD", "en-PL", { dateStyle: "dmy", aliases: ["polska"] }),
  c("QA", "Qatar", "USD", "en-QA", { dateStyle: "dmy" }),
  c("RO", "Romania", "USD", "en-RO", { dateStyle: "dmy" }),
  c("SA", "Saudi Arabia", "USD", "en-SA", { dateStyle: "dmy", aliases: ["ksa"] }),
  c("SK", "Slovakia", "EUR", "en-SK", { dateStyle: "dmy" }),
  c("SI", "Slovenia", "EUR", "en-SI", { dateStyle: "dmy" }),
  c("ZA", "South Africa", "USD", "en-ZA", { dateStyle: "ymd" }),
  c("LK", "Sri Lanka", "USD", "en-LK", { dateStyle: "ymd" }),
  c("TW", "Taiwan", "USD", "en-TW", { dateStyle: "ymd" }),
  c("TH", "Thailand", "USD", "en-TH", { dateStyle: "dmy" }),
  c("TR", "Turkey", "USD", "en-TR", { dateStyle: "dmy", aliases: ["turkiye"] }),
  c("VN", "Vietnam", "USD", "en-VN", { dateStyle: "dmy", aliases: ["viet nam"] }),
];

const BY_CODE: ReadonlyMap<string, CountryInfo> = new Map(COUNTRIES.map((country) => [country.code, country]));

export function isCountryCode(value: unknown): value is string {
  return typeof value === "string" && BY_CODE.has(value.toUpperCase());
}

/** Look up a country by ISO-2 code (case-insensitive). Unknown codes give undefined. */
export function getCountry(code: string | null | undefined): CountryInfo | undefined {
  if (typeof code !== "string") return undefined;
  return BY_CODE.get(code.toUpperCase());
}

/** Paper size for a country, 'letter' for the US default when the code is unknown. */
export function paperFor(code: string | null | undefined): PaperSize {
  return (getCountry(code) ?? (BY_CODE.get(DEFAULT_COUNTRY) as CountryInfo)).paper;
}

/** Lower-case and strip diacritics so "Österreich" matches "osterreich". */
function normalise(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Search countries by name, ISO code or alias, ignoring case and accents.
 * An empty query returns the full list in its display order. Otherwise results
 * are ranked: exact code or name, then names/aliases that start with the query,
 * then a word that starts with it, then a plain substring. Ties keep the
 * display order, so Tier-1 countries stay ahead.
 */
export function searchCountries(query: string): CountryInfo[] {
  const q = normalise(query ?? "");
  if (!q) return [...COUNTRIES];

  const scored: { country: CountryInfo; score: number; index: number }[] = [];

  COUNTRIES.forEach((country, index) => {
    const name = normalise(country.name);
    const code = country.code.toLowerCase();
    const aliases = (country.aliases ?? []).map(normalise);

    let score = 0;
    if (code === q || name === q || aliases.includes(q)) score = 100;
    else if (name.startsWith(q)) score = 80;
    else if (aliases.some((alias) => alias.startsWith(q))) score = 70;
    else if (name.split(/[\s-]+/).some((word) => word.startsWith(q))) score = 60;
    else if (q.length >= 3 && name.includes(q)) score = 40;
    else if (q.length >= 3 && aliases.some((alias) => alias.includes(q))) score = 30;
    else if (q.length < 3 && code.startsWith(q)) score = 50;

    if (score > 0) scored.push({ country, score, index });
  });

  return scored.sort((a, b) => b.score - a.score || a.index - b.index).map((entry) => entry.country);
}
