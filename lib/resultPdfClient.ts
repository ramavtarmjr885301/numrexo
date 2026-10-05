// lib/resultPdfClient.ts  (browser only)
//
// Builds the result PDF in the visitor's browser and offers it as a download,
// or builds the plain-data payload that /api/email-result turns into the same
// PDF on the server.

import { buildResultReport, formatGeneratedLabel, reportFileName } from "@/lib/pdf/resultReport";
import { collectInputs } from "@/lib/collectInputs";
import { getCountryNow } from "@/components/common/useCountry";
import type { ShareCardData } from "@/lib/shareCard";
import type { ResultPayload } from "@/lib/resultPayload";

function deviceTimeZone(): string | undefined {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
  } catch {
    return undefined;
  }
}

/** Everything about this result as plain data (also what gets emailed). */
export function makeResultPayload(data: ShareCardData, calcPath: string): ResultPayload {
  const country = getCountryNow();
  return {
    calcPath,
    label: data.label,
    value: data.value,
    unit: data.unit,
    rows: data.rows.map((r) => ({ label: r.label, value: r.value })),
    inputs: collectInputs(),
    generatedAt: new Date().toISOString(),
    timeZone: deviceTimeZone(),
    locale: country.locale,
    paper: country.paper,
  };
}

export function downloadResultPdf(data: ShareCardData, calcPath: string): string {
  const payload = makeResultPayload(data, calcPath);
  const created = new Date(payload.generatedAt as string);
  const bytes = buildResultReport({
    calcName: data.calcName,
    categoryLabel: data.categoryLabel,
    accent: data.accent,
    label: data.label,
    value: data.value,
    unit: data.unit,
    rows: payload.rows,
    inputs: payload.inputs,
    displayUrl: data.displayUrl,
    generatedLabel: formatGeneratedLabel(created, payload.timeZone, payload.locale),
    created,
    paper: payload.paper === "a4" ? "a4" : "letter",
  });

  const fileName = reportFileName(data.calcName, created);
  // Copy into a plain ArrayBuffer-backed array so Blob accepts it on every TS/DOM lib version.
  const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return fileName;
}
