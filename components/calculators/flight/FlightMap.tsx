"use client";

// components/calculators/flight/FlightMap.tsx
//
// Interactive route map for the Flight Time Calculator (Leaflet + OpenStreetMap).
// Always loaded through next/dynamic with ssr:false because Leaflet needs the
// browser. Draws the great-circle arc between the two airports, labelled pins,
// and a small plane that glides along the route (static when the visitor has
// asked their device for reduced motion).

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { greatCirclePath } from "@/lib/flight/model";
import type { Airport } from "@/lib/flight/airports";

interface Props {
  from: Airport;
  to: Airport;
  userPos?: { lat: number; lon: number } | null;
  /** Tile URL template. Defaults to the public OpenStreetMap tiles. */
  tileUrl?: string;
}

const DEFAULT_TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

const PLANE_SVG =
  '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="#0e7490" stroke="#fff" stroke-width="1.2" stroke-linejoin="round" d="M12 2c.8 0 1.5.9 1.5 2v5.2l8 4.6v2.2l-8-2.2v4.4l2.2 1.6V22L12 21l-3.7 1v-2.2l2.2-1.6v-4.4l-8 2.2v-2.2l8-4.6V4c0-1.1.7-2 1.5-2z"/></svg>';

function pinIcon(code: string, kind: "a" | "b"): L.DivIcon {
  return L.divIcon({
    className: "fm-pin-wrap",
    html: `<div class="fm-pin fm-pin-${kind}"><span>${code}</span></div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export default function FlightMap({ from, to, userPos, tileUrl }: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const planeRef = useRef<L.Marker | null>(null);
  const rafRef = useRef<number | null>(null);
  const boundsRef = useRef<L.LatLngBounds | null>(null);
  const [playing, setPlaying] = useState(true);
  const playingRef = useRef(true);
  playingRef.current = playing;
  const [reduced, setReduced] = useState(false);

  // Create the map once.
  useEffect(() => {
    if (!elRef.current || mapRef.current) return;
    const map = L.map(elRef.current, {
      worldCopyJump: true,
      minZoom: 1,
      maxZoom: 9,
      zoomSnap: 0.25,
      scrollWheelZoom: false, // never hijack page scrolling; enabled after a click
      attributionControl: true,
    });
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet</a>');
    L.tileLayer(tileUrl || DEFAULT_TILES, { attribution: ATTRIBUTION, maxZoom: 9 }).addTo(map);
    map.on("click", () => map.scrollWheelZoom.enable());
    map.on("blur mouseout", () => map.scrollWheelZoom.disable());
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, [tileUrl]);

  // Redraw whenever the route changes.
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    planeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const a = { lat: from.lat, lon: from.lon };
    const b = { lat: to.lat, lon: to.lon };
    const path = greatCirclePath(a, b, 120);

    // The arc and pins are drawn in three world copies so they stay visible however far the map is panned.
    for (const shift of [-360, 0, 360]) {
      const pts = path.map(([la, lo]) => [la, lo + shift] as [number, number]);
      L.polyline(pts, { color: "#ffffff", weight: 6, opacity: 0.7, lineCap: "round" }).addTo(layer);
      L.polyline(pts, { color: "#0891b2", weight: 3, opacity: 0.95, dashArray: "8 8", lineCap: "round" }).addTo(layer);
      L.marker([a.lat, a.lon + shift], { icon: pinIcon(from.iata, "a"), keyboard: false, interactive: false }).addTo(layer);
      const endLon = path[path.length - 1][1];
      L.marker([b.lat, endLon + shift], { icon: pinIcon(to.iata, "b"), keyboard: false, interactive: false }).addTo(layer);
    }
    if (userPos) {
      L.circleMarker([userPos.lat, userPos.lon], {
        radius: 6, color: "#fff", weight: 2, fillColor: "#2563eb", fillOpacity: 1,
      }).bindTooltip("You (approximate)", { direction: "top" }).addTo(layer);
    }

    const bounds = L.latLngBounds(path.map(([la, lo]) => L.latLng(la, lo)));
    boundsRef.current = bounds;
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 7, animate: false });

    // Plane marker gliding along the arc.
    const plane = L.marker(path[0], {
      icon: L.divIcon({ className: "fm-plane", html: `<div class="fm-plane-inner">${PLANE_SVG}</div>`, iconSize: [28, 28], iconAnchor: [14, 14] }),
      interactive: false,
      keyboard: false,
      zIndexOffset: 1000,
    }).addTo(layer);
    planeRef.current = plane;

    const place = (t: number) => {
      const idx = Math.min(path.length - 2, Math.max(0, Math.floor(t * (path.length - 1))));
      const frac = t * (path.length - 1) - idx;
      const p0 = path[idx];
      const p1 = path[idx + 1];
      const lat = p0[0] + (p1[0] - p0[0]) * frac;
      const lon = p0[1] + (p1[1] - p0[1]) * frac;
      plane.setLatLng([lat, lon]);
      // heading from the on-screen direction of the path
      const s0 = map.latLngToContainerPoint([p0[0], p0[1]]);
      const s1 = map.latLngToContainerPoint([p1[0], p1[1]]);
      const deg = (Math.atan2(s1.x - s0.x, -(s1.y - s0.y)) * 180) / Math.PI;
      const inner = plane.getElement()?.querySelector<HTMLElement>(".fm-plane-inner");
      if (inner) inner.style.transform = `rotate(${deg}deg)`;
    };

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (prefersReduced) {
      place(0.5);
      return;
    }
    const DURATION = 7000;
    const PAUSE = 900;
    let start = performance.now();
    let held = 0; // time spent paused, so resuming continues from the same spot
    let lastTick = start;
    const tick = (now: number) => {
      if (!playingRef.current) {
        held += now - lastTick;
      }
      lastTick = now;
      const elapsed = now - start - held;
      const cycle = DURATION + PAUSE;
      const t = Math.min(1, (elapsed % cycle) / DURATION);
      place(t);
      rafRef.current = requestAnimationFrame(tick);
    };
    place(0);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [from, to, userPos]);

  // Keep the map correct when its container resizes (orientation change, layout shifts).
  useEffect(() => {
    const el = elRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      const map = mapRef.current;
      if (!map) return;
      map.invalidateSize();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const resetView = () => {
    if (mapRef.current && boundsRef.current) {
      mapRef.current.fitBounds(boundsRef.current, { padding: [48, 48], maxZoom: 7 });
    }
  };

  return (
    <div className="relative">
      <style>{`
        .fm-pin-wrap{background:none;border:0}
        .fm-pin{position:absolute;transform:translate(-50%,-100%);display:flex;align-items:center;justify-content:center;
          min-width:44px;padding:3px 8px;border-radius:999px;font:700 12px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;
          color:#fff;box-shadow:0 2px 6px rgba(0,0,0,.35);border:2px solid #fff;white-space:nowrap}
        .fm-pin-a{background:#0f766e}.fm-pin-b{background:#b45309}
        .fm-plane{background:none;border:0}
        .fm-plane-inner{width:28px;height:28px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.45));transition:none}
        .leaflet-container{font-family:inherit;background:#cfe3ef}
      `}</style>
      <div
        ref={elRef}
        role="region"
        aria-label={`Map of the flight route from ${from.city || from.name} (${from.iata}) to ${to.city || to.name} (${to.iata})`}
        className="h-[320px] sm:h-[400px] lg:h-[440px] w-full rounded-xl overflow-hidden border border-hairline"
      />
      <div className="absolute right-3 top-3 z-[500] flex gap-2">
        <button
          type="button"
          onClick={resetView}
          className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow border border-gray-300 hover:bg-white"
        >
          Fit route
        </button>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={!playing}
            className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow border border-gray-300 hover:bg-white"
          >
            {playing ? "Pause plane" : "Play plane"}
          </button>
        )}
      </div>
    </div>
  );
}
