// lib/resultPayload.ts
//
// The small, plain-data description of "this calculator result" that travels
// from the browser to /api/email-result, plus the cleaning rules applied to it.
// The server never trusts the browser's text: it re-cleans everything here,
// looks the calculator up in the registry itself (name, colour, URL come from
// OUR data, not the request) and builds the PDF from that. That is what stops
// the email form from being used to send arbitrary content to strangers.

export interface PayloadRow {
  label: string;
  value: string;
}

export interface ResultPayload {
  /** Page path of the calculator, e.g. "/finance/mortgage-calculator". Looked up in the registry. */
  calcPath: string;
  label: string;
  value: string;
  unit?: string;
  rows: PayloadRow[];
  inputs: PayloadRow[];
  /** ISO timestamp from the visitor's device. */
  generatedAt?: string;
  /** IANA time zone from the visitor's device, e.g. "America/New_York". */
  timeZone?: string;
  /** BCP-47 locale used to format the date on the report. */
  locale?: string;
  paper?: "letter" | "a4";
}

export const PAYLOAD_LIMITS = { rows: 40, inputs: 40, label: 90, value: 120 } as const;

/** Strip control characters, markup and links; collapse whitespace; cap the length. */
export function cleanText(input: unknown, max: number): string {
  if (typeof input !== "string" && typeof input !== "number") return "";
  return String(input)
    .replace(/<[^>]*>/g, " ")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\bwww\.\S+/gi, "")
    .replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028-\u202e\u2066-\u2069\ufeff]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function cleanRows(input: unknown, maxRows: number): PayloadRow[] {
  if (!Array.isArray(input)) return [];
  const out: PayloadRow[] = [];
  for (const item of input) {
    if (out.length >= maxRows) break;
    if (!item || typeof item !== "object") continue;
    const label = cleanText((item as PayloadRow).label, PAYLOAD_LIMITS.label);
    const value = cleanText((item as PayloadRow).value, PAYLOAD_LIMITS.value);
    if (!label && !value) continue;
    out.push({ label, value });
  }
  return out;
}

const IANA_RE = /^[A-Za-z_]+(?:\/[A-Za-z0-9_+\-]+){0,2}$/;
const LOCALE_RE = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8}){0,2}$/;

/** Returns a clean payload or null if it is unusable. Does NOT check the calculator path. */
export function cleanPayload(raw: unknown): ResultPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const calcPath = typeof r.calcPath === "string" ? r.calcPath.replace(/\/+$/, "").slice(0, 200) : "";
  const value = cleanText(r.value, PAYLOAD_LIMITS.value);
  const label = cleanText(r.label, PAYLOAD_LIMITS.label);
  if (!calcPath.startsWith("/") || !value) return null;

  let generatedAt: string | undefined;
  if (typeof r.generatedAt === "string") {
    const t = Date.parse(r.generatedAt);
    // Accept the device clock only if it is within a day of the server's.
    if (Number.isFinite(t) && Math.abs(Date.now() - t) < 24 * 3600 * 1000) generatedAt = new Date(t).toISOString();
  }

  return {
    calcPath,
    label: label || "Result",
    value,
    unit: cleanText(r.unit, PAYLOAD_LIMITS.value) || undefined,
    rows: cleanRows(r.rows, PAYLOAD_LIMITS.rows),
    inputs: cleanRows(r.inputs, PAYLOAD_LIMITS.inputs),
    generatedAt,
    timeZone: typeof r.timeZone === "string" && IANA_RE.test(r.timeZone) ? r.timeZone : undefined,
    locale: typeof r.locale === "string" && LOCALE_RE.test(r.locale) ? r.locale : undefined,
    paper: r.paper === "a4" ? "a4" : "letter",
  };
}
