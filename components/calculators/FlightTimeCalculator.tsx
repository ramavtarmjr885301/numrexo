"use client";

// components/calculators/FlightTimeCalculator.tsx
//
// Flight Time Calculator (rebuilt in Patch 25).
//   * Search any of ~7,900 airports by city, airport name, IATA or ICAO code.
//     A city lists every airport that serves it.
//   * The starting airport is pre-selected from the visitor's approximate
//     location (platform geo headers) or, on request, the device location.
//   * Live route map (Leaflet + OpenStreetMap) with the great-circle arc.
//   * Gate-to-gate time, time in the air, distance (mi / km / nm), local
//     departure and arrival times with time-zone and DST handling, and an
//     estimated fare range (or charter price for private jets) plus CO2.
//
// The maths lives in lib/flight/model.ts, the search in lib/flight/airports.ts.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ResultBox from "@/components/common/ResultBox";
import AirportPicker from "./flight/AirportPicker";
import { useAirportIndex } from "@/lib/flight/useAirportIndex";
import {
  AIRCRAFT,
  CABIN_LABEL,
  ROUND_TRIP_MULTIPLIER,
  describeZoneGap,
  durationWords,
  estimateCharter,
  estimateCo2Kg,
  estimateFare,
  estimateFlightTime,
  formatDuration,
  type AircraftKey,
  type Cabin,
} from "@/lib/flight/model";
import { homeAirport, placeLabel, shortLabel, type Airport } from "@/lib/flight/airports";
import { BTS_URL, FAQ, POPULAR_ROUTES } from "@/lib/flight/routes";
import { FX_AS_OF, USD_TO, convertUsd } from "@/lib/flight/fx";
import { useCurrency } from "@/components/common/useCurrency";
import { formatMoney } from "@/lib/currency";

// The map (Leaflet) is only loaded in the browser, and only once the visitor scrolls near it.
const FlightMap = dynamic(() => import("./flight/FlightMap"), {
  ssr: false,
  loading: () => <MapPlaceholder text="Loading map…" />,
});

function MapPlaceholder({ text }: { text: string }) {
  return (
    <div className="h-[320px] sm:h-[400px] lg:h-[440px] w-full rounded-xl border border-hairline bg-cream flex items-center justify-center text-sm text-ink-faint">
      {text}
    </div>
  );
}

/** Optional: set NEXT_PUBLIC_MAP_TILE_URL in Vercel to use a different tile provider (for example MapTiler or Stadia). */
const TILE_URL = process.env.NEXT_PUBLIC_MAP_TILE_URL || undefined;

/* ─────────────────────────  JSON-LD  ───────────────────────── */

const FAQ_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

const WEBAPP_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Flight Time & Cost Calculator",
  alternateName: ["Flight Time Calculator", "Flight Cost Calculator"],
  description:
    "Search any airport by city or code, see the route on a live map, and estimate how long the flight takes and what the ticket costs.",
  url: "https://numrexo.com/travel/flight-time-calculator",
  applicationCategory: "TravelApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Search 7,800+ airports by city, name or code",
    "Nearest airport detection",
    "Live route map",
    "Flight duration and time difference",
    "Estimated ticket price and private jet charter cost",
  ],
  author: { "@type": "Organization", name: "Numrexo", url: "https://numrexo.com" },
});

const BREADCRUMB_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://numrexo.com" },
    { "@type": "ListItem", position: 2, name: "Travel Calculators", item: "https://numrexo.com/travel" },
    { "@type": "ListItem", position: 3, name: "Flight Time & Cost Calculator", item: "https://numrexo.com/travel/flight-time-calculator" },
  ],
});

/* ─────────────────────────  helpers  ───────────────────────── */

type Pos = { lat: number; lon: number; source: "network" | "device"; city?: string | null };

const num = (n: number) => Math.round(n).toLocaleString("en-US");

const GEO_CACHE_KEY = "numrexo.flightGeo";

const AIRCRAFT_OPTIONS: { value: AircraftKey; label: string }[] = [
  { value: "auto", label: "Automatic (best fit for the distance)" },
  ...(Object.values(AIRCRAFT).map((a) => ({
    value: a.key as AircraftKey,
    label: `${a.label} (${a.examples})`,
  }))),
];

const QUICK_ROUTES = ["JFK-LHR", "LAX-JFK", "DEL-BOM", "DEL-LHR", "LHR-DXB", "SFO-HND"];

/* ─────────────────────────  component  ───────────────────────── */

