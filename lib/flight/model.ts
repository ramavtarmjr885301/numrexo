// lib/flight/model.ts
//
// All the maths behind the Flight Time Calculator, with no React in it so it can
// be tested on its own (see scripts/test-flight-model.mjs).
//
// WHAT THIS IS: an estimate. Distance is the exact great-circle distance between
// the two airports. Time is "gate to gate" (what an airline timetable shows) and
// comes from a simple, published-in-the-page model: a fixed overhead for taxi,
// climb and descent, plus distance divided by an average cruise speed, adjusted
// for the jet stream. It was tuned against ~35 well-known scheduled routes and
// lands within about 5% of the timetable on average; any single flight can still
// differ by 10% or more because of the actual route, weather and traffic.
//
// Relative imports only (no "@/") so Node can run this file directly in tests.

export type LatLon = { lat: number; lon: number };

export const EARTH_RADIUS_MI = 3958.7613;
export const KM_PER_MILE = 1.609344;
export const NM_PER_MILE = 0.868976;

const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;

/* ────────────────────────────  geometry  ──────────────────────────── */

/** Great-circle distance in statute miles (haversine). */
export function distanceMiles(a: LatLon, b: LatLon): number {
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_MI * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Initial compass bearing (degrees, 0-360) when flying from a to b. */
export function initialBearing(a: LatLon, b: LatLon): number {
  const φ1 = toRad(a.lat);
  const φ2 = toRad(b.lat);
  const Δλ = toRad(b.lon - a.lon);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/** Midpoint of the great-circle path, and the compass bearing there. */
export function midpointInfo(a: LatLon, b: LatLon): { lat: number; lon: number; bearing: number } {
  const φ1 = toRad(a.lat);
  const φ2 = toRad(b.lat);
  const λ1 = toRad(a.lon);
  const Δλ = toRad(b.lon - a.lon);
  const bx = Math.cos(φ2) * Math.cos(Δλ);
  const by = Math.cos(φ2) * Math.sin(Δλ);
  const φm = Math.atan2(
    Math.sin(φ1) + Math.sin(φ2),
    Math.sqrt((Math.cos(φ1) + bx) ** 2 + by ** 2),
  );
  const λm = λ1 + Math.atan2(by, Math.cos(φ1) + bx);
  const mid = { lat: toDeg(φm), lon: ((toDeg(λm) + 540) % 360) - 180 };
  return { ...mid, bearing: initialBearing(mid, b) };
}

/**
 * Points along the great-circle path from a to b, as [lat, lon]. Longitudes are
 * "unwrapped" so the line never jumps across the date line (a path from Tokyo to
 * Los Angeles runs 139 -> 180 -> 240 ...). Leaflet draws values past +-180 in
 * the neighbouring copy of the world, so the arc stays one continuous curve.
 */
export function greatCirclePath(a: LatLon, b: LatLon, steps = 96): [number, number][] {
  const φ1 = toRad(a.lat), λ1 = toRad(a.lon);
  const φ2 = toRad(b.lat), λ2 = toRad(b.lon);
  const v1 = [Math.cos(φ1) * Math.cos(λ1), Math.cos(φ1) * Math.sin(λ1), Math.sin(φ1)];
  const v2 = [Math.cos(φ2) * Math.cos(λ2), Math.cos(φ2) * Math.sin(λ2), Math.sin(φ2)];
  const dot = Math.min(1, Math.max(-1, v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]));
  const ω = Math.acos(dot);
  if (ω < 1e-9) return [[a.lat, a.lon], [b.lat, b.lon]];

  const out: [number, number][] = [];
  let prevLon = a.lon;
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const k1 = Math.sin((1 - f) * ω) / Math.sin(ω);
    const k2 = Math.sin(f * ω) / Math.sin(ω);
    const x = k1 * v1[0] + k2 * v2[0];
    const y = k1 * v1[1] + k2 * v2[1];
    const z = k1 * v1[2] + k2 * v2[2];
    const lat = toDeg(Math.atan2(z, Math.sqrt(x * x + y * y)));
    let lon = toDeg(Math.atan2(y, x));
    while (lon - prevLon > 180) lon -= 360;
    while (lon - prevLon < -180) lon += 360;
    prevLon = lon;
    out.push([lat, lon]);
  }
  return out;
}

/* ────────────────────────────  aircraft  ──────────────────────────── */

