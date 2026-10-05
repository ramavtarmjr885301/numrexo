"use client";

import { useEffect, useRef, useState } from "react";
import type { ResultPayload } from "@/lib/resultPayload";

interface EmailResultModalProps {
  payload: ResultPayload;
  calcName: string;
  onClose: () => void;
  onDownload: () => void;
}

// "Get this result by email". One field. The PDF is built on our server and
// sent straight away; the address is also added to the Numrexo update list.
// There is deliberately no tick box - the one-line notice under the field
// tells every visitor exactly what happens before they press the button.
export default function EmailResultModal({ payload, calcName, onClose, onDownload }: EmailResultModalProps) {
  const [email, setEmail] = useState("");
  const [honey, setHoney] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef<number>(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setMessage("");
    try {
      const res = await fetch("/api/email-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: honey, t: startedAt.current, result: payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setState("done");
    } catch {
      setState("error");
      setMessage("Network problem. Please check your connection and try again.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Email this result"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full sm:max-w-md bg-white text-ink rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 w-8 h-8 rounded-full text-ink-soft hover:bg-cream flex items-center justify-center text-xl leading-none"
        >
          ×
        </button>

        {state === "done" ? (
          <div role="status">
            <h3 className="text-lg font-semibold mb-2">Check your inbox</h3>
            <p className="text-sm text-ink-soft mb-1">
              We&apos;ve sent your {calcName} result as a PDF to <strong className="text-ink break-all">{email}</strong>.
            </p>
            <p className="text-sm text-ink-soft mb-5">It usually arrives within a minute. If you don&apos;t see it, check your spam folder.</p>
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-3 rounded-xl bg-ink text-white text-sm font-semibold hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h3 className="text-lg font-semibold mb-1">Get this result by email</h3>
            <p className="text-sm text-ink-soft mb-4">
              Enter your email and we&apos;ll send your {calcName} result as a PDF right away.
            </p>

            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
              </label>
            </div>

            <label htmlFor="email-result-input" className="sr-only">
              Email address
            </label>
            <input
              id="email-result-input"
              ref={inputRef}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-3 rounded-lg bg-cream border border-hairline text-ink text-sm focus:outline-none focus:border-blue-600"
            />

            <button
              type="submit"
              disabled={state === "sending"}
              className="mt-3 w-full px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors"
            >
              {state === "sending" ? "Sending…" : "Email me the PDF"}
            </button>

            {state === "error" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                {message}
              </p>
            )}

            <p className="text-xs text-ink-faint mt-3 leading-relaxed">
              We&apos;ll email you this result and occasional Numrexo updates &mdash; nothing else. Unsubscribe anytime.
            </p>

            <button
              type="button"
              onClick={onDownload}
              className="mt-3 text-xs font-medium text-blue-700 hover:underline"
            >
              Prefer not to share your email? Download the PDF instead
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
