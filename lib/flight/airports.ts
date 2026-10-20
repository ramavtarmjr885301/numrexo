// lib/flight/airports.ts
//
// Airport data + live search for the Flight Time Calculator.
//
// * The full list (every airport with an IATA code, ~7,900) lives in
//   /public/data/airports.json and is downloaded once, after the page loads.
// * A few dozen airports are embedded in lib/flight/seed.ts so the first render
//   (and the server-rendered HTML) already has a real route.
// * Search understands IATA / ICAO codes, city names (every airport in the city),
//   airport names ("Heathrow", "Kennedy"), metro areas ("New York" -> JFK, LGA,
//   EWR), old or alternative city names ("Bombay"), and typos ("londn", "dehli").
//
// Relative imports only so the file can be exercised from a plain Node test.

import { distanceMiles } from "./model";

export interface Airport {
  iata: string;
  icao: string;
  name: string;
  city: string;
  region: string;
  /** ISO 3166-1 alpha-2 country code. */
  cc: string;
  lat: number;
  lon: number;
  /** IANA time zone, e.g. "America/New_York". */
  tz: string;
  /** One of the ~420 busiest / best-known airports; ranked first in results. */
  major: boolean;
}

/* ────────────────────────────  text helpers  ──────────────────────────── */

/** lower-case, accents removed, punctuation -> spaces, single-spaced. */
export function norm(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const compact = (s: string) => s.replace(/ /g, "");

/** Optimal-string-alignment distance (insert, delete, replace, swap neighbours = 1 each). Stops early past `max`. */
export function editDistance(a: string, b: string, max = 3): number {
  if (a === b) return 0;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > max) return max + 1;
  let prev2: number[] = [];
  let prev: number[] = Array.from({ length: lb + 1 }, (_, j) => j);
  for (let i = 1; i <= la; i++) {
    const cur: number[] = [i];
    let rowMin = i;
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        v = Math.min(v, prev2[j - 2] + 1);
      }
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev2 = prev;
    prev = cur;
  }
  return prev[lb];
}

/* ────────────────────────────  metro areas & aliases  ──────────────────────────── */

interface Metro {
  /** Normalised phrases that mean this metro area. */
  names: string[];
  codes: string[];
}

/** Cities served by more than one airport that travellers think of as one place. */
const METROS: Metro[] = [
  { names: ["new york", "new york city", "nyc", "manhattan"], codes: ["JFK", "LGA", "EWR"] },
  { names: ["london"], codes: ["LHR", "LGW", "STN", "LTN", "LCY", "SEN"] },
  { names: ["paris"], codes: ["CDG", "ORY", "BVA"] },
  { names: ["tokyo"], codes: ["HND", "NRT"] },
  { names: ["washington", "washington dc", "dc", "washington d c"], codes: ["DCA", "IAD", "BWI"] },
  { names: ["chicago"], codes: ["ORD", "MDW"] },
  { names: ["los angeles", "la", "socal"], codes: ["LAX", "BUR", "LGB", "SNA", "ONT"] },
  { names: ["san francisco", "sf", "bay area", "san francisco bay area"], codes: ["SFO", "OAK", "SJC"] },
  { names: ["dallas", "dallas fort worth", "dfw"], codes: ["DFW", "DAL"] },
  { names: ["houston"], codes: ["IAH", "HOU"] },
  { names: ["miami", "south florida"], codes: ["MIA", "FLL", "PBI"] },
  { names: ["milan", "milano"], codes: ["MXP", "LIN", "BGY"] },
  { names: ["rome", "roma"], codes: ["FCO", "CIA"] },
  { names: ["moscow"], codes: ["SVO", "DME", "VKO"] },
  { names: ["istanbul"], codes: ["IST", "SAW"] },
  { names: ["seoul"], codes: ["ICN", "GMP"] },
  { names: ["beijing"], codes: ["PEK", "PKX"] },
  { names: ["shanghai"], codes: ["PVG", "SHA"] },
  { names: ["osaka"], codes: ["KIX", "ITM"] },
  { names: ["sao paulo"], codes: ["GRU", "CGH", "VCP"] },
  { names: ["buenos aires"], codes: ["EZE", "AEP"] },
  { names: ["rio de janeiro", "rio"], codes: ["GIG", "SDU"] },
  { names: ["bangkok"], codes: ["BKK", "DMK"] },
  { names: ["jakarta"], codes: ["CGK", "HLP"] },
  { names: ["toronto"], codes: ["YYZ", "YTZ"] },
  { names: ["stockholm"], codes: ["ARN", "BMA"] },
  { names: ["brussels"], codes: ["BRU", "CRL"] },
  { names: ["berlin"], codes: ["BER"] },
  { names: ["orlando"], codes: ["MCO", "SFB"] },
  { names: ["delhi", "new delhi"], codes: ["DEL"] },
  { names: ["mumbai", "bombay"], codes: ["BOM"] },
];

