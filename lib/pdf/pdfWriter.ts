// lib/pdf/pdfWriter.ts
//
// A tiny, dependency-free PDF writer, just big enough for a one-or-two page
// calculator result report. It uses the two standard PDF fonts every viewer
// has built in (Helvetica and Helvetica-Bold), so nothing has to be embedded
// and the file stays a few kilobytes.
//
// It is plain TypeScript with no React, DOM or Node APIs, so the SAME code
// builds the PDF in the visitor's browser ("Download PDF") and on the server
// (the "Email me this result" attachment).
//
// Coordinates: every drawing call uses a TOP-LEFT origin in points (1/72 inch),
// like a web page. They are converted to PDF's bottom-left origin internally.
//
// Text: standard fonts only cover the Windows-1252 ("WinAnsi") character set.
// pdfSafe() turns anything outside it into the nearest safe equivalent
// (the rupee sign becomes "Rs.", accents are dropped, emoji are removed) so a
// stray character can never produce a broken or garbled file.

export type RGB = [number, number, number];
export type FontName = "regular" | "bold";

export const PAPER = {
  letter: { w: 612, h: 792 },
  a4: { w: 595.28, h: 841.89 },
} as const;
export type PaperSize = keyof typeof PAPER;

// Advance widths (1000 units/em) for ASCII 32..126 — Helvetica and Helvetica-Bold.
const W_REGULAR = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556,
  556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833,
  722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500, 556,
  556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334,
  260, 334, 584,
];
const W_BOLD = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556,
  556, 556, 556, 333, 333, 584, 584, 584, 611, 975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833,
  722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556, 333, 556, 611, 556, 611,
  556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611, 611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389,
  280, 389, 584,
];

// Non-ASCII characters we keep, with their width and WinAnsi byte.
const EXTRA: Record<string, { code: number; r: number; b: number }> = {
  "€": { code: 0x80, r: 556, b: 556 }, // €
  "…": { code: 0x85, r: 1000, b: 1000 }, // …
  "‘": { code: 0x91, r: 222, b: 278 }, // ‘
  "’": { code: 0x92, r: 222, b: 278 }, // ’
  "“": { code: 0x93, r: 333, b: 500 }, // “
  "”": { code: 0x94, r: 333, b: 500 }, // ”
  "•": { code: 0x95, r: 350, b: 350 }, // •
  "–": { code: 0x96, r: 556, b: 556 }, // –
  "—": { code: 0x97, r: 1000, b: 1000 }, // —
  "™": { code: 0x99, r: 1000, b: 1000 }, // ™
  "£": { code: 0xa3, r: 556, b: 556 }, // £
  "¥": { code: 0xa5, r: 556, b: 556 }, // ¥
  "°": { code: 0xb0, r: 400, b: 400 }, // °
  "±": { code: 0xb1, r: 584, b: 584 }, // ±
  "·": { code: 0xb7, r: 278, b: 278 }, // ·
  "×": { code: 0xd7, r: 584, b: 584 }, // ×
  "÷": { code: 0xf7, r: 584, b: 584 }, // ÷
  "¢": { code: 0xa2, r: 556, b: 556 }, // ¢
  "©": { code: 0xa9, r: 737, b: 737 }, // ©
  "®": { code: 0xae, r: 737, b: 737 }, // ®
  "½": { code: 0xbd, r: 834, b: 834 }, // ½
  "¼": { code: 0xbc, r: 834, b: 834 }, // ¼
  "¾": { code: 0xbe, r: 834, b: 834 }, // ¾
};

