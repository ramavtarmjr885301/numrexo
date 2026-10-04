"use client";

import { useRef, useState } from "react";
import Link from "next/link";

interface SubscribeBoxProps {
  /** "card" = light box for article/calculator pages, "dark" = compact for the footer. */
  variant?: "card" | "dark";
  heading?: string;
  blurb?: string;
  className?: string;
}

// Email sign-up for updates (new calculators, new guides). Posts to
// /api/subscribe. Plain and honest: one field, a clear promise, a link to the
// privacy policy, and a hidden trap field for bots.
export default function SubscribeBox({
  variant = "card",
  heading = "Get new calculators & guides by email",
  blurb = "Occasional updates when we add a new calculator or publish a useful guide. No spam, unsubscribe anytime.",
  className = "",
}: SubscribeBoxProps) {
  const [email, setEmail] = useState("");
  const [honey, setHoney] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef<number>(Date.now());

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: honey, t: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setState("done");
      setMessage(
        data.status === "already"
          ? "You're already subscribed. Thank you!"
          : "You're subscribed. Thank you!",
      );
      setEmail("");
    } catch {
      setState("error");
      setMessage("Network problem. Please try again.");
    }
  }

  const dark = variant === "dark";

  return (
    <div
      className={
        dark
          ? `${className}`
          : `rounded-2xl border border-hairline bg-surface p-5 sm:p-6 ${className}`
      }
    >
      <h3 className={dark ? "text-sm font-semibold text-white mb-1" : "text-lg font-semibold text-ink mb-1"}>
        {heading}
      </h3>
      <p className={dark ? "text-xs text-gray-400 mb-3" : "text-sm text-ink-soft mb-4"}>{blurb}</p>

      {state === "done" ? (
        <p className={dark ? "text-sm text-green-400" : "text-sm text-green-700"} role="status">
          ✓ {message}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2" noValidate>
          {/* Bot trap: invisible to people, tempting to scripts. */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
            <label>
              Website
              <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
            </label>
          </div>
          <label className="sr-only" htmlFor={`sub-email-${variant}`}>
            Email address
          </label>
          <input
            id={`sub-email-${variant}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={
              dark
                ? "flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400"
                : "flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-cream border border-hairline text-ink text-sm focus:outline-none focus:border-blue-600"
            }
          />
          <button
            type="submit"
            disabled={state === "sending"}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors whitespace-nowrap"
          >
            {state === "sending" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      )}

      {state === "error" && (
        <p className="text-xs text-red-500 mt-2" role="alert">
          {message}
        </p>
      )}
      <p className={dark ? "text-[11px] text-gray-500 mt-2" : "text-xs text-ink-faint mt-2"}>
        By subscribing you agree to our{" "}
        <Link href="/privacy" className="underline hover:no-underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
