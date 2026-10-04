"use client";

import { useEffect, useState } from "react";
import {
  WhatsAppIcon,
  XIcon,
  FacebookIcon,
  LinkedInIcon,
  TelegramIcon,
  ShareIcon,
  LinkIcon,
  CheckIcon,
} from "./SocialIcons";

interface ShareBarProps {
  /** Absolute URL to share. */
  url: string;
  /** Page title / headline used as the share text. */
  title: string;
  /** Small heading above the icons. Pass "" to hide it. */
  heading?: string;
  className?: string;
}

// One row of share buttons: the phone's own share sheet (which is how people
// reach Instagram, Messages, etc.), WhatsApp, X, Facebook, LinkedIn,
// Telegram and copy-link. Used under every calculator, on every blog post,
// and inside the floating share button that sits on all pages.
export default function ShareBar({ url, title, heading = "Share this page", className = "" }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "WhatsApp", href: `https://api.whatsapp.com/send?text=${t}%20${u}`, icon: WhatsAppIcon, bg: "bg-[#25D366]" },
    { name: "X", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`, icon: XIcon, bg: "bg-black" },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: FacebookIcon, bg: "bg-[#1877F2]" },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: LinkedInIcon, bg: "bg-[#0A66C2]" },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, icon: TelegramIcon, bg: "bg-[#229ED9]" },
  ];

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      /* user closed the sheet - nothing to do */
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const btn =
    "w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600";

  return (
    <div className={className}>
      {heading && <p className="text-sm text-ink-soft mb-2">{heading}</p>}
      <div className="flex flex-wrap items-center gap-2">
        {canNativeShare && (
          <button type="button" onClick={nativeShare} aria-label="Share" title="Share" className={`${btn} bg-blue-600`}>
            <ShareIcon className="w-[18px] h-[18px]" />
          </button>
        )}
        {links.map((l) => (
          <a
            key={l.name}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${l.name}`}
            title={`Share on ${l.name}`}
            className={`${btn} ${l.bg}`}
          >
            <l.icon className="w-[18px] h-[18px]" />
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          aria-label="Copy link"
          title="Copy link"
          className={`${btn} ${copied ? "bg-green-600" : "bg-gray-600"}`}
        >
          {copied ? <CheckIcon className="w-[18px] h-[18px]" /> : <LinkIcon className="w-[18px] h-[18px]" />}
        </button>
        {copied && <span className="text-xs text-green-600">Link copied</span>}
      </div>
    </div>
  );
}