export default function FlightTimeCalculator() {
  const { index, full, failed } = useAirportIndex();

  // Fares are estimated in US dollars and shown in the visitor's currency (auto-detected
  // from their country, or picked in the header). USD visitors see the plain dollar figure.
  const { currency } = useCurrency();
  const usd = (n: number) => formatMoney(convertUsd(n, currency), currency, { decimals: 0 });
  // "$" is shared by USD, CAD, AUD, NZD and SGD, so name the currency on the cost cards (AED/CHF already print their code).
  const codeTag = currency === "AED" || currency === "CHF" ? "" : ` · ${currency}`;

  const [from, setFrom] = useState<Airport>(() => index.byIata.get("JFK")!);
  const [to, setTo] = useState<Airport>(() => index.byIata.get("LHR")!);
  const [aircraft, setAircraft] = useState<AircraftKey>("auto");
  // Set after hydration so the server HTML and first client render match (time zones depend on "now").
  const [nowMs, setNowMs] = useState<number | null>(null);
  const [cabin, setCabin] = useState<Cabin>("economy");
  const [userPos, setUserPos] = useState<Pos | null>(null);
  const [fromNote, setFromNote] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [mapOn, setMapOn] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const touchedFrom = useRef(false);
  const pendingUrl = useRef<{ from?: string; to?: string } | null>(null);
  const detected = useRef(false);
  const mapBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setNowMs(Date.now());
  }, []);

  /* read ?from=XXX&to=YYY once */
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const f = p.get("from")?.trim().toUpperCase();
    const t = p.get("to")?.trim().toUpperCase();
    const ac = p.get("ac");
    if (ac && (ac === "auto" || ac in AIRCRAFT)) setAircraft(ac as AircraftKey);
    if (f || t) {
      pendingUrl.current = { from: f, to: t };
      if (f) touchedFrom.current = true; // a shared link wins over location detection
    }
  }, []);

  /* resolve URL airports as soon as the (seed, then full) index knows them */
  useEffect(() => {
    const pending = pendingUrl.current;
    if (!pending) return;
    if (pending.from) {
      const a = index.byIata.get(pending.from);
      if (a) {
        setFrom(a);
        delete pending.from;
      }
    }
    if (pending.to) {
      const a = index.byIata.get(pending.to);
      if (a) {
        setTo(a);
        delete pending.to;
      }
    }
    if (!pending.from && !pending.to) pendingUrl.current = null;
  }, [index]);

  /* map: mount it only when it is about to scroll into view */
  useEffect(() => {
    const el = mapBoxRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setMapOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMapOn(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const otherThan = useCallback(
    (code: string) => index.byIata.get(code === "JFK" ? "LHR" : "JFK") ?? index.byIata.get("LHR")!,
    [index],
  );

  /* approximate location from the connection -> nearest major airport (once the full list has loaded) */
  useEffect(() => {
    if (!full || detected.current) return;
    detected.current = true;
    let cancelled = false;
    (async () => {
      try {
        let loc: { lat: number | null; lon: number | null; city?: string | null } | null = null;
        try {
          const cached = window.sessionStorage.getItem(GEO_CACHE_KEY);
          if (cached) loc = JSON.parse(cached);
        } catch {
          /* storage unavailable */
        }
        if (!loc) {
          const r = await fetch("/api/geo?loc=1", { cache: "no-store" });
          if (!r.ok) return;
          loc = await r.json();
          try {
            window.sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(loc));
          } catch {
            /* ignore */
          }
        }
        if (cancelled || !loc || typeof loc.lat !== "number" || typeof loc.lon !== "number") return;
        const pos: Pos = { lat: loc.lat, lon: loc.lon, source: "network", city: loc.city };
        setUserPos((p) => p ?? pos);
        if (touchedFrom.current) return;
        const near = homeAirport(index, pos.lat, pos.lon);
        if (near && near.miles < 900) {
          setFrom(near.airport);
          setTo((cur) => (cur.iata === near.airport.iata ? otherThan(near.airport.iata) : cur));
          setFromNote(
            `Starting airport set from your approximate location${pos.city ? ` (${pos.city})` : ""}, about ${num(near.miles)} mi away. Change it any time.`,
          );
        }
      } catch {
        /* geo is a convenience; ignore failures */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [full, index, otherThan]);

  const useDeviceLocation = () => {
    setLocError(null);
    if (!navigator.geolocation) {
      setLocError("Your browser does not support location. Type your city or airport instead.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const { latitude, longitude } = pos.coords;
        setUserPos({ lat: latitude, lon: longitude, source: "device" });
        const near = homeAirport(index, latitude, longitude);
        if (near) {
          touchedFrom.current = true;
          setFrom(near.airport);
          setTo((cur) => (cur.iata === near.airport.iata ? otherThan(near.airport.iata) : cur));
          setFromNote(`Main airport near your device location: about ${num(near.miles)} mi away. Your location stays in your browser.`);
          if (!full) setLocError("The full airport list is still loading, so smaller nearby airports may be missing. Try again in a moment for the complete list.");
        }
      },
      (err) => {
        setLocating(false);
        setLocError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission was denied. You can still type your city or airport."
            : "Could not get your location. Type your city or airport instead.",
        );
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    );
  };

  /* url sync (only for choices the visitor makes) */
  const syncUrl = useCallback((f: Airport, t: Airport, ac: AircraftKey) => {
    try {
      const u = new URL(window.location.href);
      u.searchParams.set("from", f.iata);
      u.searchParams.set("to", t.iata);
      if (ac === "auto") u.searchParams.delete("ac");
      else u.searchParams.set("ac", ac);
      window.history.replaceState(null, "", u.toString());
    } catch {
      /* ignore */
    }
  }, []);

  const pickFrom = (a: Airport) => {
    touchedFrom.current = true;
    setFromNote(null);
    setFrom(a);
    syncUrl(a, to, aircraft);
  };
  const pickTo = (a: Airport) => {
    setTo(a);
    syncUrl(from, a, aircraft);
  };
  const swap = () => {
    touchedFrom.current = true;
    setFromNote(null);
    setFrom(to);
    setTo(from);
    syncUrl(to, from, aircraft);
  };
  const applyRoute = (fromCode: string, toCode: string) => {
    const a = index.byIata.get(fromCode);
    const b = index.byIata.get(toCode);
    if (!a || !b) return;
    touchedFrom.current = true;
    setFromNote(null);
    setFrom(a);
    setTo(b);
    syncUrl(a, b, aircraft);
    document.getElementById("flight-tool")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyLink = async () => {
    const u = new URL(window.location.origin + window.location.pathname);
    u.searchParams.set("from", from.iata);
    u.searchParams.set("to", to.iata);
    if (aircraft !== "auto") u.searchParams.set("ac", aircraft);
    try {
      await navigator.clipboard.writeText(u.toString());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", u.toString());
    }
  };

  /* ───── calculations ───── */

  const same = from.iata === to.iata;
  const ft = useMemo(() => (same ? null : estimateFlightTime(from, to, aircraft)), [from, to, aircraft, same]);

  const zoneGap = useMemo(
    () => (nowMs === null || same ? null : describeZoneGap(from.tz, to.tz, nowMs)),
    [nowMs, same, from.tz, to.tz],
  );

  const isPrivate = aircraft === "private";

  const fare = useMemo(() => {
    if (!ft || isPrivate) return null;
    return estimateFare({
      distanceMi: ft.distanceMi,
      fromCc: from.cc,
      toCc: to.cc,
      cabin,
    });
  }, [ft, isPrivate, from.cc, to.cc, cabin]);

  const charter = useMemo(() => (ft && isPrivate ? estimateCharter(ft.airborneMin) : null), [ft, isPrivate]);

  const co2 = ft ? estimateCo2Kg(ft.distanceKm) : 0;

  const speedText = (mph: number) => `${num(mph)} mph (${num(mph * 1.609344)} km/h)`;

  const liveFlightsUrl = `https://www.google.com/travel/flights?q=${encodeURIComponent(
    `Flights from ${from.iata} to ${to.iata}`,
  )}`;

  /* ───── result rows ───── */

  const extraRows = ft
    ? [
        { label: "Route", value: `${from.iata} → ${to.iata}` },
        { label: "Distance", value: `${num(ft.distanceMi)} mi (${num(ft.distanceKm)} km)` },
        { label: "Time in the air", value: formatDuration(ft.airborneMin) },
        { label: "Likely range, gate to gate", value: `${formatDuration(ft.fastMin)} – ${formatDuration(ft.slowMin)}` },
        ...(zoneGap ? [{ label: "Time difference", value: zoneGap.replace("departure city", from.iata) }] : []),
        {
          label: "Average ground speed",
          value: `${speedText(ft.groundSpeedMph)}${Math.abs(ft.windMph) >= 10 ? ` · ${ft.windMph > 0 ? "tailwind" : "headwind"} ≈ ${num(Math.abs(ft.windMph))} mph` : ""}`,
        },
        ...(fare
          ? [
              {
                label: "Est. fare, one way",
                value: `${usd(fare.low)} – ${usd(fare.high)}`,
                valueColor: "text-emerald-400",
              },
              {
                label: "Est. fare, return",
                value: `${usd(fare.low * ROUND_TRIP_MULTIPLIER)} – ${usd(fare.high * ROUND_TRIP_MULTIPLIER)}`,
                valueColor: "text-emerald-400",
              },
            ]
          : charter
          ? [{
              label: "Est. charter price, one way",
              value: `${usd(charter.low)} – ${usd(charter.high)}`,
              valueColor: "text-emerald-400",
            }]
          : []),
      ]
    : [];

  /* ───── render ───── */

  const field = "w-full px-3 py-2.5 bg-surface border border-hairline rounded-lg text-ink text-sm";
  const lbl = "block text-xs font-semibold text-ink-faint mb-2";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEBAPP_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />

      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com" itemProp="item" className="hover:text-ink-soft"><span itemProp="name">Home</span></a><meta itemProp="position" content="1" /></li>
          <li className="text-ink-soft">/</li>
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><a href="https://numrexo.com/travel" itemProp="item" className="hover:text-ink-soft"><span itemProp="name">Travel Calculators</span></a><meta itemProp="position" content="2" /></li>
          <li className="text-ink-soft">/</li>
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem"><span itemProp="name" className="text-ink-soft">Flight Time &amp; Cost Calculator</span><meta itemProp="position" content="3" /></li>
        </ol>
      </nav>

      {/* ───────────────  TOOL  ─────────────── */}
      <div id="flight-tool" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 scroll-mt-24">
        <div className="bg-surface border border-hairline rounded-xl">
          <div className="px-6 py-4 border-b border-hairline">
            <h2 className="font-semibold">Where are you flying?</h2>
            <p className="text-xs text-ink-faint mt-1">
              Type a city, airport name or code. A city lists every airport that serves it.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-start">
              <AirportPicker
                label="From"
                accent="from"
                value={from}
                onChange={pickFrom}
                index={index}
                fullListReady={full}
                userPos={userPos}
                note={fromNote}
              />
              <button
                type="button"
                onClick={swap}
                aria-label="Swap origin and destination"
                className="sm:mt-7 justify-self-center h-10 w-10 rounded-full border border-hairline bg-surface text-ink hover:bg-cream text-lg"
              >
                ⇄
              </button>
              <AirportPicker
                label="To"
                accent="to"
                value={to}
                onChange={pickTo}
                index={index}
                fullListReady={full}
                userPos={userPos}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={useDeviceLocation}
                disabled={locating}
                className="px-3 py-2 rounded-lg border border-hairline bg-surface text-sm font-medium text-ink hover:bg-cream disabled:opacity-60"
              >
                {locating ? "Finding you…" : "📍 Use my location for the “From” airport"}
              </button>
              {failed && <span className="text-xs text-red-600">Could not load the full airport list; popular airports still work.</span>}
            </div>
            {locError && <p className="text-xs text-red-600">{locError}</p>}

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-ink-faint">Popular:</span>
              {QUICK_ROUTES.map((r) => {
                const [f, t] = r.split("-");
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => applyRoute(f, t)}
                    className="px-2.5 py-1 rounded-full border border-hairline bg-cream text-xs font-mono text-ink-soft hover:border-blue-300"
                  >
                    {f} → {t}
                  </button>
                );
              })}
            </div>

            <hr className="border-hairline" />

            <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-3">
              <div>
                <label htmlFor="ft-aircraft" className={lbl}>Aircraft</label>
                <select id="ft-aircraft" value={aircraft} onChange={(e) => { setAircraft(e.target.value as AircraftKey); }} className={field}>
                  {AIRCRAFT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="ft-cabin" className={lbl}>Cabin</label>
                <select id="ft-cabin" value={cabin} onChange={(e) => setCabin(e.target.value as Cabin)} disabled={isPrivate} className={`${field} disabled:opacity-50`}>
                  {(Object.keys(CABIN_LABEL) as Cabin[]).map((c) => <option key={c} value={c}>{CABIN_LABEL[c]}</option>)}
                </select>
              </div>
            </div>

            {ft && !same && (
              <div className="rounded-xl border border-hairline bg-cream p-4 text-sm text-ink-soft leading-relaxed" aria-live="polite">
                <strong className="text-ink">Quick answer:</strong> a non-stop flight from {from.city || from.name} ({from.iata}) to {to.city || to.name} ({to.iata}) takes
                about <strong className="text-ink">{durationWords(ft.blockMin)}</strong>
                {fare ? (
                  <>
                    , and a one-way {CABIN_LABEL[cabin].toLowerCase()} ticket typically costs <strong className="text-ink">{usd(fare.typical)}</strong> ({usd(fare.low)} to {usd(fare.high)}).
                  </>
                ) : charter ? (
                  <>
                    , and chartering a mid-size private jet costs roughly <strong className="text-ink">{usd(charter.typical)}</strong> one way.
                  </>
                ) : (
                  "."
                )}
              </div>
            )}
          </div>
        </div>

        {same ? (
          <ResultBox
            title={"Flight Time & Cost"}
            isEmpty
            emptyIcon="✈️"
            emptyText="Choose two different airports to see the flight time"
          />
        ) : (
          <ResultBox
            title={"Flight Time & Cost"}
            isEmpty={!ft}
            emptyIcon="✈️"
            emptyText="Choose two airports to see the flight time"
            mainResult={
              ft
                ? {
                    label: `${shortLabel(from)} to ${shortLabel(to)} · gate to gate`,
                    value: formatDuration(ft.blockMin),
                    color: "text-cyan-400",
                  }
                : undefined
            }
            extraRows={extraRows}
          >
            {ft && (
              <p className="mt-2 text-xs text-gray-400">
                {durationWords(ft.blockMin)} · {ft.aircraft.label.toLowerCase()} assumed
              </p>
            )}
          </ResultBox>
        )}
      </div>

      {/* ───────────────  MAP  ─────────────── */}
      <section className="mb-6" aria-labelledby="ft-map-h">
        <div className="flex flex-wrap items-end justify-between gap-2 mb-3">
          <h2 id="ft-map-h" className="text-xl font-semibold text-ink">Route map</h2>
          <button
            type="button"
            onClick={copyLink}
            className="px-3 py-1.5 rounded-lg border border-hairline bg-surface text-xs font-semibold text-ink hover:bg-cream"
          >
            {copied ? "Link copied ✓" : "🔗 Copy link to this route"}
          </button>
        </div>
        <div ref={mapBoxRef}>
          {!same && mapOn ? (
            <FlightMap from={from} to={to} userPos={userPos} tileUrl={TILE_URL} />
          ) : (
            <MapPlaceholder text={same ? "Choose two different airports to draw the route" : "Map loads as you scroll"} />
          )}
        </div>
        {ft && !same && (
          <p className="mt-2 text-xs text-ink-faint">
            {from.name}, {placeLabel(from)} → {to.name}, {placeLabel(to)}. The dashed line is the shortest (great-circle) path; real flights
            deviate for weather, airspace and traffic. Map data © OpenStreetMap contributors.
          </p>
        )}
      </section>

      {/* ───────────────  COST  ─────────────── */}
      {ft && !same && (
        <section className="mb-8" aria-labelledby="ft-cost-h">
          <h2 id="ft-cost-h" className="text-xl font-semibold text-ink mb-3">
            How much does a flight from {from.city || from.name} to {to.city || to.name} cost?
          </h2>

          {fare && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {[
                  { k: "Low", v: fare.low, note: "Cheap day, booked early" },
                  { k: "Typical", v: fare.typical, note: "What most travelers pay" },
                  { k: "High", v: fare.high, note: "Last minute or peak season" },
                ].map((c) => (
                  <div key={c.k} className={`rounded-xl border p-4 ${c.k === "Typical" ? "border-emerald-300 bg-emerald-50" : "border-hairline bg-surface"}`}>
                    <div className="text-xs font-semibold uppercase tracking-wider text-ink-faint">{c.k} · per person, one way{codeTag}</div>
                    <div className="text-3xl font-bold font-mono text-ink mt-1">{usd(c.v)}</div>
                    <div className="text-xs text-ink-faint mt-1">{c.note}</div>
                    <div className="text-xs text-ink-soft mt-2">Return trip: <strong>{usd(c.v * ROUND_TRIP_MULTIPLIER)}</strong></div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-hairline bg-surface p-4 text-sm text-ink-faint leading-relaxed">
                <p className="mb-2">
                  <strong className="text-ink-soft">How this was estimated.</strong> A base fare that rises with distance, adjusted for the typical price level of the
                  countries involved and your cabin ({CABIN_LABEL[cabin].toLowerCase()}). The low end is a cheap day booked one to three months ahead; the high end is a
                  last-minute or peak-season ticket. A return ticket is usually about {ROUND_TRIP_MULTIPLIER}× the one-way fare, not double.
                {currency !== "USD" &&
                    ` Prices are shown in ${currency}, converted from our US-dollar estimate at about ${USD_TO[currency]} ${currency} per US dollar (${FX_AS_OF}). Change the currency with the country selector at the top of the page.`}
                </p>
                <p className="mb-2">
                  <strong className="text-ink-soft">Not included:</strong> checked bags (on major US airlines commonly US$35 to US$45 for the first bag each way), seat selection, meals,
                  and transport to the airport. Fares quoted here include typical taxes and airline fees.
                </p>
                <p>
                  This is an estimate, not a live price and we do not sell tickets.{" "}
                  <a href={liveFlightsUrl} target="_blank" rel="noopener noreferrer nofollow" className="text-blue-600 underline">Check live prices for {from.iata} → {to.iata} on Google Flights</a>.
                </p>
              </div>
            </>
          )}

          {charter && (
            <div className="rounded-xl border border-hairline bg-surface p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                {[
                  { k: "Light jet", v: charter.low },
                  { k: "Mid-size jet", v: charter.typical },
                  { k: "Large cabin", v: charter.high },
                ].map((c) => (
                  <div key={c.k} className={`rounded-xl border p-4 ${c.k === "Mid-size jet" ? "border-emerald-300 bg-emerald-50" : "border-hairline bg-cream"}`}>
                    <div className="text-xs font-semibold uppercase tracking-wider text-ink-faint">{c.k} · whole aircraft, one way{codeTag}</div>
                    <div className="text-3xl font-bold font-mono text-ink mt-1">{usd(c.v)}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-ink-faint leading-relaxed">
                Charter pricing is per flight hour (about {usd(4500)} for a light jet up to {usd(9500)} for a large-cabin jet), applied to roughly {formatDuration(ft.airborneMin)} in the air plus
                about 20 minutes for taxi and approach, with a one-hour minimum. Empty-leg repositioning, landing fees, fuel surcharges and catering can add to the final quote.
                {ft.distanceMi > 2000 &&
                  " Light and many mid-size jets cannot fly much more than 1,500 to 3,000 miles non-stop, so on a route this long expect a fuel stop or a large-cabin jet."}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="rounded-xl border border-hairline bg-surface p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Door to door</div>
              <div className="text-xl font-bold text-ink mt-1">
                ≈ {formatDuration(ft.blockMin + (from.cc === to.cc ? 120 + 30 : 180 + 60))}
              </div>
              <p className="text-xs text-ink-faint mt-1">
                Flight plus about {from.cc === to.cc ? "2 hours at the airport before departure and 30 minutes to get out after landing" : "3 hours at the airport before departure and an hour for immigration and baggage on arrival"}.
              </p>
            </div>
            <div className="rounded-xl border border-hairline bg-surface p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Carbon footprint</div>
              <div className="text-xl font-bold text-ink mt-1">≈ {num(co2)} kg CO₂e</div>
              <p className="text-xs text-ink-faint mt-1">Per passenger in economy, one way. Rough figure from typical per-kilometer emission factors.</p>
            </div>
            <div className="rounded-xl border border-hairline bg-surface p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Time difference</div>
              <div className="text-xl font-bold text-ink mt-1">{zoneGap ? zoneGap.replace("departure city", from.iata) : "…"}</div>
              <p className="text-xs text-ink-faint mt-1">
                {from.tz.replace(/_/g, " ")} → {to.tz.replace(/_/g, " ")}. Local arrival time = your departure time + flight time ± this difference.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ───────────────  GUIDE CONTENT  ─────────────── */}

      {ft && !same && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-ink mb-3">
            How long is the flight from {from.city || from.name} to {to.city || to.name}?
          </h2>
          <p className="text-ink-faint text-sm leading-relaxed mb-3">
            {from.name} ({from.iata}) in {placeLabel(from)} is about <strong className="text-ink-soft">{num(ft.distanceMi)} miles ({num(ft.distanceKm)} km)</strong> from{" "}
            {to.name} ({to.iata}) in {placeLabel(to)}. A non-stop {ft.aircraft.label.toLowerCase()} flight takes about{" "}
            <strong className="text-ink-soft">{durationWords(ft.blockMin)}</strong> gate to gate, with roughly {durationWords(ft.airborneMin)} of that in the air.
            {Math.abs(ft.windMph) >= 10 &&
              ` The jet stream gives this direction an average ${ft.windMph > 0 ? "tailwind" : "headwind"} of about ${num(Math.abs(ft.windMph))} mph, which ${ft.windMph > 0 ? "shortens" : "lengthens"} the trip compared with flying the other way.`}
            {" "}Timetables, weather and routing can move that by 10 percent either way, so the likely range is {formatDuration(ft.fastMin)} to {formatDuration(ft.slowMin)}.
          </p>
          <p className="text-ink-faint text-sm leading-relaxed">
            There are no direct flights on every route, and a connection adds the layover plus a second take-off and landing. As a rule of thumb, add 1.5 to 3 hours for each stop,
            plus the risk of a missed connection on separate tickets.
          </p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">How this flight time calculator works</h2>
        <p className="text-ink-faint text-sm leading-relaxed mb-3">
          It does three things for any pair of airports. First it finds the <strong className="text-ink-soft">great-circle distance</strong>, the shortest line over the globe, using the
          haversine formula and each airport&apos;s exact coordinates. Second it estimates <strong className="text-ink-soft">gate-to-gate time</strong> as a fixed allowance for taxiing,
          climb and descent plus distance divided by an average speed for the aircraft, corrected for the jet stream:
        </p>
        <div className="rounded-xl border border-hairline bg-cream p-4 font-mono text-xs sm:text-sm text-ink-soft mb-3 overflow-x-auto">
          gate-to-gate time = overhead + distance ÷ (cruise speed ± jet-stream wind)
        </div>
        <p className="text-ink-faint text-sm leading-relaxed mb-4">
          The jet-stream term uses the route&apos;s latitude and compass direction: strongest in the mid-latitudes (roughly 30° to 60°), close to zero near the equator, and
          always helping eastbound flights and slowing westbound ones. It applies only to the cruise part of the trip, so short hops are barely affected. Third, it estimates the ticket price from distance, the
          typical price level of the countries involved and the cabin, and shows the time difference between the two airports using the IANA time-zone database
          (including today&apos;s daylight saving rules).
        </p>
        <div className="bg-surface border border-hairline rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Aircraft assumptions used by the flight time calculator</caption>
            <thead>
              <tr className="border-b border-hairline">
                <th scope="col" className="text-left py-3 px-4 text-ink-faint">Aircraft class</th>
                <th scope="col" className="text-left py-3 px-4 text-ink-faint">Examples</th>
                <th scope="col" className="text-left py-3 px-4 text-ink-faint">Average speed</th>
                <th scope="col" className="text-left py-3 px-4 text-ink-faint">Overhead</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(AIRCRAFT).map((a) => (
                <tr key={a.key} className="border-b border-hairline">
                  <th scope="row" className="text-left font-medium py-2 px-4 text-ink-soft">{a.label}</th>
                  <td className="py-2 px-4 text-ink-faint">{a.examples}</td>
                  <td className="py-2 px-4 text-ink-faint">{a.cruiseMph} mph ({num(a.cruiseMph * 1.609344)} km/h)</td>
                  <td className="py-2 px-4 text-ink-faint">{a.overheadMin} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-ink-faint text-xs leading-relaxed mt-3">
          We tuned these numbers against about 35 well-known scheduled routes (for example New York–Los Angeles, New York–London, Los Angeles–Tokyo, Delhi–Mumbai and Sydney–Singapore),
          where the model averaged within roughly 3 to 4 percent of published timetables. Real timetables include airline padding for congestion, so a specific flight may be listed
          longer or shorter. Airport data comes from the OurAirports project (public domain) through the airportsdata package.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">Flight time, block time and door-to-door time</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface border border-hairline rounded-xl p-4">
            <h3 className="text-sm font-semibold text-cyan-700 mb-2">Time in the air</h3>
            <p className="text-ink-faint text-xs leading-relaxed">Wheels up to wheels down. This is what pilots log as flight time and is the shortest of the three figures.</p>
          </div>
          <div className="bg-surface border border-hairline rounded-xl p-4">
            <h3 className="text-sm font-semibold text-green-700 mb-2">Gate to gate (block time)</h3>
            <p className="text-ink-faint text-xs leading-relaxed">Pushback to arrival at the gate, including taxi and queues. This is the duration an airline timetable and your ticket show, and our headline result.</p>
          </div>
          <div className="bg-surface border border-hairline rounded-xl p-4">
            <h3 className="text-sm font-semibold text-yellow-700 mb-2">Door to door</h3>
            <p className="text-ink-faint text-xs leading-relaxed">Adds time at the airport before departure, immigration and baggage on arrival, and the journey to and from the airports. Often 4 to 6 hours more on an international trip.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">What makes flights cost more or less</h2>
        <p className="text-ink-faint text-sm leading-relaxed mb-3">
          The US Bureau of Transportation Statistics put the average domestic ticket at <strong className="text-ink-soft">$445 in the second quarter of 2026</strong>: about{" "}
          <strong className="text-ink-soft">$312 for one-way tickets</strong> and <strong className="text-ink-soft">$549 for round trips</strong>, counting taxes and required fees
          but not bag or seat fees (<a href={BTS_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">BTS release</a>). That average hides a huge spread,
          which is why this calculator shows a range. These are the main levers, roughly in order of impact:
        </p>
        <ul className="space-y-2 text-sm text-ink-faint">
          <li className="flex gap-3"><span className="text-cyan-700 mt-0.5">•</span><span><strong className="text-ink-soft">Distance and route.</strong> Longer flights cost more in total but less per mile. Routes dominated by one airline, or into small airports, cost more than busy competitive ones.</span></li>
          <li className="flex gap-3"><span className="text-cyan-700 mt-0.5">•</span><span><strong className="text-ink-soft">Booking window.</strong> Fares tend to be lowest roughly one to three months out and rise in the final two weeks. The estimate above adds a premium for dates under three weeks away.</span></li>
          <li className="flex gap-3"><span className="text-cyan-700 mt-0.5">•</span><span><strong className="text-ink-soft">Season and day.</strong> Summer, late December and school holidays are most expensive; January, February, September and October are usually cheaper. Tuesday, Wednesday and Saturday departures often beat Friday and Sunday.</span></li>
          <li className="flex gap-3"><span className="text-cyan-700 mt-0.5">•</span><span><strong className="text-ink-soft">Cabin.</strong> Premium economy is typically 1.3 to 1.8 times economy, business 2 to 4 times and first class up to 6 times on long-haul routes.</span></li>
          <li className="flex gap-3"><span className="text-cyan-700 mt-0.5">•</span><span><strong className="text-ink-soft">Fare type and extras.</strong> Basic economy fares usually exclude a free checked bag and seat choice. Compare the total after extras, not just the headline price.</span></li>
          <li className="flex gap-3"><span className="text-cyan-700 mt-0.5">•</span><span><strong className="text-ink-soft">Taxes and fees.</strong> US domestic tickets include a 7.5 percent federal excise tax and airport charges; international tickets add departure and arrival taxes that can be a significant share of a cheap fare.</span></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">Time zones, arrival time and jet lag</h2>
        <p className="text-ink-faint text-sm leading-relaxed mb-3">
          To work out the local time when you land, take your departure time, add the flight time, then add the time difference shown above (or subtract it if the
          destination is behind). Flying east you lose hours on the clock, so a 7-hour flight can land the next morning; flying west you gain them, and it is even possible
          to land &ldquo;before&rdquo; you left. Clocks change for daylight saving on different dates in different countries, so check the difference again if you travel in
          March, April, October or November.
        </p>
        <p className="text-ink-faint text-sm leading-relaxed">
          Many travelers find it takes about a day to adjust for each one to two time zones crossed, and eastward trips are usually harder than westward ones. Morning daylight at
          the destination, staying hydrated and shifting your sleep an hour or two before you leave can help. This is general guidance, not medical advice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">Popular routes</h2>
        <p className="text-ink-faint text-sm mb-3">Select a row to load it into the calculator above. Times are gate-to-gate estimates and fares are typical one-way economy, shown in {currency}.</p>
        <div className="bg-surface border border-hairline rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Estimated flight time, distance and typical fare for popular routes</caption>
            <thead>
              <tr className="border-b border-hairline">
                <th scope="col" className="text-left py-3 px-4 text-ink-faint">Route</th>
                <th scope="col" className="text-left py-3 px-4 text-ink-faint">Distance</th>
                <th scope="col" className="text-left py-3 px-4 text-ink-faint">Est. flight time</th>
                <th scope="col" className="text-left py-3 px-4 text-ink-faint">Typical fare</th>
              </tr>
            </thead>
            <tbody>
              {POPULAR_ROUTES.map((r) => (
                <tr key={`${r.from.iata}-${r.to.iata}`} className="border-b border-hairline hover:bg-cream">
                  <th scope="row" className="text-left font-medium py-2 px-4">
                    <a
                      href={`?from=${r.from.iata}&to=${r.to.iata}`}
                      onClick={(e) => { e.preventDefault(); applyRoute(r.from.iata, r.to.iata); }}
                      className="text-blue-700 hover:underline"
                    >
                      {r.from.city} ({r.from.iata}) → {r.to.city} ({r.to.iata})
                    </a>
                  </th>
                  <td className="py-2 px-4 text-ink-faint whitespace-nowrap">{num(r.miles)} mi · {num(r.km)} km</td>
                  <td className="py-2 px-4 text-ink-soft whitespace-nowrap">{r.time}</td>
                  <td className="py-2 px-4 text-ink-faint whitespace-nowrap">≈ {usd(r.fare)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-ink-faint text-xs mt-3 leading-relaxed">
          Longest scheduled non-stop flights are around 18 to 19 hours (Singapore–New York, about 9,500 miles). The shortest, between two Orkney islands in Scotland, is scheduled at
          about two minutes.
        </p>
      </section>

      {/* ───────────────  FAQ  ─────────────── */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-4">Frequently asked questions</h2>
        <div className="space-y-2">
          {FAQ.map((item, i) => (
            <div key={i} className="bg-surface border border-hairline rounded-xl overflow-hidden">
              <button
                type="button"
                aria-expanded={openFaq === i}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-sm font-medium text-ink">{item.q}</span>
                <span className={`text-ink-faint text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {/* The answer stays in the HTML (hidden visually, not removed) so it is readable by search engines and screen readers. */}
              <div className={openFaq === i ? "pb-4" : "sr-only"}>
                <p className="px-5 text-sm text-ink-faint leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <p className="text-ink-faint text-xs leading-relaxed">
          <strong className="text-ink-soft">Good to know:</strong> this calculator provides estimates for planning only. It does not use live flight schedules, weather or air traffic data, and
          it is not a booking service. Always confirm times and prices with your airline or travel agent. Your approximate location (from your internet connection) is used in your browser
          to suggest a starting airport and is not stored; the device-location button works only when you press it. See our{" "}
          <a href="/privacy" className="text-blue-600 underline">privacy policy</a> and <a href="/disclaimer" className="text-blue-600 underline">disclaimer</a>.
        </p>
      </section>
    </>
  );
}
