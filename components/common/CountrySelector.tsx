"use client";

// components/common/CountrySelector.tsx
//
// "Select your country" control for the site header. The country is detected
// automatically after the page loads (see useCountry.ts); this is how a visitor
// corrects it. It only changes currency, number format, units and defaults —
// never the language of the page.
//
// Accessibility: the trigger is a button with aria-haspopup/aria-expanded; the
// popover holds a search box (combobox) that controls a listbox. Up/Down move
// the highlighted option, Enter selects it, Escape closes and returns focus to
// the trigger, and a click or focus outside closes it.

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Globe, Search } from "lucide-react";
import { searchCountries } from "@/lib/countries";
import { useCountry } from "@/components/common/useCountry";

interface CountrySelectorProps {
  /** "desktop" is a compact button with a dropdown; "mobile" is a full-width row and sheet. */
  variant?: "desktop" | "mobile";
  /** Called after a country is picked (e.g. to close the mobile menu). */
  onSelect?: () => void;
}

export default function CountrySelector({ variant = "desktop", onSelect }: CountrySelectorProps) {
  const { country, countryInfo, setCountry, isAuto } = useCountry();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const baseId = useId();
  const listId = `${baseId}-list`;
  const optionId = (code: string) => `${baseId}-opt-${code}`;

  const results = useMemo(() => searchCountries(query), [query]);
  const isMobile = variant === "mobile";

  const close = (returnFocus: boolean) => {
    setOpen(false);
    setQuery("");
    if (returnFocus) buttonRef.current?.focus();
  };

  const choose = (code: string) => {
    setCountry(code);
    close(true);
    onSelect?.();
  };

  // On open: start at the current country and focus the search box.
  useEffect(() => {
    if (!open) return;
    const index = searchCountries("").findIndex((item) => item.code === country);
    setActiveIndex(index >= 0 ? index : 0);
    inputRef.current?.focus();
    // Only when the popover opens, not each time the country changes underneath it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Click/tap outside closes.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted option in view while arrowing through a long list.
  useEffect(() => {
    if (!open) return;
    const active = results[activeIndex];
    if (!active) return;
    const node = document.getElementById(optionId(active.code));
    if (node && typeof node.scrollIntoView === "function") node.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, open, results]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (results.length) setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (results.length) setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Home") {
      if (results.length) {
        event.preventDefault();
        setActiveIndex(0);
      }
    } else if (event.key === "End") {
      if (results.length) {
        event.preventDefault();
        setActiveIndex(results.length - 1);
      }
    } else if (event.key === "Enter" && event.target !== buttonRef.current) {
      const active = results[activeIndex];
      if (active) {
        event.preventDefault();
        choose(active.code);
      }
    }
  };

  // Close when keyboard focus leaves the whole control (Tab out).
  const onBlur = (event: React.FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (open && next && rootRef.current && !rootRef.current.contains(next)) close(false);
  };

  const activeOption = results[activeIndex];

  return (
    <div
      ref={rootRef}
      className={isMobile ? "relative w-full" : "relative"}
      onKeyDown={open ? onKeyDown : undefined}
      onBlur={onBlur}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? close(false) : setOpen(true))}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        title="Select your country"
        aria-label={`Select your country. Current: ${countryInfo.name}`}
        className={
          isMobile
            ? "flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-ink-soft hover:text-ink hover:bg-cream transition-all"
            : "flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium text-ink-soft hover:text-ink hover:bg-cream transition-all"
        }
      >
        {/* A globe, not a flag emoji: Windows does not draw flag emoji and shows "US" twice. */}
        <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 text-ink-faint" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z" />
        </svg>
        {isMobile ? (
          <>
            <span className="flex-1 text-left">{countryInfo.name}</span>
            <span className="text-xs text-ink-faint">{countryInfo.currency}</span>
          </>
        ) : (
          <span>{countryInfo.code}</span>
        )}
        <ChevronDown
          aria-hidden="true"
          className={`w-4 h-4 text-ink-faint transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={
            isMobile
              ? "absolute left-0 right-0 top-full mt-2 z-50 bg-surface border border-hairline rounded-xl shadow-xl overflow-hidden"
              : "absolute right-0 top-full mt-2 z-50 w-80 max-w-[calc(100vw-2rem)] bg-surface border border-hairline rounded-xl shadow-xl overflow-hidden"
          }
        >
          <div className="p-3 border-b border-hairline">
            <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-ink-soft">
              <Globe aria-hidden="true" className="w-3.5 h-3.5" />
              <span>Select your country</span>
            </div>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint"
              />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={activeOption ? optionId(activeOption.code) : undefined}
                aria-label="Search country"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Search country…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                className="w-full pl-9 pr-3 py-2 bg-surface border border-hairline rounded-lg text-ink placeholder-ink-faint focus:border-ink outline-none transition-colors text-base sm:text-sm"
              />
            </div>
            {isAuto && (
              <p className="mt-2 text-xs text-ink-faint">
                Detected automatically. Pick another country any time.
              </p>
            )}
          </div>

          {results.length > 0 ? (
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label="Countries"
              className="max-h-64 overflow-y-auto py-1"
            >
              {results.map((item, index) => {
                const selected = item.code === country;
                const active = index === activeIndex;
                return (
                  <li
                    key={item.code}
                    id={optionId(item.code)}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => choose(item.code)}
                    className={`flex items-center gap-3 px-3 py-2 text-sm cursor-pointer ${
                      active ? "bg-cream" : ""
                    } ${selected ? "text-ink font-semibold" : "text-ink-soft"}`}
                  >
                    <span className="w-7 shrink-0 text-[11px] font-semibold text-ink-faint">{item.code}</span>
                    <span className="flex-1 truncate">{item.name}</span>
                    <span className="text-xs text-ink-faint">{item.currency}</span>
                    {selected && <Check aria-hidden="true" className="w-4 h-4 text-blue-600" />}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div id={listId} role="status" className="px-4 py-6 text-center">
              <p className="text-ink-soft text-sm">No countries found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