const REPLACEMENTS: Record<string, string> = {
  "₹": "Rs. ", // ₹
  " ": " ",
  " ": " ",
  " ": " ",
  " ": " ",
  " ": " ",
  "−": "-", // −
  "‐": "-",
  "‑": "-",
  "‒": "-",
  "―": "-",
  "≈": "~",
  "≤": "<=",
  "≥": ">=",
  "→": "->",
  "←": "<-",
  "✓": "",
  "✔": "",
  "Ø": "O",
  "ø": "o",
  "ß": "ss",
  "Æ": "AE",
  "æ": "ae",
  "Œ": "OE",
  "œ": "oe",
  "Ð": "D",
  "ð": "d",
  "Þ": "Th",
  "þ": "th",
  "Ł": "L",
  "ł": "l",
  "ı": "i",
  "‚": ",",
  "„": '"',
  "′": "'",
  "″": '"',
  "​": "",
  "‌": "",
  "‍": "",
  "﻿": "",
};

/** Make any string safe for the standard fonts (see file header). */
export function pdfSafe(input: unknown): string {
  let out = "";
  const text = typeof input === "string" ? input : input == null ? "" : String(input);
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    if (cp >= 32 && cp <= 126) {
      out += ch;
    } else if (EXTRA[ch]) {
      out += ch;
    } else if (REPLACEMENTS[ch] !== undefined) {
      out += REPLACEMENTS[ch];
    } else if (cp === 9 || cp === 10 || cp === 13) {
      out += " ";
    } else if (cp >= 0xc0) {
      // Strip accents: "é" -> "e". Anything that does not reduce to ASCII is dropped.
      const base = ch.normalize("NFD").replace(/[̀-ͯ]/g, "");
      for (const b of base) {
        const bc = b.codePointAt(0)!;
        if (bc >= 32 && bc <= 126) out += b;
      }
    }
  }
  return out.replace(/ {2,}/g, " ").trim();
}

/** Width of a (pdfSafe) string in points. */
export function textWidth(text: string, size: number, font: FontName = "regular"): number {
  const table = font === "bold" ? W_BOLD : W_REGULAR;
  let units = 0;
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    if (cp >= 32 && cp <= 126) units += table[cp - 32];
    else if (EXTRA[ch]) units += font === "bold" ? EXTRA[ch].b : EXTRA[ch].r;
    else units += 556;
  }
  return (units * size) / 1000;
}

/** Break text into lines no wider than maxWidth (long words are hard-broken). */
export function wrapText(text: string, size: number, maxWidth: number, font: FontName = "regular"): string[] {
  const words = text.split(" ").filter((w) => w.length > 0);
  const lines: string[] = [];
  let line = "";
  const push = () => {
    if (line) lines.push(line);
    line = "";
  };
  for (let word of words) {
    while (textWidth(word, size, font) > maxWidth) {
      // hard-break an over-long word
      let cut = word.length - 1;
      while (cut > 1 && textWidth(word.slice(0, cut), size, font) > maxWidth) cut--;
      if (line) push();
      lines.push(word.slice(0, cut));
      word = word.slice(cut);
    }
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, size, font) <= maxWidth) line = candidate;
    else {
      push();
      line = word;
    }
  }
  push();
  return lines.length ? lines : [""];
}

// ---------------------------------------------------------------- colour --

