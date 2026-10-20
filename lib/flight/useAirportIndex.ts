"use client";

// lib/flight/useAirportIndex.ts
//
// Gives the calculator an airport index immediately (the ~40 embedded seed
// airports) and swaps in the full ~7,900-airport index once /data/airports.json
// has downloaded. The download starts after the page is interactive and happens
// once per page load; the browser/CDN cache serves it on later visits.

import { useEffect, useState } from "react";
import { buildIndex, parseAirportsJson, type AirportIndex } from "./airports";
import { SEED_AIRPORTS } from "./seed";

let seedIndex: AirportIndex | null = null;
let fullIndex: AirportIndex | null = null;
let loading: Promise<AirportIndex> | null = null;

export function getSeedIndex(): AirportIndex {
  seedIndex ??= buildIndex(SEED_AIRPORTS);
  return seedIndex;
}

function loadFullIndex(): Promise<AirportIndex> {
  if (fullIndex) return Promise.resolve(fullIndex);
  loading ??= fetch("/data/airports.json")
    .then((r) => {
      if (!r.ok) throw new Error(`airports.json ${r.status}`);
      return r.json();
    })
    .then((json) => {
      fullIndex = buildIndex(parseAirportsJson(json));
      return fullIndex;
    })
    .catch((err) => {
      loading = null; // allow a retry on the next mount
      throw err;
    });
  return loading;
}

export interface AirportIndexState {
  index: AirportIndex;
  /** true once the complete airport list is loaded */
  full: boolean;
  failed: boolean;
}

export function useAirportIndex(): AirportIndexState {
  const [state, setState] = useState<AirportIndexState>(() => ({
    index: fullIndex ?? getSeedIndex(),
    full: Boolean(fullIndex),
    failed: false,
  }));

  useEffect(() => {
    if (fullIndex) {
      setState({ index: fullIndex, full: true, failed: false });
      return;
    }
    let cancelled = false;
    const start = () => {
      loadFullIndex()
        .then((index) => !cancelled && setState({ index, full: true, failed: false }))
        .catch(() => !cancelled && setState((s) => ({ ...s, failed: true })));
    };
    // Start right away: the file is small once compressed and users often type within seconds.
    const t = window.setTimeout(start, 50);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  return state;
}
