"use client";

// components/common/CookieConsent.tsx
//
// The piece that makes app/privacy/page.tsx's section 8 ("we ask for your
// consent before any advertising or analytics cookies are set... you can
// change or withdraw that consent at any time using the privacy settings
// link in the site footer") an actual, working feature instead of a promise
// the site didn't keep. Every visitor sees this banner once; the choice is
// stored in localStorage and re-applied to Google Consent Mode on every
// later visit without asking again. Footer.tsx's "Privacy Settings" button
// calls `window.openCookiePreferences()` (set up below) to reopen it.
//
// This deliberately does NOT try to geo-detect EEA/UK/Switzerland visitors
// and only show the banner to them - that needs a geolocation service this
// site doesn't have, and asking everyone is always at least as compliant as
// asking only who's legally required to be asked.

import { useEffect, useState } from "react";

const STORAGE_KEY = "numrexo_cookie_consent";

type ConsentChoice = "accepted" | "essential_only";

interface StoredConsent {
  choice: ConsentChoice;
  decidedAt: number;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    openCookiePreferences?: () => void;
  }
}

function applyConsent(choice: ConsentChoice) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const granted = choice === "accepted";
  window.gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
}

function readStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && (parsed.choice === "accepted" || parsed.choice === "essential_only")) {
      return parsed as StoredConsent;
    }
    return null;
  } catch {
    return null;
  }
}

function writeStoredConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, decidedAt: Date.now() }));
  } catch {
    // Private browsing / storage disabled - the banner will just reappear
    // next visit, which is the safe failure mode here.
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      // Returning visitor who already decided - re-apply it silently and
      // don't show the banner again.
      applyConsent(stored.choice);
    } else {
      setVisible(true);
    }

    // Footer's "Privacy Settings" link calls this to let anyone reopen the
    // banner and change their mind, any time.
    window.openCookiePreferences = () => setVisible(true);
    return () => {
      delete window.openCookiePreferences;
    };
  }, []);

  function decide(choice: ConsentChoice) {
    writeStoredConsent(choice);
    applyConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl bg-surface border border-hairline rounded-xl shadow-xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-sm text-ink-soft leading-relaxed flex-1">
            We use cookies for basic analytics, and to show ads through Google AdSense that keep
            Numrexo free. Your calculator inputs never leave your browser either way — this choice
            is only about analytics and ad cookies. See our{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> for
            details.
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => decide("essential_only")}
              className="px-4 py-2 rounded-lg bg-cream border border-hairline text-ink-soft text-sm font-medium hover:text-ink transition-colors whitespace-nowrap"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