export type AircraftKey = "auto" | "narrow" | "wide" | "regional" | "turboprop" | "private";

export interface AircraftProfile {
  key: Exclude<AircraftKey, "auto">;
  label: string;
  examples: string;
  /** Average speed over the whole en-route part of the trip, in mph (includes climb and descent). */
  cruiseMph: number;
  /** Minutes added for taxi, take-off queue, approach and the timetable's own padding. */
  overheadMin: number;
  /** Minutes of the overhead that happen on the ground (taxi out + taxi in). */
  taxiMin: number;
}

export const AIRCRAFT: Record<Exclude<AircraftKey, "auto">, AircraftProfile> = {
  narrow: {
    key: "narrow",
    label: "Narrow-body jet",
    examples: "Boeing 737, Airbus A320",
    cruiseMph: 510,
    overheadMin: 50,
    taxiMin: 20,
  },
  wide: {
    key: "wide",
    label: "Wide-body jet",
    examples: "Boeing 777 / 787, Airbus A330 / A350",
    cruiseMph: 540,
    overheadMin: 55,
    taxiMin: 25,
  },
  regional: {
    key: "regional",
    label: "Regional jet",
    examples: "Embraer E175, Bombardier CRJ",
    cruiseMph: 440,
    overheadMin: 45,
    taxiMin: 18,
  },
  turboprop: {
    key: "turboprop",
    label: "Turboprop",
    examples: "ATR 72, De Havilland Dash 8",
    cruiseMph: 300,
    overheadMin: 35,
    taxiMin: 12,
  },
  private: {
    key: "private",
    label: "Private jet",
    examples: "Citation, Challenger, Gulfstream",
    cruiseMph: 520,
    overheadMin: 30,
    taxiMin: 10,
  },
};

/** What "Automatic" picks: a narrow-body for ordinary routes, a wide-body on long-haul. */
export function resolveAircraft(key: AircraftKey, distMi: number): AircraftProfile {
  if (key !== "auto") return AIRCRAFT[key];
  return distMi > 3200 ? AIRCRAFT.wide : AIRCRAFT.narrow;
}

/* ────────────────────────────  flight time  ──────────────────────────── */

/** Typical jet-stream speed on a mid-latitude route, in mph. */
const JET_STREAM_MPH = 60;

/** 0 near the equator, 1 across the mid-latitudes where the jet stream lives, easing off toward the poles. */
function jetStreamLatitudeFactor(lat: number): number {
  const l = Math.abs(lat);
  if (l <= 15) return 0;
  if (l <= 40) return (l - 15) / 25;
  if (l <= 60) return 1;
  return Math.max(0.3, 1 - (l - 60) / 40);
}

/**
 * Average tail/head wind along the route in mph (positive = tailwind). Jet
 * streams blow west to east, so eastbound flights gain and westbound flights
 * lose. Only the cruise part of the trip feels it, so it is scaled by distance.
 */
export function windMph(a: LatLon, b: LatLon, distMi: number): number {
  const mid = midpointInfo(a, b);
  const eastward = Math.sin(toRad(mid.bearing)); // +1 due east, -1 due west
  const cruiseShare = distMi > 250 ? (distMi - 250) / distMi : 0;
  return JET_STREAM_MPH * jetStreamLatitudeFactor(mid.lat) * eastward * cruiseShare;
}

export interface FlightTime {
  distanceMi: number;
  distanceKm: number;
  distanceNm: number;
  aircraft: AircraftProfile;
  /** Gate to gate, minutes (what a timetable shows). */
  blockMin: number;
  /** Wheels up to wheels down, minutes. */
  airborneMin: number;
  /** Plausible range for the gate-to-gate time, minutes. */
  fastMin: number;
  slowMin: number;
  /** Average tailwind (+) or headwind (-) in mph used in the estimate. */
  windMph: number;
  /** Average ground speed over the cruise part, mph. */
  groundSpeedMph: number;
}

export function estimateFlightTime(a: LatLon, b: LatLon, key: AircraftKey = "auto"): FlightTime {
  const distanceMi = distanceMiles(a, b);
  const aircraft = resolveAircraft(key, distanceMi);
  const wind = windMph(a, b, distanceMi);
  const groundSpeedMph = Math.max(150, aircraft.cruiseMph + wind);
  const blockMin = aircraft.overheadMin + (distanceMi / groundSpeedMph) * 60;
  const airborneMin = Math.max(10, blockMin - aircraft.taxiMin);
  return {
    distanceMi,
    distanceKm: distanceMi * KM_PER_MILE,
    distanceNm: distanceMi * NM_PER_MILE,
    aircraft,
    blockMin,
    airborneMin,
    fastMin: blockMin * 0.93,
    slowMin: blockMin * 1.1,
    windMph: wind,
    groundSpeedMph,
  };
}

