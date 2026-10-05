"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CardFormat,
  ShareCardData,
  canvasToBlob,
  cardFileName,
  renderShareCard,
} from "@/lib/shareCard";
import { toFirstPerson } from "@/lib/shareHeadline";
import {
  CheckIcon,
  DownloadIcon,
  LinkIcon,
  ShareIcon,
  WhatsAppIcon,
} from "./SocialIcons";

interface ShareResultModalProps {
  data: ShareCardData;
  /** Full https URL of the calculator page. */
  url: string;
  onClose: () => void;
}

// Preview + share dialog for the result card. The image is made in the
// visitor's browser; "Share image" hands the real PNG file to the phone's
// share sheet (that is how it reaches Instagram Stories, WhatsApp status,
// Messages, etc.), and on desktop it falls back to download.
export default function ShareResultModal({ data, url, onClose }: ShareResultModalProps) {
  const [format, setFormat] = useState<CardFormat>("story");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canShareFiles, setCanShareFiles] = useState(false);
  const blobRef = useRef<Blob | null>(null);
  const urlRef = useRef<string>("");

  const shareText = `${data.headline ? `${data.headline} ` : ""}${toFirstPerson(data.label)}: ${data.value}${data.unit ? ` ${data.unit}` : ""}. Check yours free on Numrexo`;

  // Render (and re-render when the format changes)
  useEffect(() => {
    let cancelled = false;
    setError("");
    setPreviewUrl("");
    blobRef.current = null;
    (async () => {
      try {
        const canvas = await renderShareCard(data, format);
        const blob = await canvasToBlob(canvas);
        if (cancelled) return;
        blobRef.current = blob;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        const objectUrl = URL.createObjectURL(blob);
        urlRef.current = objectUrl;
        setPreviewUrl(objectUrl);
        try {
          const file = new File([blob], cardFileName(data.calcName, format), { type: "image/png" });
          setCanShareFiles(Boolean(navigator.canShare && navigator.canShare({ files: [file] })));
        } catch {
          setCanShareFiles(false);
        }
      } catch {
        if (!cancelled) setError("Couldn't create the image. Please try again.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [data, format]);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  // Close on Escape + lock page scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const download = useCallback(() => {
    if (!blobRef.current) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blobRef.current);
    a.download = cardFileName(data.calcName, format);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }, [data.calcName, format]);

  async function shareImage() {
    if (!blobRef.current) return;
    setBusy(true);
    try {
      const file = new File([blobRef.current], cardFileName(data.calcName, format), { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: `${shareText} ${url}`, title: data.calcName });
      } else {
        download();
      }
    } catch (e) {
      // AbortError = the person closed the share sheet; not an error.
      if (!(e instanceof DOMException && e.name === "AbortError")) download();
    } finally {
      setBusy(false);
    }
  }

  async function copyText() {
    const text = `${shareText}: ${url}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const whatsapp = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${url}`)}`;
  const aspect = format === "story" ? "aspect-[9/16]" : "aspect-square";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Share your result"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full sm:max-w-3xl max-h-[96vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-surface text-ink shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-hairline">
          <div>
            <h2 className="text-lg font-bold">Share your result</h2>
            <p className="text-xs text-ink-faint">Create a picture card for your Story or chats</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-cream border border-hairline text-ink-soft hover:text-ink"
          >
            ✕
          </button>
        </div>

        <div className="p-5 grid sm:grid-cols-[minmax(0,260px)_1fr] gap-6 items-start">
          <div className="mx-auto w-full max-w-[260px]">
            <div className={`${aspect} w-full rounded-2xl overflow-hidden bg-[#0a0f1f] border border-hairline relative`}>
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt={`Share card: ${data.calcName} result ${data.value}`} className="w-full h-full object-contain" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                  {error || "Creating your card…"}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-ink-soft uppercase tracking-wider mb-2">Size</div>
              <div className="inline-flex rounded-xl border border-hairline overflow-hidden text-sm">
                <button
                  type="button"
                  onClick={() => setFormat("story")}
                  className={`px-4 py-2 ${format === "story" ? "bg-blue-600 text-white" : "bg-surface text-ink-soft"}`}
                >
                  Story (9:16)
                </button>
                <button
                  type="button"
                  onClick={() => setFormat("square")}
                  className={`px-4 py-2 ${format === "square" ? "bg-blue-600 text-white" : "bg-surface text-ink-soft"}`}
                >
                  Square (1:1)
                </button>
              </div>
            </div>

            <div className="grid gap-2">
              <button
                type="button"
                onClick={shareImage}
                disabled={!previewUrl || busy}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {canShareFiles ? <ShareIcon className="w-5 h-5" /> : <DownloadIcon className="w-5 h-5" />}
                {canShareFiles ? "Share image (Instagram, WhatsApp…)" : "Download image"}
              </button>

              {canShareFiles && (
                <button
                  type="button"
                  onClick={download}
                  disabled={!previewUrl}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cream border border-hairline text-ink hover:border-blue-300 disabled:opacity-50"
                >
                  <DownloadIcon className="w-4 h-4" /> Download PNG
                </button>
              )}

              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-medium hover:opacity-90"
              >
                <WhatsAppIcon className="w-5 h-5" /> Send on WhatsApp (text + link)
              </a>

              <button
                type="button"
                onClick={copyText}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cream border border-hairline text-ink hover:border-blue-300"
              >
                {copied ? <CheckIcon className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4" />}
                {copied ? "Copied" : "Copy text + link"}
              </button>
            </div>

            <div className="rounded-xl bg-cream border border-hairline p-3 text-xs text-ink-soft leading-relaxed">
              <strong className="text-ink">Instagram Story:</strong> on your phone, tap &quot;Share image&quot; and
              choose Instagram. On a computer, download the image and upload it to your Story. The card only shows
              the numbers you see in your result, and your inputs are never saved.
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
