// lib/recentCalculators.ts
//
// Powers the homepage's "Pick up where you left off" card. Nothing leaves
// the visitor's browser - this is plain localStorage, written once per
// calculator visit (from CalculatorWrapper.tsx) and read once on the
// homepage (from HomePageClient.tsx). No account, no server round-trip,
// consistent with the rest of the site's "nothing you enter is sent to us"
// promise.

const STORAGE_KEY = "numrexo_recent_calculators";
const MAX_ENTRIES = 5;

export interface RecentCalculatorEntry {
  name: string;
  path: string;
  icon: string;
  visitedAt: number;
}

export function recordRecentCalculator(entry: Omit<RecentCalculatorEntry, "visitedAt">): void {
  if (typeof window === "undefined") return;
  try {
    const existing = readRecentCalculators().filter((e) => e.path !== entry.path);
    const next = [{ ...entry, visitedAt: Date.now() }, ...existing].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private browsing / storage disabled / quota full - this is a nicety,
    // never something worth breaking a calculator page over.
  }
}

export function readRecentCalculators(): RecentCalculatorEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
