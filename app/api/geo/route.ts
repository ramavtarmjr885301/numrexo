// app/api/geo/route.ts
//
// Tells the browser which country the request came from, so the header's
// country selector can pre-select it. The country comes from a header the
// hosting platform already adds (Vercel: x-vercel-ip-country, Cloudflare:
// cf-ipcountry). We never read, store or log an IP address, and the browser is
// never asked for its location.
//
// The answer is per-visitor, so it must not be cached by a CDN or a shared
// proxy. The page HTML itself stays identical for everyone; this endpoint is
// only called after hydration.

import { NextResponse } from "next/server";
import { getCountry } from "@/lib/countries";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const GEO_HEADERS = ["x-vercel-ip-country", "cf-ipcountry"] as const;

export async function GET(request: Request) {
  let country: string | null = null;

  for (const name of GEO_HEADERS) {
    const raw = request.headers.get(name);
    // Platforms use XX / T1 for "unknown" and "Tor"; those simply fail the lookup.
    const info = raw ? getCountry(raw.trim()) : undefined;
    if (info) {
      country = info.code;
      break;
    }
  }

  return NextResponse.json(
    { country },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
