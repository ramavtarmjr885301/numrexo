"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ShareBar from "./ShareBar";
import { ShareIcon } from "./SocialIcons";

const SITE = "https://numrexo.com";

// Floating share button on every public page (bottom-left, so it never sits
// on top of the cookie banner's buttons or an ad). Opens a small panel with
// the share row for the page the visitor is on. Always shares the real
// numrexo.com address, even when viewed on a preview/Vercel URL.
export default function ShareFab() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Numrexo");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) setTitle(document.title || "Numrexo");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const url = `${SITE}${pathname === "/" ? "" : pathname}`;

  return (
    <div ref={panelRef} className="fixed left-4 bottom-4 z-40 print:hidden">
      {open && (
        <div className="mb-3 w-72 rounded-2xl bg-surface border border-hairline shadow-xl p-4">
          <ShareBar url={url} title={title} heading="Share this page" />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Share this page"
        title="Share this page"
        className="w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        <ShareIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
