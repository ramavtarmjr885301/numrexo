"use client";

import { useEffect, useState } from "react";
import ShareResultModal from "./ShareResultModal";
import EmailResultModal from "./EmailResultModal";
import { ShareIcon } from "./SocialIcons";
import { downloadResultPdf, makeResultPayload } from "@/lib/resultPdfClient";
import type { ShareCardData } from "@/lib/shareCard";
import type { ResultPayload } from "@/lib/resultPayload";

interface ResultActionsProps {
  data: ShareCardData;
  /** Calculator page path, e.g. "/finance/mortgage-calculator". */
  calcPath: string;
}

// "Email me this result" needs a mail provider (see PATCH21-STEPS). The server
// says whether one is configured; the button only shows when it is, so no
// visitor ever hits a dead end. Asked once per page load.
let emailEnabledPromise: Promise<boolean> | null = null;
function fetchEmailEnabled(): Promise<boolean> {
  if (!emailEnabledPromise) {
    emailEnabledPromise = fetch("/api/email-result")
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((j) => Boolean(j?.enabled))
      .catch(() => false);
  }
  return emailEnabledPromise;
}

const secondaryBtn =
  "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-panel-soft bg-panel-soft text-white text-sm font-semibold hover:bg-white/10 transition-colors";

function PdfIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

// The three things you can do with a result: share a picture of it, download
// a PDF report, or have the PDF emailed. Rendered under every result.
export default function ResultActions({ data, calcPath }: ResultActionsProps) {
  // Frozen copies taken when a dialog opens, so a re-render of the calculator
  // behind it cannot make the dialog redraw.
  const [shareSnapshot, setShareSnapshot] = useState<ShareCardData | null>(null);
  const [emailSnapshot, setEmailSnapshot] = useState<{ payload: ResultPayload; calcName: string } | null>(null);
  const [notice, setNotice] = useState("");
  const [EMAIL_ENABLED, setEmailEnabled] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchEmailEnabled().then((v) => alive && setEmailEnabled(v));
    return () => {
      alive = false;
    };
  }, []);

  function download() {
    try {
      const name = downloadResultPdf(data, calcPath);
      setNotice(`Saved ${name}`);
    } catch {
      setNotice("Couldn't create the PDF. Please try again.");
    }
    setTimeout(() => setNotice(""), 5000);
  }

  return (
    <div className="mt-6 space-y-2">
      <button
        type="button"
        onClick={() => setShareSnapshot(data)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        <ShareIcon className="w-4 h-4" /> Share your result
      </button>

      <div className={`grid gap-2 ${EMAIL_ENABLED ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
        <button type="button" onClick={download} className={secondaryBtn}>
          <PdfIcon className="w-4 h-4" /> Download PDF
        </button>
        {EMAIL_ENABLED && (
          <button
            type="button"
            onClick={() => setEmailSnapshot({ payload: makeResultPayload(data, calcPath), calcName: data.calcName })}
            className={secondaryBtn}
          >
            <MailIcon className="w-4 h-4" /> Email me this result
          </button>
        )}
      </div>

      <p className="text-[11px] text-gray-400 min-h-[1rem] text-center" role="status" aria-live="polite">
        {notice}
      </p>

      {shareSnapshot && (
        <ShareResultModal
          data={shareSnapshot}
          url={`https://numrexo.com${calcPath}`}
          onClose={() => setShareSnapshot(null)}
        />
      )}
      {emailSnapshot && (
        <EmailResultModal
          payload={emailSnapshot.payload}
          calcName={emailSnapshot.calcName}
          onClose={() => setEmailSnapshot(null)}
          onDownload={download}
        />
      )}
    </div>
  );
}