export function hexToRgb(hex: string, fallback: RGB = [59, 130, 246]): RGB {
  const m = /^#?([0-9a-f]{6})$/i.exec((hex || "").trim());
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function mixRgb(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

const num = (n: number) => {
  const s = (Math.round(n * 100) / 100).toString();
  return s === "-0" ? "0" : s;
};
const col = (c: RGB) => `${num(c[0] / 255)} ${num(c[1] / 255)} ${num(c[2] / 255)}`;

function encodeText(text: string): string {
  // Returns a PDF literal string body made of latin1 characters (WinAnsi bytes).
  let out = "";
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    let byte = cp;
    if (EXTRA[ch]) byte = EXTRA[ch].code;
    else if (cp < 32 || cp > 126) byte = 63; // "?"
    const c = String.fromCharCode(byte);
    if (c === "(" || c === ")" || c === "\\") out += "\\" + c;
    else if (byte > 126 || byte < 32) out += "\\" + byte.toString(8).padStart(3, "0");
    else out += c;
  }
  return out;
}

// ------------------------------------------------------------------ page --

export interface TextOptions {
  font?: FontName;
  size?: number;
  color?: RGB;
  align?: "left" | "right" | "center";
}

interface LinkAnnot {
  x: number;
  y: number;
  w: number;
  h: number;
  url: string;
}

export class PdfPage {
  readonly ops: string[] = [];
  readonly links: LinkAnnot[] = [];
  constructor(
    readonly width: number,
    readonly height: number,
  ) {}

  private y(top: number): number {
    return this.height - top;
  }

  rect(x: number, top: number, w: number, h: number, o: { fill?: RGB; stroke?: RGB; lineWidth?: number } = {}): void {
    if (!o.fill && !o.stroke) return;
    const parts: string[] = [];
    if (o.fill) parts.push(`${col(o.fill)} rg`);
    if (o.stroke) parts.push(`${col(o.stroke)} RG ${num(o.lineWidth ?? 0.75)} w`);
    parts.push(`${num(x)} ${num(this.y(top + h))} ${num(w)} ${num(h)} re ${o.fill && o.stroke ? "B" : o.fill ? "f" : "S"}`);
    this.ops.push(parts.join(" "));
  }

  roundRect(
    x: number,
    top: number,
    w: number,
    h: number,
    r: number,
    o: { fill?: RGB; stroke?: RGB; lineWidth?: number } = {},
  ): void {
    if (!o.fill && !o.stroke) return;
    const k = 0.5523 * r;
    const yb = this.y(top + h);
    const yt = this.y(top);
    const p: string[] = [];
    p.push(`${num(x + r)} ${num(yb)} m`);
    p.push(`${num(x + w - r)} ${num(yb)} l`);
    p.push(`${num(x + w - r + k)} ${num(yb)} ${num(x + w)} ${num(yb + r - k)} ${num(x + w)} ${num(yb + r)} c`);
    p.push(`${num(x + w)} ${num(yt - r)} l`);
    p.push(`${num(x + w)} ${num(yt - r + k)} ${num(x + w - r + k)} ${num(yt)} ${num(x + w - r)} ${num(yt)} c`);
    p.push(`${num(x + r)} ${num(yt)} l`);
    p.push(`${num(x + r - k)} ${num(yt)} ${num(x)} ${num(yt - r + k)} ${num(x)} ${num(yt - r)} c`);
    p.push(`${num(x)} ${num(yb + r)} l`);
    p.push(`${num(x)} ${num(yb + r - k)} ${num(x + r - k)} ${num(yb)} ${num(x + r)} ${num(yb)} c h`);
    const paint = o.fill && o.stroke ? "B" : o.fill ? "f" : "S";
    const pre: string[] = [];
    if (o.fill) pre.push(`${col(o.fill)} rg`);
    if (o.stroke) pre.push(`${col(o.stroke)} RG ${num(o.lineWidth ?? 0.75)} w`);
    this.ops.push(`${pre.join(" ")} ${p.join(" ")} ${paint}`);
  }

  circle(cx: number, cTop: number, r: number, fill: RGB): void {
    const k = 0.5523 * r;
    const cy = this.y(cTop);
    this.ops.push(
      `${col(fill)} rg ${num(cx + r)} ${num(cy)} m ` +
        `${num(cx + r)} ${num(cy + k)} ${num(cx + k)} ${num(cy + r)} ${num(cx)} ${num(cy + r)} c ` +
        `${num(cx - k)} ${num(cy + r)} ${num(cx - r)} ${num(cy + k)} ${num(cx - r)} ${num(cy)} c ` +
        `${num(cx - r)} ${num(cy - k)} ${num(cx - k)} ${num(cy - r)} ${num(cx)} ${num(cy - r)} c ` +
        `${num(cx + k)} ${num(cy - r)} ${num(cx + r)} ${num(cy - k)} ${num(cx + r)} ${num(cy)} c f`,
    );
  }

  line(x1: number, top1: number, x2: number, top2: number, color: RGB, lineWidth = 0.75): void {
    this.ops.push(
      `${col(color)} RG ${num(lineWidth)} w ${num(x1)} ${num(this.y(top1))} m ${num(x2)} ${num(this.y(top2))} l S`,
    );
  }

  /** Draw one line of text; `baselineTop` is the baseline's distance from the page top. */
  text(x: number, baselineTop: number, raw: string, o: TextOptions = {}): void {
    const text = pdfSafe(raw);
    if (!text) return;
    const font = o.font ?? "regular";
    const size = o.size ?? 10;
    const w = textWidth(text, size, font);
    let px = x;
    if (o.align === "right") px = x - w;
    else if (o.align === "center") px = x - w / 2;
    this.ops.push(
      `BT ${col(o.color ?? [15, 23, 42])} rg /${font === "bold" ? "F2" : "F1"} ${num(size)} Tf ${num(px)} ${num(
        this.y(baselineTop),
      )} Td (${encodeText(text)}) Tj ET`,
    );
  }

  /** Make a rectangular area a clickable link. */
  link(x: number, top: number, w: number, h: number, url: string): void {
    if (!/^https?:\/\/[^\s()<>\\]+$/i.test(url)) return;
    this.links.push({ x, y: this.y(top + h), w, h, url });
  }
}

// -------------------------------------------------------------- document --

export interface PdfInfo {
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  created?: Date;
}

export class PdfDoc {
  readonly pages: PdfPage[] = [];
  constructor(
    readonly width: number,
    readonly height: number,
  ) {}

  addPage(): PdfPage {
    const p = new PdfPage(this.width, this.height);
    this.pages.push(p);
    return p;
  }

  build(info: PdfInfo = {}): Uint8Array {
    const objects: string[] = []; // index 0 => object 1
    const add = (body: string): number => {
      objects.push(body);
      return objects.length;
    };

    // 1 catalog, 2 pages (bodies filled in below), 3/4 fonts, 5 info
    add("");
    add("");
    add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");

    const d = info.created ?? new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const pdfDate = `D:${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}${pad(
      d.getUTCHours(),
    )}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
    const meta = (s?: string) => (s ? `(${encodeText(pdfSafe(s))})` : "()");
    add(
      `<< /Title ${meta(info.title)} /Author ${meta(info.author ?? "Numrexo")} /Subject ${meta(info.subject)} ` +
        `/Creator ${meta(info.creator ?? "Numrexo (numrexo.com)")} /Producer (Numrexo) /CreationDate (${pdfDate}) >>`,
    );

    const pageIds: number[] = [];
    for (const page of this.pages) {
      const content = page.ops.join("\n");
      const contentId = add(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
      const annotIds: number[] = [];
      for (const l of page.links) {
        annotIds.push(
          add(
            `<< /Type /Annot /Subtype /Link /Rect [${num(l.x)} ${num(l.y)} ${num(l.x + l.w)} ${num(l.y + l.h)}] ` +
              `/Border [0 0 0] /A << /S /URI /URI (${encodeText(l.url)}) >> >>`,
          ),
        );
      }
      const annots = annotIds.length ? ` /Annots [${annotIds.map((i) => `${i} 0 R`).join(" ")}]` : "";
      pageIds.push(
        add(
          `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${num(page.width)} ${num(page.height)}] ` +
            `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R${annots} >>`,
        ),
      );
    }

    objects[0] = "<< /Type /Catalog /Pages 2 0 R >>";
    objects[1] = `<< /Type /Pages /Kids [${pageIds.map((i) => `${i} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

    let out = "%PDF-1.4\n%âãÏÓ\n";
    const offsets: number[] = [];
    objects.forEach((body, i) => {
      offsets.push(out.length);
      out += `${i + 1} 0 obj\n${body}\nendobj\n`;
    });
    const xref = out.length;
    out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (const o of offsets) out += `${String(o).padStart(10, "0")} 00000 n \n`;
    out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 5 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

    // Every character is <= 0xFF by construction, so latin1 -> bytes is lossless.
    const bytes = new Uint8Array(out.length);
    for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
    return bytes;
  }
}