/** Old, local or shorthand names -> the name used in the airport data. */
const ALIASES: Record<string, string> = {
  bombay: "mumbai",
  calcutta: "kolkata",
  madras: "chennai",
  bengaluru: "bangalore",
  poona: "pune",
  peking: "beijing",
  saigon: "ho chi minh city",
  hcmc: "ho chi minh city",
  "ho chi minh": "ho chi minh city",
  vegas: "las vegas",
  philly: "philadelphia",
  nola: "new orleans",
  frisco: "san francisco",
  kl: "kuala lumpur",
  hk: "hong kong",
  "mexico df": "mexico city",
  cdmx: "mexico city",
  "ny": "new york",
  koln: "cologne",
  munchen: "munich",
  wien: "vienna",
  praha: "prague",
  kobenhavn: "copenhagen",
  lisboa: "lisbon",
  napoli: "naples",
  firenze: "florence",
  venezia: "venice",
  torino: "turin",
  genova: "genoa",
  moskva: "moscow",
};

/* ────────────────────────────  index  ──────────────────────────── */

interface Entry {
  a: Airport;
  city: string; // normalised
  cityC: string; // compact (no spaces)
  name: string;
  tokens: string[]; // city + name + region + country + codes tokens
  cityTokens: string[];
  iata: string;
  icao: string;
  penalty: number;
  bonus: number;
}

export interface AirportIndex {
  all: Airport[];
  byIata: Map<string, Airport>;
  entries: Entry[];
  metroByPhrase: Map<string, string[]>;
  metroOfCode: Map<string, string>;
}

let regionNames: Intl.DisplayNames | null = null;
const countryCache = new Map<string, string>();

/** "US" -> "United States". Falls back to the code when Intl.DisplayNames is unavailable. */
export function countryName(cc: string): string {
  const hit = countryCache.get(cc);
  if (hit) return hit;
  let out = cc;
  try {
    regionNames ??= new Intl.DisplayNames(["en"], { type: "region" });
    out = regionNames.of(cc) ?? cc;
  } catch {
    out = cc;
  }
  countryCache.set(cc, out);
  return out;
}

const BAD_NAME = /heliport|seaplane|air force|airbase|air base|army|naval|military|coast guard|marine corps|station$/i;

export function buildIndex(airports: Airport[]): AirportIndex {
  const byIata = new Map<string, Airport>();
  const metroByPhrase = new Map<string, string[]>();
  const metroOfCode = new Map<string, string>();
  for (const m of METROS) {
    for (const n of m.names) {
      metroByPhrase.set(n, m.codes);
      metroByPhrase.set(compact(n), m.codes); // "newyork" typed without the space
    }
    for (const c of m.codes) if (!metroOfCode.has(c)) metroOfCode.set(c, m.names[0]);
  }
  const entries: Entry[] = airports.map((a) => {
    byIata.set(a.iata, a);
    const city = norm(a.city);
    const name = norm(a.name);
    const cityTokens = city.split(" ").filter(Boolean);
    const tokens = [
      ...cityTokens,
      ...name.split(" ").filter(Boolean),
      ...norm(a.region).split(" ").filter(Boolean),
      ...norm(countryName(a.cc)).split(" ").filter(Boolean),
      a.iata.toLowerCase(),
      a.icao.toLowerCase(),
    ];
    return {
      a,
      city,
      cityC: compact(city),
      name,
      tokens,
      cityTokens,
      iata: a.iata.toLowerCase(),
      icao: a.icao.toLowerCase(),
      penalty: BAD_NAME.test(a.name) ? 220 : 0,
      bonus: (a.major ? 120 : 0) + (/international|intl/i.test(a.name) ? 15 : 0),
    };
  });
  return { all: airports, byIata, entries, metroByPhrase, metroOfCode };
}

/** Rows of airports.json -> Airport objects. */
export function parseAirportsJson(json: { tz: string[]; a: (string | number)[][] }): Airport[] {
  return json.a.map((r) => ({
    iata: r[0] as string,
    name: r[1] as string,
    city: r[2] as string,
    region: r[3] as string,
    cc: r[4] as string,
    lat: r[5] as number,
    lon: r[6] as number,
    tz: json.tz[r[7] as number] ?? "UTC",
    major: r[8] === 1,
    icao: (r[9] as string) ?? "",
  }));
}

/* ────────────────────────────  search  ──────────────────────────── */

export interface SearchHit {
  airport: Airport;
  score: number;
  /** Set when the airport belongs to a metro area the query named, e.g. "London". */
  metro?: string;
}

function scoreEntry(e: Entry, q: string, qc: string, qTokens: string[], metroCodes: string[] | null): number {
  const code = qc.toLowerCase();
  let s = 0;
  if (q.length === 3 && e.iata === code) s = 1000;
  else if (q.length === 4 && e.icao === code) s = 950;
  else if (metroCodes && metroCodes.includes(e.a.iata)) {
    // airports of the named metro area, in the order travellers expect (main airport first)
    s = 900 + (9 - Math.min(9, metroCodes.indexOf(e.a.iata))) * 25;
  }
  else if (e.cityC === qc) s = 800;
  else if (e.city.startsWith(q) || e.cityC.startsWith(qc)) s = 650;
  else {
    // every typed word must start some word of the airport/city/region/country
    let matched = 0;
    let cityHits = 0;
    for (const t of qTokens) {
      if (e.tokens.some((w) => w.startsWith(t))) {
        matched++;
        if (e.cityTokens.some((w) => w.startsWith(t))) cityHits++;
      }
    }
    if (matched === qTokens.length && matched > 0) s = 300 + cityHits * 40;
    else if (qc.length >= 4 && (compact(e.city + " " + e.name)).includes(qc)) s = 260;
  }
  if (s === 0) return 0;
  return s + e.bonus - e.penalty;
}

