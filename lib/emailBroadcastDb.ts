// lib/emailBroadcastDb.ts
//
// Newsletter broadcasts sent from the admin "Email" page. A broadcast is sent
// in small chunks (one per request) so it fits serverless time limits and the
// email provider's daily quota. `last_id` is the cursor: the highest
// subscriber id already handled. It is claimed atomically before each chunk is
// sent, so two overlapping requests can never send the same chunk twice.

import { neon } from '@neondatabase/serverless';
import { countResultEmails24h } from './resultEmailLog';
import { emailStatus } from './emailSend';

const DATABASE_URL = process.env.DATABASE_URL || '';
function getSql() {
  if (!DATABASE_URL) return null;
  return neon(DATABASE_URL);
}

export interface Broadcast {
  id: number;
  subject: string;
  bodyMd: string;
  status: 'draft' | 'sending' | 'paused' | 'done';
  total: number;
  sent: number;
  failed: number;
  lastId: number;
  createdAt: string;
  updatedAt: string;
}

type Row = {
  id: number;
  subject: string;
  body_md: string;
  status: Broadcast['status'];
  total: number;
  sent: number;
  failed: number;
  last_id: number;
  created_at: string;
  updated_at: string;
};

const toBroadcast = (r: Row): Broadcast => ({
  id: r.id,
  subject: r.subject,
  bodyMd: r.body_md,
  status: r.status,
  total: r.total,
  sent: r.sent,
  failed: r.failed,
  lastId: r.last_id,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

let ready: Promise<void> | null = null;
async function ensureTables(): Promise<void> {
  if (ready) return ready;
  const sql = getSql();
  if (!sql) throw new Error('DATABASE_URL is not set');
  ready = (async () => {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS email_broadcasts (
          id SERIAL PRIMARY KEY,
          subject TEXT NOT NULL,
          body_md TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'draft',
          total INT NOT NULL DEFAULT 0,
          sent INT NOT NULL DEFAULT 0,
          failed INT NOT NULL DEFAULT 0,
          last_id INT NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS email_usage (
          id SERIAL PRIMARY KEY,
          n INT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    } catch (error) {
      ready = null;
      throw error;
    }
  })();
  return ready;
}

export async function createBroadcast(subject: string, bodyMd: string, total: number): Promise<Broadcast> {
  await ensureTables();
  const sql = getSql()!;
  const rows = (await sql`
    INSERT INTO email_broadcasts (subject, body_md, status, total) VALUES (${subject}, ${bodyMd}, 'sending', ${total})
    RETURNING *
  `) as unknown as Row[];
  return toBroadcast(rows[0]);
}

export async function getBroadcast(id: number): Promise<Broadcast | null> {
  await ensureTables();
  const sql = getSql()!;
  const rows = (await sql`SELECT * FROM email_broadcasts WHERE id = ${id}`) as unknown as Row[];
  return rows[0] ? toBroadcast(rows[0]) : null;
}

export async function listBroadcasts(limit = 20): Promise<Broadcast[]> {
  try {
    await ensureTables();
    const sql = getSql()!;
    const rows = (await sql`SELECT * FROM email_broadcasts ORDER BY id DESC LIMIT ${limit}`) as unknown as Row[];
    return rows.map(toBroadcast);
  } catch (error) {
    console.warn('[emailBroadcastDb] listBroadcasts failed:', error);
    return [];
  }
}

/**
 * Atomically moves the cursor from `fromId` to `toId`. Returns false if someone
 * else already moved it (so this request must not send that chunk).
 */
export async function claimChunk(id: number, fromId: number, toId: number): Promise<boolean> {
  await ensureTables();
  const sql = getSql()!;
  const rows = (await sql`
    UPDATE email_broadcasts SET last_id = ${toId}, status = 'sending', updated_at = now()
    WHERE id = ${id} AND last_id = ${fromId} AND status IN ('sending', 'paused')
    RETURNING id
  `) as unknown as { id: number }[];
  return rows.length > 0;
}

export async function recordChunkResult(id: number, sent: number, failed: number): Promise<void> {
  await ensureTables();
  const sql = getSql()!;
  await sql`UPDATE email_broadcasts SET sent = sent + ${sent}, failed = failed + ${failed}, updated_at = now() WHERE id = ${id}`;
  if (sent > 0) await sql`INSERT INTO email_usage (n) VALUES (${sent})`;
}

export async function setBroadcastStatus(id: number, status: Broadcast['status']): Promise<void> {
  await ensureTables();
  const sql = getSql()!;
  await sql`UPDATE email_broadcasts SET status = ${status}, updated_at = now() WHERE id = ${id}`;
}

export async function resumeBroadcast(id: number): Promise<void> {
  await ensureTables();
  const sql = getSql()!;
  await sql`UPDATE email_broadcasts SET status = 'sending', updated_at = now() WHERE id = ${id} AND status = 'paused'`;
}

export async function recordUsage(n: number): Promise<void> {
  if (n <= 0) return;
  await ensureTables();
  const sql = getSql()!;
  await sql`INSERT INTO email_usage (n) VALUES (${n})`;
}

export interface Quota {
  limit: number;
  usedToday: number;
  remaining: number;
}

/** Daily provider quota left, counting newsletters, test mails and result mails sent in the last 24h. */
export async function quotaLeft(): Promise<Quota> {
  const limit = emailStatus().dailyLimit;
  let broadcastUsed = 0;
  try {
    await ensureTables();
    const sql = getSql()!;
    const rows = (await sql`SELECT coalesce(sum(n), 0)::int AS n FROM email_usage WHERE created_at > now() - interval '24 hours'`) as unknown as { n: number }[];
    broadcastUsed = rows[0]?.n ?? 0;
  } catch {
    broadcastUsed = 0;
  }
  const resultUsed = await countResultEmails24h();
  const usedToday = broadcastUsed + resultUsed;
  return { limit, usedToday, remaining: Math.max(0, limit - usedToday) };
}