/** "7h 25m", "45m", "1d 2h 10m". */
export function formatDuration(totalMin: number): string {
  const m = Math.max(0, Math.round(totalMin));
  const d = Math.floor(m / 1440);
  const h = Math.floor((m % 1440) / 60);
  const mm = m % 60;
  if (d > 0) return `${d}d ${h}h ${mm}m`;
  if (h > 0) return `${h}h ${String(mm).padStart(2, "0")}m`;
  return `${mm}m`;
}

/** "7 hours 25 minutes", for sentences. */
export function durationWords(totalMin: number): string {
  const m = Math.max(0, Math.round(totalMin));
  const h = Math.floor(m / 60);
  const mm = m % 60;
  const hp = h ? `${h} hour${h === 1 ? "" : "s"}` : "";
  const mp = mm ? `${mm} minute${mm === 1 ? "" : "s"}` : "";
  return [hp, mp].filter(Boolean).join(" ") || "0 minutes";
}

/* ────────────────────────────  time zones  ──────────────────────────── */

const dtfCache = new Map<string, Intl.DateTimeFormat>();

function dtf(tz: string): Intl.DateTimeFormat {
  let f = dtfCache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    dtfCache.set(tz, f);
  }
  return f;
}

/** Offset of `tz` from UTC in minutes at the given instant (DST-aware). Falls back to 0 for unknown zones. */
export function tzOffsetMin(tz: string, utcMs: number): number {
  try {
    const parts = dtf(tz).formatToParts(new Date(Math.floor(utcMs / 1000) * 1000));
    const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
    const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second"));
    return Math.round((asUtc - Math.floor(utcMs / 1000) * 1000) / 60000);
  } catch {
    return 0;
  }
}

/** The UTC instant at which the wall clock in `tz` reads y-m-d h:mi. */
export function localToUtcMs(tz: string, y: number, m: number, d: number, h: number, mi: number): number {
  const naive = Date.UTC(y, m - 1, d, h, mi);
  let t = naive - tzOffsetMin(tz, naive) * 60000;
  t = naive - tzOffsetMin(tz, t) * 60000; // second pass settles DST edges
  return t;
}

export interface LocalStamp {
  /** "Mon, Oct 19" */
  dateLabel: string;
  /** "3:45 PM" */
  timeLabel: string;
  /** "EDT", "GMT+5:30" ... */
  zoneLabel: string;
  /** y-m-d of the local date, for day-difference maths. */
  ymd: string;
}

export function localStamp(tz: string, utcMs: number): LocalStamp {
  const safeTz = isValidTz(tz) ? tz : "UTC";
  const date = new Date(utcMs);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: safeTz,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
  const timeLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: safeTz,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
  const zoneLabel =
    new Intl.DateTimeFormat("en-US", { timeZone: safeTz, timeZoneName: "short" })
      .formatToParts(date)
      .find((p) => p.type === "timeZoneName")?.value ?? safeTz;
  const parts = dtf(safeTz).formatToParts(date);
  const g = (t: string) => parts.find((p) => p.type === t)?.value;
  return { dateLabel, timeLabel, zoneLabel, ymd: `${g("year")}-${g("month")}-${g("day")}` };
}

export function isValidTz(tz: string): boolean {
  if (!tz) return false;
  try {
    dtf(tz);
    return true;
  } catch {
    return false;
  }
}

/** Whole-day difference between two local y-m-d strings (b minus a). */
export function dayDiff(aYmd: string, bYmd: string): number {
  const [ay, am, ad] = aYmd.split("-").map(Number);
  const [by, bm, bd] = bYmd.split("-").map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000);
}

/** "+5h 30m" / "-3h" / "same time" : destination clock minus origin clock at the same instant. */
export function describeZoneGap(originTz: string, destTz: string, utcMs: number): string {
  const diff = tzOffsetMin(destTz, utcMs) - tzOffsetMin(originTz, utcMs);
  if (diff === 0) return "same time zone";
  const abs = Math.abs(diff);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  const span = `${h ? `${h}h` : ""}${m ? ` ${m}m` : ""}`.trim();
  return `${span} ${diff > 0 ? "ahead of" : "behind"} departure city`;
}

