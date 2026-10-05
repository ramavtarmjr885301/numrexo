// lib/resultEmailLog.ts
//
// Abuse protection for "Email me this result". The form is public and sends
// real email, so without limits it could be used to spam an address or to burn
// the daily quota of the email provider. Each send attempt is logged with a
// one-way hash of the visitor's IP and of the recipient (no raw IP or address
// is stored here) and the limits below are checked against that log.

import { createHash } from 'node:crypto';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL || '';

export const LIMITS = {
  perIpPerHour: 6,
  perEmailPerDay: 3,
  /** Overall cap per rolling 24h; protects the email provider's free tier. */
  globalPerDay: Math.max(10, Number(process.env.EMAIL_RESULT_DAILY_CAP) || 80),
};

function getSql() {
  if (!DATABASE_URL) return null;
  return neon(DATABASE_URL);
}

export function hashValue(value: string): string {
  const salt = process.env.RESULT_EMAIL_SALT || DATABASE_URL || 'numrexo';
  return createHash('sha256').update(`${salt}|${value}`).digest('hex').slice(0, 32);
}

let tableReady: Promise<void> | null = null;
async function ensureTable(): Promise<void> {
  if (tableReady) return tableReady;
  const sql = getSql();
  if (!sql) throw new Error('DATABASE_URL is not set');
  tableReady = (async () => {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS result_email_log (
          id SERIAL PRIMARY KEY,
          ip_hash TEXT NOT NULL,
          email_hash TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS result_email_log_created_idx ON result_email_log (created_at)`;
    } catch (error) {
      tableReady = null;
      throw error;
    }
  })();
  return tableReady;
}

export type LimitResult = { ok: true } | { ok: false; reason: 'ip' | 'email' | 'global' };

/** Checks the limits and, if all pass, records this attempt. Throws if the database is unreachable. */
export async function checkAndRecord(ip: string, email: string): Promise<LimitResult> {
  await ensureTable();
  const sql = getSql()!;
  const ipHash = hashValue(`ip:${ip}`);
  const emailHash = hashValue(`email:${email}`);

  const rows = (await sql`
    SELECT
      count(*) FILTER (WHERE ip_hash = ${ipHash} AND created_at > now() - interval '1 hour')::int AS ip_n,
      count(*) FILTER (WHERE email_hash = ${emailHash})::int AS email_n,
      count(*)::int AS all_n
    FROM result_email_log
    WHERE created_at > now() - interval '24 hours'
  `) as unknown as { ip_n: number; email_n: number; all_n: number }[];
  const r = rows[0] || { ip_n: 0, email_n: 0, all_n: 0 };

  if (r.ip_n >= LIMITS.perIpPerHour) return { ok: false, reason: 'ip' };
  if (r.email_n >= LIMITS.perEmailPerDay) return { ok: false, reason: 'email' };
  if (r.all_n >= LIMITS.globalPerDay) return { ok: false, reason: 'global' };

  await sql`INSERT INTO result_email_log (ip_hash, email_hash) VALUES (${ipHash}, ${emailHash})`;
  // Housekeeping: nothing older than a week is ever consulted.
  await sql`DELETE FROM result_email_log WHERE created_at < now() - interval '7 days'`;
  return { ok: true };
}

/** How many result emails were sent in the last 24h (shares the provider's daily quota with newsletters). */
export async function countResultEmails24h(): Promise<number> {
  try {
    await ensureTable();
    const sql = getSql()!;
    const rows = (await sql`SELECT count(*)::int AS n FROM result_email_log WHERE created_at > now() - interval '24 hours'`) as unknown as { n: number }[];
    return rows[0]?.n ?? 0;
  } catch {
    return 0;
  }
}
