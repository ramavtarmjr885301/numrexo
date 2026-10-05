// lib/pdf/resultReport.ts
//
// Lays out the Numrexo "result report" PDF: logo and date/time on top, the
// calculator name, the headline result, the supporting figures, the inputs the
// visitor used, and a short disclaimer, with a numbered footer on every page.
//
// Pure TypeScript (no DOM / Node), shared by the browser download and the
// server-side email attachment.

import {
  PAPER,
  PdfDoc,
  PdfPage,
  PaperSize,
  RGB,
  hexToRgb,
  mixRgb,
  pdfSafe,
  textWidth,
  wrapText,
} from "./pdfWriter";

export interface ReportRow {
  label: string;
  value: string;
}

export interface ResultReportData {
  calcName: string;
  categoryLabel: string;
  /** Hex colour of the calculator, e.g. "#3b82f6". */
  accent: string;
  /** Label above the headline number, e.g. "Monthly payment". */
  label: string;
  value: string;
  unit?: string;
  rows: ReportRow[];
  inputs?: ReportRow[];
  /** Calculator page without protocol, e.g. "numrexo.com/finance/mortgage-calculator". */
  displayUrl: string;
  /** Human-readable moment of creation including time zone, shown on the PDF. */
  generatedLabel: string;
  created: Date;
  paper: PaperSize;
}

const INK: RGB = [15, 23, 42];
const MUTED: RGB = [100, 116, 139];
const HAIR: RGB = [226, 232, 240];
const WHITE: RGB = [255, 255, 255];
const PAPER_TINT: RGB = [248, 250, 252];

const MARGIN = 48;

/** Limits that keep a report to a sensible size no matter what is passed in. */
export const REPORT_LIMITS = { rows: 40, inputs: 40, label: 90, value: 120 } as const;

