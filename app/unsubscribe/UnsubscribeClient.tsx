"use client";

import { useState } from "react";

export default function UnsubscribeClient({ token }: { token: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function confirm() {
    setState("busy");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }
      setState("done");
    } catch {
      setState("error");
      setMessage("Network problem. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <p className="text-green-700" role="status">
        You have been unsubscribed. You won&apos;t receive further emails from us.
      </p>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={confirm}
        disabled={state === "busy"}
        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
      >
        {state === "busy" ? "Please wait…" : "Yes, unsubscribe me"}
      </button>
      {state === "error" && <p className="text-sm text-red-600 mt-3">{message}</p>}
    </div>
  );
}
