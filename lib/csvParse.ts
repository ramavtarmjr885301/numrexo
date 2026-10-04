// lib/csvParse.ts
//
// Tiny CSV / plain-list reader for the subscriber import. Accepts any of:
//   - a CSV with a header row containing "email" (and optionally "name" or
//     "first name"/"full name"), in any column order
//   - a CSV without a header where the first column is the email
//   - a plain list: one email per line, or emails separated by commas,
//     semicolons or spaces
// Handles quoted cells, "" escapes and Windows line endings.

export interface ParsedRow {
  email: string;
  name: string;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else inQuotes = false;
      } else cell += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',' || ch === ';' || ch === '\t') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      row.push(cell);
      cell = '';
      if (row.some((c) => c.trim() !== '')) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c.trim() !== '')) rows.push(row);
  return rows;
}

export function parseSubscriberText(text: string): ParsedRow[] {
  const rows = parseCsv(text);
  if (rows.length === 0) return [];

  const header = rows[0].map((c) => c.trim().toLowerCase());
  const emailCol = header.findIndex((h) => h === 'email' || h === 'e-mail' || h === 'email address' || h === 'mail');
  const hasHeader = emailCol !== -1;
  const nameCol = hasHeader
    ? header.findIndex((h) => h === 'name' || h === 'full name' || h === 'first name' || h === 'fullname')
    : -1;

  if (hasHeader) {
    return rows.slice(1).map((r) => ({
      email: (r[emailCol] || '').trim(),
      name: nameCol >= 0 ? (r[nameCol] || '').trim() : '',
    }));
  }

  // No header: each row is "email" or "email, name" - but a single line may
  // also hold several emails separated by spaces/commas, so split those too.
  const out: ParsedRow[] = [];
  for (const r of rows) {
    const firstIsEmail = /@/.test(r[0] || '');
    if (firstIsEmail && r.length >= 2 && !/@/.test(r[1] || '')) {
      out.push({ email: r[0].trim(), name: (r[1] || '').trim() });
    } else {
      for (const cell of r) {
        for (const part of cell.split(/\s+/)) {
          if (part.trim()) out.push({ email: part.trim(), name: '' });
        }
      }
    }
  }
  return out;
}