export function reportFileName(calcName: string, date: Date): string {
  const slug =
    pdfSafe(calcName)
      .replace(/[^A-Za-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "Calculator";
  const p = (n: number) => String(n).padStart(2, "0");
  const day = `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
  const time = `${p(date.getHours())}${p(date.getMinutes())}`;
  return `Numrexo-${slug}-Result-${day}-${time}.pdf`;
}

/** e.g. "October 5, 2026, 3:42 PM EDT". Falls back to ISO if Intl is unavailable. */
export function formatGeneratedLabel(date: Date, timeZone?: string, locale = "en-US"): string {
  try {
    const base: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    };
    let text: string;
    try {
      text = new Intl.DateTimeFormat(locale, timeZone ? { ...base, timeZone } : base).format(date);
    } catch {
      text = new Intl.DateTimeFormat("en-US", base).format(date);
    }
    return pdfSafe(text.replace(" at ", ", "));
  } catch {
    return date.toISOString().replace("T", " ").slice(0, 16) + " UTC";
  }
}

export function buildResultReport(data: ResultReportData): Uint8Array {
  const size = PAPER[data.paper] ?? PAPER.letter;
  const doc = new PdfDoc(size.w, size.h);
  const accent = hexToRgb(data.accent);
  const accentSoft = mixRgb(accent, WHITE, 0.9);
  const contentW = size.w - MARGIN * 2;
  const footerTop = size.h - 40;
  const bottomLimit = footerTop - 18;

  const title = pdfSafe(data.calcName) || "Calculator result";
  const rows = (data.rows || []).slice(0, REPORT_LIMITS.rows);
  const inputs = (data.inputs || []).slice(0, REPORT_LIMITS.inputs);

  let page: PdfPage = doc.addPage();
  let y = 0;

  const drawLogo = (p: PdfPage, top: number, scale = 1) => {
    const r = 15 * scale;
    p.circle(MARGIN + r, top + r, r, INK);
    p.text(MARGIN + r, top + r + 5.2 * scale, "N", { font: "bold", size: 15 * scale, color: WHITE, align: "center" });
    p.text(MARGIN + r * 2 + 9, top + r + 6.4 * scale, "numrexo", { font: "bold", size: 21 * scale, color: INK });
  };

  const header = () => {
    drawLogo(page, 40);
    page.text(size.w - MARGIN, 52, "RESULT REPORT", { font: "bold", size: 8.5, color: MUTED, align: "right" });
    page.text(size.w - MARGIN, 66, data.generatedLabel, { size: 9.5, color: INK, align: "right" });
    page.line(MARGIN, 86, size.w - MARGIN, 86, INK, 1.2);
    y = 112;
  };

  const continuation = () => {
    page = doc.addPage();
    drawLogo(page, 36, 0.62);
    page.text(size.w - MARGIN, 54, `${title} (continued)`, { size: 9, color: MUTED, align: "right" });
    page.line(MARGIN, 70, size.w - MARGIN, 70, HAIR, 1);
    y = 92;
  };

  const ensure = (h: number) => {
    if (y + h > bottomLimit) continuation();
  };

  header();

  // ---- title block
  const titleLines = wrapText(title, 22, contentW, "bold").slice(0, 2);
  for (const l of titleLines) {
    page.text(MARGIN, y + 18, l, { font: "bold", size: 22, color: INK });
    y += 27;
  }
  const sub = [pdfSafe(data.categoryLabel), pdfSafe(data.displayUrl)].filter(Boolean).join("  |  ");
  page.text(MARGIN, y + 6, sub, { size: 9.5, color: MUTED });
  y += 28;

  // ---- headline result card
  const label = pdfSafe(data.label).toUpperCase().slice(0, REPORT_LIMITS.label);
  const value = pdfSafe(data.value).slice(0, REPORT_LIMITS.value);
  const unit = pdfSafe(data.unit || "").slice(0, REPORT_LIMITS.value);
  let valueSize = 36;
  while (valueSize > 16 && textWidth(value, valueSize, "bold") > contentW - 56) valueSize -= 2;
  const valueLines = wrapText(value, valueSize, contentW - 56, "bold").slice(0, 2);
  const labelLines = wrapText(label, 9, contentW - 56, "bold").slice(0, 2);
  const cardH =
    26 + labelLines.length * 12 + 8 + valueLines.length * (valueSize + 6) + (unit ? 20 : 0) + 18;
  ensure(cardH + 10);
  page.roundRect(MARGIN, y, contentW, cardH, 10, { fill: accentSoft, stroke: mixRgb(accent, WHITE, 0.7), lineWidth: 0.8 });
  page.roundRect(MARGIN, y, 6, cardH, 3, { fill: accent });
  let cy = y + 28;
  for (const l of labelLines) {
    page.text(MARGIN + 28, cy, l, { font: "bold", size: 9, color: mixRgb(accent, INK, 0.45) });
    cy += 12;
  }
  cy += 6;
  for (const l of valueLines) {
    cy += valueSize;
    page.text(MARGIN + 28, cy - 4, l, { font: "bold", size: valueSize, color: INK });
    cy += 6;
  }
  if (unit) page.text(MARGIN + 28, cy + 8, unit, { size: 11, color: MUTED });
  y += cardH + 26;

  // ---- table helper
  const section = (heading: string, items: ReportRow[], opts: { muted?: boolean } = {}) => {
    if (!items.length) return;
    ensure(26 + 30);
    page.text(MARGIN, y + 10, heading.toUpperCase(), { font: "bold", size: 9, color: MUTED });
    y += 18;
    page.line(MARGIN, y, size.w - MARGIN, y, HAIR, 1);
    const labelW = contentW * 0.56;
    const valueW = contentW - labelW - 24;
    let zebra = false;
    for (const it of items) {
      const lLines = wrapText(pdfSafe(it.label).slice(0, REPORT_LIMITS.label) || "-", 10, labelW).slice(0, 3);
      const vLines = wrapText(pdfSafe(it.value).slice(0, REPORT_LIMITS.value) || "-", 10, valueW, "bold").slice(0, 3);
      const n = Math.max(lLines.length, vLines.length);
      const h = n * 14 + 12;
      ensure(h);
      if (zebra) page.rect(MARGIN, y, contentW, h, { fill: PAPER_TINT });
      lLines.forEach((l, i) => page.text(MARGIN + 8, y + 17 + i * 14, l, { size: 10, color: opts.muted ? MUTED : INK }));
      vLines.forEach((l, i) =>
        page.text(size.w - MARGIN - 8, y + 17 + i * 14, l, { font: "bold", size: 10, color: INK, align: "right" }),
      );
      y += h;
      page.line(MARGIN, y, size.w - MARGIN, y, HAIR, 0.5);
      zebra = !zebra;
    }
    y += 22;
  };

  section("Result breakdown", rows);
  section("Inputs used", inputs, { muted: true });

  // ---- notes / disclaimer
  const noteTitle = "About this report";
  const note1 = `Calculated at ${pdfSafe(data.displayUrl)} on ${pdfSafe(data.generatedLabel)}. Open the calculator to change any input and see the result update instantly.`;
  const note2 =
    "This report is an estimate for general information only. It is not financial, tax, legal or medical advice, and real-world results may differ. Check important numbers with a qualified professional or your provider before you act on them.";
  const n1 = wrapText(note1, 9, contentW - 28);
  const n2 = wrapText(note2, 9, contentW - 28);
  const noteH = 20 + 14 + n1.length * 12 + 6 + n2.length * 12 + 12;
  ensure(noteH);
  page.roundRect(MARGIN, y, contentW, noteH, 8, { fill: PAPER_TINT, stroke: HAIR, lineWidth: 0.8 });
  let ny = y + 22;
  page.text(MARGIN + 14, ny, noteTitle, { font: "bold", size: 9.5, color: INK });
  ny += 8;
  n1.forEach((l) => {
    ny += 12;
    page.text(MARGIN + 14, ny, l, { size: 9, color: MUTED });
  });
  ny += 6;
  n2.forEach((l) => {
    ny += 12;
    page.text(MARGIN + 14, ny, l, { size: 9, color: MUTED });
  });
  const url = `https://${pdfSafe(data.displayUrl).replace(/^https?:\/\//, "")}`;
  page.link(MARGIN, y, contentW, noteH, url);
  y += noteH + 10;

  // ---- footers on every page
  const total = doc.pages.length;
  doc.pages.forEach((p, i) => {
    p.line(MARGIN, footerTop, size.w - MARGIN, footerTop, HAIR, 0.75);
    p.text(MARGIN, footerTop + 15, "Generated by Numrexo  |  numrexo.com", { size: 8.5, color: MUTED });
    p.link(MARGIN, footerTop + 4, 180, 16, "https://numrexo.com");
    p.text(size.w - MARGIN, footerTop + 15, `Page ${i + 1} of ${total}`, { size: 8.5, color: MUTED, align: "right" });
    p.text(size.w / 2, footerTop + 15, pdfSafe(data.generatedLabel), { size: 8.5, color: MUTED, align: "center" });
  });

  return doc.build({
    title: `${title} - Numrexo result`,
    subject: `${title} result generated ${data.generatedLabel}`,
    created: data.created,
  });
}