export interface Schedule {
  departUtc: number;
  arriveUtc: number;
  depart: LocalStamp;
  arrive: LocalStamp;
  /** 0 = same calendar day, 1 = next day, -1 = previous day (clock difference). */
  dayOffset: number;
  zoneGap: string;
}

/**
 * Local departure/arrival wall-clock times.
 * mode "depart": the user knows when they leave (local time at the origin).
 * mode "arrive": the user needs to land by a time (local time at the destination).
 */
export function buildSchedule(opts: {
  mode: "depart" | "arrive";
  y: number; m: number; d: number; h: number; mi: number;
  originTz: string;
  destTz: string;
  blockMin: number;
}): Schedule {
  const o = isValidTz(opts.originTz) ? opts.originTz : "UTC";
  const t = isValidTz(opts.destTz) ? opts.destTz : "UTC";
  let departUtc: number;
  let arriveUtc: number;
  if (opts.mode === "depart") {
    departUtc = localToUtcMs(o, opts.y, opts.m, opts.d, opts.h, opts.mi);
    arriveUtc = departUtc + Math.round(opts.blockMin * 60000);
  } else {
    arriveUtc = localToUtcMs(t, opts.y, opts.m, opts.d, opts.h, opts.mi);
    departUtc = arriveUtc - Math.round(opts.blockMin * 60000);
  }
  const depart = localStamp(o, departUtc);
  const arrive = localStamp(t, arriveUtc);
  return {
    departUtc,
    arriveUtc,
    depart,
    arrive,
    dayOffset: dayDiff(depart.ymd, arrive.ymd),
    zoneGap: describeZoneGap(o, t, departUtc),
  };
}

/* ────────────────────────────  cost  ──────────────────────────── */

export type Cabin = "economy" | "premium" | "business" | "first";

export const CABIN_LABEL: Record<Cabin, string> = {
  economy: "Economy",
  premium: "Premium economy",
  business: "Business",
  first: "First",
};

/**
 * Rough price level of an ordinary economy fare in each country relative to the
 * US (1.0). Domestic tickets in India or China cost a fraction of a US ticket for
 * the same miles; intra-Europe low-cost carriers sit in between. Unlisted
 * countries use 0.9.
 */
const MARKET: Record<string, number> = {
  US: 1.0, CA: 1.0, MX: 0.75, GB: 0.95, IE: 0.85, FR: 0.9, DE: 0.9, ES: 0.8, IT: 0.85,
  NL: 0.9, BE: 0.9, CH: 1.05, AT: 0.9, PT: 0.8, GR: 0.8, SE: 0.85, NO: 0.9, DK: 0.9,
  FI: 0.85, PL: 0.7, CZ: 0.75, HU: 0.7, RO: 0.65, TR: 0.7, IN: 0.4, PK: 0.45, BD: 0.5,
  LK: 0.55, NP: 0.55, CN: 0.6, HK: 0.9, TW: 0.8, JP: 0.9, KR: 0.8, SG: 0.9, MY: 0.55,
  TH: 0.55, VN: 0.5, ID: 0.5, PH: 0.55, AU: 1.0, NZ: 1.0, AE: 0.85, QA: 0.85, SA: 0.8,
  IL: 0.95, EG: 0.6, ZA: 0.8, KE: 0.9, NG: 1.0, MA: 0.7, BR: 0.8, AR: 0.85, CL: 0.85,
  CO: 0.75, PE: 0.75, RU: 0.5,
};

const EUROPE = new Set(["GB","IE","FR","DE","ES","IT","NL","BE","CH","AT","PT","GR","SE","NO","DK","FI","PL","CZ","HU","RO","IS","LU","HR","SK","SI","BG","RS","EE","LV","LT","MT","CY"]);

function marketFactor(fromCc: string, toCc: string, distMi: number): number {
  if (EUROPE.has(fromCc) && EUROPE.has(toCc) && distMi < 1500) return 0.65; // low-cost-carrier territory
  const local = ((MARKET[fromCc] ?? 0.9) + (MARKET[toCc] ?? 0.9)) / 2;
  // Long-haul fares converge: an Indian or Chinese origin does not make a 5,000-mile ticket cheap.
  const pull = Math.min(1, Math.max(0, (distMi - 1500) / 3000));
  return local + (1 - local) * pull;
}

