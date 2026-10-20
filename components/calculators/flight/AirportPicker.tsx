"use client";

// components/calculators/flight/AirportPicker.tsx
//
// A search-as-you-type airport box (ARIA combobox). Type a city and every airport
// serving it is listed; type an airport name, a 3-letter IATA code or a 4-letter
// ICAO code and the matching airport comes first. Works with the keyboard
// (arrows, Enter, Escape) and on touch screens.

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  inputLabel,
  nearestAirports,
  placeLabel,
  searchAirports,
  type Airport,
  type AirportIndex,
} from "@/lib/flight/airports";
import { distanceMiles } from "@/lib/flight/model";

interface Props {
  label: string;
  value: Airport;
  onChange: (a: Airport) => void;
  index: AirportIndex;
  /** True once the complete airport list has loaded (otherwise only popular airports are searchable). */
  fullListReady: boolean;
  /** Approximate visitor position, used for "nearby" suggestions and "x mi away". */
  userPos?: { lat: number; lon: number } | null;
  /** Shown under the box (for example how the airport was chosen). */
  note?: string | null;
  accent: "from" | "to";
}

type Row =
  | { kind: "header"; text: string }
  | { kind: "option"; airport: Airport; distance?: number };

const POPULAR = ["ATL", "LAX", "ORD", "DFW", "JFK", "LHR", "DXB", "SIN", "HND", "DEL", "CDG", "SFO"];

export default function AirportPicker({ label, value, onChange, index, fullListReady, userPos, note, accent }: Props) {
  const uid = useId();
  const listId = `${uid}-list`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState(() => inputLabel(value));
  const [edited, setEdited] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  // When the chosen airport changes from outside (swap, auto-detect, popular route) show it in the box.
  useEffect(() => {
    setText(inputLabel(value));
    setEdited(false);
  }, [value]);

  const rows: Row[] = useMemo(() => {
    const q = edited ? text.trim() : "";
    if (q) {
      const hits = searchAirports(index, q, 12, userPos);
      const out: Row[] = [];
      const metro = hits.find((h) => h.metro)?.metro;
      if (metro) {
        const title = metro.replace(/\b\w/g, (c) => c.toUpperCase());
        out.push({ kind: "header", text: `All airports serving ${title}` });
      }
      let sawOther = false;
      for (const h of hits) {
        if (metro && !h.metro && !sawOther) {
          sawOther = true;
          out.push({ kind: "header", text: "Other matches" });
        }
        out.push({
          kind: "option",
          airport: h.airport,
          distance: userPos ? distanceMiles(userPos, h.airport) : undefined,
        });
      }
      return out;
    }
    // Nothing typed yet: airports near the visitor if we know where they are, otherwise the busiest ones.
    const out: Row[] = [];
    if (userPos) {
      out.push({ kind: "header", text: "Airports near you" });
      for (const n of nearestAirports(index.all, userPos.lat, userPos.lon, 5, true)) {
        out.push({ kind: "option", airport: n.airport, distance: n.miles });
      }
    }
    out.push({ kind: "header", text: "Popular airports" });
    const shown = new Set(out.flatMap((r) => (r.kind === "option" ? [r.airport.iata] : [])));
    for (const code of POPULAR) {
      const a = index.byIata.get(code);
      if (a && !shown.has(code)) out.push({ kind: "option", airport: a });
    }
    return out;
  }, [edited, text, index, userPos]);

  const options = useMemo(() => rows.filter((r): r is Extract<Row, { kind: "option" }> => r.kind === "option"), [rows]);

  useEffect(() => {
    setActive(0);
  }, [text, edited]);

  // Close when clicking or tapping elsewhere.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
        setText(inputLabel(value));
        setEdited(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open, value]);

  const choose = (a: Airport) => {
    onChange(a);
    setOpen(false);
    setEdited(false);
    setText(inputLabel(a));
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      if (open && options[active]) {
        e.preventDefault();
        choose(options[active].airport);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setText(inputLabel(value));
      setEdited(false);
    }
  };

  // keep the highlighted row in view
  useEffect(() => {
    if (!open) return;
    document.getElementById(`${uid}-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, uid]);

  const dot = accent === "from" ? "bg-teal-600" : "bg-amber-600";
  let optionNumber = -1;

  return (
    <div ref={boxRef} className="relative">
      <label htmlFor={`${uid}-input`} className="block text-xs font-semibold text-ink-faint mb-2">
        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 align-middle ${dot}`} aria-hidden="true" />
        {label}
      </label>
      <input
        ref={inputRef}
        id={`${uid}-input`}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && options[active] ? `${uid}-opt-${active}` : undefined}
        aria-label={`${label} airport`}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        value={text}
        placeholder="City, airport name or code (e.g. London, JFK)"
        onFocus={(e) => {
          setOpen(true);
          e.currentTarget.select();
        }}
        onChange={(e) => {
          setText(e.target.value);
          setEdited(true);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
        className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink text-sm"
      />
      {note && !open && <p className="mt-1.5 text-[11px] leading-snug text-ink-faint">{note}</p>}

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={`${label} airport suggestions`}
          className="absolute z-30 left-0 right-0 mt-1 max-h-80 overflow-auto rounded-xl border border-hairline bg-surface shadow-xl"
        >
          {rows.length === 0 || (edited && options.length === 0) ? (
            <li className="px-4 py-3 text-sm text-ink-faint" role="presentation">
              No airport found for &ldquo;{text.trim()}&rdquo;.{" "}
              {fullListReady
                ? "Try the city name, the airport name, or the 3-letter code (for example JFK or LHR)."
                : "The full airport list is still loading; try again in a moment or use a 3-letter code."}
            </li>
          ) : (
            rows.map((r, i) => {
              if (r.kind === "header") {
                return (
                  <li
                    key={`h-${i}`}
                    role="presentation"
                    className="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-ink-faint bg-cream"
                  >
                    {r.text}
                  </li>
                );
              }
              optionNumber += 1;
              const n = optionNumber;
              const a = r.airport;
              const isActive = n === active;
              return (
                <li
                  key={`${i}-${a.iata}`}
                  id={`${uid}-opt-${n}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseEnter={() => setActive(n)}
                  onMouseDown={(e) => {
                    e.preventDefault(); // keep focus so blur does not close the list first
                    choose(a);
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer ${isActive ? "bg-blue-50" : ""}`}
                >
                  <span className="shrink-0 w-11 text-center font-mono text-xs font-bold rounded bg-cyan-700 text-white py-1">
                    {a.iata}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-ink truncate">{a.name}</span>
                    <span className="block text-xs text-ink-faint truncate">{placeLabel(a)}</span>
                  </span>
                  {r.distance !== undefined && (
                    <span className="shrink-0 text-[11px] text-ink-faint">{Math.round(r.distance).toLocaleString("en-US")} mi</span>
                  )}
                </li>
              );
            })
          )}
          {!fullListReady && (
            <li role="presentation" className="px-4 py-2 text-[11px] text-ink-faint border-t border-hairline">
              Loading all {`7,800+`} airports&hellip; popular airports are searchable now.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