/**
 * Live search. Returns the best `limit` airports. An empty query returns [].
 * If `near` is given, ties are broken by distance so the closest airport of a
 * city is listed first.
 */
export function searchAirports(
  index: AirportIndex,
  query: string,
  limit = 10,
  near?: { lat: number; lon: number } | null,
): SearchHit[] {
  let q = norm(query);
  if (!q) return [];
  const aliasTarget = ALIASES[q];
  const queries = aliasTarget && aliasTarget !== q ? [q, aliasTarget] : [q];

  const best = new Map<string, SearchHit>();
  for (const qq of queries) {
    const qc = compact(qq);
    const qTokens = qq.split(" ").filter(Boolean);
    const metroList = index.metroByPhrase.get(qq) ?? null;
    const metroCodes = metroList ?? index.metroByPhrase.get(qc) ?? null;
    for (const e of index.entries) {
      const s = scoreEntry(e, qq, qc, qTokens, metroCodes);
      if (s > 0) {
        const prev = best.get(e.a.iata);
        if (!prev || s > prev.score) {
          best.set(e.a.iata, { airport: e.a, score: s, metro: metroCodes?.includes(e.a.iata) ? qq : undefined });
        }
      }
    }
  }

  let hits = [...best.values()];

  // Typo tolerance: only when the exact/prefix search found very little.
  if (hits.length < 3) {
    const qc = compact(q);
    const allowed = qc.length >= 8 ? 2 : qc.length >= 5 ? 1 : 0;
    if (allowed > 0) {
      for (const e of index.entries) {
        if (best.has(e.a.iata)) continue;
        let d = editDistance(qc, e.cityC.slice(0, qc.length + 1), allowed);
        if (d > allowed) d = Math.min(d, editDistance(qc, e.cityC, allowed));
        if (d > allowed) {
          for (const t of e.tokens) {
            if (t.length < 4) continue;
            const dd = editDistance(qc, t.slice(0, qc.length + 1), allowed);
            if (dd < d) d = dd;
          }
        }
        if (d <= allowed) {
          best.set(e.a.iata, { airport: e.a, score: 200 - d * 40 + e.bonus - e.penalty });
        }
      }
      hits = [...best.values()];
    }
  }

  const dist = (h: SearchHit) => (near ? distanceMiles(near, h.airport) : 0);
  hits.sort(
    (x, y) =>
      y.score - x.score ||
      (near ? dist(x) - dist(y) : 0) ||
      x.airport.name.localeCompare(y.airport.name),
  );
  return hits.slice(0, limit);
}

/** The airports closest to a point, nearest first. `majorOnly` skips small airfields. */
export function nearestAirports(
  airports: Airport[],
  lat: number,
  lon: number,
  count = 5,
  majorOnly = true,
): { airport: Airport; miles: number }[] {
  const here = { lat, lon };
  const pool = majorOnly ? airports.filter((a) => a.major) : airports;
  const list = (pool.length ? pool : airports)
    .map((airport) => ({ airport, miles: distanceMiles(here, airport) }))
    .sort((a, b) => a.miles - b.miles);
  return list.slice(0, count);
}

/**
 * The airport to suggest as someone's "home" airport. Usually the nearest major
 * airport, but inside a multi-airport city the main airport wins when it is not
 * much further away (Chicago -> ORD rather than Midway, which is closer to downtown).
 */
export function homeAirport(index: AirportIndex, lat: number, lon: number): { airport: Airport; miles: number } | null {
  const near = nearestAirports(index.all, lat, lon, 5, true);
  if (!near.length) return null;
  const first = near[0];
  const metro = index.metroOfCode.get(first.airport.iata);
  if (metro) {
    const primaryCode = index.metroByPhrase.get(metro)?.[0];
    const primary = near.find((n) => n.airport.iata === primaryCode);
    if (primary && primary.miles - first.miles <= 30) return primary;
  }
  return first;
}

/* ────────────────────────────  labels  ──────────────────────────── */

/** "Los Angeles, California, United States" (region skipped when it just repeats the city). */
export function placeLabel(a: Airport): string {
  const parts = [a.city];
  if (a.region && norm(a.region) !== norm(a.city)) parts.push(a.region);
  parts.push(countryName(a.cc));
  return parts.filter(Boolean).join(", ");
}

/** "London (LHR)" */
export function shortLabel(a: Airport): string {
  return `${a.city || a.name} (${a.iata})`;
}

/** Text shown inside the input once an airport is chosen. */
export function inputLabel(a: Airport): string {
  return `${a.city || a.name} (${a.iata}) - ${a.name}`;
}