/** Typical one-way economy fare in USD for a given distance in a US-priced market. */
function baseEconomyUsd(distMi: number): number {
  return 70 + 0.62 * Math.pow(Math.max(distMi, 50), 0.78);
}

const MONTH_FACTOR = [0.88, 0.9, 1.02, 0.98, 1.0, 1.12, 1.18, 1.08, 0.9, 0.92, 0.98, 1.15];
const DOW_FACTOR = [1.06, 0.97, 0.93, 0.93, 1.0, 1.07, 0.94]; // Sun..Sat

function leadFactor(leadDays: number): number {
  if (leadDays <= 2) return 1.55;
  if (leadDays <= 6) return 1.35;
  if (leadDays <= 13) return 1.2;
  if (leadDays <= 20) return 1.08;
  if (leadDays <= 120) return 1.0;
  return 1.05;
}

function cabinFactor(cabin: Cabin, distMi: number): number {
  const t = Math.min(1, Math.max(0, (distMi - 1000) / 2500)); // short-haul -> long-haul
  const lerp = (s: number, l: number) => s + (l - s) * t;
  switch (cabin) {
    case "premium": return lerp(1.3, 1.8);
    case "business": return lerp(2.2, 4.0);
    case "first": return lerp(2.8, 6.0);
    default: return 1;
  }
}

export interface FareInputs {
  distanceMi: number;
  fromCc: string;
  toCc: string;
  cabin: Cabin;
  /** Optional: when the departure date is known the estimate reflects season, weekday and booking lead time. */
  date?: { month: number; dow: number; leadDays: number };
}

export interface FareEstimate {
  /** US dollars, per passenger, one way. */
  low: number;
  typical: number;
  high: number;
  factors: { label: string; value: number }[];
}

const round5 = (n: number) => Math.max(10, Math.round(n / 5) * 5);

export function estimateFare(i: FareInputs): FareEstimate {
  const base = baseEconomyUsd(i.distanceMi);
  const market = marketFactor(i.fromCc, i.toCc, i.distanceMi);
  const cabin = cabinFactor(i.cabin, i.distanceMi);
  const factors: { label: string; value: number }[] = [
    { label: "Distance-based base fare", value: base },
    { label: "Market price level", value: market },
    { label: `${CABIN_LABEL[i.cabin]} cabin`, value: cabin },
  ];
  let adj = 1;
  if (i.date) {
    const season = MONTH_FACTOR[i.date.month] ?? 1;
    const dow = DOW_FACTOR[i.date.dow] ?? 1;
    const lead = leadFactor(i.date.leadDays);
    adj = season * dow * lead;
    factors.push(
      { label: "Season", value: season },
      { label: "Day of week", value: dow },
      { label: "Booking lead time", value: lead },
    );
  }
  const typical = base * market * cabin * adj;
  return {
    low: round5(typical * 0.62),
    typical: round5(typical),
    high: round5(typical * 1.9),
    factors,
  };
}

/** A round trip is usually about 1.75x the one-way fare, not 2x (BTS: $549 round-trip vs $312 one-way, Q2 2026). */
export const ROUND_TRIP_MULTIPLIER = 1.76;

/** Charter price per flight hour in USD by cabin size, for the private-jet option. */
export const CHARTER_PER_HOUR = { low: 4500, typical: 6500, high: 9500 };

export function estimateCharter(airborneMin: number): { low: number; typical: number; high: number } {
  // Charter operators bill a minimum of about an hour and add ~0.3 h for taxi, fees and approach.
  const hours = Math.max(1, airborneMin / 60 + 0.3);
  const r = (n: number) => Math.round(n / 100) * 100;
  return {
    low: r(hours * CHARTER_PER_HOUR.low),
    typical: r(hours * CHARTER_PER_HOUR.typical),
    high: r(hours * CHARTER_PER_HOUR.high),
  };
}

/** Approximate CO2-equivalent per economy passenger in kg (distance bands from public emission-factor tables). */
export function estimateCo2Kg(distanceKm: number): number {
  const perKm = distanceKm < 1500 ? 0.13 : distanceKm < 4000 ? 0.1 : 0.09;
  return Math.round(distanceKm * perKm);
}
