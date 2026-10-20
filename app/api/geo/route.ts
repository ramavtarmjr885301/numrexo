// app/api/geo/route.ts
//
// Tells the browser which country the request came from, so the header's
// country selector can pre-select it. The country comes from a header the
// hosting platform already adds (Vercel: x-vercel-ip-country, Cloudflare:
// cf-ipcountry). We never read, store or log an IP address, and the browser is
// never asked for its location from here.
//
// With ?loc=1 (used only by the Flight Time Calculator, to pre-select the airport
// nearest to the visitor) the answer also carries the approximate, city-level
// latitude/longitude and city name the platform already puts in request headers
// (Vercel: x-vercel-ip-latitude / -longitude / -city). It is never stored or
// logged; the visitor can always override the airport. Precise device location is
// a separate, opt-in "Use my location" button that runs entirely in the browser.
//
// The answer is per-visitor, so it must not be cached by a CDN or a shared
// proxy. The page HTML itself stays identical for everyone; this endpoint is
// only called after hydration.

import { NextResponse } from "next/server";
import { getCountry } from "@/lib/countries";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const GEO_HEADERS = ["x-vercel-ip-country", "cf-ipcountry"] as const;

/** Parse a header like "40.71" into a number, or null when missing or out of range. */
function coord(raw: string | null, limit: number): number | null {
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && Math.abs(n) <= limit ? Math.round(n * 100) / 100 : null;
}

export async function GET(request: Request) {
  let country: string | null = null;
  const wantsLocation = new URL(request.url).searchParams.get("loc") === "1";

  for (const name of GEO_HEADERS) {
    const raw = request.headers.get(name);
    // Platforms use XX / T1 for "unknown" and "Tor"; those simply fail the lookup.
    const info = raw ? getCountry(raw.trim()) : undefined;
    if (info) {
      country = info.code;
      break;
    }
  }

  if (wantsLocation) {
    const lat = coord(request.headers.get("x-vercel-ip-latitude"), 90);
    const lon = coord(request.headers.get("x-vercel-ip-longitude"), 180);
    let city: string | null = null;
    try {
      const rawCity = request.headers.get("x-vercel-ip-city");
      city = rawCity ? decodeURIComponent(rawCity).slice(0, 80) : null;
    } catch {
      city = null;
    }
    return NextResponse.json(
      { country, lat, lon, city },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  }

  return NextResponse.json(
    { country },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
